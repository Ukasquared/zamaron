export interface PageEntry {
  title: string;
  sourceFile: string;
  route: string;
  domain:
    | 'Marketing'
    | 'Auth'
    | 'Client Portal'
    | 'Auditor Workspace'
    | 'Intelligence & Threat Hub'
    | 'Governance'
    | 'Academy'
    | 'Admin Operations';
  description: string;
}

export const ALL_PAGE_CATALOG: PageEntry[] = [
  // Module 1: Marketing
  {
    title: 'Enterprise Security Solutions',
    sourceFile: 'enterprise-security-solution.html',
    route: '/',
    domain: 'Marketing',
    description: 'Enterprise smart contract protection, formal verification, threat monitoring.',
  },
  {
    title: 'Smart Contract Auditing Methodology',
    sourceFile: 'enterprise-security-auditing.html',
    route: '/solutions/auditing',
    domain: 'Marketing',
    description: '4-stage auditing pipeline overview and institutional security verification.',
  },
  {
    title: 'Pricing & Services Matrix',
    sourceFile: 'pricing-auditing.html',
    route: '/pricing',
    domain: 'Marketing',
    description: 'Tiered audit pricing (Standard, Professional, Enterprise).',
  },
  {
    title: 'Command Center Support',
    sourceFile: 'support-center.html',
    route: '/support',
    domain: 'Marketing',
    description: 'Diagnostic status, ticket submission, and knowledge base.',
  },

  // Module 2: Auth
  {
    title: 'Terminal Access Login',
    sourceFile: 'login-terminal.html',
    route: '/auth/login',
    domain: 'Auth',
    description: 'Operator authentication with WebAuthn passkey and interactive parallax grid.',
  },
  {
    title: 'Secure Access Terminal',
    sourceFile: 'secure-access-terminal.html',
    route: '/auth/secure-gate',
    domain: 'Auth',
    description: 'Hardware enclave and secondary access verification terminal.',
  },
  {
    title: 'Operator Induction',
    sourceFile: 'operator-induction.html',
    route: '/auth/induction',
    domain: 'Auth',
    description: 'Cryptographic identity onboarding with password complexity evaluator.',
  },
  {
    title: 'Operator Induction (Sign Up)',
    sourceFile: 'operator-indution-sign-up.html',
    route: '/auth/induction-signup',
    domain: 'Auth',
    description: 'Wallet-enabled operator induction variant.',
  },

  // Module 3: Client Portal
  {
    title: 'Client Audit Dashboard',
    sourceFile: 'client-audit-dashboard.html',
    route: '/client/dashboard',
    domain: 'Client Portal',
    description: 'Security posture overview, live vulnerability breakdown, active audit lists.',
  },
  {
    title: 'Request New Security Audit',
    sourceFile: 'request-new-security-audit.html',
    route: '/client/audits/new',
    domain: 'Client Portal',
    description: 'Audit submission wizard with drag-and-drop repository/code uploader.',
  },
  {
    title: 'Live Audit Status Tracker',
    sourceFile: 'live-audit-tracker.html',
    route: '/client/audits/ZM-8492-NX/status',
    domain: 'Client Portal',
    description: 'Real-time 4-phase audit timeline tracker and streaming telemetry logs.',
  },
  {
    title: 'Dual-Pane Code Review',
    sourceFile: 'dual-pane-code-review.html',
    route: '/client/audits/ZM-8492-NX/review',
    domain: 'Client Portal',
    description: 'Split-screen Solidity code viewer with SWC vulnerability annotations.',
  },
  {
    title: 'Vulnerability Triage Panel',
    sourceFile: 'vunerability-triage-panel.html',
    route: '/client/audits/ZM-8492-NX/triage',
    domain: 'Client Portal',
    description: 'In-depth vulnerability classification, CVSS slider, and remediation notes.',
  },
  {
    title: 'Final Report Generation',
    sourceFile: 'final-report-generation.html',
    route: '/client/audits/ZM-8492-NX/report',
    domain: 'Client Portal',
    description: 'Verified findings ledger, cryptographic SHA-256 stamp, PDF export.',
  },
  {
    title: 'Secure Document Vault',
    sourceFile: 'secure-document-vault.html',
    route: '/client/vault',
    domain: 'Client Portal',
    description: 'Encrypted document vault with versioned report archives.',
  },
  {
    title: 'Audit Payment Checkout',
    sourceFile: 'audit-payment-checkout.html',
    route: '/client/checkout',
    domain: 'Client Portal',
    description: 'Multi-rail crypto and wire settlement checkout.',
  },

  // Module 4: Auditor Workspace
  {
    title: 'Auditor Ticket Queue',
    sourceFile: 'auditor-ticket-queue.html',
    route: '/auditor/queue',
    domain: 'Auditor Workspace',
    description: 'Pending security review queue with bounty values, priority filters.',
  },
  {
    title: 'AI Neural Assistant Terminal',
    sourceFile: 'ai-mentor-fornsic-terminal.html',
    route: '/auditor/ai-terminal',
    domain: 'Auditor Workspace',
    description: 'AI code assistant for incident response, decompilation, and triage.',
  },
  {
    title: 'Advanced Forensic Analysis',
    sourceFile: 'advance-forensid-analysis.html',
    route: '/auditor/forensics',
    domain: 'Auditor Workspace',
    description: 'Bytecode disassembly, opcode traces, and automated vulnerability heuristics.',
  },
  {
    title: 'Global Auditor Leaderboard',
    sourceFile: 'global-auditor-leaderboard.html',
    route: '/leaderboard/auditors',
    domain: 'Auditor Workspace',
    description: 'Auditor XP rankings, verified bug count, and earnings leaderboard.',
  },
  {
    title: 'Global Security Leaderboard',
    sourceFile: 'global-security-leaderboard.html',
    route: '/leaderboard/security',
    domain: 'Auditor Workspace',
    description: 'Top blockchain ecosystems ranked by TVL protected and security posture.',
  },

  // Module 5: Intelligence & Threat Hub
  {
    title: 'Skynet Security Dashboard',
    sourceFile: 'skynet-security-dashboard.html',
    route: '/threat-hub/skynet',
    domain: 'Intelligence & Threat Hub',
    description: 'Live global threat radar, Z-Score analysis, and pre-launch watchlists.',
  },
  {
    title: 'Ecosystem Health Monitor',
    sourceFile: 'ecosystem-health-monitor.html',
    route: '/threat-hub/ecosystem',
    domain: 'Intelligence & Threat Hub',
    description: 'Node latency charts, network vitality, and real-time threat feed.',
  },
  {
    title: 'Whale Alerts Terminal',
    sourceFile: 'whale-alert-notification center.html',
    route: '/threat-hub/whales',
    domain: 'Intelligence & Threat Hub',
    description: 'High-net-worth liquidity flow surveillance and volume intensity heatmap.',
  },
  {
    title: 'Token Risk Analyzer',
    sourceFile: 'token-risk-analizer.html',
    route: '/threat-hub/token-analyzer',
    domain: 'Intelligence & Threat Hub',
    description: 'Honeypot detection, liquidity locks, and holder concentration analysis.',
  },
  {
    title: 'Protocol Security Profile',
    sourceFile: 'protocol-security-profile.html',
    route: '/threat-hub/protocols/nexus-defi',
    domain: 'Intelligence & Threat Hub',
    description: 'Radar security dimensions and historical audit resolution timeline.',
  },
  {
    title: 'Security Vaults Overview',
    sourceFile: 'security-vault.html',
    route: '/threat-hub/vaults',
    domain: 'Intelligence & Threat Hub',
    description: 'Protected asset balances, insurance coverage, and transaction traces.',
  },

  // Module 6: Governance
  {
    title: 'Protocol Governance',
    sourceFile: 'protocol-governance.html',
    route: '/governance',
    domain: 'Governance',
    description: 'Active DAO proposals, voting power metrics, and vote history.',
  },
  {
    title: 'Neural Sandbox Voting (ZAM-842)',
    sourceFile: 'neural-sandbox-environment.html',
    route: '/governance/proposals/ZAM-842',
    domain: 'Governance',
    description: 'Proposal debate, real-time quorum progress, and cryptographic voting terminal.',
  },
  {
    title: 'Operator Profile & Progressive Vault',
    sourceFile: 'user-profile-progressive-vault.html',
    route: '/profile/alex-chen',
    domain: 'Governance',
    description: 'Skill tree progression map, certification vault, and mastery radar.',
  },

  // Module 7: Academy
  {
    title: 'Academy Learner Preview',
    sourceFile: 'learner-preview-mode.html',
    route: '/academy/learn/crypto-security-101',
    domain: 'Academy',
    description: 'Interactive course player, video canvas, transcripts, module index.',
  },
  {
    title: 'Academy Final Assessment',
    sourceFile: 'final-assessment-preview.html',
    route: '/academy/assessment/crs-101',
    domain: 'Academy',
    description: 'Smart contract vulnerability quiz engine with code snippet questions.',
  },
  {
    title: 'Certificate of Completion Template',
    sourceFile: 'certificate-of-comp-template.html',
    route: '/academy/certificate/CERT-9981',
    domain: 'Academy',
    description: 'Cryptographically anchored graduation certificate with export view.',
  },

  // Module 8: Admin Operations
  {
    title: 'Academy Content Administration',
    sourceFile: 'content-administration.html',
    route: '/admin/content',
    domain: 'Admin Operations',
    description: 'Manage courses, modules, and documentation catalog.',
  },
  {
    title: 'Course Creation Terminal',
    sourceFile: 'course-creation-terminal.html',
    route: '/admin/course-builder',
    domain: 'Admin Operations',
    description: 'Course metadata, curriculum modules builder, and media uploader.',
  },
  {
    title: 'Course Builder (Video Enhanced)',
    sourceFile: 'course-creation-terminal-video-enhance.html',
    route: '/admin/course-builder-enhanced',
    domain: 'Admin Operations',
    description: 'Video timestamping and rich interactive lesson editor.',
  },
  {
    title: 'Token Risk Report Editor',
    sourceFile: 'token-risk-report.html',
    route: '/admin/token-reports',
    domain: 'Admin Operations',
    description: 'Risk score calibration, parameter adjustments, and flag triggers.',
  },
  {
    title: 'User & Protocol Management',
    sourceFile: 'user-protocol-management.html',
    route: '/admin/users-protocols',
    domain: 'Admin Operations',
    description: 'Auditor registry, network gas thresholds, and protocol parameters.',
  },
  {
    title: 'Protocol Security Configuration',
    sourceFile: 'sedurity-config.html',
    route: '/admin/security-config',
    domain: 'Admin Operations',
    description: 'FIDO2 hardening, auto-mitigation, IP whitelists, emergency overrides.',
  },
  {
    title: 'Alert Configuration Matrix',
    sourceFile: 'admin-alert-system.html',
    route: '/admin/alerts',
    domain: 'Admin Operations',
    description: 'DDoS thresholds, webhooks, and channel notification routing matrix.',
  },
  {
    title: 'Security Logs & Audit Trail',
    sourceFile: 'security-logs-audit-trail.html',
    route: '/admin/logs',
    domain: 'Admin Operations',
    description: 'System audit logs, severity filters, threat mitigation timeline.',
  },
  {
    title: 'Security Logs (Tactical Filters)',
    sourceFile: 'Security-Logs-Audit-Trail-Tactical-Filters.html',
    route: '/admin/logs-tactical',
    domain: 'Admin Operations',
    description: 'Faceted search by actor, date range, and event source.',
  },
  {
    title: 'Developer Management & API Keys',
    sourceFile: 'developer-management-api.html',
    route: '/admin/developers-api',
    domain: 'Admin Operations',
    description: 'API key provisioning, rate limits, and git repository deploy keys.',
  },
  {
    title: 'Payment Gateway Configuration',
    sourceFile: 'payment-gateway-configuration.html',
    route: '/admin/gateways',
    domain: 'Admin Operations',
    description: 'Configure high-performance payment rails and token settlement.',
  },
  {
    title: 'Billing History & Transaction Log',
    sourceFile: 'billing-history-transaction-log.html',
    route: '/admin/billing',
    domain: 'Admin Operations',
    description: 'Master billing ledger, revenue analytics, invoice logs.',
  },
  {
    title: 'Billing Invoice Template',
    sourceFile: 'billing-invoice-template.html',
    route: '/admin/invoices/ZM-8994-VX',
    domain: 'Admin Operations',
    description: 'Cryptographic invoice statement with QR payment proof.',
  },
  {
    title: 'Refund Management Terminal',
    sourceFile: 'refund-management-terminal.html',
    route: '/admin/refunds',
    domain: 'Admin Operations',
    description: 'Multi-sig authorization queue for transaction reversals.',
  },
];
