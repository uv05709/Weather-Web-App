import { CurrentWeather, ForecastDay } from "@/types/weather";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

function getApiKey(): string {
  const key = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  if (!key || key === "your_api_key_here") {
    throw new ApiError(
      "api-key",
      "OpenWeatherMap API key is not configured. Please add your API key to .env.local"
    );
  }
  return key;
}

class ApiError extends Error {
  type: "not-found" | "network" | "api-key" | "rate-limit" | "unknown";

  constructor(
    type: "not-found" | "network" | "api-key" | "rate-limit" | "unknown",
    message: string
  ) {
    super(message);
    this.type = type;
    this.name = "ApiError";
  }
}

async function handleResponse(response: Response): Promise<Record<string, unknown>> {
  if (response.ok) {
    return response.json();
  }

  switch (response.status) {
    case 401:
      throw new ApiError("api-key", "Invalid API key. Please check your configuration.");
    case 404:
      throw new ApiError("not-found", "City not found. Please check the spelling and try again.");
    case 429:
      throw new ApiError("rate-limit", "Too many requests. Please wait a moment and try again.");
    default:
      throw new ApiError("unknown", `Weather service error (${response.status}). Please try again later.`);
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function parseCurrentWeather(data: any): CurrentWeather {
  return {
    city: data.name,
    country: data.sys?.country ?? "",
    temp: data.main.temp,
    feelsLike: data.main.feels_like,
    tempMin: data.main.temp_min,
    tempMax: data.main.temp_max,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    visibility: data.visibility ?? 0,
    windSpeed: data.wind?.speed ?? 0,
    weatherMain: data.weather?.[0]?.main ?? "Clear",
    weatherDescription: data.weather?.[0]?.description ?? "",
    weatherIcon: data.weather?.[0]?.icon ?? "01d",
    sunrise: data.sys?.sunrise ?? 0,
    sunset: data.sys?.sunset ?? 0,
    dt: data.dt,
    timezone: data.timezone ?? 0,
    coord: { lat: data.coord?.lat ?? 0, lon: data.coord?.lon ?? 0 },
  };
}

function parseForecast(data: any): ForecastDay[] {
  const dailyMap = new Map<string, { temps: number[]; humidities: number[]; pops: number[]; weather: any }>();

  for (const item of data.list) {
    const date = item.dt_txt.split(" ")[0];

    if (!dailyMap.has(date)) {
      dailyMap.set(date, {
        temps: [],
        humidities: [],
        pops: [],
        weather: item.weather[0],
      });
    }

    const day = dailyMap.get(date)!;
    day.temps.push(item.main.temp);
    day.humidities.push(item.main.humidity);
    day.pops.push(item.pop ?? 0);

    // Use midday weather as representative (12:00 reading)
    if (item.dt_txt.includes("12:00:00")) {
      day.weather = item.weather[0];
    }
  }

  const days: ForecastDay[] = [];
  const today = new Date().toISOString().split("T")[0];

  for (const [date, day] of dailyMap) {
    if (date === today) continue; // Skip today
    if (days.length >= 5) break;

    days.push({
      date,
      tempMin: Math.round(Math.min(...day.temps) * 10) / 10,
      tempMax: Math.round(Math.max(...day.temps) * 10) / 10,
      tempAvg: Math.round((day.temps.reduce((a, b) => a + b, 0) / day.temps.length) * 10) / 10,
      humidity: Math.round(day.humidities.reduce((a, b) => a + b, 0) / day.humidities.length),
      weatherMain: day.weather?.main ?? "Clear",
      weatherDescription: day.weather?.description ?? "",
      weatherIcon: day.weather?.icon ?? "01d",
      pop: Math.round(Math.max(...day.pops) * 100),
    });
  }

  return days;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function getCurrentWeather(city: string): Promise<CurrentWeather> {
  try {
    const apiKey = getApiKey();
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`
    );
    const data = await handleResponse(response);
    return parseCurrentWeather(data);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError("network", "Unable to connect to weather service. Please check your internet connection.");
  }
}

export async function getForecast(city: string): Promise<ForecastDay[]> {
  try {
    const apiKey = getApiKey();
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`
    );
    const data = await handleResponse(response);
    return parseForecast(data);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError("network", "Unable to connect to weather service. Please check your internet connection.");
  }
}

export async function getWeatherByCoordinates(lat: number, lon: number): Promise<CurrentWeather> {
  try {
    const apiKey = getApiKey();
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );
    const data = await handleResponse(response);
    return parseCurrentWeather(data);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError("network", "Unable to connect to weather service. Please check your internet connection.");
  }
}

export async function getForecastByCoordinates(lat: number, lon: number): Promise<ForecastDay[]> {
  try {
    const apiKey = getApiKey();
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );
    const data = await handleResponse(response);
    return parseForecast(data);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError("network", "Unable to connect to weather service. Please check your internet connection.");
  }
}

export function isApiKeyConfigured(): boolean {
  const key = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  return Boolean(key && key !== "your_api_key_here");
}

export { ApiError };
