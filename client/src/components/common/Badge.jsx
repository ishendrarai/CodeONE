import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) { return twMerge(clsx(inputs)); }

const difficultyMap = {
  easy: 'bg-status-easy-bg text-status-easy',
  medium: 'bg-status-medium-bg text-status-medium',
  hard: 'bg-status-hard-bg text-status-hard',
};

const statusMap = {
  solved: 'bg-status-solved-bg text-status-solved',
  attempted: 'bg-status-attempted-bg text-status-attempted',
  unsolved: 'bg-status-unsolved-bg text-status-unsolved',
};

const platformMap = {
  leetcode: 'bg-orange-50 text-orange-600',
  codeforces: 'bg-blue-50 text-blue-600',
  codechef: 'bg-amber-50 text-amber-700',
  atcoder: 'bg-red-50 text-red-700',
  hackerrank: 'bg-green-50 text-green-700',
};

const variantMap = {
  default: 'bg-surface-overlay text-text-secondary',
  accent: 'bg-accent-light text-accent',
  ...difficultyMap,
  ...statusMap,
  ...platformMap,
};

export default function Badge({ variant = 'default', className, children, dot }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium',
        variantMap[variant] ?? variantMap.default,
        className
      )}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70 shrink-0" />
      )}
      {children}
    </span>
  );
}

