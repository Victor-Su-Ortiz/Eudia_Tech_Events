import { z } from 'zod'

export const venueSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
})

export const organizerSchema = z.object({
  name: z.string().optional(),
  url: z.string().url().optional(),
  logo: z.string().optional(),
})

export const eventSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  source: z.enum(['luma', 'eventbrite', 'meetup', 'custom']),
  eventUrl: z.string().url(),
  start: z.string(), // ISO datetime with timezone
  end: z.string().optional(), // ISO datetime with timezone
  timezone: z.string(), // e.g., "America/Los_Angeles"
  venue: venueSchema.optional(),
  image: z.string().optional(),
  price: z.string().optional(), // "Free", "$$", etc.
  rsvpRequired: z.boolean().optional(),
  organizer: organizerSchema.optional(),
  tags: z.array(z.string()),
  summary: z.string(),
  descriptionMd: z.string(),
  createdAt: z.string(), // ISO datetime
  updatedAt: z.string(), // ISO datetime
})

export const eventsSchema = z.array(eventSchema)

export type Event = z.infer<typeof eventSchema>
export type Venue = z.infer<typeof venueSchema>
export type Organizer = z.infer<typeof organizerSchema>
