import Link from 'next/link'
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

interface Service {
  id: string
  title: string
  slug: string
}

interface SocialLink {
  platform: 'facebook' | 'twitter' | 'linkedin' | 'instagram' | 'youtube'
  url: string
}

interface SiteSettingsData {
  firmName: string
  tagline?: string
  contactEmail: string
  contactPhone: string
  address?: string
  socialLinks?: SocialLink[]
  workingHours?: string
}

interface FooterProps {
  services?: Service[]
  siteSettings?: SiteSettingsData
}

const socialIcons = {
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  youtube: Youtube,
}

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Team', href: '/team' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export function Footer({ services = [], siteSettings }: FooterProps) {
  const firmName = siteSettings?.firmName || 'Law Firm Name'
  const tagline = siteSettings?.tagline || 'Professional Legal Services'
  const contactEmail = siteSettings?.contactEmail || 'contact@example.com'
  const contactPhone = siteSettings?.contactPhone || '+1 (555) 000-0000'
  const address = siteSettings?.address || '123 Main Street\nCity, State 12345'
  const socialLinks = siteSettings?.socialLinks || []
  const workingHours = siteSettings?.workingHours || 'Monday - Friday: 9:00 AM - 6:00 PM'

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Firm Info */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold">{firmName}</h3>
            <p className="text-sm text-primary-foreground/80">{tagline}</p>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex gap-4 pt-2">
                {socialLinks.map((social, index) => {
                  const Icon = socialIcons[social.platform]
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-foreground/70 transition-colors hover:text-secondary"
                      aria-label={`Follow us on ${social.platform}`}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-primary-foreground/80 transition-colors hover:text-secondary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">Practice Areas</h4>
            <nav className="flex flex-col gap-2">
              {services.length > 0 ? (
                services.slice(0, 6).map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="text-sm text-primary-foreground/80 transition-colors hover:text-secondary"
                  >
                    {service.title}
                  </Link>
                ))
              ) : (
                <span className="text-sm text-primary-foreground/60">Services coming soon</span>
              )}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <a
                href={`mailto:${contactEmail}`}
                className="flex items-start gap-3 text-primary-foreground/80 transition-colors hover:text-secondary"
              >
                <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{contactEmail}</span>
              </a>
              <a
                href={`tel:${contactPhone.replace(/\s/g, '')}`}
                className="flex items-start gap-3 text-primary-foreground/80 transition-colors hover:text-secondary"
              >
                <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{contactPhone}</span>
              </a>
              <div className="flex items-start gap-3 text-primary-foreground/80">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span className="whitespace-pre-line">{address}</span>
              </div>
            </div>

            {/* Working Hours */}
            <div className="pt-2">
              <p className="text-xs text-primary-foreground/60 whitespace-pre-line">
                {workingHours}
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-primary-foreground/60 md:flex-row">
          <p>&copy; {currentYear} {firmName}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-secondary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-secondary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
