import { describe, it, expect } from 'vitest'
import {
  generateSlug,
  generateId,
  detectEventSource,
  getPlatformDisplayName,
  formatPrice,
  truncateText,
} from '@/lib/utils'

describe('Utility Functions', () => {
  describe('generateSlug', () => {
    it('should generate valid slugs', () => {
      expect(generateSlug('Hello World')).toBe('hello-world')
      expect(generateSlug('AI & Machine Learning')).toBe('ai-machine-learning')
      expect(generateSlug('2025 Tech Summit!')).toBe('2025-tech-summit')
      expect(generateSlug('   Spaces   Around   ')).toBe('spaces-around')
    })

    it('should limit slug length', () => {
      const longTitle = 'a'.repeat(150)
      const slug = generateSlug(longTitle)
      expect(slug.length).toBeLessThanOrEqual(100)
    })
  })

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId()
      const id2 = generateId()
      
      expect(id1).toMatch(/^evt_\d+_[a-z0-9]+$/)
      expect(id2).toMatch(/^evt_\d+_[a-z0-9]+$/)
      expect(id1).not.toBe(id2)
    })
  })

  describe('detectEventSource', () => {
    it('should detect Luma URLs', () => {
      expect(detectEventSource('https://lu.ma/event')).toBe('luma')
      expect(detectEventSource('https://www.lu.ma/event')).toBe('luma')
      expect(detectEventSource('https://luma.com/event')).toBe('luma')
    })

    it('should detect Eventbrite URLs', () => {
      expect(detectEventSource('https://eventbrite.com/e/123')).toBe('eventbrite')
      expect(detectEventSource('https://www.eventbrite.com/e/123')).toBe('eventbrite')
    })

    it('should detect Meetup URLs', () => {
      expect(detectEventSource('https://meetup.com/group/events/123')).toBe('meetup')
      expect(detectEventSource('https://www.meetup.com/events')).toBe('meetup')
    })

    it('should return custom for unknown URLs', () => {
      expect(detectEventSource('https://example.com')).toBe('custom')
      expect(detectEventSource('https://myevent.com')).toBe('custom')
    })
  })

  describe('getPlatformDisplayName', () => {
    it('should return correct display names', () => {
      expect(getPlatformDisplayName('luma')).toBe('Luma')
      expect(getPlatformDisplayName('eventbrite')).toBe('Eventbrite')
      expect(getPlatformDisplayName('meetup')).toBe('Meetup')
      expect(getPlatformDisplayName('custom')).toBe('Custom')
    })
  })

  describe('formatPrice', () => {
    it('should format prices correctly', () => {
      expect(formatPrice(undefined)).toBe('Free')
      expect(formatPrice('')).toBe('Free')
      expect(formatPrice('free')).toBe('Free')
      expect(formatPrice('Free')).toBe('Free')
      expect(formatPrice('FREE')).toBe('Free')
      expect(formatPrice('$50')).toBe('$50')
      expect(formatPrice('$$')).toBe('$$')
    })
  })

  describe('truncateText', () => {
    it('should truncate long text', () => {
      const text = 'This is a very long text that needs to be truncated'
      expect(truncateText(text, 20)).toBe('This is a very lo...')
      expect(truncateText(text, 100)).toBe(text)
    })

    it('should handle short text', () => {
      const text = 'Short'
      expect(truncateText(text, 10)).toBe('Short')
    })
  })
})
