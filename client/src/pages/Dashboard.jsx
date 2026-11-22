import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Code2,
  Flame,
  Calendar,
  Trophy,
  RefreshCw,
  Target,
  ExternalLink,
  Clock,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Zap,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import ProgressRing from '../components/ui/ProgressRing';
import Heatmap from '../components/charts/Heatmap';
import RatingChart from '../components/charts/RatingChart';
import DifficultyChart from '../components/charts/DifficultyChart';
import TopicBars from '../components/charts/TopicBars';
import { useCountdown } from '../hooks/useCountdown';
import { useCountUp } from '../hooks/useCountUp';
import { fetchDashboardSummary } from '../data/mockService';
import { DEMO_USER } from '../data/mockUser';
import { formatTimeAgo, getVerdictBadgeClass } from '../lib/format';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncingPlatform, setSyncingPlatform] = useState(null);

  useEffect(() => {
    fetchDashboardSummary().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  const nextContestTime = data?.upcomingContests?.[0]?.startTime;
  const countdown = useCountdown(nextContestTime);

  const solvedCount = useCountUp(data?.stats?.totalSolved || 979, 700);
  const streakDays = useCountUp(data?.stats?.currentStreak || 19, 700);
  const cfRating = useCountUp(1782, 700);

  const handleSyncPlatform = (platformId) => {
    setSyncingPlatform(platformId);
    setTimeout(() => {
      setSyncingPlatform(null);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-[#EDEDEA] rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-white border border-app-border rounded-card animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ─── Top Header & Greeting ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-ink">
              Welcome back, {DEMO_USER.name} 👋
            </h1>
            <Badge variant="accent" size="xs">
              Candidate Master
            </Badge>
          </div>
          <p className="text-xs text-ink-secondary mt-0.5">
            Synchronized CP intelligence across Codeforces and AtCoder • 19-day active streak
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/coach">
            <Button variant="secondary" size="sm" leftIcon={<Zap size={13} className="text-accent" />}>
              Ask AI Coach
            </Button>
          </Link>
          <Link to="/goals">
            <Button variant="primary" size="sm" leftIcon={<Target size={13} />}>
              Set Target
            </Button>
          </Link>
        </div>
      </div>

      {/* ─── "Today" Focus Banner ─── */}
      <Card className="p-5 bg-gradient-to-r from-white via-white to-blue-50/40 border-app-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Daily Goal Ring */}
          <div className="flex items-center gap-4">
            <ProgressRing progress={100} size={54} strokeWidth={5}>
              <span className="font-mono text-xs font-bold text-ink">2/2</span>
            </ProgressRing>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-ink">Daily Goal Met</span>
                <CheckCircle size={13} className="text-verdict-ac" />
              </div>
              <p className="text-[11px] text-ink-secondary mt-0.5">2 Accepted submissions logged today</p>
            </div>
          </div>

          {/* Current Streak Status */}
          <div className="flex items-center gap-3.5 md:border-x md:border-app-border md:px-6">
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 shrink-0">
              <Flame size={20} className="fill-amber-500" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-mono text-lg font-bold text-ink">19 Days</span>
                <span className="text-[10px] font-mono text-ink-muted">(Best: 42d)</span>
              </div>
              <p className="text-[11px] text-ink-secondary mt-0.5">Next milestone: 21 Days (3 wks)</p>
            </div>
          </div>

          {/* Next Contest Live Ticking Countdown */}
          <div className="flex items-center justify-between md:pl-2">
            <div>
              <p className="mono-label">Next Live Contest</p>
              <p className="text-xs font-bold text-ink truncate mt-0.5 max-w-[180px]">
                {data.upcomingContests?.[0]?.title}
              </p>
              <p className="text-[10px] font-mono text-verdict-ac font-semibold">Registered</p>
            </div>
            <div className="text-right font-mono bg-white border border-app-border px-3 py-1.5 rounded-lg shadow-sm">
              <div className="text-sm font-bold text-accent tabular">
                {countdown.hours}h {countdown.minutes}m {countdown.seconds}s
              </div>
              <div className="text-[9px] uppercase tracking-wider text-ink-muted">Ticking Live</div>
            </div>
          </div>
        </div>
      </Card>

      {/* ─── Four Key Stat Cards (Count-Up Numbers) ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="mono-label">Total Solved</span>
            <Code2 size={15} className="text-ink-muted" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl font-bold text-ink tabular">{solvedCount}</span>
            <span className="text-xs font-mono text-verdict-ac font-semibold">+14 this wk</span>
          </div>
          <p className="text-[11px] text-ink-muted mt-1">Across CF (684) & AtCoder (295)</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="mono-label">Active Streak</span>
            <Flame size={15} className="text-amber-500 fill-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl font-bold text-ink tabular">{streakDays}d</span>
            <span className="text-xs font-mono text-ink-muted">214 active / 365d</span>
          </div>
          <p className="text-[11px] text-ink-muted mt-1">Single-hue timezone engine</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="mono-label">Codeforces Rating</span>
            <Trophy size={15} className="text-[#1890FF]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl font-bold text-[#1890FF] tabular">{cfRating}</span>
            <span className="text-xs font-mono text-ink-muted">Peak: 1,845</span>
          </div>
          <p className="text-[11px] text-ink-muted mt-1">Candidate Master candidate</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="mono-label">Global Percentile</span>
            <span className="w-2 h-2 rounded-full bg-verdict-ac" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl font-bold text-ink tabular">Top 1.6%</span>
            <span className="text-xs font-mono text-ink-muted">#1,204</span>
          </div>
          <p className="text-[11px] text-ink-muted mt-1">Based on active CF competitors</p>
        </Card>
      </div>

      {/* ─── 365-Day Single-Hue Heatmap Section ─── */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-ink">365-Day Activity Heatmap</h2>
            <p className="text-xs text-ink-secondary mt-0.5">
              Consolidated Accepted submissions across all verified platforms
            </p>
          </div>
          <Badge variant="neutral" size="xs">
            Past 12 Months
          </Badge>
        </div>

        <Heatmap data={data.heatmap} />
      </Card>

      {/* ─── Charts Row: Rating Progression & Difficulty Distribution ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rating Progression Line Chart */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-ink">Rating Trajectory</h2>
              <p className="text-xs text-ink-secondary mt-0.5">
                Official contest rating changes with 1900 CM milestone threshold
              </p>
            </div>
            <Badge variant="codeforces" size="xs">
              Codeforces & AtCoder
            </Badge>
          </div>

          <RatingChart />
        </Card>

        {/* Difficulty Distribution Donut */}
        <Card className="p-6">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-ink">Problem Difficulty</h2>
            <p className="text-xs text-ink-secondary mt-0.5">Verified solved distribution</p>
          </div>

          <DifficultyChart />
        </Card>
      </div>

      {/* ─── Topic Strength & Weakness Diagnosis ─── */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-ink">Algorithmic Topic Mastery</h2>
            <p className="text-xs text-ink-secondary mt-0.5">
              Rule-based weakness diagnostic flagging sub-50% accuracy areas
            </p>
          </div>
          <Link to="/problems?tab=recommended" className="text-xs font-semibold text-accent hover:underline flex items-center gap-1">
            <span>Recommended Sets</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        <TopicBars topics={data.topics} />
      </Card>

      {/* ─── Bottom Row: Recent Submissions & Connected Platforms ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Submissions Table */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-ink">Recent Submissions</h2>
            <Link to="/problems" className="text-xs font-mono text-accent hover:underline">
              View All ({data.stats.totalSolved}) →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-app-border text-ink-muted text-[10px] uppercase">
                  <th className="pb-2 font-medium">Problem</th>
                  <th className="pb-2 font-medium">Platform</th>
                  <th className="pb-2 font-medium">Verdict</th>
                  <th className="pb-2 font-medium">Rating</th>
                  <th className="pb-2 font-medium">Lang</th>
                  <th className="pb-2 font-medium text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-app-border">
                {data.recentSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-app-bg transition-colors">
                    <td className="py-2.5 font-medium text-ink max-w-[200px] truncate">
                      {sub.problemTitle}
                    </td>
                    <td className="py-2.5">
                      <span className="capitalize text-ink-secondary">{sub.platform}</span>
                    </td>
                    <td className="py-2.5">
                      <span className={`px-1.5 py-0.5 rounded border text-[10px] font-bold ${getVerdictBadgeClass(sub.verdict)}`}>
                        {sub.verdict}
                      </span>
                    </td>
                    <td className="py-2.5 text-ink-secondary">{sub.rating}</td>
                    <td className="py-2.5 text-ink-muted">{sub.language}</td>
                    <td className="py-2.5 text-right text-ink-muted">
                      {formatTimeAgo(sub.timestamp)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Connected Platforms Sync Cards */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-ink">Connected Platforms</h2>
            <Link to="/settings" className="text-xs text-accent hover:underline">
              Manage
            </Link>
          </div>

          <div className="space-y-3">
            {DEMO_USER.platforms.map((p) => {
              const isSyncing = syncingPlatform === p.id;
              return (
                <div
                  key={p.id}
                  className="p-3 rounded-xl border border-app-border bg-app-bg flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                      <span className="text-xs font-bold text-ink">{p.name}</span>
                      {p.connected && (
                        <span className="text-[10px] font-mono text-verdict-ac font-semibold">
                          Verified
                        </span>
                      )}
                    </div>
                    {p.connected ? (
                      <p className="text-[11px] font-mono text-ink-secondary">
                        @{p.handle} • Rating: {p.rating}
                      </p>
                    ) : (
                      <p className="text-[10px] font-mono text-ink-muted">{p.statusNote}</p>
                    )}
                  </div>

                  {p.connected && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleSyncPlatform(p.id)}
                      disabled={isSyncing}
                      className="h-6 px-2 text-[10px]"
                    >
                      <RefreshCw size={10} className={isSyncing ? 'animate-spin text-accent' : ''} />
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
