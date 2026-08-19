export type RiskLevel = "Critical" | "Elevated" | "Safe" | "Clean" | "Flagged";

export type ThreatItem = {
  id: string;
  timeLabel: string;
  target: string; // hash or domain
  risk: RiskLevel;
};

export type ScanHistoryItem = {
  id: string;
  target: string;
  dateLabel: string;
  status: "Clean" | "Flagged";
  type: "contract" | "domain" | "wallet";
};

export type NetworkHealthStats = {
  engineStatus: string;
  scans24h: string;
  threatsBlocked: number;
};
