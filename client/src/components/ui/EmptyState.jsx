import React from 'react';
import Button from './Button';

export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center bg-white border border-app-border rounded-card ${className}`}
    >
      {icon && <div className="p-3 bg-app-bg text-ink-muted rounded-xl mb-3">{icon}</div>}
      <h3 className="text-sm font-semibold text-ink mb-1">{title}</h3>
      <p className="text-xs text-ink-secondary max-w-sm mb-4">{description}</p>
      {actionLabel && onAction && (
        <Button size="sm" variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
