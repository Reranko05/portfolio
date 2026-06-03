// Server-side GitHub helper — public, no tokens
// Fetches public profile, repos, and recent public events for a username

export type GitHubEventType = 'PushEvent' | 'PullRequestEvent' | 'IssuesEvent' | 'CreateEvent' | string

export interface GitHubUser {
  login: string
  name?: string | null
  avatarUrl?: string | null
  htmlUrl?: string
  bio?: string | null
  location?: string | null
  followers?: number
  following?: number
  publicRepos?: number
}

export interface GitHubRepo {
  name: string
  fullName?: string
  description?: string | null
  language?: string | null
  stars: number
  forks: number
  updatedAt?: string
  htmlUrl?: string
}

export interface GitHubEvent {
  id: string
  type: GitHubEventType
  repo: { name: string; url: string }
  actor: { login: string }
  createdAt: string
  htmlUrl?: string
  text?: string
  payload?: any
}

export interface GitHubData {
  user: GitHubUser
  repos: GitHubRepo[]
  events: GitHubEvent[]
  aggregatedStars: number
  topLanguages: { name: string; color: string; percentage: number }[]
}

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  'C++': '#f34b7d',
  C: '#555555',
  Rust: '#dea584',
}

function prettyLangColor(name?: string) {
  if (!name) return '#888888'
  return LANGUAGE_COLORS[name] ?? '#888888'
}

export default async function fetchGitHubData(username: string): Promise<GitHubData> {
  const headers = { Accept: 'application/vnd.github.v3+json' }

  const userUrl = `https://api.github.com/users/${encodeURIComponent(username)}`
  const reposUrl = `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100`
  const eventsUrl = `https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=10`

  const [userRes, reposRes, eventsRes] = await Promise.all([
    fetch(userUrl, { headers, next: { revalidate: 3600 } }),
    fetch(reposUrl, { headers, next: { revalidate: 3600 } }),
    fetch(eventsUrl, { headers, next: { revalidate: 3600 } }),
  ])

  if (!userRes.ok) {
    throw new Error(`GitHub user fetch failed: ${userRes.status} ${userRes.statusText}`)
  }

  const userJson = await userRes.json()
  const reposJson = (await reposRes.json()) as any[]
  const eventsJson = (await eventsRes.json()) as any[]

  const user = {
    login: userJson.login,
    name: userJson.name ?? null,
    avatarUrl: userJson.avatar_url ?? null,
    htmlUrl: userJson.html_url,
    bio: userJson.bio ?? null,
    location: userJson.location ?? null,
    followers: userJson.followers ?? 0,
    following: userJson.following ?? 0,
    publicRepos: userJson.public_repos ?? 0,
  }

  const repos: GitHubRepo[] = (reposJson || []).map((r: any) => ({
    name: r.name,
    fullName: r.full_name,
    description: r.description ?? null,
    language: r.language ?? null,
    stars: r.stargazers_count ?? 0,
    forks: r.forks_count ?? 0,
    updatedAt: r.updated_at,
    htmlUrl: r.html_url,
  }))

  const aggregatedStars = repos.reduce((s, r) => s + (r.stars || 0), 0)

  // Top languages (simple heuristic: count repos per language)
  const langCounts: Record<string, number> = {}
  repos.forEach((r) => {
    const key = r.language ?? 'Other'
    langCounts[key] = (langCounts[key] || 0) + 1
  })
  const totalRepos = repos.length || 1
  const topLanguages = Object.entries(langCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({ name, color: prettyLangColor(name), percentage: Math.round((count / totalRepos) * 100) }))

  // Map events to a compact shape and filter to the types we care about
  const events: GitHubEvent[] = (eventsJson || []).map((e: any) => {
    const base = {
      id: e.id,
      type: e.type,
      repo: { name: e.repo?.name ?? '', url: `https://github.com/${e.repo?.name ?? ''}` },
      actor: { login: e.actor?.login ?? '' },
      createdAt: e.created_at,
      payload: e.payload,
    }

    if (e.type === 'PushEvent') {
      const commitCount = e.payload?.commits?.length ?? 0
      const head = e.payload?.head
      const commitUrl = head ? `https://github.com/${e.repo.name}/commit/${head}` : `https://github.com/${e.repo.name}`
      return { ...base, htmlUrl: commitUrl, text: `${base.actor.login} pushed ${commitCount} commit(s) to ${base.repo.name}` }
    }

    if (e.type === 'PullRequestEvent') {
      const pr = e.payload?.pull_request
      const action = e.payload?.action
      return { ...base, htmlUrl: pr?.html_url ?? `https://github.com/${e.repo.name}`, text: `${base.actor.login} ${action} a pull request: ${pr?.title ?? ''}` }
    }

    if (e.type === 'IssuesEvent') {
      const issue = e.payload?.issue
      const action = e.payload?.action
      return { ...base, htmlUrl: issue?.html_url ?? `https://github.com/${e.repo.name}`, text: `${base.actor.login} ${action} issue: ${issue?.title ?? ''}` }
    }

    if (e.type === 'CreateEvent') {
      const refType = e.payload?.ref_type
      const ref = e.payload?.ref
      return { ...base, htmlUrl: `https://github.com/${e.repo.name}`, text: `${base.actor.login} created ${refType} ${ref ?? ''} in ${base.repo.name}` }
    }

    return { ...base, htmlUrl: `https://github.com/${e.repo.name}`, text: `${base.actor.login} ${e.type} on ${base.repo.name}` }
  })

  return {
    user,
    repos,
    events,
    aggregatedStars,
    topLanguages,
  }
}

// types are exported via their declarations above
