import Link from "next/link";
import {
  GitMerge,
  GitPullRequest,
  Bug,
  FileText,
  Zap,
  ExternalLink,
} from "lucide-react";
import type { OSSContribution } from "@/types/oss";
import { formatDateShort } from "@/lib/utils";

const statusConfig = {
  merged: {
    label: "Merged",
    color: "var(--color-gh-purple)",
    bg: "rgba(188,140,255,0.15)",
    border: "rgba(188,140,255,0.4)",
  },
  open: {
    label: "Open",
    color: "var(--color-gh-success)",
    bg: "var(--color-gh-success-muted)",
    border: "var(--color-gh-success)",
  },
  investigating: {
    label: "Investigating",
    color: "var(--color-gh-warning)",
    bg: "var(--color-gh-warning-muted)",
    border: "var(--color-gh-warning)",
  },
  closed: {
    label: "Closed",
    color: "var(--color-gh-text-muted)",
    bg: "var(--color-gh-elevated)",
    border: "var(--color-gh-border)",
  },
};

const typeIcons = {
  "bug-fix": <Bug size={14} />,
  feature: <Zap size={14} />,
  docs: <FileText size={14} />,
  performance: <Zap size={14} />,
  chore: <GitMerge size={14} />,
};

export function ContributionCard({
  contribution,
  isLast,
}: {
  contribution: OSSContribution;
  isLast: boolean;
}) {
  const sc = statusConfig[contribution.status];
  const icon = typeIcons[contribution.type];

  return (
    <div className="flex gap-4">
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center z-10"
          style={{
            backgroundColor: sc.bg,
            border: `2px solid ${sc.border}`,
            color: sc.color,
          }}
        >
          {contribution.status === "merged" ? (
            <GitMerge size={15} />
          ) : contribution.prUrl ? (
            <GitPullRequest size={15} />
          ) : (
            <Bug size={15} />
          )}
        </div>
        {!isLast && (
          <div
            className="w-0.5 flex-1 mt-2"
            style={{
              backgroundColor: "var(--color-gh-border)",
              minHeight: "40px",
            }}
          />
        )}
      </div>

      {/* Card */}
      <div
        className="flex-1 mb-6 p-5 rounded-lg"
        style={{
          backgroundColor: "var(--color-gh-surface)",
          border: "1px solid var(--color-gh-border)",
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <Link
                href={contribution.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-sm hover:no-underline hover:underline"
                style={{ color: "var(--color-gh-accent)" }}
              >
                {contribution.repoName}
              </Link>
              {contribution.prNumber && (
                <Link
                  href={contribution.prUrl || contribution.issueUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs hover:no-underline"
                  style={{ color: "var(--color-gh-text-muted)" }}
                >
                  #{contribution.prNumber}
                </Link>
              )}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: sc.bg,
                  color: sc.color,
                  border: `1px solid ${sc.border}`,
                }}
              >
                {sc.label}
              </span>
              <span
                className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: "var(--color-gh-elevated)",
                  border: "1px solid var(--color-gh-border)",
                  color: "var(--color-gh-text-muted)",
                }}
              >
                {icon}
                {contribution.type.replace("-", " ")}
              </span>
              <span
                className="text-xs"
                style={{ color: "var(--color-gh-text-subtle)" }}
              >
                {formatDateShort(contribution.date)}
              </span>
            </div>
          </div>

          {/* Line stats */}
          {(contribution.linesAdded || contribution.linesRemoved) && (
            <div className="flex items-center gap-1.5 text-xs flex-shrink-0">
              {contribution.linesAdded && (
                <span style={{ color: "var(--color-gh-success)" }}>
                  +{contribution.linesAdded}
                </span>
              )}
              {contribution.linesRemoved && (
                <span style={{ color: "var(--color-gh-danger)" }}>
                  -{contribution.linesRemoved}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Investigation summary */}
        <p
          className="text-sm leading-relaxed mb-3"
          style={{ color: "var(--color-gh-text-muted)" }}
        >
          {contribution.investigationSummary}
        </p>

        {/* Outcome */}
        <div
          className="flex items-start gap-2 text-xs p-3 rounded-md"
          style={{ backgroundColor: "var(--color-gh-elevated)" }}
        >
          <span style={{ color: "var(--color-gh-success)" }}>→</span>
          <span style={{ color: "var(--color-gh-text)" }}>
            {contribution.outcome}
          </span>
        </div>

        {/* Links */}
        <div className="flex gap-2 mt-3">
          {contribution.issueUrl && (
            <Link
              href={contribution.issueUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs hover:no-underline"
              style={{ color: "var(--color-gh-accent)" }}
            >
              <ExternalLink size={11} />
              Issue
            </Link>
          )}
          {contribution.prUrl && (
            <Link
              href={contribution.prUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs hover:no-underline"
              style={{ color: "var(--color-gh-accent)" }}
            >
              <ExternalLink size={11} />
              Pull Request
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
