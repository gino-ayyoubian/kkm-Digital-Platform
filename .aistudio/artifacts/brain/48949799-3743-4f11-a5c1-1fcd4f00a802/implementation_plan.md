# KKM Corporate Governance, Directorate Hierarchy, Telephony Extensions & RACI Implementation (Updated Revision)

Comprehensive multi-page implementation plan for KKM International Group's institutional governance upgrade, separating Sovereign Governance from Executive Operations, establishing a strict **Dual-Language CEO Naming Standard** (strictly **Gino Ayyoubian** in English with no "Seyed" or "Markazi", and **سید ژینو ایوبیان مرکزی** in Persian), enforcing a **Strict Honorific-Free Policy** (completely eliminating "Dr.", "Eng.", "Prof.", "دکتر", "مهندس", "پروفسور" across the entire platform), **completely removing Ali Rezaei and Maryam Bahrami from all organizational sections and records**, realigning the **Corporate PBX Extensions & IVR Telephony Gateway**, integrating Seyed Jassem Hosseini as Head of HSE & Environment, establishing open executive roles in Careers for the 7 complementary functions, permanently coupling member photographs to their verified identities, and embedding interactive Directorate Trees and RACI Matrices across About Us, Team, Corporate Info, and the Internal Portal.

### User Review & Critical Decisions

> [!IMPORTANT]
> The architectural plan has been revised to incorporate the user's explicit directive on CEO naming, personnel deletions, telephony extensions, and honorific-free names:

- **CEO Naming Standardization (English vs Persian)**:
  - In **English**: The prefix "Seyed" and suffix "Markazi" are completely removed; the official display name is strictly **Gino Ayyoubian**.
  - In **Persian**: The complete official legal name is preserved as **سید ژینو ایوبیان مرکزی**.
  - In UI logic and data models:
    ```typescript
    displayName: "Gino Ayyoubian",
    displayNameFa: "سید ژینو ایوبیان مرکزی",
    ```
- **Complete & Seamless Removal of Ali Rezaei and Maryam Bahrami**:
  - Ali Rezaei and Maryam Bahrami are completely excluded from the organization.
  - They are removed across all codebases and views: `data/orgMembers.ts`, `pages/TeamPage.tsx`, `components/about/D3OrganizationalTree.tsx`, `components/ivr/IvrCommunicationsConsole.tsx`, `pages/DivisionsPage.tsx`, and all internal cartables/records.
  - They are no longer listed as members, specialists, or personnel anywhere in the application.
- **Strict Universal Ban on Honorific Titles ("No Academic/Honorific Prefixes")**:
  - In **no place** anywhere in the application will titles such as "Doctor" (Dr. / دکتر), "Engineer" (Eng. / مهندس), "Professor" (Prof. / پروفسور), or any equivalent prefix be attached to personal names.
  - All personnel must be identified purely by their authentic first and last names (e.g. **Gino Ayyoubian / سید ژینو ایوبیان مرکزی**, **Khosro Jarrahian / خسرو جراحیان**, **Reza Asakereh / رضا عساکره**, **Reza Baghdadchi / رضا بغدادچی**, **Pedram Abdarzadeh / پدرام آبدارزاده**, etc.).
  - A runtime sanitizer `getCleanDisplayName(name: string)` will act as a strict safeguard across all components.
- **Complete Re-alignment of Corporate Telephony Extensions (PBX & IVR Gateway)**:
  - Corporate telephone extension numbers (شماره‌های داخلی) and the multi-layer IVR dial tree will be reorganized to mirror the new directorate hierarchy:
    - **Ext 101**: Gino Ayyoubian / سید ژینو ایوبیان مرکزی (CEO & Chairman)
    - **Ext 102**: Khosro Jarrahian (CTO)
    - **Ext 103**: Heydar Yarveisi (COO)
    - **Ext 104**: Farid Imani (CFO)
    - **Ext 105**: Reza Baghdadchi (Head of Human Capital & Contracts)
    - **Ext 106**: Reza Asakereh (Head of AI & Cognitive Telemetry)
    - **Ext 107**: Ashkan Tofangchiha (Head of Open Innovation & Design Thinking)
    - **Ext 108**: Pedram Abdarzadeh (Head of Corporate Governance, Risk & Insurance)
    - **Ext 109 / *9111**: Seyed Jassem Hosseini (Head of HSE & Environmental Management)
    - **Ext 200**: Central Corporate Reception & 24/7 Dispatch
    - **Ext 204**: Masoumeh Moshar (Director of Communications & Stakeholders)
    - **Ext 205**: Hamed Zatajam (Director of IP HoldCo & Legal Affairs)
    - **Ext 208**: Sina Ayyoubian (Automation, Robotics & R&D Specialist)
    - **Ext 209**: Mostafa Sharifi (Head of Quality Assurance & Inspection QA/QC)
