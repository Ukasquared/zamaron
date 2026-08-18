import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { QuorumProgress } from '@/components/shared/QuorumProgress';
import { mockProposals } from '@/mock/data';

export const GovernancePage: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container/70 border border-outline/70 p-6 rounded-md">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary">PROTOCOL GOVERNANCE</Badge>
            <span className="text-xs font-mono text-slate-400">DAO Quorum Engine</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
            Active Security Upgrades & Proposals
          </h1>
        </div>

        <Link to="/governance/proposals/ZAM-842">
          <Button size="md" icon="how_to_vote">
            Cast Weighted Vote
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {mockProposals.map((prop) => (
          <Card key={prop.id} variant="glass" hoverEffect className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant={prop.status === 'ACTIVE' ? 'primary' : 'success'} size="sm">
                  {prop.status}
                </Badge>
                <span className="text-xs font-mono text-primary font-bold">{prop.proposalNumber}</span>
              </div>
              <span className="text-xs font-mono text-slate-400">Ends: {prop.endDate}</span>
            </div>

            <h3 className="font-display font-bold text-xl text-white">{prop.title}</h3>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">{prop.summary}</p>

            <div className="pt-3 border-t border-outline/50">
              <QuorumProgress
                current={prop.quorumPercent}
                target={prop.quorumTarget}
                forVotes={prop.forVotes}
                againstVotes={prop.againstVotes}
              />
            </div>

            <div className="pt-2 flex justify-end">
              <Link to={`/governance/proposals/${prop.proposalNumber}`}>
                <Button variant="outline" size="sm" iconRight="arrow_forward">
                  Enter Voting Terminal
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
