import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { useAuth } from '@/context/AuthContext';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('alex.chen@zamoron.io');
  const [password, setPassword] = useState('••••••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [authMethod, setAuthMethod] = useState<'PASSWORD' | 'PASSKEY' | 'WALLET'>('PASSWORD');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(email);
      setLoading(false);
      navigate('/client/dashboard');
    }, 600);
  };

  return (
    <Card variant="fresnel" className="w-full max-w-md p-8 space-y-6 shadow-2xl relative">
      {/* Top Badge */}
      <div className="flex items-center justify-between">
        <Badge variant="primary" size="sm" dot pulse>
          TERMINAL ACCESS
        </Badge>
        <span className="text-[10px] font-mono text-slate-400">SESSION: #ZT-8924-X</span>
      </div>

      <div className="space-y-1">
        <h2 className="font-display font-bold text-2xl text-white">Welcome back, Operator</h2>
        <p className="text-xs text-slate-400 font-sans">
          Authenticate your node credentials to access the encrypted console.
        </p>
      </div>

      {/* Auth Method Selector */}
      <div className="grid grid-cols-3 gap-1 p-1 bg-[#060e20] rounded border border-outline/70">
        <button
          type="button"
          onClick={() => setAuthMethod('PASSWORD')}
          className={`py-1.5 text-[11px] font-mono rounded font-semibold transition-colors cursor-pointer ${
            authMethod === 'PASSWORD' ? 'bg-primary text-[#00363d] font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          PASSKEY / PWD
        </button>
        <button
          type="button"
          onClick={() => setAuthMethod('PASSKEY')}
          className={`py-1.5 text-[11px] font-mono rounded font-semibold transition-colors cursor-pointer ${
            authMethod === 'PASSKEY' ? 'bg-primary text-[#00363d] font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          WEBAUTHN
        </button>
        <button
          type="button"
          onClick={() => setAuthMethod('WALLET')}
          className={`py-1.5 text-[11px] font-mono rounded font-semibold transition-colors cursor-pointer ${
            authMethod === 'WALLET' ? 'bg-primary text-[#00363d] font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          WEB3 WALLET
        </button>
      </div>

      {/* Form */}
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
          <div className="p-6 bg-[#060e20] border border-primary/30 rounded text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 border border-primary flex items-center justify-center text-primary">
              <Icon name="fingerprint" size={28} />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-display">Biometric / Hardware Key</div>
              <div className="text-xs text-slate-400 mt-1">FIDO2 WebAuthn authentication via YubiKey or TouchID.</div>
            </div>
          </div>
        )}

        {authMethod === 'WALLET' && (
          <div className="p-6 bg-[#060e20] border border-primary/30 rounded text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 border border-primary flex items-center justify-center text-primary">
              <Icon name="account_balance_wallet" size={28} />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-display">Sign with Web3 Wallet</div>
              <div className="text-xs text-slate-400 mt-1">EIP-4361 Sign-In with Ethereum (SIWE).</div>
            </div>
          </div>
        )}

        <Button type="submit" size="lg" className="w-full" loading={loading} icon="bolt">
          Authenticate Terminal
        </Button>
      </form>

      {/* Alternative Onboarding Link */}
      <div className="pt-4 border-t border-outline/50 flex items-center justify-between text-xs font-mono text-slate-400">
        <Link to="/auth/induction" className="hover:text-primary transition-colors">
          New Operator? <span className="text-primary font-bold">Begin Induction</span>
        </Link>
        <Link to="/auth/secure-gate" className="hover:text-slate-200">
          Hardware Enclave
        </Link>
      </div>
    </Card>
  );
};
