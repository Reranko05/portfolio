"use client"
import React from 'react'
import { GitFork } from 'lucide-react'
import useGitHub from '@/hooks/useGitHub'
import type { GitHubRepo } from '@/lib/github'

export function GitHubRepoBadge({ githubUrl }: { githubUrl: string }) {
  const { data, error, isLoading } = useGitHub()

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-gh-text-muted)' }}>
        <span>Loading...</span>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-gh-text-muted)' }}>
        <span>—</span>
      </div>
    )
  }

  const matchUrl = (u: string) => u.replace(/\/$/, '')

  const repo = data.repos?.find((r: GitHubRepo) => matchUrl(r.htmlUrl ?? '') === matchUrl(githubUrl))

  if (!repo) {
    return (
      <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-gh-text-muted)' }}>
        <span>—</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--color-gh-text-muted)' }}>
      <span className="flex items-center gap-1">
        <GitFork size={12} />
        <span className="font-mono">{repo.forks}</span>
      </span>
    </div>
  )
}

export default GitHubRepoBadge
