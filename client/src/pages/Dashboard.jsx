import { Code2, Flame, Calendar, Trophy, RefreshCw, Target, ExternalLink, Clock } from 'lucide-react';
import StatsCard    from '../components/dashboard/StatsCard';
import StreakHeatmap from '../components/dashboard/StreakHeatmap';
import ProgressChart from '../components/dashboard/ProgressChart';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

// ─── Mock data ────────────────────────────────────────────────
const STATS = [
  { label: 'Problems Solved',  value: '842',   sub: 'All time',          trend: 12,  icon: Code2,  color: '#5145E5' },
  { label: 'Current Streak',   value: '14d',   sub: 'Personal best: 31d', trend: 0,  icon: Flame,  color: '#D97706' },
  { label: 'This Week',        value: '23',    sub: 'Goal: 25 / week',    trend: -8,  icon: Calendar, color: '#16A34A' },
  { label: 'Global Rank',      value: '#1,204', sub: 'Top 8%',            trend: 5,  icon: Trophy, color: '#5145E5' },
];

const RECENT_PROBLEMS = [
  { id: 1, name: 'Two Sum',                platform: 'leetcode',   difficulty: 'easy',   time: '2h ago'  },
  { id: 2, name: 'Longest Palindrome',     platform: 'codeforces', difficulty: 'medium', time: '5h ago'  },
  { id: 3, name: 'Binary Tree Level Order',platform: 'leetcode',   difficulty: 'medium', time: '1d ago'  },
  { id: 4, name: 'Maximum Subarray',       platform: 'codechef',   difficulty: 'easy',   time: '1d ago'  },
  { id: 5, name: 'Trapping Rain Water',    platform: 'leetcode',   difficulty: 'hard',   time: '2d ago'  },
];

const PLATFORMS = [
  { name: 'LeetCode',   key: 'leetcode',   rating: 1842, rank: '#12,440', delta: '+38', connected: true  },
  { name: 'Codeforces', key: 'codeforces', rating: 1621, rank: '#44,201', delta: '+80', connected: true  },
  { name: 'CodeChef',   key: 'codechef',   rating: 1704, rank: '#8,994',  delta: '-12', connected: true  },
  { name: 'AtCoder',    key: 'atcoder',    rating: null,  rank: null,      delta: null,  connected: false },
];

const TOPICS = [
  { topic: 'Arrays & Hashing',   solved: 95,  total: 110 },
  { topic: 'Dynamic Programming', solved: 42,  total: 80  },
  { topic: 'Graphs',              solved: 28,  total: 70  },
  { topic: 'Trees & BST',         solved: 60,  total: 72  },
  { topic: 'Binary Search',       solved: 34,  total: 45  },
  { topic: 'Greedy',              solved: 20,  total: 50  },
];

const UPCOMING_CONTESTS = [
  { id: 1, platform: 'codeforces', name: 'Codeforces Round #970',  startsIn: '4h 20m', duration: '2h'    },
  { id: 2, platform: 'leetcode',   name: 'LC Weekly Contest 418',   startsIn: '2d 6h',  duration: '1.5h'  },
  { id: 3, platform: 'codechef',   name: 'CodeChef Starters 157',   startsIn: '3d 12h', duration: '3h'    },
];

const PLATFORM_COLORS = {
  leetcode: '#FFA116', codeforces: '#1890FF', codechef: '#5B4638', atcoder: '#B22222',
};

// ─── Helpers ──────────────────────────────────────────────────
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function PlatformDot({ platform }) {
  return (
    <span
      className="w-2 h-2 rounded-full shrink-0"
      style={{ background: PLATFORM_COLORS[platform] || '#747B8C' }}
    />
  );
}

