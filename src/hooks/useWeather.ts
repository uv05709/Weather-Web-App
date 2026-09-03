"use client";

import { useState, useCallback } from "react";
import {
  getCurrentWeather,
  getForecast,
  getWeatherByCoordinates,
  getForecastByCoordinates,
} from "@/lib/weather-api";
import { CurrentWeather, ForecastDay, FavoriteCity, TemperatureUnit, WeatherError } from "@/types/weather";
import { useLocalStorage } from "./useLocalStorage";

const MAX_RECENT_SEARCHES = 5;

export function useWeather() {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<WeatherError | null>(null);
  const [unit, setUnit] = useLocalStorage<TemperatureUnit>("weather-unit", "celsius");
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>("recent-searches", []);
  const [favorites, setFavorites] = useLocalStorage<FavoriteCity[]>("favorite-cities", []);

  const addRecentSearch = useCallback(
    (city: string) => {
      setRecentSearches((prev) => {
        const filtered = prev.filter((c) => c.toLowerCase() !== city.toLowerCase());
        return [city, ...filtered].slice(0, MAX_RECENT_SEARCHES);
      });
    },
    [setRecentSearches]
  );

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
  }, [setRecentSearches]);

  const searchCity = useCallback(
    async (city: string) => {
      const trimmed = city.trim();
      if (!trimmed) {
        setError({ type: "not-found", message: "Please enter a city name." });
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const [weather, forecastData] = await Promise.all([
          getCurrentWeather(trimmed),
          getForecast(trimmed),
        ]);
        setCurrentWeather(weather);
        setForecast(forecastData);
        addRecentSearch(weather.city);
      } catch (err) {
        const apiError = err as { type?: string; message?: string };
        setError({
          type: (apiError.type as WeatherError["type"]) ?? "unknown",
          message: apiError.message ?? "An unexpected error occurred.",
        });
        setCurrentWeather(null);
        setForecast([]);
      } finally {
        setLoading(false);
      }
    },
    [addRecentSearch]
  );

  const searchByCoordinates = useCallback(
    async (lat: number, lon: number) => {
      setLoading(true);
      setError(null);

      try {
        const [weather, forecastData] = await Promise.all([
          getWeatherByCoordinates(lat, lon),
          getForecastByCoordinates(lat, lon),
        ]);
        setCurrentWeather(weather);
        setForecast(forecastData);
        addRecentSearch(weather.city);
      } catch (err) {
        const apiError = err as { type?: string; message?: string };
        setError({
          type: (apiError.type as WeatherError["type"]) ?? "unknown",
          message: apiError.message ?? "An unexpected error occurred.",
        });
        setCurrentWeather(null);
        setForecast([]);
      } finally {
        setLoading(false);
      }
    },
    [addRecentSearch]
  );

  const toggleFavorite = useCallback(
    (city: string, country: string) => {
      setFavorites((prev) => {
        const exists = prev.some((f) => f.name.toLowerCase() === city.toLowerCase());
        if (exists) {
          return prev.filter((f) => f.name.toLowerCase() !== city.toLowerCase());
        }
        return [...prev, { name: city, country }];
      });
    },
    [setFavorites]
  );

  const removeFavorite = useCallback(
    (city: string) => {
      setFavorites((prev) => prev.filter((f) => f.name.toLowerCase() !== city.toLowerCase()));
    },
    [setFavorites]
  );

  const isFavorite = useCallback(
    (city: string) => {
      return favorites.some((f) => f.name.toLowerCase() === city.toLowerCase());
    },
    [favorites]
  );

  const convertTemp = useCallback(
    (tempCelsius: number): number => {
      if (unit === "fahrenheit") {
        return Math.round((tempCelsius * 9) / 5 + 32);
      }
      return Math.round(tempCelsius);
    },
    [unit]
  );

  const tempSymbol = unit === "celsius" ? "°C" : "°F";

  return {
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
  };
}
