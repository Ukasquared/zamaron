import type { LessonNote } from "../../types/academy";

const notes: LessonNote[] = [
  {
    id: "liquidity-lock",
    title: "Liquidity Lock Verification",
    description:
      "Ensure liquidity is locked in a reputable third-party locker (e.g., Unicrypt) for at least 6-12 months.",
    icon: "lock",
    variant: "primary",
  },
  {
    id: "holder-concentration",
    title: "Top Holder Concentration",
    description:
      "Analyze wallet distribution. If 5 wallets hold >20% excluding burn addresses, exit risk is extremely high.",
    icon: "group",
    variant: "secondary",
  },
];

export default function LessonNotes() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-secondary">
          sticky_note_2
        </span>
        <h2 className="font-headline-lg text-data-lg text-white">
          Lesson Notes
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`glass-panel p-6 rounded-2xl border-white/5 transition-all group ${
              note.variant === "primary"
                ? "hover:border-primary-fixed-dim/30"
                : "hover:border-secondary-container/30"
            }`}
          >
            <div
              className={`h-10 w-10 rounded-lg flex items-center justify-center mb-4 transition-all ${
                note.variant === "primary"
                  ? "bg-primary-container/10 text-primary-container group-hover:neon-glow-primary"
                  : "bg-secondary-container/10 text-secondary-container group-hover:neon-glow-secondary"
              }`}
            >
              <span className="material-symbols-outlined">{note.icon}</span>
            </div>
            <h4 className="text-white font-headline-lg text-body-md font-bold mb-2">
              {note.title}
            </h4>
            <p className="text-on-surface-variant font-body-md text-sm leading-relaxed">
              {note.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
