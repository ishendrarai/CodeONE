import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Sparkline from '../components/charts/Sparkline';
import { Flame, CheckCircle, Award, TrendingUp, TrendingDown } from 'lucide-react';

const WEEKLY_VELOCITY = [
  { week: 'W38', solved: 12, cf: 8, atc: 4 },
  { week: 'W39', solved: 15, cf: 11, atc: 4 },
  { week: 'W40', solved: 9, cf: 6, atc: 3 },
  { week: 'W41', solved: 18, cf: 12, atc: 6 },
  { week: 'W42', solved: 14, cf: 9, atc: 5 },
  { week: 'W43', solved: 21, cf: 15, atc: 6 },
  { week: 'W44', solved: 16, cf: 10, atc: 6 },
  { week: 'W45', solved: 19, cf: 14, atc: 5 },
  { week: 'W46', solved: 14, cf: 10, atc: 4 },
];

const VERDICT_DATA = [
  { name: 'Accepted (AC)', count: 342, percentage: 71, color: '#16A34A' },
  { name: 'Wrong Answer (WA)', count: 68, percentage: 14, color: '#DC2626' },
  { name: 'Time Limit Exceeded (TLE)', count: 44, percentage: 9, color: '#D97706' },
  { name: 'Memory Limit / Runtime', count: 28, percentage: 6, color: '#8E8E93' },
];

const LANGUAGE_DATA = [
  { name: 'C++20 (GCC 13)', count: 348, percentage: 72, color: '#0052FF' },
  { name: 'Python 3', count: 87, percentage: 18, color: '#D97706' },
  { name: 'Java 21', count: 47, percentage: 10, color: '#16A34A' },
];

const CONTEST_HISTORY = [
  { name: 'Codeforces Round 984 (Div. 3)', date: 'Nov 18, 2024', rank: 412, delta: '+48', newRating: 1782, platform: 'CF' },
  { name: 'AtCoder Beginner Contest 387', date: 'Nov 12, 2024', rank: 820, delta: '+24', newRating: 1340, platform: 'ATC' },
  { name: 'Codeforces Round 983 (Div. 2)', date: 'Nov 04, 2024', rank: 1890, delta: '-32', newRating: 1734, platform: 'CF' },
  { name: 'Codeforces Round 975 (Div. 2)', date: 'Oct 26, 2024', rank: 1240, delta: '+14', newRating: 1766, platform: 'CF' },
  { name: 'AtCoder Regular Contest 186', date: 'Oct 19, 2024', rank: 640, delta: '+38', newRating: 1316, platform: 'ATC' },
  { name: 'Codeforces Round 965 (Div. 2)', date: 'Aug 10, 2024', rank: 290, delta: '+85', newRating: 1845, platform: 'CF' },
];

