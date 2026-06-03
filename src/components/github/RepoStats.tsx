import { Star, Users, GitCommit, BookOpen } from "lucide-react";
import type { GitHubStats } from "@/types/github";

export function RepoStats({ stats }: { stats: GitHubStats }) {
  const items = [
    { icon: <Star size={14} />, value: stats.stars, label: "Stars" },
    { icon: <Users size={14} />, value: stats.followers, label: "Followers" },
    { icon: <GitCommit size={14} />, value: stats.totalCommits.toLocaleString(), label: "Commits" },
    { icon: <BookOpen size={14} />, value: stats.publicRepos, label: "Repos" },
  ];

  return (
    <div
      className="flex flex-wrap gap-4 pt-3"
      style={{ borderTop: "1px solid var(--color-gh-border)" }}
    >
      {items.map(({ icon, value, label }) => (
        <div
          key={label}
          className="flex items-center gap-1.5 text-sm"
          style={{ color: "var(--color-gh-text-muted)" }}
        >
          <span style={{ color: "var(--color-gh-text-subtle)" }}>{icon}</span>
          <span className="font-mono font-medium" style={{ color: "var(--color-gh-text)" }}>
            {value}
          </span>
          <span className="text-xs">{label}</span>
        </div>
      ))}

      {/* Language bar */}
      <div className="w-full mt-1">
        <div className="flex h-2 rounded-full overflow-hidden">
          {stats.topLanguages.map((lang) => (
            <div
              key={lang.name}
              style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
              title={`${lang.name}: ${lang.percentage}%`}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mt-2">
          {stats.topLanguages.map((lang) => (
            <div key={lang.name} className="flex items-center gap-1 text-xs" style={{ color: "var(--color-gh-text-muted)" }}>
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
              {lang.name}
              <span style={{ color: "var(--color-gh-text-subtle)" }}>{lang.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
