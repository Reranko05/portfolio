import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, ChevronLeft, Tag } from "lucide-react";
import { getAllSlugs, getPostBySlug, getAdjacentPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { ReadingProgressBar } from "@/components/blog/ReadingProgressBar";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ArticleNav } from "@/components/blog/ArticleNav";
import { CopyLinkButton } from "@/components/blog/CopyLinkButton";
import { ScrollToTop } from "@/components/blog/ScrollToTop";

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const result = getPostBySlug(slug);
  if (!result) return {};
  return {
    title: result.frontmatter.title,
    description: result.frontmatter.description,
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const result = getPostBySlug(slug);

  if (!result) notFound();

  const { frontmatter, content } = result;
  const { prev, next } = getAdjacentPosts(slug);

  // Dynamically import the MDX component
  const { default: PostContent } = await import(
    `@/../content/blog/${slug}.mdx`
  );

  return (
    <>
      <ReadingProgressBar />
      <ScrollToTop />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex gap-10">
          {/* Main content */}
          <main className="flex-1 min-w-0 max-w-3xl">
            {/* Breadcrumb */}
            <Link
              href="/blog"
              className="flex items-center gap-1 text-sm mb-6 hover:no-underline"
              style={{ color: "var(--color-gh-text-muted)" }}
            >
              <ChevronLeft size={15} />
              Back to Blog
            </Link>

            {/* Article header */}
            <header className="mb-8">
              <h1
                className="text-3xl font-bold leading-tight mb-3"
                style={{ color: "var(--color-gh-text)" }}
              >
                {frontmatter.title}
              </h1>

              <p
                className="text-base mb-4"
                style={{ color: "var(--color-gh-text-muted)" }}
              >
                {frontmatter.description}
              </p>

              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-4">
                  <span
                    className="flex items-center gap-1.5 text-sm"
                    style={{ color: "var(--color-gh-text-muted)" }}
                  >
                    <Calendar size={14} />
                    {formatDate(frontmatter.date)}
                  </span>
                  <span
                    className="flex items-center gap-1.5 text-sm"
                    style={{ color: "var(--color-gh-text-muted)" }}
                  >
                    <Clock size={14} />
                    {frontmatter.readingTime}
                  </span>
                </div>
                <CopyLinkButton />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: "var(--color-gh-elevated)",
                      border: "1px solid var(--color-gh-border)",
                      color: "var(--color-gh-text-muted)",
                    }}
                  >
                    <Tag size={10} />
                    {tag}
                  </span>
                ))}
              </div>

              <hr className="mt-6" style={{ borderColor: "var(--color-gh-border)" }} />
            </header>

            {/* Article content */}
            <article className="prose">
              <PostContent />
            </article>

            {/* Article navigation */}
            <ArticleNav prev={prev} next={next} />
          </main>

          {/* TOC sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-20">
              <TableOfContents content={content} />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
