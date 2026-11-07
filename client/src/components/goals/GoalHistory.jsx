/**
 * src/components/goals/GoalHistory.jsx
 * Layer: Frontend / Components / Goals
 * Responsibility: Renders historical completed or expired goal records.
 */

import React from 'react';
import Badge from '../common/Badge';

export default function GoalHistory({ pastGoals = [] }) {
  if (pastGoals.length === 0) {
    return <p className="text-sm text-gray-400">No past goals recorded.</p>;
  }

  return (
    <div className="divide-y divide-gray-100 dark:divide-gray-700">
      {pastGoals.map((goal) => (
        <div key={goal.id} className="py-3 flex items-center justify-between">
          <div>
            <span className="font-medium text-sm capitalize dark:text-white">
              {goal.type} Goal
            </span>
            <p className="text-xs text-gray-400">
              Ended: {new Date(goal.endDate).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">
              {goal.current} / {goal.target}
            </span>
            <Badge variant={goal.current >= goal.target ? 'success' : 'neutral'}>
              {goal.current >= goal.target ? 'Achieved' : 'Ended'}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}

