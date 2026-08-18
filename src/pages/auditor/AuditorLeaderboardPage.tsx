import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { mockAuditorLeaderboard } from '@/mock/data';

export const AuditorLeaderboardPage: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container/70 border border-outline/70 p-6 rounded-md">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary">NEXUS PROTOCOL CREDENTIALS</Badge>
            <span className="text-xs font-mono text-slate-400">Global Auditor Hall of Fame</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
            Global Auditor Leaderboard
          </h1>
        </div>
        <Badge variant="success" size="md">SEASON 4 ACTIVE</Badge>
      </div>

      <Card variant="glass" className="p-6 space-y-4">
        <div className="overflow-x-auto cyber-scrollbar">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-outline/70 text-slate-400 uppercase text-[10px]">
                <th className="pb-3 pr-4">Rank</th>
                <th className="pb-3 px-4">Auditor Profile</th>
                <th className="pb-3 px-4">Experience (XP)</th>
                <th className="pb-3 px-4">Verified Bugs Caught</th>
                <th className="pb-3 pl-4 text-right">Bounties Claimed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/40">
              {mockAuditorLeaderboard.map((auditor) => (
                <tr key={auditor.rank} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 pr-4">
                    <span
                      className={`inline-flex items-center justify-center w-7 h-7 rounded-full font-bold text-xs ${
                        auditor.rank === 1
                          ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/50'
                          : auditor.rank === 2
                          ? 'bg-slate-300/20 text-slate-300 border border-slate-300/50'
                          : auditor.rank === 3
                          ? 'bg-amber-600/20 text-amber-500 border border-amber-600/50'
                          : 'bg-surface-variant text-slate-400'
                      }`}
                    >
                      #{auditor.rank}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-display font-bold text-sm text-white">{auditor.name}</div>
                    <div className="text-[11px] text-slate-400">{auditor.handle}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-primary font-bold">{auditor.xp.toLocaleString()} XP</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-200">
                    {auditor.verifiedBugs} Bugs
                  </td>
                  <td className="py-3.5 pl-4 text-right font-bold text-emerald-400 font-display text-sm">
                    {auditor.bountiesEarned}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
