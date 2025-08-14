import { NextRequest, NextResponse } from 'next/server'
import { getEventBySlug } from '@/lib/events'
import { generateICS } from '@/lib/calendar'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const event = getEventBySlug(params.slug)
  
  if (!event) {
    return NextResponse.json(
      { error: 'Event not found' },
      { status: 404 }
    )
  }

  const icsContent = generateICS(event)
  
  if (!icsContent) {
    return NextResponse.json(
      { error: 'Failed to generate ICS file' },
      { status: 500 }
    )
  }

  return new NextResponse(icsContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${event.slug}.ics"`,
    },
  })
}
