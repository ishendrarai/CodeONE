/**
 * src/components/goals/GoalCard.jsx
 * Layer: Frontend / Components / Goals
 * Responsibility: Renders an active goal progress card with animated progress bar and target pacing.
 */

import React from 'react';
import Badge from '../common/Badge';

export default function GoalCard({ goal, onEdit, onDelete }) {
  const percent = Math.min(100, Math.round(((goal.current || 0) / (goal.target || 1)) * 100));

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <Badge variant="info">{goal.type}</Badge>
          <span className="text-xs font-semibold text-gray-500">
            {goal.current || 0} / {goal.target} Solved
          </span>
        </div>
        <h4 className="text-base font-semibold text-gray-900 dark:text-white capitalize mb-1">
          {goal.type} Problem Target
        </h4>
        <p className="text-xs text-gray-400 mb-4">
          Window: {new Date(goal.startDate).toLocaleDateString()} -{' '}
          {new Date(goal.endDate).toLocaleDateString()}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-primary h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-xs text-gray-500">
        <span>{percent}% Completed</span>
        {percent >= 100 ? (
          <span className="text-green-500 font-semibold">Goal Achieved! 🎉</span>
        ) : (
          <span>In Progress</span>
        )}
      </div>
    </div>
  );
}

