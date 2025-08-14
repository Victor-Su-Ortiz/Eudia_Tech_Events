import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import { getEventBySlug } from '@/lib/events'
import { formatEventDateShort, getPlatformDisplayName } from '@/lib/utils'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    if (!slug) {
      return new Response('Missing slug parameter', { status: 400 })
    }

    const event = getEventBySlug(slug)

    if (!event) {
      return new Response('Event not found', { status: 404 })
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a',
            backgroundImage: 'linear-gradient(to bottom right, #0a0a0a, #1a1a2e)',
          }}
        >
          {/* Top Section - Platform & Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '40px 60px',
              position: 'absolute',
              top: 0,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: 'white',
                }}
              >
                Bay Area Tech Events
              </span>
            </div>
            <div
              style={{
                backgroundColor:
                  event.source === 'luma'
                    ? '#9333ea'
                    : event.source === 'eventbrite'
                      ? '#f97316'
                      : event.source === 'meetup'
                        ? '#ef4444'
                        : '#6b7280',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '18px',
                fontWeight: 600,
              }}
            >
              {getPlatformDisplayName(event.source)}
            </div>
          </div>

          {/* Main Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px',
              maxWidth: '1000px',
            }}
          >
            {/* Title */}
            <h1
              style={{
                fontSize: '64px',
                fontWeight: 800,
                color: 'white',
                textAlign: 'center',
                lineHeight: 1.2,
                marginBottom: '24px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {event.title}
            </h1>

            {/* Date & Location */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                fontSize: '24px',
                color: '#94a3b8',
                marginBottom: '32px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                {formatEventDateShort(event.start, event.timezone)}
              </div>
              {event.venue?.city && (
                <>
                  <span style={{ color: '#475569' }}>•</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {event.venue.city}
                  </div>
                </>
              )}
            </div>

            {/* Tags */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                justifyContent: 'center',
                marginBottom: '32px',
              }}
            >
              {event.tags.slice(0, 5).map((tag) => (
                <div
                  key={tag}
                  style={{
                    backgroundColor: '#1e293b',
                    color: '#3b82f6',
                    padding: '8px 20px',
                    borderRadius: '20px',
                    fontSize: '18px',
                    fontWeight: 600,
                    border: '2px solid #334155',
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>

            {/* Summary */}
            <p
              style={{
                fontSize: '22px',
                color: '#cbd5e1',
                textAlign: 'center',
                lineHeight: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {event.summary}
            </p>
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: '20px',
              position: 'absolute',
              bottom: 0,
              borderTop: '1px solid #334155',
            }}
          >
            <span
              style={{
                fontSize: '16px',
                color: '#64748b',
              }}
            >
              events.eudia.com
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
