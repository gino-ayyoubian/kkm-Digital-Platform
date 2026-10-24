/**
 * KKM Enterprise Server-Side SEO & OpenGraph Prerender Service
 * Injects route-specific metadata into initial HTML responses for social crawlers
 * (Telegram, WhatsApp, LinkedIn, Facebook, Twitter/X, Googlebot, etc.)
 */

export interface PageMeta {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage: string;
  ogType?: string;
  keywords?: string;
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
  },
  '/about': {
    title: 'About KKM International Group | History, Leadership & Vision',
    description: "Learn about KKM International Group's foundational engineering milestones, sovereign governance, and mission driving sustainable industrial transformation.",
    canonicalUrl: `${CANONICAL_HOST}/about`,
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/technology': {
    title: 'Core Proprietary Technologies & Advanced Engineering | KKM',
    description: 'Overview of KKM proprietary technology domains: closed-loop geothermal (GMEL), thermal desalination, water-energy nexus, advanced sensors, and industrial IoT.',
    canonicalUrl: `${CANONICAL_HOST}/technology`,
    ogImage: `${CANONICAL_HOST}/src/assets/images/geothermal_closed_loop_1791203562069.jpg`,
  },
  '/projects': {
    title: 'Global Projects, Pilot Testbeds & Regional Deployments | KKM',
    description: 'Portfolio of active infrastructure projects, geothermal demonstration testbeds, desalination installations, and rural transformation programs.',
    canonicalUrl: `${CANONICAL_HOST}/projects`,
    ogImage: `${CANONICAL_HOST}/src/assets/images/resilient_infrastructure_isometric_1792800605381.jpg`,
  },
  '/news': {
    title: 'News, Field Milestones & Technical Whitepapers | KKM',
    description: 'Latest corporate announcements, field project milestones, technology licensing developments, and media briefings from KKM International Group.',
    canonicalUrl: `${CANONICAL_HOST}/news`,
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/downloads': {
    title: 'Technical Whitepapers, Dossiers & Specifications | KKM',
    description: 'Official repository of downloadable engineering whitepapers, GMEL technical dossiers, exhibition catalogs, and verified audit summaries.',
    canonicalUrl: `${CANONICAL_HOST}/downloads`,
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/rural-development': {
    title: 'Rural & Nomadic Territorial Development Platform | KKM',
    description: 'Integrated rural development platform engineering the energy-water-infrastructure nexus, modular mini-grids, and local value creation across 25 priority arid villages.',
    canonicalUrl: `${CANONICAL_HOST}/rural-development`,
    ogImage: `${CANONICAL_HOST}/src/assets/images/smart_energy_microgrid_1791203578761.jpg`,
  },
  '/exhibition/rural-1405': {
    title: 'Rural & Nomadic Development Exhibition 1405 | KKM',
    description: "Official national exhibition portal showcasing KKM's signature architecture for decentralized rural utilities, Energy Villages, and pilot partnerships.",
    canonicalUrl: `${CANONICAL_HOST}/exhibition/rural-1405`,
    ogImage: `${CANONICAL_HOST}/src/assets/images/smart_energy_microgrid_1791203578761.jpg`,
  },
  '/evidence-registry': {
    title: 'Evidence & Technical Verification Registry (Levels A-G) | KKM',
    description: 'Transparent corporate evidence registry mapping performance metrics, geothermal engineering claims, patent filings, and lab testbeds to Level A-G audit files.',
    canonicalUrl: `${CANONICAL_HOST}/evidence-registry`,
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/claims-registry': {
    title: 'Performance, Technical & ESG Claims Registry (P0-13) | KKM',
    description: 'Structured registry matrix managing all performance, technical, ESG, and intellectual property claims with verified, target, and estimate status classifications.',
    canonicalUrl: `${CANONICAL_HOST}/claims-registry`,
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/sustainability': {
    title: 'Sustainability, ESG & Carbon Offset Governance | KKM',
    description: 'Corporate sustainability reporting and claim governance registry formalizing Verified, Internal, Estimated, and Demonstration data across KKM operations.',
    canonicalUrl: `${CANONICAL_HOST}/sustainability`,
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/invest': {
    title: 'Infrastructure Investment & Strategic Co-Development | KKM',
    description: 'Institutional investor portal providing capital allocation structures, IRR scenarios, and project financing frameworks for closed-loop geothermal infrastructure.',
    canonicalUrl: `${CANONICAL_HOST}/invest`,
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/pilot-request': {
    title: 'Pilot Testbed & Industrial Deployment Application | KKM',
    description: 'Request commercial pilot deployment for GMEL closed-loop geothermal retrofit, industrial heat recovery, or rural multi-utility microgrids.',
    canonicalUrl: `${CANONICAL_HOST}/pilot-request`,
    ogImage: `${CANONICAL_HOST}/src/assets/images/geothermal_closed_loop_1791203562069.jpg`,
  },
  '/project-development': {
    title: 'Subsurface & Geothermal Project Development Pipeline | KKM',
    description: 'End-to-end EPCM project development methodology covering subsurface geological appraisal, thermodynamic cycle engineering, and facility delivery.',
    canonicalUrl: `${CANONICAL_HOST}/project-development`,
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/ip-center': {
    title: 'Intellectual Property, Patents & Technology Assets | KKM',
    description: 'Proprietary IP portfolio covering GMEL closed-loop well architecture, supercritical heat transfer fluids, and sonic casing vibration tools.',
    canonicalUrl: `${CANONICAL_HOST}/ip-center`,
    ogImage: `${CANONICAL_HOST}/src/assets/images/advanced_materials_sensors_isometric_1792800607239.jpg`,
  },
  '/innovation-hub': {
    title: 'Innovation Hub | Cross-Disciplinary Technology Development | KKM',
    description: 'KKM Innovation Hub accelerating cross-disciplinary R&D across geothermal systems, water cycles, digital twins, and industrial AI.',
    canonicalUrl: `${CANONICAL_HOST}/innovation-hub`,
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/corporate-info': {
    title: 'Corporate Identity, Legal Registration & Governance | KKM',
    description: 'Kimia Karan Mâd Private Joint Stock Company legal registration, official gazette disclosures, leadership structure, and bank certifications.',
    canonicalUrl: `${CANONICAL_HOST}/corporate-info`,
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/gmel': {
    title: 'GeoMeta Energy Layer (GMEL) Technology Ecosystem | KKM',
    description: 'Comprehensive engineering overview of the GMEL ecosystem uniting closed-loop heat extraction, thermodynamic ORC cycles, and industrial AI digital twins.',
    canonicalUrl: `${CANONICAL_HOST}/gmel`,
    ogImage: `${CANONICAL_HOST}/src/assets/images/geothermal_icon_1791765115317.jpg`,
  },
  '/digital-twins': {
    title: 'Industrial AI & Physics-Informed Digital Twins | KKM',
    description: 'Predictive energy dispatch, IoT remote telemetry for industrial plants, and PINN physics-informed subsurface digital twins.',
    canonicalUrl: `${CANONICAL_HOST}/digital-twins`,
    ogImage: `${CANONICAL_HOST}/src/assets/images/ai_digital_twins_isometric_1792800606776.jpg`,
  },
  '/team': {
    title: 'Leadership & Engineering Directorate Directory | KKM',
    description: 'Executive Board of Directors, Executive Committee, and specialized Engineering Directorate leaders of KKM International Group.',
    canonicalUrl: `${CANONICAL_HOST}/team`,
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/careers': {
    title: 'Careers, Engineering Fellowships & Talent Operations | KKM',
    description: 'Explore high-impact career opportunities in geothermal engineering, thermodynamic cycles, smart grid modeling, and international infrastructure.',
    canonicalUrl: `${CANONICAL_HOST}/careers`,
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/contact': {
    title: 'Contact KKM International Group | Global Offices & Inquiries',
    description: 'Connect with KKM International Group headquarters, engineering centers, and regional development desks for partnerships, pilots, and tenders.',
    canonicalUrl: `${CANONICAL_HOST}/contact`,
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/faq': {
    title: 'Frequently Asked Questions & Technical FAQ | KKM',
    description: 'Authoritative answers regarding GMEL closed-loop geothermal technologies, thermodynamic parameters, project financing, and environmental safeguards.',
    canonicalUrl: `${CANONICAL_HOST}/faq`,
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/divisions': {
    title: 'Business Units & Engineering Directorates | KKM',
    description: 'Overview of KKM specialized operating divisions across energy, water, civil infrastructure, and advanced digital technologies.',
    canonicalUrl: `${CANONICAL_HOST}/divisions`,
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/internal-portal': {
    title: 'Executive Portal & Corporate Telephony Gateway | KKM',
    description: 'Internal institutional portal, IVR communications console, and Directorate RACI matrix for authorized KKM personnel.',
    canonicalUrl: `${CANONICAL_HOST}/internal-portal`,
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/legal': {
    title: 'Legal Notices, Privacy Policy & Terms of Service | KKM',
    description: 'Corporate terms of use, privacy policy, cookie consent, and data protection disclosures for KKM International Group.',
    canonicalUrl: `${CANONICAL_HOST}/legal`,
    ogImage: DEFAULT_OG_IMAGE,
  },
};

