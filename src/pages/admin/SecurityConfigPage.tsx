import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Switch } from '@/components/ui/Switch';
import { useAuth } from '@/context/AuthContext';
import { getSecurityConfig, updateSecurityConfig } from '@/services/adminService';

export const SecurityConfigPage: React.FC = () => {
  const { user } = useAuth();
  const [fido2Required, setFido2Required] = useState(true);
  const [autoMitigate, setAutoMitigate] = useState(true);
  const [ipWhitelisting, setIpWhitelisting] = useState(true);
  const [rateLimitStrict, setRateLimitStrict] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const config = getSecurityConfig(user);
      setFido2Required(config.fido2Required);
      setAutoMitigate(config.autoMitigate);
      setIpWhitelisting(config.ipWhitelisting);
      setRateLimitStrict(config.rateLimitStrict);
    } catch {
      setSaveError('Administrative read denied.');
    }
  }, [user]);

  const handleSave = () => {
    setSaveError(null);
    try {
      updateSecurityConfig(
        { fido2Required, autoMitigate, ipWhitelisting, rateLimitStrict },
        user
      );
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Administrative write denied.');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container/70 border border-outline/70 p-6 rounded-md">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary">PROTOCOL SECURITY MATRIX</Badge>
            <span className="text-xs font-mono text-emerald-400 font-bold">STATUS: HARDENED</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
            Access Control & Mitigation Configuration
          </h1>
        </div>

        <div className="flex flex-col items-end gap-2">
          <Button size="md" icon="save" onClick={handleSave}>
            Save Hardening Matrix
          </Button>
          {saveError && <span className="text-[11px] font-mono text-error">{saveError}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="fresnel" className="p-6 space-y-4">
          <CardHeader className="mb-2">
            <CardTitle>Authentication Enclaves</CardTitle>
          </CardHeader>

          <div className="space-y-4">
            <Switch
              checked={fido2Required}
              onChange={setFido2Required}
              label="Enforce FIDO2 / WebAuthn Hardware Keys"
              description="Require physical YubiKey or biometric enclave for all ALPHA clearance actions."
            />
            <Switch
              checked={ipWhitelisting}
              onChange={setIpWhitelisting}
              label="Strict Node IP Whitelist Matrix"
              description="Block administrative requests originating outside verified institutional VPN ranges."
            />
          </div>
        </Card>

        <Card variant="glass" className="p-6 space-y-4">
          <CardHeader className="mb-2">
            <CardTitle>Automated Mitigation & Circuit Breakers</CardTitle>
          </CardHeader>

          <div className="space-y-4">
            <Switch
              checked={autoMitigate}
              onChange={setAutoMitigate}
              label="Automated Smart Contract Circuit Breaker"
              description="Instantly pause vulnerable liquidity pools upon SWC-107 reentrancy exploit detection."
            />
            <Switch
              checked={rateLimitStrict}
              onChange={setRateLimitStrict}
              label="DDoS Traffic Spike Strict Throttling"
              description="Throttle RPC queries exceeding 5,000 requests / minute per client API key."
            />
          </div>
        </Card>
      </div>
    </div>
  );
};
