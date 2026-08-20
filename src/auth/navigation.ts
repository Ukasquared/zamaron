import type { UserRole } from '@/types';
import { canAccessPath } from '@/auth/rbac';

export interface DashboardNavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string;
}

export interface DashboardNavSection {
  title: string;
  items: DashboardNavItem[];
}

export const DASHBOARD_NAV_SECTIONS: DashboardNavSection[] = [
  {
    title: 'Client Console',
    items: [
      { label: 'Dashboard', href: '/client/dashboard', icon: 'dashboard' },
      { label: 'New Audit Request', href: '/client/audits/new', icon: 'add_task', badge: 'NEW' },
      { label: 'Live Audit Tracker', href: '/client/audits/ZM-8492-NX/status', icon: 'timelapse' },
      { label: 'Dual-Pane Code Review', href: '/client/audits/ZM-8492-NX/review', icon: 'code' },
      { label: 'Vulnerability Triage', href: '/client/audits/ZM-8492-NX/triage', icon: 'bug_report' },
      { label: 'Final Report Generation', href: '/client/audits/ZM-8492-NX/report', icon: 'description' },
      { label: 'Document Vault', href: '/client/vault', icon: 'lock' },
      { label: 'Checkout & Settlement', href: '/client/checkout', icon: 'credit_card' },
    ],
  },
  {
    title: 'Auditor Terminal',
    items: [
      { label: 'Auditor Queue', href: '/auditor/queue', icon: 'assignment_late', badge: '4' },
      { label: 'AI Neural Assistant', href: '/auditor/ai-terminal', icon: 'smart_toy' },
      { label: 'Forensic Bytecode', href: '/auditor/forensics', icon: 'terminal' },
      { label: 'Auditor Leaderboard', href: '/leaderboard/auditors', icon: 'military_tech' },
    ],
  },
  {
    title: 'Threat Intelligence & Vaults',
    items: [
      { label: 'Skynet Threat Radar', href: '/threat-hub/skynet', icon: 'radar', badge: 'LIVE' },
      { label: 'Ecosystem Vitality', href: '/threat-hub/ecosystem', icon: 'public' },
      { label: 'Security Leaderboard', href: '/threat-hub/leaderboard', icon: 'leaderboard' },
      { label: 'Project Profiles', href: '/threat-hub/projects/nexus-defi', icon: 'verified_user' },
      { label: 'Incident Monitor', href: '/threat-hub/incidents', icon: 'crisis_alert', badge: 'LIVE' },
      { label: 'Whale Alerts Terminal', href: '/threat-hub/whales', icon: 'tsunami', badge: 'HOT' },
      { label: 'Token Risk Analyzer', href: '/threat-hub/token-analyzer', icon: 'query_stats' },
      { label: 'Security Vaults', href: '/threat-hub/vaults', icon: 'account_balance' },
    ],
  },
  {
    title: 'Governance & Academy',
    items: [
      { label: 'Protocol Governance', href: '/governance', icon: 'gavel' },
      { label: 'Neural Sandbox (ZAM-842)', href: '/governance/proposals/ZAM-842', icon: 'how_to_vote' },
      { label: 'Operator Skill Tree', href: '/profile/alex-chen', icon: 'psychology' },
      { label: 'Academy Course Player', href: '/academy/learn/crypto-security-101', icon: 'school' },
      { label: 'Assessment Quiz', href: '/academy/assessment/crs-101', icon: 'fact_check' },
      { label: 'Completion Certificate', href: '/academy/certificate/CERT-9981', icon: 'workspace_premium' },
    ],
  },
  {
    title: 'Admin Suite & Config',
    items: [
      { label: 'Content Administration', href: '/admin/content', icon: 'view_list' },
      { label: 'Course Builder', href: '/admin/course-builder', icon: 'edit_note' },
      { label: 'Course Builder (Video+)', href: '/admin/course-builder-enhanced', icon: 'video_library' },
      { label: 'Token Risk Editor', href: '/admin/token-reports', icon: 'edit_document' },
      { label: 'Users & Protocols', href: '/admin/users-protocols', icon: 'manage_accounts' },
      { label: 'Security Configuration', href: '/admin/security-config', icon: 'admin_panel_settings' },
      { label: 'Alert Routing Matrix', href: '/admin/alerts', icon: 'cell_tower' },
      { label: 'Security Logs & Trail', href: '/admin/logs', icon: 'history' },
      { label: 'Tactical Log Filters', href: '/admin/logs-tactical', icon: 'filter_alt' },
      { label: 'Developer API Keys', href: '/admin/developers-api', icon: 'vpn_key' },
      { label: 'Payment Gateways', href: '/admin/gateways', icon: 'payments' },
      { label: 'Billing History Ledger', href: '/admin/billing', icon: 'receipt_long' },
      { label: 'Invoice Template', href: '/admin/invoices/ZM-8994-VX', icon: 'receipt' },
      { label: 'Refund Terminal', href: '/admin/refunds', icon: 'sync' },
    ],
  },
];

/** Navigation visibility is derived from the same route-permission map used by ProtectedRoute. */
export function getNavSectionsForRole(role: UserRole | null | undefined): DashboardNavSection[] {
  if (!role) return [];
  return DASHBOARD_NAV_SECTIONS.map((section) => ({
    ...section,
    items: section.items.filter((item) => canAccessPath(role, item.href)),
  })).filter((section) => section.items.length > 0);
}
