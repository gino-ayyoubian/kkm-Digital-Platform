
import React, { Component } from 'react';
import { Page } from './types';
import type { NewsItem, GeminiSearchResult } from './types';
import { motion, AnimatePresence } from 'motion/react';
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
// Lazy load page components wrapped with Firebase Perf tracing

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
        <strong>Data Usage & Privacy Compliance:</strong> In alignment with our sustainability and transparency commitments, we use cookies to streamline your experience and minimize unnecessary data processing. Please note that all environmental metrics, CO2 reduction figures, and LiveEnergyTicker data displayed on this platform are currently <em>simulated</em> for demonstration and compliance reporting purposes. By continuing, you agree to our strict data usage policy and cookie practices.
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

const PageSkeleton = () => (
  <div className="flex flex-col min-h-[calc(100vh-80px)] w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-pulse pt-12">
    <div className="w-full flex flex-col items-start justify-start space-y-4 mb-8">
        <div className="w-1/3 md:w-1/4 h-10 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
        <div className="w-2/3 md:w-1/2 h-4 bg-slate-100 dark:bg-slate-800/50 rounded-lg"></div>
    </div>
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map(i => (
            <div key={i} className="w-full h-64 bg-slate-100 dark:bg-slate-800/60 rounded-2xl flex flex-col p-6 space-y-4 border border-slate-200 dark:border-slate-800">
                <div className="w-3/4 h-6 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                <div className="w-full h-32 bg-slate-200 dark:bg-slate-700/50 rounded-md mt-auto"></div>
            </div>
        ))}
    </div>
  </div>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState<Page>(Page.Home);

  React.useEffect(() => {
    trackPageView(currentPage, window.location.href);
  }, [currentPage]);

  React.useEffect(() => {
    parseUTMParams(); // Parse and store UTMs on load
  }, []);

  const [selectedArticle, setSelectedArticle] = React.useState<NewsItem | null>(null);
  const [searchResults, setSearchResults] = React.useState<GeminiSearchResult | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isOnline, setIsOnline] = React.useState<boolean>(() => typeof navigator !== 'undefined' ? navigator.onLine : true);
  const { direction, language, t } = useLanguage();

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
        
        if (path === '/rural' || path === '/rural-development') {
             setCurrentPage(Page.RuralStudies);
             return;
        }
        if (path === '/exhibition' || path === '/rural-1405') {
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
  let jsonLdSchema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "KKM International Group",
    "url": "https://kkm-international.org"
  };

  if (currentPage === Page.News && selectedArticle) {
     title = `${selectedArticle.title} | KKM News`;
     description = selectedArticle.excerpt;
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
     title = `Search Results: ${searchQuery} | KKM`;
  } else {
     const pageName = t(currentPage as TranslationKey) || currentPage;
     title = `${pageName} | KKM International Group`;
     
     if (currentPage === Page.Home) {
         title = "KKM International Group | Technology. Engineering. Infrastructure. Innovation.";
         description = 'A corporate portal for KKM International Group, showcasing core technologies, projects, and innovations from evidence to scalable impact.';
         jsonLdSchema = {
           "@context": "https://schema.org",
           "@type": "Organization",
           "name": "KKM International Group",
           "url": "https://kkm-international.org",
           "logo": "https://storage.googleapis.com/aistudio-chat-prod-gemini-image-serving/e0cfcd0b2fb249f3906371f4b3df36c7",
           "contactPoint": {
             "@type": "ContactPoint",
             "telephone": "+98 21 9103 0830",
             "contactType": "customer service"
           }
         };
     } else if (currentPage === Page.Careers) {
         description = 'Join the KKM team. Explore career opportunities and job openings in engineering, R&D, and more.';
     } else if (currentPage === Page.Projects) {
         description = 'Explore KKM International Group\'s pioneering projects and pilots in sustainable infrastructure and energy.';
     } else if (currentPage === Page.CoreTechnologies) {
         description = 'Discover GMEL Ecosystem and our core technologies in geothermal energy and sustainable infrastructure.';
     } else if (currentPage === Page.Contact) {
         description = 'Contact KKM International Group for business inquiries, support, and partnership opportunities.';
         jsonLdSchema = {
           "@context": "https://schema.org",
           "@type": "ContactPage",
           "name": "Contact KKM International Group",
           "description": description
         };
     } else if (currentPage === Page.AboutUs) {
         description = 'Learn about KKM International Group\'s history, mission, and leadership team driving sustainable innovation.';
         jsonLdSchema = {
           "@context": "https://schema.org",
           "@type": "AboutPage",
           "name": "About KKM International Group",
           "description": description
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

  const pageVariants = {
    initial: { opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)', filter: 'blur(8px)', y: 20 },
    in: { opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', filter: 'blur(0px)', y: 0 },
    out: { opacity: 0, clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', filter: 'blur(8px)', y: -20 }
  };

  const pageTransition = {
    type: 'tween',
    ease: [0.25, 1, 0.3, 1], // Smooth custom ease curve
    duration: 0.6
  } as const;

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
        return <ExhibitionPage setPage={setCurrentPage} />;
      case Page.Downloads:
        return <DownloadsPage setPage={setCurrentPage} />;
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
        transition={pageTransition}
        className="min-h-[calc(100vh-80px)]"
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
      <SEOHead title={title} description={description} customSchema={jsonLdSchema} />
      <SkipToContent />
      <Header currentPage={currentPage} setPage={setCurrentPage} onSearch={handleSearch} />
      <main id="main-content" className="flex-grow pt-2">
        <AnimatePresence mode="wait">
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
