# Payload Templates PRD

## Project Overview

**Project Name:** payload-templates
**Repository:** Lotus015/payload-templates
**Package Name:** payload-templates (npm)

Create a CLI tool and 4 law firm website templates using Next.js 16 + React 19 + Payload CMS 3.x + shadcn/ui. Each template represents a distinct visual theme (Premium, Traditional, Modern, Boutique) with pre-configured CMS collections and demo content.

### Technical Stack
- Next.js 16 with App Router
- React 19
- TypeScript (strict mode)
- Payload CMS 3.x (latest)
- PostgreSQL database
- shadcn/ui components
- Tailwind CSS v4
- Vitest for testing
- pnpm package manager

### Deployment Architecture
- **Frontend:** Vercel (primary) or AWS Lightsail
- **Database:** PostgreSQL on AWS Lightsail
- **CMS Admin:** Integrated in Next.js app at /admin

### Repository Structure
```
payload-templates/
├── cli/
│   ├── bin/
│   │   └── index.js          # CLI entry point
│   ├── package.json          # npm package config
│   └── README.md
├── templates/
│   ├── premium/              # Complete Next.js + Payload project
│   ├── traditional/          # Complete Next.js + Payload project
│   ├── modern/               # Complete Next.js + Payload project
│   └── boutique/             # Complete Next.js + Payload project
├── package.json              # Root package.json for monorepo
├── pnpm-workspace.yaml       # pnpm workspace config
└── README.md
```

---

## User Stories

### S1: Initialize Repository Structure
**Priority:** 1

Create the monorepo structure with pnpm workspaces, root configuration files, and placeholder directories for CLI and templates.

