import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-app-border bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-ink-secondary">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded bg-ink text-white flex items-center justify-center font-bold">
            <Code2 size={13} />
          </div>
          <span className="font-semibold text-ink">CodeONE</span>
          <span className="text-ink-muted">• College Major Project Demo</span>
        </div>

        <div className="flex items-center gap-6 font-mono text-[11px] text-ink-muted">
          <Link to="/dashboard" className="hover:text-ink transition-colors">
            Dashboard
          </Link>
          <Link to="/contests" className="hover:text-ink transition-colors">
            Contests
          </Link>
          <Link to="/u/karan_cp" className="hover:text-ink transition-colors">
            Public Card
          </Link>
          <Link to="/settings" className="hover:text-ink transition-colors">
            Settings
          </Link>
        </div>

        <div className="text-[11px] font-mono text-ink-muted">
          Built with React 18, Vite & Tailwind CSS. Light mode only.
        </div>
      </div>
    </footer>
  );
}
