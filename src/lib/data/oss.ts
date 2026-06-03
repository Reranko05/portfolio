import type { OSSContribution, OSSStats } from '@/types/oss'

export const ossContributions: OSSContribution[] = []

export const ossStats: OSSStats = {
  // Placeholder mode: avoid showing aggregate OSS counts until integrated with real data sources
  liveData: false,
  placeholderMessage: 'Open-source contribution summaries will be available via integration.',
}

export function getAllOSSContributions(): OSSContribution[] {
  return ossContributions
}

export function getOSSStats(): OSSStats {
  return ossStats
}
