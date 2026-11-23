import React from 'react';

export default function Badge({ children, variant = 'neutral', size = 'sm', className = '', ...props }) {
  const variants = {
    neutral: 'bg-app-hover text-ink-secondary border-app-border',
    accent: 'bg-accent-subtle text-accent border-accent-border font-medium',
    success: 'bg-verdict-ac-bg text-verdict-ac border-verdict-ac-border font-medium',
    warning: 'bg-verdict-tle-bg text-verdict-tle border-verdict-tle-border font-medium',
    danger: 'bg-verdict-wa-bg text-verdict-wa border-verdict-wa-border font-medium',
    codeforces: 'bg-blue-50 text-blue-700 border-blue-200',
    atcoder: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    leetcode: 'bg-amber-50 text-amber-800 border-amber-200',
    codechef: 'bg-stone-50 text-stone-700 border-stone-200',
  };

  const sizes = {
    xs: 'text-[10px] px-1.5 py-0.5',
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 border rounded-md font-mono ${variants[variant] || variants.neutral} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
