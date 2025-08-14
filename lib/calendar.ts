import { createEvents, EventAttributes } from 'ics'
import { parseISO } from 'date-fns'
import { Event } from '@/types'

export function generateICS(event: Event): string | null {
  const startDate = parseISO(event.start)
  const endDate = event.end ? parseISO(event.end) : new Date(startDate.getTime() + 2 * 60 * 60 * 1000)
  
  const eventAttributes: EventAttributes = {
    title: event.title,
    description: `${event.summary}\n\nMore info: ${event.eventUrl}`,
    start: [
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      startDate.getDate(),
      startDate.getHours(),
      startDate.getMinutes(),
    ],
    end: [
      endDate.getFullYear(),
      endDate.getMonth() + 1,
      endDate.getDate(),
      endDate.getHours(),
      endDate.getMinutes(),
    ],
    url: event.eventUrl,
    location: event.venue ? `${event.venue.name || ''} ${event.venue.address || ''} ${event.venue.city || ''}`.trim() : undefined,
    organizer: event.organizer?.name ? { name: event.organizer.name, email: 'events@eudia.com' } : undefined,
    categories: event.tags,
    status: 'CONFIRMED',
    busyStatus: 'BUSY',
  }
  
  const { error, value } = createEvents([eventAttributes])
  
  if (error) {
    console.error('Error creating ICS:', error)
    return null
  }
  
  return value || null
}

export function downloadICS(event: Event): void {
  const icsContent = generateICS(event)
  
  if (!icsContent) {
    console.error('Failed to generate ICS')
    return
  }
  
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  
  link.href = url
  link.download = `${event.slug}.ics`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
