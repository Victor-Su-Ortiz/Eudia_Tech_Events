import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/app/(ui)/components/Header'
import { Footer } from '@/app/(ui)/components/Footer'
import { EventCard } from '@/app/(ui)/components/EventCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Globe, Calendar } from 'lucide-react'
import { getEventsByPlatform, sortEvents } from '@/lib/events'
import { getPlatformDisplayName, getPlatformColor } from '@/lib/utils'
import { EventSource } from '@/types'

interface PageProps {
  params: { name: string }
}

const platforms: EventSource[] = ['luma', 'eventbrite', 'meetup', 'custom']

const platformDescriptions: Record<EventSource, string> = {
  luma: 'Luma is a modern event platform for hosting and discovering tech events, workshops, and meetups.',
  eventbrite:
    'Eventbrite is a global ticketing and event technology platform serving organizers and attendees.',
  meetup:
    'Meetup brings people together in thousands of cities to do more of what they want to do in life.',
  custom: 'Custom events are directly managed and hosted by organizers on their own platforms.',
}

export async function generateStaticParams() {
  return platforms.map((platform) => ({
    name: platform,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const platform = params.name as EventSource
  const displayName = getPlatformDisplayName(platform)

  return {
    title: `${displayName} Events`,
    description: `Discover tech events hosted on ${displayName} in the Bay Area`,
    openGraph: {
      title: `${displayName} Events | Bay Area Tech Events`,
      description: `Discover tech events hosted on ${displayName} in the Bay Area`,
      url: `https://events.eudia.com/platform/${platform}`,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${displayName} Events | Bay Area Tech Events`,
      description: `Discover tech events hosted on ${displayName} in the Bay Area`,
    },
  }
}

export const revalidate = 60 // ISR: revalidate every 60 seconds

export default function PlatformPage({ params }: PageProps) {
  const platform = params.name as EventSource

  if (!platforms.includes(platform)) {
    notFound()
  }

  const events = getEventsByPlatform(platform)
  const sortedEvents = sortEvents(events, 'date-asc')
  const displayName = getPlatformDisplayName(platform)

  const upcomingEvents = sortedEvents.filter((event) => new Date(event.start) > new Date())
  const pastEvents = sortedEvents.filter((event) => new Date(event.start) <= new Date())

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main id="main-content" className="flex-1">
        <div className="container py-8">
          {/* Back Navigation */}
          <Button asChild variant="ghost" size="sm" className="mb-6 gap-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to All Events
            </Link>
          </Button>

          {/* Page Header */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-3">
              <Globe className="h-8 w-8 text-primary" />
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {displayName} Events
                </h1>
                <Badge className={getPlatformColor(platform)} variant="secondary">
                  {events.length} events
                </Badge>
              </div>
            </div>

            <p className="mb-6 text-lg text-muted-foreground">{platformDescriptions[platform]}</p>

            {/* Other Platforms */}
            <div className="mb-6">
              <p className="mb-2 text-sm text-muted-foreground">
                Browse events from other platforms:
              </p>
              <div className="flex flex-wrap gap-2">
                {platforms
                  .filter((p) => p !== platform)
                  .map((otherPlatform) => (
                    <Link key={otherPlatform} href={`/platform/${otherPlatform}`}>
                      <Badge variant="outline" className={getPlatformColor(otherPlatform)}>
                        {getPlatformDisplayName(otherPlatform)}
                      </Badge>
                    </Link>
                  ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold">{events.length}</p>
                <p className="text-sm text-muted-foreground">Total Events</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold">{upcomingEvents.length}</p>
                <p className="text-sm text-muted-foreground">Upcoming</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold">{pastEvents.length}</p>
                <p className="text-sm text-muted-foreground">Past Events</p>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <div className="mb-12">
              <h2 className="mb-6 text-2xl font-semibold">Upcoming {displayName} Events</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <div className="mb-12">
              <h2 className="mb-6 text-2xl font-semibold text-muted-foreground">
                Past {displayName} Events
              </h2>
              <div className="grid gap-6 opacity-75 sm:grid-cols-2 lg:grid-cols-3">
                {pastEvents.slice(0, 6).map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {events.length === 0 && (
            <Card className="py-12">
              <CardContent className="text-center">
                <Calendar className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold">No {displayName} events found</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  There are currently no events from {displayName}
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/">Browse All Events</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
