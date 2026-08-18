import React from 'react';
import { cn } from '@/lib/utils';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
}) => {
  return (
    <label
      className={cn(
        'inline-flex items-center gap-3 cursor-pointer select-none',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          'w-11 h-6 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-primary/40 p-0.5 border border-outline',
          checked ? 'bg-primary border-primary' : 'bg-surface-variant'
        )}
      >
        <span
          className={cn(
            'block w-4 h-4 rounded-full transition-transform transform shadow-md',
            checked ? 'translate-x-5 bg-[#00363d]' : 'translate-x-0.5 bg-slate-400'
          )}
        />
      </button>
      {(label || description) && (
        <div className="flex flex-col">
          {label && <span className="text-xs font-mono font-medium text-slate-200">{label}</span>}
          {description && <span className="text-[11px] text-slate-400">{description}</span>}
        </div>
      )}
    </label>
  );
};
