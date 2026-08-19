import React from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';

export interface DemoDataNoticeProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Persistent disclosure banner marking a screen as illustrative/demo data.
 * Required by the project's "do not fake real security results" rule.
 */
export const DemoDataNotice: React.FC<DemoDataNoticeProps> = ({ className, children }) => {
  return (
    <div
      className={cn(
        'flex items-start gap-2.5 p-3 rounded border border-amber-500/30 bg-amber-500/5 text-amber-200/90',
        className
      )}
    >
      <Icon name="science" size={18} className="text-amber-300 shrink-0 mt-0.5" />
      <p className="text-[11px] font-mono leading-relaxed">
        <span className="font-bold text-amber-300">DEMO DATA · </span>
        {children ??
          'Scores, projects, incidents and contract checks shown here are simulated for product demonstration only. They are not live security assessments, audits, or guarantees that any smart contract is secure. Connect real data sources via the services layer for production use.'}
      </p>
    </div>
  );
};

export default DemoDataNotice;
