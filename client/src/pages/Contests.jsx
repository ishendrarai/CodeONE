import { useState } from 'react';
import { ExternalLink, RefreshCw, Clock, Calendar as CalIcon } from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) { return twMerge(clsx(inputs)); }

// ─── Mock data ────────────────────────────────────────────────
const CONTESTS = [
  { id:1, platform:'codeforces', name:'Codeforces Round #970 (Div. 2)', date:'Nov 5, 2026',  time:'20:35 IST', duration:'2h',   startsIn:'4h 20m', registered:false, difficulty:'Div. 2' },
  { id:2, platform:'leetcode',   name:'LeetCode Weekly Contest 418',    date:'Nov 10, 2026', time:'08:00 IST', duration:'1.5h', startsIn:'2d 6h',  registered:true,  difficulty:'Open'   },
  { id:3, platform:'codechef',   name:'CodeChef Starters 157',          date:'Nov 13, 2026', time:'21:00 IST', duration:'3h',   startsIn:'3d 12h', registered:false, difficulty:'Div. 1-4' },
  { id:4, platform:'codeforces', name:'Codeforces Round #971 (Div. 1)', date:'Nov 15, 2026', time:'17:35 IST', duration:'2.5h', startsIn:'5d 2h',  registered:false, difficulty:'Div. 1' },
  { id:5, platform:'atcoder',    name:'AtCoder Regular Contest 189',    date:'Nov 16, 2026', time:'21:00 IST', duration:'2h',   startsIn:'6d',     registered:false, difficulty:'ARC'    },
];

const PLATFORM_OPTIONS = ['All', 'LeetCode', 'Codeforces', 'CodeChef', 'AtCoder'];

const PLATFORM_COLORS = {
  leetcode: '#FFA116', codeforces: '#1890FF', codechef: '#5B4638', atcoder: '#B22222',
};

const PLATFORM_BG = {
  leetcode: 'bg-orange-50', codeforces: 'bg-blue-50', codechef: 'bg-amber-50', atcoder: 'bg-red-50',
};

function PlatformDot({ platform }) {
  return <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: PLATFORM_COLORS[platform] || '#747B8C' }} />;
}

export default function Contests() {
  const [platformFilter, setPlatform] = useState('All');

  const filtered = CONTESTS.filter((c) =>
    platformFilter === 'All' || c.platform === platformFilter.toLowerCase().replace(' ', '')
  );

  return (
    <div className="page-container">

      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-text-primary">Contest Calendar</h1>
          <p className="text-sm text-text-secondary mt-0.5">Discover and track upcoming competitive programming contests</p>
        </div>
        <Button variant="secondary" size="sm" leftIcon={<RefreshCw size={13} />}>
          Sync Calendar
        </Button>
      </div>

      {/* ── Platform filter pills ── */}
      <div className="flex flex-wrap gap-2 mb-5">
        {PLATFORM_OPTIONS.map((p) => (
          <button
            key={p}
            onClick={() => setPlatform(p)}
            className={cn(
              'h-7 px-3 rounded-full text-xs font-medium transition-all duration-100',
              platformFilter === p
                ? 'bg-accent text-white'
                : 'bg-surface border border-border text-text-secondary hover:bg-surface-overlay'
            )}
          >
            {p}
          </button>
        ))}
      </div>

      {/* ── Contest list ── */}
      <div className="flex flex-col gap-3">
        {filtered.length === 0 && (
          <div className="card py-16 text-center text-sm text-text-muted">
            No contests found for the selected platform.
          </div>
        )}

        {filtered.map((c) => (
          <div key={c.id} className={cn('card p-4 hover:shadow-card-hover transition-shadow')}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

              {/* Left: info */}
              <div className="flex items-start gap-3">
                {/* Platform dot + color stripe */}
                <div
                  className={cn(
                    'w-9 h-9 rounded-lg flex items-center justify-center shrink-0',
                    PLATFORM_BG[c.platform]
                  )}
                >
                  <PlatformDot platform={c.platform} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-text-primary leading-snug">{c.name}</h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                    <span className="flex items-center gap-1 text-xs text-text-muted">
                      <CalIcon size={11} /> {c.date} · {c.time}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-text-muted">
                      <Clock size={11} /> {c.duration}
                    </span>
                    <Badge variant="default" className="text-2xs">{c.difficulty}</Badge>
                  </div>
                </div>
              </div>

              {/* Right: countdown + actions */}
              <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                <div className="text-right">
                  <p className="text-xs text-text-muted">Starts in</p>
                  <p className="text-sm font-semibold text-accent">{c.startsIn}</p>
                </div>
                <div className="flex items-center gap-2">
                  {c.registered ? (
                    <Badge variant="solved" dot>Registered</Badge>
                  ) : (
                    <Button
                      variant="primary"
                      size="xs"
                      rightIcon={<ExternalLink size={11} />}
                    >
                      Register
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Info note ── */}
      <p className="text-xs text-text-muted mt-5 text-center">
        Contest times are shown in your local timezone (IST). Times may change — verify on the platform before the contest starts.
      </p>
    </div>
  );
}
