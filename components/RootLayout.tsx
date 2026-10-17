import React, { Suspense } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import SkipToContent from './SkipToContent';
import BackToTopButton from './BackToTopButton';
import CookieConsent from './CookieConsent';
import RouteSEO from './RouteSEO';
import { PageTemplateSkeleton } from './ShimmerSkeleton';
import { pathToPage } from '../lib/routes';
import { useAppNavigate } from '../hooks/useAppNavigate';

/**
 * Application shell.
 * Keeps chrome (header/footer/utilities) stable while route content swaps via <Outlet />.
 *
 * Temporary compatibility:
 * - Header still accepts setPage / currentPage during the migration window.
 * - Those props are derived from the router so existing Header code keeps working.
 */
const RootLayout: React.FC = () => {
  const location = useLocation();
  const navigateToPage = useAppNavigate();
  const navigate = useNavigate();

  const currentPage = pathToPage(location.pathname);

  const handleSearch = React.useCallback(
    (query: string) => {
      const q = query.trim();
      if (!q) return;
      navigate(`/search?q=${encodeURIComponent(q)}`);
    },
    [navigate]
  );

  return (
    <div className="min-h-screen flex flex-col">
      <RouteSEO />
      <SkipToContent />

      <Header
        currentPage={currentPage}
        setPage={navigateToPage}
        onSearch={handleSearch}
      />

      <main id="main-content" className="flex-1">
        <Suspense fallback={<PageTemplateSkeleton template="standard" />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
      <BackToTopButton />
      <CookieConsent />
    </div>
  );
};

export default RootLayout;
