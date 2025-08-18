'use client'

import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'
import { EudiaLogo } from './EudiaLogo'
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
          ? 'border-b border-gray-200 bg-white/95 shadow-eudia backdrop-blur'
          : 'border-b border-gray-200 bg-white'
      )}
    >
      <div className="container flex h-16 items-center justify-between px-12">
        <div className="flex items-center gap-4">
          <EudiaLogo variant="horizontal" size="md" linkToHome={true} />

          <div className="flex flex-col">
            <span className="font-euclid text-xl font-bold tracking-tight text-eudia-text">
              Bay Area Tech Events
            </span>
            <span className="text-xs text-eudia-text-muted">Innovation. Intelligence. Impact.</span>
          </div>
        </div>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="font-euclid text-[15px] font-medium text-eudia-text transition-colors hover:text-eudia-primary"
          >
            Events
          </Link>
          <Link
            href="/tags/AI"
            className="font-euclid text-[15px] font-medium text-eudia-text transition-colors hover:text-eudia-primary"
          >
            AI & ML
          </Link>
          <Link
            href="/tags/Robotics"
            className="font-euclid text-[15px] font-medium text-eudia-text transition-colors hover:text-eudia-primary"
          >
            Robotics
          </Link>
          <Link
            href="/platform/luma"
            className="font-euclid text-[15px] font-medium text-eudia-text transition-colors hover:text-eudia-primary"
          >
            Platforms
          </Link>
          <div className="ml-2 h-6 w-px bg-gray-300" />
          <a
            href="https://eudia.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-euclid text-[15px] font-medium text-eudia-primary transition-colors hover:text-eudia-primary-dark"
          >
            Eudia.com
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
