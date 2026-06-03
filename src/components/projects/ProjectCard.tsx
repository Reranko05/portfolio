import Link from "next/link";
import {
  Star,
  GitFork,
  ExternalLink,
  Clock,
  BookOpen,
} from "lucide-react";
import type { Project } from "@/types/project";
import { LanguageDot, SkillBadge } from "@/components/shared/SkillBadge";
import GitHubRepoBadge from '@/components/github/GitHubRepoBadge'
import { getRelativeTime } from "@/lib/utils";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className="flex flex-col p-5 rounded-lg group transition-all duration-150"
      style={{
        backgroundColor: "var(--color-gh-surface)",
        border: "1px solid var(--color-gh-border)",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <BookOpen size={16} style={{ color: "var(--color-gh-accent)" }} />
          <Link
            href={`/projects/${project.slug}`}
            className="font-semibold text-sm hover:no-underline group-hover:underline"
            style={{ color: "var(--color-gh-accent)" }}
          >
            {project.name}
          </Link>
        </div>
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

      {/* Description */}
      <p
        className="text-sm leading-relaxed flex-1 mb-4"
        style={{ color: "var(--color-gh-text-muted)" }}
      >
        {project.description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.technologies.map((tech) => (
          <SkillBadge key={tech} label={tech} />
        ))}
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between pt-3"
        style={{ borderTop: "1px solid var(--color-gh-border-muted)" }}
      >
        <div className="flex items-center gap-4">
          <LanguageDot name={project.language} color={project.languageColor} />
          <GitHubRepoBadge githubUrl={project.githubUrl} />
        </div>
        <div
          className="flex items-center gap-1 text-xs"
          style={{ color: "var(--color-gh-text-subtle)" }}
        >
          <Clock size={11} />
          Updated {getRelativeTime(project.lastUpdated)}
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
          View on GitHub
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
            Live Demo
          </Link>
        )}
      </div>
    </div>
  );
}
