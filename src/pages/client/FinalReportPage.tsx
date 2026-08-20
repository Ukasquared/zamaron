import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, SeverityBadge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { useAuth } from '@/context/AuthContext';
import { copyToClipboard } from '@/lib/utils';
import { fingerprint } from '@/lib/persistentStore';
import { getAudit, getAuditFindings } from '@/services/auditService';

export const FinalReportPage: React.FC = () => {
  const { id = 'ZM-8492-NX' } = useParams<{ id: string }>();
  const { user } = useAuth();
  const audit = React.useMemo(() => {
    try {
      return getAudit(id, user);
    } catch {
      return null;
    }
  }, [id, user]);
  const mockFindings = React.useMemo(() => {
    try {
      return getAuditFindings(user, id);
    } catch {
      return [];
    }
  }, [id, user]);
  const [shareNote, setShareNote] = React.useState<string | null>(null);
  const reportHash = fingerprint(`${id}:${audit?.commitHash || 'none'}`);
  const remediations = mockFindings.filter((f) => f.status === 'RESOLVED').length;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Action Header */}
      <div className="flex items-center justify-between gap-4 bg-surface-container/70 border border-outline/70 p-4 rounded-md">
        <div className="flex items-center gap-3">
          <Link to="/client/dashboard" className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1">
            <Icon name="arrow_back" size={16} /> Back to Dashboard
          </Link>
          {shareNote && <span className="text-[11px] font-mono text-emerald-400">{shareNote}</span>}
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            icon="share"
            onClick={async () => {
              const ok = await copyToClipboard(window.location.href);
              setShareNote(ok ? 'Report URL copied.' : 'Clipboard unavailable.');
            }}
          >
            Share Link
          </Button>
          <Button
            size="sm"
            icon="download"
            onClick={() => window.print()}
          >
            Export Signed PDF
          </Button>
        </div>
      </div>

      {/* Official Certificate Report View */}
      <Card variant="fresnel" className="p-8 sm:p-12 space-y-8 bg-[#081024] border-primary/40 shadow-2xl relative">
        {/* Report Seal & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-outline/60 pb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded bg-[#060e20] border-2 border-primary flex items-center justify-center text-primary shadow-[0_0_20px_rgba(0,218,243,0.4)]">
              <Icon name="shield" size={32} />
            </div>
            <div>
              <div className="font-display font-black text-2xl text-white tracking-wide">
                ZAMARON PROTOCOL
              </div>
              <div className="text-xs font-mono text-primary font-semibold tracking-widest uppercase">
                Official Security Verification Report
              </div>
            </div>
          </div>

          <div className="text-left sm:text-right font-mono text-xs space-y-1 text-slate-400">
            <div>REPORT ID: <strong className="text-white">{id}</strong></div>
            <div>ISSUE DATE: <strong className="text-slate-200">2026-08-18</strong></div>
            <div className="text-emerald-400 font-bold flex items-center sm:justify-end gap-1">
              <Icon name="verified" size={14} /> ON-CHAIN VERIFIED
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-3">
          <h3 className="font-display font-bold text-lg text-white">Executive Security Summary</h3>
          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            Zamaron conducted a comprehensive institutional smart contract security audit for{' '}
            <strong className="text-white">{audit?.projectName || 'the target protocol'}</strong> targeting repository{' '}
            <code className="text-primary font-mono font-bold">{audit?.targetRepo || 'unspecified'}</code> at commit SHA{' '}
            <code className="text-primary font-mono font-bold">{audit?.commitHash || 'unspecified'}</code>. The evaluation encompassed formal verification, automated static analysis, symbolic fuzzing, and manual exploitation.
          </p>
        </div>

        {/* Audit Scorecard */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#060e20] border border-outline/70 rounded font-mono text-center">
          <div>
            <div className="text-[10px] text-slate-400">FINAL RESILIENCE SCORE</div>
            <div className="text-2xl font-black text-primary font-display mt-1">96 / 100</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400">CRITICAL FINDINGS</div>
            <div className="text-2xl font-black text-emerald-400 font-display mt-1">0 OPEN</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400">TOTAL REMEDIATED</div>
            <div className="text-2xl font-black text-white font-display mt-1">
              {remediations} / {mockFindings.length || 0}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400">CLEARANCE STATUS</div>
            <div className="text-xs font-bold text-emerald-400 mt-2">DEPLOYMENT READY</div>
          </div>
        </div>

        {/* Findings Ledger Table */}
        <div className="space-y-4">
          <h3 className="font-display font-bold text-lg text-white">Verified Findings Ledger</h3>
          <div className="overflow-x-auto cyber-scrollbar">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-outline/70 text-slate-400 uppercase text-[10px]">
                  <th className="pb-2 pr-3">Finding Title</th>
                  <th className="pb-2 px-3">Severity</th>
                  <th className="pb-2 px-3">Category</th>
                  <th className="pb-2 pl-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline/40">
                {mockFindings.map((finding) => (
                  <tr key={finding.id}>
                    <td className="py-3 pr-3 font-semibold text-slate-200">
                      {finding.title}
                      <div className="text-[10px] text-slate-500 font-normal">{finding.location} ({finding.lineRange})</div>
                    </td>
                    <td className="py-3 px-3">
                      <SeverityBadge severity={finding.severity} size="sm" />
                    </td>
                    <td className="py-3 px-3 text-slate-400">{finding.category}</td>
                    <td className="py-3 pl-3 text-right">
                      <Badge variant={finding.status === 'RESOLVED' ? 'success' : 'warning'} size="sm">
                      {finding.status}
                    </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cryptographic Proof Anchor */}
        <div className="p-4 bg-[#060e20] border border-primary/30 rounded space-y-2 font-mono text-xs">
          <div className="text-slate-400 text-[11px] font-bold uppercase tracking-wider text-primary">
            Cryptographic SHA-256 Verification Anchor:
          </div>
          <div className="text-slate-300 break-all text-[11px] bg-[#0b1326] p-2 rounded border border-outline">
            {reportHash}
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[10px] text-slate-500 pt-1">
            <span>Signed by: Lead Auditor Alex Chen (Key ID: 0x48f...92a1)</span>
            <span>Anchor Block: #21,894,012</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
