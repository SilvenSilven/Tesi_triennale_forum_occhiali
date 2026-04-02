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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-10">
        <Breadcrumb
          items={[
            { label: "INDEX", href: "/" },
            { label: "CATEGORIES", href: "/categorie" },
            { label: "SUNGLASSES" },
          ]}
        />
      </div>

      {/* Header - Refined Editorial Style */}
      <header className="mb-12 pb-8 border-b border-zinc-200 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-light tracking-tight text-zinc-900 mb-4 select-none">
            Occhiali da Sole
          </h1>
          <p className="text-sm md:text-base text-zinc-500 leading-relaxed font-light">
            Esplora discussioni, archivi di stile, recensioni esclusive e consigli pratici sui modelli d'alta moda e design.
          </p>
        </div>
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 shrink-0">
          {total > 0 ? `${total} Threads` : "Archive"}
        </div>
      </header>

      {/* Thread list */}
      <section data-section="thread-list" aria-label="Lista discussioni">
        {threads.length === 0 ? (
          <div className="py-24">
            <EmptyState
              icon="✧"
              title="NO THREADS YET"
              message="Nessuna discussione pubblicata al momento in questa sezione."
            />
          </div>
        ) : (
          <div className="flex flex-col border-t border-zinc-200">
            {threads.map((thread) => (
              <Link
                key={thread.id}
                href={`/occhiali-da-sole/thread/${thread.slug}`}
                className="group block border-b border-zinc-200 hover:bg-zinc-50 transition-all duration-300 ease-out"
              >
                <div className="py-6 px-4 md:px-6 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8">
                  <div className="flex-1 min-w-0">
                    {/* Title */}
                    <h2 className="text-lg md:text-xl font-medium text-zinc-900 tracking-tight leading-snug group-hover:text-zinc-600 transition-colors mb-2">
                      {thread.title}
                    </h2>
                    
                    {/* Excerpt */}
                    <p className="text-sm text-zinc-500 line-clamp-1 mb-3 font-light">
                      {thread.content}
                    </p>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                      <span className="text-zinc-700 font-medium">@{thread.author.username}</span>
                      <span>{formatDateTime(thread.createdAt)}</span>
                      {thread.models.length > 0 && (
                        <span className="text-zinc-800 before:content-['—'] before:mr-4 before:text-zinc-300">{thread.models.join(", ")}</span>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 shrink-0 md:border-l border-zinc-200 md:pl-8 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-base font-medium text-zinc-900">{thread._count.posts}</span>
                      <span className="text-[9px] font-mono tracking-widest uppercase text-zinc-400">Replies</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-base font-medium text-zinc-700">{thread.views}</span>
                      <span className="text-[9px] font-mono tracking-widest uppercase text-zinc-400">Views</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Pagination */}
      <div className="mt-12 flex justify-between items-center">
        <Pagination currentPage={page} totalPages={pages} basePath="/occhiali-da-sole" />
      </div>
    </div>
  );
}
