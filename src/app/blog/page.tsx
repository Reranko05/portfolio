import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { BlogList } from "@/components/blog/BlogList";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical writing on systems programming, open source, and backend engineering.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-2xl font-bold mb-2"
          style={{ color: "var(--color-gh-text)" }}
        >
          Blog
        </h1>
        <p className="text-sm" style={{ color: "var(--color-gh-text-muted)" }}>
          Dispatches from the systems programming trenches. Irregular cadence, permanent value.
        </p>
      </div>

      <BlogList posts={posts} tags={tags} />
    </div>
  );
}
