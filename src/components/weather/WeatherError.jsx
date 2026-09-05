"use client";

import { AlertCircle, WifiOff, KeyRound, Clock, HelpCircle, RefreshCw } from "lucide-react";

const errorConfig = {
  "not-found": { icon: AlertCircle, title: "City Not Found", color: "text-amber-500" },
  network: { icon: WifiOff, title: "Connection Error", color: "text-red-500" },
  "api-key": { icon: KeyRound, title: "API Key Required", color: "text-purple-500" },
  "rate-limit": { icon: Clock, title: "Too Many Requests", color: "text-orange-500" },
  unknown: { icon: HelpCircle, title: "Something Went Wrong", color: "text-gray-500" },
};

export function WeatherError({ error, onRetry }) {
  const config = errorConfig[error.type] ?? errorConfig.unknown;
  const Icon = config.icon;

  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-200/50 bg-white/60 p-8 text-center backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/60" role="alert">
      <Icon className={`mx-auto h-12 w-12 ${config.color}`} />
      <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">{config.title}</h3>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{error.message}</p>

      {error.type === "api-key" && (
        <div className="mt-4 rounded-lg bg-gray-100 p-3 text-left text-xs dark:bg-slate-700">
          <p className="font-medium text-gray-700 dark:text-gray-200">Setup Instructions:</p>
          <ol className="mt-1 list-inside list-decimal space-y-1 text-gray-600 dark:text-gray-300">
            <li>Get a free API key from openweathermap.org</li>
            <li>Create a <code className="rounded bg-gray-200 px-1 dark:bg-slate-600">.env.local</code> file</li>
            <li>Add <code className="rounded bg-gray-200 px-1 dark:bg-slate-600">NEXT_PUBLIC_OPENWEATHER_API_KEY=your_key</code></li>
            <li>Restart the dev server</li>
          </ol>
        </div>
      )}

      {onRetry && error.type !== "api-key" && (
        <button onClick={onRetry} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-slate-800">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      )}
    </div>
  );
}
