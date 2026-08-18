import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';

export const CheckoutPage: React.FC = () => {
  const [paymentRail, setPaymentRail] = useState<'USDC' | 'ETH' | 'WIRE'>('USDC');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/client/dashboard');
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      <div className="space-y-2 text-center">
        <Badge variant="primary">SECURE CRYPTOGRAPHIC CHECKOUT</Badge>
        <h1 className="font-display font-black text-3xl text-white">
          Audit Escrow & Settlement Gate
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-sans">
          Funds are held in a smart contract multi-sig escrow and released upon Phase 4 milestone sign-off.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Payment Rails (2 cols) */}
        <div className="md:col-span-2 space-y-6">
          <Card variant="fresnel" className="p-6 space-y-4">
            <CardHeader className="mb-2">
              <CardTitle>Select Payment Rail</CardTitle>
            </CardHeader>

            <div className="space-y-3">
              {[
                { id: 'USDC', name: 'USDC (ERC-20 / Arbitrum / Solana)', icon: 'payments', desc: 'Instant multi-sig escrow deposit' },
                { id: 'ETH', name: 'Ethereum Native (ETH)', icon: 'currency_bitcoin', desc: 'Auto-converted at spot oracle rate' },
                { id: 'WIRE', name: 'Institutional USD Wire / Swift', icon: 'account_balance', desc: 'Invoiced via Zamaron Pro Corporate' },
              ].map((rail) => (
                <div
                  key={rail.id}
                  onClick={() => setPaymentRail(rail.id as any)}
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
                  {paymentRail === rail.id && (
                    <Icon name="check_circle" size={20} className="text-primary" />
                  )}
                </div>
              ))}
            </div>

            {paymentRail === 'USDC' && (
              <div className="p-4 bg-[#060e20] border border-primary/30 rounded space-y-2 font-mono text-xs">
                <span className="text-slate-400 text-[10px]">ESCROW DEPOSIT ADDRESS (USDC):</span>
                <div className="text-primary font-bold text-xs break-all bg-[#0b1326] p-2 rounded border border-outline">
                  0x71fa498a9b24e019c8192a01948ba19248a9102c
                </div>
                <p className="text-[10px] text-slate-500">
                  Transactions detected automatically via RPC websocket stream.
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* Order Summary (1 col) */}
        <div className="space-y-4">
          <Card variant="glass" className="p-6 space-y-4">
            <h3 className="font-display font-bold text-lg text-white border-b border-outline/50 pb-2">
              Order Summary
            </h3>

            <div className="space-y-2 font-mono text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Tier:</span>
                <span className="text-white font-bold">Professional Tier</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Target Protocol:</span>
                <span className="text-primary">Nexus DeFi Core</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Turnaround:</span>
                <span className="text-slate-200">3 Business Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Lead Auditors:</span>
                <span className="text-slate-200">2 Lead Verifiers</span>
              </div>
            </div>

            <div className="pt-4 border-t border-outline/60 space-y-1 font-mono">
              <div className="flex justify-between text-slate-400 text-xs">
                <span>Escrow Total:</span>
                <span>$25,000.00</span>
              </div>
              <div className="flex justify-between text-primary font-bold text-lg">
                <span>Total Due:</span>
                <span>25,000 USDC</span>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full mt-4"
              loading={loading}
              onClick={handleConfirm}
              icon="verified_user"
            >
              Deposit & Launch Audit
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
