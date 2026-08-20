import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { QuorumProgress } from '@/components/shared/QuorumProgress';
import { useAuth } from '@/context/AuthContext';
import { castVote, getProposal } from '@/services/governanceService';

export const ProposalDetailPage: React.FC = () => {
  const { id = 'ZAM-842' } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [tick, setTick] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const proposal = useMemo(() => {
    try {
      return getProposal(id, user);
    } catch {
      return null;
    }
  }, [id, user, tick]);

  const [vote, setVote] = useState<'FOR' | 'AGAINST' | 'ABSTAIN'>(proposal?.userVote ?? 'FOR');
  const hasVoted = Boolean(proposal?.userVote);

  const submit = () => {
    setError(null);
    try {
      castVote(id, vote, user);
      setTick((n) => n + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Vote failed.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div className="flex items-center justify-between">
        <Link to="/governance" className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1">
          <Icon name="arrow_back" size={16} /> Back to Proposals
        </Link>
        <Badge variant={proposal?.status === 'ACTIVE' ? 'primary' : 'success'} size="md">
          {proposal?.status || 'UNKNOWN'}
        </Badge>
      </div>

      <Card variant="fresnel" className="p-8 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono text-primary font-bold">{proposal?.proposalNumber || id} • PROPOSAL</span>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
            {proposal?.title || 'Proposal not found'}
          </h1>
          <div className="text-xs font-mono text-slate-400">
            Authored by: <span className="text-slate-200">{proposal?.author || '—'}</span> • Voting Period:{' '}
            {proposal?.createdDate} - {proposal?.endDate}
          </div>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed border-t border-outline/50 pt-4">
          <p>{proposal?.summary}</p>
        </div>

        {proposal && (
          <div className="pt-4 border-t border-outline/50">
            <QuorumProgress
              current={proposal.quorumPercent}
              target={proposal.quorumTarget}
              forVotes={proposal.forVotes}
              againstVotes={proposal.againstVotes}
            />
          </div>
        )}

        <div className="p-6 bg-[#060e20] border border-primary/40 rounded-md space-y-4">
          <h3 className="font-display font-bold text-base text-white">Cryptographic Vote Submission</h3>
          {error && <div className="text-xs font-mono text-error">{error}</div>}
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
                <span>
                  Your Weighted Voting Power: <strong className="text-white">{(user?.xp ?? 1000).toLocaleString()} ZAM</strong>
                </span>
                <Button size="md" onClick={submit} icon="how_to_vote" disabled={!proposal || proposal.status !== 'ACTIVE'}>
                  Sign & Cast Ballot
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/40 rounded text-center text-emerald-400 font-mono text-xs font-bold flex items-center justify-center gap-2">
              <Icon name="verified" size={18} />
              Ballot recorded as {proposal?.userVote}. Quorum now {proposal?.quorumPercent}%.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
