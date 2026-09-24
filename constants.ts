
import { Page } from './types';
import type { Project, NavLink, NewsItem, Video, JobOpening, Innovation } from './types';

export const RECENT_INNOVATIONS: Innovation[] = [
    {
        id: 'tech-res-01',
        title: 'Innovation_1_Title',
        description: 'Innovation_1_Desc',
        image: 'https://picsum.photos/seed/gmel-closed-loop/600/400',
        impact: '92–108 W/m thermal extraction verified in non-permeable dry formations (TRL-6).',
        date: '2026-06-12',
        technology: 'GMEL-CLG Downhole Closed-Loop Subsurface Circuit',
        problem: 'Conventional Enhanced Geothermal Systems (EGS) face severe risks of induced seismicity, working fluid loss, and mineral scaling.',
        solution: 'Hermetically sealed coaxial deep borehole heat exchangers circulating supercritical working fluids without formation fluid extraction.',
        developmentStage: 'TRL-6 (High-Temperature Surface Loop Rig Tested)',
        evidence: 'Level C (EVD-TECH-GMEL-2025-01 / Lab & Rig Simulation Acceptance Dossier)',
        performance: 'Empirical heat harvest rate of 92–108 W/m under 160°C dry rock boundary conditions.',
        ip: 'Patent Application Under Examination (Ref: GMEL-CLG-001 / WIPO PCT Pending)',
        applications: ['Baseload Clean Electricity', 'District Heating Networks', 'Industrial Desalination', 'High-Yield Greenhouses'],
        nextMilestone: 'Field commercial pilot test well completion (Target Q2 2027).'
    },
    {
        id: 'tech-res-02',
        title: 'Innovation_2_Title',
        description: 'Innovation_2_Desc',
        image: 'https://picsum.photos/seed/digital-twin-reservoir/600/400',
        impact: 'Physics-informed neural networks computing thermal decay in <50ms (<3.2% RMSE).',
        date: '2026-04-18',
        technology: 'KKM-GeoTwin PINN Hybrid Subsurface Simulation Engine',
        problem: 'Real-time reservoir management is constrained by multi-hour numerical CFD solver latencies during dynamic grid feed-in adjustments.',
        solution: 'Physics-Informed Neural Networks (PINN) embedding Navier-Stokes & enthalpy conservation equations directly into loss functions.',
        developmentStage: 'TRL-5 (Validated against 10-year historical basin production telemetry)',
        evidence: 'Level B (EVD-PRJ-SARAKHS-2023 / Verified Simulation Audit & Field Telemetry)',
        performance: 'Sub-50ms inference latency maintaining <3.2% root-mean-square error against finite element benchmarks.',
        ip: 'Proprietary Trade Secret & Algorithmic Copyright (KKM-DT-PINN-2024)',
        applications: ['Geothermal Wellfields', 'Underground Gas Storage', 'Regional Groundwater Basins', 'CO2 Sequestration Monitoring'],
        nextMilestone: 'Automated SCADA closed-loop actuation in active production fields (Target Q1 2027).'
    },
    {
        id: 'tech-res-03',
        title: 'Innovation_3_Title',
        description: 'Innovation_3_Desc',
        image: 'https://picsum.photos/seed/desal-nexus/600/400',
        impact: 'Specific energy consumption lowered to 2.1 kWh/m³ via low-grade geothermal brine heat integration.',
        date: '2026-03-05',
        technology: 'Modular Low-Temperature Geothermal Desalination & ZLD Nexus',
        problem: 'High electricity consumption and acute toxic brine discharge undermine freshwater production in arid coastal and rural zones.',
        solution: 'Multi-stage vacuum distillation integrated with low-grade geothermal exhaust heat and zero-liquid discharge crystallization.',
        developmentStage: 'TRL-6 (Operational Skid-Mounted Industrial Prototype)',
        evidence: 'Level C (EVD-TECH-DESAL-2024 / Certified Water Quality & Energy Balance)',
        performance: '2.1 kWh/m³ electrical equivalent energy draw; potable output compliant with WHO drinking standards.',
        ip: 'Utility Model & Industrial Design Patent Filed (Ref: KKM-DESAL-PAT-2024)',
        applications: ['Off-Grid Rural Settlements', 'Nomadic Water Points', 'Agricultural Irrigation', 'Industrial Process Water'],
        nextMilestone: 'Modular 500 m³/day field deployment in Southern Coastal Province (Target Q3 2027).'
    }
];

