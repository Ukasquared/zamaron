export interface NavLink {
  label: string;
  href: string;
}

export interface TrustBadgeData {
  icon: string;
  label: string;
  iconColorClass: string;
}

export interface FeatureData {
  icon: string;
  eyebrow: string;
  eyebrowColorClass: string;
  title: string;
  titleColorClass: string;
  description: string;
  iconBgClass: string;
  iconBorderClass: string;
  glowClass: string;
  /** True for the middle "featured" card that floats up and gets a glow blob */
  offset?: boolean;
}

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'sm' | 'lg';

// --- Risk Report page ---

export interface SidebarNavItemData {
  icon: string;
  label: string;
  href: string;
  active?: boolean;
}

export interface StatusMetricData {
  icon: string;
  statusIcon: string;
  label: string;
  value: string;
  description: string;
}

export type ThreatSeverity = 'critical' | 'warning';

export interface ThreatItemData {
  severity: ThreatSeverity;
  title: string;
  description: string;
  /** Lines of a code snippet, rendered monospace, one per line */
  code?: string[];
}

export interface TextRun {
  text: string;
  bold?: boolean;
}

export interface ChatMessageData {
  sender: 'ai' | 'user';
  senderLabel: string;
  /** Each entry is a paragraph, made up of one or more text runs */
  paragraphs: TextRun[][];
}

// --- Courses dashboard page ---

export interface DashboardNavItemData {
  icon: string;
  label: string;
  href: string;
  active?: boolean;
}

export interface FilterTagData {
  label: string;
  active?: boolean;
}

export type CourseAccent = 'neutral' | 'primary' | 'secondary';

export interface CourseData {
  title: string;
  description: string;
  hours: string;
  level: string;
  accent: CourseAccent;
  imageUrl: string;
  imageAlt: string;
}

export type UserRole = 'CLIENT' | 'AUDITOR' | 'ADMIN' | 'STUDENT';
export type SecurityClearance = 'ALPHA' | 'BETA' | 'GAMMA' | 'OPERATOR';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  walletAddress: string;
  avatarUrl?: string;
  rank?: string;
  xp?: number;
  certificationsCount?: number;
  securityClearance: SecurityClearance;
}

export type SeverityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFORMATIONAL';
export type AuditStatus = 'QUEUED' | 'SCANNING' | 'IN_REVIEW' | 'VERIFIED' | 'COMPLETED';

export interface AuditRequest {
  id: string;
  projectName: string;
  protocolType: string;
  targetRepo: string;
  commitHash: string;
  submittedAt: string;
  status: AuditStatus;
  leadAuditor?: string;
  progressPercent: number;
  findingsCount: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
  };
  tier: 'STANDARD' | 'PROFESSIONAL' | 'ENTERPRISE';
  tvlProtected?: string;
  ownerId?: string;
  ownerName?: string;
  attachments?: string[];
}

export interface AuditFinding {
  id: string;
  title: string;
  severity: SeverityLevel;
  category: string;
  swcCode?: string;
  location: string;
  lineRange: string;
  description: string;
  remediation: string;
  status: 'OPEN' | 'CONFIRMED' | 'RESOLVED' | 'FALSE_POSITIVE';
  codeSnippet?: string;
  notes?: string;
}

export interface WhaleAlert {
  id: string;
  timestamp: string;
  txHash: string;
  fromAddress: string;
  toAddress: string;
  tokenSymbol: string;
  tokenAmount: string;
  usdValue: number;
  chain: 'ETH' | 'SOL' | 'BSC' | 'AVAX' | 'ARB';
  riskScore: number;
  flagType: 'WHALE_ACCUMULATION' | 'LIQUIDITY_DRAIN' | 'BRIDGE_OUTFLOW' | 'SUSPICIOUS_MINT';
}

export interface TokenRiskAnalysis {
  tokenName: string;
  ticker: string;
  contractAddress: string;
  chain: string;
  overallScore: number; // 0-100 (higher = safer)
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  liquidityLockedPercent: number;
  top10HoldersPercent: number;
  isHoneypot: boolean;
  hasMintFunction: boolean;
  hasBlacklist: boolean;
  hasProxy: boolean;
  ownerAddress: string;
}

export interface GovernanceProposal {
  id: string;
  proposalNumber: string;
  title: string;
  author: string;
  createdDate: string;
  endDate: string;
  status: 'ACTIVE' | 'PASSED' | 'REJECTED' | 'EXECUTING';
  summary: string;
  forVotes: number;
  againstVotes: number;
  abstainVotes: number;
  quorumPercent: number;
  quorumTarget: number;
  userVote?: 'FOR' | 'AGAINST' | 'ABSTAIN';
}

export interface AcademyCourse {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: 'SMART_CONTRACT' | 'DEFI_SECURITY' | 'FORENSICS' | 'OPCODES';
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'ELITE';
  durationMinutes: number;
  modulesCount: number;
  xpReward: number;
  progressPercent: number;
  thumbnail: string;
  instructor: string;
}

export interface SecurityLogEntry {
  id: string;
  timestamp: string;
  severity: 'CRIT' | 'WARN' | 'INFO';
  eventSource: string;
  actor: string;
  action: string;
  ipAddress: string;
  status: 'BLOCKED' | 'ALLOWED' | 'FLAGGED' | 'RESOLVED';
  hash: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string;
  isExternal?: boolean;
}

// Re-export the security intelligence domain types so they are available
// through the `@/types` barrel used across the app.
export type {
  ScoreDimensionKey,
  ScoreDimension,
  SecurityTier,
  ProjectCategory,
  ProjectStage,
  TrustBadge,
  AuditHistoryEntry,
  MonitorTarget,
  MonitorStatus,
  ActiveMonitor,
  TokenRiskIndicators,
  SecurityProject,
  IncidentSeverity,
  IncidentType,
  SecurityIncident,
  LeaderboardFilters,
  SecurityScoreResult,
} from './security';
