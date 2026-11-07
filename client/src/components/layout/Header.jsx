import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, Moon, Sun, LogOut, ChevronDown, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

function UserMenu({ user, logout }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) ?? 'U';

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 h-8 pl-1.5 pr-2 rounded-md hover:bg-surface-overlay transition-colors"
      >
        <span className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-xs font-semibold text-white shrink-0">
          {initials}
        </span>
        <span className="hidden sm:block text-sm font-medium text-text-primary max-w-[100px] truncate">
          {user?.name}
        </span>
        <ChevronDown size={12} className="text-text-muted" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-1.5 w-44 z-20 bg-surface border border-border rounded-lg shadow-dropdown animate-fade-in">
            <div className="px-3 py-2 border-b border-border">
              <p className="text-xs font-medium text-text-primary truncate">{user?.name}</p>
              <p className="text-xs text-text-muted truncate">{user?.email}</p>
            </div>
            <div className="p-1">
              <button
                onClick={() => { setOpen(false); navigate('/profile'); }}
                className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-text-secondary hover:bg-surface-overlay hover:text-text-primary rounded transition-colors"
              >
                <User size={14} /> Profile
              </button>
              <button
                onClick={() => { setOpen(false); logout(); }}
                className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-status-hard hover:bg-status-hard-bg rounded transition-colors"
              >
                <LogOut size={14} /> Log out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function Header() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [searchVal, setSearchVal] = useState('');

  return (
    <header className="h-14 bg-surface border-b border-border flex items-center px-4 gap-3 shrink-0 sticky top-0 z-30">
      {/* Search */}
      <div className="relative flex-1 max-w-xs">
        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
        <input
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          type="text"
          placeholder="Search problems..."
          className="w-full h-8 pl-8 pr-3 text-sm bg-surface-raised border border-border rounded-md text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent hover:border-border-strong transition-colors"
        />
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Actions */}
      <div className="flex items-center gap-1">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="w-8 h-8 flex items-center justify-center rounded-md text-text-secondary hover:bg-surface-overlay hover:text-text-primary transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Notifications */}
        <button
          className="w-8 h-8 flex items-center justify-center rounded-md text-text-secondary hover:bg-surface-overlay hover:text-text-primary relative transition-colors"
          aria-label="Notifications"
        >
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-accent rounded-full" />
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-border mx-1" />

        {/* User */}
        {user && <UserMenu user={user} logout={logout} />}
      </div>
    </header>
  );
}
