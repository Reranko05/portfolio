import type { ContributionWeek } from '@/types/github'
import React from 'react'

const levelColors: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: '#2d333b',
  1: '#0e4429',
  2: '#006d32',
  3: '#26a641',
  4: '#39d353',
}

const CELL_SIZE = 10
const CELL_GAP = 2
const STEP = CELL_SIZE + CELL_GAP
const MONTH_GAP = 8

type DayMap = Map<string, { count: number; level: 0 | 1 | 2 | 3 | 4 }>

interface DayEntry {
  dateStr: string
  dateObj: Date
  level: 0 | 1 | 2 | 3 | 4
  count: number
}

interface MonthBlock {
  key: string
  label: string
  days: DayEntry[]
}

function buildDayMap(weeks: ContributionWeek[]): DayMap {
  const map: DayMap = new Map()

  for (const week of weeks) {
    for (const day of week.days) {
      if (day?.date) {
        map.set(day.date, {
          count: day.count,
          level: day.level,
        })
      }
    }
  }

  return map
}

function calculateStats(dayMap: DayMap) {
  const entries = [...dayMap.entries()]
    .filter(([, v]) => v.count > 0)
    .sort(([a], [b]) => a.localeCompare(b))

  const activeDays = entries.length

  let maxStreak = 0
  let currentStreak = 0

  for (let i = 0; i < entries.length; i++) {
    if (i === 0) {
      currentStreak = 1
      maxStreak = 1
      continue
    }

    const prev = new Date(entries[i - 1][0])
    const curr = new Date(entries[i][0])

    const diff =
      (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24)

    if (diff === 1) {
      currentStreak++
    } else {
      currentStreak = 1
    }

    maxStreak = Math.max(maxStreak, currentStreak)
  }

  return {
    activeDays,
    maxStreak,
  }
}

export function LeetCodeHeatmap({
  weeks,
}: {
  weeks: ContributionWeek[]
}) {
  const dayMap = buildDayMap(weeks)

  const today = new Date()

  const daysArray: DayEntry[] = []

  for (let i = 364; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)

    const dateStr = d.toISOString().split('T')[0]

    const data = dayMap.get(dateStr)

    daysArray.push({
      dateStr,
      dateObj: d,
      level: data?.level ?? 0,
      count: data?.count ?? 0,
    })
  }

  const monthBlocks: MonthBlock[] = []

  daysArray.forEach((day) => {
    const year = day.dateObj.getFullYear()
    const month = day.dateObj.getMonth()

    const key = `${year}-${month}`

    let block = monthBlocks.find((b) => b.key === key)

    if (!block) {
      block = {
        key,
        label: day.dateObj.toLocaleString('en-US', {
          month: 'short',
        }),
        days: [],
      }

      monthBlocks.push(block)
    }

    block.days.push(day)
  })

  let currentX = 0

  const positionedBlocks = monthBlocks.map((block) => {
    const firstDayOffset = block.days[0].dateObj.getDay()

    const totalCells = block.days.length + firstDayOffset

    const colCount = Math.ceil(totalCells / 7)

    const blockWidth = colCount * STEP - CELL_GAP

    const xPosition = currentX

    currentX += blockWidth + MONTH_GAP

    return {
      ...block,
      x: xPosition,
      firstDayOffset,
    }
  })

  const svgWidth = currentX - MONTH_GAP
  const svgHeight = 7 * STEP + 14

  const totalSubmissions = [...dayMap.values()].reduce(
    (sum, item) => sum + item.count,
    0
  )

  const stats = calculateStats(dayMap)

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <span
          className="text-sm"
          style={{
            color: 'var(--color-gh-text-muted)',
          }}
        >
          {totalSubmissions.toLocaleString()} submissions in the past one year
        </span>

        <div
          className="flex items-center gap-6 text-xs"
          style={{
            color: 'var(--color-gh-text-muted)',
          }}
        >
          <span>
            Total active days:{' '}
            <span className="font-semibold text-white">
              {stats.activeDays}
            </span>
          </span>

          <span>
            Max streak:{' '}
            <span className="font-semibold text-white">
              {stats.maxStreak}
            </span>
          </span>
        </div>
      </div>

      <div className="overflow-x-auto pb-2">
        <svg
          width={svgWidth}
          height={svgHeight}
          style={{
            display: 'block',
          }}
        >
          {positionedBlocks.map((block) => (
            <g
              key={block.key}
              transform={`translate(${block.x},18)`}
            >
              <text
                x={0}
                y={-6}
                style={{
                  fontSize: '12px',
                  fill: 'var(--color-gh-text-muted)',
                }}
              >
                {block.label}
              </text>

              {block.days.map((day, index) => {
                const paddedIndex =
                  index + block.firstDayOffset

                const colIndex = Math.floor(
                  paddedIndex / 7
                )

                const rowIndex = paddedIndex % 7

                return (
                  <rect
                    key={day.dateStr}
                    x={colIndex * STEP}
                    y={rowIndex * STEP}
                    width={CELL_SIZE}
                    height={CELL_SIZE}
                    rx={2}
                    ry={2}
                    fill={levelColors[day.level]}
                  >
                    {/* Fixed Flat String Format */}
                    <title>{`${day.count} submissions on ${day.dateStr}`}</title>
                  </rect>
                )
              })}
            </g>
          ))}
        </svg>
      </div>

      <div
        className="flex items-center justify-end gap-1 mt-3 text-xs"
        style={{
          color: 'var(--color-gh-text-muted)',
        }}
      >
        <span className="mr-1">Less</span>

        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              backgroundColor:
                levelColors[level as 0 | 1 | 2 | 3 | 4],
            }}
          />
        ))}

        <span className="ml-1">More</span>
      </div>
    </div>
  )
}

export default LeetCodeHeatmap