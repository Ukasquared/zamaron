import React from 'react';
import { Badge } from '@/components/ui/Badge';
import AuditHistory from '@/components/scanner/AuditHistory';
import AuditStats from '@/components/scanner/AuditStats';
import RiskMap from '@/components/scanner/RiskMap';
import ScanSearch from '@/components/scanner/ScanSearch';
import ThreatFeed from '@/components/scanner/ThreatFeed';

export const ScannerPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-20">
      <header className="text-center">
        <div className="flex justify-center mb-2">
          <Badge variant="primary" dot pulse>SCAM DETECTOR PROTOCOL</Badge>
        </div>
        <h1 className="font-display font-black text-3xl text-white">Neural Contract Scanner</h1>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto mt-2">
          Deploy heuristic neural analysis for smart contract auditing, phishing pattern recognition, and global risk cluster monitoring.
        </p>
      </header>

      <ScanSearch />
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8"><RiskMap /></div>
        <div className="xl:col-span-4"><AuditStats /></div>
        <div className="xl:col-span-8"><AuditHistory /></div>
      </div>
      <ThreatFeed />
    </div>
  );
};
