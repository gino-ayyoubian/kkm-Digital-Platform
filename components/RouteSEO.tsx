import React, { useEffect, useMemo } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router';
import SEOHead from './SEOHead';
import { useLanguage } from '../LanguageContext';
import { Page } from '../types';
import type { TranslationKey } from '../translations';
import { pathToPage, pageToPath, CANONICAL_HOST } from '../lib/routes';
import { findArticleBySlug, getArticleSlug } from '../lib/news';
import { trackPageView } from '../lib/analytics';

type SeoBundle = {
  title: string;
  description: string;
  canonicalUrl: string;
  noindex: boolean;
  type?: string;
  customSchema?: Record<string, unknown>;
  articleData?: {
    publishedTime: string;
    modifiedTime: string;
    author: string;
    section: string;
  };
};

function schema(
  type: string,
  name: string,
  description: string,
  url: string,
  extra?: Record<string, unknown>
) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url,
    ...extra,
  };
}

/** Explicit SEO copy keyed by Page enum — parity with legacy App.tsx */
const PAGE_SEO: Partial<
  Record<
    Page,
    {
      title: string;
      description: string;
      schemaType?: string;
      schemaName?: string;
      extra?: Record<string, unknown>;
    }
  >
> = {
  [Page.Home]: {
    title: 'KKM International | Technology & Engineering',
    description:
      'Leading multi-disciplinary engineering group pioneering closed-loop geothermal systems (GMEL), water-energy nexus technologies, rural microgrids, and sustainable infrastructure.',
    schemaType: 'Organization',
    schemaName: 'KKM International Group',
    extra: {
      alternateName: 'Kimia Karan Mâd Private Joint Stock Company',
      logo: 'https://www.kkm-intl.org/og-image.png',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+98 21 9103 0830',
        contactType: 'customer service',
      },
    },
  },
  [Page.AboutUs]: {
    title: 'About KKM International Group | History, Leadership & Vision',
    description:
      "Learn about KKM International Group's foundational engineering milestones, board leadership, and mission driving sustainable industrial transformation.",
    schemaType: 'AboutPage',
  },
  [Page.Technology]: {
    title: 'Core Proprietary Technologies & Advanced Engineering | KKM',
    description:
      'Overview of KKM proprietary technology domains: closed-loop geothermal (GMEL), thermal desalination, water-energy nexus, and industrial IoT.',
    schemaType: 'CollectionPage',
  },
  [Page.Projects]: {
    title: 'Global Projects, Pilot Testbeds & Regional Deployments | KKM',
    description:
      'Portfolio of active infrastructure projects, geothermal demonstration testbeds, desalination installations, and rural transformation programs.',
    schemaType: 'CollectionPage',
  },
  [Page.News]: {
    title: 'News, Field Milestones & Technical Whitepapers | KKM',
    description:
      'Latest corporate announcements, field project milestones, technology licensing developments, and media briefings from KKM International Group.',
    schemaType: 'CollectionPage',
  },
  [Page.Contact]: {
    title: 'Contact KKM International Group | Global Offices & Inquiries',
    description:
      'Connect with KKM International Group headquarters, engineering centers, and regional development desks for partnerships, pilots, and tenders.',
    schemaType: 'ContactPage',
  },
  [Page.Careers]: {
    title: 'Careers, Engineering Fellowships & Talent Operations | KKM International Group',
    description:
      'Explore high-impact career opportunities in geothermal engineering, thermodynamic cycles, smart grid modeling, and international infrastructure.',
  },
  [Page.RuralStudies]: {
    title: 'Rural & Nomadic Territorial Development Platform | KKM International Group',
    description:
      'Integrated rural development platform engineering the energy-water-infrastructure nexus, modular mini-grids, and local value creation across 25 priority arid villages.',
  },
  [Page.Exhibition]: {
    title: 'Rural & Nomadic Development Exhibition 1405 | KKM International Group',
    description:
      "Official national exhibition portal showcasing KKM's signature architecture for decentralized rural utilities, Energy Villages, and pilot partnerships.",
    schemaType: 'Event',
    schemaName: 'Rural & Nomadic Integrated Development Exhibition 1405',
  },
  [Page.EvidenceRegistry]: {
    title: 'Evidence & Technical Verification Registry (Levels A-G) | KKM',
    description:
      'Transparent corporate evidence registry mapping performance metrics, geothermal engineering claims, patent filings, and lab testbeds to Level A-G audit files.',
    schemaType: 'ItemPage',
    schemaName: 'KKM Evidence & Technical Verification Registry',
  },
  [Page.ClaimRegistry]: {
    title: 'Performance, Technical & ESG Claims Registry (P0-13) | KKM',
    description:
      'Structured registry matrix managing all performance, technical, ESG, and intellectual property claims with verified, target, and estimate status classifications.',
    schemaType: 'DataCatalog',
    schemaName: 'KKM Performance, Technical & ESG Claims Registry',
  },
  [Page.Sustainability]: {
    title: 'Sustainability, ESG & Claim Governance (P0-13) | KKM International Group',
    description:
      'Corporate sustainability reporting and claim governance registry formalizing Verified, Internal, Estimated, and Demonstration data across KKM operations.',
    schemaName: 'Sustainability & ESG Governance',
  },
  [Page.InvestmentPortal]: {
    title: 'Infrastructure Investment & Strategic Co-Development | KKM',
    description:
      'Institutional investor portal providing capital allocation structures, IRR scenarios, and project financing frameworks for closed-loop geothermal infrastructure.',
  },
  [Page.PilotRequest]: {
    title: 'Pilot Testbed & Industrial Deployment Application | KKM',
    description:
      'Request commercial pilot deployment for GMEL closed-loop geothermal retrofit, heat recovery, or rural multi-utility microgrids.',
  },
  [Page.ProjectDevelopment]: {
    title: 'Subsurface & Geothermal Project Development Pipeline | KKM',
    description:
      'End-to-end EPCM project development methodology covering subsurface geological appraisal, thermodynamic cycle engineering, and facility delivery.',
  },
  [Page.IPCenter]: {
    title: 'Intellectual Property, Patents & Technology Assets | KKM',
    description:
      'Proprietary IP portfolio covering GMEL closed-loop well architecture, supercritical heat transfer fluids, and sonic casing vibration tools.',
    schemaType: 'CollectionPage',
  },
  [Page.InnovationHub]: {
    title: 'Innovation Hub | Cross-Disciplinary Technology Development | KKM',
    description:
      'KKM Innovation Hub accelerating cross-disciplinary R&D across geothermal systems, water cycles, digital twins, and industrial AI.',
    schemaType: 'CollectionPage',
  },
  [Page.CorporateInfo]: {
    title: 'Corporate Identity, Legal Registration & Governance | KKM',
    description:
      'Kimia Karan Mâd Private Joint Stock Company legal registration, official gazette disclosures, leadership structure, and bank certifications.',
    schemaType: 'AboutPage',
  },
  [Page.GMELHub]: {
    title: 'GeoMeta Energy Layer (GMEL) Technology Ecosystem | KKM',
    description:
      'Comprehensive engineering overview of the GMEL ecosystem uniting closed-loop heat extraction, thermodynamic ORC cycles, and industrial AI digital twins.',
  },
  [Page.Downloads]: {
    title: 'Technical Whitepapers, Dossiers & Specifications | KKM',
    description:
      'Official repository of downloadable engineering whitepapers, GMEL technical dossiers, exhibition catalogs, and verified Level A-G audit summaries.',
    schemaType: 'CollectionPage',
  },
  [Page.DigitalTwinHub]: {
    title: 'Digital Twin Platform & Subsurface Telemetry Hub | KKM',
    description:
      'Next-generation enterprise digital twin platform for thermodynamic simulation, geothermal well telemetry, and real-time sustainability optimization.',
  },
  [Page.DigitalTwinREE]: {
    title:
      'KKM-REE River Energy Ecosystem | Patented Inventions & Digital Twin | Gino Ayyoubain',
    description:
      'Modular & adaptive vortex-hydrokinetic river energy conversion system invented by Gino Ayyoubain. Interactive 3-regime CFD digital twin, self-cleaning sediment apparatus, and AI MPC control.',
    schemaType: 'TechArticle',
  },
  [Page.CarbonCredit]: {
    title: 'Carbon Credits, Decarbonization & Offset Pipeline | KKM',
    description:
      'Verified greenhouse gas emissions reduction certificates and high-integrity carbon credits generated by KKM clean energy and geothermal assets.',
    schemaType: 'ItemPage',
  },
  [Page.Legal]: {
    title: 'Legal Notice, Privacy Policy & Compliance Standards | KKM',
    description:
      'Official legal statements, data privacy protocols, corporate compliance charters, and regulatory disclosures of KKM International Group.',
  },
  [Page.Futures]: {
    title: 'Strategic Futures & Long-Range Foresight | KKM International Group',
    description:
      'Multi-decade technological forecasting, energy transition roadmaps, and planetary resource resilience models developed by KKM Research.',
  },
  [Page.Team]: {
    title: 'Leadership, Board & Executive Team | KKM International Group',
    description:
      'Meet the board, executive leadership, and technical directors guiding KKM International Group engineering and technology programs.',
    schemaType: 'AboutPage',
  },
  [Page.FAQ]: {
    title: 'Frequently Asked Questions | KKM International Group',
    description:
      'Answers to common questions about KKM technologies, pilot programs, partnership pathways, and corporate operations.',
    schemaType: 'FAQPage',
  },
  [Page.Divisions]: {
    title: 'Business Divisions & Operating Units | KKM International Group',
    description:
      'Overview of KKM business divisions spanning energy systems, water infrastructure, rural development platforms, and digital technology units.',
    schemaType: 'CollectionPage',
  },
  [Page.InternalPortal]: {
    title: 'Internal Staff Portal | KKM International Group',
    description: 'Secure internal portal for KKM personnel, project operations, and organizational tools.',
  },
  [Page.Offline]: {
    title: 'Offline Mode | KKM International Group',
    description:
      'You are currently viewing cached content in offline mode. Reconnect to access live telemetry and network data.',
  },
};

