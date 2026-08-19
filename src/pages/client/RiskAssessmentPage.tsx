import React from 'react';
import { Badge } from '@/components/ui/Badge';
import ChatSidebar from '@/components/risk-report/ChatSidebar';
import NeuralRiskScoreCard from '@/components/risk-report/NeuralRiskScoreCard';
import RiskBadge from '@/components/risk-report/RiskBadge';
import StatusMetricCard from '@/components/risk-report/StatusMetricCard';
import ThreatVectorPanel from '@/components/risk-report/ThreatVectorPanel';
import { NEURAL_RISK_SCORE, STATUS_METRICS, TARGET_ENTITY } from '@/data/riskReportContent';

export const RiskAssessmentPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-16">
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="critical">NEURAL RISK REPORT</Badge>
            <span className="text-xs font-mono text-slate-400">Target: {TARGET_ENTITY.addressShort}</span>
          </div>
          <h1 className="font-display font-black text-3xl text-white">{TARGET_ENTITY.name} <span className="text-slate-500">({TARGET_ENTITY.ticker})</span></h1>
          <p className="text-sm text-slate-400 mt-2">Threat vectors, neural risk scoring, and AI-assisted remediation guidance.</p>
        </div>
        <RiskBadge label="High Risk" />
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NeuralRiskScoreCard {...NEURAL_RISK_SCORE} />
            {STATUS_METRICS.map((metric) => <StatusMetricCard key={metric.label} {...metric} />)}
          </div>
          <ThreatVectorPanel />
        </div>
        <div className="xl:col-span-4 min-h-[520px]">
          <ChatSidebar />
        </div>
      </div>
    </div>
  );
};
