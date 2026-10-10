
import React, { Component } from 'react';
import { Page } from './types';
import type { NewsItem, GeminiSearchResult } from './types';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import Header from './components/Header';
import Footer from './components/Footer';
import SEOHead from './components/SEOHead';
import { useLanguage } from './LanguageContext';
import BackToTopButton from './components/BackToTopButton';
import A11yDebugOverlay from './components/A11yDebugOverlay';
import { CEOSignatureBanner } from './components/CEOSignatureBanner';
import type { TranslationKey } from './translations';
import { performDeepSearch } from './searchEngine';
import SkipToContent from './components/SkipToContent';
import { trackLazyLoad } from './trackLazyLoad';
import { trackPageView, parseUTMParams } from './lib/analytics';
import { Analytics } from '@vercel/analytics/react';

import HomePage from './pages/HomePage';
import { pathToPage, pageToPath, CANONICAL_HOST } from './lib/routes';
import { findArticleBySlug, getArticleSlug, getArticleSlugFromPath } from './lib/news';
import { PageTemplateSkeleton } from './components/ShimmerSkeleton';
// Lazy load specialized portal and secondary tools wrapped with Firebase Perf tracing

const ExhibitionPage = React.lazy(trackLazyLoad('ExhibitionPage', () => import('./pages/ExhibitionPage')));
const DownloadsPage = React.lazy(trackLazyLoad('DownloadsPage', () => import('./pages/DownloadsPage')));
const AboutUsPage = React.lazy(trackLazyLoad('AboutUsPage', () => import('./pages/AboutUsPage')));
const CoreTechnologiesPage = React.lazy(trackLazyLoad('CoreTechnologiesPage', () => import('./pages/CoreTechnologiesPage')));
const ProjectsPage = React.lazy(trackLazyLoad('ProjectsPage', () => import('./pages/ProjectsPage')));
const NewsPage = React.lazy(trackLazyLoad('NewsPage', () => import('./pages/NewsPage')));
const NewsArticlePage = React.lazy(trackLazyLoad('NewsArticlePage', () => import('./pages/NewsArticlePage')));
const ContactPage = React.lazy(trackLazyLoad('ContactPage', () => import('./pages/ContactPage')));
const EvidenceRegistryPage = React.lazy(trackLazyLoad('EvidenceRegistryPage', () => import('./pages/EvidenceRegistryPage')));
const RuralDevelopmentPage = React.lazy(trackLazyLoad('RuralDevelopmentPage', () => import('./pages/RuralDevelopmentPage')));
const NotFoundPage = React.lazy(trackLazyLoad('NotFoundPage', () => import('./pages/NotFoundPage')));
const ClaimRegistryPage = React.lazy(trackLazyLoad('ClaimRegistryPage', () => import('./pages/ClaimRegistryPage')));
const ESGDashboard = React.lazy(trackLazyLoad('ESGDashboard', () => import('./components/ESGDashboard')));
const InvestmentPortalPage = React.lazy(trackLazyLoad('InvestmentPortalPage', () => import('./pages/InvestmentPortalPage')));
const PilotRequestPage = React.lazy(trackLazyLoad('PilotRequestPage', () => import('./pages/PilotRequestPage')));
const ProjectDevelopmentPage = React.lazy(trackLazyLoad('ProjectDevelopmentPage', () => import('./pages/ProjectDevelopmentPage')));
const GMELHubPage = React.lazy(trackLazyLoad('GMELHubPage', () => import('./pages/GMELHubPage')));
const CorporateInfoPage = React.lazy(trackLazyLoad('CorporateInfoPage', () => import('./pages/CorporateInfoPage')));
const IPCenterPage = React.lazy(trackLazyLoad('IPCenterPage', () => import('./pages/IPCenterPage')));
const TechnologyTemplatePage = React.lazy(trackLazyLoad('TechnologyTemplatePage', () => import('./pages/TechnologyTemplatePage')));
const ProjectTemplatePage = React.lazy(trackLazyLoad('ProjectTemplatePage', () => import('./pages/ProjectTemplatePage')));
const InnovationHubPage = React.lazy(trackLazyLoad('InnovationHubPage', () => import('./pages/InnovationHubPage')));
const CarbonCreditPage = React.lazy(trackLazyLoad('CarbonCreditPage', () => import('./pages/CarbonCreditPage')));
const ComingSoonPage = React.lazy(trackLazyLoad('ComingSoonPage', () => import('./pages/ComingSoonPage')));
const LegalPage = React.lazy(trackLazyLoad('LegalPage', () => import('./pages/LegalPage')));
const SearchResultsPage = React.lazy(trackLazyLoad('SearchResultsPage', () => import('./pages/SearchResultsPage')));
const FuturesPage = React.lazy(trackLazyLoad('FuturesPage', () => import('./pages/FuturesPage')));
const DigitalTwinHubPage = React.lazy(trackLazyLoad('DigitalTwinHubPage', () => import('./pages/DigitalTwinHubPage')));
const GMELTwinPage = React.lazy(trackLazyLoad('GMELTwinPage', () => import('./pages/DigitalTwinPage')));
const REETwinPage = React.lazy(trackLazyLoad('REETwinPage', () => import('./pages/REETwinPage')));
const CareersPage = React.lazy(trackLazyLoad('CareersPage', () => import('./pages/CareersPage')));
const TeamPage = React.lazy(trackLazyLoad('TeamPage', () => import('./pages/TeamPage')));
const FAQPage = React.lazy(trackLazyLoad('FAQPage', () => import('./pages/FAQPage')));
const DivisionsPage = React.lazy(trackLazyLoad('DivisionsPage', () => import('./pages/DivisionsPage')));
const InternalPortalPage = React.lazy(trackLazyLoad('InternalPortalPage', () => import('./pages/InternalPortalPage')));
const GoogleKeepPage = React.lazy(trackLazyLoad('GoogleKeepPage', () => import('./pages/GoogleKeepPage')));
const OfflinePage = React.lazy(trackLazyLoad('OfflinePage', () => import('./pages/OfflinePage')));
import CookieConsent from './components/CookieConsent';
import { KKMAlgorithmicAdvisorModal } from './components/KKMAlgorithmicAdvisorModal';
import { Sparkles } from 'lucide-react';

