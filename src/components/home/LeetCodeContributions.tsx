import { SectionHeader } from '@/components/shared/SectionHeader'
import LeetCodeHeatmap from '@/components/leetcode/LeetCodeHeatmap'
import { fetchLeetCodeData } from '@/lib/leetcode'

export default async function LeetCodeContributions() {
  const username = 'aadityasri03'
  const res = await fetchLeetCodeData(username)
  const stats = res.stats

  return (
    <section>
      <SectionHeader title="⚡ LeetCode Contributions" description={`@${username}`} />
      <div
        className="p-4 rounded-lg"
        style={{ backgroundColor: 'var(--color-gh-surface)', border: '1px solid var(--color-gh-border)' }}
      >
        {stats.liveData === false ? (
          <div className="py-6 text-center" style={{ color: 'var(--color-gh-text-muted)' }}>
            LeetCode data unavailable.
          </div>
        ) : (
          <>
            <LeetCodeHeatmap weeks={stats.heatmap?.weeks ?? []} />
          </>
        )}
      </div>
    </section>
  )
}
