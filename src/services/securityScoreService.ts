import type {
  ScoreDimension,
  SecurityProject,
  SecurityScoreResult,
  SecurityTier,
  TokenRiskIndicators,
} from '@/types';

/**
 * Security score engine.
 *
 * Pure functions that derive a composite 0-100 security score, letter tier and
 * percentile rank from a project's six weighted dimensions plus risk-based
 * deductions. This module is intentionally free of React / I/O so it can be
 * unit-tested, swapped for a real API call, or run on the server later.
 *
 * NOTE: The weighting and tier bands below are an illustrative model for the
 * Zamaron demo. They do NOT represent a live security audit and must not be
 * presented as a guarantee that any real smart contract is secure.
 */

/** Default weights for the six evaluation categories (sum = 1.0). */
export const DIMENSION_WEIGHTS: Record<ScoreDimension['key'], number> = {
  codeSecurity: 0.30,
  operationalResilience: 0.20,
  fundamentalHealth: 0.15,
  governanceStrength: 0.15,
  marketStability: 0.10,
  communityTrust: 0.10,
};

interface TierBand {
  tier: SecurityTier;
  min: number;
  label: string;
}

/** Composite-score to letter-tier mapping. */
const TIER_BANDS: TierBand[] = [
  { tier: 'AAA', min: 95, label: 'Exceptional' },
  { tier: 'AA', min: 90, label: 'Excellent' },
  { tier: 'A', min: 85, label: 'Strong' },
  { tier: 'BBB', min: 75, label: 'Adequate' },
  { tier: 'BB', min: 65, label: 'Moderate' },
  { tier: 'B', min: 50, label: 'Weak' },
  { tier: 'C', min: 35, label: 'Poor' },
  { tier: 'D', min: 0, label: 'Critical Risk' },
];

export function scoreToTier(score: number): SecurityTier {
  const clamped = clamp(score, 0, 100);
  return (TIER_BANDS.find((band) => clamped >= band.min) ?? TIER_BANDS[TIER_BANDS.length - 1]).tier;
}

export function tierLabel(tier: SecurityTier): string {
  return TIER_BANDS.find((b) => b.tier === tier)?.label ?? '';
}

export function tierColor(tier: SecurityTier): string {
  switch (tier) {
    case 'AAA':
    case 'AA':
    case 'A':
      return 'text-emerald-400';
    case 'BBB':
      return 'text-primary';
    case 'BB':
      return 'text-amber-300';
    case 'B':
      return 'text-orange-400';
    case 'C':
      return 'text-error';
    case 'D':
    default:
      return 'text-red-500';
  }
}

