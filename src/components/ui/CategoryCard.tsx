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
      className={`relative rounded-lg border p-5 transition-all ${
        isActive
          ? "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm cursor-pointer"
          : "border-gray-100 bg-gray-50 opacity-75 cursor-not-allowed"
      }`}
      data-category={category.slug}
      data-status={category.status}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <span className="text-3xl flex-shrink-0" aria-hidden="true">
          {category.icon}
        </span>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`text-base font-semibold ${isActive ? "text-gray-900" : "text-gray-400"}`}>
              {category.name}
            </h3>
            <StatusBadge status={category.status} />
          </div>
          <p className={`text-sm line-clamp-2 ${isActive ? "text-gray-600" : "text-gray-400"}`}>
            {category.description}
          </p>

          {/* Placeholder stats */}
          <div className="flex gap-4 mt-3 text-xs text-gray-400">
            <span data-stat="threads">{threadCount} discussioni</span>
            <span data-stat="posts">{postCount} messaggi</span>
          </div>
        </div>
      </div>

      {/* Disabled overlay label */}
      {!isActive && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg">
          <span className="sr-only">Sezione non ancora disponibile</span>
        </div>
      )}
    </div>
  );

  if (isActive) {
    return (
      <Link href={`/${category.slug}`} className="block">
        {content}
      </Link>
    );
  }

  return (
    <div aria-disabled="true" role="link" tabIndex={-1}>
      {content}
    </div>
  );
}
