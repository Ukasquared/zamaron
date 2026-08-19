import type {
  LeaderboardFilters,
  ProjectCategory,
  SecurityProject,
} from '@/types';
import { DEMO_PROJECTS } from '@/data/securityData';
import { assignPercentiles, computeScore } from './securityScoreService';

/**
 * Project data access layer.
 *
 * Today this reads from the in-memory DEMO_PROJECTS dataset. The interface is
 * intentionally async-friendly so it can be replaced by a real API / on-chain
 * indexer call (e.g. a Skynet-style security-score endpoint) without touching
 * the UI layer.
 */

export interface ScoredProject extends SecurityProject {
  score: number;
  tier: ReturnType<typeof computeScore>['tier'];
  rankPercentile: number;
  deductions: { label: string; points: number }[];
}

function parseMarketCap(value: string): number {
  if (!value || value === '—') return 0;
  const trimmed = value.replace(/[$,]/g, '');
  const num = parseFloat(trimmed);
  if (Number.isNaN(num)) return 0;
  if (/B/i.test(value)) return num * 1_000_000_000;
  if (/M/i.test(value)) return num * 1_000_000;
  if (/K/i.test(value)) return num * 1_000;
  return num;
}

export function scoreProject(project: SecurityProject): Omit<ScoredProject, 'rankPercentile'> {
  const result = computeScore(project);
  return {
    ...project,
    score: result.score,
    tier: result.tier,
    deductions: result.deductions,
  };
}

/** Returns the full scored + percentile-ranked project list. */
export function getAllScoredProjects(): ScoredProject[] {
  const scored = DEMO_PROJECTS.map(scoreProject);
  return assignPercentiles(scored).sort((a, b) => b.score - a.score);
}

export function getProjectById(id: string): ScoredProject | undefined {
  // Percentiles are relative to the cohort, so compute against the full set.
  const all = getAllScoredProjects();
  return all.find((p) => p.id === id);
}

export function getAvailableChains(): string[] {
  return Array.from(new Set(DEMO_PROJECTS.map((p) => p.chain))).sort();
}

export function getAvailableCategories(): ProjectCategory[] {
  return Array.from(new Set(DEMO_PROJECTS.map((p) => p.category))).sort();
}

export function getDefaultFilters(): LeaderboardFilters {
  return {
    query: '',
    category: 'ALL',
    chain: 'ALL',
    sortBy: 'score',
    sortDir: 'desc',
  };
}

export function filterAndRankProjects(
  projects: ScoredProject[],
  filters: LeaderboardFilters
): ScoredProject[] {
  const q = filters.query.trim().toLowerCase();

  const filtered = projects.filter((p) => {
    if (filters.category !== 'ALL' && p.category !== filters.category) return false;
    if (filters.chain !== 'ALL' && p.chain !== filters.chain) return false;
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.symbol.toLowerCase().includes(q) ||
      p.contractAddress.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.chain.toLowerCase().includes(q)
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    let cmp = 0;
    switch (filters.sortBy) {
      case 'score':
        cmp = a.score - b.score;
        break;
      case 'marketCap':
        cmp = parseMarketCap(a.marketCap) - parseMarketCap(b.marketCap);
        break;
      case 'incidents':
        cmp = b.deductions.length - a.deductions.length;
        break;
      case 'name':
        cmp = a.name.localeCompare(b.name);
        break;
    }
    return filters.sortDir === 'asc' ? cmp : -cmp;
  });

  return sorted;
}

// ---- Async seam for future real integration ------------------------------
//
// export async function fetchProjects(): Promise<ScoredProject[]> {
//   const res = await fetch('/api/security/projects');
//   if (!res.ok) throw new Error('Failed to load projects');
//   return res.json();
// }
//
// The hooks below can be swapped to use these async methods once a backend
// exists; components remain unchanged.
