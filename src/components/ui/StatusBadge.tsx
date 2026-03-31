type StatusBadgeProps = {
  status: "ACTIVE" | "DISABLED" | "COMING_SOON" | "ARCHIVED";
};

const config: Record<string, { label: string; className: string }> = {
  ACTIVE: {
    label: "Attivo",
    className: "bg-green-100 text-green-800",
  },
  DISABLED: {
    label: "Non disponibile",
    className: "bg-gray-100 text-gray-500",
  },
  COMING_SOON: {
    label: "In arrivo",
    className: "bg-amber-100 text-amber-800",
  },
  ARCHIVED: {
    label: "Archiviato",
    className: "bg-slate-100 text-slate-600",
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { label, className } = config[status] ?? config.DISABLED;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}
      data-status={status}
    >
      {label}
    </span>
  );
}
