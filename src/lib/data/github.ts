import type { GitHubStats, ContributionWeek } from '@/types/github'

// Generate realistic contribution heatmap data (52 weeks × 7 days)
function generateHeatmap(): ContributionWeek[] {
  const weeks: ContributionWeek[] = []
  const now = new Date()
  const startDate = new Date(now)
  startDate.setDate(startDate.getDate() - 52 * 7)

  for (let w = 0; w < 52; w++) {
    const days = []
    for (let d = 0; d < 7; d++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + w * 7 + d)
      const isWeekend = d === 0 || d === 6
      const random = Math.random()
      let count = 0
      let level: 0 | 1 | 2 | 3 | 4 = 0

      if (isWeekend) {
        count = random > 0.6 ? Math.floor(random * 5) : 0
      } else {
        if (random > 0.15) {
          count = Math.floor(random * 14) + 1
        }
      }

      if (count === 0) level = 0
      else if (count <= 3) level = 1
      else if (count <= 6) level = 2
      else if (count <= 10) level = 3
      else level = 4

      days.push({
        date: date.toISOString().split('T')[0],
        count,
        level,
      })
    }
    weeks.push({ days })
  }
  return weeks
}

export const githubStats: GitHubStats = {
  username: 'Reranko05',
  stars: 119,
  followers: 134,
  following: 87,
  publicRepos: 23,
  totalCommits: 1847,
  contributionWeeks: generateHeatmap(),
  topLanguages: [
    { name: 'C++', color: '#f34b7d', percentage: 42 },
    { name: 'Java', color: '#b07219', percentage: 28 },
    { name: 'Python', color: '#3572A5', percentage: 16 },
    { name: 'Go', color: '#00add8', percentage: 9 },
    { name: 'TypeScript', color: '#3178c6', percentage: 5 },
  ],
}

export function getGitHubStats(): GitHubStats {
  return githubStats
}
