# Bay Area Tech Events by Eudia

A modern, performant web application for discovering and tracking tech events in the Bay Area. Built by **[Eudia](https://eudia.com)** with principles of efficiency, clarity, and trust. Powered by Next.js 14 (App Router), TypeScript, Tailwind CSS, and deployed on Vercel.

🌐 **Live Demo**: [events.eudia.com](https://events.eudia.com)
🏢 **Built by**: [Eudia - Human-Centered Technology](https://eudia.com)

## Features

- 📅 **Comprehensive Event Listings** - Aggregated from multiple platforms (Luma, Eventbrite, Meetup)
- 🔍 **Advanced Search & Filtering** - Search by keywords, tags, platforms, and date ranges
- 🏷️ **Smart Categorization** - Events tagged by technology domain (AI, Robotics, BioTech, Cloud, etc.)
- 📱 **Responsive Design** - Beautiful experience on all devices
- 🌓 **Dark Mode** - System-aware theme with manual toggle
- 📊 **Event Statistics** - Real-time stats on upcoming events
- 🔗 **Social Sharing** - Share events with OG image generation
- 📆 **Calendar Integration** - Download .ics files or add to Google Calendar
- ♿ **Accessible** - WCAG AA compliant
- ⚡ **Fast** - Static generation with ISR for optimal performance

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Search**: Fuse.js (client-side)
- **Calendar**: ics library
- **Date Handling**: date-fns
- **Validation**: Zod
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/eudia/bay-area-tech-events.git
cd bay-area-tech-events
```

2. Install dependencies:

```bash
pnpm install
```

3. Create environment file:

```bash
cp .env.example .env.local
```

4. Run development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Content Management

### Data Structure

Events are stored in `data/events.json` with the following schema:

```typescript
{
  id: string           // Unique identifier
  slug: string         // URL-safe slug
  title: string        // Event title
  source: string       // Platform: luma | eventbrite | meetup | custom
  eventUrl: string     // External event page
  start: string        // ISO datetime with timezone
  end?: string         // Optional end time
  timezone: string     // e.g., "America/Los_Angeles"
  venue?: {
    name?: string
    address?: string
    city?: string
    lat?: number
    lng?: number
  }
  image?: string       // Event image URL
  price?: string       // e.g., "Free", "$50"
  rsvpRequired?: boolean
  organizer?: {
    name?: string
    url?: string
    logo?: string
  }
  tags: string[]       // Technology categories
  summary: string      // Short description
  descriptionMd: string // Markdown description
  createdAt: string    // ISO datetime
  updatedAt: string    // ISO datetime
}
```

### CLI Scripts

#### Add Event

```bash
pnpm add-event \
  --url "https://lu.ma/event" \
  --title "AI Summit 2025" \
  --start "2025-03-15T09:00:00-07:00" \
  --timezone "America/Los_Angeles" \
  --tags "AI,Machine Learning" \
  --summary "Annual AI conference" \
  --price "$299" \
  --venueName "Moscone Center" \
  --venueCity "San Francisco"
```

#### Edit Event

```bash
pnpm edit-event \
  --slug "ai-summit-2025" \
  --title "AI & ML Summit 2025" \
  --tags "AI,ML,Deep Learning"
```

#### Import CSV

```bash
pnpm import-csv --file events.csv
```

CSV format:

```csv
title,url,start,tags,summary
"Event Title","https://event.url","2025-01-01T10:00:00-08:00","AI,Cloud","Event summary"
```

#### Validate Data

```bash
pnpm validate
```

## Project Structure

```
├── app/
│   ├── (routes)/          # Page routes
│   │   ├── page.tsx        # Home page
│   │   ├── events/[slug]/  # Event detail pages
│   │   ├── tags/[tag]/     # Tag filtered pages
│   │   └── platform/[name]/ # Platform filtered pages
│   ├── (ui)/              # UI components
│   │   ├── components/     # React components
│   │   └── theme.ts        # Theme configuration
│   ├── api/               # API routes
│   │   ├── healthz/        # Health check
│   │   ├── ics/[slug]/     # Calendar file generation
│   │   └── og/             # OG image generation
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── lib/                   # Utility functions
│   ├── schema.ts          # Zod schemas
│   ├── events.ts          # Event data operations
│   ├── utils.ts           # Helper functions
│   ├── calendar.ts        # ICS generation
│   └── og.ts              # OG image helpers
├── data/
│   └── events.json        # Event data (Git-based CMS)
├── scripts/               # CLI tools
│   ├── add-event.ts       # Add new event
│   ├── edit-event.ts      # Edit existing event
│   ├── import-csv.ts      # Import from CSV
│   └── validate.ts        # Validate data
├── tests/                 # Test files
│   ├── unit/              # Unit tests
│   └── e2e/               # End-to-end tests
└── types/                 # TypeScript definitions
```

## Development

### Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm typecheck        # Run TypeScript checks
pnpm format           # Format with Prettier

# Testing
pnpm test             # Run unit tests
pnpm test:e2e         # Run E2E tests

# Content Management
pnpm validate         # Validate events data
pnpm add-event        # Add new event
pnpm edit-event       # Edit existing event
pnpm import-csv       # Import from CSV
```

### Testing

- **Unit Tests**: Vitest for schema validation and utilities
- **E2E Tests**: Playwright for user flows
- **Coverage**: Run `pnpm test -- --coverage`

### Code Style

- ESLint with Next.js configuration
- Prettier for formatting
- Husky for pre-commit hooks

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy with default settings

```bash
# Manual deployment
vercel deploy
```

### Environment Variables

```env
NEXT_PUBLIC_SITE_URL=https://events.eudia.com
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id
```

### Performance Optimizations

- **ISR**: Pages revalidate every 60 seconds
- **Static Generation**: All pages pre-rendered at build
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic per-route
- **Font Optimization**: System fonts for fast loading

## API Documentation

### Public Endpoints

#### Health Check

```
GET /api/healthz
Response: { ok: true }
```

#### Calendar File

```
GET /api/ics/[slug]
Response: text/calendar file
```

#### OG Image

```
GET /api/og?slug=[slug]
Response: PNG image (1200x630)
```

#### Sitemap

```
GET /sitemap.xml
Response: XML sitemap
```

#### Robots

```
GET /robots.txt
Response: Robots.txt file
```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Development Guidelines

- Write tests for new features
- Follow existing code style
- Update documentation
- Ensure accessibility standards
- Optimize for performance

## Roadmap

- [ ] Email notifications for new events
- [ ] User accounts and saved events
- [ ] Event submission form
- [ ] RSS feed
- [ ] API for external integrations
- [ ] Advanced analytics dashboard
- [ ] Multi-region support

## License

MIT License - see [LICENSE](LICENSE) file for details

## About Eudia

**[Eudia](https://eudia.com)** is committed to building technology with human-centered design principles. We focus on three core values:

- **🚀 Efficiency**: Fast, intuitive, and streamlined experiences
- **💡 Clarity**: Clear communication and transparent design
- **🤝 Trust**: Reliable, secure, and honest technology

This Bay Area Tech Events platform embodies these principles by providing:

- Fast, server-side rendered pages for optimal performance
- Clear, accessible design with WCAG AA compliance
- Transparent event sourcing with platform attribution
- Reliable data validation and error handling

## Credits

Built with ❤️ by **[Eudia](https://eudia.com)** - Human-Centered Technology for the Modern World.

Visit us at [eudia.com](https://eudia.com) to learn more about our products and services.

### Technologies Used

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Vercel](https://vercel.com/)

## Support

For issues, questions, or suggestions:

- Open an [issue](https://github.com/eudia/bay-area-tech-events/issues)
- Contact: events@eudia.com
- Twitter: [@eudia](https://twitter.com/eudia)
