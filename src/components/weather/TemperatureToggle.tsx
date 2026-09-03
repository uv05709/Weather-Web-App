"use client";

import { TemperatureUnit } from "@/types/weather";
import { cn } from "@/lib/utils";

interface TemperatureToggleProps {
  unit: TemperatureUnit;
  onToggle: (unit: TemperatureUnit) => void;
}

export function TemperatureToggle({ unit, onToggle }: TemperatureToggleProps) {
  return (
    <div
      className="inline-flex items-center rounded-xl border border-gray-200 bg-white/80 p-1 shadow-sm backdrop-blur-sm dark:border-slate-600 dark:bg-slate-800/80"
      role="radiogroup"
      aria-label="Temperature unit"
    >
      <button
        onClick={() => onToggle("celsius")}
        className={cn(
          "rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200",
          unit === "celsius"
            ? "bg-blue-500 text-white shadow-sm"
            : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        )}
        role="radio"
        aria-checked={unit === "celsius"}
        aria-label="Celsius"
      >
        °C
      </button>
      <button
        onClick={() => onToggle("fahrenheit")}
        className={cn(
          "rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200",
          unit === "fahrenheit"
            ? "bg-blue-500 text-white shadow-sm"
            : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        )}
        role="radio"
        aria-checked={unit === "fahrenheit"}
        aria-label="Fahrenheit"
      >
        °F
      </button>
    </div>
  );
}
