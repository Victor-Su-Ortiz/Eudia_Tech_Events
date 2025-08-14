import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Bay Area Tech Events | Eudia',
    template: '%s | Bay Area Tech Events',
  },
  description:
    'Discover the most exciting tech events happening around the Bay Area. From AI and robotics to biotech and cloud computing.',
  keywords: [
    'tech events',
    'bay area',
    'silicon valley',
    'AI',
    'robotics',
    'biotech',
    'cloud',
    'meetups',
    'conferences',
  ],
  authors: [{ name: 'Eudia' }],
  creator: 'Eudia',
  publisher: 'Eudia',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://events.eudia.com'),
  openGraph: {
    title: 'Bay Area Tech Events',
    description: 'Discover the most exciting tech events happening around the Bay Area',
    url: 'https://events.eudia.com',
    siteName: 'Bay Area Tech Events',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bay Area Tech Events',
    description: 'Discover the most exciting tech events happening around the Bay Area',
    creator: '@eudia',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
