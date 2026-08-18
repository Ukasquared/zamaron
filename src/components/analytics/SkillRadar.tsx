const labels = [
  { text: "Cryptography", className: "top-2 left-1/2 -translate-x-1/2" },
  { text: "Infiltration", className: "top-1/4 right-0" },
  { text: "Forensics", className: "bottom-1/4 right-0" },
  { text: "Malware Analysis", className: "bottom-2 left-1/2 -translate-x-1/2" },
  { text: "Ops Sec", className: "bottom-1/4 left-0" },
  { text: "Social Eng.", className: "top-1/4 left-0" },
];

export default function SkillRadar() {
  return (
    <div className="md:col-span-8 glass-panel fresnel-edge rounded-xl p-5 md:p-8 overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 md:mb-8">
        <h3 className="text-title-md font-title-md">Skill Distribution Radar</h3>
        <div className="flex gap-4">
          <span className="flex items-center gap-2 text-label-sm">
            <span className="w-3 h-3 rounded-full bg-primary" /> Current
          </span>
          <span className="flex items-center gap-2 text-label-sm">
            <span className="w-3 h-3 rounded-full bg-secondary" /> Target
          </span>
        </div>
      </div>
      <div className="h-52 md:h-64 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 md:w-64 md:h-64 border border-outline-variant/30 rounded-full flex items-center justify-center">
            <div className="w-36 h-36 md:w-48 md:h-48 border border-outline-variant/30 rounded-full flex items-center justify-center">
              <div className="w-24 h-24 md:w-32 md:h-32 border border-outline-variant/30 rounded-full" />
            </div>
          </div>
          <div className="absolute w-full h-[1px] bg-outline-variant/20 rotate-0" />
          <div className="absolute w-full h-[1px] bg-outline-variant/20 rotate-45" />
          <div className="absolute w-full h-[1px] bg-outline-variant/20 rotate-90" />
          <div className="absolute w-full h-[1px] bg-outline-variant/20 rotate-135" />
          <svg className="absolute w-full h-full" viewBox="0 0 100 100">
            <polygon
              fill="rgba(0, 229, 255, 0.2)"
              points="50,10 85,35 75,75 25,75 15,35"
              stroke="#00e5ff"
              strokeWidth="1"
            />
            <polygon
              fill="none"
              points="50,5 95,40 85,85 15,85 5,40"
              stroke="rgba(221, 183, 255, 0.4)"
              strokeDasharray="2 2"
              strokeWidth="1"
            />
          </svg>
          {labels.map((l) => (
            <span
              key={l.text}
              className={`absolute text-[10px] md:text-label-sm ${l.className}`}
            >
              {l.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
