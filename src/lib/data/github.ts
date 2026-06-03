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
  // Placeholder mode: real-time GitHub statistics will be loaded via API integration
  liveData: false,
  placeholderMessage: 'Live GitHub statistics will be loaded through GitHub API integration.',
  contributionWeeks: [],
  topLanguages: [],
}

export function getGitHubStats(): GitHubStats {
  return githubStats
}
