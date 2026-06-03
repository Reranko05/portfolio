import { GitMerge, GitPullRequest, Bug, GitFork } from "lucide-react";
import type { OSSStats } from "@/types/oss";
import { StatCard } from "@/components/shared/StatCard";

export function ContributionStats({ stats }: { stats: OSSStats }) {
  const items = [
    {
      label: "PRs Merged",
      value: stats.prsMerged,
      icon: <GitMerge size={18} />,
    },
    {
      label: "PRs Opened",
      value: stats.prsOpened,
      icon: <GitPullRequest size={18} />,
    },
    {
      label: "Issues Filed",
      value: stats.issuesInvestigated,
      icon: <Bug size={18} />,
    },
    {
      label: "Repos Contributed",
      value: stats.reposContributed,
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
