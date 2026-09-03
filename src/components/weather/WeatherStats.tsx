"use client";

import {
  Droplets,
  Wind,
  Gauge,
  Eye,
  Sunrise,
  Sunset,
  Thermometer,
} from "lucide-react";
import { CurrentWeather } from "@/types/weather";

interface WeatherStatsProps {
  weather: CurrentWeather;
  convertTemp: (temp: number) => number;
  tempSymbol: string;
}

function formatTime(timestamp: number, timezone: number): string {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });
}

export function WeatherStats({ weather, convertTemp, tempSymbol }: WeatherStatsProps) {
  const stats = [
    {
      icon: Droplets,
      label: "Humidity",
      value: `${weather.humidity}%`,
      color: "text-blue-500",
    },
    {
      icon: Wind,
      label: "Wind Speed",
      value: `${Math.round(weather.windSpeed * 3.6)} km/h`,
      color: "text-teal-500",
    },
    {
      icon: Gauge,
      label: "Pressure",
      value: `${weather.pressure} hPa`,
      color: "text-purple-500",
    },
    {
      icon: Eye,
      label: "Visibility",
      value: `${(weather.visibility / 1000).toFixed(1)} km`,
      color: "text-green-500",
    },
    {
      icon: Sunrise,
      label: "Sunrise",
      value: formatTime(weather.sunrise, weather.timezone),
      color: "text-orange-500",
    },
    {
      icon: Sunset,
      label: "Sunset",
      value: formatTime(weather.sunset, weather.timezone),
      color: "text-rose-500",
    },
    {
      icon: Thermometer,
      label: "Feels Like",
      value: `${convertTemp(weather.feelsLike)}${tempSymbol}`,
      color: "text-red-500",
    },
  ];

  return (
    <section aria-label="Weather details" className="w-full max-w-4xl">
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Weather Details</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group rounded-xl border border-gray-200/50 bg-white/60 p-4 backdrop-blur-sm transition-all duration-200 hover:border-gray-300/50 hover:bg-white/80 hover:shadow-md dark:border-slate-700/50 dark:bg-slate-800/60 dark:hover:border-slate-600/50 dark:hover:bg-slate-800/80"
          >
            <stat.icon className={`h-5 w-5 ${stat.color} mb-2 transition-transform duration-200 group-hover:scale-110`} />
            <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
            <p className="mt-0.5 text-lg font-semibold text-gray-900 dark:text-white">{stat.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
