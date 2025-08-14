'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CalendarPlus, Download, Calendar } from 'lucide-react'
import { Event } from '@/types'
import { downloadICS } from '@/lib/calendar'
import { getGoogleCalendarUrl } from '@/lib/utils'

interface CalendarButtonProps {
  event: Event
}

export function CalendarButton({ event }: CalendarButtonProps) {
  const handleDownloadICS = () => {
    downloadICS(event)
  }

  const handleGoogleCalendar = () => {
    const url = getGoogleCalendarUrl({
      title: event.title,
      start: event.start,
      end: event.end,
      summary: event.summary,
      eventUrl: event.eventUrl,
      venue: event.venue,
    })
    window.open(url, '_blank')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <CalendarPlus className="h-4 w-4" />
          Add to Calendar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleDownloadICS}>
          <Download className="mr-2 h-4 w-4" />
          Download .ics file
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={handleGoogleCalendar}>
          <Calendar className="mr-2 h-4 w-4" />
          Google Calendar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
