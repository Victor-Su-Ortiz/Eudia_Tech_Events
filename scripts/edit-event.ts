#!/usr/bin/env tsx

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { readEvents, writeEvents, getEventById, getEventBySlug } from '../lib/events'
import { eventSchema } from '../lib/schema'

const argv = yargs(hideBin(process.argv))
  .option('id', {
    type: 'string',
    description: 'Event ID',
  })
  .option('slug', {
    type: 'string',
    description: 'Event slug',
  })
  .option('title', {
    type: 'string',
    description: 'New title',
  })
  .option('start', {
    type: 'string',
    description: 'New start date/time (ISO format)',
  })
  .option('end', {
    type: 'string',
    description: 'New end date/time (ISO format)',
  })
  .option('timezone', {
    type: 'string',
    description: 'New timezone',
  })
  .option('tags', {
    type: 'string',
    description: 'New comma-separated tags',
  })
  .option('summary', {
    type: 'string',
    description: 'New summary',
  })
  .option('description', {
    type: 'string',
    description: 'New description (Markdown)',
  })
  .option('price', {
    type: 'string',
    description: 'New price',
  })
  .option('rsvpRequired', {
    type: 'boolean',
    description: 'New RSVP required status',
  })
  .option('organizerName', {
    type: 'string',
    description: 'New organizer name',
  })
  .option('organizerUrl', {
    type: 'string',
    description: 'New organizer URL',
  })
  .option('image', {
    type: 'string',
    description: 'New image URL',
  })
  .option('venueName', {
    type: 'string',
    description: 'New venue name',
  })
  .option('venueAddress', {
    type: 'string',
    description: 'New venue address',
  })
  .option('venueCity', {
    type: 'string',
    description: 'New venue city',
  })
  .option('venueLat', {
    type: 'number',
    description: 'New venue latitude',
  })
  .option('venueLng', {
    type: 'number',
    description: 'New venue longitude',
  })
  .check((argv) => {
    if (!argv.id && !argv.slug) {
      throw new Error('Either --id or --slug must be provided')
    }
    return true
  })
  .help()
  .parseSync()

async function editEvent() {
  try {
    const events = readEvents()
    
    // Find event by ID or slug
    let event = argv.id ? getEventById(argv.id) : getEventBySlug(argv.slug!)
    
    if (!event) {
      console.error(`Error: Event not found`)
      process.exit(1)
    }
    
    // Find index in array
    const index = events.findIndex(e => e.id === event!.id)
    
    // Update fields if provided
    if (argv.title !== undefined) event.title = argv.title
    if (argv.start !== undefined) event.start = argv.start
    if (argv.end !== undefined) event.end = argv.end
    if (argv.timezone !== undefined) event.timezone = argv.timezone
    if (argv.summary !== undefined) event.summary = argv.summary
    if (argv.description !== undefined) event.descriptionMd = argv.description
    if (argv.price !== undefined) event.price = argv.price
    if (argv.rsvpRequired !== undefined) event.rsvpRequired = argv.rsvpRequired
    if (argv.image !== undefined) event.image = argv.image
    
    // Update tags if provided
    if (argv.tags !== undefined) {
      event.tags = argv.tags.split(',').map(t => t.trim())
    }
    
    // Update venue if any venue fields provided
    if (argv.venueName !== undefined || 
        argv.venueAddress !== undefined || 
        argv.venueCity !== undefined ||
        argv.venueLat !== undefined ||
        argv.venueLng !== undefined) {
      event.venue = {
        name: argv.venueName ?? event.venue?.name,
        address: argv.venueAddress ?? event.venue?.address,
        city: argv.venueCity ?? event.venue?.city,
        lat: argv.venueLat ?? event.venue?.lat,
        lng: argv.venueLng ?? event.venue?.lng,
      }
    }
    
    // Update organizer if any organizer fields provided
    if (argv.organizerName !== undefined || argv.organizerUrl !== undefined) {
      event.organizer = {
        name: argv.organizerName ?? event.organizer?.name,
        url: argv.organizerUrl ?? event.organizer?.url,
      }
    }
    
    // Update timestamp
    event.updatedAt = new Date().toISOString()
    
    // Validate updated event
    const validated = eventSchema.parse(event)
    
    // Update in array
    events[index] = validated
    
    // Write back to file
    writeEvents(events)
    
    console.log('✅ Event updated successfully!')
    console.log(`   ID: ${event.id}`)
    console.log(`   Slug: ${event.slug}`)
    console.log(`   Title: ${event.title}`)
    console.log(`   Updated fields:`, Object.keys(argv).filter(k => 
      !['_', '$0', 'id', 'slug'].includes(k)
    ))
    
  } catch (error) {
    console.error('Error editing event:', error)
    process.exit(1)
  }
}

editEvent()
