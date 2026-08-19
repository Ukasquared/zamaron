import React from 'react';
import { Badge } from '@/components/ui/Badge';
import ActivityStream from '@/components/admin/ActivityStream';
import AdminStats from '@/components/admin/AdminStats';
import MasterRegistry from '@/components/admin/MasterRegistry';
import RiskHeatmap from '@/components/admin/RiskHeatmap';

export const AdminOverviewPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-16">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="primary" dot pulse>ADMIN OPERATIONS</Badge>
            <span className="text-xs font-mono text-slate-400">User & Protocol Management</span>
          </div>
          <h1 className="font-display font-black text-3xl text-white">Operations Overview</h1>
          <p className="text-sm text-slate-400 mt-2 max-w-2xl">
            Monitor operatives, verified protocol clusters, risk tiers, and live security activity from one administrative console.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2.5 rounded border border-error text-error bg-error/5 hover:bg-error/10 transition-colors text-xs font-mono font-bold">
            NEW SECURITY ALERT
          </button>
          <button className="px-4 py-2.5 rounded border border-primary text-primary bg-primary/5 hover:bg-primary/10 transition-colors text-xs font-mono font-bold">
            REGISTER OPERATIVE
          </button>
        </div>
      </header>

      <AdminStats />
      <MasterRegistry />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RiskHeatmap />
        <ActivityStream />
      </div>
    </div>
  );
};
