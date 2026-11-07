/**
 * src/components/dashboard/SourceStatusBanner.jsx
 * Layer: Frontend / Components / Dashboard
 * Responsibility: Renders honest per-platform data source operational states
 *                 (connected, partial data, rate limited, source unavailable, reauthorization required)
 *                 and sync timestamps in accordance with Rule 9 of the Permanent API Integration Policy.
 */

import React from 'react';
import Badge from '../common/Badge';

export default function SourceStatusBanner({ sources = [] }) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
        Data Source Telemetry States
      </h3>
      <div className="flex flex-wrap gap-2">
        {sources.map((source) => (
          <div
            key={source.platform}
            className="flex items-center gap-2 px-3 py-1 bg-gray-50 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-300"
          >
            <span className="font-medium capitalize">{source.platform}:</span>
            <Badge
              variant={
                source.state === 'connected'
                  ? 'success'
                  : source.state === 'partial data'
                  ? 'warning'
                  : 'error'
              }
            >
              {source.state}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

