import React from 'react';
import { motion } from 'framer-motion';

export default function Tabs({ tabs, activeTab, onChange, className = '' }) {
  return (
    <div className={`flex items-center gap-1 border-b border-app-border ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative pb-2.5 px-3 text-xs font-medium transition-colors select-none ${
              isActive ? 'text-ink' : 'text-ink-secondary hover:text-ink'
            }`}
          >
            <span className="flex items-center gap-1.5">
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-ink text-white' : 'bg-app-hover text-ink-muted'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </span>
            {isActive && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-ink"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
