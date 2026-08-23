import React from 'react';
import { cn } from '@/lib/utils';
import { Icon } from './Icon';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'terminal' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  glass?: boolean;
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
      glass = false,
      icon,
      iconRight,
      loading,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-display font-semibold tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer relative overflow-hidden active:scale-[0.98] will-change-transform';

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
      md: 'px-4 py-2 text-sm rounded-lg gap-2',
      lg: 'px-6 py-3 text-base rounded-xl gap-2.5 font-bold',
      icon: 'p-2 rounded-lg',
    };

    const variantStyles = {
      primary:
        'bg-cyan-400 text-[#00363d] hover:bg-cyan-300 font-bold shadow-[0_0_20px_rgba(0,218,243,0.35)] hover:shadow-[0_0_28px_rgba(0,218,243,0.55)] border border-cyan-300/60 btn-shimmer hover:-translate-y-px',
      secondary:
        'bg-[#ddb7ff] text-[#401869] hover:bg-[#ecd9ff] font-bold shadow-[0_0_20px_rgba(221,183,255,0.3)] hover:shadow-[0_0_28px_rgba(221,183,255,0.5)] border border-purple-300/60 btn-shimmer hover:-translate-y-px',
      outline:
        'bg-slate-900/60 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-500/10 hover:border-cyan-400 backdrop-blur-md hover:shadow-[0_0_15px_rgba(0,218,243,0.2)] hover:-translate-y-px',
      ghost:
        'bg-transparent text-slate-300 hover:text-white hover:bg-white/10 border border-transparent backdrop-blur-sm',
      danger:
        'bg-red-500 text-white hover:bg-red-600 shadow-[0_0_18px_rgba(255,84,73,0.4)] border border-red-400/50 hover:-translate-y-px',
      terminal:
        'bg-[#0b1326] text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 hover:bg-[#111a30] font-mono tracking-tight text-xs normal-case shadow-[inset_0_0_10px_rgba(0,218,243,0.05)] hover:-translate-y-px',
      glass:
        'bg-white/5 text-slate-100 hover:text-white hover:bg-white/10 border border-white/15 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:-translate-y-px',
    };

    const glassStyles = glass ? 'backdrop-blur-xl bg-white/10 border-white/25 hover:bg-white/15' : '';

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], glassStyles, className)}
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
  },
);

Button.displayName = 'Button';

export default Button;
