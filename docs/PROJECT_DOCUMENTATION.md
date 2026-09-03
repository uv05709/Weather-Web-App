# WeatherNow — Project Documentation

## B.Tech CSE Mini Project Report

---

## 1. Abstract

WeatherNow is a modern, responsive weather web application developed as a B.Tech Computer Science Engineering mini project. The application leverages the OpenWeatherMap API to provide real-time weather data and 5-day forecasts for cities worldwide. Built using Next.js, React, TypeScript, and Tailwind CSS, the application demonstrates proficiency in modern web development practices including responsive design, API integration, state management, and user experience design. The application features city search, geolocation support, favorite cities, search history, dark/light mode, and dynamic weather-responsive UI themes.

---

## 2. Introduction

Weather information is one of the most commonly sought types of data on the internet. People check weather conditions daily for planning activities, travel, agriculture, and safety. This project aims to create a user-friendly weather application that provides accurate, real-time weather information in a visually appealing and intuitive interface.

The project demonstrates the practical application of web development concepts taught in the B.Tech CSE curriculum, including frontend frameworks, API integration, responsive design, and software engineering principles.

---

## 3. Problem Statement

Existing weather applications often suffer from:
- Cluttered interfaces with excessive advertisements
- Poor mobile responsiveness
- Lack of personalization features
- Unintuitive user interfaces
- Slow loading times due to unnecessary dependencies

There is a need for a clean, modern, and feature-rich weather application that prioritizes user experience while maintaining performance and accessibility.

---

## 4. Objectives

1. Develop a responsive weather web application using modern technologies
2. Integrate real-time weather data from the OpenWeatherMap API
3. Implement intuitive search functionality for global cities
4. Provide 5-day weather forecasts with detailed meteorological data
5. Enable geolocation-based weather lookup
6. Implement personalization through favorites and search history
7. Create an accessible, theme-switchable user interface
8. Ensure code quality through TypeScript and component-based architecture

---

## 5. Scope

### In Scope
- Real-time current weather display
- 5-day weather forecast
- City search functionality
- Browser geolocation integration
- Favorite cities management
- Search history tracking
- Dark/light mode theme switching
- Weather-responsive dynamic backgrounds
- Temperature unit conversion (°C/°F)
- Responsive design for all device sizes

### Out of Scope
- User authentication and accounts
- Backend server/database
- Push notifications
- Weather maps
- Historical weather data
- Multi-language support

---

## 6. Proposed System

The proposed system is a single-page web application built with Next.js and React that communicates with the OpenWeatherMap API to fetch and display weather data. The application uses client-side storage (localStorage) for persistence and runs entirely in the browser without requiring a backend server or database.

### Key Components:
- **Frontend**: Next.js with React, TypeScript, Tailwind CSS
- **API**: OpenWeatherMap REST API
- **Storage**: Browser localStorage
- **Hosting**: Vercel (recommended)

---

## 7. Existing System

Current weather applications in the market include:
- **Weather.com**: Feature-rich but cluttered with ads
- **AccuWeather**: Good data but heavy application
- **Google Weather**: Simple but limited features
- **Apple Weather**: Platform-specific (iOS/macOS only)

### Limitations of Existing Systems:
- Advertisement-heavy interfaces
- Platform dependency
- Heavy resource consumption
- Limited personalization
- Complex navigation

---

## 8. Advantages

1. **No advertisements** — Clean, distraction-free interface
2. **Cross-platform** — Works on any device with a web browser
3. **Lightweight** — Minimal dependencies and optimized performance
4. **Open source** — Code is available for review and modification
5. **Privacy-friendly** — No user tracking, data stored locally
6. **Modern UI** — Professional design with smooth animations
7. **Accessible** — Follows WCAG accessibility guidelines
8. **Easy deployment** — One-click deployment to Vercel

---

## 9. Technology Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| Framework | Next.js | 16.x | React framework with App Router, SSR, optimization |
| UI Library | React | 19.x | Component-based UI development |
| Language | TypeScript | 5.x | Type-safe JavaScript superset |
| Styling | Tailwind CSS | 4.x | Utility-first CSS framework |
| Animation | Framer Motion | 12.x | Smooth UI animations |
| Icons | Lucide React | Latest | Open-source icon library |
| Theme | next-themes | Latest | Dark/light mode management |
| API | OpenWeatherMap | 2.5 | Weather data provider |
| Linting | ESLint | 9.x | Code quality enforcement |

---

## 10. System Requirements

### Development Environment
- **OS**: Windows 10/11, macOS, or Linux
- **Node.js**: v18.0 or later
- **npm**: v9.0 or later
- **Code Editor**: VS Code (recommended)
- **Browser**: Chrome, Firefox, Edge, or Safari (latest versions)

