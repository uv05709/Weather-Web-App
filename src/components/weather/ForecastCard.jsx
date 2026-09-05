"use client";

import { WeatherIcon } from "./WeatherIcon";
import { Droplets } from "lucide-react";

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
    <div className="group flex min-w-[140px] flex-col items-center gap-2 rounded-xl border border-gray-200/50 bg-white/60 p-4 backdrop-blur-sm transition-all duration-200 hover:border-blue-300/50 hover:bg-white/80 hover:shadow-md dark:border-slate-700/50 dark:bg-slate-800/60 dark:hover:border-blue-500/30 dark:hover:bg-slate-800/80">
      <p className="text-sm font-semibold text-gray-900 dark:text-white">{dayName}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{date}</p>
      <WeatherIcon code={day.weatherIcon} size="md" className="my-1 transition-transform duration-200 group-hover:scale-110" />
      <p className="text-xs capitalize text-gray-600 dark:text-gray-300">{day.weatherDescription}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-lg font-bold text-gray-900 dark:text-white">{convertTemp(day.tempMax)}{tempSymbol}</span>
        <span className="text-sm text-gray-400 dark:text-gray-500">{convertTemp(day.tempMin)}{tempSymbol}</span>
      </div>
      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
        <Droplets className="h-3 w-3" />
        <span>{day.humidity}%</span>
      </div>
      {day.pop > 0 && (
        <div className="w-full">
          <div className="flex items-center justify-between text-xs text-blue-500 dark:text-blue-400">
            <span>Rain</span>
            <span>{day.pop}%</span>
          </div>
          <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-slate-700">
            <div className="h-full rounded-full bg-blue-500 transition-all duration-500" style={{ width: `${day.pop}%` }} role="progressbar" aria-valuenow={day.pop} aria-valuemin={0} aria-valuemax={100} aria-label={`${day.pop}% chance of rain`} />
          </div>
        </div>
      )}
    </div>
  );
}