**Acceptance Criteria:**
- Root package.json with workspaces configuration
- pnpm-workspace.yaml defining cli/ and templates/* as workspaces
- .gitignore with Node.js, Next.js, and environment file patterns
- .nvmrc specifying Node.js 20
- Root README.md with project overview
- Empty directories: cli/, templates/premium/, templates/traditional/, templates/modern/, templates/boutique/

**Tests:**
- pnpm install succeeds without errors
- Directory structure matches specification

---

### S2: Create CLI Package Scaffolding
**Priority:** 2

Set up the CLI package with dependencies (degit, prompts, kleur) and basic structure. The CLI will allow users to select a template and create a new project.

**Acceptance Criteria:**
- cli/package.json with name "payload-templates", bin entry pointing to bin/index.js
- Dependencies: degit, prompts, kleur
- cli/bin/index.js with shebang and ES module setup
- Basic welcome message displays when running the CLI
- package.json includes "type": "module"

**Tests:**
- node cli/bin/index.js runs without errors
- Welcome message appears in terminal

---

### S3: Create Base Template Structure (Premium)
**Priority:** 3

Create the Premium template as the base template with Next.js 16, React 19, TypeScript, Tailwind CSS v4, and basic project structure. This will serve as the foundation for all other templates.

**Acceptance Criteria:**
- templates/premium/package.json with all required dependencies
- Next.js 16 + React 19 + TypeScript configuration
- Tailwind CSS v4 setup with PostCSS
- tsconfig.json with strict mode enabled
- Basic app/ directory with layout.tsx and page.tsx
- .env.example with required environment variables
- CLAUDE.md operating contract (copy from vibecode-next-template style)

**Tests:**
- pnpm install succeeds in templates/premium
- pnpm build succeeds
- pnpm dev starts development server

---

### S4: Install and Configure Payload CMS 3.x
**Priority:** 4

Add Payload CMS 3.x to the Premium template with PostgreSQL adapter configuration. Set up the admin panel at /admin route.

**Acceptance Criteria:**
- Payload CMS 3.x installed with @payloadcms/db-postgres adapter
- payload.config.ts with basic configuration
- Database connection configured via DATABASE_URL environment variable
- Admin panel accessible at /admin route
- Support for both Vercel (connection pooling) and direct PostgreSQL connections
- Environment variables documented in .env.example

**Tests:**
- pnpm build succeeds with Payload configured
- Admin route /admin is accessible in development

---

### S5: Define Payload Collections - Core Content
**Priority:** 5

Create Payload collections for the core website content: Pages (Homepage), Services (Practice Areas), and Media (uploads).

**Acceptance Criteria:**
- collections/Pages.ts with fields: title, slug, hero (group), content (richText)
- collections/Services.ts with fields: title, slug, description, icon, order
- collections/Media.ts for image uploads with alt text
- Collections registered in payload.config.ts
- TypeScript types generated for all collections

**Tests:**
- Collections appear in admin panel
- Can create and save content in each collection

---

### S6: Define Payload Collections - Extended Content
**Priority:** 6

Create Payload collections for team members, testimonials, blog posts, and contact form submissions.

**Acceptance Criteria:**
- collections/Team.ts with fields: name, role, bio, photo (relationship to Media), order
- collections/Testimonials.ts with fields: clientName, clientRole, content, rating, order
- collections/BlogPosts.ts with fields: title, slug, excerpt, content (richText), featuredImage, publishedDate, author
- collections/ContactSubmissions.ts with fields: name, email, phone, message, theme, createdAt, read (boolean)
- All collections registered in payload.config.ts

**Tests:**
- All collections appear in admin panel
- Can create content in each collection
- Contact submissions are read-only in admin (no create button)

---

### S7: Create Global Settings Collection
**Priority:** 7

Create a Payload global for site-wide settings like firm name, contact info, social links, and theme configuration.

**Acceptance Criteria:**
- globals/SiteSettings.ts with fields: firmName, tagline, logo, contactEmail, contactPhone, address, socialLinks (array), workingHours
- globals/ThemeSettings.ts with fields: primaryColor, secondaryColor, accentColor, fontHeading, fontBody
- Globals registered in payload.config.ts
- Default values provided for required fields

**Tests:**
- Globals appear in admin panel under Settings
- Can update and save global settings

---

### S8: Install shadcn/ui Components
**Priority:** 8

Set up shadcn/ui in the Premium template with commonly needed components for a law firm website.

**Acceptance Criteria:**
- shadcn/ui initialized with components.json configuration
- Components installed: button, card, form, input, textarea, accordion, navigation-menu, sheet, separator, badge
- components/ui/ directory with all installed components
- Tailwind configured for shadcn/ui (CSS variables mode)
- lib/utils.ts with cn() helper function

**Tests:**
- Components import without errors
- pnpm build succeeds with shadcn components

---

### S9: Create Premium Theme Styling
**Priority:** 9

Apply the Premium theme (Navy #1a1f36 + Gold #d4af37) to the template with fonts (Playfair Display + Inter) and CSS variables.

**Acceptance Criteria:**
- CSS variables defined in globals.css for theme colors
- Playfair Display and Inter fonts loaded via next/font/google
- Tailwind theme extended with premium color palette
- Dark/light mode support using CSS variables
- Premium theme applied to all shadcn components

**Tests:**
- Fonts load correctly in browser
- Theme colors apply to components
- pnpm build succeeds

---

### S10: Create Frontend Components - Layout
**Priority:** 10

Create the layout components for the Premium template: Header with navigation, Footer, and main layout wrapper.

**Acceptance Criteria:**
- components/layout/Header.tsx with logo, navigation menu, mobile menu (Sheet), contact CTA button
- components/layout/Footer.tsx with firm info, navigation links, contact info, copyright
- components/layout/MainLayout.tsx wrapping Header + children + Footer
- Navigation items fetched from Payload (Services collection for menu)
- Mobile-responsive design using Tailwind breakpoints

**Tests:**
- Layout components render without errors
- Mobile menu opens and closes correctly
- Navigation links are functional

---

### S11: Create Frontend Components - Homepage Sections
**Priority:** 11

Create the homepage section components that display content from Payload CMS.

**Acceptance Criteria:**
- features/home/components/HeroSection.tsx - Hero with headline, subtext, CTA buttons, background
- features/home/components/ServicesSection.tsx - Grid of practice areas from Services collection
- features/home/components/AboutSection.tsx - Firm overview with image
- features/home/components/TestimonialsSection.tsx - Client testimonials carousel/grid
- features/home/components/BlogSection.tsx - Latest 2-3 blog posts
- features/home/components/ContactSection.tsx - Contact form + info
- All sections fetch data from Payload collections
- Framer Motion animations for section entrances

**Tests:**
- Each section component renders without errors
- Data fetching from Payload works correctly
- Animations trigger on scroll

---

### S12: Create Homepage and Dynamic Pages
**Priority:** 12

Create the Next.js pages that compose the homepage and handle dynamic routes for services and blog posts.

**Acceptance Criteria:**
- app/page.tsx composing all homepage sections with data fetching
- app/services/[slug]/page.tsx for individual service pages
- app/blog/page.tsx for blog listing
- app/blog/[slug]/page.tsx for individual blog posts
- app/contact/page.tsx for dedicated contact page
- Server Components for data fetching, Client Components where needed
- SEO metadata on all pages (title, description, og:image)

**Tests:**
- Homepage loads and displays all sections
- Service detail pages render correctly
- Blog pages render correctly
- Contact page renders form

---

### S13: Create Contact Form Submission API
**Priority:** 13

Create the API endpoint to handle contact form submissions, storing them in the ContactSubmissions collection.

**Acceptance Criteria:**
- app/api/contact/route.ts handling POST requests
- Zod validation for form data (name, email, phone, message, theme)
- Creates entry in ContactSubmissions collection via Payload Local API
- Returns appropriate success/error responses
- Rate limiting consideration (basic)
- ContactSection form submits to this endpoint

**Tests:**
- POST /api/contact creates submission in database
- Validation errors return 400 with error messages
- Successful submission returns 200

---

### S14: Create Demo Content Seed Script
**Priority:** 14

Create a script to seed the database with demo content for a sample law firm "Advokat Petrović".

**Acceptance Criteria:**
- scripts/seed.ts with demo content for all collections
- SiteSettings populated with firm name, contact info
- 6 Services (Civil, Criminal, Business, Labor, Family, Real Estate Law)
- 3 Team members with photos
- 3 Testimonials
- 2 Blog posts about Serbian law
- Homepage content populated
- Script runnable via pnpm seed
- Idempotent (can run multiple times safely)

**Tests:**
- pnpm seed runs without errors
- Demo content appears in admin panel
- Frontend displays seeded content

---

### S15: Create Traditional Template (Burgundy + Gold)
**Priority:** 15

Duplicate Premium template and apply Traditional theme styling (Burgundy #800020 + Gold + Cream, Merriweather + Lora fonts).

**Acceptance Criteria:**
- templates/traditional/ is a complete copy of premium template
- CSS variables updated for Traditional color palette
- Fonts changed to Merriweather (headings) and Lora (body)
- Theme name updated in package.json and config
- All components render correctly with new theme
- Demo content seed uses same data structure

**Tests:**
- pnpm build succeeds in templates/traditional
- Theme colors apply correctly
- Fonts load correctly

---

### S16: Create Modern Template (Blue + White)
**Priority:** 16

Duplicate Premium template and apply Modern theme styling (Light blue #4a90e2 + White space, Montserrat + Open Sans fonts).

**Acceptance Criteria:**
- templates/modern/ is a complete copy of premium template
- CSS variables updated for Modern color palette
- Fonts changed to Montserrat (headings) and Open Sans (body)
- Theme name updated in package.json and config
- More whitespace and lighter visual weight
- All components render correctly with new theme

**Tests:**
- pnpm build succeeds in templates/modern
- Theme colors apply correctly
- Fonts load correctly

---

### S17: Create Boutique Template (Green + Beige)
**Priority:** 17

Duplicate Premium template and apply Boutique theme styling (Deep green #2c5f2d + Beige #e8dcc4, Cormorant + Raleway fonts).

**Acceptance Criteria:**
- templates/boutique/ is a complete copy of premium template
- CSS variables updated for Boutique color palette
- Fonts changed to Cormorant (headings) and Raleway (body)
- Theme name updated in package.json and config
- Elegant, specialized aesthetic
- All components render correctly with new theme

**Tests:**
- pnpm build succeeds in templates/boutique
- Theme colors apply correctly
- Fonts load correctly

---

### S18: Implement CLI Template Selection
**Priority:** 18

Implement the interactive CLI flow: welcome message, template selection, project name input, and template cloning.

**Acceptance Criteria:**
- Welcome message with ASCII art or styled text
- Template selection prompt with 4 options (Premium, Traditional, Modern, Boutique)
- Each option shows color description and use case
- Project name prompt with validation (no spaces, no existing directory)
- Uses degit to clone selected template from Lotus015/payload-templates/templates/{name}
- Progress indicators during cloning

**Tests:**
- CLI displays all 4 template options
- Template selection works correctly
- Project name validation rejects invalid names
- Cloning creates correct directory structure

---

### S19: Implement CLI Post-Clone Setup
**Priority:** 19

After cloning, run post-setup steps: install dependencies, update package.json name, display next steps.

**Acceptance Criteria:**
- Runs pnpm install in new project directory
- Updates package.json name to user's project name
- Creates .env file from .env.example (prompts for DATABASE_URL if interactive)
- Displays success message with next steps
- Next steps include: cd into project, set up DATABASE_URL, run pnpm seed, run pnpm dev
- Handles errors gracefully with helpful messages

**Tests:**
- Dependencies install successfully
- package.json name is updated
- Success message displays correctly
- Error handling works for missing pnpm

---

### S20: Add Vercel Deployment Configuration
**Priority:** 20

Add Vercel deployment configuration to all templates for easy deployment.

**Acceptance Criteria:**
- vercel.json in each template with build settings
- Build command: pnpm build
- Environment variables documented for Vercel
- DATABASE_URL with connection pooling parameter for Vercel Postgres compatibility
- PAYLOAD_SECRET environment variable required
- README section on Vercel deployment

**Tests:**
- vercel.json is valid JSON
- Build command works locally
- Documentation is clear and complete

---

### S21: Add Lightsail Deployment Documentation
**Priority:** 21

Document the process for deploying to AWS Lightsail (full stack on single instance).

**Acceptance Criteria:**
- docs/lightsail-deployment.md with step-by-step guide
- PostgreSQL installation and setup on Lightsail
- Node.js and pnpm installation
- PM2 process manager setup
- Nginx reverse proxy configuration
- SSL certificate setup with Let's Encrypt
- Environment variables configuration
- Database backup recommendations

**Tests:**
- Documentation is complete and follows logical order
- All commands are correct and tested
- No missing steps in the deployment process

---

### S22: Create Template README and Documentation
**Priority:** 22

Create comprehensive README for each template and the CLI package.

**Acceptance Criteria:**
- Each template has README.md with: features, requirements, installation, configuration, development, deployment, customization
- cli/README.md with usage instructions and examples
- Root README.md with project overview, quick start, and links to templates
- CLAUDE.md in each template with operating contract
- All documentation in English

**Tests:**
- README files exist in all expected locations
- Documentation covers all major topics
- No broken links or references

---

### S23: Testing and Quality Assurance
**Priority:** 23

Add tests for CLI functionality and ensure all templates pass quality checks.

**Acceptance Criteria:**
- cli/ has basic tests for template selection logic
- Each template passes: pnpm lint, pnpm typecheck, pnpm test
- All templates build successfully: pnpm build
- ESLint configured with no warnings
- TypeScript strict mode with no errors
- At least one test file per template testing a component

**Tests:**
- pnpm test passes in all workspaces
- pnpm lint passes in all workspaces
- pnpm typecheck passes in all workspaces
- pnpm build passes in all templates

---

### S24: Publish CLI to npm
**Priority:** 24

Prepare and publish the CLI package to npm as "payload-templates".

**Acceptance Criteria:**
- cli/package.json has correct metadata (name, version, description, keywords, repository, author, license)
- Version set to 1.0.0
- README included in package
- .npmignore excludes unnecessary files
- Package published to npm registry
- npx payload-templates works correctly

**Tests:**
- npm pack creates correct package contents
- Package installs and runs correctly
- npx payload-templates displays welcome message

---

## Environment Variables Reference

Each template requires:
```
DATABASE_URL=postgresql://user:password@host:5432/database
PAYLOAD_SECRET=your-secret-key-min-32-chars
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

For Vercel with connection pooling:
```
DATABASE_URL=postgresql://user:password@host:5432/database?pgbouncer=true
```

---

## Theme Reference

| Theme | Primary | Secondary | Accent | Heading Font | Body Font |
|-------|---------|-----------|--------|--------------|-----------|
| Premium | #1a1f36 (Navy) | #d4af37 (Gold) | #f5f5f5 | Playfair Display | Inter |
| Traditional | #800020 (Burgundy) | #d4af37 (Gold) | #f5f0e6 (Cream) | Merriweather | Lora |
| Modern | #4a90e2 (Blue) | #ffffff (White) | #f0f4f8 | Montserrat | Open Sans |
| Boutique | #2c5f2d (Green) | #e8dcc4 (Beige) | #f9f6f0 | Cormorant | Raleway |

---

## Payload Collections Summary

1. **Pages** - Static pages (Homepage, About, etc.)
2. **Services** - Legal practice areas
3. **Team** - Lawyers and staff members
4. **Testimonials** - Client reviews
5. **BlogPosts** - News and articles
6. **ContactSubmissions** - Form submissions (read-only)
7. **Media** - Image uploads

## Globals Summary

1. **SiteSettings** - Firm name, contact info, social links
2. **ThemeSettings** - Color and font overrides

---

## Success Criteria

The project is complete when:
1. `npx payload-templates` successfully creates a new project
2. All 4 templates build and run correctly
3. Payload CMS admin is accessible at /admin
4. Demo content is seeded and displays on frontend
5. Contact form submissions save to database
6. Templates deploy successfully to Vercel
7. Documentation is complete and accurate
