"use client";

import { useState, useCallback } from "react";
import {
  getCurrentWeather,
  getForecast,
  getWeatherByCoordinates,
  getForecastByCoordinates,
} from "@/lib/weather-api";
import { useLocalStorage } from "./useLocalStorage";

const MAX_RECENT_SEARCHES = 5;

export function useWeather() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useLocalStorage("weather-unit", "celsius");
  const [recentSearches, setRecentSearches] = useLocalStorage("recent-searches", []);
  const [favorites, setFavorites] = useLocalStorage("favorite-cities", []);

  const addRecentSearch = useCallback(
    (city) => {
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
    async (city) => {
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
        setError({
          type: err.type ?? "unknown",
          message: err.message ?? "An unexpected error occurred.",
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
    async (lat, lon) => {
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
        setError({
          type: err.type ?? "unknown",
          message: err.message ?? "An unexpected error occurred.",
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
    (city, country) => {
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
    (city) => {
      setFavorites((prev) => prev.filter((f) => f.name.toLowerCase() !== city.toLowerCase()));
    },
    [setFavorites]
  );

  const isFavorite = useCallback(
    (city) => {
      return favorites.some((f) => f.name.toLowerCase() === city.toLowerCase());
    },
    [favorites]
  );

  const convertTemp = useCallback(
    (tempCelsius) => {
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
