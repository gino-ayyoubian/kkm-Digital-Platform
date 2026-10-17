/**
 * React Router 7 application entry (Phase 3).
 * Legacy App.tsx is retained on this branch for rollback.
 */
import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { Analytics } from '@vercel/analytics/react';
import { router } from './lib/router';
import { parseUTMParams } from './lib/analytics';
import A11yDebugOverlay from './components/A11yDebugOverlay';

const AppRouter: React.FC = () => {
  useEffect(() => {
    parseUTMParams();
  }, []);

  // Vite chunk load failure recovery (parity with legacy App)
  useEffect(() => {
    const handlePreloadError = (event: Event) => {
      event.preventDefault();
      try {
        const reloadKey = 'kkm_vite_preload_ts';
        const lastReload = window.sessionStorage.getItem(reloadKey);
        const now = Date.now();
        if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
          window.sessionStorage.setItem(reloadKey, String(now));
          window.location.reload();
        }
      } catch {
        window.location.reload();
      }
    };

    window.addEventListener('vite:preloadError', handlePreloadError);
    return () => window.removeEventListener('vite:preloadError', handlePreloadError);
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <A11yDebugOverlay />
      <Analytics />
    </>
  );
};

export default AppRouter;
