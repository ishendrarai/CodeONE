import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Code2, Flame, Trophy, ExternalLink, ShieldCheck, Share2, Check, ArrowLeft } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Heatmap from '../components/charts/Heatmap';
import RatingChart from '../components/charts/RatingChart';
import { DEMO_USER } from '../data/mockUser';
import { fetchDashboardSummary } from '../data/mockService';

export default function PublicProfile() {
  const { handle } = useParams();
  const [data, setData] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchDashboardSummary().then((res) => setData(res));
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-app-bg text-ink py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back navigation */}
        <div className="flex items-center justify-between">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-ink-secondary hover:text-ink"
          >
            <ArrowLeft size={13} />
            <span>Back to Dashboard</span>
          </Link>

          <Button
            size="sm"
            variant="secondary"
            onClick={handleShare}
            leftIcon={copied ? <Check size={12} className="text-verdict-ac" /> : <Share2 size={12} />}
          >
            {copied ? 'Link Copied!' : 'Share Public Card'}
          </Button>
        </div>

        {/* ─── Profile Header Hero Card ─── */}
        <Card className="p-6 sm:p-8 bg-white space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              {/* Initials Avatar */}
              <div className="w-16 h-16 rounded-2xl bg-ink text-white flex items-center justify-center font-mono text-xl font-bold shrink-0 shadow-sm">
                {DEMO_USER.initials}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold tracking-tight text-ink">{DEMO_USER.name}</h1>
                  <Badge variant="accent" size="xs">
                    <ShieldCheck size={12} className="inline mr-0.5 text-accent" /> Verified
                  </Badge>
                </div>
                <p className="font-mono text-xs text-ink-muted">@{handle || DEMO_USER.handle}</p>
                <p className="text-xs text-ink-secondary mt-1">{DEMO_USER.bio}</p>
                <p className="text-[11px] font-mono text-ink-muted">
                  {DEMO_USER.college} • Class of {DEMO_USER.graduationYear}
                </p>
              </div>
            </div>

            {/* Quick Ratings Pillar */}
            <div className="flex sm:flex-col items-end gap-2 shrink-0">
              <div className="text-right">
                <span className="mono-label">Codeforces</span>
                <p className="font-mono text-xl font-bold text-[#1890FF]">1,782</p>
                <p className="text-[10px] font-mono text-ink-muted">Candidate Master</p>
              </div>
              <div className="text-right pt-1">
                <span className="mono-label">AtCoder</span>
                <p className="font-mono text-base font-bold text-[#00C0C0]">1,340 (Cyan)</p>
              </div>
            </div>
          </div>

          {/* Key Stat Strips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-app-border">
            <div className="p-3 bg-app-bg rounded-xl border border-app-border">
              <span className="mono-label">Total Solved</span>
              <p className="font-mono text-lg font-bold text-ink mt-0.5">979</p>
            </div>
            <div className="p-3 bg-app-bg rounded-xl border border-app-border">
              <span className="mono-label">Active Streak</span>
              <div className="flex items-center gap-1 mt-0.5">
                <p className="font-mono text-lg font-bold text-ink">19 Days</p>
                <Flame size={14} className="text-amber-500 fill-amber-500" />
              </div>
            </div>
            <div className="p-3 bg-app-bg rounded-xl border border-app-border">
              <span className="mono-label">Max Rating</span>
              <p className="font-mono text-lg font-bold text-[#1890FF] mt-0.5">1,845</p>
            </div>
            <div className="p-3 bg-app-bg rounded-xl border border-app-border">
              <span className="mono-label">Global Percentile</span>
              <p className="font-mono text-lg font-bold text-verdict-ac mt-0.5">Top 1.6%</p>
            </div>
          </div>
        </Card>

        {/* ─── 365-Day Activity Heatmap ─── */}
        {data?.heatmap && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-ink">365-Day Activity Telemetry</h2>
              <span className="text-xs font-mono text-ink-muted">214 Active Days</span>
            </div>
            <Heatmap data={data.heatmap} />
          </Card>
        )}

        {/* ─── Top Topic Proficiencies ─── */}
        <Card className="p-6">
          <h2 className="text-sm font-semibold text-ink mb-1">Top Algorithmic Proficiencies</h2>
          <p className="text-xs text-ink-secondary mb-4">Verified Accepted submissions by topic</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { topic: 'Bit Manipulation', count: 37, accuracy: 88, tag: 'Super Strong' },
              { topic: 'Greedy Algorithms', count: 56, accuracy: 82, tag: 'Very Strong' },
              { topic: 'Binary Search', count: 41, accuracy: 76, tag: 'Strong' },
            ].map((t) => (
              <div key={t.topic} className="p-3 bg-app-bg border border-app-border rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink">{t.topic}</span>
                  <Badge variant="success" size="xs">
                    {t.accuracy}% AC
                  </Badge>
                </div>
                <p className="text-[11px] font-mono text-ink-muted">{t.count} solved</p>
              </div>
            ))}
          </div>
        </Card>

        {/* ─── Recent Contests ─── */}
        <Card className="p-6">
          <h2 className="text-sm font-semibold text-ink mb-1">Recent Contest Participations</h2>
          <p className="text-xs text-ink-secondary mb-4">Official rated competition record</p>

          <div className="divide-y divide-app-border">
            {[
              { name: 'Codeforces Round 984 (Div. 3)', rank: 412, delta: '+48', date: 'Nov 18, 2024' },
              { name: 'AtCoder Beginner Contest 387', rank: 820, delta: '+24', date: 'Nov 12, 2024' },
              { name: 'Codeforces Round 983 (Div. 2)', rank: 1890, delta: '-32', date: 'Nov 04, 2024' },
            ].map((c, i) => (
              <div key={i} className="py-2.5 flex items-center justify-between text-xs font-mono">
                <div>
                  <p className="font-semibold text-ink">{c.name}</p>
                  <p className="text-[11px] text-ink-muted">{c.date} • Rank #{c.rank}</p>
                </div>
                <span className={`font-bold ${c.delta.startsWith('+') ? 'text-verdict-ac' : 'text-verdict-wa'}`}>
                  {c.delta}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Footer Credit */}
        <div className="text-center font-mono text-[11px] text-ink-muted py-4">
          Verified by <span className="font-bold text-ink">CodeONE</span> • Zero-Credential Aggregation
        </div>
      </div>
    </div>
  );
}
