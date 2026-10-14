export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://weather-web-app-eight-beryl.vercel.app/sitemap.xml",
  };
}
