import Link from 'next/link'
import { Calendar } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Calendar className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold">Bay Area Tech Events</span>
          <span className="text-xs text-muted-foreground border-l pl-2 ml-1">by Eudia</span>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link 
            href="/" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Events
          </Link>
          <Link 
            href="/tags/AI" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            AI & ML
          </Link>
          <Link 
            href="/platform/luma" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Platforms
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
