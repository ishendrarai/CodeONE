import { format, formatDistanceToNow, parseISO } from 'date-fns';

export function formatTimeAgo(dateInput) {
  if (!dateInput) return '—';
  const date = typeof dateInput === 'string' ? parseISO(dateInput) : dateInput;
  return formatDistanceToNow(date, { addSuffix: true });
}

export function formatCountdown(targetDateInput) {
  if (!targetDateInput) return { days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0 };
  const target = typeof targetDateInput === 'string' ? new Date(targetDateInput) : targetDateInput;
  const now = new Date();
  const diffMs = Math.max(0, target.getTime() - now.getTime());

  const seconds = Math.floor((diffMs / 1000) % 60);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds, totalMs: diffMs };
}

export function formatCompact(num) {
  if (num === null || num === undefined) return '—';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num.toString();
}

export function getVerdictBadgeClass(verdict) {
  switch (verdict) {
    case 'AC':
      return 'bg-verdict-ac-bg text-verdict-ac border-verdict-ac-border';
    case 'WA':
      return 'bg-verdict-wa-bg text-verdict-wa border-verdict-wa-border';
    case 'TLE':
    case 'MLE':
      return 'bg-verdict-tle-bg text-verdict-tle border-verdict-tle-border';
    default:
      return 'bg-app-hover text-ink-secondary border-app-border';
  }
}

export function getDifficultyBadgeClass(difficulty) {
  switch (difficulty?.toLowerCase()) {
    case 'easy':
      return 'bg-difficulty-easy-bg text-difficulty-easy border-green-200';
    case 'medium':
      return 'bg-difficulty-medium-bg text-difficulty-medium border-amber-200';
    case 'hard':
      return 'bg-difficulty-hard-bg text-difficulty-hard border-red-200';
    default:
      return 'bg-app-hover text-ink-secondary border-app-border';
  }
}
