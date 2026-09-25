# GitHub → Netlify Deployment Plan

## Current project

```text
D:\Bhaktipath\bhaktipaths-redesign
```

The project contains:

- Next.js App Router public website
- Payload CMS admin/API
- SQLite local development database
- Public events, audio, video, contact, and registration pages
- Responsive devotional design system
- Loading screen and Netlify build configuration

The project includes:

```text
netlify.toml
scripts/netlify-build.mjs
DEPLOYMENT_FREE_TIER.md
```

Netlify supports the current Next.js App Router, server-side rendering, route handlers, image optimization, and server functions.

## Build dependency note

Netlify can set `NODE_ENV=production` while installing dependencies. The project keeps `typescript`, `@types/react`, and the other build tools in `devDependencies`; `netlify.toml` uses `--include=dev` so those packages remain available during `next build`. Do not remove this flag unless the Netlify build process is changed to install development dependencies explicitly.

---

# Important deployment distinction

There are two possible deployments.

## Stage 1 — Public preview deployment

This is the quickest way to share the redesigned website.

It includes:

- Public pages
- Static/generated content
- Local migrated content fallback
- Responsive design
- Loading screen
- 3D devotional section
- Public audio/video pages

This stage does **not** provide durable admin content, registrations, or uploads because Netlify functions do not have a permanent local filesystem.

## Stage 2 — Full CMS/backend deployment

This is the real production setup.

It adds:

- Payload admin at `/admin`
- Durable Payload database
- Event management
- Audio/video management
- Contact submissions
- Registration submissions
- Remote image/audio storage

For this stage, use:

```text
Netlify        → Next.js and Payload functions
Turso          → persistent SQLite/libSQL database
Cloudflare R2  → images and audio uploads
GitHub         → source and automatic deployments
```

The current local setting:

```text
DATABASE_URL=file:./bhaktipath.db
```

must not be used as the production Netlify database.

---

# Phase 1 — Push the project to GitHub

Open PowerShell:

```powershell
cd D:\Bhaktipath\bhaktipaths-redesign
```

Check the repository:

```powershell
git status
git branch --show-current
```

If the project has not been committed yet:

```powershell
git add .
git commit -m "Build Bhaktipath Next.js website and Payload CMS"
```

Create a new private GitHub repository from the GitHub website, then add it as a remote:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/bhaktipaths-redesign.git
git branch -M main
git push -u origin main
```

Use a private repository while the project is being tested. Do not commit:

```text
.env
*.db
```

The project already ignores these files.

---

# Phase 2 — Connect GitHub to Netlify

1. Sign in to Netlify.
2. Open **Add new project**.
3. Choose **Import an existing project**.
4. Connect GitHub.
5. Select:

```text
YOUR_USERNAME/bhaktipaths-redesign
```

6. Leave the build configuration automatic initially.

Netlify should detect:

```text
Next.js
```

The included `netlify.toml` sets:

```toml
[build]
command = "npm run netlify:build"
publish = ".next"
```

The expected production branch is:

```text
main
```

Every push to `main` will create a new deployment.

---

# Phase 3 — Public preview deployment

For the first deployment, do not add production secrets yet.

The site can build with the migrated fallback content. Netlify will provide a URL similar to:

```text
https://your-project-name.netlify.app
```

Test:

- `/`
- `/about`
- `/schedule`
- `/audio`
- `/video`
- `/contact`
- `/register`
- `/privacy`

Test on:

- Desktop Chrome
- iPhone Safari
- Android Chrome
- iPad Safari

This is the right point to share a preview link with stakeholders.

### Important limitation

At this stage:

- `/admin` may not have durable content
- Form submissions are not production-safe
- Uploaded files are not persistent
- SQLite data is not shared between deployments

Use this stage for visual review and content approval only.

---

# Phase 4 — Create the persistent production database

## Recommended: Turso

Turso provides a remote SQLite/libSQL database that works with Payload’s SQLite adapter.

Install the Turso CLI:

```powershell
npm install -g @tursodatabase/cli
turso login
```

Create a database:

```powershell
turso db create bhaktipath
```

Create a token:

```powershell
turso db tokens create bhaktipath
```

Save the values securely:

```text
DATABASE_URL=libsql://...
DATABASE_AUTH_TOKEN=...
```

Set these in Netlify under:

```text
Site configuration → Environment variables
```

Add them for both:

- Builds
- Functions/runtime

Do not put these values in GitHub or `netlify.toml`.

---

# Phase 5 — Configure production media storage

The current local upload paths are:

```text
public/uploads/images
public/uploads/audio
```

Those paths are not durable in Netlify Functions.

Use Cloudflare R2:

1. Create an R2 bucket:

```text
bhaktipath-media
```

2. Create an R2 API token with read/write access.
3. Add these Netlify environment variables:

```text
S3_ENDPOINT=https://ACCOUNT_ID.r2.cloudflarestorage.com
S3_REGION=auto
S3_BUCKET=bhaktipath-media
S3_ACCESS_KEY_ID=...
S3_SECRET_ACCESS_KEY=...
```

4. Install the Payload S3 adapter:

```powershell
npm install @payloadcms/storage-s3
```

5. Add the adapter to:

```text
src/payload.config.ts
```

The production adapter must be enabled for:

```text
media
audio-media
```

The local filesystem adapter should remain available for local development only.

---

# Phase 6 — Add production environment variables

Set these in Netlify UI:

```text
DATABASE_URL
DATABASE_AUTH_TOKEN
PAYLOAD_SECRET
NEXT_PUBLIC_SERVER_URL
S3_ENDPOINT
S3_REGION
S3_BUCKET
S3_ACCESS_KEY_ID
S3_SECRET_ACCESS_KEY
RUN_MIGRATIONS
```

Use:

```text
RUN_MIGRATIONS=true
```

only for the production context.

Generate a strong Payload secret:

```powershell
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

