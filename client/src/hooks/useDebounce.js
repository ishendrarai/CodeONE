/**
 * src/hooks/useDebounce.js
 * Layer: Frontend / Custom Hooks
 * Responsibility: Debounces fast user input (e.g. search bars) before triggering network queries.
 * Interaction: Used in ProblemFilter and search inputs.
 */

import { useState, useEffect } from 'react';

export default function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
