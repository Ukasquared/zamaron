import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { StatCard } from '@/components/shared/StatCard';
import { Marquee, MarqueeItem } from '@/components/ui/Marquee';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlowBackground } from '@/components/ui/GlowBackground';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Reveal } from '@/components/ui/Reveal';

export const HomePage: React.FC = () => {
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
    <div className="space-y-24 lg:space-y-32 pb-24">
      {/* Hero Section with Glow Background */}
      <GlowBackground variant="hero" className="pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Top Pill Badge */}
          <Reveal>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.05] border border-cyan-400/25 text-cyan-200 font-mono text-[11px] sm:text-xs font-semibold tracking-[0.14em] shadow-[0_0_24px_rgba(0,218,243,0.18),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-cyan-400" />
              </span>
              <span>CRYSTALLINE NEXUS • INSTITUTIONAL SECURITY PROTOCOL</span>
            </div>
          </Reveal>

          {/* Main Hero Headline */}
          <Reveal delay={90}>
            <h1 className="font-display font-extrabold text-[2.5rem] sm:text-6xl lg:text-[4.25rem] text-white tracking-[-0.03em] leading-[1.05] max-w-4xl mx-auto text-balance">
              Securing the Future of{' '}
              <span className="text-gradient-cyan">Decentralized Finance</span>
            </h1>
          </Reveal>

          {/* Subtitle */}
          <Reveal delay={180}>
            <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-sans text-pretty">
              Uncompromising smart contract auditing, automated EVM bytecode forensics, and 24/7
              real-time threat surveillance. Protecting over{' '}
              <span className="text-cyan-300 font-bold font-mono">$64 Billion</span> in on-chain
              assets.
            </p>
          </Reveal>

          {/* CTA Buttons */}
          <Reveal delay={260}>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link to="/client/audits/new">
                <Button
                  size="lg"
                  icon="shield"
                  className="shadow-[0_0_30px_rgba(0,218,243,0.4),0_12px_30px_-12px_rgba(0,218,243,0.5)] hover:shadow-[0_0_40px_rgba(0,218,243,0.55),0_16px_40px_-12px_rgba(0,218,243,0.6)]"
                >
                  Request Security Audit
                </Button>
              </Link>
              <Link to="/threat-hub/skynet">
                <Button variant="outline" size="lg" icon="radar">
                  Launch Skynet Radar
                </Button>
              </Link>
            </div>
          </Reveal>

          {/* Live Top Metrics Grid with Animated Counters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-10 text-left">
            <Reveal delay={120}>
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
            </Reveal>
            <Reveal delay={200}>
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
            </Reveal>
            <Reveal delay={280}>
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
            </Reveal>
            <Reveal delay={360}>
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
            </Reveal>
          </div>
        </div>
      </GlowBackground>

      {/* Trusted Ecosystem Technologies & Networks Marquee */}
      <section className="relative bg-white text-slate-800" aria-label="Trusted ecosystem networks">
        <div className="border-y border-slate-200 shadow-[0_18px_50px_-28px_rgba(2,6,23,0.28)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 pb-2">
            <div className="flex items-center justify-center gap-4 pb-6">
              <span className="hidden sm:block h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-slate-300" />
              <p className="text-[10px] sm:text-xs font-mono font-semibold text-slate-500 uppercase tracking-[0.18em] sm:tracking-[0.22em] text-center">
                Institutional Verification Across Leading Blockchain Ecosystems
              </p>
              <span className="hidden sm:block h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-slate-300" />
            </div>
            <Marquee items={trustedNetworks} speed="slow" />
          </div>
        </div>
      </section>

      {/* Animated Numerical Statistics Grid (Count-Up Section) */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div
          className="absolute inset-x-0 -top-16 bottom-0 -z-10 bg-[radial-gradient(55%_45%_at_50%_0%,rgba(0,218,243,0.05),transparent_70%)] pointer-events-none"
          aria-hidden="true"
        />
        <Reveal>
          <SectionHeading
            badge="VERIFIED BENCHMARKS"
            title="Battle-Tested Security by the Numbers"
            description="Continuous formal verification, rapid incident response, and automated threat interception measured across our global decentralized infrastructure."
          />
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {keyStatistics.map((stat, idx) => (
            <Reveal key={stat.label} delay={(idx % 6) * 80}>
              <GlassCard
                variant="default"
                hoverEffect
                blur="lg"
                className="p-5 flex flex-col justify-between text-center space-y-3 group h-full"
              >
                <div className="mx-auto p-2.5 rounded-xl bg-[#060e20] border border-cyan-500/20 text-cyan-400 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_15px_rgba(0,218,243,0.3)] transition-all">
                  <Icon name={stat.icon} size={22} />
                </div>

                <div>
                  <div className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                    <AnimatedCounter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                    />
                  </div>
                  <div className="text-xs font-mono font-semibold text-slate-300 mt-1.5">
                    {stat.label}
                  </div>
                </div>

                <div className="text-[10px] font-mono text-slate-400 pt-2.5 border-t border-white/10">
                  {stat.description}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4-Stage Methodology Preview */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div
          className="absolute inset-x-0 top-0 bottom-0 -z-10 bg-[radial-gradient(45%_40%_at_80%_10%,rgba(155,81,224,0.06),transparent_70%)] pointer-events-none"
          aria-hidden="true"
        />
        <Reveal>
          <SectionHeading
            badge="THE ZAMARON PROTOCOL"
            badgeVariant="primary"
            title="Rigorous 4-Step Forensic Methodology"
            description="Combining machine-speed automated precision with elite human cryptographic verification for airtight smart contract protection."
          />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <Reveal key={step.num} delay={idx * 90}>
              <GlassCard
                variant="elevated"
                hoverEffect
                blur="xl"
                className="p-6 flex flex-col justify-between space-y-4 border-white/10 group h-full"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-3xl font-bold text-cyan-400/80 group-hover:text-cyan-300 transition-colors">
                      {step.num}
                    </span>
                    <div className="p-2 rounded-lg bg-[#060e20] border border-cyan-500/20 text-cyan-400 group-hover:border-cyan-400/40 group-hover:shadow-[0_0_12px_rgba(0,218,243,0.25)] transition-all">
                      <Icon name={step.icon} size={20} />
                    </div>
                  </div>

                  <h3 className="font-display font-semibold text-lg text-white group-hover:text-cyan-200 transition-colors">
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
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <div className="text-center pt-2">
            <Link to="/solutions/auditing">
              <Button variant="outline" size="md" iconRight="arrow_forward">
                Explore Full Auditing Architecture
              </Button>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Core Technology Pillars */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div
          className="absolute inset-x-0 top-0 bottom-0 -z-10 bg-[radial-gradient(50%_45%_at_15%_85%,rgba(0,230,118,0.05),transparent_70%)] pointer-events-none"
          aria-hidden="true"
        />
        <Reveal>
          <SectionHeading
            badge="DEFENSE-IN-DEPTH"
            badgeVariant="secondary"
            title="Institutional-Grade Security Suite"
            description="Built from the ground up to protect high-stakes decentralized finance protocols, bridges, and liquid staking derivatives."
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((p, idx) => (
            <Reveal key={p.title} delay={(idx % 2) * 100}>
              <GlassCard
                variant="fresnel"
                hoverEffect
                blur="xl"
                className="p-7 space-y-4 border-white/10 group h-full"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-[#060e20] text-cyan-400 border border-cyan-500/30 group-hover:border-cyan-400/60 group-hover:shadow-[0_0_18px_rgba(0,218,243,0.3)] group-hover:scale-[1.03] transition-all">
                    <Icon name={p.icon} size={28} />
                  </div>
                  <Badge variant="outline" size="sm">
                    {p.tag}
                  </Badge>
                </div>

                <h3 className="font-display font-semibold text-xl text-white group-hover:text-cyan-200 transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {p.desc}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
};
