import React, { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Tabs } from '@/components/ui/Tabs';
import { AddressBadge } from '@/components/shared/AddressBadge';
import { useAuth } from '@/context/AuthContext';
import { listOperators, listProtocols, updateOperator, updateProtocol } from '@/services/adminService';
import type { OperatorRecord, ProtocolRecord } from '@/types/ops';
import type { UserRole } from '@/types';

export const UsersProtocolsPage: React.FC = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState('users');
  const [query, setQuery] = useState('');
  const [tick, setTick] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const operators = useMemo(() => {
    try {
      return listOperators(user);
    } catch {
      return [] as OperatorRecord[];
    }
  }, [user, tick]);

  const protocols = useMemo(() => {
    try {
      return listProtocols(user);
    } catch {
      return [] as ProtocolRecord[];
    }
  }, [user, tick]);

  const run = (fn: () => void, ok: string) => {
    setError(null);
    try {
      fn();
      setMessage(ok);
      setTick((n) => n + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Denied.');
    }
  };

  const visibleOperators = operators.filter((row) =>
    `${row.name} ${row.email} ${row.role}`.toLowerCase().includes(query.toLowerCase())
  );
  const visibleProtocols = protocols.filter((row) =>
    `${row.name} ${row.category} ${row.contractAddress}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container/70 border border-outline/70 p-6 rounded-md">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary">MASTER REGISTRY</Badge>
            <span className="text-xs font-mono text-slate-400">Auditor roster & protocol parameters</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">User & Protocol Management</h1>
        </div>
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

      <Tabs
        activeTab={tab}
        onChange={setTab}
        items={[
          { id: 'users', label: 'Operators', icon: 'group', badge: operators.length },
          { id: 'protocols', label: 'Protocols', icon: 'hub', badge: protocols.length },
        ]}
      />

      <Input placeholder="Search registry..." value={query} onChange={(e) => setQuery(e.target.value)} icon="search" />

      {tab === 'users' && (
        <Card variant="glass" className="p-6 space-y-3">
          {visibleOperators.map((row) => (
            <div key={row.id} className="p-4 bg-[#060e20] border border-outline/60 rounded flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-white">{row.name}</span>
                  <Badge variant={row.status === 'ACTIVE' ? 'success' : 'critical'} size="sm">
                    {row.status}
                  </Badge>
                </div>
                <div className="text-[11px] font-mono text-slate-400 mt-1">
                  {row.email} • {row.clearance} • <AddressBadge address={row.walletAddress} />
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Select
                  value={row.role}
                  onChange={(e) =>
                    run(() => updateOperator(row.id, { role: e.target.value as UserRole }, user), `Role updated for ${row.name}.`)
                  }
                >
                  {(['CLIENT', 'AUDITOR', 'ADMIN', 'STUDENT'] as UserRole[]).map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </Select>
                {row.status !== 'ISOLATED' ? (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => run(() => updateOperator(row.id, { status: 'ISOLATED' }, user), `${row.name} isolated.`)}
                  >
                    Isolate
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => run(() => updateOperator(row.id, { status: 'ACTIVE' }, user), `${row.name} restored.`)}
                  >
                    Restore
                  </Button>
                )}
              </div>
            </div>
          ))}
        </Card>
      )}

      {tab === 'protocols' && (
        <Card variant="glass" className="p-6 space-y-3">
          <CardHeader className="mb-2">
            <CardTitle>Watched Protocols</CardTitle>
          </CardHeader>
          {visibleProtocols.map((row) => (
            <div key={row.id} className="p-4 bg-[#060e20] border border-outline/60 rounded space-y-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-white">{row.name}</span>
                    <Badge
                      variant={
                        row.status === 'BLACKLISTED' || row.status === 'ISOLATED' ? 'critical' : 'primary'
                      }
                      size="sm"
                    >
                      {row.status}
                    </Badge>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 mt-1">
                    {row.category} • risk {row.riskScore} • <AddressBadge address={row.contractAddress} />
                  </div>
                </div>
                <div className="flex gap-2">
                  {row.status !== 'ISOLATED' && row.status !== 'BLACKLISTED' ? (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => run(() => updateProtocol(row.id, { status: 'ISOLATED' }, user), `${row.name} isolated.`)}
                    >
                      Isolate
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => run(() => updateProtocol(row.id, { status: 'RESTORED' }, user), `${row.name} restored.`)}
                    >
                      Restore
                    </Button>
                  )}
                </div>
              </div>
              <Input
                label="Gas threshold (gwei)"
                type="number"
                value={row.gasThresholdGwei}
                onChange={(e) =>
                  run(
                    () => updateProtocol(row.id, { gasThresholdGwei: Number(e.target.value) || 0 }, user),
                    'Gas threshold updated.'
                  )
                }
              />
            </div>
          ))}
        </Card>
      )}
    </div>
  );
};

export default UsersProtocolsPage;
