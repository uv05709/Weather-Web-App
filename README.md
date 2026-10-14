# 🌦️ WeatherNow --- Real-Time Weather Forecast

```{=html}
<p align="center">
```
`<strong>`{=html}A responsive weather dashboard for checking current
conditions and forecasts around the world.`</strong>`{=html}
`<br />`{=html} Built with Next.js, React, and Tailwind CSS.
```{=html}
</p>
```
```{=html}
<p align="center">
```
`<a href="https://weather-web-app-eight-beryl.vercel.app/">`{=html}Live
Demo`</a>`{=html} ·
`<a href="https://github.com/uv05709/Weather-Web-App">`{=html}Source
Code`</a>`{=html} ·
`<a href="https://openweathermap.org/api">`{=html}Weather
API`</a>`{=html}
```{=html}
</p>
```

------------------------------------------------------------------------

## Table of Contents

-   [Overview](#overview)
-   [Project Goals](#project-goals)
-   [Features](#features)
-   [Technology Stack](#technology-stack)
-   [How the Application Works](#how-the-application-works)
-   [Architecture](#architecture)
-   [Project Structure](#project-structure)
-   [Getting Started](#getting-started)
-   [Environment Configuration](#environment-configuration)
-   [Available Commands](#available-commands)
-   [Deployment on Vercel](#deployment-on-vercel)
-   [Error Handling and
    Troubleshooting](#error-handling-and-troubleshooting)
-   [Security and Privacy Notes](#security-and-privacy-notes)
-   [Known Scope and Limitations](#known-scope-and-limitations)
-   [Future Improvements](#future-improvements)
-   [Learning Outcomes](#learning-outcomes)
-   [Contributing](#contributing)
-   [Acknowledgements](#acknowledgements)
-   [License](#license)

## Overview

**WeatherNow** is a weather web application developed as a B.Tech
Computer Science Engineering mini project. It gives users a
straightforward interface for looking up weather information for a city
or, with permission, their current location.

The application is designed around three priorities:

1.  **Clarity:** present useful weather information in a single
    dashboard.
2.  **Convenience:** make city lookup, recent searches, favorites, and
    temperature-unit switching easy to access.
3.  **Responsive interaction:** provide a usable interface across
    desktop, tablet, and mobile screens.

Weather data is supplied by the OpenWeatherMap service. The application
is deployed on Vercel.

### Project links

  Resource            Link
  ------------------- -------------------------------------------------
  Live application    https://weather-web-app-eight-beryl.vercel.app/
  GitHub repository   https://github.com/uv05709/Weather-Web-App
  Weather provider    https://openweathermap.org/api

## Project Goals

-   Build a modern, responsive user interface with reusable UI
    components.
-   Integrate a third-party REST API to retrieve current weather and
    forecast data.
-   Support searching for cities and looking up weather using browser
    geolocation.
-   Make common preferences convenient through saved cities and recent
    searches.
-   Provide Celsius/Fahrenheit display options and a theme-aware
    interface.
-   Practice maintainable frontend development, API integration, error
    states, and deployment.

## Features

### 🌍 City search

Search for a city by name to retrieve its weather information. Clear
validation and useful error feedback are important for empty input,
unknown locations, and failed requests.

### 📍 Current-location weather

The **Use My Location** action can use the browser Geolocation API to
obtain coordinates. Browsers generally require permission and a secure
context (HTTPS, or localhost during development). If permission is
denied or location services are unavailable, users can search by city
instead.

### 🌡️ Current conditions

The dashboard is intended to surface the most useful current-weather
details, including temperature, weather conditions, humidity, wind,
pressure, visibility, and sunrise/sunset information where returned by
the API.

### 📅 Five-day forecast

The forecast view summarizes upcoming weather so users can compare
conditions across days. OpenWeatherMap forecast endpoints can return
time-step data; the application must aggregate or present those records
appropriately for a daily summary.

### ⭐ Favorite cities

Save frequently checked locations for quicker access later. Favorites
are intended as a convenience feature rather than a user-account system.

### 🕘 Recent searches

Keep a short list of recently searched cities so users can revisit
locations without entering the same query repeatedly. The documented
design keeps the five most recent searches.

### 🌡️ Celsius and Fahrenheit

Switch the temperature display between °C and °F. Unit conversion should
be applied consistently to the current conditions and forecast values,
while non-temperature measurements retain their own units.

### 🌗 Theme-aware interface

The application includes dark/light theme support and weather-responsive
visual styling. These features help the interface remain readable while
making the experience feel connected to current conditions.

### 📱 Responsive and accessible UI

The interface is designed for different viewport sizes and should
support semantic HTML, keyboard interaction, clear focus states,
accessible labels, and adequate color contrast.

> Feature descriptions reflect the project documentation and public app
> interface. Exact data fields can vary with API responses and the
> current implementation.

## Technology Stack

  -----------------------------------------------------------------------------------------------
  Technology                                                  Role
  ----------------------------------------------------------- -----------------------------------
  [Next.js](https://nextjs.org/docs)                          Application framework, routing, and
                                                              production build

  [React](https://react.dev/)                                 Component-based user interface

  [Tailwind CSS](https://tailwindcss.com/docs)                Utility-first styling

  [OpenWeatherMap](https://openweathermap.org/api)            External weather-data provider

  [Framer Motion](https://www.framer.com/motion/)             UI animation

  [Lucide React](https://lucide.dev/)                         Interface icons

  [next-themes](https://github.com/pacocoursey/next-themes)   Theme management

  [ESLint](https://eslint.org/)                               Static analysis and code-quality
                                                              checks

  [Vercel](https://vercel.com/docs)                           Hosting and deployment
  -----------------------------------------------------------------------------------------------

The repository's `package.json` currently defines the `dev`, `build`,
`start`, and `lint` scripts and lists Next.js, React, Tailwind CSS,
Framer Motion, Lucide React, `next-themes`, `clsx`, and `tailwind-merge`
among its dependencies.

**Repository audit note:** the existing README describes TypeScript and
a TypeScript-based folder layout, but the published `package.json` does
not list `typescript` as a dependency. Confirm the actual source
extensions and install/configuration before treating TypeScript as a
verified part of the current build.

## How the Application Works

At a high level, a weather lookup follows this sequence:

1.  **User action:** the user searches for a city or requests their
    current location.
2.  **Input/location handling:** the app validates the query or obtains
    coordinates from the browser, subject to permission.
3.  **Weather request:** the weather API layer sends a request to
    OpenWeatherMap using the configured API key and location parameters.
4.  **Response handling:** the response is checked and transformed into
    values the UI can display.
5.  **State update:** React updates the relevant weather and
    loading/error state.
6.  **Rendering:** the dashboard and forecast components display the new
    data.
7.  **Preference persistence:** favorites and recent searches can be
    saved in browser storage so they remain available after a refresh on
    the same browser.

``` mermaid
flowchart TD
    A[User opens WeatherNow] --> B{Choose a location}
    B -->|Search city| C[Validate city query]
    B -->|Use my location| D[Request browser geolocation]
    C --> E[Weather API request]
    D --> E
    E --> F{Request successful?}
    F -->|Yes| G[Process weather response]
    G --> H[Update application state]
    H --> I[Render current weather and forecast]
    F -->|No| J[Show a useful error state]
    I --> K[Save local preferences when applicable]
```

## Architecture

WeatherNow is primarily a client-facing web application backed by a
third-party weather API. The documented design does not require a
dedicated application database or custom backend for the core weather
lookup and local preference features.

### Main layers

-   **Presentation layer:** page, layout, navigation, search controls,
    weather cards, forecast cards, theme, and responsive styling.
-   **Application/state layer:** coordinates user actions, loading
    states, weather results, temperature units, favorites, and recent
    searches.
-   **API integration layer:** builds weather requests, handles
    responses, and reports errors.
-   **Browser capabilities:** geolocation for location-based lookup and
    local storage for device-specific preferences.
-   **External service:** OpenWeatherMap provides the weather
    information.
-   **Deployment layer:** Vercel serves the deployed application.

### Why no database is needed for the core version

Weather data comes from the external provider, and the documented
favorites/recent-search functionality is local to the browser. Without
user accounts, cross-device syncing, or server-managed records, a
database would add operational complexity without being necessary for
the main use cases.

This also means local preferences are browser-specific: clearing browser
data or switching devices may remove or hide them.

## Project Structure

The existing README documents the following logical organization.
**Check the actual checkout before relying on every path**, because the
published repository tree and dependency manifest should be kept aligned
with this documentation.

``` text
Weather-Web-App/
├── docs/
│   └── PROJECT_DOCUMENTATION.md
├── public/                   # Static assets
├── src/
│   ├── app/                  # App entry, page, global styles
│   ├── components/
│   │   ├── layout/           # Shared header/footer
│   │   ├── ui/               # Reusable visual components
│   │   └── weather/          # Weather-specific interface
│   ├── hooks/                # Shared state/persistence logic
│   ├── lib/                  # API and utility functions
│   └── types/                # Shared data types, if present
├── .gitignore
├── eslint.config.mjs
├── next.config.mjs
├── package.json
├── package-lock.json
└── README.md
```

### Suggested module responsibilities

  -----------------------------------------------------------------------
  Module                              Responsibility
  ----------------------------------- -----------------------------------
  App/page entry                      Compose the main page and
                                      coordinate major sections

  Weather search                      Accept and submit a city query

  Location control                    Request geolocation and pass
                                      coordinates to the weather lookup

  Current-weather view                Present the current conditions

  Forecast view/cards                 Present upcoming forecast periods

  Favorites/recent searches           Display and update saved locations
                                      and search history

  Weather API module                  Keep external request details
                                      separate from UI components

  Persistence hook/utilities          Read/write local preferences safely
                                      in the browser

  Theme provider                      Coordinate dark/light appearance
  -----------------------------------------------------------------------

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) compatible with the installed Next.js
    version
-   npm
-   An OpenWeatherMap API key
-   A modern browser and an internet connection

> Use the Node.js version supported by the installed Next.js release. If
> the app fails to start on an older runtime, check the Next.js
> installation requirements before changing dependencies.

### 1. Clone the repository

``` bash
git clone https://github.com/uv05709/Weather-Web-App.git
cd Weather-Web-App
```

### 2. Install dependencies

``` bash
npm install
```

### 3. Configure the API key

Create a local environment file named `.env.local` in the repository
root and add the variable expected by the current app:

``` dotenv
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweathermap_api_key
```

If the source code reads a differently named variable, use that exact
name instead. Do not commit `.env.local`.

### 4. Start the development server

``` bash
npm run dev
```

### 5. Open the app

Visit <http://localhost:3000>.

## Environment Configuration

  -----------------------------------------------------------------------------------
  Variable                            Purpose                 Required
  ----------------------------------- ----------------------- -----------------------
  `NEXT_PUBLIC_OPENWEATHER_API_KEY`   Supplies the            Yes for live API
                                      OpenWeatherMap key to   requests
                                      client-side weather     
                                      requests, if this is    
                                      the variable used in    
                                      the source              

  -----------------------------------------------------------------------------------

Obtain a key through the [OpenWeatherMap API
portal](https://openweathermap.org/api). Check your provider account for
current access, quota, and endpoint availability.

**Important:** in Next.js, variables prefixed with `NEXT_PUBLIC_` can be
exposed in browser-delivered JavaScript. Treat this as a public
client-side key, not as a secret. Restrict the key where the provider
supports it and monitor usage. For stronger protection, move requests
behind a server-side route or backend and keep the private key in a
non-public environment variable.

If the repository does not contain an `.env.example` file, create
`.env.local` manually as shown above, or add a sanitized `.env.example`
containing only the variable name and a placeholder.

## Available Commands

The scripts currently declared in `package.json` are:

  Command           Description
  ----------------- --------------------------------------------
  `npm run dev`     Start the local Next.js development server
  `npm run build`   Create a production build
  `npm run start`   Serve the production build
  `npm run lint`    Run ESLint

Before deploying, run:

``` bash
npm run lint
npm run build
```

Resolve any reported lint or build errors before publishing. Automated
test scripts are not currently declared in the published `package.json`.

## Deployment on Vercel

The production app is hosted at
[weather-web-app-eight-beryl.vercel.app](https://weather-web-app-eight-beryl.vercel.app/).

To deploy your own copy:

1.  Push the repository to GitHub.
2.  Import the repository into [Vercel](https://vercel.com/).
3.  Confirm the framework is detected as Next.js.
4.  Add the weather API environment variable in the Vercel project
    settings.
5.  Ensure the variable is available to the appropriate deployment
    environment.
6.  Deploy and open the generated URL.
7.  Test city search, geolocation over HTTPS, favorites, theme
    switching, and temperature conversion in the deployed version.

When changing environment variables, trigger a new deployment if
required so the deployed build receives the updated configuration.

## Error Handling and Troubleshooting

  -----------------------------------------------------------------------
  Symptom                 Possible cause          What to check
  ----------------------- ----------------------- -----------------------
  Weather data does not   Missing/invalid API     Check `.env.local`,
  load                    key, quota, or network  provider access,
                          issue                   browser console, and
                                                  Network panel

  City is not found       Misspelled or ambiguous Try a city name with
                          city name               its country or region

  Geolocation fails       Permission denied,      Allow location access
                          insecure context, or    on HTTPS, or search by
                          device location         city
                          unavailable             

  API returns an          Incorrect key or        Verify the key and the
  authorization error     provider access not     endpoint's availability
                          enabled                 in your account

  Changes do not appear   Old deployment or       Inspect deployment logs
  on Vercel               missing environment     and redeploy after
                          variable                configuration changes

  `npm run build` fails   Runtime/dependency      Check Node.js
                          mismatch or code error  compatibility and the
                                                  first relevant build
                                                  error

  Favorites/history       Browser storage was     Check browser privacy
  disappear               cleared or a different  settings; local storage
                          browser/device is used  is not cloud-synced
  -----------------------------------------------------------------------

## Security and Privacy Notes

-   Do not commit API keys, tokens, or personal secrets.
-   A `NEXT_PUBLIC_` environment variable is public in the browser
    bundle; do not use it as a secret-storage mechanism.
-   Geolocation should be requested only after a user action and should
    explain why location access is useful.
-   Handle API errors without exposing keys or internal implementation
    details in messages.
-   Local storage is accessible to JavaScript running on the same
    origin. Store only non-sensitive preferences there.
-   Review the weather provider's terms, attribution requirements,
    quotas, and privacy policy before public or commercial use.

## Known Scope and Limitations

The project documentation describes a focused weather dashboard rather
than a full meteorological platform. The following are current scope
boundaries unless the implementation has since changed:

-   No user registration or cross-device account synchronization.
-   Favorites and recent searches are device/browser-specific when
    stored locally.
-   Live weather information requires an internet connection and a
    functioning provider API.
-   API access and forecast detail depend on the OpenWeatherMap plan and
    endpoint used.
-   Push alerts, historical weather analytics, and interactive radar
    maps are not described as part of the core implementation.
-   A complete offline/PWA experience is not documented.
-   The current repository manifest should be reconciled with the
    README's TypeScript claims and documented source paths.

## Future Improvements

Potential next steps, ordered around practical value:

1.  **API proxy route:** keep the provider key server-side and add
    consistent request validation.
2.  **Automated tests:** test unit conversion, forecast aggregation, API
    error handling, and favorites behavior.
3.  **API resilience:** add request timeouts, clearer rate-limit
    messages, and optional short-lived caching.
4.  **Weather charts:** visualize temperature and precipitation trends
    using the existing charting dependency if appropriate.
5.  **Accessibility review:** verify keyboard navigation, focus
    visibility, contrast, reduced-motion preferences, and screen-reader
    labels.
6.  **Performance checks:** measure production loading behavior and
    avoid unnecessary API calls or re-renders.
7.  **PWA support:** add installability and carefully scoped offline
    caching if it fits the project goals.
8.  **Weather alerts:** show severe-weather notices where supported by
    the chosen API and plan.
9.  **Internationalization:** support additional languages and
    locale-aware units/date formatting.
10. **Documentation alignment:** verify all paths, environment
    variables, scripts, dependencies, and screenshots against the actual
    source tree.

## Learning Outcomes

This project provides practical experience with:

-   Building interfaces from reusable React components.
-   Integrating a REST API into a frontend application.
-   Managing asynchronous loading, success, and error states.
-   Using browser geolocation with permission handling.
-   Persisting non-sensitive preferences in browser storage.
-   Designing responsive layouts and theme-aware UI.
-   Managing environment configuration and deploying a Next.js app on
    Vercel.
-   Maintaining technical documentation alongside a changing codebase.

## Contributing

Contributions and suggestions are welcome.

1.  Fork the repository.
2.  Create a focused branch for your change.
3.  Make and test your changes.
4.  Run `npm run lint` and `npm run build`.
5.  Open a pull request describing the change and how it was verified.

For bug reports, include reproduction steps and relevant error messages,
but never include API keys or other secrets.

## Acknowledgements

-   [OpenWeatherMap](https://openweathermap.org/) for weather data.
-   [Next.js](https://nextjs.org/) and [React](https://react.dev/) for
    the application platform.
-   [Tailwind CSS](https://tailwindcss.com/) for styling utilities.
-   [Framer Motion](https://www.framer.com/motion/) for animation.
-   [Lucide](https://lucide.dev/) for icons.
-   [Vercel](https://vercel.com/) for deployment.

## License

No license is specified in the repository documentation reviewed for
this update. Unless a license file is present in the repository, do not
assume others have permission to redistribute or reuse the project. Add
a `LICENSE` file if you intend to publish the project under an
open-source license.

------------------------------------------------------------------------

```{=html}
<p align="center">
```
Made with ❤️ as a web development learning project.
```{=html}
</p>
```
