import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { AddressBadge } from '@/components/shared/AddressBadge';
import { MasterCatalogDrawer } from '@/components/shared/MasterCatalogDrawer';
import { ALL_PAGE_CATALOG } from '@/config/pageCatalog';
import { Icon } from '@/components/ui/Icon';
import type { UserRole } from '@/types';

export const DashboardLayout: React.FC = () => {
  const { user, role, setRole, walletConnected, connectWallet } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const location = useLocation();

  // Navigation sections categorized by domain
  const navSections = [
    {
      title: 'Client Console',
      items: [
        { label: 'Dashboard', href: '/client/dashboard', icon: 'dashboard' },
        { label: 'New Audit Request', href: '/client/audits/new', icon: 'add_task', badge: 'NEW' },
        { label: 'Live Audit Tracker', href: '/client/audits/ZM-8492-NX/status', icon: 'timelapse' },
        { label: 'Dual-Pane Code Review', href: '/client/audits/ZM-8492-NX/review', icon: 'code' },
        { label: 'Vulnerability Triage', href: '/client/audits/ZM-8492-NX/triage', icon: 'bug_report' },
        { label: 'Final Report Generation', href: '/client/audits/ZM-8492-NX/report', icon: 'description' },
        { label: 'Neural Risk Assessment', href: '/risk-report', icon: 'warning' },
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
        { label: 'Security Leaderboard', href: '/leaderboard/security', icon: 'shield_locked' },
        { label: 'Performance Analytics', href: '/analytics', icon: 'analytics' },
        { label: 'Neural Scanner', href: '/scanner', icon: 'radar' },
      ],
    },
    {
      title: 'Threat Intelligence & Vaults',
      items: [
        { label: 'Skynet Threat Radar', href: '/threat-hub/skynet', icon: 'radar', badge: 'LIVE' },
        { label: 'Ecosystem Vitality', href: '/threat-hub/ecosystem', icon: 'public' },
        { label: 'Scam Detector', href: '/threat-hub/scam-detector', icon: 'policy', badge: 'NEW' },
        { label: 'Whale Alerts Terminal', href: '/threat-hub/whales', icon: 'tsunami', badge: 'HOT' },
        { label: 'Token Risk Analyzer', href: '/threat-hub/token-analyzer', icon: 'query_stats' },
        { label: 'Protocol Security Profile', href: '/threat-hub/protocols/nexus-defi', icon: 'verified_user' },
        { label: 'Security Vaults', href: '/threat-hub/vaults', icon: 'account_balance' },
      ],
    },
    {
      title: 'Governance & Academy',
      items: [
        { label: 'Protocol Governance', href: '/governance', icon: 'gavel' },
        { label: 'Neural Sandbox (ZAM-842)', href: '/governance/proposals/ZAM-842', icon: 'how_to_vote' },
        { label: 'Operator Skill Tree', href: '/profile/alex-chen', icon: 'psychology' },
        { label: 'Academy Course Library', href: '/courses', icon: 'library_books' },
        { label: 'Academy Course Player', href: '/academy/learn/crypto-security-101', icon: 'school' },
        { label: 'Assessment Quiz', href: '/academy/assessment/crs-101', icon: 'fact_check' },
        { label: 'Completion Certificate', href: '/academy/certificate/CERT-9981', icon: 'workspace_premium' },
      ],
    },
    {
      title: 'Admin Suite & Config',
      items: [
        { label: 'Admin Operations Overview', href: '/admin/overview', icon: 'admin_panel_settings' },
        { label: 'Content Administration', href: '/admin/content', icon: 'view_list' },
        { label: 'Security Operations Monitor', href: '/admin/security-monitor', icon: 'security' },
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

  return (
    <div className="min-h-screen bg-[#060e20] text-slate-100 flex flex-col font-sans selection:bg-primary/30 selection:text-primary">
      {/* Top Application Header */}
      <header className="sticky top-0 z-40 bg-[#060e20]/95 backdrop-blur-md border-b border-outline/70 h-14 flex items-center justify-between px-4 sm:px-6">
        {/* Left Side: Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-slate-400 hover:text-white p-1 rounded-sm hover:bg-surface-variant transition-colors cursor-pointer hidden md:block"
            title="Toggle Sidebar"
          >
            <Icon name={sidebarCollapsed ? 'menu_open' : 'menu'} size={20} />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-400 hover:text-white p-1 rounded-sm hover:bg-surface-variant transition-colors cursor-pointer md:hidden"
          >
            <Icon name="menu" size={20} />
          </button>

          <Link to="/client/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#0b1326] border border-primary/40 flex items-center justify-center text-primary shadow-[0_0_10px_rgba(0,218,243,0.3)]">
              <Icon name="shield" size={18} />
            </div>
            <span className="font-display font-bold text-base text-white tracking-wider hidden sm:inline">
              ZAMARON <span className="text-[10px] font-mono text-primary font-normal">TERMINAL</span>
            </span>
          </Link>

          {/* Node Health Pill */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded bg-[#0b1326] border border-outline/60 text-[11px] font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>NODE: ALPHA-01</span>
            <span className="text-slate-500">|</span>
            <span className="text-primary font-bold">12ms</span>
          </div>
        </div>

        {/* Right Side: Role Selector, Matrix Drawer Button, Wallet, Profile */}
        <div className="flex items-center gap-3">
          {/* Master matrix shortcut */}
          <button
            onClick={() => setCatalogOpen(true)}
            className="px-2.5 py-1 rounded bg-primary/10 border border-primary/40 hover:bg-primary/20 text-primary transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono font-bold shadow-[0_0_10px_rgba(0,218,243,0.2)]"
            title={`Open Master Navigation Matrix for all ${ALL_PAGE_CATALOG.length} screens`}
          >
            <Icon name="grid_view" size={16} />
            <span className="hidden sm:inline">{ALL_PAGE_CATALOG.length} Screens Matrix</span>
          </button>

          {/* Role Switcher */}
          <div className="hidden md:flex items-center gap-1 bg-[#0b1326] p-0.5 rounded border border-outline/60 text-[11px] font-mono">
            {(['CLIENT', 'AUDITOR', 'ADMIN'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                  role === r
                    ? 'bg-primary text-[#00363d] font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Wallet Address Chip */}
          {walletConnected && user?.walletAddress ? (
            <div className="hidden sm:flex items-center gap-1">
              <AddressBadge address={user.walletAddress} showLink={false} />
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="px-2.5 py-1 rounded bg-surface-variant text-xs font-mono text-primary border border-primary/30 hover:border-primary cursor-pointer"
            >
              Connect Node
            </button>
          )}

          {/* User Profile Pill */}
          <Link
            to="/profile/alex-chen"
            className="flex items-center gap-2 pl-2 border-l border-outline/50 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary p-0.5">
              <div className="w-full h-full rounded-full bg-[#060e20] flex items-center justify-center text-xs font-bold font-mono text-primary">
                AC
              </div>
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-semibold text-white leading-tight">{user?.name || 'Operator'}</div>
              <div className="text-[10px] font-mono text-primary">{user?.securityClearance || 'ALPHA'} CLEARANCE</div>
            </div>
          </Link>
        </div>
      </header>

      {/* Main Workspace Body: Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside
          className={`hidden md:flex flex-col bg-[#081024] border-r border-outline/70 transition-all duration-300 ${
            sidebarCollapsed ? 'w-16' : 'w-64'
          }`}
        >
          <div className="flex-1 overflow-y-auto cyber-scrollbar py-4 px-2 space-y-6">
            {navSections.map((section) => (
              <div key={section.title} className="space-y-1">
                {!sidebarCollapsed && (
                  <h4 className="px-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                    {section.title}
                  </h4>
                )}
                {section.items.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      title={sidebarCollapsed ? item.label : undefined}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-sm text-xs font-mono transition-all group ${
                        isActive
                          ? 'bg-primary text-[#00363d] font-bold shadow-[0_0_12px_rgba(0,218,243,0.3)]'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-[#0c162d]'
                      }`}
                    >
                      <Icon
                        name={item.icon}
                        size={18}
                        className={isActive ? 'text-[#00363d]' : 'text-slate-400 group-hover:text-primary'}
                      />
                      {!sidebarCollapsed && (
                        <span className="truncate flex-1">{item.label}</span>
                      )}
                      {!sidebarCollapsed && item.badge && (
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                            isActive
                              ? 'bg-[#00363d]/30 text-white'
                              : 'bg-primary/20 text-primary border border-primary/30'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Sidebar Bottom Quick Links */}
          <div className="p-3 border-t border-outline/50 bg-[#060e20]/60 space-y-1">
            <Link
              to="/"
              className="flex items-center gap-2 px-2 py-1.5 rounded text-xs font-mono text-slate-400 hover:text-white hover:bg-surface-variant transition-colors"
            >
              <Icon name="home" size={16} />
              {!sidebarCollapsed && <span>Public Portal</span>}
            </Link>
            <Link
              to="/support"
              className="flex items-center gap-2 px-2 py-1.5 rounded text-xs font-mono text-slate-400 hover:text-white hover:bg-surface-variant transition-colors"
            >
              <Icon name="support_agent" size={16} />
              {!sidebarCollapsed && <span>Command Support</span>}
            </Link>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative w-72 max-w-[80vw] bg-[#081024] border-r border-outline p-4 flex flex-col h-full z-10 overflow-y-auto cyber-scrollbar">
              <div className="flex items-center justify-between pb-4 border-b border-outline/60 mb-4">
                <span className="font-display font-bold text-white">ZAMARON Console</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-400 p-1 hover:text-white"
                >
                  <Icon name="close" size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {navSections.map((section) => (
                  <div key={section.title} className="space-y-1">
                    <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider px-2">
                      {section.title}
                    </h4>
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 rounded text-xs font-mono ${
                          location.pathname === item.href
                            ? 'bg-primary text-[#00363d] font-bold'
                            : 'text-slate-300 hover:bg-surface-variant'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon name={item.icon} size={18} />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="text-[9px] px-1 bg-primary/20 text-primary rounded">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto cyber-scrollbar p-4 sm:p-6 lg:p-8 bg-grid-cyber bg-[#060e20]">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Global Status Telemetry Ticker Bar */}
      <footer className="h-7 bg-[#040915] border-t border-outline/70 px-4 flex items-center justify-between text-[11px] font-mono text-slate-400 select-none">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            SKYNET RADAR: ACTIVE
          </span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden sm:inline">BLOCK: #21,894,012</span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:inline">TVP: $64.2 Billion</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCatalogOpen(true)}
            className="text-primary hover:underline flex items-center gap-1 cursor-pointer font-bold"
          >
            All {ALL_PAGE_CATALOG.length} Screens Matrix <Icon name="open_in_new" size={12} />
          </button>
        </div>
      </footer>

      {/* Master screen catalog drawer */}
      <MasterCatalogDrawer isOpen={catalogOpen} onClose={() => setCatalogOpen(false)} />
    </div>
  );
};
