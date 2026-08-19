export type UserRole = 'CLIENT' | 'AUDITOR' | 'ADMIN' | 'STUDENT';

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
  securityClearance: 'ALPHA' | 'BETA' | 'GAMMA' | 'OPERATOR';
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
  overallScore: number;
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
