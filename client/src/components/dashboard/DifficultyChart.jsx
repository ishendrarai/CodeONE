/**
 * src/components/dashboard/DifficultyChart.jsx
 * Layer: Frontend / Components / Dashboard
 * Responsibility: Recharts BarChart comparing Easy, Medium, and Hard solved problems.
 */

import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function DifficultyChart({ data = {} }) {
  const chartData = [
    { difficulty: 'Easy', count: data.easy || 0, fill: '#22C55E' },
    { difficulty: 'Medium', count: data.medium || 0, fill: '#EAB308' },
    { difficulty: 'Hard', count: data.hard || 0, fill: '#EF4444' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
        Difficulty Distribution
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="difficulty" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

