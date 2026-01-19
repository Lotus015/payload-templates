import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import { MainLayout } from '@/components/layout'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog | Boutique Law Firm',
  description:
    'Stay informed with our latest articles on legal matters, industry updates, and expert advice from our experienced attorneys.',
  openGraph: {
    title: 'Blog | Boutique Law Firm',
    description:
      'Stay informed with our latest articles on legal matters, industry updates, and expert advice.',
    type: 'website',
  },
}

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  featuredImage?: {
    url: string
    alt?: string
  }
  publishedDate?: string
  author?: string
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'blog-posts',
      sort: '-publishedDate',
      limit: 20,
    })

    return result.docs.map((post) => ({
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
  } catch {
    return []
  }
}

function formatDate(dateString?: string): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

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
            <span className="text-foreground">Blog</span>
          </nav>
        </div>
      </div>

      {/* Header Section */}
      <section className="bg-green py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-cream sm:text-5xl">
              Legal Insights & News
            </h1>
            <p className="mt-4 text-lg text-cream/80">
              Stay informed with our latest articles on legal matters, industry
              updates, and expert advice from our experienced attorneys.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="font-heading text-2xl font-semibold mb-2">
                No posts yet
              </h2>
              <p className="text-muted-foreground">
                Check back soon for updates and legal insights.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Card
                  key={post.id}
                  className="group overflow-hidden transition-all hover:shadow-lg"
                >
                  {/* Featured Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {post.featuredImage?.url ? (
                      <Image
                        src={post.featuredImage.url}
                        alt={post.featuredImage.alt || post.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-green to-green-light flex items-center justify-center">
                        <span className="font-heading text-2xl font-bold text-beige/50">
                          Blog
                        </span>
                      </div>
                    )}
                  </div>

                  <CardHeader className="pb-2">
                    {post.publishedDate && (
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Calendar className="h-4 w-4" />
                        <time dateTime={post.publishedDate}>
                          {formatDate(post.publishedDate)}
                        </time>
                      </div>
                    )}
                  </CardHeader>

                  <CardContent>
                    <h2 className="font-heading text-xl font-semibold mb-2 group-hover:text-green transition-colors">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:underline"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    {post.excerpt && (
                      <p className="text-muted-foreground line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                    )}
                    {post.author && (
                      <Badge variant="secondary" className="text-xs">
                        By {post.author}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  )
}
