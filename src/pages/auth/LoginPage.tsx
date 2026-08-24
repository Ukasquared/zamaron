import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { GlassCard } from '@/components/ui/GlassCard';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { useAuth } from '@/context/AuthContext';
import { getPostLoginPath } from '@/auth/rbac';
import { DEMO_USERS } from '@/mock/data';
import type { UserRole } from '@/types';

interface LoginLocationState {
  from?: string;
}

interface LoginPageProps {
  /** The route's server-issued account class. This is never user-selectable. */
  requiredRole?: UserRole;
}

const LOGIN_COPY: Record<UserRole, { title: string; description: string; }> = {
  CLIENT: {
    title: 'Account Login',
    description: 'Sign in to manage your protocol security engagements.',
  },
  AUDITOR: {
    title: 'Auditor access',
    description: 'Authorized audit personnel only. Your account clearance is verified during sign in.',
  },
  ADMIN: {
    title: 'Administrator access',
    description: 'Authorized administrators only. Your account clearance is verified during sign in.',
  },
  STUDENT: {
    title: 'Sign in',
    description: 'Authenticate to continue.',
  },
};

export const LoginPage: React.FC<LoginPageProps> = ({ requiredRole = 'CLIENT' }) => {
  const [email, setEmail] = useState(DEMO_USERS[requiredRole].email);
  const [password, setPassword] = useState('nexus-operator');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as LoginLocationState | null)?.from;
  const copy = LOGIN_COPY[requiredRole];

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // The expected role is an immutable route property. authenticate() resolves
      // the actual account role itself and rejects a mismatch before issuing a session.
      const user = await login(email, password, requiredRole);
      navigate(getPostLoginPath(user.role, from), { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard
      variant="fresnel"
      blur="xl"
      className="w-full max-w-md p-8 space-y-6 shadow-[0_0_40px_rgba(0,218,243,0.15)] relative border-cyan-500/30"
    >

      <div className="space-y-1">
        <h2 className="font-display font-black text-2xl text-white">{copy.title}</h2>
        <p className="text-xs text-slate-400 font-sans leading-relaxed">{copy.description}</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          icon="alternate_email"
          placeholder="you@example.com"
          required
        />
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            icon="vpn_key"
            placeholder="••••••••••••"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            className="absolute right-3 top-7 text-slate-400 hover:text-white cursor-pointer"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <Icon name={showPassword ? 'visibility_off' : 'visibility'} size={18} />
          </button>
        </div>

        {error && (
          <div className="text-xs font-mono text-red-400 bg-red-500/10 border border-red-500/40 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <Button type="submit" size="lg" className="w-full" loading={loading} icon="bolt">
          Sign in
        </Button>
      </form>

      {requiredRole === 'CLIENT' && (
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
          <Link to="/auth/signup" className="hover:text-cyan-300 transition-colors">
              New to Zamaron? <span className="text-cyan-400 font-bold">sign up</span>
          </Link>
        </div>
      )}
    </GlassCard>
  );
};
