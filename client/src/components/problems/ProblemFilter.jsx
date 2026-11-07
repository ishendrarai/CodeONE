import { Search, ChevronDown, X } from 'lucide-react';
import Button from '../common/Button';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) { return twMerge(clsx(inputs)); }

const PLATFORMS = ['All Platforms', 'LeetCode', 'Codeforces', 'CodeChef', 'AtCoder'];
const STATUSES  = ['all', 'solved', 'attempted', 'unsolved'];
const SORTS     = ['Recent', 'Difficulty', 'Platform', 'Name'];

function DifficultyPill({ label, active, onClick }) {
  const colorMap = {
    all: active ? 'bg-accent text-white' : 'bg-surface-overlay text-text-secondary hover:bg-border',
    easy: active ? 'bg-status-easy text-white' : 'bg-status-easy-bg text-status-easy hover:opacity-80',
    medium: active ? 'bg-status-medium text-white' : 'bg-status-medium-bg text-status-medium hover:opacity-80',
    hard: active ? 'bg-status-hard text-white' : 'bg-status-hard-bg text-status-hard hover:opacity-80',
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'h-7 px-3 rounded-full text-xs font-medium transition-all duration-100 capitalize',
        colorMap[label]
      )}
    >
      {label === 'all' ? 'All' : label}
    </button>
  );
}

function SelectDropdown({ value, options, onChange }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 pl-3 pr-7 text-sm bg-surface border border-border rounded-md text-text-primary appearance-none cursor-pointer hover:border-border-strong focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
    </div>
  );
}

export default function ProblemFilter({ filters, onChange, totalCount }) {
  const { search, platform, difficulty, status, sort } = filters;

  const hasActiveFilters =
    search || platform !== 'All Platforms' || difficulty !== 'all' || status !== 'all';

  const clearAll = () =>
    onChange({ search: '', platform: 'All Platforms', difficulty: 'all', status: 'all', sort });

  return (
    <div className="card p-3 mb-4">
      {/* Top row */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Search */}
        <div className="relative min-w-[200px] flex-1">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            placeholder="Search problems..."
            className="w-full h-8 pl-8 pr-3 text-sm bg-surface border border-border rounded-md text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent hover:border-border-strong transition-colors"
          />
        </div>

        <SelectDropdown
          value={platform}
          options={PLATFORMS}
          onChange={(v) => onChange({ ...filters, platform: v })}
        />

        <SelectDropdown
          value={status}
          options={STATUSES}
          onChange={(v) => onChange({ ...filters, status: v })}
        />

        <SelectDropdown
          value={sort}
          options={SORTS}
          onChange={(v) => onChange({ ...filters, sort: v })}
        />

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" leftIcon={<X size={12} />} onClick={clearAll}>
            Clear
          </Button>
        )}

        <div className="ml-auto text-xs text-text-muted whitespace-nowrap">
          {totalCount} problems
        </div>
      </div>

      {/* Difficulty pills */}
      <div className="flex gap-1.5 mt-2.5">
        {['all', 'easy', 'medium', 'hard'].map((d) => (
          <DifficultyPill
            key={d}
            label={d}
            active={difficulty === d}
            onClick={() => onChange({ ...filters, difficulty: d })}
          />
        ))}
      </div>
    </div>
  );
}
