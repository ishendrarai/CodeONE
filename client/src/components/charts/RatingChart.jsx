import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';

const MOCK_RATING_DATA = [
  { date: 'Dec 23', cf: 1540, atc: 1120, contest: 'Round 912' },
  { date: 'Jan 24', cf: 1585, atc: 1180, contest: 'Round 918' },
  { date: 'Feb 24', cf: 1620, atc: 1210, contest: 'ABC 341' },
  { date: 'Mar 24', cf: 1610, atc: 1245, contest: 'Round 930' },
  { date: 'Apr 24', cf: 1690, atc: 1260, contest: 'Round 938' },
  { date: 'May 24', cf: 1720, atc: 1290, contest: 'ABC 352' },
  { date: 'Jun 24', cf: 1715, atc: 1310, contest: 'Edu 166' },
  { date: 'Jul 24', cf: 1760, atc: 1325, contest: 'Round 958' },
  { date: 'Aug 24', cf: 1845, atc: 1380, contest: 'Round 965 (Peak)' },
  { date: 'Sep 24', cf: 1766, atc: 1350, contest: 'Round 975' },
  { date: 'Oct 24', cf: 1734, atc: 1316, contest: 'Round 983' },
  { date: 'Nov 24', cf: 1782, atc: 1340, contest: 'Round 984' },
];

export default function RatingChart() {
  const [range, setRange] = useState('ALL');

  return (
    <div className="space-y-4">
      {/* Range Switcher & Legend */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1890FF]" />
            <span className="text-ink font-semibold">Codeforces: 1,782</span>
            <span className="text-ink-muted">(Max: 1,845)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00C0C0]" />
            <span className="text-ink font-semibold">AtCoder: 1,340</span>
          </div>
        </div>

        {/* Range Switcher */}
        <div className="flex items-center gap-1 bg-app-bg border border-app-border rounded-lg p-0.5 text-[10px] font-mono">
          {['3M', '6M', '1Y', 'ALL'].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-2 py-0.5 rounded transition-colors ${
                range === r ? 'bg-white text-ink font-bold shadow-sm' : 'text-ink-muted hover:text-ink'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Recharts Area */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={MOCK_RATING_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E0" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="#8E8E93"
              fontSize={11}
              fontFamily="JetBrains Mono"
              tickLine={false}
              axisLine={{ stroke: '#E5E5E0' }}
            />
            <YAxis
              domain={[1000, 2000]}
              stroke="#8E8E93"
              fontSize={11}
              fontFamily="JetBrains Mono"
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0].payload;
                return (
                  <div className="bg-white border border-app-border rounded-lg p-2.5 shadow-dropdown text-xs font-mono space-y-1">
                    <p className="font-bold text-ink">{d.date} — {d.contest}</p>
                    <p className="text-[#1890FF]">Codeforces: <span className="font-bold">{d.cf}</span></p>
                    <p className="text-[#00C0C0]">AtCoder: <span className="font-bold">{d.atc}</span></p>
                  </div>
                );
              }}
            />
            {/* Candidate Master Target Line */}
            <ReferenceLine
              y={1900}
              stroke="#0B0B0F"
              strokeDasharray="4 4"
              strokeOpacity={0.4}
              label={{ value: '1900 CM', position: 'insideTopRight', fill: '#0B0B0F', fontSize: 10, fontFamily: 'JetBrains Mono' }}
            />
            <Line
              type="monotone"
              dataKey="cf"
              stroke="#1890FF"
              strokeWidth={2}
              dot={{ r: 3, fill: '#1890FF', strokeWidth: 0 }}
              activeDot={{ r: 5, stroke: '#FFFFFF', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="atc"
              stroke="#00C0C0"
              strokeWidth={1.5}
              strokeDasharray="2 2"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
