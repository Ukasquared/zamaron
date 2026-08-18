import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';

export const SupportPage: React.FC = () => {
  const [search, setSearch] = useState('');

  const statusItems = [
    { name: 'Core Audit Ledger', status: 'OPERATIONAL', latency: '14ms', icon: 'gavel' },
    { name: 'Neural Forensics Engine', status: 'OPERATIONAL', latency: '28ms', icon: 'smart_toy' },
    { name: 'Skynet Threat Radar', status: 'OPERATIONAL', latency: '8ms', icon: 'radar' },
    { name: 'Document Cryptographic Vault', status: 'OPERATIONAL', latency: '18ms', icon: 'lock' },
    { name: 'DAO Governance Relays', status: 'OPERATIONAL', latency: '42ms', icon: 'how_to_vote' },
    { name: 'Payment Rail Settle Gate', status: 'OPERATIONAL', latency: '35ms', icon: 'payments' },
  ];

  const categories = [
    { title: 'Smart Contract Auditing', icon: 'shield', count: '14 Articles', desc: 'Scoping guidelines, SWC taxonomy, turnaround expectations, and remediation reports.' },
    { title: 'AI Forensic Tools & APIs', icon: 'smart_toy', count: '9 Articles', desc: 'Bytecode decompiler, opcode analysis, automated invariant fuzzing, and webhook configurations.' },
    { title: 'Billing & Token Checkout', icon: 'credit_card', count: '6 Articles', desc: 'Supported cryptocurrencies, multi-sig escrow settlements, invoices, and refund procedures.' },
    { title: 'Operator & Node Enclaves', icon: 'terminal', count: '11 Articles', desc: 'Hardware security key setup, WebAuthn enrollment, node latency tuning, and access levels.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="primary">COMMAND CENTER SUPPORT</Badge>
        <h1 className="font-display font-black text-4xl sm:text-5xl text-white">
          How Can We Assist Your Operations?
        </h1>
        <p className="text-slate-300 text-sm sm:text-base">
          Access specialized technical resources, live node diagnostic status, and cryptographic ticket support.
        </p>

        <div className="max-w-xl mx-auto pt-4">
          <Input
            placeholder="Search documentation, SWC vulnerability codes, API guides..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon="search"
          />
        </div>
      </div>

      {/* Live System Diagnostics Grid */}
      <Card variant="fresnel" className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-outline/50 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="font-display font-bold text-base text-white">
              Real-Time Node Diagnostics & Vitality
            </h3>
          </div>
          <Badge variant="success" size="sm">ALL SYSTEMS 100% OPERATIONAL</Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {statusItems.map((s) => (
            <div key={s.name} className="p-3 bg-[#060e20] border border-outline/70 rounded flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <Icon name={s.icon} size={18} className="text-primary" />
                <span className="text-[10px] font-mono text-emerald-400 font-bold">{s.latency}</span>
              </div>
              <div>
                <div className="text-xs font-semibold text-white leading-tight">{s.name}</div>
                <div className="text-[10px] font-mono text-emerald-400 mt-1">{s.status}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Support Categories */}
      <div className="space-y-6">
        <h2 className="font-display font-bold text-2xl text-white">Browse Knowledge Hub</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((c) => (
            <Card key={c.title} variant="glass" hoverEffect className="p-6 space-y-3 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded bg-[#060e20] text-primary border border-primary/30">
                  <Icon name={c.icon} size={24} />
                </div>
                <span className="text-xs font-mono text-slate-400">{c.count}</span>
              </div>
              <h3 className="font-display font-bold text-lg text-white">{c.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{c.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Direct Ticket Dispatch */}
      <Card variant="glass" className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="font-display font-bold text-xl text-white">Need Priority Incident Response?</h3>
          <p className="text-xs text-slate-400 max-w-lg">
            Directly interface with the Zamaron lead cryptographic triage team. Guaranteed 15-minute response for active critical exploits.
          </p>
        </div>
        <Button size="lg" icon="support_agent">
          Dispatch Emergency Ticket
        </Button>
      </Card>
    </div>
  );
};
