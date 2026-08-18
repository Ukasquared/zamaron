export type AuditRow = {
  id: string;
  timestamp: string;
  entity: string;
  entityLabel: string;
  entityVariant: "primary" | "error" | "secondary";
  network: string;
  riskScore: string;
  riskVariant: "primary" | "error" | "secondary";
  status: string;
  statusVariant: "institutional" | "blacklisted" | "watchlist";
};

export type ThreatFeedItem = {
  id: string;
  level: "CRITICAL" | "ALERT" | "INTEL";
  message: string;
};
