import React from 'react';
import { motion } from 'framer-motion';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  leftIcon,
  rightIcon,
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none';

  const variants = {
    primary: 'bg-ink text-white hover:bg-black shadow-sm active:bg-ink',
    secondary: 'bg-white text-ink border border-app-border hover:bg-app-hover hover:border-app-border-strong shadow-card',
    accent: 'bg-accent text-white hover:bg-accent-hover shadow-sm',
    ghost: 'text-ink-secondary hover:text-ink hover:bg-app-hover',
    danger: 'bg-verdict-wa text-white hover:bg-red-700 shadow-sm',
    subtle: 'bg-accent-subtle text-accent hover:bg-blue-100',
  };

  const sizes = {
    sm: 'text-xs h-7 px-2.5 gap-1.5',
    md: 'text-xs h-9 px-3.5 gap-2',
    lg: 'text-sm h-11 px-5 gap-2.5 font-semibold',
  };

  return (
    <motion.button
      type={type}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      whileHover={{ y: disabled || loading ? 0 : -1 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </motion.button>
  );
}