/**
 * Resolves a normalized URL path to its corresponding page metadata
 */
export function resolveMetaForPath(rawPath: string): PageMeta {
  if (!rawPath) return ROUTE_METADATA['/'];

  // Strip query string and hash
  const pathWithoutQuery = rawPath.split('?')[0].split('#')[0];
  const normalized = pathWithoutQuery.length > 1 && pathWithoutQuery.endsWith('/')
    ? pathWithoutQuery.slice(0, -1).toLowerCase()
    : pathWithoutQuery.toLowerCase();

  // Direct match
  if (ROUTE_METADATA[normalized]) {
    return ROUTE_METADATA[normalized];
  }

  // Alias matches
  const ALIAS_MAP: Record<string, string> = {
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
  };

  if (ALIAS_MAP[normalized] && ROUTE_METADATA[ALIAS_MAP[normalized]]) {
    return ROUTE_METADATA[ALIAS_MAP[normalized]];
  }

  // Default fallback
  return ROUTE_METADATA['/'];
}

/**
 * Injects OpenGraph, Twitter, and canonical metadata directly into HTML <head>
 * before serving to social media crawlers and browsers.
 */
export function injectSeoMetadata(html: string, requestPath: string): string {
  const meta = resolveMetaForPath(requestPath);

  let updated = html;

  // Replace <title>
  updated = updated.replace(/<title>.*?<\/title>/i, `<title>${meta.title}</title>`);

  // Replace <meta name="title" ...>
  updated = updated.replace(
    /<meta\s+name="title"\s+content=".*?"\s*\/?>/i,
    `<meta name="title" content="${meta.title}" />`
  );

  // Replace <meta name="description" ...>
  updated = updated.replace(
    /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
    `<meta name="description" content="${meta.description}" />`
  );

  // Replace <link rel="canonical" ...>
  updated = updated.replace(
    /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
    `<link rel="canonical" href="${meta.canonicalUrl}" />`
  );

  // Replace OpenGraph tags
  updated = updated.replace(
    /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:title" content="${meta.title}" />`
  );

  updated = updated.replace(
    /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:description" content="${meta.description}" />`
  );

  updated = updated.replace(
    /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:url" content="${meta.canonicalUrl}" />`
  );

  updated = updated.replace(
    /<meta\s+property="og:image"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:image" content="${meta.ogImage}" />`
  );

  updated = updated.replace(
    /<meta\s+property="og:image:secure_url"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:image:secure_url" content="${meta.ogImage}" />`
  );

  const isJpeg = meta.ogImage.endsWith('.jpg') || meta.ogImage.endsWith('.jpeg');
  const imageMime = isJpeg ? 'image/jpeg' : 'image/png';
  const isPersian = requestPath.startsWith('/fa') || requestPath.includes('lang=fa');
  const locale = isPersian ? 'fa_IR' : 'en_US';
  const altLocale = isPersian ? 'en_US' : 'fa_IR';

  // Replace OpenGraph image type and dimensions
  updated = updated.replace(
    /<meta\s+property="og:image:type"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:image:type" content="${imageMime}" />`
  );

  updated = updated.replace(
    /<meta\s+property="og:image:alt"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:image:alt" content="${meta.title}" />`
  );

  // Replace Twitter image alt
  updated = updated.replace(
    /<meta\s+property="twitter:image:alt"\s+content=".*?"\s*\/?>/i,
    `<meta property="twitter:image:alt" content="${meta.title}" />`
  );

  // Ensure og:locale is present and accurate
  if (updated.includes('property="og:locale"')) {
    updated = updated.replace(
      /<meta\s+property="og:locale"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:locale" content="${locale}" />`
    );
  } else {
    updated = updated.replace(
      /<\/head>/i,
      `  <meta property="og:locale" content="${locale}" />\n  <meta property="og:locale:alternate" content="${altLocale}" />\n</head>`
    );
  }

  // Replace Twitter tags
  updated = updated.replace(
    /<meta\s+property="twitter:title"\s+content=".*?"\s*\/?>/i,
    `<meta property="twitter:title" content="${meta.title}" />`
  );

  updated = updated.replace(
    /<meta\s+property="twitter:description"\s+content=".*?"\s*\/?>/i,
    `<meta property="twitter:description" content="${meta.description}" />`
  );

  updated = updated.replace(
    /<meta\s+property="twitter:url"\s+content=".*?"\s*\/?>/i,
    `<meta property="twitter:url" content="${meta.canonicalUrl}" />`
  );

  updated = updated.replace(
    /<meta\s+property="twitter:image"\s+content=".*?"\s*\/?>/i,
    `<meta property="twitter:image" content="${meta.ogImage}" />`
  );

  return updated;
}
