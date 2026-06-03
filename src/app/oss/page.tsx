import type { Metadata } from "next";
import { getAllOSSContributions, getOSSStats } from "@/lib/data/oss";
import { ContributionStats } from "@/components/oss/ContributionStats";
import { ContributionTimeline } from "@/components/oss/ContributionTimeline";

export const metadata: Metadata = {
  title: "Open Source",
  description:
    "My open source engineering journey — contributions to Apache Arrow and other production-grade systems.",
};

export default function OSSPage() {
  const contributions = getAllOSSContributions();
  const stats = getOSSStats();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-2xl font-bold mb-2"
          style={{ color: "var(--color-gh-text)" }}
        >
          Open Source
        </h1>
        <p className="text-sm mb-4" style={{ color: "var(--color-gh-text-muted)" }}>
          My contributions to production-grade open source projects. Each entry represents a real investigation — finding, understanding, and fixing issues in codebases used by millions.
        </p>

        {/* Flow diagram */}
        <div className="flex items-center gap-1 flex-wrap text-xs font-mono" style={{ color: "var(--color-gh-text-subtle)" }}>
          {["Issue", "Investigation", "Discussion", "PR", "Review", "Merge"].map(
            (step, i, arr) => (
              <span key={step} className="flex items-center gap-1">
                <span
                  className="px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: "var(--color-gh-elevated)",
                    border: "1px solid var(--color-gh-border)",
                    color: "var(--color-gh-text-muted)",
                  }}
                >
                  {step}
                </span>
                {i < arr.length - 1 && (
                  <span style={{ color: "var(--color-gh-success)" }}>→</span>
                )}
              </span>
            )
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8">
        <ContributionStats stats={stats} />
      </div>

      {/* Timeline */}
      <ContributionTimeline contributions={contributions} />
    </div>
  );
}
