/**
 * src/pages/Goals.jsx
 * Layer: Frontend / Pages
 * Responsibility: Coding goals management page for creating, tracking, and completing targets.
 * Interaction: Uses useGoals hook; renders GoalCreator modal, active GoalCards, and completion history.
 */

import React, { useState } from 'react';
import { useGoals } from '../hooks/useGoals';
import GoalCard from '../components/goals/GoalCard';
import GoalCreator from '../components/goals/GoalCreator';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function Goals() {
  const { data: goals, isLoading } = useGoals(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Goal Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Set and track measurable daily, weekly, and monthly coding milestones.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>Create New Goal</Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-12">
          <LoadingSpinner />
        </div>
      ) : goals?.length === 0 ? (
        <div className="p-8 text-center bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">No active goals found. Set a goal to stay consistent!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals?.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      )}

      {isModalOpen && <GoalCreator isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

