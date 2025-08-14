'use client'

import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        scrolled
          ? 'border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
          : 'border-b bg-background'
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          {/* Option 1: Use Eudia PNG logo when available */}
          {/* Uncomment this when you add eudia-logo.png to public/images/ */}
          {/* <Image
            src="/images/eudia-logo.png"
            alt="Eudia"
            width={40}
            height={40}
            className="rounded-lg"
            priority
          /> */}

          {/* Option 2: Current gradient icon (remove when using PNG) */}
          <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary via-primary/80 to-primary/60 shadow-lg">
            <Sparkles className="h-6 w-6 text-white" />
            <div className="absolute inset-0 rounded-lg bg-white/20" />
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight">Bay Area Tech Events</span>
            <span className="text-xs text-muted-foreground">
              Powered by <span className="font-semibold text-primary">Eudia</span> • Efficiency.
              Clarity. Trust.
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Events
          </Link>
          <Link
            href="/tags/AI"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            AI & ML
          </Link>
          <Link
            href="/tags/Robotics"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Robotics
          </Link>
          <Link
            href="/platform/luma"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Platforms
          </Link>
          <div className="ml-2 h-6 w-px bg-border" />
          <a
            href="https://eudia.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            Eudia.com
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