export const NAV_LINKS: NavLink[] = [
  { name: Page.Home },
  { 
    name: Page.AboutUs, 
    subLinks: [
      { name: "Who We Are", id: "who-we-are" },
      { name: "Vision & Mission", id: "vision-mission" },
      { name: "Leadership", id: "leadership" },
      { name: "Organization", id: "organization" },
      { name: "Capabilities", id: "capabilities" },
      { name: "Corporate Information", id: "corporate-info", page: Page.CorporateInfo }
    ]
  },
  {
    name: Page.Technology,
    subLinks: [
      { name: "Energy", id: "energy" },
      { name: "Water", id: "water" },
      { name: "Infrastructure", id: "infrastructure" },
      { name: "Industrial Technology", id: "industrial" },
      { name: "AI & Digital", id: "ai-digital" },
      { name: "Agriculture & Food", id: "agriculture" },
      { name: "Materials", id: "materials" }
    ]
  },
  {
    name: Page.Ecosystems,
    subLinks: [
      { name: "GMEL", id: "gmel", page: Page.GMELHub },
      { name: "KKM-IEH", id: "kkm-ieh" },
      { name: "GILT", id: "gilt" },
      { name: "GNOVA", id: "gnova" },
      { name: "KKM Digitalization", id: "kkm-digitalization", page: Page.DigitalTwinHub }
    ]
  },
  {
    name: Page.Projects,
    subLinks: [
      { name: "Flagship Projects", id: "flagship" },
      { name: "Pilots", id: "pilots" },
      { name: "Project Pipeline", id: "pipeline" },
      { name: "Case Studies", id: "case-studies" }
    ]
  },
  {
    name: Page.RuralStudies,
    subLinks: [
      { name: "Integrated Rural Model", id: "integrated-model", page: Page.RuralStudies },
      { name: "Rural Energy & Water", id: "rural-energy-water", page: Page.RuralStudies },
      { name: "Agriculture & Processing", id: "rural-agriculture", page: Page.RuralStudies },
      { name: "Regional Pilot Request", id: "pilot-request", page: Page.PilotRequest },
      { name: "Exhibition 1405 Dossier", id: "exhibition-1405", page: Page.Exhibition }
    ]
  },
  {
    name: Page.InnovationHub,
    subLinks: [
      { name: "Evidence Registry", id: "evidence-registry", page: Page.EvidenceRegistry },
      { name: "IP & Patent Center", id: "patents", page: Page.IPCenter },
      { name: "Technology Portfolio", id: "tech-portfolio", page: Page.CoreTechnologies },
      { name: "R&D Programs", id: "rnd", page: Page.InnovationHub },
      { name: "Commercialization", id: "commercialization", page: Page.InnovationHub }
    ]
  },
  {
    name: Page.Sustainability,
    subLinks: [
      { name: "ESG Performance & Audit", id: "esg-dashboard", page: Page.Sustainability },
      { name: "Production Truth Layer", id: "production-truth", page: Page.EvidenceRegistry },
      { name: "Carbon Credits & Quotas", id: "carbon-credit", page: Page.CarbonCredit }
    ]
  },
  {
    name: Page.Invest,
    subLinks: [
      { name: "Investment Opportunities", id: "invest-opps" },
      { name: "Strategic Partnerships", id: "strategic-partnerships" },
      { name: "Technology Licensing", id: "tech-licensing" },
      { name: "EPC / EPCM", id: "epc-epcm" },
      { name: "Become a Partner", id: "become-partner" }
    ]
  },
  {
    name: Page.Insights,
    subLinks: [
      { name: "News", id: "news", page: Page.News },
      { name: "Research", id: "research" },
      { name: "Technical Papers", id: "tech-papers" },
      { name: "Reports", id: "reports" }
    ]
  },
  {
    name: Page.Contact,
    subLinks: [
      { name: "Contact KKM", id: "contact-kkm" },
      { name: "Project Inquiry", id: "project-inquiry" },
      { name: "Partnership Inquiry", id: "partnership-inquiry" },
      { name: "Investment Inquiry", id: "investment-inquiry" }
    ]
  }
];

