import type { ContributionWeek } from '@/types/github'

// Types for LeetCode integration
export interface LeetCodeProfile {
  username: string
  avatarUrl?: string | null
  realName?: string | null
}

export interface LeetCodeContestStats {
  contestRating?: number | null
  globalRanking?: string | null
  attendedContestsCount?: number | null
}

export interface LeetCodeHeatmapData {
  weeks: ContributionWeek[]
  totalSubmissions: number
  currentStreak?: number | null
  longestStreak?: number | null
  totalActiveDays?: number
}

export interface LeetCodeStats {
  username: string
  avatarUrl?: string | null
  totalSolved?: number | null
  easySolved?: number | null
  mediumSolved?: number | null
  hardSolved?: number | null
  contestStats?: LeetCodeContestStats
  heatmap?: LeetCodeHeatmapData
  liveData?: boolean
  placeholderMessage?: string
}

// Helper: find a nested object that maps ISO dates to counts (e.g. { '2025-01-01': 2 })
function findDateMap(obj: unknown): Record<string, number> | null {
  if (obj == null) return null

  if (typeof obj === 'string') {
    try {
      const parsed = JSON.parse(obj)
      return findDateMap(parsed)
    } catch (e) {
      return null
    }
  }

  if (typeof obj === 'object') {
    const rec = obj as Record<string, unknown>
    const keys = Object.keys(rec)
    const dateKeyRegex = /^\d{4}-\d{2}-\d{2}$/
    const epochKeyRegex = /^\d{9,13}$/

    // direct ISO keys
    if (keys.some((k) => dateKeyRegex.test(k))) {
      const out: Record<string, number> = {}
      for (const k of keys) {
        if (dateKeyRegex.test(k)) {
          const v = rec[k]
          const n = typeof v === 'number' ? v : typeof v === 'string' ? Number(v || 0) : 0
          out[k] = Number.isFinite(n) ? n : 0
        }
      }
      return out
    }

    // epoch keys (seconds or milliseconds)
    if (keys.some((k) => epochKeyRegex.test(k))) {
      const out: Record<string, number> = {}
      for (const k of keys) {
        if (epochKeyRegex.test(k)) {
          // key is the timestamp, value is the count
          const tsRaw = k
          const valRaw = rec[k]
          const timestamp = typeof tsRaw === 'number' ? tsRaw : Number(tsRaw)
          const count = typeof valRaw === 'number' ? valRaw : typeof valRaw === 'string' ? Number(valRaw || 0) : 0
          if (!Number.isFinite(timestamp)) continue
          const ms = timestamp > 1e12 ? timestamp : timestamp * 1000
          const iso = new Date(ms).toISOString().slice(0, 10)
          out[iso] = Number.isFinite(count) ? Number(count) : 0
        }
      }
      return out
    }

    // recurse
    for (const k of keys) {
      const nested = findDateMap(rec[k])
      if (nested) return nested
    }
  }

  return null
}

// Convert days -> weeks for heatmap
// Generate calendar days for the last `lastDays` days (no padding, no fake weeks)
function generateCalendarDays(dateMap: Record<string, number>, lastDays = 365) {
  const endDate = new Date()
  endDate.setHours(0, 0, 0, 0)
  const startDate = new Date(endDate)
  startDate.setDate(endDate.getDate() - (lastDays - 1))

  const generatedDays: { date: string; count: number }[] = []
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const iso = d.toISOString().slice(0, 10)
    generatedDays.push({ date: iso, count: Number(dateMap[iso] ?? 0) })
  }
  return generatedDays
}

function daysToWeeks(generatedDays: { date: string; count: number }[]): ContributionWeek[] {
  // Group sequential days into week columns of up to 7 days each (no padding across range boundaries)
  const weeks: ContributionWeek[] = []
  for (let i = 0; i < generatedDays.length; i += 7) {
    const chunk = generatedDays.slice(i, i + 7)
    weeks.push({ days: chunk.map((d) => ({ date: d.date, count: d.count, level: 0 as 0 | 1 | 2 | 3 | 4 })) })
  }

  // Compute intensity levels based on max count across generatedDays
  const max = generatedDays.reduce((m, x) => Math.max(m, x.count), 0)
  const bucket = Math.max(1, Math.ceil(max / 4))
  for (const w of weeks) {
    for (const day of w.days) {
      const lvl: 0 | 1 | 2 | 3 | 4 = day.count === 0 ? 0 : Math.min(4, Math.ceil(day.count / bucket)) as 1 | 2 | 3 | 4
      ;(day as any).level = lvl
    }
  }

  return weeks
}

