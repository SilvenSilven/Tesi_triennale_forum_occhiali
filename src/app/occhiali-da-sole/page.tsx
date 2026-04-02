import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Pagination from "@/components/ui/Pagination";
import EmptyState from "@/components/ui/EmptyState";
import { getThreadsForCategory } from "@/lib/threads";
import { formatDateTime } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Occhiali da Sole — Fashion Enthusiasts",
  description: "Forum dedicato agli occhiali da sole: discussioni, recensioni, confronti e consigli di acquisto.",
};

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function OcchialiDaSolePage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || "1", 10));
  const { threads, total, pages } = await getThreadsForCategory("occhiali-da-sole", page);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Categorie", href: "/categorie" },
          { label: "Occhiali da Sole" },
        ]}
      />

      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">🕶️ Occhiali da Sole</h1>
        <p className="text-sm text-gray-500 max-w-2xl">
          Discussioni, recensioni e confronti su occhiali da sole di ogni tipo e fascia di prezzo.
          Condividi la tua esperienza e scopri i pareri della community.
        </p>
        {total > 0 && (
          <p className="text-xs text-gray-400 mt-1">{total} discussioni</p>
        )}
      </header>

      {/* Thread list */}
      <section data-section="thread-list" aria-label="Lista discussioni">
        {threads.length === 0 ? (
          <EmptyState
            icon="💬"
            title="Nessuna discussione disponibile al momento"
            message="Le discussioni verranno pubblicate a breve. Torna presto!"
          />
        ) : (
          <div className="divide-y divide-gray-100">
            {threads.map((thread) => (
              <Link
                key={thread.id}
                href={`/occhiali-da-sole/thread/${thread.slug}`}
                className="block py-4 px-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-base font-semibold text-gray-900 truncate">
                      {thread.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {thread.content}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                      <span className="font-medium text-gray-600">{thread.author.username}</span>
                      <span>{formatDateTime(thread.createdAt)}</span>
                      {thread.models.length > 0 && (
                        <span className="text-blue-500">{thread.models.join(", ")}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 text-xs text-gray-400 shrink-0">
                    <span className="flex items-center gap-1">
                      💬 {thread._count.posts}
                    </span>
                    <span className="flex items-center gap-1">
                      👁 {thread.views}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Pagination */}
      <Pagination currentPage={page} totalPages={pages} basePath="/occhiali-da-sole" />
    </div>
  );
}
