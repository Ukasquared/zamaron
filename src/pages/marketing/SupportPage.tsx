import React, { useMemo, useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Modal } from '@/components/ui/Modal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlowBackground } from '@/components/ui/GlowBackground';
import { Parallax } from '@/components/ui/Parallax';
import { Reveal } from '@/components/ui/Reveal';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
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
    <div className="relative space-y-16 py-12 overflow-hidden">
      <ScrollProgress />

      {/* Hero — search arrives after the heading while the diagnostic radar scans behind it. */}
      <GlowBackground variant="subtle" className="py-10 sm:py-14">
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <Parallax
            speed={-0.075}
            clamp={30}
            className="absolute -right-28 -top-28 sm:right-[5%]"
          >
            <div className="support-radar">
              <span className="support-radar-node support-radar-node--one" />
              <span className="support-radar-node support-radar-node--two" />
              <span className="support-radar-node support-radar-node--three" />
            </div>
          </Parallax>
          <Parallax
            speed={-0.04}
            clamp={20}
            className="absolute -left-24 bottom-0"
          >
            <div className="h-56 w-56 rounded-full bg-purple-500/[0.05] blur-[50px]" />
          </Parallax>
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">
          <Reveal variant="hero" delay={30}>
            <SectionHeading
              badge="COMMAND CENTER SUPPORT"
              title="How Can We Assist Your Operations?"
              description="Access specialized technical resources, live node diagnostic status, and cryptographic ticket support."
            />
          </Reveal>

          <Reveal variant="scale" delay={210}>
            <div className="max-w-xl mx-auto pt-2">
              <div className="support-search-shell">
                <Input
                  aria-label="Search support documentation"
                  placeholder="Search documentation, SWC vulnerability codes, API guides..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  icon="search"
                  className="support-search-input"
                />
              </div>
              <div
                className="mt-3 flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-[0.12em] text-slate-500"
                aria-live="polite"
              >
                <span className="support-index-dot" aria-hidden="true" />
                {search
                  ? `${articles.length} encrypted knowledge ${articles.length === 1 ? 'match' : 'matches'}`
                  : '40 indexed operational resources'}
              </div>
            </div>
          </Reveal>
        </div>
      </GlowBackground>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Parallax
          speed={-0.04}
          clamp={22}
          className="pointer-events-none absolute -left-52 top-1/3 h-80 w-80 rounded-full bg-purple-500/[0.06] blur-[100px]"
          aria-hidden="true"
        />


        {/* Support Categories */}
        <section className="space-y-6" aria-labelledby="knowledge-hub-heading">
          <Reveal variant="rise">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-[10px] font-mono uppercase tracking-[0.18em] text-cyan-400">
                  Encrypted knowledge index
                </p>
                <h2
                  id="knowledge-hub-heading"
                  className="font-display font-bold text-2xl text-white"
                >
                  Browse Knowledge Hub
                </h2>
              </div>
              <span className="hidden sm:block text-[10px] font-mono uppercase tracking-wider text-slate-500">
                Updated live
              </span>
            </div>
          </Reveal>

          {search && (
            <div
              className="support-search-results"
              role="region"
              aria-label="Knowledge search results"
              aria-live="polite"
            >
              <GlassCard variant="default" className="p-5 border-white/10">
                <div className="relative space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display font-bold text-white">
                      Knowledge hits ({articles.length})
                    </h3>
                    <Icon name="database" size={18} className="text-cyan-400" />
                  </div>
                  {articles.map((article, index) => (
                    <div
                      key={article.id}
                      className="support-result-row border-b border-white/10 pb-3 last:border-b-0 last:pb-0"
                      style={{ animationDelay: `${index * 55}ms` }}
                    >
                      <div className="text-sm font-bold text-white">
                        {article.title}
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        {article.body}
                      </p>
                    </div>
                  ))}
                  {articles.length === 0 && (
                    <div className="support-empty-result flex items-center gap-2 py-2 text-xs text-slate-500">
                      <Icon name="search_off" size={18} />
                      No articles matched that query.
                    </div>
                  )}
                </div>
              </GlassCard>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((c, index) => (
              <Reveal
                key={c.title}
                variant="scale"
                delay={index * 85}
                className="h-full"
                threshold={0.08}
              >
                <GlassCard
                  variant="elevated"
                  hoverEffect
                  spotlight
                  tilt
                  blur="lg"
                  className="support-category-card h-full p-6 cursor-pointer border-white/10 group"
                >
                  <div className="relative h-full space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="support-category-icon p-2.5 rounded-xl bg-[#060e20] text-cyan-400 border border-cyan-500/30 transition-all duration-500">
                        <Icon name={c.icon} size={24} />
                      </div>
                      <span className="text-xs font-mono text-slate-400">
                        {c.count}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-cyan-200 transition-colors duration-300">
                      {c.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {c.desc}
                    </p>
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Direct Ticket Dispatch */}
        <Reveal variant="clip" threshold={0.08}>
          <GlassCard
            variant="fresnel"
            blur="xl"
            spotlight
            className="support-incident-card p-8 sm:p-10 border-cyan-500/30"
          >
            <div className="support-response-orbit" aria-hidden="true">
              <span />
            </div>
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <h3 className="font-display font-bold text-2xl text-white">
                  Need Priority Incident Response?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
                  Directly interface with the Zamaron lead cryptographic triage
                  team. Guaranteed 15-minute response for active critical
                  exploits.
                </p>
              </div>
              <Button
                size="lg"
                icon="support_agent"
                className="shrink-0"
                onClick={() => setTicketOpen(true)}
              >
                Dispatch Emergency Ticket
              </Button>
            </div>
          </GlassCard>
        </Reveal>
      </div>

      <Modal
        isOpen={ticketOpen}
        onClose={() => setTicketOpen(false)}
        title="Dispatch Incident Ticket"
        subtitle="15-minute critical response window"
        className="support-ticket-modal"
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
          <Input
            label="Name"
            value={ticketName}
            onChange={(e) => setTicketName(e.target.value)}
            required
          />
          <Input
            label="Email"
            type="email"
            value={ticketEmail}
            onChange={(e) => setTicketEmail(e.target.value)}
            required
          />
          <Input
            label="Subject"
            value={ticketSubject}
            onChange={(e) => setTicketSubject(e.target.value)}
            required
          />
          <textarea
            required
            rows={4}
            value={ticketBody}
            onChange={(e) => setTicketBody(e.target.value)}
            className="w-full bg-[#060e20] border border-white/15 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30"
            placeholder="Describe the incident..."
          />
          {ticketNote && (
            <p className="text-xs font-mono text-emerald-400">{ticketNote}</p>
          )}
          <Button type="submit" className="w-full" icon="send">
            Submit Ticket
          </Button>
        </form>
      </Modal>
    </div>
  );
};
