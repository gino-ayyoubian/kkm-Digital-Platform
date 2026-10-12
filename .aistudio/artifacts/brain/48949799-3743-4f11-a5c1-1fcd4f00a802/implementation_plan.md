# Comprehensive Content Audit, Public-Internal Separation & Platform Architecture Plan

A comprehensive architectural blueprint and auditing methodology for evaluating all public and internal assets across the KKM International Group web platform, cleanly segregating public visitor presentations from sensitive organizational data, structuring the authenticated Internal Portal with Role-Based Access Control (RBAC), and consolidating overlapping platform sections into a unified corporate and technological presence.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> Based on your guidance in the clarification phase, the project is structured in two distinct, sequential phases:
> 1. **Phase A (Deep Audit & Mapping)**: A granular audit of every public page, section, claim, evidence record, and operational asset to identify internal vs. public classification.
> 2. **Phase B (Architecture, Consolidation & Access Enforcement)**: Migrating internal documents, raw engineering models, unverified claims, and sensitive organizational workflows behind the authenticated Internal Portal with RBAC, while streamlining public pages for investor and visitor clarity.

- **Confirmed Decision 1 (Scope of Separation)**: Internal engineering documentation, unverified claims (Levels C, D, E, F), internal financial/budget figures, operational cartable workflows, and employee records will be restricted behind the authenticated Internal Portal.
- **Confirmed Decision 2 (Access Governance)**: Role-Based Access Control (RBAC) with secure multi-tenant roles (`SuperAdmin`, `Admin`, `Director`, `DepartmentHead`, `Staff`, `Investor`) governing document permissions, cartable approvals, and database access.
- **Confirmed Decision 3 (Public Strategy)**: Public pages will present audited, verified executive summaries, high-level technology overviews, and compliance disclosures, with clear authentication gates prompting verified personnel to access deep engineering archives in the Internal Portal.

---

## 1. Comprehensive Platform Content & Data Audit

### A. Public Layer vs. Internal Organizational Layer Mapping

| Platform Dimension | Public Presentation Layer (Visitors & External Stakeholders) | Internal Organizational Layer (Authenticated Portal & Database) | Action Required |
| :--- | :--- | :--- | :--- |
| **Corporate Identity & Legal** | Official registration numbers (384054 / 10320351200), executive leadership bios, board structure, company vision, and contact channels. | Internal corporate resolutions, legal filings, tax dossier archives, internal executive extensions, and shareholder meeting minutes. | Move raw PDFs and internal legal notes to Portal DMS; keep formal certificates on public page. |
| **Core Technologies & GMEL** | High-level thermodynamic cycle descriptions, conceptual 3D diagrams, TRL milestones, interactive system stages, and patent summaries. | Proprietary downhole casing CAD blueprints, unreleased nanofluid chemical formulas (GMEL-TF-002 vault), and thermodynamic simulations. | Seal trade secrets and raw engineering dossiers behind Level A/B authenticated portal storage. |
| **Claims & Evidence Registry** | Formally verified claims (Level A & B: Official Gazette, published patents, provincial ratifications) and qualified ESG disclosures. | Internal test results (Level C), engineering model forecasts (Level D), development targets (Level E), and demonstration telemetry (Level F). | Public view displays verified claims only; internal portal unlocks full technical validation records. |
| **Projects & Field Assets** | High-level project scopes, locations, completed phases, public client acknowledgments (e.g. Qeshm Phase 1, Sarakhs pilot scope). | Detailed CAPEX/OPEX budgets, contractor bid documents, EPC procurement contracts, hydro-testing raw telemetry logs. | Consolidate project templates into unified showcase; move contractual files to Internal Project Cartable. |
| **Sustainability & ESG** | Public ESG strategy, verified carbon avoidance methodology, ISO readiness targets, and 12-month milestone progress chart. | Detailed GHG Scope 3 audit spreadsheets, supplier compliance questionnaires, internal EHS incident logs, and ISO audit findings. | Provide public dashboard visualization; house raw auditing workpapers in internal compliance archive. |
| **Operations & Communications** | General inquiry form, pilot demonstration request form, careers application portal, and press releases. | Internal automation cartable, executive desk, internal IVR phone routing console, employee attendance, and directory. | Restrict Cartable, DMS Explorer, and IVR Console strictly to authenticated corporate sessions. |

### B. Page-by-Page Audit & Reorganization Matrix

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 KKM UNIFIED APPLICATION ARCHITECTURE                                   │
└───────────────────────────────────┬────────────────────────────────────────────────────────────────────┘
                                    │
           ┌────────────────────────┴────────────────────────┐
           ▼                                                 ▼
