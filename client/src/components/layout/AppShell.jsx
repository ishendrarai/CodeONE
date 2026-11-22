import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import GridBackground from './GridBackground';
import CommandPalette from '../ui/CommandPalette';
import { useHotkeys } from '../../hooks/useHotkeys';

export default function AppShell() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  useHotkeys('cmd+k', () => setCommandPaletteOpen(true));
  useHotkeys('/', () => setCommandPaletteOpen(true));

  return (
    <div className="flex min-h-screen bg-app-bg text-ink relative">
      <GridBackground />
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 z-10">
        <Topbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </div>
  );
}
