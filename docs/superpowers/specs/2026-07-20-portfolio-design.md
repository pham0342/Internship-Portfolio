# Portfolio Website Design

## Purpose

Personal portfolio site for Lam Viet Phat Pham (Ken), a Software Engineering (Honours) student at Flinders University seeking a 20-week industry placement. The site's primary audience is hiring teams evaluating him for placement roles. It must present his real projects, skills, and contact details clearly, with a modern, high-production-value 3D centerpiece that signals technical competence and design sense without becoming a gimmick.

## Success Criteria

- A hiring reviewer can, within 60 seconds of landing on the page, identify who Ken is, what he can do, and how to reach him or view his resume/GitHub.
- The 3D hero loads fast and works on both desktop and mobile without janky performance.
- All project cards link to real, working GitHub repos.
- Site is deployed and publicly reachable via a Vercel URL.

## Tech Stack

- **Framework**: React 18 + Vite + TypeScript
- **3D**: React Three Fiber (`@react-three/fiber`) + `@react-three/drei` for helpers (OrbitControls-free auto-rotate, `useGLTF`, `Environment` lighting, `Html` loading fallback)
- **Styling**: Tailwind CSS, dark/techy theme
- **Animation**: Framer Motion for scroll-reveal and UI micro-interactions
- **Routing**: None — single-page site navigated via in-page anchor links (`#projects`, `#contact`, etc.)
- **Deployment**: Vercel (static Vite build, zero-config)

## Site Structure (single page, scroll sections)

1. **Hero** — 3D isometric dev-desk model (monitor, keyboard, plant, coffee cup) rendered in a full-viewport R3F canvas, slow auto-rotation + subtle mouse-parallax tilt, soft studio lighting with contact shadow. Overlaid text: name, title ("Software Engineering (Honours) Student — Seeking 20-Week Placement"), location (Adelaide, SA), and two CTAs: "View Projects" (scrolls to Projects) and "Download Resume" (opens PDF).
2. **About** — Short bio adapted from the resume's Professional Summary paragraph.
3. **Skills** — Grouped chip/tag lists matching resume categories: Programming (Java, JavaScript, HTML5, CSS3), Backend & APIs (Node.js, Express.js, REST APIs, CRUD, async integration), Databases (SQLite, relational schema design, SQL, validation/reporting), Tools & Platforms (Git, GitHub, VS Code, GitHub Codespaces, Figma), Practices (responsive design, version control, requirements thinking, usability evaluation, team collaboration).
4. **Projects** — 4 featured cards, each with title, one-line pitch, tech tags, and a GitHub link:
   - **Anyphone-web-v2** — Responsive marketing site for a phone repair/accessories shop (React, Vite, Tailwind, Framer Motion).
   - **Job Tracker API & Dashboard** — Full-stack job-application tracker with REST API, SQLite schema, and a dashboard visualizing pipeline status (Node.js, Express, SQLite).
   - **Notify App** — Price-tracking and profit-estimation tool for cross-border supplement reselling, with automated exchange-rate updates and a scheduled alert job (Next.js, TypeScript, Supabase, Vercel Cron).
   - **Task Manager Web App** — Browser-based task manager with Pending/In Progress/Completed states, timestamps, and localStorage persistence (HTML, CSS, JavaScript).

   Note: the Anthropic Cybersecurity Skills repo was considered but dropped — its git remote points to a third party's GitHub account (`mukul975`), meaning it is not Ken's original work and should not be presented as such.

   Note: `job-tracker`, `Anyphone-web-v2`, and `notify-app-main` are not yet publicly reachable on GitHub as of this spec (private, unpushed, or not yet a git repo). Ken is responsible for pushing and setting these public before the site launches; the site is built against their intended final URLs.
5. **Education & Training** — Bachelor of Software Engineering (Honours), Flinders University (expected 2028); Cisco Networking Academy coursework (Networking Fundamentals, Network Security).
6. **Contact** — Email (phamphat844@gmail.com), phone (+61 434 475 790), GitHub (github.com/pham0342), LinkedIn (linkedin.com/in/phạm-phát-b540ba386), and a resume PDF download button.

## Data Model

Project and skill data live in a typed data file (`src/data/projects.ts`, `src/data/skills.ts`) rather than being hardcoded inline in JSX, so content can be updated without touching layout components.

```ts
type Project = {
  name: string;
  pitch: string;
  tags: string[];
  githubUrl: string;
};
```

## 3D Hero Implementation

- Source a CC0 or CC-BY-licensed isometric dev-desk `.glb` model from Sketchfab or Poly Haven; store it under `public/models/` and credit the author in the site footer if the license requires attribution.
- Load via `useGLTF` inside a `<Canvas>` wrapped in `React.Suspense`, with an `Html` loading fallback (simple spinner/text) so the rest of the page is interactive before the model finishes loading.
- Auto-rotate slowly on an idle timer; on pointer move, tilt the model slightly toward the cursor (clamped range) for a parallax feel.
- Lighting: one soft directional light + an `Environment` preset (e.g. `"city"` or `"studio"`) for realistic reflections without manual light rigging.
- Canvas is lazy-loaded (`React.lazy`) so the 3D bundle doesn't block first paint of the text/CTAs above it.
- On low-end/mobile devices, cap pixel ratio (`dpr={[1, 1.5]}`) to protect frame rate; if `prefers-reduced-motion` is set, disable auto-rotate/parallax and show the model static.

## Resume Handling

The existing resume (`Intern Ship.docx`) is converted to PDF and placed in `public/resume.pdf`, linked from the Hero CTA and Contact section as a direct download — DOCX is not linked directly since it's not browser-viewable.

## Out of Scope

- Blog, CMS, or admin panel.
- Multi-page routing (all content is one scrollable page).
- Analytics/tracking integration.
- Anyphone-web (v1), To-Do-List-App, Tutorials-2025 are not featured as project cards (superseded or lower-signal for this audience) but remain on GitHub.

## Testing Plan

- Manual cross-browser check (Chrome, Firefox, Safari via BrowserStack or local if available) for 3D canvas rendering.
- Manual mobile check (responsive layout + touch scroll, no interaction reliance on the 3D model beyond auto-rotate).
- Lighthouse pass targeting reasonable performance score despite 3D asset (lazy-load strategy above); accept some cost for hero visual quality but avoid layout-shift or blocking load.
- No automated test suite planned for this iteration (marketing/portfolio site, not business-logic-heavy); can be added later if the site grows interactive features.
