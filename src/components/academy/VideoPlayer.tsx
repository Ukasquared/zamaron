import type { VideoMeta } from "../../types/academy";

const video: VideoMeta = {
  title: "Identifying Rug Pulls",
  duration: "38:20",
  currentTime: "12:45",
  progress: 33,
  quality: "1080P HD",
  thumbnailUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB7DlGJnhfvZXfxu_LqYM98VEKsn4_DYerxpGuOYH1JqDuO2VtmajsyBYq_LJcI6K6-oEdc4KrR1ANomZVp7cmtVZP1G3cmpT9D9jpmkE0P-V0nsXQVeDBJ2Y3vLaa0grfr3x_YV9Z8nZvDyimds7AECEGmsO8K9B0JyY53CW4zbsvwDa_iBsQLZ3edY4tui4qxnOZCCsEdUP3nCi7m12usUr4N6etqUzEm3Q9NMsdA3HQzE8oCTGybEPCNC-pr0VYYWogjin4ydZZl",
};

export default function VideoPlayer() {
  return (
    <div className="relative group aspect-video rounded-3xl overflow-hidden glass-panel border-white/5 shadow-2xl">
      <img
        className="w-full h-full object-cover opacity-60"
        alt="Lesson video thumbnail"
        src={video.thumbnailUrl}
      />

      {/* Hover playback overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex justify-end">
          <span className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-lg text-xs font-label-sm text-primary">
            {video.quality}
          </span>
        </div>
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="relative h-1 w-full bg-white/20 rounded-full cursor-pointer">
            <div
              className="absolute top-0 left-0 h-full bg-primary-fixed-dim neon-glow-primary rounded-full"
              style={{ width: `${video.progress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 h-3 w-3 bg-white rounded-full shadow-lg"
              style={{ left: `${video.progress}%` }}
            />
          </div>
          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button className="text-white hover:text-primary transition-colors">
                <span className="material-symbols-outlined">skip_previous</span>
              </button>
              <button className="h-12 w-12 bg-primary text-on-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform active:scale-95">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  play_arrow
                </span>
              </button>
              <button className="text-white hover:text-primary transition-colors">
                <span className="material-symbols-outlined">skip_next</span>
              </button>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-white text-xl">
                  volume_up
                </span>
                <div className="w-20 h-1 bg-white/20 rounded-full">
                  <div className="h-full w-3/4 bg-white rounded-full" />
                </div>
              </div>
              <span className="text-sm font-data-lg text-white/80">
                {video.currentTime} / {video.duration}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-white hover:text-primary transition-colors">
                <span className="material-symbols-outlined">settings</span>
              </button>
              <button className="text-white hover:text-primary transition-colors">
                <span className="material-symbols-outlined">fullscreen</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Static play icon (visible when not hovered) */}
      <div className="absolute inset-0 flex items-center justify-center group-hover:hidden transition-all">
        <div className="h-20 w-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center">
          <span
            className="material-symbols-outlined text-white text-4xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            play_arrow
          </span>
        </div>
      </div>
    </div>
  );
}
