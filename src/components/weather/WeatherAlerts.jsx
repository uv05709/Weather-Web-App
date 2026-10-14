"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Flame,
  Zap,
  CloudRain,
  Wind,
  EyeOff,
  ShieldAlert,
  Bell,
  BellCheck,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
} from "lucide-react";

export function WeatherAlerts({
  alerts = [],
  cityName = "Current City",
  isSubscribed = false,
  onToggleSubscribe,
}) {
  const [expandedAlertId, setExpandedAlertId] = useState(alerts[0]?.id || null);

  const getAlertIcon = (iconName) => {
    switch (iconName) {
      case "flame":
        return <Flame className="h-5 w-5 text-red-500" />;
      case "zap":
        return <Zap className="h-5 w-5 text-purple-500" />;
      case "cloud-rain":
        return <CloudRain className="h-5 w-5 text-blue-500" />;
      case "wind":
        return <Wind className="h-5 w-5 text-amber-500" />;
      case "eye-off":
        return <EyeOff className="h-5 w-5 text-slate-500" />;
      case "shield-alert":
        return <ShieldAlert className="h-5 w-5 text-rose-600" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    }
  };

  return (
    <section
      id="severe-weather-alerts"
      aria-label="Severe Weather Alerts & Warnings"
      className="relative overflow-hidden w-full max-w-4xl rounded-3xl border border-white/60 bg-white/70 p-4 sm:p-6 shadow-xl shadow-red-500/5 backdrop-blur-2xl transition-all duration-300 dark:border-white/10 dark:bg-slate-900/70"
    >
      {/* Ambient top light glass glare */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent dark:via-white/20" />
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-600 dark:text-red-400">
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>Hazard Surveillance & IMD Criteria</span>
          </div>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-2xl">
            Severe Weather & Meteorological Alerts
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Grounded hazard bulletins for {cityName} with actionable safety protocols.
          </p>
        </div>

        {/* Subscribe to Alerts Toggle */}
        <button
          type="button"
          onClick={() => onToggleSubscribe && onToggleSubscribe(cityName)}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all self-start sm:self-auto ${
            isSubscribed
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700"
              : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-700"
          }`}
        >
          {isSubscribed ? (
            <>
              <BellCheck className="h-4 w-4" />
              Subscribed to {cityName}
            </>
          ) : (
            <>
              <Bell className="h-4 w-4 text-blue-500" />
              Subscribe to Alerts
            </>
          )}
        </button>
      </div>

      {/* Alerts Content */}
      <div className="mt-5 flex flex-col gap-3.5">
        {alerts.length === 0 ? (
          <div className="flex items-center gap-4 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/20">
            <div className="rounded-xl bg-emerald-100 p-2.5 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                All Clear — No Severe Meteorological Hazards Active
              </h3>
              <p className="mt-0.5 text-xs text-emerald-700 dark:text-emerald-400">
                Atmospheric conditions for {cityName} are within standard safety thresholds. No heatwaves, gale winds, or flash storm warnings detected.
              </p>
            </div>
          </div>
        ) : (
          alerts.map((alert) => {
            const isExpanded = expandedAlertId === alert.id;
            return (
              <div
                key={alert.id}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${alert.borderClass}`}
              >
                <div
                  className="flex cursor-pointer flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
                  onClick={() =>
                    setExpandedAlertId(isExpanded ? null : alert.id)
                  }
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-white/80 p-2 shadow-xs backdrop-blur-sm dark:bg-slate-800/80 mt-0.5">
                      {getAlertIcon(alert.icon)}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-md px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${alert.badgeColor}`}
                        >
                          {alert.severity}
                        </span>
                        <h3 className="text-sm font-bold">{alert.title}</h3>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] opacity-80">
                        <span>Area: {alert.affectedArea}</span>
                        <span>•</span>
                        <span>Valid: {alert.validTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-2">
                    <span className="text-xs font-semibold underline underline-offset-2">
                      {isExpanded ? "Hide Guidance" : "View Safety Steps"}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </div>

                {/* Expanded Detailed Bulletin & Action Guidelines */}
                {isExpanded && (
                  <div className="border-t border-black/5 bg-white/40 p-4 backdrop-blur-sm dark:border-white/5 dark:bg-black/20">
                    <p className="text-xs leading-relaxed font-medium">
                      {alert.summary}
                    </p>

                    <div className="mt-3">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider opacity-90">
                        Official Safety Protocols:
                      </h4>
                      <ul className="mt-2 space-y-1.5 text-xs">
                        {alert.guidelines.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-80" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
