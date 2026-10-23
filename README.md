# ApexFlow

**Global Anti-Scam Metrics & Opportunity Pipeline Network**  
Victor Kambale · 24/2018/BSSE-S · IUEA

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
| `src/components/Footer.tsx` | Identity, links, copyright and scrolling ticker. |
| `src/lib/site.ts` | Student details and social URLs. |
| `src/lib/utils.ts` | `cn()` merges conditional styling classes. |
| `src/styles.css` | Obsidian, gold, emerald tokens and animations. |
| `src/routes/{about,gallery,faq,contact}.tsx` | Existing Integrity, Network, FAQ and Contact pages. |
| `src/test/pipeline.test.ts` | Metric, filtering and integrity tests. |
| `src/test/app-routing.test.tsx` | Confirms `/` matches a page. |

**Structure:** TanStack file routes replace `src/pages` and `App.tsx`; Tailwind v4 uses `src/styles.css`, not `tailwind.config.js`. Do not edit generated `src/routeTree.gen.ts`.

## Who connects to whom

```text
router.tsx ──► routeTree.gen.ts (auto) ──► routes/*.tsx
__root.tsx ──► Preloader + Navbar + <Outlet/> + Footer
Navbar, Footer, Preloader ──► lib/site.ts (name, ID, socials)
index.tsx ──► PipelineDashboard ──► lib/pipeline.ts (data, SHA-256, filter)
every component ──► styles.css tokens + lib/utils.ts cn()
pipeline.test.ts ──► lib/pipeline.ts
```

## What was installed and why

| Package | Job |
| --- | --- |
| `@tanstack/react-start`, `react-router` | Pages, URLs, server rendering |
| `@tanstack/react-query` | Data cache in the router context |
| `tailwindcss` (v4) | Styling from `styles.css` tokens |
| `framer-motion` | Slide/fade/reveal animations (only package added by hand) |
| `lucide-react` | Icons |
| `@radix-ui/*` + `class-variance-authority` | Dialog, dropdown, accordion (shadcn UI) |
| `clsx` + `tailwind-merge` | `cn()` class merging |
| `@supabase/supabase-js` | Lovable Cloud client (generated, not used for data yet) |
| `vitest` | Tests |

Added by hand: `bun add framer-motion`. Everything else came with the template.

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

## Run locally

From your own cloned repository:

```sh
bun install
bun run dev
bun run test
```

Verify: six pipelines → pause → country/search → inspect → refresh → spoof rejection → resume. Try an empty search result too.

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
