# Free-Tier Deployment Guide

## Important warning

The current local configuration uses:

```text
DATABASE_URL=file:./bhaktipath.db
```

That SQLite file is for local development only. It must not be used as the production database on Vercel or another serverless host because the serverless filesystem is temporary.

The free-tier deployment must use:

- A persistent remote database
- Persistent remote media storage
- A production `PAYLOAD_SECRET`
- A real public server URL

---

## Recommended free prototype stack

| Need | Recommended service | Reason |
|---|---|---|
| Next.js + Payload app | Vercel Hobby | Easiest Next.js deployment |
| CMS database | Turso/libSQL | SQLite-compatible, free persistent database |
| Uploaded images/audio | Cloudflare R2 | Free tier and no egress fee |
| Source control | GitHub | Connects directly to Vercel |
| Domain | Vercel subdomain initially | No domain purchase required |

This is suitable for a low-traffic prototype and initial launch testing. Review each provider’s current terms before using it for commercial or high-traffic production.

---

## Option A: Vercel + Turso + Cloudflare R2

### 1. Create a GitHub repository

Push this project to a private GitHub repository first.

Do not commit:

```text
.env
*.db
```

The repository already ignores these files.

### 2. Create a Turso database

Install the Turso CLI:

```bash
npm install -g @tursodatabase/cli
turso login
turso db create bhaktipath
```

Copy the database URL and token. Add them to Vercel as:

```text
TURSO_DATABASE_URL
TURSO_AUTH_TOKEN
```

The current Payload SQLite adapter expects the following names, so map the values to:

```text
DATABASE_URL
DATABASE_AUTH_TOKEN
```

The URL will generally look similar to:

```text
libsql://your-database-your-org.turso.io
```

Do not place the real token in this repository.

### 3. Create a Cloudflare R2 bucket

Create an R2 bucket, for example:

```text
bhaktipath-media
```

Create an R2 API token with:

- Object read permission
- Object write permission
- Bucket permission for `bhaktipath-media`

Keep the access key, secret key, bucket name, and endpoint available for the Payload storage adapter configuration.

Cloudflare R2’s current free tier includes standard storage, operation allowances, and free internet egress. Check the current limits before launch:

<https://developers.cloudflare.com/r2/pricing/>

### 4. Add production media storage

The current local media configuration writes to:

```text
public/uploads/images
public/uploads/audio
```

Those folders work on the local computer but are not durable on Vercel.

For production, configure Payload’s S3-compatible storage adapter to use R2. The adapter must be configured for both:

```text
media
audio-media
```

Do not deploy with local upload folders if administrators need to upload files.

### 5. Add production environment variables

Set these in the Vercel project:

```text
DATABASE_URL=libsql://...
DATABASE_AUTH_TOKEN=...
PAYLOAD_SECRET=...
NEXT_PUBLIC_SERVER_URL=https://your-project.vercel.app

R2_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
R2_REGION=auto
R2_BUCKET=bhaktipath-media
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
```

Use a long random `PAYLOAD_SECRET`. Never reuse the development secret.

### 6. Configure migrations during deployment

The production build must apply the Payload migration before starting the site.

Recommended package scripts:

```json
{
  "scripts": {
    "prebuild": "npm run db:migrate",
    "build": "next build"
  }
}
```

The current project already contains:

```text
src/migrations/20260925_105017_initial.ts
```

Run the migration once against the production database before the first deployment if your hosting provider does not run `prebuild` automatically.

### 7. Deploy to Vercel

1. Import the GitHub repository into Vercel.
2. Select the Next.js framework preset.
3. Add all environment variables.
4. Set the production branch to `main`.
5. Deploy.
6. Open the generated `.vercel.app` URL.
7. Update `NEXT_PUBLIC_SERVER_URL` to that URL and redeploy if necessary.
8. Visit `/admin` and create or verify the administrator account.

Vercel Hobby has current usage limits and is intended primarily for personal/non-commercial use under its fair-use terms. Review the current Vercel plan terms before using it for a commercial public service:

<https://vercel.com/docs/plans/hobby>

---

## Option B: Cloudflare Workers + D1 + R2

Cloudflare can provide a free-tier deployment with:

- Cloudflare Workers for the Next.js/Payload application
- D1 for the database
- R2 for media

This can be inexpensive for high-traffic media delivery, but it is not a direct upload of the current Node/Vercel configuration. It requires adapting the Payload database adapter and upload storage to the Cloudflare runtime.

Use this option when:

- International media delivery is important
- You need R2’s egress-free storage
- You are comfortable adapting deployment/runtime configuration

Official Payload references:

- <https://payloadcms.com/get-started>
- <https://developers.cloudflare.com/r2/>

---

## Option C: Self-hosted Node server

For more control, deploy the app to a VPS or Node hosting provider and use:

- Node.js
- PostgreSQL
- S3-compatible object storage
- Nginx or a managed reverse proxy
- HTTPS certificates

This avoids serverless filesystem and database limitations, but it is not guaranteed to be free. It is usually the better long-term production option for a public commercial website.

---

## What must not be deployed

These must never be used as the production database:

```text
file:./bhaktipath.db
```

This must never be the production upload path:

```text
public/uploads/images
public/uploads/audio
```

Both are suitable only for local development.

---

## Free-tier limitations to plan for

- Serverless functions can sleep or restart
- Free database and media tiers have storage/operation limits
- Vercel Hobby has plan and fair-use restrictions
- Local development accounts may be suspended for inactivity
- Serverless logs are usually short-lived
- A custom domain is not included in the free plan
- Email delivery and notifications are not included automatically
- Large audio uploads may require direct-to-storage client uploads

---

## Recommended launch sequence

1. Create the GitHub repository.
2. Create the Turso database.
3. Create the R2 bucket.
4. Configure production storage.
5. Add Vercel environment variables.
6. Run the production migration.
7. Deploy to Vercel preview.
8. Test forms, admin login, images, audio, and video.
9. Test on mobile devices.
10. Deploy to production.
11. Add the custom domain.
12. Submit the sitemap to Google Search Console.
13. Monitor errors, forms, and database usage.

---

## Current project status

The application is currently configured and tested for local development. The remaining deployment work is primarily:

- Switching the database to Turso
- Switching Payload uploads to R2 or another persistent storage provider
- Adding production environment variables
- Adding a production storage adapter
- Running migrations against the remote database
- Creating the production admin account
