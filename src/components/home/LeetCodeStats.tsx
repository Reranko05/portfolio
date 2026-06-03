import { getLeetCodeStats } from "@/lib/data/leetcode";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Flame } from "lucide-react";

export function LeetCodeStats() {
  const stats = getLeetCodeStats();

  return (
    <section>
      <SectionHeader
        title="⚡ LeetCode"
        description={`@${stats.username}`}
      />
      <div
        className="p-4 rounded-lg"
        style={{
          backgroundColor: "var(--color-gh-surface)",
          border: "1px solid var(--color-gh-border)",
        }}
      >
        {/* Top stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <StatItem label="Solved" value={stats.totalSolved.toString()} />
          <StatItem label="Contest Rating" value={stats.contestRating.toString()} />
          <StatItem label="Ranking" value={stats.globalRanking} />
          <StatItem
            label="Current Streak"
            value={`${stats.currentStreak}d`}
            icon={<Flame size={14} style={{ color: "var(--color-gh-orange)" }} />}
          />
        </div>

        {/* Difficulty breakdown */}
        <div className="flex items-center gap-3 flex-wrap">
          <DifficultyBadge
            label="Easy"
            count={stats.easySolved}
            color="var(--color-gh-success)"
          />
          <DifficultyBadge
            label="Medium"
            count={stats.mediumSolved}
            color="var(--color-gh-warning)"
          />
          <DifficultyBadge
            label="Hard"
            count={stats.hardSolved}
            color="var(--color-gh-danger)"
          />
          <span
            className="text-xs ml-auto"
            style={{ color: "var(--color-gh-text-muted)" }}
          >
            Acceptance: {stats.acceptanceRate}
          </span>
        </div>

        {/* Progress bar */}
        <div
          className="mt-3 h-2 rounded-full overflow-hidden flex"
          style={{ backgroundColor: "var(--color-gh-elevated)" }}
        >
          <div
            style={{
              width: `${(stats.easySolved / stats.totalSolved) * 100}%`,
              backgroundColor: "var(--color-gh-success)",
            }}
          />
          <div
            style={{
              width: `${(stats.mediumSolved / stats.totalSolved) * 100}%`,
              backgroundColor: "var(--color-gh-warning)",
            }}
          />
          <div
            style={{
              width: `${(stats.hardSolved / stats.totalSolved) * 100}%`,
              backgroundColor: "var(--color-gh-danger)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

function StatItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center text-center p-2">
      <div className="flex items-center gap-1">
        {icon}
        <span
          className="text-lg font-bold font-mono"
          style={{ color: "var(--color-gh-text)" }}
        >
          {value}
        </span>
      </div>
      <span className="text-xs mt-0.5" style={{ color: "var(--color-gh-text-muted)" }}>
        {label}
      </span>
    </div>
  );
}

function DifficultyBadge({
  label,
  count,
  color,
}: {
  label: string;
  count: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-sm font-medium" style={{ color }}>
        {count}
      </span>
      <span className="text-xs" style={{ color: "var(--color-gh-text-muted)" }}>
        {label}
      </span>
    </div>
  );
}
