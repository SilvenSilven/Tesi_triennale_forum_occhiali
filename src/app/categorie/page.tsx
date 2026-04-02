import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import CategoryCard from "@/components/ui/CategoryCard";
import { CATEGORIES } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Categorie — Fashion Enthusiasts",
  description: "Esplora tutte le categorie del forum Fashion Enthusiasts: occhiali da sole, scarpe, borse, abbigliamento e altro.",
};

export default function CategoriePage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-24 border-x border-zinc-100 min-h-[calc(100vh-200px)]">
        <div className="mb-12 border-b border-zinc-200 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
             <Breadcrumb
               items={[
                 { label: "Index", href: "/" },
                 { label: "Categories" },
               ]}
             />
             <h1 className="text-3xl md:text-5xl font-light tracking-tight text-zinc-900 mt-6 select-none">
               Archives
             </h1>
             <p className="text-sm font-light text-zinc-500 mt-4 leading-relaxed">
               Esplora tutte le sezioni di Fashion Enthusiasts.<br/>
               I dipartimenti contrassegnati come &quot;In arrivo&quot; sono ancora in allestimento per l'apertura.
             </p>
          </div>
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 shrink-0">
             {CATEGORIES.length} Directory
          </div>
        </div>

        <section data-section="category-directory" aria-label="Directory Categorie">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200 border border-zinc-200">
            {CATEGORIES.map((cat) => (
              <div key={cat.slug} className="bg-white">
                <CategoryCard category={cat} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
