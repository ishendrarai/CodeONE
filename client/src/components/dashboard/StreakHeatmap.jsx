import { useMemo } from 'react';

// Generate mock 365-day data for display
function generateMockData() {
  const days = [];
  const now = new Date();
  for (let i = 364; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const count = Math.random() < 0.35
      ? 0
      : Math.floor(Math.random() * 7) + 1;
    days.push({ date: d, count });
  }
  return days;
}

function getIntensity(count) {
  if (count === 0) return 0;
  if (count <= 1) return 1;
  if (count <= 3) return 2;
  if (count <= 5) return 3;
  return 4;
}

const HEAT_COLORS = ['#E8EAF0', '#C5BFFB', '#9B91F5', '#7267EF', '#5145E5'];

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS   = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

export default function StreakHeatmap({ data }) {
  const days = useMemo(() => data || generateMockData(), [data]);

  // Group into weeks (columns of 7)
  const weeks = useMemo(() => {
    const result = [];
    for (let i = 0; i < days.length; i += 7) {
      result.push(days.slice(i, i + 7));
    }
    return result;
  }, [days]);

  // Month labels
  const monthLabels = useMemo(() => {
    const labels = [];
    let lastMonth = -1;
    weeks.forEach((week, wi) => {
      const m = week[0]?.date?.getMonth();
      if (m !== lastMonth) {
        labels.push({ col: wi, label: MONTHS[m] });
        lastMonth = m;
      }
    });
    return labels;
  }, [weeks]);

  const totalSolved = days.reduce((s, d) => s + d.count, 0);
  const activeDays  = days.filter((d) => d.count > 0).length;

  return (
    <div className="card p-4">
      <div className="section-header">
        <div>
          <h3 className="text-sm font-semibold text-text-primary">Activity Heatmap</h3>
          <p className="text-xs text-text-muted mt-0.5">
            {totalSolved} problems solved across {activeDays} active days this year
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-text-muted">
          <span>Less</span>
          {HEAT_COLORS.map((c, i) => (
            <span key={i} className="w-3 h-3 rounded-sm inline-block" style={{ background: c }} />
          ))}
          <span>More</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-max">
          {/* Month labels row */}
          <div className="flex ml-7 mb-1" style={{ gap: '2px' }}>
            {weeks.map((_, wi) => {
              const lbl = monthLabels.find((m) => m.col === wi);
              return (
                <div key={wi} className="w-3 text-2xs text-text-muted" style={{ minWidth: '12px' }}>
                  {lbl?.label ?? ''}
                </div>
              );
            })}
          </div>

          <div className="flex" style={{ gap: '2px' }}>
            {/* Day labels */}
            <div className="flex flex-col mr-1" style={{ gap: '2px' }}>
              {DAYS.map((d, i) => (
                <div key={i} className="h-3 text-2xs text-text-muted flex items-center" style={{ minHeight: '12px' }}>
                  {d}
                </div>
              ))}
            </div>

            {/* Grid */}
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col" style={{ gap: '2px' }}>
                {week.map((day, di) => {
                  const intensity = getIntensity(day.count);
                  return (
                    <div
                      key={di}
                      title={`${day.date?.toDateString()}: ${day.count} solved`}
                      className="w-3 h-3 rounded-sm cursor-default transition-opacity hover:opacity-70"
                      style={{ background: HEAT_COLORS[intensity], minWidth: '12px', minHeight: '12px' }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
