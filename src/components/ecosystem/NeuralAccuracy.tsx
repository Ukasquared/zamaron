const bars = [60, 75, 65, 90, 85, 95];

export default function NeuralAccuracy() {
  return (
    <div className="glass-panel p-5 md:p-card-padding rounded-xl">
      <h4 className="font-label-sm text-label-sm text-slate-400 uppercase mb-4">
        Neural Model Accuracy
      </h4>
      <div className="h-36 md:h-48 relative flex items-end justify-between gap-1 px-1 md:px-2">
        {bars.map((h, i) => (
          <div
            key={i}
            className={`w-full bg-cyan-400/40 hover:bg-cyan-400 transition-all rounded-t-sm ${
              h >= 90 ? "neon-glow-cyan" : ""
            }`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm md:text-body-md font-bold text-primary">
          98.4% Confidence
        </p>
        <span className="text-xs text-cyan-400">+1.2% Trend</span>
      </div>
    </div>
  );
}
