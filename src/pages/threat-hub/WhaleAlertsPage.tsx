import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AddressBadge } from '@/components/shared/AddressBadge';
import { mockWhaleAlerts } from '@/mock/data';

export const WhaleAlertsPage: React.FC = () => {
  const [filterChain, setFilterChain] = useState<string>('ALL');

  const filtered = mockWhaleAlerts.filter((w) => {
    if (filterChain === 'ALL') return true;
    return w.chain === filterChain;
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container/70 border border-outline/70 p-6 rounded-md">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="warning" dot pulse>
              HIGH-NET-WORTH SURVEILLANCE
            </Badge>
            <span className="text-xs font-mono text-slate-400">Liquidity Movement Radar</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
            Whale Alerts & Liquidity Feed
          </h1>
        </div>

        <div className="flex items-center gap-1 bg-[#060e20] p-1 rounded border border-outline font-mono text-xs">
          {['ALL', 'ETH', 'SOL', 'BSC'].map((ch) => (
            <button
              key={ch}
              onClick={() => setFilterChain(ch)}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                filterChain === ch ? 'bg-primary text-[#00363d] font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {ch}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map((alert) => (
          <Card
            key={alert.id}
            variant={alert.flagType === 'LIQUIDITY_DRAIN' ? 'fresnel' : 'glass'}
            hoverEffect
            className="p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <Badge
                variant={
                  alert.flagType === 'LIQUIDITY_DRAIN'
                    ? 'critical'
                    : alert.flagType === 'WHALE_ACCUMULATION'
                    ? 'success'
                    : 'warning'
                }
                size="sm"
              >
                {alert.flagType.replace('_', ' ')}
              </Badge>
              <span className="text-xs font-mono text-slate-400">{alert.timestamp}</span>
            </div>

            <div>
              <div className="font-display font-black text-2xl text-white">
                {alert.tokenAmount} {alert.tokenSymbol}
              </div>
              <div className="text-xs font-mono text-primary mt-0.5">
                ≈ ${alert.usdValue.toLocaleString()} USD
              </div>
            </div>

            <div className="space-y-1.5 pt-3 border-t border-outline/50 font-mono text-xs text-slate-400">
              <div className="flex justify-between">
                <span>From:</span>
                <AddressBadge address={alert.fromAddress} />
              </div>
              <div className="flex justify-between">
                <span>To:</span>
                <AddressBadge address={alert.toAddress} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
