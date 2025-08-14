#!/usr/bin/env tsx

import { readEvents, getEventStats, getTagCounts, getAllTags } from '../lib/events'
import { eventsSchema } from '../lib/schema'
import { getPlatformDisplayName } from '../lib/utils'
import { EventSource } from '../types'

async function validate() {
  try {
    console.log('🔍 Validating events.json...\n')
    
    // Read and validate events
    const events = readEvents()
    
    // Validate schema
    try {
      eventsSchema.parse(events)
      console.log('✅ Schema validation passed')
    } catch (error) {
      console.error('❌ Schema validation failed:', error)
      process.exit(1)
    }
    
    // Get statistics
    const stats = getEventStats()
    const tagCounts = getTagCounts()
    const allTags = getAllTags()
    
    // Count by platform
    const platformCounts: Record<string, number> = {}
    events.forEach(event => {
      platformCounts[event.source] = (platformCounts[event.source] || 0) + 1
    })
    
    // Count by month
    const monthCounts: Record<string, number> = {}
    events.forEach(event => {
      const month = event.start.substring(0, 7) // YYYY-MM
      monthCounts[month] = (monthCounts[month] || 0) + 1
    })
    
    // Display summary
    console.log('\n📊 Event Statistics:')
    console.log('─'.repeat(40))
    console.log(`Total Events:        ${stats.total}`)
    console.log(`Upcoming Events:     ${stats.upcoming}`)
    console.log(`This Week:          ${stats.thisWeek}`)
    console.log(`This Month:         ${stats.thisMonth}`)
    console.log(`Past Events:        ${stats.total - stats.upcoming}`)
    
    console.log('\n🏷️  Tags Summary:')
    console.log('─'.repeat(40))
    console.log(`Total Unique Tags:   ${allTags.length}`)
    console.log('\nTop Tags:')
    Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .forEach(([tag, count]) => {
        console.log(`  ${tag.padEnd(20)} ${count} events`)
      })
    
    console.log('\n🌐 Platform Distribution:')
    console.log('─'.repeat(40))
    Object.entries(platformCounts).forEach(([platform, count]) => {
      const displayName = getPlatformDisplayName(platform as EventSource)
      const percentage = ((count / events.length) * 100).toFixed(1)
      console.log(`  ${displayName.padEnd(15)} ${count} events (${percentage}%)`)
    })
    
    console.log('\n📅 Events by Month:')
    console.log('─'.repeat(40))
    Object.entries(monthCounts)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-6) // Last 6 months
      .forEach(([month, count]) => {
        console.log(`  ${month.padEnd(15)} ${count} events`)
      })
    
    // Check for duplicates
    const slugs = new Set<string>()
    const duplicateSlugs: string[] = []
    events.forEach(event => {
      if (slugs.has(event.slug)) {
        duplicateSlugs.push(event.slug)
      }
      slugs.add(event.slug)
    })
    
    if (duplicateSlugs.length > 0) {
      console.log('\n⚠️  Warning: Duplicate slugs found:')
      duplicateSlugs.forEach(slug => console.log(`  - ${slug}`))
    }
    
    // Check for past events
    const now = new Date()
    const pastEvents = events.filter(e => new Date(e.start) < now)
    if (pastEvents.length > 10) {
      console.log(`\n💡 Tip: You have ${pastEvents.length} past events. Consider archiving older events.`)
    }
    
    console.log('\n✨ Validation complete!')
    
  } catch (error) {
    console.error('Error during validation:', error)
    process.exit(1)
  }
}

validate()
