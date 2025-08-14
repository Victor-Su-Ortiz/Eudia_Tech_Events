'use client'

import { Sparkles } from 'lucide-react'

export function EudiaLoader() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="relative">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="animate-pulse-eudia h-6 w-6 text-primary" />
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-muted-foreground">Loading events...</p>
        <p className="text-xs text-muted-foreground">Powered by Eudia</p>
      </div>
    </div>
  )
}

export function EudiaLoaderSmall() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
        <Sparkles className="animate-pulse-eudia absolute inset-0 m-auto h-3 w-3 text-primary" />
      </div>
      <span className="text-xs text-muted-foreground">Loading...</span>
    </div>
  )
}
