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

// ---------------------------------------------------------------------------
// Security Intelligence — Skynet-style project security profiles & scoring
// ---------------------------------------------------------------------------

/** The six weighted categories that compose a project's composite security score. */
export type ScoreDimensionKey =
  | "codeSecurity"
  | "fundamentalHealth"
  | "operationalResilience"
  | "governanceStrength"
  | "marketStability"
  | "communityTrust";

export interface ScoreDimension {
  key: ScoreDimensionKey;
  label: string;
  /** 0-100, higher is safer / more robust. */
  value: number;
  /** Relative weight used when computing the composite score. */
  weight: number;
  /** Short human-readable explanation of what this score reflects. */
  description: string;
}

export type SecurityTier = "AAA" | "AA" | "A" | "BBB" | "BB" | "B" | "C" | "D";

export type ProjectCategory =
  | "DEX"
  | "LENDING"
  | "LAYER2"
  | "STAKING"
  | "MEME"
  | "BRIDGE"
  | "NFT"
  | "INFRASTRUCTURE";

export type ProjectStage = "PRE_LAUNCH" | "LIVE" | "INCIDENT" | "DISCONTINUED";

export interface TrustBadge {
  type: "AUDIT" | "KYC" | "BUG_BOUNTY" | "VERIFIED_CONTRACT" | "FORMAL_VERIFICATION";
  label: string;
  /** Short supporting detail, e.g. auditor name or KYC level. */
  detail?: string;
  verified: boolean;
}

export interface AuditHistoryEntry {
  id: string;
  auditor: string;
  date: string;
  scope: string;
  criticalFindings: number;
  highFindings: number;
  reportUrl?: string;
  status: "PUBLISHED" | "DRAFT" | "PARTIAL";
}

export type MonitorTarget = "WEBSITE" | "CODE_REPOSITORY" | "SMART_CONTRACT" | "SOCIAL_MEDIA";
export type MonitorStatus = "ACTIVE" | "INACTIVE" | "ALERT";

export interface ActiveMonitor {
  target: MonitorTarget;
  label: string;
  status: MonitorStatus;
  lastChecked: string;
  detail?: string;
}

export interface TokenRiskIndicators {
  isHoneypot: boolean;
  isProxy: boolean;
  hasMintFunction: boolean;
  hasBlacklist: boolean;
  hasPauseFunction: boolean;
  ownerRenounced: boolean;
  liquidityLockedPercent: number;
  top10HoldersPercent: number;
  buyTaxPercent: number;
  sellTaxPercent: number;
  contractVerified: boolean;
}

export interface SecurityProject {
  id: string;
  name: string;
  symbol: string;
  category: ProjectCategory;
  chain: string;
  stage: ProjectStage;
  logoSeed: string;
  description: string;
  contractAddress: string;
  website: string;
  /** Social / community signal, 0-100. */
  socialSentiment: number;
  marketCap: string;
  volume24h: string;
  tvl?: string;
  launchedAt: string;
  dimensions: ScoreDimension[];
  badges: TrustBadge[];
  auditHistory: AuditHistoryEntry[];
  monitors: ActiveMonitor[];
  tokenRisk: TokenRiskIndicators;
}

/** Incident / exploit alert feed entry (rugpulls, hacks, exploits). */
export type IncidentSeverity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
export type IncidentType =
  | "EXPLOIT"
  | "RUGPULL"
  | "PHISHING"
  | "BRIDGE_HACK"
  | "ORACLE_MANIPULATION"
  | "FLASH_LOAN"
  | "PRIVATE_KEY_COMPROMISE";

export interface SecurityIncident {
  id: string;
  timestamp: string;
  type: IncidentType;
  severity: IncidentSeverity;
  projectName: string;
  chain: string;
  fundsLostUsd: number;
  summary: string;
  txHash?: string;
  status: "ONGOING" | "CONTAINED" | "UNDER_INVESTIGATION" | "RESOLVED";
}

export interface LeaderboardFilters {
  query: string;
  category: ProjectCategory | "ALL";
  chain: string | "ALL";
  sortBy: "score" | "marketCap" | "incidents" | "name";
  sortDir: "asc" | "desc";
}

export interface SecurityScoreResult {
  score: number;
  tier: SecurityTier;
  rankPercentile: number;
  dimensions: ScoreDimension[];
  /** Risk-based deductions applied (e.g. anonymous team, active incident). */
  deductions: { label: string; points: number }[];
}
