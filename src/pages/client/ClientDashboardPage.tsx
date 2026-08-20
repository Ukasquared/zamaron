import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, SeverityBadge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { StatCard } from '@/components/shared/StatCard';
import { useAuth } from '@/context/AuthContext';
import { getAuditFindings, listClientAudits } from '@/services/auditService';

export const ClientDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const mockAuditRequests = useMemo(() => {
    try {
      return listClientAudits(user);
    } catch {
      return [];
    }
  }, [user]);
  const mockFindings = useMemo(() => {
    try {
      return getAuditFindings(user);
    } catch {
      return [];
    }
  }, [user]);
  return (
    <div className="space-y-8">
      {/* Top Banner with Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container/70 border border-outline/70 p-6 rounded-md backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
              Client Security Console
            </h1>
            <Badge variant="primary" size="sm">
              LIVE POSTURE
            </Badge>
          </div>
          <p className="text-xs text-slate-400 font-sans">
            Continuous smart contract verification, vulnerability triage, and cryptographic vaults.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/client/audits/new">
            <Button size="md" icon="add_circle">
              Request New Audit
            </Button>
          </Link>
          <Link to="/client/vault">
            <Button variant="outline" size="md" icon="lock">
              Document Vault
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Active Audit Engagements"
          value="2 In Progress"
          delta="1 Queued"
          icon="timelapse"
          iconColor="text-primary"
          variant="fresnel"
        />
        <StatCard
          label="Total Value Under Coverage"
          value="$284.5M"
          delta="+18.4% vs Q2"
          icon="shield"
          iconColor="text-emerald-400"
          variant="glass"
        />
        <StatCard
          label="Critical Exploits Detected"
          value="1 Open"
          delta="Immediate Remediation"
          deltaType="negative"
          icon="bug_report"
          iconColor="text-error"
          variant="glass"
        />
        <StatCard
          label="Overall Protocol Resilience"
          value="94 / 100"
          delta="Tier-1 Hardened"
          icon="radar"
          iconColor="text-cyan-400"
          variant="glass"
        />
      </div>

      {/* Main Grid: Active Audits Table + Vulnerabilities Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Audits Table (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <Card variant="glass" className="p-6 space-y-4">
            <CardHeader className="mb-2">
              <div>
                <CardTitle>Active Audit Engagements</CardTitle>
                <p className="text-xs text-slate-400">Real-time status and phase progress across your smart contracts.</p>
              </div>
              <Link to="/client/audits/new" className="text-xs text-primary font-mono hover:underline flex items-center gap-1">
                + New Submission
              </Link>
            </CardHeader>

            <div className="overflow-x-auto cyber-scrollbar">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-outline/70 text-slate-400 uppercase text-[10px]">
                    <th className="pb-3 pr-4">Protocol / Ref ID</th>
                    <th className="pb-3 px-3">Status</th>
                    <th className="pb-3 px-3">Phase Progress</th>
                    <th className="pb-3 px-3">Findings</th>
                    <th className="pb-3 pl-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline/40">
                  {mockAuditRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 pr-4">
                        <div className="font-bold text-white font-display text-sm">{req.projectName}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <span className="text-primary">{req.id}</span> • {req.protocolType}
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <Badge
                          variant={
                            req.status === 'VERIFIED'
                              ? 'success'
                              : req.status === 'IN_REVIEW'
                              ? 'primary'
                              : req.status === 'SCANNING'
                              ? 'secondary'
                              : 'warning'
                          }
                          size="sm"
                          dot
                        >
                          {req.status}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="w-28 space-y-1">
                          <div className="flex justify-between text-[10px] text-slate-400">
                            <span>Progress</span>
                            <span className="text-white font-bold">{req.progressPercent}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-surface-variant rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ width: `${req.progressPercent}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-1 text-[11px]">
                          {req.findingsCount.critical > 0 && (
                            <span className="text-error font-bold">{req.findingsCount.critical} Crit</span>
                          )}
                          {req.findingsCount.high > 0 && (
                            <span className="text-orange-400 font-semibold">• {req.findingsCount.high} High</span>
                          )}
                          {req.findingsCount.medium > 0 && (
                            <span className="text-amber-300">• {req.findingsCount.medium} Med</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 pl-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link to={`/client/audits/${req.id}/status`}>
                            <Button variant="outline" size="sm" icon="visibility">
                              Track
                            </Button>
                          </Link>
                          <Link to={`/client/audits/${req.id}/review`}>
                            <Button variant="terminal" size="sm" icon="code">
                              Code
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Priority Vulnerability Feed (1 col) */}
        <div className="space-y-6">
          <Card variant="fresnel" className="p-6 space-y-4">
            <CardHeader className="mb-2">
              <div className="flex items-center gap-2">
                <Icon name="warning" size={20} className="text-error" />
                <CardTitle>Vulnerability Triage Feed</CardTitle>
              </div>
              <Link to="/client/audits/ZM-8492-NX/triage" className="text-xs text-primary font-mono hover:underline">
                View All
              </Link>
            </CardHeader>

            <div className="space-y-3">
              {mockFindings.map((finding) => (
                <Link
                  key={finding.id}
                  to="/client/audits/ZM-8492-NX/triage"
                  className="block p-3 bg-[#060e20] border border-outline/70 rounded hover:border-primary/50 transition-all group"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <SeverityBadge severity={finding.severity} size="sm" />
                    <span className="text-[10px] font-mono text-slate-400">{finding.category}</span>
                  </div>
                  <h4 className="font-display font-semibold text-xs text-white group-hover:text-primary transition-colors leading-tight">
                    {finding.title}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mt-2 pt-1 border-t border-outline/30">
                    <span>{finding.location}</span>
                    <span className="text-primary font-bold">{finding.lineRange}</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-outline/50 text-center">
              <Link to="/client/audits/ZM-8492-NX/report">
                <Button variant="outline" size="sm" className="w-full" icon="description">
                  Generate Cryptographic Final Report
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