- **Universal Synchronization Across Pages**: The updated organizational chart, directorates, executive positions, extensions, and reporting lines will be synchronized across **About Us (`/about`)**, **Leadership Team (`/team`)**, **Corporate Info (`/corporate-info`)**, and the **Internal Portal (`/internal-portal`)**.
- **HSE Head - Seyed Jassem Hosseini (سید جاسم حسینی)**: Introduced as the verified executive for the newly established **HSE & Environmental Management** division, reporting directly to the **Audit, Risk & Compliance Committee** to oversee deep drilling hazards, H2S containment, and offshore infrastructure.
- **7 Open Complementary Positions in Careers (`/careers`)**: The remaining 7 complementary functions (Compliance/Sanctions, CISO, Financial Controller, PMO, Data Governance, Procurement/Supply Chain, ESG/Carbon) will be featured as active executive job openings in the Careers portal.
- **Strict Photo-to-Identity Coupling**: Every executive portrait is permanently bound to the individual's full name. When roles shift (e.g., Khosro Jarrahian as CTO, Farid Imani as CFO, Reza Asakereh leading AI & Data, Ashkan Tofangchiha leading Open Innovation, Pedram Abdarzadeh leading Governance & Risk under CFO, Reza Baghdadchi leading Human Capital), their photos follow them seamlessly.

---

### 1. Overview & Core Concept

- **What It Does**: Upgrades KKM International Group's corporate identity with a clean, egalitarian, verifiable institutional governance framework and an aligned cloud telephony system. Features an interactive Directorate Hierarchy Tree, a 10-Stage Lifecycle RACI Matrix, a 4-Tier Information Security Classification, synchronized PBX extensions, and clean personnel profiles across public and internal surfaces—with **Gino Ayyoubian** in English and **سید ژینو ایوبیان مرکزی** in Persian, Ali Rezaei and Maryam Bahrami completely removed, and all personal honorifics stripped for modern corporate purity.
- **Target Audience / Persona**: International consortium partners, sovereign wealth & green sukuk investors, free zone authorities, EPC contractors, corporate auditors, and internal project managers.
- **Key Value**: Enforces clear firewalls between Sovereign Governance and Executive Operations, satisfies international ISO/HSE/compliance standards, clarifies project decision rights (RACI), and maintains a clean, modern, unencumbered corporate naming and telephony presentation.

---

### 2. User Experience & Visual Design

#### Key User Flows & Page Synchronizations

1. **Leadership & Team Page (`/team`)**:
   - Executive cards display updated titles, directorates, and re-aligned extension call triggers (Gino Ayyoubian Ext 101, Khosro Jarrahian Ext 102, Heydar Yarveisi Ext 103, Farid Imani Ext 104, Reza Baghdadchi Ext 105, etc.) with pure names, zero honorific prefixes, and zero traces of deleted personnel.
   - Includes Seyed Jassem Hosseini as Head of HSE & Environment (Ext 109) with verified credentials.
   - An interactive tab allows switching between the **Executive Member Directory** and the **Interactive Governance & RACI Framework**.
2. **Corporate Telephony Console (`/internal-portal` & Telephony Hub)**:
   - Full IVR dial tree and PBX extension table synchronized with the new directorate numbers.
   - Emergency *9111 protocol linked directly to Seyed Jassem Hosseini (HSE).
3. **Corporate Info Page (`/corporate-info`)**:
   - Updated Executive Board & Leadership grid reflecting clean names, latest titles, and verified photos.
   - Embedded interactive Governance Framework section with downloadable governance dossier requests.
4. **About Us Page (`/about`)**:
   - Leadership preview cards updated to reflect the new structure with clean names.
   - Interactive organizational tree in the institutional section reflecting the Governance vs Execution separation.
