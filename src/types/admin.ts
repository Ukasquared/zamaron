export type AdminStat = {
  id: string;
  label: string;
  value: string;
  icon: string;
  iconColor: string;
  trend?: string;
  trendIcon?: string;
  trendColor?: string;
  borderTop?: string;
  valueColor?: string;
};

export type RegistryEntityType = "operative" | "protocol" | "suspicious" | "blacklisted";

export type RegistryRow = {
  id: string;
  type: RegistryEntityType;
  name: string;
  subtitle: string;
  initials?: string;
  gradient?: string;
  clearance: string;
  clearanceVariant: "level" | "standard" | "revoked" | "terminated";
  status: string;
  statusVariant: "verified" | "monitoring" | "suspicious" | "blacklisted";
  riskPercent: number;
  riskLabel: string;
  riskVariant: "minimal" | "moderate" | "critical" | "maximal";
  lastSync: string;
  lastSyncUrgent?: boolean;
  action: "menu" | "isolate" | "restore";
};

export type ActivityItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  variant: "success" | "error" | "update";
  icon: string;
};
