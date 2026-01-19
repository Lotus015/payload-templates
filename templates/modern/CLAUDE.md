# Modern Law Firm Template - Operating Contract

## Project Overview

This is the Modern law firm website template built with:
- **Next.js 16** (App Router with React Server Components)
- **React 19** (latest features including Server Components)
- **TypeScript** (strict mode enabled)
- **Tailwind CSS v4** (CSS-based configuration)
- **Payload CMS 3.x** (headless CMS with PostgreSQL)
- **shadcn/ui** (accessible UI components)

## Theme: Modern

- **Primary Color:** Light Blue (#4a90e2) - HSL 212 72% 59%
- **Secondary Color:** White (#ffffff)
- **Accent Color:** Slate (#64748b)
- **Heading Font:** Montserrat
- **Body Font:** Open Sans
- **Design:** Clean lines, whitespace, modern aesthetic

## Directory Structure

```
templates/modern/
├── app/                          # Next.js App Router
│   ├── (payload)/                # Payload CMS routes (grouped)
│   │   ├── admin/[[...segments]]/  # Admin panel
│   │   ├── api/[[...slug]]/      # REST API
│   │   ├── api/graphql/          # GraphQL endpoint
│   │   └── layout.tsx            # Payload layout
│   ├── api/contact/route.ts      # Contact form API endpoint
│   ├── blog/
│   │   ├── page.tsx              # Blog listing
│   │   └── [slug]/page.tsx       # Blog post detail
│   ├── contact/page.tsx          # Contact page
│   ├── services/[slug]/page.tsx  # Service detail pages
│   ├── globals.css               # Global styles with Tailwind
│   ├── layout.tsx                # Root layout with fonts
│   └── page.tsx                  # Homepage
├── collections/                  # Payload CMS collections
│   ├── BlogPosts.ts              # Blog articles
│   ├── ContactSubmissions.ts     # Form submissions
│   ├── Media.ts                  # Image uploads
│   ├── Pages.ts                  # Static pages
│   ├── Services.ts               # Practice areas
│   ├── Team.ts                   # Attorney profiles
│   ├── Testimonials.ts           # Client reviews
│   └── index.ts                  # Barrel export
├── components/
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx            # Navigation header
│   │   ├── Footer.tsx            # Site footer
│   │   ├── MainLayout.tsx        # Wrapper component
│   │   └── index.ts
│   └── ui/                       # shadcn/ui components
│       ├── accordion.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── navigation-menu.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       └── textarea.tsx
├── features/
│   └── home/components/          # Homepage sections
│       ├── AboutSection.tsx
│       ├── BlogSection.tsx
│       ├── ContactSection.tsx
│       ├── HeroSection.tsx
│       ├── ServicesSection.tsx
│       ├── TestimonialsSection.tsx
│       └── index.ts
├── globals/                      # Payload CMS globals
│   ├── SiteSettings.ts           # Firm info, contact, social
│   ├── ThemeSettings.ts          # Colors and fonts
│   └── index.ts
├── lib/
│   └── utils.ts                  # Utility functions (cn helper)
├── scripts/
│   └── seed.ts                   # Database seed script
├── payload.config.ts             # Payload CMS configuration
├── components.json               # shadcn/ui configuration
├── next.config.ts                # Next.js configuration
├── postcss.config.mjs            # PostCSS configuration
├── tsconfig.json                 # TypeScript configuration
├── vercel.json                   # Vercel deployment config
├── .env.example                  # Environment variables template
├── CLAUDE.md                     # This file
└── README.md                     # Template documentation
```

## Development Commands

```bash
pnpm dev              # Start development server with Turbopack
pnpm build            # Production build
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm typecheck        # Run TypeScript type checking
pnpm seed             # Seed database with demo content
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `PAYLOAD_SECRET` | Yes | Secret key for Payload CMS (min 32 chars) |
| `NEXT_PUBLIC_SITE_URL` | No | Public URL of the site |

## Code Style Guidelines

1. **TypeScript** - Use TypeScript for all files with strict mode
2. **Server Components** - Use Server Components by default, Client Components only when needed (interactivity, hooks)
3. **File Organization** - Keep related files together (e.g., features/home/components/)
4. **Component Size** - Keep components small and focused on a single responsibility
5. **Data Fetching** - Fetch data in Server Components, pass to Client Components as props
6. **Styling** - Use Tailwind CSS utility classes, avoid inline styles
7. **Imports** - Use barrel exports (index.ts) for cleaner imports

## Key Patterns

### Data Fetching

```typescript
// Server Component
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export default async function Page() {
  const payload = await getPayload({ config: configPromise });
  const data = await payload.find({ collection: 'services' });
  return <Component data={data} />;
}
```

### Client Components

```typescript
'use client';

import { useState } from 'react';

export function InteractiveComponent({ data }) {
  const [state, setState] = useState(data);
  // ...
}
```

### Theme Colors

CSS variables in `globals.css`:
- `--modern-blue` - Primary blue color
- `--modern-blue-light` - Light blue accent
- `--modern-slate` - Secondary slate color

Tailwind utility classes:
- `bg-blue`, `text-blue`, `border-blue`
- `bg-blue-light`, `text-blue-light`
- `bg-slate`, `text-slate`

## CMS Collections

| Collection | Slug | Description |
|------------|------|-------------|
| Pages | `pages` | Homepage and static pages |
| Services | `services` | Practice areas |
| Team | `team` | Attorney profiles |
| Testimonials | `testimonials` | Client reviews |
| Blog Posts | `blog-posts` | Articles and news |
| Contact Submissions | `contact-submissions` | Form submissions |
| Media | `media` | Image uploads |

## CMS Globals

| Global | Slug | Description |
|--------|------|-------------|
| Site Settings | `site-settings` | Firm name, contact, social links |
| Theme Settings | `theme-settings` | Colors and fonts |

## API Endpoints

- `GET/POST /api/[...slug]` - Payload REST API
- `POST /api/graphql` - Payload GraphQL endpoint
- `POST /api/contact` - Contact form submission

## Deployment

- **Vercel** - Use `vercel.json` configuration
- **AWS Lightsail** - See docs/lightsail-deployment.md
- **Database** - PostgreSQL with connection pooling for serverless
