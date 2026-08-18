import React from 'react';
import { cn } from '@/lib/utils';
import { Icon } from './Icon';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'terminal';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  icon?: string;
  iconRight?: string;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      icon,
      iconRight,
      loading,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-display font-medium uppercase tracking-wider transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer';

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-xs rounded-sm gap-1.5',
      md: 'px-4 py-2 text-sm rounded-sm gap-2',
      lg: 'px-6 py-3 text-base rounded gap-2.5 font-semibold',
      icon: 'p-2 rounded-sm',
    };

    const variantStyles = {
      primary:
        'bg-primary text-[#00363d] hover:bg-[#00f0ff] font-bold shadow-[0_0_15px_rgba(0,218,243,0.35)] hover:shadow-[0_0_25px_rgba(0,218,243,0.55)] border border-primary/40',
      secondary:
        'bg-[#ddb7ff] text-[#401869] hover:bg-[#ebd3ff] font-bold shadow-[0_0_15px_rgba(221,183,255,0.3)] hover:shadow-[0_0_25px_rgba(221,183,255,0.5)] border border-secondary/40',
      outline:
        'bg-surface-container/60 text-primary border border-primary/40 hover:bg-primary/10 hover:border-primary backdrop-blur-sm',
      ghost:
        'bg-transparent text-slate-300 hover:text-white hover:bg-white/5 border border-transparent',
      danger:
        'bg-error text-white hover:bg-red-600 shadow-[0_0_15px_rgba(255,84,73,0.4)] border border-error/50',
      terminal:
        'bg-[#0b1326] text-primary border border-primary/30 hover:border-primary hover:bg-[#111a30] font-mono tracking-tight text-xs normal-case',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {loading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" />
        ) : (
          icon && <Icon name={icon} size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18} />
        )}
        {children}
        {iconRight && !loading && (
          <Icon name={iconRight} size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18} />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
