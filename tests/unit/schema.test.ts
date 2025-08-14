import { describe, it, expect } from 'vitest'
import { eventSchema, eventsSchema } from '@/lib/schema'

describe('Event Schema', () => {
  it('should validate a valid event', () => {
    const validEvent = {
      id: 'evt_123',
      slug: 'test-event',
      title: 'Test Event',
      source: 'luma',
      eventUrl: 'https://lu.ma/test',
      start: '2025-01-01T10:00:00-08:00',
      timezone: 'America/Los_Angeles',
      tags: ['AI', 'Tech'],
      summary: 'A test event',
      descriptionMd: 'A longer description',
      createdAt: '2024-12-01T10:00:00Z',
      updatedAt: '2024-12-01T10:00:00Z',
    }

    const result = eventSchema.safeParse(validEvent)
    expect(result.success).toBe(true)
  })

  it('should reject invalid event source', () => {
    const invalidEvent = {
      id: 'evt_123',
      slug: 'test-event',
      title: 'Test Event',
      source: 'invalid-source',
      eventUrl: 'https://example.com',
      start: '2025-01-01T10:00:00-08:00',
      timezone: 'America/Los_Angeles',
      tags: ['AI'],
      summary: 'A test event',
      descriptionMd: 'A longer description',
      createdAt: '2024-12-01T10:00:00Z',
      updatedAt: '2024-12-01T10:00:00Z',
    }

    const result = eventSchema.safeParse(invalidEvent)
    expect(result.success).toBe(false)
  })

  it('should reject invalid URL', () => {
    const invalidEvent = {
      id: 'evt_123',
      slug: 'test-event',
      title: 'Test Event',
      source: 'luma',
      eventUrl: 'not-a-url',
      start: '2025-01-01T10:00:00-08:00',
      timezone: 'America/Los_Angeles',
      tags: ['AI'],
      summary: 'A test event',
      descriptionMd: 'A longer description',
      createdAt: '2024-12-01T10:00:00Z',
      updatedAt: '2024-12-01T10:00:00Z',
    }

    const result = eventSchema.safeParse(invalidEvent)
    expect(result.success).toBe(false)
  })

  it('should accept optional fields', () => {
    const eventWithOptionals = {
      id: 'evt_123',
      slug: 'test-event',
      title: 'Test Event',
      source: 'luma',
      eventUrl: 'https://lu.ma/test',
      start: '2025-01-01T10:00:00-08:00',
      end: '2025-01-01T12:00:00-08:00',
      timezone: 'America/Los_Angeles',
      venue: {
        name: 'Test Venue',
        address: '123 Main St',
        city: 'San Francisco',
        lat: 37.7749,
        lng: -122.4194,
      },
      image: 'https://example.com/image.jpg',
      price: '$50',
      rsvpRequired: true,
      organizer: {
        name: 'Test Org',
        url: 'https://testorg.com',
      },
      tags: ['AI', 'Tech'],
      summary: 'A test event',
      descriptionMd: 'A longer description',
      createdAt: '2024-12-01T10:00:00Z',
      updatedAt: '2024-12-01T10:00:00Z',
    }

    const result = eventSchema.safeParse(eventWithOptionals)
    expect(result.success).toBe(true)
  })

  it('should validate an array of events', () => {
    const events = [
      {
        id: 'evt_1',
        slug: 'event-1',
        title: 'Event 1',
        source: 'luma',
        eventUrl: 'https://lu.ma/1',
        start: '2025-01-01T10:00:00-08:00',
        timezone: 'America/Los_Angeles',
        tags: ['AI'],
        summary: 'Event 1',
        descriptionMd: 'Description 1',
        createdAt: '2024-12-01T10:00:00Z',
        updatedAt: '2024-12-01T10:00:00Z',
      },
      {
        id: 'evt_2',
        slug: 'event-2',
        title: 'Event 2',
        source: 'eventbrite',
        eventUrl: 'https://eventbrite.com/2',
        start: '2025-02-01T10:00:00-08:00',
        timezone: 'America/Los_Angeles',
        tags: ['Cloud'],
        summary: 'Event 2',
        descriptionMd: 'Description 2',
        createdAt: '2024-12-01T10:00:00Z',
        updatedAt: '2024-12-01T10:00:00Z',
      },
    ]

    const result = eventsSchema.safeParse(events)
    expect(result.success).toBe(true)
  })
})
