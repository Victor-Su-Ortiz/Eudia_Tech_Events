import fs from 'fs'
import path from 'path'
import { Event, eventsSchema } from './schema'
import {
  parseISO,
  isAfter,
  isBefore,
  isWithinInterval,
  startOfDay,
  endOfDay,
  endOfMonth,
  endOfWeek,
} from 'date-fns'
import Fuse from 'fuse.js'

const EVENTS_FILE = path.join(process.cwd(), 'data', 'events.json')

export function readEvents(): Event[] {
  try {
    const fileContent = fs.readFileSync(EVENTS_FILE, 'utf-8')
    const rawEvents = JSON.parse(fileContent)
    const validated = eventsSchema.parse(rawEvents)
    return validated
  } catch (error) {
    console.error('Error reading events:', error)
    return []
  }
}

export function writeEvents(events: Event[]): void {
  const validated = eventsSchema.parse(events)
  fs.writeFileSync(EVENTS_FILE, JSON.stringify(validated, null, 2))
}

export function getEventBySlug(slug: string): Event | undefined {
  const events = readEvents()
  return events.find((event) => event.slug === slug)
}

export function getEventById(id: string): Event | undefined {
  const events = readEvents()
  return events.find((event) => event.id === id)
}

export function getUpcomingEvents(limit?: number): Event[] {
  const events = readEvents()
  const now = new Date()

  const upcoming = events
    .filter((event) => isAfter(parseISO(event.start), now))
    .sort((a, b) => parseISO(a.start).getTime() - parseISO(b.start).getTime())

  return limit ? upcoming.slice(0, limit) : upcoming
}

export function getPastEvents(limit?: number): Event[] {
  const events = readEvents()
  const now = new Date()

  const past = events
    .filter((event) => isBefore(parseISO(event.start), now))
    .sort((a, b) => parseISO(b.start).getTime() - parseISO(a.start).getTime())

  return limit ? past.slice(0, limit) : past
}

export function getEventsByTag(tag: string): Event[] {
  const events = readEvents()
  return events.filter((event) => event.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))
}

export function getEventsByPlatform(platform: string): Event[] {
  const events = readEvents()
  return events.filter((event) => event.source === platform)
}

export function getAllTags(): string[] {
  const events = readEvents()
  const tagsSet = new Set<string>()

  events.forEach((event) => {
    event.tags.forEach((tag) => tagsSet.add(tag))
  })

  return Array.from(tagsSet).sort()
}

export function getTagCounts(): Record<string, number> {
  const events = readEvents()
  const counts: Record<string, number> = {}

  events.forEach((event) => {
    event.tags.forEach((tag) => {
      counts[tag] = (counts[tag] || 0) + 1
    })
  })

  return counts
}

export function searchEvents(query: string): Event[] {
  const events = readEvents()

  if (!query) return events

  const fuse = new Fuse(events, {
    keys: [
      { name: 'title', weight: 3 },
      { name: 'summary', weight: 2 },
      { name: 'tags', weight: 2 },
      { name: 'organizer.name', weight: 1 },
      { name: 'venue.city', weight: 1 },
      { name: 'descriptionMd', weight: 1 },
    ],
    threshold: 0.3,
    includeScore: true,
  })

  const results = fuse.search(query)
  return results.map((result) => result.item)
}

export function filterEvents(
  events: Event[],
  filters: {
    tags?: string[]
    platforms?: string[]
    dateFrom?: Date
    dateTo?: Date
    search?: string
  }
): Event[] {
  let filtered = [...events]

  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter((event) =>
      filters.tags!.some((tag) => event.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))
    )
  }

  if (filters.platforms && filters.platforms.length > 0) {
    filtered = filtered.filter((event) => filters.platforms!.includes(event.source))
  }

  if (filters.dateFrom || filters.dateTo) {
    filtered = filtered.filter((event) => {
      const eventDate = parseISO(event.start)

      if (filters.dateFrom && filters.dateTo) {
        return isWithinInterval(eventDate, {
          start: startOfDay(filters.dateFrom),
          end: endOfDay(filters.dateTo),
        })
      } else if (filters.dateFrom) {
        return isAfter(eventDate, startOfDay(filters.dateFrom))
      } else if (filters.dateTo) {
        return isBefore(eventDate, endOfDay(filters.dateTo))
      }

      return true
    })
  }

  if (filters.search) {
    const searchResults = searchEvents(filters.search)
    const searchIds = new Set(searchResults.map((e) => e.id))
    filtered = filtered.filter((event) => searchIds.has(event.id))
  }

  return filtered
}

export function sortEvents(
  events: Event[],
  sortBy: 'date-asc' | 'date-desc' | 'created-desc' = 'date-asc'
): Event[] {
  const sorted = [...events]

  switch (sortBy) {
    case 'date-asc':
      return sorted.sort((a, b) => parseISO(a.start).getTime() - parseISO(b.start).getTime())
    case 'date-desc':
      return sorted.sort((a, b) => parseISO(b.start).getTime() - parseISO(a.start).getTime())
    case 'created-desc':
      return sorted.sort(
        (a, b) => parseISO(b.createdAt).getTime() - parseISO(a.createdAt).getTime()
      )
    default:
      return sorted
  }
}

export function getRelatedEvents(event: Event, limit: number = 4): Event[] {
  const events = readEvents()

  // Filter out the current event
  const otherEvents = events.filter((e) => e.id !== event.id)

  // Score events based on similarity
  const scored = otherEvents.map((e) => {
    let score = 0

    // Same organizer
    if (event.organizer?.name && e.organizer?.name === event.organizer.name) {
      score += 3
    }

    // Shared tags
    const sharedTags = event.tags.filter((tag) => e.tags.includes(tag))
    score += sharedTags.length * 2

    // Same platform
    if (e.source === event.source) {
      score += 1
    }

    // Same city
    if (event.venue?.city && e.venue?.city === event.venue.city) {
      score += 1
    }

    return { event: e, score }
  })

  // Sort by score and return top matches
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.event)
}

export function getEventStats() {
  const events = readEvents()
  const now = new Date()
  const endOfCurrentWeek = endOfWeek(now)
  const endOfCurrentMonth = endOfMonth(now)

  const upcoming = events.filter((event) => isAfter(parseISO(event.start), now))
  const thisWeek = events.filter((event) => {
    const eventDate = parseISO(event.start)
    return isWithinInterval(eventDate, { start: now, end: endOfCurrentWeek })
  })
  const thisMonth = events.filter((event) => {
    const eventDate = parseISO(event.start)
    return isWithinInterval(eventDate, { start: now, end: endOfCurrentMonth })
  })

  return {
    total: events.length,
    upcoming: upcoming.length,
    thisWeek: thisWeek.length,
    thisMonth: thisMonth.length,
  }
}
