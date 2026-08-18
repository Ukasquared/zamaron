import CertificateCard from "./CertificateCard";
import type { CertificateData } from "../../types/certificate";

const certificate: CertificateData = {
  recipientName: "Alex",
  courseTitle: "Crypto Security 101",
  academyName: "ZAMARON ACADEMY",
  verificationHash: "0x7F4B2C9E...82D1A19",
  certificateId: "#ZMRN-2024-8892",
  auditorTitle: "LEAD SECURITY AUDITOR",
  auditorOrg: "ZAMARON PROTOCOL COMMAND",
  mentorTitle: "AI MENTOR",
  mentorOrg: "NEURAL INTERFACE SYSTEM",
  auditorSignatureUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCQa6lqj7wQa_XEbTXtHvhagjlDGiS6Qh-YixdU_DKZpqi_v7yf4STXXl0mo7zqywK5BUSG7X3lXzeAR0OSQPVjnogeCypjKrnYBATI5-baS99tLcgp5CVT6gchAwNueQTh6Wcb2e7dZMPyxoH3VAyCrtLLgf-o9RtVqX-rYCs-xqhVUFkfGLNOJcZGyHdbt_EDBo1gGKwV5i07H2QYkxqUoGnZ2ftU31b3AMMW-7NBfAs3NziN6pCqfGrlhAliBWvYdMwsJKgsxUAV",
  mentorSignatureUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDf4wPEFPaZyCj__GY6Wxrg82gpM2bdGG5eLIA1s2sPu4ONPkZClUf3-HvB4wrYaXPlOdMf7kJfoWr7rBqngflBwR3s6NVksgVJRKrU3wf2lf2EPojgJTUIqJxGxLfeROrDbfn70Y_ph_4f4iX4Xd0Vwl7s1BfWmlrbwIc_PiA8JKWqg0AMsu8fRsvdw91xxnukhsG1n_bTZ5apAsJB2_hyEaZmgYtnCVrh0v0MpLhIa8uy_HgcMM_RyF5AeQmm19bL3H4JOuzxJA8j",
};

export default function CertificatePage() {
  return (
    <div className="matrix-bg min-h-screen flex flex-col font-body-md text-on-background">
      <main className="flex-1 w-full max-w-[1280px] mx-auto flex flex-col items-center justify-center relative overflow-hidden px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 pb-40 sm:pb-44">
        {/* Decorative Background Nodes */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-[10%] left-[15%] w-40 sm:w-64 h-40 sm:h-64 bg-primary-container/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[20%] right-[10%] w-56 sm:w-96 h-56 sm:h-96 bg-secondary-container/10 rounded-full blur-[150px]" />
        </div>

        <CertificateCard data={certificate} />

        {/* Action Buttons */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-6 w-full sm:w-auto max-w-md sm:max-w-none">
          <button className="bg-surface-container-high/40 hover:bg-surface-container-highest transition-all px-6 sm:px-8 py-3 rounded-lg border border-white/10 flex items-center justify-center gap-3 group">
            <span className="material-symbols-outlined text-primary-container group-hover:scale-110 transition-transform">
              download
            </span>
            <span className="font-label-sm text-label-sm text-on-surface">
              DOWNLOAD PDF
            </span>
          </button>
          <button className="bg-primary-container text-on-primary-container hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all px-6 sm:px-8 py-3 rounded-lg flex items-center justify-center gap-3">
            <span className="material-symbols-outlined text-on-primary-container">
              share
            </span>
            <span className="font-label-sm text-label-sm">SHARE CREDENTIAL</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full flex flex-col items-center gap-4 sm:gap-6 bg-slate-950 py-8 sm:py-12 border-t border-white/5 mt-auto">
        <div className="max-w-[1280px] w-full px-4 sm:px-8 flex flex-col items-center gap-6 sm:gap-8">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-12">
            {[
              "Security Audit",
              "Privacy Matrix",
              "Terms of Intel",
              "Neural API",
            ].map((link) => (
              <a
                key={link}
                className="font-display-xl text-xs uppercase tracking-widest text-slate-600 hover:text-cyan-400 transition-colors"
                href="#"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center">
            <span className="font-display-xl text-xs uppercase tracking-widest font-bold text-slate-200">
              ZAMARON PROTOCOL
            </span>
            <span className="hidden sm:block w-1 h-1 bg-slate-700 rounded-full" />
            <span className="font-display-xl text-xs uppercase tracking-widest text-slate-600">
              © 2024 ZAMARON PROTOCOL. SECURE THE FRONTIER.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
