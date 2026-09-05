"use client";

import { useCallback } from "react";
import { CloudSun, Search } from "lucide-react";
import { useWeather } from "@/hooks/useWeather";
import { Spotlight } from "@/components/ui/spotlight";
import { WeatherSearch } from "@/components/weather/WeatherSearch";
import { LocationButton } from "@/components/weather/LocationButton";
import { TemperatureToggle } from "@/components/weather/TemperatureToggle";
import { CurrentWeatherCard } from "@/components/weather/CurrentWeather";
import { WeatherStats } from "@/components/weather/WeatherStats";
import { Forecast } from "@/components/weather/Forecast";
import { FavoriteCities } from "@/components/weather/FavoriteCities";
import { RecentSearches } from "@/components/weather/RecentSearches";
import { WeatherBackground } from "@/components/weather/WeatherBackground";
import { LoadingWeather } from "@/components/weather/LoadingWeather";
import { WeatherError } from "@/components/weather/WeatherError";

export default function HomePage() {
  const {
    currentWeather,
    forecast,
    loading,
    error,
    unit,
    setUnit,
    tempSymbol,
    convertTemp,
    searchCity,
    searchByCoordinates,
    recentSearches,
    clearRecentSearches,
    favorites,
    toggleFavorite,
    removeFavorite,
    isFavorite,
  } = useWeather();

  const handleRetry = useCallback(() => {
    if (currentWeather) {
      searchCity(currentWeather.city);
    }
  }, [currentWeather, searchCity]);

  return (
    <>
      <WeatherBackground weatherMain={currentWeather?.weatherMain} />

      <div className="relative flex flex-col items-center">
        <section className="relative flex w-full flex-col items-center px-4 pt-12 pb-8 sm:pt-16 sm:pb-12">
          <Spotlight className="hidden md:block" fill="rgba(59, 130, 246, 0.15)" />

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/50 bg-blue-50/80 px-4 py-1.5 text-sm text-blue-600 backdrop-blur-sm dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
              <CloudSun className="h-4 w-4" />
              Real-Time Weather Data
            </div>
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              Weather, at a{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">glance.</span>
            </h1>
            <p className="mt-4 max-w-lg text-base text-gray-600 dark:text-gray-300 sm:text-lg">
              Get real-time weather information and forecasts for any location.
            </p>
          </div>

          <div className="mt-8 flex w-full flex-col items-center gap-4">
            <WeatherSearch onSearch={searchCity} loading={loading} />
            <div className="flex flex-wrap items-center justify-center gap-3">
              <LocationButton onLocation={searchByCoordinates} />
              <TemperatureToggle unit={unit} onToggle={setUnit} />
            </div>
          </div>
        </section>

        <section className="flex w-full flex-col items-center gap-8 px-4 pb-12">
          {loading && <LoadingWeather />}
          {error && !loading && <WeatherError error={error} onRetry={handleRetry} />}

          {currentWeather && !loading && !error && (
            <>
              <CurrentWeatherCard
                weather={currentWeather}
                convertTemp={convertTemp}
                tempSymbol={tempSymbol}
                isFavorite={isFavorite(currentWeather.city)}
                onToggleFavorite={() => toggleFavorite(currentWeather.city, currentWeather.country)}
              />
              <WeatherStats weather={currentWeather} convertTemp={convertTemp} tempSymbol={tempSymbol} />
              <Forecast forecast={forecast} convertTemp={convertTemp} tempSymbol={tempSymbol} />
            </>
          )}

          {!currentWeather && !loading && !error && (
            <div className="flex flex-col items-center py-12 text-center">
              <div className="rounded-full bg-gray-100 p-4 dark:bg-slate-800">
                <Search className="h-8 w-8 text-gray-400 dark:text-gray-500" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Search for a city</h2>
              <p className="mt-1 max-w-sm text-sm text-gray-500 dark:text-gray-400">
                Enter a city name to see current weather and forecasts, or use your current location.
              </p>
            </div>
          )}

          <div className="flex w-full flex-col items-center gap-8">
            <FavoriteCities favorites={favorites} onSearch={searchCity} onRemove={removeFavorite} />
            <RecentSearches searches={recentSearches} onSearch={searchCity} onClear={clearRecentSearches} />
          </div>
        </section>
      </div>
    </>
  );
}
