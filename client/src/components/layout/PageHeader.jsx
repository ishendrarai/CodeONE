import React from 'react';

export default function PageHeader({ title, description, actions, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-ink">{title}</h1>
        {description && <p className="text-xs text-ink-secondary mt-1">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
      {children}
    </div>
  );
}
