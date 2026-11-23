import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  LayoutDashboard,
  CheckSquare,
  BarChart2,
  Calendar,
  Target,
  Bot,
  Settings,
  User,
  ArrowRight,
} from 'lucide-react';
import Kbd from './Kbd';

const ACTIONS = [
  { id: 'dash', label: 'Go to Dashboard', path: '/dashboard', icon: LayoutDashboard, group: 'Navigation' },
  { id: 'prob', label: 'Problem Tracker', path: '/problems', icon: CheckSquare, group: 'Navigation' },
  { id: 'upsolve', label: 'Upsolve Queue', path: '/problems?tab=upsolve', icon: CheckSquare, group: 'Navigation' },
  { id: 'analytics', label: 'Performance Analytics', path: '/analytics', icon: BarChart2, group: 'Navigation' },
  { id: 'contests', label: 'Contest Calendar', path: '/contests', icon: Calendar, group: 'Navigation' },
  { id: 'goals', label: 'Coding Goals', path: '/goals', icon: Target, group: 'Navigation' },
  { id: 'coach', label: 'AI Consistency Coach', path: '/coach', icon: Bot, group: 'Features' },
  { id: 'profile', label: 'Public Profile Card', path: '/u/karan_cp', icon: User, group: 'Features' },
  { id: 'settings', label: 'Platform & Profile Settings', path: '/settings', icon: Settings, group: 'Settings' },
];

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const filtered = ACTIONS.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.group.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (!isOpen) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((i) => (i + 1) % Math.max(1, filtered.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((i) => (i - 1 + filtered.length) % Math.max(1, filtered.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          navigate(filtered[selectedIndex].path);
          onClose();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, navigate, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/25"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -6 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-lg bg-white border border-app-border rounded-xl shadow-modal overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3 border-b border-app-border gap-2.5">
              <Search size={16} className="text-ink-muted shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search page..."
                className="w-full text-xs text-ink placeholder:text-ink-muted bg-transparent focus:outline-none"
              />
              <Kbd>ESC</Kbd>
            </div>

            {/* List */}
            <div className="max-h-72 overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-xs text-ink-muted">No commands found.</div>
              ) : (
                filtered.map((item, index) => {
                  const Icon = item.icon;
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        navigate(item.path);
                        onClose();
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex items-center justify-between px-4 py-2 cursor-pointer transition-colors ${
                        isSelected ? 'bg-app-hover text-ink' : 'text-ink-secondary'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon size={14} className={isSelected ? 'text-accent' : 'text-ink-muted'} />
                        <span className="text-xs font-medium">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-ink-muted font-mono">{item.group}</span>
                        {isSelected && <ArrowRight size={12} className="text-ink-muted" />}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
