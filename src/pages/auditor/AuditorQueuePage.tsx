import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { mockAuditRequests } from '@/mock/data';

export const AuditorQueuePage: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'QUEUED' | 'IN_REVIEW' | 'SCANNING'>('ALL');

  const filtered = mockAuditRequests.filter((item) => {
    if (filter === 'ALL') return true;
    return item.status === filter;
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container/70 border border-outline/70 p-6 rounded-md">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">AUDITOR DISPATCH QUEUE</Badge>
            <span className="text-xs font-mono text-slate-400">Security Clearance: ALPHA</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
            Pending Security Engagements
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/auditor/ai-terminal">
            <Button variant="outline" size="sm" icon="smart_toy">
              AI Forensic Terminal
            </Button>
          </Link>
          <Link to="/auditor/forensics">
            <Button variant="primary" size="sm" icon="terminal">
              Bytecode Disassembler
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {(['ALL', 'QUEUED', 'SCANNING', 'IN_REVIEW'] as const).map((st) => (
          <button
            key={st}
            onClick={() => setFilter(st)}
            className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-colors cursor-pointer ${
              filter === st
                ? 'bg-primary text-[#00363d] font-bold'
                : 'bg-surface-variant text-slate-400 hover:text-white'
            }`}
          >
            {st} ({st === 'ALL' ? mockAuditRequests.length : mockAuditRequests.filter((r) => r.status === st).length})
          </button>
        ))}
      </div>

      {/* Ticket List */}
      <div className="space-y-4">
        {filtered.map((ticket) => (
          <Card key={ticket.id} variant="glass" hoverEffect className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3">
                <Badge
                  variant={
                    ticket.status === 'QUEUED'
                      ? 'warning'
                      : ticket.status === 'SCANNING'
                      ? 'secondary'
                      : 'primary'
                  }
                  size="sm"
                  dot
                >
                  {ticket.status}
                </Badge>
                <span className="font-mono text-xs text-primary font-bold">{ticket.id}</span>
                <Badge variant="outline" size="sm">
                  {ticket.tier}
                </Badge>
              </div>

              <h3 className="font-display font-bold text-lg text-white">{ticket.projectName}</h3>
              <p className="text-xs font-mono text-slate-400">
                Repo: <span className="text-slate-200">{ticket.targetRepo}</span> • Commit: <span className="text-primary">{ticket.commitHash}</span>
              </p>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-1">
                <span>TVL Protected: <strong className="text-white">{ticket.tvlProtected}</strong></span>
                <span>Lead: <strong className="text-slate-200">{ticket.leadAuditor || 'Unassigned'}</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end md:self-center shrink-0">
              <Link to={`/client/audits/${ticket.id}/review`}>
                <Button variant="outline" size="sm" icon="code">
                  Review Code
                </Button>
              </Link>
              <Link to={`/client/audits/${ticket.id}/triage`}>
                <Button size="sm" icon="assignment_turned_in">
                  Claim & Triage
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
