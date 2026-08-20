import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { useAuth } from '@/context/AuthContext';
import { getDefaultRouteForRole, LOGIN_PATH } from '@/auth/rbac';
import { AuthLoadingScreen } from '@/auth/AuthLoadingScreen';

export const SecureGatePage: React.FC = () => {
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, role } = useAuth();

  if (isLoading) {
    return <AuthLoadingScreen message="Checking enclave session…" />;
  }

  if (!isAuthenticated) {
    return <Navigate to={LOGIN_PATH} replace state={{ from: '/auth/secure-gate' }} />;
  }

  const handleDigit = (digit: string, index: number) => {
    const updated = [...pin];
    updated[index] = digit;
    setPin(updated);

    if (digit && index < 5) {
      const nextInput = document.getElementById(`pin-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.some((d) => !d)) {
      setError('Complete the 6-digit hardware challenge.');
      return;
    }
    navigate(getDefaultRouteForRole(role), { replace: true });
  };

  return (
    <Card variant="fresnel" className="w-full max-w-md p-8 space-y-6 shadow-2xl relative text-center">
      <Badge variant="critical" size="sm" dot pulse>
        RESTRICTED LEVEL 4 HARDWARE ENCLAVE
      </Badge>

      <div className="w-16 h-16 mx-auto rounded-full bg-[#060e20] border-2 border-primary flex items-center justify-center text-primary shadow-[0_0_20px_rgba(0,218,243,0.3)]">
        <Icon name="phonelink_lock" size={32} />
      </div>

      <div className="space-y-1">
        <h2 className="font-display font-bold text-2xl text-white">Secondary Security Gate</h2>
        <p className="text-xs text-slate-400 font-sans">
          Enter your 6-digit cryptographic TOTP passkey or hardware authenticator code. This step
          cannot elevate your existing {role} clearance.
        </p>
      </div>

      <form onSubmit={handleVerify} className="space-y-6">
        <div className="flex items-center justify-center gap-2">
          {pin.map((digit, idx) => (
            <input
              key={idx}
              id={`pin-${idx}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleDigit(e.target.value, idx)}
              className="w-11 h-13 text-center font-mono font-bold text-xl bg-[#060e20] border border-outline focus:border-primary focus:ring-1 focus:ring-primary rounded text-white"
            />
          ))}
        </div>

        {error && (
          <div className="text-xs font-mono text-error bg-error/10 border border-error/40 rounded px-3 py-2">
            {error}
          </div>
        )}

        <Button type="submit" size="lg" className="w-full" icon="verified_user">
          Unlock Enclave
        </Button>
      </form>

      <div className="pt-4 border-t border-outline/50 text-xs font-mono text-slate-400">
        <Link to="/auth/login" className="hover:text-primary transition-colors">
          Return to Primary Terminal Login
        </Link>
      </div>
    </Card>
  );
};
