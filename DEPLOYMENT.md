# Deployment Guide

Complete guide to publish the CLI to npm and deploy the documentation website to Vercel.

---

## Table of Contents

1. [Publishing CLI to npm](#publishing-cli-to-npm)
2. [Deploying Website to Vercel](#deploying-website-to-vercel)
3. [Post-Deployment](#post-deployment)
4. [Troubleshooting](#troubleshooting)

---

## Publishing CLI to npm

Make the CLI available worldwide so anyone can run:
```bash
npx native-shadcn-cli add button
```

### Prerequisites

1. **Create npm account** at [npmjs.com/signup](https://www.npmjs.com/signup)
2. **Install Node.js** (v16 or higher)
3. **Have a GitHub repository** for your code

### Step 1: Login to npm

```bash
npm login
```

Enter your npm credentials when prompted.

### Step 2: Configure Package

Update `packages/cli/package.json`:

```json
{
  "name": "native-shadcn-cli",
  "version": "1.0.0",
  "description": "Add beautiful React Native components to your project",
  "author": "native shadcn nativeshadcn@gmail.com",
  "license": "MIT",
  "homepage": "https://native-shadcn.vercel.app/",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/nativeshadcn/native-shadcn.git"
  },
  "bugs": {
    "url": "https://github.com/nativeshadcn/native-shadcn/issues"
  },
  "keywords": [
    "react-native",
    "nativewind",
    "tailwind",
    "tailwindcss",
    "ui",
    "components",
    "cli",
    "shadcn",
    "mobile",
    "expo"
  ],
  "bin": {
    "native-shadcn-cli": "./dist/index.js"
  },
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": [
    "dist",
    "README.md"
  ],
  "scripts": {
    "dev": "tsup --watch",
    "build": "tsup",
    "prepublishOnly": "npm run build"
  }
}
```

### Step 3: Create .npmignore

Create `packages/cli/.npmignore`:

```
# Source files
src/

# Config files
tsconfig.json
tsup.config.ts

# Tests
*.test.ts
*.spec.ts
__tests__/

# Development
node_modules/
.DS_Store
.env
.env.*

# Build artifacts
*.log
npm-debug.log*
```

### Step 4: Build the CLI

```bash
cd packages/cli
npm install
npm run build
```

Verify `dist/` folder exists with:
- `dist/index.js`
- `dist/index.d.ts`

### Step 5: Test Locally (Important!)

Before publishing, test the CLI locally:

```bash
# In packages/cli directory
npm link

# Test in a new terminal
npx native-shadcn-cli --version
npx native-shadcn-cli list
```

If it works, unlink:
```bash
npm unlink -g native-shadcn-cli
```

### Step 6: Publish to npm

```bash
cd packages/cli

# First time publish
npm publish

# If package name is taken, you'll need to scope it:
# Update package.json name to "@mreshnaan/native-shadcn-cli"
# Then publish with:
npm publish --access public
```

### Step 7: Verify Publication

After publishing, anyone can use it:

```bash
npx native-shadcn-cli init
npx native-shadcn-cli add button card
npx native-shadcn-cli list
```

Check your package page: `https://www.npmjs.com/package/native-shadcn-cli`

### Updating the CLI

When you make changes:

1. **Update version** (use semantic versioning):
   ```bash
   cd packages/cli

   # Patch release (1.0.0 -> 1.0.1) - bug fixes
   npm version patch

   # Minor release (1.0.0 -> 1.1.0) - new features
   npm version minor

   # Major release (1.0.0 -> 2.0.0) - breaking changes
   npm version major
   ```

2. **Build and publish**:
   ```bash
   npm run build
   npm publish
   ```

3. **Create Git tag**:
   ```bash
   git push
   git push --tags
   ```

---

## Deploying Website to Vercel

Deploy your documentation website to Vercel (like shadcn/ui does).

### Why Vercel?

- ✅ Free for personal projects
- ✅ Automatic deployments from Git
- ✅ Custom domains
- ✅ Lightning fast CDN
- ✅ Preview deployments for PRs

### Method 1: Deploy via Vercel Dashboard (Easiest)

#### Step 1: Push to GitHub

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"

# Create repo on GitHub, then:
git remote add origin https://github.com/nativeshadcn/native-shadcn.git
git branch -M main
git push -u origin main
```

#### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with GitHub
3. Click **"Add New Project"**
4. **Import** your `native-shadcn` repository
5. Configure project settings:

**Project Settings:**
```
Framework Preset: Vite
Root Directory: .
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

6. Click **"Deploy"**

#### Step 3: Configure Build Settings

If needed, add environment variables in Vercel dashboard:
- Go to Project Settings → Environment Variables
- Add any required variables

#### Step 4: Get Your URL

Your site will be live at:
```
https://your-project-name.vercel.app
```

### Method 2: Deploy via Vercel CLI

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login

```bash
vercel login
```

#### Step 3: Deploy

```bash
# From the root directory
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? **Your account**
- Link to existing project? **N**
- What's your project's name? **native-shadcn**
- In which directory is your code located? **.**
- Want to override the settings? **Y**
  - Build Command: `npm run build`
  - Output Directory: `dist`
  - Development Command: `npm run dev`

#### Step 4: Production Deploy

```bash
vercel --prod
```

### Configuration Files

#### vercel.json

The `vercel.json` in the root directory handles routing:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### Custom Domain

1. Go to **Project Settings** → **Domains**
2. Add your domain: `native-shadcn.com`
3. Configure DNS:
   - Type: `A`
   - Name: `@`
   - Value: `76.76.21.21`

   OR

   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`

4. Wait for DNS propagation (can take up to 48 hours)

### Automatic Deployments

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every push to other branches
- **PR Previews**: Every pull request

### Environment Variables

Add in Vercel Dashboard:

1. Go to **Project Settings** → **Environment Variables**
2. Add variables for different environments:
   - Production
   - Preview
   - Development

Example:
```
Name: VITE_API_URL
Value: https://api.example.com
Environment: Production
```

---

## Post-Deployment

### Update Package Links

After deploying, update your `packages/cli/package.json`:

```json
{
  "homepage": "https://native-shadcn.vercel.app",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/nativeshadcn/native-shadcn.git"
  }
}
```

Then republish CLI:
```bash
cd packages/cli
npm version patch
npm publish
```

### Update Footer Links

Update `src/components/footer.tsx`:

```tsx
<a
  href="https://github.com/nativeshadcn/native-shadcn"
  target="_blank"
  rel="noopener noreferrer"
>
  GitHub
</a>
```

### Update README

Update root `README.md` with your actual links:

```markdown
## Links

- **Documentation:** https://native-shadcn.vercel.app
- **npm Package:** https://www.npmjs.com/package/native-shadcn-cli
- **GitHub:** https://github.com/nativeshadcn/native-shadcn
```

---

## Troubleshooting

### CLI Issues

#### "Package name already exists"

Use a scoped package:
```json
{
  "name": "@mreshnaan/native-shadcn-cli"
}
```

Then publish with:
```bash
npm publish --access public
```

Users will use it as:
```bash
npx @mreshnaan/native-shadcn-cli add button
```

#### "Permission denied"

```bash
sudo npm publish
```

Or fix npm permissions: https://docs.npmjs.com/resolving-eacces-permissions-errors

#### "Command not found after publish"

1. Check `bin` field in package.json
2. Verify `dist/index.js` has shebang: `#!/usr/bin/env node`
3. Wait a few minutes for npm registry to update

### Vercel Issues

#### "Build failed"

Check build logs in Vercel dashboard. Common fixes:

1. **Root directory**: Should be `.` (root)
2. **Build command**: Should be `npm run build`
3. **Output directory**: Should be `dist`
4. **Node version**: Add to `package.json`:
   ```json
   {
     "engines": {
       "node": ">=18.0.0"
     }
   }
   ```

#### "404 on refresh"

Add `vercel.json` with rewrites (see above).

#### "Environment variables not working"

1. Prefix with `VITE_` for Vite projects
2. Redeploy after adding env vars
3. Check they're set for correct environment

---

## Complete Deployment Checklist

### Before Publishing CLI

- [ ] Update version in `package.json`
- [ ] Update `description`, `keywords`, `author`
- [ ] Add `homepage` and `repository` URLs
- [ ] Create `.npmignore` file
- [ ] Build: `npm run build`
- [ ] Test locally: `npm link`
- [ ] Commit all changes

### Publishing CLI

- [ ] Login: `npm login`
- [ ] Publish: `npm publish`
- [ ] Verify: `npx native-shadcn-cli --version`
- [ ] Check npm page: npmjs.com/package/native-shadcn-cli

### Before Deploying Website

- [ ] Update footer links
- [ ] Test build locally: `npm run build`
- [ ] Preview build: `npm run preview`
- [ ] Commit all changes
- [ ] Push to GitHub

### Deploying Website

- [ ] Connect GitHub to Vercel
- [ ] Import repository
- [ ] Configure build settings
- [ ] Deploy
- [ ] Test deployment
- [ ] Add custom domain (optional)

### After Deployment

- [ ] Update CLI package.json with website URL
- [ ] Republish CLI with new version
- [ ] Update root README.md
- [ ] Test CLI with new links
- [ ] Share with community!

---

## Usage Examples

After deployment, users can:

```bash
# Install components
npx native-shadcn-cli init
npx native-shadcn-cli add button card input

# Visit documentation
# https://native-shadcn.vercel.app

# View source
# https://github.com/nativeshadcn/native-shadcn

# Check npm package
# https://npmjs.com/package/native-shadcn-cli
```

---

## Continuous Integration (Optional)

### GitHub Actions for Auto-Publish

Create `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'

      - name: Install dependencies
        run: cd packages/cli && npm install

      - name: Build
        run: cd packages/cli && npm run build

      - name: Publish to npm
        run: cd packages/cli && npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Add `NPM_TOKEN` to GitHub Secrets:
1. Get token from npmjs.com/settings/tokens
2. Add to GitHub repo → Settings → Secrets

---

## Support

Need help?

- **npm issues**: Check [npm docs](https://docs.npmjs.com/)
- **Vercel issues**: Check [Vercel docs](https://vercel.com/docs)
- **Create an issue**: Your GitHub repo issues page

---

## Success!

Your CLI and website are now live! 🎉

- Anyone can use: `npx native-shadcn-cli`
- Documentation: `https://native-shadcn.vercel.app`
- Open source: `https://github.com/nativeshadcn/native-shadcn`

Share it with the React Native community!
