import { useState, useEffect } from 'react';

export function useCountUp(endVal, duration = 800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const end = typeof endVal === 'number' ? endVal : parseInt(endVal, 10) || 0;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    }

    requestAnimationFrame(step);
  }, [endVal, duration]);

  return count;
}