5. **Careers Portal (`/careers`)**:
   - A dedicated **"Executive & Institutional Open Roles"** section featuring the 7 complementary functions with comprehensive job charters, qualifications, and direct application triggers.

#### Visual Identity & Theme

- **Aesthetic Direction**: Institutional corporate minimalism paired with engineering rigor. Clean hairline dividers, zero decorative clutter, high contrast, and balanced typography.
- **Naming Cleanliness**:
  - English: **Gino Ayyoubian** (strictly without "Seyed" or "Markazi").
  - Persian: **سید ژینو ایوبیان مرکزی**.
  - No "Dr." or "دکتر", no "Eng." or "مهندس", no "Prof." or "پروفسور".
  - Clean font styling: bold name, subtle role designation, and unboxed department labels.
- **Color Palette & Hierarchy**:
  - Dark Mode: Deep Slate Charcoal (`#090D16`) with subtle surface elevation (`#131B2E`).
  - Light Mode: Pure Alabaster White (`#FFFFFF`) with subtle stone borders (`#E2E8F0`).
  - Accents: KKM Primary Navy/Sky (`#0284C7`), Amber Gold (`#F59E0B`) for Audit/Risk Committees and HSE, Emerald (`#10B981`) for Level 1 Public / active status, and Ruby (`#EF4444`) for Level 4 Restricted IP.
- **Zero-Pill Discipline**:
  - RACI codes (`R`, `A`, `C`, `I`) rendered as crisp tabular cells with monospace figures and accessible tooltips.
  - Metadata separated by quiet typographic bullets (`·`).

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: CEO Dual-Language Naming Logic**:
  - *Chosen Approach*: Specifically configure the CEO record so `displayName: "Gino Ayyoubian"` in English and `displayNameFa: "سید ژینو ایوبیان مرکزی"` in Persian.
  - *Why*: Satisfies international Western branding norms for English audiences while preserving the full legal name in Persian corporate and gazette documents as requested by the user.
- **Decision 2: Full Eradication of Ali Rezaei and Maryam Bahrami**:
  - *Chosen Approach*: Fully remove both entries from `INITIAL_ORG_MEMBERS` in `orgMembers.ts`, remove all extension references from `IvrCommunicationsConsole.tsx`, remove nodes from `D3OrganizationalTree.tsx`, remove cards from `TeamPage.tsx`, and clean any leave/request references in portal data.
  - *Why*: Ensures complete fidelity to the user's explicit instruction that they are not members of the organization.
- **Decision 3: Global Honorific Sanitizer Helper (`getCleanDisplayName`)**:
  - *Chosen Approach*: Implement a shared utility function `getCleanDisplayName(name: string): string` that automatically strips any accidental leading titles (`/^(Dr\.|Eng\.|Mr\.|Ms\.|Mrs\.|Prof\.|دکتر|مهندس|پروفسور)\s+/i`) at render time as an extra safeguard, in addition to cleaning the raw database records in `orgMembers.ts` and `governanceData.ts`.
  - *Why*: Guarantees 100% adherence to the user's rule even if an imported third-party record or legacy string contains an honorific prefix.
- **Decision 4: Hierarchical 100-Series PBX Extension Numbering Scheme**:
  - *Chosen Approach*:
    - `101`: CEO / Chairman (Executive Office)
    - `102` - `104`: C-Level Directorates (CTO, COO, CFO)
    - `105` - `108`: Senior Department Heads (Human Capital, AI & Data, Open Innovation, Governance & Risk)
    - `109`: HSE & Environmental Management (linked with *9111 Emergency Command)
    - `200` - `209`: Operations, Technical Staff, and Specialized Support
  - *Why*: Provides an intuitive, structured telecommunications scheme matching the executive reporting hierarchy.
- **Decision 5: Centralized Governance Data Store (`src/data/governanceData.ts`)**:
  - *Chosen Approach*: Store all 8 complementary roles, directorates, RACI matrices, and security levels in a single typed file imported by `TeamPage`, `CorporateInfoPage`, `AboutUsPage`, and `CareersPage`.
  - *Why*: Eliminates duplicated copy and guarantees that updates to any position or reporting line propagate instantly across all pages.
- **Decision 6: Member Photo Integrity Mapping**:
  - *Chosen Approach*: Maintain a canonical `MEMBER_IDENTITY_MAP` linking each person's unique clean name directly to their verified photograph.
  - *Why*: Perfectly satisfies the requirement that each person's photo remains inseparable from their name, regardless of position realignment.

