"use client";

import { useCallback, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
import { WeatherCharts } from "@/components/weather/WeatherCharts";
import { AirQualityDashboard } from "@/components/weather/AirQualityDashboard";
import { WeatherAlerts } from "@/components/weather/WeatherAlerts";
import { AiWeatherAssistant } from "@/components/weather/AiWeatherAssistant";
import { OfflineBanner } from "@/components/weather/OfflineBanner";

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        </div>
      }
    >
      <WeatherDashboard />
    </Suspense>
  );
}

function WeatherDashboard() {
  const searchParams = useSearchParams();
  const urlCity = searchParams.get("city") || searchParams.get("q");

  const {
    currentWeather,
    forecast,
    hourlyForecast,
    airQuality,
    weatherAlerts,
    lastUpdated,
    isOffline,
    loading,
    error,
    setError,
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
    toggleSubscribeAlert,
    isSubscribedToAlerts,
  } = useWeather();

  // 1. URL Query Routing: Auto-fetch weather when url contains ?city=... or ?q=...
  useEffect(() => {
    if (urlCity && (!currentWeather || currentWeather.city.toLowerCase() !== urlCity.toLowerCase())) {
      searchCity(urlCity);
    }
  }, [urlCity]);

  // 2. Synchronize URL query parameter when city is searched
  useEffect(() => {
    if (typeof window !== "undefined" && currentWeather?.city) {
      const currentUrl = new URL(window.location.href);
      if (currentUrl.searchParams.get("city") !== currentWeather.city) {
        currentUrl.searchParams.set("city", currentWeather.city);
        window.history.replaceState(null, "", currentUrl.toString());
      }
    }
  }, [currentWeather?.city]);

  const handleRetry = useCallback(() => {
    if (currentWeather) {
      searchCity(currentWeather.city);
    }
  }, [currentWeather, searchCity]);

  const handleLocationError = useCallback(
    (message) => {
      setError({ type: "unknown", message });
    },
    [setError]
  );

  return (
    <>
      <WeatherBackground weatherMain={currentWeather?.weatherMain} />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-3 sm:px-6 lg:px-8 overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative flex w-full flex-col items-center pt-8 pb-6 sm:pt-14 sm:pb-10">
          <Spotlight className="hidden md:block" fill="rgba(59, 130, 246, 0.15)" />

          <div className="flex flex-col items-center text-center">
            <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/80 px-3.5 py-1 text-xs sm:text-sm font-semibold text-blue-600 backdrop-blur-sm dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
              <CloudSun className="h-4 w-4" aria-hidden="true" />
              Live Meteorological Intelligence & Atmospheric Forecast
            </div>
            <h1 className="max-w-2xl text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              Real-Time Weather,{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                actionable at a glance.
              </span>
            </h1>
            <p className="mt-3.5 max-w-lg text-sm text-gray-600 dark:text-gray-300 sm:text-base">
              Precision temperature, interactive 24h & 5-day charts, air quality analytics, and AI weather assistant.
            </p>
          </div>

          <div className="mt-7 flex w-full flex-col items-center gap-3.5">
            <WeatherSearch onSearch={searchCity} loading={loading} />
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <LocationButton onLocation={searchByCoordinates} onError={handleLocationError} />
              <TemperatureToggle unit={unit} onToggle={setUnit} />
            </div>
          </div>
        </section>

        {/* Content Flow */}
        <section className="flex w-full flex-col items-center space-y-6 sm:space-y-8 pb-16">
          {/* Offline Mode & PWA Install Banner */}
          <OfflineBanner
            isOffline={isOffline}
            lastUpdated={lastUpdated}
            onRefresh={handleRetry}
          />

          {/* Accessible Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="w-full max-w-4xl px-1">
            <ol className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
              <li>
                <Link href="/" className="transition-colors hover:text-blue-500 dark:hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li>
                <span className="text-gray-400 dark:text-gray-600" aria-hidden="true">
                  /
                </span>
              </li>
              <li>
                <a href="#weather-search" className="transition-colors hover:text-blue-500 dark:hover:text-blue-400">
                  Live Forecast
                </a>
              </li>
              {currentWeather && (
                <>
                  <li>
                    <span className="text-gray-400 dark:text-gray-600" aria-hidden="true">
                      /
                    </span>
                  </li>
                  <li className="font-semibold text-gray-800 dark:text-gray-200 truncate max-w-[180px] sm:max-w-none" aria-current="page">
                    {currentWeather.city}, {currentWeather.country}
                  </li>
                </>
              )}
            </ol>
          </nav>

          {loading && <LoadingWeather />}
          {error && !loading && <WeatherError error={error} onRetry={handleRetry} />}

          {/* Live Data Sections */}
          {currentWeather && !loading && !error && (
            <>
              {/* Severe Weather Alerts & Warnings */}
              <WeatherAlerts
                alerts={weatherAlerts}
                cityName={currentWeather.city}
                isSubscribed={isSubscribedToAlerts(currentWeather.city)}
                onToggleSubscribe={toggleSubscribeAlert}
              />

              {/* Current Overview Card */}
              <CurrentWeatherCard
                weather={currentWeather}
                convertTemp={convertTemp}
                tempSymbol={tempSymbol}
                isFavorite={isFavorite(currentWeather.city)}
                onToggleFavorite={() => toggleFavorite(currentWeather.city, currentWeather.country)}
              />

              {/* Weather Stats */}
              <WeatherStats
                weather={currentWeather}
                convertTemp={convertTemp}
                tempSymbol={tempSymbol}
              />

              {/* Interactive Weather Charts (24h & 5d, Temp/Rain/Wind) */}
              <WeatherCharts
                hourlyForecast={hourlyForecast}
                dailyForecast={forecast}
                convertTemp={convertTemp}
                tempSymbol={tempSymbol}
              />

              {/* Air Quality Dashboard (AQI meter, health advice, pollutants) */}
              <AirQualityDashboard airQuality={airQuality} />

              {/* 5-Day Daily Outlook */}
              <Forecast
                forecast={forecast}
                convertTemp={convertTemp}
                tempSymbol={tempSymbol}
              />
            </>
          )}

          {/* Empty Search Prompt */}
          {!currentWeather && !loading && !error && (
            <div className="flex flex-col items-center py-10 text-center">
              <div className="rounded-2xl bg-gray-100 p-4 dark:bg-slate-800">
                <Search className="h-7 w-7 text-gray-400 dark:text-gray-500" />
              </div>
              <h2 className="mt-3.5 text-base sm:text-lg font-bold text-gray-900 dark:text-white">Search for any city</h2>
              <p className="mt-1 max-w-sm text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Enter a city name to see interactive charts, air quality metrics, AI insights, or use your current location.
              </p>
            </div>
          )}

          {/* Favorite & Recent Cities */}
          <div className="flex w-full max-w-4xl flex-col items-center space-y-6 sm:space-y-8">
            <FavoriteCities favorites={favorites} onSearch={searchCity} onRemove={removeFavorite} />
            <RecentSearches searches={recentSearches} onSearch={searchCity} onClear={clearRecentSearches} />
          </div>
        </section>
      </div>

      {/* Floating AI Weather Assistant Widget (Fixed bottom-right) */}
      <AiWeatherAssistant
        currentWeather={currentWeather}
        hourlyForecast={hourlyForecast}
        dailyForecast={forecast}
        airQuality={airQuality}
        convertTemp={convertTemp}
        tempSymbol={tempSymbol}
      />
    </>
  );
}
