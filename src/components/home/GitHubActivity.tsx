import { getGitHubStats } from "@/lib/data/github";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ContributionHeatmap } from "@/components/github/ContributionHeatmap";
import { RepoStats } from "@/components/github/RepoStats";

export function GitHubActivity() {
  const stats = getGitHubStats();

  return (
    <section>
      <SectionHeader
        title="📊 GitHub Activity"
        description={`@${stats.username} — last 12 months`}
      />
      <div
        className="p-4 rounded-lg space-y-4"
        style={{
          backgroundColor: "var(--color-gh-surface)",
          border: "1px solid var(--color-gh-border)",
        }}
      >
        {stats.liveData === false ? (
          <div className="py-8 text-center" style={{ color: 'var(--color-gh-text-muted)' }}>
            {stats.placeholderMessage || 'Live GitHub statistics will be loaded through GitHub API integration.'}
          </div>
        ) : (
          <>
            <ContributionHeatmap weeks={stats.contributionWeeks || []} />
            <RepoStats stats={stats} />
          </>
        )}
      </div>
    </section>
  );
}
