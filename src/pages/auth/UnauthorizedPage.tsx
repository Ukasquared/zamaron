import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
    <div className="min-h-screen bg-[#060e20] text-slate-100 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-lg bg-surface-container/80 border border-error/40 rounded-md p-8 space-y-6 shadow-[0_0_30px_rgba(255,84,73,0.12)]">
        <div className="flex items-center justify-between">
          <Badge variant="critical" size="sm" dot pulse>
            ACCESS DENIED
          </Badge>
          <span className="text-[10px] font-mono text-slate-500">HTTP 403 • RBAC GATE</span>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded bg-error/10 border border-error/40 flex items-center justify-center text-error shrink-0">
            <Icon name="gpp_bad" size={26} />
          </div>
          <div className="space-y-1">
            <h1 className="font-display font-black text-2xl text-white">Clearance Insufficient</h1>
            <p className="text-sm text-slate-400">
              Your operator role is not authorized for this console. Route protection is enforced
              independently of navigation visibility.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 rounded bg-[#060e20] border border-outline/60">
            <div className="text-slate-500 uppercase tracking-wider mb-1">Active Role</div>
            <div className="text-primary font-bold">{isAuthenticated ? role : 'UNAUTHENTICATED'}</div>
          </div>
          <div className="p-3 rounded bg-[#060e20] border border-outline/60">
            <div className="text-slate-500 uppercase tracking-wider mb-1">Required Roles</div>
            <div className="text-white font-bold">{required?.join(' | ') || 'RESTRICTED'}</div>
          </div>
        </div>

        {from && (
          <p className="text-[11px] font-mono text-slate-500 break-all">
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
      </div>
    </div>
  );
};
