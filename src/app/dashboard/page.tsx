import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import EmptyState from "@/components/ui/EmptyState";

export const metadata: Metadata = {
  title: "Dashboard — Fashion Enthusiasts",
  description: "Pannello di controllo del forum Fashion Enthusiasts.",
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-24">
        <div className="mb-12 pb-8 border-b border-zinc-200">
          <Breadcrumb
            items={[
              { label: "INDEX", href: "/" },
              { label: "SYSTEM DASHBOARD" },
            ]}
          />
          <h1 className="text-3xl md:text-5xl font-light tracking-tight text-zinc-900 mt-8 mb-4">
            System Dashboard
          </h1>
          <p className="text-sm text-zinc-500 font-light max-w-2xl">
            Telemetria e stato dell'archivio contenuti di Fashion Enthusiasts.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200 border border-zinc-200 mb-16 overflow-hidden">
          {[
            { label: "Threads", value: "0", icon: "TXT" },
            { label: "Users", value: "0", icon: "USR" },
            { label: "Products", value: "0", icon: "TAG" },
            { label: "Reviews", value: "0", icon: "REV" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white p-8 flex flex-col items-start gap-4 transition-colors hover:bg-zinc-50"
              data-stat={stat.label.toLowerCase()}
            >
              <span className="text-[10px] font-mono select-none uppercase tracking-widest text-zinc-300" aria-hidden="true">{stat.icon}</span>
              <div className="mt-auto">
                <p className="text-4xl font-light text-zinc-900 tracking-tight">{stat.value}</p>
                <p className="text-[10px] font-mono text-zinc-500 mt-2 uppercase tracking-widest">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Admin sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="border border-zinc-200 p-8 hover:border-zinc-400 transition-colors">
            <h2 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-6">
              Activity Log
            </h2>
            <EmptyState
              icon="—"
              title="NESSUNA ATTIVITA'"
              message="I flussi operativi non sono ancora avviati. I log di sistema verranno generati progressivamente."
            />
          </section>

          <section className="border border-zinc-200 p-8 hover:border-zinc-400 transition-colors">
            <h2 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-6">
              Cron Jobs & Sync
            </h2>
            <EmptyState
              icon="—"
              title="SYNC IN ATTESA"
              message="Motore di inserimento contenuti automatizzato in fase di hook up (job su base giornaliera)."
            />
          </section>
        </div>
      </div>
    </main>
  );
}
