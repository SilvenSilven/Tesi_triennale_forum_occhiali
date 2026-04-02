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
    <main className="min-h-screen bg-[#faf9f5] text-zinc-900 selection:bg-zinc-900 selection:text-[#faf9f5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        
        {/* Navigation */}
        <div className="flex items-center justify-between mb-16 border-b-2 border-zinc-900 pb-4">
          <Breadcrumb
            items={[
              { label: "INDEX", href: "/" },
              { label: "CATEGORIES", href: "/categorie" },
              { label: "SUNGLASSES" },
            ]}
          />
          <div className="text-xs font-bold tracking-widest uppercase">
            {total > 0 ? `${total} Discussions` : "Archive"}
          </div>
        </div>

        {/* Header - Editorial Style */}
        <header className="mb-20 max-w-4xl">
          <h1 className="text-5xl md:text-8xl font-serif font-medium leading-[0.9] tracking-tight text-zinc-900 mb-8 uppercase">
            Occhiali<br/>da Sole.
          </h1>
          <p className="text-lg md:text-xl font-light text-zinc-600 max-w-2xl leading-relaxed">
            Esplora recensioni curatoriali, archivi di stile, discussioni esclusive e consigli pratici sui feticci per eccellenza dell'estate e dell'alta moda.
          </p>
        </header>

        {/* Thread list */}
        <section data-section="thread-list" aria-label="Lista discussioni">
          {threads.length === 0 ? (
            <div className="py-24 border-y-2 border-zinc-900">
              <EmptyState
                icon="👁️"
                title="ARCHIVIO VUOTO"
                message="Nessuna discussione pubblicata al momento. Il prossimo pezzo arriverà a breve."
              />
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {threads.map((thread) => (
                <Link
                  key={thread.id}
                  href={`/occhiali-da-sole/thread/${thread.slug}`}
                  className="group relative block border-2 border-zinc-900 bg-white p-6 md:p-8 hover:-translate-y-1 hover:shadow-[8px_8px_0px_#18181b] transition-all duration-300 ease-out"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex-1 min-w-0">
                      
                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-[11px] font-bold tracking-widest uppercase text-zinc-500">
                        <span className="text-zinc-900 px-2 py-1 bg-zinc-100">{thread.author.username}</span>
                        <span>{formatDateTime(thread.createdAt)}</span>
                        {thread.models.length > 0 && (
                          <span className="text-amber-700 before:content-['•'] before:mr-4 before:text-zinc-300">{thread.models.join(" / ")}</span>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="text-3xl md:text-4xl font-serif font-medium text-zinc-900 tracking-tight leading-tight group-hover:underline decoration-2 underline-offset-4 mb-4">
                        {thread.title}
                      </h2>
                      
                      {/* Excerpt */}
                      <p className="text-zinc-600 leading-relaxed line-clamp-2 md:line-clamp-3 text-base md:text-lg max-w-3xl">
                        {thread.content}
                      </p>
                    </div>

                    {/* Stats Widget */}
                    <div className="flex flex-row md:flex-col gap-4 md:gap-2 shrink-0 border-t-2 md:border-t-0 md:border-l-2 border-zinc-100 pt-4 md:pt-0 md:pl-6 md:w-32 justify-end md:justify-start">
                      <div className="flex flex-col">
                        <span className="text-3xl font-serif font-bold text-zinc-900">{thread._count.posts}</span>
                        <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-400">Replies</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xl font-serif font-bold text-zinc-700">{thread.views}</span>
                        <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-400">Views</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Pagination */}
        <div className="mt-16 pt-8 border-t-2 border-zinc-900 flex justify-between items-center">
          <Pagination currentPage={page} totalPages={pages} basePath="/occhiali-da-sole" />
        </div>
      </div>
    </main>
  );
}
