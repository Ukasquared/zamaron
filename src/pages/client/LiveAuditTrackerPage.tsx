import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { LiveLogStream } from '@/components/shared/LiveLogStream';

export const LiveAuditTrackerPage: React.FC = () => {
  const { id = 'ZM-8492-NX' } = useParams<{ id: string }>();

  const phases = [
    {
      num: 1,
      title: 'Automated Bytecode & Invariant Scan',
      status: 'COMPLETED',
      timestamp: 'Aug 16, 14:45 UTC',
      inspector: 'Neural Static Analyzer v4.2',
      findings: '14 Invariants Tested • 0 Fatal Bytecode Traps',
    },
    {
      num: 2,
      title: 'AI Neural Summarize & Control Flow Graphing',
      status: 'COMPLETED',
      timestamp: 'Aug 17, 09:20 UTC',
      inspector: 'AI Forensic Agent (ZAM-Core)',
      findings: '3 Reentrancy Loops Isolated in VaultManager.sol',
    },
    {
      num: 3,
      title: 'Manual Lead Auditor Verification & Exploitation',
      status: 'IN_PROGRESS',
      timestamp: 'Active Now (Est. Completion: 4 hrs)',
      inspector: 'Alex Chen (Lead) & Sarah Thorne (Peer)',
      findings: '1 Critical Reentrancy Confirmed (SWC-107)',
    },
    {
      num: 4,
      title: 'Remediation Review & Cryptographic Report Anchor',
      status: 'PENDING',
      timestamp: 'Pending Phase 3 Sign-off',
      inspector: 'ZAMARON Cryptographic Notary',
      findings: 'Awaiting client patch commits',
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
            Nexus DeFi Protocol (Core v3)
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
          <span className="text-white font-bold truncate block">github.com/nexus-defi/core-v3</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px]">TARGET COMMIT SHA</span>
          <span className="text-primary font-bold">8f0a1c9e2b4</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px]">LEAD AUDITOR</span>
          <span className="text-slate-200">Alex Chen (Lead)</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px]">CURRENT PHASE</span>
          <span className="text-emerald-400 font-bold">Phase 3: Manual Verification</span>
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
