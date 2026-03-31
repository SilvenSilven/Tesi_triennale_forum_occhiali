import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
            <span className="text-2xl" aria-hidden="true">👓</span>
            <span>Fashion Enthusiasts</span>
          </Link>

          {/* Navigation */}
          <nav aria-label="Navigazione principale" className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <Link href="/categorie" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Categorie
            </Link>
            <Link href="/occhiali-da-sole" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Occhiali da Sole
            </Link>
            <Link href="/cerca" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Cerca
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Link href="/categorie" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Menu
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
