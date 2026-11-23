import React from 'react';

export default function Kbd({ children, className = '' }) {
  return (
    <kbd
      className={`inline-flex items-center justify-center font-mono text-[10px] uppercase tracking-wide text-ink-secondary bg-app-bg border border-app-border rounded px-1.5 py-0.5 shadow-sm leading-none ${className}`}
    >
      {children}
    </kbd>
  );
}
