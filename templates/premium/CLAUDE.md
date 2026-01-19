# Premium Law Firm Template - Operating Contract

## Project Overview
This is the Premium law firm website template built with:
- Next.js 16 (App Router)
- React 19
- TypeScript (strict mode)
- Tailwind CSS v4
- Payload CMS 3.x (to be added in S4)

## Directory Structure
```
app/                  # Next.js App Router pages and layouts
  layout.tsx          # Root layout
  page.tsx            # Homepage
  globals.css         # Global styles with Tailwind CSS
```

## Development Commands
```bash
pnpm dev              # Start development server with Turbopack
pnpm build            # Production build
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm typecheck        # Run TypeScript type checking
```

## Environment Variables
Copy `.env.example` to `.env` and configure:
- `DATABASE_URL` - PostgreSQL connection string
- `PAYLOAD_SECRET` - Secret key for Payload CMS (min 32 characters)
- `NEXT_PUBLIC_SITE_URL` - Public URL of the site

## Code Style Guidelines
- Use TypeScript for all files
- Follow Next.js App Router conventions
- Use Tailwind CSS for styling
- Keep components small and focused
- Use Server Components by default, Client Components only when needed

## Theme: Premium
- Primary Color: Navy (#1a1f36)
- Accent Color: Gold (#d4af37)
- Fonts: Playfair Display (headings) + Inter (body)
