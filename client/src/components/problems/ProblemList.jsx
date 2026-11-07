import { CheckCircle2, MinusCircle, Circle, FileText, ExternalLink, ArrowUpDown } from 'lucide-react';
import Badge from '../common/Badge';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) { return twMerge(clsx(inputs)); }

const PLATFORM_COLORS = {
  leetcode: '#FFA116', codeforces: '#1890FF', codechef: '#5B4638', atcoder: '#B22222',
};

function StatusIcon({ status }) {
  if (status === 'solved')    return <CheckCircle2 size={14} className="text-status-solved" />;
  if (status === 'attempted') return <MinusCircle  size={14} className="text-status-attempted" />;
  return <Circle size={14} className="text-text-muted" />;
}

function PlatformDot({ platform }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary capitalize">
      <span className="w-2 h-2 rounded-full" style={{ background: PLATFORM_COLORS[platform] || '#747B8C' }} />
      {platform}
    </span>
  );
}

export default function ProblemList({ problems, onNotes }) {
  if (!problems.length) {
    return (
      <div className="card">
        <div className="text-center py-16 text-text-muted text-sm">No problems match your filters.</div>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-raised">
              <th className="text-left px-4 py-2.5 text-xs font-medium text-text-muted w-10">#</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-text-muted">
                <span className="flex items-center gap-1 cursor-pointer hover:text-text-primary">
                  Problem <ArrowUpDown size={11} />
                </span>
              </th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-text-muted">Platform</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-text-muted">Difficulty</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-text-muted">Status</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-text-muted hidden lg:table-cell">Tags</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-text-muted hidden md:table-cell">Last Solved</th>
              <th className="px-4 py-2.5 w-16" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {problems.map((p, idx) => (
              <tr key={p.id} className="hover:bg-surface-raised transition-colors group">
                <td className="px-4 py-3 text-xs text-text-muted">{idx + 1}</td>

                <td className="px-4 py-3">
                  <a
                    href={p.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-primary font-medium hover:text-accent transition-colors flex items-center gap-1 group/link"
                  >
                    {p.name}
                    <ExternalLink size={11} className="opacity-0 group-hover/link:opacity-100 text-text-muted" />
                  </a>
                </td>

                <td className="px-4 py-3">
                  <PlatformDot platform={p.platform} />
                </td>

                <td className="px-4 py-3">
                  <Badge variant={p.difficulty}>{p.difficulty}</Badge>
                </td>

                <td className="px-4 py-3">
                  <span className="flex items-center gap-1.5 text-xs text-text-secondary capitalize">
                    <StatusIcon status={p.status} />
                    {p.status}
                  </span>
                </td>

                <td className="px-4 py-3 hidden lg:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {(p.tags || []).slice(0, 3).map((t) => (
                      <Badge key={t} variant="default" className="text-2xs">{t}</Badge>
                    ))}
                  </div>
                </td>

                <td className="px-4 py-3 hidden md:table-cell text-xs text-text-muted">
                  {p.lastSolved || '—'}
                </td>

                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => onNotes?.(p)}
                    className="p-1 rounded text-text-muted hover:text-accent hover:bg-accent-light transition-colors"
                    title="View notes"
                  >
                    <FileText size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
