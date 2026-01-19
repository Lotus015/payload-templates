# Payload Templates

A CLI tool and 4 law firm website templates using Next.js 16 + React 19 + Payload CMS 3.x + shadcn/ui.

## Overview

This monorepo contains:

- **CLI Tool** (`cli/`) - Interactive CLI to scaffold new projects from templates
- **Templates** (`templates/`) - 4 distinct visual themes for law firm websites:
  - **Premium** - Navy (#1a1f36) + Gold (#d4af37) with Playfair Display + Inter fonts
  - **Traditional** - Burgundy (#800020) + Gold + Cream with Merriweather + Lora fonts
  - **Modern** - Light blue (#4a90e2) + White with Montserrat + Open Sans fonts
  - **Boutique** - Deep green (#2c5f2d) + Beige (#e8dcc4) with Cormorant + Raleway fonts

## Quick Start

```bash
npx payload-templates
```

## Requirements

- Node.js 20+
- pnpm 9+
- PostgreSQL database

## Development

```bash
# Install dependencies
pnpm install

# Run development server for a template
cd templates/premium
pnpm dev
```

## Project Structure

```
payload-templates/
├── cli/                    # CLI package
├── templates/
│   ├── premium/           # Premium theme template
│   ├── traditional/       # Traditional theme template
│   ├── modern/            # Modern theme template
│   └── boutique/          # Boutique theme template
├── docs/                   # Documentation
├── package.json           # Root package.json
├── pnpm-workspace.yaml    # pnpm workspace configuration
└── README.md              # This file
```

## License

MIT
