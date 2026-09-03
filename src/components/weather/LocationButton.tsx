"use client";

import { useState } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LocationButtonProps {
  onLocation: (lat: number, lon: number) => void;
}

export function LocationButton({ onLocation }: LocationButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        onLocation(position.coords.latitude, position.coords.longitude);
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError("Location permission was denied. You can search for a city instead.");
            break;
          case err.POSITION_UNAVAILABLE:
            setError("Location information is unavailable.");
            break;
          case err.TIMEOUT:
            setError("Location request timed out. Please try again.");
            break;
          default:
            setError("An unknown error occurred while getting your location.");
        }
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleClick}
        disabled={loading}
        className={cn(
          "flex items-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-sm transition-all duration-200",
          "hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600",
          "focus:ring-2 focus:ring-blue-400/20 focus:outline-none",
          "dark:border-slate-600 dark:bg-slate-800/80 dark:text-gray-300 dark:hover:border-blue-500 dark:hover:bg-blue-500/10 dark:hover:text-blue-400",
          "disabled:cursor-not-allowed disabled:opacity-60"
        )}
        aria-label="Use my current location"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <MapPin className="h-4 w-4" />
        )}
        Use My Location
      </button>
      {error && (
        <p className="max-w-sm text-center text-xs text-red-500 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
