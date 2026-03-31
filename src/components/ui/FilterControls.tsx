type FilterControlsProps = {
  basePath?: string;
};

export default function FilterControls({ basePath = "" }: FilterControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3" data-component="filter-controls">
      {/* Tag filter */}
      <div className="flex items-center gap-1.5">
        <label htmlFor="filter-tag" className="text-xs text-gray-500 font-medium">
          Tag:
        </label>
        <select
          id="filter-tag"
          name="tag"
          className="text-xs border border-gray-200 rounded-md px-2 py-1.5 text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-gray-400"
          defaultValue=""
        >
          <option value="">Tutti</option>
        </select>
      </div>

      {/* Brand filter */}
      <div className="flex items-center gap-1.5">
        <label htmlFor="filter-brand" className="text-xs text-gray-500 font-medium">
          Brand:
        </label>
        <select
          id="filter-brand"
          name="brand"
          className="text-xs border border-gray-200 rounded-md px-2 py-1.5 text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-gray-400"
          defaultValue=""
        >
          <option value="">Tutti</option>
        </select>
      </div>

      {/* Price range filter */}
      <div className="flex items-center gap-1.5">
        <label htmlFor="filter-price" className="text-xs text-gray-500 font-medium">
          Prezzo:
        </label>
        <select
          id="filter-price"
          name="price"
          className="text-xs border border-gray-200 rounded-md px-2 py-1.5 text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-gray-400"
          defaultValue=""
        >
          <option value="">Qualsiasi</option>
          <option value="0-50">€0 – €50</option>
          <option value="50-100">€50 – €100</option>
          <option value="100-200">€100 – €200</option>
          <option value="200+">€200+</option>
        </select>
      </div>
    </div>
  );
}
