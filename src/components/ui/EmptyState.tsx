type EmptyStateProps = {
  icon?: string;
  title: string;
  message: string;
};

export default function EmptyState({ icon = "📭", title, message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center" data-component="empty-state">
      <span className="text-5xl mb-4" aria-hidden="true">{icon}</span>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 max-w-md">{message}</p>
    </div>
  );
}
