import React, { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';
import { createRefund, decideRefund, getBillingHistory, listRefunds } from '@/services/adminService';
import type { RefundRequest } from '@/types/ops';

export const RefundsPage: React.FC = () => {
  const { user } = useAuth();
  const [tick, setTick] = useState(0);
  const [invoiceId, setInvoiceId] = useState('INV-8991-OP');
  const [client, setClient] = useState('');
  const [amount, setAmount] = useState('$1,000');
  const [reason, setReason] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const refunds = useMemo(() => {
    try {
      return listRefunds(user);
    } catch {
      return [] as RefundRequest[];
    }
  }, [user, tick]);

  const invoices = useMemo(() => {
    try {
      return getBillingHistory(user);
    } catch {
      return [];
    }
  }, [user]);

  const submit = () => {
    setError(null);
    try {
      const matched = invoices.find((row) => row.invoiceNumber === invoiceId || row.id === invoiceId);
      createRefund(
        {
          invoiceId,
          client: client || matched?.client || 'Unknown client',
          amount,
          reason,
        },
        user
      );
      setMessage('Refund queued for multi-sig review.');
      setReason('');
      setTick((n) => n + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to queue refund.');
    }
  };

  const decide = (id: string, status: 'APPROVED' | 'DENIED') => {
    try {
      decideRefund(id, status, user);
      setMessage(`Refund ${status.toLowerCase()}.`);
      setTick((n) => n + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Decision failed.');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-surface-container/70 border border-outline/70 p-6 rounded-md">
        <Badge variant="warning">MULTI-SIG QUEUE</Badge>
        <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">Refund Management Terminal</h1>
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
          <Input label="Invoice ID" value={invoiceId} onChange={(e) => setInvoiceId(e.target.value)} />
          <Input label="Client" value={client} onChange={(e) => setClient(e.target.value)} />
          <Input label="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <Input label="Reason" value={reason} onChange={(e) => setReason(e.target.value)} />
        </div>
        <Button icon="sync" onClick={submit} disabled={!reason.trim()}>
          Queue Refund
        </Button>
      </Card>

      <div className="space-y-3">
        {refunds.map((row) => (
          <Card key={row.id} variant="glass" className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-white">{row.client}</span>
                <Badge variant={row.status === 'APPROVED' ? 'success' : row.status === 'DENIED' ? 'critical' : 'warning'} size="sm">
                  {row.status}
                </Badge>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {row.amount} • {row.invoiceId} • {row.reason}
              </p>
              <p className="text-[10px] font-mono text-slate-500 mt-1">
                Requested {row.requestedAt}
                {row.decidedBy ? ` • ${row.status} by ${row.decidedBy}` : ''}
              </p>
            </div>
            {row.status === 'PENDING' && (
              <div className="flex gap-2">
                <Button size="sm" onClick={() => decide(row.id, 'APPROVED')}>
                  Approve
                </Button>
                <Button variant="danger" size="sm" onClick={() => decide(row.id, 'DENIED')}>
                  Deny
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RefundsPage;
