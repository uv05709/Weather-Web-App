"use client";

import { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Thermometer, CloudRain, Wind, Clock, Calendar, Droplets, Compass } from "lucide-react";
import { WeatherIcon } from "./WeatherIcon";

export function WeatherCharts({
  hourlyForecast = [],
  dailyForecast = [],
  convertTemp,
  tempSymbol = "°C",
}) {
  const [activeRange, setActiveRange] = useState("24h"); // "24h" | "5d"
  const [activeMetric, setActiveMetric] = useState("temp"); // "temp" | "rain" | "wind"
  const [selectedPoint, setSelectedPoint] = useState(null);

  // Next 24 hours points (first 8 3-hour increments)
  const hourly24h = useMemo(() => {
    return hourlyForecast.slice(0, 8).map((item) => ({
      ...item,
      label: item.time,
      displayTemp: convertTemp(item.temp),
      displayFeelsLike: convertTemp(item.feelsLike),
    }));
  }, [hourlyForecast, convertTemp]);

  // 5-day points
  const daily5d = useMemo(() => {
    return dailyForecast.slice(0, 5).map((item) => ({
      ...item,
      label: item.dayName || item.date,
      displayTemp: convertTemp(item.tempAvg),
      displayTempMax: convertTemp(item.tempMax),
      displayTempMin: convertTemp(item.tempMin),
    }));
  }, [dailyForecast, convertTemp]);

  const activeData = activeRange === "24h" ? hourly24h : daily5d;

  // Selected point default to first point if none selected
  const currentDetail = selectedPoint || activeData[0] || null;

  if (!activeData || activeData.length === 0) {
    return null;
  }

  return (
    <section
      id="weather-charts"
      aria-label="Interactive Weather Charts"
      className="relative overflow-hidden w-full max-w-4xl rounded-3xl border border-white/60 bg-white/70 p-4 sm:p-6 shadow-xl shadow-blue-500/5 backdrop-blur-2xl transition-all duration-300 dark:border-white/10 dark:bg-slate-900/70"
    >
      {/* Ambient top light glass glare */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent dark:via-white/20" />
      {/* Header with Title and View toggles */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
            <span>Dynamic Meteorological Trends</span>
          </div>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-2xl">
            Interactive Weather Charts
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Tap any data point on the chart to inspect precision atmospheric metrics.
          </p>
        </div>

        {/* 24h vs 5-Day Toggle */}
        <div className="inline-flex rounded-xl border border-white/60 bg-white/60 p-1 shadow-xs backdrop-blur-md dark:border-white/10 dark:bg-slate-800/60 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => {
              setActiveRange("24h");
              setSelectedPoint(null);
            }}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
              activeRange === "24h"
                ? "bg-white text-blue-600 shadow-sm dark:bg-slate-700 dark:text-blue-400"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            <Clock className="h-3.5 w-3.5" />
            Next 24 Hours
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveRange("5d");
              setSelectedPoint(null);
            }}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
              activeRange === "5d"
                ? "bg-white text-blue-600 shadow-sm dark:bg-slate-700 dark:text-blue-400"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            <Calendar className="h-3.5 w-3.5" />
            5-Day Outlook
          </button>
        </div>
      </div>

      {/* Metric Switcher Tabs */}
      <div className="mt-5 flex flex-wrap gap-2 border-b border-gray-100/60 pb-3 dark:border-slate-800/60">
        <button
          type="button"
          onClick={() => setActiveMetric("temp")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
            activeMetric === "temp"
              ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-orange-500/20"
              : "border border-white/40 bg-white/50 text-gray-700 hover:bg-white/80 dark:border-white/10 dark:bg-slate-800/50 dark:text-gray-300 dark:hover:bg-slate-700/80"
          }`}
        >
          <Thermometer className="h-4 w-4" />
          Temperature ({tempSymbol})
        </button>

        <button
          type="button"
          onClick={() => setActiveMetric("rain")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
            activeMetric === "rain"
              ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md shadow-cyan-500/20"
              : "border border-white/40 bg-white/50 text-gray-700 hover:bg-white/80 dark:border-white/10 dark:bg-slate-800/50 dark:text-gray-300 dark:hover:bg-slate-700/80"
          }`}
        >
          <CloudRain className="h-4 w-4" />
          Rain Probability & Volume
        </button>

        <button
          type="button"
          onClick={() => setActiveMetric("wind")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
            activeMetric === "wind"
              ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md shadow-teal-500/20"
              : "border border-white/40 bg-white/50 text-gray-700 hover:bg-white/80 dark:border-white/10 dark:bg-slate-800/50 dark:text-gray-300 dark:hover:bg-slate-700/80"
          }`}
        >
          <Wind className="h-4 w-4" />
          Wind Speed (km/h)
        </button>
      </div>

      {/* Chart Canvas */}
      <div className="mt-4 h-64 w-full min-w-0 overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          {activeMetric === "temp" ? (
            <AreaChart
              data={activeData}
              onClick={(e) => {
                if (e && e.activePayload && e.activePayload[0]) {
                  setSelectedPoint(e.activePayload[0].payload);
                }
              }}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156, 163, 175, 0.2)" />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: "currentColor" }}
                className="text-gray-500 dark:text-gray-400"
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                unit={tempSymbol}
                tick={{ fontSize: 11, fill: "currentColor" }}
                className="text-gray-500 dark:text-gray-400"
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={<CustomChartTooltip tempSymbol={tempSymbol} metric="temp" />}
              />
              <Area
                type="monotone"
                dataKey="displayTemp"
                name={`Temperature (${tempSymbol})`}
                stroke="#f97316"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#tempGradient)"
                activeDot={{
                  r: 6,
                  fill: "#ea580c",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          ) : activeMetric === "rain" ? (
            <BarChart
              data={activeData}
              onClick={(e) => {
                if (e && e.activePayload && e.activePayload[0]) {
                  setSelectedPoint(e.activePayload[0].payload);
                }
              }}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.7} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156, 163, 175, 0.2)" />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: "currentColor" }}
                className="text-gray-500 dark:text-gray-400"
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                unit="%"
                domain={[0, 100]}
                tick={{ fontSize: 11, fill: "currentColor" }}
                className="text-gray-500 dark:text-gray-400"
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={<CustomChartTooltip tempSymbol={tempSymbol} metric="rain" />}
              />
              <Bar
                dataKey="pop"
                name="Rain Probability (%)"
                fill="url(#rainGradient)"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          ) : (
            <AreaChart
              data={activeData}
              onClick={(e) => {
                if (e && e.activePayload && e.activePayload[0]) {
                  setSelectedPoint(e.activePayload[0].payload);
                }
              }}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="windGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156, 163, 175, 0.2)" />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: "currentColor" }}
                className="text-gray-500 dark:text-gray-400"
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                unit=" km/h"
                tick={{ fontSize: 11, fill: "currentColor" }}
                className="text-gray-500 dark:text-gray-400"
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={<CustomChartTooltip tempSymbol={tempSymbol} metric="wind" />}
              />
              <Area
                type="monotone"
                dataKey="windSpeed"
                name="Wind Speed (km/h)"
                stroke="#0d9488"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#windGradient)"
                activeDot={{
                  r: 6,
                  fill: "#0f766e",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Selected Time Forecast Inspector Card */}
      {currentDetail && (
        <div className="mt-5 rounded-2xl border border-white/60 bg-white/60 p-4 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-800/60 transition-all duration-300">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-white/60 bg-white/80 p-2 shadow-xs dark:border-white/10 dark:bg-slate-700/80">
                <WeatherIcon
                  code={currentDetail.weatherIcon}
                  size="md"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {currentDetail.label}
                  </span>
                  <span className="rounded-full bg-blue-100/80 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 capitalize">
                    {currentDetail.weatherDescription}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {currentDetail.dateStr || currentDetail.monthDay || "Selected forecast point"}
                </p>
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center sm:gap-6">
              <div>
                <span className="block text-[10px] font-medium uppercase tracking-wider text-gray-400">
                  Temperature
                </span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {currentDetail.displayTemp}
                  {tempSymbol}
                </span>
              </div>

              <div>
                <span className="block text-[10px] font-medium uppercase tracking-wider text-gray-400">
                  Rain Chance
                </span>
                <span className="flex items-center gap-1 text-sm font-bold text-blue-600 dark:text-blue-400">
                  <Droplets className="h-3.5 w-3.5" />
                  {currentDetail.pop}%
                </span>
              </div>

              <div>
                <span className="block text-[10px] font-medium uppercase tracking-wider text-gray-400">
                  Wind Speed
                </span>
                <span className="flex items-center gap-1 text-sm font-bold text-teal-600 dark:text-teal-400">
                  <Compass className="h-3.5 w-3.5" />
                  {currentDetail.windSpeed} km/h
                </span>
              </div>

              <div>
                <span className="block text-[10px] font-medium uppercase tracking-wider text-gray-400">
                  Humidity
                </span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {currentDetail.humidity}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// Custom Glassmorphic Tooltip for Recharts
function CustomChartTooltip({ active, payload, label, tempSymbol, metric }) {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0].payload;

  return (
    <div className="rounded-2xl border border-white/60 bg-white/90 p-3.5 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/90">
      <p className="text-xs font-semibold text-gray-900 dark:text-white mb-1.5 flex items-center justify-between gap-4">
        <span>{label}</span>
        <span className="text-[10px] text-gray-500 capitalize">{data.weatherDescription}</span>
      </p>

      {metric === "temp" && (
        <div className="text-xs text-orange-600 dark:text-orange-400 font-bold">
          Temperature: {data.displayTemp}
          {tempSymbol}
          {data.displayFeelsLike && (
            <span className="block text-[11px] font-normal text-gray-500 dark:text-gray-400">
              Feels like: {data.displayFeelsLike}
              {tempSymbol}
            </span>
          )}
        </div>
      )}

      {metric === "rain" && (
        <div className="text-xs text-blue-600 dark:text-blue-400 font-bold">
          Precipitation Chance: {data.pop}%
          {data.rain > 0 && (
            <span className="block text-[11px] font-normal text-gray-500 dark:text-gray-400">
              Expected rain: {data.rain} mm
            </span>
          )}
        </div>
      )}

      {metric === "wind" && (
        <div className="text-xs text-teal-600 dark:text-teal-400 font-bold">
          Wind Velocity: {data.windSpeed} km/h
        </div>
      )}

      <div className="mt-1.5 border-t border-gray-100/60 dark:border-slate-700/60 pt-1 text-[10px] text-gray-400">
        Humidity: {data.humidity}%
      </div>
    </div>
  );
}
