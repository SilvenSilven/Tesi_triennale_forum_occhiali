type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath: string;
};

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) {
    return (
      <nav aria-label="Paginazione" className="flex justify-center py-6" data-component="pagination">
        <span className="text-sm text-gray-400">Pagina 1 di 1</span>
      </nav>
    );
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Paginazione" className="flex justify-center py-6" data-component="pagination">
      <ul className="flex items-center gap-1">
        {/* Previous */}
        <li>
          {currentPage > 1 ? (
            <a
              href={`${basePath}?page=${currentPage - 1}`}
              className="px-3 py-2 text-sm rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50"
              rel="prev"
            >
              ← Precedente
            </a>
          ) : (
            <span className="px-3 py-2 text-sm rounded-md border border-gray-100 text-gray-300 cursor-not-allowed">
              ← Precedente
            </span>
          )}
        </li>

        {/* Page numbers */}
        {pages.map((page) => (
          <li key={page}>
            {page === currentPage ? (
              <span
                className="px-3 py-2 text-sm rounded-md bg-gray-900 text-white font-medium"
                aria-current="page"
              >
                {page}
              </span>
            ) : (
              <a
                href={`${basePath}?page=${page}`}
                className="px-3 py-2 text-sm rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                {page}
              </a>
            )}
          </li>
        ))}

        {/* Next */}
        <li>
          {currentPage < totalPages ? (
            <a
              href={`${basePath}?page=${currentPage + 1}`}
              className="px-3 py-2 text-sm rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50"
              rel="next"
            >
              Successiva →
            </a>
          ) : (
            <span className="px-3 py-2 text-sm rounded-md border border-gray-100 text-gray-300 cursor-not-allowed">
              Successiva →
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
