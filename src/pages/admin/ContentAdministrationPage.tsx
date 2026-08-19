import React from 'react';
import { Badge } from '@/components/ui/Badge';
import ModuleEditor from '@/components/content/ModuleEditor';
import NeuralPatterns from '@/components/content/NeuralPatterns';
import ReportTemplates from '@/components/content/ReportTemplates';
import ScamDefinitions from '@/components/content/ScamDefinitions';

export const ContentAdministrationPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-16">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="primary">ACADEMY CONTENT ADMINISTRATION</Badge>
            <span className="text-xs font-mono text-slate-400">Neural-linked education ecosystem</span>
          </div>
          <h1 className="font-display font-black text-3xl text-white">Content Administration</h1>
          <p className="text-sm text-slate-400 mt-2 max-w-2xl">
            Manage course modules, scam definitions, neural risk patterns, and report templates used throughout the academy.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2.5 rounded border border-primary/40 text-primary hover:bg-primary/10 text-xs font-mono font-bold">DEPLOY MODULES</button>
          <button className="px-4 py-2.5 rounded bg-primary text-[#00363d] hover:bg-primary-hover text-xs font-mono font-bold">NEW COURSE</button>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-4 space-y-6">
          <NeuralPatterns />
          <ScamDefinitions />
        </div>
        <div className="xl:col-span-8 space-y-6">
          <ModuleEditor />
          <ReportTemplates />
        </div>
      </div>
    </div>
  );
};
