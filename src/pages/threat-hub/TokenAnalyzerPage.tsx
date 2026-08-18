import React, { useState } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { mockTokenRisk } from '@/mock/data';

export const TokenAnalyzerPage: React.FC = () => {
  const [tokenAddress, setTokenAddress] = useState(mockTokenRisk.contractAddress);
  const [analyzing, setAnalyzing] = useState(false);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    setAnalyzing(true);
    setTimeout(() => setAnalyzing(false), 500);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container/70 border border-outline/70 p-6 rounded-md">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary">AUTOMATED TOKEN RISK EVALUATOR</Badge>
            <span className="text-xs font-mono text-slate-400">Honeypot & Blacklist Detector</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
            Token Risk & Liquidity Analyzer
          </h1>
        </div>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleScan} className="flex gap-3 max-w-2xl">
        <div className="flex-1">
          <Input
            placeholder="Paste Token Contract Address (0x...)"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            icon="search"
          />
        </div>
        <Button type="submit" size="md" loading={analyzing} icon="radar">
          Scan Token
        </Button>
      </form>

      {/* Token Analysis Report */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="fresnel" className="p-6 text-center space-y-4">
          <Badge variant="success" size="md">SAFE SECURITY POSTURE</Badge>
          <div>
            <div className="text-4xl font-display font-black text-primary">
              {mockTokenRisk.overallScore} / 100
            </div>
            <div className="text-xs font-mono text-slate-400 mt-1">OVERALL RESILIENCE SCORE</div>
          </div>
          <div className="p-3 bg-[#060e20] rounded border border-outline/60 text-xs font-mono space-y-1">
            <div className="text-white font-bold">{mockTokenRisk.tokenName} ({mockTokenRisk.ticker})</div>
            <div className="text-slate-400">{mockTokenRisk.chain}</div>
          </div>
        </Card>

        {/* Breakdown Matrix (2 cols) */}
        <div className="md:col-span-2 space-y-4">
          <Card variant="glass" className="p-6 space-y-4">
            <CardHeader className="mb-2">
              <CardTitle>Automated Security Checks</CardTitle>
            </CardHeader>

            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3 bg-[#060e20] rounded border border-outline flex items-center justify-between">
                <span>Honeypot Trap:</span>
                <span className="text-emerald-400 font-bold">NO (Clean)</span>
              </div>
              <div className="p-3 bg-[#060e20] rounded border border-outline flex items-center justify-between">
                <span>Liquidity Locked:</span>
                <span className="text-primary font-bold">{mockTokenRisk.liquidityLockedPercent}%</span>
              </div>
              <div className="p-3 bg-[#060e20] rounded border border-outline flex items-center justify-between">
                <span>Top 10 Concentration:</span>
                <span className="text-emerald-400 font-bold">{mockTokenRisk.top10HoldersPercent}% (Low)</span>
              </div>
              <div className="p-3 bg-[#060e20] rounded border border-outline flex items-center justify-between">
                <span>Blacklist Function:</span>
                <span className="text-emerald-400 font-bold">NONE</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
