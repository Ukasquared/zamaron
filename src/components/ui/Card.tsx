import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'crystalline' | 'fresnel' | 'terminal';
  hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hoverEffect = false, children, ...props }, ref) => {
    const variantStyles = {
      default: 'bg-surface border border-outline/70 shadow-lg',
      glass:
        'bg-surface-container/70 backdrop-blur-md border border-outline/60 shadow-xl',
      crystalline: 'crystalline-stack shadow-2xl',
      fresnel:
        'bg-surface-container-high/80 border border-primary/30 fresnel-glow backdrop-blur-lg',
      terminal:
        'bg-[#060e20] border border-primary/20 font-mono shadow-[inset_0_0_20px_rgba(0,218,243,0.05)]',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-md p-5 text-slate-200 transition-all duration-200 relative overflow-hidden',
          variantStyles[variant],
          hoverEffect &&
            'hover:border-primary/50 hover:shadow-[0_0_20px_rgba(0,218,243,0.15)] hover:-translate-y-0.5',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={cn('flex items-center justify-between gap-3 mb-4', className)} {...props} />;

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => (
  <h3
    className={cn(
      'font-display font-bold text-lg text-white tracking-wide flex items-center gap-2',
      className
    )}
    {...props}
  />
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  ...props
}) => (
  <p className={cn('text-xs text-slate-400 font-sans mt-1', className)} {...props} />
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={cn('space-y-4', className)} {...props} />;

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn('flex items-center justify-between pt-4 mt-4 border-t border-outline/40', className)}
    {...props}
  />
);
