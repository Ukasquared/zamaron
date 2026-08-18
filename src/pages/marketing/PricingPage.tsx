import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';

export const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'per-audit' | 'annual'>('per-audit');

  const tiers = [
    {
      name: 'Standard Audit',
      badge: 'ESSENTIAL PROTOCOL',
      price: '$12,500',
      period: 'per single smart contract suite',
      desc: 'Ideal for standard ERC-20, NFT collections, token staking pools, and simple governance contracts.',
      features: [
        'Automated static analysis & symbolic fuzzing',
        'Single senior auditor manual review',
        'SWC vulnerability catalog mapping',
        'Standard 5-day delivery turnaround',
        'Cryptographic PDF completion report',
        '1 round of remediation verification',
      ],
      cta: 'Select Standard Tier',
      highlight: false,
    },
    {
      name: 'Professional Tier',
      badge: 'MOST POPULAR',
      price: '$25,000',
      period: 'per full protocol deployment',
      desc: 'Engineered for DEXes, lending rails, yield aggregators, and cross-chain messaging bridges.',
      features: [
        'Everything in Standard Tier',
        'Dual senior lead auditor manual inspection',
        'Economic & flash-loan attack simulation',
        'Formal verification with Certora mathematical rules',
        'Priority 3-day turnaround delivery',
        'Interactive Dual-Pane review portal access',
        '2 rounds of remediation verification',
        'Skynet real-time monitoring (3 months included)',
      ],
      cta: 'Select Professional Tier',
      highlight: true,
    },
    {
      name: 'Enterprise Matrix',
      badge: 'INSTITUTIONAL GRADE',
      price: 'Custom Scope',
      period: 'tailored protocol ecosystem coverage',
      desc: 'Tailored for Layer-1/2 chains, sovereign rollups, algorithmic stablecoins, and sovereign vaults.',
      features: [
        'Everything in Professional Tier',
        'Dedicated 4-auditor red team assignment',
        'Bytecode decompiler zero-day fuzzing',
        'Zero-knowledge circuit verification',
        '24/7 dedicated Telegram/Discord war room',
        'Unlimited remediation verifications',
        'Permanent Skynet 24/7 Threat Radar',
        'Custom SLA and legal warranty coverage',
      ],
      cta: 'Contact Security Lead',
      highlight: false,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="primary">TRANSPARENT PRICING</Badge>
        <h1 className="font-display font-black text-4xl sm:text-5xl text-white">
          Institutional Security. Predictable Pricing.
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Select the precision tier that aligns with your total value locked, timeline, and architectural complexity.
        </p>

        {/* Toggle */}
        <div className="inline-flex items-center p-1 rounded bg-[#0b1326] border border-outline mt-4">
          <button
            onClick={() => setBillingCycle('per-audit')}
            className={`px-4 py-1.5 rounded text-xs font-mono font-semibold transition-colors cursor-pointer ${
              billingCycle === 'per-audit' ? 'bg-primary text-[#00363d] font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            PER AUDIT SCOPE
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-4 py-1.5 rounded text-xs font-mono font-semibold transition-colors cursor-pointer ${
              billingCycle === 'annual' ? 'bg-primary text-[#00363d] font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            ANNUAL RETAINER (-20%)
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {tiers.map((t) => (
          <Card
            key={t.name}
            variant={t.highlight ? 'fresnel' : 'glass'}
            hoverEffect
            className={`p-8 flex flex-col justify-between relative ${
              t.highlight ? 'border-primary shadow-[0_0_30px_rgba(0,218,243,0.2)]' : ''
            }`}
          >
            {t.highlight && (
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <span className="bg-primary text-[#00363d] font-mono text-[10px] font-bold px-3 py-1 rounded shadow-md">
                  RECOMMENDED
                </span>
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-2">
                <Badge variant={t.highlight ? 'primary' : 'outline'} size="sm">
                  {t.badge}
                </Badge>
                <h3 className="font-display font-bold text-2xl text-white">{t.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">{t.desc}</p>
              </div>

              <div className="pt-4 border-t border-outline/50">
                <div className="font-display font-black text-3xl sm:text-4xl text-white">{t.price}</div>
                <div className="text-xs font-mono text-slate-400 mt-1">{t.period}</div>
              </div>

              {/* Feature List */}
              <div className="space-y-2.5 pt-4">
                <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                  Deliverables Included:
                </span>
                <ul className="space-y-2 text-xs font-sans text-slate-300">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Icon name="check_circle" size={16} className="text-primary shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-8">
              <Link to="/client/audits/new">
                <Button
                  variant={t.highlight ? 'primary' : 'outline'}
                  className="w-full"
                  size="md"
                >
                  {t.cta}
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
