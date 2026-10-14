"use client";

import { Clock, Trash2, Search } from "lucide-react";

export function RecentSearches({ searches, onSearch, onClear }) {
  if (searches.length === 0) return null;

  return (
    <section aria-label="Recent Searches" className="w-full max-w-4xl">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-400" aria-hidden="true" />
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Recent Searches</h2>
        </div>
        <button
          onClick={onClear}
          className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 dark:hover:text-red-400"
          aria-label="Clear search history"
        >
          <Trash2 className="h-3 w-3" />
          Clear
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {searches.map((city) => (
          <button
            key={city}
            onClick={() => onSearch(city)}
            className="flex items-center gap-1.5 rounded-full border border-white/60 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-gray-700 shadow-sm shadow-blue-500/5 backdrop-blur-xl transition-all duration-300 hover:border-blue-400/50 hover:bg-white/90 hover:text-blue-600 hover:shadow-md dark:border-white/10 dark:bg-slate-900/60 dark:text-gray-300 dark:hover:border-blue-500/30 dark:hover:bg-slate-800/80 dark:hover:text-blue-400"
            aria-label={`Search ${city} again`}
          >
            <Search className="h-3 w-3" />
            {city}
          </button>
        ))}
      </div>
    </section>
  );
}
