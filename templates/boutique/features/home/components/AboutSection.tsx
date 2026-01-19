import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

interface AboutSectionProps {
  title?: string
  subtitle?: string
  description?: string
  features?: string[]
  image?: {
    url: string
    alt?: string
  }
  ctaText?: string
  ctaLink?: string
}

export function AboutSection({
  title = 'About Our Firm',
  subtitle = 'A Legacy of Legal Excellence',
  description = 'With decades of combined experience, our team of dedicated attorneys has built a reputation for delivering exceptional legal services. We combine deep legal knowledge with a personal approach, ensuring every client receives the attention and representation they deserve.',
  features = [
    'Experienced attorneys with proven track records',
    'Personalized attention to every case',
    'Transparent communication throughout the process',
    'Commitment to achieving the best outcomes',
  ],
  image,
  ctaText = 'Learn More About Us',
  ctaLink = '/about',
}: AboutSectionProps) {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Image Column */}
          <div className="relative">
            {image?.url ? (
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={image.url}
                  alt={image.alt || 'About our law firm'}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl bg-gradient-to-br from-green to-green-light flex items-center justify-center">
                <div className="text-center text-cream/80 p-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-beige/20 flex items-center justify-center">
                    <span className="font-heading text-3xl font-bold text-beige">
                      AP
                    </span>
                  </div>
                  <p className="text-lg font-medium">Professional Excellence</p>
                  <p className="text-sm mt-1">Since 2010</p>
                </div>
              </div>
            )}
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-beige/20 rounded-lg -z-10 hidden lg:block" />
            <div className="absolute -top-4 -left-4 w-32 h-32 border-2 border-beige/30 rounded-lg -z-10 hidden lg:block" />
          </div>

          {/* Content Column */}
          <div>
            <p className="text-green font-semibold uppercase tracking-wider text-sm mb-2">
              {subtitle}
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl text-foreground mb-6">
              {title}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {description}
            </p>

            {/* Features List */}
            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green mt-0.5 shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button asChild size="lg">
              <Link href={ctaLink}>{ctaText}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
