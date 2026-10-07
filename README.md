# KKM International Group Digital Platform

The digital platform for **KKM International Group** presents the Group's engineering and technology work across energy, water, infrastructure, industrial systems, and digital innovation. It brings public-facing company information together with project and technology portfolios, news, sustainability content, evidence and claims registries, and inquiry workflows.

- **Official website:** [kkm-intl.org](https://kkm-intl.org) · [www.kkm-intl.org](https://www.kkm-intl.org)
- **Repository:** [gino-ayyoubian/kkm-Digital-Platform](https://github.com/gino-ayyoubian/kkm-Digital-Platform)

> This repository contains the platform's source code and developer documentation. Technical performance, project status, certification, and investment statements shown on the public site should be reviewed and supported by current, publishable evidence before release.

## Platform capabilities

- Corporate, technology, project, news, team, and contact pages
- Project inquiry, pilot request, investment, and partnership journeys
- Evidence and claims registries and sustainability dashboards
- Internal portal capabilities backed by corporate authentication
- Interactive maps and data visualizations
- English, Persian, Kurdish, Arabic, and Russian language support, including right-to-left layouts
- Progressive Web App (PWA) features and offline experience

## Technology and architecture

| Area | Technology | Role |
| --- | --- | --- |
| Web client | React 18, TypeScript, Vite | Component-based SPA, development server, and production bundling |
| UI | Tailwind CSS 4, Motion | Responsive styling and interface animation |
| Visualizations | D3.js, Recharts, `react-simple-maps` | Interactive charts and maps |
| Server and API | Node.js, Express 5 | Serves the web app and exposes API routes; the API also has a Vercel function entry point |
| Identity and data | Firebase Authentication, Cloud Firestore | Client identity and Firestore-backed features, subject to configured Firebase access rules |
| Integrations | Google Gemini API | Server-side analysis endpoint when configured |
| Observability | Sentry, Vercel Analytics | Optional error monitoring and analytics |
| Testing | Vitest, Testing Library, jsdom | Unit and component tests |

The main application and page routing live in `App.tsx`, with page components in `pages/` and reusable interface components in `components/`. `app.ts` assembles Express middleware, API routes, and the Vite development or production frontend. `server.ts` starts the Node server; `api/index.ts` adapts the API for Vercel. Firebase setup and rules are in `firebase.ts` and `firestore.rules`.

### Framework fit and recommendations

- **Keep React + Vite for the current platform.** The existing site is interaction-heavy, includes charts, maps, language switching, and PWA behavior, and already has a working client/server setup. Replacing it with another frontend framework would add migration and deployment complexity without a demonstrated need.
- **Use the existing React visualization stack for new impact dashboards.** Recharts suits standard charts, while D3 is available for bespoke visualizations. Favor the existing libraries over introducing another charting framework unless a concrete requirement is not met.
- **Consider Next.js only if public content needs server rendering.** If search indexing, per-request metadata, or server-rendered editorial pages become measurable requirements, prototype a content section before considering a broader migration. Account for the current Express API, Vercel routing, and PWA behavior in that evaluation.
- **Retain Express for the current API surface.** If the backend grows into a larger independently deployed service, evaluate a structured Node.js framework such as NestJS against concrete needs for module boundaries, API contracts, and operational separation. It is not a prerequisite for the current application.

## Get started

### Requirements

- Node.js 22.22.2 (the version pinned by the repository's CI workflow)
- npm

### Install and run locally

```bash
git clone https://github.com/gino-ayyoubian/kkm-Digital-Platform.git
cd kkm-Digital-Platform
npm ci --legacy-peer-deps
npm run dev
```

The Express development server starts on port `3000` by default and serves the Vite-powered app. The server does not load `.env` automatically: export any desired variables in your shell before running `npm run dev` (for example, `export GEMINI_API_KEY=...`), or configure them in your deployment environment. `.env.example` lists the available settings; the core development server can start without all third-party services being configured.

### Environment variables

See [`.env.example`](.env.example) for the current list. Keep credentials out of source control and deployment logs. Any `VITE_*` variable is compiled into client-side code and must not contain a secret.

| Variable | Runtime status | Purpose |
| --- | --- | --- |
| `GEMINI_API_KEY` | Read by server | Enables the Gemini analysis endpoint |
| `JWT_SECRET` | Read by server | Signs and verifies corporate-session tokens. The server currently has an embedded fallback; always set a strong, unique value in deployed environments. |
| `KKM_CORPORATE_AUTH_JSON` | Read by server | Corporate authentication configuration |
| `SENTRY_DSN` | Read by server | Optional backend error monitoring |
| `VITE_SENTRY_DSN`, `VITE_ANALYTICS_ID`, `VITE_GOOGLE_MAPS_API_KEY` | Listed as placeholders | These example variables are not currently read by the application; verify an integration is implemented before configuring them. |

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Express server with Vite development middleware |
| `npm run lint` | Run the TypeScript compiler without emitting files |
| `npm run test` | Run the Vitest test suite |
| `npm run build` | Build frontend assets and bundle the Node server to `dist/server.cjs` |
| `npm start` | Start the production Node server (run after building) |

## Deployment

### Vercel

The repository includes `vercel.json` with a Vite build, `dist` output, an `/api/*` rewrite to `api/index.ts`, and an SPA fallback. Import the repository into Vercel, configure the environment variables required by enabled features, and deploy. Do not treat client-visible `VITE_*` settings as secrets.

### Node.js host or container

Build with `npm run build`, then start with `NODE_ENV=production npm start`. The server listens on `PORT` when provided, or port `3000` otherwise. Configure the required server-side environment variables in the hosting platform. Review the host's request, timeout, and persistent-storage characteristics before selecting it for stateful API workloads.

## Quality checks

Run the same checks used by CI before proposing a change:

```bash
npm ci --legacy-peer-deps
npm run lint
npm run build
npm run test
```

## Contribution

Use focused branches and pull requests, explain user-facing changes, and include or update tests when behavior changes. Keep documentation, site claims, and implementation details aligned; verify technical and corporate statements with their owners before publishing them.

## Professional improvement opportunities

- Establish an editorial review and evidence-approval process for technical metrics, project milestones, and certification claims; show source, review date, and status consistently.
- Audit public forms and analytics for privacy disclosures, retention rules, and consent requirements, and keep those disclosures aligned with actual behavior.
- Expand automated coverage for authentication, Firestore access rules, language/RTL behavior, and high-value inquiry flows.
- Remove the embedded JWT signing-key fallback and fail closed when a deployment has not been given a secret.
- Keep `.env.example` synchronized with implemented integrations, clearly marking optional placeholders until they are wired into the application.
- Document environment-specific deployment and recovery procedures, including how secrets are provisioned and rotated.
- Track accessibility, performance, and search-indexing outcomes so future framework or infrastructure changes respond to measured needs.

## Links

- [Official website](https://kkm-intl.org)
- [Official website (`www`)](https://www.kkm-intl.org)
- [Repository](https://github.com/gino-ayyoubian/kkm-Digital-Platform)
- [Issue tracker](https://github.com/gino-ayyoubian/kkm-Digital-Platform/issues)


## Member images

See [docs/MEMBER_IMAGES.md](docs/MEMBER_IMAGES.md) for how to add or replace member photos.
