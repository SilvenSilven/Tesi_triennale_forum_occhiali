import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import EmptyState from "@/components/ui/EmptyState";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Prodotto — Fashion Enthusiasts`,
    description: `Scheda prodotto ${id}: prezzo, recensioni e confronti nella sezione Occhiali da Sole.`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;

  // In future: fetch product from DB
  // const product = await prisma.product.findUnique({ where: { slug: id }, include: { brand: true, reviews: true } });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Occhiali da Sole", href: "/occhiali-da-sole" },
          { label: "Prodotti", href: "/occhiali-da-sole/prodotti" },
          { label: "Dettaglio Prodotto" },
        ]}
      />

      <article data-product-slug={id} data-section="product-detail">
        {/* Product header (placeholder) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Image placeholder */}
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-6xl text-gray-300" aria-hidden="true">🕶️</span>
          </div>

          {/* Product info placeholder */}
          <div>
            <EmptyState
              icon="📦"
              title="Prodotto non trovato"
              message="Il prodotto richiesto non esiste o non è ancora disponibile. I dati verranno aggiunti in una fase successiva."
            />
          </div>
        </div>

        {/* Product details structure */}
        <section data-section="product-specs" className="border-t border-gray-100 pt-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Specifiche</h2>
          <div className="text-sm text-gray-400">Nessuna specifica disponibile al momento.</div>
        </section>

        {/* Price history placeholder */}
        <section data-section="price-history" className="border-t border-gray-100 pt-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Storico Prezzi</h2>
          <div className="text-sm text-gray-400">Nessun dato disponibile sullo storico prezzi.</div>
        </section>

        {/* Reviews section */}
        <section data-section="reviews" className="border-t border-gray-100 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recensioni</h2>
          <EmptyState
            icon="⭐"
            title="Nessuna recensione disponibile"
            message="Le recensioni verranno aggiunte in una fase successiva."
          />
        </section>
      </article>
    </div>
  );
}
