import Link from "next/link";
import { GitPullRequest, GitMerge, Bug, ArrowRight } from "lucide-react";
import { getOSSStats, getAllOSSContributions } from "@/lib/data/oss";
import { SectionHeader } from "@/components/shared/SectionHeader";

const statusConfig = {
  merged: { label: "Merged", color: "var(--color-gh-purple)", bg: "rgba(188,140,255,0.15)" },
  open: { label: "Open", color: "var(--color-gh-success)", bg: "var(--color-gh-success-muted)" },
  investigating: { label: "Investigating", color: "var(--color-gh-warning)", bg: "var(--color-gh-warning-muted)" },
  closed: { label: "Closed", color: "var(--color-gh-text-muted)", bg: "var(--color-gh-elevated)" },
};

export function OSSHighlight() {
  const stats = getOSSStats();
  const contributions = getAllOSSContributions().slice(0, 3);

  const statItems = [
    { label: "PRs Merged", value: stats.prsMerged, icon: <GitMerge size={14} /> },
    { label: "PRs Opened", value: stats.prsOpened, icon: <GitPullRequest size={14} /> },
    { label: "Issues Filed", value: stats.issuesInvestigated, icon: <Bug size={14} /> },
  ];

  return (
    <section>
      <SectionHeader
        title="🔓 Open Source"
        description="Contributions to production systems."
        action={
          <Link
            href="/oss"
            className="flex items-center gap-1 text-sm hover:no-underline"
            style={{ color: "var(--color-gh-accent)" }}
          >
            Full journey <ArrowRight size={14} />
          </Link>
        }
      />

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {statItems.map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-center justify-center p-3 rounded-lg text-center"
            style={{
              backgroundColor: "var(--color-gh-surface)",
              border: "1px solid var(--color-gh-border)",
            }}
          >
            <span style={{ color: "var(--color-gh-text-muted)" }}>{s.icon}</span>
            <span
              className="text-xl font-bold font-mono mt-1"
              style={{ color: "var(--color-gh-text)" }}
            >
              {s.value}
            </span>
            <span className="text-xs mt-0.5" style={{ color: "var(--color-gh-text-muted)" }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Contribution previews */}
      <div className="space-y-2">
        {contributions.map((c) => {
          const sc = statusConfig[c.status];
          return (
            <div
              key={c.id}
              className="flex items-start gap-3 p-3 rounded-lg"
              style={{
                backgroundColor: "var(--color-gh-surface)",
                border: "1px solid var(--color-gh-border)",
              }}
            >
              <GitMerge
                size={16}
                className="mt-0.5 flex-shrink-0"
                style={{ color: sc.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--color-gh-text)" }}
                  >
                    {c.project}
                  </span>
                  {c.prNumber && (
                    <Link
                      href={c.prUrl || c.issueUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs hover:no-underline"
                      style={{ color: "var(--color-gh-accent)" }}
                    >
                      #{c.prNumber}
                    </Link>
                  )}
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full"
                    style={{ backgroundColor: sc.bg, color: sc.color }}
                  >
                    {sc.label}
                  </span>
                </div>
                <p
                  className="text-xs mt-0.5 line-clamp-1"
                  style={{ color: "var(--color-gh-text-muted)" }}
                >
                  {c.investigationSummary}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
