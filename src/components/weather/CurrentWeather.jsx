"use client";

import { Heart } from "lucide-react";
import { WeatherIcon } from "./WeatherIcon";
import { MovingBorder } from "@/components/ui/moving-border";
import { cn } from "@/lib/utils";

const weatherGradients = {
  Clear: "from-amber-400/10 via-orange-300/5 to-yellow-200/10 dark:from-amber-500/10 dark:via-orange-400/5 dark:to-yellow-300/5",
  Clouds: "from-gray-300/10 via-slate-200/5 to-gray-100/10 dark:from-gray-600/10 dark:via-slate-500/5 dark:to-gray-400/5",
  Rain: "from-blue-400/10 via-cyan-300/5 to-blue-200/10 dark:from-blue-600/10 dark:via-cyan-500/5 dark:to-blue-400/5",
  Drizzle: "from-blue-300/10 via-cyan-200/5 to-blue-100/10 dark:from-blue-500/10 dark:via-cyan-400/5 dark:to-blue-300/5",
  Thunderstorm: "from-purple-400/10 via-violet-300/5 to-indigo-200/10 dark:from-purple-600/10 dark:via-violet-500/5 dark:to-indigo-400/5",
  Snow: "from-cyan-200/10 via-blue-100/5 to-white/10 dark:from-cyan-400/10 dark:via-blue-300/5 dark:to-slate-200/5",
  Mist: "from-gray-200/10 via-slate-100/5 to-gray-50/10 dark:from-gray-500/10 dark:via-slate-400/5 dark:to-gray-300/5",
  Haze: "from-yellow-200/10 via-amber-100/5 to-orange-50/10 dark:from-yellow-500/10 dark:via-amber-400/5 dark:to-orange-300/5",
};

export function CurrentWeatherCard({ weather, convertTemp, tempSymbol, isFavorite, onToggleFavorite }) {
  const gradient = weatherGradients[weather.weatherMain] ?? weatherGradients.Clear;

  return (
    <MovingBorder containerClassName="w-full max-w-2xl" className="p-0">
      <div className={cn("relative overflow-hidden rounded-2xl bg-gradient-to-br p-6 sm:p-8", gradient)}>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              {weather.city}
              <span className="ml-2 text-base font-normal text-gray-500 dark:text-gray-400">{weather.country}</span>
            </h2>
            <p className="mt-1 text-sm capitalize text-gray-600 dark:text-gray-300">{weather.weatherDescription}</p>
          </div>
          <button
            onClick={onToggleFavorite}
            className={cn(
              "rounded-full p-2 transition-all duration-200 hover:scale-110 focus:ring-2 focus:ring-blue-400/20 focus:outline-none",
              isFavorite ? "text-red-500 hover:text-red-600" : "text-gray-400 hover:text-red-400 dark:text-gray-500"
            )}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={cn("h-6 w-6", isFavorite && "fill-current")} />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <div className="text-6xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl">
              {convertTemp(weather.temp)}
              <span className="text-3xl font-normal text-gray-500 dark:text-gray-400 sm:text-4xl">{tempSymbol}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-300">
              <span>Feels like {convertTemp(weather.feelsLike)}{tempSymbol}</span>
              <span>↑ {convertTemp(weather.tempMax)}{tempSymbol}</span>
              <span>↓ {convertTemp(weather.tempMin)}{tempSymbol}</span>
            </div>
          </div>
          <WeatherIcon code={weather.weatherIcon} size="xl" />
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 rounded-xl border border-gray-200/50 bg-white/40 p-3 backdrop-blur-sm dark:border-slate-600/30 dark:bg-slate-800/40">
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">Humidity</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{weather.humidity}%</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">Wind</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{Math.round(weather.windSpeed * 3.6)} km/h</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">Pressure</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{weather.pressure} hPa</p>
          </div>
        </div>
      </div>
    </MovingBorder>
  );
}
