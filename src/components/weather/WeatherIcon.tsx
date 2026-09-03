"use client";

import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  CloudFog,
  Wind,
  Tornado,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WeatherIconProps {
  code: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const iconMap: Record<string, LucideIcon> = {
  "01d": Sun,
  "01n": Sun,
  "02d": Cloud,
  "02n": Cloud,
  "03d": Cloud,
  "03n": Cloud,
  "04d": Cloud,
  "04n": Cloud,
  "09d": CloudDrizzle,
  "09n": CloudDrizzle,
  "10d": CloudRain,
  "10n": CloudRain,
  "11d": CloudLightning,
  "11n": CloudLightning,
  "13d": CloudSnow,
  "13n": CloudSnow,
  "50d": CloudFog,
  "50n": CloudFog,
};

const colorMap: Record<string, string> = {
  "01d": "text-yellow-400",
  "01n": "text-yellow-300",
  "02d": "text-gray-400",
  "02n": "text-gray-500",
  "03d": "text-gray-400",
  "03n": "text-gray-500",
  "04d": "text-gray-500",
  "04n": "text-gray-600",
  "09d": "text-blue-400",
  "09n": "text-blue-500",
  "10d": "text-blue-500",
  "10n": "text-blue-600",
  "11d": "text-purple-500",
  "11n": "text-purple-600",
  "13d": "text-cyan-300",
  "13n": "text-cyan-400",
  "50d": "text-gray-400",
  "50n": "text-gray-500",
};

const sizeMap = {
  sm: "h-6 w-6",
  md: "h-10 w-10",
  lg: "h-16 w-16",
  xl: "h-24 w-24",
};

const weatherLabels: Record<string, string> = {
  "01d": "Clear sky",
  "01n": "Clear night",
  "02d": "Few clouds",
  "02n": "Few clouds",
  "03d": "Scattered clouds",
  "03n": "Scattered clouds",
  "04d": "Broken clouds",
  "04n": "Broken clouds",
  "09d": "Shower rain",
  "09n": "Shower rain",
  "10d": "Rain",
  "10n": "Rain",
  "11d": "Thunderstorm",
  "11n": "Thunderstorm",
  "13d": "Snow",
  "13n": "Snow",
  "50d": "Mist",
  "50n": "Mist",
};

// Additional mapping for weatherMain strings
const mainIconMap: Record<string, LucideIcon> = {
  Clear: Sun,
  Clouds: Cloud,
  Rain: CloudRain,
  Drizzle: CloudDrizzle,
  Thunderstorm: CloudLightning,
  Snow: CloudSnow,
  Mist: CloudFog,
  Smoke: CloudFog,
  Haze: CloudFog,
  Dust: Wind,
  Fog: CloudFog,
  Sand: Wind,
  Ash: CloudFog,
  Squall: Wind,
  Tornado: Tornado,
};

export function WeatherIcon({ code, size = "md", className }: WeatherIconProps) {
  const Icon = iconMap[code] || mainIconMap[code] || Cloud;
  const color = colorMap[code] || "text-gray-400";
  const label = weatherLabels[code] || "Weather";

  return (
    <Icon
      className={cn(sizeMap[size], color, className)}
      aria-label={label}
      role="img"
    />
  );
}

export function getWeatherIconByMain(main: string): LucideIcon {
  return mainIconMap[main] || Cloud;
}
