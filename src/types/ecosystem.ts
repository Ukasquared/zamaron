export type ClusterMetric = {
  id: string;
  label: string;
  value: string;
  percent: number;
  color: "cyan" | "secondary";
};

export type ScannerNode = {
  id: string;
  name: string;
  status: "Optimized" | "High Load" | "Idle";
  loadPercent: number;
};

export type SystemAlert = {
  id: string;
  category: string;
  categoryVariant: "critical" | "security" | "update" | "maintenance";
  timeLabel: string;
  title: string;
  description: string;
  actions?: boolean;
  dimmed?: boolean;
};

export type BannerStat = {
  id: string;
  label: string;
  value: string;
  icon: string;
  iconVariant: "cyan" | "secondary" | "tertiary" | "error";
};
