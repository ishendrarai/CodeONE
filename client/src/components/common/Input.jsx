import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) { return twMerge(clsx(inputs)); }

const Input = forwardRef(function Input(
  { label, error, hint, leftIcon, rightIcon, className, id, ...props },
  ref
) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-xs font-medium text-text-primary">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-2.5 text-text-muted pointer-events-none">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full h-8 rounded-md border bg-surface text-sm text-text-primary placeholder:text-text-muted',
            'transition-colors duration-150',
            'focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent',
            error
              ? 'border-status-hard focus:ring-status-hard'
              : 'border-border hover:border-border-strong',
            leftIcon ? 'pl-8' : 'pl-3',
            rightIcon ? 'pr-8' : 'pr-3',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-2.5 text-text-muted">
            {rightIcon}
          </span>
        )}
      </div>
      {error && <p className="text-xs text-status-hard">{error}</p>}
      {!error && hint && <p className="text-xs text-text-muted">{hint}</p>}
    </div>
  );
});

export default Input;
