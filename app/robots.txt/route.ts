export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://events.eudia.com/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Disallow admin or API routes (if any)
Disallow: /api/
Allow: /api/og
Allow: /api/ics/`

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
