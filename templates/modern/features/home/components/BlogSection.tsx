import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, ArrowRight } from 'lucide-react'

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

interface BlogSectionProps {
  posts: BlogPost[]
  title?: string
  subtitle?: string
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

export function BlogSection({
  posts,
  title = 'Latest Insights',
  subtitle = 'Stay informed with our latest articles on legal matters, industry updates, and expert advice.',
}: BlogSectionProps) {
  if (posts.length === 0) {
    return null
  }

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
              {title}
            </h2>
            <p className="mt-2 text-muted-foreground text-lg max-w-xl">
              {subtitle}
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/blog">
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
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
                  <div className="absolute inset-0 bg-gradient-to-br from-blue to-blue-light flex items-center justify-center">
                    <span className="font-heading text-2xl font-bold text-white/50">
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
                <h3 className="font-heading text-xl font-semibold mb-2 group-hover:text-blue transition-colors">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>
                {post.excerpt && (
                  <p className="text-muted-foreground line-clamp-2 mb-4">
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
      </div>
    </section>
  )
}
