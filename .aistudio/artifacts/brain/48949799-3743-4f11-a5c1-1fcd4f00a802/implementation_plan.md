# 3D Spatial Cyber-Industrial Redesign & Floating Holographic Navigation

Transform the KKM International Group digital platform into a cutting-edge, cyber-industrial experience. This overhaul pairs a high-performance procedural Three.js 3D Digital Twin of the GMEL Closed-Loop Geothermal Power Island with a floating holographic glass header, 3D spatial depth tilt, and an ergonomic cinema-mode control dock.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The architectural direction and key features have been aligned with your confirmed choices:

- **Confirmed Aesthetic**: **Cyber-Industrial and Holographic Geothermal** — Deep obsidian and navy canvases (`#020b18` / `#0B132B`), luminescent cyan telemetry traces (`#00F0FF` / `#0A92EF`), brushed titanium structural framing (`#334155`), and warm kinetic gold power accents (`#FFC107`).
- **Confirmed Hero 3D Subject**: **Interactive 3D Digital Twin of GMEL Closed-Loop Geothermal & Power Island** — A procedural, 3-to-12 part composite engineering model featuring subterranean deep wells, thermal fluid loops with directional particles, heat exchanger banks, turbine generator islands, and cooling towers.
- **Confirmed Navigation Architecture**: **Floating Holographic Glass Header with 3D Depth Tilt** — A 3-zone, single-row floating bar featuring cursor/gyro-based spatial parallax, refractive edge highlights, and an interactive spatial mega-menu.

---

### 1. Overview & Core Concept

- **What It Does**: Integrates an interactive 3D WebGL viewport powered by Three.js directly into the hero experience and Digital Twin hubs. Visitors can inspect the subsurface geothermal closed loops, rotate around the surface power generation island, toggle cross-section/exploded layers, and navigate the entire corporate ecosystem via a spatial holographic glass header.
- **Target Audience / Persona**: Global institutional investors, ministry partners, EPC contractors, and clean-tech evaluators who expect industrial credibility, technical precision, and modern interface design.
- **Key Value**: Replaces flat 2D representations with physical depth, real-time kinetic energy simulations, and spatial navigation, establishing KKM as a frontier leader in geothermal engineering and infrastructure.

---

### 2. User Experience & Visual Design

#### Key User Flows

1. **Hero Viewport & First Impression**:
   - The user arrives at the homepage or digital twin hub.
   - The central viewport loads a 60fps Three.js GMEL Power Island with directional geothermal fluid particles coursing through transparent subterranean tubes.
   - Ambient studio lighting (cool hemisphere fill + warm directional key light + procedural reflections) illuminates the metallic and glass components.
2. **Exploration & Spatial Interaction**:
   - Users can orbit, pan, and zoom smoothly using exponentially damped controls.
   - A minimalist, collapsible bottom dock (Cinema Mode) provides interactive toggles: **Subterranean Cross-Section**, **Thermal Heat Exchanger Flow**, **Exploded Architecture**, and **Power Output Metrics**.
   - Hovering over components (e.g., *Downhole Heat Exchanger*, *Organic Rankine Cycle Turbine*, *Subsea Cooling Loop*) reveals technical telemetry badges in the DOM without covering the 3D subject.
3. **Floating Holographic Navigation**:
   - The header floats with a subtle 3D tilt responding to cursor movement (`perspective: 1000px`).
   - Clicking category links opens a spatial glass mega-menu with backdrop refraction, clean typographic columns, and direct pathways to Innovation Hub, Evidence Registry, Partner Data Room, and Digital Twins.

#### Visual Identity & Theme

- **Aesthetic Direction**: Cyber-Industrial, precision engineering, holographic spatial depth.
- **Color Palette & Mood**:
  - Dominant Canvas (60%): Deep Space Obsidian (`#020b14`), Midnight Slate (`#0B132B`), and crisp high-contrast dark panels.
  - Structural Surfaces (30%): Frosted glass (`rgba(15, 23, 42, 0.75)`), brushed steel dividers (`rgba(255, 255, 255, 0.08)`), and hairline cyan borders (`rgba(0, 240, 255, 0.25)`).
  - Accent Budget (10%): Electric Cyan (`#00F0FF`), KKM Deep Marine Blue (`#0A92EF`), and Thermal Amber/Gold (`#FFC107`).
- **Typography & Hierarchy**:
  - Display & Headlines: `Plus Jakarta Sans` / `Montserrat` (bold, geometric, clean tracking).
  - Body & Content: `Vazirmatn` (Persian) / `Plus Jakarta Sans` (English), 15–16px, balanced line length.
  - Telemetry & Metrics: Monospace with tabular numerals (`JetBrains Mono` / `font-mono tabular-nums`).
