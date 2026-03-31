import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import SearchBar from "@/components/ui/SearchBar";
import EmptyState from "@/components/ui/EmptyState";
import Pagination from "@/components/ui/Pagination";

export const metadata: Metadata = {
  title: "Cerca — Fashion Enthusiasts",
  description: "Cerca discussioni, prodotti, brand e recensioni nel forum Fashion Enthusiasts.",
};

type Props = {
  searchParams: Promise<{ q?: string; page?: string }>;
};

export default async function CercaPage({ searchParams }: Props) {
  const { q, page } = await searchParams;
  const query = q ?? "";
  const currentPage = parseInt(page ?? "1", 10);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Cerca" },
        ]}
      />

      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Cerca nel Forum</h1>
        <SearchBar placeholder="Cerca discussioni, prodotti, brand, recensioni..." action="/cerca" />
      </header>

      {/* Search results */}
      <section data-section="search-results" aria-label="Risultati ricerca">
        {query ? (
          <>
            <p className="text-sm text-gray-500 mb-6">
              Risultati per: <strong className="text-gray-700">&quot;{query}&quot;</strong>
            </p>
            <EmptyState
              icon="🔍"
              title="Nessun risultato trovato"
              message={`Nessun contenuto corrisponde alla ricerca "${query}". I contenuti verranno aggiunti in una fase successiva.`}
            />
          </>
        ) : (
          <EmptyState
            icon="🔍"
            title="Effettua una ricerca"
            message="Inserisci un termine di ricerca per trovare discussioni, prodotti, brand e recensioni nel forum."
          />
        )}
      </section>

      <Pagination currentPage={currentPage} totalPages={1} basePath={`/cerca?q=${encodeURIComponent(query)}`} />
    </div>
  );
}
