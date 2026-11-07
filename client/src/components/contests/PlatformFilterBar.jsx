/**
 * src/components/contests/PlatformFilterBar.jsx
 * Layer: Frontend / Components / Contests
 * Responsibility: Filter chip bar allowing users to filter contest schedules by platform.
 */

import React from 'react';

const PLATFORMS = ['all', 'codeforces', 'atcoder', 'codewars'];

export default function PlatformFilterBar({ selectedPlatform, onSelectPlatform }) {
  return (
    <div className="flex flex-wrap gap-2">
      {PLATFORMS.map((platform) => (
        <button
          key={platform}
          onClick={() => onSelectPlatform(platform)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition ${
            selectedPlatform === platform
              ? 'bg-primary text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
          }`}
        >
          {platform}
        </button>
      ))}
    </div>
  );
}

