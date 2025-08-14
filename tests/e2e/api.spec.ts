import { test, expect } from '@playwright/test'

test.describe('API Routes', () => {
  test('health check endpoint should return ok', async ({ request }) => {
    const response = await request.get('/api/healthz')
    expect(response.ok()).toBeTruthy()
    
    const data = await response.json()
    expect(data).toEqual({ ok: true })
  })

  test('ICS download should work for valid event', async ({ request }) => {
    const response = await request.get('/api/ics/ai-agents-hackathon-2025')
    expect(response.ok()).toBeTruthy()
    
    const contentType = response.headers()['content-type']
    expect(contentType).toContain('text/calendar')
    
    const content = await response.text()
    expect(content).toContain('BEGIN:VCALENDAR')
    expect(content).toContain('AI Agents Hackathon 2025')
    expect(content).toContain('END:VCALENDAR')
  })

  test('ICS download should return 404 for non-existent event', async ({ request }) => {
    const response = await request.get('/api/ics/non-existent-event')
    expect(response.status()).toBe(404)
    
    const data = await response.json()
    expect(data).toHaveProperty('error')
  })

  test('OG image generation should work', async ({ request }) => {
    const response = await request.get('/api/og?slug=ai-agents-hackathon-2025')
    expect(response.ok()).toBeTruthy()
    
    const contentType = response.headers()['content-type']
    expect(contentType).toContain('image/png')
  })

  test('OG image should return error without slug', async ({ request }) => {
    const response = await request.get('/api/og')
    expect(response.status()).toBe(400)
  })

  test('sitemap should be accessible', async ({ request }) => {
    const response = await request.get('/sitemap.xml')
    expect(response.ok()).toBeTruthy()
    
    const contentType = response.headers()['content-type']
    expect(contentType).toContain('application/xml')
    
    const content = await response.text()
    expect(content).toContain('<?xml version="1.0"')
    expect(content).toContain('<urlset')
    expect(content).toContain('https://events.eudia.com')
  })

  test('robots.txt should be accessible', async ({ request }) => {
    const response = await request.get('/robots.txt')
    expect(response.ok()).toBeTruthy()
    
    const contentType = response.headers()['content-type']
    expect(contentType).toContain('text/plain')
    
    const content = await response.text()
    expect(content).toContain('User-agent: *')
    expect(content).toContain('Sitemap:')
  })
})
