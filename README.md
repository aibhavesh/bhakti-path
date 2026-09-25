# Bhaktipath

Full-stack Next.js and Payload CMS rebuild of the Bhaktipath website.

## Included

- Responsive redesigned homepage
- Cylindrical Bhaktipath logo treatment in the header and loading screen
- 3D Divine Darshan presentation for Shri Girdhar Lal Ji with perspective, halos, pedestal, reflection, and reduced-motion support
- Original “A Living Dialogue” section using extracted official/owned portraits of Shri Girdhar Lal Ji, Shri Radha Raman Ji, and Shri Indresh Upadhyay Ji
- About, schedule, event detail, audio, video, contact, registration, privacy, and 404 pages
- Payload CMS administration at `/admin`
- Events, tracks, videos, quotes, pages, media, registrations, and contact-message backend
- Searchable audio player and YouTube video library
- Contact and registration form APIs
- SQLite development database with migration and seed data
- SEO metadata, sitemap, robots rules, structured event data, and accessibility foundations

See [`PROJECT_DOCUMENTATION.md`](./PROJECT_DOCUMENTATION.md) for the complete implementation report.

## Local setup

```bash
npm install --legacy-peer-deps
```

Create `.env` from `.env.example`, then run:

```bash
npm run db:migrate
npm run seed
npm run dev
```

Open:

- Website: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`
- REST API: `http://localhost:3000/api`
- GraphQL: `http://localhost:3000/api/graphql`

The local seed administrator email is `admin@bhaktipaths.local`; its development password is stored in the ignored `.env` file.

## Deploy to Netlify

The project includes `netlify.toml` and a Netlify-aware build wrapper. Push this folder to GitHub, import the repository into Netlify, and Netlify will detect the Next.js settings automatically.

For a public preview, deploy without production secrets first. For the full Payload CMS, configure Turso and Cloudflare R2 as described in:

[`DEPLOYMENT_NETLIFY.md`](./DEPLOYMENT_NETLIFY.md)

The local `file:./bhaktipath.db` database and local upload directories must not be used as the production Netlify database or media storage.

## Validation

```bash
npm run typecheck
npm run lint
npm run build
```
