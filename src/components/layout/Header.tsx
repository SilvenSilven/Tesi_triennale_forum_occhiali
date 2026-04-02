import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-zinc-200 sticky top-0 z-50 selection:bg-zinc-900 selection:text-white" role="banner">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo / Brand */}
          <Link href="/" className="group flex items-center gap-3 text-lg md:text-xl font-medium tracking-tight text-zinc-900 hover:text-zinc-600 transition-colors">
            <span className="text-zinc-900 font-serif italic text-xl group-hover:-rotate-6 transition-transform">f.e.</span>
            <span className="hidden sm:inline-block font-mono text-[11px] uppercase tracking-widest pt-1">Fashion Enthusiasts</span>
          </Link>

          {/* Navigation */}
          <nav aria-label="Navigazione principale" className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors">
              Index
            </Link>
            <Link href="/categorie" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors">
              Categories
            </Link>
            <Link href="/occhiali-da-sole" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors relative after:absolute after:-bottom-2 after:left-0 after:w-full after:h-[1px] after:bg-zinc-900 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">
              Sunglasses
            </Link>
            <Link href="/cerca" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors">
              Search
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Link href="/categorie" className="text-[10px] font-mono uppercase tracking-widest text-zinc-900 hover:text-zinc-500">
              Menu
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
