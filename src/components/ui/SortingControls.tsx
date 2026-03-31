type SortOption = {
  value: string;
  label: string;
};

type SortingControlsProps = {
  options?: SortOption[];
  currentSort?: string;
  basePath?: string;
};

const defaultOptions: SortOption[] = [
  { value: "recenti", label: "Più recenti" },
  { value: "commentati", label: "Più commentati" },
  { value: "visualizzati", label: "Più visualizzati" },
];

export default function SortingControls({
  options = defaultOptions,
  currentSort = "recenti",
  basePath = "",
}: SortingControlsProps) {
  return (
    <div className="flex items-center gap-2" data-component="sorting-controls">
      <span className="text-xs text-gray-500 font-medium">Ordina per:</span>
      <div className="flex gap-1">
        {options.map((option) => {
          const isActive = currentSort === option.value;
          return isActive ? (
            <span
              key={option.value}
              className="px-3 py-1.5 text-xs font-medium rounded-md bg-gray-900 text-white"
              aria-current="true"
            >
              {option.label}
            </span>
          ) : (
            <a
              key={option.value}
              href={`${basePath}?sort=${option.value}`}
              className="px-3 py-1.5 text-xs font-medium rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              {option.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
