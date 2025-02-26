export async function GET() {
  const baseUrl = "https://salimgpt.onrender.com";

  // Define your API endpoints that should be indexed
  const routes = [
    "/api/route", // Example API route
  ];

  // Generate XML format
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${routes
      .map((route) => {
        return `
        <url>
          <loc>${baseUrl}${route}</loc>
        </url>`;
      })
      .join("")}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
