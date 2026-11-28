import { BarChart3, CalendarDays, Code2, LayoutDashboard, Settings, Target, Trophy } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

const navigation = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/problems', label: 'Problems', icon: Code2 },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/contests', label: 'Contests', icon: CalendarDays },
  { to: '/goals', label: 'Goals', icon: Target },
  { to: '/coach', label: 'AI Coach', icon: Trophy },
];

export default function AppShell() {
  const { user } = useAuth();
  const initials = user?.name
    ?.split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U';

  return (
    <div className="flex min-h-screen bg-app-bg text-ink">
      <aside className="hidden w-60 shrink-0 border-r border-app-border bg-white md:flex md:flex-col">
        <NavLink to="/dashboard" className="flex h-16 items-center gap-2 border-b border-app-border px-5">
          <Code2 aria-hidden="true" className="h-5 w-5 text-accent" />
          <span className="font-semibold tracking-tight">CodeONE</span>
        </NavLink>
        <nav aria-label="Main navigation" className="flex-1 space-y-1 p-3">
          {navigation.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                  isActive
                    ? 'bg-accent-subtle font-medium text-accent'
                    : 'text-ink-secondary hover:bg-app-hover hover:text-ink',
                )
              }
            >
              <Icon aria-hidden="true" className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              'm-3 flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
              isActive
                ? 'bg-accent-subtle font-medium text-accent'
                : 'text-ink-secondary hover:bg-app-hover hover:text-ink',
            )
          }
        >
          <Settings aria-hidden="true" className="h-4 w-4" />
          Settings
        </NavLink>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-app-border bg-white px-5 md:px-8">
          <NavLink to="/dashboard" className="flex items-center gap-2 font-semibold md:hidden">
            <Code2 aria-hidden="true" className="h-5 w-5 text-accent" />
            CodeONE
          </NavLink>
          <div className="hidden text-sm font-medium text-ink-secondary md:block">Your coding workspace</div>
          <div className="flex items-center gap-3" aria-label="Signed-in user">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-subtle text-xs font-semibold text-accent">
              {initials}
            </span>
            <span className="text-sm font-medium">{user?.name || 'Account'}</span>
          </div>
        </header>
        <main className="w-full flex-1 p-5 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
