"use client";

import { Clock, Trash2, Search } from "lucide-react";

export function RecentSearches({ searches, onSearch, onClear }) {
  if (searches.length === 0) return null;

  return (
    <section aria-label="Recent Searches" className="w-full max-w-4xl">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Recent Searches</h3>
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
            className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/80 px-3 py-1.5 text-sm text-gray-600 backdrop-blur-sm transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-600 dark:bg-slate-800/80 dark:text-gray-300 dark:hover:border-blue-500 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
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
