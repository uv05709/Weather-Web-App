"use client";

import { cn } from "@/lib/utils";

export function TemperatureToggle({ unit, onToggle }) {
  return (
    <div className="flex items-center rounded-xl border border-gray-200 bg-white/80 p-1 backdrop-blur-sm dark:border-slate-600 dark:bg-slate-800/80" role="radiogroup" aria-label="Temperature unit">
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
