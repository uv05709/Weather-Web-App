"use client";

import { useState, useEffect } from "react";
import { WifiOff, Download, RefreshCw, CheckCircle, Clock } from "lucide-react";

export function OfflineBanner({ isOffline, lastUpdated, onRefresh }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(true);

  // Register service worker and capture PWA beforeinstallprompt event
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("WeatherNow ServiceWorker registered"))
        .catch((err) => console.log("SW registration error:", err));
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
    }
  };

  const formattedLastUpdated = lastUpdated
    ? new Date(lastUpdated).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        month: "short",
        day: "numeric",
      })
    : "Previous Session";

  return (
    <div className="w-full max-w-4xl space-y-3 px-1">
      {/* 1. Offline Mode Alert Banner */}
      {isOffline && (
        <div className="flex flex-col gap-3 rounded-2xl border border-amber-300 bg-amber-500/10 p-3.5 backdrop-blur-md dark:border-amber-500/30 dark:bg-amber-500/15 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-amber-500 p-2 text-white">
              <WifiOff className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-900 dark:text-amber-200">
                  Offline Mode Active
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-200/60 px-2 py-0.5 text-[10px] font-semibold text-amber-800 dark:bg-amber-900/60 dark:text-amber-300">
                  <Clock className="h-2.5 w-2.5" />
                  Cached: {formattedLastUpdated}
                </span>
              </div>
              <p className="text-[11px] text-amber-800/80 dark:text-amber-300/80">
                You are currently disconnected. Showing cached forecast to prevent stale data confusion. Will auto-sync when network reconnects.
              </p>
            </div>
          </div>

          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              className="flex items-center gap-1.5 rounded-xl border border-amber-400/40 bg-white/80 px-3 py-1.5 text-xs font-bold text-amber-900 transition hover:bg-white dark:bg-slate-800 dark:text-amber-200 self-start sm:self-auto"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Try Reconnect
            </button>
          )}
        </div>
      )}

      {/* 2. PWA Install Prompt Banner */}
      {deferredPrompt && !isInstalled && showInstallPrompt && (
        <div className="flex flex-col gap-3 rounded-2xl border border-blue-200/80 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-transparent p-3.5 backdrop-blur-md dark:border-blue-500/30 dark:from-blue-500/15 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-600 p-2 text-white">
              <Download className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-gray-900 dark:text-white">
                Install WeatherNow Application
              </span>
              <p className="text-[11px] text-gray-600 dark:text-gray-300">
                Install on your device for one-tap home screen access and instant offline weather forecasts.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={handleInstallClick}
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"
            >
              <Download className="h-3.5 w-3.5" />
              Install App
            </button>
            <button
              type="button"
              onClick={() => setShowInstallPrompt(false)}
              className="rounded-xl px-2.5 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400"
            >
              Later
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
