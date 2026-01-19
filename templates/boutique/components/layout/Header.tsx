'use client'

import * as React from 'react'
import Link from 'next/link'
import { Menu, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

interface Service {
  id: string
  title: string
  slug: string
  description: string
}

interface SiteSettingsData {
  firmName: string
  tagline?: string
  contactPhone: string
  logo?: {
    url: string
    alt?: string
  }
}

interface HeaderProps {
  services?: Service[]
  siteSettings?: SiteSettingsData
}

const mainNavItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export function Header({ services = [], siteSettings }: HeaderProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const firmName = siteSettings?.firmName || 'Law Firm Name'
  const contactPhone = siteSettings?.contactPhone || '+1 (555) 000-0000'

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          {siteSettings?.logo?.url ? (
            <img
              src={siteSettings.logo.url}
              alt={siteSettings.logo.alt || firmName}
              className="h-10 w-auto"
            />
          ) : (
            <span className="font-serif text-xl font-bold text-primary">
              {firmName}
            </span>
          )}
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {mainNavItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}

            {/* Services Dropdown */}
            {services.length > 0 && (
              <NavigationMenuItem>
                <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {services.map((service) => (
                      <ListItem
                        key={service.id}
                        title={service.title}
                        href={`/services/${service.slug}`}
                      >
                        {service.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-4 lg:flex">
          <Button variant="secondary" asChild>
            <Link href="/contact">
              <Phone className="mr-2 h-4 w-4" />
              {contactPhone}
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle className="font-serif text-left">{firmName}</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-4">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}

              {/* Services in mobile menu */}
              {services.length > 0 && (
                <div className="space-y-3">
                  <span className="text-lg font-medium text-primary">Services</span>
                  <div className="flex flex-col gap-2 pl-4">
                    {services.map((service) => (
                      <Link
                        key={service.id}
                        href={`/services/${service.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Mobile CTA */}
              <div className="mt-4 pt-4 border-t">
                <Button variant="secondary" className="w-full" asChild>
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    <Phone className="mr-2 h-4 w-4" />
                    Contact Us
                  </Link>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
