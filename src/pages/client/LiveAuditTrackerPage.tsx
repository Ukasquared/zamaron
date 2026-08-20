import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { LiveLogStream } from '@/components/shared/LiveLogStream';
import { useAuth } from '@/context/AuthContext';
import { getAudit, getAuditFindings, statusToPhase } from '@/services/auditService';

export const LiveAuditTrackerPage: React.FC = () => {
  const { id = 'ZM-8492-NX' } = useParams<{ id: string }>();
  const { user } = useAuth();
  const audit = useMemo(() => {
    try {
      return getAudit(id, user);
    } catch {
      return null;
    }
  }, [id, user]);
  const findings = useMemo(() => {
    try {
      return getAuditFindings(user, id);
    } catch {
      return [];
    }
  }, [id, user]);
  const projectName = audit?.projectName ?? 'Engagement';
  const currentPhase = audit ? statusToPhase(audit.status) : 3;

  const phaseStatus = (num: number) =>
    currentPhase > num ? 'COMPLETED' : currentPhase === num ? 'IN_PROGRESS' : 'PENDING';

  const phases = [
    {
      num: 1,
      title: 'Automated Bytecode & Invariant Scan',
      status: phaseStatus(1),
      timestamp: audit?.submittedAt?.slice(0, 16).replace('T', ' ') || 'Queued',
      inspector: 'Neural Static Analyzer v4.2',
      findings: 'Invariant corpus executed against the pinned commit',
    },
    {
      num: 2,
      title: 'AI Neural Summarize & Control Flow Graphing',
      status: phaseStatus(2),
      timestamp: 'Control-flow pass',
      inspector: 'AI Forensic Agent (ZAM-Core)',
      findings: `${findings.length} candidate finding${findings.length === 1 ? '' : 's'} isolated`,
    },
    {
      num: 3,
      title: 'Manual Lead Auditor Verification & Exploitation',
      status: phaseStatus(3),
      timestamp: 'Active review',
      inspector: audit?.leadAuditor || 'Unassigned',
      findings: `${findings.filter((f) => f.severity === 'CRITICAL').length} critical / ${findings.length} total`,
    },
    {
      num: 4,
      title: 'Remediation Review & Cryptographic Report Anchor',
      status: phaseStatus(4),
      timestamp: 'Pending sign-off',
      inspector: 'ZAMARON Cryptographic Notary',
      findings: 'Awaiting verified patches',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container/70 border border-outline/70 p-6 rounded-md">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm" dot pulse>
              REAL-TIME AUDIT TRACKER
            </Badge>
            <span className="text-xs font-mono text-slate-400">Ref: {id}</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
            {projectName}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link to={`/client/audits/${id}/review`}>
            <Button variant="outline" size="sm" icon="code">
              Inspect Code Diff
            </Button>
          </Link>
          <Link to={`/client/audits/${id}/triage`}>
            <Button variant="primary" size="sm" icon="bug_report">
              Open Triage Panel
            </Button>
          </Link>
        </div>
      </div>

      {/* Target Repo Metadata Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-[#081024] border border-outline/70 rounded font-mono text-xs">
        <div>
          <span className="text-slate-500 block text-[10px]">REPOSITORY</span>
          <span className="text-white font-bold truncate block">{audit?.targetRepo || 'github.com/nexus-defi/core-v3'}</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px]">TARGET COMMIT SHA</span>
          <span className="text-primary font-bold">{audit?.commitHash || '8f0a1c9e2b4'}</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px]">LEAD AUDITOR</span>
          <span className="text-slate-200">{audit?.leadAuditor || 'Unassigned'}</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px]">CURRENT PHASE</span>
          <span className="text-emerald-400 font-bold">Phase {currentPhase} • {audit?.status || 'IN_REVIEW'}</span>
        </div>
      </div>

      {/* 4 Phase Timeline */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-xl text-white">4-Phase Audit Progression</h3>
        <div className="space-y-4">
          {phases.map((phase) => (
            <Card
              key={phase.num}
              variant={phase.status === 'IN_PROGRESS' ? 'fresnel' : 'glass'}
              className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-sm shrink-0 border ${
                    phase.status === 'COMPLETED'
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                      : phase.status === 'IN_PROGRESS'
                      ? 'bg-primary/20 text-primary border-primary animate-pulse'
                      : 'bg-surface-variant text-slate-500 border-outline'
                  }`}
                >
                  {phase.status === 'COMPLETED' ? (
                    <Icon name="check" size={20} />
                  ) : (
                    phase.num
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-display font-bold text-base text-white">{phase.title}</h4>
                    <Badge
                      variant={
                        phase.status === 'COMPLETED'
                          ? 'success'
                          : phase.status === 'IN_PROGRESS'
                          ? 'primary'
                          : 'outline'
                      }
                      size="sm"
                    >
                      {phase.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-400 font-sans">{phase.findings}</div>
                  <div className="text-[11px] font-mono text-slate-500">
                    Inspector: <span className="text-slate-300">{phase.inspector}</span> • {phase.timestamp}
                  </div>
                </div>
              </div>

              {phase.status === 'IN_PROGRESS' && (
                <div className="shrink-0 flex items-center gap-2">
                  <Link to={`/client/audits/${id}/triage`}>
                    <Button variant="outline" size="sm" icon="bug_report">
                      View Triage Findings (3)
                    </Button>
                  </Link>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Live Streaming Logs */}
      <div className="space-y-3">
        <h3 className="font-display font-bold text-xl text-white">Live Verification Telemetry</h3>
        <LiveLogStream maxHeight="max-h-72" />
      </div>
    </div>
  );
};