export const GMEL_TECHNOLOGIES = [
    { name: "GMEL_CLG_Name", description: "GMEL_CLG_Desc" },
    { name: "GMEL_EHS_Name", description: "GMEL_EHS_Desc" },
    { name: "GMEL_DrillX_Name", description: "GMEL_DrillX_Desc" },
    { name: "GMEL_ThermoFluid_Name", description: "GMEL_ThermoFluid_Desc" },
    { name: "GMEL_Desal_Name", description: "GMEL_Desal_Desc" },
    { name: "GMEL_H2Cell_Name", description: "GMEL_H2Cell_Desc" },
    { name: "GMEL_AgriCell_Name", description: "GMEL_AgriCell_Desc" },
    { name: "GMEL_LithiumLoop_Name", description: "GMEL_LithiumLoop_Desc" },
    { name: "GMEL_EcoCluster_Name", description: "GMEL_EcoCluster_Desc" },
    { name: "GMEL_SmartFund_Name", description: "GMEL_SmartFund_Desc" },
    { name: "GMEL_GeoCredit_Name", description: "GMEL_GeoCredit_Desc" },
];

export const OTHER_CORE_AREAS = [
    { name: "Biomedical_Name", description: "Biomedical_Desc" },
    { name: "SportsMgmt_Name", description: "SportsMgmt_Desc" },
    { name: "RuralStudies_Name", description: "RuralStudies_Desc" },
];

