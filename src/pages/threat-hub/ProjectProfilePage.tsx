import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { Tabs } from '@/components/ui/Tabs';
import { AddressBadge } from '@/components/shared/AddressBadge';
import { RadarChart, type RadarDataPoint } from '@/components/shared/RadarChart';
import { SecurityScoreGauge } from '@/components/security/SecurityScoreGauge';
import { ScoreDimensionBar } from '@/components/security/ScoreDimensionBar';
import { SecurityTierBadge } from '@/components/security/SecurityTierBadge';
import { TrustBadges } from '@/components/security/TrustBadges';
import { ActiveMonitors } from '@/components/security/ActiveMonitors';
import { AuditHistoryList } from '@/components/security/AuditHistoryList';
import { TokenRiskChecks } from '@/components/security/TokenRiskChecks';
import { IncidentFeed } from '@/components/security/IncidentFeed';
import { DemoDataNotice } from '@/components/security/DemoDataNotice';
import { useProject } from '@/hooks/useProjects';
import { useIncidents } from '@/hooks/useIncidents';
import { scanToken } from '@/services/tokenScanService';
import { formatUsdShort } from '@/services/incidentService';

const STAGE_VARIANT = {
  LIVE: 'success',
  PRE_LAUNCH: 'warning',
  INCIDENT: 'critical',
  DISCONTINUED: 'outline',
} as const;

