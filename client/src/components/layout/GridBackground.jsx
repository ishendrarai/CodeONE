import React from 'react';
import { motion } from 'framer-motion';

export default function GridBackground({ showHeroCells = false, className = '' }) {
  return (
    <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}>
      {/* 36px checked graph paper grid */}
      <div className="absolute inset-0 grid-pattern mask-radial opacity-75" />

      {/* Pulsing highlight cells for hero section */}
      {showHeroCells && (
        <div className="absolute inset-0 max-w-6xl mx-auto">
          {/* Cell 1 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.45, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5, ease: 'easeInOut' }}
            className="absolute top-[180px] left-[144px] w-[36px] h-[36px] bg-accent/20 border border-accent/40 rounded-[2px]"
          />
          {/* Cell 2 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1.8, ease: 'easeInOut' }}
            className="absolute top-[252px] right-[216px] w-[36px] h-[36px] bg-accent/25 border border-accent/50 rounded-[2px]"
          />
          {/* Cell 3 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.35, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, delay: 2.7, ease: 'easeInOut' }}
            className="absolute top-[324px] left-[360px] w-[36px] h-[36px] bg-accent/15 border border-accent/30 rounded-[2px]"
          />
        </div>
      )}
    </div>
  );
}
