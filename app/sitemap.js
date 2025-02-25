export async function GET() {
  const urls = [
    {
      loc: "https://salimgpt.onrender.com/",
      lastmod: new Date().toISOString(),
      priority: 1.0,
    },
    {
      loc: "https://salimgpt.onrender.com/about",
      lastmod: new Date().toISOString(),
      priority: 0.8,
    },
    {
      loc: "https://salimgpt.onrender.com/contact",
      lastmod: new Date().toISOString(),
      priority: 0.7,
    },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        (url) => `
      <url>
        <loc>${url.loc}</loc>
        <lastmod>${url.lastmod}</lastmod>
        <priority>${url.priority}</priority>
      </url>
    `
      )
      .join("")}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
