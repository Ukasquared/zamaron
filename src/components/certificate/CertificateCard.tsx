import SecuritySeal from "./SecuritySeal";
import type { CertificateData } from "../../types/certificate";

type Props = {
  data: CertificateData;
};

export default function CertificateCard({ data }: Props) {
  return (
    <div className="glass-panel rounded-xl w-full max-w-[1100px] p-6 sm:p-8 md:p-12 relative flex flex-col justify-between border-white/10 holographic-glow gap-8 md:gap-10">
      {/* Branding Header */}
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col gap-1.5 sm:gap-2 min-w-0">
          <span className="font-display-xl text-xl sm:text-2xl md:text-headline-lg tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            {data.academyName}
          </span>
          <div className="flex items-center gap-2 sm:gap-3">
            <span
              className="material-symbols-outlined text-primary-container text-lg sm:text-xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified_user
            </span>
            <span className="font-label-sm text-[10px] sm:text-label-sm text-on-surface-variant uppercase tracking-[0.15em] sm:tracking-[0.2em]">
              Institutional Grade Certification
            </span>
          </div>
        </div>
        <SecuritySeal />
      </div>

      {/* Central Content */}
      <div className="flex flex-col items-center text-center gap-4 sm:gap-6">
        <div className="space-y-1 sm:space-y-2">
          <h1 className="font-display-xl text-2xl sm:text-3xl md:text-display-xl text-primary tracking-tight leading-none">
            CERTIFICATE OF COMPLETION
          </h1>
          <p className="font-body-md text-sm sm:text-base text-on-surface-variant italic max-w-xl mx-auto">
            This is to verify that the elite operative has mastered the digital
            frontier
          </p>
        </div>

        <div className="py-2 sm:py-4 w-full max-w-md">
          <span className="font-display-xl text-4xl sm:text-5xl md:text-[64px] text-glow text-primary-container tracking-tight">
            {data.recipientName}
          </span>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent mt-3 sm:mt-4" />
        </div>

        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <h2 className="font-headline-lg text-xl sm:text-2xl md:text-headline-lg text-secondary">
            {data.courseTitle}
          </h2>
          <div className="flex items-center gap-2 sm:gap-3 bg-surface-container-highest/40 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border border-white/10 backdrop-blur-md">
            <span className="material-symbols-outlined text-secondary-fixed-dim text-lg sm:text-xl">
              psychology
            </span>
            <span className="font-label-sm text-[10px] sm:text-label-sm text-secondary-fixed-dim">
              NEURAL AI CERTIFIED
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-ping" />
          </div>
        </div>
      </div>

      {/* Bottom: Signatures & Verification */}
      <div className="grid grid-cols-1 sm:grid-cols-3 items-stretch sm:items-end gap-6 sm:gap-8 pt-6 sm:pt-8 border-t border-white/5">
        {/* Auditor Signature */}
        <div className="flex flex-col gap-3 sm:gap-4 order-2 sm:order-1">
          <div className="h-10 sm:h-12 flex items-center justify-start overflow-hidden">
            <img
              className="brightness-200 opacity-80 h-full object-contain object-left"
              alt="Auditor signature"
              src={data.auditorSignatureUrl}
            />
          </div>
          <div className="h-px w-full bg-white/20" />
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface">
              {data.auditorTitle}
            </span>
            <span className="font-label-sm text-[10px] text-on-surface-variant">
              {data.auditorOrg}
            </span>
          </div>
        </div>

        {/* Verification Data */}
        <div className="flex flex-col items-center gap-2 order-1 sm:order-2">
          <div className="bg-surface-container-low px-4 py-3 rounded-lg border border-white/5 w-full flex flex-col gap-1">
            <div className="flex justify-between items-center text-[10px] font-label-sm text-on-surface-variant">
              <span>VERIFICATION HASH</span>
              <span className="material-symbols-outlined text-xs">link</span>
            </div>
            <span className="font-data-lg text-xs sm:text-sm text-primary-container truncate font-mono">
              {data.verificationHash}
            </span>
            <div className="flex justify-between items-center text-[10px] font-label-sm text-on-surface-variant mt-2 gap-2">
              <span className="shrink-0">UNIQUE CERTIFICATE ID</span>
              <span className="truncate">{data.certificateId}</span>
            </div>
          </div>
        </div>

        {/* AI Mentor Signature */}
        <div className="flex flex-col gap-3 sm:gap-4 items-start sm:items-end order-3">
          <div className="h-10 sm:h-12 flex items-center justify-end overflow-hidden w-full">
            <img
              className="brightness-200 opacity-80 h-full object-contain object-right ml-auto"
              alt="AI Mentor signature"
              src={data.mentorSignatureUrl}
            />
          </div>
          <div className="h-px w-full bg-white/20" />
          <div className="flex flex-col items-start sm:items-end">
            <span className="font-label-sm text-label-sm text-on-surface">
              {data.mentorTitle}
            </span>
            <span className="font-label-sm text-[10px] text-on-surface-variant">
              {data.mentorOrg}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
