import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

const variants = {
  default: 'border-app-border bg-white text-ink',
  destructive: 'border-red-200 bg-red-50 text-red-900',
};

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof variants;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn('relative w-full rounded-lg border p-4 text-sm', variants[variant], className)}
      {...props}
    />
  ),
);
Alert.displayName = 'Alert';

const AlertTitle = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h5 className={cn('mb-1 font-medium leading-none tracking-tight', className)} {...props} />
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-sm opacity-90', className)} {...props} />
);
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
