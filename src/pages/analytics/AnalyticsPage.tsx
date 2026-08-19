import React from 'react';
import { Badge } from '@/components/ui/Badge';
import AssessmentHistory from '@/components/analytics/AssessmentHistory';
import KpiCards from '@/components/analytics/KpiCards';
import ProficiencyGauge from '@/components/analytics/ProficiencyGauge';
import SkillRadar from '@/components/analytics/SkillRadar';

export const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-16">
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="primary" dot pulse>PERFORMANCE TELEMETRY</Badge>
            <span className="text-xs font-mono text-slate-400">Operator: Alex Chen</span>
          </div>
          <h1 className="font-display font-black text-3xl text-white">Performance Analytics</h1>
          <p className="text-sm text-slate-400 mt-2">Mastery telemetry, proficiency trends, and assessment history.</p>
        </div>
        <div className="text-left sm:text-right">
          <span className="text-[10px] font-mono text-primary block">STATUS</span>
          <span className="text-sm font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Live Sync Active
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <ProficiencyGauge />
        <SkillRadar />
        <KpiCards />
        <AssessmentHistory />
      </div>
    </div>
  );
};
