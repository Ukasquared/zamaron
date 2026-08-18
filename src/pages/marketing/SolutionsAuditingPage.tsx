import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="primary">INSTITUTIONAL AUDITING</Badge>
        <h1 className="font-display font-black text-4xl sm:text-5xl text-white">
          Uncompromising Smart Contract Auditing
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          The four-pillar methodology trusted by Tier-1 blockchain foundations, decentralized exchanges,
          and institutional liquidity networks.
        </p>
      </div>

      {/* Steps Breakdown */}
      <div className="space-y-8">
        {steps.map((s, idx) => (
          <Card
            key={s.step}
            variant="fresnel"
            className="p-6 sm:p-8 flex flex-col md:flex-row items-start gap-6 relative"
          >
            <div className="w-14 h-14 rounded-md bg-[#060e20] border border-primary/40 flex items-center justify-center text-primary font-mono font-bold text-2xl shrink-0 shadow-[0_0_15px_rgba(0,218,243,0.3)]">
              {s.step}
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <Icon name={s.icon} size={20} className="text-primary" />
                <h3 className="font-display font-bold text-xl text-white">{s.title}</h3>
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

            <div className="hidden lg:flex items-center self-center text-slate-500 font-mono text-xs">
              <span>PHASE {idx + 1} OF 4</span>
            </div>
          </Card>
        ))}
      </div>

      {/* CTA Box */}
      <div className="bg-[#081024] border border-primary/40 rounded-lg p-8 text-center space-y-6 fresnel-glow">
        <h2 className="font-display font-bold text-2xl text-white">Ready to Harden Your Smart Contracts?</h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
          Submit your repository for scoping. Receive a guaranteed completion timeline and full-spectrum
          security coverage.
        </p>
        <div className="flex items-center justify-center gap-4">
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
    </div>
  );
};
