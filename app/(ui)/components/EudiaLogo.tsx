'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

interface EudiaLogoProps {
  variant?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
  linkToHome?: boolean
  className?: string
}

export function EudiaLogo({
  variant = 'horizontal',
  size = 'md',
  linkToHome = true,
  className = '',
}: EudiaLogoProps) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Determine which logo to use based on theme and variant
  const getLogoPath = () => {
    const orientation = variant === 'horizontal' ? 'Horizontal' : 'Vertical'

    if (!mounted) {
      // Return a default logo during SSR
      return `/images/Eudia-${orientation}-Black.svg`
    }

    // For now, always use Black logo since the app has a white background
    // You can change this logic if you implement proper dark mode with dark backgrounds
    const isDark = resolvedTheme === 'dark'
    // Inverted: use Black logo on light backgrounds, White logo only on truly dark backgrounds
    const color = 'Black' // Always use Black for visibility on white backgrounds

    return `/images/Eudia-${orientation}-${color}.svg`
  }

  // Size configurations
  const sizeConfig = {
    sm: {
      horizontal: { width: 100, height: 30 },
      vertical: { width: 60, height: 60 },
    },
    md: {
      horizontal: { width: 140, height: 42 },
      vertical: { width: 80, height: 80 },
    },
    lg: {
      horizontal: { width: 180, height: 54 },
      vertical: { width: 100, height: 100 },
    },
  }

  const dimensions = sizeConfig[size][variant]

  const logoContent = (
    <div className={`relative ${className}`}>
      {mounted ? (
        <Image
          src={getLogoPath()}
          alt="Eudia"
          width={dimensions.width}
          height={dimensions.height}
          className="transition-opacity"
          priority
        />
      ) : (
        // Placeholder during SSR to prevent layout shift
        <div
          style={{
            width: dimensions.width,
            height: dimensions.height,
          }}
          className="animate-pulse rounded bg-gray-200"
        />
      )}
    </div>
  )

  if (linkToHome) {
    return (
      <Link href="/" className="inline-block transition-opacity hover:opacity-80">
        {logoContent}
      </Link>
    )
  }

  return logoContent
}
