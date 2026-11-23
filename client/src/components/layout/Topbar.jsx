import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search, RefreshCw, Bell, User, Check, ExternalLink } from 'lucide-react';
import Kbd from '../ui/Kbd';
import { DEMO_USER } from '../../data/mockUser';

export default function Topbar({ onOpenCommandPalette }) {
  const location = useLocation();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncDone, setSyncDone] = useState(false);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('dashboard')) return 'Dashboard';
    if (path.includes('problems')) return 'Problem Tracker';
    if (path.includes('analytics')) return 'Performance Analytics';
    if (path.includes('contests')) return 'Contest Calendar';
    if (path.includes('goals')) return 'Coding Goals';
    if (path.includes('coach')) return 'AI Consistency Coach';
    if (path.includes('settings')) return 'Settings';
    return 'CodeONE';
  };

  const handleSyncAll = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setSyncDone(false);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncDone(true);
      setTimeout(() => setSyncDone(false), 3000);
    }, 1200);
  };

  return (
    <header className="h-14 px-6 sticky top-0 bg-white/95 border-b border-app-border z-20 flex items-center justify-between backdrop-filter-none">
      {/* Breadcrumb / Title */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-ink">{getPageTitle()}</span>
        <span className="text-xs text-ink-faint">/</span>
        <span className="font-mono text-[11px] text-ink-muted">telemetry</span>
      </div>

      {/* Middle Search Button */}
      <button
        onClick={onOpenCommandPalette}
        className="hidden md:flex items-center gap-2 h-8 px-3 rounded-lg border border-app-border bg-app-bg text-ink-muted hover:text-ink hover:border-app-border-strong transition-all text-xs w-64 justify-between"
      >
        <span className="flex items-center gap-1.5 text-xs">
          <Search size={13} />
          <span>Search or jump to...</span>
        </span>
        <Kbd>⌘K</Kbd>
      </button>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Sync Trigger Chip */}
        <button
          onClick={handleSyncAll}
          disabled={isSyncing}
          className="flex items-center gap-1.5 h-7 px-2.5 rounded-full border border-app-border bg-white text-ink text-xs font-medium hover:bg-app-hover transition-colors shadow-sm disabled:opacity-75"
        >
          {isSyncing ? (
            <RefreshCw size={11} className="animate-spin text-accent" />
          ) : syncDone ? (
            <Check size={12} className="text-verdict-ac" />
          ) : (
            <RefreshCw size={11} className="text-ink-muted" />
          )}
          <span className="font-mono text-[11px]">
            {isSyncing ? 'Syncing...' : syncDone ? 'Updated' : 'Sync Platforms'}
          </span>
        </button>

        {/* Demo Data Tag */}
        <div className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded border border-amber-200 bg-amber-50 text-[10px] font-mono font-medium text-amber-800">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span>Demo Data</span>
        </div>

        {/* Public Card Link */}
        <Link
          to={`/u/${DEMO_USER.handle}`}
          title="View public profile card"
          className="p-1.5 text-ink-muted hover:text-ink rounded-lg hover:bg-app-hover transition-colors"
        >
          <ExternalLink size={15} />
        </Link>
      </div>
    </header>
  );
}
