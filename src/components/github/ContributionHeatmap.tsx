"use client";

import { useEffect, useState } from "react";
import type { ContributionWeek } from "@/types/github";

const levelColors: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "#2d333b", // Default GitHub dark grey empty cell color
  1: "#0e4429",
  2: "#006d32",
  3: "#26a641",
  4: "#39d353",
};

const DISPLAY_DAYS = [
  { label: "Mon", rowIndex: 1 },
  { label: "Wed", rowIndex: 3 },
  { label: "Fri", rowIndex: 5 },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function getMonthLabels(weeks: ContributionWeek[]) {
  const labels: { label: string; col: number }[] = [];
  let previousMonth = -1;

  weeks.forEach((week, weekIndex) => {
    const validDay = week.days.find((d) => d.date);
    if (!validDay) return;

    const [, monthStr] = validDay.date.split("-").map(Number);
    const month = monthStr - 1;

    if (month !== previousMonth) {
      if (weekIndex === 0 || weekIndex - (labels[labels.length - 1]?.col || 0) > 2) {
        labels.push({
          label: MONTHS[month],
          col: weekIndex,
        });
        previousMonth = month;
      }
    }
  });

  return labels;
}

interface ContributionHeatmapProps {
  weeks: ContributionWeek[];
}

export function ContributionHeatmap({ weeks: rawWeeksFromProps }: ContributionHeatmapProps) {
  const [processedWeeks, setProcessedWeeks] = useState<ContributionWeek[]>([]);

  useEffect(() => {
    const contributionMap: Record<string, { count: number; level: number }> = {};

    if (rawWeeksFromProps) {
      rawWeeksFromProps.flatMap(w => w.days).forEach(day => {
        if (day?.date) {
          contributionMap[day.date] = {
            count: day.count || 0,
            level: day.level || 0,
          };
        }
      });
    }

    const today = new Date();

    // Start exactly 1 year ago from today (not from 1st of month)
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

    // Roll back to Sunday before oneYearAgo
    const currentTracker = new Date(oneYearAgo);
    currentTracker.setDate(currentTracker.getDate() - currentTracker.getDay());

    const rollingWeeks: ContributionWeek[] = [];
    let currentWeek: ContributionWeek = { days: [] };

    while (currentTracker <= today) {
      const y = currentTracker.getFullYear();
      const m = String(currentTracker.getMonth() + 1).padStart(2, "0");
      const d = String(currentTracker.getDate()).padStart(2, "0");
      const dateString = `${y}-${m}-${d}`;

      const dayData = contributionMap[dateString] || { count: 0, level: 0 };

      currentWeek.days.push({
        date: dateString,
        count: dayData.count,
        level: dayData.level as any,
      });

      if (currentWeek.days.length === 7) {
        rollingWeeks.push(currentWeek);
        currentWeek = { days: [] };
      }

      currentTracker.setDate(currentTracker.getDate() + 1);
    }

    // Push any remaining days in the last partial week
    if (currentWeek.days.length > 0) {
      rollingWeeks.push(currentWeek);
    }

    setProcessedWeeks(rollingWeeks);
  }, [rawWeeksFromProps]);

  if (processedWeeks.length === 0) {
    return <div className="w-full h-[110px] bg-[#0d1117] rounded-md animate-pulse border border-[#30363d]" />;
  }

  const monthLabels = getMonthLabels(processedWeeks);
  const totalContributions = processedWeeks
    .flatMap((w) => w.days)
    .reduce((sum, d) => sum + (d.count || 0), 0);


  return (
    <div className="font-sans select-none text-[#e6edf3] w-full">
      <div className="mb-2">
        <span className="text-sm font-normal text-[#848d97]">
          {totalContributions.toLocaleString()} contributions in the last year
        </span>
      </div>

      <div className="overflow-x-auto text-[12px] pb-1">
        <div className="relative flex flex-col pt-5">
          
          {/* Month Labels */}
          <div className="absolute top-0 left-[28px] h-4 right-0 flex pointer-events-none">
            {monthLabels.map(({ label, col }) => (
              <span
                key={`${label}-${col}`}
                className="absolute text-[11px] text-[#848d97]"
                style={{ left: `${col * 12}px` }}
              >
                {label}
              </span>
            ))}
          </div>

          <div className="flex gap-[4px] mt-1">
            {/* Weekday Sidebar */}
            <div className="relative w-[24px] h-[82px] text-[#848d97]">
              {DISPLAY_DAYS.map(({ label, rowIndex }) => (
                <span
                  key={label}
                  className="absolute text-[11px] text-right right-1"
                  style={{
                    top: `${rowIndex * 12}px`,
                    lineHeight: "10px",
                  }}
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Heatmap Grid */}
            <div className="flex gap-[2px]">
              {processedWeeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[2px]">
                  {week.days.map((day, di) => (
                    <div
                      key={di}
                      title={day.count > 0 ? `${day.count} contributions on ${day.date}` : `No contributions on ${day.date}`}
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "2px",
                        backgroundColor: levelColors[day.level],
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Scale Legend Footer */}
          <div className="flex items-center justify-end gap-1 mt-3 mr-2 text-[11px] text-[#848d97]">
            <span>Less</span>
            {([0, 1, 2, 3, 4] as const).map((l) => (
              <div
                key={l}
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "2px",
                  backgroundColor: levelColors[l],
                }}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}