import React from 'react';
import { cn } from '@/lib/utils';
import { Icon } from './Icon';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  icon?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, helperText, error, icon, children, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3 text-slate-400 pointer-events-none flex items-center">
              <Icon name={icon} size={18} />
            </div>
          )}
          <select
            ref={ref}
            className={cn(
              'w-full bg-[#0b1326] border border-outline/80 rounded-sm px-3 py-2 text-sm text-slate-100 font-mono transition-all appearance-none cursor-pointer',
              'focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 focus:bg-[#0c162d]',
              icon && 'pl-9',
              'pr-9',
              error && 'border-error',
              className
            )}
            {...props}
          >
            {children}
          </select>
          <div className="absolute right-3 text-slate-400 pointer-events-none flex items-center">
            <Icon name="expand_more" size={18} />
          </div>
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

Select.displayName = 'Select';
