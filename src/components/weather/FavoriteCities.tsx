"use client";

import { Heart, X, MapPin } from "lucide-react";
import { FavoriteCity } from "@/types/weather";

interface FavoriteCitiesProps {
  favorites: FavoriteCity[];
  onSearch: (city: string) => void;
  onRemove: (city: string) => void;
}

export function FavoriteCities({ favorites, onSearch, onRemove }: FavoriteCitiesProps) {
  if (favorites.length === 0) {
    return (
      <section id="favorites-section" aria-label="Favorite Cities" className="w-full max-w-4xl">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="h-5 w-5 text-red-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Favorite Cities</h3>
        </div>
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50/50 p-8 text-center dark:border-slate-600 dark:bg-slate-800/30">
          <Heart className="mx-auto h-8 w-8 text-gray-300 dark:text-gray-600" />
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            No favorite cities yet. Click the heart icon on a weather card to save cities.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="favorites-section" aria-label="Favorite Cities" className="w-full max-w-4xl">
      <div className="flex items-center gap-2 mb-4">
        <Heart className="h-5 w-5 text-red-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Favorite Cities</h3>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {favorites.map((city) => (
          <div
            key={city.name}
            className="group relative flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200/50 bg-white/60 p-3 backdrop-blur-sm transition-all duration-200 hover:border-blue-300/50 hover:bg-white/80 hover:shadow-md dark:border-slate-700/50 dark:bg-slate-800/60 dark:hover:border-blue-500/30 dark:hover:bg-slate-800/80"
            onClick={() => onSearch(city.name)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onSearch(city.name)}
            aria-label={`Search weather for ${city.name}`}
          >
            <MapPin className="h-4 w-4 shrink-0 text-blue-500" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{city.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{city.country}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(city.name);
              }}
              className="rounded-full p-1 text-gray-400 opacity-0 transition-all duration-200 hover:bg-red-50 hover:text-red-500 group-hover:opacity-100 dark:hover:bg-red-500/10"
              aria-label={`Remove ${city.name} from favorites`}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
