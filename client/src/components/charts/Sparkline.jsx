import React from 'react';

export default function Sparkline({ points = [4, 7, 2, 9, 6, 11, 8], color = '#0052FF', height = 24, width = 72 }) {
  const max = Math.max(...points, 1);
  const min = Math.min(...points, 0);
  const range = max - min || 1;

  const stepX = width / (points.length - 1);
  const pathData = points
    .map((val, idx) => {
      const x = idx * stepX;
      const y = height - ((val - min) / range) * (height - 4) - 2;
      return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible inline-block">
      <path
        d={pathData}
        fill="none"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