### Production Environment
- **Hosting**: Vercel, Netlify, or any static hosting platform
- **SSL**: HTTPS required for geolocation API

### User Requirements
- Modern web browser with JavaScript enabled
- Internet connection for API requests
- Geolocation permission (optional, for location-based weather)

---

## 11. Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | Search weather by city name | High |
| FR-02 | Display current weather conditions | High |
| FR-03 | Display 5-day weather forecast | High |
| FR-04 | Get weather by current location | Medium |
| FR-05 | Toggle temperature units (°C/°F) | Medium |
| FR-06 | Save favorite cities | Medium |
| FR-07 | Track recent searches | Medium |
| FR-08 | Switch between dark and light themes | Medium |
| FR-09 | Display weather-responsive backgrounds | Low |
| FR-10 | Handle errors gracefully | High |

---

## 12. Non-Functional Requirements

| ID | Requirement | Target |
|---|---|---|
| NFR-01 | Page load time | < 3 seconds |
| NFR-02 | Mobile responsiveness | 320px to 1440px+ |
| NFR-03 | Accessibility | WCAG 2.1 AA compliance |
| NFR-04 | Browser support | Last 2 versions of major browsers |
| NFR-05 | API response handling | < 5 seconds timeout |
| NFR-06 | Offline graceful degradation | Show cached data / error message |
| NFR-07 | Security | No API key exposure in source |

---

## 13. System Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Browser (Client)                  │
│                                                     │
│  ┌───────────────────────────────────────────────┐  │
│  │              Next.js Application               │  │
│  │                                                │  │
│  │  ┌─────────┐  ┌──────────┐  ┌─────────────┐  │  │
│  │  │  Pages   │  │Components│  │   Hooks     │  │  │
│  │  │(page.tsx)│  │(UI/Weather│  │(useWeather) │  │  │
│  │  │         │  │ /Layout) │  │(useStorage) │  │  │
│  │  └────┬────┘  └────┬─────┘  └──────┬──────┘  │  │
│  │       │             │               │          │  │
│  │       └─────────────┼───────────────┘          │  │
│  │                     │                          │  │
│  │              ┌──────┴──────┐                   │  │
│  │              │  API Layer  │                   │  │
│  │              │(weather-api)│                   │  │
│  │              └──────┬──────┘                   │  │
│  │                     │                          │  │
│  │              ┌──────┴──────┐                   │  │
│  │              │ localStorage│                   │  │
│  │              │  (Persist)  │                   │  │
│  │              └─────────────┘                   │  │
│  └───────────────────────────────────────────────┘  │
│                        │                             │
└────────────────────────┼─────────────────────────────┘
                         │ HTTPS
                         ▼
              ┌──────────────────┐
              │  OpenWeatherMap  │
              │    REST API      │
              │  (api.openweathermap.org)
              └──────────────────┘
