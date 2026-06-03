import type { Metadata } from "next";
import { getAllProjects } from "@/lib/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Systems and backend projects — databases, APIs, infrastructure, and open source work.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1
          className="text-2xl font-bold mb-2"
          style={{ color: "var(--color-gh-text)" }}
        >
          Projects
        </h1>
        <p className="text-sm" style={{ color: "var(--color-gh-text-muted)" }}>
          Things I've built — from C++ database servers to compliance automation platforms.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
