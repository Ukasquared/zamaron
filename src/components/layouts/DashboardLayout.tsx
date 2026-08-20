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
    navigate('/auth/login', { replace: true });
  };

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

          <Link to={homePath} className="flex items-center gap-2">
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
          {/* Quick 47-Screens Master Matrix Button */}
          <button
            onClick={() => setCatalogOpen(true)}
            className="px-2.5 py-1 rounded bg-primary/10 border border-primary/40 hover:bg-primary/20 text-primary transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono font-bold shadow-[0_0_10px_rgba(0,218,243,0.2)]"
            title="Open Master Navigation Matrix for all 47 screens"
          >
            <Icon name="grid_view" size={16} />
            <span className="hidden sm:inline">47 Screens Matrix</span>
          </button>

          {/* Active role badge — not a switcher. Role is bound to the session. */}
          <div className="hidden md:flex items-center gap-1 bg-[#0b1326] px-2 py-0.5 rounded border border-outline/60 text-[11px] font-mono">
            <span className="text-slate-500">ROLE</span>
            <span className="px-1.5 py-0.5 rounded bg-primary text-[#00363d] font-bold">{role}</span>
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

          <button
            type="button"
            onClick={handleLogout}
            className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-mono text-slate-400 hover:text-white hover:bg-surface-variant border border-transparent hover:border-outline/60 cursor-pointer"
            title="End session"
          >
            <Icon name="logout" size={14} />
            Logout
          </button>

          {/* User Profile Pill */}
          <Link
            to="/profile/alex-chen"
            className="flex items-center gap-2 pl-2 border-l border-outline/50 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary p-0.5">
              <div className="w-full h-full rounded-full bg-[#060e20] flex items-center justify-center text-xs font-bold font-mono text-primary">
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
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 px-2 py-1.5 rounded text-xs font-mono text-slate-400 hover:text-white hover:bg-surface-variant transition-colors cursor-pointer w-full text-left"
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

              <div className="mb-4 px-2 py-2 rounded bg-[#060e20] border border-outline/50 text-[11px] font-mono text-slate-400">
                Active clearance: <span className="text-primary font-bold">{role}</span>
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

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="mt-6 flex items-center gap-2 px-3 py-2 rounded text-xs font-mono text-slate-300 hover:bg-surface-variant cursor-pointer"
              >
                <Icon name="logout" size={16} />
                End Session
              </button>
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
            All 47 Screens Matrix <Icon name="open_in_new" size={12} />
          </button>
        </div>
      </footer>

      {/* Master 47 Screens Catalog Drawer */}
      <MasterCatalogDrawer isOpen={catalogOpen} onClose={() => setCatalogOpen(false)} />
    </div>
  );
};
