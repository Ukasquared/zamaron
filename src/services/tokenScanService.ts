import type { TokenRiskIndicators } from '@/types';
import { summarizeTokenRisk } from './securityScoreService';

/**
 * Token scan service.
 *
 * MOCK/DEMO implementation: deterministically derives a plausible set of risk
 * indicators from the supplied contract address so that different addresses
 * produce visibly different results. This is NOT real static/bytecode
 * analysis — it exists so the UI can be built and wired up. A real
 * implementation would call an on-chain analyzer / bytecode scanner.
 */

export interface TokenScanResult {
  contractAddress: string;
  tokenName: string;
  ticker: string;
  chain: string;
  risk: TokenRiskIndicators;
  flaggedCount: number;
  checks: { label: string; status: 'pass' | 'warn' | 'fail'; value: string }[];
  isDemo: true;
}

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

const SAMPLE_TOKEN_NAMES = [
  { name: 'Nexus Synthetic Token', ticker: 'NXST' },
  { name: 'Aegis Liquid Staking', ticker: 'AEG' },
  { name: 'Quantum Bridge', ticker: 'QZK' },
  { name: 'Moonshot Rocket', ticker: 'MOON' },
  { name: 'PixelForge', ticker: 'FORGE' },
  { name: 'Cascade Utility', ticker: 'CAS' },
];

const CHAINS = ['Ethereum', 'BNB Chain', 'Arbitrum', 'Polygon', 'Base'];

/** Deterministic mock risk profile derived from the address. */
export function scanToken(contractAddress: string): TokenScanResult {
  const seed = hashString(contractAddress.trim().toLowerCase());
  const pick = <T,>(arr: T[], offset = 0): T => arr[(seed + offset) % arr.length];

  const token = pick(SAMPLE_TOKEN_NAMES, 1);
  const chain = pick(CHAINS, 2);

  const risk: TokenRiskIndicators = {
    isHoneypot: seed % 13 === 0,
    isProxy: seed % 3 === 0,
    hasMintFunction: seed % 4 === 0,
    hasBlacklist: seed % 7 === 0,
    hasPauseFunction: seed % 5 === 0,
    ownerRenounced: seed % 2 === 0,
    liquidityLockedPercent: 20 + (seed % 80),
    top10HoldersPercent: 10 + (seed % 75),
    buyTaxPercent: seed % 9 === 0 ? 5 + (seed % 10) : 0,
    sellTaxPercent: seed % 11 === 0 ? 8 + (seed % 20) : 0,
    contractVerified: seed % 6 !== 0,
  };

  const { flaggedCount, checks } = summarizeTokenRisk(risk);

  return {
    contractAddress: contractAddress.trim(),
    tokenName: token.name,
    ticker: token.ticker,
    chain,
    risk,
    flaggedCount,
    checks,
    isDemo: true,
  };
}
