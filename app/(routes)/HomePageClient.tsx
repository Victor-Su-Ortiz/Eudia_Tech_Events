'use client'

import { useState, useMemo } from 'react'
import { EventCard } from '@/app/(ui)/components/EventCard'
import { EventFilters } from '@/app/(ui)/components/EventFilters'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, TrendingUp, Clock, Users, ChevronDown, ChevronUp } from 'lucide-react'
import { Event, EventSource, FilterState, SortOption } from '@/types'
import { filterEvents, sortEvents } from '@/lib/events-client'

interface HomePageClientProps {
  events: Event[]
  stats: {
    total: number
    upcoming: number
    thisWeek: number
    thisMonth: number
  }
  availableTags: string[]
  availablePlatforms: EventSource[]
}

export function HomePageClient({
  events,
  stats,
  availableTags,
  availablePlatforms,
}: HomePageClientProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    tags: [],
    platforms: [],
    dateFrom: undefined,
    dateTo: undefined,
  })

  const [sortBy, setSortBy] = useState<SortOption>('date-asc')
  const [showStats, setShowStats] = useState(true)

  // Process events based on filters and sorting
  const processedEvents = useMemo(() => {
    const filtered = filterEvents(events, filters)
    return sortEvents(filtered, sortBy)
  }, [events, filters, sortBy])

  return (
    <main id="main-content" className="flex-1">
      <div className="container py-8">
        {/* Hero Section with Eudia Branding */}
        <div className="mb-12 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
            <span className="text-sm font-medium text-primary">Curated by Eudia</span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">Efficiency. Clarity. Trust.</span>
          </div>

          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span className="gradient-eudia">Bay Area</span> <span>Tech Events</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Discover the most exciting tech events happening around the Bay Area. From AI and
            robotics to biotech and cloud computing — all curated with Eudia&apos;s commitment to
            quality and innovation.
          </p>
        </div>

        {/* Stats Cards */}
        {showStats && (
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <Calendar className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">Total Events</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.upcoming}</p>
                  <p className="text-sm text-muted-foreground">Upcoming</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <Clock className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.thisWeek}</p>
                  <p className="text-sm text-muted-foreground">This Week</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <Users className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.thisMonth}</p>
                  <p className="text-sm text-muted-foreground">This Month</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Toggle Stats Button */}
        <div className="mb-6 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowStats(!showStats)}
            className="gap-1"
          >
            {showStats ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Hide Stats
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Show Stats
              </>
            )}
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <EventFilters
            filters={filters}
            onFiltersChange={setFilters}
            availableTags={availableTags}
            availablePlatforms={availablePlatforms}
          />
        </div>

        {/* Sort Options */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {processedEvents.length} of {events.length} events
          </p>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-md border bg-background px-3 py-1 text-sm"
            >
              <option value="date-asc">Date (Soonest)</option>
              <option value="date-desc">Date (Latest)</option>
              <option value="created-desc">Newly Added</option>
            </select>
          </div>
        </div>

        {/* Events Grid */}
        {processedEvents.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {processedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          // Empty state
          <Card className="py-12">
            <CardContent className="text-center">
              <Calendar className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-semibold">No events found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your filters or search criteria
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() =>
                  setFilters({
                    search: '',
                    tags: [],
                    platforms: [],
                    dateFrom: undefined,
                    dateTo: undefined,
                  })
                }
              >
                Clear all filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}
