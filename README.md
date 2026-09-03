# 🌤️ WeatherNow — Real-Time Weather Forecast

> **B.Tech CSE Mini Project** — A modern, responsive weather web application built with Next.js, React, TypeScript, and Tailwind CSS.

## 📋 Project Description

WeatherNow is a full-featured weather application that provides real-time weather data and 5-day forecasts for cities worldwide. Users can search for any city, use their current location, save favorite cities, and toggle between Celsius and Fahrenheit. The UI dynamically responds to weather conditions with themed backgrounds.

## ✨ Features

- 🔍 **City Search** — Search any city worldwide with instant results
- 📍 **Current Location** — One-click geolocation weather
- 🌡️ **Current Weather** — Temperature, humidity, wind, pressure, visibility, sunrise/sunset
- 📅 **5-Day Forecast** — Daily forecast with min/max temperatures and rain probability
- ⭐ **Favorite Cities** — Save and quickly access favorite locations
- 🕐 **Recent Searches** — Access last 5 searched cities
- 🌙 **Dark/Light Mode** — System-aware theme toggle
- 🎨 **Dynamic Backgrounds** — UI adapts to weather conditions (clear, rain, snow, etc.)
- °C/°F **Temperature Toggle** — Switch between Celsius and Fahrenheit
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop
- ♿ **Accessible** — Semantic HTML, ARIA labels, keyboard navigation

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js](https://nextjs.org/) | React framework with App Router |
| [React](https://react.dev/) | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |
| [Framer Motion](https://www.framer.com/motion/) | Animations (Aceternity UI) |
| [Lucide React](https://lucide.dev/) | Icon library |
| [next-themes](https://github.com/pacocoursey/next-themes) | Dark/light mode |
| [OpenWeatherMap API](https://openweathermap.org/api) | Weather data |

## 📸 Screenshots

> _Add screenshots here after running the application._

## 🚀 Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- npm (comes with Node.js)
- OpenWeatherMap API key (free tier)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/weather-now.git
   cd weather-now
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Add your API key**
   
   Open `.env.local` and add your OpenWeatherMap API key:
   ```
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_actual_api_key_here
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   
   Visit [http://localhost:3000](http://localhost:3000)

## 🔑 API Setup

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to API Keys section
4. Copy your API key
5. Add it to `.env.local` as shown above

> **Note**: Free tier allows 60 calls/minute and 1,000,000 calls/month — more than enough for development and demo purposes.

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 🏗️ Project Structure

```
weather-now/
├── .env.example          # Environment variable template
├── .env.local            # Local env (not committed)
├── .gitignore
├── README.md
├── next.config.ts
├── package.json
├── tsconfig.json
├── docs/
│   └── PROJECT_DOCUMENTATION.md
├── src/
│   ├── app/
│   │   ├── globals.css   # Tailwind theme & animations
│   │   ├── layout.tsx    # Root layout with SEO
│   │   └── page.tsx      # Main page
│   ├── components/
│   │   ├── ThemeProvider.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── ui/           # Aceternity UI components
│   │   │   ├── meteors.tsx
│   │   │   ├── moving-border.tsx
│   │   │   ├── skeleton.tsx
│   │   │   └── spotlight.tsx
│   │   └── weather/      # Weather feature components
│   │       ├── CurrentWeather.tsx
│   │       ├── FavoriteCities.tsx
│   │       ├── Forecast.tsx
│   │       ├── ForecastCard.tsx
│   │       ├── LoadingWeather.tsx
│   │       ├── LocationButton.tsx
│   │       ├── RecentSearches.tsx
│   │       ├── TemperatureToggle.tsx
│   │       ├── WeatherBackground.tsx
│   │       ├── WeatherError.tsx
│   │       ├── WeatherIcon.tsx
│   │       └── WeatherSearch.tsx
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   └── useWeather.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   └── weather-api.ts
│   └── types/
│       └── weather.ts
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variable: `NEXT_PUBLIC_OPENWEATHER_API_KEY`
5. Deploy

### Manual Build

```bash
npm run build
npm run start
```

## 🔮 Future Enhancements

- 📊 Weather charts and graphs
- 🗺️ Interactive weather map
- 🔔 Weather alerts and notifications
- 📱 Progressive Web App (PWA) support
- 🌐 Multi-language support
- 📧 Weather email digests
- 🤖 AI-powered weather insights
- 📈 Historical weather data

## 👤 Author

**Your Name**

B.Tech CSE Student

---

> Built with ❤️ using Next.js, React, and Tailwind CSS
