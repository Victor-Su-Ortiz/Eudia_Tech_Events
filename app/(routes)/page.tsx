import { Header } from '@/app/(ui)/components/Header'
import { Footer } from '@/app/(ui)/components/Footer'
import { HomePageClient } from './HomePageClient'
import { readEvents, getEventStats, getAllTags } from '@/lib/events'
import { EventSource } from '@/types'

export const revalidate = 60 // ISR: revalidate every 60 seconds

export default function HomePage() {
  const events = readEvents()
  const stats = getEventStats()
  const availableTags = getAllTags()
  const availablePlatforms: EventSource[] = ['luma', 'eventbrite', 'meetup', 'custom']

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <HomePageClient 
        events={events}
        stats={stats}
        availableTags={availableTags}
        availablePlatforms={availablePlatforms}
      />
      <Footer />
    </div>
  )
}