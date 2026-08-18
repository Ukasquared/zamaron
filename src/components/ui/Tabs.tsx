import React from 'react';
import { cn } from '@/lib/utils';
import { Icon } from './Icon';

export interface TabItem {
  id: string;
  label: string;
  icon?: string;
  badge?: string | number;
}

export interface TabsProps {
  items: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  variant?: 'pills' | 'underline' | 'terminal';
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeTab,
  onChange,
  className,
  variant = 'pills',
}) => {
  return (
    <div
      className={cn(
        'flex items-center gap-1 overflow-x-auto no-scrollbar select-none',
        variant === 'pills' && 'bg-[#060e20] p-1 rounded-sm border border-outline/50',
        variant === 'underline' && 'border-b border-outline/60 gap-4',
        variant === 'terminal' && 'bg-[#0b1326] border-b border-primary/20 gap-0',
        className
      )}
    >
      {items.map((tab) => {
        const isActive = activeTab === tab.id;

        if (variant === 'pills') {
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={cn(
                'flex items-center gap-2 px-3.5 py-1.5 rounded-sm text-xs font-mono font-medium transition-all whitespace-nowrap cursor-pointer',
                isActive
                  ? 'bg-primary text-[#00363d] font-bold shadow-[0_0_12px_rgba(0,218,243,0.3)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-surface-variant/40'
              )}
            >
              {tab.icon && <Icon name={tab.icon} size={16} />}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={cn(
                    'text-[10px] px-1.5 py-0.2 rounded font-bold',
                    isActive ? 'bg-[#00363d]/30 text-white' : 'bg-surface-variant text-slate-300'
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        }

        if (variant === 'underline') {
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={cn(
                'flex items-center gap-2 pb-2.5 text-xs font-mono font-medium border-b-2 transition-all whitespace-nowrap cursor-pointer',
                isActive
                  ? 'border-primary text-primary font-bold shadow-[0_4px_12px_rgba(0,218,243,0.2)]'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              )}
            >
              {tab.icon && <Icon name={tab.icon} size={16} />}
              <span>{tab.label}</span>
            </button>
          );
        }

        // Terminal style
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 text-xs font-mono border-r border-outline/40 transition-all cursor-pointer',
              isActive
                ? 'bg-surface text-primary border-t-2 border-t-primary font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-surface-variant/20'
            )}
          >
            {tab.icon && <Icon name={tab.icon} size={16} />}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
