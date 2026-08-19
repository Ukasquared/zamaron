import { useMemo } from 'react';
import { getAllScoredProjects, getProjectById, type ScoredProject } from '@/services/projectService';

/** Returns the full scored, percentile-ranked project list. */
export function useProjects(): ScoredProject[] {
  return useMemo(() => getAllScoredProjects(), []);
}

/** Returns a single scored project by id, or undefined if it doesn't exist. */
export function useProject(id: string | undefined): ScoredProject | undefined {
  return useMemo(() => (id ? getProjectById(id) : undefined), [id]);
}
