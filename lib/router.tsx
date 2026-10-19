import React, { Suspense, useEffect, useState, useCallback } from 'react';
import {
  createBrowserRouter,
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
  type RouteObject,
} from 'react-router';
import RootLayout from '../components/RootLayout';
import { PageTemplateSkeleton } from '../components/ShimmerSkeleton';
import { findArticleBySlug, getArticleSlug } from './news';
import { pathToPage, pageToPath } from './routes';
import { Page } from '../types';
import type { GeminiSearchResult, NewsItem, Project } from '../types';
import { performDeepSearch } from '../searchEngine';
import { useAppNavigate } from '../hooks/useAppNavigate';
import { useLanguage } from '../LanguageContext';
import { trackLazyLoad } from '../trackLazyLoad';
import NewsArticlePage from '../pages/NewsArticlePage';

const HomePage = React.lazy(trackLazyLoad('HomePage', () => import('../pages/HomePage')));
const AboutUsPage = React.lazy(trackLazyLoad('AboutUsPage', () => import('../pages/AboutUsPage')));
const CoreTechnologiesPage = React.lazy(trackLazyLoad('CoreTechnologiesPage', () => import('../pages/CoreTechnologiesPage')));
const ProjectsPage = React.lazy(trackLazyLoad('ProjectsPage', () => import('../pages/ProjectsPage')));
const NewsPage = React.lazy(trackLazyLoad('NewsPage', () => import('../pages/NewsPage')));
const ContactPage = React.lazy(trackLazyLoad('ContactPage', () => import('../pages/ContactPage')));
const DownloadsPage = React.lazy(trackLazyLoad('DownloadsPage', () => import('../pages/DownloadsPage')));
const RuralDevelopmentPage = React.lazy(trackLazyLoad('RuralDevelopmentPage', () => import('../pages/RuralDevelopmentPage')));
const ExhibitionPage = React.lazy(trackLazyLoad('ExhibitionPage', () => import('../pages/ExhibitionPage')));
const EvidenceRegistryPage = React.lazy(trackLazyLoad('EvidenceRegistryPage', () => import('../pages/EvidenceRegistryPage')));
const ClaimRegistryPage = React.lazy(trackLazyLoad('ClaimRegistryPage', () => import('../pages/ClaimRegistryPage')));
const InvestmentPortalPage = React.lazy(trackLazyLoad('InvestmentPortalPage', () => import('../pages/InvestmentPortalPage')));
const PilotRequestPage = React.lazy(trackLazyLoad('PilotRequestPage', () => import('../pages/PilotRequestPage')));
const ProjectDevelopmentPage = React.lazy(trackLazyLoad('ProjectDevelopmentPage', () => import('../pages/ProjectDevelopmentPage')));
const GMELHubPage = React.lazy(trackLazyLoad('GMELHubPage', () => import('../pages/GMELHubPage')));
const CorporateInfoPage = React.lazy(trackLazyLoad('CorporateInfoPage', () => import('../pages/CorporateInfoPage')));
const IPCenterPage = React.lazy(trackLazyLoad('IPCenterPage', () => import('../pages/IPCenterPage')));
const InnovationHubPage = React.lazy(trackLazyLoad('InnovationHubPage', () => import('../pages/InnovationHubPage')));
const CarbonCreditPage = React.lazy(trackLazyLoad('CarbonCreditPage', () => import('../pages/CarbonCreditPage')));
const LegalPage = React.lazy(trackLazyLoad('LegalPage', () => import('../pages/LegalPage')));
const SearchResultsPage = React.lazy(trackLazyLoad('SearchResultsPage', () => import('../pages/SearchResultsPage')));
const FuturesPage = React.lazy(trackLazyLoad('FuturesPage', () => import('../pages/FuturesPage')));
const DigitalTwinHubPage = React.lazy(trackLazyLoad('DigitalTwinHubPage', () => import('../pages/DigitalTwinHubPage')));
const REETwinPage = React.lazy(trackLazyLoad('REETwinPage', () => import('../pages/REETwinPage')));
const CareersPage = React.lazy(trackLazyLoad('CareersPage', () => import('../pages/CareersPage')));
const TeamPage = React.lazy(trackLazyLoad('TeamPage', () => import('../pages/TeamPage')));
const FAQPage = React.lazy(trackLazyLoad('FAQPage', () => import('../pages/FAQPage')));
const DivisionsPage = React.lazy(trackLazyLoad('DivisionsPage', () => import('../pages/DivisionsPage')));
const InternalPortalPage = React.lazy(trackLazyLoad('InternalPortalPage', () => import('../pages/InternalPortalPage')));
const OfflinePage = React.lazy(trackLazyLoad('OfflinePage', () => import('../pages/OfflinePage')));
const NotFoundPage = React.lazy(trackLazyLoad('NotFoundPage', () => import('../pages/NotFoundPage')));
const ESGDashboard = React.lazy(trackLazyLoad('ESGDashboard', () => import('../components/ESGDashboard')));

