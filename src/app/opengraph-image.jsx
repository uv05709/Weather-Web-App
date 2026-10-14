import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "WeatherNow — Real-Time Weather Forecast & Live Atmospheric Data";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          backgroundColor: "#0B1120",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(56, 189, 248, 0.25) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(245, 158, 11, 0.15) 0%, transparent 50%)",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        {/* Top Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                backgroundColor: "#0284C7",
                boxShadow: "0 10px 25px -5px rgba(2, 132, 199, 0.5)",
              }}
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
              </svg>
            </div>
            <span style={{ fontSize: "36px", fontWeight: "800", letterSpacing: "-0.03em" }}>
              Weather<span style={{ color: "#38BDF8" }}>Now</span>
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 20px",
              borderRadius: "9999px",
              backgroundColor: "rgba(56, 189, 248, 0.12)",
              border: "1px solid rgba(56, 189, 248, 0.3)",
              fontSize: "18px",
              color: "#38BDF8",
              fontWeight: "600",
            }}
          >
            Live Meteorological Forecast
          </div>
        </div>

        {/* Center Main Message */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "900px" }}>
          <h1
            style={{
              fontSize: "58px",
              fontWeight: "900",
              lineHeight: "1.15",
              letterSpacing: "-0.03em",
              margin: 0,
              background: "linear-gradient(to right, #FFFFFF, #E0F2FE, #38BDF8)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Real-Time Weather Forecast & Atmospheric Conditions
          </h1>
          <p
            style={{
              fontSize: "24px",
              color: "#94A3B8",
              lineHeight: "1.4",
              margin: 0,
            }}
          >
            Global city lookups, GPS detection, 5-day projections, atmospheric pressure, humidity, and wind speed.
          </p>
        </div>

        {/* Bottom Feature Badges */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", borderTop: "1px solid rgba(255, 255, 255, 0.1)", paddingTop: "28px" }}>
          <div style={{ display: "flex", gap: "32px" }}>
            <span style={{ fontSize: "18px", color: "#E2E8F0", fontWeight: "600" }}>• 5-Day Precision Forecast</span>
            <span style={{ fontSize: "18px", color: "#E2E8F0", fontWeight: "600" }}>• Instant Celsius / Fahrenheit Toggle</span>
            <span style={{ fontSize: "18px", color: "#E2E8F0", fontWeight: "600" }}>• Global City Search</span>
          </div>
          <span style={{ fontSize: "16px", color: "#64748B", fontWeight: "500" }}>
            weather-web-app-eight-beryl.vercel.app
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
