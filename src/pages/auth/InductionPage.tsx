import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';

export const InductionPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Password score computation
  const getPasswordScore = () => {
    let score = 0;
    if (password.length >= 8) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9]/.test(password)) score += 25;
    if (/[^A-Za-z0-9]/.test(password)) score += 25;
    return score;
  };

  const score = getPasswordScore();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/client/dashboard');
  };

  return (
    <Card variant="fresnel" className="w-full max-w-lg p-8 space-y-6 shadow-2xl relative">
      <div className="flex items-center justify-between">
        <Badge variant="secondary" size="sm">
          OPERATOR INDUCTION
        </Badge>
        <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
          <Icon name="lock" size={14} /> TLS 2.0 HARDENED
        </span>
      </div>

      <div className="space-y-1">
        <h2 className="font-display font-bold text-2xl text-white">Register Node Identity</h2>
        <p className="text-xs text-slate-400 font-sans">
          Provision your cryptographic credentials to interface with the Zamaron decentralized network.
        </p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <Input
          label="Operator Identity Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          icon="person"
          placeholder="e.g. Alex Chen"
          required
        />

        <Input
          label="Institutional Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon="alternate_email"
          placeholder="operator@nexus.io"
          required
        />

        <div className="space-y-2">
          <Input
            label="Cryptographic Passphrase"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon="key"
            placeholder="Min. 12 characters recommended"
            required
          />

          {/* Complexity Meter */}
          <div className="space-y-1 pt-1">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>Entropy Score:</span>
              <span
                className={
                  score <= 25
                    ? 'text-error'
                    : score <= 50
                    ? 'text-amber-400'
                    : score <= 75
                    ? 'text-cyan-400'
                    : 'text-emerald-400 font-bold'
                }
              >
                {score <= 25 ? 'WEAK' : score <= 50 ? 'NOMINAL' : score <= 75 ? 'STRONG' : 'CRYPTOGRAPHIC HARDENED'}
              </span>
            </div>
            <div className="w-full h-1.5 bg-surface-variant rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  score <= 25
                    ? 'bg-error'
                    : score <= 50
                    ? 'bg-amber-400'
                    : score <= 75
                    ? 'bg-cyan-400'
                    : 'bg-emerald-400'
                }`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        </div>

        <div className="p-3 bg-[#060e20] border border-outline rounded text-[11px] text-slate-400 flex items-start gap-2">
          <Icon name="verified_user" size={16} className="text-primary shrink-0 mt-0.5" />
          <span>
            By initiating induction, you agree to the Cryptographic Code of Ethics and zero-knowledge telemetry recording.
          </span>
        </div>

        <Button type="submit" size="lg" className="w-full" icon="fingerprint">
          Complete Induction
        </Button>
      </form>

      <div className="pt-4 border-t border-outline/50 text-center text-xs font-mono text-slate-400">
        Already registered?{' '}
        <Link to="/auth/login" className="text-primary font-bold hover:underline">
          Terminal Sign-In
        </Link>
      </div>
    </Card>
  );
};
