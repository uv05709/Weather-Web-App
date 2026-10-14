"use client";

import { cn } from "@/lib/utils";

export function TemperatureToggle({ unit, onToggle }) {
  return (
    <div className="flex items-center rounded-xl border border-white/60 bg-white/70 p-1 shadow-md shadow-blue-500/5 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70" role="radiogroup" aria-label="Temperature unit">
      <button
        onClick={() => onToggle("celsius")}
        className={cn(
          "rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200",
          unit === "celsius" ? "bg-blue-500 text-white shadow-sm" : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        )}
        role="radio"
        aria-checked={unit === "celsius"}
      >
        °C
      </button>
      <button
        onClick={() => onToggle("fahrenheit")}
        className={cn(
          "rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200",
          unit === "fahrenheit" ? "bg-blue-500 text-white shadow-sm" : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        )}
        role="radio"
        aria-checked={unit === "fahrenheit"}
      >
        °F
      </button>
    </div>
  );
}