---

### 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       KKM GOVERNANCE & EXECUTION MODEL                      │
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
     ┌─────────────────────────────────┴─────────────────────────────────┐
     ▼                                                                   ▼
┌───────────────────────────────┐                       ┌───────────────────────────────┐
│     GOVERNANCE LAYER          │                       │       EXECUTIVE LAYER         │
│  (Board & Audit Committee)    │                       │  CEO: Gino Ayyoubian          │
└──────────────┬────────────────┘                       │  (سید ژینو ایوبیان مرکزی)     │
               │                                        └───────────────┬───────────────┘
   ┌───────────┴───────────┐                                            │
   ▼                       ▼                       ┌────────────────────┼────────────────────┐
┌─────────────────────┐ ┌─────────────────────┐    ▼                    ▼                    ▼
│ HSE & Environment   │ │ Compliance & Sanction│ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│ Seyed Jassem Hosseini│ │ (Open Role)        │ │ CTO           │ │ COO           │ │ CFO           │
│ Ext 109 / *9111     │ │                     │ │ Khosro Jarrah.│ │ Heydar Yarveisi│ │ Farid Imani   │
└─────────────────────┘ └─────────────────────┘ │ Ext 102       │ │ Ext 103       │ │ Ext 104       │
                                                └───────┬───────┘ └───────┬───────┘ └───────┬───────┘
                                                        │                 │                 │
                                                        ▼                 ▼                 ▼
                                                   AI / Inno /        Offshore /        Capital /
                                                   Data / CISO        Supply Chain      Risk / ESG
