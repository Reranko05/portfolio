import type { ContributionWeek } from '@/types/github'
import React from 'react'

const levelColors: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: '#2d333b',
  1: '#0e4429',
  2: '#006d32',
  3: '#26a641',
  4: '#39d353',
}
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function getMonthLabels(weeks: ContributionWeek[]) {
  const labels: Array<string | null> = Array.from({ length: weeks.length }).map(() => null)
  let lastMonth = -1
  weeks.forEach((week, i) => {
    const dateStr = week.days[0]?.date
    if (!dateStr) return
    const date = new Date(dateStr)
    const month = date.getMonth()
    if (month !== lastMonth) {
      labels[i] = MONTHS[month]
      lastMonth = month
    }
  })
  return labels
}

export function LeetCodeHeatmap({ weeks }: { weeks: ContributionWeek[] }) {
  const monthLabels = getMonthLabels(weeks)
  const total = weeks.flatMap((w) => w.days).reduce((s, d) => s + d.count, 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs" style={{ color: 'var(--color-gh-text-muted)' }}>
          {total.toLocaleString()} submissions in the last year
        </span>
      </div>

      <div className="overflow-x-auto">
        <div style={{ minWidth: '660px' }}>
          <div className="flex text-xs mb-1" style={{ color: 'var(--color-gh-text-muted)' }}>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              {monthLabels.map((label, i) => (
                <span key={i} style={{ width: '13px', textAlign: 'center', fontSize: '12px' }}>
                  {label ?? ''}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-1">
            <div className="flex gap-0.5">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-0.5">
                  {week.days.map((day, di) => (
                    <div
                      key={di}
                      role="button"
                      tabIndex={0}
                      aria-label={`${day.count} submissions on ${day.date}`}
                      title={`${day.count} submissions on ${day.date}`}
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: levelColors[day.level] }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-1 mt-2 text-xs" style={{ color: 'var(--color-gh-text-muted)' }}>
            <span>Less</span>
            {([0, 1, 2, 3, 4] as const).map((l) => (
              <div key={l} className="w-3 h-3 rounded-sm" style={{ backgroundColor: levelColors[l] }} />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeetCodeHeatmap
