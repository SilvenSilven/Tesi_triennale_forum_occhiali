import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { getThreadBySlug, buildNestedPosts, incrementThreadViews } from "@/lib/threads";
import { formatDateTime } from "@/lib/utils";
import NestedReplies from "@/components/ui/NestedReplies";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const thread = await getThreadBySlug(id);
  return {
    title: thread
      ? `${thread.title} — Fashion Enthusiasts`
      : "Discussione non trovata",
    description: thread?.content.slice(0, 160) || "",
  };
}

export default async function ThreadDetailPage({ params }: Props) {
  const { id } = await params;
  const thread = await getThreadBySlug(id);

  if (!thread) {
    notFound();
  }

  // Increment views once, only in the page component
  await incrementThreadViews(thread.id);

  const nestedPosts = buildNestedPosts(thread.posts);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Occhiali da Sole", href: "/occhiali-da-sole" },
          { label: thread.title },
        ]}
      />

      {/* Thread */}
      <article className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">{thread.title}</h1>
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
          <span className="font-medium text-gray-700">{thread.author.username}</span>
          <span>{formatDateTime(thread.createdAt)}</span>
          <span className="text-gray-400">👁 {thread.views}</span>
        </div>
        {thread.models.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {thread.models.map((model) => (
              <span
                key={model}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
              >
                {model}
              </span>
            ))}
          </div>
        )}
        <div className="prose prose-sm max-w-none text-gray-700">
          <p>{thread.content}</p>
        </div>
      </article>

      {/* Replies */}
      <section className="border-t border-gray-100 pt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Risposte ({thread.posts.length})
        </h2>
        {nestedPosts.length === 0 ? (
          <p className="text-sm text-gray-400">Nessuna risposta ancora.</p>
        ) : (
          <NestedReplies posts={nestedPosts} />
        )}
      </section>
    </div>
  );
}
