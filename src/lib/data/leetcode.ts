import type { LeetCodeStats } from '@/types/github'

export const leetcodeStats: LeetCodeStats = {
  username: 'Reranko05',
  totalSolved: 342,
  easySolved: 120,
  mediumSolved: 182,
  hardSolved: 40,
  contestRating: 1847,
  globalRanking: 'Top 12%',
  currentStreak: 47,
  acceptanceRate: '68.3%',
}

export function getLeetCodeStats(): LeetCodeStats {
  return leetcodeStats
}
