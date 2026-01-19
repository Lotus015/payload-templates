import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { MainLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Scale,
  Shield,
  Briefcase,
  Users,
  Home,
  FileText,
  ChevronRight,
  Phone,
  type LucideIcon,
} from 'lucide-react'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

const iconMap: Record<string, LucideIcon> = {
  scale: Scale,
  shield: Shield,
  briefcase: Briefcase,
  users: Users,
  home: Home,
  'file-text': FileText,
}

function getIcon(iconName?: string): LucideIcon {
  if (!iconName) return Scale
  return iconMap[iconName.toLowerCase()] || Scale
}

async function getService(slug: string) {
  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'services',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })

    if (result.docs.length === 0) {
      return null
    }

    const service = result.docs[0]
    return {
      id: service.id as string,
      title: service.title as string,
      slug: service.slug as string,
      description: service.description as string,
      icon: service.icon as string | undefined,
    }
  } catch {
    return null
  }
}

async function getOtherServices(currentSlug: string) {
  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'services',
      where: {
        slug: {
          not_equals: currentSlug,
        },
      },
      sort: 'order',
      limit: 5,
    })

    return result.docs.map((service) => ({
      id: service.id as string,
      title: service.title as string,
      slug: service.slug as string,
      icon: service.icon as string | undefined,
    }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = await getService(slug)

  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }

  return {
    title: `${service.title} | Traditional Law Firm`,
    description: service.description,
    openGraph: {
      title: `${service.title} | Traditional Law Firm`,
      description: service.description,
      type: 'website',
    },
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const [service, otherServices] = await Promise.all([
    getService(slug),
    getOtherServices(slug),
  ])

  if (!service) {
    notFound()
  }

  const Icon = getIcon(service.icon)

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
            <Link
              href="/services"
              className="hover:text-foreground transition-colors"
            >
              Services
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{service.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-burgundy py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="mb-6 w-16 h-16 rounded-lg bg-gold flex items-center justify-center">
              <Icon className="h-8 w-8 text-burgundy" />
            </div>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-cream sm:text-5xl">
              {service.title}
            </h1>
            <p className="mt-6 text-lg text-cream/80 leading-relaxed">
              {service.description}
            </p>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="bg-gold text-burgundy hover:bg-gold-light"
              >
                <Link href="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  Schedule Consultation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="font-heading text-2xl font-bold mb-6">
                How We Can Help
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                  Our experienced team of attorneys specializes in{' '}
                  {service.title.toLowerCase()} matters, providing comprehensive
                  legal support tailored to your specific needs. We understand
                  that every case is unique, and we take the time to thoroughly
                  understand your situation before developing a strategic
                  approach.
                </p>
                <p>
                  Whether you&apos;re facing a complex legal challenge or need
                  guidance on preventive measures, our firm is committed to
                  delivering exceptional results. We combine deep legal
                  expertise with a client-centered approach to ensure you
                  receive the representation you deserve.
                </p>
                <h3 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">
                  Our Approach
                </h3>
                <ul className="space-y-2">
                  <li>Thorough case evaluation and analysis</li>
                  <li>Clear communication throughout the process</li>
                  <li>Strategic planning tailored to your goals</li>
                  <li>Dedicated representation in all proceedings</li>
                  <li>Ongoing support and guidance</li>
                </ul>
              </div>

              {/* CTA Card */}
              <Card className="mt-12 bg-muted/50">
                <CardContent className="p-8">
                  <h3 className="font-heading text-xl font-semibold mb-2">
                    Ready to discuss your case?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Contact us today for a confidential consultation. Our team
                    is ready to help you navigate your legal challenges.
                  </p>
                  <Button asChild>
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="font-heading">Other Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-2">
                    {otherServices.map((otherService) => {
                      const OtherIcon = getIcon(otherService.icon)
                      return (
                        <Link
                          key={otherService.id}
                          href={`/services/${otherService.slug}`}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
                        >
                          <div className="w-8 h-8 rounded bg-burgundy/10 flex items-center justify-center group-hover:bg-burgundy-dark transition-colors">
                            <OtherIcon className="h-4 w-4 text-burgundy group-hover:text-gold transition-colors" />
                          </div>
                          <span className="text-sm font-medium group-hover:text-gold transition-colors">
                            {otherService.title}
                          </span>
                        </Link>
                      )
                    })}
                  </nav>

                  <div className="mt-6 pt-6 border-t">
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/services">View All Services</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
