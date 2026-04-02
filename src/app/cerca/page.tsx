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
    <main className="min-h-screen bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-24 min-h-[calc(100vh-200px)]">
        <div className="mb-16">
          <Breadcrumb
            items={[
              { label: "INDEX", href: "/" },
              { label: "SEARCH" },
            ]}
          />
        </div>

        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-light tracking-tight text-zinc-900 mb-8 select-none">
            Ricerca
          </h1>
          <div className="max-w-2xl mx-auto">
            <SearchBar placeholder="Cerca discussioni, modelli o brand..." action="/cerca" />
          </div>
        </header>

        {/* Search results */}
        <section data-section="search-results" aria-label="Risultati ricerca" className="border-t border-zinc-200 pt-10">
          {query ? (
            <>
              <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-8 text-center">
                Query: <strong className="text-zinc-900">{query}</strong>
              </p>
              <EmptyState
                icon="—"
                title="NESSUN RISULTATO"
                message={`L'archivio non contiene corrispondenze per "${query}". Espandi la ricerca o torna all'indice.`}
              />
            </>
          ) : (
            <EmptyState
              icon="—"
              title="INIZIA LA RICERCA"
              message="Inserisci un termine per interrogare l'archivio del forum."
            />
          )}
        </section>

        <div className="mt-12 flex justify-between items-center">
          <Pagination currentPage={currentPage} totalPages={1} basePath={`/cerca?q=${encodeURIComponent(query)}`} />
        </div>
      </div>
    </main>
  );
}
