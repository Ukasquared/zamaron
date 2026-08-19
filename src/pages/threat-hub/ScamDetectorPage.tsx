import React from 'react';
import { Badge } from '@/components/ui/Badge';
import HeroSearch from '@/components/scam-detector/HeroSearch';
import MyHistory from '@/components/scam-detector/MyHistory';
import NetworkHealth from '@/components/scam-detector/NetworkHealth';
import ThreatFeed from '@/components/scam-detector/ThreatFeed';

export const ScamDetectorPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-16">
      <header>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="warning" dot pulse>SCAM DETECTOR</Badge>
          <span className="text-xs font-mono text-slate-400">Heuristic threat intelligence</span>
        </div>
        <h1 className="font-display font-black text-3xl text-white">Scan a Contract or Domain</h1>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl">
          Detect rug pulls, phishing patterns, liquidity drains, and suspicious wallet behavior before you interact.
        </p>
      </header>

      <HeroSearch />
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8"><ThreatFeed /></div>
        <div className="xl:col-span-4 space-y-6">
          <NetworkHealth />
          <MyHistory />
        </div>
      </div>
    </div>
  );
};
