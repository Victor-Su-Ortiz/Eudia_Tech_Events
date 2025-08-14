// Client-safe event utilities (no Node.js dependencies)
import { Event } from '@/types'
import { parseISO, isAfter, isBefore, isWithinInterval, startOfDay, endOfDay } from 'date-fns'
import Fuse from 'fuse.js'

export function searchEvents(events: Event[], query: string): Event[] {
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
    const searchResults = searchEvents(events, filters.search)
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

export function getRelatedEvents(event: Event, events: Event[], limit: number = 4): Event[] {
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
