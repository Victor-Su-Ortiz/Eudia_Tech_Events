#!/usr/bin/env tsx

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { readEvents, writeEvents } from '../lib/events'
import { eventSchema } from '../lib/schema'
import { generateId, generateSlug, detectEventSource } from '../lib/utils'

const argv = yargs(hideBin(process.argv))
  .option('url', {
    alias: 'u',
    type: 'string',
    description: 'Event URL',
    demandOption: true,
  })
  .option('title', {
    alias: 't',
    type: 'string',
    description: 'Event title',
    demandOption: true,
  })
  .option('start', {
    alias: 's',
    type: 'string',
    description: 'Start date/time (ISO format)',
    demandOption: true,
  })
  .option('end', {
    alias: 'e',
    type: 'string',
    description: 'End date/time (ISO format)',
  })
  .option('timezone', {
    alias: 'tz',
    type: 'string',
    description: 'Timezone (e.g., America/Los_Angeles)',
    default: 'America/Los_Angeles',
  })
  .option('tags', {
    type: 'string',
    description: 'Comma-separated tags',
    demandOption: true,
  })
  .option('summary', {
    type: 'string',
    description: 'Short summary',
    demandOption: true,
  })
  .option('description', {
    alias: 'd',
    type: 'string',
    description: 'Long description (Markdown)',
    default: '',
  })
  .option('price', {
    type: 'string',
    description: 'Price (e.g., Free, $50, $$)',
    default: 'Free',
  })
  .option('rsvpRequired', {
    type: 'boolean',
    description: 'RSVP required?',
    default: false,
  })
  .option('organizerName', {
    type: 'string',
    description: 'Organizer name',
  })
  .option('organizerUrl', {
    type: 'string',
    description: 'Organizer URL',
  })
  .option('image', {
    type: 'string',
    description: 'Event image URL',
  })
  .option('venueName', {
    type: 'string',
    description: 'Venue name',
  })
  .option('venueAddress', {
    type: 'string',
    description: 'Venue address',
  })
  .option('venueCity', {
    type: 'string',
    description: 'Venue city',
  })
  .option('venueLat', {
    type: 'number',
    description: 'Venue latitude',
  })
  .option('venueLng', {
    type: 'number',
    description: 'Venue longitude',
  })
  .help()
  .parseSync()

async function addEvent() {
  try {
    const events = readEvents()
    
    // Generate ID and slug
    const id = generateId()
    const slug = generateSlug(argv.title)
    
    // Check if slug already exists
    if (events.some(e => e.slug === slug)) {
      console.error(`Error: An event with slug "${slug}" already exists`)
      process.exit(1)
    }
    
    // Detect source from URL
    const source = detectEventSource(argv.url)
    
    // Build venue object
    const venue = (argv.venueName || argv.venueAddress || argv.venueCity) ? {
      name: argv.venueName,
      address: argv.venueAddress,
      city: argv.venueCity,
      lat: argv.venueLat,
      lng: argv.venueLng,
    } : undefined
    
    // Build organizer object
    const organizer = (argv.organizerName || argv.organizerUrl) ? {
      name: argv.organizerName,
      url: argv.organizerUrl,
    } : undefined
    
    // Create new event
    const newEvent = {
      id,
      slug,
      title: argv.title,
      source,
      eventUrl: argv.url,
      start: argv.start,
      end: argv.end,
      timezone: argv.timezone,
      venue,
      image: argv.image,
      price: argv.price,
      rsvpRequired: argv.rsvpRequired,
      organizer,
      tags: argv.tags.split(',').map(t => t.trim()),
      summary: argv.summary,
      descriptionMd: argv.description || argv.summary,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    // Validate event
    const validated = eventSchema.parse(newEvent)
    
    // Add to events array
    events.push(validated)
    
    // Write back to file
    writeEvents(events)
    
    console.log('✅ Event added successfully!')
    console.log(`   ID: ${id}`)
    console.log(`   Slug: ${slug}`)
    console.log(`   Title: ${argv.title}`)
    console.log(`   Source: ${source}`)
    console.log(`   Tags: ${argv.tags}`)
    
  } catch (error) {
    console.error('Error adding event:', error)
    process.exit(1)
  }
}

addEvent()
