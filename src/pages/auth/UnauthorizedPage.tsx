import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { useAuth } from '@/context/AuthContext';
import { getDefaultRouteForRole, getRequiredRoles, LOGIN_PATH } from '@/auth/rbac';

interface UnauthorizedLocationState {
  from?: string;
}

export const UnauthorizedPage: React.FC = () => {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();
  const from = (location.state as UnauthorizedLocationState | null)?.from;
  const required = from ? getRequiredRoles(from) : null;
  const home = isAuthenticated ? getDefaultRouteForRole(role) : LOGIN_PATH;

  return (
    <div className="min-h-screen bg-[#060e20] text-slate-100 flex items-center justify-center p-6 font-sans relative">
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-red-500/10 blur-[100px] pointer-events-none rounded-full" />

      <GlassCard
        variant="fresnel"
        blur="xl"
        className="w-full max-w-lg p-8 space-y-6 shadow-[0_0_40px_rgba(255,84,73,0.15)] relative border-red-500/30"
      >
        <div className="flex items-center justify-between">
          <Badge variant="critical" size="sm" dot pulse>
            ACCESS DENIED
          </Badge>
          <span className="text-[10px] font-mono text-slate-400">HTTP 403 • RBAC GATE</span>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-500/15 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0 shadow-[0_0_15px_rgba(255,84,73,0.3)]">
            <Icon name="gpp_bad" size={26} />
          </div>
          <div className="space-y-1">
            <h1 className="font-display font-black text-2xl text-white">Clearance Insufficient</h1>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              Your operator role is not authorized for this console. Route protection is enforced
              independently of navigation visibility.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-[#060e20]/80 border border-white/10">
            <div className="text-slate-500 uppercase tracking-wider mb-1 text-[10px]">Active Role</div>
            <div className="text-cyan-400 font-bold">{isAuthenticated ? role : 'UNAUTHENTICATED'}</div>
          </div>
          <div className="p-3.5 rounded-xl bg-[#060e20]/80 border border-white/10">
            <div className="text-slate-500 uppercase tracking-wider mb-1 text-[10px]">Required Roles</div>
            <div className="text-white font-bold">{required?.join(' | ') || 'RESTRICTED'}</div>
          </div>
        </div>

        {from && (
          <p className="text-[11px] font-mono text-slate-500 break-all p-2 rounded bg-black/30 border border-white/5">
            Blocked path: <span className="text-slate-300">{from}</span>
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link to={home}>
            <Button size="md" icon={isAuthenticated ? 'dashboard' : 'terminal'}>
              {isAuthenticated ? 'Return to Console' : 'Terminal Login'}
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" size="md" icon="home">
              Public Portal
            </Button>
          </Link>
        </div>
      </GlassCard>
    </div>
  );
};
