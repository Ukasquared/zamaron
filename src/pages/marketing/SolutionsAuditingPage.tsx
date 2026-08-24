import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlowBackground } from '@/components/ui/GlowBackground';
import { Parallax } from '@/components/ui/Parallax';
import { Reveal } from '@/components/ui/Reveal';
import { ScrollProgress } from '@/components/ui/ScrollProgress';

export const SolutionsAuditingPage: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Automated Bytecode Scan & Invariant Fuzzing',
      icon: 'radar',
      desc: 'Our proprietary neural static analyzer tests over 250+ SWC vulnerability classes, symbolic execution paths, and reentrancy loops in milliseconds.',
      tags: ['Static Analysis', 'Symbolic Execution', 'Bytecode Disassembly'],
    },
    {
      step: '02',
      title: 'AI Neural Summarization & State Flow Decomposition',
      icon: 'smart_toy',
      desc: 'Context-aware neural agents generate control flow diagrams, state transition matrices, and flag privileged owner backdoors.',
      tags: ['State Transitions', 'Control Flow', 'Access Control'],
    },
    {
      step: '03',
      title: 'Dual-Auditor Cryptographic Verification',
      icon: 'gavel',
      desc: 'Senior security researchers manually verify business logic flaws, flash loan attack vectors, economic incentives, and oracle manipulation risks.',
      tags: ['Economic Attacks', 'Flash Loans', 'Oracle Manipulations'],
    },
    {
      step: '04',
      title: 'Cryptographic Final Report & Document Vault',
      icon: 'verified',
      desc: 'Delivered in an immutable on-chain verifiable certificate with complete remediation instructions, verified test scripts, and SWC classifications.',
      tags: ['SHA-256 Stamp', 'Remediation Proof', 'PDF & On-Chain'],
    },
  ];

  return (
    <div className="relative space-y-16 py-12 overflow-hidden">
      <ScrollProgress />

      {/* Header with layered orbital motion and a deliberate load sequence. */}
      <GlowBackground variant="subtle" className="py-10 sm:py-14">
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <Parallax
            speed={-0.08}
            clamp={32}
            className="absolute -right-24 -top-36 sm:right-[5%]"
          >
            <div className="solution-orbit">
              <span />
            </div>
          </Parallax>
          <Parallax
            speed={-0.045}
            clamp={22}
            className="absolute -left-24 bottom-0"
          >
            <div className="h-48 w-48 rounded-full border border-purple-400/10 shadow-[0_0_70px_rgba(168,85,247,0.08)]" />
          </Parallax>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">
          <Reveal variant="hero" delay={40}>
            <SectionHeading
              badge="INSTITUTIONAL AUDITING"
              title="Uncompromising Smart Contract Auditing"
              description="The four-pillar methodology trusted by Tier-1 blockchain foundations, decentralized exchanges, and institutional liquidity networks."
            />
          </Reveal>

          <Reveal variant="rise" delay={210}>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.14em] text-slate-400">
              <span className="flex items-center gap-2">
                <span className="solution-live-dot" />4 verified phases
              </span>
              <span className="hidden sm:block h-3 w-px bg-white/15" />
              <span>250+ vulnerability classes</span>
              <span className="hidden sm:block h-3 w-px bg-white/15" />
              <span>Immutable proof delivery</span>
            </div>
          </Reveal>
        </div>
      </GlowBackground>

      {/* Steps Breakdown — cards reveal independently while the signal travels down the rail. */}
      <section
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Audit methodology"
      >
        <Parallax
          speed={-0.035}
          clamp={20}
          className="pointer-events-none absolute -right-32 top-1/3 h-72 w-72 rounded-full bg-cyan-500/[0.06] blur-[90px]"
          aria-hidden="true"
        />

        <div className="relative space-y-6">
          <div
            className="solution-flow-rail hidden sm:block"
            aria-hidden="true"
          >
            <span className="solution-flow-signal" />
          </div>

          {steps.map((s, idx) => (
            <Reveal
              key={s.step}
              variant={idx === 0 ? 'clip' : 'scale'}
              delay={(idx % 2) * 70}
              threshold={0.08}
              className="relative z-10"
            >
              <GlassCard
                variant="fresnel"
                hoverEffect
                spotlight
                blur="xl"
                className="solution-step-card p-6 sm:p-8 relative border-white/10 group"
              >
                <span
                  className="solution-card-scan"
                  style={{ animationDelay: `${idx * 1.15}s` }}
                  aria-hidden="true"
                />

                <div className="relative w-full flex flex-col md:flex-row items-start gap-6">
                  <div className="solution-step-number w-14 h-14 rounded-xl bg-[#060e20] border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-mono font-black text-2xl shrink-0 shadow-[0_0_20px_rgba(0,218,243,0.25)] group-hover:border-cyan-300 group-hover:text-cyan-100 transition-colors duration-500">
                    <span
                      className="solution-step-pulse"
                      style={{ animationDelay: `${idx * 0.55}s` }}
                      aria-hidden="true"
                    />
                    <span className="relative z-10">{s.step}</span>
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-start sm:items-center gap-2.5">
                      <Icon
                        name={s.icon}
                        size={22}
                        className="text-cyan-400 mt-0.5 sm:mt-0 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
                      />
                      <h3 className="font-display font-bold text-xl text-white group-hover:text-cyan-200 transition-colors duration-300">
                        {s.title}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed font-sans">
                      {s.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {s.tags.map((t, tagIndex) => (
                        <Badge
                          key={t}
                          variant="outline"
                          size="sm"
                          className="transition-all duration-300 group-hover:border-cyan-400/35 group-hover:text-cyan-200"
                          style={{ transitionDelay: `${tagIndex * 45}ms` }}
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="solution-phase-chip hidden lg:flex items-center self-center text-slate-400 font-mono text-xs px-3 py-1 rounded bg-black/30 border border-white/5">
                    <span className="solution-phase-dot" aria-hidden="true" />
                    <span>PHASE {idx + 1} OF 4</span>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal variant="clip" threshold={0.08}>
          <GlassCard
            variant="fresnel"
            blur="xl"
            spotlight
            className="p-8 sm:p-10 text-center space-y-6 border-cyan-500/30 shadow-[0_0_30px_rgba(0,218,243,0.15)]"
          >
            <div className="solution-cta-orbit" aria-hidden="true" />
            <div className="relative space-y-6">
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                Ready to Harden Your Smart Contracts?
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
                Submit your repository for scoping. Receive a guaranteed
                completion timeline, formal verification specifications, and
                full-spectrum security coverage.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link to="/client/audits/new">
                  <Button size="lg" icon="shield">
                    Submit Audit Request
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="outline" size="lg">
                    View Pricing Matrix
                  </Button>
                </Link>
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </div>
  );
};
