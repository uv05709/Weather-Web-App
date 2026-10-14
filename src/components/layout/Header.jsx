"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  CloudSun,
  Sun,
  Moon,
  Menu,
  X,
  Heart,
  BarChart2,
  Wind,
  Sparkles,
  AlertTriangle,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // Ensure hydration before rendering theme icons
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    if (id === "ai-weather-assistant") {
      window.dispatchEvent(new CustomEvent("open-ai-assistant"));
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // If city forecast is not loaded yet, scroll to search and focus input
      const searchBox = document.getElementById("weather-search");
      if (searchBox) {
        searchBox.scrollIntoView({ behavior: "smooth", block: "center" });
        const input = document.getElementById("city-search");
        input?.focus();
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/60 bg-white/75 backdrop-blur-2xl transition-colors duration-200 dark:border-white/10 dark:bg-slate-900/75">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 transition-opacity hover:opacity-85 focus:outline-none"
          aria-label="Back to top"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-sm shadow-blue-500/20">
            <CloudSun className="h-5 w-5" />
          </div>
          <span className="text-lg font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-xl">
            Weather<span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Now</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("weather-charts")}
            className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <BarChart2 className="h-3.5 w-3.5 text-orange-500" />
            Charts
          </button>
          <button
            onClick={() => scrollToSection("air-quality-dashboard")}
            className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <Wind className="h-3.5 w-3.5 text-emerald-500" />
            Air Quality
          </button>
          <button
            onClick={() => scrollToSection("severe-weather-alerts")}
            className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
            Alerts
          </button>
          <button
            onClick={() => scrollToSection("ai-weather-assistant")}
            className="flex items-center gap-1 rounded-lg bg-purple-500/10 px-2.5 py-1.5 text-xs font-semibold text-purple-700 transition-colors hover:bg-purple-500/20 dark:bg-purple-500/15 dark:text-purple-300 dark:hover:bg-purple-500/25"
          >
            <Sparkles className="h-3.5 w-3.5 text-purple-500" />
            AI Assistant
          </button>
          <button
            onClick={() => scrollToSection("forecast-section")}
            className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <Calendar className="h-3.5 w-3.5 text-blue-500" />
            5-Day
          </button>
          <button
            onClick={() => scrollToSection("favorites-section")}
            className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <Heart className="h-3.5 w-3.5 text-rose-500" />
            Favorites
          </button>

          <div className="ml-2 h-4 w-px bg-gray-200 dark:bg-slate-700" />

          <button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            className="ml-1 rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-slate-800 dark:hover:text-white"
            aria-label="Toggle light or dark theme"
          >
            {mounted ? (
              isDark ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-slate-700" />
              )
            ) : (
              <div className="h-4 w-4" />
            )}
          </button>
        </nav>

        {/* Mobile Buttons */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="rounded-xl p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800"
            aria-label="Toggle theme"
          >
            {mounted ? (
              isDark ? (
                <Sun className="h-5 w-5 text-amber-400" />
              ) : (
                <Moon className="h-5 w-5 text-slate-700" />
              )
            ) : (
              <div className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "overflow-hidden border-t border-white/60 bg-white/85 px-4 backdrop-blur-2xl transition-all duration-300 dark:border-white/10 dark:bg-slate-900/85 md:hidden",
          mobileMenuOpen ? "max-h-80 py-3 opacity-100" : "max-h-0 py-0 opacity-0 border-t-0"
        )}
      >
        <nav className="flex flex-col gap-1 text-xs font-semibold" aria-label="Mobile navigation">
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setMobileMenuOpen(false);
            }}
            className="rounded-xl px-3 py-2 text-left text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-slate-800"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("weather-charts")}
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-left text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-slate-800"
          >
            <BarChart2 className="h-4 w-4 text-orange-500" />
            Weather Charts
          </button>
          <button
            onClick={() => scrollToSection("air-quality-dashboard")}
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-left text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-slate-800"
          >
            <Wind className="h-4 w-4 text-emerald-500" />
            Air Quality Dashboard
          </button>
          <button
            onClick={() => scrollToSection("severe-weather-alerts")}
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-left text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-slate-800"
          >
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            Severe Weather Alerts
          </button>
          <button
            onClick={() => scrollToSection("ai-weather-assistant")}
            className="flex items-center gap-2 rounded-xl bg-purple-500/10 px-3 py-2 text-left text-purple-700 dark:bg-purple-500/15 dark:text-purple-300"
          >
            <Sparkles className="h-4 w-4 text-purple-500" />
            AI Weather Assistant
          </button>
          <button
            onClick={() => scrollToSection("forecast-section")}
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-left text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-slate-800"
          >
            <Calendar className="h-4 w-4 text-blue-500" />
            5-Day Forecast
          </button>
          <button
            onClick={() => scrollToSection("favorites-section")}
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-left text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-slate-800"
          >
            <Heart className="h-4 w-4 text-rose-500" />
            Favorite Cities
          </button>
        </nav>
      </div>
    </header>
  );
}
