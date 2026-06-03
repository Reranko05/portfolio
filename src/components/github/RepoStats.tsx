import { Star, Users, GitCommit, BookOpen } from "lucide-react";
import type { GitHubStats } from "@/types/github";

export function RepoStats({ stats }: { stats: GitHubStats }) {
  // If liveData is false, we intentionally hide numeric summaries and show a placeholder
  if (stats.liveData === false) {
    return (
      <div className="pt-3" style={{ borderTop: "1px solid var(--color-gh-border)" }}>
        <div className="text-sm text-center py-6" style={{ color: "var(--color-gh-text-muted)" }}>
          {stats.placeholderMessage || 'Live GitHub statistics will be loaded through GitHub API integration.'}
        </div>
      </div>
    );
  }

  // Only render language distribution for recruiter-focused view
  return (
    <div
      className="pt-3"
      style={{ borderTop: "1px solid var(--color-gh-border)" }}
    >
      <div className="w-full">
        <div className="flex h-2 rounded-full overflow-hidden">
          {stats.topLanguages?.map((lang) => (
            <div
              key={lang.name}
              style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
              title={`${lang.name}: ${lang.percentage}%`}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mt-2 text-xs" style={{ color: "var(--color-gh-text-muted)" }}>
          {stats.topLanguages?.map((lang) => (
            <div key={lang.name} className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
              {lang.name} {lang.percentage}%
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
