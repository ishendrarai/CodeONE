/**
 * src/components/dashboard/PlatformBreakdown.jsx
 * Layer: Frontend / Components / Dashboard
 * Responsibility: Recharts PieChart visualization displaying solve distribution across verified platforms.
 */

import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const PLATFORM_COLORS = {
  codeforces: '#1890FF',
  atcoder: '#FF6B35',
  codewars: '#B1361E',
  manual_import: '#6366F1',
};

export default function PlatformBreakdown({ data = {} }) {
  const chartData = Object.entries(data).map(([platform, count]) => ({
    name: platform.charAt(0).toUpperCase() + platform.slice(1),
    value: count,
    color: PLATFORM_COLORS[platform] || '#8884d8',
  }));

  if (chartData.length === 0) {
    return (
      <div className="p-6 text-center text-sm text-gray-400">
        No platform activity recorded yet.
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
        Platform Solve Distribution
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

