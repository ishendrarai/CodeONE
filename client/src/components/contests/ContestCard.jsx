/**
 * src/components/contests/ContestCard.jsx
 * Layer: Frontend / Components / Contests
 * Responsibility: Renders a single contest entry card with live countdown, timezone-formatted date,
 *                 duration, platform badge, and external registration link.
 */

import React from 'react';
import ContestCountdown from './ContestCountdown';
import Badge from '../common/Badge';

export default function ContestCard({ contest }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col justify-between hover:shadow-md transition">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <Badge variant="info">{contest.platform}</Badge>
          <ContestCountdown targetTime={contest.startTime} />
        </div>
        <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">
          {contest.name}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Starts: {new Date(contest.startTime).toLocaleString()}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Duration: {Math.round(contest.durationSeconds / 3600)} hours
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-end">
        {contest.url && (
          <a
            href={contest.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-primary hover:underline"
          >
            Register on Platform &rarr;
          </a>
        )}
      </div>
    </div>
  );
}

