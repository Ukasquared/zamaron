import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { useAuth } from '@/context/AuthContext';
import { getInvoice } from '@/services/adminService';

export const InvoiceTemplatePage: React.FC = () => {
  const { id = 'ZM-8994-VX' } = useParams<{ id: string }>();
  const { user } = useAuth();
  const invoice = useMemo(() => {
    try {
      return getInvoice(id, user);
    } catch {
      return null;
    }
  }, [id, user]);
  const displayId = invoice?.invoiceNumber || id;
  const client = invoice?.client || 'Nexus DeFi Foundation';
  const amount = invoice?.amount || '$50,000.00';
  const rail = invoice?.rail || 'USDC';
  const date = invoice?.date || '2026-08-16';
  const description = invoice?.description || 'Enterprise Smart Contract Security Audit (4-Stage Pipeline)';
  const wallet = invoice?.clientWallet || '0x48f9...92a1';
  const txHash = invoice?.txHash || '0x9fa1...489c';

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      <div className="flex items-center justify-between">
        <Link to="/admin/billing" className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1">
          <Icon name="arrow_back" size={16} /> Back to Billing
        </Link>
        <Button size="sm" icon="print" onClick={() => window.print()}>
          Print Invoice
        </Button>
      </div>

      <Card variant="fresnel" className="p-8 sm:p-12 space-y-8 bg-[#081024] border-primary/40 shadow-2xl">
        <div className="flex items-center justify-between border-b border-outline/60 pb-6">
          <div>
            <div className="font-display font-black text-2xl text-white">ZAMARON PRO</div>
            <div className="text-xs font-mono text-primary font-bold">CRYSTALLINE INVOICE</div>
          </div>
          <div className="text-right font-mono text-xs text-slate-400">
            <div className="text-white font-bold text-sm">INVOICE #{displayId}</div>
            <div>Date: {date}</div>
            <Badge variant="success" size="sm">PAID & SETTLED</Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 text-xs font-mono">
          <div>
            <span className="text-slate-500 block mb-1">BILLED TO NODE:</span>
            <div className="text-white font-bold">{client}</div>
            <div className="text-slate-400">{wallet}</div>
          </div>
          <div className="text-right">
            <span className="text-slate-500 block mb-1">PAYMENT RAIL:</span>
            <div className="text-primary font-bold">{rail}</div>
            <div className="text-slate-400">Tx: {txHash}</div>
          </div>
        </div>

        {/* Line Items */}
        <div className="border-t border-b border-outline/60 py-4">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="text-slate-500 uppercase text-[10px]">
                <th className="pb-2">Description</th>
                <th className="pb-2 text-center">Cycle</th>
                <th className="pb-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/30">
              <tr>
                <td className="py-3 font-semibold text-white">
                  {description.split('\n')[0]}
                  <div className="text-[10px] text-slate-400">{description.split('\n')[1] || invoice?.tier}</div>
                </td>
                <td className="py-3 text-center text-slate-400">Fixed</td>
                <td className="py-3 text-right font-bold text-white">{amount}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center font-mono pt-2">
          <span className="text-xs text-slate-400">Cryptographically Signed Proof</span>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Total Amount Settled:</span>
            <span className="text-2xl font-black text-primary font-display">$50,000.00 USDC</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
