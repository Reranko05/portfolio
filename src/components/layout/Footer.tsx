import Link from "next/link";
import { GithubIcon } from "@/components/shared/SocialIcons";

export function Footer() {
  return (
    <footer
      className="mt-16 py-8"
      style={{ borderTop: "1px solid var(--color-gh-border)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm" style={{ color: "var(--color-gh-text-muted)" }}>
          © {new Date().getFullYear()} Aaditya Srinivasan. Built with Next.js.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/Reranko05"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm hover:no-underline transition-colors"
            style={{ color: "var(--color-gh-text-muted)" }}
          >
            <GithubIcon size={15} />
            Reranko05
          </Link>
          <span style={{ color: "var(--color-gh-border)" }}>·</span>
          <Link
            href="/resume"
            className="text-sm transition-colors hover:no-underline"
            style={{ color: "var(--color-gh-text-muted)" }}
          >
            Resume
          </Link>
        </div>
      </div>
    </footer>
  );
}