export const PROJECTS: Project[] = [
    { 
        name: "Project_Qeshm_Name",
        client: 'Qeshm Free Zone Organization & Energy Consortium',
        location: 'Qeshm Island, Persian Gulf, Iran',
        scope: 'Offshore subsea and onshore pipeline deployment, seawater intake networks, and front-end geothermal co-generation engineering.',
        role: 'General Contractor (EPC) & Lead Energy Systems Architect',
        technology: 'Advanced Marine Engineering, HDPE Subsea Pipelines, GMEL-CLG Geothermal Co-generation',
        stage: 'Phase 1 — Partially Completed',
        startDate: '2021-03-01',
        currentStatus: 'Phase 1 Marine & Pipeline Infrastructure Installed; Energy & Biotech Integration in Progress',
        evidence: 'EVD-PRJ-QESHM-PH1-2024 (Level C - Site Inspection & Engineering Acceptance Dossier)',
        partners: ['Qeshm Free Zone Authority', 'Marine Engineering Consortium', 'National Clean Energy Lab'],
        nextMilestone: 'Integration of geothermal binary test loop and marine biotech research laboratory (Target Q3 2027).',
        deliverables: ['Pipeline Deployment', 'Offshore Terminal Civil Infrastructure', 'Intake Station Foundation'],
        results: 'Marine intake pipeline successfully deployed with verified hydro-testing and pressure containment.',
        nextPhase: 'Phase 2: Geothermal binary power generation & biotech incubation facility.',
        description: "Project_Qeshm_Desc",
        image: "https://picsum.photos/seed/qeshm-oilfield/600/400",
        tags: ["Tag_OilGas", "Tag_EPCI", "Tag_Midstream", "Tag_Biotech"],
        coordinates: { lat: 26.907, lng: 56.002 },
        gallery: ["https://picsum.photos/seed/qeshm-gallery1/800/600", "https://picsum.photos/seed/qeshm-gallery2/800/600", "https://picsum.photos/seed/qeshm-gallery3/800/600"],
        videoUrl: "https://www.youtube.com/embed/Mj9Gj6QgM_E",
        detailedContent: "Project_Qeshm_Content",
        metrics: {
            budget: {
                total: 120, currency: "M USD",
                allocation: [
                    { name: "Metric_Engineering", value: 24, fill: "#0A92EF" },
                    { name: "Metric_Procurement", value: 54, fill: "#002D56" },
                    { name: "Metric_Construction", value: 36, fill: "#89CFF0" },
                    { name: "Metric_Commissioning", value: 6, fill: "#5a646a" },
                ]
            },
            timeline: { start: "2021-03-01", end: "2023-09-30", progress: 65 }
        }
    },
    { 
        name: "Project_ICOFC_Name",
        client: 'Iranian Central Oil Fields Company (ICOFC)',
        location: 'Sarakhs, Khorasan Razavi, Iran (Khangiran Gas Basin)',
        scope: 'High-pressure gas reservoir thermodynamics, surface facility tie-in engineering, and digital twin subsurface characterization.',
        role: 'Engineering & Subsurface Modeling Consultant',
        technology: 'Deep Reservoir Simulation, High-Temperature Wellbore Modeling, SCADA Integration',
        stage: 'Operational Engineering & Simulation Phase',
        startDate: '2022-06-15',
        currentStatus: 'Reservoir thermodynamic model deployed; wellhead operational optimization underway',
        evidence: 'EVD-PRJ-SARAKHS-2023 (Level B - Joint Field Report & Simulation Audit)',
        partners: ['ICOFC Exploration Directorate', 'Khorasan Energy Authority'],
        nextMilestone: 'Phase 2 field automation and closed-loop pressure monitoring rollout (Target Q1 2027).',
        deliverables: ['Subsurface Thermodynamic Model', 'Surface Tie-in Engineering Pack', 'SCADA Digital Interface'],
        results: 'Validated pressure decay prediction model within 3% variance of field gauge telemetry.',
        nextPhase: 'Implementation of automated downhole pressure monitoring nodes.',
        description: "Project_ICOFC_Desc",
        image: "https://picsum.photos/seed/icofc-sarakhs/600/400",
        tags: ["Tag_OilGas", "Tag_Upstream", "Tag_FieldDev"],
        coordinates: { lat: 36.5438, lng: 61.1573 },
        googleMapsLink: "https://maps.app.goo.gl/vDbZahSzSifjz3KQ6",
        gallery: ["https://picsum.photos/seed/icofc-gallery1/800/600", "https://picsum.photos/seed/icofc-gallery2/800/600"],
        detailedContent: "Project_ICOFC_Content",
    },
    { 
        name: "Project_TehranBiomed_Name",
        client: 'Biomedical Innovation Consortium & Technology Parks',
        location: 'Tehran Science and Technology Corridor, Iran',
        scope: 'Cleanroom facility engineering, high-throughput bioreactor utilities, and energy-efficient building containment systems.',
        role: 'Lead Engineering & Technical Infrastructure Developer',
        technology: 'ISO Class 5-7 Cleanrooms, Automated HVAC Bio-control, Waste Neutralization Systems',
        stage: 'Engineering Design & Commissioning Support',
        startDate: '2023-01-10',
        currentStatus: 'Civil and HVAC containment systems commissioned; diagnostic validation ongoing',
        evidence: 'EVD-PRJ-TEH-BIO-2024 (Level C - Cleanroom Certification & Commissioning Sign-off)',
        partners: ['Tehran University of Medical Sciences', 'BioTech Incubator Consortium'],
        nextMilestone: 'Full bio-diagnostic production line qualification and secondary cleanroom validation (Target Q4 2026).',
        deliverables: ['Modular Cleanroom Layout', 'Bio-filtration HVAC Design', 'Effluent Decontamination Circuit'],
        results: 'Achieved ISO 14644-1 Class 5 compliance under qualification air test runs.',
        nextPhase: 'Secondary cleanroom fit-out and validation for diagnostic production.',
        description: "Project_TehranBiomed_Desc",
        image: "https://picsum.photos/seed/tehran-biomed/600/400",
        tags: ["Tag_Health", "Tag_Biotech", "Tag_Infrastructure"],
        coordinates: { lat: 35.7219, lng: 51.3347 },
        gallery: ["https://picsum.photos/seed/biomed-gallery1/800/600", "https://picsum.photos/seed/biomed-gallery2/800/600"],
        detailedContent: "Project_TehranBiomed_Content",
    },
    { 
        name: "Project_PowerWater_Name",
        description: "Project_PowerWater_Desc",
        image: "https://picsum.photos/seed/power-water/600/400",
        tags: ["Tag_Power", "Tag_Water", "Tag_Infrastructure"],
        coordinates: { lat: 27.1832, lng: 56.2666 }, // Near Bandar Abbas
        gallery: ["https://picsum.photos/seed/powerwater-1/800/600", "https://picsum.photos/seed/powerwater-2/800/600"],
        detailedContent: "Project_PowerWater_Content",
        metrics: {
            budget: {
                total: 250, currency: "M USD",
                allocation: [
                    { name: "Power Unit", value: 120, fill: "#FFC107" },
                    { name: "Desalination", value: 80, fill: "#0A92EF" },
                    { name: "Civil Works", value: 50, fill: "#5a646a" },
                ]
            },
            timeline: { start: "2019-05-01", end: "2022-11-30", progress: 100 }
        }
    },
    { 
        name: "Project_GreenChem_Name",
        description: "Project_GreenChem_Desc",
        image: "https://picsum.photos/seed/green-chem/600/400",
        tags: ["Tag_Chemical", "Tag_GreenTech"],
        coordinates: { lat: 27.5000, lng: 52.6000 }, // Assaluyeh Industrial Zone area
        gallery: ["https://picsum.photos/seed/greenchem-1/800/600"],
        detailedContent: "Project_GreenChem_Content",
    },
    { 
        name: "Project_CombinedCycle_Name",
        description: "Project_CombinedCycle_Desc",
        image: "https://picsum.photos/seed/combined-cycle/600/400",
        tags: ["Tag_Power", "Tag_Chemical", "Tag_Water"],
        coordinates: { lat: 34.6416, lng: 50.8746 }, // Qom/Central Iran area
        gallery: ["https://picsum.photos/seed/combined-1/800/600", "https://picsum.photos/seed/combined-2/800/600"],
        detailedContent: "Project_CombinedCycle_Content",
    },
    { 
        name: "Project_GeoLayer_Name",
        description: "Project_GeoLayer_Desc",
        image: "https://picsum.photos/seed/geo-layer/600/400",
        tags: ["Tag_Geothermal", "Tag_GreenTech"],
        coordinates: { lat: 38.3932, lng: 47.6644 }, // Meshkin Shahr (Geothermal area)
        gallery: ["https://picsum.photos/seed/geolayer-1/800/600"],
        detailedContent: "Project_GeoLayer_Content",
    },
    { 
        name: "Project_FossilRefinery_Name",
        description: "Project_FossilRefinery_Desc",
        image: "https://picsum.photos/seed/fossil-refinery/600/400",
        tags: ["Tag_Refining", "Tag_OilGas"],
        coordinates: { lat: 30.4325, lng: 48.1672 }, // Khuzestan
        gallery: ["https://picsum.photos/seed/refinery-1/800/600"],
        detailedContent: "Project_FossilRefinery_Content",
    },
    { 
        name: "Project_OilRefinement_Name",
        description: "Project_OilRefinement_Desc",
        image: "https://picsum.photos/seed/oil-stabilization/600/400",
        tags: ["Tag_Refining", "Tag_Upstream"],
        coordinates: { lat: 29.2570, lng: 50.3235 }, // Kharg Island vicinity
        gallery: ["https://picsum.photos/seed/stabilization-1/800/600"],
        detailedContent: "Project_OilRefinement_Content",
    },
    { 
        name: "Project_LaveJetty_Name",
        description: "Project_LaveJetty_Desc",
        image: "https://picsum.photos/seed/lave-jetty/600/400",
        tags: ["Tag_Marine", "Tag_Logistics", "Tag_EPCI"],
        coordinates: { lat: 30.4900, lng: 49.2000 }, // Bandar Imam/Mahshahr area
        gallery: ["https://picsum.photos/seed/jetty-1/800/600", "https://picsum.photos/seed/jetty-2/800/600"],
        detailedContent: "Project_LaveJetty_Content",
        metrics: {
            budget: {
                total: 85, currency: "M USD",
                allocation: [
                    { name: "Dredging", value: 25, fill: "#00529B" },
                    { name: "Quay Wall", value: 35, fill: "#5a646a" },
                    { name: "Equipment", value: 25, fill: "#FFC107" },
                ]
            },
            timeline: { start: "2018-01-01", end: "2020-06-30", progress: 100 }
        }
    }
];

