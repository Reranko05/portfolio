import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { ContributionWeek } from '@/types/github'

const LANGUAGE_COLORS: Record<string, string> = {
  'C++': '#f34b7d',
  Java: '#b07219',
  Python: '#3572A5',
  Go: '#00ADD8',
  TypeScript: '#2b7489',
}

function findDaysArray(obj: any): { date: string; count: number }[] | null {
  if (!obj) return null
  if (Array.isArray(obj)) {
    if (obj.length > 0 && obj[0] && typeof obj[0].date === 'string' && typeof obj[0].count !== 'undefined') {
      return obj.map((d: any) => ({ date: d.date, count: Number(d.count || 0) }))
    }
    for (const item of obj) {
      const res = findDaysArray(item)
      if (res) return res
    }
    return null
  }
  if (typeof obj === 'object') {
    for (const key of Object.keys(obj)) {
      const val = obj[key]
      const res = findDaysArray(val)
      if (res) return res
    }
  }
  return null
}

function daysToWeeks(days: { date: string; count: number }[], lastDays = 365): ContributionWeek[] {
  if (!days || days.length === 0) return []

  const dayMap = new Map<string, number>()
  days.forEach((d) => dayMap.set(d.date, d.count))

  // Always end at today, not last contribution date
  const endDate = new Date()
  const startDate = new Date(endDate)
  startDate.setDate(endDate.getDate() - lastDays + 1)

  // Snap startDate back to previous Sunday
  while (startDate.getDay() !== 0) startDate.setDate(startDate.getDate() - 1)

  const allDays: { date: string; count: number }[] = []
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const iso = d.toISOString().slice(0, 10)
    allDays.push({ date: iso, count: dayMap.get(iso) ?? 0 })
  }

  const max = allDays.reduce((m, x) => Math.max(m, x.count), 0)
  const bucket = Math.max(1, Math.ceil(max / 4))

  const weeks: ContributionWeek[] = []
  let curWeek: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[] = []
  for (const d of allDays) {
    const lvl: 0 | 1 | 2 | 3 | 4 = d.count === 0 ? 0 : Math.min(4, Math.ceil(d.count / bucket)) as 1 | 2 | 3 | 4
    curWeek.push({ date: d.date, count: d.count, level: lvl })
    if (curWeek.length === 7) {
      weeks.push({ days: curWeek })
      curWeek = []
    }
  }
  if (curWeek.length > 0) {
    weeks.push({ days: curWeek })
  }

  return weeks
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const username = url.searchParams.get('username') || 'Reranko05'

    const contribUrls = [
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}`,
      `https://github-contributions.vercel.app/api/v1/${encodeURIComponent(username)}`,
    ]

    // Fetch contributions (try preferred then fallback)
    let contribJson: any = null
    for (const cu of contribUrls) {
      try {
        const r = await fetch(cu, { next: { revalidate: 86400 }, headers: { Accept: 'application/json' } })
        if (!r.ok) continue
        contribJson = await r.json()
        if (contribJson) break
      } catch (e) {
        // try next
      }
    }

    if (!contribJson) {
      return NextResponse.json({ error: 'Contribution data unavailable.' })
    }

    const days = findDaysArray(contribJson)
    if (!days) {
      return NextResponse.json({ error: 'Contribution data unavailable.' })
    }

    const totalContributions = days.reduce((s, d) => s + d.count, 0)
    const weeks = daysToWeeks(days, 365)

    // Fetch repos to compute language distribution (selected languages)
    const reposUrl = `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100`
    let reposJson: any[] = []
    try {
      const r = await fetch(reposUrl, { next: { revalidate: 86400 }, headers: { Accept: 'application/vnd.github.v3+json' } })
      if (r.ok) reposJson = await r.json()
    } catch (e) {
      reposJson = []
    }

    const languages = ['C++', 'Java', 'Python', 'Go', 'TypeScript']
    const counts: Record<string, number> = {}
    languages.forEach((l) => (counts[l] = 0))
    const totalRepos = reposJson.length || 0
    reposJson.forEach((r) => {
      const lang = r.language
      if (languages.includes(lang)) counts[lang] = (counts[lang] || 0) + 1
    })

    const topLanguages = languages.map((name) => ({ name, color: LANGUAGE_COLORS[name] ?? '#888888', percentage: totalRepos ? Math.round((counts[name] / totalRepos) * 100) : 0 }))

    return NextResponse.json({ username, weeks, totalContributions, topLanguages })
  } catch (err: any) {
    return NextResponse.json({ error: 'Contribution data unavailable.' })
  }
}

export const runtime = 'edge'
