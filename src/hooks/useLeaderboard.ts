import { useMemo, useState } from 'react';
import type { LeaderboardFilters, ProjectCategory } from '@/types';
import {
  filterAndRankProjects,
  getAllScoredProjects,
  getAvailableCategories,
  getAvailableChains,
  getDefaultFilters,
} from '@/services/projectService';

export function useLeaderboard() {
  const allProjects = useMemo(() => getAllScoredProjects(), []);
  const chains = useMemo(() => getAvailableChains(), []);
  const categories = useMemo(() => getAvailableCategories(), []);

  const [filters, setFilters] = useState<LeaderboardFilters>(getDefaultFilters());

  const results = useMemo(
    () => filterAndRankProjects(allProjects, filters),
    [allProjects, filters]
  );

  const setQuery = (query: string) => setFilters((f) => ({ ...f, query }));
  const setCategory = (category: ProjectCategory | 'ALL') =>
    setFilters((f) => ({ ...f, category }));
  const setChain = (chain: string | 'ALL') => setFilters((f) => ({ ...f, chain }));
  const setSortBy = (sortBy: LeaderboardFilters['sortBy']) =>
    setFilters((f) => ({ ...f, sortBy }));
  const toggleSortDir = () =>
    setFilters((f) => ({ ...f, sortDir: f.sortDir === 'asc' ? 'desc' : 'asc' }));

  const reset = () => setFilters(getDefaultFilters());

  return {
    allProjects,
    results,
    filters,
    chains,
    categories,
    setQuery,
    setCategory,
    setChain,
    setSortBy,
    toggleSortDir,
    reset,
  };
}
