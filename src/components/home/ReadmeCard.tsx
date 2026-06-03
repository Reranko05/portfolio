import { Target } from "lucide-react";
import { profile } from "@/lib/data/profile";
import { SkillBadge } from "@/components/shared/SkillBadge";

const techStack = {
  Languages: [
    { label: "C++17", color: "#f34b7d" },
    { label: "Python 3", color: "#3572A5" },
    { label: "Java 21", color: "#b07219" },
    { label: "Go", color: "#00add8" },
    { label: "TypeScript", color: "#3178c6" },
  ],
  "Backend & Cloud": [
    { label: "Spring Boot" },
    { label: "REST APIs" },
    { label: "JWT" },
    { label: "PostgreSQL" },
    { label: "AWS" },
    { label: "Kafka" },
  ],
  "Systems & Tools": [
    { label: "Git" },
    { label: "Linux" },
    { label: "Docker" },
    { label: "Kubernetes" },
    { label: "CMake" },
  ],
};

export function ReadmeCard() {
  return (
    <div
      className="w-full rounded-lg overflow-hidden"
      style={{
        backgroundColor: "var(--color-gh-surface)",
        border: "1px solid var(--color-gh-border)",
      }}
    >
      {/* README header bar */}
      <div
        className="flex items-center gap-2 px-4 py-2 text-xs font-mono"
        style={{
          backgroundColor: "var(--color-gh-elevated)",
          borderBottom: "1px solid var(--color-gh-border)",
          color: "var(--color-gh-text-muted)",
        }}
      >
        <span style={{ color: "var(--color-gh-success)" }}>●</span>
        <span>README.md</span>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* H1 */}
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ color: "var(--color-gh-text)" }}
          >
            Aaditya Srinivasan
          </h1>
          <p
            className="text-base mt-1 font-mono"
            style={{ color: "var(--color-gh-accent)" }}
          >
            Backend Engineer • Systems Builder • OSS Contributor
          </p>
          <p className="text-sm mt-2" style={{ color: "var(--color-gh-text-muted)" }}>
            Building scalable systems, low-latency backends and real-world infrastructure.
          </p>
        </div>

        {/* Divider */}
        <hr style={{ borderColor: "var(--color-gh-border)" }} />

        {/* About Me */}
        <section>
          <h2
            className="text-base font-semibold mb-3 flex items-center gap-2"
            style={{ color: "var(--color-gh-text)" }}
          >
            👋 About Me
          </h2>
          {profile.about.split("\n\n").map((para, i) => (
            <p
              key={i}
              className="text-sm leading-relaxed mb-3"
              style={{ color: "var(--color-gh-text-muted)" }}
            >
              {para}
            </p>
          ))}
        </section>

        {/* Current Focus */}
        <section>
          <h2
            className="text-base font-semibold mb-3 flex items-center gap-2"
            style={{ color: "var(--color-gh-text)" }}
          >
            <Target size={16} style={{ color: "var(--color-gh-accent)" }} />
            Current Focus
          </h2>
          <ul className="space-y-2">
            {profile.currentFocus.map((item) => (
              <li key={item.label} className="flex items-start gap-2">
                <span
                  className="mt-1 font-mono text-xs"
                  style={{ color: "var(--color-gh-success)" }}
                >
                  ▸
                </span>
                <div>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--color-gh-text)" }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="text-sm ml-2"
                    style={{ color: "var(--color-gh-text-muted)" }}
                  >
                    — {item.description}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Tech Stack */}
        <section>
          <h2
            className="text-base font-semibold mb-4 flex items-center gap-2"
            style={{ color: "var(--color-gh-text)" }}
          >
            🛠 Tech Stack
          </h2>
          <div className="space-y-4">
            {Object.entries(techStack).map(([category, skills]) => (
              <div key={category}>
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: "var(--color-gh-text-subtle)" }}
                >
                  {category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <SkillBadge
                      key={skill.label}
                      label={skill.label}
                      color={"color" in skill ? skill.color : undefined}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
