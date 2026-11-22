import React from 'react';

export default function Card({ children, className = '', hover = true, ...props }) {
  const hoverClass = hover ? 'hover:border-app-border-strong hover:shadow-card-hover' : '';
  return (
    <div
      className={`bg-white border border-app-border rounded-card shadow-card transition-all duration-150 ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
