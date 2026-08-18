import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { QuorumProgress } from '@/components/shared/QuorumProgress';

export const ProposalDetailPage: React.FC = () => {
  const { id = 'ZAM-842' } = useParams<{ id: string }>();
  const [vote, setVote] = useState<'FOR' | 'AGAINST' | 'ABSTAIN'>('FOR');
  const [hasVoted, setHasVoted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div className="flex items-center justify-between">
        <Link to="/governance" className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1">
          <Icon name="arrow_back" size={16} /> Back to Proposals
        </Link>
        <Badge variant="primary" size="md">VOTING ACTIVE</Badge>
      </div>

      <Card variant="fresnel" className="p-8 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono text-primary font-bold">{id} • PROPOSAL</span>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
            Upgrade Neural Sandbox Environment & Bytecode Decompiler
          </h1>
          <div className="text-xs font-mono text-slate-400">
            Authored by: <span className="text-slate-200">Alex Chen (Lead Auditor)</span> • Voting Period: Aug 15 - Aug 22, 2026
          </div>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed border-t border-outline/50 pt-4">
          <p>
            This proposal activates quantum-resistant lattice cryptographic checks across the standard Zamaron CI/CD compilation pipeline, allocates 150,000 ZAM tokens to the auditor bug bounty treasury, and deploys v4.2 of the EVM neural decompiler to all 128 global validator nodes.
          </p>
        </div>

        <div className="pt-4 border-t border-outline/50">
          <QuorumProgress
            current={82.4}
            target={75.0}
            forVotes={4280000}
            againstVotes={310000}
          />
        </div>

        {/* Voting Terminal Action */}
        <div className="p-6 bg-[#060e20] border border-primary/40 rounded-md space-y-4">
          <h3 className="font-display font-bold text-base text-white">
            Cryptographic Vote Submission
          </h3>

          {!hasVoted ? (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {(['FOR', 'AGAINST', 'ABSTAIN'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setVote(opt)}
                    className={`py-3 rounded font-mono font-bold text-xs border transition-all cursor-pointer ${
                      vote === opt
                        ? opt === 'FOR'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-400 shadow-[0_0_15px_rgba(0,230,118,0.3)]'
                          : opt === 'AGAINST'
                          ? 'bg-error/20 text-error border-error'
                          : 'bg-slate-700 text-white border-slate-500'
                        : 'bg-[#0b1326] border-outline text-slate-400 hover:border-slate-500'
                    }`}
                  >
                    VOTE {opt}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Your Weighted Voting Power: <strong className="text-white">14,850 ZAM</strong></span>
                <Button size="md" onClick={() => setHasVoted(true)} icon="how_to_vote">
                  Sign & Cast Ballot
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/40 rounded text-center text-emerald-400 font-mono text-xs font-bold flex items-center justify-center gap-2">
              <Icon name="verified" size={18} />
              Ballot cryptographically signed and confirmed on block #21,894,015!
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
