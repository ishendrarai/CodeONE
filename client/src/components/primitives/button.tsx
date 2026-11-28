import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

const variants = {
  default: 'bg-ink text-white hover:bg-black',
  destructive: 'bg-verdict-wa text-white hover:bg-red-700',
  outline: 'border border-app-border bg-white hover:bg-app-hover',
  secondary: 'bg-app-hover text-ink hover:bg-app-border',
  ghost: 'text-ink-secondary hover:bg-app-hover hover:text-ink',
  link: 'text-accent underline-offset-4 hover:underline',
};

const sizes = {
  default: 'h-9 px-4 py-2',
  sm: 'h-8 rounded-md px-3',
  lg: 'h-10 rounded-md px-6',
  icon: 'h-9 w-9',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  ),
);
Button.displayName = 'Button';

export { Button };
