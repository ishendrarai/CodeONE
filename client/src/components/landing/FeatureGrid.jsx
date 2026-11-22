import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Flame, CheckSquare, BarChart2, Calendar, Target, Bot, Shield, User } from 'lucide-react';

const FEATURES = [
  {
    title: 'Single-Hue Streak Engine',
    description: 'Calculate unbroken consistency across Codeforces and AtCoder simultaneously with timezone-aware sliding windows.',
    badge: 'Consistency',
    visual: (
      <div className="flex gap-1 items-center h-8">
        {[1, 2, 0, 3, 4, 4, 3, 2, 4].map((v, i) => (
          <div
            key={i}
            className="w-4 h-6 rounded-[2px]"
            style={{ backgroundColor: ['#EDEDEA', '#D4E2FF', '#93BAFF', '#4285FF', '#0052FF'][v] }}
          />
        ))}
      </div>
    ),
  },
  {
    title: 'Contest Upsolve Queue',
    description: 'Auto-flags unsolved problems from your recent live contests. Never let an educational mistake go unlearned.',
    badge: 'Growth',
    visual: (
      <div className="p-2 border border-app-border rounded bg-app-bg text-[11px] font-mono space-y-1">
        <div className="flex justify-between text-verdict-wa">
          <span>Problem C (Trinity)</span>
          <span>TLE</span>
        </div>
        <div className="text-[10px] text-ink-muted">Added to priority upsolve queue</div>
      </div>
    ),
  },
  {
    title: 'Topic Weakness Detection',
    description: 'Algorithmic scan detecting sub-50% accuracy on specific topics like Rerooting DP or Number Theory.',
    badge: 'Analytics',
    visual: (
      <div className="space-y-1.5 font-mono text-[11px]">
        <div className="flex justify-between">
          <span>Tree DP</span>
          <span className="text-verdict-wa font-bold">37.5% AC</span>
        </div>
        <div className="h-1.5 w-full bg-[#EDEDEA] rounded-full overflow-hidden">
          <div className="h-full bg-verdict-wa w-[37.5%]" />
        </div>
      </div>
    ),
  },
  {
    title: 'Live Contest Calendar',
    description: 'Track upcoming rounds from Codeforces, AtCoder, and more with ticking countdowns and direct calendar reminders.',
    badge: 'Calendar',
    visual: (
      <div className="p-2 border border-app-border rounded bg-app-bg font-mono text-xs flex justify-between items-center">
        <span className="text-ink font-semibold">CF Round 985</span>
        <span className="text-accent font-bold">In 4h 52m</span>
      </div>
    ),
  },
  {
    title: 'AI Consistency Coach',
    description: 'Ask tactical questions about your training trajectory, rating drops, and get personalized 3-problem daily sets.',
    badge: 'AI Coach',
    visual: (
      <div className="p-2 border border-app-border rounded bg-app-bg text-[11px] text-ink-secondary">
        <span className="text-accent font-bold">Coach:</span> Target 1882D today to reinforce Tree DP rerooting.
      </div>
    ),
  },
  {
    title: 'Verified Public Profile',
    description: 'A shareable link (/u/handle) showcasing your rating trajectory, verified handles, and top topic proficiencies.',
    badge: 'Showcase',
    visual: (
      <div className="flex items-center gap-2 p-2 border border-app-border rounded bg-app-bg">
        <div className="w-5 h-5 rounded-full bg-ink text-white flex items-center justify-center text-[9px] font-bold">
          KS
        </div>
        <span className="font-mono text-xs font-semibold text-ink">codeone.io/u/karan_cp</span>
      </div>
    ),
  },
];

export default function FeatureGrid() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="mono-label">Built For Serious Competitors</span>
        <h2 className="text-3xl font-bold tracking-tight text-ink mt-2">
          Engineered for consistency, clarity, and rapid rating growth.
        </h2>
        <p className="text-xs sm:text-sm text-ink-secondary mt-2">
          Every tool is grounded in proven competitive programming training methodologies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((f) => (
          <Card key={f.title} className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <Badge variant="accent" size="xs">{f.badge}</Badge>
              </div>
              <h3 className="text-sm font-semibold text-ink mb-1.5">{f.title}</h3>
              <p className="text-xs text-ink-secondary leading-relaxed mb-6">{f.description}</p>
            </div>
            <div>{f.visual}</div>
          </Card>
        ))}
      </div>
    </section>
  );
}
