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
          ? 'border-b border-gray-200 bg-white/95 shadow-eudia backdrop-blur'
          : 'border-b border-gray-200 bg-white'
      )}
    >
      <div className="container flex h-16 items-center justify-between px-12">
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
          <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-eudia-primary shadow-lg">
            <Sparkles className="h-6 w-6 text-white" />
            <div className="absolute inset-0 rounded-lg bg-white/10" />
          </div>

          <div className="flex flex-col">
            <span className="font-euclid text-xl font-bold tracking-tight text-eudia-text">
              Bay Area Tech Events
            </span>
            <span className="text-xs text-eudia-text-muted">
              Powered by <span className="font-semibold text-eudia-primary">Eudia</span> •
              Innovation. Intelligence. Impact.
            </span>
          </div>
        </Link>

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
