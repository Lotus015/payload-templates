import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Scale,
  Shield,
  Briefcase,
  Users,
  Home,
  FileText,
  type LucideIcon,
} from 'lucide-react'

interface Service {
  id: string
  title: string
  slug: string
  description: string
  icon?: string
}

interface ServicesSectionProps {
  services: Service[]
  title?: string
  subtitle?: string
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

export function ServicesSection({
  services,
  title = 'Our Practice Areas',
  subtitle = 'We provide comprehensive legal services across multiple areas of law, ensuring expert representation for all your legal needs.',
}: ServicesSectionProps) {
  return (
    <section className="py-16 lg:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            {title}
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            {subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = getIcon(service.icon)
            return (
              <Card
                key={service.id}
                className="group transition-all hover:shadow-lg hover:border-blue/50"
              >
                <CardHeader>
                  <div className="mb-4 w-12 h-12 rounded-lg bg-blue flex items-center justify-center group-hover:bg-blue-dark transition-colors">
                    <Icon className="h-6 w-6 text-white group-hover:text-white transition-colors" />
                  </div>
                  <CardTitle className="font-heading text-xl">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {service.description}
                  </p>
                  <Button asChild variant="link" className="p-0 h-auto text-blue">
                    <Link href={`/services/${service.slug}`}>
                      Learn More &rarr;
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* View All Services */}
        {services.length > 0 && (
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
