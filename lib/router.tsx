import React, { Suspense } from 'react';
import {
  createBrowserRouter,
  Navigate,
  useParams,
  useSearchParams,
  type RouteObject,
} from 'react-router';
import RootLayout from '../components/RootLayout';
import { PageTemplateSkeleton } from '../components/ShimmerSkeleton';
import { findArticleBySlug } from './news';
import { pathToPage, pageToPath } from './routes';
import { Page } from '../types';

/**
 * Lazy page modules — keep the same code-splitting behavior already used in App.tsx.
 * trackLazyLoad wrappers can be re-applied here if analytics on chunk load is still required.
 */
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

/**
 * Thin wrappers for routes that previously depended on App-level state.
 * Keep these temporary until page components read router state directly.
 */
function NewsArticleRoute() {
  const { slug = '' } = useParams();
  const article = findArticleBySlug(slug);
  if (!article) {
    return withSuspense(<NotFoundPage />);
  }
  // Adapt prop name to the real NewsArticlePage API as needed.
  return withSuspense(<NewsArticlePage article={article} />);
}

function SearchResultsRoute() {
  const [params] = useSearchParams();
  const query = params.get('q') ?? '';
  // Adapt props to the real SearchResultsPage API as needed.
  return withSuspense(<SearchResultsPage query={query} />);
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

/**
 * Canonical route table derived from lib/routes.ts.
 * Aliases are handled as redirects so only one canonical path remains indexed.
 */
export const routeObjects: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: withSuspense(<HomePage />) },

      // Canonical pages
      { path: 'about', element: withSuspense(<AboutUsPage />) },
      { path: 'technology', element: withSuspense(<CoreTechnologiesPage />) },
      { path: 'projects', element: withSuspense(<ProjectsPage />) },
      { path: 'news', element: withSuspense(<NewsPage />) },
      { path: 'news/:slug', element: <NewsArticleRoute /> },
      { path: 'downloads', element: withSuspense(<DownloadsPage />) },
      { path: 'rural-development', element: withSuspense(<RuralDevelopmentPage />) },
      { path: 'exhibition/rural-1405', element: withSuspense(<ExhibitionPage />) },
      { path: 'evidence-registry', element: withSuspense(<EvidenceRegistryPage />) },
      { path: 'claims-registry', element: withSuspense(<ClaimRegistryPage />) },
      { path: 'invest', element: withSuspense(<InvestmentPortalPage />) },
      { path: 'team', element: withSuspense(<TeamPage />) },
      { path: 'faq', element: withSuspense(<FAQPage />) },
      { path: 'divisions', element: withSuspense(<DivisionsPage />) },
      { path: 'innovation-hub', element: withSuspense(<InnovationHubPage />) },
      { path: 'corporate-info', element: withSuspense(<CorporateInfoPage />) },
      { path: 'ip-center', element: withSuspense(<IPCenterPage />) },
      { path: 'gmel', element: withSuspense(<GMELHubPage />) },
      { path: 'pilot-request', element: withSuspense(<PilotRequestPage />) },
      { path: 'project-development', element: withSuspense(<ProjectDevelopmentPage />) },
      { path: 'sustainability', element: withSuspense(<ESGDashboard />) },
      { path: 'carbon-credits', element: withSuspense(<CarbonCreditPage />) },
      { path: 'legal', element: withSuspense(<LegalPage />) },
      { path: 'careers', element: withSuspense(<CareersPage />) },
      { path: 'contact', element: withSuspense(<ContactPage />) },
      { path: 'digital-twins', element: withSuspense(<DigitalTwinHubPage />) },
      { path: 'ree', element: withSuspense(<REETwinPage />) },
      { path: 'internal-portal', element: withSuspense(<InternalPortalPage />) },
      { path: 'google-keep', element: withSuspense(<GoogleKeepPage />) },
      { path: 'search', element: <SearchResultsRoute /> },
      { path: 'futures', element: withSuspense(<FuturesPage />) },
      { path: 'offline', element: withSuspense(<OfflinePage />) },

      // Alias redirects → canonical paths (SEO-safe)
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

      // Legacy query-string support: /?page=AboutUs
      { path: 'legacy-page', element: <LegacyPageQueryRedirect /> },

      // Catch-all 404
      { path: '*', element: withSuspense(<NotFoundPage />) },
    ],
  },
];

export const router = createBrowserRouter(routeObjects);

/**
 * Optional helper during migration:
 * derive Page enum from the active location for components that still expect Page values.
 */
export function useCurrentPage(): Page {
  const locationPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  return pathToPage(locationPath);
}
