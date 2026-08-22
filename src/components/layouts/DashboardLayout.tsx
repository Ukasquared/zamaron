import React, { useMemo, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { AddressBadge } from '@/components/shared/AddressBadge';
import { MasterCatalogDrawer } from '@/components/shared/MasterCatalogDrawer';
import { Icon } from '@/components/ui/Icon';
import { getNavSectionsForRole } from '@/auth/navigation';
import { getDefaultRouteForRole } from '@/auth/rbac';

export const DashboardLayout: React.FC = () => {
  const { user, role, logout, walletConnected, connectWallet } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navSections = useMemo(() => getNavSectionsForRole(role), [role]);
  const homePath = getDefaultRouteForRole(role);

  const handleLogout = () => {
    logout();
    navigate('/signin', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#060e20] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-300">
      {/* Top Application Header */}
      <header className="sticky top-0 z-40 bg-[#060e20]/85 backdrop-blur-xl border-b border-white/10 h-14 flex items-center justify-between px-4 sm:px-6 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
        {/* Left Side: Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-all cursor-pointer hidden md:block"
            title="Toggle Sidebar"
          >
            <Icon name={sidebarCollapsed ? 'menu_open' : 'menu'} size={20} />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-all cursor-pointer md:hidden"
          >
            <Icon name="menu" size={20} />
          </button>

          <Link to={homePath} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[#0b1326] border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_12px_rgba(0,218,243,0.3)] group-hover:border-cyan-300 transition-all">
              <Icon name="shield" size={18} />
            </div>
            <span className="font-display font-bold text-base text-white tracking-wider hidden sm:inline">
              ZAMARON <span className="text-[10px] font-mono text-cyan-400 font-normal">TERMINAL</span>
            </span>
          </Link>

          {/* Node Health Pill */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#0b1326]/80 border border-white/10 text-[11px] font-mono text-slate-300 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>NODE: ALPHA-01</span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-400 font-bold">12ms</span>
          </div>
        </div>

        {/* Right Side: Role Selector, Matrix Drawer Button, Wallet, Profile */}
        <div className="flex items-center gap-3">
          {/* Quick 47-Screens Master Matrix Button */}
          <button
            onClick={() => setCatalogOpen(true)}
            className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 text-cyan-300 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono font-bold shadow-[0_0_12px_rgba(0,218,243,0.2)]"
            title="Open Master Navigation Matrix for all 47 screens"
          >
            <Icon name="grid_view" size={16} />
            <span className="hidden sm:inline">47 Screens Matrix</span>
          </button>

          {/* Active role badge */}
          <div className="hidden md:flex items-center gap-1.5 bg-[#0b1326]/80 px-2 py-0.5 rounded-md border border-white/10 text-[11px] font-mono backdrop-blur-md">
            <span className="text-slate-500">ROLE</span>
            <span className="px-1.5 py-0.5 rounded bg-cyan-400 text-[#00363d] font-bold">{role}</span>
          </div>

          {/* Wallet Address Chip */}
          {walletConnected && user?.walletAddress ? (
            <div className="hidden sm:flex items-center gap-1">
              <AddressBadge address={user.walletAddress} showLink={false} />
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="px-2.5 py-1 rounded-md bg-white/5 text-xs font-mono text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all cursor-pointer"
            >
              Connect Node
            </button>
          )}

          <button
            type="button"
            onClick={handleLogout}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-pointer"
            title="End session"
          >
            <Icon name="logout" size={14} />
            Logout
          </button>

          {/* User Profile Pill */}
          <Link
            to={`/profile/${user?.id || 'operator'}`}
            className="flex items-center gap-2 pl-2 border-l border-white/10 hover:opacity-85 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-400 p-0.5">
              <div className="w-full h-full rounded-full bg-[#060e20] flex items-center justify-center text-xs font-bold font-mono text-cyan-400">
                {(user?.name || 'OP')
                  .split(' ')
                  .map((part) => part[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-semibold text-white leading-tight">{user?.name || 'Operator'}</div>
              <div className="text-[10px] font-mono text-cyan-400">{user?.securityClearance || 'ALPHA'} CLEARANCE</div>
            </div>
          </Link>
        </div>
      </header>

      {/* Main Workspace Body: Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Glass Sidebar */}
        <aside
          className={`hidden md:flex flex-col bg-[#070f23]/90 backdrop-blur-xl border-r border-white/10 transition-all duration-300 ${
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
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono transition-all group ${
                        isActive
                          ? 'bg-cyan-400 text-[#00363d] font-bold shadow-[0_0_15px_rgba(0,218,243,0.35)]'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                      }`}
                    >
                      <Icon
                        name={item.icon}
                        size={18}
                        className={isActive ? 'text-[#00363d]' : 'text-slate-400 group-hover:text-cyan-400 transition-colors'}
                      />
                      {!sidebarCollapsed && (
                        <span className="truncate flex-1">{item.label}</span>
                      )}
                      {!sidebarCollapsed && item.badge && (
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                            isActive
                              ? 'bg-[#00363d]/30 text-white'
                              : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
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
          <div className="p-3 border-t border-white/10 bg-[#060e20]/60 space-y-1">
            <Link
              to="/"
              className="flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-mono text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Icon name="home" size={16} />
              {!sidebarCollapsed && <span>Public Portal</span>}
            </Link>
            <Link
              to="/support"
              className="flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-mono text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Icon name="support_agent" size={16} />
              {!sidebarCollapsed && <span>Command Support</span>}
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-mono text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer w-full text-left"
            >
              <Icon name="logout" size={16} />
              {!sidebarCollapsed && <span>End Session</span>}
            </button>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative w-72 max-w-[80vw] bg-[#070f23]/95 border-r border-white/10 p-4 flex flex-col h-full z-10 overflow-y-auto cyber-scrollbar backdrop-blur-xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <span className="font-display font-bold text-white">ZAMARON Console</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-400 p-1 hover:text-white"
                >
                  <Icon name="close" size={20} />
                </button>
              </div>

              <div className="mb-4 px-3 py-2 rounded-lg bg-[#060e20] border border-white/10 text-[11px] font-mono text-slate-400">
                Active clearance: <span className="text-cyan-400 font-bold">{role}</span>
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
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono ${
                          location.pathname === item.href
                            ? 'bg-cyan-400 text-[#00363d] font-bold shadow-[0_0_12px_rgba(0,218,243,0.3)]'
                            : 'text-slate-300 hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon name={item.icon} size={18} />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="text-[9px] px-1 bg-cyan-500/20 text-cyan-300 rounded">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="mt-6 flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono text-slate-300 hover:bg-white/5 cursor-pointer border border-white/10"
              >
                <Icon name="logout" size={16} />
                End Session
              </button>
            </div>
          </div>
        )}

        {/* Main Content Area with Ambient Web3 Glow */}
        <main className="flex-1 overflow-y-auto cyber-scrollbar p-4 sm:p-6 lg:p-8 bg-[#060e20] relative">
          {/* Subtle Ambient Background Gradients */}
          <div className="fixed top-20 right-1/4 w-[500px] h-[400px] bg-cyan-500/5 blur-[120px] pointer-events-none -z-10 rounded-full" />
          <div className="fixed bottom-10 left-1/3 w-[450px] h-[350px] bg-purple-600/5 blur-[120px] pointer-events-none -z-10 rounded-full" />
          <div className="fixed inset-0 bg-grid-cyber opacity-20 pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto space-y-6 relative z-10">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Global Status Telemetry Ticker Bar */}
      <footer className="h-7 bg-[#040915] border-t border-white/10 px-4 flex items-center justify-between text-[11px] font-mono text-slate-400 select-none backdrop-blur-md">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            SKYNET RADAR: ACTIVE
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline">BLOCK: #21,894,012</span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline">TVP: $64.2 Billion</span>
        </div>

        <div className="flex items-center gap-3">
        </div>
      </footer>

      {/* Master 47 Screens Catalog Drawer */}
      <MasterCatalogDrawer isOpen={catalogOpen} onClose={() => setCatalogOpen(false)} />
    </div>
  );
};
