import { CloudSun, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-200/50 bg-white/50 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <div className="flex items-center gap-2">
              <CloudSun className="h-5 w-5 text-blue-500" />
              <span className="font-semibold text-gray-900 dark:text-white">WeatherNow</span>
            </div>
            <p className="text-center text-xs text-gray-500 dark:text-gray-400 sm:text-left">
              Real-time atmospheric insights, meteorological forecasts & global radar data.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <a
              href="#current-weather"
              className="transition-colors hover:text-blue-500 dark:hover:text-blue-400"
            >
              Current Conditions
            </a>
            <a
              href="#forecast-section"
              className="transition-colors hover:text-blue-500 dark:hover:text-blue-400"
            >
              5-Day Forecast
            </a>
            <a
              href="#favorites-section"
              className="transition-colors hover:text-blue-500 dark:hover:text-blue-400"
            >
              Saved Locations
            </a>
            <a
              href="https://openweathermap.org/api"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition-colors hover:text-blue-500 dark:hover:text-blue-400"
            >
              Data via OpenWeatherMap
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-200/50 pt-4 text-center dark:border-slate-700/50">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} WeatherNow. Global meteorological conditions updated in real time.
          </p>
        </div>
      </div>
    </footer>
  );
}
