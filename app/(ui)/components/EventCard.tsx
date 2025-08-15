'use client'

import { Event } from '@/types'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, DollarSign, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import {
  formatEventDateShort,
  formatRelativeDate,
  getPlatformColor,
  getPlatformColorForImage,
  getPlatformDisplayName,
  getTagColor,
  formatPrice,
} from '@/lib/utils'

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {event.image && (
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
          <Badge
            className={`absolute right-2 top-2 shadow-lg ring-1 ring-black/5 backdrop-blur-md ${getPlatformColorForImage(event.source)}`}
            variant="secondary"
          >
            {getPlatformDisplayName(event.source)}
          </Badge>
        </div>
      )}

      <CardHeader className="flex-1">
        {!event.image && (
          <Badge className={`mb-2 w-fit ${getPlatformColor(event.source)}`} variant="secondary">
            {getPlatformDisplayName(event.source)}
          </Badge>
        )}

        <h3 className="line-clamp-2 text-xl font-semibold">{event.title}</h3>

        <div className="mt-2 flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatEventDateShort(event.start, event.timezone)}</span>
            <span className="text-xs">({formatRelativeDate(event.start)})</span>
          </div>

          {event.venue?.city && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{event.venue.name || event.venue.city}</span>
            </div>
          )}

          {event.price && (
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              <span>{formatPrice(event.price)}</span>
            </div>
          )}
        </div>

        <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{event.summary}</p>

        <div className="mt-3 flex flex-wrap gap-1">
          {event.tags.slice(0, 3).map((tag, index) => (
            <Badge key={tag} variant="outline" className={`text-xs ${getTagColor(index)}`}>
              {tag}
            </Badge>
          ))}
          {event.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{event.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardFooter className="flex gap-2">
        <Button asChild variant="default" size="sm" className="flex-1">
          <Link href={`/events/${event.slug}`}>View Details</Link>
        </Button>

        <Button asChild variant="outline" size="sm">
          <a
            href={event.eventUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            <ExternalLink className="h-4 w-4" />
            RSVP
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
