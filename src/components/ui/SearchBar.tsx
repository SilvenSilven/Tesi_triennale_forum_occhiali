type SearchBarProps = {
  placeholder?: string;
  action?: string;
};

export default function SearchBar({
  placeholder = "Cerca nel forum...",
  action = "/cerca",
}: SearchBarProps) {
  return (
    <form action={action} method="GET" role="search" className="w-full" data-component="search-bar">
      <div className="relative">
        <input
          type="search"
          name="q"
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 pl-11 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 transition-colors"
          aria-label="Cerca nel forum"
        />
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true">
          🔍
        </span>
      </div>
    </form>
  );
}
