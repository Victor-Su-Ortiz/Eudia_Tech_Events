import Link from 'next/link'
import { Sparkles, Github, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react'

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-muted/30">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Eudia Branding */}
          <div className="col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary via-primary/80 to-primary/60 shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
                <div className="absolute inset-0 rounded-lg bg-white/20" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Bay Area Tech Events</h3>
                <p className="text-xs text-muted-foreground">by Eudia</p>
              </div>
            </div>

            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              Curated by <span className="font-semibold text-foreground">Eudia</span>, this platform
              showcases the most exciting tech events happening around the Bay Area. Built with our
              core principles of <span className="font-medium">efficiency</span>,
              <span className="font-medium"> clarity</span>, and
              <span className="font-medium"> trust</span>.
            </p>

            <div className="flex items-center gap-4">
              <a
                href="https://eudia.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Visit Eudia.com
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  All Events
                </Link>
              </li>
              <li>
                <Link
                  href="/tags/AI"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  AI & Machine Learning
                </Link>
              </li>
              <li>
                <Link
                  href="/tags/Robotics"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Robotics
                </Link>
              </li>
              <li>
                <Link
                  href="/tags/BioTech"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  BioTech
                </Link>
              </li>
              <li>
                <Link
                  href="/platform/luma"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Browse by Platform
                </Link>
              </li>
            </ul>
          </div>

          {/* Eudia Resources */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Eudia Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://eudia.com/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  About Eudia
                </a>
              </li>
              <li>
                <a
                  href="https://eudia.com/products"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Our Products
                </a>
              </li>
              <li>
                <a
                  href="https://eudia.com/blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="https://eudia.com/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} <span className="font-semibold">Eudia</span>. All
                rights reserved.
              </p>
              <p className="text-xs text-muted-foreground">
                Built with human-centered design principles for the tech community.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/eudia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/eudia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/company/eudia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:events@eudia.com"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
