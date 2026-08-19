import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';

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
    title: 'Security Leaderboard',
    sourceFile: 'security-leaderboard.tsx',
    route: '/threat-hub/leaderboard',
    domain: 'Intelligence & Threat Hub',
    description: 'Searchable, ranked project security scores with six-dimensional breakdown.',
  },
  {
    title: 'Project Security Profile',
    sourceFile: 'project-profile.tsx',
    route: '/threat-hub/projects/nexus-defi',
    domain: 'Intelligence & Threat Hub',
    description: 'Composite security score, radar dimensions, audits, monitors and token risk.',
  },
  {
    title: 'Security Incident Monitor',
    sourceFile: 'security-incidents.tsx',
    route: '/threat-hub/incidents',
    domain: 'Intelligence & Threat Hub',
    description: 'Real-time exploit, rugpull and breach alert feed with severity filters.',
  },
  {
    title: 'Protocol Security Profile (Legacy)',
    sourceFile: 'protocol-security-profile.html',
    route: '/threat-hub/protocols/nexus-defi',
    domain: 'Intelligence & Threat Hub',
    description: 'Legacy token analyzer route retained for backward compatibility.',
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

export const MasterCatalogDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [search, setSearch] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');
  const navigate = useNavigate();

  const domains = [
    'ALL',
    'Marketing',
    'Auth',
    'Client Portal',
    'Auditor Workspace',
    'Intelligence & Threat Hub',
    'Governance',
    'Academy',
    'Admin Operations',
  ];

  const filteredPages = ALL_PAGE_CATALOG.filter((p) => {
    const matchesDomain = selectedDomain === 'ALL' || p.domain === selectedDomain;
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.sourceFile.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.route.toLowerCase().includes(search.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  const handleNavigate = (route: string) => {
    navigate(route);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="ZAMARON Master Architecture Matrix"
      subtitle={`Catalog of all ${ALL_PAGE_CATALOG.length} verified templates and routes`}
      maxWidth="4xl"
    >
      <div className="space-y-4">
        {/* Search & Domain Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder="Search by page name, HTML filename, or route..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon="search"
            />
          </div>
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
            {domains.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDomain(d)}
                className={`px-2.5 py-1 rounded text-[11px] font-mono whitespace-nowrap cursor-pointer transition-colors ${
                  selectedDomain === d
                    ? 'bg-primary text-[#00363d] font-bold'
                    : 'bg-surface-variant text-slate-300 hover:bg-surface-container-highest'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Showing {filteredPages.length} of {ALL_PAGE_CATALOG.length} pages</span>
          <span className="text-primary font-bold">Vite + React 18 + Tailwind v4</span>
        </div>

        {/* Page List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-[55vh] overflow-y-auto cyber-scrollbar pr-1">
          {filteredPages.map((page) => (
            <div
              key={page.sourceFile}
              onClick={() => handleNavigate(page.route)}
              className="p-3 bg-[#0c1322] border border-outline/70 rounded hover:border-primary/60 hover:bg-[#111a30] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-display font-semibold text-sm text-white group-hover:text-primary transition-colors">
                    {page.title}
                  </span>
                  <Badge variant="primary" size="sm">
                    {page.domain}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 font-sans line-clamp-2">{page.description}</p>
              </div>

              <div className="flex items-center justify-between mt-3 pt-2 border-t border-outline/40 text-[10px] font-mono text-slate-500">
                <span className="truncate max-w-[180px] text-slate-400">{page.sourceFile}</span>
                <span className="text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1 font-bold">
                  {page.route} <Icon name="arrow_forward" size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
