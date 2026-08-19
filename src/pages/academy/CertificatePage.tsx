import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import CertificateCard from '@/components/certificate/CertificateCard';
import type { CertificateData } from '@/types/certificate';

const certificate: CertificateData = {
  recipientName: 'Alex Chen',
  courseTitle: 'Crypto Security 101: Identifying Rug Pulls & Malicious Bytecode',
  academyName: 'ZAMARON ACADEMY',
  verificationHash: '0x7F4B2C9E...82D1A19',
  certificateId: 'CERT-9981-NX',
  auditorTitle: 'LEAD SECURITY AUDITOR',
  auditorOrg: 'ZAMARON PROTOCOL COMMAND',
  mentorTitle: 'AI MENTOR',
  mentorOrg: 'NEURAL INTERFACE SYSTEM',
  auditorSignatureUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQa6lqj7wQa_XEbTXtHvhagjlDGiS6Qh-YixdU_DKZpqi_v7yf4STXXl0mo7zqywK5BUSG7X3lXzeAR0OSQPVjnogeCypjKrnYBATI5-baS99tLcgp5CVT6gchAwNueQTh6Wcb2e7dZMPyxoH3VAyCrtLLgf-o9RtVqX-rYCs-xqhVUFkfGLNOJcZGyHdbt_EDBo1gGKwV5i07H2QYkxqUoGnZ2ftU31b3AMMW-7NBfAs3NziN6pCqfGrlhAliBWvYdMwsJKgsxUAV',
  mentorSignatureUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDf4wPEFPaZyCj__GY6Wxrg82gpM2bdGG5eLIA1s2sPu4ONPkZClUf3-HvB4wrYaXPlOdMf7kJfoWr7rBqngflBwR3s6NVksgVJRKrU3wf2lf2EPojgJTUIqJxGxLfeROrDbfn70Y_ph_4f4iX4Xd0Vwl7s1BfWmlrbwIc_PiA8JKWqg0AMsu8fRsvdw91xxnukhsG1n_bTZ5apAsJB2_hyEaZmgYtnCVrh0v0MpLhIa8uy_HgcMM_RyF5AeQmm19bL3H4JOuzxJA8j',
};

export const CertificatePage: React.FC = () => {
  return (
    <div className="space-y-8 pb-16">
      <div className="flex items-center justify-between gap-4">
        <Link to="/academy/learn/crypto-security-101" className="text-xs font-mono text-slate-400 hover:text-white">
          ← Return to Academy
        </Link>
        <Button size="sm" icon="download" onClick={() => window.print()}>
          Export Certificate PDF
        </Button>
      </div>

      <CertificateCard data={certificate} />

      <div className="flex flex-wrap justify-center gap-3">
        <Button variant="ghost" size="md" icon="verified_user">Verify Credential</Button>
        <Button variant="primary" size="md" icon="share">Share Credential</Button>
      </div>
    </div>
  );
};
