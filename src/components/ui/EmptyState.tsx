type EmptyStateProps = {
  icon?: string;
  title: string;
  message: string;
};

export default function EmptyState({ icon = "—", title, message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center" data-component="empty-state">
      <span className="text-2xl mb-8 font-light text-zinc-300 select-none" aria-hidden="true">{icon}</span>
      <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-900 mb-4">{title}</h3>
      <p className="text-sm font-light text-zinc-500 max-w-sm leading-relaxed">{message}</p>
    </div>
  );
}
