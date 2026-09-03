"use client";

import { useState, type FormEvent } from "react";
import { Search, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface WeatherSearchProps {
  onSearch: (city: string) => void;
  loading: boolean;
}

export function WeatherSearch({ onSearch, loading }: WeatherSearchProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim() && !loading) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl" role="search" aria-label="Search for a city">
      <div className="relative">
        <input
          id="city-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search for a city... e.g. "Varanasi"'
          disabled={loading}
          className={cn(
            "w-full rounded-2xl border border-gray-200 bg-white/90 py-4 pr-14 pl-5 text-base text-gray-900 shadow-lg shadow-blue-500/5 backdrop-blur-sm transition-all duration-300",
            "placeholder:text-gray-400",
            "focus:border-blue-400 focus:shadow-blue-500/10 focus:ring-2 focus:ring-blue-400/20 focus:outline-none",
            "dark:border-slate-600 dark:bg-slate-800/90 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-500/20",
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
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Search className="h-5 w-5" />
          )}
        </button>
      </div>
    </form>
  );
}
