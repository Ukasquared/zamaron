import React, { useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { LiveLogStream } from '@/components/shared/LiveLogStream';
import { useAuth } from '@/context/AuthContext';
import { downloadTextFile } from '@/lib/download';
import { exportLogsCsv, getSecurityLogs } from '@/services/adminService';

export const SecurityLogsPage: React.FC = () => {
  const { user } = useAuth();
  const mockLogs = useMemo(() => {
    try {
      return getSecurityLogs(user);
    } catch {
      return [];
    }
  }, [user]);
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

        <Button
          size="md"
          icon="download"
          onClick={() => {
            try {
              downloadTextFile('zamaron-security-logs.csv', exportLogsCsv(user), 'text/csv;charset=utf-8');
            } catch {
              /* permission already enforced by route */
            }
          }}
        >
          Export Forensic CSV
        </Button>
      </div>

      {/* Live Stream Component */}
      <LiveLogStream logs={mockLogs} maxHeight="max-h-[600px]" />
    </div>
  );
};
