import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import EmptyState from "@/components/ui/EmptyState";

export const metadata: Metadata = {
  title: "Confronta Occhiali da Sole — Fashion Enthusiasts",
  description: "Confronta prezzi, valutazioni e caratteristiche degli occhiali da sole.",
};

export default function ConfrontaPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Occhiali da Sole", href: "/occhiali-da-sole" },
          { label: "Confronta" },
        ]}
      />

      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Confronta — Occhiali da Sole</h1>
        <p className="text-sm text-gray-500">
          Confronta prezzi, valutazioni e caratteristiche di diversi modelli di occhiali da sole.
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
          className="px-4 py-2 text-sm font-medium rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Brand
        </Link>
        <Link
          href="/occhiali-da-sole/confronta"
          className="px-4 py-2 text-sm font-medium rounded-md bg-gray-900 text-white"
          aria-current="page"
        >
          Confronta
        </Link>
      </nav>

      {/* Comparison table structure (empty) */}
      <section data-section="comparison-area" aria-label="Area confronto">
        <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
          {/* Table header */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-sm font-semibold text-gray-700">Tabella di Confronto</h2>
          </div>

          {/* Table structure placeholder */}
          <div className="p-6">
            <table className="w-full text-sm" data-component="comparison-table">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 pr-4 text-gray-500 font-medium">Caratteristica</th>
                  <th className="text-center py-2 px-4 text-gray-400">Prodotto 1</th>
                  <th className="text-center py-2 px-4 text-gray-400">Prodotto 2</th>
                  <th className="text-center py-2 px-4 text-gray-400">Prodotto 3</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50">
                  <td className="py-3 pr-4 text-gray-600">Brand</td>
                  <td className="py-3 px-4 text-center text-gray-300">—</td>
                  <td className="py-3 px-4 text-center text-gray-300">—</td>
                  <td className="py-3 px-4 text-center text-gray-300">—</td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="py-3 pr-4 text-gray-600">Prezzo</td>
                  <td className="py-3 px-4 text-center text-gray-300">—</td>
                  <td className="py-3 px-4 text-center text-gray-300">—</td>
                  <td className="py-3 px-4 text-center text-gray-300">—</td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="py-3 pr-4 text-gray-600">Valutazione</td>
                  <td className="py-3 px-4 text-center text-gray-300">—</td>
                  <td className="py-3 px-4 text-center text-gray-300">—</td>
                  <td className="py-3 px-4 text-center text-gray-300">—</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-gray-600">Recensioni</td>
                  <td className="py-3 px-4 text-center text-gray-300">—</td>
                  <td className="py-3 px-4 text-center text-gray-300">—</td>
                  <td className="py-3 px-4 text-center text-gray-300">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6">
          <EmptyState
            icon="⚖️"
            title="Nessun confronto disponibile"
            message="I confronti tra prodotti verranno calcolati automaticamente quando i dati dei prodotti saranno disponibili."
          />
        </div>
      </section>
    </div>
  );
}