export const ProjectProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = useProject(id);
  const { incidents } = useIncidents();
  const [tab, setTab] = React.useState('overview');

  if (!project) {
    return (
      <div className="space-y-6 pb-12">
        <Link
          to="/threat-hub/leaderboard"
          className="inline-flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-white"
        >
          <Icon name="arrow_back" size={16} /> Back to Leaderboard
        </Link>
        <Card variant="glass" className="p-12 text-center">
          <Icon name="search_off" size={40} className="text-slate-500 mx-auto mb-3" />
          <h2 className="font-display font-bold text-xl text-white">Project Not Found</h2>
          <p className="text-sm text-slate-400 mt-1">
            No security profile matches the id “{id}”.
          </p>
          <Link to="/threat-hub/leaderboard" className="inline-block mt-4">
            <Button size="sm" icon="leaderboard">View Leaderboard</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const radarData: RadarDataPoint[] = project.dimensions.map((d) => ({
    axis: d.label.split(' ')[0],
    value: d.value,
  }));

  // The project token scan is derived deterministically from its contract
  // address via the mock tokenScanService.
  const tokenScan = scanToken(project.contractAddress);

  const projectIncidents = incidents.filter(
    (i) => i.projectName.toLowerCase() === project.name.toLowerCase()
  );

  const marketCapNum = parseMarketCap(project.marketCap);

  return (
    <div className="space-y-6 pb-12">
      {/* Back link */}
      <Link
        to="/threat-hub/leaderboard"
        className="inline-flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-white"
      >
        <Icon name="arrow_back" size={16} /> Back to Leaderboard
      </Link>

      {/* Identity banner */}
      <div className="bg-surface-container/70 border border-outline/70 rounded-md p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-tr from-primary/30 to-secondary/30 border border-primary/40 flex items-center justify-center font-display font-black text-xl text-white shrink-0">
              {project.logoSeed}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
                  {project.name}
                </h1>
                <span className="text-sm font-mono text-slate-400">({project.symbol})</span>
                <Badge variant={STAGE_VARIANT[project.stage]} size="sm" dot>
                  {project.stage.replace(/_/g, ' ')}
                </Badge>
              </div>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <Icon name="link" size={13} className="text-primary" /> {project.chain}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="category" size={13} className="text-primary" /> {project.category.replace(/_/g, ' ')}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="language" size={13} className="text-primary" /> {project.website}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="calendar_month" size={13} className="text-primary" /> Launched {project.launchedAt}
                </span>
              </div>
              <div className="mt-3">
                <AddressBadge address={project.contractAddress} showLink={false} />
              </div>
            </div>
          </div>

          {/* Score gauge */}
          <div className="flex flex-col items-center gap-2 bg-[#060e20] border border-outline/60 rounded-md p-4">
            <SecurityScoreGauge score={project.score} tier={project.tier} size={150} />
            <SecurityTierBadge tier={project.tier} showLabel size="md" />
            <div className="text-[10px] font-mono text-slate-500">
              Percentile P{project.rankPercentile.toFixed(0)}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-outline/50">
          <TrustBadges badges={project.badges} />
        </div>
      </div>

      <DemoDataNotice>
        This profile is a simulated demonstration. The score, badges, monitors and token checks are
        generated from mock data — not a live audit. Do not rely on it for investment or security
        decisions.
      </DemoDataNotice>

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 font-mono">
        {[
          { label: 'Market Cap', value: project.marketCap, icon: 'paid' },
          { label: '24h Volume', value: project.volume24h, icon: 'bar_chart' },
          { label: 'TVL', value: project.tvl ?? '—', icon: 'shield' },
          { label: 'Social Sentiment', value: `${project.socialSentiment}%`, icon: 'mood' },
        ].map((s) => (
          <div key={s.label} className="bg-surface border border-outline/70 rounded p-3">
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 uppercase tracking-wider">
              <Icon name={s.icon} size={13} className="text-primary" /> {s.label}
            </div>
            <div className="text-lg font-bold text-white mt-1">{s.value}</div>
          </div>
        ))}
      </div>

      <Tabs
        variant="pills"
        activeTab={tab}
        onChange={setTab}
        items={[
          { id: 'overview', label: 'Overview', icon: 'dashboard' },
          { id: 'code', label: 'Code & Audits', icon: 'code' },
          { id: 'token', label: 'Token Risk', icon: 'token' },
          { id: 'incidents', label: 'Incidents', icon: 'crisis_alert', badge: projectIncidents.length },
        ]}
      />

      {tab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card variant="glass" className="lg:col-span-2 p-6 space-y-5">
            <CardHeader className="mb-1">
              <CardTitle>Security Dimensions</CardTitle>
              <Badge variant="primary" size="sm">WEIGHTED</Badge>
            </CardHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 relative">
              {project.dimensions.map((d) => (
                <ScoreDimensionBar key={d.key} dimension={d} />
              ))}
            </div>

            {project.deductions.length > 0 && (
              <div className="pt-4 border-t border-outline/50 space-y-2">
                <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Icon name="trending_down" size={15} className="text-error" /> Risk Deductions
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.deductions.map((d) => (
                    <span
                      key={d.label}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-error/40 bg-error/10 text-error text-[11px] font-mono"
                    >
                      {d.label}
                      <span className="font-bold">−{d.points}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Card>

          <Card variant="fresnel" className="p-6 flex flex-col items-center gap-3">
            <CardTitle className="self-start">Posture Radar</CardTitle>
            <RadarChart data={radarData} size={260} />
            <p className="text-[10px] font-mono text-slate-500 text-center">
              Six-axis composite security posture
            </p>
          </Card>

          <Card variant="glass" className="lg:col-span-3 p-6 space-y-4">
            <CardHeader className="mb-1">
              <CardTitle>Active Monitors</CardTitle>
              <Badge variant="success" size="sm" dot>24/7 SURVEILLANCE</Badge>
            </CardHeader>
            <ActiveMonitors monitors={project.monitors} />
          </Card>
        </div>
      )}

      {tab === 'code' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card variant="glass" className="p-6 space-y-4">
            <CardHeader className="mb-1">
              <CardTitle>Audit History</CardTitle>
              <Badge variant="primary" size="sm">{project.auditHistory.length} REPORTS</Badge>
            </CardHeader>
            <AuditHistoryList audits={project.auditHistory} />
          </Card>

          <Card variant="glass" className="p-6 space-y-4">
            <CardHeader className="mb-1">
              <CardTitle>Verification & Trust Signals</CardTitle>
            </CardHeader>
            <TrustBadges badges={project.badges} size="md" />
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded bg-[#060e20] border border-outline/60">
                <div className="text-slate-400 text-[10px] uppercase">Code Security</div>
                <div className="text-primary font-bold text-lg">
                  {project.dimensions.find((d) => d.key === 'codeSecurity')?.value}
                </div>
              </div>
              <div className="p-3 rounded bg-[#060e20] border border-outline/60">
                <div className="text-slate-400 text-[10px] uppercase">Market Cap Rank</div>
                <div className="text-white font-bold text-lg">
                  {marketCapNum > 0 ? formatUsdShort(marketCapNum) : '—'}
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-outline/50 flex gap-2">
              <Button variant="outline" size="sm" icon="download">Download Report</Button>
              <Button size="sm" icon="shield">Request Re-Audit</Button>
            </div>
          </Card>
        </div>
      )}

      {tab === 'token' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card variant="glass" className="lg:col-span-2 p-6">
            <CardHeader className="mb-4">
              <div>
                <CardTitle>Token Risk Scan</CardTitle>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  {tokenScan.tokenName} ({tokenScan.ticker}) · {tokenScan.chain}
                </p>
              </div>
              <Badge variant={tokenScan.flaggedCount >= 4 ? 'critical' : tokenScan.flaggedCount > 0 ? 'warning' : 'success'} size="sm">
                {tokenScan.flaggedCount} FLAGS
              </Badge>
            </CardHeader>
            <TokenRiskChecks result={tokenScan} />
          </Card>

          <Card variant="terminal" className="p-6 space-y-3 self-start">
            <div className="flex items-center gap-2 text-primary">
              <Icon name="terminal" size={18} />
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider">Scan Engine</h4>
            </div>
            <p className="text-[11px] font-mono text-slate-400 leading-relaxed">
              Contract heuristics inspect ownership, mint/pause/blacklist capabilities, proxy
              upgradeability, liquidity locks, holder concentration and tax parameters.
            </p>
            <div className="text-[10px] font-mono text-amber-300/90 border-t border-outline/40 pt-3">
              ⚠ Simulated scan — no bytecode was actually analyzed. Wire the tokenScanService to a
              real analyzer for production.
            </div>
          </Card>
        </div>
      )}

      {tab === 'incidents' && (
        <div className="space-y-4">
          {projectIncidents.length > 0 ? (
            <IncidentFeed incidents={projectIncidents} />
          ) : (
            <Card variant="glass" className="p-8 text-center">
              <Icon name="verified_user" size={36} className="text-emerald-400 mx-auto mb-2" />
              <h3 className="font-display font-bold text-lg text-white">No Recorded Incidents</h3>
              <p className="text-sm text-slate-400 mt-1 font-mono">
                No exploits, rugpulls or breaches are recorded for this project in the demo dataset.
              </p>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

function parseMarketCap(value: string): number {
  if (!value || value === '—') return 0;
  const n = parseFloat(value.replace(/[$,]/g, ''));
  if (/B/i.test(value)) return n * 1_000_000_000;
  if (/M/i.test(value)) return n * 1_000_000;
  return Number.isNaN(n) ? 0 : n;
}

export default ProjectProfilePage;
