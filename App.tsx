
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
import { PROJECTS, NEWS_ITEMS } from './constants';
import type { TranslationKey } from './translations';
import { performDeepSearch } from './searchEngine';
import SkipToContent from './components/SkipToContent';
import { trackLazyLoad } from './trackLazyLoad';
import { trackPageView, parseUTMParams } from './lib/analytics';

import ExhibitionPage from './pages/ExhibitionPage';
import DownloadsPage from './pages/DownloadsPage';
import { PageTemplateSkeleton } from './components/ShimmerSkeleton';
// Lazy load page components wrapped with Firebase Perf tracing

const EvidenceRegistryPage = React.lazy(trackLazyLoad('EvidenceRegistryPage', () => import('./pages/EvidenceRegistryPage')));
const ClaimRegistryPage = React.lazy(trackLazyLoad('ClaimRegistryPage', () => import('./pages/ClaimRegistryPage')));
const ESGDashboard = React.lazy(trackLazyLoad('ESGDashboard', () => import('./components/ESGDashboard')));
const RuralDevelopmentPage = React.lazy(trackLazyLoad('RuralDevelopmentPage', () => import('./pages/RuralDevelopmentPage')));
const InvestmentPortalPage = React.lazy(trackLazyLoad('InvestmentPortalPage', () => import('./pages/InvestmentPortalPage')));
const PilotRequestPage = React.lazy(trackLazyLoad('PilotRequestPage', () => import('./pages/PilotRequestPage')));
const ProjectDevelopmentPage = React.lazy(trackLazyLoad('ProjectDevelopmentPage', () => import('./pages/ProjectDevelopmentPage')));
const GMELHubPage = React.lazy(trackLazyLoad('GMELHubPage', () => import('./pages/GMELHubPage')));
const CorporateInfoPage = React.lazy(trackLazyLoad('CorporateInfoPage', () => import('./pages/CorporateInfoPage')));
const IPCenterPage = React.lazy(trackLazyLoad('IPCenterPage', () => import('./pages/IPCenterPage')));
const TechnologyTemplatePage = React.lazy(trackLazyLoad('TechnologyTemplatePage', () => import('./pages/TechnologyTemplatePage')));
const ProjectTemplatePage = React.lazy(trackLazyLoad('ProjectTemplatePage', () => import('./pages/ProjectTemplatePage')));

const HomePage = React.lazy(trackLazyLoad('HomePage', () => import('./pages/HomePage')));
const AboutUsPage = React.lazy(trackLazyLoad('AboutUsPage', () => import('./pages/AboutUsPage')));
const CoreTechnologiesPage = React.lazy(trackLazyLoad('CoreTechnologiesPage', () => import('./pages/CoreTechnologiesPage')));
const ProjectsPage = React.lazy(trackLazyLoad('ProjectsPage', () => import('./pages/ProjectsPage')));
const InnovationHubPage = React.lazy(trackLazyLoad('InnovationHubPage', () => import('./pages/InnovationHubPage')));
const CarbonCreditPage = React.lazy(trackLazyLoad('CarbonCreditPage', () => import('./pages/CarbonCreditPage')));
const ContactPage = React.lazy(trackLazyLoad('ContactPage', () => import('./pages/ContactPage')));
const ComingSoonPage = React.lazy(trackLazyLoad('ComingSoonPage', () => import('./pages/ComingSoonPage')));
const LegalPage = React.lazy(trackLazyLoad('LegalPage', () => import('./pages/LegalPage')));
const NewsPage = React.lazy(trackLazyLoad('NewsPage', () => import('./pages/NewsPage')));
const NewsArticlePage = React.lazy(trackLazyLoad('NewsArticlePage', () => import('./pages/NewsArticlePage')));
const SearchResultsPage = React.lazy(trackLazyLoad('SearchResultsPage', () => import('./pages/SearchResultsPage')));
const FuturesPage = React.lazy(trackLazyLoad('FuturesPage', () => import('./pages/FuturesPage')));
const DigitalTwinHubPage = React.lazy(trackLazyLoad('DigitalTwinHubPage', () => import('./pages/DigitalTwinHubPage')));
const GMELTwinPage = React.lazy(trackLazyLoad('GMELTwinPage', () => import('./pages/DigitalTwinPage'))); // Keeping the original for GMEL
const REETwinPage = React.lazy(trackLazyLoad('REETwinPage', () => import('./pages/REETwinPage')));
const CareersPage = React.lazy(trackLazyLoad('CareersPage', () => import('./pages/CareersPage')));
const InternalPortalPage = React.lazy(trackLazyLoad('InternalPortalPage', () => import('./pages/InternalPortalPage')));
const OfflinePage = React.lazy(trackLazyLoad('OfflinePage', () => import('./pages/OfflinePage')));