After the first Netlify deployment, set:

```text
NEXT_PUBLIC_SERVER_URL=https://your-project-name.netlify.app
```

Then trigger a new production deploy.

Keep these values out of GitHub.

---

# Phase 7 — Database migration behavior

The included Netlify build script runs migrations only when:

```text
RUN_MIGRATIONS=true
```

and a remote database is configured.

This prevents Deploy Previews from accidentally modifying the production database.

The production build performs:

```text
Payload migration → Next.js build → Netlify Functions deployment
```

The migration file is stored at:

```text
src/migrations/20260925_105017_initial.ts
```

Do not run production migrations against the local `file:./bhaktipath.db`.

---

# Phase 8 — Seed the production CMS

Run the seed once from a secure local PowerShell session using the production Turso values:

```powershell
cd D:\Bhaktipath\bhaktipaths-redesign

$env:DATABASE_URL="libsql://..."
$env:DATABASE_AUTH_TOKEN="..."
$env:PAYLOAD_SECRET="..."
$env:SEED_ADMIN_EMAIL="your-real-admin@example.com"
$env:SEED_ADMIN_PASSWORD="use-a-long-unique-password"

npm run db:migrate
npm run seed
```

The seed creates the initial:

- Administrator
- Events
- Audio tracks
- Videos
- Quotes
- About page
- Site settings
- Homepage settings

After verifying production, remove the seed password from your local shell and do not put it in Netlify unless needed for a controlled rebuild.

---

# Phase 9 — Verify the Payload admin

Open:

```text
https://your-project-name.netlify.app/admin
```

Verify:

- Administrator login
- Event creation/editing
- Audio upload
- Video editing
- Image upload
- Contact message storage
- Registration storage
- Site settings
- Homepage featured content

The public page should update after the next deployment or cache revalidation.

---

# Phase 10 — Git workflow for sharing

Use branches for review:

```powershell
git checkout -b feature/new-design
git add .
git commit -m "Add new design section"
git push -u origin feature/new-design
```

Open a Pull Request on GitHub.

Netlify will create a Deploy Preview URL automatically.

For the main public site:

```text
main → production Netlify site
feature/* → Deploy Preview
```

Recommended workflow:

```text
1. Create feature branch
2. Push changes
3. Open GitHub Pull Request
4. Review Netlify Deploy Preview
5. Merge into main
6. Netlify publishes production
```

---

# Phase 11 — Add a custom domain later

After the `.netlify.app` URL is stable:

1. Open Netlify **Domain settings**.
2. Choose **Add a domain**.
3. Add your domain, for example:

```text
www.example.com
```

4. Update the DNS records shown by Netlify.
5. Wait for HTTPS provisioning.
6. Update:

```text
NEXT_PUBLIC_SERVER_URL
```

7. Redeploy.

---

# Free-tier limitations

Netlify free usage and limits can change. Check the current dashboard and documentation before launch.

Important considerations:

- Serverless functions have runtime and request limits.
- Large binary uploads have payload limits.
- Netlify local filesystem is not persistent.
- Free usage may pause builds or sites when limits are reached.
- Turso and R2 have their own free-tier limits.
- A free deployment is suitable for testing and low-traffic use, not guaranteed unlimited production capacity.

Official references:

- Netlify Next.js support: <https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview>
- Netlify environment variables: <https://docs.netlify.com/build/environment-variables/overview>
- Netlify Git deployments: <https://docs.netlify.com/start/quickstarts/deploy-from-repository>
- Netlify Blobs: <https://docs.netlify.com/build/data-and-storage/netlify-blobs>
- Turso pricing: <https://turso.tech/pricing>
- Cloudflare R2 pricing: <https://developers.cloudflare.com/r2/pricing/>
- Payload production deployment: <https://payloadcms.com/docs/production/deployment>

---

# Important scope note

The captured `bhaktipath.online` material contains additional application features that are not part of the current public redesign yet:

- Member login and Firebase/passcode authentication
- Profiles and favorites
- Darshan/Guru Diksha tokens
- Event booking, queues, hotels, payments, and Athithi Passes
- Polls and quizzes
- Notifications and push
- Guru–Shishya calls
- Volunteers and scanners
- PWA service worker and native mobile bridge

These should be migrated as a second application phase. They should not be copied blindly from compiled JavaScript.

The current Netlify deployment plan is safe for:

```text
Public website + Payload content management + basic forms
```

The operational member/seva application should be designed with a separate identity and data model before it is connected to the public website.
