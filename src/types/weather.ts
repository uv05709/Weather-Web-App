export interface CurrentWeather {
  city: string;
  country: string;
  temp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  pressure: number;
  visibility: number;
  windSpeed: number;
  weatherMain: string;
  weatherDescription: string;
  weatherIcon: string;
  sunrise: number;
  sunset: number;
  dt: number;
  timezone: number;
  coord: { lat: number; lon: number };
}

export interface ForecastDay {
  date: string;
  tempMin: number;
  tempMax: number;
  tempAvg: number;
  humidity: number;
  weatherMain: string;
  weatherDescription: string;
  weatherIcon: string;
  pop: number;
}

export interface FavoriteCity {
  name: string;
  country: string;
}

export type TemperatureUnit = "celsius" | "fahrenheit";

export interface WeatherError {
  type: "not-found" | "network" | "api-key" | "rate-limit" | "unknown";
  message: string;
}