function computeStreaks(days: { date: string; count: number }[]) {
  if (!days || days.length === 0) return { current: 0, longest: 0 }
  const sorted = days.slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  let longest = 0
  let running = 0
  for (const d of sorted) {
    if (d.count > 0) {
      running += 1
      longest = Math.max(longest, running)
    } else {
      running = 0
    }
  }

  let current = 0
  for (let i = sorted.length - 1; i >= 0; i--) {
    if (sorted[i].count > 0) current += 1
    else break
  }

  return { current, longest }
}

// Public fallback: try a few third-party endpoints and normalize output
async function fetchLeetCodeFallback(username: string) {
  const candidates = [
    `https://leetcode-stats-api.herokuapp.com/${username}`,
    `https://leetcode-stats.vercel.app/api?username=${username}`,
    `https://leetcard.jacoblin.cool/api?username=${username}`,
  ]

  for (const url of candidates) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; site-fetcher/1.0)' } })
      if (!res.ok) continue
      const raw = await res.text()
      let parsed: any = null
      try {
        parsed = JSON.parse(raw)
      } catch (e) {
        continue
      }

      const dateMap = findDateMap(parsed) || {}
      const generatedDays = generateCalendarDays(dateMap, 365)
      const totalSubmissions = generatedDays.reduce((s, d) => s + d.count, 0)

      const activeDays = generatedDays.filter((d) => d.count > 0).length
      let longest = 0
      let running = 0
      for (const d of generatedDays) {
        if (d.count > 0) {
          running += 1
          longest = Math.max(longest, running)
        } else {
          running = 0
        }
      }
      let current = 0
      let idx = generatedDays.length - 1
      if (idx >= 0 && generatedDays[idx].count === 0) idx -= 1
      while (idx >= 0 && generatedDays[idx].count > 0) {
        current += 1
        idx -= 1
      }

      const weeks = daysToWeeks(generatedDays)
      const profile = { username, avatarUrl: parsed.avatar || parsed.userAvatar || null, realName: parsed.realName || null }
      const heatmap = { weeks, totalSubmissions, currentStreak: current, longestStreak: longest, totalActiveDays: activeDays }

      // extract solved counts if present
      let totalSolved: number | null = null
      let easySolved: number | null = null
      let mediumSolved: number | null = null
      let hardSolved: number | null = null

      if (parsed.submitStats && Array.isArray(parsed.submitStats.acSubmissionNum)) {
        for (const it of parsed.submitStats.acSubmissionNum) {
          const diff = it.difficulty
          const cnt = Number(it.count ?? 0)
          if (diff === 'All') totalSolved = cnt
          else if (diff === 'Easy') easySolved = cnt
          else if (diff === 'Medium') mediumSolved = cnt
          else if (diff === 'Hard') hardSolved = cnt
        }
      }

      if (Array.isArray(parsed.acSubmissionNum)) {
        for (const it of parsed.acSubmissionNum) {
          const diff = it.difficulty
          const cnt = Number(it.count ?? 0)
          if (diff === 'All') totalSolved = cnt
          else if (diff === 'Easy') easySolved = cnt
          else if (diff === 'Medium') mediumSolved = cnt
          else if (diff === 'Hard') hardSolved = cnt
        }
      }

      const stats: LeetCodeStats = {
        username,
        avatarUrl: profile.avatarUrl,
        totalSolved: totalSolved ?? null,
        easySolved: easySolved ?? null,
        mediumSolved: mediumSolved ?? null,
        hardSolved: hardSolved ?? null,
        contestStats: parsed.userContestRanking ? { contestRating: Number(parsed.userContestRanking.rating ?? null), attendedContestsCount: Number(parsed.userContestRanking.attendedContestsCount ?? null) } : undefined,
        heatmap,
        liveData: true,
      }

      if ((stats.totalSolved && stats.totalSolved > 0) || heatmap.totalSubmissions > 0) {
        return { profile, stats, heatmap }
      }
    } catch (e) {
      continue
    }
  }

  return null
}

