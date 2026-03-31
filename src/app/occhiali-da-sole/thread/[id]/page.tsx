import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import EmptyState from "@/components/ui/EmptyState";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Discussione — Fashion Enthusiasts`,
    description: `Dettaglio della discussione ${id} nella sezione Occhiali da Sole.`,
  };
}

export default async function ThreadDetailPage({ params }: Props) {
  const { id } = await params;

  // In future: fetch thread from DB by slug/id
  // const thread = await prisma.thread.findUnique({ where: { slug: id } });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Occhiali da Sole", href: "/occhiali-da-sole" },
          { label: "Discussione" },
        ]}
      />

      <article data-thread-id={id} data-section="thread-detail">
        <EmptyState
          icon="📄"
          title="Discussione non trovata"
          message="La discussione richiesta non esiste o non è ancora disponibile. I contenuti verranno aggiunti in una fase successiva."
        />
      </article>

      {/* Reply section structure (empty) */}
      <section data-section="replies" className="mt-8 border-t border-gray-100 pt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Risposte</h2>
        <EmptyState
          icon="💬"
          title="Nessuna risposta"
          message="Non ci sono ancora risposte a questa discussione."
        />
      </section>
    </div>
  );
}
