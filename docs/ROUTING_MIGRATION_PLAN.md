# KKM Digital Platform — Routing Migration Plan

**Target library:** React Router 7  
**Source of truth for paths:** `lib/routes.ts` (`pathToPage` / `pageToPath`)  
**Current orchestration:** `App.tsx` (manual `history.pushState` + `popstate`)

---

## 1. Objectives

| Goal | Success criteria |
|------|------------------|
| Remove custom history management | No `pushState` / `popstate` navigation logic remains in `App.tsx` |
| Preserve public URLs | Every path currently handled by `pathToPage` continues to resolve |
| Preserve SEO behavior | Canonical URLs, titles, descriptions, and JSON-LD still emit correctly |
| Preserve lazy loading | Route modules remain code-split |
| Preserve UX | Back/forward, deep links, 404, search, news slugs, offline route work identically |
| Enable incremental migration | Existing `setPage(Page.X)` call sites keep working during transition |

---

## 2. Current Routing Model

### Source files
- `types.ts` — `Page` enum
- `lib/routes.ts` — path ↔ page mapping
- `App.tsx` — `currentPage` state, history sync, page switch rendering
- `components/Header.tsx` — navigates via `setPage(Page.X)`
- Mobile drawer / other CTAs — same `setPage` pattern

### Special cases already in production
1. News article deep links: `/news/:slug`
2. Search: `/search?q=...`
3. Legacy query fallback: `?page=...`
4. Offline route: `/offline`
5. 404 preserves unknown pathname
6. Alias paths (e.g. `/about-us` → AboutUs page)

---

## 3. Target Routing Model

```
main.tsx / entry
  └─ providers (Theme, Language, Auth, ...)
       └─ RouterProvider(router)
            └─ RootLayout  (Header + main/Outlet + Footer + utilities)
                 └─ route modules (lazy page components)
```

Compatibility layer:
- `useAppNavigate()` maps `Page` → canonical path via `pageToPath`
- Header can keep `setPage` prop temporarily; implementation becomes a thin navigate wrapper

---

## 4. Phased Plan

### Phase 0 — Preparation (0.5 day)

1. Install dependency:
   ```bash
   npm install react-router@7
   ```
2. Keep `lib/routes.ts` unchanged — it remains the path contract.
3. Add:
   - `hooks/useAppNavigate.ts`
   - `lib/router.tsx`
   - `components/RootLayout.tsx`
4. Do **not** switch the app entry yet.

**Exit criteria:** packages install cleanly; new files compile in isolation.

---

### Phase 1 — Declarative route table (1 day)

1. Build `routeObjects` from canonical paths in `pageToPath`.
2. Keep page components lazy-loaded.
3. Add alias routes as `<Navigate replace />` to canonical paths.
4. Add:
   - `news/:slug`
   - `search` (reads `q`)
   - `*` → NotFound

**Exit criteria:** route table covers every path currently handled by `pathToPage`.

---

### Phase 2 — Root layout + Outlet (1 day)

1. Move shell UI out of `App.tsx` into `RootLayout`:
   - Skip link
   - Header
   - `<main><Outlet /></main>`
   - Footer
   - BackToTop, CookieConsent, etc.
2. Keep temporary Header compatibility props:
   - `currentPage = pathToPage(location.pathname)`
   - `setPage = useAppNavigate()`
3. Move SEO derivation into a route-aware component that uses `useLocation` / `useParams`.

**Exit criteria:** layout renders with a single test route through `<Outlet />`.

---

### Phase 3 — Switch over + compatibility navigation (1 day)

1. Replace app root render path with:
   ```tsx
   <RouterProvider router={router} />
   ```
2. Remove `currentPage` state and both history `useEffect` blocks from the old App orchestration.
3. Keep `useAppNavigate()` so Header / drawers can continue calling `setPage(Page.X)`.
4. Search submit becomes:
   ```ts
   navigate(`/search?q=${encodeURIComponent(query)}`)
   ```

**Exit criteria:** app boots on React Router; header navigation works; deep links work.

---

### Phase 4 — Special cases (1–1.5 days)

| Case | Implementation |
|------|----------------|
| News article | `news/:slug` route; resolve article via `findArticleBySlug` |
| Search | `useSearchParams()` for `q` |
| Legacy `?page=` | one-time redirect using existing Page enum match logic |
| Offline | keep network listeners; optionally navigate to `/offline` |
| 404 | `path: '*'` renders NotFound; display attempted path from `useLocation()` |
| Internal portal | later wrap with auth-aware layout using `AuthContext` |

**Exit criteria:** all special cases parity-tested.

---

### Phase 5 — Cleanup and hardening (0.5–1 day)

1. Remove temporary `setPage` props once callers use `useAppNavigate` or `<Link>`.
2. Prefer `<NavLink>` in Header for active-state styling.
3. Update unit tests that asserted on `setCurrentPage`.
4. Verify:
   - direct deep links
   - browser back/forward
   - language/RTL does not break path
   - canonical URL + JSON-LD still correct
   - lazy chunk recovery still works
   - alias redirects resolve to canonical paths

**Exit criteria:** no custom history navigation remains; CI green.

---

## 5. File-level change map

| File | Action |
|------|--------|
| `package.json` | Add `react-router@7` |
| `lib/routes.ts` | Keep as path contract (no behavior change required) |
| `lib/router.tsx` | **New** — `createBrowserRouter` route table |
| `hooks/useAppNavigate.ts` | **New** — Page-enum navigation helper |
| `components/RootLayout.tsx` | **New** — shell with `<Outlet />` |
| `App.tsx` | Slim down to providers + `RouterProvider` (or rename role) |
| `components/Header.tsx` | Temporarily keep `setPage`; later switch to `Link` / `useAppNavigate` |
| `components/SEOHead.tsx` or `RouteSEO.tsx` | Read location/params instead of page prop where needed |
| tests | Update navigation assertions; add route resolution tests |

---

## 6. Risk controls

- **URL parity:** generate and verify routes against every branch in `pathToPage` / `pageToPath`
- **SEO parity:** keep `CANONICAL_HOST` and existing title/description/JSON-LD behavior in a route-aware SEO component
- **Chunk errors:** preserve current `PageErrorBoundary` behavior as route `errorElement` or layout boundary
- **Incremental rollout:** compatibility `setPage` wrapper avoids a single large Header rewrite
- **Rollback:** restore previous App state/effects if needed; route files are additive

---

## 7. Suggested execution window

| Phase | Effort |
|-------|--------|
| Phase 0 Preparation | 0.5 day |
| Phase 1 Route table | 1 day |
| Phase 2 Root layout | 1 day |
| Phase 3 Switch-over | 1 day |
| Phase 4 Special cases | 1–1.5 days |
| Phase 5 Cleanup / tests | 0.5–1 day |
| **Total** | **4–6 days** |

---

## 8. Implementation order for this sprint

1. Install `react-router@7`
2. Add `hooks/useAppNavigate.ts`
3. Add `components/RootLayout.tsx`
4. Add `lib/router.tsx` with full canonical + alias route table
5. Wire `RouterProvider` behind a feature flag or branch
6. Migrate Header search + primary nav
7. Migrate news slug + search params
8. Remove legacy history effects and `currentPage` state
