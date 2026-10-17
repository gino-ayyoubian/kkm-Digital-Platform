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

const HomePage = React.lazy(() => import('../pages/HomePage'));
const AboutUsPage = React.lazy(() => import('../pages/AboutUsPage'));
const CoreTechnologiesPage = React.lazy(() => import('../pages/CoreTechnologiesPage'));
const ProjectsPage = React.lazy(() => import('../pages/ProjectsPage'));
const NewsPage = React.lazy(() => import('../pages/NewsPage'));
const NewsArticlePage = React.lazy(() => import('../pages/NewsArticlePage'));
const ContactPage = React.lazy(() => import('../pages/ContactPage'));
const DownloadsPage = React.lazy(() => import('../pages/DownloadsPage'));
const RuralDevelopmentPage = React.lazy(() => import('../pages/RuralDevelopmentPage'));
const ExhibitionPage = React.lazy(() => import('../pages/ExhibitionPage'));
const EvidenceRegistryPage = React.lazy(() => import('../pages/EvidenceRegistryPage'));
const ClaimRegistryPage = React.lazy(() => import('../pages/ClaimRegistryPage'));
const InvestmentPortalPage = React.lazy(() => import('../pages/InvestmentPortalPage'));
const PilotRequestPage = React.lazy(() => import('../pages/PilotRequestPage'));
const ProjectDevelopmentPage = React.lazy(() => import('../pages/ProjectDevelopmentPage'));
const GMELHubPage = React.lazy(() => import('../pages/GMELHubPage'));
const CorporateInfoPage = React.lazy(() => import('../pages/CorporateInfoPage'));
const IPCenterPage = React.lazy(() => import('../pages/IPCenterPage'));
const InnovationHubPage = React.lazy(() => import('../pages/InnovationHubPage'));
const CarbonCreditPage = React.lazy(() => import('../pages/CarbonCreditPage'));
const LegalPage = React.lazy(() => import('../pages/LegalPage'));
const SearchResultsPage = React.lazy(() => import('../pages/SearchResultsPage'));
const FuturesPage = React.lazy(() => import('../pages/FuturesPage'));
const DigitalTwinHubPage = React.lazy(() => import('../pages/DigitalTwinHubPage'));
const REETwinPage = React.lazy(() => import('../pages/REETwinPage'));
const CareersPage = React.lazy(() => import('../pages/CareersPage'));
const TeamPage = React.lazy(() => import('../pages/TeamPage'));
const FAQPage = React.lazy(() => import('../pages/FAQPage'));
const DivisionsPage = React.lazy(() => import('../pages/DivisionsPage'));
const InternalPortalPage = React.lazy(() => import('../pages/InternalPortalPage'));
const GoogleKeepPage = React.lazy(() => import('../pages/GoogleKeepPage'));
const OfflinePage = React.lazy(() => import('../pages/OfflinePage'));
const NotFoundPage = React.lazy(() => import('../pages/NotFoundPage'));
const ESGDashboard = React.lazy(() => import('../components/ESGDashboard'));

function withSuspense(node: React.ReactNode) {
  return <Suspense fallback={<PageTemplateSkeleton template="standard" />}>{node}</Suspense>;
}

/** Inject setPage into lazy page components that still require the prop. */
function SetPageRoute({ children }: { children: React.ReactElement }) {
  const setPage = useAppNavigate();
  return React.cloneElement(children, { setPage } as never);
}

function NewsPageRoute() {
  const navigate = useNavigate();
  const onSelectArticle = useCallback(
    (article: NewsItem) => {
      navigate(`/news/${getArticleSlug(article.title)}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [navigate]
  );
  return withSuspense(<NewsPage onSelectArticle={onSelectArticle} />);
}

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

function OfflineRoute() {
  const navigateToPage = useAppNavigate();
  const navigate = useNavigate();
  const onSelectArticle = useCallback(
    (article: NewsItem) => {
      navigate(`/news/${getArticleSlug(article.title)}`);
    },
    [navigate]
  );
  return withSuspense(
    <OfflinePage
      setPage={navigateToPage}
      onSelectArticle={onSelectArticle}
      onRetryConnection={() => window.location.reload()}
    />
  );
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

/** Factory: lazy page + setPage injection */
function pageWithSetPage(
  LazyPage: React.LazyExoticComponent<React.ComponentType<{ setPage: (page: Page) => void }>>
) {
  return withSuspense(
    <SetPageRoute>
      <LazyPage setPage={() => undefined} />
    </SetPageRoute>
  );
}

export const routeObjects: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: pageWithSetPage(HomePage) },

      { path: 'about', element: pageWithSetPage(AboutUsPage) },
      { path: 'technology', element: withSuspense(<CoreTechnologiesPage />) },
      { path: 'projects', element: pageWithSetPage(ProjectsPage) },
      { path: 'news', element: <NewsPageRoute /> },
      { path: 'news/:slug', element: <NewsArticleRoute /> },
      { path: 'downloads', element: pageWithSetPage(DownloadsPage) },
      { path: 'rural-development', element: pageWithSetPage(RuralDevelopmentPage) },
      { path: 'exhibition/rural-1405', element: pageWithSetPage(ExhibitionPage) },
      { path: 'evidence-registry', element: pageWithSetPage(EvidenceRegistryPage) },
      { path: 'claims-registry', element: pageWithSetPage(ClaimRegistryPage) },
      { path: 'invest', element: pageWithSetPage(InvestmentPortalPage) },
      { path: 'team', element: withSuspense(<TeamPage />) },
      { path: 'faq', element: withSuspense(<FAQPage />) },
      { path: 'divisions', element: withSuspense(<DivisionsPage />) },
      { path: 'innovation-hub', element: withSuspense(<InnovationHubPage />) },
      { path: 'corporate-info', element: pageWithSetPage(CorporateInfoPage) },
      { path: 'ip-center', element: pageWithSetPage(IPCenterPage) },
      { path: 'gmel', element: pageWithSetPage(GMELHubPage) },
      { path: 'pilot-request', element: pageWithSetPage(PilotRequestPage) },
      { path: 'project-development', element: pageWithSetPage(ProjectDevelopmentPage) },
      { path: 'sustainability', element: withSuspense(<ESGDashboard />) },
      { path: 'carbon-credits', element: withSuspense(<CarbonCreditPage />) },
      { path: 'legal', element: withSuspense(<LegalPage />) },
      { path: 'careers', element: withSuspense(<CareersPage />) },
      { path: 'contact', element: withSuspense(<ContactPage />) },
      { path: 'digital-twins', element: pageWithSetPage(DigitalTwinHubPage) },
      { path: 'ree', element: withSuspense(<REETwinPage />) },
      { path: 'internal-portal', element: withSuspense(<InternalPortalPage />) },
      { path: 'google-keep', element: pageWithSetPage(GoogleKeepPage) },
      { path: 'search', element: <SearchResultsRoute /> },
      { path: 'futures', element: withSuspense(<FuturesPage />) },
      { path: 'offline', element: <OfflineRoute /> },

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
      { path: 'keep', element: <Navigate to="/google-keep" replace /> },

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
