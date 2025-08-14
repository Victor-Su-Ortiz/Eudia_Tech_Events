import { readEvents, getAllTags } from '@/lib/events'
import { EventSource } from '@/types'

export async function GET() {
  const events = readEvents()
  const tags = getAllTags()
  const platforms: EventSource[] = ['luma', 'eventbrite', 'meetup', 'custom']
  
  const baseUrl = 'https://events.eudia.com'
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${events.map(event => `
  <url>
    <loc>${baseUrl}/events/${event.slug}</loc>
    <lastmod>${event.updatedAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
  ${tags.map(tag => `
  <url>
    <loc>${baseUrl}/tags/${encodeURIComponent(tag)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
  ${platforms.map(platform => `
  <url>
    <loc>${baseUrl}/platform/${platform}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
