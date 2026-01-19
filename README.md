# Payload Templates

A CLI tool and 4 law firm website templates using Next.js 16 + React 19 + Payload CMS 3.x + shadcn/ui.

## Quick Start

Create a new law firm website in seconds:

```bash
npx payload-templates
```

Follow the prompts to select a template and name your project.

## Features

- **4 Professional Themes** - Premium, Traditional, Modern, and Boutique designs
- **Next.js 16** - Latest App Router with React Server Components
- **Payload CMS 3.x** - Headless CMS with admin panel at `/admin`
- **Tailwind CSS v4** - Modern utility-first styling
- **shadcn/ui** - Beautiful, accessible UI components
- **TypeScript** - Full type safety in strict mode
- **PostgreSQL** - Robust database with Payload ORM

## Templates

| Template | Colors | Best For |
|----------|--------|----------|
| [**Premium**](templates/premium/) | Navy + Gold | High-end corporate law firms |
| [**Traditional**](templates/traditional/) | Burgundy + Gold | Established, classic practices |
| [**Modern**](templates/modern/) | Blue + White | Contemporary, tech-forward firms |
| [**Boutique**](templates/boutique/) | Green + Beige | Specialized, personal practices |

### Premium Theme
Navy (#1a1f36) + Gold (#d4af37) with Playfair Display + Inter fonts.
Elegant and professional design for high-end corporate law firms.

### Traditional Theme
Burgundy (#800020) + Gold (#d4af37) with Merriweather + Lora fonts.
Classic and established aesthetic for traditional practices.

### Modern Theme
Light Blue (#4a90e2) + White with Montserrat + Open Sans fonts.
Clean, contemporary design with emphasis on whitespace and readability.

### Boutique Theme
Deep Green (#2c5f2d) + Beige (#e8dcc4) with Cormorant + Raleway fonts.
Elegant, specialized aesthetic with natural tones for boutique practices.

## Requirements

- Node.js 20+
- pnpm 9+
- PostgreSQL database

## Project Structure

```
payload-templates/
├── cli/                    # CLI package (npx payload-templates)
│   ├── bin/index.js        # CLI entry point
│   ├── package.json
│   └── README.md           # CLI documentation
├── templates/
│   ├── premium/            # Premium theme template
│   ├── traditional/        # Traditional theme template
│   ├── modern/             # Modern theme template
│   └── boutique/           # Boutique theme template
├── docs/
│   └── lightsail-deployment.md  # AWS Lightsail guide
├── package.json            # Root package.json
├── pnpm-workspace.yaml     # pnpm workspace configuration
└── README.md               # This file
```

## CLI Usage

### Interactive Mode

```bash
npx payload-templates
```

### With Project Name

```bash
npx payload-templates my-law-firm
```

### Help

```bash
npx payload-templates --help
```

For detailed CLI documentation, see [cli/README.md](cli/README.md).

## Template Contents

Each template includes:

### CMS Collections
- **Pages** - Homepage and static pages with hero sections
- **Services** - Practice areas with icons and descriptions
- **Team** - Attorney profiles with photos and bios
- **Testimonials** - Client reviews and ratings
- **Blog Posts** - News, articles, and insights
- **Contact Submissions** - Form submissions from visitors

### Global Settings
- **Site Settings** - Firm name, contact info, social links, working hours
- **Theme Settings** - Colors and fonts customization

### UI Components
- Header with navigation menu and mobile drawer
- Footer with contact info and links
- Hero section with CTA buttons
- Services grid with icons
- Team member cards
- Testimonial carousel
- Blog post cards
- Contact form with validation

### Pages
- Homepage with all sections
- Individual service pages
- Blog listing and posts
- Contact page

## Development

### Working with Templates

```bash
# Install dependencies
pnpm install

# Run a specific template in development
cd templates/premium
pnpm dev
```

### Template Structure

```
templates/premium/
├── app/                    # Next.js App Router
│   ├── (payload)/          # Payload CMS routes (admin, API)
│   ├── api/contact/        # Contact form API
│   ├── blog/               # Blog pages
│   ├── contact/            # Contact page
│   ├── services/           # Service pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── collections/            # Payload CMS collections
├── globals/                # Payload CMS globals
├── components/
│   ├── layout/             # Header, Footer, MainLayout
│   └── ui/                 # shadcn/ui components
├── features/
│   └── home/components/    # Homepage section components
├── lib/utils.ts            # Utility functions (cn helper)
├── scripts/seed.ts         # Database seed script
├── payload.config.ts       # Payload CMS configuration
├── .env.example            # Environment variables template
├── vercel.json             # Vercel deployment config
├── CLAUDE.md               # AI assistant operating contract
└── README.md               # Template documentation
```

## Deployment

### Vercel (Recommended)

Each template includes `vercel.json` for seamless Vercel deployment.

1. Push your repository to GitHub
2. Import the project in Vercel
3. Configure environment variables:
   - `DATABASE_URL` - PostgreSQL connection string with `?sslmode=require&pgbouncer=true`
   - `PAYLOAD_SECRET` - Min 32 character secret key
4. Deploy

**Recommended PostgreSQL providers:**
- Vercel Postgres
- Neon
- Supabase

### AWS Lightsail

For self-hosted deployments on a single VPS instance.

See [docs/lightsail-deployment.md](docs/lightsail-deployment.md) for:
- PostgreSQL setup
- Node.js and pnpm installation
- PM2 process management
- Nginx reverse proxy
- SSL with Let's Encrypt

## Documentation

- [CLI Documentation](cli/README.md) - Usage instructions and examples
- [Premium Template](templates/premium/README.md) - Navy + Gold theme
- [Traditional Template](templates/traditional/README.md) - Burgundy + Gold theme
- [Modern Template](templates/modern/README.md) - Blue + White theme
- [Boutique Template](templates/boutique/README.md) - Green + Beige theme
- [Lightsail Deployment](docs/lightsail-deployment.md) - AWS deployment guide

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
