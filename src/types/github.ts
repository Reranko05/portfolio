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
  // Numeric fields may be omitted when using placeholders
  stars?: number | null
  followers?: number | null
  following?: number | null
  publicRepos?: number | null
  totalCommits?: number | null
  contributionWeeks?: ContributionWeek[]
  topLanguages?: { name: string; color: string; percentage: number }[]
  // If liveData is false, UI should show a placeholder message instead of numbers
  liveData?: boolean
  placeholderMessage?: string
}

export interface LeetCodeStats {
  username: string
  // Allow placeholders for LeetCode numbers until API integration
  totalSolved?: number | null
  easySolved?: number | null
  mediumSolved?: number | null
  hardSolved?: number | null
  contestRating?: number | null
  globalRanking?: string | null
  currentStreak?: number | null
  acceptanceRate?: string | null
  liveData?: boolean
  displaySummary?: string
}
