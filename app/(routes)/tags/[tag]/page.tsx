import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/app/(ui)/components/Header'
import { Footer } from '@/app/(ui)/components/Footer'
import { EventCard } from '@/app/(ui)/components/EventCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Tag, Calendar } from 'lucide-react'
import { getEventsByTag, getAllTags, sortEvents } from '@/lib/events'

interface PageProps {
  params: { tag: string }
}

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag),
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag)

  return {
    title: `${tag} Events`,
    description: `Discover tech events related to ${tag} in the Bay Area`,
    openGraph: {
      title: `${tag} Events | Bay Area Tech Events`,
      description: `Discover tech events related to ${tag} in the Bay Area`,
      url: `https://events.eudia.com/tags/${encodeURIComponent(tag)}`,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${tag} Events | Bay Area Tech Events`,
      description: `Discover tech events related to ${tag} in the Bay Area`,
    },
  }
}

export const revalidate = 60 // ISR: revalidate every 60 seconds

export default function TagPage({ params }: PageProps) {
  const tag = decodeURIComponent(params.tag)
  const events = getEventsByTag(tag)
  const sortedEvents = sortEvents(events, 'date-asc')
  const allTags = getAllTags()

  if (!allTags.includes(tag)) {
    notFound()
  }

  const relatedTags = allTags.filter((t) => t !== tag).slice(0, 10)

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
              <Tag className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{tag} Events</h1>
            </div>

            <p className="mb-6 text-lg text-muted-foreground">
              Explore {events.length} events related to {tag} in the Bay Area tech scene
            </p>

            {/* Related Tags */}
            {relatedTags.length > 0 && (
              <div className="mb-6">
                <p className="mb-2 text-sm text-muted-foreground">Explore related topics:</p>
                <div className="flex flex-wrap gap-2">
                  {relatedTags.map((relatedTag) => (
                    <Link key={relatedTag} href={`/tags/${encodeURIComponent(relatedTag)}`}>
                      <Badge variant="outline">{relatedTag}</Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <div className="mb-12">
              <h2 className="mb-6 text-2xl font-semibold">Upcoming {tag} Events</h2>
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
                Past {tag} Events
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
                <h3 className="mb-2 text-lg font-semibold">No {tag} events found</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  There are currently no events tagged with {tag}
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
