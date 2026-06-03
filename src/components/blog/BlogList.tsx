"use client";

import { useState, useMemo } from "react";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogSearch } from "@/components/blog/BlogSearch";
import { TagFilter } from "@/components/blog/TagFilter";
import { Pagination } from "@/components/blog/Pagination";
import type { BlogPost } from "@/types/blog";

const POSTS_PER_PAGE = 6;

interface BlogListProps {
  posts: BlogPost[];
  tags: string[];
}

export function BlogList({ posts, tags }: BlogListProps) {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = posts;
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (selectedTags.length > 0) {
      result = result.filter((p) =>
        selectedTags.every((t) => p.tags.includes(t))
      );
    }
    return result;
  }, [posts, query, selectedTags]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  function handleSearch(q: string) {
    setQuery(q);
    setPage(1);
  }

  function handleTagToggle(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    setPage(1);
  }

  return (
    <div>
      {/* Search + filters */}
      <div className="space-y-3 mb-8">
        <BlogSearch onSearch={handleSearch} />
        <TagFilter
          tags={tags}
          selected={selectedTags}
          onToggle={handleTagToggle}
        />
      </div>

      {/* Results */}
      {paginated.length === 0 ? (
        <div
          className="text-center py-16"
          style={{ color: "var(--color-gh-text-muted)" }}
        >
          <p className="text-lg font-medium mb-2">No posts found</p>
          <p className="text-sm">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <>
          <p
            className="text-xs mb-4"
            style={{ color: "var(--color-gh-text-muted)" }}
          >
            {filtered.length} post{filtered.length !== 1 ? "s" : ""}
          </p>
          <div className="space-y-4">
            {paginated.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
