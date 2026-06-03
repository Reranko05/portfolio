import type { ContributionWeek } from "@/types/github";

const levelColors: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "var(--color-gh-elevated)",
  1: "#0e4429",
  2: "#006d32",
  3: "#26a641",
  4: "#39d353",
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function getMonthLabels(weeks: ContributionWeek[]) {
  const labels: { label: string; col: number }[] = [];
  let lastMonth = -1;

  weeks.forEach((week, i) => {
    const date = new Date(week.days[0]?.date || "");
    const month = date.getMonth();
    if (month !== lastMonth) {
      labels.push({ label: MONTHS[month], col: i });
      lastMonth = month;
    }
  });

  return labels;
}

export function ContributionHeatmap({ weeks }: { weeks: ContributionWeek[] }) {
  const monthLabels = getMonthLabels(weeks);
  const totalContributions = weeks
    .flatMap((w) => w.days)
    .reduce((sum, d) => sum + d.count, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs" style={{ color: "var(--color-gh-text-muted)" }}>
          {totalContributions.toLocaleString()} contributions in the last year
        </span>
      </div>

      {/* Heatmap grid */}
      <div className="overflow-x-auto">
        <div style={{ minWidth: "660px" }}>
          {/* Month labels */}
          <div
            className="flex text-xs mb-1"
            style={{ marginLeft: "28px", color: "var(--color-gh-text-muted)" }}
          >
            {monthLabels.map(({ label, col }) => (
              <span
                key={`${label}-${col}`}
                style={{ position: "relative", left: `${col * 13}px` }}
              >
                {label}
              </span>
            ))}
          </div>

          <div className="flex gap-1">
            {/* Day labels */}
            <div className="flex flex-col gap-0.5 pr-1">
              {DAYS.map((day, i) => (
                <span
                  key={day}
                  className="text-xs h-3 leading-3 text-right"
                  style={{
                    color: "var(--color-gh-text-muted)",
                    fontSize: "10px",
                    width: "24px",
                    opacity: i % 2 === 0 ? 1 : 0,
                  }}
                >
                  {day}
                </span>
              ))}
            </div>

            {/* Weeks */}
            <div className="flex gap-0.5">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-0.5">
                  {week.days.map((day, di) => (
                    <div
                      key={di}
                      className="heatmap-cell w-3 h-3 rounded-sm"
                      title={`${day.count} contributions on ${day.date}`}
                      style={{ backgroundColor: levelColors[day.level] }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div
            className="flex items-center justify-end gap-1 mt-2 text-xs"
            style={{ color: "var(--color-gh-text-muted)" }}
          >
            <span>Less</span>
            {([0, 1, 2, 3, 4] as const).map((l) => (
              <div
                key={l}
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: levelColors[l] }}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
