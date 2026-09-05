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
  title: "WeatherNow — Real-Time Weather Forecast",
  description:
    "Check real-time weather conditions and forecasts for cities around the world. Built as a B.Tech CSE Mini Project.",
  keywords: ["weather", "forecast", "real-time", "weather app", "Next.js"],
  authors: [{ name: "WeatherNow" }],
  openGraph: {
    title: "WeatherNow — Real-Time Weather Forecast",
    description: "Check real-time weather conditions and forecasts for cities around the world.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
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
