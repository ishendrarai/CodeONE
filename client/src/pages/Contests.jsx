import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  List,
  Clock,
  Bell,
  BellRing,
  ExternalLink,
  Plus,
  Check,
  Globe,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { useCountdown } from '../hooks/useCountdown';
import { fetchContests } from '../data/mockService';
import { format } from 'date-fns';

export default function Contests() {
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'calendar'
  const [useUTC, setUseUTC] = useState(false);
  const [platformFilter, setPlatformFilter] = useState('all');
  const [contests, setContests] = useState([]);
  const [reminders, setReminders] = useState({});

  useEffect(() => {
    fetchContests().then((res) => setContests(res));
  }, []);

  const nextUpcoming = contests.find((c) => c.status === 'upcoming');
  const countdown = useCountdown(nextUpcoming?.startTime);

  const toggleReminder = (id) => {
    setReminders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredContests = contests.filter((c) => {
    if (platformFilter !== 'all' && c.platform !== platformFilter) return false;
    return true;
  });

  const formatContestTime = (isoString) => {
    const d = new Date(isoString);
    if (useUTC) {
      return format(d, 'MMM d, yyyy • HH:mm') + ' UTC';
    }
    return format(d, 'MMM d, yyyy • hh:mm a') + ' IST';
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-ink">Contest Calendar</h1>
          <p className="text-xs text-ink-secondary mt-0.5">
            Aggregated schedule of upcoming competitive rounds across major CP platforms.
          </p>
        </div>

        {/* View Mode & Timezone Switcher */}
        <div className="flex items-center gap-2">
          {/* UTC Toggle */}
          <button
            onClick={() => setUseUTC(!useUTC)}
            className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-app-border bg-white text-xs font-mono text-ink-secondary hover:text-ink transition-colors"
          >
            <Globe size={13} />
            <span>{useUTC ? 'UTC Time' : 'Local (IST)'}</span>
          </button>

          {/* List / Calendar Toggle */}
          <div className="flex items-center bg-white border border-app-border rounded-lg p-0.5 shadow-sm">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded text-xs font-medium transition-colors ${
                viewMode === 'list' ? 'bg-ink text-white' : 'text-ink-secondary hover:text-ink'
              }`}
            >
              <List size={14} />
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-1.5 rounded text-xs font-medium transition-colors ${
                viewMode === 'calendar' ? 'bg-ink text-white' : 'text-ink-secondary hover:text-ink'
              }`}
            >
              <CalendarIcon size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Featured Next Contest Countdown Banner */}
      {nextUpcoming && (
        <Card className="p-6 bg-gradient-to-r from-blue-50/50 via-white to-white border-accent-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <Badge variant="accent" size="xs">
                Next Upcoming Match
              </Badge>
              <h2 className="text-base font-bold text-ink">{nextUpcoming.title}</h2>
              <p className="text-xs font-mono text-ink-secondary">
                Starts {formatContestTime(nextUpcoming.startTime)} • Duration: {nextUpcoming.durationLabel}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right font-mono">
                <span className="mono-label">Starts in</span>
                <div className="text-xl font-bold text-accent tabular">
                  {countdown.hours}h {countdown.minutes}m {countdown.seconds}s
                </div>
              </div>

              <a href={nextUpcoming.url} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="sm" rightIcon={<ExternalLink size={12} />}>
                  Register Now
                </Button>
              </a>
            </div>
          </div>
        </Card>
      )}

      {/* Filter Chips Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['all', 'codeforces', 'atcoder'].map((p) => (
          <button
            key={p}
            onClick={() => setPlatformFilter(p)}
            className={`h-7 px-3 rounded-full text-xs font-mono capitalize transition-all ${
              platformFilter === p
                ? 'bg-ink text-white font-semibold'
                : 'bg-white border border-app-border text-ink-secondary hover:border-app-border-strong hover:text-ink'
            }`}
          >
            {p === 'all' ? 'All Platforms' : p}
          </button>
        ))}
      </div>

      {/* Contests List */}
      {viewMode === 'list' ? (
        <div className="space-y-3">
          {filteredContests.map((c) => {
            const isRegistered = c.registered;
            const hasReminder = reminders[c.id];
            return (
              <Card key={c.id} className="p-4 hover:border-app-border-strong transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Left Metadata */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: c.platform === 'codeforces' ? '#1890FF' : '#00C0C0' }}
                      />
                      <h3 className="text-xs font-bold text-ink">{c.title}</h3>
                      <Badge
                        variant={c.status === 'upcoming' ? 'accent' : 'neutral'}
                        size="xs"
                      >
                        {c.status.toUpperCase()}
                      </Badge>
                      {c.division && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-app-bg border border-app-border text-ink-muted">
                          {c.division}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-[11px] font-mono text-ink-secondary">
                      <span>{formatContestTime(c.startTime)}</span>
                      <span>•</span>
                      <span>Duration: {c.durationLabel}</span>
                      {c.status === 'ended' && c.ratingChange && (
                        <>
                          <span>•</span>
                          <span className={`font-bold ${c.ratingChange.startsWith('+') ? 'text-verdict-ac' : 'text-verdict-wa'}`}>
                            Delta: {c.ratingChange}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    {c.status === 'upcoming' && (
                      <button
                        onClick={() => toggleReminder(c.id)}
                        className={`p-2 rounded-lg border transition-colors ${
                          hasReminder
                            ? 'bg-accent-subtle border-accent-border text-accent'
                            : 'border-app-border text-ink-muted hover:text-ink hover:bg-app-hover'
                        }`}
                        title="Toggle reminder"
                      >
                        {hasReminder ? <BellRing size={14} /> : <Bell size={14} />}
                      </button>
                    )}

                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg border border-app-border bg-white text-xs font-mono font-medium text-ink hover:bg-app-hover transition-colors shadow-sm"
                    >
                      <span>{c.status === 'ended' ? 'View Standings' : 'Contest Link'}</span>
                      <ExternalLink size={12} className="text-ink-muted" />
                    </a>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        /* Month Calendar View */
        <Card className="p-6 bg-white">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-app-border">
            <span className="text-xs font-bold text-ink">November 2024 Schedule</span>
            <span className="font-mono text-xs text-ink-muted">4 Rounds Scheduled</span>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center font-mono text-xs">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="py-1 text-[11px] text-ink-muted uppercase font-semibold">
                {day}
              </div>
            ))}
            {Array.from({ length: 30 }).map((_, i) => {
              const dayNum = i + 1;
              const hasCF = dayNum === 18 || dayNum === 22;
              const hasATC = dayNum === 12 || dayNum === 24;
              return (
                <div
                  key={dayNum}
                  className={`h-20 p-1.5 border rounded-lg text-left flex flex-col justify-between transition-colors ${
                    dayNum === 22 ? 'border-accent bg-accent-subtle/30' : 'border-app-border bg-app-bg/50'
                  }`}
                >
                  <span className="text-[10px] font-bold text-ink">{dayNum}</span>
                  <div className="space-y-1">
                    {hasCF && (
                      <div className="text-[9px] p-0.5 rounded bg-blue-100 text-blue-800 font-bold truncate">
                        CF Div. 2
                      </div>
                    )}
                    {hasATC && (
                      <div className="text-[9px] p-0.5 rounded bg-cyan-100 text-cyan-800 font-bold truncate">
                        AtCoder ABC
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
