import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { useAuth } from '@/context/AuthContext';
import { clearPendingCheckout, createAuditRequest, getPendingCheckout } from '@/services/auditService';
import { getEnabledGateway, recordSettlement } from '@/services/adminService';

const TIER_META = {
  STANDARD: { label: 'Standard Tier', amount: 12500, time: '5 Business Days' },
  PROFESSIONAL: { label: 'Professional Tier', amount: 25000, time: '3 Business Days' },
  ENTERPRISE: { label: 'Enterprise Matrix', amount: 50000, time: '24/7 Red Team' },
} as const;

export const CheckoutPage: React.FC = () => {
  const [paymentRail, setPaymentRail] = useState<'USDC' | 'ETH' | 'WIRE'>('USDC');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const draft = useMemo(() => getPendingCheckout(), []);
  const tier = draft?.tier ?? 'PROFESSIONAL';
  const meta = TIER_META[tier];
  const gateway = getEnabledGateway(paymentRail);

  const handleConfirm = () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const payload = draft ?? {
        projectName: 'Untitled Protocol',
        protocolType: 'DEX',
        targetRepo: 'pending/repo',
        commitHash: 'unspecified',
        tier,
        attachments: [],
      };
      const audit = createAuditRequest(
        {
          ...payload,
          ownerId: user.id,
          ownerName: user.name,
        },
        user
      );
      try {
        recordSettlement(
          {
            client: payload.projectName,
            clientWallet: user.walletAddress,
            tier: meta.label,
            amountValue: meta.amount,
            rail: paymentRail,
            description: `Audit escrow for ${payload.projectName} (${audit.id})`,
          },
          user.role === 'ADMIN' ? user : null
        );
      } catch {
        // Clients cannot write the admin ledger; the engagement still launches.
      }
      clearPendingCheckout();
      navigate(`/client/audits/${audit.id}/status`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Settlement failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      <div className="space-y-2 text-center">
        <Badge variant="primary">SECURE CRYPTOGRAPHIC CHECKOUT</Badge>
        <h1 className="font-display font-black text-3xl text-white">Audit Escrow & Settlement Gate</h1>
        <p className="text-xs sm:text-sm text-slate-400 font-sans">
          Funds are held in a smart contract multi-sig escrow and released upon Phase 4 milestone sign-off.
        </p>
      </div>

      {error && <div className="text-xs font-mono text-error bg-error/10 border border-error/40 rounded px-3 py-2">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card variant="fresnel" className="p-6 space-y-4">
            <CardHeader className="mb-2">
              <CardTitle>Select Payment Rail</CardTitle>
            </CardHeader>

            <div className="space-y-3">
              {(
                [
                  { id: 'USDC', name: 'USDC (ERC-20 / Arbitrum / Solana)', icon: 'payments', desc: 'Instant multi-sig escrow deposit' },
                  { id: 'ETH', name: 'Ethereum Native (ETH)', icon: 'currency_bitcoin', desc: 'Auto-converted at spot oracle rate' },
                  { id: 'WIRE', name: 'Institutional USD Wire / Swift', icon: 'account_balance', desc: 'Invoiced via Zamaron Pro Corporate' },
                ] as const
              ).map((rail) => (
                <div
                  key={rail.id}
                  onClick={() => setPaymentRail(rail.id)}
                  className={`p-4 rounded border transition-all cursor-pointer flex items-center justify-between ${
                    paymentRail === rail.id
                      ? 'bg-primary/15 border-primary shadow-[0_0_15px_rgba(0,218,243,0.3)]'
                      : 'bg-[#060e20] border-outline/70 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-[#0b1326] text-primary">
                      <Icon name={rail.icon} size={22} />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white font-display">{rail.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{rail.desc}</div>
                    </div>
                  </div>
                  {paymentRail === rail.id && <Icon name="check_circle" size={20} className="text-primary" />}
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#060e20] border border-primary/30 rounded space-y-2 font-mono text-xs">
              <span className="text-slate-400 text-[10px]">ESCROW DEPOSIT ({paymentRail}):</span>
              <div className="text-primary font-bold text-xs break-all bg-[#0b1326] p-2 rounded border border-outline">
                {gateway?.address || 'Rail disabled by administrator'}
              </div>
              <p className="text-[10px] text-slate-500">
                {gateway ? `Settlement: ${gateway.settlementDelay}` : 'Ask an admin to enable this rail.'}
              </p>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card variant="glass" className="p-6 space-y-4">
            <h3 className="font-display font-bold text-lg text-white border-b border-outline/50 pb-2">Order Summary</h3>
            <div className="space-y-2 font-mono text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Tier:</span>
                <span className="text-white font-bold">{meta.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Target Protocol:</span>
                <span className="text-primary">{draft?.projectName || 'Pending scope'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Turnaround:</span>
                <span className="text-slate-200">{meta.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Commit:</span>
                <span className="text-slate-200">{draft?.commitHash || '—'}</span>
              </div>
            </div>
            <div className="pt-4 border-t border-outline/60 space-y-1 font-mono">
              <div className="flex justify-between text-slate-400 text-xs">
                <span>Escrow Total:</span>
                <span>${meta.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-primary font-bold text-lg">
                <span>Total Due:</span>
                <span>
                  {meta.amount.toLocaleString()} {paymentRail}
                </span>
              </div>
            </div>
            <Button size="lg" className="w-full mt-4" loading={loading} onClick={handleConfirm} icon="verified_user">
              Deposit & Launch Audit
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
