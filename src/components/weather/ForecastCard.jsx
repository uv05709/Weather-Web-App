"use client";

import { WeatherIcon } from "./WeatherIcon";
import { Droplets, Wind } from "lucide-react";

function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return {
    dayName: d.toLocaleDateString("en-US", { weekday: "short" }),
    date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  };
}

export function ForecastCard({ day, convertTemp, tempSymbol }) {
  const { dayName, date } = formatDate(day.date);

  return (
    <div className="group relative flex min-w-[140px] flex-col items-center gap-2 overflow-hidden rounded-2xl border border-white/60 bg-white/65 p-4 shadow-lg shadow-blue-500/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-white/85 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-blue-500/30 dark:hover:bg-slate-800/80">
      {/* Ambient glass top highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/20" />

      <h3 className="text-sm font-bold text-gray-900 dark:text-white">{dayName}</h3>
      <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400">{date}</p>
      
      <div className="my-1 rounded-xl bg-blue-500/5 p-2 dark:bg-white/5">
        <WeatherIcon code={day.weatherIcon} size="md" className="transition-transform duration-300 group-hover:scale-110" />
      </div>

      <p className="text-xs font-semibold capitalize text-gray-600 dark:text-gray-300 text-center line-clamp-1">
        {day.weatherDescription}
      </p>

      <div className="flex items-baseline gap-1.5 mt-0.5">
        <span className="text-lg font-extrabold text-gray-900 dark:text-white">
          {convertTemp(day.tempMax)}{tempSymbol}
        </span>
        <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">
          {convertTemp(day.tempMin)}{tempSymbol}
        </span>
      </div>

      <div className="mt-1 flex items-center justify-between w-full text-[11px] font-medium text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-slate-800/80 pt-2">
        <span className="flex items-center gap-1">
          <Droplets className="h-3 w-3 text-blue-500" />
          {day.humidity}%
        </span>
        <span className="flex items-center gap-1">
          <Wind className="h-3 w-3 text-teal-500" />
          {day.windSpeed} km/h
        </span>
      </div>

      {day.pop > 0 && (
        <div className="w-full mt-1">
          <div className="flex items-center justify-between text-[10px] font-bold text-blue-600 dark:text-blue-400">
            <span>Rain Risk</span>
            <span>{day.pop}%</span>
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
              style={{ width: `${day.pop}%` }}
              role="progressbar"
              aria-valuenow={day.pop}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${day.pop}% precipitation probability`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
