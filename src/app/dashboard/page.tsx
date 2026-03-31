import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import EmptyState from "@/components/ui/EmptyState";

export const metadata: Metadata = {
  title: "Dashboard — Fashion Enthusiasts",
  description: "Pannello di controllo del forum Fashion Enthusiasts.",
};

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Dashboard" },
        ]}
      />

      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Panoramica e statistiche del forum Fashion Enthusiasts.
        </p>
      </header>

      {/* Stats grid (empty) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Discussioni", value: "0", icon: "💬" },
          { label: "Utenti", value: "0", icon: "👥" },
          { label: "Prodotti", value: "0", icon: "🕶️" },
          { label: "Recensioni", value: "0", icon: "⭐" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-gray-200 bg-white p-5"
            data-stat={stat.label.toLowerCase()}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl" aria-hidden="true">{stat.icon}</span>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Admin sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
            Attività Recente
          </h2>
          <EmptyState
            icon="📊"
            title="Nessuna attività"
            message="L'attività del forum verrà registrata quando i contenuti saranno disponibili."
          />
        </section>

        <section className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
            Inserimento Contenuti
          </h2>
          <EmptyState
            icon="⚙️"
            title="Pronto per l'inserimento automatico"
            message="Il sistema è predisposto per ricevere contenuti tramite un processo automatico esterno (cron job giornaliero)."
          />
        </section>
      </div>
    </div>
  );
}
