import { useState } from "react";
import AssessmentSideNav from "./AssessmentSideNav";
import QuizHeader from "./QuizHeader";
import CodeSnippet from "./CodeSnippet";
import QuizOptions from "./QuizOptions";
import InfoCards from "./InfoCards";
import type { AssessmentMeta, QuizQuestion } from "../../types/assessment";

const meta: AssessmentMeta = {
  courseTitle: "Crypto Security 101",
  phaseLabel: "Final Assessment Phase",
  timeRemaining: "14:52",
  progressPercent: 80,
};

const question: QuizQuestion = {
  id: "q8",
  number: 8,
  total: 10,
  prompt:
    "Identify the primary risk factor in the provided smart contract snippet.",
  codeSnippet: {
    language: "Solidity v0.8.0",
    lines: [
      { text: "function ", type: "keyword" },
      { text: "withdrawBalance", type: "function" },
      { text: "() ", type: "plain" },
      { text: "public", type: "keyword" },
      { text: " {\n", type: "plain" },
      { text: "    uint amountToWithdraw = userBalances[msg.sender];\n", type: "plain" },
      { text: "    // Vulnerable operation below\n", type: "comment" },
      { text: "    (bool success, ) = msg.sender.", type: "plain" },
      { text: "call", type: "function" },
      { text: "{value: amountToWithdraw}(", type: "plain" },
      { text: '""', type: "string" },
      { text: ");\n", type: "plain" },
      { text: "    require", type: "error" },
      { text: "(success);\n", type: "plain" },
      { text: "    userBalances[msg.sender] = ", type: "plain" },
      { text: "0", type: "number" },
      { text: ";\n", type: "plain" },
      { text: "}", type: "plain" },
    ],
  },
  options: [
    {
      id: "a",
      label: "A",
      text: "Integer Overflow in the withdrawal calculation.",
    },
    {
      id: "b",
      label: "B",
      text: "Reentrancy attack via low-level call before state update.",
    },
    {
      id: "c",
      label: "C",
      text: "Front-running vulnerability due to public visibility.",
    },
    {
      id: "d",
      label: "D",
      text: "Incorrect use of `msg.sender` in a delegated context.",
    },
  ],
};

export default function AssessmentPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen overflow-x-hidden">
      <AssessmentSideNav
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="md:ml-64 min-h-screen relative overflow-y-auto px-4 sm:px-8 md:px-12 py-6 md:py-8 flex flex-col items-center">
        {/* Background Ambient Elements */}
        <div className="fixed inset-0 pointer-events-none -z-10">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary-container/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary-container/10 blur-[150px] rounded-full" />
        </div>

        <QuizHeader
          meta={meta}
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Central Quiz Container */}
        <div className="w-full max-w-5xl glass-panel rounded-2xl md:rounded-3xl p-5 sm:p-8 md:p-10 relative shadow-2xl overflow-hidden">
          {/* Progress */}
          <div className="mb-8 md:mb-12">
            <div className="flex justify-between items-end mb-3 md:mb-4">
              <span className="font-label-sm text-label-sm text-slate-400 uppercase">
                Assessment Progress
              </span>
              <span className="font-data-lg text-data-lg text-primary text-lg md:text-2xl">
                Question {question.number}{" "}
                <span className="text-slate-500 text-base md:text-lg">
                  / {question.total}
                </span>
              </span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${meta.progressPercent}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="space-y-6 md:space-y-8">
            <h1 className="font-headline-lg text-xl sm:text-2xl md:text-headline-lg text-white leading-snug">
              {question.prompt}
            </h1>

            {question.codeSnippet && (
              <CodeSnippet
                language={question.codeSnippet.language}
                lines={question.codeSnippet.lines}
              />
            )}

            <QuizOptions
              options={question.options}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />

            {/* Action Footer */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between pt-6 md:pt-8 border-t border-white/10 gap-4 md:gap-6">
              <a
                className="text-label-sm font-label-sm text-slate-500 hover:text-white transition-colors flex items-center gap-2 justify-center md:justify-start order-3 md:order-1"
                href="#"
              >
                <span className="material-symbols-outlined text-sm">
                  skip_next
                </span>
                SKIP FOR NOW
              </a>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 w-full md:w-auto order-1 md:order-2">
                <button className="px-6 md:px-8 py-3.5 md:py-4 rounded-xl bg-transparent border border-white/10 text-white font-label-sm hover:bg-white/5 transition-all w-full md:w-auto">
                  PREVIOUS
                </button>
                <button
                  className="px-8 md:px-12 py-3.5 md:py-4 rounded-xl bg-primary-container text-on-primary-container font-label-sm font-bold shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] active:scale-95 transition-all w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!selectedId}
                >
                  SUBMIT ANSWER
                </button>
              </div>
            </div>
          </div>
        </div>

        <InfoCards />
      </main>

      {/* Footer */}
      <footer className="md:ml-64 w-full md:w-[calc(100%-256px)] py-8 md:py-12 border-t border-white/5 bg-slate-950 flex flex-col items-center gap-4 md:gap-6 z-10 px-4">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {["Security Audit", "Privacy Matrix", "Terms of Intel", "Neural API"].map(
            (link) => (
              <a
                key={link}
                className="font-display-xl text-xs uppercase tracking-widest text-slate-600 hover:text-cyan-400 transition-colors"
                href="#"
              >
                {link}
              </a>
            )
          )}
        </div>
        <p className="font-display-xl text-xs uppercase tracking-widest text-slate-600 text-center">
          © 2024 ZAMARON PROTOCOL. SECURE THE FRONTIER.
        </p>
      </footer>
    </div>
  );
}
