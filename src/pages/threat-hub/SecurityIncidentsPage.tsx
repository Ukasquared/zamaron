import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { StatCard } from '@/components/shared/StatCard';
import { IncidentFeed } from '@/components/security/IncidentFeed';
import { DemoDataNotice } from '@/components/security/DemoDataNotice';
import { useIncidents } from '@/hooks/useIncidents';
import { formatUsdShort, type IncidentFilter } from '@/services/incidentService';

const FILTERS: { id: IncidentFilter; label: string }[] = [
  { id: 'ALL', label: 'All' },
  { id: 'CRITICAL', label: 'Critical' },
  { id: 'HIGH', label: 'High' },
  { id: 'MEDIUM', label: 'Medium' },
  { id: 'LOW', label: 'Low' },
];

export const SecurityIncidentsPage: React.FC = () => {
  const { filtered, stats, severity, setSeverity, query, setQuery } = useIncidents();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container/70 border border-outline/70 p-6 rounded-md">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="critical" dot pulse>
              INCIDENT MONITOR
            </Badge>
            <span className="text-xs font-mono text-slate-400">
              Real-time exploit, rugpull and breach alerts
            </span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
            Security Incident Feed
          </h1>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Track on-chain exploits, bridge hacks, oracle manipulation, phishing and rugpulls across
            supported chains.
          </p>
        </div>
        <Button variant="outline" size="sm" icon="notifications_active">
          Subscribe Alerts
        </Button>
      </div>

      <DemoDataNotice>
        This incident feed is simulated with fabricated events for demonstration. It is not a live
        threat-intelligence source and does not report real-world breaches.
      </DemoDataNotice>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Incidents (30d)"
          value={stats.total}
          delta={`${stats.last24h} in last 24h`}
          icon="crisis_alert"
          variant="fresnel"
          iconColor="text-error"
        />
        <StatCard
          label="Critical"
          value={stats.critical}
          delta="Immediate response"
          deltaType="negative"
          icon="gpp_bad"
          iconColor="text-error"
          variant="glass"
        />
        <StatCard
          label="Ongoing"
          value={stats.ongoing}
          delta="Unresolved"
          deltaType={stats.ongoing > 0 ? 'negative' : 'positive'}
          icon="radio_button_checked"
          iconColor={stats.ongoing > 0 ? 'text-error' : 'text-emerald-400'}
          variant="glass"
        />
        <StatCard
          label="Funds Lost"
          value={formatUsdShort(stats.totalFundsLost)}
          delta="Cumulative (demo)"
          deltaType="negative"
          icon="payments"
          iconColor="text-orange-400"
          variant="glass"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main feed */}
        <div className="lg:col-span-3 space-y-4">
          <Card variant="glass" className="p-5 space-y-4">
            <CardHeader className="mb-1">
              <CardTitle>Filter Incidents</CardTitle>
              <span className="text-xs font-mono text-slate-500">{filtered.length} results</span>
            </CardHeader>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  placeholder="Search project, type, chain..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  icon="search"
                />
              </div>
              <div className="flex flex-wrap gap-1 bg-[#060e20] p-1 rounded-sm border border-outline/50">
                {FILTERS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSeverity(f.id)}
                    className={`px-3 py-1.5 rounded-sm text-xs font-mono font-medium transition-colors cursor-pointer ${
                      severity === f.id
                        ? 'bg-primary text-[#00363d] font-bold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-surface-variant/40'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          <IncidentFeed incidents={filtered} />
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card variant="terminal" className="p-5 space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <Icon name="tune" size={18} />
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider">Alert Routing</h4>
            </div>
            <p className="text-[11px] font-mono text-slate-400 leading-relaxed">
              Route critical incidents to your team via webhook, Telegram or email. Thresholds are
              configurable per project and severity.
            </p>
            <Button variant="outline" size="sm" icon="cell_tower" className="w-full">
              Configure Routing
            </Button>
          </Card>

          <Card variant="fresnel" className="p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <Icon name="shield" size={18} />
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider">Coverage</h4>
            </div>
            <ul className="space-y-2 text-[11px] font-mono text-slate-400">
              {['Ethereum', 'BNB Chain', 'Arbitrum', 'Polygon', 'Solana', 'Base'].map((c) => (
                <li key={c} className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {c}
                  </span>
                  <span className="text-emerald-400">MONITORED</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SecurityIncidentsPage;
