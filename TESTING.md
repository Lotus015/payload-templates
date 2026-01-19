# Testing Guide

This guide provides step-by-step instructions for manually testing the Payload Templates project end-to-end.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setting Up PostgreSQL for Testing](#setting-up-postgresql-for-testing)
- [Testing Templates](#testing-templates)
- [Testing the CLI Locally](#testing-the-cli-locally)
- [Testing After npm Publish](#testing-after-npm-publish)
- [Verification Checklist](#verification-checklist)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before testing, ensure you have the following installed:

- **Node.js 20+** - Check with `node --version`
- **pnpm** - Install with `npm install -g pnpm`
- **PostgreSQL 14+** - See setup instructions below
- **Git** - For cloning and version control

## Setting Up PostgreSQL for Testing

### Option 1: Local PostgreSQL Installation

#### macOS (using Homebrew)

```bash
# Install PostgreSQL
brew install postgresql@16

# Start the service
brew services start postgresql@16

# Create a test database
createdb payload_test

# Verify connection
psql payload_test -c "SELECT 1;"
```

Your connection string will be:
```
DATABASE_URL=postgres://$(whoami)@localhost:5432/payload_test
```

#### Ubuntu/Debian

```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start the service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create user and database
sudo -u postgres createuser --interactive
sudo -u postgres createdb payload_test

# Verify connection
psql -d payload_test -c "SELECT 1;"
```

#### Windows

1. Download PostgreSQL from https://www.postgresql.org/download/windows/
2. Run the installer and follow the prompts
3. Use pgAdmin or psql to create a database named `payload_test`

### Option 2: Docker

```bash
# Run PostgreSQL in Docker
docker run --name payload-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=payload_test \
  -p 5432:5432 \
  -d postgres:16

# Connection string
DATABASE_URL=postgres://postgres:postgres@localhost:5432/payload_test
```

### Option 3: Cloud Database (for testing deployment scenarios)

- **Neon**: https://neon.tech (free tier available)
- **Supabase**: https://supabase.com (free tier available)
- **Vercel Postgres**: https://vercel.com/storage/postgres

## Testing Templates

### Install Dependencies (Root Level)

```bash
# From the project root
pnpm install
```

### Testing a Single Template

Each template can be tested independently. Here's the process for testing a template (using `premium` as an example):

#### 1. Navigate to Template

```bash
cd templates/premium
```

#### 2. Configure Environment

```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your database connection
# Required variables:
#   DATABASE_URL=postgres://user:password@localhost:5432/payload_test
#   PAYLOAD_SECRET=your-secret-key-min-32-characters-long
```

Generate a secure `PAYLOAD_SECRET`:
```bash
openssl rand -base64 32
```

#### 3. Run Quality Checks

```bash
# Run linting
pnpm lint

# Run type checking
pnpm typecheck

# Run tests
pnpm test
```

#### 4. Build the Template

```bash
pnpm build
```

#### 5. Start Development Server

```bash
pnpm dev
```

The server will start at http://localhost:3000

#### 6. Access the Admin Panel

1. Navigate to http://localhost:3000/admin
2. Create your first admin user (Payload will prompt you on first visit)
3. Verify you can access all collections:
   - Pages
   - Services
   - Team
   - Testimonials
   - Blog Posts
   - Contact Submissions
   - Media (uploads)
4. Verify you can access globals:
   - Site Settings
   - Theme Settings

#### 7. Test the Seed Script

```bash
# Seed demo content (Advokat Petrovic law firm)
pnpm seed
```

After seeding, verify:
- Site Settings populated with firm name and contact info
- 6 Services created (Civil, Criminal, Business, Labor, Family, Real Estate Law)
- 3 Team members created
- 3 Testimonials created
- 2 Blog posts created

#### 8. Test the Frontend

Visit these pages and verify they render:

| Page | URL | What to Verify |
|------|-----|----------------|
| Homepage | http://localhost:3000 | Hero, Services, Testimonials, Blog sections |
| Services | http://localhost:3000/services/civil-law | Individual service page |
| Blog | http://localhost:3000/blog | Blog listing page |
| Blog Post | http://localhost:3000/blog/[slug] | Individual blog post |
| Contact | http://localhost:3000/contact | Contact form renders |

#### 9. Test Contact Form Submission

1. Go to http://localhost:3000/contact (or use the contact section on homepage)
2. Fill out and submit the form
3. Check the admin panel for new contact submission at http://localhost:3000/admin/collections/contact-submissions

### Testing All Four Templates

Repeat the above process for each template:

```bash
# Premium (Navy + Gold)
cd templates/premium && pnpm lint && pnpm typecheck && pnpm build

# Traditional (Burgundy + Gold)
cd templates/traditional && pnpm lint && pnpm typecheck && pnpm build

# Modern (Blue + White)
cd templates/modern && pnpm lint && pnpm typecheck && pnpm build

# Boutique (Green + Beige)
cd templates/boutique && pnpm lint && pnpm typecheck && pnpm build
```

Or run all builds from the root:

```bash
# From project root - test all templates
cd templates/premium && pnpm lint && pnpm typecheck && pnpm build && \
cd ../traditional && pnpm lint && pnpm typecheck && pnpm build && \
cd ../modern && pnpm lint && pnpm typecheck && pnpm build && \
cd ../boutique && pnpm lint && pnpm typecheck && pnpm build
```

## Testing the CLI Locally

Before publishing to npm, test the CLI locally:

### 1. Run CLI Directly

```bash
# From project root
node cli/bin/index.js
```

This should:
- Display the welcome banner
- Show template selection prompt
- Ask for project name
- Clone the selected template

### 2. Test Help Flag

```bash
node cli/bin/index.js --help
```

Should display help text with usage, options, and template descriptions.

### 3. Test CLI Unit Tests

```bash
cd cli
pnpm test
```

### 4. Test Full Flow (End-to-End)

```bash
# Create a test directory outside the project
cd /tmp  # or another test location

# Run the CLI from the project
node /path/to/payload-templates/cli/bin/index.js

# Select a template (e.g., premium)
# Enter project name (e.g., test-project)

# The CLI will:
# 1. Clone the template from GitHub
# 2. Update package.json with your project name
# 3. Create .env from .env.example
# 4. Install dependencies

# Navigate to the created project
cd test-project

# Configure and test
cp .env.example .env
# Edit .env with your DATABASE_URL and PAYLOAD_SECRET
pnpm dev
```

### 5. Test npm Pack

Before publishing, verify the package contents:

```bash
cd cli
npm pack --dry-run
```

This shows what will be included in the published package.

## Testing After npm Publish

After publishing to npm (see `cli/PUBLISHING.md`), test the published package:

### 1. Test with npx (Fresh Install)

```bash
# Clear npx cache to ensure fresh download
npx clear-npx-cache  # or manually delete ~/.npm/_npx

# Run the published CLI
npx payload-templates

# Or with a project name
npx payload-templates my-new-project
```

### 2. Test Global Install

```bash
# Install globally
npm install -g payload-templates

# Run the CLI
payload-templates

# Uninstall when done testing
npm uninstall -g payload-templates
```

### 3. Verify Template Cloning

When testing the published CLI, verify:
- Templates are cloned from the correct GitHub repository
- All files are present in the cloned project
- Dependencies install successfully
- The project builds and runs

## Verification Checklist

Use this checklist to verify everything works correctly:

### Build Verification

- [ ] `templates/premium`: `pnpm lint` passes
- [ ] `templates/premium`: `pnpm typecheck` passes
- [ ] `templates/premium`: `pnpm build` succeeds
- [ ] `templates/traditional`: `pnpm lint` passes
- [ ] `templates/traditional`: `pnpm typecheck` passes
- [ ] `templates/traditional`: `pnpm build` succeeds
- [ ] `templates/modern`: `pnpm lint` passes
- [ ] `templates/modern`: `pnpm typecheck` passes
- [ ] `templates/modern`: `pnpm build` succeeds
- [ ] `templates/boutique`: `pnpm lint` passes
- [ ] `templates/boutique`: `pnpm typecheck` passes
- [ ] `templates/boutique`: `pnpm build` succeeds

### Seed Script Verification (per template)

- [ ] Seed script runs without errors (`pnpm seed`)
- [ ] Site Settings populated
- [ ] 6 Services created
- [ ] 3 Team members created
- [ ] 3 Testimonials created
- [ ] 2 Blog posts created

### Admin Panel Verification (per template)

- [ ] Admin panel loads at `/admin`
- [ ] Can create admin user on first visit
- [ ] All collections accessible
- [ ] All globals accessible
- [ ] Can create/edit/delete content
- [ ] Media uploads work

### Frontend Verification (per template)

- [ ] Homepage renders with all sections
- [ ] Navigation works
- [ ] Service pages render
- [ ] Blog listing renders
- [ ] Blog post pages render
- [ ] Contact page renders
- [ ] Contact form submits successfully
- [ ] Mobile responsive design works

### CLI Verification

- [ ] `node cli/bin/index.js --help` displays help
- [ ] Template selection works
- [ ] Project name validation works
- [ ] Template cloning succeeds
- [ ] package.json name updated
- [ ] .env file created
- [ ] Dependencies install
- [ ] Created project builds

## Troubleshooting

### Database Connection Issues

**Error: `connection refused` or `ECONNREFUSED`**

1. Verify PostgreSQL is running:
   ```bash
   # macOS
   brew services list | grep postgresql

   # Linux
   sudo systemctl status postgresql

   # Docker
   docker ps | grep postgres
   ```

2. Check the connection string format:
   ```
   postgres://username:password@host:port/database
   ```

3. Verify the database exists:
   ```bash
   psql -l  # List all databases
   ```

**Error: `password authentication failed`**

- Check username and password in your connection string
- For local development without a password, try:
  ```
  DATABASE_URL=postgres://localhost:5432/payload_test
  ```

**Error: `database does not exist`**

Create the database:
```bash
createdb payload_test
# or
psql -c "CREATE DATABASE payload_test;"
```

### Missing Environment Variables

**Error: `PAYLOAD_SECRET is required`**

Add `PAYLOAD_SECRET` to your `.env` file:
```bash
echo "PAYLOAD_SECRET=$(openssl rand -base64 32)" >> .env
```

**Error: `DATABASE_URL is required`**

Ensure `.env` has a valid `DATABASE_URL`:
```
DATABASE_URL=postgres://user:password@localhost:5432/payload_test
```

### Build Failures

**Error: `Cannot find module`**

1. Delete node_modules and reinstall:
   ```bash
   rm -rf node_modules
   pnpm install
   ```

2. If using workspaces, install from root:
   ```bash
   cd /path/to/payload-templates
   pnpm install
   ```

**Error: `Type errors`**

Run type checking to see specific errors:
```bash
pnpm typecheck
```

### CLI Issues

**Error: `degit failed`**

- Check internet connection
- Verify the GitHub repository is accessible
- Try running with verbose mode (modify cli/bin/index.js temporarily)

**Error: `EACCES permission denied`**

- Check write permissions in the target directory
- Try creating the project in a different location

**Error: `pnpm not found` during post-clone install**

Install pnpm globally:
```bash
npm install -g pnpm
```

### Seed Script Issues

**Error: `relation does not exist`**

The database schema needs to be created first. Run the dev server once to let Payload create the schema:
```bash
pnpm dev
# Wait for it to start, then Ctrl+C
pnpm seed
```

**Error: `duplicate key value`**

The seed script is idempotent, but if you encounter issues:
```bash
# Drop and recreate the database
dropdb payload_test
createdb payload_test
pnpm seed
```

### Port Already in Use

**Error: `EADDRINUSE: address already in use :::3000`**

Find and kill the process using port 3000:
```bash
# macOS/Linux
lsof -i :3000
kill -9 <PID>

# or use a different port
PORT=3001 pnpm dev
```

### Admin Panel Not Loading

1. Check browser console for JavaScript errors
2. Verify the build completed successfully
3. Clear browser cache and try again
4. Check that all Payload dependencies are installed

### Contact Form Not Submitting

1. Check browser network tab for API errors
2. Verify the `/api/contact` route exists
3. Check server console for error messages
4. Ensure the database is connected and writable