export async function fetchLeetCodeData(username: string): Promise<{ profile: LeetCodeProfile; stats: LeetCodeStats; heatmap: LeetCodeHeatmapData }> {
  try {
    const query = `query userProfile($username: String!) { matchedUser(username: $username) { username profile { realName userAvatar } submissionCalendar submitStats: submitStatsGlobal { acSubmissionNum { difficulty count submissions } } } userContestRanking(username: $username) { rating attendedContestsCount } }`

      const res = await fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0 (compatible; site-fetcher/1.0)' },
        body: JSON.stringify({ query, variables: { username } }),
        next: { revalidate: 3600 },
      })

      if (!res.ok) {
        throw new Error(`LeetCode GraphQL request failed with status ${res.status}`)
      }

      const raw = await res.text()
      let json: Record<string, unknown>
      try {
        json = JSON.parse(raw) as Record<string, unknown>
      } catch (parseErr) {
        throw parseErr
      }

    const data = (json['data'] as Record<string, unknown> | undefined) ?? undefined
    const matched = data?.['matchedUser'] as Record<string, unknown> | undefined

    const profileObj = matched?.['profile'] as Record<string, unknown> | undefined
    const profile = {
      username: (matched?.['username'] as string) ?? username,
      avatarUrl: (profileObj?.['userAvatar'] as string) ?? null,
      realName: (profileObj?.['realName'] as string) ?? null,
    }

    const submissionCalendarRaw = matched?.['submissionCalendar']
    const dateMap = findDateMap(submissionCalendarRaw) || {}
    const generatedDays = generateCalendarDays(dateMap, 365)

      const totalSubmissions = generatedDays.reduce((s, d) => s + d.count, 0)

      // compute active days and streaks from full calendar
      const activeDays = generatedDays.filter((d) => d.count > 0).length
      let longest = 0
      let running = 0
      for (const d of generatedDays) {
        if (d.count > 0) {
          running += 1
          longest = Math.max(longest, running)
        } else {
          running = 0
        }
      }

      // current streak ending today or yesterday
      let current = 0
      let idx = generatedDays.length - 1
      // if today has no submissions, consider streak ending yesterday
      if (idx >= 0 && generatedDays[idx].count === 0) idx -= 1
      while (idx >= 0 && generatedDays[idx].count > 0) {
        current += 1
        idx -= 1
      }

      const weeks = daysToWeeks(generatedDays)
      console.log('Active Days:', activeDays)
      console.log('Weeks:', weeks.length)

    const submitStats = matched?.['submitStats'] as Record<string, unknown> | undefined
    const acArr = (submitStats?.['acSubmissionNum'] as unknown) as Array<Record<string, unknown>> | undefined
    let totalSolved = 0
    let easySolved = 0
    let mediumSolved = 0
    let hardSolved = 0
    if (Array.isArray(acArr)) {
      for (const it of acArr) {
        const diff = it['difficulty'] as string | undefined
        const count = Number(it['count'] as number | string | undefined ?? 0)
        if (diff === 'All') totalSolved = count
        else if (diff === 'Easy') easySolved = count
        else if (diff === 'Medium') mediumSolved = count
        else if (diff === 'Hard') hardSolved = count
      }
    }

    const contest = (data?.['userContestRanking'] as Record<string, unknown> | undefined) ?? undefined
    const contestStats = {
      contestRating: contest ? (Number(contest['rating'] as number | string | undefined) || null) : null,
      globalRanking: contest && contest['ranking'] ? String(contest['ranking']) : null,
      attendedContestsCount: contest ? Number(contest['attendedContestsCount'] as number | string | undefined) || null : null,
    }

    const heatmap = { weeks, totalSubmissions, currentStreak: current, longestStreak: longest, totalActiveDays: activeDays }

    const stats: LeetCodeStats = {
      username: profile.username,
      avatarUrl: profile.avatarUrl,
      totalSolved: totalSolved || null,
      easySolved: easySolved || null,
      mediumSolved: mediumSolved || null,
      hardSolved: hardSolved || null,
      contestStats,
      heatmap,
      liveData: true,
    }

    return { profile, stats, heatmap }
  } catch (err) {
    try {
      const fb = await fetchLeetCodeFallback(username)
      if (fb) {
        return fb
      }
    } catch (_) {
      // swallow fallback errors
    }

    return {
      profile: { username },
      stats: { username, liveData: false, placeholderMessage: 'LeetCode data unavailable.' },
      heatmap: { weeks: [], totalSubmissions: 0, currentStreak: 0, longestStreak: 0 },
    }
  }
}
