import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-zinc-200 mt-auto selection:bg-zinc-900 selection:text-white" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-24">
          
          {/* Brand - Span 5 cols */}
          <div className="md:col-span-5">
            <h3 className="text-sm font-mono tracking-widest uppercase text-zinc-900 mb-6">
              Fashion Enthusiasts
            </h3>
            <p className="text-sm font-light leading-relaxed text-zinc-500 max-w-sm">
              La community italiana dedicata alla moda e allo stile.<br />
              Spazio curato per appassionati, approfondimenti su archivi di stile ed editoriali di alta moda.
            </p>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-2"></div>

          {/* Links - Span 2 cols */}
          <div className="md:col-span-2">
            <h3 className="text-[10px] font-mono tracking-widest uppercase text-zinc-900 mb-6 border-b border-zinc-100 pb-4">
              Directory
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="/categorie" className="text-xs font-light text-zinc-500 hover:text-zinc-900 transition-colors uppercase tracking-wider">
                  Archive
                </Link>
              </li>
              <li>
                <Link href="/occhiali-da-sole" className="text-xs font-light text-zinc-500 hover:text-zinc-900 transition-colors uppercase tracking-wider">
                  Sunglasses
                </Link>
              </li>
              <li>
                <Link href="/cerca" className="text-xs font-light text-zinc-500 hover:text-zinc-900 transition-colors uppercase tracking-wider">
                  Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Info - Span 3 cols */}
          <div className="md:col-span-3">
            <h3 className="text-[10px] font-mono tracking-widest uppercase text-zinc-900 mb-6 border-b border-zinc-100 pb-4">
              Information
            </h3>
            <p className="text-[11px] font-light leading-relaxed text-zinc-500 max-w-xs">
              Progetto accademico creato per tesi in marketing. Tutti i contenuti e riferimenti sono fittizi o finalizzati a uso didattico.
            </p>
          </div>
          
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between border-t border-zinc-200 pt-8 text-[10px] font-mono uppercase tracking-widest text-zinc-400">
          <p>© {new Date().getFullYear()} Fashion Enthusiasts.</p>
          <p className="mt-4 md:mt-0">Academic Project Only / No Real Brands</p>
        </div>
      </div>
    </footer>
  );
}
