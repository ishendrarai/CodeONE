import React, { forwardRef } from 'react';

const Input = forwardRef(function Input(
  { className = '', error, leftIcon, rightIcon, ...props },
  ref
) {
  return (
    <div className="relative w-full">
      {leftIcon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none">
          {leftIcon}
        </span>
      )}
      <input
        ref={ref}
        className={`w-full h-9 rounded-lg border bg-white px-3 text-xs text-ink placeholder:text-ink-muted transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:bg-app-bg disabled:text-ink-muted ${
          leftIcon ? 'pl-8' : ''
        } ${rightIcon ? 'pr-8' : ''} ${
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-app-border'
        } ${className}`}
        {...props}
      />
      {rightIcon && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted">
          {rightIcon}
        </span>
      )}
      {error && <p className="mt-1 text-[11px] text-red-600">{error}</p>}
    </div>
  );
});

export default Input;
