import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const HEAT_COLORS = [
  '#EDEDEA', // 0
  '#D4E2FF', // 1
  '#93BAFF', // 2
  '#4285FF', // 3
  '#0052FF', // 4
];

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

export default function Heatmap({ data = [] }) {
  const [hoveredCell, setHoveredCell] = useState(null);

  // Group days into columns of 7 days (weeks)
  const weeks = useMemo(() => {
    const cols = [];
    for (let i = 0; i < data.length; i += 7) {
      cols.push(data.slice(i, i + 7));
    }
    return cols;
  }, [data]);

  // Derive month label positions
  const monthHeaders = useMemo(() => {
    const headers = [];
    let lastMonth = -1;
    weeks.forEach((week, colIdx) => {
      const firstDay = week[0]?.date;
      if (firstDay) {
        const m = firstDay.getMonth();
        if (m !== lastMonth) {
          headers.push({ col: colIdx, label: MONTH_NAMES[m] });
          lastMonth = m;
        }
      }
    });
    return headers;
  }, [weeks]);

  const totalSubmissions = useMemo(
    () => data.reduce((acc, d) => acc + (d.count || 0), 0),
    [data]
  );
  const activeDays = useMemo(
    () => data.filter((d) => (d.count || 0) > 0).length,
    [data]
  );

  return (
    <div className="space-y-3">
      {/* Heatmap Matrix Header */}
      <div className="flex items-center justify-between text-xs text-ink-secondary">
        <div>
          <span className="font-semibold text-ink font-mono">{totalSubmissions}</span> submissions across{' '}
          <span className="font-semibold text-ink font-mono">{activeDays}</span> active days
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-ink-muted">
          <span>Less</span>
          {HEAT_COLORS.map((col, idx) => (
            <span
              key={idx}
              className="w-2.5 h-2.5 rounded-[2px]"
              style={{ backgroundColor: col }}
            />
          ))}
          <span>More</span>
        </div>
      </div>

      {/* SVG / Grid Container */}
      <div className="relative overflow-x-auto pb-1">
        <div className="min-w-[720px]">
          {/* Month labels row */}
          <div className="flex pl-8 mb-1.5 h-3.5 relative text-[10px] font-mono text-ink-muted">
            {monthHeaders.map((mh, idx) => (
              <span
                key={idx}
                className="absolute"
                style={{ left: `${mh.col * 14 + 32}px` }}
              >
                {mh.label}
              </span>
            ))}
          </div>

          {/* Grid Rows */}
          <div className="flex">
            {/* Day of week labels */}
            <div className="flex flex-col gap-1 pr-2 text-[10px] font-mono text-ink-muted w-8 shrink-0 select-none">
              {DAY_LABELS.map((label, idx) => (
                <div key={idx} className="h-2.5 flex items-center leading-none">
                  {label}
                </div>
              ))}
            </div>

            {/* Heatmap Columns */}
            <div className="flex gap-1">
              {weeks.map((week, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-1">
                  {week.map((day, rowIdx) => {
                    const color = HEAT_COLORS[day.intensity] || HEAT_COLORS[0];
                    return (
                      <motion.div
                        key={day.dateString || `${colIdx}_${rowIdx}`}
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: colIdx * 0.008,
                          duration: 0.2,
                        }}
                        onMouseEnter={() => setHoveredCell(day)}
                        onMouseLeave={() => setHoveredCell(null)}
                        className="w-2.5 h-2.5 rounded-[2px] transition-transform hover:scale-125 cursor-pointer relative"
                        style={{ backgroundColor: color }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hover Tooltip */}
        {hoveredCell && (
          <div className="mt-2 text-xs font-mono text-ink-secondary bg-app-bg border border-app-border rounded px-2.5 py-1 inline-block">
            <span className="font-semibold text-ink">
              {hoveredCell.count === 0 ? 'No' : hoveredCell.count} submissions
            </span>{' '}
            on {format(hoveredCell.date, 'EEEE, MMMM d, yyyy')}
          </div>
        )}
      </div>
    </div>
  );
}
