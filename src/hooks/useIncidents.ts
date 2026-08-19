import { useMemo, useState } from 'react';
import {
  filterIncidents,
  getAllIncidents,
  getIncidentStats,
  type IncidentFilter,
} from '@/services/incidentService';

export function useIncidents() {
  const incidents = useMemo(() => getAllIncidents(), []);
  const stats = useMemo(() => getIncidentStats(incidents), [incidents]);

  const [severity, setSeverity] = useState<IncidentFilter>('ALL');
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () => filterIncidents(incidents, severity, query),
    [incidents, severity, query]
  );

  return { incidents, filtered, stats, severity, setSeverity, query, setQuery };
}
