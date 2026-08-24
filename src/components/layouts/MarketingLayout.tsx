import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { MasterCatalogDrawer } from '@/components/shared/MasterCatalogDrawer';
import { useAuth } from '@/context/AuthContext';
import { getDefaultRouteForRole } from '@/auth/rbac';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import { Navbar } from '@/components/ui/Navigation/Navbar';

export const MarketingLayout: React.FC = () => {
  const [catalogOpen, setCatalogOpen] = useState(false);
  const { isAuthenticated, role } = useAuth();
  const consolePath = isAuthenticated ? getDefaultRouteForRole(role) : '/signin';

  return (
    <div className="min-h-screen bg-[#060e20] text-slate-100 flex flex-col font-sans relative selection:bg-cyan-500/30 selection:text-cyan-300">

      {/* Main Navbar with Glassmorphism */}
      <Navbar />

      {/* Main Outlet */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Marketing Footer */}
      <footer className="bg-[#040915] border-t border-white/10 pt-16 pb-10 text-slate-400 font-sans relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
            {/* Brand column */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0b1326] border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Icon name="shield" size={20} />
                </div>
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
                <li><Link to="/solutions/auditing" className="hover:text-cyan-300 transition-colors">Smart Contract Auditing</Link></li>
                <li><Link to="/threat-hub/skynet" className="hover:text-cyan-300 transition-colors">Skynet Threat Radar</Link></li>
                <li><Link to="/threat-hub/leaderboard" className="hover:text-cyan-300 transition-colors">Security Leaderboard</Link></li>
                <li><Link to="/threat-hub/incidents" className="hover:text-cyan-300 transition-colors">Incident Monitor</Link></li>
                <li><Link to="/threat-hub/whales" className="hover:text-cyan-300 transition-colors">Whale Alerts Terminal</Link></li>
                <li><Link to="/threat-hub/token-analyzer" className="hover:text-cyan-300 transition-colors">Token Risk Analyzer</Link></li>
                <li><Link to="/pricing" className="hover:text-cyan-300 transition-colors">Audit Pricing & Tiers</Link></li>
              </ul>
            </div>

            {/* Links 2: Governance & Academy */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                Governance & Academy
              </h4>
              <ul className="space-y-2 text-xs">
                <li><Link to="/governance" className="hover:text-cyan-300 transition-colors">Protocol Governance</Link></li>
                <li><Link to="/governance/proposals/ZAM-842" className="hover:text-cyan-300 transition-colors">Active Proposals</Link></li>
                <li><Link to="/academy/learn/crypto-security-101" className="hover:text-cyan-300 transition-colors">Zamaron Academy</Link></li>
                <li><Link to="/leaderboard/auditors" className="hover:text-cyan-300 transition-colors">Auditor Leaderboard</Link></li>
                <li><Link to="/profile/alex-chen" className="hover:text-cyan-300 transition-colors">Operator Profile</Link></li>
              </ul>
            </div>

            {/* Links 3: Console */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                Console
              </h4>
              <ul className="space-y-2 text-xs">
                <li><Link to={consolePath} className="hover:text-cyan-300 transition-colors">Operator Console</Link></li>
                {(!isAuthenticated || role === 'CLIENT' || role === 'ADMIN') && (
                  <li><Link to="/client/dashboard" className="hover:text-cyan-300 transition-colors">Client Console</Link></li>
                )}
                {isAuthenticated && (role === 'AUDITOR' || role === 'ADMIN') && (
                  <li><Link to="/auditor/queue" className="hover:text-cyan-300 transition-colors">Auditor Ticket Queue</Link></li>
                )}
                {isAuthenticated && role === 'ADMIN' && (
                  <>
                    <li><Link to="/admin/logs" className="hover:text-cyan-300 transition-colors">Security Audit Trail</Link></li>
                    <li><Link to="/admin/security-config" className="hover:text-cyan-300 transition-colors">Security Matrix</Link></li>
                  </>
                )}
                <li><Link to="/support" className="hover:text-cyan-300 transition-colors">Command Support</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
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
