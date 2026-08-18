import React from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { LiveLogStream } from '@/components/shared/LiveLogStream';
import { mockLogs } from '@/mock/data';

export const SecurityLogsPage: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container/70 border border-outline/70 p-6 rounded-md">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="critical">ADMIN SURVEILLANCE</Badge>
            <span className="text-xs font-mono text-slate-400">Security Clearance: ALPHA SUPER_ADMIN</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
            Security Logs & Audit Trail
          </h1>
        </div>

        <Button size="md" icon="download">
          Export Forensic CSV
        </Button>
      </div>

      {/* Live Stream Component */}
      <LiveLogStream logs={mockLogs} maxHeight="max-h-[600px]" />
    </div>
  );
};
