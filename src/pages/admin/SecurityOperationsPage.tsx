import React from 'react';
import { Badge } from '@/components/ui/Badge';
import LogStream from '@/components/security/LogStream';
import SecurityStats from '@/components/security/SecurityStats';

export const SecurityOperationsPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-16">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="critical" dot pulse>FORENSIC SECURITY AUDIT</Badge>
            <span className="text-xs font-mono text-slate-400">Administrative protocol surveillance</span>
          </div>
          <h1 className="font-display font-black text-3xl text-white">Security Operations Monitor</h1>
          <p className="text-sm text-slate-400 mt-2 max-w-2xl">
            Real-time surveillance of administrative protocols, neural lattice modifications, and access authorization events.
          </p>
        </div>
        <button className="px-4 py-2.5 rounded border border-primary/40 text-primary hover:bg-primary/10 text-xs font-mono font-bold">
          EXPORT AUDIT LOG
        </button>
      </header>
      <SecurityStats />
      <LogStream />
    </div>
  );
};