export const NEWS_ITEMS: NewsItem[] = [
    {
        title: "News_1_Title",
        date: "2026-08-15",
        excerpt: "News_1_Excerpt",
        image: "https://picsum.photos/seed/truth-evidence/600/400",
        content: "News_1_Content",
        category: 'Corporate'
    },
    {
        title: "News_2_Title",
        date: "2026-07-22",
        excerpt: "News_2_Excerpt",
        image: "https://picsum.photos/seed/qeshm-oilfield/600/400",
        content: "News_2_Content",
        category: 'Projects'
    },
    {
        title: "News_3_Title",
        date: "2026-06-10",
        excerpt: "News_3_Excerpt",
        image: "https://picsum.photos/seed/rural-platform/600/400",
        content: "News_3_Content",
        category: 'Sustainability'
    },
    {
        title: "News_4_Title",
        date: "2026-05-05",
        excerpt: "News_4_Excerpt",
        image: "https://picsum.photos/seed/gmel-closed-loop/600/400",
        content: "News_4_Content",
        category: 'Technology'
    },
    {
        title: "News_5_Title",
        date: "2026-04-12",
        excerpt: "News_5_Excerpt",
        image: "https://picsum.photos/seed/exhibition-hall/600/400",
        content: "News_5_Content",
        category: 'Events'
    },
    // Archived 2023 News
    {
        title: "News_Archive_1_Title",
        date: "2023-11-15",
        excerpt: "News_Archive_1_Excerpt",
        image: "https://picsum.photos/seed/archive-lab/600/400",
        content: "News_Archive_1_Content",
        category: 'Archive'
    },
    {
        title: "News_Archive_2_Title",
        date: "2023-09-30",
        excerpt: "News_Archive_2_Excerpt",
        image: "https://picsum.photos/seed/archive-pipeline/600/400",
        content: "News_Archive_2_Content",
        category: 'Archive'
    },
    {
        title: "News_Archive_3_Title",
        date: "2023-06-10",
        excerpt: "News_Archive_3_Excerpt",
        image: "https://picsum.photos/seed/archive-mou/600/400",
        content: "News_Archive_3_Content",
        category: 'Archive'
    },
    {
        title: "News_Archive_4_Title",
        date: "2023-03-25",
        excerpt: "News_Archive_4_Excerpt",
        image: "https://picsum.photos/seed/archive-hse/600/400",
        content: "News_Archive_4_Content",
        category: 'Archive'
    }
];

