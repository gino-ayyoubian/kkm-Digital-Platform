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

function baseWebPageSchema(name: string, description: string, url: string, type = 'WebPage') {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url,
  };
}

/**
 * Route-aware SEO layer for React Router.
 * Mirrors the SEO property derivation previously embedded in App.tsx.
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
    // News article deep link
    if (newsSlug || (currentPage === Page.News && location.pathname.startsWith('/news/'))) {
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

    // Search results — noindex
    if (currentPage === Page.SearchResults || location.pathname === '/search') {
      const q = searchQuery;
      const canonicalUrl = `${CANONICAL_HOST}/search?q=${encodeURIComponent(q)}`;
      const description = `Deep intelligence search results for "${q}" across KKM proprietary technologies, patent filings, active projects, news, and technical publications.`;
      return {
        title: `Search Results: "${q}" | KKM Technical Index`,
        description,
        canonicalUrl,
        noindex: true,
        customSchema: {
          '@context': 'https://schema.org',
          '@type': 'SearchResultsPage',
          name: `Search Results: ${q}`,
          description,
          url: canonicalUrl,
        },
      };
    }

    // 404 — noindex, preserve attempted path
    if (currentPage === Page.NotFound) {
      const canonicalUrl = `${CANONICAL_HOST}${location.pathname}`;
      return {
        title: 'Page Not Found (404) | KKM International Group',
        description:
          'The requested resource could not be found within the KKM International Group digital ecosystem.',
        canonicalUrl,
        noindex: true,
      };
    }

    // Offline
    if (currentPage === Page.Offline) {
      return {
        title: 'Offline | KKM International Group',
        description: 'You appear to be offline. Cached KKM content may still be available.',
        canonicalUrl: `${CANONICAL_HOST}/offline`,
        noindex: true,
      };
    }

    // Key marketing / product pages with explicit copy (parity with legacy App.tsx)
    const pageSeo: Partial<Record<Page, Omit<SeoBundle, 'canonicalUrl' | 'noindex'> & { path?: string }>> = {
      [Page.Home]: {
        title: 'KKM International | Technology & Engineering',
        description:
          'Leading multi-disciplinary engineering group pioneering closed-loop geothermal systems (GMEL), water-energy nexus technologies, rural microgrids, and sustainable infrastructure.',
        customSchema: {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'KKM International Group',
          alternateName: 'Kimia Karan Mâd Private Joint Stock Company',
          url: CANONICAL_HOST,
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
        customSchema: baseWebPageSchema(
          'About KKM International Group',
          "Learn about KKM International Group's foundational engineering milestones, board leadership, and mission driving sustainable industrial transformation.",
          `${CANONICAL_HOST}/about`,
          'AboutPage'
        ),
      },
      [Page.Technology]: {
        title: 'Core Proprietary Technologies & Advanced Engineering | KKM',
        description:
          'Overview of KKM proprietary technology domains: closed-loop geothermal (GMEL), thermal desalination, water-energy nexus, and industrial IoT.',
        customSchema: baseWebPageSchema(
          'Core Proprietary Technologies & Advanced Engineering',
          'Overview of KKM proprietary technology domains: closed-loop geothermal (GMEL), thermal desalination, water-energy nexus, and industrial IoT.',
          `${CANONICAL_HOST}/technology`,
          'CollectionPage'
        ),
      },
      [Page.Projects]: {
        title: 'Global Projects, Pilot Testbeds & Regional Deployments | KKM',
        description:
          'Portfolio of active infrastructure projects, geothermal demonstration testbeds, desalination installations, and rural transformation programs.',
        customSchema: baseWebPageSchema(
          'Global Projects, Pilot Testbeds & Regional Deployments',
          'Portfolio of active infrastructure projects, geothermal demonstration testbeds, desalination installations, and rural transformation programs.',
          `${CANONICAL_HOST}/projects`,
          'CollectionPage'
        ),
      },
      [Page.Contact]: {
        title: 'Contact KKM International Group | Global Offices & Inquiries',
        description:
          'Connect with KKM International Group headquarters, engineering centers, and regional development desks for partnerships, pilots, and tenders.',
        customSchema: baseWebPageSchema(
          'Contact KKM International Group',
          'Connect with KKM International Group headquarters, engineering centers, and regional development desks for partnerships, pilots, and tenders.',
          `${CANONICAL_HOST}/contact`,
          'ContactPage'
        ),
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
      [Page.EvidenceRegistry]: {
        title: 'Evidence & Technical Verification Registry (Levels A-G) | KKM',
        description:
          'Transparent corporate evidence registry mapping performance metrics, geothermal engineering claims, patent filings, and lab testbeds to Level A-G audit files.',
      },
      [Page.ClaimRegistry]: {
        title: 'Performance, Technical & ESG Claims Registry (P0-13) | KKM',
        description:
          'Structured registry matrix managing all performance, technical, ESG, and intellectual property claims with verified, target, and estimate status classifications.',
      },
      [Page.Sustainability]: {
        title: 'Sustainability, ESG & Claim Governance (P0-13) | KKM International Group',
        description:
          'ESG dashboard and claim governance framework aligned to KKM P0-13 standards for transparent performance reporting.',
      },
      [Page.InvestmentPortal]: {
        title: 'Investment Portal | Partner with KKM International Group',
        description:
          'Investment and partnership pathways for geothermal pilots, infrastructure platforms, and technology licensing with KKM International Group.',
      },
      [Page.GMELHub]: {
        title: 'GMEL Hub | Closed-Loop Geothermal Multi-Energy Layer',
        description:
          'Explore the GMEL closed-loop geothermal ecosystem — proprietary thermodynamic cycles, multi-energy integration, and field pilot architecture.',
      },
      [Page.DigitalTwinHub]: {
        title: 'Digital Twin Platform | KKM International Group',
        description:
          'Digital twin capabilities for geothermal systems, river energy ecosystems, and industrial infrastructure operations.',
      },
      [Page.News]: {
        title: 'News & Insights | KKM International Group',
        description:
          'Official news, technical briefings, and insights from KKM International Group across energy, water, and infrastructure programs.',
      },
    };

    const specific = pageSeo[currentPage];
    const canonicalPath = pageToPath(currentPage);
    const canonicalUrl = `${CANONICAL_HOST}${canonicalPath === '/' ? '/' : canonicalPath}`;

    if (specific) {
      return {
        title: specific.title,
        description: specific.description,
        canonicalUrl,
        noindex: false,
        customSchema:
          specific.customSchema ??
          baseWebPageSchema(specific.title, specific.description, canonicalUrl),
      };
    }

    // Default: translated page name
    const pageName = t(currentPage as TranslationKey) || currentPage;
    const title = `${pageName} | KKM International Group`;
    const description =
      'Technology. Engineering. Infrastructure. Innovation. From Evidence to Technology, Projects, and Scalable Impact.';

    return {
      title,
      description,
      canonicalUrl,
      noindex: false,
      customSchema: baseWebPageSchema(title, description, canonicalUrl),
    };
  }, [currentPage, location.pathname, newsSlug, searchQuery, t]);

  // Analytics + scroll restoration on route change
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
