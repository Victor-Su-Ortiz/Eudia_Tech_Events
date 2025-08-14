import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-muted/50">
      <div className="container py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="col-span-2">
            <h3 className="mb-4 text-lg font-semibold">Bay Area Tech Events</h3>
            <p className="text-sm text-muted-foreground">
              Curated by Eudia, this platform showcases the most exciting tech events 
              happening around the Bay Area. From AI and robotics to biotech and cloud computing, 
              stay connected with the innovation ecosystem.
            </p>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  All Events
                </Link>
              </li>
              <li>
                <Link href="/tags/AI" className="text-muted-foreground hover:text-primary">
                  AI Events
                </Link>
              </li>
              <li>
                <Link href="/tags/Robotics" className="text-muted-foreground hover:text-primary">
                  Robotics Events
                </Link>
              </li>
              <li>
                <Link href="/platform/luma" className="text-muted-foreground hover:text-primary">
                  Luma Events
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold">Platforms</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/platform/luma" className="text-muted-foreground hover:text-primary">
                  Luma
                </Link>
              </li>
              <li>
                <Link href="/platform/eventbrite" className="text-muted-foreground hover:text-primary">
                  Eventbrite
                </Link>
              </li>
              <li>
                <Link href="/platform/meetup" className="text-muted-foreground hover:text-primary">
                  Meetup
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Eudia. Built with efficiency, clarity, and trust.
            </p>
            <div className="flex gap-4 text-sm">
              <a 
                href="https://eudia.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                Eudia.com
              </a>
              <a 
                href="https://github.com/eudia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
