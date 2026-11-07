/**
 * src/components/common/Skeleton.jsx
 * Layer: Frontend / Components / Common
 * Responsibility: Reusable loading pulse placeholder skeleton to prevent Cumulative Layout Shift (CLS).
 */

import React from 'react';

export default function Skeleton({ className = '', ...props }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
      {...props}
    />
  );
}

