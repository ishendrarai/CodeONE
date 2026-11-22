import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import ProgressRing from '../components/ui/ProgressRing';
import { Target, CheckCircle2, Plus, Calendar, Flame, Trophy } from 'lucide-react';

export default function Goals() {
  const [goals, setGoals] = useState([
    {
      id: 'g1',
      title: 'Daily Practice Quota',
      type: 'daily',
      target: 2,
      current: 2,
      unit: 'problems',
      period: 'Today',
      status: 'completed',
    },
    {
      id: 'g2',
      title: 'Weekly Problem Volume',
      type: 'weekly',
      target: 15,
      current: 11,
      unit: 'problems',
      period: 'This Week',
      status: 'in_progress',
    },
    {
      id: 'g3',
      title: 'Contest Upsolve Backlog',
      type: 'weekly',
      target: 4,
      current: 3,
      unit: 'upsolves',
      period: 'This Week',
      status: 'in_progress',
    },
    {
      id: 'g4',
      title: 'Tree DP Specialist Target',
      type: 'monthly',
      target: 12,
      current: 7,
      unit: 'Tree DP problems',
      period: 'This Month',
      status: 'in_progress',
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTarget, setNewTarget] = useState('5');
  const [newPeriod, setNewPeriod] = useState('weekly');

  const handleCreateGoal = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newG = {
      id: `g_${Date.now()}`,
      title: newTitle.trim(),
      type: newPeriod,
      target: parseInt(newTarget, 10) || 5,
      current: 0,
      unit: 'problems',
      period: newPeriod === 'daily' ? 'Today' : newPeriod === 'weekly' ? 'This Week' : 'This Month',
      status: 'in_progress',
    };

    setGoals([newG, ...goals]);
    setNewTitle('');
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-ink">Coding Goals & Milestones</h1>
          <p className="text-xs text-ink-secondary mt-0.5">
            Set deliberate practice intervals to maintain streak momentum and upsolve cadence.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={() => setModalOpen(true)} leftIcon={<Plus size={13} />}>
          Create New Goal
        </Button>
      </div>

      {/* ─── Goals Cards Grid ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map((g) => {
          const progressPercent = Math.min(100, Math.round((g.current / g.target) * 100));
          const isDone = g.current >= g.target;
          return (
            <Card key={g.id} className="p-5 flex items-center justify-between gap-4">
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-ink truncate">{g.title}</h3>
                  <Badge variant={isDone ? 'success' : 'neutral'} size="xs">
                    {g.period}
                  </Badge>
                </div>
                <p className="text-[11px] font-mono text-ink-secondary">
                  Completed <span className="font-bold text-ink">{g.current}</span> of{' '}
                  <span className="font-bold text-ink">{g.target}</span> {g.unit}
                </p>
                <div className="w-full h-1.5 bg-app-bg border border-app-border rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isDone ? 'bg-verdict-ac' : 'bg-accent'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Progress Ring */}
              <div className="shrink-0">
                <ProgressRing progress={progressPercent} size={48} strokeWidth={4}>
                  <span className="font-mono text-[10px] font-bold text-ink">{progressPercent}%</span>
                </ProgressRing>
              </div>
            </Card>
          );
        })}
      </div>

      {/* ─── Weekly Review Card ─── */}
      <Card className="p-6 bg-app-bg border-app-border space-y-4">
        <div className="flex items-center justify-between border-b border-app-border pb-3">
          <div className="flex items-center gap-2">
            <Trophy size={16} className="text-accent" />
            <h2 className="text-xs font-bold text-ink">Weekly Performance Retrospective</h2>
          </div>
          <span className="font-mono text-[11px] text-ink-muted">Week 46 • 2024</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-3 bg-white border border-app-border rounded-xl">
            <span className="text-[10px] text-ink-muted uppercase">Pacing Score</span>
            <p className="text-base font-bold text-ink mt-0.5">88.4% Consistency</p>
            <p className="text-[10px] text-verdict-ac mt-0.5">Met 5 out of 7 daily targets</p>
          </div>

          <div className="p-3 bg-white border border-app-border rounded-xl">
            <span className="text-[10px] text-ink-muted uppercase">Contest Upsolves</span>
            <p className="text-base font-bold text-ink mt-0.5">3 Completed</p>
            <p className="text-[10px] text-ink-secondary mt-0.5">From CF Round 983</p>
          </div>

          <div className="p-3 bg-white border border-app-border rounded-xl">
            <span className="text-[10px] text-ink-muted uppercase">Next Week Focus</span>
            <p className="text-base font-bold text-ink mt-0.5">Tree DP (CF 1882D)</p>
            <p className="text-[10px] text-accent mt-0.5">Recommended by AI Coach</p>
          </div>
        </div>
      </Card>

      {/* Create Goal Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Set Practice Target">
        <form onSubmit={handleCreateGoal} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-ink-secondary mb-1">Goal Description</label>
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Solve 3 Graph Flow problems"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-ink-secondary mb-1">Target Count</label>
              <Input
                type="number"
                min="1"
                value={newTarget}
                onChange={(e) => setNewTarget(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-secondary mb-1">Time Horizon</label>
              <select
                value={newPeriod}
                onChange={(e) => setNewPeriod(e.target.value)}
                className="w-full h-9 rounded-lg border border-app-border bg-white px-3 text-xs font-mono text-ink focus:border-accent focus:outline-none"
              >
                <option value="daily">Daily Goal</option>
                <option value="weekly">Weekly Goal</option>
                <option value="monthly">Monthly Milestone</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Save Goal
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
