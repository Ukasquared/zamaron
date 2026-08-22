import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { GlassCard, GlassCardHeader, GlassCardTitle } from '@/components/ui/GlassCard';
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
      <GlassCard
        variant="elevated"
        blur="xl"
        className="p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-white/10"
      >
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
              Client Security Console
            </h1>
            <Badge variant="primary" size="sm" dot pulse>
              LIVE POSTURE
            </Badge>
          </div>
          <p className="text-xs text-slate-400 font-sans leading-relaxed">
            Continuous smart contract verification, vulnerability triage, and cryptographic vaults.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
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
      </GlassCard>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Active Audit Engagements"
          value={`${mockAuditRequests.filter((a) => a.status !== 'COMPLETED' && a.status !== 'VERIFIED').length} In Progress`}
          delta={`${mockAuditRequests.filter((a) => a.status === 'QUEUED').length} Queued`}
          icon="timelapse"
          iconColor="text-cyan-400"
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
          iconColor="text-red-400"
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
          <GlassCard variant="default" blur="xl" className="p-6 space-y-4 border-white/10">
            <GlassCardHeader className="mb-2">
              <div>
                <GlassCardTitle>Active Audit Engagements</GlassCardTitle>
                <p className="text-xs text-slate-400">Real-time status and phase progress across your smart contracts.</p>
              </div>
              <Link to="/client/audits/new" className="text-xs text-cyan-400 font-mono hover:underline flex items-center gap-1">
                + New Submission
              </Link>
            </GlassCardHeader>

            <div className="overflow-x-auto cyber-scrollbar">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 uppercase text-[10px]">
                    <th className="pb-3 pr-4">Protocol / Ref ID</th>
                    <th className="pb-3 px-3">Status</th>
                    <th className="pb-3 px-3">Phase Progress</th>
                    <th className="pb-3 px-3">Findings</th>
                    <th className="pb-3 pl-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {mockAuditRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 pr-4">
                        <div className="font-bold text-white font-display text-sm">{req.projectName}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <span className="text-cyan-400">{req.id}</span> • {req.protocolType}
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
                          <div className="w-full h-1.5 bg-[#060e20] rounded-full overflow-hidden border border-white/10">
                            <div
                              className="h-full bg-cyan-400 rounded-full transition-all shadow-[0_0_8px_rgba(0,218,243,0.5)]"
                              style={{ width: `${req.progressPercent}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-1 text-[11px]">
                          {req.findingsCount.critical > 0 && (
                            <span className="text-red-400 font-bold">{req.findingsCount.critical} Crit</span>
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
          </GlassCard>
        </div>

        {/* Priority Vulnerability Feed (1 col) */}
        <div className="space-y-6">
          <GlassCard variant="fresnel" blur="xl" className="p-6 space-y-4 border-cyan-500/30">
            <GlassCardHeader className="mb-2">
              <div className="flex items-center gap-2">
                <Icon name="warning" size={20} className="text-red-400" />
                <GlassCardTitle>Vulnerability Triage Feed</GlassCardTitle>
              </div>
              <Link to="/client/audits/ZM-8492-NX/triage" className="text-xs text-cyan-400 font-mono hover:underline">
                View All
              </Link>
            </GlassCardHeader>

            <div className="space-y-3">
              {mockFindings.map((finding) => (
                <Link
                  key={finding.id}
                  to="/client/audits/ZM-8492-NX/triage"
                  className="block p-3.5 bg-[#060e20]/80 border border-white/10 rounded-xl hover:border-cyan-400/50 hover:bg-[#0c162d] transition-all group"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <SeverityBadge severity={finding.severity} size="sm" />
                    <span className="text-[10px] font-mono text-slate-400">{finding.category}</span>
                  </div>
                  <h4 className="font-display font-semibold text-xs text-white group-hover:text-cyan-200 transition-colors leading-tight">
                    {finding.title}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mt-2 pt-1.5 border-t border-white/10">
                    <span>{finding.location}</span>
                    <span className="text-cyan-400 font-bold">{finding.lineRange}</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10 text-center">
              <Link to="/client/audits/ZM-8492-NX/report">
                <Button variant="outline" size="sm" className="w-full" icon="description">
                  Generate Cryptographic Final Report
                </Button>
              </Link>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
