import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import { MainLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, User, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  content?: unknown
  featuredImage?: {
    url: string
    alt?: string
  }
  publishedDate?: string
  author?: string
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'blog-posts',
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

    const post = result.docs[0]
    return {
      id: post.id as string,
      title: post.title as string,
      slug: post.slug as string,
      excerpt: post.excerpt as string | undefined,
      content: post.content,
      featuredImage: post.featuredImage
        ? {
            url: (post.featuredImage as { url?: string }).url || '',
            alt: (post.featuredImage as { alt?: string }).alt,
          }
        : undefined,
      publishedDate: post.publishedDate as string | undefined,
      author: post.author as string | undefined,
    }
  } catch {
    return null
  }
}

async function getRelatedPosts(currentSlug: string): Promise<BlogPost[]> {
  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'blog-posts',
      where: {
        slug: {
          not_equals: currentSlug,
        },
      },
      sort: '-publishedDate',
      limit: 3,
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

function renderRichText(content: unknown): React.ReactNode {
  if (!content) return null

  // Handle Lexical rich text format from Payload CMS
  const richTextContent = content as {
    root?: {
      children?: Array<{
        type: string
        children?: Array<{ text?: string }>
        tag?: string
      }>
    }
  }

  if (richTextContent.root?.children) {
    return richTextContent.root.children.map((node, index) => {
      if (node.type === 'paragraph') {
        const text = node.children
          ?.map((child) => child.text || '')
          .join('')
        return (
          <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
            {text}
          </p>
        )
      }
      if (node.type === 'heading') {
        const text = node.children
          ?.map((child) => child.text || '')
          .join('')
        const tag = node.tag || 'h2'
        if (tag === 'h1') {
          return (
            <h1 key={index} className="font-heading text-2xl font-semibold text-foreground mt-8 mb-4">
              {text}
            </h1>
          )
        }
        if (tag === 'h3') {
          return (
            <h3 key={index} className="font-heading text-lg font-semibold text-foreground mt-8 mb-4">
              {text}
            </h3>
          )
        }
        return (
          <h2 key={index} className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">
            {text}
          </h2>
        )
      }
      return null
    })
  }

  return null
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Traditional Law Firm Blog`,
    description: post.excerpt || `Read ${post.title} on our legal blog.`,
    openGraph: {
      title: post.title,
      description: post.excerpt || `Read ${post.title} on our legal blog.`,
      type: 'article',
      publishedTime: post.publishedDate,
      authors: post.author ? [post.author] : undefined,
      images: post.featuredImage?.url
        ? [{ url: post.featuredImage.url, alt: post.featuredImage.alt }]
        : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const [post, relatedPosts] = await Promise.all([
    getBlogPost(slug),
    getRelatedPosts(slug),
  ])

  if (!post) {
    notFound()
  }

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
              href="/blog"
              className="hover:text-foreground transition-colors"
            >
              Blog
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground line-clamp-1">{post.title}</span>
          </nav>
        </div>
      </div>

      <article>
        {/* Hero Section */}
        <header className="bg-burgundy py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              {/* Meta Info */}
              <div className="flex items-center justify-center gap-4 text-cream/70 text-sm mb-6">
                {post.publishedDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.publishedDate}>
                      {formatDate(post.publishedDate)}
                    </time>
                  </div>
                )}
                {post.author && (
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                )}
              </div>

              <h1 className="font-heading text-3xl font-bold tracking-tight text-cream sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="mt-6 text-lg text-cream/80 leading-relaxed">
                  {post.excerpt}
                </p>
              )}
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage?.url && (
          <div className="relative -mt-8 mb-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src={post.featuredImage.url}
                    alt={post.featuredImage.alt || post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="prose prose-lg max-w-none">
                {renderRichText(post.content)}

                {/* Fallback if no rich text content */}
                {!post.content && (
                  <p className="text-muted-foreground">
                    Content coming soon. Check back later for the full article.
                  </p>
                )}
              </div>

              {/* Post Footer */}
              <div className="mt-12 pt-8 border-t">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <Button asChild variant="outline">
                    <Link href="/blog">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Blog
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link href="/contact">
                      Contact Us
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-2xl font-bold text-center mb-12">
              Related Articles
            </h2>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {relatedPosts.map((relatedPost) => (
                <Card
                  key={relatedPost.id}
                  className="group overflow-hidden transition-all hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {relatedPost.featuredImage?.url ? (
                      <Image
                        src={relatedPost.featuredImage.url}
                        alt={relatedPost.featuredImage.alt || relatedPost.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-burgundy to-burgundy-light flex items-center justify-center">
                        <span className="font-heading text-xl font-bold text-gold/50">
                          Blog
                        </span>
                      </div>
                    )}
                  </div>

                  <CardHeader className="pb-2">
                    {relatedPost.publishedDate && (
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Calendar className="h-4 w-4" />
                        <time dateTime={relatedPost.publishedDate}>
                          {formatDate(relatedPost.publishedDate)}
                        </time>
                      </div>
                    )}
                  </CardHeader>

                  <CardContent>
                    <CardTitle className="font-heading text-lg group-hover:text-gold transition-colors">
                      <Link href={`/blog/${relatedPost.slug}`}>
                        {relatedPost.title}
                      </Link>
                    </CardTitle>
                    {relatedPost.author && (
                      <Badge variant="secondary" className="text-xs mt-2">
                        By {relatedPost.author}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  )
}
