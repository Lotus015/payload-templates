# Publishing payload-templates to npm

This guide explains how to publish the `payload-templates` CLI package to npm.

## Prerequisites

1. **npm Account**: Create an account at [npmjs.com](https://www.npmjs.com/signup) if you don't have one
2. **Node.js 20+**: Ensure you have Node.js 20 or later installed
3. **Two-Factor Authentication (Recommended)**: Enable 2FA on your npm account for security

## Pre-Publish Checklist

Before publishing, verify:

- [ ] `package.json` has correct version number (currently `1.0.0`)
- [ ] `package.json` has correct repository URL (update if forked)
- [ ] `package.json` has correct author information
- [ ] README.md is up to date with usage instructions
- [ ] All tests pass: `npm test`
- [ ] Package builds correctly: `npm pack --dry-run`

## Step 1: Login to npm

Open your terminal and authenticate with npm:

```bash
npm login
```

You'll be prompted for:
- Username
- Password
- Email
- OTP (if 2FA is enabled)

Verify you're logged in:

```bash
npm whoami
```

## Step 2: Test the Package Locally

Before publishing, test the package:

```bash
# Navigate to cli directory
cd cli

# Run tests
npm test

# Verify package contents
npm pack --dry-run

# Create a test tarball (optional)
npm pack
```

### Test Installation Locally

You can test the CLI locally before publishing:

```bash
# From cli/ directory, link globally
npm link

# Test the CLI
payload-templates --help

# Create a test project
cd /tmp
payload-templates test-project

# Unlink when done
npm unlink -g payload-templates
```

## Step 3: Publish to npm

When ready, publish from the cli/ directory:

```bash
cd cli
npm publish
```

If this is your first time publishing this package, npm will register it. If the package name is taken, you'll need to either:
- Choose a different name in `package.json`
- Publish as a scoped package: `@yourname/payload-templates`

### Publishing a Scoped Package

If you want to publish under your npm username:

1. Update `package.json`:
   ```json
   {
     "name": "@yourusername/payload-templates",
     ...
   }
   ```

2. Publish with public access:
   ```bash
   npm publish --access public
   ```

## Step 4: Verify Publication

After publishing, verify:

```bash
# Check npm registry
npm view payload-templates

# Test with npx
npx payload-templates --help

# Create a test project
cd /tmp
npx payload-templates my-test-law-firm
```

## Publishing Updates

For subsequent versions:

1. Update the version in `package.json`:
   ```bash
   # Patch version (1.0.0 -> 1.0.1) - bug fixes
   npm version patch

   # Minor version (1.0.0 -> 1.1.0) - new features
   npm version minor

   # Major version (1.0.0 -> 2.0.0) - breaking changes
   npm version major
   ```

2. Publish the new version:
   ```bash
   npm publish
   ```

## Troubleshooting

### "Package name already exists"

The name `payload-templates` might be taken. Options:
- Use a scoped package: `@yourusername/payload-templates`
- Choose a different name: `payload-law-templates`, `create-payload-law-firm`, etc.

### "You must be logged in"

Run `npm login` and try again.

### "Cannot publish over existing version"

Update the version number in `package.json` before publishing.

### "402 Payment Required" for Private Package

Scoped packages are private by default. Add `--access public`:

```bash
npm publish --access public
```

## After Publishing

1. **Test the published package**:
   ```bash
   npx payload-templates@latest --help
   ```

2. **Update README** with the correct installation command if using a scoped name

3. **Create a GitHub release** to match the npm version

4. **Announce the release** on relevant channels

## npm Package Page

Once published, your package will be available at:
- `https://www.npmjs.com/package/payload-templates`

Or for scoped packages:
- `https://www.npmjs.com/package/@yourusername/payload-templates`

## Security Notes

- Never include sensitive data (API keys, passwords) in the published package
- Use `.npmignore` to exclude development files (already configured)
- Enable 2FA on your npm account
- Consider using npm's publish-require-2fa setting
