import { prisma } from "./prisma";

export async function getThreadsForCategory(
  categorySlug: string,
  page: number = 1,
  perPage: number = 20
) {
  const category = await prisma.category.findUnique({
    where: { slug: categorySlug },
  });

  if (!category) return { threads: [], total: 0, pages: 1 };

  const [threads, total] = await Promise.all([
    prisma.thread.findMany({
      where: { categoryId: category.id },
      include: {
        author: { select: { id: true, username: true, avatar: true } },
        _count: { select: { posts: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.thread.count({ where: { categoryId: category.id } }),
  ]);

  return {
    threads,
    total,
    pages: Math.max(1, Math.ceil(total / perPage)),
  };
}

export async function getThreadBySlug(slug: string) {
  return prisma.thread.findUnique({
    where: { slug },
    include: {
      author: { select: { id: true, username: true, avatar: true } },
      posts: {
        include: {
          author: { select: { id: true, username: true, avatar: true } },
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });
}

export async function incrementThreadViews(threadId: string) {
  await prisma.thread.update({
    where: { id: threadId },
    data: { views: { increment: 1 } },
  });
}

export type ThreadWithPosts = NonNullable<
  Awaited<ReturnType<typeof getThreadBySlug>>
>;
export type PostWithAuthor = ThreadWithPosts["posts"][number];

export type NestedPost = PostWithAuthor & { children: NestedPost[] };

export function buildNestedPosts(posts: PostWithAuthor[]): NestedPost[] {
  const postMap = new Map<string, NestedPost>();
  const roots: NestedPost[] = [];

  // Initialize all posts with children array
  for (const post of posts) {
    postMap.set(post.id, { ...post, children: [] });
  }

  // Build tree
  for (const post of posts) {
    const node = postMap.get(post.id)!;
    if (post.parentId && postMap.has(post.parentId)) {
      postMap.get(post.parentId)!.children.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}
