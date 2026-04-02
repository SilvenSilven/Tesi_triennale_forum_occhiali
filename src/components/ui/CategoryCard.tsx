import Link from "next/link";
import StatusBadge from "./StatusBadge";
import type { CategoryDef } from "@/lib/categories";

type CategoryCardProps = {
  category: CategoryDef;
  threadCount?: number;
  postCount?: number;
};

export default function CategoryCard({ category, threadCount = 0, postCount = 0 }: CategoryCardProps) {
  const isActive = category.status === "ACTIVE";

  const content = (
    <div
      className={`relative p-8 transition-all h-full ${
        isActive
          ? "bg-white hover:bg-zinc-50 cursor-pointer"
          : "bg-zinc-50 cursor-not-allowed opacity-60"
      }`}
      data-category={category.slug}
      data-status={category.status}
    >
      <div className="flex flex-col h-full justify-between gap-12">
        {/* Top Info */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-2xl font-light tracking-tight ${isActive ? "text-zinc-900" : "text-zinc-400"}`}>
                {category.name}
              </h3>
            </div>
            <p className={`text-sm font-light leading-relaxed max-w-sm ${isActive ? "text-zinc-500" : "text-zinc-400"}`}>
              {category.description}
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <span className="text-3xl font-light text-zinc-200 select-none" aria-hidden="true">
              {category.icon}
            </span>
            <div className="mt-2 scale-75 origin-top-right">
              <StatusBadge status={category.status} />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 text-[10px] font-mono uppercase tracking-widest text-zinc-400 border-t border-zinc-200 pt-6">
          <span data-stat="threads"><span className="text-zinc-900 font-medium mr-2">{threadCount}</span>Threads</span>
          <span data-stat="posts"><span className="text-zinc-900 font-medium mr-2">{postCount}</span>Replies</span>
        </div>
      </div>

      {/* Disabled overlay label */}
      {!isActive && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="sr-only">Sezione non ancora disponibile</span>
        </div>
      )}
    </div>
  );

  if (isActive) {
    return (
      <Link href={`/${category.slug}`} className="block h-full">
        {content}
      </Link>
    );
  }

  return (
    <div aria-disabled="true" role="link" tabIndex={-1} className="h-full">
      {content}
    </div>
  );
}
