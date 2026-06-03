"use client"
import React from 'react'
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ContributionHeatmap } from '@/components/github/ContributionHeatmap'
import useContributions from '@/hooks/useContributions'

export function GitHubActivity() {
  const { data, error, isLoading } = useContributions('Reranko05')

  return (
    <section>
      <SectionHeader
        title="📊 GitHub Activity"
        description={data ? `@${data.username}` : 'GitHub'}
      />
      <div
        className="p-4 rounded-lg space-y-4"
        style={{
          backgroundColor: "var(--color-gh-surface)",
          border: "1px solid var(--color-gh-border)",
        }}
      >
        {error || (data && data.error) ? (
          <div className="py-8 text-center" style={{ color: 'var(--color-gh-text-muted)' }}>
            Contribution data unavailable.
          </div>
        ) : isLoading || !data ? (
          <div className="py-8 text-center" style={{ color: 'var(--color-gh-text-muted)' }}>
            Loading GitHub data...
          </div>
        ) : (
          <>
            <ContributionHeatmap weeks={data.weeks} />

            <div className="flex items-center justify-between">
              <div className="text-sm" style={{ color: 'var(--color-gh-text)' }}>
                @{data.username}
              </div>
              <div className="text-sm font-mono" style={{ color: 'var(--color-gh-text)' }}>
                {data.totalContributions?.toLocaleString() ?? 0} contributions last year
              </div>
            </div>

            {data.topLanguages && (
              <div>
                <div className="text-xs mb-2" style={{ color: 'var(--color-gh-text-muted)' }}>
                  Language distribution
                </div>
                <div className="flex h-2 rounded-full overflow-hidden">
                  {data.topLanguages.map((lang: any) => (
                    <div key={lang.name} style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }} title={`${lang.name}: ${lang.percentage}%`} />
                  ))}
                </div>
                <div className="flex gap-3 mt-2 text-xs" style={{ color: 'var(--color-gh-text-muted)' }}>
                  {data.topLanguages.map((lang: any) => (
                    <div key={lang.name} className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
                      {lang.name} {lang.percentage}%
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
