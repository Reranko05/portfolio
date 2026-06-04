"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, ExternalLink } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/shared/SocialIcons";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Overview" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/oss", label: "OSS" },
  { href: "/resume", label: "Resume" },
];

const externalLinks = [
  {
    href: "https://github.com/Reranko05",
    label: "GitHub",
    icon: GithubIcon,
  },
  {
    href: "https://linkedin.com/in/aaditya-srinivasan03",
    label: "LinkedIn",
    icon: LinkedinIcon,
  },
  {
    href: "/resume.pdf",
    label: "Resume",
    icon: FileText,
  },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        backgroundColor: "var(--color-gh-canvas)",
        borderBottom: "1px solid var(--color-gh-border)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        {/* Left: Site identity */}
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-sm font-semibold hover:no-underline"
          style={{ color: "var(--color-gh-text)" }}
        >
          <span
            className="inline-flex items-center justify-center w-7 h-7 rounded-md text-xs font-bold"
            style={{
              backgroundColor: "var(--color-gh-accent)",
              color: "var(--color-gh-canvas)",
            }}
          >
            AS
          </span>
          <span className="hidden sm:block">Aaditya Srinivasan</span>
        </Link>

        {/* Center: Primary nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
          {navLinks.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-100 hover:no-underline",
                  isActive
                    ? "text-[var(--color-gh-text)]"
                    : "text-[var(--color-gh-text-muted)] hover:text-[var(--color-gh-text)]"
                )}
                style={
                  isActive
                    ? { backgroundColor: "var(--color-gh-elevated)" }
                    : undefined
                }
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right: External links */}
        <div className="flex items-center gap-1">
          {externalLinks.map(({ href, label, icon: Icon }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              title={label}
              className="p-2 rounded-md transition-colors duration-100 hover:no-underline"
              style={{ color: "var(--color-gh-text-muted)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  "var(--color-gh-text)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  "var(--color-gh-text-muted)")
              }
            >
              <Icon size={18} strokeWidth={1.75} />
              <span className="sr-only">{label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Mobile nav */}
      <div
        className="md:hidden flex overflow-x-auto px-4 pb-2 gap-1"
        style={{ scrollbarWidth: "none" }}
      >
        {navLinks.map(({ href, label }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex-shrink-0 px-3 py-1 rounded-md text-sm font-medium transition-colors hover:no-underline",
                isActive
                  ? "text-[var(--color-gh-text)]"
                  : "text-[var(--color-gh-text-muted)]"
              )}
              style={
                isActive
                  ? { backgroundColor: "var(--color-gh-elevated)" }
                  : undefined
              }
            >
              {label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
