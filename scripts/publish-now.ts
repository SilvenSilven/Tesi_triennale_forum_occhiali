import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { slugify } from "../src/lib/utils";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function publishNow() {
  const now = new Date();
  console.log("Current time:", now.toISOString());

  const pending = await prisma.scheduledComment.findMany({
    where: {
      published: false,
      publishDate: { lte: now },
    },
    orderBy: [{ dayNumber: "asc" }, { publishOrder: "asc" }],
  });

  console.log(`Found ${pending.length} comments to publish`);

  if (pending.length === 0) {
    await prisma.$disconnect();
    return;
  }

  const category = await prisma.category.findUnique({
    where: { slug: "occhiali-da-sole" },
  });

  if (!category) {
    console.error("Category not found!");
    await prisma.$disconnect();
    return;
  }

  const existingThreads = await prisma.thread.findMany({
    select: { id: true, commentId: true },
  });
  const existingPosts = await prisma.post.findMany({
    select: { id: true, commentId: true },
  });

  const commentIdToThreadId = new Map<string, string>();
  const commentIdToPostId = new Map<string, string>();

  for (const t of existingThreads) commentIdToThreadId.set(t.commentId, t.id);
  for (const p of existingPosts) commentIdToPostId.set(p.commentId, p.id);

  let published = 0;

  for (const comment of pending) {
    try {
      let user = await prisma.user.findUnique({ where: { username: comment.username } });
      if (!user) {
        user = await prisma.user.create({ data: { username: comment.username } });
      }

      if (comment.type === "thread") {
        const baseSlug = slugify(comment.title || comment.commentId);
        const slug = `${baseSlug}-${comment.commentId.toLowerCase()}`;

        const thread = await prisma.thread.create({
          data: {
            commentId: comment.commentId,
            title: comment.title || "Discussione",
            slug,
            content: comment.body,
            models: comment.models,
            authorId: user.id,
            categoryId: category.id,
          },
        });

        commentIdToThreadId.set(comment.commentId, thread.id);
        console.log(`  Thread: ${comment.commentId} -> ${thread.slug}`);
      } else {
        const threadDbId = commentIdToThreadId.get(comment.threadRootId);
        if (!threadDbId) {
          console.warn(`  Skip ${comment.commentId}: thread root ${comment.threadRootId} not found`);
          continue;
        }

        let parentPostId: string | null = null;
        if (comment.parentId && comment.parentId !== comment.threadRootId) {
          parentPostId = commentIdToPostId.get(comment.parentId) || null;
        }

        const post = await prisma.post.create({
          data: {
            commentId: comment.commentId,
            content: comment.body,
            models: comment.models,
            depth: comment.depth,
            authorId: user.id,
            threadId: threadDbId,
            parentId: parentPostId,
          },
        });

        commentIdToPostId.set(comment.commentId, post.id);
        console.log(`  Reply: ${comment.commentId} -> thread ${comment.threadRootId}`);
      }

      await prisma.scheduledComment.update({
        where: { id: comment.id },
        data: { published: true, publishedAt: new Date() },
      });

      published++;
    } catch (err) {
      console.error(`Error on ${comment.commentId}:`, err);
    }
  }

  console.log(`Published ${published}/${pending.length} comments`);
  await prisma.$disconnect();
}

publishNow();
