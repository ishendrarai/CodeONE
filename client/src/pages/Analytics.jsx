import { useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend,
} from 'recharts';
import StatsCard    from '../components/dashboard/StatsCard';
import ProgressChart from '../components/dashboard/ProgressChart';
import { Code2, Flame, BookOpen, TrendingUp } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) { return twMerge(clsx(inputs)); }

// ─── Mock data ────────────────────────────────────────────────
const WEEKLY_ACTIVITY = [
  { day: 'Mon', count: 4 }, { day: 'Tue', count: 7 }, { day: 'Wed', count: 2 },
  { day: 'Thu', count: 9 }, { day: 'Fri', count: 5 }, { day: 'Sat', count: 11 },
  { day: 'Sun', count: 3 },
];

const RATING_HISTORY = [
  { date: 'Aug', leetcode: 1680, codeforces: 1420, codechef: 1580 },
  { date: 'Sep', leetcode: 1710, codeforces: 1510, codechef: 1620 },
  { date: 'Oct', leetcode: 1760, codeforces: 1570, codechef: 1660 },
  { date: 'Nov', leetcode: 1842, codeforces: 1621, codechef: 1704 },
];

const DIFFICULTY_DIST = [
  { name: 'Easy',   value: 340, color: '#16A34A' },
  { name: 'Medium', value: 380, color: '#D97706' },
  { name: 'Hard',   value: 122, color: '#DC2626' },
];

const TOPIC_DATA = [
  { topic: 'Arrays & Hashing',    solved: 95, total: 110 },
  { topic: 'Dynamic Programming', solved: 42, total: 80  },
  { topic: 'Graphs',              solved: 28, total: 70  },
  { topic: 'Trees & BST',         solved: 60, total: 72  },
  { topic: 'Binary Search',       solved: 34, total: 45  },
];

const RANGE_OPTIONS = ['7D', '30D', '90D', '1Y'];

const PLATFORM_LINES = [
  { key: 'leetcode',   color: '#FFA116', label: 'LeetCode'   },
  { key: 'codeforces', color: '#1890FF', label: 'Codeforces' },
  { key: 'codechef',   color: '#5B4638', label: 'CodeChef'   },
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface border border-border rounded-lg shadow-dropdown p-2.5 text-xs">
      <p className="font-medium text-text-primary mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}: <span className="font-semibold">{p.value}</span>
        </p>
      ))}
    </div>
  );
}

export default function Analytics() {
  const [range, setRange] = useState('30D');

  return (
    <div className="page-container">

      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-text-primary">Performance Analytics</h1>
          <p className="text-sm text-text-secondary mt-0.5">Understand your coding patterns and growth</p>
        </div>

        {/* Time range tabs */}
        <div className="flex bg-surface-overlay rounded-lg p-0.5 border border-border">
          {RANGE_OPTIONS.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                'px-3 h-7 text-xs font-medium rounded-md transition-all duration-100',
                range === r
                  ? 'bg-surface text-text-primary shadow-card'
                  : 'text-text-secondary hover:text-text-primary'
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* ── KPI row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <StatsCard label="Solved This Period" value="142"   sub="Last 30 days"        trend={18}  icon={Code2}      accentColor="#5145E5" />
        <StatsCard label="Consistency Score"  value="78%"   sub="Based on daily goals" trend={5}   icon={Flame}      accentColor="#D97706" />
        <StatsCard label="Topics Explored"    value="12"    sub="Active this month"    trend={0}   icon={BookOpen}   accentColor="#16A34A" />
        <StatsCard label="Rating Change"      value="+162"  sub="Avg across platforms" trend={12}  icon={TrendingUp} accentColor="#5145E5" />
      </div>

      {/* ── Row 1: Weekly activity + Consistency ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">

        {/* Weekly bar chart */}
        <div className="card p-4 lg:col-span-2">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Weekly Solving Activity</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={WEEKLY_ACTIVITY} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8EAF0" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#747B8C' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#747B8C' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F1F3F9' }} />
              <Bar dataKey="count" name="Problems" fill="#5145E5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Consistency ring */}
        <div className="card p-4 flex flex-col items-center justify-center">
          <h3 className="text-sm font-semibold text-text-primary mb-4 self-start">Difficulty Mix</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={DIFFICULTY_DIST}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
              >
                {DIFFICULTY_DIST.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex gap-3 mt-2">
            {DIFFICULTY_DIST.map((d) => (
              <span key={d.name} className="flex items-center gap-1 text-xs text-text-secondary">
                <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                {d.name} ({d.value})
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 2: Topic mastery + placeholder ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div className="card p-4">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Topic Mastery</h3>
          <ProgressChart data={TOPIC_DATA} />
        </div>

        <div className="card p-4">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Monthly Solved</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              data={[
                { month: 'Aug', solved: 68 }, { month: 'Sep', solved: 82 },
                { month: 'Oct', solved: 97 }, { month: 'Nov', solved: 42 },
              ]}
              barSize={32}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E8EAF0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#747B8C' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#747B8C' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F1F3F9' }} />
              <Bar dataKey="solved" name="Solved" fill="#8B83F0" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Rating progression ── */}
      <div className="card p-4 mb-4">
        <h3 className="text-sm font-semibold text-text-primary mb-4">Rating Progression</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={RATING_HISTORY}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8EAF0" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#747B8C' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#747B8C' }} axisLine={false} tickLine={false} domain={['auto', 'auto']} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '11px', color: '#747B8C' }}
              iconType="circle"
              iconSize={8}
            />
            {PLATFORM_LINES.map((p) => (
              <Line
                key={p.key}
                type="monotone"
                dataKey={p.key}
                name={p.label}
                stroke={p.color}
                strokeWidth={2}
                dot={{ r: 3, fill: p.color }}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ── Insight banner ── */}
      <div className="card p-4 border-l-4 border-l-accent bg-accent-light/30">
        <p className="text-sm font-medium text-text-primary mb-1">📊 Performance Insight</p>
        <p className="text-sm text-text-secondary">
          Your solving rate is <span className="font-medium text-accent">18% higher</span> than last month.
          You're strongest on weekdays — try maintaining that momentum on weekends.
          Focus on <span className="font-medium text-text-primary">Dynamic Programming</span> to unlock your next skill tier.
        </p>
      </div>
    </div>
  );
}
