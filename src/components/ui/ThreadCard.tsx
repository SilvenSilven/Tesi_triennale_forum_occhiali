import Link from "next/link";

type ThreadCardProps = {
  id: string;
  title: string;
  slug: string;
  authorName: string;
  createdAt: string;
  replyCount: number;
  viewCount: number;
  categorySlug: string;
  tags?: string[];
};

export default function ThreadCard({
  title,
  slug,
  authorName,
  createdAt,
  replyCount,
  viewCount,
  categorySlug,
  tags = [],
}: ThreadCardProps) {
  return (
    <article
      className="border-b border-gray-100 py-4 px-2 hover:bg-gray-50 transition-colors"
      data-component="thread-card"
      data-thread-slug={slug}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900">
            <Link href={`/${categorySlug}/thread/${slug}`} className="hover:text-blue-700 transition-colors">
              {title}
            </Link>
          </h3>
          <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-gray-500">
            <span data-author>{authorName}</span>
            <span>·</span>
            <time dateTime={createdAt}>{new Date(createdAt).toLocaleDateString("it-IT")}</time>
            {tags.length > 0 && (
              <>
                <span>·</span>
                {tags.map((tag) => (
                  <span key={tag} className="px-1.5 py-0.5 bg-gray-100 rounded text-xs text-gray-500" data-tag={tag}>
                    {tag}
                  </span>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="flex gap-4 text-xs text-gray-400 flex-shrink-0">
          <span data-replies title="Risposte">{replyCount} 💬</span>
          <span data-views title="Visualizzazioni">{viewCount} 👁</span>
        </div>
      </div>
    </article>
  );
}
