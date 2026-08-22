import React, { useMemo, useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { Modal } from '@/components/ui/Modal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlowBackground } from '@/components/ui/GlowBackground';
import { searchArticles, submitTicket } from '@/services/supportService';

export const SupportPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [ticketOpen, setTicketOpen] = useState(false);
  const [ticketName, setTicketName] = useState('');
  const [ticketEmail, setTicketEmail] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketBody, setTicketBody] = useState('');
  const [ticketNote, setTicketNote] = useState<string | null>(null);
  const articles = useMemo(() => searchArticles(search), [search]);

  const statusItems = [
    { name: 'Core Audit Ledger', status: 'OPERATIONAL', latency: '14ms', icon: 'gavel' },
    { name: 'Neural Forensics Engine', status: 'OPERATIONAL', latency: '28ms', icon: 'smart_toy' },
    { name: 'Skynet Threat Radar', status: 'OPERATIONAL', latency: '8ms', icon: 'radar' },
    { name: 'Document Cryptographic Vault', status: 'OPERATIONAL', latency: '18ms', icon: 'lock' },
    { name: 'DAO Governance Relays', status: 'OPERATIONAL', latency: '42ms', icon: 'how_to_vote' },
    { name: 'Payment Rail Settle Gate', status: 'OPERATIONAL', latency: '35ms', icon: 'payments' },
  ];

  const categories = [
    {
      title: 'Smart Contract Auditing',
      icon: 'shield',
      count: '14 Articles',
      desc: 'Scoping guidelines, SWC taxonomy, turnaround expectations, and remediation reports.',
    },
    {
      title: 'AI Forensic Tools & APIs',
      icon: 'smart_toy',
      count: '9 Articles',
      desc: 'Bytecode decompiler, opcode analysis, automated invariant fuzzing, and webhook configurations.',
    },
    {
      title: 'Billing & Token Checkout',
      icon: 'credit_card',
      count: '6 Articles',
      desc: 'Supported cryptocurrencies, multi-sig escrow settlements, invoices, and refund procedures.',
    },
    {
      title: 'Operator & Node Enclaves',
      icon: 'terminal',
      count: '11 Articles',
      desc: 'Hardware security key setup, WebAuthn enrollment, node latency tuning, and access levels.',
    },
  ];

  return (
    <div className="space-y-16 py-12">
      {/* Hero */}
      <GlowBackground variant="subtle" className="py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <SectionHeading
            badge="COMMAND CENTER SUPPORT"
            title="How Can We Assist Your Operations?"
            description="Access specialized technical resources, live node diagnostic status, and cryptographic ticket support."
          />

          <div className="max-w-xl mx-auto pt-2">
            <Input
              placeholder="Search documentation, SWC vulnerability codes, API guides..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon="search"
            />
          </div>
        </div>
      </GlowBackground>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Live System Diagnostics Grid */}
        <GlassCard variant="fresnel" blur="xl" className="p-6 sm:p-8 space-y-6 border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="font-display font-bold text-lg text-white">
                Real-Time Node Diagnostics & System Vitality
              </h3>
            </div>
            <Badge variant="success" size="sm" dot>
              ALL SYSTEMS 100% OPERATIONAL
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {statusItems.map((s) => (
              <div
                key={s.name}
                className="p-3.5 bg-[#060e20]/80 border border-white/10 rounded-xl flex flex-col justify-between hover:border-cyan-400/40 transition-all group"
              >
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <Icon name={s.icon} size={18} className="text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">{s.latency}</span>
                </div>
                <div>
                  <div className="text-xs font-semibold text-white leading-tight">{s.name}</div>
                  <div className="text-[10px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {s.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Support Categories */}
        <div className="space-y-6">
          <h2 className="font-display font-bold text-2xl text-white">Browse Knowledge Hub</h2>
          {search && (
            <GlassCard variant="default" className="p-5 space-y-3 border-white/10">
              <h3 className="font-display font-bold text-white">Knowledge hits ({articles.length})</h3>
              {articles.map((article) => (
                <div key={article.id} className="border-b border-white/10 pb-3">
                  <div className="text-sm font-bold text-white">{article.title}</div>
                  <p className="text-xs text-slate-400 mt-1">{article.body}</p>
                </div>
              ))}
              {articles.length === 0 && <p className="text-xs text-slate-500">No articles matched that query.</p>}
            </GlassCard>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((c) => (
              <GlassCard
                key={c.title}
                variant="elevated"
                hoverEffect
                blur="lg"
                className="p-6 space-y-3 cursor-pointer border-white/10 group"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-[#060e20] text-cyan-400 border border-cyan-500/30 group-hover:shadow-[0_0_15px_rgba(0,218,243,0.3)] transition-all">
                    <Icon name={c.icon} size={24} />
                  </div>
                  <span className="text-xs font-mono text-slate-400">{c.count}</span>
                </div>
                <h3 className="font-display font-bold text-lg text-white group-hover:text-cyan-200 transition-colors">
                  {c.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">{c.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Direct Ticket Dispatch */}
        <GlassCard
          variant="fresnel"
          blur="xl"
          className="p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border-cyan-500/30"
        >
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-display font-bold text-2xl text-white">Need Priority Incident Response?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
              Directly interface with the Zamaron lead cryptographic triage team. Guaranteed 15-minute response for active critical exploits.
            </p>
          </div>
          <Button size="lg" icon="support_agent" onClick={() => setTicketOpen(true)}>
            Dispatch Emergency Ticket
          </Button>
        </GlassCard>
      </div>

      <Modal
        isOpen={ticketOpen}
        onClose={() => setTicketOpen(false)}
        title="Dispatch Incident Ticket"
        subtitle="15-minute critical response window"
      >
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            const ticket = submitTicket({
              name: ticketName,
              email: ticketEmail,
              subject: ticketSubject,
              body: ticketBody,
              severity: 'CRITICAL',
            });
            setTicketNote(`Ticket ${ticket.id} queued.`);
            setTicketSubject('');
            setTicketBody('');
          }}
        >
          <Input label="Name" value={ticketName} onChange={(e) => setTicketName(e.target.value)} required />
          <Input label="Email" type="email" value={ticketEmail} onChange={(e) => setTicketEmail(e.target.value)} required />
          <Input label="Subject" value={ticketSubject} onChange={(e) => setTicketSubject(e.target.value)} required />
          <textarea
            required
            rows={4}
            value={ticketBody}
            onChange={(e) => setTicketBody(e.target.value)}
            className="w-full bg-[#060e20] border border-white/15 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30"
            placeholder="Describe the incident..."
          />
          {ticketNote && <p className="text-xs font-mono text-emerald-400">{ticketNote}</p>}
          <Button type="submit" className="w-full" icon="send">
            Submit Ticket
          </Button>
        </form>
      </Modal>
    </div>
  );
};
