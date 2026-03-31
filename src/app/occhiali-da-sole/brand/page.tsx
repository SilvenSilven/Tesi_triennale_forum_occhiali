import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Pagination from "@/components/ui/Pagination";
import EmptyState from "@/components/ui/EmptyState";

export const metadata: Metadata = {
  title: "Brand Occhiali da Sole — Fashion Enthusiasts",
  description: "Tutti i brand di occhiali da sole discussi dalla community Fashion Enthusiasts.",
};

export default function BrandListPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Occhiali da Sole", href: "/occhiali-da-sole" },
          { label: "Brand" },
        ]}
      />

      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Brand — Occhiali da Sole</h1>
        <p className="text-sm text-gray-500">
          Scopri i brand di occhiali da sole discussi dalla community.
        </p>
      </header>

      {/* Sub-navigation */}
      <nav className="flex flex-wrap gap-3 mb-8" aria-label="Sezioni Occhiali da Sole">
        <Link
          href="/occhiali-da-sole"
          className="px-4 py-2 text-sm font-medium rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
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
          className="px-4 py-2 text-sm font-medium rounded-md bg-gray-900 text-white"
          aria-current="page"
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

      {/* Brand grid (empty) */}
      <section data-section="brand-list" aria-label="Lista brand">
        <EmptyState
          icon="🏷️"
          title="Nessun brand disponibile al momento"
          message="I brand verranno aggiunti in una fase successiva. Il catalogo sarà popolato automaticamente."
        />
      </section>

      <Pagination currentPage={1} totalPages={1} basePath="/occhiali-da-sole/brand" />
    </div>
  );
}
