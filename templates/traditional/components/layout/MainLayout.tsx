import { Header } from './Header'
import { Footer } from './Footer'
import { getPayload } from 'payload'
import config from '@payload-config'

interface MainLayoutProps {
  children: React.ReactNode
}

async function getLayoutData() {
  try {
    const payload = await getPayload({ config })

    const [servicesResult, siteSettings] = await Promise.all([
      payload.find({
        collection: 'services',
        sort: 'order',
        limit: 10,
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
    }))

    return {
      services,
      siteSettings: {
        firmName: siteSettings.firmName as string,
        tagline: siteSettings.tagline as string | undefined,
        contactEmail: siteSettings.contactEmail as string,
        contactPhone: siteSettings.contactPhone as string,
        address: siteSettings.address as string | undefined,
        socialLinks: (siteSettings.socialLinks as Array<{
          platform: 'facebook' | 'twitter' | 'linkedin' | 'instagram' | 'youtube'
          url: string
        }>) || [],
        workingHours: siteSettings.workingHours as string | undefined,
        logo: siteSettings.logo
          ? {
              url: (siteSettings.logo as { url?: string }).url || '',
              alt: (siteSettings.logo as { alt?: string }).alt,
            }
          : undefined,
      },
    }
  } catch {
    // Return defaults if database is not available (e.g., during build)
    return {
      services: [],
      siteSettings: {
        firmName: 'Law Firm Name',
        tagline: 'Professional Legal Services',
        contactEmail: 'contact@example.com',
        contactPhone: '+1 (555) 000-0000',
        address: '123 Main Street\nCity, State 12345',
        socialLinks: [],
        workingHours: 'Monday - Friday: 9:00 AM - 6:00 PM',
      },
    }
  }
}

export async function MainLayout({ children }: MainLayoutProps) {
  const { services, siteSettings } = await getLayoutData()

  return (
    <div className="flex min-h-screen flex-col">
      <Header services={services} siteSettings={siteSettings} />
      <main className="flex-1">{children}</main>
      <Footer services={services} siteSettings={siteSettings} />
    </div>
  )
}