export default function Analytics() {
  const [velocityRange, setVelocityRange] = useState('weeks');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-ink">Performance Analytics</h1>
        <p className="text-xs text-ink-secondary mt-0.5">
          Deep-dive telemetry into submission verdicts, language pacing, and contest rating changes.
        </p>
      </div>

      {/* ─── Streak Breakdown Metrics ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <span className="mono-label">Active Streak Health</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-mono text-2xl font-bold text-ink">19 Days</span>
            <span className="text-xs text-verdict-ac font-semibold">Healthy (1-Day Recovery Safe)</span>
          </div>
          <p className="text-[11px] text-ink-muted mt-1">Next milestone: 21 Days</p>
        </Card>

        <Card className="p-4">
          <span className="mono-label">All-Time Max Streak</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-mono text-2xl font-bold text-ink">42 Days</span>
            <span className="text-xs text-ink-muted font-mono">May 1 – Jun 11, 2024</span>
          </div>
          <p className="text-[11px] text-ink-muted mt-1">114 problems solved during peak streak</p>
        </Card>

        <Card className="p-4">
          <span className="mono-label">Consistency Score</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-mono text-2xl font-bold text-ink">88.4 / 100</span>
            <span className="text-xs text-verdict-ac font-semibold font-mono">Top 5%</span>
          </div>
          <p className="text-[11px] text-ink-muted mt-1">Based on daily goal completions</p>
        </Card>
      </div>

      {/* ─── Solved Velocity Per Week/Month ─── */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-ink">Weekly Problem-Solving Velocity</h2>
            <p className="text-xs text-ink-secondary mt-0.5">
              Volume solved across Codeforces (blue) and AtCoder (cyan)
            </p>
          </div>
          <Badge variant="accent" size="xs">
            Average: 15.6 / wk
          </Badge>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={WEEKLY_VELOCITY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E0" vertical={false} />
              <XAxis dataKey="week" stroke="#8E8E93" fontSize={11} fontFamily="JetBrains Mono" tickLine={false} />
              <YAxis stroke="#8E8E93" fontSize={11} fontFamily="JetBrains Mono" tickLine={false} axisLine={false} />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0].payload;
                  return (
                    <div className="bg-white border border-app-border rounded-lg p-2.5 shadow-dropdown text-xs font-mono space-y-1">
                      <p className="font-bold text-ink">{d.week}: {d.solved} problems</p>
                      <p className="text-[#1890FF]">Codeforces: {d.cf}</p>
                      <p className="text-[#00C0C0]">AtCoder: {d.atc}</p>
                    </div>
                  );
                }}
              />
              <Bar dataKey="cf" fill="#1890FF" radius={[3, 3, 0, 0]} stackId="a" />
              <Bar dataKey="atc" fill="#00C0C0" radius={[3, 3, 0, 0]} stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* ─── Verdict & Language Distribution Row ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Verdict Distribution */}
        <Card className="p-6">
          <h2 className="text-sm font-semibold text-ink mb-1">Verdict Distribution</h2>
          <p className="text-xs text-ink-secondary mb-4">482 submissions analyzed over past year</p>

          <div className="space-y-3">
            {VERDICT_DATA.map((v) => (
              <div key={v.name} className="space-y-1 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-ink font-medium">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: v.color }} />
                    <span>{v.name}</span>
                  </span>
                  <span className="text-ink-secondary">
                    <span className="font-bold text-ink">{v.count}</span> ({v.percentage}%)
                  </span>
                </div>
                <div className="h-1.5 bg-app-bg border border-app-border rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${v.percentage}%`, backgroundColor: v.color }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Programming Languages */}
        <Card className="p-6">
          <h2 className="text-sm font-semibold text-ink mb-1">Language Breakdown</h2>
          <p className="text-xs text-ink-secondary mb-4">Primary competitive programming languages</p>

          <div className="space-y-3">
            {LANGUAGE_DATA.map((l) => (
              <div key={l.name} className="space-y-1 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-ink font-medium">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }} />
                    <span>{l.name}</span>
                  </span>
                  <span className="text-ink-secondary">
                    <span className="font-bold text-ink">{l.count}</span> ({l.percentage}%)
                  </span>
                </div>
                <div className="h-1.5 bg-app-bg border border-app-border rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${l.percentage}%`, backgroundColor: l.color }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ─── Per-Contest Rating Changes Table ─── */}
      <Card className="p-6">
        <h2 className="text-sm font-semibold text-ink mb-1">Contest Performance & Rating Changes</h2>
        <p className="text-xs text-ink-secondary mb-4">Historical official rated rounds</p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-app-border bg-app-bg text-[10px] uppercase text-ink-muted">
                <th className="py-2.5 px-4 font-semibold">Contest Name</th>
                <th className="py-2.5 px-4 font-semibold">Date</th>
                <th className="py-2.5 px-4 font-semibold">Platform</th>
                <th className="py-2.5 px-4 font-semibold">Rank</th>
                <th className="py-2.5 px-4 font-semibold">Delta</th>
                <th className="py-2.5 px-4 font-semibold text-right">New Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-app-border">
              {CONTEST_HISTORY.map((c, i) => {
                const isPositive = c.delta.startsWith('+');
                return (
                  <tr key={i} className="hover:bg-app-bg transition-colors">
                    <td className="py-3 px-4 font-semibold text-ink">{c.name}</td>
                    <td className="py-3 px-4 text-ink-muted">{c.date}</td>
                    <td className="py-3 px-4 text-ink-secondary">{c.platform}</td>
                    <td className="py-3 px-4 text-ink-secondary font-bold">#{c.rank}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-0.5 font-bold ${
                          isPositive ? 'text-verdict-ac' : 'text-verdict-wa'
                        }`}
                      >
                        {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        <span>{c.delta}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-ink">{c.newRating}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
