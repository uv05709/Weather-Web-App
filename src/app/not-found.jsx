import Link from "next/link";
import { CloudOff, Home, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "404 - Page Not Found | WeatherNow",
  description: "The weather forecast or page you requested could not be found. Return to WeatherNow to check live conditions for cities worldwide.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-[75vh] flex-col items-center justify-center px-4 py-16 text-center">
      {/* Subtle ambient gradient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-96 w-96 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/15" />
      </div>

      <div className="relative z-10 mx-auto max-w-lg rounded-3xl border border-gray-200/60 bg-white/70 p-8 shadow-xl shadow-blue-500/5 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/70 sm:p-12">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-200/50 bg-blue-50 text-blue-500 shadow-inner dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
          <CloudOff className="h-10 w-10" aria-hidden="true" />
        </div>

        <span className="inline-block rounded-full border border-blue-200/60 bg-blue-50/80 px-3 py-1 text-xs font-semibold tracking-wider text-blue-600 uppercase dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-400">
          Error 404
        </span>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Page Not Found
        </h1>

        <p className="mt-3 text-base text-gray-600 dark:text-gray-300">
          The forecast or page you are looking for does not exist, has been removed, or is temporarily unavailable.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:bg-blue-500 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-slate-900 sm:w-auto"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Return to Live Weather
          </Link>
          <Link
            href="/#favorites-section"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-5 py-3 text-sm font-medium text-gray-700 backdrop-blur-sm transition-all duration-200 hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:outline-none dark:border-slate-700 dark:bg-slate-800/80 dark:text-gray-200 dark:hover:bg-slate-800 sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            View Saved Cities
          </Link>
        </div>

        <nav aria-label="Quick links" className="mt-8 border-t border-gray-100 pt-6 text-xs text-gray-500 dark:border-slate-800 dark:text-gray-400">
          <span>Explore: </span>
          <Link href="/#weather-search" className="font-medium text-blue-500 hover:underline">
            City Search
          </Link>
          <span className="mx-2">•</span>
          <Link href="/#favorites-section" className="font-medium text-blue-500 hover:underline">
            Saved Favorites
          </Link>
        </nav>
      </div>
    </div>
  );
}