function withSuspense(node: React.ReactNode) {
  return <Suspense fallback={<PageTemplateSkeleton template="standard" />}>{node}</Suspense>;
}

function RoutedPage({
  component: Component,
}: {
  component: React.ComponentType<{ setPage: (page: Page) => void }>;
}) {
  const setPage = useAppNavigate();
  return withSuspense(<Component setPage={setPage} />);
}

function useSelectArticle() {
  const navigate = useNavigate();
  return React.useCallback(
    (article: NewsItem) => {
      navigate(`/news/${getArticleSlug(article.title)}`);
    },
    [navigate]
  );
}

/**
 * News article deep link: /news/:slug
 * Matches NewsArticlePage props: article, onBack, onSelectArticle
 */
function NewsArticleRoute() {
  const { slug = '' } = useParams();
  const navigate = useNavigate();
  const navigateToPage = useAppNavigate();
  const article = findArticleBySlug(slug);

  const handleBack = useCallback(() => {
    navigateToPage(Page.News);
  }, [navigateToPage]);

  const handleSelectArticle = useCallback(
    (next: NewsItem) => {
      navigate(`/news/${getArticleSlug(next.title)}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [navigate]
  );

  if (!article) {
    return <NotFoundRoute />;
  }
  return withSuspense(
    <NewsArticlePage
      article={article}
      onBack={handleBack}
      onSelectArticle={handleSelectArticle}
    />
  );
}

function NewsRoute() {
  const onSelectArticle = useSelectArticle();
  return withSuspense(<NewsPage onSelectArticle={onSelectArticle} />);
}

/**
 * Search results: /search?q=...
 * Matches SearchResultsPage props and runs performDeepSearch.
 */
function SearchResultsRoute() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const navigate = useNavigate();
  const navigateToPage = useAppNavigate();
  const { language } = useLanguage();
  const [result, setResult] = useState<GeminiSearchResult | null>(null);

  useEffect(() => {
    let cancelled = false;
    setResult(null);

    if (!query.trim()) {
      setResult({
        summary: '',
        sources: [],
        matchedItems: [],
        totalMatchesCount: 0,
        sourceType: 'internal',
      });
      return;
    }

    (async () => {
      try {
        const data = await performDeepSearch(query, language);
        if (!cancelled) setResult(data);
      } catch {
        if (!cancelled) {
          setResult({
            summary: 'Search temporarily unavailable.',
            sources: [],
            matchedItems: [],
            totalMatchesCount: 0,
            sourceType: 'internal',
          });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [query, language]);

  const handleSearch = useCallback(
    (nextQuery: string) => {
      const q = nextQuery.trim();
      if (!q) return;
      setParams({ q });
    },
    [setParams]
  );

  const handleSelectArticle = useCallback(
    (article: NewsItem) => {
      navigate(`/news/${getArticleSlug(article.title)}`);
    },
    [navigate]
  );

  const handleNavigatePage = useCallback(
    (page: Page) => {
      navigateToPage(page);
    },
    [navigateToPage]
  );

  const handleSelectProject = useCallback(
    (_project: Project) => {
      navigateToPage(Page.Projects);
    },
    [navigateToPage]
  );

  return withSuspense(
    <SearchResultsPage
      result={result}
      query={query}
      onSearch={handleSearch}
      onSelectArticle={handleSelectArticle}
      onNavigatePage={handleNavigatePage}
      onSelectProject={handleSelectProject}
    />
  );
}

function NotFoundRoute() {
  const navigateToPage = useAppNavigate();
  return withSuspense(<NotFoundPage setPage={navigateToPage} />);
}

function LegacyPageQueryRedirect() {
  const [params] = useSearchParams();
  const legacy = params.get('page');
  if (!legacy) return <Navigate to="/" replace />;

  const match = Object.values(Page).find(
    (p) => p.replace(/\s/g, '').toLowerCase() === legacy.toLowerCase()
  );

  if (!match) return <Navigate to="/" replace />;
  return <Navigate to={pageToPath(match)} replace />;
}

export const routeObjects: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <RoutedPage component={HomePage} /> },

      // Canonical pages
      { path: 'about', element: <RoutedPage component={AboutUsPage} /> },
      { path: 'technology', element: <RoutedPage component={CoreTechnologiesPage} /> },
      { path: 'projects', element: <RoutedPage component={ProjectsPage} /> },
      { path: 'news', element: <NewsRoute /> },
      { path: 'news/:slug', element: <NewsArticleRoute /> },
      { path: 'downloads', element: <RoutedPage component={DownloadsPage} /> },
      { path: 'rural-development', element: <RoutedPage component={RuralDevelopmentPage} /> },
      { path: 'exhibition/rural-1405', element: <RoutedPage component={ExhibitionPage} /> },
      { path: 'evidence-registry', element: <RoutedPage component={EvidenceRegistryPage} /> },
      { path: 'claims-registry', element: <RoutedPage component={ClaimRegistryPage} /> },
      { path: 'invest', element: <RoutedPage component={InvestmentPortalPage} /> },
      { path: 'team', element: withSuspense(<TeamPage />) },
      { path: 'faq', element: withSuspense(<FAQPage />) },
      { path: 'divisions', element: withSuspense(<DivisionsPage />) },
      { path: 'innovation-hub', element: withSuspense(<InnovationHubPage />) },
      { path: 'corporate-info', element: <RoutedPage component={CorporateInfoPage} /> },
      { path: 'ip-center', element: <RoutedPage component={IPCenterPage} /> },
      { path: 'gmel', element: <RoutedPage component={GMELHubPage} /> },
      { path: 'pilot-request', element: <RoutedPage component={PilotRequestPage} /> },
      { path: 'project-development', element: <RoutedPage component={ProjectDevelopmentPage} /> },
      { path: 'sustainability', element: withSuspense(<ESGDashboard />) },
      { path: 'carbon-credits', element: withSuspense(<CarbonCreditPage />) },
      { path: 'legal', element: withSuspense(<LegalPage />) },
      { path: 'careers', element: withSuspense(<CareersPage />) },
      { path: 'contact', element: withSuspense(<ContactPage />) },
      { path: 'digital-twins', element: <RoutedPage component={DigitalTwinHubPage} /> },
      { path: 'ree', element: withSuspense(<REETwinPage />) },
      { path: 'internal-portal', element: withSuspense(<InternalPortalPage />) },
      { path: 'search', element: <SearchResultsRoute /> },
      { path: 'futures', element: withSuspense(<FuturesPage />) },
      { path: 'offline', element: <RoutedPage component={OfflinePage} /> },

      // Alias redirects → canonical paths
      { path: 'about-us', element: <Navigate to="/about" replace /> },
      { path: 'aboutus', element: <Navigate to="/about" replace /> },
      { path: 'technologies', element: <Navigate to="/technology" replace /> },
      { path: 'core-technologies', element: <Navigate to="/technology" replace /> },
      { path: 'projects-and-pilots', element: <Navigate to="/projects" replace /> },
      { path: 'project', element: <Navigate to="/projects" replace /> },
      { path: 'news-and-insights', element: <Navigate to="/news" replace /> },
      { path: 'insights', element: <Navigate to="/news" replace /> },
      { path: 'whitepapers', element: <Navigate to="/downloads" replace /> },
      { path: 'rural', element: <Navigate to="/rural-development" replace /> },
      { path: 'exhibition', element: <Navigate to="/exhibition/rural-1405" replace /> },
      { path: 'evidence', element: <Navigate to="/evidence-registry" replace /> },
      { path: 'claims', element: <Navigate to="/claims-registry" replace /> },
      { path: 'claim-registry', element: <Navigate to="/claims-registry" replace /> },
      { path: 'investors', element: <Navigate to="/invest" replace /> },
      { path: 'investment-portal', element: <Navigate to="/invest" replace /> },
      { path: 'leadership', element: <Navigate to="/team" replace /> },
      { path: 'board', element: <Navigate to="/team" replace /> },
      { path: 'faqs', element: <Navigate to="/faq" replace /> },
      { path: 'questions', element: <Navigate to="/faq" replace /> },
      { path: 'business-units', element: <Navigate to="/divisions" replace /> },
      { path: 'innovation', element: <Navigate to="/innovation-hub" replace /> },
      { path: 'corporate', element: <Navigate to="/corporate-info" replace /> },
      { path: 'ip', element: <Navigate to="/ip-center" replace /> },
      { path: 'esg', element: <Navigate to="/sustainability" replace /> },
      { path: 'carbon-credit', element: <Navigate to="/carbon-credits" replace /> },
      { path: 'privacy', element: <Navigate to="/legal" replace /> },
      { path: 'terms', element: <Navigate to="/legal" replace /> },
      { path: 'cookies', element: <Navigate to="/legal" replace /> },
      { path: 'dpa', element: <Navigate to="/legal" replace /> },
      { path: 'contact-us', element: <Navigate to="/contact" replace /> },
      { path: 'digital-twin', element: <Navigate to="/digital-twins" replace /> },
      { path: 'kkm-ree', element: <Navigate to="/ree" replace /> },
      { path: 'digital-twin-ree', element: <Navigate to="/ree" replace /> },
      { path: 'portal', element: <Navigate to="/internal-portal" replace /> },

      { path: 'legacy-page', element: <LegacyPageQueryRedirect /> },
      { path: '*', element: <NotFoundRoute /> },
    ],
  },
];

export const router = createBrowserRouter(routeObjects);

export function useCurrentPage(): Page {
  const locationPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  return pathToPage(locationPath);
}
