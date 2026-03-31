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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Categorie" },
        ]}
      />

      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Categorie del Forum</h1>
        <p className="text-sm text-gray-500">
          Esplora tutte le sezioni della community Fashion Enthusiasts.
          Le sezioni contrassegnate come &quot;In arrivo&quot; saranno disponibili prossimamente.
        </p>
      </header>

      <section data-section="category-directory">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
      </section>
    </div>
  );
}