```

---

## 14. Data Flow

1. **User Input** → User types city name or clicks "Use My Location"
2. **Validation** → Input is validated (non-empty, sanitized)
3. **API Request** → `weather-api.ts` makes fetch request to OpenWeatherMap
4. **Response Processing** → Raw API response is parsed into typed TypeScript interfaces
5. **State Update** → React state is updated via `useWeather` hook
6. **UI Render** → Components re-render with new weather data
7. **Persistence** → Recent searches and favorites are saved to localStorage

---

## 15. API Description

### OpenWeatherMap API v2.5

#### Current Weather
- **Endpoint**: `GET /data/2.5/weather`
- **Parameters**: `q` (city), `lat`/`lon` (coordinates), `units` (metric), `appid` (API key)
- **Response**: Temperature, humidity, wind, pressure, visibility, weather condition, sunrise/sunset

#### 5-Day Forecast
- **Endpoint**: `GET /data/2.5/forecast`
- **Parameters**: Same as current weather
- **Response**: 3-hour interval forecasts for 5 days (40 data points)
- **Processing**: Aggregated into daily forecasts with min/max/avg temperatures

---

## 16. Module Description

### 1. API Layer (`lib/weather-api.ts`)
Abstracts all OpenWeatherMap API interactions. Handles request construction, response parsing, and error classification.

### 2. Custom Hooks (`hooks/`)
- **useWeather**: Central state management for weather data, search, favorites, and temperature conversion
- **useLocalStorage**: Generic hook for safe browser storage with SSR hydration handling

### 3. UI Components (`components/ui/`)
Adapted Aceternity UI components for visual effects: Spotlight, Meteors, MovingBorder, Skeleton

### 4. Weather Components (`components/weather/`)
Feature-specific components: Search, CurrentWeather, Forecast, Stats, Favorites, RecentSearches, etc.

### 5. Layout Components (`components/layout/`)
Header with navigation and theme toggle; Footer with attribution

### 6. Types (`types/weather.ts`)
TypeScript interfaces defining data shapes for weather, forecast, favorites, and errors

---

## 17. Database Justification — Why No Database Is Required

This application **does not require a database** for the following reasons:

1. **No user accounts**: The application has no authentication or user registration
2. **API-driven data**: All weather data is fetched in real-time from OpenWeatherMap's servers
3. **Client-side persistence**: Favorites and search history are stored in the browser's localStorage, which is sufficient for individual user preferences
4. **Stateless architecture**: Each page load fetches fresh data from the API — no server-side data storage is needed
5. **Privacy**: Storing data locally means user preferences never leave their device
6. **Simplicity**: Eliminating a database reduces complexity, hosting costs, and maintenance burden

If the application were to scale to include user accounts, shared favorites, or weather alerts, a database would become necessary.

---

## 18. Testing

### Test Cases

| # | Test Case | Steps | Expected Result | Status |
|---|---|---|---|---|
| 1 | Valid city search | Type "Varanasi", press Enter | Weather data displayed | ✅ |
| 2 | Invalid city search | Type "xyzabc", press Enter | "City not found" error | ✅ |
| 3 | Empty search | Submit empty input | Validation error shown | ✅ |
| 4 | API error handling | Disconnect internet, search | "Connection error" shown | ✅ |
| 5 | Temperature toggle | Click °F toggle | All temps switch to Fahrenheit | ✅ |
| 6 | Current location | Click "Use My Location" | Location weather displayed | ✅ |
| 7 | Add favorite | Click heart icon | City added to favorites | ✅ |
| 8 | Remove favorite | Click X on favorite card | City removed from favorites | ✅ |
| 9 | Recent searches | Search multiple cities | Last 5 shown in Recent | ✅ |
| 10 | Dark mode toggle | Click moon icon | UI switches to dark theme | ✅ |
| 11 | Page refresh | Refresh after searching | Favorites/history persisted | ✅ |
| 12 | Mobile layout | Resize to 375px | All elements responsive | ✅ |
| 13 | Missing API key | Remove API key | Setup instructions shown | ✅ |

---

## 19. Results

The WeatherNow application successfully meets all project objectives:

- **Functional**: All 10 functional requirements implemented and working
- **Responsive**: Tested across mobile (320px), tablet (768px), and desktop (1440px)
- **Performant**: Page loads in under 2 seconds, API responses handled efficiently
- **Accessible**: Semantic HTML, ARIA labels, keyboard navigation, proper color contrast
- **Maintainable**: Clean TypeScript code with modular component architecture

---

## 20. Limitations

1. **API rate limiting**: Free tier allows 60 requests per minute
2. **No offline mode**: Requires internet connection for weather data
3. **No user accounts**: Preferences are device-specific (localStorage)
4. **Limited forecast**: 5-day forecast only (API limitation on free tier)
5. **No weather alerts**: Push notifications not implemented
6. **No weather maps**: Interactive map visualization not included

---

## 21. Future Scope

1. **Progressive Web App (PWA)**: Enable offline caching and installability
2. **Weather Maps**: Interactive maps with radar and satellite imagery
3. **Weather Alerts**: Push notifications for severe weather
4. **Historical Data**: Past weather trends and analytics
5. **Multi-language**: Internationalization for global users
6. **Air Quality Index**: AQI data integration
7. **Weather Charts**: Graphical temperature and precipitation trends
8. **Social Sharing**: Share weather conditions on social media
9. **Widget Support**: Embeddable weather widget for other websites
10. **Voice Search**: Search cities using voice commands

---

## 22. Conclusion

WeatherNow demonstrates the successful application of modern web development technologies to create a practical, user-friendly weather application. The project showcases proficiency in React component architecture, TypeScript type safety, responsive CSS design, API integration, and software engineering best practices. The modular codebase ensures maintainability and extensibility for future enhancements.

The project fulfills all requirements for a B.Tech CSE mini project, demonstrating both technical competence and practical problem-solving abilities.

---

## 23. References

1. Next.js Documentation — https://nextjs.org/docs
2. React Documentation — https://react.dev
3. TypeScript Handbook — https://www.typescriptlang.org/docs
4. Tailwind CSS Documentation — https://tailwindcss.com/docs
5. OpenWeatherMap API Documentation — https://openweathermap.org/api
6. Framer Motion Documentation — https://www.framer.com/motion
7. Lucide Icons — https://lucide.dev
8. MDN Web Docs (Geolocation API) — https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
9. Web Content Accessibility Guidelines (WCAG) 2.1 — https://www.w3.org/WAI/WCAG21/quickref
10. Vercel Deployment Documentation — https://vercel.com/docs
