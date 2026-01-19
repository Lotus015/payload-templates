# Payload Templates CLI

An interactive CLI tool to scaffold law firm websites using Next.js 16, React 19, Payload CMS 3.x, and shadcn/ui.

## Installation

You can run the CLI directly using npx without installing:

```bash
npx payload-templates
```

Or install globally:

```bash
npm install -g payload-templates
```

## Usage

### Interactive Mode

Run the CLI and follow the interactive prompts:

```bash
npx payload-templates
```

The CLI will guide you through:
1. **Template Selection** - Choose from 4 professionally designed themes
2. **Project Name** - Enter your project name (letters, numbers, hyphens, underscores)

### With Project Name

Skip the project name prompt by providing it as an argument:

```bash
npx payload-templates my-law-firm
```

### Help

View all available options:

```bash
npx payload-templates --help
```

## Available Templates

| Template | Colors | Description |
|----------|--------|-------------|
| **Premium** | Navy (#1a1f36) + Gold (#d4af37) | Elegant, high-end law firms |
| **Traditional** | Burgundy (#800020) + Gold (#d4af37) | Classic, established practices |
| **Modern** | Blue (#4a90e2) + White (#ffffff) | Clean, contemporary firms |
| **Boutique** | Green (#2c5f2d) + Beige (#e8dcc4) | Specialized, personal practices |

## What the CLI Does

1. **Clones the template** from GitHub using [degit](https://github.com/Rich-Harris/degit)
2. **Updates package.json** with your project name
3. **Creates .env file** from .env.example
4. **Installs dependencies** using pnpm

## After Project Creation

Once your project is created, follow these steps:

```bash
# Navigate to your project
cd my-law-firm

# Configure database connection in .env
# Set DATABASE_URL to your PostgreSQL connection string

# Seed demo content (optional)
pnpm seed

# Start development server
pnpm dev
```

Access your site at `http://localhost:3000` and the admin panel at `http://localhost:3000/admin`.

## Requirements

- **Node.js 20+** - Required for Next.js 16 compatibility
- **pnpm 9+** - Package manager (npm or yarn may work but pnpm is recommended)
- **PostgreSQL** - Database for Payload CMS

## Template Features

Each template includes:

- **Next.js 16** with App Router and React Server Components
- **React 19** with the latest features
- **Payload CMS 3.x** with admin panel at `/admin`
- **Tailwind CSS v4** for styling
- **shadcn/ui** components (Button, Card, Form, etc.)
- **TypeScript** in strict mode

### Pre-built CMS Collections

- **Pages** - Homepage and static pages
- **Services** - Practice areas with icons
- **Team** - Attorney profiles
- **Testimonials** - Client reviews
- **Blog Posts** - News and articles
- **Contact Submissions** - Form submissions

### Global Settings

- **Site Settings** - Firm name, contact info, social links
- **Theme Settings** - Colors and fonts customization

## Examples

### Create a Premium Law Firm Site

```bash
npx payload-templates peterson-law
# Select: Premium (Navy + Gold)
```

### Create a Modern Legal Practice

```bash
npx payload-templates modern-legal
# Select: Modern (Blue + White)
```

### Create a Boutique Family Law Firm

```bash
npx payload-templates family-law-boutique
# Select: Boutique (Green + Beige)
```

## Troubleshooting

### pnpm not found

Install pnpm globally:

```bash
npm install -g pnpm
```

### Permission denied

Ensure you have write permissions in the target directory:

```bash
# Check current directory permissions
ls -la

# Create project in a different directory
cd ~/projects
npx payload-templates my-law-firm
```

### Template clone fails

- Check your internet connection
- Ensure GitHub is accessible from your network
- Try again in a few minutes (temporary network issues)

### Database connection issues

See the template README.md for detailed PostgreSQL setup instructions.

## Project Structure

After creation, your project will have this structure:

```
my-law-firm/
├── app/                    # Next.js App Router
│   ├── (payload)/          # Payload CMS routes
│   │   └── admin/          # Admin panel
│   ├── api/                # Custom API routes
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
│   └── home/components/    # Homepage sections
├── lib/                    # Utility functions
├── scripts/                # Database seed script
├── payload.config.ts       # Payload CMS configuration
├── .env.example            # Environment variables template
├── vercel.json             # Vercel deployment config
└── package.json
```

## Links

- [GitHub Repository](https://github.com/Lotus015/payload-templates)
- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com)

## License

MIT
