# KKM International Group

Welcome to the **KKM International Group** digital platform repository. This system is a high-performance, React 19 + Vite full-stack application leveraging Tailwind CSS, Framer Motion, and robust interactive data visualizations.

## Architecture & Overview

This application acts as a central hub for KKM International's core engineering technologies and global ecosystem insights. Key architectural patterns include:
- **Frontend Engine**: React 19 + Vite for optimal bundling and Hot Module Replacement (HMR).
- **Styling**: Tailwind CSS for responsive and modern UI capabilities.
- **Animations**: Framer Motion for layout transitions, map interactions, and dynamic SVG data bindings.
- **Data Visualization**: D3.js and Recharts mapping comprehensive ESG impact charts.
- **Backend & Full-stack setup**: Served through a custom Express `server.ts` setup configured to bundle as an independent container target (`server.cjs`).
- **Progressive Web App**: Offline-capable using `vite-plugin-pwa` strategies.

## Local Development & Project Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-org/kkm-international-group.git
   cd kkm-international-group
   ```

2. **Install Dependencies**:
   *(Note: This project relies on React 19 with some legacy peer dependencies from charting libraries)*
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Configure Environment Variables**:
   ```bash
   cp .env.example .env
   ```
   Add your respective keys to the `.env` file.

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```

5. **Build for Production**:
   ```bash
   npm run build
   ```

## Environment Variables

Refer to `.env.example` in the root directory.
* **VITE_* Variables**: Exposed to the client-side browser logic.
* **Server-side secrets** (e.g., `GEMINI_API_KEY`): Kept securely on the backend processes and injected into Express routes.

## Deployment & Infrastructure

The application supports both Dockerized container deployments (Google Cloud Run) and static site deployments (Vercel).

### Option A: Vercel (Recommended for Frontend SPA)

The repository contains a `vercel.json` file configuring the build environment.

1. Import the repository into your Vercel Dashboard.
2. The framework preset should automatically detect `Vite`.
3. Set the build command to `npm run build`.
4. Ensure the output directory is `dist`.
5. In the **Environment Variables** section of the Vercel project settings, supply all production variables defined in `.env.example`.

### Option B: Node Server (Cloud Run / App Engine)

1. Run `npm run build`. This generates `dist/server.cjs` and the static frontend assets.
2. Define the `start` command in a Dockerfile as: `npm run start` (which runs `node dist/server.cjs`).
3. Set port `3000` for your container networking ingress.

## Contribution Guidelines & Pull Request Governance

We enforce strict branch protection and continuous integration rules on the `main` branch.

1. **Feature Branches**: Never commit directly to `main`. Always branch off `main` (e.g., `feature/map-update`).
2. **Pull Requests**: Open a pull request against `main`. 
3. **CI Validation**: Your branch MUST pass the GitHub Actions CI pipeline:
   - TypeScript strict-mode verification (`npm run lint`)
   - Production Build validation (`npm run build`)
   - Unit & Integration Tests (`npm run test`)
4. **Peer Approval**: A minimum of *one (1)* peer review approval is required prior to merge.

*Please delete stale or abandoned branches after PR merging to maintain a clean git history.*
