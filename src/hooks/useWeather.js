"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  getCurrentWeather,
  getForecast,
  getWeatherByCoordinates,
  getForecastByCoordinates,
  getAirQuality,
  detectSevereWeatherAlerts,
} from "@/lib/weather-api";
import { useLocalStorage } from "./useLocalStorage";

const MAX_RECENT_SEARCHES = 5;
const CACHE_KEY = "weathernow_cached_weather";

export function useWeather() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [airQuality, setAirQuality] = useState(null);
  const [weatherAlerts, setWeatherAlerts] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isOffline, setIsOffline] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [unit, setUnit] = useLocalStorage("weather-unit", "celsius");
  const [recentSearches, setRecentSearches] = useLocalStorage("recent-searches", []);
  const [favorites, setFavorites] = useLocalStorage("favorite-cities", []);
  const [subscribedAlerts, setSubscribedAlerts] = useLocalStorage("subscribed-alert-cities", []);

  const lastSearchedCityRef = useRef(null);

  // Load cached weather on initial mount if available
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        setIsOffline(!navigator.onLine);
        const cachedStr = localStorage.getItem(CACHE_KEY);
        if (cachedStr) {
          const cached = JSON.parse(cachedStr);
          if (cached && cached.currentWeather) {
            setCurrentWeather(cached.currentWeather);
            setForecast(cached.forecast || []);
            setHourlyForecast(cached.hourlyForecast || []);
            setAirQuality(cached.airQuality || null);
            setWeatherAlerts(cached.weatherAlerts || []);
            setLastUpdated(cached.timestamp ? new Date(cached.timestamp) : null);
            lastSearchedCityRef.current = cached.currentWeather.city;
          }
        }
      }
    } catch {
      // ignore storage error
    }
  }, []);

  // Monitor online / offline network status
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleOnline = () => {
      setIsOffline(false);
      // Auto-refresh weather when internet comes back
      if (lastSearchedCityRef.current) {
        searchCity(lastSearchedCityRef.current);
      }
    };

    const handleOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const saveToCache = useCallback(
    (weather, forecastData, hourlyData, aqiData, alertsData) => {
      try {
        const payload = {
          currentWeather: weather,
          forecast: forecastData,
          hourlyForecast: hourlyData,
          airQuality: aqiData,
          weatherAlerts: alertsData,
          timestamp: Date.now(),
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
        setLastUpdated(new Date());
      } catch {
        // LocalStorage quota or access issue
      }
    },
    []
  );

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
        const [weather, forecastResult] = await Promise.all([
          getCurrentWeather(trimmed),
          getForecast(trimmed),
        ]);

        const hourly = forecastResult.hourly || [];
        const daily = forecastResult.daily || forecastResult;

        // Fetch Air Quality using the coordinates from weather
        let aqi = null;
        if (weather?.coord?.lat && weather?.coord?.lon) {
          try {
            aqi = await getAirQuality(weather.coord.lat, weather.coord.lon);
          } catch {
            aqi = null;
          }
        }

        const alerts = detectSevereWeatherAlerts(weather, hourly, aqi);

        setCurrentWeather(weather);
        setForecast(daily);
        setHourlyForecast(hourly);
        setAirQuality(aqi);
        setWeatherAlerts(alerts);
        lastSearchedCityRef.current = weather.city;

        addRecentSearch(weather.city);
        saveToCache(weather, daily, hourly, aqi, alerts);
      } catch (err) {
        setError({
          type: err.type ?? "unknown",
          message: err.message ?? "An unexpected error occurred.",
        });
      } finally {
        setLoading(false);
      }
    },
    [addRecentSearch, saveToCache]
  );

  const searchByCoordinates = useCallback(
    async (lat, lon) => {
      setLoading(true);
      setError(null);

      try {
        const [weather, forecastResult] = await Promise.all([
          getWeatherByCoordinates(lat, lon),
          getForecastByCoordinates(lat, lon),
        ]);

        const hourly = forecastResult.hourly || [];
        const daily = forecastResult.daily || forecastResult;

        let aqi = null;
        try {
          aqi = await getAirQuality(lat, lon);
        } catch {
          aqi = null;
        }

        const alerts = detectSevereWeatherAlerts(weather, hourly, aqi);

        setCurrentWeather(weather);
        setForecast(daily);
        setHourlyForecast(hourly);
        setAirQuality(aqi);
        setWeatherAlerts(alerts);
        lastSearchedCityRef.current = weather.city;

        addRecentSearch(weather.city);
        saveToCache(weather, daily, hourly, aqi, alerts);
      } catch (err) {
        setError({
          type: err.type ?? "unknown",
          message: err.message ?? "An unexpected error occurred.",
        });
      } finally {
        setLoading(false);
      }
    },
    [addRecentSearch, saveToCache]
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

  const toggleSubscribeAlert = useCallback(
    (city) => {
      setSubscribedAlerts((prev) => {
        const exists = prev.some((c) => c.toLowerCase() === city.toLowerCase());
        if (exists) {
          return prev.filter((c) => c.toLowerCase() !== city.toLowerCase());
        }
        return [...prev, city];
      });
    },
    [setSubscribedAlerts]
  );

  const isSubscribedToAlerts = useCallback(
    (city) => {
      if (!city) return false;
      return subscribedAlerts.some((c) => c.toLowerCase() === city.toLowerCase());
    },
    [subscribedAlerts]
  );

  const convertTemp = useCallback(
    (tempCelsius) => {
      if (tempCelsius === null || tempCelsius === undefined) return 0;
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
    subscribedAlerts,
    toggleSubscribeAlert,
    isSubscribedToAlerts,
  };
}
