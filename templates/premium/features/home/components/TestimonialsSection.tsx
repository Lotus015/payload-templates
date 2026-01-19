'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

interface Testimonial {
  id: string
  clientName: string
  clientRole?: string
  content: string
  rating?: number
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
  title?: string
  subtitle?: string
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating
              ? 'fill-gold text-gold'
              : 'fill-muted text-muted-foreground'
          }`}
        />
      ))}
    </div>
  )
}

export function TestimonialsSection({
  testimonials,
  title = 'What Our Clients Say',
  subtitle = 'Read testimonials from clients who have trusted us with their legal matters.',
}: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const showCarousel = testimonials.length > 3
  const visibleTestimonials = showCarousel
    ? [testimonials[currentIndex]]
    : testimonials

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    )
  }

  if (testimonials.length === 0) {
    return null
  }

  return (
    <section className="py-16 lg:py-24 bg-navy">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl text-cream">
            {title}
          </h2>
          <p className="mt-4 text-cream/70 text-lg">{subtitle}</p>
        </div>

        {/* Testimonials Grid or Carousel */}
        {showCarousel ? (
          <div className="max-w-3xl mx-auto">
            <Card className="bg-cream border-0">
              <CardContent className="p-8 lg:p-12">
                <Quote className="h-12 w-12 text-gold/30 mb-6" />
                {visibleTestimonials.map((testimonial) => (
                  <div key={testimonial.id}>
                    {testimonial.rating && (
                      <div className="mb-4">
                        <StarRating rating={testimonial.rating} />
                      </div>
                    )}
                    <blockquote className="text-foreground text-lg lg:text-xl leading-relaxed mb-6">
                      &ldquo;{testimonial.content}&rdquo;
                    </blockquote>
                    <div>
                      <p className="font-semibold text-foreground">
                        {testimonial.clientName}
                      </p>
                      {testimonial.clientRole && (
                        <p className="text-muted-foreground text-sm">
                          {testimonial.clientRole}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Carousel Controls */}
            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="border-cream/30 text-cream hover:bg-cream/10"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Previous testimonial</span>
              </Button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-gold' : 'bg-cream/30'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="border-cream/30 text-cream hover:bg-cream/10"
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Next testimonial</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-cream border-0">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-gold/30 mb-4" />
                  {testimonial.rating && (
                    <div className="mb-3">
                      <StarRating rating={testimonial.rating} />
                    </div>
                  )}
                  <blockquote className="text-foreground leading-relaxed mb-4 line-clamp-4">
                    &ldquo;{testimonial.content}&rdquo;
                  </blockquote>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.clientName}
                    </p>
                    {testimonial.clientRole && (
                      <p className="text-muted-foreground text-sm">
                        {testimonial.clientRole}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
