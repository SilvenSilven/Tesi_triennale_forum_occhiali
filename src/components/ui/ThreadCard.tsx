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
      className="group block border-b border-zinc-200 hover:bg-zinc-50 transition-all duration-300 py-6 px-4"
      data-component="thread-card"
      data-thread-slug={slug}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8">
        <div className="flex-1 min-w-0">
          <Link href={`/${categorySlug}/thread/${slug}`} className="block">
            <h3 className="text-base md:text-lg font-medium text-zinc-900 tracking-tight leading-snug group-hover:text-zinc-600 transition-colors mb-2">
              {title}
            </h3>
          </Link>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-mono uppercase tracking-wider text-zinc-400 mt-2">
            <span className="text-zinc-700 font-medium" data-author>@{authorName}</span>
            <time dateTime={createdAt}>{new Date(createdAt).toLocaleDateString("it-IT")}</time>
            {tags.length > 0 && (
              <>
                {tags.map((tag) => (
                  <span key={tag} className="text-zinc-800 before:content-['—'] before:mr-4 before:text-zinc-300" data-tag={tag}>
                    {tag}
                  </span>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-6 shrink-0 md:border-l border-zinc-200 md:pl-8 text-right">
          <div className="flex flex-col items-end">
            <span className="text-base font-medium text-zinc-900" data-replies>{replyCount}</span>
            <span className="text-[9px] font-mono tracking-widest uppercase text-zinc-400">Replies</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-base font-medium text-zinc-700" data-views>{viewCount}</span>
            <span className="text-[9px] font-mono tracking-widest uppercase text-zinc-400">Views</span>
          </div>
        </div>
      </div>
    </article>
  );
}
