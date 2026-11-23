import { useEffect } from 'react';

export function useHotkeys(keyCombo, callback) {
  useEffect(() => {
    function handleKeyDown(e) {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;

      if (keyCombo === 'cmd+k' && isCmdOrCtrl && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        callback();
      }

      if (keyCombo === '/' && e.key === '/' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault();
        callback();
      }

      if (keyCombo === 'escape' && e.key === 'Escape') {
        callback();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keyCombo, callback]);
}
