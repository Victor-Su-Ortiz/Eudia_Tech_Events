import Link from 'next/link'
import { Sparkles } from 'lucide-react'

interface EudiaLogoProps {
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
  linkToHome?: boolean
}

export function EudiaLogo({ showText = true, size = 'md', linkToHome = true }: EudiaLogoProps) {
  const logoContent = (
    <div className="flex items-center gap-3">
      {/* Gradient icon with Eudia branding */}
      <div
        className={`relative flex items-center justify-center rounded-lg bg-gradient-to-br from-primary via-primary/80 to-primary/60 shadow-lg ${
          size === 'sm' ? 'h-8 w-8' : size === 'md' ? 'h-10 w-10' : 'h-12 w-12'
        }`}
      >
        <Sparkles
          className={`text-white ${
            size === 'sm' ? 'h-5 w-5' : size === 'md' ? 'h-6 w-6' : 'h-8 w-8'
          }`}
        />
        <div className="absolute inset-0 rounded-lg bg-white/20" />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-bold tracking-tight ${
              size === 'sm' ? 'text-lg' : size === 'md' ? 'text-xl' : 'text-2xl'
            }`}
          >
            Eudia
          </span>
          <span
            className={`text-muted-foreground ${
              size === 'sm' ? 'text-xs' : size === 'md' ? 'text-xs' : 'text-sm'
            }`}
          >
            Efficiency. Clarity. Trust.
          </span>
        </div>
      )}
    </div>
  )

  if (linkToHome) {
    return (
      <Link href="/" className="transition-opacity hover:opacity-90">
        {logoContent}
      </Link>
    )
  }

  return logoContent
}
