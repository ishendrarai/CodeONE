import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import { DEMO_USER } from '../data/mockUser';
import { Shield, RefreshCw, Trash2, Download, ExternalLink, Check, AlertTriangle } from 'lucide-react';

export default function Settings() {
  const [user, setUser] = useState(DEMO_USER);
  const [publicProfileEnabled, setPublicProfileEnabled] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-ink">Account & Platform Settings</h1>
        <p className="text-xs text-ink-secondary mt-0.5">
          Manage linked competitive programming handles, public profile visibility, and data privacy.
        </p>
      </div>

      {/* ─── Profile Info Section ─── */}
      <Card className="p-6 space-y-4">
        <h2 className="text-sm font-bold text-ink">Profile Information</h2>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink-secondary mb-1">Full Name</label>
              <Input
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-secondary mb-1">Public Handle</label>
              <Input
                value={user.handle}
                onChange={(e) => setUser({ ...user, handle: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-secondary mb-1">College / University</label>
              <Input
                value={user.college}
                onChange={(e) => setUser({ ...user, college: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-secondary mb-1">Graduation Year</label>
              <Input
                value={user.graduationYear}
                onChange={(e) => setUser({ ...user, graduationYear: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            {savedSuccess ? (
              <span className="text-xs font-mono text-verdict-ac flex items-center gap-1 font-semibold">
                <Check size={14} /> Profile preferences saved!
              </span>
            ) : (
              <span />
            )}
            <Button type="submit" variant="primary" size="sm">
              Save Changes
            </Button>
          </div>
        </form>
      </Card>

      {/* ─── Linked Platforms Section ─── */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-ink">Connected Platform Handles</h2>
          <Badge variant="accent" size="xs">Zero-Credential Verified</Badge>
        </div>

        <div className="divide-y divide-app-border">
          {user.platforms.map((p) => (
            <div key={p.id} className="py-3 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                  <span className="text-xs font-bold text-ink">{p.name}</span>
                  {p.connected ? (
                    <span className="text-[10px] font-mono text-verdict-ac font-semibold">
                      @{p.handle} (Verified)
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-ink-muted">
                      {p.statusNote}
                    </span>
                  )}
                </div>
                {p.connected && (
                  <p className="text-[11px] font-mono text-ink-secondary">
                    Rating: {p.rating} • Last Synced: {p.lastSync}
                  </p>
                )}
              </div>

              {p.connected ? (
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="secondary" className="h-7 text-[11px]">
                    Re-verify
                  </Button>
                </div>
              ) : (
                <Button size="sm" variant="ghost" disabled className="h-7 text-[11px]">
                  Manual Import
                </Button>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* ─── Privacy & Public Profile Card ─── */}
      <Card className="p-6 space-y-4">
        <h2 className="text-sm font-bold text-ink">Public Profile & Privacy</h2>
        <div className="flex items-center justify-between p-4 bg-app-bg border border-app-border rounded-xl">
          <div>
            <p className="text-xs font-semibold text-ink">Public Developer Showcase Card</p>
            <p className="text-[11px] text-ink-secondary mt-0.5">
              Allow recruiters and peers to view your ratings, streak, and solved problems at{' '}
              <span className="font-mono text-accent">/u/{user.handle}</span>
            </p>
          </div>
          <button
            onClick={() => setPublicProfileEnabled(!publicProfileEnabled)}
            className={`w-11 h-6 rounded-full transition-colors relative ${
              publicProfileEnabled ? 'bg-accent' : 'bg-app-border-strong'
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                publicProfileEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </Card>

      {/* ─── Data Management: Export & Delete ─── */}
      <Card className="p-6 space-y-4">
        <h2 className="text-sm font-bold text-ink">Data Management & GDPR</h2>
        <p className="text-xs text-ink-secondary">
          Export your verified submission history as JSON, or permanently wipe your account telemetry.
        </p>

        <div className="flex items-center gap-3 pt-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setExportModalOpen(true)}
            leftIcon={<Download size={13} />}
          >
            Export Telemetry (JSON)
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => setDeleteModalOpen(true)}
            leftIcon={<Trash2 size={13} />}
          >
            Delete Account Data
          </Button>
        </div>
      </Card>

      {/* Export Confirmation Modal */}
      <Modal isOpen={exportModalOpen} onClose={() => setExportModalOpen(false)} title="Export Account Data">
        <div className="space-y-4 text-xs text-ink-secondary leading-relaxed">
          <p>
            Your export will include: <strong>482 submission records</strong>, personal problem notes, coding targets, and linked platform handles in standard JSON format.
          </p>
          <div className="pt-2 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setExportModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                alert('Telemetry JSON downloaded successfully.');
                setExportModalOpen(false);
              }}
            >
              Confirm Download
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Account & Data">
        <div className="space-y-4 text-xs text-ink-secondary leading-relaxed">
          <div className="p-3 bg-verdict-wa-bg border border-verdict-wa-border text-verdict-wa rounded-xl flex items-start gap-2">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
            <span>
              This action is irreversible. All synced platform handles, streak calculations, and personal notes will be permanently purged.
            </span>
          </div>
          <div className="pt-2 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                alert('Account data purged.');
                setDeleteModalOpen(false);
              }}
            >
              Permanently Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
