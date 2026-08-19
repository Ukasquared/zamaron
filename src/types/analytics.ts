export type KpiCard = {
  id: string;
  label: string;
  value: string;
  delta: string;
  icon: string;
  borderColor: "primary" | "secondary";
  iconColor: string;
  deltaColor: string;
};

export type AssessmentRow = {
  id: string;
  moduleId: string;
  name: string;
  timestamp: string;
  score: string;
  proficiency: "MASTER" | "ELITE" | "EXPERT";
};

export type MetricCard = {
  id: string;
  label: string;
  value: string;
  badge?: string;
  badgeVariant?: "primary" | "secondary" | "cyan";
  icon?: string;
  type: "sparkline" | "progress" | "status";
  sparklineHeights?: number[];
  progress?: number;
  description?: string;
};

export type ProficiencyStats = {
  score: number;
  status: string;
  title: string;
  description: string;
  highlight: string;
  globalRank: string;
  xpEarned: string;
  streaks: string;
};
