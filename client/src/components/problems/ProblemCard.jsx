import { X, Save } from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';

export default function ProblemCard({ problem, onClose }) {
  if (!problem) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/20"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className="fixed right-0 top-0 h-full w-full max-w-md z-50 bg-surface border-l border-border shadow-modal flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-start justify-between px-5 py-4 border-b border-border">
          <div className="min-w-0 pr-4">
            <h2 className="text-sm font-semibold text-text-primary leading-snug">{problem.name}</h2>
            <div className="flex items-center gap-2 mt-1.5">
              <Badge variant={problem.platform}>{problem.platform}</Badge>
              <Badge variant={problem.difficulty}>{problem.difficulty}</Badge>
              <Badge variant={problem.status}>{problem.status}</Badge>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-text-muted hover:text-text-primary hover:bg-surface-overlay transition-colors shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        {/* Notes body */}
        <div className="flex-1 overflow-y-auto p-5">
          <label className="field-label block mb-2">My Notes</label>
          <textarea
            className="w-full h-48 p-3 text-sm bg-surface-raised border border-border rounded-md text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent resize-none"
            placeholder="Add your approach, edge cases, time complexity..."
            defaultValue={problem.notes || ''}
          />

          {problem.tags?.length > 0 && (
            <div className="mt-4">
              <p className="field-label mb-2">Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {problem.tags.map((t) => (
                  <Badge key={t} variant="default">{t}</Badge>
                ))}
              </div>
            </div>
          )}

          {problem.lastSolved && (
            <div className="mt-4">
              <p className="field-label mb-1">Last Solved</p>
              <p className="text-sm text-text-secondary">{problem.lastSolved}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-border flex gap-2">
          <Button variant="primary" size="sm" leftIcon={<Save size={13} />} className="flex-1">
            Save Notes
          </Button>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </aside>
    </>
  );
}
