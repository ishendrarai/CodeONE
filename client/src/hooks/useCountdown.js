import { useState, useEffect } from 'react';
import { formatCountdown } from '../lib/format';

export function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(() => formatCountdown(targetDate));

  useEffect(() => {
    if (!targetDate) return;

    const timer = setInterval(() => {
      setTimeLeft(formatCountdown(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}
