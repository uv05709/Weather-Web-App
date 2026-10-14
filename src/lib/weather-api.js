const BASE_URL = "https://api.openweathermap.org/data/2.5";

function getApiKey() {
  const key = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  if (!key || key === "your_api_key_here") {
    throw new ApiError(
      "api-key",
      "OpenWeatherMap API key is not configured. Please add your API key to .env.local"
    );
  }
  return key;
}

export class ApiError extends Error {
  constructor(type, message) {
    super(message);
    this.type = type;
    this.name = "ApiError";
  }
}

async function handleResponse(response) {
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

function parseCurrentWeather(data) {
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
    windDeg: data.wind?.deg ?? 0,
    clouds: data.clouds?.all ?? 0,
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

function parseForecast(data) {
  const dailyMap = new Map();

  const hourly = data.list.map((item) => {
    const d = new Date(item.dt * 1000);
    const rain3h = item.rain?.["3h"] ?? item.rain?.["1h"] ?? 0;
    return {
      dt: item.dt,
      time: d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      hour24: d.getHours(),
      dateStr: item.dt_txt.split(" ")[0],
      dayName: d.toLocaleDateString([], { weekday: "short" }),
      temp: Math.round(item.main.temp * 10) / 10,
      feelsLike: Math.round(item.main.feels_like * 10) / 10,
      tempMin: Math.round(item.main.temp_min * 10) / 10,
      tempMax: Math.round(item.main.temp_max * 10) / 10,
      humidity: item.main.humidity,
      pressure: item.main.pressure,
      pop: Math.round((item.pop ?? 0) * 100),
      rain: Math.round(rain3h * 10) / 10,
      windSpeed: Math.round((item.wind?.speed ?? 0) * 3.6 * 10) / 10, // km/h
      windSpeedMs: item.wind?.speed ?? 0, // m/s
      windDeg: item.wind?.deg ?? 0,
      clouds: item.clouds?.all ?? 0,
      weatherMain: item.weather?.[0]?.main ?? "Clear",
      weatherDescription: item.weather?.[0]?.description ?? "",
      weatherIcon: item.weather?.[0]?.icon ?? "01d",
    };
  });

  for (const item of data.list) {
    const date = item.dt_txt.split(" ")[0];

    if (!dailyMap.has(date)) {
      dailyMap.set(date, {
        temps: [],
        humidities: [],
        pops: [],
        winds: [],
        rainTotal: 0,
        weather: item.weather[0],
      });
    }

    const day = dailyMap.get(date);
    day.temps.push(item.main.temp);
    day.humidities.push(item.main.humidity);
    day.pops.push(item.pop ?? 0);
    day.winds.push((item.wind?.speed ?? 0) * 3.6);
    day.rainTotal += item.rain?.["3h"] ?? 0;

    if (item.dt_txt.includes("12:00:00")) {
      day.weather = item.weather[0];
    }
  }

  const days = [];
  const today = new Date().toISOString().split("T")[0];

  for (const [date, day] of dailyMap) {
    if (date === today) continue;
    if (days.length >= 5) break;

    const d = new Date(date + "T12:00:00");
    days.push({
      date,
      dayName: d.toLocaleDateString([], { weekday: "short" }),
      monthDay: d.toLocaleDateString([], { month: "short", day: "numeric" }),
      tempMin: Math.round(Math.min(...day.temps) * 10) / 10,
      tempMax: Math.round(Math.max(...day.temps) * 10) / 10,
      tempAvg: Math.round((day.temps.reduce((a, b) => a + b, 0) / day.temps.length) * 10) / 10,
      humidity: Math.round(day.humidities.reduce((a, b) => a + b, 0) / day.humidities.length),
      windSpeed: Math.round((day.winds.reduce((a, b) => a + b, 0) / day.winds.length) * 10) / 10,
      rainTotal: Math.round(day.rainTotal * 10) / 10,
      weatherMain: day.weather?.main ?? "Clear",
      weatherDescription: day.weather?.description ?? "",
      weatherIcon: day.weather?.icon ?? "01d",
      pop: Math.round(Math.max(...day.pops) * 100),
    });
  }

  // Preserve backwards compatibility where consumers might read array directly
  const result = [...days];
  result.daily = days;
  result.hourly = hourly;
  return result;
}

export async function getCurrentWeather(city) {
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

export async function getForecast(city) {
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

export async function getWeatherByCoordinates(lat, lon) {
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

export async function getForecastByCoordinates(lat, lon) {
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

// Official CPCB (Central Pollution Control Board) & EPA Sub-Index Linear Interpolation
function calculateSubIndex(conc, breakpoints) {
  if (conc <= 0) return 0;
  for (const bp of breakpoints) {
    if (conc <= bp.bHi) {
      return Math.round(((bp.iHi - bp.iLo) / (bp.bHi - bp.bLo)) * (conc - bp.bLo) + bp.iLo);
    }
  }
  return 500;
}

const PM25_BREAKPOINTS = [
  { bLo: 0, bHi: 30, iLo: 0, iHi: 50 },
  { bLo: 30, bHi: 60, iLo: 51, iHi: 100 },
  { bLo: 60, bHi: 90, iLo: 101, iHi: 200 },
  { bLo: 90, bHi: 120, iLo: 201, iHi: 300 },
  { bLo: 120, bHi: 250, iLo: 301, iHi: 400 },
  { bLo: 250, bHi: 500, iLo: 401, iHi: 500 },
];

const PM10_BREAKPOINTS = [
  { bLo: 0, bHi: 50, iLo: 0, iHi: 50 },
  { bLo: 50, bHi: 100, iLo: 51, iHi: 100 },
  { bLo: 100, bHi: 250, iLo: 101, iHi: 200 },
  { bLo: 250, bHi: 350, iLo: 201, iHi: 300 },
  { bLo: 350, bHi: 430, iLo: 301, iHi: 400 },
  { bLo: 430, bHi: 600, iLo: 401, iHi: 500 },
];

const NO2_BREAKPOINTS = [
  { bLo: 0, bHi: 40, iLo: 0, iHi: 50 },
  { bLo: 40, bHi: 80, iLo: 51, iHi: 100 },
  { bLo: 80, bHi: 180, iLo: 101, iHi: 200 },
  { bLo: 180, bHi: 280, iLo: 201, iHi: 300 },
  { bLo: 280, bHi: 400, iLo: 301, iHi: 400 },
  { bLo: 400, bHi: 600, iLo: 401, iHi: 500 },
];

export function parseAirQualityData(components, fallbackAqiIndex = 1) {
  const pm25 = components.pm2_5 ?? 0;
  const pm10 = components.pm10 ?? 0;
  const no2 = components.no2 ?? 0;
  const so2 = components.so2 ?? 0;
  const co = components.co ? Math.round((components.co / 1000) * 100) / 100 : 0; // mg/m³
  const o3 = components.o3 ?? 0;

  const subPm25 = calculateSubIndex(pm25, PM25_BREAKPOINTS);
  const subPm10 = calculateSubIndex(pm10, PM10_BREAKPOINTS);
  const subNo2 = calculateSubIndex(no2, NO2_BREAKPOINTS);

  const calculatedAqi = Math.max(
    subPm25,
    subPm10,
    subNo2,
    fallbackAqiIndex * 35
  );

  let category = "Good";
  let color = "#10b981"; // green
  let statusBg = "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400";
  let recommendation = {
    outdoor: "Perfect conditions for outdoor workouts, running and walking.",
    mask: "No mask required for general public or sensitive groups.",
    ventilation: "Great time to open windows and let clean fresh air circulate indoors.",
    sensitive: "No restrictions. Clean atmospheric air.",
  };

  if (calculatedAqi > 50 && calculatedAqi <= 100) {
    category = "Moderate";
    color = "#f59e0b"; // amber
    statusBg = "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400";
    recommendation = {
      outdoor: "Acceptable for outdoor activities. Unusually sensitive individuals should take breaks.",
      mask: "Not needed for most people. Sensitive individuals may consider masks in high-traffic zones.",
      ventilation: "Safe to open windows during non-peak traffic hours.",
      sensitive: "People with asthma or respiratory allergies should keep inhalers handy.",
    };
  } else if (calculatedAqi > 100 && calculatedAqi <= 200) {
    category = "Unhealthy for Sensitive Groups";
    color = "#f97316"; // orange
    statusBg = "bg-orange-500/10 border-orange-500/30 text-orange-600 dark:text-orange-400";
    recommendation = {
      outdoor: "Reduce prolonged or heavy outdoor exertion. Reschedule strenuous runs to early morning.",
      mask: "N95 masks recommended when outside near traffic or construction.",
      ventilation: "Close windows facing busy streets. Use indoor air filtration if available.",
      sensitive: "Children, elderly, and individuals with lung/heart diseases should avoid prolonged outdoor exposure.",
    };
  } else if (calculatedAqi > 200 && calculatedAqi <= 300) {
    category = "Poor / Unhealthy";
    color = "#ef4444"; // red
    statusBg = "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400";
    recommendation = {
      outdoor: "Avoid prolonged outdoor activities and intense exercise outdoors.",
      mask: "Wear a well-fitted N95 / FFP2 mask when stepping outside.",
      ventilation: "Keep windows tightly shut. Run HEPA air purifiers indoors.",
      sensitive: "Sensitive groups should strictly remain indoors in filtered environments.",
    };
  } else if (calculatedAqi > 300 && calculatedAqi <= 400) {
    category = "Very Poor";
    color = "#8b5cf6"; // purple
    statusBg = "bg-purple-500/10 border-purple-500/30 text-purple-600 dark:text-purple-400";
    recommendation = {
      outdoor: "Avoid all outdoor physical activity. Health alert: serious risk for all populations.",
      mask: "Mandatory N95 / KN95 mask if outdoor transit cannot be avoided.",
      ventilation: "Keep all windows sealed. Use air purifiers on high mode.",
      sensitive: "High health risk. Medical precautions advised for vulnerable populations.",
    };
  } else if (calculatedAqi > 400) {
    category = "Severe / Hazardous";
    color = "#881337"; // maroon
    statusBg = "bg-rose-950/20 border-rose-600/40 text-rose-500 dark:text-rose-400";
    recommendation = {
      outdoor: "Emergency conditions. Entire population is severely affected. Stay indoors.",
      mask: "Wear high-filtration respirator (N95/FFP3) at all times outside.",
      ventilation: "Seal doors and windows. Continuous indoor air filtration required.",
      sensitive: "Vulnerable individuals should avoid any outdoor exposure and consult physicians if symptomatic.",
    };
  }

  return {
    aqi: calculatedAqi,
    category,
    color,
    statusBg,
    recommendation,
    components: {
      pm25: {
        name: "PM2.5",
        value: Math.round(pm25 * 10) / 10,
        unit: "µg/m³",
        standard: 60,
        description: "Fine inhalable particles (< 2.5 µm)",
        percent: Math.min(100, Math.round((pm25 / 150) * 100)),
      },
      pm10: {
        name: "PM10",
        value: Math.round(pm10 * 10) / 10,
        unit: "µg/m³",
        standard: 100,
        description: "Coarse dust and pollen particles (< 10 µm)",
        percent: Math.min(100, Math.round((pm10 / 250) * 100)),
      },
      no2: {
        name: "NO₂",
        value: Math.round(no2 * 10) / 10,
        unit: "µg/m³",
        standard: 80,
        description: "Nitrogen dioxide from vehicle combustion",
        percent: Math.min(100, Math.round((no2 / 120) * 100)),
      },
      so2: {
        name: "SO₂",
        value: Math.round(so2 * 10) / 10,
        unit: "µg/m³",
        standard: 80,
        description: "Sulfur dioxide from industrial emissions",
        percent: Math.min(100, Math.round((so2 / 100) * 100)),
      },
      co: {
        name: "CO",
        value: co,
        unit: "mg/m³",
        standard: 4.0,
        description: "Carbon monoxide from exhaust emissions",
        percent: Math.min(100, Math.round((co / 5) * 100)),
      },
      o3: {
        name: "Ozone (O₃)",
        value: Math.round(o3 * 10) / 10,
        unit: "µg/m³",
        standard: 100,
        description: "Ground-level ozone from sunlight reacting with smog",
        percent: Math.min(100, Math.round((o3 / 180) * 100)),
      },
    },
  };
}

export async function getAirQuality(lat, lon) {
  try {
    const apiKey = getApiKey();
    const response = await fetch(
      `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    if (!response.ok) throw new Error("Air pollution request failed");
    const data = await response.json();
    const item = data.list?.[0];
    if (!item) throw new Error("No air quality list data");
    return parseAirQualityData(item.components, item.main?.aqi ?? 1);
  } catch {
    // Graceful fallback to Open-Meteo Air Quality
    try {
      const omRes = await fetch(
        `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,us_aqi`
      );
      if (omRes.ok) {
        const omData = await omRes.json();
        const current = omData.current || {};
        return parseAirQualityData(
          {
            pm2_5: current.pm2_5 ?? 15,
            pm10: current.pm10 ?? 30,
            no2: current.nitrogen_dioxide ?? 12,
            so2: current.sulphur_dioxide ?? 6,
            co: (current.carbon_monoxide ?? 200) * 1, // in µg/m³
            o3: current.ozone ?? 35,
          },
          current.us_aqi ? Math.ceil(current.us_aqi / 50) : 1
        );
      }
    } catch {
      // Fallback failed
    }
    return null;
  }
}

// Generate intelligent, grounded severe weather alerts based on IMD & international meteorological criteria
export function detectSevereWeatherAlerts(weather, hourlyForecast = [], airQuality = null) {
  const alerts = [];
  if (!weather) return alerts;

  const cityName = weather.city || "Current Location";
  const now = new Date();
  const formatTime = (d) =>
    d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

  const validUntilToday = new Date(now.getTime() + 6 * 3600 * 1000);
  const validUntilStr = `${formatTime(validUntilToday)} today`;

  // 1. Extreme Heatwave Alert (IMD Criteria: Temp >= 40°C in plains or feelsLike >= 44°C)
  if (weather.temp >= 40 || weather.feelsLike >= 44) {
    alerts.push({
      id: "alert-heatwave",
      severity: weather.temp >= 44 ? "Urgent" : "Warning",
      badgeColor: "bg-red-500 text-white",
      borderClass: "border-red-500/50 bg-red-500/10 text-red-900 dark:text-red-200",
      icon: "flame",
      title: "Severe Heatwave Warning",
      affectedArea: cityName,
      validTime: `Until ${validUntilStr}`,
      summary: `Extreme temperatures detected (${Math.round(weather.temp)}°C, feels like ${Math.round(weather.feelsLike)}°C). High risk of heat exhaustion, cramps, and sunstroke.`,
      guidelines: [
        "Drink plenty of water and oral rehydration solutions (ORS) even if not feeling thirsty.",
        "Avoid stepping outside in direct sunlight between 12:00 PM and 4:00 PM.",
        "Wear lightweight, loose-fitting cotton clothing and cover head with a cap, cloth, or umbrella.",
        "Keep pets and elderly individuals in well-ventilated, shaded indoor spaces.",
      ],
    });
  }

  // 2. Severe Thunderstorm & Lightning Warning
  const thunderstormForecast = hourlyForecast.slice(0, 8).find(
    (h) => h.weatherMain === "Thunderstorm" || (h.pop >= 70 && h.rain >= 8)
  );

  if (weather.weatherMain === "Thunderstorm" || thunderstormForecast) {
    alerts.push({
      id: "alert-thunderstorm",
      severity: "Urgent",
      badgeColor: "bg-purple-600 text-white",
      borderClass: "border-purple-500/50 bg-purple-500/10 text-purple-900 dark:text-purple-200",
      icon: "zap",
      title: "Thunderstorm & Lightning Warning",
      affectedArea: cityName,
      validTime: `Active now through ${validUntilStr}`,
      summary: `Active thunderstorm cluster detected with lightning discharges, gusty convective winds, and intense localized squalls.`,
      guidelines: [
        "Seek immediate shelter inside a sturdy enclosed building or hard-topped vehicle.",
        "Do not stand under isolated trees, metal towers, or tin-roofed sheds.",
        "Unplug electrical appliances and avoid contact with wired electronics.",
        "Avoid bodies of water, open fields, and elevated terrace areas.",
      ],
    });
  }

  // 3. Heavy Rainfall & Localized Waterlogging Watch
  const heavyRainHour = hourlyForecast.slice(0, 8).find((h) => h.pop >= 75 || h.rain >= 10);
  if (weather.weatherMain === "Rain" && (weather.humidity >= 85 || heavyRainHour)) {
    alerts.push({
      id: "alert-heavy-rain",
      severity: heavyRainHour && heavyRainHour.rain >= 15 ? "Warning" : "Advisory",
      badgeColor: "bg-blue-600 text-white",
      borderClass: "border-blue-500/50 bg-blue-500/10 text-blue-900 dark:text-blue-200",
      icon: "cloud-rain",
      title: "Heavy Rainfall & Waterlogging Advisory",
      affectedArea: cityName,
      validTime: `Next 12 Hours`,
      summary: `Persistent downpours projected with high precipitation probability (${heavyRainHour ? heavyRainHour.pop : 80}%). Potential localized street waterlogging and reduced road visibility.`,
      guidelines: [
        "Plan commute ahead and expect waterlogged low-lying roads and traffic slowdowns.",
        "Carry high-grade waterproof gear and umbrellas.",
        "Drive at reduced speeds to prevent hydroplaning and avoid navigating flooded underpasses.",
        "Ensure drainage around residential perimeter is unobstructed.",
      ],
    });
  }

  // 4. Gale Force / High Wind Warning (Wind >= 40 km/h)
  const currentWindKmh = weather.windSpeed * 3.6;
  if (currentWindKmh >= 40) {
    alerts.push({
      id: "alert-high-wind",
      severity: currentWindKmh >= 55 ? "Urgent" : "Warning",
      badgeColor: "bg-amber-600 text-white",
      borderClass: "border-amber-500/50 bg-amber-500/10 text-amber-900 dark:text-amber-200",
      icon: "wind",
      title: "High Wind & Gust Warning",
      affectedArea: cityName,
      validTime: `Active Now`,
      summary: `Hazardous sustained wind speeds (${Math.round(currentWindKmh)} km/h) with strong squall gusts. Danger from falling tree limbs and flying debris.`,
      guidelines: [
        "Secure lightweight outdoor patio furniture, canopies, and trash bins.",
        "Keep distance from billboards, hoardings, and old trees while walking or driving.",
        "Be cautious when driving high-profile vehicles or two-wheelers on flyovers.",
      ],
    });
  }

  // 5. Dense Fog / Low Visibility Warning (Visibility < 1000m)
  if (weather.visibility && weather.visibility <= 1000) {
    alerts.push({
      id: "alert-dense-fog",
      severity: weather.visibility <= 300 ? "Urgent" : "Warning",
      badgeColor: "bg-slate-600 text-white",
      borderClass: "border-slate-500/50 bg-slate-500/10 text-slate-900 dark:text-slate-200",
      icon: "eye-off",
      title: "Dense Fog & Low Visibility Advisory",
      affectedArea: cityName,
      validTime: `Morning hours`,
      summary: `Critically reduced visibility (${weather.visibility} meters). Severe impact on road transit, airport schedules, and train operations.`,
      guidelines: [
        "Use low-beam headlights and dedicated yellow fog lamps while driving.",
        "Maintain triple the normal following distance from vehicles ahead.",
        "Check flight and train departures for delay advisories before departing for stations.",
      ],
    });
  }

  // 6. Extreme Air Quality Health Emergency (AQI >= 250)
  if (airQuality && airQuality.aqi >= 250) {
    alerts.push({
      id: "alert-air-quality",
      severity: airQuality.aqi >= 350 ? "Urgent" : "Warning",
      badgeColor: "bg-rose-700 text-white",
      borderClass: "border-rose-500/50 bg-rose-500/10 text-rose-900 dark:text-rose-200",
      icon: "shield-alert",
      title: "Severe Air Quality Health Emergency",
      affectedArea: cityName,
      validTime: `24-Hour Active Advisory`,
      summary: `Hazardous toxic particulate concentrations (AQI: ${airQuality.aqi}, PM2.5: ${airQuality.components.pm25.value} µg/m³). Severe health impacts on all age demographics.`,
      guidelines: [
        "Wear certified N95 / FFP2 respirators whenever outdoors.",
        "Keep doors and windows firmly closed; operate HEPA air filtration systems.",
        "Children, pregnant women, and elderly must strictly avoid all outdoor activities.",
        "Avoid burning garbage or dry biomass.",
      ],
    });
  }

  return alerts;
}

export function isApiKeyConfigured() {
  const key = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  return Boolean(key && key !== "your_api_key_here");
}
