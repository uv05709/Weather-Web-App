"use client";

import { ForecastDay } from "@/types/weather";
import { ForecastCard } from "./ForecastCard";

interface ForecastProps {
  forecast: ForecastDay[];
  convertTemp: (temp: number) => number;
  tempSymbol: string;
}

export function Forecast({ forecast, convertTemp, tempSymbol }: ForecastProps) {
  if (forecast.length === 0) return null;

  return (
    <section aria-label="5-Day Forecast" className="w-full max-w-4xl">
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">5-Day Forecast</h3>
      <div className="flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-5 sm:overflow-visible">
        {forecast.map((day) => (
          <ForecastCard
            key={day.date}
            day={day}
            convertTemp={convertTemp}
            tempSymbol={tempSymbol}
          />
        ))}
      </div>
    </section>
  );
}
