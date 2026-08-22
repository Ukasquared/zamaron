import React from 'react';
import { GlassCard, GlassCardHeader, GlassCardTitle } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { StatCard } from '@/components/shared/StatCard';
import { LiveLogStream } from '@/components/shared/LiveLogStream';
import { mockSecurityLeaderboard } from '@/mock/data';

export const SkynetDashboardPage: React.FC = () => {
  const [refreshedAt, setRefreshedAt] = React.useState(() => new Date().toLocaleTimeString());
  const [exportNote, setExportNote] = React.useState<string | null>(null);
  
  const prelaunchProjects = [
    { name: 'NebulaNectar', symbol: 'NBN', score: '76.90', rating: 'BBB', sentiment: 'High', coverage: 'Med', date: '12/24/26', stage: 'Stage 0' },
    { name: 'PlasmaPulse', symbol: 'PLP', score: '60.31', rating: 'B', sentiment: 'High', coverage: 'Med', date: '12/24/26', stage: 'Stage 2' },
    { name: 'AetheriaSwap', symbol: 'AETH', score: '91.45', rating: 'AAA', sentiment: 'Very High', coverage: 'Full', date: '12/28/26', stage: 'Stage 3' },
    { name: 'HyperLend L2', symbol: 'HL2', score: '84.10', rating: 'AA', sentiment: 'Moderate', coverage: 'High', date: '01/05/27', stage: 'Stage 1' },
  ];

  const liveMonitoring = [
    { name: 'GalacticLink', score: '82.12', rating: 'A', mcap: '$9M', vol: '$26M', price: '$0.09876', change: '+1.28%', positive: true },
    { name: 'CipherCraft', score: '96.23', rating: 'AAA', mcap: '$789K', vol: '$726M', price: '$0.09876', change: '-1.28%', positive: false },
    { name: 'Nexus Synthetics', score: '89.52', rating: 'AA', mcap: '$45M', vol: '$112M', price: '$1.4280', change: '+4.92%', positive: true },
    { name: 'Aegis Staking Derivative', score: '94.80', rating: 'AAA', mcap: '$92M', vol: '$18M', price: '$3,420.10', change: '+2.15%', positive: true },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner */}
      <GlassCard
        variant="elevated"
        blur="xl"
        className="p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-white/10"
      >
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant="primary" dot pulse>
              SKYNET SURVEILLANCE RADAR
            </Badge>
            <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
              <Icon name="sensors" size={14} /> LIVE SENSORS: 128 NODES
            </span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
            Skynet Security Overview
          </h1>
          <p className="text-xs text-slate-400 font-sans mt-0.5 leading-relaxed">
            Continuous on-chain monitoring, automated Z-Score evaluations, and pre-launch risk telemetry.
            {exportNote ? ` ${exportNote}` : ` Snapshot ${refreshedAt}`}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="outline"
            size="sm"
            icon="refresh"
            onClick={() => {
              setRefreshedAt(new Date().toLocaleTimeString());
              setExportNote(null);
            }}
          >
            Refresh Telemetry
          </Button>
          <Button
            size="sm"
            icon="download"
            onClick={() => {
              const body = mockSecurityLeaderboard
                .map((row) => `${row.name},${row.zScore},${row.tvp},${row.auditedCount},${row.threatsBlocked}`)
                .join('\n');
              const blob = new Blob([`network,zScore,tvp,audits,blocked\n${body}`], { type: 'text/csv' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'skynet-intel-brief.csv';
              a.click();
              URL.revokeObjectURL(url);
              setExportNote(`Brief exported • ${refreshedAt}`);
            }}
          >
            Export Intel Brief
          </Button>
        </div>
      </GlassCard>

      {/* Top Level Metric KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Global Z-Score Posture"
          value="98.4 / 100"
          delta="Optimal Health"
          icon="radar"
          variant="fresnel"
        />
        <StatCard
          label="Total Value Guarded"
          value="$64.2 Billion"
          delta="+14.2% MoM"
          icon="shield"
          iconColor="text-emerald-400"
          variant="glass"
        />
        <StatCard
          label="Pre-Launch Verified"
          value="48 Protocols"
          delta="12 In Staging"
          icon="rocket_launch"
          iconColor="text-purple-400"
          variant="glass"
        />
        <StatCard
          label="Active Attack Mitigation"
          value="8,940 Blocked"
          delta="100% Intercept Rate"
          icon="gpp_bad"
          iconColor="text-red-400"
          variant="glass"
        />
      </div>

      {/* Middle Section: Pre-Launch Watchlist + Live Ecosystem Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pre-Launch Watchlist Card */}
        <GlassCard variant="default" blur="xl" className="p-6 space-y-4 border-white/10">
          <GlassCardHeader className="mb-2">
            <div className="flex items-center gap-2">
              <Icon name="rocket_launch" size={20} className="text-cyan-400" />
              <GlassCardTitle>Pre-Launch Watchlist</GlassCardTitle>
            </div>
            <Badge variant="outline" size="sm">STAGING RADAR</Badge>
          </GlassCardHeader>

          <div className="overflow-x-auto cyber-scrollbar">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase text-[10px]">
                  <th className="pb-3 pr-3">Project / Ticker</th>
                  <th className="pb-3 px-3">Z-Score & Tier</th>
                  <th className="pb-3 px-3">Sentiment / Date</th>
                  <th className="pb-3 pl-3 text-right">Audit Stage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {prelaunchProjects.map((p) => (
                  <tr key={p.name} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 pr-3">
                      <div className="font-bold text-white font-display text-sm">{p.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{p.symbol}</div>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-cyan-400 font-bold">{p.score}</span>
                        <Badge variant="primary" size="sm">{p.rating}</Badge>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="text-slate-300 font-semibold">{p.sentiment}</div>
                      <div className="text-[10px] text-slate-500">{p.date}</div>
                    </td>
                    <td className="py-3.5 pl-3 text-right">
                      <Badge
                        variant={p.stage === 'Stage 3' ? 'success' : p.stage === 'Stage 2' ? 'primary' : 'warning'}
                        size="sm"
                      >
                        {p.stage}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* Live Ecosystem Monitoring Card */}
        <GlassCard variant="default" blur="xl" className="p-6 space-y-4 border-white/10">
          <GlassCardHeader className="mb-2">
            <div className="flex items-center gap-2">
              <Icon name="language" size={20} className="text-emerald-400" />
              <GlassCardTitle>Live Ecosystem Monitoring</GlassCardTitle>
            </div>
            <Badge variant="success" size="sm" dot>ON-CHAIN FEED</Badge>
          </GlassCardHeader>

          <div className="overflow-x-auto cyber-scrollbar">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase text-[10px]">
                  <th className="pb-3 pr-3">Project</th>
                  <th className="pb-3 px-3">Rating</th>
                  <th className="pb-3 px-3">MCAP / Volume</th>
                  <th className="pb-3 pl-3 text-right">Price (24h)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {liveMonitoring.map((m) => (
                  <tr key={m.name} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 pr-3">
                      <div className="font-bold text-white font-display text-sm">{m.name}</div>
                      <div className="text-[10px] text-cyan-400 font-mono">{m.score}</div>
                    </td>
                    <td className="py-3.5 px-3">
                      <Badge variant="primary" size="sm">{m.rating}</Badge>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="text-white font-semibold">{m.mcap}</div>
                      <div className="text-[10px] text-slate-500">{m.vol} Vol</div>
                    </td>
                    <td className="py-3.5 pl-3 text-right">
                      <div className="font-bold text-white">{m.price}</div>
                      <div className={`text-[10px] font-bold flex items-center justify-end gap-0.5 ${m.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                        <Icon name={m.positive ? 'trending_up' : 'trending_down'} size={12} />
                        {m.change}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>

      {/* Lower Section: Chain Resilience Leaderboard + Live Threat Log Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chain Resilience Table (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <GlassCard variant="fresnel" blur="xl" className="p-6 space-y-4 border-cyan-500/30">
            <GlassCardHeader className="mb-2">
              <GlassCardTitle>Top Tier Blockchain Resilience Matrix</GlassCardTitle>
            </GlassCardHeader>

            <div className="overflow-x-auto cyber-scrollbar">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 uppercase text-[10px]">
                    <th className="pb-3 pr-3">Chain Network</th>
                    <th className="pb-3 px-3">Z-Score</th>
                    <th className="pb-3 px-3">TVP</th>
                    <th className="pb-3 px-3">Audits</th>
                    <th className="pb-3 pl-3 text-right">Threats Blocked</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {mockSecurityLeaderboard.map((item) => (
                    <tr key={item.name} className="hover:bg-white/5">
                      <td className="py-3 pr-3 font-semibold text-white">{item.name}</td>
                      <td className="py-3 px-3">
                        <span className="text-cyan-400 font-bold">{item.zScore}</span>
                      </td>
                      <td className="py-3 px-3 text-slate-300">{item.tvp}</td>
                      <td className="py-3 px-3 text-slate-400">{item.auditedCount}</td>
                      <td className="py-3 pl-3 text-right text-emerald-400 font-bold">
                        {item.threatsBlocked.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>

        {/* Live Attack Feed (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <LiveLogStream maxHeight="max-h-80" />
        </div>
      </div>
    </div>
  );
};
