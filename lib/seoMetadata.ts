/**
 * Shared Client & Server SEO / OpenGraph Metadata Definitions
 * Powers Social Preview simulator and Server-Side HTML meta tag injection.
 */

export interface PageMeta {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage: string;
  ogType?: string;
  keywords?: string;
  label?: string;
  category?: 'Core' | 'Technology & Energy' | 'Governance & Audits' | 'Investment & Business' | 'Operations & Legal';
}

export const CANONICAL_HOST = 'https://www.kkm-intl.org';
export const DEFAULT_OG_IMAGE = 'https://www.kkm-intl.org/og-image.png';

export const ROUTE_METADATA: Record<string, PageMeta> = {
  '/': {
    title: 'KKM International Group | Technology. Engineering. Infrastructure. Innovation.',
    description: 'Leading multi-disciplinary engineering group pioneering closed-loop geothermal systems (GMEL), water-energy nexus technologies, rural microgrids, and resilient infrastructure.',
    canonicalUrl: `${CANONICAL_HOST}/`,
    ogImage: DEFAULT_OG_IMAGE,
    keywords: 'KKM International, Geothermal Energy, Infrastructure, Engineering, Innovation, Closed Loop, Water Energy Nexus, Rural Development',
    label: 'Homepage / Flagship',
    category: 'Core',
  },
  '/about': {
    title: 'About KKM International Group | History, Leadership & Vision',
    description: "Learn about KKM International Group's foundational engineering milestones, sovereign governance, and mission driving sustainable industrial transformation.",
    canonicalUrl: `${CANONICAL_HOST}/about`,
    ogImage: DEFAULT_OG_IMAGE,
    label: 'About & Sovereign Governance',
    category: 'Core',
  },
  '/technology': {
    title: 'Core Proprietary Technologies & Advanced Engineering | KKM',
    description: 'Overview of KKM proprietary technology domains: closed-loop geothermal (GMEL), thermal desalination, water-energy nexus, advanced sensors, and industrial IoT.',
    canonicalUrl: `${CANONICAL_HOST}/technology`,
    ogImage: `${CANONICAL_HOST}/src/assets/images/geothermal_closed_loop_1791203562069.jpg`,
    label: 'Core Technologies',
    category: 'Technology & Energy',
  },
  '/gmel': {
    title: 'GeoMeta Energy Layer (GMEL) Technology Ecosystem | KKM',
    description: 'Comprehensive engineering overview of the GMEL ecosystem uniting closed-loop heat extraction, thermodynamic ORC cycles, and industrial AI digital twins.',
    canonicalUrl: `${CANONICAL_HOST}/gmel`,
    ogImage: `${CANONICAL_HOST}/src/assets/images/geothermal_icon_1791765115317.jpg`,
    label: 'GMEL Geothermal Ecosystem',
    category: 'Technology & Energy',
  },
  '/digital-twins': {
    title: 'Industrial AI & Physics-Informed Digital Twins | KKM',
    description: 'Predictive energy dispatch, IoT remote telemetry for industrial plants, and PINN physics-informed subsurface digital twins.',
    canonicalUrl: `${CANONICAL_HOST}/digital-twins`,
    ogImage: `${CANONICAL_HOST}/src/assets/images/ai_digital_twins_isometric_1792800606776.jpg`,
    label: 'AI & Digital Twins Hub',
    category: 'Technology & Energy',
  },
  '/projects': {
    title: 'Global Projects, Pilot Testbeds & Regional Deployments | KKM',
    description: 'Portfolio of active infrastructure projects, geothermal demonstration testbeds, desalination installations, and rural transformation programs.',
    canonicalUrl: `${CANONICAL_HOST}/projects`,
    ogImage: `${CANONICAL_HOST}/src/assets/images/resilient_infrastructure_isometric_1792800605381.jpg`,
    label: 'Global Projects & Pilots',
    category: 'Technology & Energy',
  },
  '/rural-development': {
    title: 'Rural & Nomadic Territorial Development Platform | KKM',
    description: 'Integrated rural development platform engineering the energy-water-infrastructure nexus, modular mini-grids, and local value creation across 25 priority arid villages.',
    canonicalUrl: `${CANONICAL_HOST}/rural-development`,
    ogImage: `${CANONICAL_HOST}/src/assets/images/smart_energy_microgrid_1791203578761.jpg`,
    label: 'Rural & Nomadic Development',
    category: 'Technology & Energy',
  },
  '/exhibition/rural-1405': {
    title: 'Rural & Nomadic Development Exhibition 1405 | KKM',
    description: "Official national exhibition portal showcasing KKM's signature architecture for decentralized rural utilities, Energy Villages, and pilot partnerships.",
    canonicalUrl: `${CANONICAL_HOST}/exhibition/rural-1405`,
    ogImage: `${CANONICAL_HOST}/src/assets/images/smart_energy_microgrid_1791203578761.jpg`,
    label: 'National Exhibition 1405',
    category: 'Technology & Energy',
  },
  '/evidence-registry': {
    title: 'Evidence & Technical Verification Registry (Levels A-G) | KKM',
    description: 'Transparent corporate evidence registry mapping performance metrics, geothermal engineering claims, patent filings, and lab testbeds to Level A-G audit files.',
    canonicalUrl: `${CANONICAL_HOST}/evidence-registry`,
    ogImage: DEFAULT_OG_IMAGE,
    label: 'Evidence Registry (Levels A-G)',
    category: 'Governance & Audits',
  },
  '/claims-registry': {
    title: 'Performance, Technical & ESG Claims Registry (P0-13) | KKM',
    description: 'Structured registry matrix managing all performance, technical, ESG, and intellectual property claims with verified, target, and estimate status classifications.',
    canonicalUrl: `${CANONICAL_HOST}/claims-registry`,
    ogImage: DEFAULT_OG_IMAGE,
    label: 'Claims Registry (P0-13)',
    category: 'Governance & Audits',
  },
  '/sustainability': {
    title: 'Sustainability, ESG & Carbon Offset Governance | KKM',
    description: 'Corporate sustainability reporting and claim governance registry formalizing Verified, Internal, Estimated, and Demonstration data across KKM operations.',
    canonicalUrl: `${CANONICAL_HOST}/sustainability`,
    ogImage: DEFAULT_OG_IMAGE,
    label: 'Sustainability & ESG Governance',
    category: 'Governance & Audits',
  },
  '/ip-center': {
    title: 'Intellectual Property, Patents & Technology Assets | KKM',
    description: 'Proprietary IP portfolio covering GMEL closed-loop well architecture, supercritical heat transfer fluids, and sonic casing vibration tools.',
    canonicalUrl: `${CANONICAL_HOST}/ip-center`,
    ogImage: `${CANONICAL_HOST}/src/assets/images/advanced_materials_sensors_isometric_1792800607239.jpg`,
    label: 'Intellectual Property & Patents',
    category: 'Governance & Audits',
  },
  '/corporate-info': {
    title: 'Corporate Identity, Legal Registration & Governance | KKM',
    description: 'Kimia Karan Mâd Private Joint Stock Company legal registration, official gazette disclosures, leadership structure, and bank certifications.',
    canonicalUrl: `${CANONICAL_HOST}/corporate-info`,
    ogImage: DEFAULT_OG_IMAGE,
    label: 'Corporate Registration & Governance',
    category: 'Governance & Audits',
  },
  '/invest': {
    title: 'Infrastructure Investment & Strategic Co-Development | KKM',
    description: 'Institutional investor portal providing capital allocation structures, IRR scenarios, and project financing frameworks for closed-loop geothermal infrastructure.',
    canonicalUrl: `${CANONICAL_HOST}/invest`,
    ogImage: DEFAULT_OG_IMAGE,
    label: 'Infrastructure Investment Portal',
    category: 'Investment & Business',
  },
  '/pilot-request': {
    title: 'Pilot Testbed & Industrial Deployment Application | KKM',
    description: 'Request commercial pilot deployment for GMEL closed-loop geothermal retrofit, industrial heat recovery, or rural multi-utility microgrids.',
    canonicalUrl: `${CANONICAL_HOST}/pilot-request`,
    ogImage: `${CANONICAL_HOST}/src/assets/images/geothermal_closed_loop_1791203562069.jpg`,
    label: 'Pilot Testbed Application',
    category: 'Investment & Business',
  },
  '/project-development': {
    title: 'Subsurface & Geothermal Project Development Pipeline | KKM',
    description: 'End-to-end EPCM project development methodology covering subsurface geological appraisal, thermodynamic cycle engineering, and facility delivery.',
    canonicalUrl: `${CANONICAL_HOST}/project-development`,
    ogImage: DEFAULT_OG_IMAGE,
    label: 'EPCM Project Pipeline',
    category: 'Investment & Business',
  },
  '/innovation-hub': {
    title: 'Innovation Hub | Cross-Disciplinary Technology Development | KKM',
    description: 'KKM Innovation Hub accelerating cross-disciplinary R&D across geothermal systems, water cycles, digital twins, and industrial AI.',
    canonicalUrl: `${CANONICAL_HOST}/innovation-hub`,
    ogImage: DEFAULT_OG_IMAGE,
    label: 'Innovation Hub',
    category: 'Investment & Business',
  },
  '/news': {
    title: 'News, Field Milestones & Technical Whitepapers | KKM',
    description: 'Latest corporate announcements, field project milestones, technology licensing developments, and media briefings from KKM International Group.',
    canonicalUrl: `${CANONICAL_HOST}/news`,
    ogImage: DEFAULT_OG_IMAGE,
    label: 'News & Media Briefings',
    category: 'Core',
  },
  '/downloads': {
    title: 'Technical Whitepapers, Dossiers & Specifications | KKM',
    description: 'Official repository of downloadable engineering whitepapers, GMEL technical dossiers, exhibition catalogs, and verified audit summaries.',
    canonicalUrl: `${CANONICAL_HOST}/downloads`,
    ogImage: DEFAULT_OG_IMAGE,
    label: 'Technical Whitepapers & Downloads',
    category: 'Core',
  },
  '/team': {
    title: 'Leadership & Engineering Directorate Directory | KKM',
    description: 'Executive Board of Directors, Executive Committee, and specialized Engineering Directorate leaders of KKM International Group.',
    canonicalUrl: `${CANONICAL_HOST}/team`,
    ogImage: DEFAULT_OG_IMAGE,
    label: 'Leadership & Engineering Directorate',
    category: 'Core',
  },
  '/careers': {
    title: 'Careers, Engineering Fellowships & Talent Operations | KKM',
    description: 'Explore high-impact career opportunities in geothermal engineering, thermodynamic cycles, smart grid modeling, and international infrastructure.',
    canonicalUrl: `${CANONICAL_HOST}/careers`,
    ogImage: DEFAULT_OG_IMAGE,
    label: 'Careers & Talent Operations',
    category: 'Core',
  },
  '/contact': {
    title: 'Contact KKM International Group | Global Offices & Inquiries',
    description: 'Connect with KKM International Group headquarters, engineering centers, and regional development desks for partnerships, pilots, and tenders.',
    canonicalUrl: `${CANONICAL_HOST}/contact`,
    ogImage: DEFAULT_OG_IMAGE,
    label: 'Global Offices & Inquiries',
    category: 'Core',
  },
  '/faq': {
    title: 'Frequently Asked Questions & Technical FAQ | KKM',
    description: 'Authoritative answers regarding GMEL closed-loop geothermal technologies, thermodynamic parameters, project financing, and environmental safeguards.',
    canonicalUrl: `${CANONICAL_HOST}/faq`,
    ogImage: DEFAULT_OG_IMAGE,
    label: 'Technical FAQ',
    category: 'Core',
  },
  '/divisions': {
    title: 'Business Units & Engineering Directorates | KKM',
    description: 'Overview of KKM specialized operating divisions across energy, water, civil infrastructure, and advanced digital technologies.',
    canonicalUrl: `${CANONICAL_HOST}/divisions`,
    ogImage: DEFAULT_OG_IMAGE,
    label: 'Operating Divisions',
    category: 'Operations & Legal',
  },
  '/internal-portal': {
    title: 'Executive Portal & Corporate Telephony Gateway | KKM',
    description: 'Internal institutional portal, IVR communications console, and Directorate RACI matrix for authorized KKM personnel.',
    canonicalUrl: `${CANONICAL_HOST}/internal-portal`,
    ogImage: DEFAULT_OG_IMAGE,
    label: 'Executive Internal Portal',
    category: 'Operations & Legal',
  },
  '/legal': {
    title: 'Legal Notices, Privacy Policy & Terms of Service | KKM',
    description: 'Corporate terms of use, privacy policy, cookie consent, and data protection disclosures for KKM International Group.',
    canonicalUrl: `${CANONICAL_HOST}/legal`,
    ogImage: DEFAULT_OG_IMAGE,
    label: 'Legal, Privacy & Compliance',
    category: 'Operations & Legal',
  },
  '/social-preview': {
    title: 'OpenGraph & Social Share Preview Debugger | KKM',
    description: 'Interactive 1200x630px social media card simulator and metadata validation inspector for LinkedIn, X (Twitter), Facebook, and messaging crawlers.',
    canonicalUrl: `${CANONICAL_HOST}/social-preview`,
    ogImage: DEFAULT_OG_IMAGE,
    label: 'Social Preview Debugger Tool',
    category: 'Operations & Legal',
  },
};

