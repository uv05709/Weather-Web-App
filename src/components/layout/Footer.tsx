import { CloudSun, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-200/50 bg-white/50 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          {/* Logo & Info */}
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <div className="flex items-center gap-2">
              <CloudSun className="h-5 w-5 text-blue-500" />
              <span className="font-semibold text-gray-900 dark:text-white">WeatherNow</span>
            </div>
            <p className="text-center text-xs text-gray-500 dark:text-gray-400 sm:text-left">
              B.Tech CSE Mini Project • Real-Time Weather Forecast
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://openweathermap.org/api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 transition-colors hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
            >
              Weather data by OpenWeatherMap
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              aria-label="View source on GitHub"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200/50 pt-4 text-center dark:border-slate-700/50">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} WeatherNow. Built with Next.js, React & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
