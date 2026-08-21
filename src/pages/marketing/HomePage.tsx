import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { StatCard } from '@/components/shared/StatCard';
import { MasterCatalogDrawer } from '@/components/shared/MasterCatalogDrawer';
import { Marquee, MarqueeItem } from '@/components/ui/Marquee';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlowBackground } from '@/components/ui/GlowBackground';
import { BlockchainDiagram } from '@/components/sections/BlockchainDiagram';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

export const HomePage: React.FC = () => {
  const [catalogOpen, setCatalogOpen] = useState(false);

  const trustedNetworks: MarqueeItem[] = [
    { name: 'Ethereum', symbol: 'ETH', badge: 'L1 Mainnet' },
    { name: 'Arbitrum', symbol: 'ARB', badge: 'Nitro Rollup' },
    { name: 'Solana', symbol: 'SOL', badge: 'SVM High-Speed' },
    { name: 'Polygon zkEVM', symbol: 'POL', badge: 'Zero-Knowledge' },
    { name: 'Optimism', symbol: 'OP', badge: 'OP Stack' },
    { name: 'Avalanche', symbol: 'AVAX', badge: 'Subnets' },
    { name: 'Base', symbol: 'BASE', badge: 'L2 Secured' },
    { name: 'Chainlink', symbol: 'LINK', badge: 'Decentralized Oracle' },
    { name: 'OpenZeppelin', symbol: 'OZ', badge: 'Contract Standards' },
    { name: 'Certora Prover', symbol: 'CERT', badge: 'Formal Proofs' },
    { name: 'Fireblocks', symbol: 'FIRE', badge: 'MPC Custody' },
    { name: 'Ledger Vault', symbol: 'LEDG', badge: 'Hardware Security' },
  ];

  const pillars = [
    {
      title: 'Formal Verification',
      icon: 'verified_user',
      desc: 'Mathematically prove the correctness of smart contract state machines and eliminate zero-day vulnerabilities through automated theorem provers.',
      tag: 'MATHEMATICAL PROOF',
      accent: 'cyan',
    },
    {
      title: 'Neural AI Forensics',
      icon: 'smart_toy',
      desc: 'Machine-speed opcode disassembly, semantic invariant checks, and cross-contract reentrancy heuristics scanning deep bytecode execution flows.',
      tag: 'AI HEURISTICS',
      accent: 'purple',
    },
    {
      title: 'Institutional Audits',
      icon: 'gavel',
      desc: 'Comprehensive manual code inspection by top-tier cryptographic security researchers with verified bug discovery records and white-hat credentials.',
      tag: 'HUMAN EXPERTISE',
      accent: 'emerald',
    },
    {
      title: 'Skynet Threat Radar',
      icon: 'radar',
      desc: '24/7 continuous on-chain surveillance, mempool attack prediction, automated liquidation protection, and real-time anomalous volume detection.',
      tag: 'REAL-TIME SURVEILLANCE',
      accent: 'amber',
    },
  ];

  const steps = [
    {
      num: '01',
      title: 'Automated Bytecode Scan',
      desc: 'Neural static analyzer identifies bytecode invariants, state transition anomalies, and 250+ known SWC vulnerability vectors in milliseconds.',
      icon: 'bolt',
    },
    {
      num: '02',
      title: 'AI Semantic Summarize',
      desc: 'Context-aware decompilation isolates logic flows, maps out storage slot collisions, and highlights critical state transitions.',
      icon: 'psychology',
    },
    {
      num: '03',
      title: 'Dual-Auditor Verification',
      desc: 'Lead security researchers conduct manual exploitation, verify economic flash-loan attacks, and validate edge cases.',
      icon: 'fingerprint',
    },
    {
      num: '04',
      title: 'Final Report & Vault Anchor',
      desc: 'Cryptographically signed audit certificate issued with permanent SHA-256 blockchain anchor in the client document vault.',
      icon: 'lock',
    },
  ];

  // Key numerical stats configurable for backend connection
  const keyStatistics = [
    {
      label: 'Smart Contracts Audited',
      value: 3850,
      prefix: '',
      suffix: '+',
      decimals: 0,
      description: 'Zero post-audit exploits',
      icon: 'verified',
    },
    {
      label: 'Critical Threats Mitigated',
      value: 8940,
      prefix: '',
      suffix: '',
      decimals: 0,
      description: '100% resolution rate',
      icon: 'shield_with_heart',
    },
    {
      label: 'Total Value Protected',
      value: 64.2,
      prefix: '$',
      suffix: 'B',
      decimals: 1,
      description: 'Across 12 Layer 1 & 2 chains',
      icon: 'account_balance',
    },
    {
      label: 'Global Security Posture',
      value: 98.4,
      prefix: '',
      suffix: '%',
      decimals: 1,
      description: 'Institutional Tier-1 standard',
      icon: 'speed',
    },
    {
      label: 'Global Sensor Nodes',
      value: 128,
      prefix: '',
      suffix: ' Nodes',
      decimals: 0,
      description: '99.99% network uptime',
      icon: 'sensors',
    },
    {
      label: 'Detection Response Time',
      value: 12,
      prefix: '',
      suffix: 'ms',
      decimals: 0,
      description: 'Mempool-level interception',
      icon: 'timer',
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section with Glow Background */}
      <GlowBackground variant="hero" className="pt-16 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold shadow-[0_0_20px_rgba(0,218,243,0.25)] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>CRYSTALLINE NEXUS • INSTITUTIONAL SECURITY PROTOCOL</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Securing the Future of{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-cyan-100 to-purple-300">
              Decentralized Finance
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-sans">
            Uncompromising smart contract auditing, automated EVM bytecode forensics, and 24/7
            real-time threat surveillance. Protecting over{' '}
            <span className="text-cyan-300 font-bold font-mono">$64 Billion</span> in on-chain assets.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link to="/client/audits/new">
              <Button size="lg" icon="shield" className="shadow-[0_0_25px_rgba(0,218,243,0.45)]">
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
              className="px-5 py-3 rounded-xl text-sm font-mono font-bold bg-slate-900/70 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md"
            >
              <Icon name="grid_view" size={18} />
              <span>Browse 47 Screens Matrix</span>
            </button>
          </div>

          {/* Live Top Metrics Grid with Animated Counters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-10 text-left">
            <StatCard
              label="Total Value Protected"
              value="$64.2B"
              numericValue={64.2}
              prefix="$"
              suffix="B"
              decimals={1}
              delta="+14.2%"
              icon="security"
              variant="fresnel"
              animate
            />
            <StatCard
              label="Protocols Verified"
              value="1,420"
              numericValue={1420}
              suffix="+"
              decimals={0}
              delta="+38 this mo"
              icon="fact_check"
              variant="glass"
              animate
            />
            <StatCard
              label="Threats Mitigated"
              value="8,940"
              numericValue={8940}
              decimals={0}
              delta="100% resolved"
              icon="gpp_bad"
              iconColor="text-red-400"
              variant="glass"
              animate
            />
            <StatCard
              label="Global Z-Score"
              value="98.4"
              numericValue={98.4}
              suffix=" / 100"
              decimals={1}
              delta="Optimal Health"
              icon="radar"
              iconColor="text-emerald-400"
              variant="glass"
              animate
            />
          </div>
        </div>
      </GlowBackground>

      {/* Trusted Ecosystem Technologies & Networks Marquee */}
      <section className="space-y-4">
        <div className="text-center">
          <p className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest">
            Institutional Verification Across Leading Blockchain Ecosystems
          </p>
        </div>
        <Marquee items={trustedNetworks} speed="normal" />
      </section>

      {/* LANDING PAGE ONLY: Interactive Animated Blockchain Visual Diagram */}
      <BlockchainDiagram />

      {/* Animated Numerical Statistics Grid (Count-Up Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionHeading
          badge="VERIFIED BENCHMARKS"
          title="Battle-Tested Security by the Numbers"
          description="Continuous formal verification, rapid incident response, and automated threat interception measured across our global decentralized infrastructure."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {keyStatistics.map((stat) => (
            <GlassCard
              key={stat.label}
              variant="default"
              hoverEffect
              blur="lg"
              className="p-5 flex flex-col justify-between text-center space-y-3 group"
            >
              <div className="mx-auto p-2.5 rounded-xl bg-[#060e20] border border-cyan-500/20 text-cyan-400 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_15px_rgba(0,218,243,0.3)] transition-all">
                <Icon name={stat.icon} size={22} />
              </div>

              <div>
                <div className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                </div>
                <div className="text-xs font-mono font-semibold text-slate-300 mt-1">
                  {stat.label}
                </div>
              </div>

              <div className="text-[10px] font-mono text-slate-400 pt-2 border-t border-white/10">
                {stat.description}
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* 4-Stage Methodology Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionHeading
          badge="THE ZAMARON PROTOCOL"
          badgeVariant="primary"
          title="Rigorous 4-Step Forensic Methodology"
          description="Combining machine-speed automated precision with elite human cryptographic verification for airtight smart contract protection."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <GlassCard
              key={step.num}
              variant="elevated"
              hoverEffect
              blur="xl"
              className="p-6 flex flex-col justify-between space-y-4 border-white/10 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl font-black text-cyan-400/80 group-hover:text-cyan-300 transition-colors">
                    {step.num}
                  </span>
                  <div className="p-2 rounded-lg bg-[#060e20] border border-cyan-500/20 text-cyan-400 group-hover:border-cyan-400/40">
                    <Icon name={step.icon} size={20} />
                  </div>
                </div>

                <h3 className="font-display font-bold text-lg text-white group-hover:text-cyan-200 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {step.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>PHASE {step.num}</span>
                <span className="text-cyan-400 flex items-center gap-0.5">
                  VERIFIED <Icon name="check_circle" size={12} />
                </span>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="text-center pt-2">
          <Link to="/solutions/auditing">
            <Button variant="outline" size="md" iconRight="arrow_forward">
              Explore Full Auditing Architecture
            </Button>
          </Link>
        </div>
      </section>

      {/* Core Technology Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionHeading
          badge="DEFENSE-IN-DEPTH"
          badgeVariant="secondary"
          title="Institutional-Grade Security Suite"
          description="Built from the ground up to protect high-stakes decentralized finance protocols, bridges, and liquid staking derivatives."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((p) => (
            <GlassCard
              key={p.title}
              variant="fresnel"
              hoverEffect
              blur="xl"
              className="p-7 space-y-4 border-white/10 group"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-[#060e20] text-cyan-400 border border-cyan-500/30 group-hover:shadow-[0_0_15px_rgba(0,218,243,0.3)] transition-all">
                  <Icon name={p.icon} size={28} />
                </div>
                <Badge variant="outline" size="sm">
                  {p.tag}
                </Badge>
              </div>

              <h3 className="font-display font-bold text-xl text-white group-hover:text-cyan-200 transition-colors">
                {p.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {p.desc}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Quick Launchpad to Core Modules */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GlassCard
          variant="fresnel"
          blur="xl"
          className="p-8 sm:p-10 space-y-8 border-cyan-500/30 shadow-[0_0_30px_rgba(0,218,243,0.15)]"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>COMMAND CENTER DIRECT ACCESS</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                Access the ZAMARON Operations Hub
              </h3>
              <p className="text-sm text-slate-300 max-w-2xl font-sans">
                Explore specialized consoles for Clients, Security Auditors, Threat Analysts, Ops Admins, and Academy Learners.
              </p>
            </div>

            <button
              onClick={() => setCatalogOpen(true)}
              className="px-6 py-3 rounded-xl bg-cyan-400 text-[#00363d] font-mono font-bold text-sm hover:bg-cyan-300 cursor-pointer shadow-[0_0_20px_rgba(0,218,243,0.4)] transition-all shrink-0"
            >
              Open Full 47-Screen Index
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 pt-4 border-t border-white/10">
            <Link
              to="/client/dashboard"
              className="p-4 rounded-xl bg-[#060e20]/70 border border-white/10 hover:border-cyan-400 hover:bg-[#0c162d] text-center group transition-all"
            >
              <Icon
                name="dashboard"
                size={26}
                className="text-cyan-400 group-hover:scale-110 transition-transform mb-2 mx-auto"
              />
              <div className="text-xs font-mono font-bold text-white group-hover:text-cyan-200">
                Client Console
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-1">Audit Tracking</div>
            </Link>

            <Link
              to="/auditor/queue"
              className="p-4 rounded-xl bg-[#060e20]/70 border border-white/10 hover:border-purple-400 hover:bg-[#0c162d] text-center group transition-all"
            >
              <Icon
                name="assignment_late"
                size={26}
                className="text-purple-400 group-hover:scale-110 transition-transform mb-2 mx-auto"
              />
              <div className="text-xs font-mono font-bold text-white group-hover:text-purple-200">
                Auditor Queue
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-1">Triage & Analysis</div>
            </Link>

            <Link
              to="/threat-hub/skynet"
              className="p-4 rounded-xl bg-[#060e20]/70 border border-white/10 hover:border-emerald-400 hover:bg-[#0c162d] text-center group transition-all"
            >
              <Icon
                name="radar"
                size={26}
                className="text-emerald-400 group-hover:scale-110 transition-transform mb-2 mx-auto"
              />
              <div className="text-xs font-mono font-bold text-white group-hover:text-emerald-200">
                Skynet Radar
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-1">Live Surveillance</div>
            </Link>

            <Link
              to="/threat-hub/whales"
              className="p-4 rounded-xl bg-[#060e20]/70 border border-white/10 hover:border-amber-400 hover:bg-[#0c162d] text-center group transition-all"
            >
              <Icon
                name="tsunami"
                size={26}
                className="text-amber-400 group-hover:scale-110 transition-transform mb-2 mx-auto"
              />
              <div className="text-xs font-mono font-bold text-white group-hover:text-amber-200">
                Whale Alerts
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-1">Capital Flows</div>
            </Link>

            <Link
              to="/governance"
              className="p-4 rounded-xl bg-[#060e20]/70 border border-white/10 hover:border-purple-300 hover:bg-[#0c162d] text-center group transition-all"
            >
              <Icon
                name="gavel"
                size={26}
                className="text-purple-300 group-hover:scale-110 transition-transform mb-2 mx-auto"
              />
              <div className="text-xs font-mono font-bold text-white group-hover:text-purple-200">
                DAO Governance
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-1">Proposals & Votes</div>
            </Link>

            <Link
              to="/academy/learn/crypto-security-101"
              className="p-4 rounded-xl bg-[#060e20]/70 border border-white/10 hover:border-cyan-300 hover:bg-[#0c162d] text-center group transition-all"
            >
              <Icon
                name="school"
                size={26}
                className="text-cyan-300 group-hover:scale-110 transition-transform mb-2 mx-auto"
              />
              <div className="text-xs font-mono font-bold text-white group-hover:text-cyan-200">
                LMS Academy
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-1">Forensic Courses</div>
            </Link>
          </div>
        </GlassCard>
      </section>

      {/* Master 47 Screens Catalog Drawer */}
      <MasterCatalogDrawer isOpen={catalogOpen} onClose={() => setCatalogOpen(false)} />
    </div>
  );
};
