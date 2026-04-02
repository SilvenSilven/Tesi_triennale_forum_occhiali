import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

const CRON_SECRET_FALLBACK = "forum_occhiali_cron_2026";

export async function POST(request: NextRequest) {
  // Verify cron secret — accept both env var and hardcoded fallback
  const authHeader = request.headers.get("authorization");
  const validTokens = [
    `Bearer ${CRON_SECRET_FALLBACK}`,
    process.env.CRON_SECRET ? `Bearer ${process.env.CRON_SECRET}` : null,
  ].filter(Boolean);

  if (!validTokens.includes(authHeader)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await publishScheduledComments();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Cron publish error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function publishScheduledComments() {
  const now = new Date();

  // Find all unpublished comments where publishDate <= now
  const pending = await prisma.scheduledComment.findMany({
    where: {
      published: false,
      publishDate: { lte: now },
    },
    orderBy: [{ dayNumber: "asc" }, { publishOrder: "asc" }],
  });

  if (pending.length === 0) {
    return { published: 0, message: "No comments to publish" };
  }

  // Get or create the "occhiali-da-sole" category
  const category = await prisma.category.findUnique({
    where: { slug: "occhiali-da-sole" },
  });

  if (!category) {
    return { published: 0, error: "Category occhiali-da-sole not found" };
  }

  let publishedCount = 0;

  // We need to map comment_id -> thread/post DB id for parent resolution
  // First load existing mappings from already published items
  const existingThreads = await prisma.thread.findMany({
    select: { id: true, commentId: true },
  });
  const existingPosts = await prisma.post.findMany({
    select: { id: true, commentId: true },
  });

  const commentIdToThreadId = new Map<string, string>();
  const commentIdToPostId = new Map<string, string>();

  for (const t of existingThreads) {
    commentIdToThreadId.set(t.commentId, t.id);
  }
  for (const p of existingPosts) {
    commentIdToPostId.set(p.commentId, p.id);
  }

  for (const comment of pending) {
    try {
      // Ensure user exists
      let user = await prisma.user.findUnique({
        where: { username: comment.username },
      });
      if (!user) {
        user = await prisma.user.create({
          data: { username: comment.username },
        });
      }

      if (comment.type === "thread") {
        // Create a new thread
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
      } else {
        // It's a reply — find the thread it belongs to
        const threadDbId = commentIdToThreadId.get(comment.threadRootId);
        if (!threadDbId) {
          console.warn(
            `Thread root ${comment.threadRootId} not found for comment ${comment.commentId}, skipping`
          );
          continue;
        }

        // Find parent post DB id (if it's a nested reply)
        let parentPostId: string | null = null;
        if (comment.parentId && comment.parentId !== comment.threadRootId) {
          // Parent is another post (not the thread itself)
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
      }

      // Mark as published
      await prisma.scheduledComment.update({
        where: { id: comment.id },
        data: { published: true, publishedAt: new Date() },
      });

      publishedCount++;
    } catch (err) {
      console.error(
        `Error publishing comment ${comment.commentId}:`,
        err
      );
    }
  }

  return {
    published: publishedCount,
    total: pending.length,
    message: `Published ${publishedCount}/${pending.length} comments`,
  };
}
