import { GitMerge, GitPullRequest, Bug, GitFork } from "lucide-react";
import type { OSSStats } from "@/types/oss";
import { StatCard } from "@/components/shared/StatCard";

export function ContributionStats({ stats }: { stats: OSSStats }) {
  if (stats.liveData === false) {
    return (
      <div className="text-center p-6" style={{ color: 'var(--color-gh-text-muted)', border: '1px solid var(--color-gh-border)', backgroundColor: 'var(--color-gh-surface)', borderRadius: 8 }}>
        {stats.placeholderMessage || 'Open-source contribution summaries will be available via integration.'}
      </div>
    );
  }

  const items = [
    {
      label: "PRs Merged",
      value: stats.prsMerged ?? 0,
      icon: <GitMerge size={18} />,
    },
    {
      label: "PRs Opened",
      value: stats.prsOpened ?? 0,
      icon: <GitPullRequest size={18} />,
    },
    {
      label: "Issues Filed",
      value: stats.issuesInvestigated ?? 0,
      icon: <Bug size={18} />,
    },
    {
      label: "Repos Contributed",
      value: stats.reposContributed ?? 0,
      icon: <GitFork size={18} />,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {items.map((item) => (
        <StatCard
          key={item.label}
          label={item.label}
          value={item.value}
          icon={item.icon}
        />
      ))}
    </div>
  );
}
