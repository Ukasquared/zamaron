import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { StatCard } from '@/components/shared/StatCard';
import { useAuth } from '@/context/AuthContext';
import { downloadTextFile } from '@/lib/download';
import { generateStatementCsv, getBillingHistory } from '@/services/adminService';

export const BillingHistoryPage: React.FC = () => {
  const { user } = useAuth();
  const transactions = useMemo(() => {
    try {
      return getBillingHistory(user);
    } catch {
      return [];
    }
  }, [user]);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container/70 border border-outline/70 p-6 rounded-md">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary">FINANCIAL LEDGER</Badge>
            <span className="text-xs font-mono text-slate-400">Institutional Escrow & Invoicing</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
            Billing History & Transaction Log
          </h1>
        </div>

        <Button
          size="md"
          icon="receipt_long"
          onClick={() => {
            try {
              downloadTextFile('zamaron-billing-statement.csv', generateStatementCsv(user), 'text/csv;charset=utf-8');
            } catch {
              /* route-gated */
            }
          }}
        >
          Generate Statement
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Revenue (30d)" value="$385,000" delta="+22.4%" icon="payments" variant="fresnel" />
        <StatCard label="Pending Escrow Releases" value="$75,000" delta="3 Engagements" icon="hourglass_empty" variant="glass" />
        <StatCard label="Active Retainers" value="18 Protocols" delta="100% On-Time" icon="verified" variant="glass" />
      </div>

      <Card variant="glass" className="p-6 space-y-4">
        <div className="overflow-x-auto cyber-scrollbar">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-outline/70 text-slate-400 uppercase text-[10px]">
                <th className="pb-3 pr-3">Invoice ID</th>
                <th className="pb-3 px-3">Protocol Client</th>
                <th className="pb-3 px-3">Service Tier</th>
                <th className="pb-3 px-3">Rail / Date</th>
                <th className="pb-3 px-3">Amount</th>
                <th className="pb-3 pl-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/40">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-white/5">
                  <td className="py-3.5 pr-3 text-primary font-bold">{tx.invoiceNumber || tx.id}</td>
                  <td className="py-3.5 px-3 font-semibold text-white">{tx.client}</td>
                  <td className="py-3.5 px-3 text-slate-300">{tx.tier}</td>
                  <td className="py-3.5 px-3 text-slate-400">{tx.rail} • {tx.date}</td>
                  <td className="py-3.5 px-3 font-bold text-white">{tx.amount}</td>
                  <td className="py-3.5 pl-3 text-right">
                    <Link to={`/admin/invoices/${tx.id}`}>
                      <Button variant="terminal" size="sm" icon="receipt">
                        View Invoice
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