```

#### Detailed Personnel, Directorate & Telephony Mapping (Honorific-Free & Clean)

| Executive | Verified Name (EN / FA) | Official Role | Directorate / Reporting | Ext | Phone Number | Photo Asset |
| :--- | :--- | :--- | :--- | :---: | :--- | :--- |
| **Gino Ayyoubian** | سید ژینو ایوبیان مرکزی | Chief Executive Officer (CEO) & Chairman | Executive Leadership (Oversees IP, PMO, Strategy) | **101** | `+98 21 9103 0830` | `/images/gino-ayyoubian.jpg` |
| **Khosro Jarrahian** | خسرو جراحیان | Chief Technology Officer (CTO) | Technology Directorate (Oversees R&D, Nanomaterials, AI, Open Innovation, CISO) | **102** | `+98 21 9103 0831` | `/images/khosro-jarrahian.jpg` |
| **Heydar Yarveisi** | حیدر یارویسی | Chief Operating Officer (COO) | Operations & EPC Directorate (Offshore/Qeshm, Automation, Procurement) | **103** | `+98 21 9103 0832` | Executive Avatar / Monogram |
| **Farid Imani** | فرید ایمانی | Chief Financial Officer (CFO) | Finance & Capital Directorate (Transnational Investment, Controller, ESG, Governance/Risk) | **104** | `+98 21 9103 0833` | `/images/farid-imani.jpg` |
| **Reza Baghdadchi** | رضا بغدادچی | Head of Human Capital & Contract Authorization | Human Capital & Governance Directorate | **105** | `+98 21 9103 0834` | `/images/reza-baghdadchi.jpg` |
| **Reza Asakereh** | رضا عساکره | Head of AI & Cognitive Telemetry | Under CTO Directorate | **106** | `+98 21 9103 0835` | `/images/reza-asakereh.jpg` |
| **Ashkan Tofangchiha** | اشکان تفنگچی‌ها | Head of Open Innovation & Design Thinking | Under CTO Directorate | **107** | `+98 21 9103 0836` | `/images/ashkan-tofangchiha.jpg` |
| **Pedram Abdarzadeh** | پدرام آبدارزاده | Head of Corporate Governance, Risk & Insurance | Under CFO Directorate (with conflict of interest firewalls) | **108** | `+98 21 9103 0837` | `/images/pedram-abdarzadeh.jpg` |
| **Seyed Jassem Hosseini** | سید جاسم حسینی | Head of HSE & Environmental Management | Direct line to Audit, Risk & Compliance Committee | **109** | `+98 21 9103 0838` | Executive Portrait / Verified Badge |
| **Corporate Central Reception** | پذیرش و اپراتور مرکزی | 24/7 Corporate Operator & Dispatch | Administration | **200** | `+98 21 9103 0830` | Central PBX Gateway |
| **Masoumeh Moshar** | معصومه مشار | Director of Communications & Stakeholder Relations | Communications Directorate | **204** | `+98 21 9103 0845` | Executive Avatar / Verified Badge |
| **Hamed Zatajam** | حامد ذات‌عجم | Director of IP HoldCo & Legal Affairs | Reporting directly to CEO | **205** | `+98 21 9103 0846` | `/images/hamed-zatajam.jpg` |
| **Sina Ayyoubian** | سینا ایوبیان | R&D & Prototyping Specialist | Under COO / CTO Directorate | **208** | `+98 21 9103 0848` | `/images/sina-ayyoubian.jpg` |
| **Mostafa Sharifi** | مصطفی شریفی | Head of Quality Assurance & Inspection (QA/QC) | Independent Line (outside COO operations) | **209** | `+98 21 9103 0849` | `/images/mostafa-sharifi.jpg` |

*(Note: Ali Rezaei and Maryam Bahrami are completely excluded).*

#### 10-Stage Lifecycle RACI Matrix (Clean Names)

| Gate | Stage Title | CEO (Gino Ayyoubian) | CTO (Jarrahian) | COO (Yarveisi) | CFO (Imani) | IP/Legal (Zatajam) | QA/QC (Sharifi) | HR (Baghdadchi) |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **1** | Scientific Evidence | `I` | **`A / R`** | `I` | `I` | `C` | `I` | `C` |
| **2** | Technology Development | `I` | **`A / R`** | `C` | `I` | `C` | `C` | `C` |
| **3** | IP Registration & Protection | **`A`** | `C` | `I` | `C` | **`R`** | `I` | `I` |
| **4** | Industrial Prototype | `I` | **`A / R`** | `C` | `I` | `I` | `C` | `I` |
| **5** | Field Pilot Testing | `I` | `C` | **`A / R`** | `C` | `I` | `C` | `I` |
| **6** | Modular Product Commercialization | `I` | `C` | **`R`** | `I` | `I` | **`A`** | `I` |
| **7** | Integrated Mega-Project | `I` | `C` | **`A / R`** | `C` | `I` | `C` | `I` |
| **8** | Strategic Infrastructure Platform | **`A`** | `C` | `C` | **`R`** | `C` | `I` | `I` |
| **9** | National Scale Deployment | **`A`** | `C` | **`R`** | **`R`** | `C` | `I` | `C` |
| **10** | Internationalization & Cross-Border | **`A`** | `C` | `C` | **`R`** | `C` | `I` | `I` |

#### 4 Information Security Classification Tiers

1. **Level 1 (Public / عمومی)**: Published website data, audited proof, official whitepapers. Open to the public.
2. **Level 2 (Internal / داخلی)**: Administrative policies, routine correspondence, standard operational workflows. Accessible to all authenticated personnel.
3. **Level 3 (Confidential / محرمانه)**: GMEL-AI source code, nanofluid formulas, raw reservoir geophysics, financial ledgers. Restricted to CTO, department heads, and CISO.
4. **Level 4 (Restricted IP & Executive / به کلی سری)**: First-filing patent claims, core trade secrets, IP HoldCo ownership instruments, transnational SPV structures. Exclusively restricted to CEO (Gino Ayyoubian / سید ژینو ایوبیان مرکزی), Head of Legal/IP, and approved Risk Committee members.

#### Verification & Test Strategy

- Verify that all unit tests (`npm run test`) pass.
- Verify TypeScript compilation without errors (`tsc --noEmit`).
- Verify that English displays render strictly as `Gino Ayyoubian` and Persian displays render as `سید ژینو ایوبیان مرکزی`.
- Scan codebase to confirm zero occurrences of Ali Rezaei and Maryam Bahrami in active personnel lists.
- Scan codebase to confirm zero occurrences of "دکتر", "مهندس", "پروفسور", "Dr.", "Eng.", "Prof." preceding personal names.
- Validate telephony simulator and extension directory in `IvrCommunicationsConsole.tsx` to confirm correct routing to all new extension numbers.
- Validate responsive rendering across mobile, tablet, and desktop viewports.
