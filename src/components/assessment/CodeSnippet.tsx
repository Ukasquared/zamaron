type CodeLine = {
  text: string;
  type?: "keyword" | "function" | "string" | "comment" | "error" | "number" | "plain";
};

type Props = {
  language: string;
  lines: CodeLine[];
};

const typeClass: Record<NonNullable<CodeLine["type"]>, string> = {
  keyword: "text-secondary",
  function: "text-primary-container",
  string: "text-tertiary-fixed-dim",
  comment: "text-slate-500",
  error: "text-error",
  number: "text-primary-container",
  plain: "text-cyan-100",
};

export default function CodeSnippet({ language, lines }: Props) {
  return (
    <div className="code-block p-4 md:p-6 rounded-2xl border border-white/10 relative group overflow-x-auto">
      <div className="absolute top-3 right-3 md:top-4 md:right-4 flex gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
      </div>
      <pre className="text-cyan-100 font-mono text-xs sm:text-sm leading-relaxed whitespace-pre min-w-0">
        {lines.map((line, i) => (
          <span key={i} className={typeClass[line.type ?? "plain"]}>
            {line.text}
          </span>
        ))}
      </pre>
      <div className="absolute bottom-3 right-4 md:bottom-4 md:right-6 text-[10px] font-label-sm text-slate-600 uppercase tracking-widest">
        {language}
      </div>
    </div>
  );
}