/**
 * Route-aware SEO layer for React Router.
 * Mirrors SEO property derivation previously embedded in App.tsx.
 */
const RouteSEO: React.FC = () => {
  const location = useLocation();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const { t } = useLanguage();

  const currentPage = pathToPage(location.pathname);
  const newsSlug = params.slug;
  const searchQuery = searchParams.get('q') ?? '';

  const seo = useMemo<SeoBundle>(() => {
    // --- News article deep link ---
    if (newsSlug || (location.pathname.startsWith('/news/') && location.pathname !== '/news')) {
      const slug = newsSlug || location.pathname.replace(/^\/news\//, '');
      const article = findArticleBySlug(slug);
      if (article) {
        const articleSlug = getArticleSlug(article.title);
        const canonicalUrl = `${CANONICAL_HOST}/news/${articleSlug}`;
        return {
          title: `${article.title} | KKM News`,
          description: article.excerpt,
          canonicalUrl,
          noindex: false,
          type: 'article',
          customSchema: {
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: article.title,
            datePublished: article.date,
            description: article.excerpt,
            author: {
              '@type': 'Organization',
              name: 'KKM International Group',
            },
            publisher: {
              '@type': 'Organization',
              name: 'KKM International Group',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.kkm-intl.org/og-image.png',
              },
            },
          },
          articleData: {
            publishedTime: article.date,
            modifiedTime: article.date,
            author: 'KKM International Group',
            section: article.category,
          },
        };
      }
    }

    // --- Search results (noindex) ---
    if (currentPage === Page.SearchResults || location.pathname === '/search') {
      const q = searchQuery;
      const canonicalUrl = `${CANONICAL_HOST}/search?q=${encodeURIComponent(q)}`;
      const description = `Deep intelligence search results for "${q}" across KKM proprietary technologies, patent filings, active projects, news, and technical publications.`;
      return {
        title: `Search Results: "${q}" | KKM Technical Index`,
        description,
        canonicalUrl,
        noindex: true,
        customSchema: schema('SearchResultsPage', `Search Results: ${q}`, description, canonicalUrl),
      };
    }

    // --- 404 (noindex, preserve path) ---
    if (currentPage === Page.NotFound) {
      return {
        title: 'Page Not Found (404) | KKM International Group',
        description:
          'The requested resource could not be found within the KKM International Group digital ecosystem.',
        canonicalUrl: `${CANONICAL_HOST}${location.pathname}`,
        noindex: true,
      };
    }

    // --- Explicit page map ---
    const specific = PAGE_SEO[currentPage];
    const canonicalPath = pageToPath(currentPage);
    const canonicalUrl = `${CANONICAL_HOST}${canonicalPath === '/' ? '/' : canonicalPath}`;

    if (specific) {
      const noindex =
        currentPage === Page.Offline ||
        currentPage === Page.InternalPortal;

      const schemaType = specific.schemaType ?? 'WebPage';
      const schemaName = specific.schemaName ?? specific.title;

      return {
        title: specific.title,
        description: specific.description,
        canonicalUrl,
        noindex,
        customSchema: schema(
          schemaType,
          schemaName,
          specific.description,
          canonicalUrl,
          specific.extra
        ),
      };
    }

    // --- Default fallback ---
    const pageName = t(currentPage as TranslationKey) || currentPage;
    const title = `${pageName} | KKM International Group`;
    const description =
      'Technology. Engineering. Infrastructure. Innovation. From Evidence to Technology, Projects, and Scalable Impact.';

    return {
      title,
      description,
      canonicalUrl,
      noindex: false,
      customSchema: schema('WebPage', title, description, canonicalUrl),
    };
  }, [currentPage, location.pathname, newsSlug, searchQuery, t]);

  useEffect(() => {
    trackPageView(currentPage, window.location.href);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname, location.search, currentPage]);

  return (
    <SEOHead
      title={seo.title}
      description={seo.description}
      url={seo.canonicalUrl}
      noindex={seo.noindex}
      type={seo.type}
      customSchema={seo.customSchema}
      articleData={seo.articleData}
    />
  );
};

export default RouteSEO;
