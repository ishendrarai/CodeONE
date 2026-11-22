import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const DATA = [
  { name: 'Easy', count: 312, percentage: 32, color: '#16A34A' },
  { name: 'Medium', count: 492, percentage: 50, color: '#D97706' },
  { name: 'Hard', count: 175, percentage: 18, color: '#DC2626' },
];

export default function DifficultyChart() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
      {/* Donut Chart with Centered Total */}
      <div className="relative w-44 h-44 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={DATA}
              innerRadius={52}
              outerRadius={74}
              paddingAngle={3}
              dataKey="count"
              strokeWidth={0}
            >
              {DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0].payload;
                return (
                  <div className="bg-white border border-app-border rounded p-2 shadow-dropdown text-xs font-mono">
                    <span className="font-bold" style={{ color: d.color }}>{d.name}: </span>
                    <span>{d.count} ({d.percentage}%)</span>
                  </div>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Centered Total */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="font-mono text-2xl font-bold text-ink leading-none">979</span>
          <span className="font-mono text-[10px] uppercase text-ink-muted mt-0.5">Solved</span>
        </div>
      </div>

      {/* Breakdown Legend */}
      <div className="flex-1 w-full space-y-3">
        {DATA.map((item) => (
          <div key={item.name} className="space-y-1">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="flex items-center gap-1.5 font-medium text-ink">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span>{item.name}</span>
              </span>
              <span className="text-ink-secondary">
                <span className="font-bold text-ink">{item.count}</span> / 979 ({item.percentage}%)
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-app-bg border border-app-border rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
