import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Switch } from '@/components/ui/Switch';
import { useAuth } from '@/context/AuthContext';
import { deleteTokenReport, listTokenReports, upsertTokenReport } from '@/services/adminService';
import type { TokenReportOverride } from '@/types/ops';

const EMPTY: Omit<TokenReportOverride, 'id' | 'updatedAt'> = {
  contractAddress: '',
  tokenName: '',
  ticker: '',
  chain: 'Ethereum',
  notes: '',
  isHoneypot: false,
  hasMintFunction: false,
  hasBlacklist: false,
  hasProxy: false,
  liquidityLockedPercent: 80,
  top10HoldersPercent: 25,
};

export const TokenRiskEditorPage: React.FC = () => {
  const { user } = useAuth();
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState<string | undefined>();
  const [tick, setTick] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const reports = useMemo(() => {
    try {
      return listTokenReports(user);
    } catch {
      return [] as TokenReportOverride[];
    }
  }, [user, tick]);

  const save = () => {
    setError(null);
    if (!form.contractAddress.trim()) {
      setError('Contract address is required.');
      return;
    }
    try {
      upsertTokenReport({ ...form, id: editingId }, user);
      setMessage('Calibration saved. Token analyzer will apply this override.');
      setForm(EMPTY);
      setEditingId(undefined);
      setTick((n) => n + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save denied.');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container/70 border border-outline/70 p-6 rounded-md">
        <div>
          <Badge variant="primary">RISK CALIBRATION</Badge>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">Token Risk Report Editor</h1>
        </div>
        <Link to="/threat-hub/token-analyzer">
          <Button variant="outline" size="sm" icon="query_stats">
            Open Analyzer
          </Button>
        </Link>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input label="Contract address" value={form.contractAddress} onChange={(e) => setForm({ ...form, contractAddress: e.target.value })} />
          <Input label="Token name" value={form.tokenName} onChange={(e) => setForm({ ...form, tokenName: e.target.value })} />
          <Input label="Ticker" value={form.ticker} onChange={(e) => setForm({ ...form, ticker: e.target.value })} />
          <Input label="Chain" value={form.chain} onChange={(e) => setForm({ ...form, chain: e.target.value })} />
          <Input
            label="Liquidity locked %"
            type="number"
            value={form.liquidityLockedPercent}
            onChange={(e) => setForm({ ...form, liquidityLockedPercent: Number(e.target.value) || 0 })}
          />
          <Input
            label="Top 10 holders %"
            type="number"
            value={form.top10HoldersPercent}
            onChange={(e) => setForm({ ...form, top10HoldersPercent: Number(e.target.value) || 0 })}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Switch checked={form.isHoneypot} onChange={(checked) => setForm({ ...form, isHoneypot: checked })} label="Honeypot flag" />
          <Switch checked={form.hasMintFunction} onChange={(checked) => setForm({ ...form, hasMintFunction: checked })} label="Mint function" />
          <Switch checked={form.hasBlacklist} onChange={(checked) => setForm({ ...form, hasBlacklist: checked })} label="Blacklist capability" />
          <Switch checked={form.hasProxy} onChange={(checked) => setForm({ ...form, hasProxy: checked })} label="Proxy / upgradeable" />
        </div>
        <Input label="Analyst notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
        <Button icon="save" onClick={save}>
          {editingId ? 'Update Override' : 'Save Override'}
        </Button>
      </Card>

      <div className="space-y-3">
        {reports.map((row) => (
          <Card key={row.id} variant="glass" className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="font-display font-bold text-white">
                {row.tokenName} ({row.ticker})
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                {row.chain} • {row.contractAddress} • LP {row.liquidityLockedPercent}%
              </div>
              {row.notes && <p className="text-xs text-slate-400 mt-1">{row.notes}</p>}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingId(row.id);
                  setForm({
                    contractAddress: row.contractAddress,
                    tokenName: row.tokenName,
                    ticker: row.ticker,
                    chain: row.chain,
                    notes: row.notes,
                    isHoneypot: row.isHoneypot,
                    hasMintFunction: row.hasMintFunction,
                    hasBlacklist: row.hasBlacklist,
                    hasProxy: row.hasProxy,
                    liquidityLockedPercent: row.liquidityLockedPercent,
                    top10HoldersPercent: row.top10HoldersPercent,
                  });
                }}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  try {
                    deleteTokenReport(row.id, user);
                    setTick((n) => n + 1);
                    setMessage('Override removed.');
                  } catch (err) {
                    setError(err instanceof Error ? err.message : 'Delete denied.');
                  }
                }}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TokenRiskEditorPage;
