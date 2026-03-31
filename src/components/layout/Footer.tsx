export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Fashion Enthusiasts
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              La community italiana dedicata alla moda e allo stile.
              Uno spazio per appassionati, recensioni e confronti.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Sezioni
            </h3>
            <ul className="mt-2 space-y-1">
              <li>
                <a href="/categorie" className="text-sm text-gray-500 hover:text-gray-700">
                  Tutte le Categorie
                </a>
              </li>
              <li>
                <a href="/occhiali-da-sole" className="text-sm text-gray-500 hover:text-gray-700">
                  Occhiali da Sole
                </a>
              </li>
              <li>
                <a href="/cerca" className="text-sm text-gray-500 hover:text-gray-700">
                  Cerca nel Forum
                </a>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Informazioni
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Questo è un progetto accademico fittizio creato per una tesi di laurea in Marketing.
              Tutti i contenuti, i brand e i prodotti sono immaginari.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400 text-center">
            © {new Date().getFullYear()} Fashion Enthusiasts — Progetto accademico fittizio.
            Nessun brand reale è associato a questa piattaforma.
          </p>
        </div>
      </div>
    </footer>
  );
}
