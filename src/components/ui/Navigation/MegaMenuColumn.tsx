import React from 'react';
import { cn } from '@/lib/utils';

export interface MegaMenuColumnProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const MegaMenuColumn: React.FC<MegaMenuColumnProps> = ({ title, children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      {title && (
        <h4 className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2">
          {title}
        </h4>
      )}
      <div className="flex flex-col space-y-1">
        {children}
      </div>
    </div>
  );
};
