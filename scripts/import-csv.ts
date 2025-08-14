#!/usr/bin/env tsx

import fs from 'fs'
import path from 'path'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { parse } from 'csv-parse/sync'
import { readEvents, writeEvents } from '../lib/events'
import { eventSchema } from '../lib/schema'
import { generateId, generateSlug, detectEventSource } from '../lib/utils'
import { Event } from '../types'

const argv = yargs(hideBin(process.argv))
  .option('file', {
    alias: 'f',
    type: 'string',
    description: 'CSV file path',
    demandOption: true,
  })
  .option('dry-run', {
    type: 'boolean',
    description: 'Preview import without writing',
    default: false,
  })
  .help()
  .parseSync()

interface CSVRow {
  title: string
  url: string
  start: string
  end?: string
  timezone?: string
  tags: string
  summary: string
  description?: string
  price?: string
  rsvp_required?: string
  organizer_name?: string
  organizer_url?: string
  image?: string
  venue_name?: string
  venue_address?: string
  venue_city?: string
  venue_lat?: string
  venue_lng?: string
}

async function importCSV() {
  try {
    // Read CSV file
    const csvPath = path.resolve(argv.file)
    if (!fs.existsSync(csvPath)) {
      console.error(`Error: File not found: ${csvPath}`)
      process.exit(1)
    }
    
    const csvContent = fs.readFileSync(csvPath, 'utf-8')
    const records: CSVRow[] = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    })
    
    console.log(`📁 Found ${records.length} records in CSV\n`)
    
    // Read existing events
    const existingEvents = readEvents()
    const existingSlugs = new Set(existingEvents.map(e => e.slug))
    
    // Process CSV records
    const newEvents: Event[] = []
    const skipped: string[] = []
    const errors: { row: number; error: string }[] = []
    
    records.forEach((record, index) => {
      try {
        const slug = generateSlug(record.title)
        
        // Skip if slug already exists
        if (existingSlugs.has(slug)) {
          skipped.push(`Row ${index + 2}: ${record.title} (duplicate slug)`)
          return
        }
        
        // Build event object
        const event: Event = {
          id: generateId(),
          slug,
          title: record.title,
          source: record.url ? detectEventSource(record.url) : 'custom',
          eventUrl: record.url,
          start: record.start,
          end: record.end || undefined,
          timezone: record.timezone || 'America/Los_Angeles',
          tags: record.tags ? record.tags.split(',').map(t => t.trim()) : [],
          summary: record.summary,
          descriptionMd: record.description || record.summary,
          price: record.price || undefined,
          rsvpRequired: record.rsvp_required === 'true' || record.rsvp_required === '1',
          image: record.image || undefined,
          venue: (record.venue_name || record.venue_address || record.venue_city) ? {
            name: record.venue_name || undefined,
            address: record.venue_address || undefined,
            city: record.venue_city || undefined,
            lat: record.venue_lat ? parseFloat(record.venue_lat) : undefined,
            lng: record.venue_lng ? parseFloat(record.venue_lng) : undefined,
          } : undefined,
          organizer: (record.organizer_name || record.organizer_url) ? {
            name: record.organizer_name || undefined,
            url: record.organizer_url || undefined,
          } : undefined,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        
        // Validate event
        const validated = eventSchema.parse(event)
        newEvents.push(validated)
        
      } catch (error) {
        errors.push({
          row: index + 2,
          error: error instanceof Error ? error.message : String(error),
        })
      }
    })
    
    // Display summary
    console.log('📊 Import Summary:')
    console.log('─'.repeat(40))
    console.log(`✅ Valid events:     ${newEvents.length}`)
    console.log(`⏭️  Skipped:         ${skipped.length}`)
    console.log(`❌ Errors:          ${errors.length}`)
    
    if (skipped.length > 0) {
      console.log('\n⏭️  Skipped Events:')
      skipped.forEach(s => console.log(`  ${s}`))
    }
    
    if (errors.length > 0) {
      console.log('\n❌ Errors:')
      errors.forEach(e => console.log(`  Row ${e.row}: ${e.error}`))
    }
    
    if (newEvents.length > 0) {
      console.log('\n📝 Events to Import:')
      newEvents.forEach(e => {
        console.log(`  - ${e.title}`)
        console.log(`    ${e.start} | ${e.tags.join(', ')}`)
      })
      
      if (!argv.dryRun) {
        // Merge with existing events
        const allEvents = [...existingEvents, ...newEvents]
        
        // Write to file
        writeEvents(allEvents)
        
        console.log(`\n✅ Successfully imported ${newEvents.length} events!`)
      } else {
        console.log('\n🔍 Dry run mode - no changes were made')
        console.log('   Remove --dry-run flag to perform actual import')
      }
    } else {
      console.log('\n⚠️  No valid events to import')
    }
    
  } catch (error) {
    console.error('Error importing CSV:', error)
    process.exit(1)
  }
}

// Display CSV format help
console.log('📋 Expected CSV Format:')
console.log('─'.repeat(60))
console.log('Required columns:')
console.log('  - title, url, start, tags, summary')
console.log('Optional columns:')
console.log('  - end, timezone, description, price, rsvp_required')
console.log('  - organizer_name, organizer_url, image')
console.log('  - venue_name, venue_address, venue_city, venue_lat, venue_lng')
console.log('─'.repeat(60))
console.log()

importCSV()
