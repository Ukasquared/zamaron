import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { GlassCard } from '@/components/ui/GlassCard';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { useAuth } from '@/context/AuthContext';
import { getPostLoginPath, PRIMARY_ROLES } from '@/auth/rbac';
import { DEMO_USERS } from '@/mock/data';
import type { UserRole } from '@/types';

interface LoginLocationState {
  from?: string;
}

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState(DEMO_USERS.CLIENT.email);
  const [password, setPassword] = useState('nexus-operator');
  const [showPassword, setShowPassword] = useState(false);
  const [authMethod, setAuthMethod] = useState<'PASSWORD' | 'PASSKEY' | 'WALLET'>('PASSWORD');
  const [selectedRole, setSelectedRole] = useState<UserRole>('CLIENT');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as LoginLocationState | null)?.from;

  const applyDemoRole = (role: UserRole) => {
    setSelectedRole(role);
    setEmail(DEMO_USERS[role].email);
    setError(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const user = await login(email, password);
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
      <div className="flex items-center justify-between">
        <Badge variant="primary" size="sm" dot pulse>
          TERMINAL ACCESS
        </Badge>
        <span className="text-[10px] font-mono text-slate-400">SESSION: #ZT-8924-X</span>
      </div>

      <div className="space-y-1">
        <h2 className="font-display font-black text-2xl text-white">Welcome back, Operator</h2>
        <p className="text-xs text-slate-400 font-sans leading-relaxed">
          Authenticate your node credentials to access the encrypted console.
        </p>
      </div>

      {/* Demo Role Selector */}
      <div className="space-y-2">
        <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
          Demo clearance (binds session role)
        </div>
        <div className="grid grid-cols-3 gap-1 p-1 bg-[#060e20]/80 rounded-lg border border-white/10">
          {PRIMARY_ROLES.map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => applyDemoRole(role)}
              className={`py-1.5 text-[11px] font-mono rounded-md font-semibold transition-all cursor-pointer ${
                selectedRole === role
                  ? 'bg-cyan-400 text-[#00363d] font-bold shadow-[0_0_12px_rgba(0,218,243,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
        <p className="text-[10px] font-mono text-slate-500">
          {DEMO_USERS[selectedRole].email} • role issued by auth service
        </p>
      </div>

      {/* Auth Method Tabs */}
      <div className="grid grid-cols-3 gap-1 p-1 bg-[#060e20]/80 rounded-lg border border-white/10">
        <button
          type="button"
          onClick={() => setAuthMethod('PASSWORD')}
          className={`py-1.5 text-[11px] font-mono rounded-md font-semibold transition-all cursor-pointer ${
            authMethod === 'PASSWORD'
              ? 'bg-cyan-400 text-[#00363d] font-bold shadow-[0_0_12px_rgba(0,218,243,0.3)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          PASSKEY / PWD
        </button>
        <button
          type="button"
          onClick={() => setAuthMethod('PASSKEY')}
          className={`py-1.5 text-[11px] font-mono rounded-md font-semibold transition-all cursor-pointer ${
            authMethod === 'PASSKEY'
              ? 'bg-cyan-400 text-[#00363d] font-bold shadow-[0_0_12px_rgba(0,218,243,0.3)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          WEBAUTHN
        </button>
        <button
          type="button"
          onClick={() => setAuthMethod('WALLET')}
          className={`py-1.5 text-[11px] font-mono rounded-md font-semibold transition-all cursor-pointer ${
            authMethod === 'WALLET'
              ? 'bg-cyan-400 text-[#00363d] font-bold shadow-[0_0_12px_rgba(0,218,243,0.3)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          WEB3 WALLET
        </button>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        {authMethod === 'PASSWORD' && (
          <>
            <Input
              label="Terminal Identity (Email)"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon="alternate_email"
              placeholder="operator@nexus.io"
              required
            />
            <div className="relative">
              <Input
                label="Access Key (Password)"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon="vpn_key"
                placeholder="••••••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-7 text-slate-400 hover:text-white cursor-pointer"
              >
                <Icon name={showPassword ? 'visibility_off' : 'visibility'} size={18} />
              </button>
            </div>
          </>
        )}

        {authMethod === 'PASSKEY' && (
          <div className="p-6 bg-[#060e20]/80 border border-cyan-500/30 rounded-xl text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-cyan-500/10 border border-cyan-400 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,218,243,0.3)]">
              <Icon name="fingerprint" size={28} />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-display">Biometric / Hardware Key</div>
              <div className="text-xs text-slate-400 mt-1">FIDO2 WebAuthn authentication via YubiKey or TouchID.</div>
            </div>
          </div>
        )}

        {authMethod === 'WALLET' && (
          <div className="p-6 bg-[#060e20]/80 border border-cyan-500/30 rounded-xl text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-cyan-500/10 border border-cyan-400 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,218,243,0.3)]">
              <Icon name="account_balance_wallet" size={28} />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-display">Sign with Web3 Wallet</div>
              <div className="text-xs text-slate-400 mt-1">EIP-4361 Sign-In with Ethereum (SIWE).</div>
            </div>
          </div>
        )}

        {error && (
          <div className="text-xs font-mono text-red-400 bg-red-500/10 border border-red-500/40 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <Button type="submit" size="lg" className="w-full" loading={loading} icon="bolt">
          Authenticate Terminal
        </Button>
      </form>

      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
        <Link to="/auth/induction" className="hover:text-cyan-300 transition-colors">
          New Operator? <span className="text-cyan-400 font-bold">Begin Induction</span>
        </Link>
        <Link to="/auth/secure-gate" className="hover:text-slate-200">
          Hardware Enclave
        </Link>
      </div>
    </GlassCard>
  );
};
