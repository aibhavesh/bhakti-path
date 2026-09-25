# Bhaktipath Website Redesign — Project Documentation

**Project location:** `D:\Bhaktipath\bhaktipaths-redesign`  
**Documentation date:** 25 September 2026  
**Current status:** Full website conversion and core backend implemented; production deployment and final content verification pending.

---

## 1. Project Summary

The original Bhaktipath website was a static, jQuery-based production capture rather than a complete application repository. It contained one homepage, copied CSS/JavaScript/media assets, and browser/network artifacts. Important route templates and the original backend were not available.

A new full-stack project has therefore been created at:

```text
D:\Bhaktipath\bhaktipaths-redesign
```

The new application is based on Next.js and TypeScript, with Payload CMS providing the backend, administration panel, content APIs, media management, and local database.

The legacy website remains untouched inside:

```text
D:\Bhaktipath\bhaktipaths.com
```

---

## 2. Objectives

The redesign was created to provide:

- A complete conversion from static HTML to a maintainable Next.js application
- A responsive and accessible public website
- A vibrant devotional visual identity
- A backend that non-technical administrators can use
- Central management of events, bhajans, videos, quotes, pages, and enquiries
- Preserved public URLs for existing schedule pages
- Better performance, SEO, media playback, and content accessibility
- A production-ready foundation without modifying the legacy capture

---

## 3. Technology Stack

| Layer | Technology |
|---|---|
| Frontend framework | Next.js 16 App Router |
| Language | TypeScript |
| UI | React 19 |
| Backend/CMS | Payload CMS 3 |
| Local database | SQLite through Payload's Drizzle adapter |
| Production database target | PostgreSQL |
| Content editor | Payload Lexical rich-text editor |
| Image processing | Sharp |
| Validation | Zod |
| Icons | Lucide React |
| Styling | Custom responsive CSS design system |
| Fonts | Self-hosted by `next/font` |
| Media | HTML audio player and privacy-enhanced YouTube embeds |
| API | Payload REST and GraphQL, plus validated Next.js form routes |

---

## 4. Completed Public Website

The following public pages have been implemented:

| Route | Purpose | Status |
|---|---|---|
| `/` | Redesigned homepage | Complete |
| `/about` | About Shri Indresh Upadhyay Ji and Bhaktipath | Complete |
| `/schedule` | Searchable event schedule and archive | Complete |
| `/schedule/[slug]` | Event details | Complete |
| `/schedule/1` through legacy numeric IDs | Existing event URL compatibility | Supported |
| `/audio` | Searchable bhajan library and audio player | Complete |
| `/video` | Searchable video and katha archive | Complete |
| `/contact` | Contact page and validated enquiry form | Complete |
| `/register` | Event registration enquiry | Complete |
| `/privacy` | Initial privacy policy | Complete |
| Custom 404 page | Improved missing-page experience | Complete |
| `/sitemap.xml` | Generated SEO sitemap | Complete |
| `/robots.txt` | Generated crawler rules | Complete |
| Web manifest | Installable site metadata | Complete |

---

## 5. Homepage Work

The new homepage includes:

- High-impact devotional hero section
- Clear calls to action for registration and event discovery
- About-the-guru preview
- Recent or upcoming event cards
- Explicit separation between upcoming and completed events
- Featured bhajan links
- Featured katha video links
- Spiritual quote section
- Event registration banner
- Phone contact links
- Responsive desktop and mobile navigation
- Accessible focus states and reduced-motion support

The homepage also includes the new **A Living Dialogue** section, built from extracted official/owned portraits of:

- Shri Girdhar Lal Ji
- Shri Radha Raman Ji
- Shri Indresh Upadhyay Ji

The section uses unequal arch and oval image masks, a connecting sacred thread, symbolic labels, subtle motion, and a dark maroon/gold visual treatment. It is intentionally not a conventional image gallery.

No unverified future event has been presented as upcoming. Existing 2023–2025 events are marked as completed.

---

## 6. Event System

A structured event backend has replaced the previous image-only event information.

Each event can contain:

- Title and URL slug
- Legacy numeric ID
- Summary and full description
- Start and end dates
- Display time
- Time zone
- Upcoming, ongoing, completed, or cancelled status
- Venue, city, and region
- Uploaded event image or fallback image URL
- Accessible image description
- Contact numbers
- Registration status and URL
- Featured-event flag

The public schedule now provides:

- Search by title, city, or venue
- All, Upcoming, and Archive filters
- Real date labels
- Clear completed-event badges
- Responsive event cards
- Event detail pages
- Structured Event JSON-LD for search engines
- Compatibility with old `/schedule/1`-style URLs

---

## 7. Audio Player

The legacy audio page has been rebuilt as a modern bhajan library.

