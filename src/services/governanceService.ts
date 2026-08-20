import type { GovernanceProposal, UserProfile } from '@/types';
import { mockProposals } from '@/mock/data';
import { cloneValue, loadStore, saveStore } from '@/lib/persistentStore';
import { AuthorizationError, requireAuthenticated } from '@/services/authorization';

let proposals: GovernanceProposal[] = loadStore('zamaron_proposals_v1', mockProposals);

function persist(): void {
  saveStore('zamaron_proposals_v1', proposals);
}

export function listProposals(principal?: UserProfile | null): GovernanceProposal[] {
  requireAuthenticated(principal);
  return cloneValue(proposals);
}

export function getProposal(id: string, principal?: UserProfile | null): GovernanceProposal | null {
  requireAuthenticated(principal);
  const found = proposals.find((row) => row.id === id || row.proposalNumber === id);
  return found ? cloneValue(found) : null;
}

export function castVote(
  id: string,
  vote: 'FOR' | 'AGAINST' | 'ABSTAIN',
  principal?: UserProfile | null
): GovernanceProposal {
  const user = requireAuthenticated(principal);
  const index = proposals.findIndex((row) => row.id === id || row.proposalNumber === id);
  if (index < 0) {
    throw new AuthorizationError('FORBIDDEN', 'Proposal not found.');
  }
  const current = proposals[index];
  if (current.status !== 'ACTIVE') {
    throw new AuthorizationError('FORBIDDEN', 'Voting is closed for this proposal.');
  }
  const weight = user.xp ?? 1000;
  const next = { ...current };
  if (current.userVote) {
    if (current.userVote === 'FOR') next.forVotes -= weight;
    if (current.userVote === 'AGAINST') next.againstVotes -= weight;
    if (current.userVote === 'ABSTAIN') next.abstainVotes -= weight;
  }
  if (vote === 'FOR') next.forVotes += weight;
  if (vote === 'AGAINST') next.againstVotes += weight;
  if (vote === 'ABSTAIN') next.abstainVotes += weight;
  next.userVote = vote;
  const total = next.forVotes + next.againstVotes + next.abstainVotes;
  next.quorumPercent = total > 0 ? Math.min(100, Math.round((total / 5600000) * 1000) / 10) : next.quorumPercent;
  proposals[index] = next;
  persist();
  return cloneValue(next);
}
