import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { MasterCatalogDrawer } from '@/components/shared/MasterCatalogDrawer';
import { useAuth } from '@/context/AuthContext';
import { getDefaultRouteForRole } from '@/auth/rbac';

export const MarketingLayout: React.FC = () => {
  const [catalogOpen, setCatalogOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, role, logout } = useAuth();
  const consolePath = isAuthenticated ? getDefaultRouteForRole(role) : '/auth/login';

  const navLinks = [
    { label: 'Solutions', href: '/solutions/auditing' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Threat Hub', href: '/threat-hub/skynet' },
    { label: 'Academy', href: '/academy/learn/crypto-security-101' },
    { label: 'Support', href: '/support' },
  ];

  return (
    <div className="min-h-screen bg-[#060e20] text-slate-100 flex flex-col font-sans relative selection:bg-primary/30 selection:text-primary">
      {/* Top Banner */}
      <div className="bg-[#0b1326] border-b border-primary/20 px-4 py-1.5 text-center text-xs font-mono flex items-center justify-center gap-3">
        <span className="flex items-center gap-1.5 text-primary font-bold">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          NEXUS PROTOCOL ALPHA RELEASE
        </span>
        <span className="text-slate-400 hidden sm:inline">
          Institutional-Grade Smart Contract Auditing & AI Forensic Analysis
        </span>
        <button
          onClick={() => setCatalogOpen(true)}
          className="text-primary hover:text-cyan-300 underline font-semibold flex items-center gap-1 cursor-pointer"
        >
          View All 47 Screens Matrix <Icon name="grid_view" size={14} />
        </button>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-[#060e20]/90 backdrop-blur-md border-b border-outline/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded bg-[#0b1326] border border-primary/40 flex items-center justify-center text-primary group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(0,218,243,0.4)] transition-all">
              <Icon name="shield" size={24} />
            </div>
            <div>
              <span className="font-display font-black text-xl tracking-wider text-white">
                ZAMARON
              </span>
              <span className="text-[10px] font-mono block text-primary/80 tracking-widest leading-none">
                CRYSTALLINE NEXUS
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-mono tracking-wide transition-colors ${
                    isActive ? 'text-primary font-bold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCatalogOpen(true)}
              className="p-2 rounded bg-surface-variant/60 border border-outline hover:border-primary/50 text-slate-300 hover:text-white transition-colors cursor-pointer hidden sm:flex items-center gap-1.5 text-xs font-mono"
              title="Open Master Navigation Matrix"
            >
              <Icon name="grid_view" size={16} className="text-primary" />
              <span>47 Screens</span>
            </button>

            {isAuthenticated ? (
              <>
                <button
                  type="button"
                  onClick={logout}
                  className="text-xs font-mono text-slate-400 hover:text-white hidden sm:inline"
                >
                  End Session
                </button>
                <Link to={consolePath}>
                  <Button variant="primary" size="sm" icon="dashboard">
                    Open {role} Console
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/auth/login">
                  <Button variant="outline" size="sm" icon="terminal">
                    Terminal Access
                  </Button>
                </Link>
                <Link to="/auth/login">
                  <Button variant="primary" size="sm" icon="dashboard">
                    Launch Console
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Outlet */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Marketing Footer */}
      <footer className="bg-[#040915] border-t border-outline/70 pt-12 pb-8 mt-16 text-slate-400 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
            {/* Brand column */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <Icon name="shield" size={24} className="text-primary" />
                <span className="font-display font-bold text-lg text-white">ZAMARON</span>
              </div>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                Institutional-grade Web3 security, continuous formal verification, and AI-powered
                smart contract threat intelligence. Protecting over $64B in Total Value.
              </p>
              <div className="flex items-center gap-2 pt-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  All 128 Global Nodes Operational (99.99% Uptime)
                </span>
              </div>
            </div>

            {/* Links 1: Platform */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                Platform
              </h4>
              <ul className="space-y-2 text-xs">
                <li><Link to="/solutions/auditing" className="hover:text-primary">Smart Contract Auditing</Link></li>
                <li><Link to="/threat-hub/skynet" className="hover:text-primary">Skynet Threat Radar</Link></li>
                <li><Link to="/threat-hub/leaderboard" className="hover:text-primary">Security Leaderboard</Link></li>
                <li><Link to="/threat-hub/incidents" className="hover:text-primary">Incident Monitor</Link></li>
                <li><Link to="/threat-hub/whales" className="hover:text-primary">Whale Alerts Terminal</Link></li>
                <li><Link to="/threat-hub/token-analyzer" className="hover:text-primary">Token Risk Analyzer</Link></li>
                <li><Link to="/pricing" className="hover:text-primary">Audit Pricing & Tiers</Link></li>
              </ul>
            </div>

            {/* Links 2: Governance & Academy */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                Governance & Academy
              </h4>
              <ul className="space-y-2 text-xs">
                <li><Link to="/governance" className="hover:text-primary">Protocol Governance</Link></li>
                <li><Link to="/governance/proposals/ZAM-842" className="hover:text-primary">Active Proposals</Link></li>
                <li><Link to="/academy/learn/crypto-security-101" className="hover:text-primary">Zamaron Academy</Link></li>
                <li><Link to="/leaderboard/auditors" className="hover:text-primary">Auditor Leaderboard</Link></li>
                <li><Link to="/profile/alex-chen" className="hover:text-primary">Operator Profile</Link></li>
              </ul>
            </div>

            {/* Links 3: Console — only surface routes the current principal may open */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                Console
              </h4>
              <ul className="space-y-2 text-xs">
                <li><Link to={consolePath} className="hover:text-primary">Operator Console</Link></li>
                {(!isAuthenticated || role === 'CLIENT' || role === 'ADMIN') && (
                  <li><Link to="/client/dashboard" className="hover:text-primary">Client Console</Link></li>
                )}
                {isAuthenticated && (role === 'AUDITOR' || role === 'ADMIN') && (
                  <li><Link to="/auditor/queue" className="hover:text-primary">Auditor Ticket Queue</Link></li>
                )}
                {isAuthenticated && role === 'ADMIN' && (
                  <>
                    <li><Link to="/admin/logs" className="hover:text-primary">Security Audit Trail</Link></li>
                    <li><Link to="/admin/security-config" className="hover:text-primary">Security Matrix</Link></li>
                  </>
                )}
                <li><Link to="/support" className="hover:text-primary">Command Support</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-outline/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
            <p>© 2026 ZAMARON Protocol • Crystalline Nexus. All cryptographic rights reserved.</p>
            <div className="flex items-center gap-4 text-slate-500">
              <span>SHA-256 Verified</span>
              <span>TLS 2.0 Hardened</span>
              <span>WebAuthn FIDO2</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Master 47 Screens Catalog Drawer */}
      <MasterCatalogDrawer isOpen={catalogOpen} onClose={() => setCatalogOpen(false)} />
    </div>
  );
};
