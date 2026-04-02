import Link from "next/link";
import SearchBar from "@/components/ui/SearchBar";
import CategoryCard from "@/components/ui/CategoryCard";
import EmptyState from "@/components/ui/EmptyState";
import { CATEGORIES } from "@/lib/categories";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white">
      {/* Hero */}
      <section className="relative border-b border-zinc-200 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-50 via-white to-white" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col items-center text-center">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 mb-6">Italian Fashion Community</div>
          <h1 className="text-4xl md:text-7xl font-light tracking-tight text-zinc-900 mb-6">
            Fashion Enthusiasts
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            Esplora archivi di stile, recensioni curatoriali e approfondimenti sul design dei migliori accessori, dal mondo dell'alta moda.
          </p>
          <div className="w-full max-w-xl mx-auto">
            <SearchBar placeholder="Cerca discussioni, modelli o recensioni..." />
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Category Directory */}
        <section aria-labelledby="categories-title" className="mb-24">
          <div className="flex items-end justify-between mb-10 pb-4 border-b border-zinc-200">
            <h2 id="categories-title" className="text-sm font-mono uppercase tracking-[0.2em] text-zinc-900">
              Directory
            </h2>
            <Link href="/categorie" className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors uppercase tracking-widest">
              View All ↗
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200 border border-zinc-200 overflow-hidden" data-section="categories">
            {CATEGORIES.map((cat) => (
               <div key={cat.slug} className="bg-white">
                 <CategoryCard category={cat} />
               </div>
            ))}
          </div>
        </section>

        {/* Empty State Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <section className="border border-zinc-200 p-8 hover:border-zinc-400 transition-colors" data-widget="recent-threads">
            <h3 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-6">
              Recent Threads
            </h3>
            <EmptyState
              icon="—"
              title="Awaiting Content"
              message="L'archivio delle discussioni recenti è attualmente in lavorazione."
            />
          </section>

          <section className="border border-zinc-200 p-8 hover:border-zinc-400 transition-colors" data-widget="featured-products">
            <h3 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-6">
              Featured Pieces
            </h3>
            <EmptyState
              icon="—"
              title="Curating Archive"
              message="I prodotti in evidenza verranno aggiunti nel prossimo aggiornamento."
            />
          </section>

          <section className="border border-zinc-200 p-8 hover:border-zinc-400 transition-colors" data-widget="community-stats">
            <h3 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-6">
              Community
            </h3>
            <EmptyState
              icon="—"
              title="Access Restricted"
              message="La dashboard della community sarà sbloccata a breve."
            />
          </section>
        </div>
      </div>
    </main>
  );
}
