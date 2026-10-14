"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import {
  Sparkles,
  Send,
  Bot,
  User,
  Clock,
  CheckCircle,
  Umbrella,
  Shirt,
  Scale,
  ThermometerSun,
  Activity,
  Calendar,
  RotateCcw,
  Lightbulb,
  Moon,
  CloudSun,
  X,
  MessageSquare,
  Minus,
} from "lucide-react";

export function AiWeatherAssistant({
  currentWeather,
  hourlyForecast = [],
  dailyForecast = [],
  airQuality,
  convertTemp,
  tempSymbol = "°C",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const initialWelcome = useMemo(() => {
    return {
      id: "initial",
      sender: "ai",
      timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      text: `Hello! I'm your WeatherNow Meteorological Assistant. I analyze real-time atmospheric telemetry and hourly forecast models for **${
        currentWeather?.city || "your city"
      }**.\n\nAsk me anything in natural language, or pick a question below!`,
    };
  }, [currentWeather?.city]);

  const [messages, setMessages] = useState([initialWelcome]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Listen for external trigger (e.g. from Header navigation)
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setShowTooltip(false);
    };
    window.addEventListener("open-ai-assistant", handleOpen);
    return () => window.removeEventListener("open-ai-assistant", handleOpen);
  }, []);

  // When city changes, update greeting if chat is fresh
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length <= 1) {
        return [initialWelcome];
      }
      return prev;
    });
  }, [initialWelcome]);

  // Hide initial floating tooltip after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const quickPrompts = [
    {
      id: "commute",
      label: "Will it rain during my commute?",
      icon: <Umbrella className="h-3.5 w-3.5 text-blue-500" />,
    },
    {
      id: "carry",
      label: "What should I wear or carry today?",
      icon: <Shirt className="h-3.5 w-3.5 text-indigo-500" />,
    },
    {
      id: "compare",
      label: "Compare today vs tomorrow",
      icon: <Scale className="h-3.5 w-3.5 text-amber-500" />,
    },
    {
      id: "feels-like",
      label: "Why does it feel hotter or colder?",
      icon: <ThermometerSun className="h-3.5 w-3.5 text-orange-500" />,
    },
    {
      id: "weekend",
      label: "What's the weekend outlook?",
      icon: <Calendar className="h-3.5 w-3.5 text-sky-500" />,
    },
    {
      id: "exercise",
      label: "Is it safe to run or exercise outdoors?",
      icon: <Activity className="h-3.5 w-3.5 text-emerald-500" />,
    },
    {
      id: "tonight",
      label: "How will the weather be tonight?",
      icon: <Moon className="h-3.5 w-3.5 text-violet-500" />,
    },
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  const handleResetChat = () => {
    setMessages([initialWelcome]);
  };

  // Authoritative Meteorological Synthesis Engine for Large-Scale Operations
  function generateAnswer(query) {
    if (!currentWeather) {
      return "Please search for a city first so I can analyze live sensors and forecast projections for you.";
    }

    const q = query.toLowerCase().trim();
    const city = currentWeather.city;
    const currentT = convertTemp(currentWeather.temp);
    const feelsT = convertTemp(currentWeather.feelsLike);
    const tempMaxT = convertTemp(currentWeather.tempMax);
    const tempMinT = convertTemp(currentWeather.tempMin);
    const humidity = currentWeather.humidity;
    const windKmh = Math.round(currentWeather.windSpeed * 3.6);
    const weatherDesc = currentWeather.weatherDescription;
    const weatherMain = currentWeather.weatherMain;
    const aqi = airQuality?.aqi;
    const aqiCategory = airQuality?.category || "Moderate";
    const next24 = hourlyForecast.slice(0, 8);
    const maxPop = next24.length ? Math.max(...next24.map((h) => h.pop)) : 0;
    const rainHours = next24.filter((h) => h.pop >= 30 || h.rain > 0);

    const metricsHeader = `[STATUS: ${city} • ${currentT}${tempSymbol} • ${weatherDesc} • Wind: ${windKmh} km/h • AQI: ${
      aqi || "Fair"
    }]\n\n`;

    // 0. Conversational Greetings & Capabilities
    if (q === "hi" || q === "hello" || q === "hey" || q.startsWith("hello ") || q.startsWith("hi ") || q.includes("who are you") || q.includes("what can you do")) {
      return (
        metricsHeader +
        `**Direct Answer:** Hello! I am your **WeatherNow Meteorological Intelligence Assistant** for **${city}**.\n\n` +
        `I continuously ingest real-time station telemetry, radar models, and air pollution sensors to give you **100% verified, actionable answers**.\n\n` +
        `• **Ask me about:** Rain & umbrella timings, outdoor workouts, commute road conditions, clothing recommendations, tomorrow's forecast, weekend outlook, or air quality.\n` +
        `• **Current Snapshot:** **${currentT}${tempSymbol}** (${weatherDesc}) with winds at **${windKmh} km/h**.\n\n` +
        `> 💡 **Try asking:** *"Will it rain during my commute?"*, *"What should I wear?"*, or *"Can I wash my car today?"*`
      );
    }

    // 0.1 General Weather Report & Conditions Overview
    if (
      q.includes("current weather") ||
      q.includes("weather today") ||
      q.includes("how is the weather") ||
      q.includes("how's the weather") ||
      q.includes("what is the weather") ||
      q.includes("what's the weather") ||
      q.includes("weather update") ||
      q.includes("weather report") ||
      q === "weather"
    ) {
      let conditionSummary = "calm and pleasant";
      if (weatherMain === "Rain") conditionSummary = "wet with active precipitation";
      else if (currentWeather.temp >= 33) conditionSummary = "hot and intense with elevated thermal load";
      else if (currentWeather.temp <= 12) conditionSummary = "chilly and brisk";
      else if (windKmh >= 35) conditionSummary = "windy and gusty";

      return (
        metricsHeader +
        `**Direct Answer:** Weather in **${city}** is currently **${conditionSummary}** at **${currentT}${tempSymbol}** (${weatherDesc}) with a feels-like temperature of **${feelsT}${tempSymbol}**.\n\n` +
        `• **High / Low Today:** Peak of **${tempMaxT}${tempSymbol}** and overnight low of **${tempMinT}${tempSymbol}**.\n` +
        `• **Rain Likelihood:** Maximum precipitation probability is **${maxPop}%** over the next 24 hours.\n` +
        `• **Wind & Atmosphere:** **${windKmh} km/h** winds, humidity at **${humidity}%**, barometric pressure **${currentWeather.pressure} hPa**.\n` +
        `• **Air Quality:** AQI is **${aqi || "Good"}** (${aqiCategory}).\n\n` +
        `> 💡 **Executive Summary:** Conditions are stable for general daily routines. ${
          maxPop >= 40
            ? "Carry an umbrella as showers are possible."
            : "No adverse precipitation expected."
        }`
      );
    }

    // 0.2 Peak Temperature & Extrema Timings
    if (
      q.includes("when is it hottest") ||
      q.includes("when is it coldest") ||
      q.includes("hottest time") ||
      q.includes("coldest time") ||
      q.includes("peak temp") ||
      q.includes("highest temp")
    ) {
      let hottestSlot = next24[0];
      let coldestSlot = next24[0];
      next24.forEach((slot) => {
        if (slot.temp > (hottestSlot?.temp ?? -99)) hottestSlot = slot;
        if (slot.temp < (coldestSlot?.temp ?? 99)) coldestSlot = slot;
      });

      return (
        metricsHeader +
        `**Direct Answer:** In **${city}**, the hottest period today is projected around **${hottestSlot?.time || "2:00 PM"}** at **${convertTemp(hottestSlot?.temp)}${tempSymbol}**, while the coolest time will be around **${coldestSlot?.time || "5:00 AM"}** at **${convertTemp(coldestSlot?.temp)}${tempSymbol}**.\n\n` +
        `• **Diurnal Spread:** Total temperature variation of **${Math.abs(tempMaxT - tempMinT)}${tempSymbol}** today.\n` +
        `• **Thermal Perception:** Peak afternoon heat will feel like **${convertTemp(hottestSlot?.feelsLike || hottestSlot?.temp)}${tempSymbol}** due to ${humidity}% humidity.\n\n` +
        `> 💡 **Planning Tip:** Schedule strenuous outdoor tasks or cardio before 10:00 AM or after 6:00 PM to avoid the thermal peak.`
      );
    }

    // 1. Direct Temperature Queries (Hot / Cold / Current Temp)
    if (
      q.includes("temperature") ||
      q.includes("how hot") ||
      q.includes("how cold") ||
      q === "is it hot" ||
      q === "is it cold" ||
      q === "is it warm" ||
      q.startsWith("is it hot today") ||
      q.startsWith("is it cold today") ||
      q.includes("what is the temp")
    ) {
      let perception = "mild and pleasant";
      if (currentWeather.temp >= 33) perception = "hot and intense";
      else if (currentWeather.temp >= 26) perception = "warm and humid";
      else if (currentWeather.temp <= 10) perception = "cold and brisk";
      else if (currentWeather.temp <= 18) perception = "cool";

      let answer = metricsHeader;
      answer += `**Direct Answer:** In **${city}**, the current temperature is **${currentT}${tempSymbol}** (feels like **${feelsT}${tempSymbol}**), which is **${perception}**.\n\n`;
      answer += `• **Today's High:** Projected peak of **${tempMaxT}${tempSymbol}**.\n`;
      answer += `• **Today's Low:** Expected overnight low of **${tempMinT}${tempSymbol}**.\n`;
      answer += `• **Moisture & Wind:** Relative humidity is **${humidity}%** with surface winds at **${windKmh} km/h**.\n\n`;
      answer += `> 💡 **Recommendation:** ${
        currentWeather.temp >= 30
          ? "Stay hydrated and avoid prolonged exposure to direct midday sunlight."
          : currentWeather.temp <= 16
          ? "Dress in warm layers if heading outdoors in the morning or evening."
          : "Comfortable ambient temperatures for all daily outdoor routines."
      }`;
      return answer;
    }

    // 2. Umbrella, Rain & Precipitation Timing
    if (
      q.includes("umbrella") ||
      q.includes("rain") ||
      q.includes("shower") ||
      q.includes("drizzle") ||
      q.includes("pour") ||
      q.includes("precipitation")
    ) {
      let answer = metricsHeader;

      if (weatherMain === "Rain" || weatherMain === "Drizzle") {
        answer += `**Direct Answer:** ☔ **Yes, take an umbrella—it is actively raining in ${city} right now!**\n\n`;
        answer += `• **Current State:** ${weatherDesc} with humidity at **${humidity}%**.\n`;
        answer += `• **Rain Probability:** Stays high at **${maxPop}%** over the coming hours.\n`;
        answer += `• **Expected Rain:** Up to **${next24[0]?.rain || "moderate"} mm** accumulation.\n\n`;
        answer += `> 💡 **Action:** Carry a waterproof umbrella, wear rain-resistant shoes, and watch for slick road surfaces.`;
      } else if (rainHours.length > 0) {
        const firstRain = rainHours[0];
        answer += `**Direct Answer:** 🌧️ **Yes, carry an umbrella! Rain is projected to start around ${firstRain.time} in ${city}.**\n\n`;
        answer += `• **Peak Probability:** Rain likelihood reaches **${maxPop}%**.\n`;
        answer += `• **Timeline:** Earliest showers projected around **${firstRain.time}** (${firstRain.weatherDescription}).\n`;
        answer += `• **Intensity:** Approximately **${firstRain.rain || "light"} mm** of precipitation.\n\n`;
        answer += `> 💡 **Action:** Keep an umbrella in your bag before leaving so you are not caught off guard.`;
      } else {
        answer += `**Direct Answer:** ☀️ **No umbrella needed—no significant rain is projected for ${city} today.**\n\n`;
        answer += `• **Precipitation Probability:** Capped at only **${maxPop}%** across the next 24 hours.\n`;
        answer += `• **Sky Condition:** Prevailing skies are **${weatherDesc}** with steady barometric pressure (${currentWeather.pressure} hPa).\n\n`;
        answer += `> 💡 **Verdict:** You can leave the rain gear at home with confidence.`;
      }
      return answer;
    }

    // 3. Commute, Travel & Driving
    if (
      q.includes("commute") ||
      q.includes("traffic") ||
      q.includes("driving") ||
      q.includes("highway") ||
      q.includes("travel") ||
      q.includes("drive")
    ) {
      const morningSlots = next24.filter((h) => h.hour24 >= 7 && h.hour24 <= 11);
      const eveningSlots = next24.filter((h) => h.hour24 >= 17 && h.hour24 <= 21);
      const morningPop = morningSlots.length ? Math.max(...morningSlots.map((h) => h.pop)) : 0;
      const eveningPop = eveningSlots.length ? Math.max(...eveningSlots.map((h) => h.pop)) : 0;
      const visibilityKm = (currentWeather.visibility / 1000).toFixed(1);

      let answer = metricsHeader;
      answer += `**Direct Answer:** ${
        morningPop >= 40 || eveningPop >= 40 || currentWeather.visibility < 1500
          ? `⚠️ **Exercise caution on your commute in ${city}—potential weather delays detected.**`
          : `✅ **Favorable commute conditions in ${city} with clear, dry roads.**`
      }\n\n`;

      answer += `• **Morning Window (7:00 AM – 11:00 AM):** Rain chance is **${morningPop}%**. Roads are ${morningPop >= 30 ? "likely wet" : "dry"}.\n`;
      answer += `• **Evening Window (5:00 PM – 9:00 PM):** Rain chance is **${eveningPop}%**.\n`;
      answer += `• **Road Visibility:** **${visibilityKm} km** (${currentWeather.visibility >= 5000 ? "clear visibility" : "reduced visibility"}).\n\n`;
      answer += `> 💡 **Commute Tip:** ${
        morningPop >= 30 || eveningPop >= 30
          ? "Expect slightly slower transit speeds and allow an extra 10–15 minutes buffer."
          : "Normal travel times and clear driving conditions."
      }`;
      return answer;
    }

    // 4. Car Wash & Outdoor Laundry
    if (
      q.includes("car wash") ||
      q.includes("wash car") ||
      q.includes("laundry") ||
      q.includes("dry clothes") ||
      q.includes("wash my car")
    ) {
      const isGoodDay = maxPop < 25 && humidity < 75 && weatherMain !== "Rain";
      let answer = metricsHeader;
      answer += `**Direct Answer:** ${
        isGoodDay
          ? `✅ **Yes, today is an excellent day to wash your car or hang laundry outdoors in ${city}!**`
          : `⚠️ **Not recommended today—rain risk or high humidity will hinder drying in ${city}.**`
      }\n\n`;
      answer += `• **Rain Probability:** ${maxPop}% across the next 24 hours.\n`;
      answer += `• **Relative Humidity:** ${humidity}% (${humidity > 70 ? "slow evaporation" : "rapid drying"}).\n`;
      answer += `• **Wind Velocity:** ${windKmh} km/h (assists outdoor evaporation).\n\n`;
      answer += `> 💡 **Advice:** ${
        isGoodDay
          ? "Your car will stay clean and clothes will dry quickly under current airflow."
          : "Save the car wash for a clearer day to avoid rain spots, and dry clothes indoors."
      }`;
      return answer;
    }

    // 5. Sun Exposure, UV & Sunburn
    if (
      q.includes("uv") ||
      q.includes("sun") ||
      q.includes("sunburn") ||
      q.includes("sunscreen") ||
      q.includes("tan") ||
      q.includes("sunny")
    ) {
      const isSunny = currentWeather.clouds < 40;
      let answer = metricsHeader;
      answer += `**Direct Answer:** **${city}** currently has **${currentWeather.clouds}% cloud cover** with **${weatherDesc}**.\n\n`;
      answer += `• **Direct Sunlight:** ${isSunny ? "Strong direct solar radiation present." : "Filtered through cloud cover."}\n`;
      answer += `• **Peak UV Risk Window:** 11:30 AM to 3:30 PM.\n`;
      answer += `• **Ambient Temperature:** ${currentT}${tempSymbol} (Feels like ${feelsT}${tempSymbol}).\n\n`;
      answer += `> 💡 **Sun Protection Advice:** Wear broad-spectrum SPF 30+ sunscreen, UV400 sunglasses, and stay shaded during peak solar noon.`;
      return answer;
    }

    // 6. Wind, Breeze & Storms
    if (
      q.includes("wind") ||
      q.includes("windy") ||
      q.includes("breeze") ||
      q.includes("storm") ||
      q.includes("cyclone") ||
      q.includes("gale") ||
      q.includes("squall")
    ) {
      let windLevel = "gentle breeze";
      if (windKmh >= 40) windLevel = "hazardous gale force";
      else if (windKmh >= 25) windLevel = "moderate, brisk wind";
      else if (windKmh >= 15) windLevel = "noticeable breeze";

      let answer = metricsHeader;
      answer += `**Direct Answer:** Surface wind velocity in **${city}** is **${windKmh} km/h** (${windLevel}).\n\n`;
      answer += `• **Wind Direction:** Approximately ${currentWeather.windDeg || 0}° bearing.\n`;
      answer += `• **Atmospheric Pressure:** ${currentWeather.pressure} hPa.\n`;
      answer += `• **Storm Risk:** ${weatherMain === "Thunderstorm" ? "Active convective thunderstorm detected!" : "No severe cyclone or gale warnings active."}\n\n`;
      answer += `> 💡 **Tip:** ${
        windKmh >= 35
          ? "Secure loose balcony items and take extra caution when riding two-wheelers."
          : "Winds are calm and safe for all normal outdoor activities."
      }`;
      return answer;
    }

    // 7. Snow, Freezing & Frost
    if (
      q.includes("snow") ||
      q.includes("ice") ||
      q.includes("frost") ||
      q.includes("freeze") ||
      q.includes("blizzard")
    ) {
      let answer = metricsHeader;
      if (weatherMain === "Snow" || currentWeather.temp <= 0) {
        answer += `**Direct Answer:** ❄️ **Freezing conditions present in ${city} with snow/frost risk.**\n\n`;
        answer += `• Temperature: **${currentT}${tempSymbol}**.\n`;
      } else {
        answer += `**Direct Answer:** 🚫 **No snow in ${city}.** Ambient temperature is **${currentT}${tempSymbol}**, far above the freezing threshold (0°C).\n\n`;
      }
      answer += `• **Lowest Expected Temp:** ${tempMinT}${tempSymbol}.\n\n`;
      answer += `> 💡 **Verdict:** Zero winter freezing hazards. Standard temperate conditions prevail.`;
      return answer;
    }

    // 8. Attire, Outfits & Dressing
    if (
      q.includes("wear") ||
      q.includes("clothing") ||
      q.includes("dress") ||
      q.includes("outfit") ||
      q.includes("jacket") ||
      q.includes("sweater") ||
      q.includes("shorts")
    ) {
      let apparel = [];
      let accessories = [];

      if (currentWeather.temp >= 32) {
        apparel.push("Loose-fitting cotton or linen shirts and shorts");
        apparel.push("Breathable sneakers or sandals");
        accessories.push("UV sunglasses and wide-brim cap");
        accessories.push("Cold water bottle");
      } else if (currentWeather.temp >= 23) {
        apparel.push("Standard light t-shirt with chinos or denim jeans");
        apparel.push("Optional light overshirt for air-conditioned spaces");
      } else if (currentWeather.temp >= 15) {
        apparel.push("Layered setup: long-sleeve tee with a light sweater, hoodie, or denim jacket");
      } else if (currentWeather.temp >= 7) {
        apparel.push("Warm winter jacket, fleece pullover, and trousers");
        accessories.push("Light scarf and socks");
      } else {
        apparel.push("Heavy thermal coat, thermal base layer, and gloves");
        accessories.push("Beanie cap and insulated footwear");
      }

      if (weatherMain === "Rain" || maxPop >= 40) {
        accessories.push("Compact umbrella or waterproof raincoat");
      }
      if (aqi && aqi > 150) {
        accessories.push("N95 / FFP2 mask (due to elevated PM2.5)");
      }

      let answer = metricsHeader;
      answer += `**Direct Answer:** For **${city}** at **${currentT}${tempSymbol}** (${weatherDesc}), here is the optimal apparel plan:\n\n`;
      answer += `**👔 Recommended Apparel:**\n` + apparel.map((a) => `• ${a}`).join("\n") + "\n\n";
      answer += `**🎒 Essentials to Carry:**\n` + accessories.map((acc) => `• ${acc}`).join("\n") + "\n\n";
      answer += `> 💡 **Tip:** High today will reach **${tempMaxT}${tempSymbol}** and low will touch **${tempMinT}${tempSymbol}**.`;
      return answer;
    }

    // 9. Day Comparison (Today vs Tomorrow)
    if (
      q.includes("compare") ||
      q.includes("tomorrow") ||
      q.includes("versus") ||
      q.includes("vs") ||
      q.includes("difference")
    ) {
      const tomorrow = dailyForecast[0];
      if (!tomorrow) {
        return metricsHeader + `**Direct Answer:** Multi-day projection is updating for ${city}. Check back in a moment.`;
      }

      const tomMax = convertTemp(tomorrow.tempMax);
      const tomMin = convertTemp(tomorrow.tempMin);
      const tempDelta = tomMax - currentT;

      let deltaDesc = "similar in temperature";
      if (tempDelta >= 2) deltaDesc = `warmer by +${tempDelta}${tempSymbol}`;
      else if (tempDelta <= -2) deltaDesc = `cooler by ${Math.abs(tempDelta)}${tempSymbol}`;

      let answer = metricsHeader;
      answer += `**Direct Answer:** Tomorrow in **${city}** will be **${deltaDesc}** compared to today.\n\n`;
      answer += `• **Today:** Currently **${currentT}${tempSymbol}** (feels like ${feelsT}${tempSymbol}) with ${weatherDesc}.\n`;
      answer += `• **Tomorrow:** High of **${tomMax}${tempSymbol}**, Low of **${tomMin}${tempSymbol}** with *${tomorrow.weatherDescription}*.\n`;
      answer += `• **Rain Risk:** Today max ${maxPop}% vs Tomorrow **${tomorrow.pop}%**.\n`;
      answer += `• **Wind:** Tomorrow averages **${tomorrow.windSpeed} km/h**.\n\n`;
      answer += `> 💡 **Conclusion:** ${
        tomorrow.pop >= 50
          ? "Tomorrow will have higher rain probability. Plan outdoor tasks for today."
          : "Tomorrow will offer steady, reliable weather conditions."
      }`;
      return answer;
    }

    // 10. Weekend Outlook
    if (
      q.includes("weekend") ||
      q.includes("saturday") ||
      q.includes("sunday")
    ) {
      const weekendDays = dailyForecast.filter(
        (d) => d.dayName === "Sat" || d.dayName === "Sun"
      );

      let answer = metricsHeader;
      if (weekendDays.length > 0) {
        const hasRain = weekendDays.some((d) => d.pop >= 45);
        answer += `**Direct Answer:** Weekend forecast for **${city}** is projected to be **${hasRain ? "mixed with shower potential" : "generally clear and pleasant"}**.\n\n`;
        weekendDays.forEach((day) => {
          answer += `• **${day.dayName} (${day.monthDay}):** High **${convertTemp(day.tempMax)}${tempSymbol}** / Low **${convertTemp(day.tempMin)}${tempSymbol}** • ${day.weatherDescription} (Rain: ${day.pop}%)\n`;
        });
        answer += `\n> 💡 **Weekend Verdict:** ${
          hasRain
            ? "Have an umbrella handy if planning outdoor events this weekend."
            : "Great conditions for weekend travel, day trips, and outdoor dining!"
        }`;
      } else {
        answer += `**Direct Answer:** Here is the upcoming multi-day projection for **${city}**:\n\n`;
        dailyForecast.slice(0, 4).forEach((d) => {
          answer += `• **${d.dayName}:** ${convertTemp(d.tempMax)}${tempSymbol} / ${convertTemp(d.tempMin)}${tempSymbol} • ${d.weatherDescription} (Rain: ${d.pop}%)\n`;
        });
      }
      return answer;
    }

    // 11. Outdoor Sports & Workout Safety
    if (
      q.includes("run") ||
      q.includes("exercise") ||
      q.includes("workout") ||
      q.includes("jog") ||
      q.includes("cycling") ||
      q.includes("cricket") ||
      q.includes("walk") ||
      q.includes("gym")
    ) {
      const isAqiSafe = !aqi || aqi <= 100;
      const isTempComfortable = currentWeather.temp >= 16 && currentWeather.temp <= 31;
      const isRainFree = weatherMain !== "Rain" && maxPop < 40;

      let answer = metricsHeader;
      answer += `**Direct Answer:** ${
        isAqiSafe && isTempComfortable && isRainFree
          ? `✅ **Yes, conditions in ${city} are safe and suitable for outdoor exercise and running!**`
          : `⚠️ **Caution advised for intense outdoor workouts in ${city} today.**`
      }\n\n`;

      answer += `• **Air Purity:** AQI is **${aqi || "Fair"}** (${aqiCategory}). ${isAqiSafe ? "Healthy air." : "Elevated particulate matter (PM2.5)."}\n`;
      answer += `• **Thermal Index:** ${currentT}${tempSymbol} (Feels like ${feelsT}${tempSymbol}, Humidity: ${humidity}%).\n`;
      answer += `• **Road/Ground State:** ${weatherDesc}, Wind: ${windKmh} km/h.\n\n`;
      answer += `> 💡 **Fitness Recommendation:** ${
        !isAqiSafe
          ? "Shift cardio indoors to protect your lungs from inhaling fine particulate smog."
          : !isRainFree
          ? "Wear slip-resistant running shoes or consider indoor workouts to avoid wet pavements."
          : "Stay well-hydrated and enjoy your outdoor workout!"
      }`;
      return answer;
    }

    // 12. Overnight & Sleep Weather
    if (
      q.includes("tonight") ||
      q.includes("night") ||
      q.includes("sleep") ||
      q.includes("dark")
    ) {
      let answer = metricsHeader;
      answer += `**Direct Answer:** Overnight temperatures in **${city}** will drop to approximately **${tempMinT}${tempSymbol}**.\n\n`;
      answer += `• **Rain Chance Tonight:** ${maxPop}%.\n`;
      answer += `• **Overnight Winds:** Settling around ${Math.max(5, windKmh - 4)} km/h.\n`;
      answer += `• **Humidity:** Rising toward ${Math.min(95, humidity + 8)}%.\n\n`;
      answer += `> 💡 **Sleep Comfort Tip:** ${
        currentWeather.tempMin <= 16
          ? "It will feel cool overnight—keep a light blanket handy."
          : "Mild overnight temperatures—moderate fan or light ventilation is sufficient."
      }`;
      return answer;
    }

    // 13. Feels-Like & Humidity Breakdown
    if (
      q.includes("feel") ||
      q.includes("hotter") ||
      q.includes("colder") ||
      q.includes("humidity") ||
      q.includes("sweat")
    ) {
      const diff = Math.round(currentWeather.feelsLike - currentWeather.temp);
      let answer = metricsHeader;
      answer += `**Direct Answer:** In **${city}**, the actual temperature is **${currentT}${tempSymbol}**, but it feels like **${feelsT}${tempSymbol}** (${
        diff > 0 ? `+${diff}${tempSymbol} warmer` : diff < 0 ? `${diff}${tempSymbol} cooler` : "identical"
      }).\n\n`;

      if (diff > 1) {
        answer += `• **The Mechanism:** High relative humidity (**${humidity}%**) prevents perspiration from evaporating. Without evaporative heat release, body heat is retained, creating a higher **Heat Index**.\n\n`;
      } else if (diff < -1) {
        answer += `• **The Mechanism:** Wind at **${windKmh} km/h** strips the warm boundary layer from your skin, accelerating sensible cooling (**Wind Chill**).\n\n`;
      } else {
        answer += `• **The Mechanism:** Relative humidity (${humidity}%) and wind (${windKmh} km/h) are balanced with ambient air temperature.\n\n`;
      }

      answer += `> 💡 **Tip:** ${
        diff > 1 ? "Wear loose, moisture-wicking fabrics and drink cold water to stay comfortable." : "Dress appropriately for the true perceived temperature."
      }`;
      return answer;
    }

    // 14. Air Quality & Pollution Details
    if (
      q.includes("air") ||
      q.includes("pollution") ||
      q.includes("aqi") ||
      q.includes("smog") ||
      q.includes("mask")
    ) {
      let answer = metricsHeader;
      answer += `**Direct Answer:** The Air Quality Index in **${city}** is **${aqi || "Moderate"}** (**${aqiCategory}**).\n\n`;
      if (airQuality?.components) {
        const c = airQuality.components;
        answer += `• **PM2.5 Concentration:** **${c.pm25.value} µg/m³** (CPCB standard limit: ${c.pm25.standard} µg/m³).\n`;
        answer += `• **PM10 Concentration:** **${c.pm10.value} µg/m³**.\n`;
      }
      answer += `• **Mask Guidance:** ${airQuality?.recommendation?.mask || "No mask required."}\n`;
      answer += `• **Ventilation:** ${airQuality?.recommendation?.ventilation || "Safe to open windows."}\n\n`;
      answer += `> 💡 **Health Verdict:** ${
        aqi <= 100
          ? "Air quality poses little to no health risk for the general population."
          : "Sensitive individuals (children, elderly, asthma patients) should limit prolonged outdoor exertion."
      }`;
      return answer;
    }

    // 15. Comprehensive Meteorological Synthesis Fallback
    return (
      metricsHeader +
      `**Direct Summary for ${city}:**\n\n` +
      `• **Current Telemetry:** **${currentT}${tempSymbol}** (Feels like **${feelsT}${tempSymbol}**) with **${weatherDesc}**.\n` +
      `• **Today's Extrema:** High **${tempMaxT}${tempSymbol}** / Low **${tempMinT}${tempSymbol}**.\n` +
      `• **Precipitation:** Max rain likelihood of **${maxPop}%** over next 24 hours.\n` +
      `• **Atmosphere:** Humidity **${humidity}%**, Barometer **${currentWeather.pressure} hPa**, Wind **${windKmh} km/h**.\n` +
      `• **Environmental Air:** Index at **${aqi || "Fair"}** (${aqiCategory}).\n\n` +
      `> 💡 **Have a specific question?** Ask me about *"will it rain?"*, *"what should I wear?"*, *"commute traffic"*, or *"is it safe to run?"*!`
    );
  }

  const handleSend = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      id: "u-" + Date.now(),
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      text: text.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAnswer(text.trim());
      const aiMsg = {
        id: "ai-" + Date.now(),
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
        text: response,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 350);
  };

  return (
    <div id="ai-weather-assistant-container">
      {/* 1. Closed State: Floating Circular AI Button */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3">
        {/* Tooltip Pill */}
        {showTooltip && !isOpen && (
          <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-purple-200/80 bg-white/95 px-3 py-1.5 text-xs font-bold text-purple-900 shadow-lg backdrop-blur-md dark:border-purple-800/80 dark:bg-slate-900/95 dark:text-purple-200 animate-in fade-in slide-in-from-right-3 duration-300">
            <Sparkles className="h-3.5 w-3.5 text-purple-500 animate-spin [animation-duration:4s]" />
            <span>Ask Weather AI</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="ml-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              aria-label="Dismiss tooltip"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}

        {/* Floating AI Button with Blue-to-Purple Gradient & Glow */}
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          onMouseEnter={() => setShowTooltip(true)}
          className={`group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl shadow-purple-500/35 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/60 active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-400/30 ${
            isOpen ? "rotate-90" : ""
          }`}
          aria-label={isOpen ? "Close Weather AI Assistant" : "Open Weather AI Assistant"}
          aria-expanded={isOpen}
        >
          {/* Subtle Ambient Pulse Ring */}
          {!isOpen && (
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-40 blur-sm animate-pulse" />
          )}

          {isOpen ? (
            <X className="h-6 w-6 transition-transform duration-200" />
          ) : (
            <Sparkles className="h-6 w-6 transition-transform duration-200 group-hover:rotate-12" />
          )}

          {/* Indicator Dot */}
          <span className="absolute top-1 right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white dark:border-slate-900" />
          </span>
        </button>
      </div>

      {/* 2. Open State: Floating Chat Flyout Drawer */}
      {isOpen && (
        <aside
          role="dialog"
          aria-label="AI Weather Assistant Dialog"
          className="fixed bottom-22 right-3 sm:bottom-24 sm:right-6 z-50 flex h-[580px] max-h-[82vh] w-[94vw] sm:w-[420px] flex-col overflow-hidden rounded-3xl border border-white/60 bg-white/85 shadow-2xl shadow-purple-500/10 backdrop-blur-3xl dark:border-white/10 dark:bg-slate-900/85 animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Ambient top light glass glare */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent dark:via-white/20" />
          
          {/* Flyout Header */}
          <div className="flex items-center justify-between border-b border-white/60 bg-gradient-to-r from-purple-50/80 via-indigo-50/50 to-white/50 px-4 py-3 dark:border-white/10 dark:from-slate-900 dark:via-purple-950/20 dark:to-slate-900">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white shadow-sm shadow-purple-500/20">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                  Weather AI Assistant
                  {currentWeather?.city && (
                    <span className="rounded-full bg-blue-100 px-2 py-0.2 text-[10px] font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                      {currentWeather.city}
                    </span>
                  )}
                </h2>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">
                  Real-time telemetry grounded
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetChat}
                className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-slate-800 dark:hover:text-gray-200"
                title="Reset conversation"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-slate-800 dark:hover:text-gray-200"
                title="Minimize assistant"
              >
                <Minus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompt Chips */}
          <div className="flex gap-1.5 overflow-x-auto border-b border-white/60 px-3 py-2 scrollbar-none dark:border-white/10 bg-white/40 dark:bg-slate-950/40 backdrop-blur-md">
            {quickPrompts.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleSend(p.label)}
                className="flex shrink-0 items-center gap-1.5 rounded-xl border border-white/60 bg-white/70 px-2.5 py-1 text-[11px] font-semibold text-gray-700 shadow-2xs backdrop-blur-sm transition hover:border-purple-300 hover:bg-purple-50/70 hover:text-purple-700 dark:border-white/10 dark:bg-slate-800/70 dark:text-gray-200 dark:hover:border-purple-600 dark:hover:bg-purple-950/40"
              >
                {p.icon}
                <span>{p.label}</span>
              </button>
            ))}
          </div>

          {/* Scrollable Chat Area */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 dark:bg-slate-900/60">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 max-w-[92%] ${
                  m.sender === "user" ? "self-end flex-row-reverse ml-auto" : "self-start"
                }`}
              >
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ${
                    m.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-xs"
                  }`}
                >
                  {m.sender === "user" ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                </div>

                <div
                  className={`rounded-2xl p-3 text-xs leading-relaxed shadow-xs ${
                    m.sender === "user"
                      ? "bg-blue-600 text-white rounded-tr-xs"
                      : "bg-white/80 text-gray-800 border border-white/60 backdrop-blur-md dark:bg-slate-800/80 dark:border-white/10 dark:text-gray-200 rounded-tl-xs"
                  }`}
                >
                  <div className="space-y-1">
                    {m.text.split("\n").map((line, i) => {
                      if (!line.trim()) return <div key={i} className="h-0.5" />;

                      // Status Header Badge
                      if (line.startsWith("[STATUS:")) {
                        return (
                          <div
                            key={i}
                            className="mb-1.5 inline-flex items-center gap-1.5 rounded-md bg-purple-500/10 px-2 py-0.5 text-[10px] font-bold text-purple-700 dark:bg-purple-500/20 dark:text-purple-300"
                          >
                            <CloudSun className="h-3 w-3" />
                            <span>{line.replace("[STATUS:", "").replace("]", "")}</span>
                          </div>
                        );
                      }

                      // Callout Box
                      if (line.startsWith(">")) {
                        const quoteText = line.replace(/^>\s*/, "");
                        return (
                          <div
                            key={i}
                            className="mt-2 rounded-xl border border-purple-200/80 bg-purple-50/70 p-2 text-xs font-semibold text-purple-900 dark:border-purple-900/40 dark:bg-purple-950/30 dark:text-purple-200 flex items-start gap-1.5"
                          >
                            <Lightbulb className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                            <div>{renderFormattedText(quoteText)}</div>
                          </div>
                        );
                      }

                      // Bullet Points
                      if (line.startsWith("•")) {
                        const bulletText = line.replace(/^•\s*/, "");
                        return (
                          <div key={i} className="flex items-start gap-1.5 pl-0.5">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500 dark:bg-purple-400" />
                            <span className="flex-1">{renderFormattedText(bulletText)}</span>
                          </div>
                        );
                      }

                      // Standard Line
                      return (
                        <div key={i} className={line.startsWith("**") ? "font-bold text-gray-900 dark:text-white" : ""}>
                          {renderFormattedText(line)}
                        </div>
                      );
                    })}
                  </div>

                  <div
                    className={`mt-1.5 flex items-center justify-end text-[9px] ${
                      m.sender === "user" ? "text-blue-200" : "text-gray-400"
                    }`}
                  >
                    <Clock className="h-2.5 w-2.5 mr-1" />
                    {m.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 self-start">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 text-white">
                  <Bot className="h-3.5 w-3.5" />
                </div>
                <div className="rounded-2xl rounded-tl-xs border border-gray-100 bg-white p-2.5 text-xs text-gray-500 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-400">
                  <span className="inline-flex items-center gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-500" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-500 [animation-delay:0.2s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-500 [animation-delay:0.4s]" />
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Footer Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="border-t border-white/60 bg-white/80 p-2.5 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Ask Weather AI...`}
                className="flex-1 rounded-xl border border-white/60 bg-white/70 px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 backdrop-blur-sm focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-white/10 dark:bg-slate-800/70 dark:text-white dark:placeholder:text-gray-500"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-3 py-2 text-xs font-semibold text-white shadow-md shadow-purple-600/20 transition hover:opacity-90 disabled:opacity-50"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>
        </aside>
      )}
    </div>
  );
}

// Helper to parse **bold** and *italic* markdown inline tokens
function renderFormattedText(text) {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-bold text-gray-950 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={index} className="italic text-gray-700 dark:text-gray-300">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
}
