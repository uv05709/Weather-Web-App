"use client";

import { cn } from "@/lib/utils";
import { useSyncExternalStore } from "react";

const METEOR_SEEDS = Array.from({ length: 50 }, () => ({
  leftSeed: Math.random(),
  delaySeed: Math.random(),
  durationSeed: Math.random(),
  sizeSeed: Math.random(),
}));

const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

export function Meteors({ number = 20, className, speed = "medium" }) {
  const isClient = useIsClient();

  const speedMap = { slow: 8, medium: 4, fast: 2 };
  const baseDuration = speedMap[speed];

  const meteors = METEOR_SEEDS.slice(0, number).map((seed, i) => ({
    id: i,
    left: `${seed.leftSeed * 100}%`,
    delay: `${seed.delaySeed * 5}s`,
    duration: `${baseDuration + seed.durationSeed * 3}s`,
    size: `${1 + seed.sizeSeed * 2}px`,
  }));

  if (!isClient) return null;

  const prefersReducedMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  if (prefersReducedMotion) return null;

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className="absolute top-0 animate-meteor rounded-full bg-white/30 shadow-[0_0_3px_1px_rgba(255,255,255,0.2)]"
          style={{
            left: meteor.left,
            width: meteor.size,
            height: meteor.size,
            animationDelay: meteor.delay,
            animationDuration: meteor.duration,
          }}
        />
      ))}
    </div>
  );
}
