import React from 'react';
import { Icon } from '@/components/ui/Icon';
import { Badge } from '@/components/ui/Badge';
import type { AuditHistoryEntry } from '@/types';

export interface AuditHistoryListProps {
  audits: AuditHistoryEntry[];
}

/** Timeline-style list of a project's prior audits. */
export const AuditHistoryList: React.FC<AuditHistoryListProps> = ({ audits }) => {
  if (audits.length === 0) {
    return (
      <div className="flex items-center gap-3 p-4 rounded border border-outline/60 bg-[#060e20] text-slate-500 text-xs font-mono">
        <Icon name="history" size={18} className="text-slate-500" />
        No verified audits on record for this project.
      </div>
    );
  }

  return (
    <ol className="relative border-l border-outline/60 space-y-4 ml-2">
      {audits.map((audit) => (
        <li key={audit.id} className="ml-5">
          <span className="absolute -left-[7px] flex items-center justify-center w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-[#060e20]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00363d]" />
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-display font-bold text-white">{audit.auditor}</span>
            <Badge variant="outline" size="sm">{audit.date}</Badge>
            {audit.criticalFindings > 0 ? (
              <Badge variant="critical" size="sm">{audit.criticalFindings} Critical</Badge>
            ) : (
              <Badge variant="success" size="sm">0 Critical</Badge>
            )}
            {audit.highFindings > 0 && (
              <Badge variant="high" size="sm">{audit.highFindings} High</Badge>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">{audit.scope}</p>
        </li>
      ))}
    </ol>
  );
};

export default AuditHistoryList;