interface PageErrorBoundaryProps {
  children?: React.ReactNode;
}

interface PageErrorBoundaryState {
  hasError: boolean;
  isChunkError: boolean;
  countdown: number;
}

// Error Boundary to catch lazy loading chunk errors and auto-recover
class PageErrorBoundary extends Component<PageErrorBoundaryProps, PageErrorBoundaryState> {
  private timer: any = null;

  constructor(props: PageErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, isChunkError: false, countdown: 4 };
  }

  static getDerivedStateFromError(error: any) {
    const errorMsg = String(error?.message || error || '').toLowerCase();
    const isChunk =
      errorMsg.includes('importing a module script failed') ||
      errorMsg.includes('failed to fetch dynamically imported module') ||
      errorMsg.includes('error loading dynamically imported module') ||
      errorMsg.includes('mime type') ||
      errorMsg.includes('text/html') ||
      error?.name === 'TypeError';
    return { hasError: true, isChunkError: isChunk, countdown: 4 };
  }

  componentDidCatch(error: any, errorInfo: any) {
    const errorMsg = String(error?.message || error || '').toLowerCase();
    const isChunk =
      errorMsg.includes('importing a module script failed') ||
      errorMsg.includes('failed to fetch dynamically imported module') ||
      errorMsg.includes('error loading dynamically imported module') ||
      errorMsg.includes('mime type') ||
      errorMsg.includes('text/html') ||
      error?.name === 'TypeError';

    if (isChunk) {
      console.warn("Module synchronization:", error?.message || error);
    } else {
      console.error("Page Loading Error caught by boundary:", error, errorInfo);
    }

    if (isChunk && typeof window !== 'undefined') {
      try {
        const reloadKey = 'kkm_boundary_reload_ts';
        const lastReload = window.sessionStorage.getItem(reloadKey);
        const now = Date.now();
        // If haven't reloaded in the last 15 seconds, automatically reload immediately
        if (!lastReload || now - parseInt(lastReload, 10) > 15000) {
          window.sessionStorage.setItem(reloadKey, String(now));
          window.location.reload();
          return;
        }
      } catch (_) {}
    }

    // Auto-countdown to retry reload
    this.timer = setInterval(() => {
      this.setState((prev) => {
        if (prev.countdown <= 1) {
          clearInterval(this.timer);
          window.location.reload();
          return { ...prev, countdown: 0 };
        }
        return { ...prev, countdown: prev.countdown - 1 };
      });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  handleRetry = () => {
    if (this.timer) clearInterval(this.timer);
    this.setState({ hasError: false });
    window.location.reload();
  };

  handleGoHome = () => {
    if (this.timer) clearInterval(this.timer);
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-12 bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 dark:bg-amber-400/10 flex items-center justify-center mb-6 border border-amber-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-800 dark:text-gray-100 mb-2">
            {this.state.isChunkError ? "Updating Interface Modules" : "Interface Refresh Needed"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-3 max-w-md leading-relaxed text-sm md:text-base">
            {this.state.isChunkError
              ? "A module update was detected. The interface is refreshing to synchronize latest application assets."
              : "We encountered a temporary module loading interruption."}
          </p>
          <p className="text-xs font-mono text-primary font-bold mb-6">
            Auto-refreshing in {this.state.countdown}s...
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button 
              onClick={this.handleRetry}
              className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-secondary transition-all shadow-md active:scale-95"
            >
              Refresh Interface Now
            </button>
            <button 
              onClick={this.handleGoHome}
              className="px-6 py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm font-bold rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700 transition-all shadow-sm"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const PageSkeleton = () => <PageTemplateSkeleton template="standard" />;

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState<Page>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const legacyPage = params.get('page');
      if (legacyPage) {
        const found = Object.values(Page).find(p => p.replace(/\s/g, '').toLowerCase() === legacyPage.toLowerCase());
        if (found) return found;
      }
      return pathToPage(window.location.pathname);
    }
    return Page.Home;
  });

  React.useEffect(() => {
    trackPageView(currentPage, window.location.href);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [currentPage]);

  React.useEffect(() => {
    parseUTMParams(); // Parse and store UTMs on load
  }, []);

  // Listen for Vite chunk load failure and auto-recover
  React.useEffect(() => {
    const handlePreloadError = (event: any) => {
      event.preventDefault();
      try {
        const reloadKey = 'kkm_vite_preload_ts';
        const lastReload = window.sessionStorage.getItem(reloadKey);
        const now = Date.now();
        if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
          window.sessionStorage.setItem(reloadKey, String(now));
          window.location.reload();
        }
      } catch (_) {
        window.location.reload();
      }
    };

    window.addEventListener('vite:preloadError', handlePreloadError);
    return () => window.removeEventListener('vite:preloadError', handlePreloadError);
  }, []);

  const [selectedArticle, setSelectedArticle] = React.useState<NewsItem | null>(() => {
    if (typeof window === 'undefined') return null;
    return findArticleBySlug(getArticleSlugFromPath(window.location.pathname));
  });
  const [searchResults, setSearchResults] = React.useState<GeminiSearchResult | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isAdvisorOpen, setIsAdvisorOpen] = React.useState(false);
  const [isOnline, setIsOnline] = React.useState<boolean>(() => typeof navigator !== 'undefined' ? navigator.onLine : true);
  const { direction, language, t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  // Offline / Online network detection
  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // --- CANONICAL REAL PATH ROUTING (WEB-01) ---
  
  // 1. Synchronize URL pathname on Page state changes
  React.useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      const targetPath =
        currentPage === Page.News && selectedArticle
          ? `/news/${getArticleSlug(selectedArticle.title)}`
          : pageToPath(currentPage);
      
      // If we are at a 404, do not overwrite the unknown URL so the user/audit can see what was entered
      if (currentPage === Page.NotFound) return;

      const currentPath = window.location.pathname;
      const hasLegacyQuery = window.location.search.includes('page=');

      if (currentPath !== targetPath || hasLegacyQuery) {
        window.history.pushState({ page: currentPage }, '', targetPath);
      }
      window.scrollTo(0, 0);
    } catch (e) {
      console.warn("History API interaction failed:", e);
    }
  }, [currentPage]);

  // 2. Handle Browser Back/Forward Navigation
  React.useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      try {
        if (event.state && event.state.page) {
          const article = event.state.page === Page.News
            ? findArticleBySlug(getArticleSlugFromPath(window.location.pathname))
            : null;
          setSelectedArticle(article);
          setCurrentPage(event.state.page);
        } else {
          const resolvedPage = pathToPage(window.location.pathname);
          const article = resolvedPage === Page.News
            ? findArticleBySlug(getArticleSlugFromPath(window.location.pathname))
            : null;
          setSelectedArticle(article);
          setCurrentPage(resolvedPage);
        }
      } catch (e) {
        console.warn("Popstate navigation resolution failed:", e);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // -----------------------------

  // Determine SEO Properties based on state
  let title = 'KKM International Group';
  let description = 'Technology. Engineering. Infrastructure. Innovation.';
  let canonicalUrl = `${CANONICAL_HOST}${pageToPath(currentPage)}`;
  let noindex = false;
  let jsonLdSchema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "KKM International Group",
    "url": CANONICAL_HOST
  };

  if (currentPage === Page.News && selectedArticle) {
     title = `${selectedArticle.title} | KKM News`;
     description = selectedArticle.excerpt;
     const articleSlug = getArticleSlug(selectedArticle.title);
     canonicalUrl = `${CANONICAL_HOST}/news/${articleSlug}`;
     jsonLdSchema = {
       "@context": "https://schema.org",
       "@type": "NewsArticle",
       "headline": selectedArticle.title,
       "datePublished": selectedArticle.date,
       "description": selectedArticle.excerpt,
       "author": {
         "@type": "Organization",
         "name": "KKM International Group"
       },
       "publisher": {
         "@type": "Organization",
         "name": "KKM International Group",
         "logo": {
           "@type": "ImageObject",
           "url": "https://www.kkm-intl.org/og-image.png"
         }
       }
     };
  } else if (currentPage === Page.SearchResults) {
     title = `Search Results: "${searchQuery}" | KKM Technical Index`;
     description = `Deep intelligence search results for "${searchQuery}" across KKM proprietary technologies, patent filings, active projects, news, and technical publications.`;
     canonicalUrl = `${CANONICAL_HOST}/search?q=${encodeURIComponent(searchQuery)}`;
     noindex = true;
     jsonLdSchema = {
       "@context": "https://schema.org",
       "@type": "SearchResultsPage",
       "name": `Search Results: ${searchQuery}`,
       "description": description,
       "url": canonicalUrl
     };
  } else if (currentPage === Page.NotFound) {
     title = 'Page Not Found (404) | KKM International Group';
     description = 'The requested resource could not be found within the KKM International Group digital ecosystem.';
     canonicalUrl = typeof window !== 'undefined' ? `${CANONICAL_HOST}${window.location.pathname}` : `${CANONICAL_HOST}/404`;
     noindex = true;
  } else {
     const pageName = t(currentPage as TranslationKey) || currentPage;
     title = `${pageName} | KKM International Group`;
     
     if (currentPage === Page.Home) {
         title = "KKM International | Technology & Engineering";
         description = 'Leading multi-disciplinary engineering group pioneering closed-loop geothermal systems (GMEL), water-energy nexus technologies, rural microgrids, and sustainable infrastructure.';
         canonicalUrl = `${CANONICAL_HOST}/`;
         jsonLdSchema = {
           "@context": "https://schema.org",
           "@type": "Organization",
           "name": "KKM International Group",
           "alternateName": "Kimia Karan Mâd Private Joint Stock Company",
           "url": CANONICAL_HOST,
           "logo": "https://www.kkm-intl.org/og-image.png",
           "contactPoint": {
             "@type": "ContactPoint",
             "telephone": "+98 21 9103 0830",
             "contactType": "customer service"
           }
         };
     } else if (currentPage === Page.Careers) {
         title = "Careers, Engineering Fellowships & Talent Operations | KKM International Group";
         description = 'Explore high-impact career opportunities in geothermal engineering, thermodynamic cycles, smart grid modeling, and international infrastructure.';
         canonicalUrl = `${CANONICAL_HOST}/careers`;
         jsonLdSchema = {
           "@context": "https://schema.org",
           "@type": "WebPage",
           "name": title,
           "description": description,
           "url": canonicalUrl
         };
     } else if (currentPage === Page.Projects) {
         title = "Global Projects, Pilot Testbeds & Regional Deployments | KKM";
         description = 'Portfolio of active infrastructure projects, geothermal demonstration testbeds, desalination installations, and rural transformation programs.';
         canonicalUrl = `${CANONICAL_HOST}/projects`;
         jsonLdSchema = {
           "@context": "https://schema.org",
           "@type": "CollectionPage",
           "name": title,
           "description": description,
           "url": canonicalUrl
         };
     } else if (currentPage === Page.CoreTechnologies) {
         title = "Core Proprietary Technologies & Advanced Engineering | KKM";
         description = 'Overview of KKM proprietary technology domains: closed-loop geothermal (GMEL), thermal desalination, water-energy nexus, and industrial IoT.';
         canonicalUrl = `${CANONICAL_HOST}/technology`;
         jsonLdSchema = {
           "@context": "https://schema.org",
           "@type": "CollectionPage",
           "name": title,
           "description": description,
           "url": canonicalUrl
         };
     } else if (currentPage === Page.Contact) {
         title = "Contact KKM International Group | Global Offices & Inquiries";
         description = 'Connect with KKM International Group headquarters, engineering centers, and regional development desks for partnerships, pilots, and tenders.';
         canonicalUrl = `${CANONICAL_HOST}/contact`;
         jsonLdSchema = {
           "@context": "https://schema.org",
           "@type": "ContactPage",
           "name": title,
           "description": description,
           "url": canonicalUrl
         };
     } else if (currentPage === Page.AboutUs) {
         title = "About KKM International Group | History, Leadership & Vision";
         description = 'Learn about KKM International Group\'s foundational engineering milestones, board leadership, and mission driving sustainable industrial transformation.';
         canonicalUrl = `${CANONICAL_HOST}/about`;
         jsonLdSchema = {
           "@context": "https://schema.org",
           "@type": "AboutPage",
           "name": title,
           "description": description,
           "url": canonicalUrl
         };
     } else if (currentPage === Page.RuralStudies) {
         title = "Rural & Nomadic Territorial Development Platform | KKM International Group";
         description = "Integrated rural development platform engineering the energy-water-infrastructure nexus, modular mini-grids, and local value creation across 25 priority arid villages.";
         canonicalUrl = `${CANONICAL_HOST}/rural-development`;
         jsonLdSchema = {
           "@context": "https://schema.org",
           "@type": "WebPage",
           "name": "Rural & Nomadic Territorial Development Platform",
           "description": description,
           "url": canonicalUrl
         };
     } else if (currentPage === Page.EvidenceRegistry) {
         title = "Evidence & Technical Verification Registry (Levels A-G) | KKM";
         description = "Transparent corporate evidence registry mapping performance metrics, geothermal engineering claims, patent filings, and lab testbeds to Level A-G audit files.";
         canonicalUrl = `${CANONICAL_HOST}/evidence-registry`;
         jsonLdSchema = {
           "@context": "https://schema.org",
           "@type": "ItemPage",
           "name": "KKM Evidence & Technical Verification Registry",
           "description": description,
           "url": canonicalUrl
         };
     } else if (currentPage === Page.ClaimRegistry) {
         title = "Performance, Technical & ESG Claims Registry (P0-13) | KKM";
         description = "Structured registry matrix managing all performance, technical, ESG, and intellectual property claims with verified, target, and estimate status classifications.";
         canonicalUrl = `${CANONICAL_HOST}/claims-registry`;
         jsonLdSchema = {
           "@context": "https://schema.org",
           "@type": "DataCatalog",
           "name": "KKM Performance, Technical & ESG Claims Registry",
           "description": description,
           "url": canonicalUrl
         };
     } else if (currentPage === Page.Sustainability) {
         title = "Sustainability, ESG & Claim Governance (P0-13) | KKM International Group";
         description = "Corporate sustainability reporting and claim governance registry formalizing Verified, Internal, Estimated, and Demonstration data across KKM operations.";
         canonicalUrl = `${CANONICAL_HOST}/sustainability`;
         jsonLdSchema = {
           "@context": "https://schema.org",
           "@type": "WebPage",
           "name": "Sustainability & ESG Governance",
           "description": description,
           "url": canonicalUrl
         };
     } else if (currentPage === Page.Exhibition) {
         title = "Rural & Nomadic Development Exhibition 1405 | KKM International Group";
         description = "Official national exhibition portal showcasing KKM's signature architecture for decentralized rural utilities, Energy Villages, and pilot partnerships.";
         canonicalUrl = `${CANONICAL_HOST}/exhibition/rural-1405`;
         jsonLdSchema = {
           "@context": "https://schema.org",
           "@type": "Event",
           "name": "Rural & Nomadic Integrated Development Exhibition 1405",
           "description": description,
           "url": canonicalUrl
         };
     } else if (currentPage === Page.InvestmentPortal || currentPage === Page.Invest) {
         title = "Infrastructure Investment & Strategic Co-Development | KKM";
         description = "Institutional investor portal providing capital allocation structures, IRR scenarios, and project financing frameworks for closed-loop geothermal infrastructure.";
         canonicalUrl = `${CANONICAL_HOST}/invest`;
         jsonLdSchema = {
           "@context": "https://schema.org",
           "@type": "WebPage",
           "name": title,
           "description": description,
           "url": canonicalUrl
         };
     } else if (currentPage === Page.PilotRequest) {
         title = "Pilot Testbed & Industrial Deployment Application | KKM";
         description = "Request commercial pilot deployment for GMEL closed-loop geothermal retrofit, heat recovery, or rural multi-utility microgrids.";
         canonicalUrl = `${CANONICAL_HOST}/pilot-request`;
         jsonLdSchema = {
           "@context": "https://schema.org",
           "@type": "WebPage",
           "name": title,
           "description": description,
           "url": canonicalUrl
         };
     } else if (currentPage === Page.ProjectDevelopment) {
         title = "Subsurface & Geothermal Project Development Pipeline | KKM";
         description = "End-to-end EPCM project development methodology covering subsurface geological appraisal, thermodynamic cycle engineering, and facility delivery.";
         canonicalUrl = `${CANONICAL_HOST}/project-development`;
         jsonLdSchema = {
           "@context": "https://schema.org",
           "@type": "WebPage",
           "name": title,
           "description": description,
           "url": canonicalUrl
         };
     } else if (currentPage === Page.IPCenter || currentPage === Page.IntellectualProperty || currentPage === Page.InnovationHub) {
         title = "Intellectual Property, Patents & Technology Assets | KKM";
         description = "Proprietary IP portfolio covering GMEL closed-loop well architecture, supercritical heat transfer fluids, and sonic casing vibration tools.";
         canonicalUrl = `${CANONICAL_HOST}/ip-center`;
         jsonLdSchema = {
           "@context": "https://schema.org",
           "@type": "CollectionPage",
           "name": title,
           "description": description,
           "url": canonicalUrl
         };
     } else if (currentPage === Page.CorporateInfo) {
         title = "Corporate Identity, Legal Registration & Governance | KKM";
         description = "Kimia Karan Mâd Private Joint Stock Company legal registration, official gazette disclosures, leadership structure, and bank certifications.";
         canonicalUrl = `${CANONICAL_HOST}/corporate-info`;
         jsonLdSchema = {
           "@context": "https://schema.org",
           "@type": "AboutPage",
           "name": title,
           "description": description,
           "url": canonicalUrl
         };
     } else if (currentPage === Page.GMELHub || currentPage === Page.Ecosystems || currentPage === Page.Technology) {
         title = "GeoMeta Energy Layer (GMEL) Technology Ecosystem | KKM";
         description = "Comprehensive engineering overview of the GMEL ecosystem uniting closed-loop heat extraction, thermodynamic ORC cycles, and industrial AI digital twins.";
         canonicalUrl = `${CANONICAL_HOST}/gmel`;
         jsonLdSchema = {
           "@context": "https://schema.org",
           "@type": "WebPage",
           "name": title,
           "description": description,
           "url": canonicalUrl
         };
     } else if (currentPage === Page.Downloads) {
         title = "Technical Whitepapers, Dossiers & Specifications | KKM";
         description = "Official repository of downloadable engineering whitepapers, GMEL technical dossiers, exhibition catalogs, and verified Level A-G audit summaries.";
         canonicalUrl = `${CANONICAL_HOST}/downloads`;
         jsonLdSchema = {
           "@context": "https://schema.org",
           "@type": "CollectionPage",
           "name": title,
           "description": description,
           "url": canonicalUrl
         };
     } else if (currentPage === Page.DigitalTwinREE) {
         title = "KKM-REE River Energy Ecosystem | Patented Inventions & Digital Twin | Gino Ayyoubain";
         description = "Modular & adaptive vortex-hydrokinetic river energy conversion system invented by Gino Ayyoubain (سید ژینو ایوبیان). Interactive 3-regime CFD digital twin, self-cleaning sediment apparatus, and AI MPC control.";
         canonicalUrl = `${CANONICAL_HOST}/ree`;
         jsonLdSchema = {
           "@context": "https://schema.org",
           "@type": "TechArticle",
           "name": title,
           "description": description,
           "url": canonicalUrl
         };
     } else if (currentPage === Page.DigitalTwinHub || currentPage === Page.DigitalTwinGMEL) {
         title = "Digital Twin Platform & Subsurface Telemetry Hub | KKM";
         description = "Next-generation enterprise digital twin platform for thermodynamic simulation, geothermal well telemetry, and real-time sustainability optimization.";
         canonicalUrl = `${CANONICAL_HOST}/digital-twins`;
         jsonLdSchema = {
           "@context": "https://schema.org",
           "@type": "WebPage",
           "name": title,
           "description": description,
           "url": canonicalUrl
         };
     } else if (currentPage === Page.CarbonCredit) {
         title = "Carbon Credits, Decarbonization & Offset Pipeline | KKM";
         description = "Verified greenhouse gas emissions reduction certificates and high-integrity carbon credits generated by KKM clean energy and geothermal assets.";
         canonicalUrl = `${CANONICAL_HOST}/carbon-credits`;
         jsonLdSchema = {
           "@context": "https://schema.org",
           "@type": "ItemPage",
           "name": title,
           "description": description,
           "url": canonicalUrl
         };
     } else if (currentPage === Page.Legal) {
         title = "Legal Notice, Privacy Policy & Compliance Standards | KKM";
         description = "Official legal statements, data privacy protocols, corporate compliance charters, and regulatory disclosures of KKM International Group.";
         canonicalUrl = `${CANONICAL_HOST}/legal`;
         jsonLdSchema = {
           "@context": "https://schema.org",
           "@type": "WebPage",
           "name": title,
           "description": description,
           "url": canonicalUrl
         };
     } else if (currentPage === Page.News || currentPage === Page.Insights) {
         title = "News, Field Milestones & Technical Whitepapers | KKM";
         description = "Latest corporate announcements, field project milestones, technology licensing developments, and media briefings from KKM International Group.";
         canonicalUrl = `${CANONICAL_HOST}/news`;
         jsonLdSchema = {
           "@context": "https://schema.org",
           "@type": "CollectionPage",
           "name": title,
           "description": description,
           "url": canonicalUrl
         };
     } else if (currentPage === Page.Offline) {
         title = "Offline Mode | KKM International Group";
         description = "You are currently viewing cached content in offline mode. Reconnect to access live telemetry and network data.";
         canonicalUrl = `${CANONICAL_HOST}/offline`;
         jsonLdSchema = {
           "@context": "https://schema.org",
           "@type": "WebPage",
           "name": title,
           "description": description,
           "url": canonicalUrl
         };
     } else if (currentPage === Page.Biomedical) {
         title = "Biomedical & Healthcare Innovation Hub | KKM International Group";
         description = "Advancing biomedical technologies, health informatics, and clinical engineering systems under KKM's cross-disciplinary innovation framework.";
         canonicalUrl = `${CANONICAL_HOST}/technology`;
         jsonLdSchema = {
           "@context": "https://schema.org",
           "@type": "WebPage",
           "name": title,
           "description": description,
           "url": canonicalUrl
         };
     } else if (currentPage === Page.SportsManagement) {
         title = "Sports Technology & Performance Infrastructure | KKM International Group";
         description = "Integrating performance analytics, biomechanical telemetry, and modern athletic infrastructure management.";
         canonicalUrl = `${CANONICAL_HOST}/technology`;
         jsonLdSchema = {
           "@context": "https://schema.org",
           "@type": "WebPage",
           "name": title,
           "description": description,
           "url": canonicalUrl
         };
     } else if (currentPage === Page.Futures) {
         title = "Strategic Futures & Long-Range Foresight | KKM International Group";
         description = "Multi-decade technological forecasting, energy transition roadmaps, and planetary resource resilience models developed by KKM Research.";
         canonicalUrl = `${CANONICAL_HOST}/futures`;
         jsonLdSchema = {
           "@context": "https://schema.org",
           "@type": "WebPage",
           "name": title,
           "description": description,
           "url": canonicalUrl
         };
     }
  }

  const handleSelectArticle = (article: NewsItem) => {
    setSelectedArticle(article);
    setCurrentPage(Page.News);
  };

  const handleBackToToNews = () => {
    setSelectedArticle(null);
    setCurrentPage(Page.News);
  };
  
  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    setSearchQuery(query);
    setCurrentPage(Page.SearchResults);
    setSearchResults(null);

    try {
      const result = await performDeepSearch(query, language);
      setSearchResults(result);
    } catch (error) {
      console.error("Error during enterprise deep search:", error);
      setSearchResults({
        summary: "Sorry, we couldn't complete your search at this moment. Please try again later.",
        sources: [],
        matchedItems: [],
        categories: [],
        totalMatchesCount: 0,
        sourceType: 'internal'
      });
    }
  };

  // Subtle 'fade and slide' animation variants for professional enterprise navigation
  const pageVariants = React.useMemo(() => {
    if (shouldReduceMotion) {
      return {
        initial: { opacity: 0 },
        in: { 
          opacity: 1, 
          transition: { duration: 0.2, ease: 'easeOut' as const } 
        },
        out: { 
          opacity: 0, 
          transition: { duration: 0.15, ease: 'easeIn' as const } 
        }
      };
    }
    return {
      initial: { 
        opacity: 0, 
        y: 12 
      },
      in: { 
        opacity: 1, 
        y: 0, 
        transition: { 
          duration: 0.28, 
          ease: [0.22, 1, 0.36, 1] as const 
        } 
      },
      out: { 
        opacity: 0, 
        y: -8, 
        transition: { 
          duration: 0.2, 
          ease: [0.32, 0, 0.67, 0] as const 
        } 
      }
    };
  }, [shouldReduceMotion]);

  const renderPage = () => {
    let pageComponent;
    if (!isOnline) {
      pageComponent = (
        <OfflinePage 
          setPage={setCurrentPage} 
          onSelectArticle={handleSelectArticle} 
          onRetryConnection={() => setIsOnline(typeof navigator !== 'undefined' ? navigator.onLine : true)} 
        />
      );
    } else {
      switch (currentPage) {
      case Page.Exhibition:
        pageComponent = <ExhibitionPage setPage={setCurrentPage} />;
        break;
      case Page.Downloads:
        pageComponent = <DownloadsPage setPage={setCurrentPage} />;
        break;
      case Page.Home:
        pageComponent = <HomePage setPage={setCurrentPage} onSelectArticle={handleSelectArticle} />;
        break;
      
      case Page.RuralStudies:
        pageComponent = <RuralDevelopmentPage setPage={setCurrentPage} />;
        break;
      case Page.Invest:
      case Page.InvestmentPortal:
        pageComponent = <InvestmentPortalPage setPage={setCurrentPage} />;
        break;
      case Page.PilotRequest:
        pageComponent = <PilotRequestPage setPage={setCurrentPage} />;
        break;
      case Page.ProjectDevelopment:
        pageComponent = <ProjectDevelopmentPage setPage={setCurrentPage} />;
        break;
      case Page.EvidenceRegistry:
        pageComponent = <EvidenceRegistryPage setPage={setCurrentPage} />;
        break;
      case Page.ClaimRegistry:
        pageComponent = <ClaimRegistryPage setPage={setCurrentPage} />;
        break;
      case Page.Sustainability:
        pageComponent = (
          <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen pt-24 pb-16 transition-colors" dir={direction}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <ESGDashboard setPage={setCurrentPage} />
            </div>
          </div>
        );
        break;
      case Page.Ecosystems:
      case Page.GMELHub:
        pageComponent = <GMELHubPage setPage={setCurrentPage} />;
        break;

      case Page.AboutUs:
        pageComponent = <AboutUsPage setPage={setCurrentPage} />;
        break;
      case Page.Technology:
      case Page.CoreTechnologies:
        pageComponent = <CoreTechnologiesPage setPage={setCurrentPage} />;
        break;
      case Page.DigitalTwinHub:
        pageComponent = <DigitalTwinHubPage setPage={setCurrentPage} />;
        break;
      case Page.DigitalTwinGMEL:
        pageComponent = <GMELTwinPage />;
        break;
      case Page.DigitalTwinREE:
        pageComponent = <REETwinPage setPage={setCurrentPage} />;
        break;
      case Page.Projects:
        pageComponent = <ProjectsPage setPage={setCurrentPage} />;
        break;
      case Page.InnovationHub:
        pageComponent = <InnovationHubPage />;
        break;
      case Page.IPCenter:
      case Page.IntellectualProperty:
        pageComponent = <IPCenterPage setPage={setCurrentPage} />;
        break;
      case Page.CorporateInfo:
        pageComponent = <CorporateInfoPage setPage={setCurrentPage} />;
        break;
      case Page.TechnologyTemplate:
        pageComponent = <TechnologyTemplatePage setPage={setCurrentPage} />;
        break;
      case Page.ProjectTemplate:
        pageComponent = <ProjectTemplatePage setPage={setCurrentPage} />;
        break;
      case Page.CarbonCredit:
        pageComponent = <CarbonCreditPage />;
        break;
      case Page.Contact:
        pageComponent = <ContactPage />;
        break;
      case Page.Insights:
      case Page.News:
        pageComponent = selectedArticle 
            ? <NewsArticlePage article={selectedArticle} onBack={handleBackToToNews} onSelectArticle={handleSelectArticle} /> 
            : <NewsPage onSelectArticle={handleSelectArticle} />;
        break;
      case Page.Offline:
        pageComponent = (
          <OfflinePage 
            setPage={setCurrentPage} 
            onSelectArticle={handleSelectArticle} 
            onRetryConnection={() => setIsOnline(typeof navigator !== 'undefined' ? navigator.onLine : true)} 
          />
        );
        break;
      case Page.Legal:
        pageComponent = <LegalPage />;
        break;
      case Page.SearchResults:
        pageComponent = (
          <SearchResultsPage 
            result={searchResults} 
            query={searchQuery} 
            onSearch={handleSearch}
            onSelectArticle={handleSelectArticle}
            onNavigatePage={setCurrentPage}
          />
        );
        break;
      case Page.Careers:
        pageComponent = <CareersPage />;
        break;
      case Page.InternalPortal:
        pageComponent = <InternalPortalPage setPage={setCurrentPage} />;
        break;
      case Page.GoogleKeep:
        pageComponent = <GoogleKeepPage setPage={setCurrentPage} />;
        break;
      case Page.Futures:
        pageComponent = <FuturesPage />;
        break;
      case Page.NotFound:
        pageComponent = <NotFoundPage setPage={setCurrentPage} />;
        break;
      default:
        pageComponent = <NotFoundPage setPage={setCurrentPage} />;
        break;
      }
    }

    return (
      <motion.div
        key={currentPage + (selectedArticle?.title || '')}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        className="min-h-[calc(100vh-80px)] w-full"
      >
        <PageErrorBoundary>
            <React.Suspense fallback={<PageSkeleton />}>
                {pageComponent}
            </React.Suspense>
        </PageErrorBoundary>
      </motion.div>
    );
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans text-text-dark dark:text-slate-200 transition-colors duration-300`}>
      <SEOHead title={title} description={description} url={canonicalUrl} customSchema={jsonLdSchema} />
      <SkipToContent />
      <Header currentPage={currentPage} setPage={setCurrentPage} onSearch={handleSearch} />
      <main id="main-content" className="flex-grow pt-2">
        <AnimatePresence mode="wait" initial={false}>
          {renderPage()}
        </AnimatePresence>
      </main>
      
      <CEOSignatureBanner />

      <Footer setPage={setCurrentPage} onSelectArticle={handleSelectArticle} showNewsTicker={currentPage === Page.Home} />
      <BackToTopButton />

      {/* Floating KKM Enterprise AI Algorithmic Advisor Trigger */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsAdvisorOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-primary to-slate-900 text-white rounded-2xl shadow-xl hover:shadow-2xl border border-secondary/30 transition-all active:scale-95 min-h-[48px] min-w-[48px]"
          title="KKM Algorithmic AI Advisor"
          aria-label="Open KKM Enterprise AI Algorithmic Advisor"
        >
          <div className="w-7 h-7 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary border border-secondary/40 group-hover:rotate-12 transition-transform">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-[11px] font-bold tracking-tight text-white flex items-center gap-1.5">
              <span>KKM AI Advisor</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-[9px] text-slate-300 font-mono">Algorithmic & IP Engine</div>
          </div>
        </button>
      </div>

      {/* Embedded LLM-driven AI Advisor Modal */}
      <KKMAlgorithmicAdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        onNavigate={(page) => {
          setCurrentPage(page);
          setIsAdvisorOpen(false);
        }}
      />

      <A11yDebugOverlay />
      <CookieConsent />
      <Analytics />
    </div>
  );
};

export default App;
