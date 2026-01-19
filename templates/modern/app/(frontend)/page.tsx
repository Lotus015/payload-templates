import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { MainLayout } from '@/components/layout'
import {
  HeroSection,
  ServicesSection,
  AboutSection,
  TestimonialsSection,
  BlogSection,
  ContactSection,
} from '@/features/home/components'

export const metadata: Metadata = {
  title: 'Home | Modern Law Firm Template',
  description:
    'Professional law firm providing expert legal services with integrity and dedication. Contact us for a consultation.',
  openGraph: {
    title: 'Home | Modern Law Firm Template',
    description:
      'Professional law firm providing expert legal services with integrity and dedication.',
    type: 'website',
  },
}

async function getHomePageData() {
  try {
    const payload = await getPayload({ config })

    const [servicesResult, testimonialsResult, blogPostsResult, siteSettings] =
      await Promise.all([
        payload.find({
          collection: 'services',
          sort: 'order',
          limit: 6,
        }),
        payload.find({
          collection: 'testimonials',
          sort: 'order',
          limit: 6,
        }),
        payload.find({
          collection: 'blog-posts',
          sort: '-publishedDate',
          limit: 3,
        }),
        payload.findGlobal({
          slug: 'site-settings',
        }),
      ])

    const services = servicesResult.docs.map((service) => ({
      id: service.id as string,
      title: service.title as string,
      slug: service.slug as string,
      description: (service.description as string) || '',
      icon: service.icon as string | undefined,
    }))

    const testimonials = testimonialsResult.docs.map((testimonial) => ({
      id: testimonial.id as string,
      clientName: testimonial.clientName as string,
      clientRole: testimonial.clientRole as string | undefined,
      content: testimonial.content as string,
      rating: testimonial.rating as number | undefined,
    }))

    const blogPosts = blogPostsResult.docs.map((post) => ({
      id: post.id as string,
      title: post.title as string,
      slug: post.slug as string,
      excerpt: post.excerpt as string | undefined,
      featuredImage: post.featuredImage
        ? {
            url: (post.featuredImage as { url?: string }).url || '',
            alt: (post.featuredImage as { alt?: string }).alt,
          }
        : undefined,
      publishedDate: post.publishedDate as string | undefined,
      author: post.author as string | undefined,
    }))

    const contactInfo = {
      email: siteSettings.contactEmail as string,
      phone: siteSettings.contactPhone as string,
      address: siteSettings.address as string | undefined,
      workingHours: siteSettings.workingHours as string | undefined,
    }

    return {
      services,
      testimonials,
      blogPosts,
      contactInfo,
    }
  } catch {
    // Return defaults if database is not available (e.g., during build)
    return {
      services: [],
      testimonials: [],
      blogPosts: [],
      contactInfo: {
        email: 'contact@example.com',
        phone: '+1 (555) 000-0000',
        address: '123 Main Street\nCity, State 12345',
        workingHours: 'Monday - Friday: 9:00 AM - 6:00 PM',
      },
    }
  }
}

export default async function HomePage() {
  const { services, testimonials, blogPosts, contactInfo } =
    await getHomePageData()

  return (
    <MainLayout>
      <HeroSection />
      <ServicesSection services={services} />
      <AboutSection />
      <TestimonialsSection testimonials={testimonials} />
      <BlogSection posts={blogPosts} />
      <ContactSection contactInfo={contactInfo} />
    </MainLayout>
  )
}
