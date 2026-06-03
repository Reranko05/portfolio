export interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export interface ContributionWeek {
  days: ContributionDay[]
}

export interface GitHubStats {
  username: string
  stars: number
  followers: number
  following: number
  publicRepos: number
  totalCommits: number
  contributionWeeks: ContributionWeek[]
  topLanguages: { name: string; color: string; percentage: number }[]
}

export interface LeetCodeStats {
  username: string
  totalSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  contestRating: number
  globalRanking: string
  currentStreak: number
  acceptanceRate: string
}
