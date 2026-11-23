import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { ArrowRight, Bot, Calendar, Sparkles } from 'lucide-react';

export default function Showcase() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto space-y-16">
      {/* Showcase 1: Contest Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <span className="mono-label">Never Miss A Round</span>
          <h2 className="text-3xl font-bold tracking-tight text-ink">
            A synchronized competitive programming contest calendar.
          </h2>
          <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
            Consolidating Codeforces Div 1/2/3 rounds and AtCoder ABC/ARC competitions. Filter by division,
            track ticking countdowns, and export to Google Calendar with one click.
          </p>
          <div>
            <Link to="/contests">
              <Button variant="secondary" size="md" rightIcon={<ArrowRight size={14} />}>
                View Live Calendar
              </Button>
            </Link>
          </div>
        </div>

        <Card className="p-6 space-y-3 bg-white">
          <div className="flex items-center justify-between pb-3 border-b border-app-border">
            <span className="text-xs font-semibold text-ink">Upcoming Contests (Live Pacing)</span>
            <span className="text-[10px] font-mono text-verdict-ac font-bold">Auto-Synced</span>
          </div>

          <div className="p-3.5 border border-app-border rounded-xl bg-app-bg flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1890FF]" />
                <span className="text-xs font-bold text-ink">Codeforces Round 985 (Div. 2)</span>
              </div>
              <p className="text-[11px] font-mono text-ink-muted">Duration: 2 hrs • Div. 2 Rated</p>
            </div>
            <div className="text-right">
              <span className="font-mono text-xs font-bold text-accent">In 4h 52m</span>
              <p className="text-[10px] text-verdict-ac font-medium">Registered</p>
            </div>
          </div>

          <div className="p-3.5 border border-app-border rounded-xl bg-app-bg flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00C0C0]" />
                <span className="text-xs font-bold text-ink">AtCoder Beginner Contest 388</span>
              </div>
              <p className="text-[11px] font-mono text-ink-muted">Duration: 100 mins • ABC Rated</p>
            </div>
            <div className="text-right">
              <span className="font-mono text-xs font-bold text-ink">Tomorrow</span>
              <p className="text-[10px] text-ink-muted">Register Open</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Showcase 2: AI Coach */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <Card className="p-6 space-y-3 bg-white order-2 lg:order-1">
          <div className="flex items-center gap-2 pb-3 border-b border-app-border">
            <Bot size={16} className="text-accent" />
            <span className="text-xs font-semibold text-ink">CodeONE AI Coach</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-accent-subtle text-accent font-semibold ml-auto">
              Telemetry Grounded
            </span>
          </div>

          <div className="p-3 rounded-lg bg-app-bg border border-app-border text-xs text-ink-secondary space-y-2">
            <p className="font-semibold text-ink">User: What should I solve today to reach 1900?</p>
            <p className="text-[11px] leading-relaxed">
              Coach: Your last 24 Tree DP submissions show a 38% solve rate. I recommend attacking{' '}
              <span className="font-bold text-ink">CF 1882D (Tree XOR)</span> to practice O(N) rerooting.
            </p>
          </div>
        </Card>

        <div className="space-y-4 order-1 lg:order-2">
          <span className="mono-label">Personalized Guidance</span>
          <h2 className="text-3xl font-bold tracking-tight text-ink">
            An AI coach that actually understands your contest history.
          </h2>
          <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
            Unlike generic chatbots, the CodeONE Coach accesses your actual verdict distribution, time sinks,
            and contest rating deltas to recommend targeted daily problem sets.
          </p>
          <div>
            <Link to="/coach">
              <Button variant="primary" size="md" rightIcon={<ArrowRight size={14} />}>
                Try AI Coach
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
