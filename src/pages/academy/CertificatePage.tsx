import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

export const CertificatePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div className="flex items-center justify-between">
        <Link to="/academy/learn/crypto-security-101" className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1">
          <Icon name="arrow_back" size={16} /> Return to Academy
        </Link>
        <Button size="sm" icon="download" onClick={() => window.print()}>
          Export Certificate PDF
        </Button>
      </div>

      {/* Graduation Certificate */}
      <Card variant="fresnel" className="p-12 text-center space-y-8 border-2 border-primary/50 shadow-2xl relative overflow-hidden bg-[#081024]">
        <div className="space-y-2">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#060e20] border-2 border-primary flex items-center justify-center text-primary shadow-[0_0_25px_rgba(0,218,243,0.5)]">
            <Icon name="workspace_premium" size={36} />
          </div>
          <h2 className="font-display font-black text-3xl text-white tracking-wider">
            ZAMARON ACADEMY
          </h2>
          <p className="text-xs font-mono text-primary font-bold uppercase tracking-widest">
            Cryptographic Certificate of Completion
          </p>
        </div>

        <div className="space-y-4 max-w-xl mx-auto py-4">
          <p className="text-xs text-slate-400 font-sans uppercase tracking-widest">This certifies that</p>
          <div className="font-display font-black text-3xl sm:text-4xl text-white border-b border-primary/40 pb-2">
            Alex Chen
          </div>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            has successfully demonstrated mastery and achieved an exceptional score in
          </p>
          <div className="font-display font-bold text-xl text-primary">
            Crypto Security 101: Identifying Rug Pulls & Malicious Bytecode
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-outline/60 text-xs font-mono text-slate-400">
          <div>
            <span className="block text-[10px] text-slate-500">ISSUE DATE</span>
            <strong className="text-slate-200">August 18, 2026</strong>
          </div>
          <div>
            <span className="block text-[10px] text-slate-500">CERTIFICATE ID</span>
            <strong className="text-primary">CERT-9981-NX</strong>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <span className="block text-[10px] text-slate-500">STATUS</span>
            <strong className="text-emerald-400">PERMANENT ON-CHAIN ANCHOR</strong>
          </div>
        </div>
      </Card>
    </div>
  );
};
