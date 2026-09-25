# Bhaktipath

Full-stack Next.js and Payload CMS rebuild of the Bhaktipath website.

## Included

- Responsive redesigned homepage
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

## Validation

```bash
npm run typecheck
npm run lint
npm run build
```
