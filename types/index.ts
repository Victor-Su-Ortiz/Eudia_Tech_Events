import { z } from 'zod'
import { eventSchema } from '@/lib/schema'

export type Event = z.infer<typeof eventSchema>

export type EventSource = 'luma' | 'eventbrite' | 'meetup' | 'custom'

export type Venue = {
  name?: string
  address?: string
  city?: string
  lat?: number
  lng?: number
}

export type Organizer = {
  name?: string
  url?: string
  logo?: string
}

export type FilterState = {
  search: string
  tags: string[]
  platforms: EventSource[]
  dateFrom?: Date
  dateTo?: Date
}

export type SortOption = 'date-asc' | 'date-desc' | 'created-desc'
