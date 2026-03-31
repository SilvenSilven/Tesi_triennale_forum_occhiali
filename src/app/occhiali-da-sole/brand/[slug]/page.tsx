import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import EmptyState from "@/components/ui/EmptyState";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Brand — Fashion Enthusiasts`,
    description: `Pagina del brand ${slug}: prodotti, recensioni e discussioni nella sezione Occhiali da Sole.`,
  };
}

export default async function BrandDetailPage({ params }: Props) {
  const { slug } = await params;

  // In future: fetch brand from DB
  // const brand = await prisma.brand.findUnique({ where: { slug }, include: { products: true } });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Occhiali da Sole", href: "/occhiali-da-sole" },
          { label: "Brand", href: "/occhiali-da-sole/brand" },
          { label: "Dettaglio Brand" },
        ]}
      />

      <article data-brand-slug={slug} data-section="brand-detail">
        {/* Brand header */}
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-4xl font-bold text-gray-300" aria-hidden="true">?</span>
          </div>
          <div>
            <EmptyState
              icon="🏷️"
              title="Brand non trovato"
              message="Il brand richiesto non esiste o non è ancora disponibile. I dati verranno aggiunti in una fase successiva."
            />
          </div>
        </div>

        {/* Brand products */}
        <section data-section="brand-products" className="border-t border-gray-100 pt-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Prodotti del Brand</h2>
          <EmptyState
            icon="🕶️"
            title="Nessun prodotto disponibile"
            message="I prodotti di questo brand verranno aggiunti in una fase successiva."
          />
        </section>

        {/* Brand discussions */}
        <section data-section="brand-discussions" className="border-t border-gray-100 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Discussioni sul Brand</h2>
          <EmptyState
            icon="💬"
            title="Nessuna discussione disponibile"
            message="Le discussioni su questo brand verranno aggiunte in una fase successiva."
          />
        </section>
      </article>
    </div>
  );
}
