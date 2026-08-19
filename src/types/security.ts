export type SecurityStat = {
  id: string;
  label: string;
  value: string;
  icon: string;
  valueColor: string;
  iconColor: string;
  borderClass?: string;
};

export type LogStatus =
  | "COMMITTED"
  | "REJECTED"
  | "EXECUTED"
  | "AUTHORIZED"
  | "SYNC_OK"
  | "THROTTLED";

export type LogEntry = {
  id: string;
  timestamp: string;
  actor: string;
  actorVariant: "admin" | "unknown" | "system";
  source: string;
  sourceVariant: "normal" | "error";
  action: string;
  actionVariant: "normal" | "error";
  status: LogStatus;
  traceId: string;
};
