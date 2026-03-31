import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import SearchBar from "@/components/ui/SearchBar";
import SortingControls from "@/components/ui/SortingControls";
import FilterControls from "@/components/ui/FilterControls";
import Pagination from "@/components/ui/Pagination";
import EmptyState from "@/components/ui/EmptyState";

export const metadata: Metadata = {
  title: "Occhiali da Sole — Fashion Enthusiasts",
  description: "Forum dedicato agli occhiali da sole: discussioni, recensioni, confronti e consigli di acquisto.",
};

export default function OcchialiDaSolePage() {
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
      </header>

      {/* Navigation within sunglasses */}
      <nav className="flex flex-wrap gap-3 mb-8" aria-label="Sezioni Occhiali da Sole">
        <Link
          href="/occhiali-da-sole"
          className="px-4 py-2 text-sm font-medium rounded-md bg-gray-900 text-white"
          aria-current="page"
        >
          Discussioni
        </Link>
        <Link
          href="/occhiali-da-sole/prodotti"
          className="px-4 py-2 text-sm font-medium rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Prodotti
        </Link>
        <Link
          href="/occhiali-da-sole/brand"
          className="px-4 py-2 text-sm font-medium rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Brand
        </Link>
        <Link
          href="/occhiali-da-sole/confronta"
          className="px-4 py-2 text-sm font-medium rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Confronta
        </Link>
      </nav>

      {/* Search within category */}
      <div className="mb-6">
        <SearchBar
          placeholder="Cerca nelle discussioni sugli occhiali da sole..."
          action="/cerca"
        />
      </div>

      {/* Controls bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 py-3 border-b border-gray-100">
        <SortingControls basePath="/occhiali-da-sole" />
        <FilterControls basePath="/occhiali-da-sole" />
      </div>

      {/* Thread list area */}
      <section data-section="thread-list" aria-label="Lista discussioni">
        <EmptyState
          icon="💬"
          title="Nessuna discussione disponibile al momento"
          message="Questa sezione è pronta per essere popolata. Le discussioni verranno aggiunte in una fase successiva."
        />
      </section>

      {/* Pagination */}
      <Pagination currentPage={1} totalPages={1} basePath="/occhiali-da-sole" />
    </div>
  );
}
