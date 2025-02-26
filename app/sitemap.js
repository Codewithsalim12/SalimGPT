export async function GET() {
  const baseUrl = "https://salimgpt.onrender.com";

  const routes = [
    { loc: `${baseUrl}/`, priority: 1.0 },
    { loc: `${baseUrl}/about`, priority: 0.8 },
    { loc: `${baseUrl}/contact`, priority: 0.7 },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${routes
        .map(
          (route) =>
            `<url><loc>${route.loc}</loc><priority>${route.priority}</priority></url>`
        )
        .join("")}
    </urlset>`;

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}
