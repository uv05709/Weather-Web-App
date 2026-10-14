"use client";

import { Heart, X, MapPin } from "lucide-react";

export function FavoriteCities({ favorites, onSearch, onRemove }) {
  if (favorites.length === 0) {
    return (
      <section id="favorites-section" aria-label="Favorite Cities" className="w-full max-w-4xl">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="h-5 w-5 text-red-500" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Favorite Cities</h2>
        </div>
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50/50 p-8 text-center dark:border-slate-600 dark:bg-slate-800/30">
          <Heart className="mx-auto h-8 w-8 text-gray-300 dark:text-gray-600" aria-hidden="true" />
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            No favorite cities yet. Click the heart icon on any weather card to save locations for quick access.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="favorites-section" aria-label="Favorite Cities" className="w-full max-w-4xl">
      <div className="flex items-center gap-2 mb-4">
        <Heart className="h-5 w-5 text-red-500" aria-hidden="true" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Favorite Cities</h2>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {favorites.map((city) => (
          <div
            key={city.name}
            className="group relative flex items-center justify-between rounded-2xl border border-white/60 bg-white/65 p-3.5 shadow-md shadow-blue-500/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/50 hover:bg-white/85 hover:shadow-lg dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-blue-500/30 dark:hover:bg-slate-800/80"
          >
            <button
              type="button"
              onClick={() => onSearch(city.name)}
              className="flex min-w-0 flex-1 items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg"
              aria-label={`Search weather for ${city.name}`}
            >
              <MapPin className="h-4 w-4 shrink-0 text-blue-500" aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{city.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{city.country}</p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => onRemove(city.name)}
              className="ml-2 rounded-full p-1.5 text-gray-400 transition-all duration-200 hover:bg-red-50 hover:text-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 dark:hover:bg-red-500/10 dark:hover:text-red-400"
              aria-label={`Remove ${city.name} from favorites`}
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
