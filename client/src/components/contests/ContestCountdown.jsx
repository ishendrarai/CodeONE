/**
 * src/components/contests/ContestCountdown.jsx
 * Layer: Frontend / Components / Contests
 * Responsibility: Live real-time 1-second countdown timer computing remaining time until contest start.
 * Cleanup Invariant: Clears setInterval on unmount to prevent React 18 memory leaks.
 */

import React, { useState, useEffect } from 'react';

export default function ContestCountdown({ targetTime }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    function calculateRemaining() {
      const diff = new Date(targetTime).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft('Live Now');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${days > 0 ? `${days}d ` : ''}${hours}h ${minutes}m ${seconds}s`);
    }

    calculateRemaining();
    const interval = setInterval(calculateRemaining, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  return <span className="font-mono font-semibold text-primary">{timeLeft}</span>;
}

