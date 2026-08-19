import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Icon } from '@/components/ui/Icon';
import { StatCard } from '@/components/shared/StatCard';
import { ProjectCard } from '@/components/security/ProjectCard';
import { IncidentFeed } from '@/components/security/IncidentFeed';
import { DemoDataNotice } from '@/components/security/DemoDataNotice';
import { useLeaderboard } from '@/hooks/useLeaderboard';
import { useIncidents } from '@/hooks/useIncidents';
import { formatUsdShort } from '@/services/incidentService';
import type { ProjectCategory } from '@/types';

export const SecurityLeaderboardPage: React.FC = () => {
  const {
    results,
    allProjects,
    filters,
    chains,
    categories,
    setQuery,
    setCategory,
    setChain,
    setSortBy,
    toggleSortDir,
    reset,
  } = useLeaderboard();

  const { incidents, stats } = useIncidents();

  const avgScore =
    allProjects.length > 0
      ? (allProjects.reduce((sum, p) => sum + p.score, 0) / allProjects.length).toFixed(1)
      : '0';

  const criticalProjects = allProjects.filter((p) => p.tier === 'D' || p.tier === 'C').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container/70 border border-outline/70 p-6 rounded-md">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="primary" dot pulse>
              SECURITY LEADERBOARD
            </Badge>
            <span className="text-xs font-mono text-slate-400">
              {allProjects.length} projects ranked by composite score
            </span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
            Project Security Rankings
          </h1>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Compare Web3 projects across code security, operational resilience, governance, market
            stability and community trust.
          </p>
        </div>
      </div>

      <DemoDataNotice />

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Projects Tracked"
          value={allProjects.length}
          delta="Demo cohort"
          icon="radar"
          variant="fresnel"
        />
        <StatCard
          label="Average Score"
          value={`${avgScore} / 100`}
          delta="Weighted"
          icon="scoreboard"
          iconColor="text-primary"
          variant="glass"
        />
        <StatCard
          label="Critical-Risk Projects"
          value={criticalProjects}
          delta="Tier C or D"
          deltaType="negative"
          icon="gpp_bad"
          iconColor="text-error"
          variant="glass"
        />
        <StatCard
          label="Funds Lost (30d)"
          value={formatUsdShort(stats.totalFundsLost)}
          delta={`${stats.critical} critical incidents`}
          deltaType="negative"
          icon="payments"
          iconColor="text-orange-400"
          variant="glass"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leaderboard column */}
        <div className="lg:col-span-2 space-y-4">
          <Card variant="glass" className="p-5 space-y-4">
            <CardHeader className="mb-1">
              <CardTitle>Filter & Rank</CardTitle>
              <Button variant="ghost" size="sm" icon="restart_alt" onClick={reset}>
                Reset
              </Button>
            </CardHeader>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Input
                placeholder="Search name, symbol, address..."
                value={filters.query}
                onChange={(e) => setQuery(e.target.value)}
                icon="search"
              />
              <Select
                value={filters.category}
                onChange={(e) => setCategory(e.target.value as ProjectCategory | 'ALL')}
              >
                <option value="ALL">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c.replace(/_/g, ' ')}
                  </option>
                ))}
              </Select>
              <Select value={filters.chain} onChange={(e) => setChain(e.target.value)}>
                <option value="ALL">All Chains</option>
                {chains.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
              <div className="flex gap-2">
                <Select
                  value={filters.sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof filters.sortBy)}
                  className="flex-1"
                >
                  <option value="score">Sort: Score</option>
                  <option value="marketCap">Sort: Market Cap</option>
                  <option value="incidents">Sort: Risk Flags</option>
                  <option value="name">Sort: Name</option>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleSortDir}
                  title={filters.sortDir === 'desc' ? 'Descending' : 'Ascending'}
                >
                  <Icon name={filters.sortDir === 'desc' ? 'arrow_downward' : 'arrow_upward'} size={18} />
                </Button>
              </div>
            </div>
          </Card>

          <div className="space-y-3">
            {results.length === 0 ? (
              <Card variant="glass" className="p-8 text-center">
                <Icon name="search_off" size={32} className="text-slate-500 mx-auto mb-2" />
                <p className="text-sm text-slate-400 font-mono">
                  No projects match the current filters.
                </p>
              </Card>
            ) : (
              results.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  rank={filters.query || filters.category !== 'ALL' || filters.chain !== 'ALL' ? undefined : index + 1}
                />
              ))
            )}
          </div>
        </div>

        {/* Incidents sidebar */}
        <div className="space-y-4">
          <Card variant="fresnel" className="p-5 space-y-4">
            <CardHeader className="mb-1">
              <div className="flex items-center gap-2">
                <Icon name="crisis_alert" size={20} className="text-error" />
                <CardTitle>Recent Incidents</CardTitle>
              </div>
              <Badge variant={stats.ongoing > 0 ? 'critical' : 'success'} size="sm" dot={stats.ongoing > 0}>
                {stats.ongoing > 0 ? `${stats.ongoing} ONGOING` : 'ALL CONTAINED'}
              </Badge>
            </CardHeader>
            <IncidentFeed incidents={incidents} maxItems={5} />
          </Card>

          <Card variant="terminal" className="p-5 space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <Icon name="info" size={18} />
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider">How scoring works</h4>
            </div>
            <p className="text-[11px] font-mono text-slate-400 leading-relaxed">
              Each project is rated across six weighted dimensions (code security, fundamentals,
              operations, governance, market, community). Risk signals such as missing audits,
              anonymous teams, or active incidents apply deductions to the composite score.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SecurityLeaderboardPage;
