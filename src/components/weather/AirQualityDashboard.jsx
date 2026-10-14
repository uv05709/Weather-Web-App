"use client";

import { useState } from "react";
import {
  Wind,
  ShieldAlert,
  Activity,
  Home,
  HeartPulse,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export function AirQualityDashboard({ airQuality }) {
  const [showPollutantDetails, setShowPollutantDetails] = useState(true);

  if (!airQuality) {
    return null;
  }

  const { aqi, category, color, statusBg, recommendation, components } = airQuality;

  // Gauge percentage between 0 and 500
  const aqiPercentage = Math.min(100, Math.round((aqi / 400) * 100));

  return (
    <section
      id="air-quality-dashboard"
      aria-label="Air Quality Dashboard"
      className="relative overflow-hidden w-full max-w-4xl rounded-3xl border border-white/60 bg-white/70 p-4 sm:p-6 shadow-xl shadow-emerald-500/5 backdrop-blur-2xl transition-all duration-300 dark:border-white/10 dark:bg-slate-900/70"
    >
      {/* Ambient top light glass glare */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent dark:via-white/20" />
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <Wind className="h-3.5 w-3.5" />
            <span>Atmospheric Health Index</span>
          </div>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-2xl">
            Air Quality & Pollutant Dashboard
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Real-time pollutant breakdown aligned with Indian NAQI (CPCB) & US-EPA standards.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] font-medium text-gray-600 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-300">
            Standard: NAQI / US AQI
          </span>
        </div>
      </div>

      {/* Main AQI Score & Gauge Banner */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
        {/* Left Column: Big AQI Gauge */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/60 bg-white/50 p-5 text-center shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-800/50 lg:col-span-5">
          <div className="relative flex h-36 w-36 items-center justify-center">
            {/* SVG Radial Meter */}
            <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                className="stroke-gray-200 dark:stroke-slate-800"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke={color}
                strokeWidth="9"
                strokeLinecap="round"
                strokeDasharray={264}
                strokeDashoffset={264 - (264 * aqiPercentage) / 100}
                fill="none"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                {aqi}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                AQI Index
              </span>
            </div>
          </div>

          <div className={`mt-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${statusBg}`}>
            <span>{category}</span>
          </div>

          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {aqi <= 50
              ? "Air quality is satisfactory with minimal health risk."
              : aqi <= 100
              ? "Acceptable air quality for the vast majority of citizens."
              : aqi <= 200
              ? "Sensitive individuals may experience irritation; wear masks."
              : aqi <= 300
              ? "Health alert: high risk of respiratory distress outdoors."
              : "Emergency conditions: hazardous toxic air concentrations."}
          </p>
        </div>

        {/* Right Column: Practical Outdoor Guidance Cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-7">
          <div className="rounded-2xl border border-white/60 bg-white/50 p-3.5 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-800/50">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-900 dark:text-white">
              <Activity className="h-4 w-4 text-blue-500" />
              <span>Outdoor Workouts & Jogging</span>
            </div>
            <p className="mt-1.5 text-xs text-gray-600 dark:text-gray-300">
              {recommendation.outdoor}
            </p>
          </div>

          <div className="rounded-2xl border border-white/60 bg-white/50 p-3.5 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-800/50">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-900 dark:text-white">
              <ShieldAlert className="h-4 w-4 text-amber-500" />
              <span>Mask & Protection Advice</span>
            </div>
            <p className="mt-1.5 text-xs text-gray-600 dark:text-gray-300">
              {recommendation.mask}
            </p>
          </div>

          <div className="rounded-2xl border border-white/60 bg-white/50 p-3.5 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-800/50">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-900 dark:text-white">
              <Home className="h-4 w-4 text-teal-500" />
              <span>Indoor Air & Ventilation</span>
            </div>
            <p className="mt-1.5 text-xs text-gray-600 dark:text-gray-300">
              {recommendation.ventilation}
            </p>
          </div>

          <div className="rounded-2xl border border-white/60 bg-white/50 p-3.5 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-800/50">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-900 dark:text-white">
              <HeartPulse className="h-4 w-4 text-rose-500" />
              <span>Sensitive Demographics</span>
            </div>
            <p className="mt-1.5 text-xs text-gray-600 dark:text-gray-300">
              {recommendation.sensitive}
            </p>
          </div>
        </div>
      </div>

      {/* Individual Pollutants Breakdown Toggle */}
      <div className="mt-6 border-t border-gray-100 pt-4 dark:border-slate-800">
        <button
          type="button"
          onClick={() => setShowPollutantDetails(!showPollutantDetails)}
          className="flex w-full items-center justify-between text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
        >
          <span className="flex items-center gap-1.5">
            <Info className="h-3.5 w-3.5 text-blue-500" />
            Detailed Pollutant Concentrations (PM2.5, PM10, NO₂, SO₂, CO, Ozone)
          </span>
          {showPollutantDetails ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        {showPollutantDetails && components && (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {Object.entries(components).map(([key, item]) => {
              const isOverStandard = item.value > item.standard;
              return (
                <div
                  key={key}
                  className="rounded-2xl border border-white/60 bg-white/60 p-3 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-800/60"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900 dark:text-white">
                      {item.name}
                    </span>
                    <span
                      className={`text-[10px] font-bold ${
                        isOverStandard
                          ? "text-rose-600 dark:text-rose-400"
                          : "text-emerald-600 dark:text-emerald-400"
                      }`}
                    >
                      {item.value} {item.unit}
                    </span>
                  </div>

                  {/* Progress bar compared to safe limit */}
                  <div className="mt-2.5 h-1.5 w-full rounded-full bg-gray-100 dark:bg-slate-700">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isOverStandard
                          ? "bg-rose-500"
                          : item.percent > 70
                          ? "bg-amber-500"
                          : "bg-emerald-500"
                      }`}
                      style={{ width: `${Math.min(100, item.percent)}%` }}
                    />
                  </div>

                  <p className="mt-2 text-[10px] text-gray-400 line-clamp-2">
                    {item.description}
                  </p>
                  <p className="mt-1 text-[9px] font-medium text-gray-400">
                    Std Limit: {item.standard} {item.unit}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
