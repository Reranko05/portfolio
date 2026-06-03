import type { Metadata } from "next";
import Link from "next/link";
import { Download, GitCommit, ExternalLink, MapPin } from "lucide-react";
import { resumeData } from "@/lib/data/resume";
import { SkillBadge } from "@/components/shared/SkillBadge";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Aaditya Srinivasan's professional resume — backend engineer specializing in systems and infrastructure.",
};

export default function ResumePage() {
  const r = resumeData;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Download CTA */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <div>
          <h1
            className="text-2xl font-bold mb-1"
            style={{ color: "var(--color-gh-text)" }}
          >
            Résumé
          </h1>
          <p className="text-sm" style={{ color: "var(--color-gh-text-muted)" }}>
            Backend Engineer. Systems builder. OSS contributor.
          </p>
        </div>
        <Link
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium hover:no-underline transition-colors"
          style={{
            backgroundColor: "var(--color-gh-accent)",
            color: "var(--color-gh-canvas)",
          }}
        >
          <Download size={15} />
          Download PDF
        </Link>
      </div>

      {/* README-style card */}
      <div
        className="rounded-lg overflow-hidden"
        style={{
          backgroundColor: "var(--color-gh-surface)",
          border: "1px solid var(--color-gh-border)",
        }}
      >
        {/* Header bar */}
        <div
          className="flex items-center gap-2 px-4 py-2 text-xs font-mono"
          style={{
            backgroundColor: "var(--color-gh-elevated)",
            borderBottom: "1px solid var(--color-gh-border)",
            color: "var(--color-gh-text-muted)",
          }}
        >
          <span style={{ color: "var(--color-gh-success)" }}>●</span>
          resume.md
        </div>

        <div className="p-6 space-y-8">
          {/* Personal info */}
          <section>
            <h2 className="text-xl font-bold mb-1" style={{ color: "var(--color-gh-text)" }}>
              {r.name}
            </h2>
            <p className="text-base font-mono" style={{ color: "var(--color-gh-accent)" }}>
              {r.title}
            </p>
            <div className="flex items-center gap-4 mt-2 flex-wrap">
              <span className="flex items-center gap-1 text-sm" style={{ color: "var(--color-gh-text-muted)" }}>
                <MapPin size={13} />
                {r.location}
              </span>
              <Link
                href={`https://${r.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm hover:no-underline"
                style={{ color: "var(--color-gh-accent)" }}
              >
                <GitCommit size={13} />
                {r.github}
              </Link>
              <Link
                href={`https://${r.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm hover:no-underline"
                style={{ color: "var(--color-gh-accent)" }}
              >
                <ExternalLink size={13} />
                {r.linkedin}
              </Link>
            </div>
          </section>

          <Divider />

          {/* Experience */}
          <section>
            <SectionTitle>Experience</SectionTitle>
            <div className="space-y-6">
              {r.experience.map((exp) => (
                <div key={exp.company}>
                  <div className="flex items-start justify-between flex-wrap gap-1 mb-2">
                    <div>
                      <p className="font-semibold text-sm" style={{ color: "var(--color-gh-text)" }}>
                        {exp.role}
                      </p>
                      <p className="text-sm" style={{ color: "var(--color-gh-accent)" }}>
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-mono" style={{ color: "var(--color-gh-text-muted)" }}>
                        {exp.period}
                      </p>
                      <p className="text-xs" style={{ color: "var(--color-gh-text-subtle)" }}>
                        {exp.location}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-1">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-gh-text-muted)" }}>
                        <span style={{ color: "var(--color-gh-success)", flexShrink: 0 }}>▸</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* Education */}
          <section>
            <SectionTitle>Education</SectionTitle>
            {r.education.map((edu) => (
              <div key={edu.institution}>
                <div className="flex items-start justify-between flex-wrap gap-1">
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "var(--color-gh-text)" }}>
                      {edu.degree}
                    </p>
                    <p className="text-sm" style={{ color: "var(--color-gh-accent)" }}>
                      {edu.institution}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-mono" style={{ color: "var(--color-gh-text-muted)" }}>
                      {edu.period}
                    </p>
                    <p className="text-xs" style={{ color: "var(--color-gh-success)" }}>
                      GPA {edu.gpa}
                    </p>
                  </div>
                </div>
                <p className="text-xs mt-2" style={{ color: "var(--color-gh-text-muted)" }}>
                  Relevant: {edu.relevantCourses.join(", ")}
                </p>
              </div>
            ))}
          </section>

          <Divider />

          {/* Skills */}
          <section>
            <SectionTitle>Skills</SectionTitle>
            <div className="space-y-4">
              {Object.entries(r.skills).map(([category, items]) => (
                <div key={category}>
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-2"
                    style={{ color: "var(--color-gh-text-subtle)" }}
                  >
                    {category.replace(/([A-Z])/g, " $1").trim()}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <SkillBadge key={skill} label={skill} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* OSS */}
          <section>
            <SectionTitle>Open Source Highlights</SectionTitle>
            <div className="space-y-2">
              {r.ossHighlights.map((oss) => (
                <div key={oss.pr} className="flex items-start gap-2">
                  <span className="font-mono text-xs mt-0.5" style={{ color: "var(--color-gh-success)" }}>
                    PR {oss.pr}
                  </span>
                  <span className="text-sm" style={{ color: "var(--color-gh-text)" }}>
                    {oss.project}
                  </span>
                  <span className="text-sm" style={{ color: "var(--color-gh-text-muted)" }}>
                    — {oss.description}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-base font-semibold mb-4 pb-2"
      style={{
        color: "var(--color-gh-text)",
        borderBottom: "1px solid var(--color-gh-border)",
      }}
    >
      {children}
    </h2>
  );
}

function Divider() {
  return <hr style={{ borderColor: "var(--color-gh-border)" }} />;
}
