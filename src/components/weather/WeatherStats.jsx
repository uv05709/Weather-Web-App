"use client";

import { Droplets, Wind, Gauge, Eye, Sunrise, Sunset, Thermometer, Cloud } from "lucide-react";

function formatTime(timestamp, timezone) {
  if (!timestamp) return "N/A";
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });
}

export function WeatherStats({ weather, convertTemp, tempSymbol }) {
  const stats = [
    { icon: Droplets, label: "Humidity", value: `${weather.humidity}%`, color: "text-blue-500", detail: "Relative moisture" },
    { icon: Wind, label: "Wind Speed", value: `${Math.round(weather.windSpeed * 3.6)} km/h`, color: "text-teal-500", detail: "Surface wind" },
    { icon: Gauge, label: "Barometer", value: `${weather.pressure} hPa`, color: "text-purple-500", detail: "Atmospheric pressure" },
    { icon: Eye, label: "Visibility", value: `${(weather.visibility / 1000).toFixed(1)} km`, color: "text-emerald-500", detail: "Horizontal range" },
    { icon: Cloud, label: "Cloud Cover", value: `${weather.clouds}%`, color: "text-sky-500", detail: "Sky overcast" },
    { icon: Sunrise, label: "Sunrise", value: formatTime(weather.sunrise, weather.timezone), color: "text-amber-500", detail: "Dawn (local time)" },
    { icon: Sunset, label: "Sunset", value: formatTime(weather.sunset, weather.timezone), color: "text-rose-500", detail: "Dusk (local time)" },
    { icon: Thermometer, label: "Feels Like", value: `${convertTemp(weather.feelsLike)}${tempSymbol}`, color: "text-orange-500", detail: "Heat perception" },
  ];

  return (
    <section id="weather-stats" aria-label="Atmospheric details" className="w-full max-w-4xl">
      <div className="mb-3.5 flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900 dark:text-white sm:text-lg">
          Atmospheric Telemetry & Precision Metrics
        </h2>
        <span className="text-xs font-medium text-gray-400">Live Station Readings</span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/65 p-4 shadow-lg shadow-blue-500/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-white/85 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-blue-500/30 dark:hover:bg-slate-800/80"
          >
            {/* Ambient top light glass glare */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/20" />

            <div className="flex items-center justify-between">
              <stat.icon className={`h-5 w-5 ${stat.color} transition-transform duration-300 group-hover:scale-110`} />
              <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500">{stat.detail}</span>
            </div>
            <p className="mt-2 text-xs font-semibold text-gray-500 dark:text-gray-400">{stat.label}</p>
            <p className="mt-0.5 text-lg font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-xl">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
