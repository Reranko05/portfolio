import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronLeft,
  Star,
  GitFork,
  ExternalLink,
  Clock,
} from "lucide-react";
import { getAllProjects, getProjectBySlug } from "@/lib/data/projects";
import { LanguageDot, SkillBadge } from "@/components/shared/SkillBadge";
import { getRelativeTime } from "@/lib/utils";

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return { title: project.name, description: project.description };
}

export default async function ProjectDetailPage(
  props: PageProps<"/projects/[slug]">
) {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Link
        href="/projects"
        className="flex items-center gap-1 text-sm mb-6 hover:no-underline"
        style={{ color: "var(--color-gh-text-muted)" }}
      >
        <ChevronLeft size={15} />
        All Projects
      </Link>

      {/* Hero card */}
      <div
        className="p-6 rounded-lg mb-6"
        style={{
          backgroundColor: "var(--color-gh-surface)",
          border: "1px solid var(--color-gh-border)",
        }}
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <h1
            className="text-2xl font-bold"
            style={{ color: "var(--color-gh-text)" }}
          >
            {project.name}
          </h1>
          {project.featured && (
            <span
              className="flex-shrink-0 text-xs px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: "var(--color-gh-warning-muted)",
                color: "var(--color-gh-warning)",
                border: "1px solid var(--color-gh-warning)",
              }}
            >
              Featured
            </span>
          )}
        </div>

        <p
          className="text-sm mb-4"
          style={{ color: "var(--color-gh-text-muted)" }}
        >
          {project.description}
        </p>

        <div className="flex items-center gap-5 flex-wrap mb-4">
          <LanguageDot name={project.language} color={project.languageColor} />
          <span
            className="flex items-center gap-1 text-sm"
            style={{ color: "var(--color-gh-text-muted)" }}
          >
            <Star size={14} />
            {project.stars} stars
          </span>
          <span
            className="flex items-center gap-1 text-sm"
            style={{ color: "var(--color-gh-text-muted)" }}
          >
            <GitFork size={14} />
            {project.forks} forks
          </span>
          <span
            className="flex items-center gap-1 text-sm"
            style={{ color: "var(--color-gh-text-subtle)" }}
          >
            <Clock size={13} />
            Updated {getRelativeTime(project.lastUpdated)}
          </span>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-md text-sm transition-colors hover:no-underline"
            style={{
              backgroundColor: "var(--color-gh-elevated)",
              border: "1px solid var(--color-gh-border)",
              color: "var(--color-gh-text)",
            }}
          >
            <ExternalLink size={14} />
            View on GitHub
          </Link>
          {project.demoUrl && (
            <Link
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-md text-sm transition-colors hover:no-underline"
              style={{
                backgroundColor: "var(--color-gh-accent-muted)",
                border: "1px solid var(--color-gh-accent-emphasis)",
                color: "var(--color-gh-accent)",
              }}
            >
              <ExternalLink size={14} />
              Live Demo
            </Link>
          )}
        </div>
      </div>

      {/* Tech Stack */}
      <section className="mb-6">
        <h2
          className="text-sm font-semibold uppercase tracking-wider mb-3"
          style={{ color: "var(--color-gh-text-subtle)" }}
        >
          Technologies
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <SkillBadge key={tech} label={tech} />
          ))}
        </div>
      </section>

      {/* Description */}
      <section
        className="p-6 rounded-lg"
        style={{
          backgroundColor: "var(--color-gh-surface)",
          border: "1px solid var(--color-gh-border)",
        }}
      >
        <h2
          className="text-base font-semibold mb-4"
          style={{ color: "var(--color-gh-text)" }}
        >
          About this project
        </h2>
        {project.longDescription.split("\n\n").map((para, i) => (
          <p
            key={i}
            className="text-sm leading-relaxed mb-3"
            style={{ color: "var(--color-gh-text-muted)" }}
          >
            {para}
          </p>
        ))}
      </section>
    </div>
  );
}
