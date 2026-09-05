"use client";

import { useState } from "react";
import { MapPin, Loader2 } from "lucide-react";

export function LocationButton({ onLocation }) {
  const [locating, setLocating] = useState(false);

  const handleClick = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
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
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("Location permission denied. Please enable it in your browser settings.");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
          default:
            alert("Unable to get your location. Please try again.");
        }
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  };

  return (
    <button
      onClick={handleClick}
      disabled={locating}
      className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-4 py-2.5 text-sm font-medium text-gray-700 backdrop-blur-sm transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 focus:ring-2 focus:ring-blue-400/20 focus:outline-none disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800/80 dark:text-gray-200 dark:hover:border-blue-500 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
      aria-label="Use my location"
    >
      {locating ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
      Use My Location
    </button>
  );
}
