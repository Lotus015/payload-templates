import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { MainLayout } from '@/components/layout'
import { ContactSection } from '@/features/home/components'
import { ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us | Premium Law Firm',
  description:
    'Get in touch with our experienced legal team. Schedule a consultation or ask us a question. We are here to help with your legal needs.',
  openGraph: {
    title: 'Contact Us | Premium Law Firm',
    description:
      'Get in touch with our experienced legal team. Schedule a consultation today.',
    type: 'website',
  },
}

interface ContactInfo {
  email?: string
  phone?: string
  address?: string
  workingHours?: string
}

async function getContactInfo(): Promise<ContactInfo> {
  try {
    const payload = await getPayload({ config })

    const siteSettings = await payload.findGlobal({
      slug: 'site-settings',
    })

    return {
      email: siteSettings.contactEmail as string,
      phone: siteSettings.contactPhone as string,
      address: siteSettings.address as string | undefined,
      workingHours: siteSettings.workingHours as string | undefined,
    }
  } catch {
    return {
      email: 'contact@example.com',
      phone: '+1 (555) 000-0000',
      address: '123 Main Street\nCity, State 12345',
      workingHours: 'Monday - Friday: 9:00 AM - 6:00 PM',
    }
  }
}

export default async function ContactPage() {
  const contactInfo = await getContactInfo()

  return (
    <MainLayout>
      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Contact</span>
          </nav>
        </div>
      </div>

      {/* Header Section */}
      <section className="bg-navy py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-cream sm:text-5xl">
              Contact Us
            </h1>
            <p className="mt-4 text-lg text-cream/80">
              Have a legal question or need professional assistance? Our
              experienced team is ready to help. Reach out today for a
              confidential consultation.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection
        contactInfo={contactInfo}
        title="Send Us a Message"
        subtitle="Fill out the form below and we will get back to you within 24 hours."
      />

      {/* Additional Info Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-2xl font-bold mb-4">
              What to Expect
            </h2>
            <p className="text-muted-foreground mb-8">
              When you reach out to us, here&apos;s what happens next:
            </p>

            <div className="grid gap-8 md:grid-cols-3 text-left">
              <div className="p-6 bg-background rounded-lg shadow-sm">
                <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center mb-4">
                  <span className="text-gold font-bold">1</span>
                </div>
                <h3 className="font-heading font-semibold mb-2">
                  Initial Response
                </h3>
                <p className="text-sm text-muted-foreground">
                  We&apos;ll acknowledge your inquiry within 24 hours and
                  schedule an initial consultation.
                </p>
              </div>

              <div className="p-6 bg-background rounded-lg shadow-sm">
                <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center mb-4">
                  <span className="text-gold font-bold">2</span>
                </div>
                <h3 className="font-heading font-semibold mb-2">
                  Consultation
                </h3>
                <p className="text-sm text-muted-foreground">
                  During our meeting, we&apos;ll discuss your situation and
                  explain your legal options.
                </p>
              </div>

              <div className="p-6 bg-background rounded-lg shadow-sm">
                <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center mb-4">
                  <span className="text-gold font-bold">3</span>
                </div>
                <h3 className="font-heading font-semibold mb-2">Action Plan</h3>
                <p className="text-sm text-muted-foreground">
                  We&apos;ll provide a clear strategy and begin working on your
                  case immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
