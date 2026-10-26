# ApexFlow

**Global Anti-Scam Metrics & Opportunity Pipeline Network**  
Victor Kambale · 24/2018/BSSE-S · IUEA

## Start here: rebuild alone, in order

**Memory:** Setup → Helpers → Data → Parts → Pages → Shell → Router → Check.

This guide describes the actual project, not a different React template. All working code is in the files below; read a file at its numbered step, then follow its imports. The folder/repository can be named **apexflow-cw2-examen-iuea** without changing the ApexFlow brand or page URLs.

### 1. Get the same starting folder

For an exact independent rebuild, download/clone your own connected GitHub repository first. Work in a separate copy so you can compare your rebuilt files with the originals. Keep the existing template configuration; an empty generic React folder is **not** equivalent.

```sh
# Terminal, inside your downloaded project folder:
bun install
bun run dev
```

Install Bun from [bun.sh](https://bun.sh/docs/installation). Open the folder in [VS Code](https://code.visualstudio.com/). Bun installs the versions recorded in `package.json` / `bun.lock`; the terminal prints your local development address.

**First files to keep:** `package.json`, `bun.lock`, `vite.config.ts`, `tsconfig.json`, `bunfig.toml`, `src/start.ts`, `src/server.ts`. These are the starter infrastructure, not page content. Do not manually create `main.tsx`, `App.tsx` or `tailwind.config.js` for this project.

### 2. Keep this folder map

```text
apexflow-cw2-examen-iuea/
├── package.json + bun.lock        packages and locked versions
├── vite.config.ts + tsconfig.json setup and @/ import alias
├── public/                       favicon.ico, robots.txt
├── src/
│   ├── assets/                   gallery photos
│   ├── lib/                      utils.ts, site.ts, pipeline.ts, gallery.ts
│   ├── components/               Navbar, Footer, Preloader, Reveal,
│   │   └── ui/                   PipelineDashboard imports reusable UI here
│   ├── routes/                   __root, index, about, gallery, faq, contact
│   ├── integrations/supabase/    managed Cloud connection files
│   ├── test/                     logic and routing tests
│   ├── styles.css                theme + motion
│   ├── router.tsx                router + query context
│   ├── routeTree.gen.ts           automatically generated
│   ├── start.ts                  Start middleware
│   └── server.ts                 server entry
├── vitest.config.ts              test setup
└── README.md                     this guide
```

`PipelineDashboard.tsx` belongs directly in `components/`; `ui/` contains its reusable buttons, dialogs and inputs.

### 3. Create your application files in this exact order

Keep the starter running. Rebuild one layer at a time; never import a file before it exists. For the first checkpoint, leave the starter's root/index/router in place until their replacements are ready.

| Order | Create/read | Connects to / what to understand | Check before moving on |
| --- | --- | --- | --- |
| 1 | `src/lib/utils.ts` | `clsx` + `tailwind-merge` → `cn()` | Utility has no page imports. |
| 2 | `src/lib/site.ts` | Owner, student ID, social URLs → shared parts | Use your real links. |
| 3 | `src/styles.css` | Tailwind imports → tokens → utilities → keyframes | All `@import` rules stay first. |
| 4 | `src/assets/` | Add `ws1`, `ws2`, `hw1`, `hw2`, `db1`, `db2`, `people1`, `people2` as `.jpg` | Eight separate image files. |
| 5 | `src/lib/pipeline.ts` | Six sources → record → JSON payload → SHA-256 → filter | Read pure logic before the screen. |
| 6 | `src/lib/gallery.ts` | Photo imports → eight records → category filter | Each photo is used once. |
| 7 | `src/components/ui/` | Reusable Button/Input/Dialog etc. → utilities + Radix | Keep the provided UI sources and installed packages. |
| 8 | `src/components/Reveal.tsx` | Framer Motion → scroll entrance effects | A wrapper accepts `children`. |
| 9 | `Navbar.tsx`, `Footer.tsx`, `Preloader.tsx` in `src/components/` | `site.ts` + icons + route links | Build shared parts before the root imports them. |
| 10 | `src/components/PipelineDashboard.tsx` | `pipeline.ts` + reusable UI → controls | `state` holds records; `effect` runs/cleans timer; `ref` counts. |
| 11 | `src/routes/index.tsx` | Dashboard + pipeline sources + motion | Home URL is `/`. |
| 12 | `src/routes/about.tsx`, `gallery.tsx`, `faq.tsx`, `contact.tsx` | Existing URLs + their UI/data imports | Create each destination before linking to it. |
| 13 | `src/routes/__root.tsx` | CSS + shared parts + `<Outlet />` | Shared parts wrap the current page; keep `HeadContent` and `Scripts`. |
| 14 | `src/router.tsx` | Generated route tree + QueryClient → router | Context agrees with `__root.tsx`. |
| 15 | `src/test/` + `vitest.config.ts` | Logic tests + routing test + shared setup | Run `bun run test`. |
| 16 | `README.md` | Record setup, connections, limitations, deployment | Another person can follow your order. |

**Do not write `routeTree.gen.ts`.** The running TanStack plugin discovers files under `routes/` and regenerates it. **Do not rewrite generated Cloud files.** Keep the starter error-reporting helpers too: `start.ts`, `server.ts` and `__root.tsx` already import them.

### 4. Read any file with the same four questions

1. **Imports:** which package/file must exist first?
2. **Exports:** what can another file reuse?
3. **Logic:** where are data, state and events?
4. **Return:** which screen elements use that data?

Example: create `pipeline.ts` → export `filterFeeds` → import it in `PipelineDashboard` → render filtered rows → import dashboard in `index.tsx`. Go back to **pipeline** to change matching rules; go back to **dashboard** to change controls; go back to **styles** to change shared colors.

```ts
// @/ means src/ (configured in the project).
import { filterFeeds } from "@/lib/pipeline";
// Named export: braces. Default image export: no braces.
import photo from "@/assets/ws1.jpg";
```

**Dependency arrows point toward what a file uses.** Data does not import the screen; the screen imports data. Changing a source file updates its users automatically; you do not copy the same values into every page.

## Memorize: Shell → Page → Data → Check → View

1. **Shell:** loader, menu and footer surround every page.
2. **Page:** the URL selects the screen.
3. **Data:** six sample pipelines define the records.
4. **Check:** hash a payload, then compare digests.
5. **View:** display records and respond to controls.

## One file, one job

| File | Remember |
| --- | --- |
| `src/router.tsx` | Creates the TanStack router and query context. |
| `src/routes/__root.tsx` | Shared shell; `<Outlet />` mounts the current page. |
| `src/routes/index.tsx` | Dashboard introduction and pipeline view. |
| `src/components/Navbar.tsx` | `<ApexEngine/>`, navigation and social dropdown. |
| `src/components/Preloader.tsx` | Timed loading screen and student identity. |
| `src/components/PipelineDashboard.tsx` | Receive, pause, filter, inspect, refresh, test. |
| `src/lib/pipeline.ts` | Sources, metrics, SHA-256 and search logic. |
| `src/lib/gallery.ts` | Eight unique photo records and category filtering. |
| `src/components/Footer.tsx` | Identity, links, copyright and scrolling ticker. |
| `src/lib/site.ts` | Student details and social URLs. |
| `src/lib/utils.ts` | `cn()` merges conditional styling classes. |
| `src/styles.css` | Obsidian, gold, emerald tokens and animations. |
| `src/routes/{about,gallery,faq,contact}.tsx` | Existing Integrity, Network, FAQ and Contact pages. |
| `src/test/pipeline.test.ts` | Metric, filtering and integrity tests. |
| `src/test/app-routing.test.tsx` | Confirms `/` matches a page. |
| `src/test/gallery.test.ts` | Confirms eight unique sources and two photos per category. |

**Structure:** TanStack file routes replace `src/pages` and `App.tsx`; Tailwind v4 uses `src/styles.css`, not `tailwind.config.js`. Do not edit generated `src/routeTree.gen.ts`.

## Who connects to whom

```text
router.tsx ──► routeTree.gen.ts (auto) ──► routes/*.tsx
__root.tsx ──► Preloader + Navbar + <Outlet/> + Footer
Navbar, Footer, Preloader ──► lib/site.ts (name, ID, socials)
index.tsx ──► PipelineDashboard ──► lib/pipeline.ts (data, SHA-256, filter)
every component ──► styles.css tokens + lib/utils.ts cn()
pipeline.test.ts ──► lib/pipeline.ts
gallery route ──► lib/gallery.ts ──► eight assets/*.jpg
gallery.test.ts ──► lib/gallery.ts
```

## What was installed and why

| Package | Job |
| --- | --- |
| `@tanstack/react-start`, `@tanstack/react-router` | Pages, URLs, server rendering |
| `@tanstack/react-query` | Data cache in the router context |
| `tailwindcss` (v4) | Styling from `styles.css` tokens |
| `framer-motion` | Slide/fade/reveal animations (only package added by hand) |
| `lucide-react` | Icons |
| `@radix-ui/*` + `class-variance-authority` | Dialog, dropdown, accordion (shadcn UI) |
| `clsx` + `tailwind-merge` | `cn()` class merging |
| `@supabase/supabase-js` | Lovable Cloud client (generated, not used for data yet) |
| `vitest` | Tests |

Added by hand for the original visual work: `bun add framer-motion`. The current image/animation update needs **no additional package**. `bun install` already includes it in this repository; don't install it twice. Keep versions from this project's lockfile.

### New photos and motion: recreate these changes

1. Make/source eight different images → save them in `src/assets/` with the names in step 4. These current photos are **AI-generated illustrations**, not evidence of real students, offices or live government systems. Use your own/licensed photos for client work; you do not need AI to rebuild the layout.
2. Import them in `src/lib/gallery.ts` → one record per photo. Records hold `id`, `src`, `cat`, `title`, `alt`; categories each contain two photos.
3. In `src/routes/gallery.tsx`, call `filterGallery(cat)` → slice six per page → render figures → category buttons reset to page zero. Next/previous arrows change the slice, not the underlying photos.
4. `motion.figure` animates each gallery entry; `AnimatePresence` handles exits; `useReducedMotion()` removes entrance movement for people who prefer less motion.
5. In `src/routes/index.tsx`, the `entrance(delay)` helper is shared by the label, headline, sentence and actions. `initial` is the starting state; `animate` is the final state; `transition` sets duration/delay. Small staggered delays let the text arrive in order after the loader.
6. `src/styles.css` defines `beacon` for the shield icon and already defines the text shine/marquees. Its reduced-motion media query stops ongoing CSS animation. No animation plugin was added.
7. Run tests → visit `/gallery` → try all four categories → return to All → use Next → confirm the final two photos are different → revisit `/` and watch the three text lines.

**Change map:** photo → `assets`; title/category → `lib/gallery`; grid/controls → gallery route; intro delay → index route; global animation/theme → `styles.css`.

## Dashboard: six steps

1. After hydration, create six local sample records.
2. Serialize each record and hash it with SHA-256.
3. Compare the digest to the expected digest.
4. Receive six every five seconds; keep at most 36 records.
5. Pause stops the timer; refresh adds one record even while paused.
6. Filter by country and title/source/ID; inspect opens the digest and public source link.

Core idea, shortened:

```ts
const digest = await sha256(payload);
const passed = await validateDigest(payload, digest);
```

**Integrity ≠ authenticity.** Matching hashes show unchanged demo data, not a trustworthy sender. The spoof test changes the payload and demonstrates rejection. Metrics start at 45,000 requests, six pipelines, zero allowed spoofed injections and 100% demo verification; they are not measured production security results. Jobs and receipt times are simulated, not official vacancies or live APIs.

## Rebuild order

1. Start with a Lovable TanStack project; preserve its router bootstrap.
2. Define theme tokens in `styles.css` and identity in `site.ts`.
3. Build menu, loader and footer; place them around `<Outlet />`.
4. Define sources and hash/filter functions in `pipeline.ts`.
5. Build dashboard controls with `useState`, `useEffect` and `useRef`.
6. Mount the dashboard in `index.tsx`; retain existing page URLs.
7. Add page metadata; run tests and try dashboard controls.

Hooks shorthand: **state = screen; effect = timer; ref = counter**. Clean up timers on pause/unmount; never create clock-dependent records during server rendering.

## Lovable Cloud: where the connection comes from

- **Website:** [lovable.dev](https://lovable.dev/). Cloud is already enabled; no separate backend account is needed.
- **Creation:** enabling Cloud provisions a managed backend. Lovable automatically generates the project URL, publishable key and client configuration; the URL is not manually invented.
- **Inspect:** open **Cloud / View Backend** for backend features. In the Code editor, inspect `src/integrations/supabase/client.ts` to follow the generated connection.
- **Configuration:** the client reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`. These are generated variable names. `VITE_` means browser-visible configuration.
- **Safety:** publishable keys are browser-visible; access rules still protect data. Private credentials never belong in browser code or GitHub. Do not edit generated clients or commit `.env`.
- **Current boundary:** Cloud is connected, but the dashboard does not save records, sign users in or fetch official feeds. Simulation runs locally and resets on reload. Contact only validates locally; it does not deliver messages.

**Independent client projects:** a URL/key is issued by the backend provider when you create a project; it is not calculated in React. For this Lovable Cloud project, enabling Cloud created them automatically. Copy the generated public configuration from your own project into your hosting settings, then use the generated client; never invent a URL or put a private key in `VITE_` variables. Cloud setup is separate from Vercel hosting and Git code sync.

## Run locally

From your own cloned repository:

```sh
bun install
bun run dev
bun run test
```

Verify: six pipelines → pause → country/search → inspect → refresh → spoof rejection → resume. Try an empty search result too.

For your own local release, also run `bun run build`. Fix the **first error** before later errors: missing import → check file/name; missing route → create its file; blank nested page → check `<Outlet />`; image missing → check import and file extension. Keep per-page `head()` titles/descriptions when rebuilding.

## Vercel: avoid the white 404 page

The build targets Cloudflare by default, so Vercel can show `404 NOT_FOUND`. In Vercel:

1. **Add New → Project →** import this GitHub repo.
2. Framework preset: **Other**. Build command: `bun run build`. Install: `bun install`.
3. Environment Variables: the six names from `.env`, plus `NITRO_PRESET` = `vercel`.
4. Deploy, then open `/`, `/about`, `/faq`.

Simplest alternative: Lovable **Publish** (works with no setup).

## GitHub delivery

Your connected repository receives Lovable changes through automatic two-way sync; no manual push from this workspace is needed. Check **Project settings → Git** for sync status, then open the connected repository to confirm this README and latest changes. The assistant cannot inspect or confirm sync status. Local work must reach the synced branch to appear in Lovable.

## Learning links

- [Lovable Cloud](https://docs.lovable.dev/features/cloud): managed backend setup.
- [GitHub sync](https://docs.lovable.dev/integrations/github): repository connection and delivery.
- [React](https://react.dev/learn): components, state and effects.
- [TanStack Router](https://tanstack.com/router/latest/docs/framework/react/overview): routes and navigation.
- [Tailwind CSS](https://tailwindcss.com/docs): utilities and theme tokens.
- [MDN digest](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest): SHA-256 in the browser.

© 2026 Victor Kambale. Responsive Web Design · Coursework 2 · Examen Y2S1
