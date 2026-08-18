import React from 'react';
import { cn } from '@/lib/utils';
import { Icon } from './Icon';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  icon?: string;
  iconRight?: string;
  badgeRight?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, helperText, error, icon, iconRight, badgeRight, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <div className="flex items-center justify-between">
            <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider">
              {label}
            </label>
            {badgeRight && (
              <span className="text-[10px] font-mono text-primary/80 uppercase">{badgeRight}</span>
            )}
          </div>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3 text-slate-400 pointer-events-none flex items-center">
              <Icon name={icon} size={18} />
            </div>
          )}
          <input
            ref={ref}
            type={type}
            className={cn(
              'w-full bg-[#0b1326] border border-outline/80 rounded-sm px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 font-mono transition-all',
              'focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 focus:bg-[#0c162d]',
              icon && 'pl-9',
              (iconRight || badgeRight) && 'pr-9',
              error && 'border-error focus:border-error focus:ring-error/40',
              className
            )}
            {...props}
          />
          {iconRight && (
            <div className="absolute right-3 text-slate-400 flex items-center">
              <Icon name={iconRight} size={18} />
            </div>
          )}
        </div>
        {error ? (
          <p className="text-xs text-error font-mono">{error}</p>
        ) : helperText ? (
          <p className="text-[11px] text-slate-400 font-sans">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