┌──────────────────────────────────────┐  ┌──────────────────────────────────────┐
│        PUBLIC VISITOR SPHERE         │  │     AUTHENTICATED INTERNAL PORTAL    │
│  (Marketing, Tech Showcase & ESG)    │  │  (Data Storage, Cartable & RBAC)     │
├──────────────────────────────────────┤  ├──────────────────────────────────────┤
│ • Home Page (Core Hub)               │  │ • Electronic Desk & Cartable         │
│ • Core Technologies & GMEL Ecosystem │  │ • Document Management System (DMS)   │
│ • Projects & Global Presence         │  │ • Engineering Blueprint Vault        │
│ • Rural & Nomadic Development        │  │ • Claims & Audit Working Papers      │
│ • Verified Evidence & Disclosures    │  │ • Internal Personnel Directory       │
│ • ESG & Sustainability Dashboard     │  │ • Attendance & Operational Widgets   │
│ • Corporate Leadership & Team        │  │ • User Management & Access Matrix    │
│ • News, Insights & Downloads         │  │ • Role-Based Data Query Console      │
│ • Pilot Request & Contact            │  │ • IVR Internal Communications Console│
└──────────────────────────────────────┘  └──────────────────────────────────────┘
```

---

## 2. Structural Consolidation & Integration Plan

### A. Consolidation of Overlapping & Redundant Sections
1. **Technology & GMEL Pages Consolidation**:
   - *Current State*: `TechnologyTemplatePage`, `GMELHubPage`, `CoreTechnologiesPage`, and `DigitalTwinHubPage` have overlapping subsystem descriptions and duplicate diagrams.
   - *Plan*: Unify into a cohesive 3-tier technology hierarchy:
     1. High-Level Core Technology Domains (`CoreTechnologiesPage` with Geothermal, Water-Energy Nexus, Rural Microgrids).
     2. In-Depth Subsystem Deep Dive (`GMELHubPage` covering closed-loop extraction, nanofluids, ORC, and desalination).
     3. Physics & Predictive Analytics (`DigitalTwinHubPage` for simulation models).
2. **Projects & Developments Consolidation**:
   - *Current State*: `ProjectsPage`, `ProjectDevelopmentPage`, and `ProjectTemplatePage` have fragmented project data.
   - *Plan*: Unify all project portfolios under an enhanced `ProjectsPage` featuring an interactive modal (`ProjectDetailModal`) and filtering by operational stage, sector, and verified evidence dossiers.
3. **Evidence, Claims & Governance Integration**:
   - *Current State*: `ClaimRegistryPage`, `EvidenceRegistryPage`, and `SustainabilityImpact` display overlapping claim records.
   - *Plan*: Consolidate public presentation into `ESGDashboard` and `EvidenceRegistryPage` with a unified qualification badge system (P0-13 / P0-02), while routing all unverified engineering test data to the Internal Portal DMS.

---

## 3. Role-Based Access Control (RBAC) & Portal Architecture

### A. Role Hierarchy & Permission Matrix

```
┌──────────────────────┬──────────────────────┬──────────────────────┬──────────────────────┐
│ ROLE                 │ PUBLIC ACCESS        │ PORTAL OPERATIONAL   │ CLOUD DATA & ADMIN   │
├──────────────────────┼──────────────────────┼──────────────────────┼──────────────────────┤
│ SuperAdmin / CEO     │ Full Public Views    │ Full Cartable & DMS  │ Full Database & RBAC │
│ Engineering Director │ Full Public Views    │ Tech Vault, CAD, EVD │ Subsystem Telemetry  │
│ Project Lead / PM    │ Full Public Views    │ Project Cartable/DMS │ Field Site Audits    │
│ Corporate Staff      │ Full Public Views    │ Attendance, Desk, IVR│ Own Profile & Tasks  │
│ External Investor    │ Public + Data Room   │ Financial Executive  │ Read-only Deal-room  │
│ Public Visitor       │ Public Pages Only    │ Access Denied (Gate) │ None                 │
└──────────────────────┴──────────────────────┴──────────────────────┴──────────────────────┘
```

### B. Security & Authentication Architecture
- **Route Guard Middleware**: Enhance `App.tsx` and `AuthContext.tsx` to intercept any direct navigation or deep link to `Page.InternalPortal`, `Page.GoogleKeep`, or internal evidence documents.
- **Corporate Login Challenge**: Redirect unauthorized requests to a high-security corporate authentication challenge modal with email/password and Firebase SSO credentials.
- **Data Layer Isolation**: Partition Firebase Firestore collections into:
  - `public_metadata`: Public news, project highlights, verified claims, general brochures.
  - `internal_cartable`: Internal automation requests, task assignments, confidential engineering memos.
  - `internal_dms`: Structured document library with download access gated by role.
  - `user_profiles`: Employee accounts, titles, permissions, and department affiliations.

---

## 4. Phased Execution Roadmap

### Phase 1: Full Content Inventory & Classification Audit
- Inspect all 38 page routes and 50+ components.
- Tag every data point in `constants.ts`, `data/claimsRegistryData.ts`, `data/evidenceRegistry.ts`, and `data/orgMembers.ts` as either **Public** or **Internal**.
- Create a clean Public Disclosure Policy statement in `LegalPage` and `CorporateInfoPage`.

### Phase 2: Public Interface Streamlining & Consolidation
- Cleanse public pages of raw internal codes, unverified internal test figures, and internal company bureaucracy.
- Replace internal links on public pages with professional executive summaries and clear "Internal Portal Access Required" cues.
- Merge fragmented technology and project templates into the streamlined Core Technologies, GMEL Hub, and Projects showcases.

### Phase 3: Internal Portal Hardening & RBAC Enforcement
- Restructure `InternalPortalPage.tsx` into modular enterprise tabs:
  1. *Executive Cartable & Approvals*
  2. *Document Management System (DMS) & Technical Vault*
  3. *Internal Engineering Claims & Raw Telemetry*
  4. *Team Operations & Attendance Widget*
  5. *Corporate Governance & User RBAC Administration*
- Enforce strict route guards ensuring no unauthenticated visitor can view internal cartables or raw engineering documents.

### Phase 4: Database & State Integration
- Wire the Internal Portal to persistent Firestore collections for cartable requests and DMS files.
- Provide comprehensive Persian and English localization for all public and portal content.
- Verify end-to-end user journeys for both public visitors and authenticated corporate members.
