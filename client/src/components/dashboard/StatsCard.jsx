import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

function cn(...inputs) { return twMerge(clsx(inputs)); }

export default function StatsCard({ label, value, sub, trend, icon: Icon, accentColor = '#5145E5' }) {
  const trendIcon =
    trend > 0 ? <TrendingUp size={12} /> :
    trend < 0 ? <TrendingDown size={12} /> :
    <Minus size={12} />;

  const trendClass =
    trend > 0 ? 'text-status-easy' :
    trend < 0 ? 'text-status-hard' :
    'text-text-muted';

  return (
    <div className="card p-4 flex flex-col gap-3">
      {/* Top row */}
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium text-text-secondary">{label}</span>
        {Icon && (
          <span
            className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
            style={{ background: `${accentColor}14` }}
          >
            <Icon size={14} style={{ color: accentColor }} />
          </span>
        )}
      </div>

      {/* Value */}
      <div>
        <p className="text-2xl font-semibold text-text-primary leading-none">{value}</p>
        {sub && <p className="text-xs text-text-muted mt-1">{sub}</p>}
      </div>

      {/* Trend */}
      {trend !== undefined && (
        <div className={cn('flex items-center gap-1 text-xs font-medium', trendClass)}>
          {trendIcon}
          <span>
            {trend > 0 ? '+' : ''}{trend}% vs last week
          </span>
        </div>
      )}
    </div>
  );
}