// ─── Dashboard ────────────────────────────────────────────────
export default function Dashboard() {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] ?? 'Coder';

  return (
    <div className="page-container">

      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-text-primary">
            {getGreeting()}, {firstName} 👋
          </h1>
          <p className="text-sm text-text-secondary mt-0.5">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" leftIcon={<RefreshCw size={13} />}>
            Sync All
          </Button>
          <Button variant="primary" size="sm" leftIcon={<Target size={13} />}>
            New Goal
          </Button>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {STATS.map((s) => (
          <StatsCard
            key={s.label}
            label={s.label}
            value={s.value}
            sub={s.sub}
            trend={s.trend}
            icon={s.icon}
            accentColor={s.color}
          />
        ))}
      </div>

      {/* ── Heatmap ── */}
      <div className="mb-5">
        <StreakHeatmap />
      </div>

      {/* ── Middle row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">

        {/* Recent solved */}
        <div className="card">
          <div className="section-header px-4 pt-4">
            <h3 className="text-sm font-semibold text-text-primary">Recent Solved</h3>
            <a href="/problems" className="text-xs text-accent hover:underline">View all</a>
          </div>
          <div className="divide-y divide-border">
            {RECENT_PROBLEMS.map((p) => (
              <div key={p.id} className="flex items-center justify-between px-4 py-2.5 hover:bg-surface-raised transition-colors">
                <div className="flex items-center gap-2 min-w-0">
                  <PlatformDot platform={p.platform} />
                  <span className="text-sm text-text-primary truncate">{p.name}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <Badge variant={p.difficulty}>{p.difficulty}</Badge>
                  <span className="text-xs text-text-muted flex items-center gap-1">
                    <Clock size={10} />{p.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform performance */}
        <div className="card">
          <div className="section-header px-4 pt-4">
            <h3 className="text-sm font-semibold text-text-primary">Platform Performance</h3>
            <a href="/profile" className="text-xs text-accent hover:underline">Manage</a>
          </div>
          <div className="divide-y divide-border">
            {PLATFORMS.map((p) => (
              <div key={p.key} className="flex items-center justify-between px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <PlatformDot platform={p.key} />
                  <div>
                    <p className="text-sm font-medium text-text-primary">{p.name}</p>
                    {p.connected ? (
                      <p className="text-xs text-text-muted">{p.rank}</p>
                    ) : (
                      <p className="text-xs text-text-muted">Not connected</p>
                    )}
                  </div>
                </div>
                {p.connected ? (
                  <div className="text-right">
                    <p className="text-sm font-semibold text-text-primary">{p.rating}</p>
                    <p className={`text-xs font-medium ${p.delta?.startsWith('+') ? 'text-status-easy' : 'text-status-hard'}`}>
                      {p.delta}
                    </p>
                  </div>
                ) : (
                  <Button variant="accent_light" size="xs" rightIcon={<ExternalLink size={11} />}>
                    Connect
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Topic mastery */}
        <div className="card p-4">
          <div className="section-header">
            <h3 className="text-sm font-semibold text-text-primary">Topic Mastery</h3>
            <a href="/analytics" className="text-xs text-accent hover:underline">Full report</a>
          </div>
          <ProgressChart data={TOPICS} />
        </div>

        {/* Upcoming contests */}
        <div className="card p-4">
          <div className="section-header">
            <h3 className="text-sm font-semibold text-text-primary">Upcoming Contests</h3>
            <a href="/contests" className="text-xs text-accent hover:underline">View all</a>
          </div>
          <div className="flex flex-col gap-2.5">
            {UPCOMING_CONTESTS.map((c) => (
              <div key={c.id} className="flex items-start justify-between p-3 bg-surface-raised rounded-md border border-border">
                <div className="flex items-start gap-2">
                  <PlatformDot platform={c.platform} />
                  <div>
                    <p className="text-sm font-medium text-text-primary">{c.name}</p>
                    <p className="text-xs text-text-muted mt-0.5">
                      Starts in <span className="text-accent font-medium">{c.startsIn}</span> · {c.duration}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="xs" rightIcon={<ExternalLink size={11} />}>
                  Register
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
