import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/app/(ui)/components/Header'
import { Footer } from '@/app/(ui)/components/Footer'
import { EventCard } from '@/app/(ui)/components/EventCard'
import { ShareButton } from '@/app/(ui)/components/ShareButton'
import { CalendarButton } from '@/app/(ui)/components/CalendarButton'
import { Markdown } from '@/app/(ui)/components/Markdown'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Calendar,
  MapPin,
  DollarSign,
  Building,
  ExternalLink,
  Clock,
  Users,
  ArrowLeft,
} from 'lucide-react'
import { getEventBySlug, readEvents } from '@/lib/events'
import { getRelatedEvents as getRelatedEventsClient } from '@/lib/events-client'
import {
  formatEventDate,
  formatRelativeDate,
  getPlatformColor,
  getPlatformDisplayName,
  getTagColor,
  formatPrice,
  getShareUrl,
} from '@/lib/utils'
import { getOGImageUrl } from '@/lib/og'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const events = readEvents()
  return events.map((event) => ({
    slug: event.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const event = getEventBySlug(params.slug)

  if (!event) {
    return {
      title: 'Event Not Found',
    }
  }

  const url = `https://events.eudia.com/events/${event.slug}`
  const ogImage = getOGImageUrl(event.slug)

  return {
    title: event.title,
    description: event.summary,
    openGraph: {
      title: event.title,
      description: event.summary,
      url,
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: event.title,
      description: event.summary,
      images: [ogImage],
    },
  }
}

export const revalidate = 60 // ISR: revalidate every 60 seconds

export default function EventDetailPage({ params }: PageProps) {
  const event = getEventBySlug(params.slug)

  if (!event) {
    notFound()
  }

  const allEvents = readEvents()
  const relatedEvents = getRelatedEventsClient(event, allEvents, 3)
  const shareUrl = getShareUrl(event.slug)

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.summary,
    startDate: event.start,
    endDate: event.end || event.start,
    url: event.eventUrl,
    location: event.venue
      ? {
          '@type': 'Place',
          name: event.venue.name,
          address: {
            '@type': 'PostalAddress',
            streetAddress: event.venue.address,
            addressLocality: event.venue.city,
          },
          geo:
            event.venue.lat && event.venue.lng
              ? {
                  '@type': 'GeoCoordinates',
                  latitude: event.venue.lat,
                  longitude: event.venue.lng,
                }
              : undefined,
        }
      : undefined,
    organizer: event.organizer
      ? {
          '@type': 'Organization',
          name: event.organizer.name,
          url: event.organizer.url,
        }
      : undefined,
    offers: {
      '@type': 'Offer',
      price: event.price === 'Free' || !event.price ? '0' : event.price,
      priceCurrency: 'USD',
      url: event.eventUrl,
      availability: 'https://schema.org/InStock',
    },
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main id="main-content" className="flex-1">
        <div className="container py-8">
          {/* Back Navigation */}
          <Button asChild variant="ghost" size="sm" className="mb-6 gap-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Events
            </Link>
          </Button>

          {/* Hero Section */}
          <div className="mb-8">
            {event.image && (
              <div className="relative mb-6 h-64 w-full overflow-hidden rounded-lg bg-muted lg:h-96">
                <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
              </div>
            )}

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Badge className={getPlatformColor(event.source)} variant="secondary">
                    {getPlatformDisplayName(event.source)}
                  </Badge>
                  {event.rsvpRequired && <Badge variant="outline">RSVP Required</Badge>}
                </div>

                <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  {event.title}
                </h1>

                <p className="mb-6 text-lg text-muted-foreground">{event.summary}</p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {event.tags.map((tag, index) => (
                    <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
                      <Badge variant="outline" className={getTagColor(index)}>
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>

                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <Markdown content={event.descriptionMd} />
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Event Details Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Event Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">
                          {formatEventDate(event.start, event.timezone)}
                        </p>
                        {event.end && (
                          <p className="text-sm text-muted-foreground">
                            to {formatEventDate(event.end, event.timezone)}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground">
                          {formatRelativeDate(event.start)}
                        </p>
                      </div>
                    </div>

                    {event.venue && (
                      <div className="flex items-start gap-3">
                        <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                        <div>
                          {event.venue.name && <p className="font-medium">{event.venue.name}</p>}
                          {event.venue.address && (
                            <p className="text-sm text-muted-foreground">{event.venue.address}</p>
                          )}
                          {event.venue.city && (
                            <p className="text-sm text-muted-foreground">{event.venue.city}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {event.price && (
                      <div className="flex items-center gap-3">
                        <DollarSign className="h-5 w-5 text-muted-foreground" />
                        <p className="font-medium">{formatPrice(event.price)}</p>
                      </div>
                    )}

                    {event.organizer && (
                      <div className="flex items-start gap-3">
                        <Building className="mt-0.5 h-5 w-5 text-muted-foreground" />
                        <div>
                          {event.organizer.name && (
                            <p className="font-medium">{event.organizer.name}</p>
                          )}
                          {event.organizer.url && (
                            <a
                              href={event.organizer.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline"
                            >
                              View Organizer
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button asChild className="w-full" size="lg">
                    <a
                      href={event.eventUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="h-5 w-5" />
                      View on {getPlatformDisplayName(event.source)}
                    </a>
                  </Button>

                  <div className="flex gap-2">
                    <CalendarButton event={event} />
                    <ShareButton url={shareUrl} title={event.title} description={event.summary} />
                  </div>
                </div>

                {/* Meta Information */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Added {formatRelativeDate(event.createdAt)}</span>
                      </div>
                      {event.updatedAt !== event.createdAt && (
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>Updated {formatRelativeDate(event.updatedAt)}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Related Events */}
          {relatedEvents.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold">Related Events</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedEvents.map((relatedEvent) => (
                  <EventCard key={relatedEvent.id} event={relatedEvent} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  )
}
