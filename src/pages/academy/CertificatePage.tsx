import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { useAuth } from '@/context/AuthContext';
import { getCertificate, listCertificates } from '@/services/academyService';
import type { CertificateRecord } from '@/types/lms';

export const CertificatePage: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [cert, setCert] = useState<CertificateRecord | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    try {
      const direct = getCertificate(id, user);
      if (direct) {
        setCert(direct);
        return;
      }
      const mine = listCertificates(user.id, user);
      setCert(mine[0] ?? null);
      if (!direct && !mine[0]) setError('No certificate found. Complete an assessment at 80% or higher.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load certificate.');
    }
  }, [id, user]);

  if (!cert) {
    return (
      <Card variant="glass" className="p-10 text-center space-y-3">
        <p className="text-sm text-slate-400">{error || 'Certificate not issued yet.'}</p>
        <Link to="/academy/learn/crypto-security-101" className="text-primary text-xs font-mono">
          Return to Academy
        </Link>
      </Card>
    );
  }

  const issued = new Date(cert.issuedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

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

      <Card variant="fresnel" className="p-12 text-center space-y-8 border-2 border-primary/50 shadow-2xl relative overflow-hidden bg-[#081024]">
        <div className="space-y-2">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#060e20] border-2 border-primary flex items-center justify-center text-primary shadow-[0_0_25px_rgba(0,218,243,0.5)]">
            <Icon name="workspace_premium" size={36} />
          </div>
          <h2 className="font-display font-black text-3xl text-white tracking-wider">ZAMARON ACADEMY</h2>
          <p className="text-xs font-mono text-primary font-bold uppercase tracking-widest">
            Cryptographic Certificate of Completion
          </p>
        </div>

        <div className="space-y-4 max-w-xl mx-auto py-4">
          <p className="text-xs text-slate-400 font-sans uppercase tracking-widest">This certifies that</p>
          <div className="font-display font-black text-3xl sm:text-4xl text-white border-b border-primary/40 pb-2">
            {cert.userName}
          </div>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            has successfully demonstrated mastery and achieved a score of {cert.scorePercent}% in
          </p>
          <div className="font-display font-bold text-xl text-primary">{cert.courseTitle}</div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-outline/60 text-xs font-mono text-slate-400">
          <div>
            <span className="block text-[10px] text-slate-500">ISSUE DATE</span>
            <strong className="text-slate-200">{issued}</strong>
          </div>
          <div>
            <span className="block text-[10px] text-slate-500">CERTIFICATE ID</span>
            <strong className="text-primary">{cert.id}</strong>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <span className="block text-[10px] text-slate-500">ANCHOR</span>
            <strong className="text-emerald-400">{cert.hash}</strong>
          </div>
        </div>
      </Card>
    </div>
  );
};
