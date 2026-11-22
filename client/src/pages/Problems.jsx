import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  CheckSquare,
  Bookmark,
  BookmarkCheck,
  FileText,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Flame,
  Plus,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Tabs from '../components/ui/Tabs';
import Drawer from '../components/ui/Drawer';
import { fetchProblems } from '../data/mockService';
import { getDifficultyBadgeClass } from '../lib/format';

export default function Problems() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'all';

  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');

  // Notes drawer state
  const [activeNotesProblem, setActiveNotesProblem] = useState(null);
  const [noteContent, setNoteContent] = useState('');

  const TABS = [
    { id: 'all', label: 'All Problems' },
    { id: 'upsolve', label: 'Upsolve Queue', count: 4 },
    { id: 'recommended', label: 'Recommended Next' },
  ];

  useEffect(() => {
    setLoading(true);
    fetchProblems({ tab: currentTab, search: searchQuery, platform: selectedPlatform, difficulty: selectedDifficulty })
      .then((res) => {
        setProblems(res);
        setLoading(false);
      });
  }, [currentTab, searchQuery, selectedPlatform, selectedDifficulty]);

  const handleTabChange = (tabId) => {
    if (tabId === 'all') {
      searchParams.delete('tab');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ tab: tabId });
    }
  };

  const toggleBookmark = (problemId) => {
    setProblems((prev) =>
      prev.map((p) => (p.id === problemId ? { ...p, bookmarked: !p.bookmarked } : p))
    );
  };

  const openNotes = (problem) => {
    setActiveNotesProblem(problem);
    setNoteContent(problem.notes || '');
  };

  const saveNotes = () => {
    if (!activeNotesProblem) return;
    setProblems((prev) =>
      prev.map((p) => (p.id === activeNotesProblem.id ? { ...p, notes: noteContent } : p))
    );
    setActiveNotesProblem(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-ink">Problem Tracker & Catalogue</h1>
        <p className="text-xs text-ink-secondary mt-0.5">
          Track verified solutions, annotate mistakes, and conquer your contest upsolve backlog.
        </p>
      </div>

      {/* Primary Tabs */}
      <Tabs tabs={TABS} activeTab={currentTab} onChange={handleTabChange} />

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="flex-1 w-full sm:max-w-xs">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search problems or algorithmic tags..."
            leftIcon={<Search size={14} />}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {/* Platform Filter */}
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="h-9 px-3 rounded-lg border border-app-border bg-white text-xs font-mono text-ink focus:outline-none focus:border-accent"
          >
            <option value="all">All Platforms</option>
            <option value="codeforces">Codeforces</option>
            <option value="atcoder">AtCoder</option>
          </select>

          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="h-9 px-3 rounded-lg border border-app-border bg-white text-xs font-mono text-ink focus:outline-none focus:border-accent"
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy (&lt; 1400)</option>
            <option value="medium">Medium (1400–1800)</option>
            <option value="hard">Hard (&gt; 1800)</option>
          </select>
        </div>
      </div>

      {/* Problems Table */}
      <Card className="overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-app-border bg-app-bg text-[10px] uppercase text-ink-muted">
                <th className="py-2.5 px-4 font-semibold w-10">BM</th>
                <th className="py-2.5 px-4 font-semibold">Problem Title</th>
                <th className="py-2.5 px-4 font-semibold">Platform</th>
                <th className="py-2.5 px-4 font-semibold">Difficulty</th>
                <th className="py-2.5 px-4 font-semibold">Rating</th>
                <th className="py-2.5 px-4 font-semibold">Tags</th>
                <th className="py-2.5 px-4 font-semibold">Status</th>
                <th className="py-2.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-app-border">
              {loading ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-ink-muted">
                    Loading problem set...
                  </td>
                </tr>
              ) : problems.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-ink-muted">
                    No problems matching filter criteria.
                  </td>
                </tr>
              ) : (
                problems.map((p) => {
                  return (
                    <tr key={p.id} className="hover:bg-app-bg transition-colors">
                      {/* Bookmark Icon */}
                      <td className="py-3 px-4">
                        <button
                          onClick={() => toggleBookmark(p.id)}
                          className="text-ink-muted hover:text-ink transition-colors"
                        >
                          {p.bookmarked ? (
                            <BookmarkCheck size={14} className="text-accent fill-accent" />
                          ) : (
                            <Bookmark size={14} />
                          )}
                        </button>
                      </td>

                      {/* Title & Link */}
                      <td className="py-3 px-4 font-medium text-ink">
                        <div className="flex items-center gap-2">
                          <a
                            href={p.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-accent hover:underline flex items-center gap-1.5"
                          >
                            <span>{p.title}</span>
                            <ExternalLink size={11} className="text-ink-muted" />
                          </a>
                          {p.isUpsolve && (
                            <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-red-50 text-red-600 border border-red-200 font-bold">
                              UPSOLVE
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Platform */}
                      <td className="py-3 px-4 capitalize text-ink-secondary">{p.platform}</td>

                      {/* Difficulty Badge */}
                      <td className="py-3 px-4">
                        <span
                          className={`px-1.5 py-0.5 rounded border text-[10px] font-semibold ${getDifficultyBadgeClass(
                            p.difficulty
                          )}`}
                        >
                          {p.difficulty}
                        </span>
                      </td>

                      {/* Rating */}
                      <td className="py-3 px-4 text-ink-secondary font-bold">{p.rating}</td>

                      {/* Tags */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1 flex-wrap max-w-xs">
                          {p.tags.slice(0, 2).map((t) => (
                            <span
                              key={t}
                              className="px-1.5 py-0.5 bg-app-bg border border-app-border rounded text-[10px] text-ink-secondary truncate"
                            >
                              {t}
                            </span>
                          ))}
                          {p.tags.length > 2 && (
                            <span className="text-[10px] text-ink-muted">+{p.tags.length - 2}</span>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            p.status === 'solved'
                              ? 'success'
                              : p.status === 'attempted'
                              ? 'warning'
                              : 'neutral'
                          }
                          size="xs"
                        >
                          {p.status}
                        </Badge>
                      </td>

                      {/* Notes Action */}
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => openNotes(p)}
                          className="inline-flex items-center gap-1 text-[11px] text-ink-secondary hover:text-ink px-2 py-1 rounded hover:bg-app-hover border border-transparent hover:border-app-border"
                        >
                          <FileText size={12} className={p.notes ? 'text-accent' : 'text-ink-muted'} />
                          <span>{p.notes ? 'Notes' : 'Add Note'}</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Notes Slide-Over Drawer */}
      <Drawer
        isOpen={!!activeNotesProblem}
        onClose={() => setActiveNotesProblem(null)}
        title={activeNotesProblem?.title ? `Notes: ${activeNotesProblem.title}` : 'Problem Notes'}
      >
        <div className="space-y-4">
          <div className="p-3 bg-app-bg border border-app-border rounded-xl text-xs space-y-1 font-mono">
            <p className="font-bold text-ink">{activeNotesProblem?.title}</p>
            <p className="text-ink-muted">
              Rating: {activeNotesProblem?.rating} • Platform: {activeNotesProblem?.platform}
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-secondary mb-1">
              Personal Takeaways & Editorial Hints
            </label>
            <textarea
              rows={8}
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Record your algorithmic approach, where you got stuck, edge-case invariants, time complexity..."
              className="w-full rounded-xl border border-app-border p-3 text-xs font-mono text-ink bg-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" onClick={() => setActiveNotesProblem(null)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={saveNotes}>
              Save Note
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
