import Link from "next/link";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { getFeaturedPosts } from "@/lib/blog";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { formatDateShort } from "@/lib/utils";

export function RecentBlogPosts() {
  const posts = getFeaturedPosts().slice(0, 3);

  return (
    <section>
      <SectionHeader
        title="✍️ Recent Posts"
        description="Technical writing from the trenches."
        action={
          <Link
            href="/blog"
            className="flex items-center gap-1 text-sm hover:no-underline"
            style={{ color: "var(--color-gh-accent)" }}
          >
            All posts <ArrowRight size={14} />
          </Link>
        }
      />
      <div className="space-y-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block p-4 rounded-lg transition-colors hover:no-underline group"
            style={{
              backgroundColor: "var(--color-gh-surface)",
              border: "1px solid var(--color-gh-border)",
            }}
          >
            <h3
              className="text-sm font-semibold mb-1 group-hover:text-[var(--color-gh-accent)] transition-colors"
              style={{ color: "var(--color-gh-text)" }}
            >
              {post.title}
            </h3>
            <p
              className="text-xs leading-relaxed mb-3 line-clamp-2"
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
                  <Calendar size={11} />
                  {formatDateShort(post.date)}
                </span>
                <span
                  className="flex items-center gap-1 text-xs"
                  style={{ color: "var(--color-gh-text-subtle)" }}
                >
                  <Clock size={11} />
                  {post.readingTime}
                </span>
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: "var(--color-gh-accent-muted)",
                      color: "var(--color-gh-accent)",
                    }}
                  >
                    <Tag size={9} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
