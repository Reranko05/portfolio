import type { LeetCodeStats as LCStats } from '@/lib/leetcode'
import { fetchLeetCodeData } from '@/lib/leetcode'

export async function getLeetCodeStats(): Promise<LCStats> {
  const username = 'aadityasri03'
  const res = await fetchLeetCodeData(username)
  return res.stats
}
