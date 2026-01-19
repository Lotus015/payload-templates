# Premium Law Firm Template

A professional law firm website template featuring a Navy (#1a1f36) and Gold (#d4af37) color scheme with Playfair Display and Inter fonts.

Built with Next.js 16, React 19, TypeScript, Payload CMS 3.x, Tailwind CSS v4, and shadcn/ui.

## Features

- Responsive design optimized for all devices
- Payload CMS admin panel at `/admin`
- Pre-built collections: Pages, Services, Team, Testimonials, Blog Posts, Contact Submissions
- Global settings for site configuration and theme customization
- Contact form with validation and submission handling
- SEO-optimized with dynamic metadata
- Dark/light mode support

## Requirements

- Node.js 20+
- pnpm 8+
- PostgreSQL database

## Local Development

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Configure environment variables:
   ```bash
   cp .env.example .env
   ```

3. Update `.env` with your database connection:
   ```
   DATABASE_URL=postgres://user:password@localhost:5432/payload_db
   PAYLOAD_SECRET=your-secret-key-min-32-characters-long
   ```

4. Run the development server:
   ```bash
   pnpm dev
   ```

5. Seed demo content (optional):
   ```bash
   pnpm seed
   ```

6. Access the site at `http://localhost:3000` and admin at `http://localhost:3000/admin`

## Vercel Deployment

This template is optimized for deployment on Vercel.

### Quick Deploy

1. Push your repository to GitHub
2. Import the project in Vercel
3. Configure environment variables (see below)
4. Deploy

### Environment Variables for Vercel

Configure these environment variables in your Vercel project settings:

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string with connection pooling. For Vercel Postgres, use the pooled connection string from your dashboard. Must include `?sslmode=require&pgbouncer=true` for serverless compatibility. |
| `PAYLOAD_SECRET` | Yes | Secret key for Payload CMS authentication (min 32 characters). Generate with: `openssl rand -base64 32` |
| `NEXT_PUBLIC_SITE_URL` | No | Your production URL (e.g., `https://your-domain.com`) |

### Database Setup for Vercel

Vercel requires a PostgreSQL database with connection pooling for optimal serverless performance.

**Recommended providers:**

- **Vercel Postgres** (recommended): Create directly from your Vercel dashboard
- **Neon**: Add `?sslmode=require` to your connection string
- **Supabase**: Use the "Connection pooling" URL from Project Settings > Database

**Connection string format:**
```
postgres://user:password@host:5432/database?sslmode=require&pgbouncer=true
```

The `pgbouncer=true` parameter enables connection pooling, which is essential for serverless environments like Vercel.

### Build Settings

The included `vercel.json` configures:
- Build command: `pnpm build`
- Install command: `pnpm install`
- Framework: Next.js
- Region: `fra1` (Frankfurt, EU - change as needed)

## Customization

### Theme Colors

Edit CSS variables in `app/globals.css`:
- `--premium-navy`: Primary navy color
- `--premium-gold`: Accent gold color
- `--premium-cream`: Background cream color

### Content

1. Access the admin panel at `/admin`
2. Update Site Settings for firm name, contact info, and branding
3. Add/edit Services, Team members, Testimonials, and Blog posts

### Components

UI components are in `components/ui/` (shadcn/ui) and `components/layout/`.
Page sections are in `features/home/components/`.

## Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm seed` - Seed database with demo content

## License

MIT
