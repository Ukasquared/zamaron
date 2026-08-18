export default function TrafficHeatmap() {
  return (
    <div className="col-span-full glass-panel rounded-xl overflow-hidden h-56 md:h-80 relative">
      <div className="absolute inset-0 z-0 bg-slate-900">
        <img
          className="w-full h-full object-cover opacity-20 grayscale"
          alt="Global API traffic map"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDfjqa9Jr-fY3G7SX03H3CSbXdhKPQkQiOTUIGMUZctWFA-jO59dtgO3pDlaf3yB9PNV44wSoKCYEI1WmIb_CRS5TGs3XzZZsa4mYXAdzlaspcf_HiC2RCM7kX-CaV8RDcOf_aIlMDAoDBnE3OfhY9v669HCkeTtIfjI0RfI1un5rf7U6GxwKlxMgNR5zS1J8wlGnEfEz_tgMJr7p47Qa5NLzIxqIq2CmngkWjjnDFi5u0X_vg6YxmZIrMd3F66zSdBRa6FCrqp9ng"
        />
      </div>
      <div className="relative z-10 p-5 md:p-card-padding h-full flex flex-col pointer-events-none">
        <div className="flex justify-between items-start">
          <h4 className="font-label-sm text-label-sm text-white uppercase tracking-widest drop-shadow-lg text-xs md:text-sm">
            Global API Traffic Heatmap
          </h4>
          <div className="flex gap-2">
            <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-cyan-400 neon-glow-cyan animate-pulse" />
            <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-secondary neon-glow-pink" />
          </div>
        </div>
        <div className="mt-auto flex flex-wrap gap-3 md:gap-8">
          <div className="bg-black/40 backdrop-blur-md p-2.5 md:p-3 rounded-lg border border-white/10">
            <p className="text-[10px] text-slate-400">TOP REGION</p>
            <p className="text-xs md:text-sm font-bold text-cyan-400">
              NORTH_EMEA
            </p>
          </div>
          <div className="bg-black/40 backdrop-blur-md p-2.5 md:p-3 rounded-lg border border-white/10">
            <p className="text-[10px] text-slate-400">PEAK VOL</p>
            <p className="text-xs md:text-sm font-bold text-cyan-400">
              420.5K REQ/S
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
