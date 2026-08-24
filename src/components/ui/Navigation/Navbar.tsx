import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { NavDropdown } from './NavDropdown';
import { MegaMenuColumn } from './MegaMenuColumn';
import { MegaMenuItem } from './MegaMenuItem';
import { useAuth } from '@/context/AuthContext';
import { getDefaultRouteForRole } from '@/auth/rbac';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, role, logout } = useAuth();
  
  const consolePath = isAuthenticated ? getDefaultRouteForRole(role) : '/signin';

  return (
    <header className="sticky top-0 z-40 bg-[#060e20]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group z-50">
          <div className="w-10 h-10 rounded-xl bg-[#0b1326] border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,218,243,0.4)] transition-all">
            <Icon name="shield" size={24} />
          </div>
          <div>
            <span className="font-display font-black text-xl tracking-wider text-white group-hover:text-cyan-100 transition-colors">
              ZAMARON
            </span>
            <span className="text-[10px] font-mono block text-cyan-400/80 tracking-widest leading-none">
              CRYSTALLINE NEXUS
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-stretch h-full gap-2 lg:gap-4">
          
          <NavDropdown label="Solutions" isActive={location.pathname.startsWith('/solutions') || location.pathname.startsWith('/pricing')}>
            <MegaMenuColumn title="Core Services">
              <MegaMenuItem 
                label="Smart Contract Auditing" 
                href="/solutions/auditing" 
                icon="verified" 
                description="Institutional-grade verification and formal analysis for complex protocols."
              />
              <MegaMenuItem 
                label="Audit Pricing & Tiers" 
                href="/pricing" 
                icon="request_quote" 
                description="Transparent pricing structures based on code complexity and risk factors."
              />
            </MegaMenuColumn>
            
            <MegaMenuColumn title="Client Action">
              {(!isAuthenticated || role === 'CLIENT' || role === 'ADMIN') && (
                <MegaMenuItem 
                  label="Request Audit" 
                  href="/client/audits/new" 
                  icon="add_circle" 
                  description="Submit your smart contract codebase for initial assessment and quote."
                  badge="New"
                />
              )}
              <MegaMenuItem 
                label="Command Support" 
                href="/support" 
                icon="support_agent" 
                description="24/7 priority support for active audits and critical security incidents."
              />
            </MegaMenuColumn>
          </NavDropdown>

          <NavDropdown label="Platform" isActive={location.pathname.startsWith('/threat-hub') || location.pathname.startsWith('/client') || location.pathname.startsWith('/auditor') || location.pathname.startsWith('/admin')}>
            <MegaMenuColumn title="Threat Intelligence">
              <MegaMenuItem 
                label="Skynet Threat Radar" 
                href="/threat-hub/skynet" 
                icon="radar" 
                description="Real-time monitoring of Web3 ecosystem threats and active exploits."
              />
              <MegaMenuItem 
                label="Whale Alerts" 
                href="/threat-hub/whales" 
                icon="tsunami" 
                description="Track anomalous massive transactions and liquidity movements."
              />
              <MegaMenuItem 
                label="Incident Monitor" 
                href="/threat-hub/incidents" 
                icon="warning" 
                description="Historical and active security incidents database."
              />
            </MegaMenuColumn>
            
            <MegaMenuColumn title="Analytics">
              <MegaMenuItem 
                label="Security Leaderboard" 
                href="/threat-hub/leaderboard" 
                icon="leaderboard" 
                description="Top protocols ranked by Zamaron security score."
              />
              <MegaMenuItem 
                label="Token Risk Analyzer" 
                href="/threat-hub/token-analyzer" 
                icon="analytics" 
                description="Automated risk assessment for smart contracts and tokens."
              />
            </MegaMenuColumn>

            {/* Role-specific Console Access */}
            <MegaMenuColumn title="Console">
              {(!isAuthenticated || role === 'CLIENT' || role === 'ADMIN') && (
                <MegaMenuItem 
                  label="Client Console" 
                  href="/client/dashboard" 
                  icon="dashboard" 
                  description="Track audit progress, view reports, and manage billing."
                />
              )}
              {isAuthenticated && (role === 'AUDITOR' || role === 'ADMIN') && (
                <MegaMenuItem 
                  label="Auditor Workspace" 
                  href="/auditor/queue" 
                  icon="terminal" 
                  description="Manage assigned audits, run analysis tools, and submit findings."
                />
              )}
              {isAuthenticated && role === 'ADMIN' && (
                <MegaMenuItem 
                  label="Admin Dashboard" 
                  href="/admin/logs" 
                  icon="admin_panel_settings" 
                  description="System configuration, security logs, and user management."
                />
              )}
            </MegaMenuColumn>
          </NavDropdown>

          <NavDropdown label="Resources" isActive={location.pathname.startsWith('/academy') || location.pathname.startsWith('/governance') || location.pathname.startsWith('/catalog')}>
            <MegaMenuColumn title="Knowledge Base">
              <MegaMenuItem 
                label="Zamaron Academy" 
                href="/academy/learn/crypto-security-101" 
                icon="school" 
                description="Comprehensive courses on smart contract security and auditing."
              />
            </MegaMenuColumn>
            
            <MegaMenuColumn title="Protocol">
              <MegaMenuItem 
                label="Protocol Governance" 
                href="/governance" 
                icon="gavel" 
                description="Participate in DAO proposals and network upgrades."
              />
            </MegaMenuColumn>
          </NavDropdown>

        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-3 z-50">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to={consolePath} className="hidden sm:block">
                <Button variant="outline" size="sm" className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
                  Console
                </Button>
              </Link>
              <button
                type="button"
                onClick={logout}
                className="text-sm font-mono text-slate-400 hover:text-white hidden sm:inline px-2 py-1"
              >
                Log Out
              </button>
            </div>
          ) : (
            <Link to="/signin">
              <Button variant="primary" size="md">
                Log In
              </Button>
            </Link>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900/60 border border-white/10 text-slate-300 hover:text-white md:hidden"
            aria-label="Toggle menu"
          >
            <Icon name={mobileMenuOpen ? 'close' : 'menu'} size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#060e20]/95 border-b border-white/10 px-4 py-4 space-y-6 backdrop-blur-xl max-h-[calc(100vh-4rem)] overflow-y-auto cyber-scrollbar shadow-xl">
          
          <div className="space-y-2">
            <h4 className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Solutions</h4>
            <div className="grid gap-1 pl-2 border-l border-white/5 ml-2">
              <Link to="/solutions/auditing" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-2">
                <Icon name="verified" size={16} className="text-cyan-400" /> Smart Contract Auditing
              </Link>
              <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-2">
                <Icon name="request_quote" size={16} className="text-cyan-400" /> Audit Pricing
              </Link>
              {(!isAuthenticated || role === 'CLIENT' || role === 'ADMIN') && (
                <Link to="/client/audits/new" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-2">
                  <Icon name="add_circle" size={16} className="text-cyan-400" /> Request Audit
                </Link>
              )}
              <Link to="/support" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-2">
                <Icon name="support_agent" size={16} className="text-cyan-400" /> Command Support
              </Link>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Platform</h4>
            <div className="grid gap-1 pl-2 border-l border-white/5 ml-2">
              <Link to="/threat-hub/skynet" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-2">
                <Icon name="radar" size={16} className="text-purple-400" /> Skynet Threat Radar
              </Link>
              <Link to="/threat-hub/whales" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-2">
                <Icon name="tsunami" size={16} className="text-purple-400" /> Whale Alerts
              </Link>
              <Link to="/threat-hub/incidents" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-2">
                <Icon name="warning" size={16} className="text-purple-400" /> Incident Monitor
              </Link>
              <Link to="/threat-hub/leaderboard" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-2">
                <Icon name="leaderboard" size={16} className="text-purple-400" /> Security Leaderboard
              </Link>
              <Link to="/threat-hub/token-analyzer" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-2">
                <Icon name="analytics" size={16} className="text-purple-400" /> Token Risk Analyzer
              </Link>
              
              {(!isAuthenticated || role === 'CLIENT' || role === 'ADMIN') && (
                <Link to="/client/dashboard" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-2 mt-2">
                  <Icon name="dashboard" size={16} className="text-emerald-400" /> Client Console
                </Link>
              )}
              {isAuthenticated && (role === 'AUDITOR' || role === 'ADMIN') && (
                <Link to="/auditor/queue" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-2 mt-2">
                  <Icon name="terminal" size={16} className="text-emerald-400" /> Auditor Workspace
                </Link>
              )}
              {isAuthenticated && role === 'ADMIN' && (
                <Link to="/admin/logs" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-2 mt-2">
                  <Icon name="admin_panel_settings" size={16} className="text-emerald-400" /> Admin Dashboard
                </Link>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Resources</h4>
            <div className="grid gap-1 pl-2 border-l border-white/5 ml-2">
              <Link to="/academy/learn/crypto-security-101" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-2">
                <Icon name="school" size={16} className="text-amber-400" /> Zamaron Academy
              </Link>
              <Link to="/governance" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-2">
                <Icon name="gavel" size={16} className="text-amber-400" /> Protocol Governance
              </Link>
            </div>
          </div>

          {isAuthenticated && (
            <div className="pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-2"
              >
                <Icon name="logout" size={16} /> Log Out
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
