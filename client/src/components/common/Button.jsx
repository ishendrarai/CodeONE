import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const variants = {
  primary: 'bg-accent text-white hover:bg-accent-hover active:bg-accent-hover focus-visible:ring-accent',
  secondary: 'bg-transparent border border-border text-text-primary hover:bg-surface-overlay active:bg-surface-overlay',
  ghost: 'bg-transparent text-text-secondary hover:bg-surface-overlay hover:text-text-primary',
  destructive: 'bg-status-hard text-white hover:bg-red-700 active:bg-red-800',
  accent_light: 'bg-accent-light text-accent hover:bg-indigo-100 active:bg-indigo-200',
};

const sizes = {
  xs: 'h-6 px-2 text-xs rounded',
  sm: 'h-7 px-3 text-sm rounded',
  md: 'h-8 px-4 text-sm rounded-md',
  lg: 'h-10 px-5 text-base rounded-md',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  disabled,
  loading,
  leftIcon,
  rightIcon,
  ...props
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-1.5 font-medium transition-colors duration-150 cursor-pointer select-none',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-3.5 w-3.5 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12" cy="12" r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {!loading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
}
