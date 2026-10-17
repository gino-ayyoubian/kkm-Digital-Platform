# KKM Digital Platform — Routing Migration Plan

**Target library:** React Router 7  
**Source of truth for paths:** `lib/routes.ts` (`pathToPage` / `pageToPath`)  
**Branch:** `feat/react-router-migration`

---

## Status (Phase 5 complete)

| Phase | Status |
|-------|--------|
| 0 Preparation | Done |
| 1 Declarative route table | Done |
| 2 Root layout + Outlet | Done |
| 3 RouterProvider switch-over | Done |
| 4 Special cases (news, search, 404, offline) | Done |
| 5 Cleanup / tests / SEO parity | Done |

**Live entry:** `index.tsx` → `App.router.tsx` → `RouterProvider`  
**Legacy rollback:** `App.tsx` retained; switch import in `index.tsx` back to `./App`

---

## 1. Objectives

| Goal | Success criteria |
|------|------------------|
| Remove custom history management | No `pushState` / `popstate` navigation in the live entry path |
| Preserve public URLs | Every path handled by `pathToPage` continues to resolve |
| Preserve SEO behavior | Canonical URLs, titles, descriptions, JSON-LD via `RouteSEO` |
| Preserve lazy loading | Route modules remain code-split |
| Preserve UX | Back/forward, deep links, 404, search, news slugs, offline |
| Incremental migration | `setPage` compatibility via `useAppNavigate` / `SetPageRoute` |

---

## 2. Architecture (current)

```
index.tsx
  └─ providers (Helmet, Theme, Language, Auth)
       └─ App.router.tsx
            └─ RouterProvider(router)
                 └─ RootLayout  (RouteSEO + Header + Outlet + Footer)
                      └─ lazy route modules
```

Key files:

| File | Role |
|------|------|
| `lib/routes.ts` | Path ↔ Page contract |
| `lib/router.tsx` | `createBrowserRouter` route table |
| `hooks/useAppNavigate.ts` | Page-enum navigation helper |
| `components/RootLayout.tsx` | Shell + Outlet |
| `components/RouteSEO.tsx` | Route-aware SEO + pageview tracking |
| `lib/withPageNav.tsx` | Optional HOCs for setPage / onSelectArticle |
| `App.router.tsx` | Live entry |
| `App.tsx` | Legacy entry (rollback only) |

---

## 3. Compatibility notes

- Header still receives `setPage` / `currentPage` from `RootLayout` (derived from the router).
- Pages that declare `setPage` in props receive it via `SetPageRoute` / `pageWithSetPage`.
- News, search, 404, and offline use dedicated route wrappers.
- Future hardening: migrate Header to `<NavLink>` and remove `setPage` props from pages.

---

## 4. Rollback

In `index.tsx`:

```ts
import App from './App'; // was './App.router'
```

No other file changes required. Legacy history logic in `App.tsx` remains intact.

---

## 5. Verification checklist

- [ ] `npm install` (pulls `react-router@7`)
- [ ] `npm run dev` — home, about, technology, projects load
- [ ] Deep link `/news/<slug>` resolves article SEO
- [ ] `/search?q=geothermal` runs search and is noindex
- [ ] Alias `/about-us` redirects to `/about`
- [ ] Unknown path shows 404 with setPage quick links
- [ ] Browser back/forward works
- [ ] Header navigation updates URL and content
- [ ] `npm test` — route helper tests pass
- [ ] Document title / canonical update per route

---

## 6. Follow-ups (optional, post-merge)

1. Replace Header `setPage` buttons with `<NavLink to={pageToPath(...)}>`.
2. Drop `setPage` from page component props; call `useAppNavigate` inside pages.
3. Delete or archive `App.tsx` after production soak.
4. Add route-level `errorElement` reusing `PageErrorBoundary` behavior.
5. Auth-aware layout wrapper for `/internal-portal`.
