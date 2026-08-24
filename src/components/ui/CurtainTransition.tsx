import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CurtainTransitionProps {
  isActive: boolean;
  panelCount?: number;
  color?: string;
  staggerDelay?: number;
  duration?: number;
  onCoverComplete?: () => void;
  onUncoverComplete?: () => void;
}

export function CurtainTransition({
  isActive,
  panelCount = 8,
  color = "#070b14",
  staggerDelay = 0.03,
  duration = 0.35,
  onCoverComplete,
  onUncoverComplete,
}: CurtainTransitionProps) {
  const [phase, setPhase] = useState<"idle" | "covering" | "uncovering">("idle");

  const hasRun = useRef(false);

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
   if (isActive && phase === "idle" && !hasRun.current) {
     hasRun.current = true;
        setPhase("covering");
      }
    }, [isActive, phase]);

  useEffect(() => {
    if (phase === "idle") return;

    const totalMs = reducedMotion
      ? 10
      : ((panelCount - 1) * staggerDelay + duration) * 1000 + 60;

    const timer = setTimeout(() => {
      if (phase === "covering") {
        onCoverComplete?.();
        setPhase("uncovering");
      } else if (phase === "uncovering") {
        onUncoverComplete?.();
        setPhase("idle");
      }
    }, totalMs);

    return () => clearTimeout(timer);
  }, [phase, panelCount, staggerDelay, duration, reducedMotion, onCoverComplete, onUncoverComplete]);

  if (phase === "idle") return null;

  const panels = Array.from({ length: panelCount }, (_, i) => i);
  const panelWidth = 100 / panelCount;
  const ease: [number, number, number, number] = [0.65, 0, 0.35, 1];

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none" aria-hidden="true">
      {panels.map((i) => {
        const delay = reducedMotion ? 0 : i * staggerDelay;

        return (
          <motion.div
            key={i}
            className="absolute top-0 h-full"
            style={{
              left: `${i * panelWidth}%`,
              width: `${panelWidth + 0.1}%`,
              backgroundColor: color,
              willChange: "transform",
              transformOrigin: phase === "covering" ? "top" : "bottom",
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: phase === "covering" ? 1 : 0 }}
            transition={{
              duration: reducedMotion ? 0.01 : duration,
              delay,
              ease,
            }}
          />
        );
      })}
    </div>
  );
}