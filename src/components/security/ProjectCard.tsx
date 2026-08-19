import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { SecurityTierBadge } from './SecurityTierBadge';
import { TrustBadges } from './TrustBadges';
import type { ScoredProject } from '@/services/projectService';

export interface ProjectCardProps {
  project: ScoredProject;
  rank?: number;
}

function stageIndicator(stage: ScoredProject['stage']) {
  switch (stage) {
    case 'LIVE':
      return { dot: 'bg-emerald-400', label: 'Live' };
    case 'PRE_LAUNCH':
      return { dot: 'bg-amber-400', label: 'Pre-Launch' };
    case 'INCIDENT':
      return { dot: 'bg-error animate-pulse', label: 'Incident' };
    case 'DISCONTINUED':
      return { dot: 'bg-slate-500', label: 'Discontinued' };
  }
}

/** Compact project summary used on the security leaderboard. */
export const ProjectCard: React.FC<ProjectCardProps> = ({ project, rank }) => {
  const stage = stageIndicator(project.stage);

  return (
    <Link to={`/threat-hub/projects/${project.id}`} className="block group">
      <Card variant="glass" hoverEffect className="p-4 flex items-center gap-4">
        {rank !== undefined && (
          <div className="w-8 text-center shrink-0">
            <div className="font-display font-black text-lg text-slate-400 group-hover:text-primary transition-colors">
              {rank}
            </div>
          </div>
        )}

        {/* Logo / initials */}
        <div className="w-11 h-11 rounded bg-gradient-to-tr from-primary/30 to-secondary/30 border border-primary/40 flex items-center justify-center font-display font-black text-sm text-white shrink-0">
          {project.logoSeed}
        </div>

        {/* Identity */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-display font-bold text-sm text-white group-hover:text-primary transition-colors truncate">
              {project.name}
            </span>
            <span className="text-[10px] font-mono text-slate-500">{project.symbol}</span>
            <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-semibold ${
              project.stage === 'INCIDENT' ? 'text-error' : 'text-slate-400'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${stage.dot}`} />
              {stage.label}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] font-mono text-primary">{project.chain}</span>
            <span className="text-slate-600">·</span>
            <span className="text-[10px] font-mono text-slate-500">{project.category}</span>
          </div>
          <div className="mt-1.5">
            <TrustBadges badges={project.badges} size="sm" />
          </div>
        </div>

        {/* Score */}
        <div className="text-right shrink-0">
          <div className="font-display font-black text-2xl text-white leading-none">
            {project.score.toFixed(1)}
          </div>
          <div className="mt-1 flex justify-end">
            <SecurityTierBadge tier={project.tier} />
          </div>
          <div className="text-[10px] font-mono text-slate-500 mt-1">
            P{project.rankPercentile.toFixed(0)}
          </div>
        </div>

        <Icon
          name="chevron_right"
          size={20}
          className="text-slate-600 group-hover:text-primary transition-colors shrink-0"
        />
      </Card>
    </Link>
  );
};

export default ProjectCard;
