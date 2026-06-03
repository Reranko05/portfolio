export type ContributionStatus = 'merged' | 'open' | 'investigating' | 'closed'
export type ContributionType = 'bug-fix' | 'feature' | 'docs' | 'performance' | 'chore'

export interface OSSContribution {
  id: string
  project: string
  repoName: string
  repoUrl: string
  issueUrl?: string
  prUrl?: string
  prNumber?: number
  investigationSummary: string
  outcome: string
  status: ContributionStatus
  type: ContributionType
  date: string
  linesAdded?: number
  linesRemoved?: number
}

export interface OSSStats {
  prsOpened?: number
  prsMerged?: number
  issuesInvestigated?: number
  reposContributed?: number
  liveData?: boolean
  placeholderMessage?: string
}