Implemented features:

- Search by title or artist
- Album/category filtering
- One active HTML audio player
- Previous and next controls
- Play and pause controls
- Seek/progress control
- Volume control
- Error feedback when media cannot load
- Click-to-play behavior; audio never autoplays
- Play-count updates through the backend
- Responsive track list
- Sticky now-playing panel on desktop

Nineteen valid legacy bhajan records were migrated. The broken first record from the old site was intentionally excluded.

---

## 8. Video Library

The legacy YouTube catalog has been rebuilt as a searchable video library.

Implemented features:

- Search by title or category
- Category filters
- Forty-four migrated video records
- Only the selected YouTube video is loaded
- Privacy-enhanced `youtube-nocookie.com` player
- Responsive thumbnail grid
- Direct YouTube link
- Active-video state
- Empty search state

Invalid legacy YouTube IDs and playlist query strings are no longer inserted into thumbnail URLs.

---

## 9. Backend and Administration

Payload CMS is available at:

```text
http://localhost:3000/admin
```

The local seed administrator email is:

```text
admin@bhaktipaths.local
```

Its development password is stored in the ignored local `.env` file and is not duplicated in this document.

### Admin Collections

| Collection | Purpose |
|---|---|
| Users | Administrator and editor accounts |
| Media | Image uploads, image sizes, alt text, captions |
| Audio Media | MP3, WAV, OGG, and audio upload management |
| Events | Event schedule and registration content |
| Tracks | Bhajan metadata, playback URL/file, artwork, play count |
| Videos | YouTube ID, title, category, description, featured status |
| Quotes | Hindi, English, or Sanskrit devotional quotations |
| Pages | Rich-text managed website pages |
| Registrations | Event registration submissions |
| Contact Messages | Public contact form submissions |

### Global Settings

| Global | Purpose |
|---|---|
| Site Settings | Site name, description, phones, social links, SEO defaults |
| Homepage | Hero, announcement, featured events, tracks, videos, and quote |

### Access Control

- Public users can read published website content.
- Only authenticated administrators/editors can change content.
- Only administrators can delete users or assign administrator roles.
- Registration and contact submissions are visible only to authenticated administrators.
- Form submissions include a honeypot field for basic bot filtering.
- API requests validate origin, content type, field lengths, email format, and required values.

---

## 10. Forms and Backend APIs

