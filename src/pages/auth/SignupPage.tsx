import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GlassCard } from '@/components/ui/GlassCard';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { useAuth } from '@/context/AuthContext';
import { getDefaultRouteForRole } from '@/auth/rbac';

export const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { register } = useAuth();

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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const user = await register({ name, email, password });
      navigate(getDefaultRouteForRole(user.role), { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Induction failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard
      variant="fresnel"
      blur="xl"
      className="w-full max-w-lg p-8 space-y-6 shadow-[0_0_40px_rgba(0,218,243,0.15)] relative border-cyan-500/30"
    >

      <div className="space-y-1">
        <h2 className="font-display font-black text-2xl text-white">Create Account</h2>
        <p className="text-xs text-slate-400 font-sans leading-relaxed">
          Provision your credentials to interface with the Zamaron decentralized network.
        </p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <Input
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          icon="person"
          placeholder="e.g. Alex Chen"
          required
        />

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon="alternate_email"
          placeholder="operator@nexus.io"
          required
        />

        <div className="space-y-2">
          <Input
            label="Password"
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
              <span>Password Strength:</span>
              <span
                className={
                  score <= 25
                    ? 'text-red-400'
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
            <div className="w-full h-1.5 bg-[#060e20] rounded-full overflow-hidden border border-white/10">
              <div
                className={`h-full transition-all duration-300 ${
                  score <= 25
                    ? 'bg-red-400'
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

        <div className="p-3.5 bg-[#060e20]/80 border border-white/10 rounded-xl text-[11px] text-slate-400 flex items-start gap-2.5">
          <Icon name="verified_user" size={16} className="text-cyan-400 shrink-0 mt-0.5" />
          <span>
            By creating an account, you agree to the Cryptographic Code of Ethics and zero-knowledge telemetry recording.
          </span>
        </div>

        {error && (
          <div className="text-xs font-mono text-red-400 bg-red-500/10 border border-red-500/40 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <Button type="submit" size="lg" className="w-full" loading={loading} icon="bolt">
          Create Account
        </Button>
      </form>

      <div className="pt-4 border-t border-white/10 text-center text-xs font-mono text-slate-400">
        Already registered?{' '}
        <Link to="/signin" className="text-cyan-400 font-bold hover:underline">
          Login here
        </Link>
      </div>
    </GlassCard>
  );
};
