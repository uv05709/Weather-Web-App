"use client";

import { useState } from "react";
import { MapPin, Loader2 } from "lucide-react";

export function LocationButton({ onLocation, onError }) {
  const [locating, setLocating] = useState(false);

  const handleClick = () => {
    if (!navigator.geolocation) {
      if (onError) {
        onError("Geolocation is not supported by your browser. Please search by city name.");
      }
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        onLocation(position.coords.latitude, position.coords.longitude);
        setLocating(false);
      },
      (error) => {
        setLocating(false);
        let message = "Unable to get your current location. Please try searching for your city.";
        if (error.code === error.PERMISSION_DENIED) {
          message = "Location permission denied. Please enable location access in browser settings or search for a city.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          message = "Location information is currently unavailable. Please search for a city.";
        }
        if (onError) {
          onError(message);
        }
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  };

  return (
    <button
      onClick={handleClick}
      disabled={locating}
      className="flex items-center gap-2 rounded-xl border border-white/60 bg-white/70 px-4 py-2.5 text-sm font-medium text-gray-700 shadow-md shadow-blue-500/5 backdrop-blur-xl transition-all duration-200 hover:border-blue-400 hover:bg-white/90 hover:text-blue-600 focus:ring-2 focus:ring-blue-400/20 focus:outline-none disabled:opacity-50 dark:border-white/10 dark:bg-slate-900/70 dark:text-gray-200 dark:hover:border-blue-500 dark:hover:bg-slate-800/90 dark:hover:text-blue-400"
      aria-label="Use my location"
    >
      {locating ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
      Use My Location
    </button>
  );
}
