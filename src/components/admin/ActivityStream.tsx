import type { ActivityItem } from "../../types/admin";

const items: ActivityItem[] = [
  {
    id: "1",
    title: "Operative Validation Success",
    description:
      "ID: XZ-1022 verified against global ledger via ZAMARON mesh.",
    time: "04:12:02 UTC",
    variant: "success",
    icon: "check_circle",
  },
  {
    id: "2",
    title: "Unrecognized Handshake Attempt",
    description:
      "Sub-protocol cluster [THETA] rejected external login from encrypted proxy.",
    time: "03:55:18 UTC",
    variant: "error",
    icon: "emergency",
  },
  {
    id: "3",
    title: "System Kernel Update",
    description:
      "Security definitions updated to V9.4.2 across all edge nodes.",
    time: "02:44:00 UTC",
    variant: "update",
    icon: "update",
  },
];

const borderClass = {
  success: "border-cyan-400",
  error: "border-error",
  update: "border-secondary",
};

const iconClass = {
  success: "text-cyan-400",
  error: "text-error",
  update: "text-secondary",
};

const titleClass = {
  success: "text-on-surface",
  error: "text-error",
  update: "text-on-surface",
};

const timeClass = {
  success: "text-cyan-400/50",
  error: "text-error/50",
  update: "text-secondary/50",
};

export default function ActivityStream() {
  return (
    <div className="glass-panel rounded-2xl p-5 md:p-card-padding">
      <div className="flex items-center justify-between mb-6">
        <h4 className="font-headline-lg text-lg text-secondary">
          Security Activity Stream
        </h4>
        <span className="material-symbols-outlined text-secondary">stream</span>
      </div>
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex gap-4 p-3 rounded-lg bg-white/[0.02] border-l-2 ${borderClass[item.variant]}`}
          >
            <div className="mt-1">
              <span
                className={`material-symbols-outlined text-sm ${iconClass[item.variant]}`}
              >
                {item.icon}
              </span>
            </div>
            <div>
              <p
                className={`text-sm font-bold ${titleClass[item.variant]}`}
              >
                {item.title}
              </p>
              <p className="text-xs text-slate-500">{item.description}</p>
              <p
                className={`text-[10px] mt-1 uppercase tracking-tighter ${timeClass[item.variant]}`}
              >
                {item.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-6 py-2 rounded border border-white/5 bg-white/5 text-[10px] font-bold tracking-widest text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all uppercase">
        View Full Log Stream
      </button>
    </div>
  );
}
