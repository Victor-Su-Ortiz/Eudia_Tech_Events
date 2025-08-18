'use client'

import { EudiaLogo } from './EudiaLogo'

export function EudiaLoader() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="relative">
        <div className="h-24 w-24 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-pulse">
            <EudiaLogo variant="vertical" size="sm" linkToHome={false} />
          </div>
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
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
      </div>
      <span className="text-xs text-muted-foreground">Loading...</span>
    </div>
  )
}
