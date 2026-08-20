import React, { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { LiveLogStream } from '@/components/shared/LiveLogStream';
import { useAuth } from '@/context/AuthContext';
import { downloadTextFile } from '@/lib/download';
import { exportLogsCsv, getSecurityLogs } from '@/services/adminService';
import type { SecurityLogEntry } from '@/types';

export const SecurityLogsTacticalPage: React.FC = () => {
  const { user } = useAuth();
  const [actor, setActor] = useState('');
  const [source, setSource] = useState('ALL');
  const [status, setStatus] = useState('ALL');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [error, setError] = useState<string | null>(null);

  const logs = useMemo(() => {
    try {
      return getSecurityLogs(user);
    } catch {
      return [] as SecurityLogEntry[];
    }
  }, [user]);

  const sources = Array.from(new Set(logs.map((log) => log.eventSource)));

  const filtered = logs.filter((log) => {
    const actorOk = !actor || `${log.actor} ${log.action} ${log.ipAddress}`.toLowerCase().includes(actor.toLowerCase());
    const sourceOk = source === 'ALL' || log.eventSource === source;
    const statusOk = status === 'ALL' || log.status === status;
    const date = log.timestamp.slice(0, 10);
    const fromOk = !from || date >= from;
    const toOk = !to || date <= to;
    return actorOk && sourceOk && statusOk && fromOk && toOk;
  });

  const exportFiltered = () => {
    try {
      if (actor || source !== 'ALL' || status !== 'ALL' || from || to) {
        const csv = [
          'id,timestamp,severity,eventSource,actor,action,ipAddress,status,hash',
          ...filtered.map((log) =>
            [log.id, log.timestamp, log.severity, log.eventSource, log.actor, log.action, log.ipAddress, log.status, log.hash]
              .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
              .join(',')
          ),
        ].join('\n');
        downloadTextFile('zamaron-logs-filtered.csv', csv, 'text/csv;charset=utf-8');
        return;
      }
      downloadTextFile('zamaron-security-logs.csv', exportLogsCsv(user), 'text/csv;charset=utf-8');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export denied.');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container/70 border border-outline/70 p-6 rounded-md">
        <div>
          <Badge variant="critical">TACTICAL FILTERS</Badge>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">Security Logs — Faceted Search</h1>
        </div>
        <Button size="sm" icon="download" onClick={exportFiltered}>
          Export CSV
        </Button>
      </div>
      {error && <div className="text-xs font-mono text-error bg-error/10 border border-error/40 rounded px-3 py-2">{error}</div>}

      <Card variant="glass" className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        <Input label="Actor / action / IP" value={actor} onChange={(e) => setActor(e.target.value)} icon="search" />
        <Select label="Event source" value={source} onChange={(e) => setSource(e.target.value)}>
          <option value="ALL">All sources</option>
          {sources.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
        <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="ALL">All</option>
          <option value="BLOCKED">BLOCKED</option>
          <option value="ALLOWED">ALLOWED</option>
          <option value="FLAGGED">FLAGGED</option>
          <option value="RESOLVED">RESOLVED</option>
        </Select>
        <Input label="From" type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
        <Input label="To" type="date" value={to} onChange={(e) => setTo(e.target.value)} />
      </Card>

      <div className="text-xs font-mono text-slate-400">{filtered.length} events</div>
      <LiveLogStream logs={filtered} maxHeight="max-h-[560px]" />
    </div>
  );
};

export default SecurityLogsTacticalPage;
