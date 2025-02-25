export const runtime = "edge"; // Faster edge runtime

export async function GET() {
  const urls = [
    { loc: "https://salimgpt.onrender.com/", priority: 1.0 },
    { loc: "https://salimgpt.onrender.com/about", priority: 0.8 },
    { loc: "https://salimgpt.onrender.com/contact", priority: 0.7 },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        (url) => `
      <url>
        <loc>${url.loc}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>${url.priority}</priority>
      </url>
    `
      )
      .join("")}
  </urlset>`;

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}
