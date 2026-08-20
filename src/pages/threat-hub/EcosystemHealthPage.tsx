import React, { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { StatCard } from '@/components/shared/StatCard';
import { LiveLogStream } from '@/components/shared/LiveLogStream';
import { mockLogs } from '@/mock/data';

interface NodeRow {
  id: string;
  name: string;
  region: string;
  latency: number;
  load: number;
  status: 'HEALTHY' | 'DEGRADED' | 'HOT';
}

const BASE_NODES: NodeRow[] = [
  { id: 'n1', name: 'ALPHA-01', region: 'IAD', latency: 12, load: 24, status: 'HEALTHY' },
  { id: 'n2', name: 'BETA-04', region: 'FRA', latency: 28, load: 61, status: 'DEGRADED' },
  { id: 'n3', name: 'GAMMA-12', region: 'SIN', latency: 41, load: 18, status: 'HEALTHY' },
  { id: 'n4', name: 'DELTA-07', region: 'SYD', latency: 55, load: 82, status: 'HOT' },
  { id: 'n5', name: 'EPSILON-02', region: 'GRU', latency: 33, load: 44, status: 'HEALTHY' },
];

export const EcosystemHealthPage: React.FC = () => {
  const [seed, setSeed] = useState(0);
  const [filter, setFilter] = useState<'ALL' | NodeRow['status']>('ALL');
  const [updatedAt, setUpdatedAt] = useState(() => new Date().toLocaleTimeString());

  const nodes = useMemo(
    () =>
      BASE_NODES.map((node, index) => {
        const jitter = ((seed + index * 7) % 9) - 4;
        const latency = Math.max(6, node.latency + jitter);
        const load = Math.min(99, Math.max(8, node.load + jitter * 2));
        const status: NodeRow['status'] = load > 80 ? 'HOT' : load > 55 ? 'DEGRADED' : 'HEALTHY';
        return { ...node, latency, load, status };
      }),
    [seed]
  );

  const visible = nodes.filter((node) => filter === 'ALL' || node.status === filter);
  const avgLatency = Math.round(nodes.reduce((sum, node) => sum + node.latency, 0) / nodes.length);
  const hot = nodes.filter((node) => node.status === 'HOT').length;

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container/70 border border-outline/70 p-6 rounded-md">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" dot pulse>
              ECOSYSTEM VITALITY
            </Badge>
            <span className="text-xs font-mono text-slate-400">Refreshed {updatedAt}</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">Ecosystem Health Monitor</h1>
        </div>
        <Button
          size="sm"
          icon="refresh"
          onClick={() => {
            setSeed((n) => n + 1);
            setUpdatedAt(new Date().toLocaleTimeString());
          }}
        >
          Refresh Telemetry
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Tracked Nodes" value={nodes.length} icon="hub" variant="fresnel" />
        <StatCard label="Avg Latency" value={`${avgLatency}ms`} icon="speed" variant="glass" />
        <StatCard label="Hot Nodes" value={hot} deltaType={hot > 0 ? 'negative' : 'positive'} icon="local_fire_department" variant="glass" />
        <StatCard label="Uptime Window" value="99.998%" icon="cloud_done" variant="glass" />
      </div>

      <div className="flex gap-1">
        {(['ALL', 'HEALTHY', 'DEGRADED', 'HOT'] as const).map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-3 py-1.5 rounded text-xs font-mono cursor-pointer ${
              filter === item ? 'bg-primary text-[#00363d] font-bold' : 'bg-surface-variant text-slate-400'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <Card variant="glass" className="p-6 space-y-4">
        <CardHeader className="mb-1">
          <CardTitle>Node Latency & Load</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto cyber-scrollbar">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-outline/70 text-slate-400 uppercase text-[10px]">
                <th className="pb-3">Node</th>
                <th className="pb-3">Region</th>
                <th className="pb-3">Latency</th>
                <th className="pb-3">Load</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/40">
              {visible.map((node) => (
                <tr key={node.id}>
                  <td className="py-3 font-bold text-white">{node.name}</td>
                  <td className="py-3 text-slate-400">{node.region}</td>
                  <td className="py-3 text-primary">{node.latency}ms</td>
                  <td className="py-3">
                    <div className="w-28 h-1.5 bg-surface-variant rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${node.load}%` }} />
                    </div>
                    <span className="text-[10px] text-slate-500">{node.load}%</span>
                  </td>
                  <td className="py-3">
                    <Badge variant={node.status === 'HEALTHY' ? 'success' : node.status === 'HOT' ? 'critical' : 'warning'} size="sm">
                      {node.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <LiveLogStream logs={mockLogs} maxHeight="max-h-72" />
    </div>
  );
};

export default EcosystemHealthPage;
