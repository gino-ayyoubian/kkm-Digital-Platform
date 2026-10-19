# Production Tailwind CSS Pipeline & WCAG 2.2.2 Lottie Motion Control

Replace runtime `cdn.tailwindcss.com` with a native production `@tailwindcss/vite` build pipeline, and implement an accessible WCAG 2.2.2 (Level A) pause affordance with `prefers-reduced-motion` compliance for the `lottie-react` header animation.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The following decisions were confirmed through interactive clarification and are locked into this plan:

- **Confirmed Decision 1 (Lottie Pause Affordance)**: An accessible pause/play toggle button will be integrated directly in the header zone adjacent to the fluid animation, featuring explicit `aria-label`, `aria-pressed`, and localized bilingual tooltips (English & Persian).
- **Confirmed Decision 2 (Tailwind Integration)**: Tailwind CSS will be compiled at build time using the native `@tailwindcss/vite` Vite plugin paired with `index.css` (eliminating `cdn.tailwindcss.com` and inline config scripts).
- **Confirmed Decision 3 (Reduced Motion Support)**: The animation will query `(prefers-reduced-motion: reduce)` on mount. If the operating system or browser requests reduced motion, animation will initialize in the paused state while still providing manual toggle overrides.

---

### 1. Overview & Core Concept

- **What It Does**:
  1. **Production Tailwind Compilation**: Migrates the application from the runtime browser-interpreted Tailwind script (`cdn.tailwindcss.com`) to an ahead-of-time (AOT) Vite-bundled CSS stylesheet using `@tailwindcss/vite` and `@import "tailwindcss";` in `index.css`, with full KKM corporate theme tokens (`azureBlue`, `jetBlack`, `sunGold`, typography pairings, and dark mode support).
  2. **WCAG 2.2.2 Level A Compliance**: Equips the header's continuous fluid wave animation (`HeaderFluidAnimation` via `lottie-react`) with an accessible, interactive pause/play affordance, satisfying WCAG 2.2.2 ("Pause, Stop, Hide") for animations lasting over 5 seconds presented in parallel with page content.
- **Target Audience & Persona**: All visitors, screen-reader users, and enterprise stakeholders accessing the KKM International Group portal and public portal pages, with particular protection for users with vestibular sensitivities or cognitive focus needs.
- **Key Value**: 
  - Significant performance boost and zero CDN runtime overhead/CSP warnings.
  - Full WCAG 2.2 Level A accessibility compliance.

---

### 2. User Experience & Visual Design

- **Header Pause Affordance Location & States**:
  - Located cleanly within the top header bar (or pinned discreetly at the bottom edge of the banner where the fluid wave sits).
  - Normal State: A refined, semi-translucent pill button (`px-2.5 py-1 text-xs rounded-md bg-white/70 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 transition-all backdrop-blur-sm`).
  - Active/Paused State: Clearly shows a `Play` icon with text `"Resume motion"` / `"پخش انیمیشن"` and `aria-pressed="true"`.
  - Playing State: Shows a `Pause` icon with text `"Pause motion"` / `"توقف انیمیشن"` and `aria-pressed="false"`.
  - Accessible focus outline with `:focus-visible` ring adhering to WCAG contrast standards.
- **Tailwind Theme Token Preservation**:
  - All official KKM brand tokens (`kkm-azureBlue`, `kkm-jetBlack`, `kkm-babyBlue`, `kkm-pureWhite`, `kkm-sunGold`, `primary`, `secondary`, `accent-gold`) and fonts (`Montserrat`, `Vazirmatn`, `Poppins`) are declared directly in `@theme` inside `index.css`.
  - All existing classes used across the app continue working seamlessly without any visual regression.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Native `@tailwindcss/vite` Plugin over PostCSS or CLI**:
  - *Chosen Approach*: Configure `@tailwindcss/vite` inside `vite.config.ts` and import `index.css` directly into `index.tsx`.
  - *Why*: `@tailwindcss/vite` is already installed in `package.json` (`^4.3.3`), provides the fastest HMR and smallest production bundle size in Vite 6/8, and eliminates external PostCSS config overhead.
  - *Alternatives Considered*: PostCSS plugin or standalone CLI would add unnecessary configuration files and disjointed watch processes.
- **Decision 2: Lottie Playback Control via `lottieRef` & React State**:
  - *Chosen Approach*: Pass `lottieRef` to the `<Lottie />` component, exposing imperative `.pause()` and `.play()` methods synchronized with a persistent `isPaused` state.
  - *Why*: Direct control guarantees instantaneous zero-latency response without re-rendering or reloading animation JSON assets.
- **Decision 3: Respecting `prefers-reduced-motion`**:
  - *Chosen Approach*: On initial load, evaluate `window.matchMedia('(prefers-reduced-motion: reduce)')`. If matched, initialize `isPaused = true` and pause the Lottie instance immediately after mount.
  - *Why*: Fulfills WCAG Level AAA and Level A motion guidelines automatically while granting user full agency to resume if desired.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────┐
│                   Vite Build Pipeline                  │
│                                                        │
│  vite.config.ts ──> @tailwindcss/vite Plugin           │
│                            │                           │
│  index.css ───────> @import "tailwindcss" + @theme     │
│                            │                           │
│  index.tsx ───────> imports index.css (bundled CSS)    │
│                            │                           │
│  index.html ──────> Cleared of cdn.tailwindcss.com     │
└────────────────────────────┬───────────────────────────┘
                             │
                             ▼
┌────────────────────────────────────────────────────────┐
│                 Header & Lottie Flow                   │
│                                                        │
│   Header.tsx                                           │
│       │                                                │
│       ├──> HeaderFluidAnimation.tsx                    │
│       │         ├── Lottie player (lottieRef)          │
│       │         └── prefers-reduced-motion detection   │
│       │                                                │
│       └──> Motion Pause/Play Affordance Button         │
│                 ├── aria-label & aria-pressed          │
│                 ├── Pause / Play icon & bilingual text │
│                 └── Calls lottieRef.pause() / play()   │
└────────────────────────────────────────────────────────┘
```

#### Detailed Sub-tasks to Execute:
1. **Remove CDN Tailwind from `index.html`**:
   - Delete `https://cdn.tailwindcss.com?plugins=typography` script tag.
   - Delete `window.tailwindConfig` object and console warning filter scripts.
2. **Configure `@tailwindcss/vite` & CSS Theme**:
   - In `vite.config.ts`: import `tailwindcss from '@tailwindcss/vite'` and add `tailwindcss()` to `plugins`.
   - In `index.css`: expand `@theme` to include all KKM brand colors, fonts (`Montserrat`, `Vazirmatn`, `Poppins`), and typography utilities matching previous `window.tailwindConfig`.
   - In `index.tsx`: add `import './index.css';`.
3. **Upgrade `HeaderFluidAnimation.tsx` for WCAG 2.2.2 Compliance**:
   - Accept or expose `isPaused` state and `onTogglePause` handler, or self-contain the toggle with accessible controls.
   - Wire `lottieRef` from `lottie-react` to trigger `.pause()` and `.play()`.
   - Add a clean, accessible pause button (`<button type="button" aria-pressed={isPaused} ...>`) with bilingual English/Persian labels and tooltips.
   - Hook into `prefers-reduced-motion` media query listener for automatic adaptation.
4. **Build & Lint Verification**:
   - Run `compile_applet` and `lint_applet` to verify compilation, bundle generation, and zero regressions.
