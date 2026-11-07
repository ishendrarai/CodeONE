export default function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {icon && (
        <div className="w-12 h-12 rounded-xl bg-surface-overlay flex items-center justify-center mb-4 text-text-muted">
          {icon}
        </div>
      )}
      <p className="text-sm font-medium text-text-primary mb-1">{title}</p>
      {description && <p className="text-sm text-text-secondary mb-4">{description}</p>}
      {action}
    </div>
  );
}

