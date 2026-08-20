import React, { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';
import { copyToClipboard } from '@/lib/utils';
import { createApiKey, listApiKeys, revokeApiKey } from '@/services/adminService';
import type { ApiKeyRecord } from '@/types/ops';

export const DevelopersApiPage: React.FC = () => {
  const { user } = useAuth();
  const [name, setName] = useState('Integration key');
  const [scopes, setScopes] = useState('radar:read');
  const [rateLimit, setRateLimit] = useState(1000);
  const [revealed, setRevealed] = useState<string | null>(null);
  const [tick, setTick] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const keys = useMemo(() => {
    try {
      return listApiKeys(user);
    } catch {
      return [] as ApiKeyRecord[];
    }
  }, [user, tick]);

  const mint = () => {
    setError(null);
    try {
      const created = createApiKey({ name, scopes, rateLimit }, user);
      setRevealed(created.secretHint);
      setMessage('Key minted. Copy the secret now — it is not shown again after refresh.');
      setTick((n) => n + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to mint key.');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-surface-container/70 border border-outline/70 p-6 rounded-md">
        <Badge variant="primary">DEVELOPER ACCESS</Badge>
        <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">Developer Management & API Keys</h1>
        <p className="text-xs text-slate-400 mt-1">Provision scoped keys and rate limits for radar ingest and git deploy hooks.</p>
      </div>

      {(error || message) && (
        <div
          className={`text-xs font-mono rounded px-3 py-2 border ${
            error ? 'text-error bg-error/10 border-error/40' : 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30'
          }`}
        >
          {error || message}
        </div>
      )}

      <Card variant="fresnel" className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Input label="Key name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Scopes" value={scopes} onChange={(e) => setScopes(e.target.value)} />
          <Input
            label="Rate limit / min"
            type="number"
            value={rateLimit}
            onChange={(e) => setRateLimit(Number(e.target.value) || 0)}
          />
        </div>
        <Button icon="vpn_key" onClick={mint}>
          Mint API Key
        </Button>
        {revealed && (
          <div className="p-3 bg-[#060e20] border border-primary/40 rounded font-mono text-xs flex items-center justify-between gap-3">
            <span className="break-all text-primary">{revealed}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                const ok = await copyToClipboard(revealed);
                setMessage(ok ? 'Secret copied to clipboard.' : 'Clipboard unavailable.');
              }}
            >
              Copy
            </Button>
          </div>
        )}
      </Card>

      <div className="space-y-3">
        {keys.map((key) => (
          <Card key={key.id} variant="glass" className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-white">{key.name}</span>
                <Badge variant={key.status === 'ACTIVE' ? 'success' : 'outline'} size="sm">
                  {key.status}
                </Badge>
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-1">
                {key.prefix}… • {key.scopes} • {key.rateLimit}/min • last {key.lastUsed}
              </div>
            </div>
            {key.status === 'ACTIVE' && (
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  try {
                    revokeApiKey(key.id, user);
                    setMessage(`Revoked ${key.name}.`);
                    setTick((n) => n + 1);
                  } catch (err) {
                    setError(err instanceof Error ? err.message : 'Revoke failed.');
                  }
                }}
              >
                Revoke
              </Button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DevelopersApiPage;
