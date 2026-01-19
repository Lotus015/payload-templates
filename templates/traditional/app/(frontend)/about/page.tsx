import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { MainLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, ChevronRight, Scale, Shield, Users, Award } from 'lucide-react'

// Revalidate the page every 60 seconds (ISR caching)
export const revalidate = 60

export const metadata: Metadata = {
  title: 'About Us | Traditional Law Firm',
  description:
    'Learn about our experienced legal team, our values, and our commitment to providing exceptional legal services.',
  openGraph: {
    title: 'About Us | Traditional Law Firm',
    description:
      'Learn about our experienced legal team and our commitment to exceptional legal services.',
    type: 'website',
  },
}

interface TeamMember {
  id: string
  name: string
  role?: string
  bio?: string
  photo?: {
    url: string
    alt?: string
  }
}

async function getAboutData() {
  try {
    const payload = await getPayload({ config })

    const [teamResult, siteSettings] = await Promise.all([
      payload.find({
        collection: 'team',
        sort: 'order',
        limit: 6,
      }),
      payload.findGlobal({
        slug: 'site-settings',
      }),
    ])

    const team: TeamMember[] = teamResult.docs.map((member) => ({
      id: member.id as string,
      name: member.name as string,
      role: member.role as string | undefined,
      bio: member.bio as string | undefined,
      photo: member.photo
        ? {
            url: (member.photo as { url?: string }).url || '',
            alt: (member.photo as { alt?: string }).alt,
          }
        : undefined,
    }))

    return {
      team,
      firmName: siteSettings.firmName as string || 'Traditional Law Firm',
    }
  } catch {
    return {
      team: [],
      firmName: 'Traditional Law Firm',
    }
  }
}

const values = [
  {
    icon: Scale,
    title: 'Integrity',
    description:
      'We uphold the highest ethical standards in all our dealings, ensuring transparency and honesty in every client relationship.',
  },
  {
    icon: Shield,
    title: 'Excellence',
    description:
      'We strive for excellence in every case, combining deep legal expertise with innovative strategies to achieve the best outcomes.',
  },
  {
    icon: Users,
    title: 'Client Focus',
    description:
      'Our clients are at the center of everything we do. We listen, understand, and tailor our approach to meet their unique needs.',
  },
  {
    icon: Award,
    title: 'Results',
    description:
      'We are committed to delivering results that matter. Our track record speaks to our dedication to client success.',
  },
]

export default async function AboutPage() {
  const { team, firmName } = await getAboutData()

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
            <span className="text-foreground">About</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-burgundy py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-gold font-semibold uppercase tracking-wider text-sm mb-4">
              About Our Firm
            </p>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-cream sm:text-5xl">
              A Legacy of Legal Excellence
            </h1>
            <p className="mt-6 text-lg text-cream/80 leading-relaxed">
              With decades of combined experience, our team of dedicated attorneys
              has built a reputation for delivering exceptional legal services. We
              combine deep legal knowledge with a personal approach, ensuring every
              client receives the attention and representation they deserve.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl bg-gradient-to-br from-burgundy to-burgundy-dark flex items-center justify-center">
                <div className="text-center text-cream/80 p-8">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center">
                    <span className="font-heading text-4xl font-bold text-gold">
                      {firmName.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xl font-medium">Professional Excellence</p>
                  <p className="text-sm mt-1">Since 2010</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gold/20 rounded-lg -z-10 hidden lg:block" />
              <div className="absolute -top-4 -left-4 w-32 h-32 border-2 border-gold/30 rounded-lg -z-10 hidden lg:block" />
            </div>

            {/* Content */}
            <div>
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl text-foreground mb-6">
                Our Story
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Founded on the principles of integrity, dedication, and excellence,
                our firm has grown from a small practice to a respected name in
                legal services. Our journey has been marked by countless successful
                cases and satisfied clients.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Today, we continue to uphold the values that have defined us from
                the start. Every case is an opportunity to make a difference in our
                clients&apos; lives, and we approach each one with the same dedication
                and attention to detail.
              </p>
              <ul className="space-y-3">
                {[
                  'Experienced attorneys with proven track records',
                  'Personalized attention to every case',
                  'Transparent communication throughout the process',
                  'Commitment to achieving the best outcomes',
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-gold mt-0.5 shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground text-lg">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-burgundy/10 flex items-center justify-center">
                    <value.icon className="h-6 w-6 text-burgundy" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      {team.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl text-foreground mb-4">
                Our Team
              </h2>
              <p className="text-muted-foreground text-lg">
                Meet the dedicated professionals behind our success
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <Card key={member.id} className="overflow-hidden">
                  <div className="relative aspect-[4/3]">
                    {member.photo?.url ? (
                      <Image
                        src={member.photo.url}
                        alt={member.photo.alt || member.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-burgundy to-burgundy-dark flex items-center justify-center">
                        <span className="font-heading text-3xl font-bold text-gold/50">
                          {member.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </span>
                      </div>
                    )}
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-heading text-lg font-semibold">
                      {member.name}
                    </h3>
                    {member.role && (
                      <p className="text-burgundy text-sm font-medium">
                        {member.role}
                      </p>
                    )}
                    {member.bio && (
                      <p className="text-muted-foreground text-sm mt-2 line-clamp-3">
                        {member.bio}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-burgundy">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-cream sm:text-4xl mb-4">
            Ready to Work Together?
          </h2>
          <p className="text-cream/80 text-lg max-w-2xl mx-auto mb-8">
            Contact us today to schedule a consultation and learn how we can help
            you with your legal needs.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gold text-burgundy hover:bg-gold/90 font-semibold"
          >
            <Link href="/contact">Schedule Consultation</Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  )
}
