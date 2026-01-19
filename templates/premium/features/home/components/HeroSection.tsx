import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface HeroSectionProps {
  headline?: string
  subheadline?: string
  ctaText?: string
  ctaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  backgroundImage?: {
    url: string
    alt?: string
  }
}

export function HeroSection({
  headline = 'Trusted Legal Excellence',
  subheadline = 'Providing professional legal services with integrity and dedication. Our experienced team is committed to protecting your rights and achieving the best possible outcomes.',
  ctaText = 'Schedule Consultation',
  ctaLink = '/contact',
  secondaryCtaText = 'Our Services',
  secondaryCtaLink = '/services',
  backgroundImage,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center">
      {/* Background */}
      {backgroundImage?.url ? (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage.url}
            alt={backgroundImage.alt || 'Hero background'}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-navy/80" />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-navy via-navy-light to-navy-dark" />
      )}

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-3xl">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {headline}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-cream/90 sm:text-xl">
            {subheadline}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6">
            <Button
              asChild
              size="lg"
              className="bg-gold text-navy hover:bg-gold-light font-semibold"
            >
              <Link href={ctaLink}>{ctaText}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-cream/30 text-white hover:bg-white/10"
            >
              <Link href={secondaryCtaLink}>{secondaryCtaText}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
