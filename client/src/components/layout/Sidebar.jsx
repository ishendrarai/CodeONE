import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  CheckSquare,
  BarChart2,
  Calendar,
  Target,
  Bot,
  Settings,
  User,
  Code2,
} from 'lucide-react';
import Kbd from '../ui/Kbd';
import { DEMO_USER } from '../../data/mockUser';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, shortcut: 'G D' },
  { to: '/problems', label: 'Problems', icon: CheckSquare, shortcut: 'G P' },
  { to: '/analytics', label: 'Analytics', icon: BarChart2, shortcut: 'G A' },
  { to: '/contests', label: 'Contests', icon: Calendar, shortcut: 'G C' },
  { to: '/goals', label: 'Goals', icon: Target, shortcut: 'G G' },
  { to: '/coach', label: 'AI Coach', icon: Bot, badge: 'AI', shortcut: 'G M' },
];

export default function Sidebar() {
  return (
    <aside className="w-56 h-screen sticky top-0 flex flex-col bg-white border-r border-app-border z-30 select-none shrink-0">
      {/* Brand */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-app-border">
        <NavLink to="/dashboard" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-ink flex items-center justify-center text-white">
            <Code2 size={15} />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-semibold text-sm tracking-tight text-ink">CodeONE</span>
            <span className="font-mono text-[9px] uppercase px-1 rounded bg-app-hover text-ink-muted">demo</span>
          </div>
        </NavLink>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
        <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-ink-muted">
          Workspace
        </div>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-app-hover text-ink font-semibold border border-app-border'
                    : 'text-ink-secondary hover:text-ink hover:bg-app-hover border border-transparent'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-2.5">
                    <Icon
                      size={15}
                      className={isActive ? 'text-accent' : 'text-ink-muted group-hover:text-ink-secondary'}
                    />
                    <span>{item.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className="text-[9px] font-mono px-1 rounded bg-accent-subtle text-accent font-semibold">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Bottom Pinned User Profile & Settings */}
      <div className="p-2 border-t border-app-border space-y-0.5 bg-white">
        <NavLink
          to={`/u/${DEMO_USER.handle}`}
          className={({ isActive }) =>
            `flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors ${
              isActive
                ? 'bg-app-hover text-ink font-semibold'
                : 'text-ink-secondary hover:text-ink hover:bg-app-hover'
            }`
          }
        >
          <div className="flex items-center gap-2">
            <User size={15} className="text-ink-muted" />
            <span>Public Profile</span>
          </div>
          <span className="text-[10px] font-mono text-ink-muted">↗</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors ${
              isActive
                ? 'bg-app-hover text-ink font-semibold'
                : 'text-ink-secondary hover:text-ink hover:bg-app-hover'
            }`
          }
        >
          <div className="flex items-center gap-2">
            <Settings size={15} className="text-ink-muted" />
            <span>Settings</span>
          </div>
        </NavLink>

        {/* User Card */}
        <div className="pt-2 px-2 pb-1 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-full bg-ink text-white flex items-center justify-center font-mono text-[10px] font-semibold shrink-0">
              {DEMO_USER.initials}
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-ink leading-none truncate">{DEMO_USER.name}</p>
              <p className="font-mono text-[10px] text-ink-muted truncate">@{DEMO_USER.handle}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
