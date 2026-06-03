import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { BlogPost } from "@/types/blog";

interface ArticleNavProps {
  prev: BlogPost | null;
  next: BlogPost | null;
}

export function ArticleNav({ prev, next }: ArticleNavProps) {
  return (
    <nav
      className="flex items-center justify-between gap-4 pt-6 mt-8"
      style={{ borderTop: "1px solid var(--color-gh-border)" }}
      aria-label="Article navigation"
    >
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="flex items-center gap-2 group max-w-[45%] hover:no-underline"
        >
          <ChevronLeft
            size={16}
            className="flex-shrink-0"
            style={{ color: "var(--color-gh-text-muted)" }}
          />
          <div>
            <p
              className="text-xs mb-0.5"
              style={{ color: "var(--color-gh-text-muted)" }}
            >
              Previous
            </p>
            <p
              className="text-sm font-medium group-hover:text-[var(--color-gh-accent)] transition-colors line-clamp-2"
              style={{ color: "var(--color-gh-text)" }}
            >
              {prev.title}
            </p>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="flex items-center gap-2 group max-w-[45%] text-right ml-auto hover:no-underline"
        >
          <div>
            <p
              className="text-xs mb-0.5"
              style={{ color: "var(--color-gh-text-muted)" }}
            >
              Next
            </p>
            <p
              className="text-sm font-medium group-hover:text-[var(--color-gh-accent)] transition-colors line-clamp-2"
              style={{ color: "var(--color-gh-text)" }}
            >
              {next.title}
            </p>
          </div>
          <ChevronRight
            size={16}
            className="flex-shrink-0"
            style={{ color: "var(--color-gh-text-muted)" }}
          />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
