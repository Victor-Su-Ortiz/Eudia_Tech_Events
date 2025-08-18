import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react'
import { EudiaLogo } from './EudiaLogo'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-eudia-bg-section">
      <div className="container px-12 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Eudia Branding */}
          <div className="col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <EudiaLogo variant="vertical" size="md" linkToHome={false} />
              <div>
                <h3 className="font-euclid text-lg font-bold text-eudia-text">
                  Bay Area Tech Events
                </h3>
                <p className="text-xs text-eudia-text-muted">by Eudia</p>
              </div>
            </div>

            <p className="mb-4 font-public text-sm leading-relaxed text-eudia-text-muted">
              Curated by <span className="font-semibold text-eudia-text">Eudia</span>, this platform
              showcases the most exciting tech events happening around the Bay Area. Built with our
              core principles of <span className="font-medium">innovation</span>,
              <span className="font-medium"> intelligence</span>, and
              <span className="font-medium"> impact</span>.
            </p>

            <div className="flex items-center gap-4">
              <a
                href="https://eudia.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-button bg-eudia-primary px-6 py-2 font-euclid text-sm font-bold text-white transition-colors hover:bg-eudia-primary-dark"
              >
                Visit Eudia.com
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-euclid text-sm font-semibold text-eudia-text">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="font-public text-eudia-text-muted transition-colors hover:text-eudia-primary"
                >
                  All Events
                </Link>
              </li>
              <li>
                <Link
                  href="/tags/AI"
                  className="font-public text-eudia-text-muted transition-colors hover:text-eudia-primary"
                >
                  AI & Machine Learning
                </Link>
              </li>
              <li>
                <Link
                  href="/tags/Robotics"
                  className="font-public text-eudia-text-muted transition-colors hover:text-eudia-primary"
                >
                  Robotics
                </Link>
              </li>
              <li>
                <Link
                  href="/tags/BioTech"
                  className="font-public text-eudia-text-muted transition-colors hover:text-eudia-primary"
                >
                  BioTech
                </Link>
              </li>
              <li>
                <Link
                  href="/platform/luma"
                  className="font-public text-eudia-text-muted transition-colors hover:text-eudia-primary"
                >
                  Browse by Platform
                </Link>
              </li>
            </ul>
          </div>

          {/* Eudia Resources */}
          <div>
            <h4 className="mb-4 font-euclid text-sm font-semibold text-eudia-text">
              Eudia Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://eudia.com/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-public text-eudia-text-muted transition-colors hover:text-eudia-primary"
                >
                  About Eudia
                </a>
              </li>
              <li>
                <a
                  href="https://eudia.com/products"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-public text-eudia-text-muted transition-colors hover:text-eudia-primary"
                >
                  Our Products
                </a>
              </li>
              <li>
                <a
                  href="https://eudia.com/blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-public text-eudia-text-muted transition-colors hover:text-eudia-primary"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="https://eudia.com/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-public text-eudia-text-muted transition-colors hover:text-eudia-primary"
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
              <p className="font-public text-sm text-eudia-text-muted">
                © {new Date().getFullYear()}{' '}
                <span className="font-semibold text-eudia-text">Eudia</span>. All rights reserved.
              </p>
              <p className="font-public text-xs text-eudia-text-muted">
                AI-powered legal solutions for modern teams.
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
