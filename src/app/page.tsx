import Link from "next/link";
import SearchBar from "@/components/ui/SearchBar";
import CategoryCard from "@/components/ui/CategoryCard";
import EmptyState from "@/components/ui/EmptyState";
import { CATEGORIES } from "@/lib/categories";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Benvenuto su <span className="text-gray-700">Fashion Enthusiasts</span>
          </h1>
          <p className="text-base text-gray-500 max-w-2xl mx-auto mb-8">
            La community italiana dedicata alla moda e allo stile. Discussioni, recensioni e confronti
            su occhiali da sole, scarpe, borse e molto altro.
          </p>
          <div className="max-w-xl mx-auto">
            <SearchBar placeholder="Cerca discussioni, prodotti, brand..." />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category Directory */}
        <section aria-labelledby="categories-title" className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 id="categories-title" className="text-xl font-bold text-gray-900">
              Categorie del Forum
            </h2>
            <Link href="/categorie" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Vedi tutte →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-section="categories">
            {CATEGORIES.map((cat) => (
              <CategoryCard key={cat.slug} category={cat} />
            ))}
          </div>
        </section>

        {/* Empty State Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <section className="rounded-lg border border-gray-100 bg-gray-50 p-6" data-widget="recent-threads">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
              Discussioni Recenti
            </h3>
            <EmptyState
              icon="💬"
              title="Nessuna discussione disponibile"
              message="Nessuna discussione disponibile al momento. I contenuti verranno aggiunti in una fase successiva."
            />
          </section>

          <section className="rounded-lg border border-gray-100 bg-gray-50 p-6" data-widget="featured-products">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
              Prodotti in Evidenza
            </h3>
            <EmptyState
              icon="🕶️"
              title="Nessun prodotto in evidenza"
              message="I prodotti verranno aggiunti in una fase successiva."
            />
          </section>

          <section className="rounded-lg border border-gray-100 bg-gray-50 p-6" data-widget="community-stats">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
              La Community
            </h3>
            <EmptyState
              icon="👥"
              title="La community è pronta"
              message="La community è pronta per essere popolata. I contenuti verranno aggiunti in una fase successiva."
            />
          </section>
        </div>
      </div>
    </>
  );
}
