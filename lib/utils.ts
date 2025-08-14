import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistance, parseISO } from 'date-fns'
import { toZonedTime, format as formatTz } from 'date-fns-tz'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatEventDate(date: string, timezone: string): string {
  const zonedDate = toZonedTime(parseISO(date), timezone)
  return formatTz(zonedDate, 'MMM d, yyyy · h:mm a zzz', { timeZone: timezone })
}

export function formatEventDateShort(date: string, timezone: string): string {
  const zonedDate = toZonedTime(parseISO(date), timezone)
  return formatTz(zonedDate, 'MMM d · h:mm a', { timeZone: timezone })
}

export function formatRelativeDate(date: string): string {
  return formatDistance(parseISO(date), new Date(), { addSuffix: true })
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 100)
}

export function generateId(): string {
  return `evt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

export function detectEventSource(url: string): 'luma' | 'eventbrite' | 'meetup' | 'custom' {
  const hostname = new URL(url).hostname.toLowerCase()

  if (hostname.includes('lu.ma') || hostname.includes('luma')) {
    return 'luma'
  } else if (hostname.includes('eventbrite')) {
    return 'eventbrite'
  } else if (hostname.includes('meetup')) {
    return 'meetup'
  }

  return 'custom'
}

export function getPlatformDisplayName(source: string): string {
  const names: Record<string, string> = {
    luma: 'Luma',
    eventbrite: 'Eventbrite',
    meetup: 'Meetup',
    custom: 'Custom',
  }
  return names[source] || source
}

export function getPlatformColor(source: string): string {
  const colors: Record<string, string> = {
    luma: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    eventbrite: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    meetup: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    custom: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
  }
  return colors[source] || colors.custom
}

export function getTagColor(index: number): string {
  const colors = [
    'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
    'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
  ]
  return colors[index % colors.length]
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength - 3) + '...'
}

export function formatPrice(price?: string): string {
  if (!price) return 'Free'
  if (price.toLowerCase() === 'free') return 'Free'
  return price
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

export function getShareUrl(slug: string): string {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/events/${slug}`
  }
  return `/events/${slug}`
}

export function getGoogleCalendarUrl(event: {
  title: string
  start: string
  end?: string
  summary: string
  eventUrl: string
  venue?: { name?: string; address?: string }
}): string {
  const startDate = parseISO(event.start)
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '')
  const endDate = event.end
    ? parseISO(event.end)
        .toISOString()
        .replace(/[-:]/g, '')
        .replace(/\.\d{3}/, '')
    : new Date(parseISO(event.start).getTime() + 2 * 60 * 60 * 1000)
        .toISOString()
        .replace(/[-:]/g, '')
        .replace(/\.\d{3}/, '')

  const details = `${event.summary}\n\nMore info: ${event.eventUrl}`
  const location = event.venue
    ? `${event.venue.name || ''} ${event.venue.address || ''}`.trim()
    : ''

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${startDate}/${endDate}`,
    details,
    location,
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}