export const VIDEOS: Video[] = [
    {
        title: "News_1_Title", // "Breakthrough in Closed-Loop Geothermal"
        description: "VisionInMotionSubtitle",
        thumbnail: "https://i.ytimg.com/vi/1k1J7f7t7wM/hqdefault.jpg", 
        youtubeId: "1k1J7f7t7wM" // "Eavor-Loop 2.0" - Closed-Loop Geothermal Tech
    },
    {
        title: "News_2_Title", // "Qeshm Project Phase 1"
        description: "VisionInMotionSubtitle",
        thumbnail: "https://i.ytimg.com/vi/Mj9Gj6QgM_E/hqdefault.jpg",
        youtubeId: "Mj9Gj6QgM_E" // "Geothermal Power Plant 3D Animation" - Relevant to Plant construction
    },
    {
        title: "News_3_Title", // "Strategic Partnership" (Drilling Tech)
        description: "VisionInMotionSubtitle",
        thumbnail: "https://i.ytimg.com/vi/Fj4s3q7y8wE/hqdefault.jpg",
        youtubeId: "Fj4s3q7y8wE" // "Automated Drilling Rig" - Relevant to Drilling/Engineering
    }
];

export const JOB_OPENINGS: JobOpening[] = [
    {
        id: 'sr-geothermal-engineer',
        title: 'Job_1_Title',
        department: 'Engineering',
        location: 'Tehran, Iran',
        type: 'Full-time',
        description: 'Job_1_Desc',
        responsibilities: ['Job_1_Resp_1', 'Job_1_Resp_2', 'Job_1_Resp_3', 'Job_1_Resp_4'],
        qualifications: ['Job_1_Qual_1', 'Job_1_Qual_2', 'Job_1_Qual_3', 'Job_1_Qual_4'],
    },
    {
        id: 'biomed-research-scientist',
        title: 'Job_2_Title',
        department: 'R&D',
        location: 'Tehran, Iran',
        type: 'Full-time',
        description: 'Job_2_Desc',
        responsibilities: ['Job_2_Resp_1', 'Job_2_Resp_2', 'Job_2_Resp_3', 'Job_2_Resp_4'],
        qualifications: ['Job_2_Qual_1', 'Job_2_Qual_2', 'Job_2_Qual_3', 'Job_2_Qual_4'],
    },
    {
        id: 'project-controls-manager',
        title: 'Job_3_Title',
        department: 'Operations',
        location: 'Qeshm, Iran',
        type: 'Contract',
        description: 'Job_3_Desc',
        responsibilities: ['Job_3_Resp_1', 'Job_3_Resp_2', 'Job_3_Resp_3', 'Job_3_Resp_4'],
        qualifications: ['Job_3_Qual_1', 'Job_3_Qual_2', 'Job_3_Qual_3', 'Job_3_Qual_4'],
    },
    {
        id: 'hr-business-partner',
        title: 'Job_4_Title',
        department: 'Corporate',
        location: 'Tehran, Iran',
        type: 'Full-time',
        description: 'Job_4_Desc',
        responsibilities: ['Job_4_Resp_1', 'Job_4_Resp_2', 'Job_4_Resp_3', 'Job_4_Resp_4'],
        qualifications: ['Job_4_Qual_1', 'Job_4_Qual_2', 'Job_4_Qual_3', 'Job_4_Qual_4'],
    },
    {
        id: 'remote-software-dev',
        title: 'Job_5_Title',
        department: 'R&D',
        location: 'Remote',
        type: 'Full-time',
        description: 'Job_5_Desc',
        responsibilities: ['Job_5_Resp_1', 'Job_5_Resp_2', 'Job_5_Resp_3', 'Job_5_Resp_4'],
        qualifications: ['Job_5_Qual_1', 'Job_5_Qual_2', 'Job_5_Qual_3', 'Job_5_Qual_4'],
    },
];

export const EMPLOYEE_TESTIMONIALS: { quote: string; name: string; role: string; image?: string; initials?: string; department?: string; }[] = [
    {
        quote: "Emp_Testimonial_1_Quote",
        name: 'Ali Rezaei',
        role: 'Emp_Testimonial_1_Role',
        initials: 'AR',
        department: 'Reservoir & Thermodynamics',
        image: '',
    },
    {
        quote: 'Emp_Testimonial_2_Quote',
        name: 'Dr. Benyamin Rezaei',
        role: 'Emp_Testimonial_2_Role',
        initials: 'BR',
        department: 'Thermal Spallation & Drilling',
        image: '',
    },
    {
        quote: "Emp_Testimonial_3_Quote",
        name: 'Fatemeh Ghasemi',
        role: 'Emp_Testimonial_3_Role',
        initials: 'FG',
        department: 'Environmental Impact & HSE',
        image: '',
    }
];
