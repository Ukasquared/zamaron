import React, { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Switch } from '@/components/ui/Switch';
import { useAuth } from '@/context/AuthContext';
import { listGateways, updateGateway } from '@/services/adminService';
import type { PaymentGateway } from '@/types/ops';

export const PaymentGatewaysPage: React.FC = () => {
  const { user } = useAuth();
  const [tick, setTick] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const gateways = useMemo(() => {
    try {
      return listGateways(user);
    } catch {
      return [] as PaymentGateway[];
    }
  }, [user, tick]);

  const save = (id: string, patch: Partial<PaymentGateway>, note: string) => {
    setError(null);
    try {
      updateGateway(id, patch, user);
      setMessage(note);
      setTick((n) => n + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update denied.');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-surface-container/70 border border-outline/70 p-6 rounded-md">
        <Badge variant="primary">SETTLEMENT RAILS</Badge>
        <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">Payment Gateway Configuration</h1>
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
      <div className="space-y-4">
        {gateways.map((gw) => (
          <Card key={gw.id} variant="glass" className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-white">{gw.name}</h3>
                <div className="text-[11px] font-mono text-slate-400">{gw.rail} • {gw.settlementDelay}</div>
              </div>
              <Switch checked={gw.enabled} onChange={(checked) => save(gw.id, { enabled: checked }, `${gw.name} ${checked ? 'enabled' : 'disabled'}.`)} />
            </div>
            <Input
              label="Settlement address / instructions"
              value={gw.address}
              onChange={(e) => save(gw.id, { address: e.target.value }, 'Address updated.')}
            />
            <Input
              label="Settlement delay"
              value={gw.settlementDelay}
              onChange={(e) => save(gw.id, { settlementDelay: e.target.value }, 'Delay updated.')}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PaymentGatewaysPage;
