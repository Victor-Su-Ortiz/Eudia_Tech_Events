'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Search, Filter, Calendar, Tag, X, ChevronDown } from 'lucide-react'
import { EventSource, FilterState } from '@/types'
import { getPlatformDisplayName } from '@/lib/utils'

interface EventFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  availableTags: string[]
  availablePlatforms: EventSource[]
}

export function EventFilters({
  filters,
  onFiltersChange,
  availableTags,
  availablePlatforms,
}: EventFiltersProps) {
  const [searchInput, setSearchInput] = useState(filters.search)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== filters.search) {
        onFiltersChange({ ...filters, search: searchInput })
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [searchInput, filters, onFiltersChange])

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag]
    onFiltersChange({ ...filters, tags: newTags })
  }

  const handlePlatformToggle = (platform: EventSource) => {
    const newPlatforms = filters.platforms.includes(platform)
      ? filters.platforms.filter((p) => p !== platform)
      : [...filters.platforms, platform]
    onFiltersChange({ ...filters, platforms: newPlatforms })
  }

  const handleClearFilters = () => {
    setSearchInput('')
    onFiltersChange({
      search: '',
      tags: [],
      platforms: [],
      dateFrom: undefined,
      dateTo: undefined,
    })
  }

  const hasActiveFilters = 
    filters.search || 
    filters.tags.length > 0 || 
    filters.platforms.length > 0 ||
    filters.dateFrom ||
    filters.dateTo

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search events, tags, organizers, locations..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {/* Tags Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <Tag className="h-4 w-4" />
              Tags
              {filters.tags.length > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 px-1">
                  {filters.tags.length}
                </Badge>
              )}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 max-h-80 overflow-y-auto">
            <DropdownMenuLabel>Filter by Tags</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {availableTags.map((tag) => (
              <DropdownMenuCheckboxItem
                key={tag}
                checked={filters.tags.includes(tag)}
                onCheckedChange={() => handleTagToggle(tag)}
              >
                {tag}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Platform Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-4 w-4" />
              Platform
              {filters.platforms.length > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 px-1">
                  {filters.platforms.length}
                </Badge>
              )}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>Filter by Platform</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {availablePlatforms.map((platform) => (
              <DropdownMenuCheckboxItem
                key={platform}
                checked={filters.platforms.includes(platform)}
                onCheckedChange={() => handlePlatformToggle(platform)}
              >
                {getPlatformDisplayName(platform)}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Date Range Picker */}
        <div className="flex gap-2">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Input
              type="date"
              value={filters.dateFrom ? filters.dateFrom.toISOString().split('T')[0] : ''}
              onChange={(e) => 
                onFiltersChange({ 
                  ...filters, 
                  dateFrom: e.target.value ? new Date(e.target.value) : undefined 
                })
              }
              className="h-9 text-sm"
              placeholder="From"
            />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground">to</span>
            <Input
              type="date"
              value={filters.dateTo ? filters.dateTo.toISOString().split('T')[0] : ''}
              onChange={(e) => 
                onFiltersChange({ 
                  ...filters, 
                  dateTo: e.target.value ? new Date(e.target.value) : undefined 
                })
              }
              className="h-9 text-sm"
              placeholder="To"
            />
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="gap-1"
          >
            <X className="h-4 w-4" />
            Clear all
          </Button>
        )}
      </div>

      {/* Active Filter Chips */}
      {(filters.tags.length > 0 || filters.platforms.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {filters.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="gap-1 px-2 py-1"
            >
              {tag}
              <button
                onClick={() => handleTagToggle(tag)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {filters.platforms.map((platform) => (
            <Badge
              key={platform}
              variant="secondary"
              className="gap-1 px-2 py-1"
            >
              {getPlatformDisplayName(platform)}
              <button
                onClick={() => handlePlatformToggle(platform)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
