import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlowBackground } from '@/components/ui/GlowBackground';

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
    <div className="space-y-16 py-12">
      {/* Header with Glow */}
      <GlowBackground variant="subtle" className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <SectionHeading
            badge="INSTITUTIONAL AUDITING"
            title="Uncompromising Smart Contract Auditing"
            description="The four-pillar methodology trusted by Tier-1 blockchain foundations, decentralized exchanges, and institutional liquidity networks."
          />
        </div>
      </GlowBackground>

      {/* Steps Breakdown */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {steps.map((s, idx) => (
          <GlassCard
            key={s.step}
            variant="fresnel"
            hoverEffect
            blur="xl"
            className="p-6 sm:p-8 flex flex-col md:flex-row items-start gap-6 relative border-white/10 group"
          >
            <div className="w-14 h-14 rounded-xl bg-[#060e20] border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-mono font-black text-2xl shrink-0 shadow-[0_0_20px_rgba(0,218,243,0.3)] group-hover:border-cyan-300 transition-all">
              {s.step}
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2.5">
                <Icon name={s.icon} size={22} className="text-cyan-400" />
                <h3 className="font-display font-bold text-xl text-white group-hover:text-cyan-200 transition-colors">
                  {s.title}
                </h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">{s.desc}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {s.tags.map((t) => (
                  <Badge key={t} variant="outline" size="sm">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex items-center self-center text-slate-400 font-mono text-xs px-3 py-1 rounded bg-black/30 border border-white/5">
              <span>PHASE {idx + 1} OF 4</span>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* CTA Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GlassCard
          variant="fresnel"
          blur="xl"
          className="p-8 sm:p-10 text-center space-y-6 border-cyan-500/30 shadow-[0_0_30px_rgba(0,218,243,0.15)]"
        >
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
            Ready to Harden Your Smart Contracts?
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Submit your repository for scoping. Receive a guaranteed completion timeline, formal verification specifications, and full-spectrum security coverage.
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
        </GlassCard>
      </div>
    </div>
  );
};
