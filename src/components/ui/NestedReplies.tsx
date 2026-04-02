import type { NestedPost } from "@/lib/threads";
import { formatDateTime } from "@/lib/utils";

function PostCard({ post, depth = 0 }: { post: NestedPost; depth?: number }) {
  return (
    <div
      className={`${depth > 0 ? "ml-6 border-l-2 border-gray-100 pl-4" : ""}`}
    >
      <div className="py-3">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
          <span className="font-medium text-gray-700">{post.author.username}</span>
          <span>{formatDateTime(post.createdAt)}</span>
        </div>
        {post.models.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-1">
            {post.models.map((model) => (
              <span
                key={model}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-blue-50 text-blue-600"
              >
                {model}
              </span>
            ))}
          </div>
        )}
        <div className="text-sm text-gray-700">
          <p>{post.content}</p>
        </div>
      </div>
      {post.children.length > 0 && (
        <div>
          {post.children.map((child) => (
            <PostCard key={child.id} post={child as NestedPost} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function NestedReplies({ posts }: { posts: NestedPost[] }) {
  return (
    <div className="space-y-1">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} depth={0} />
      ))}
    </div>
  );
}