/** Variant accepted by the shared <Badge> component. */
export function tierBadgeVariant(tier: SecurityTier): 'success' | 'primary' | 'warning' | 'critical' | 'high' {
  switch (tier) {
    case 'AAA':
    case 'AA':
    case 'A':
      return 'success';
    case 'BBB':
      return 'primary';
    case 'BB':
      return 'warning';
    case 'B':
      return 'high';
    case 'C':
    case 'D':
    default:
      return 'critical';
  }
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * Compute weighted average of the six dimension scores.
 * Dimension weights on the project are respected, falling back to defaults
 * if a weight is missing or the set is somehow incomplete.
 */
export function computeWeightedScore(dimensions: ScoreDimension[]): number {
  const totalWeight = dimensions.reduce((sum, d) => sum + (d.weight || DIMENSION_WEIGHTS[d.key] || 0), 0);
  if (totalWeight <= 0) return 0;

  const weighted = dimensions.reduce((sum, d) => {
    const w = d.weight || DIMENSION_WEIGHTS[d.key] || 0;
    return sum + clamp(d.value, 0, 100) * w;
  }, 0);

  return Math.round((weighted / totalWeight) * 10) / 10;
}

/**
 * Risk-based deductions mirroring the public Skynet methodology concept:
 * signals such as anonymous/unverified teams, active incidents, honeypot
 * patterns, or un-audited code lower the final score.
 */
export function computeDeductions(project: SecurityProject): { label: string; points: number }[] {
  const deductions: { label: string; points: number }[] = [];
  const { badges, tokenRisk, stage } = project;

  const hasAudit = badges.some((b) => b.type === 'AUDIT' && b.verified);
  if (!hasAudit) deductions.push({ label: 'No verified audit history', points: 12 });

  const hasKyc = badges.some((b) => b.type === 'KYC' && b.verified);
  if (!hasKyc) deductions.push({ label: 'Team identity not verified', points: 6 });

  const hasBounty = badges.some((b) => b.type === 'BUG_BOUNTY' && b.verified);
  if (!hasBounty) deductions.push({ label: 'No active bug bounty program', points: 3 });

  if (tokenRisk.isHoneypot) deductions.push({ label: 'Honeypot pattern detected', points: 25 });
  if (tokenRisk.hasMintFunction && !tokenRisk.ownerRenounced)
    deductions.push({ label: 'Unrestricted mint authority', points: 8 });
  if (tokenRisk.hasBlacklist) deductions.push({ label: 'Blacklist capability present', points: 4 });
  if (!tokenRisk.contractVerified) deductions.push({ label: 'Contract source not verified', points: 5 });
  if (tokenRisk.liquidityLockedPercent < 50)
    deductions.push({ label: 'Low liquidity lock coverage', points: 6 });
  if (tokenRisk.top10HoldersPercent > 60)
    deductions.push({ label: 'High holder concentration', points: 5 });

  if (stage === 'INCIDENT') deductions.push({ label: 'Active security incident', points: 15 });

  return deductions;
}

export function computeScore(project: SecurityProject): SecurityScoreResult {
  const base = computeWeightedScore(project.dimensions);
  const deductions = computeDeductions(project);
  const totalDeduction = deductions.reduce((sum, d) => sum + d.points, 0);
  const score = clamp(Math.round((base - totalDeduction) * 10) / 10, 0, 100);

  return {
    score,
    tier: scoreToTier(score),
    // Percentile is assigned at the leaderboard level (relative), not here.
    rankPercentile: 0,
    dimensions: project.dimensions,
    deductions,
  };
}

/**
 * Assign percentile ranks (0-100, higher = safer relative to the cohort) once
 * we have the full scored project list. A higher score yields a higher
 * percentile.
 */
export function assignPercentiles<T extends { score: number }>(scored: T[]): (T & { rankPercentile: number })[] {
  const sorted = [...scored].sort((a, b) => a.score - b.score);
  const n = sorted.length;
  return sorted.map((item, index) => ({
    ...item,
    rankPercentile: n <= 1 ? 100 : Math.round(((index + 1) / n) * 1000) / 10,
  }));
}

/** Convenience: summarize token-risk indicators for UI badges/counts. */
export function summarizeTokenRisk(risk: TokenRiskIndicators): {
  flaggedCount: number;
  checks: { label: string; status: 'pass' | 'warn' | 'fail'; value: string }[];
} {
  const checks: { label: string; status: 'pass' | 'warn' | 'fail'; value: string }[] = [
    {
      label: 'Honeypot trap',
      status: risk.isHoneypot ? 'fail' : 'pass',
      value: risk.isHoneypot ? 'Detected' : 'None detected',
    },
    {
      label: 'Contract verified',
      status: risk.contractVerified ? 'pass' : 'fail',
      value: risk.contractVerified ? 'Verified' : 'Unverified',
    },
    {
      label: 'Ownership renounced',
      status: risk.ownerRenounced ? 'pass' : 'warn',
      value: risk.ownerRenounced ? 'Renounced' : 'Not renounced',
    },
    {
      label: 'Mint function',
      status: risk.hasMintFunction ? 'warn' : 'pass',
      value: risk.hasMintFunction ? 'Present' : 'Absent',
    },
    {
      label: 'Pause function',
      status: risk.hasPauseFunction ? 'warn' : 'pass',
      value: risk.hasPauseFunction ? 'Present' : 'Absent',
    },
    {
      label: 'Blacklist capability',
      status: risk.hasBlacklist ? 'fail' : 'pass',
      value: risk.hasBlacklist ? 'Present' : 'Absent',
    },
    {
      label: 'Proxy / upgradeable',
      status: risk.isProxy ? 'warn' : 'pass',
      value: risk.isProxy ? 'Upgradeable' : 'Immutable',
    },
    {
      label: 'Liquidity locked',
      status: risk.liquidityLockedPercent >= 75 ? 'pass' : risk.liquidityLockedPercent >= 40 ? 'warn' : 'fail',
      value: `${risk.liquidityLockedPercent}%`,
    },
    {
      label: 'Top-10 holder concentration',
      status: risk.top10HoldersPercent <= 30 ? 'pass' : risk.top10HoldersPercent <= 60 ? 'warn' : 'fail',
      value: `${risk.top10HoldersPercent}%`,
    },
    {
      label: 'Buy / sell tax',
      status: risk.buyTaxPercent <= 5 && risk.sellTaxPercent <= 5 ? 'pass' : 'warn',
      value: `${risk.buyTaxPercent}% / ${risk.sellTaxPercent}%`,
    },
  ];

  const flaggedCount = checks.filter((c) => c.status !== 'pass').length;
  return { flaggedCount, checks };
}
