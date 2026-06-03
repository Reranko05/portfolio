import Link from "next/link";
import { Calendar, Clock, Tag } from "lucide-react";
import type { BlogPost } from "@/types/blog";
import { formatDateShort } from "@/lib/utils";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block p-5 rounded-lg transition-all duration-150 hover:no-underline group"
      style={{
        backgroundColor: "var(--color-gh-surface)",
        border: "1px solid var(--color-gh-border)",
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h2
          className="text-base font-semibold leading-snug group-hover:text-[var(--color-gh-accent)] transition-colors"
          style={{ color: "var(--color-gh-text)" }}
        >
          {post.title}
        </h2>
        {post.featured && (
          <span
            className="flex-shrink-0 text-xs px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: "var(--color-gh-accent-muted)",
              color: "var(--color-gh-accent)",
              border: "1px solid var(--color-gh-accent-emphasis)",
            }}
          >
            Featured
          </span>
        )}
      </div>

      <p
        className="text-sm leading-relaxed mb-4 line-clamp-2"
        style={{ color: "var(--color-gh-text-muted)" }}
      >
        {post.description}
      </p>

      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <span
            className="flex items-center gap-1 text-xs"
            style={{ color: "var(--color-gh-text-subtle)" }}
          >
            <Calendar size={12} />
            {formatDateShort(post.date)}
          </span>
          <span
            className="flex items-center gap-1 text-xs"
            style={{ color: "var(--color-gh-text-subtle)" }}
          >
            <Clock size={12} />
            {post.readingTime}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: "var(--color-gh-elevated)",
                border: "1px solid var(--color-gh-border)",
                color: "var(--color-gh-text-muted)",
              }}
            >
              <Tag size={9} />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
