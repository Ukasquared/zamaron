import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { StatCard } from '@/components/shared/StatCard';
import { MasterCatalogDrawer } from '@/components/shared/MasterCatalogDrawer';

export const HomePage: React.FC = () => {
  const [catalogOpen, setCatalogOpen] = useState(false);

  const pillars = [
    {
      title: 'Formal Verification',
      icon: 'verified_user',
      desc: 'Mathematically prove the correctness of smart contract state machines and eliminate zero-day vulnerabilities.',
      tag: 'MATHEMATICAL PROOF',
    },
    {
      title: 'Neural AI Forensics',
      icon: 'smart_toy',
      desc: 'Machine-speed opcode disassembly, semantic invariant checks, and cross-contract reentrancy heuristics.',
      tag: 'AI HEURISTICS',
    },
    {
      title: 'Institutional Audits',
      icon: 'gavel',
      desc: 'Comprehensive manual code inspection by top-tier cryptographic security researchers with verified bug records.',
      tag: 'HUMAN EXPERTISE',
    },
    {
      title: 'Skynet Threat Radar',
      icon: 'radar',
      desc: '24/7 continuous on-chain surveillance, mempool attack prediction, and automated liquidation protection.',
      tag: 'REAL-TIME SURVEILLANCE',
    },
  ];

  const steps = [
    { num: '01', title: 'Automated Scan', desc: 'Neural static analyzer identifies bytecode invariants and known SWC vectors.' },
    { num: '02', title: 'AI Summarize', desc: 'Context-aware decompilation isolates logic flows and highlights critical state transitions.' },
    { num: '03', title: 'Human Verification', desc: 'Lead security researchers conduct manual exploitation and verify edge cases.' },
    { num: '04', title: 'Final Report & Vault', desc: 'Cryptographically signed audit certificate issued with permanent blockchain anchor.' },
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs font-semibold shadow-[0_0_15px_rgba(0,218,243,0.2)]">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>CRYSTALLINE NEXUS • INSTITUTIONAL SECURITY</span>
        </div>

        <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight">
          Securing the Future of{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-cyan-200 to-secondary">
            Decentralized Finance
          </span>
        </h1>

        <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-sans">
          Uncompromising smart contract auditing, automated EVM bytecode forensics, and 24/7
          real-time threat surveillance. Protecting over <span className="text-primary font-bold font-mono">$64 Billion</span> in on-chain assets.
        </p>

        {/* CTA Button Group */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link to="/client/audits/new">
            <Button size="lg" icon="shield" className="shadow-[0_0_25px_rgba(0,218,243,0.4)]">
              Request Security Audit
            </Button>
          </Link>
          <Link to="/threat-hub/skynet">
            <Button variant="outline" size="lg" icon="radar">
              Launch Skynet Radar
            </Button>
          </Link>
          <button
            onClick={() => setCatalogOpen(true)}
            className="px-5 py-3 rounded text-sm font-mono font-bold bg-[#0b1326] border border-primary/40 text-primary hover:bg-primary/10 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Icon name="grid_view" size={18} />
            <span>Browse All 47 Screens Matrix</span>
          </button>
        </div>

        {/* Live Top Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-12 text-left">
          <StatCard
            label="Total Value Protected"
            value="$64.2B"
            delta="+14.2%"
            icon="security"
            variant="fresnel"
          />
          <StatCard
            label="Protocols Verified"
            value="1,420"
            delta="+38 this mo"
            icon="fact_check"
            variant="glass"
          />
          <StatCard
            label="Threats Mitigated"
            value="8,940"
            delta="100% resolved"
            icon="gpp_bad"
            iconColor="text-error"
            variant="glass"
          />
          <StatCard
            label="Global Z-Score"
            value="98.4"
            delta="Optimal Health"
            icon="radar"
            iconColor="text-emerald-400"
            variant="glass"
          />
        </div>
      </section>

      {/* 4-Stage Methodology Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <Badge variant="primary">THE ZAMARON PROTOCOL</Badge>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
            Rigorous 4-Step Forensic Methodology
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Combining machine-speed automated precision with elite human cryptographic verification.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <Card key={step.num} variant="glass" hoverEffect className="p-6 space-y-4">
              <span className="font-mono text-3xl font-black text-primary/60">{step.num}</span>
              <h3 className="font-display font-bold text-lg text-white">{step.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/solutions/auditing">
            <Button variant="outline" iconRight="arrow_forward">
              Explore Full Auditing Architecture
            </Button>
          </Link>
        </div>
      </section>

      {/* Core Technology Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <Badge variant="secondary">DEFENSE-IN-DEPTH</Badge>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
            Institutional-Grade Security Suite
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((p) => (
            <Card key={p.title} variant="fresnel" hoverEffect className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded bg-[#060e20] text-primary border border-primary/30">
                  <Icon name={p.icon} size={28} />
                </div>
                <Badge variant="outline">{p.tag}</Badge>
              </div>
              <h3 className="font-display font-bold text-xl text-white">{p.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{p.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Launchpad to Core Modules */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#081024] border border-primary/30 rounded-lg p-8 space-y-6 fresnel-glow">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="font-display font-bold text-2xl text-white">
                Access the ZAMARON Operations Hub
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Explore specialized consoles for Clients, Security Auditors, Ops Admins, and Academy Learners.
              </p>
            </div>
            <button
              onClick={() => setCatalogOpen(true)}
              className="px-5 py-2.5 rounded bg-primary text-[#00363d] font-mono font-bold text-xs hover:bg-cyan-300 cursor-pointer shadow-[0_0_15px_rgba(0,218,243,0.4)]"
            >
              Open Full 47-Screen Index
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-outline/50">
            <Link to="/client/dashboard" className="p-3 rounded bg-[#0c1322] border border-outline hover:border-primary text-center group">
              <Icon name="dashboard" size={24} className="text-primary group-hover:scale-110 transition-transform mb-1" />
              <div className="text-xs font-mono font-bold text-white">Client Console</div>
            </Link>
            <Link to="/auditor/queue" className="p-3 rounded bg-[#0c1322] border border-outline hover:border-primary text-center group">
              <Icon name="assignment_late" size={24} className="text-secondary group-hover:scale-110 transition-transform mb-1" />
              <div className="text-xs font-mono font-bold text-white">Auditor Queue</div>
            </Link>
            <Link to="/threat-hub/skynet" className="p-3 rounded bg-[#0c1322] border border-outline hover:border-primary text-center group">
              <Icon name="radar" size={24} className="text-emerald-400 group-hover:scale-110 transition-transform mb-1" />
              <div className="text-xs font-mono font-bold text-white">Skynet Radar</div>
            </Link>
            <Link to="/threat-hub/whales" className="p-3 rounded bg-[#0c1322] border border-outline hover:border-primary text-center group">
              <Icon name="tsunami" size={24} className="text-amber-400 group-hover:scale-110 transition-transform mb-1" />
              <div className="text-xs font-mono font-bold text-white">Whale Alerts</div>
            </Link>
            <Link to="/governance" className="p-3 rounded bg-[#0c1322] border border-outline hover:border-primary text-center group">
              <Icon name="gavel" size={24} className="text-purple-400 group-hover:scale-110 transition-transform mb-1" />
              <div className="text-xs font-mono font-bold text-white">DAO Governance</div>
            </Link>
            <Link to="/academy/learn/crypto-security-101" className="p-3 rounded bg-[#0c1322] border border-outline hover:border-primary text-center group">
              <Icon name="school" size={24} className="text-cyan-300 group-hover:scale-110 transition-transform mb-1" />
              <div className="text-xs font-mono font-bold text-white">LMS Academy</div>
            </Link>
          </div>
        </div>
      </section>

      {/* Catalog Drawer */}
      <MasterCatalogDrawer isOpen={catalogOpen} onClose={() => setCatalogOpen(false)} />
    </div>
  );
};