- **Component Styling & Layout**:
  - Strict compliance with anti-slop rules: zero static pill badge sandwiches, no fake `// 01` code comments, no arbitrary glowing pulse dots on static elements.
  - Clean hairline borders, nested border radius math ($r_{\text{inner}} = r_{\text{outer}} - \text{padding}$), and high-contrast WCAG AA readability.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Procedural Three.js Geometry vs Heavy External 3D Models (`.glb` / `.obj`)**:
  - *Chosen Approach*: 100% procedural Three.js construction using composite `THREE.Group` meshes (lathe, tube, bevel extrusions, and instanced particle loops) and procedural canvas bump maps.
  - *Why*: Zero 404 risk, instant load times (<50ms vs 20MB file downloads), zero network latency, and perfect GPU-to-software WebGL fallback.
- **Decision 2: Viewport-First Collapsible Bottom Dock (Zero Center Occlusion)**:
  - *Chosen Approach*: All 3D controls (depth slider, exploded view, fluid speed, wireframe toggle) are consolidated into a compact bottom dock that can be collapsed into a sleek mini-bar or expanded for deep dive.
  - *Why*: Prevents side panels from obscuring the central 3D model, ensuring unobstructed visual inspection on all viewports.
- **Decision 3: Floating Holographic Glass Header with 3D Depth Tilt**:
  - *Chosen Approach*: Lightweight CSS 3D transform + pointer tracking (`rotateX` / `rotateY` clamped to $\pm 6^\circ$) on the outer navigation shell with backdrop-filter glassmorphism and solid fallback.
  - *Why*: Delivers an unmistakable futuristic feel while maintaining strict keyboard accessibility, single-line labels, and zero layout shift.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        KKM Web Application Shell                       │
├────────────────────────────────────────────────────────────────────────┤
│  [ Floating Holographic Header ] ◄── Pointer Gyro Parallax (±6°)       │
│  ├── Brand Wordmark & Animated Fluid Signature                         │
│  ├── 3-Zone Desktop Navigation with Spatial Mega-Menu                   │
│  └── Language Switcher & Partner Portal Direct Launch                  │
├────────────────────────────────────────────────────────────────────────┤
│  [ Hero / Digital Twin 3D Viewport: Three.js WebGL Engine ]            │
│  ├── Perspective Camera + OrbitControls (Exponential Damping)         │
│  ├── Studio Lighting Rig (Key Warm + Fill Cool + RoomEnvironment)     │
│  ├── Procedural GMEL 3D Model:                                        │
│  │   ├── Subsurface Geothermal Well (Lathe + Tube Geometries)         │
│  │   ├── Kinetic Supercritical Fluid Particles (InstancedMesh)        │
│  │   ├── Surface Heat Exchanger & Turbine Island (Beveled Groups)     │
│  │   └── Atmospheric Fog & Depth Falloff                              │
│  └── Viewport Overlay: Semantic DOM Headings & Key Metrics             │
├────────────────────────────────────────────────────────────────────────┤
│  [ Collapsible Bottom Control Dock ] (Pinned Bottom Center)            │
│  ├── Layer Toggles (Subsurface / Fluid Loop / Surface Island)          │
│  ├── Exploded View & Rotation Speed Sliders                           │
│  └── Camera Angle Presets (Isometric, Top-Down, Subsurface Deep Well) │
└────────────────────────────────────────────────────────────────────────┘
```

#### Core Components to Build & Modernize

1. **`components/three/GMELPowerIsland3D.tsx`**:
   - The core procedural Three.js 3D scene module.
   - Implements `RoomEnvironment` PMREM reflection, studio lighting, exponential damping, and animated particle fluid circulation.
   - Includes graceful software WebGL fallback (`isSoftwareGl`) for headless and low-power devices.
2. **`components/three/ThreeControlDock.tsx`**:
   - Sleek bottom dock with collapse/expand toggle, exploded-view slider, fluid speed controller, and layer filters.
3. **`components/HolographicHeader.tsx`**:
   - Overhauled header component implementing 3D depth-tilt transforms, multi-column mega-menu with KKM innovation domains, and full RTL/LTR responsiveness.
4. **`pages/DigitalTwinHubPage.tsx` & `pages/HomePage.tsx` Integration**:
   - Mounts the 3D scene in the hero section and digital twin explorer with smooth responsive resizing.

---

### 5. Verification & Testing Strategy

- **Compilation**: Run `compile_applet` and `lint_applet` to verify zero TypeScript errors or missing imports.
- **Unit & Integration Tests**: Run `npm test` across all 16 Vitest test suites (48+ tests) to guarantee zero regressions in navigation, telephony privacy, and innovation triage.
- **Rendering & FPS Check**: Verify 60fps smooth loop on hardware GPU and automatic throttling on software WebGL.
- **Responsive & RTL Verification**: Test across mobile, tablet, and 1440px desktop viewports in both Persian (RTL) and English (LTR).
