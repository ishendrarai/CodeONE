import React from 'react';

const PLATFORMS = [
  { name: 'Codeforces', status: 'Official REST API (Active)', color: '#1890FF' },
  { name: 'AtCoder', status: 'AtCoder Problems (Active)', color: '#00C0C0' },
  { name: 'LeetCode', status: 'Manual Import Planned', color: '#FFA116' },
  { name: 'CodeChef', status: 'Manual Import Planned', color: '#5B4638' },
  { name: 'CSES Problemset', status: 'Directory Tracker', color: '#4B5563' },
  { name: 'Codewars', status: 'v1 API Connector', color: '#B1361E' },
  { name: 'HackerRank', status: 'Profile Importer', color: '#00EA64' },
];

export default function PlatformMarquee() {
  return (
    <div className="border-y border-app-border bg-white py-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-3 text-center">
        <p className="mono-label">Multi-Platform Ecosystem Supported</p>
      </div>

      <div className="flex gap-8 overflow-hidden select-none py-2 items-center justify-center flex-wrap">
        {PLATFORMS.map((p) => (
          <div
            key={p.name}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-app-border bg-app-bg text-xs font-mono"
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="font-bold text-ink">{p.name}</span>
            <span className="text-[10px] text-ink-muted">({p.status})</span>
          </div>
        ))}
      </div>
    </div>
  );
}
