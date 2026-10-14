export default function sitemap() {
  return [
    {
      url: "https://weather-web-app-eight-beryl.vercel.app",
      lastModified: new Date().toISOString(),
      changeFrequency: "hourly",
      priority: 1.0,
    },
  ];
}