The following validated Next.js endpoints have been created:

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/forms/contact` | `POST` | Stores contact messages |
| `/api/forms/registration` | `POST` | Stores event registration enquiries |
| `/api/media/playback` | `POST` | Increments bhajan play count |
| `/api/*` | Payload REST API | CMS content API |
| `/api/graphql` | `POST` | Payload GraphQL API |
| `/admin` | Payload Admin Panel | Content administration |

Successful form submissions appear immediately in the relevant Payload admin collection.

---

## 11. Content Migration Completed

The initial seed currently contains:

- 5 event records
- 19 audio tracks
- 44 video records
- 3 quotation records
- 1 rich-text About page
- Site settings
- Homepage featured content

Migrated static imagery includes:

- Existing Bhaktipath logos and favicon
- Guru and event photography
- Event flyers
- Registration artwork
- Devotional gallery images
- Audio page background

The repeatable media migration script is located at:

```text
scripts/migrate-legacy-content.mjs
```

It reads the public legacy audio/video catalog and writes normalized content to:

```text
src/data/legacy-media.json
```

### Sacred image extraction

Official/owned Bhaktipath media was used to create consistent web portraits for the homepage’s **A Living Dialogue** section. The reproducible extraction script is:

```text
scripts/prepare-sacred-images.mjs
```

It extracts and optimizes:

```text
public/images/sacred-conversations/girdhar-lal.webp
public/images/sacred-conversations/radha-raman.webp
public/images/sacred-conversations/indresh-upadhyay.webp
```

Source, crop, alt text, and rights notes are recorded in:

```text
public/images/sacred-conversations/manifest.json
```

The script performs cropping, responsive resizing, WebP conversion, and background treatment only. It does not generate or alter the subjects.

---

## 12. Design System

A new visual identity was created with:

- Deep maroon and midnight surfaces
- Saffron, turmeric gold, vermilion, ivory, and teal accents
- Devanagari and English self-hosted typography
- Traditional devotional imagery presented with contemporary spacing
- Event, media, quote, form, and navigation components
- Strong visible keyboard focus states
- Semantic headings and landmarks
- Accessible status labels
- Responsive layouts from mobile through desktop
- Reduced-motion behavior
- Print-friendly legal and event pages

The Next.js development indicator has been disabled through `next.config.ts`.

---

## 13. SEO and Accessibility Work

Completed improvements include:

- Page-specific metadata
- Canonical URLs
- Open Graph and Twitter metadata
- XML sitemap
- Robots rules
- Event structured data
- Semantic page regions
- Descriptive image alternatives
- Keyboard-accessible buttons and navigation
- Escape-key mobile menu closing
- Reduced-motion support
- No autoplay audio
- Lazy media behavior
- YouTube embeds loaded only when selected
- No fabricated future event dates
- No known navigation placeholder links such as `href="#"`

---

## 14. Backend Database and Migration

The initial SQLite migration is located at:

```text
src/migrations/20260925_105017_initial.ts
```

The local database file is generated from:

```text
DATABASE_URL=file:./bhaktipath.db
```

The database file is ignored by Git and should not be used as the permanent production database.

For production, the Payload configuration should be changed from the SQLite adapter to the PostgreSQL adapter, and a managed PostgreSQL database should be configured.

---

## 15. Project Structure

```text
bhaktipaths-redesign/
├── public/
│   ├── images/                 # Migrated website imagery
│   └── uploads/                # Payload-managed local uploads
├── scripts/
│   └── migrate-legacy-content.mjs
├── src/
│   ├── app/
│   │   ├── (payload)/          # Payload admin, REST, and GraphQL
│   │   ├── (site)/             # Public Next.js website
│   │   └── api/                # Contact, registration, playback APIs
│   ├── collections/            # Payload collection schemas
│   ├── components/             # Layout, home, events, forms, and media UI
│   ├── data/                   # Normalized migrated content
│   ├── globals/                # Payload global settings
│   ├── lib/                    # Data access, utilities, validation helpers
│   ├── migrations/             # Database migrations
│   ├── styles/                 # Shared design-system CSS
│   ├── payload.config.ts
│   ├── payload-types.ts
│   └── seed.ts
├── .env.example
├── next.config.ts
├── package.json
└── PROJECT_DOCUMENTATION.md
```

---

## 16. How to Run Locally

### Prerequisites

- Node.js 20.9 or newer
- npm

### Install

```bash
npm install --legacy-peer-deps
```

### Create local environment

Copy `.env.example` to `.env` and set:

```text
DATABASE_URL=file:./bhaktipath.db
PAYLOAD_SECRET=a-long-random-secret
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
SEED_ADMIN_EMAIL=admin@example.com
SEED_ADMIN_PASSWORD=a-strong-password
```

### Apply database migration

```bash
npm run db:migrate
```

### Seed initial content and administrator

```bash
npm run seed
```

### Start development server

```bash
npm run dev
```

Open:

- Website: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`
- REST API: `http://localhost:3000/api`
- GraphQL: `http://localhost:3000/api/graphql`

---

## 17. Quality Checks Completed

The following commands have completed successfully:

```bash
npm run typecheck
npm run lint
npm run build
```

The production build generated the public pages, dynamic event pages, Payload admin/API routes, sitemap, robots file, and web manifest.

The homepage was opened in a real browser and the initial Next.js local-image configuration issue was found and corrected. The browser then rendered the redesigned homepage without console errors.

---

## 18. Remaining Production Work

The application foundation and primary website are implemented, but the following production tasks remain before replacing the live website:

1. Confirm all current event dates and future registrations with the business owner.
2. Replace legacy remote MP3 URLs with owned audio files where possible.
3. Confirm image, music, and video usage rights.
4. Configure production PostgreSQL.
5. Configure production object storage for images and audio.
6. Configure an email/notification provider for form submissions.
7. Set the real production domain and `NEXT_PUBLIC_SERVER_URL`.
8. Add the production `PAYLOAD_SECRET` and administrator credentials.
9. Run accessibility, browser, performance, and security audits in staging.
10. Test every real form and media URL in the production environment.
11. Review privacy/legal copy with the business owner.
12. Deploy staging and obtain content approval.
13. Add permanent redirects from any remaining legacy URLs.
14. Schedule the final production cutover and rollback plan.

---

## 19. Important Content Decision

The previous website labeled old events as “Upcoming,” even though several event flyers were from 2023–2025. The new website does not reproduce that error.

Existing events are marked as:

```text
completed
```

When the owner confirms a future date, it can be changed to:

```text
upcoming
```

through the Payload admin panel.

---

## 20. Current Outcome

The work completed so far has converted the available website into a modern Next.js application and added a functional content backend. The project now has:

- A redesigned public website
- A responsive devotional interface
- A searchable schedule
- Event detail pages with legacy URL support
- A working audio library
- A working YouTube video library
- Contact and registration forms
- Persistent backend data
- An administration panel
- Media upload schemas
- Database migrations and seed data
- SEO, accessibility, and performance foundations

The remaining work is primarily production infrastructure, final content verification, and deployment—not a restart of the redesign.