interface PageErrorBoundaryProps {
  children?: React.ReactNode;
}

interface PageErrorBoundaryState {
  hasError: boolean;
}

// Error Boundary to catch lazy loading chunk errors
class PageErrorBoundary extends Component<PageErrorBoundaryProps, PageErrorBoundaryState> {
  constructor(props: PageErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Page Loading Error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-red-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-3xl font-display font-bold text-gray-800 dark:text-gray-200 mb-3">System Malfunction</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md leading-relaxed">
            We encountered a critical error while loading the digital interface. This may be due to a network interruption.
          </p>
          <button 
            onClick={this.handleRetry}
            className="px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-secondary transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Re-initialize System
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const { t } = useLanguage();

  React.useEffect(() => {
    let hasConsented = null; try { hasConsented = window.localStorage.getItem('kkm-cookie-consent'); } catch (e) {}
    if (!hasConsented) {
      setIsVisible(true);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-slate-900 border-t border-slate-700 text-slate-300 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-sm">
        <strong>Governance & Data Transparency:</strong> In alignment with KKM International Group's Production Truth Layer, all engineering specifications, technical performance indicators, and ESG metrics on this platform are governed by the formal <em>KKM Evidence Registry (Levels A through G)</em>. Unverified simulated counters have been retired from production presentation. By continuing, you agree to our data usage and verified reporting standards.
      </div>
      <div className="flex gap-2">
        <button 
          onClick={() => {
            try { window.localStorage.setItem('kkm-cookie-consent', 'accepted'); } catch (e) {}
            setIsVisible(false);
          }}
          className="px-4 py-2 bg-primary text-white text-sm font-bold rounded hover:bg-secondary transition-colors whitespace-nowrap"
        >
          Accept & Continue
        </button>
      </div>
    </div>
  );
};

const PageSkeleton = () => <PageTemplateSkeleton template="standard" />;

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState<Page>(Page.Home);

  React.useEffect(() => {
    trackPageView(currentPage, window.location.href);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [currentPage]);

  React.useEffect(() => {
    parseUTMParams(); // Parse and store UTMs on load
  }, []);

  const [selectedArticle, setSelectedArticle] = React.useState<NewsItem | null>(null);
  const [searchResults, setSearchResults] = React.useState<GeminiSearchResult | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
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

  // --- VIRTUAL ROUTING LOGIC ---
  
  // 1. On Mount: Check URL query param to set initial page
  
  React.useEffect(() => {
    try {
        const path = window.location.pathname;
        const params = new URLSearchParams(window.location.search);
        const pageParam = params.get('page');
        
        if (path === '/rural' || path === '/rural-development' || path === '/rural-development/') {
             setCurrentPage(Page.RuralStudies);
             return;
        }
        if (path === '/exhibition' || path === '/rural-1405' || path === '/exhibition/rural-1405' || path === '/exhibition/rural-1405/' || path === '/exhibition/') {
             setCurrentPage(Page.Exhibition);
             return;
        }
        if (path === '/corporate' || path === '/corporate-info') {
             setCurrentPage(Page.CorporateInfo);
             return;
        }
        if (path === '/ip' || path === '/ip-center') {
             setCurrentPage(Page.IPCenter);
             return;
        }
        if (path === '/gmel') {
             setCurrentPage(Page.GMELHub);
             return;
        }
        if (path === '/pilot-request') {
             setCurrentPage(Page.PilotRequest);
             return;
        }
        if (path === '/project-development') {
             setCurrentPage(Page.ProjectDevelopment);
             return;
        }
        if (path === '/invest') {
             setCurrentPage(Page.InvestmentPortal);
             return;
        }
        if (path === '/evidence' || path === '/evidence-registry') {
             setCurrentPage(Page.EvidenceRegistry);
             return;
        }
        if (path === '/sustainability' || path === '/esg') {
             setCurrentPage(Page.Sustainability);
             return;
        }

        if (pageParam) {
          const pageEnum = Object.values(Page).find(p => p.replace(/\s/g, '') === pageParam);
          if (pageEnum) {
            setCurrentPage(pageEnum);
          }
        }
    } catch (e) {
        console.warn("Failed to parse URL parameters:", e);
    }
  }, []);


  // 2. On Page Change: Update URL without reloading (Deep Linking)
  React.useEffect(() => {
    try {
        const params = new URLSearchParams(window.location.search);
        // Remove spaces for cleaner URLs (e.g. "AboutUs" instead of "About Us")
        const urlFriendlyName = currentPage.replace(/\s/g, '');
        
        if (currentPage === Page.Home) {
            // Clear params for home
            const newUrl = window.location.pathname;
            window.history.pushState({ page: currentPage }, '', newUrl);
        } else {
            params.set('page', urlFriendlyName);
            const newUrl = `${window.location.pathname}?${params.toString()}`;
            window.history.pushState({ page: currentPage }, '', newUrl);
        }
        
        window.scrollTo(0, 0);
    } catch (e) {
        console.warn("History API interaction failed (likely due to security sandbox):", e);
    }
  }, [currentPage]);

  // 3. Handle Browser Back/Forward Buttons
  React.useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
        try {
            const params = new URLSearchParams(window.location.search);
            const pageParam = params.get('page');
            if (pageParam) {
                 const pageEnum = Object.values(Page).find(p => p.replace(/\s/g, '') === pageParam);
                 if (pageEnum) setCurrentPage(pageEnum);
            } else {
                setCurrentPage(Page.Home);
            }
        } catch (e) {
            console.warn("Popstate handling failed:", e);
        }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // -----------------------------

  // Determine SEO Properties based on state
  let title = 'KKM International Group';
  let description = 'Technology. Engineering. Infrastructure. Innovation.';
  let canonicalUrl = 'https://www.kkm-intl.com';
  let jsonLdSchema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "KKM International Group",
    "url": "https://www.kkm-intl.com"
  };

  if (currentPage === Page.News && selectedArticle) {
     title = `${selectedArticle.title} | KKM News`;
     description = selectedArticle.excerpt;
     const articleSlug = encodeURIComponent(selectedArticle.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
     canonicalUrl = `https://www.kkm-intl.com/news/${articleSlug}`;
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
           "url": "https://storage.googleapis.com/aistudio-chat-prod-gemini-image-serving/e0cfcd0b2fb249f3906371f4b3df36c7"
         }
       }
     };
  } else if (currentPage === Page.SearchResults) {
     title = `Search Results: "${searchQuery}" | KKM Technical Index`;
     description = `Deep intelligence search results for "${searchQuery}" across KKM proprietary technologies, patent filings, active projects, news, and technical publications.`;
     canonicalUrl = `https://www.kkm-intl.com/search?q=${encodeURIComponent(searchQuery)}`;
     jsonLdSchema = {
       "@context": "https://schema.org",
       "@type": "SearchResultsPage",
       "name": `Search Results: ${searchQuery}`,
       "description": description,
       "url": canonicalUrl
     };
  } else {
     const pageName = t(currentPage as TranslationKey) || currentPage;
     title = `${pageName} | KKM International Group`;
     
     if (currentPage === Page.Home) {
         title = "KKM International Group | Technology. Engineering. Infrastructure. Innovation.";
         description = 'Leading multi-disciplinary engineering group pioneering closed-loop geothermal systems (GMEL), water-energy nexus technologies, rural microgrids, and sustainable infrastructure.';
         canonicalUrl = "https://www.kkm-intl.com";
         jsonLdSchema = {
           "@context": "https://schema.org",
           "@type": "Organization",
           "name": "KKM International Group",
           "alternateName": "Kimia Karan Mâd Private Joint Stock Company",
           "url": "https://www.kkm-intl.com",
           "logo": "https://storage.googleapis.com/aistudio-chat-prod-gemini-image-serving/e0cfcd0b2fb249f3906371f4b3df36c7",
           "contactPoint": {
             "@type": "ContactPoint",
             "telephone": "+98 21 9103 0830",
             "contactType": "customer service"
           }
         };
     } else if (currentPage === Page.Careers) {
         title = "Careers, Engineering Fellowships & Talent Operations | KKM International Group";
         description = 'Explore high-impact career opportunities in geothermal engineering, thermodynamic cycles, smart grid modeling, and international infrastructure.';
         canonicalUrl = "https://www.kkm-intl.com/careers";
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
         canonicalUrl = "https://www.kkm-intl.com/projects";
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
         canonicalUrl = "https://www.kkm-intl.com/technologies";
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
         canonicalUrl = "https://www.kkm-intl.com/contact";
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
         canonicalUrl = "https://www.kkm-intl.com/about";
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
         canonicalUrl = "https://www.kkm-intl.com/rural-development";
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
         canonicalUrl = "https://www.kkm-intl.com/evidence";
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
         canonicalUrl = "https://www.kkm-intl.com/claims";
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
         canonicalUrl = "https://www.kkm-intl.com/sustainability";
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
         canonicalUrl = "https://www.kkm-intl.com/exhibition/rural-1405";
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
         canonicalUrl = "https://www.kkm-intl.com/invest";
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
         canonicalUrl = "https://www.kkm-intl.com/pilot-request";
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
         canonicalUrl = "https://www.kkm-intl.com/project-development";
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
         canonicalUrl = "https://www.kkm-intl.com/ip-center";
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
         canonicalUrl = "https://www.kkm-intl.com/corporate-info";
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
         canonicalUrl = "https://www.kkm-intl.com/technologies/gmel";
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
         canonicalUrl = "https://www.kkm-intl.com/downloads";
         jsonLdSchema = {
           "@context": "https://schema.org",
           "@type": "CollectionPage",
           "name": title,
           "description": description,
           "url": canonicalUrl
         };
     } else if (currentPage === Page.DigitalTwinHub || currentPage === Page.DigitalTwinGMEL || currentPage === Page.DigitalTwinREE) {
         title = "Digital Twin Platform & Subsurface Telemetry Hub | KKM";
         description = "Next-generation enterprise digital twin platform for thermodynamic simulation, geothermal well telemetry, and real-time sustainability optimization.";
         canonicalUrl = "https://www.kkm-intl.com/digital-twins";
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
         canonicalUrl = "https://www.kkm-intl.com/carbon-credits";
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
         canonicalUrl = "https://www.kkm-intl.com/legal";
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
         canonicalUrl = "https://www.kkm-intl.com/news";
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
         canonicalUrl = "https://www.kkm-intl.com/offline";
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
         canonicalUrl = "https://www.kkm-intl.com/biomedical";
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
         canonicalUrl = "https://www.kkm-intl.com/sports";
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
         canonicalUrl = "https://www.kkm-intl.com/futures";
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
        pageComponent = <REETwinPage />;
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
        pageComponent = <InternalPortalPage />;
        break;
      case Page.Futures:
        pageComponent = <FuturesPage />;
        break;
      default:
        pageComponent = <ComingSoonPage pageTitle={currentPage} />;
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
      <A11yDebugOverlay />
      <CookieConsent />
    </div>
  );
};

export default App;
