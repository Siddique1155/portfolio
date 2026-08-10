# Muhammad Siddique — Portfolio

A cinematic, WebGL-driven personal portfolio for an AI Automation Engineer & Digital Builder.
Plain HTML/CSS/JS (no build step) using CDN-hosted Three.js, GSAP and Lenis, plus a small
Node/Express backend for the contact form.

## What's real vs. placeholder

Every project, link and credential on this site was verified before being written down:

- **Nexa AI** — live at `nexa-automation-flow.lovable.app`, linked directly.
- **SIMS Kohat** (`simskohat.com`) — fetched and confirmed live; its footer credits
  "Developed by Muhammad Siddique."
- **Fujairah Car Recovery** (`fujairahcarrecovery.com`) — fetched and confirmed live; its
  footer credits "Designed, Developed & SEO Optimized by Muhammad Siddique."
- **Previous portfolio** (`siddique1155.github.io/portfolio`) — fetched and confirmed live,
  clearly labeled "Previous Portfolio" rather than presented as the current site.
- **AI Content Factory** and the **Nexa AI WhatsApp Assistant** — no public live link exists
  for either, so neither project shows a demo button. Their architecture descriptions come
  directly from what was provided, not invented.
- **LinkedIn / GitHub** — both pulled from the footer credit links on the live client sites
  above, so they're independently corroborated, not just asserted.

**Nothing invented**: no fake clients, testimonials, revenue, user counts, certifications, or
project results. Where a result isn't verified (e.g. Nexa AI's actual traffic), the project
card says so plainly instead of guessing a number.

**Profile photo**: `assets/images/profile.jpg` is the real uploaded photograph, used as-is —
no AI-generated face, no identity-altering edits, just a compressed copy for web performance.

## Project structure

```
siddique-portfolio/
├── index.html
├── css/style.css
├── js/
│   ├── icons.js               # inline SVG icons
│   ├── data.js                 # skills, projects, services, process, experience — all real
│   ├── main.js                  # loader, smooth scroll, nav, custom cursor, contact form
│   ├── three-hero.js             # hero: AI-agent core + orbiting channel nodes
│   ├── three-architecture.js      # dedicated 3D system-architecture scene
│   └── animations.js               # GSAP reveals, tilt, magnetic/ripple, section rendering
├── assets/
│   ├── images/profile.jpg      # real photo
│   ├── projects/*.svg          # one custom illustration per project (no stock images)
│   └── favicon.svg
├── backend/
│   ├── server.js                # Express API: /api/contact
│   ├── package.json
│   └── .env.example
├── robots.txt / sitemap.xml / site.webmanifest
└── README.md
```

## Running locally

### Frontend only
```bash
npx serve .
# or
python3 -m http.server 8080
```

### Frontend + backend (contact form working end to end)
```bash
cd backend
npm install
cp .env.example .env      # fill in SMTP_HOST/USER/PASS to actually send email
npm start                 # serves the API on :4100 AND the static site
```
Without SMTP configured, submissions are logged to the console instead of emailed — useful
for local testing. If frontend/backend run on different origins, set
`window.SIDDIQUE_API_BASE = 'https://your-api-host'` before `js/main.js` loads.

## Customizing content

Everything content-related lives in `js/data.js` — skills, projects, services, process
steps and experience all re-render from there. Update contact details by searching
`index.html` for `m.siddiq1137@gmail.com` and the WhatsApp/LinkedIn/GitHub URLs.

## Sections implemented

Nav · Hero (real photo + 3D automation ecosystem) · About (Problem→Automation→AI→
Integration→Result diagram) · Skills (interactive node groups) · Featured Automation
Ecosystem (hover-to-explore diagram) · Work (6 real projects, case-study modal) · 3D System
Architecture (dedicated Three.js scene) · Process (6-step animated timeline) · Services (10
cards) · Experience (timeline) · Contact (form + verified links) · Footer.

## Performance & accessibility

- All three Three.js scenes lazy-start via `IntersectionObserver` and pause off-screen.
- Particle counts scale down under 900px and drop entirely under 480px.
- `prefers-reduced-motion` disables Lenis, GSAP intro timelines, and the WebGL scenes.
- Custom cursor (with VIEW/OPEN state labels) is disabled on touch/coarse-pointer devices.
- Semantic HTML, visible focus states, alt text, and keyboard-operable case-study modal
  (Escape to close, focus-reachable close button).
- For a 90+ Lighthouse pass, consider self-hosting the CDN scripts (Three.js/GSAP/Lenis) to
  remove extra DNS lookups, and serving `profile.jpg` as WebP/AVIF with a `srcset`.

## Deployment

- **Frontend**: any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages).
- **Backend**: any Node host (Render, Railway, Fly.io, a small VPS) using the env vars in
  `backend/.env.example`. `server.js` also serves the static frontend if you want one process
  for both.
