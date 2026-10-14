import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://weather-web-app-eight-beryl.vercel.app"),
  title: {
    default: "WeatherNow — Real-Time Weather Forecast & Live Conditions",
    template: "%s | WeatherNow",
  },
  description:
    "Get accurate real-time weather forecasts, 5-day projections, air pressure, wind speed, humidity, and atmospheric conditions for any city worldwide with WeatherNow.",
  keywords: [
    "weather forecast",
    "real-time weather",
    "live atmospheric conditions",
    "5-day weather forecast",
    "global weather lookup",
    "temperature converter celsius fahrenheit",
    "wind speed",
    "humidity tracker",
  ],
  authors: [{ name: "WeatherNow", url: "https://weather-web-app-eight-beryl.vercel.app" }],
  creator: "WeatherNow",
  publisher: "WeatherNow",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://weather-web-app-eight-beryl.vercel.app/",
    siteName: "WeatherNow",
    title: "WeatherNow — Real-Time Weather Forecast & Live Conditions",
    description:
      "Accurate real-time global weather conditions, 5-day meteorological forecasts, atmospheric pressure, humidity, and wind speeds.",
    images: [
      {
        url: "https://weather-web-app-eight-beryl.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "WeatherNow — Real-Time Weather Forecast",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WeatherNow — Real-Time Weather Forecast & Live Conditions",
    description:
      "Accurate real-time global weather conditions, 5-day meteorological forecasts, atmospheric pressure, humidity, and wind speeds.",
    images: ["https://weather-web-app-eight-beryl.vercel.app/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://weather-web-app-eight-beryl.vercel.app/#website",
      "url": "https://weather-web-app-eight-beryl.vercel.app/",
      "name": "WeatherNow",
      "description":
        "Real-time weather forecast and live atmospheric conditions for cities worldwide.",
      "inLanguage": "en-US",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate":
            "https://weather-web-app-eight-beryl.vercel.app/?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://weather-web-app-eight-beryl.vercel.app/#webpage",
      "url": "https://weather-web-app-eight-beryl.vercel.app/",
      "name": "WeatherNow — Real-Time Weather Forecast & Live Conditions",
      "description":
        "Get accurate real-time weather forecasts, 5-day projections, air pressure, wind speed, humidity, and atmospheric conditions for any city worldwide with WeatherNow.",
      "isPartOf": {
        "@id": "https://weather-web-app-eight-beryl.vercel.app/#website",
      },
      "inLanguage": "en-US",
      "breadcrumb": {
        "@id": "https://weather-web-app-eight-beryl.vercel.app/#breadcrumb",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://weather-web-app-eight-beryl.vercel.app/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://weather-web-app-eight-beryl.vercel.app/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Live Weather Forecast",
          "item": "https://weather-web-app-eight-beryl.vercel.app/#current-weather",
        },
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