export const ALIAS_MAP: Record<string, string> = {
  '/about-us': '/about',
  '/aboutus': '/about',
  '/core-technologies': '/technology',
  '/technologies': '/technology',
  '/projects-and-pilots': '/projects',
  '/project': '/projects',
  '/insights': '/news',
  '/news-and-insights': '/news',
  '/whitepapers': '/downloads',
  '/rural': '/rural-development',
  '/rural-1405': '/exhibition/rural-1405',
  '/exhibition': '/exhibition/rural-1405',
  '/evidence': '/evidence-registry',
  '/claims': '/claims-registry',
  '/claim-registry': '/claims-registry',
  '/investors': '/invest',
  '/investment-portal': '/invest',
  '/leadership': '/team',
  '/board': '/team',
  '/faqs': '/faq',
  '/business-units': '/divisions',
  '/innovation': '/innovation-hub',
  '/corporate': '/corporate-info',
  '/ip': '/ip-center',
  '/carbon-credits': '/sustainability',
  '/carbon-credit': '/sustainability',
  '/esg': '/sustainability',
  '/privacy': '/legal',
  '/terms': '/legal',
  '/cookies': '/legal',
  '/contact-us': '/contact',
  '/digital-twin': '/digital-twins',
  '/portal': '/internal-portal',
  '/preview': '/social-preview',
  '/meta-debug': '/social-preview',
  '/og-preview': '/social-preview',
};

export function resolveMetaForPath(rawPath: string): PageMeta {
  if (!rawPath) return ROUTE_METADATA['/'];

  const pathWithoutQuery = rawPath.split('?')[0].split('#')[0];
  const normalized = pathWithoutQuery.length > 1 && pathWithoutQuery.endsWith('/')
    ? pathWithoutQuery.slice(0, -1).toLowerCase()
    : pathWithoutQuery.toLowerCase();

  if (ROUTE_METADATA[normalized]) {
    return ROUTE_METADATA[normalized];
  }

  if (ALIAS_MAP[normalized] && ROUTE_METADATA[ALIAS_MAP[normalized]]) {
    return ROUTE_METADATA[ALIAS_MAP[normalized]];
  }

  return ROUTE_METADATA['/'];
}
