import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ListTodo,
  BarChart2,
  Trophy,
  User,
  Code2,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) { return twMerge(clsx(inputs)); }

const NAV_ITEMS = [
  { to: '/',          label: 'Dashboard',  icon: LayoutDashboard },
  { to: '/problems',  label: 'Problems',   icon: ListTodo        },
  { to: '/analytics', label: 'Analytics',  icon: BarChart2       },
  { to: '/contests',  label: 'Contests',   icon: Trophy          },
];

const BOTTOM_ITEMS = [
  { to: '/profile',  label: 'Profile',   icon: User     },
  { to: '/settings', label: 'Settings',  icon: Settings },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col h-screen sticky top-0 bg-surface border-r border-border transition-all duration-200 shrink-0',
        collapsed ? 'w-14' : 'w-56'
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-14 border-b border-border shrink-0">
        <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center shrink-0">
          <Code2 size={14} className="text-white" />
        </div>
        {!collapsed && (
          <span className="font-semibold text-md text-text-primary tracking-tight">
            Code<span className="text-accent">ONE</span>
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 flex flex-col gap-0.5">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2.5 h-8 rounded-md px-2.5 text-sm font-medium transition-colors duration-100',
                isActive
                  ? 'bg-accent-light text-accent'
                  : 'text-text-secondary hover:bg-surface-overlay hover:text-text-primary'
              )
            }
            title={collapsed ? label : undefined}
          >
            <Icon size={16} className="shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-2 py-3 border-t border-border flex flex-col gap-0.5">
        {BOTTOM_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2.5 h-8 rounded-md px-2.5 text-sm font-medium transition-colors duration-100',
                isActive
                  ? 'bg-accent-light text-accent'
                  : 'text-text-secondary hover:bg-surface-overlay hover:text-text-primary'
              )
            }
            title={collapsed ? label : undefined}
          >
            <Icon size={16} className="shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="flex items-center gap-2.5 h-8 rounded-md px-2.5 text-sm font-medium text-text-muted hover:bg-surface-overlay hover:text-text-primary transition-colors duration-100 mt-1"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          {!collapsed && <span className="text-xs">Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
