"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function WeatherSearch({ onSearch, loading }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !loading) {
      onSearch(query.trim());
    }
  };

  return (
    <form id="weather-search" onSubmit={handleSubmit} className="w-full max-w-xl" role="search" aria-label="Search for a city">
      <div className="relative">
        <label htmlFor="city-search" className="sr-only">
          Search for a city
        </label>
        <input
          id="city-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search for a city... e.g. "Tokyo", "London"'
          disabled={loading}
          className={cn(
            "w-full rounded-2xl border border-white/60 bg-white/75 py-4 pr-14 pl-5 text-base text-gray-900 shadow-xl shadow-blue-500/5 backdrop-blur-2xl transition-all duration-300",
            "placeholder:text-gray-400",
            "focus:border-blue-400 focus:shadow-blue-500/15 focus:ring-2 focus:ring-blue-400/20 focus:outline-none",
            "dark:border-white/10 dark:bg-slate-900/75 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-500/20",
            "disabled:opacity-60"
          )}
          aria-label="City name"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className={cn(
            "absolute top-1/2 right-2 -translate-y-1/2 rounded-xl bg-blue-500 p-2.5 text-white transition-all duration-200",
            "hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "dark:focus:ring-offset-slate-800"
          )}
          aria-label="Search"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
        </button>
      </div>
    </form>
  );
}
