import Link from "next/link";
import { Star, GitFork, ExternalLink, Clock, ArrowRight } from "lucide-react";
import { getFeaturedProjects } from "@/lib/data/projects";
import { LanguageDot } from "@/components/shared/SkillBadge";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { getRelativeTime } from "@/lib/utils";

export function FeaturedProjects() {
  const projects = getFeaturedProjects();

  return (
    <section>
      <SectionHeader
        title="📦 Featured Projects"
        description="Things I've shipped."
        action={
          <Link
            href="/projects"
            className="flex items-center gap-1 text-sm hover:no-underline transition-colors"
            style={{ color: "var(--color-gh-accent)" }}
          >
            View all
            <ArrowRight size={14} />
          </Link>
        }
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
}: {
  project: ReturnType<typeof getFeaturedProjects>[number];
}) {
  return (
    <div
      className="flex flex-col p-4 rounded-lg transition-colors duration-150 hover:cursor-pointer group"
      style={{
        backgroundColor: "var(--color-gh-surface)",
        border: "1px solid var(--color-gh-border)",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <Link
          href={`/projects/${project.slug}`}
          className="flex items-center gap-1.5 font-medium text-sm hover:no-underline group-hover:underline"
          style={{ color: "var(--color-gh-accent)" }}
        >
          {project.name}
        </Link>
        {project.featured && (
          <span
            className="text-xs px-1.5 py-0.5 rounded-full flex-shrink-0"
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

      {/* Description */}
      <p
        className="text-xs leading-relaxed flex-1 mb-3"
        style={{ color: "var(--color-gh-text-muted)" }}
      >
        {project.description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.technologies.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: "var(--color-gh-elevated)",
              border: "1px solid var(--color-gh-border-muted)",
              color: "var(--color-gh-text-muted)",
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-2" style={{ borderTop: "1px solid var(--color-gh-border-muted)" }}>
        <div className="flex items-center gap-3">
          <LanguageDot name={project.language} color={project.languageColor} />
          <span className="flex items-center gap-1 text-xs" style={{ color: "var(--color-gh-text-muted)" }}>
            <Star size={12} />
            {project.stars}
          </span>
          <span className="flex items-center gap-1 text-xs" style={{ color: "var(--color-gh-text-muted)" }}>
            <GitFork size={12} />
            {project.forks}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs" style={{ color: "var(--color-gh-text-subtle)" }}>
          <Clock size={11} />
          {getRelativeTime(project.lastUpdated)}
        </div>
      </div>

      {/* Links */}
      <div className="flex gap-2 mt-3">
        <Link
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 text-xs py-1.5 rounded-md transition-colors hover:no-underline"
          style={{
            backgroundColor: "var(--color-gh-elevated)",
            border: "1px solid var(--color-gh-border)",
            color: "var(--color-gh-text-muted)",
          }}
        >
          <ExternalLink size={12} />
          GitHub
        </Link>
        {project.demoUrl && (
          <Link
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 text-xs py-1.5 rounded-md transition-colors hover:no-underline"
            style={{
              backgroundColor: "var(--color-gh-accent-muted)",
              border: "1px solid var(--color-gh-accent-emphasis)",
              color: "var(--color-gh-accent)",
            }}
          >
            <ExternalLink size={12} />
            Demo
          </Link>
        )}
      </div>
    </div>
  );
}
