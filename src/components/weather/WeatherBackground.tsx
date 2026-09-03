"use client";

import { Meteors } from "@/components/ui/meteors";
import { cn } from "@/lib/utils";

interface WeatherBackgroundProps {
  weatherMain?: string;
}

const backgrounds: Record<string, string> = {
  Clear: "bg-gradient-to-br from-amber-50 via-sky-50 to-blue-50 dark:from-slate-950 dark:via-amber-950/20 dark:to-slate-900",
  Clouds: "bg-gradient-to-br from-gray-100 via-slate-50 to-gray-100 dark:from-slate-950 dark:via-slate-900 dark:to-gray-950",
  Rain: "bg-gradient-to-br from-blue-100 via-slate-100 to-cyan-50 dark:from-slate-950 dark:via-blue-950/30 dark:to-slate-900",
  Drizzle: "bg-gradient-to-br from-blue-50 via-cyan-50 to-slate-50 dark:from-slate-950 dark:via-blue-950/20 dark:to-slate-900",
  Thunderstorm: "bg-gradient-to-br from-purple-100 via-slate-200 to-indigo-100 dark:from-slate-950 dark:via-purple-950/30 dark:to-indigo-950/20",
  Snow: "bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-slate-950 dark:via-blue-950/10 dark:to-slate-900",
  Mist: "bg-gradient-to-br from-gray-100 via-gray-50 to-slate-100 dark:from-slate-950 dark:via-gray-900 dark:to-slate-950",
  Haze: "bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 dark:from-slate-950 dark:via-amber-950/10 dark:to-slate-900",
  Fog: "bg-gradient-to-br from-gray-100 via-gray-50 to-slate-100 dark:from-slate-950 dark:via-gray-900 dark:to-slate-950",
};

const defaultBg = "bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950/10 dark:to-slate-900";

export function WeatherBackground({ weatherMain }: WeatherBackgroundProps) {
  const bg = weatherMain ? (backgrounds[weatherMain] ?? defaultBg) : defaultBg;
  const showMeteors = weatherMain === "Rain" || weatherMain === "Drizzle" || weatherMain === "Snow";

  return (
    <div className={cn("fixed inset-0 -z-10 transition-colors duration-1000", bg)} aria-hidden="true">
      {showMeteors && (
        <Meteors
          number={weatherMain === "Snow" ? 30 : 40}
          speed={weatherMain === "Snow" ? "slow" : "medium"}
        />
      )}
    </div>
  );
}
