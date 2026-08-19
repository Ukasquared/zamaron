import React from 'react';
import { Badge } from '@/components/ui/Badge';
import BannerStats from '@/components/ecosystem/BannerStats';
import ClusterTelemetry from '@/components/ecosystem/ClusterTelemetry';
import NeuralAccuracy from '@/components/ecosystem/NeuralAccuracy';
import ScannerLoad from '@/components/ecosystem/ScannerLoad';
import SystemAlerts from '@/components/ecosystem/SystemAlerts';
import TrafficHeatmap from '@/components/ecosystem/TrafficHeatmap';

export const EcosystemPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-16">
      <header>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="primary" dot pulse>NETWORK TELEMETRY</Badge>
          <span className="text-xs font-mono text-slate-400">128 global nodes synchronized</span>
        </div>
        <h1 className="font-display font-black text-3xl text-white">Ecosystem Health Monitor</h1>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl">
          Real-time telemetry, neural model performance, scanner load, traffic patterns, and operational alerts across the ZAMARON backbone.
        </p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <ClusterTelemetry />
          <NeuralAccuracy />
          <ScannerLoad />
          <TrafficHeatmap />
        </div>
        <div className="xl:col-span-4">
          <SystemAlerts />
        </div>
      </div>

      <BannerStats />
    </div>
  );
};
