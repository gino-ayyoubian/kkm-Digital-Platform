/**
 * EXAMPLE ONLY — target shape for the application entry after routing migration.
 *
 * Do not replace App.tsx wholesale without completing Phases 0–3.
 * This file shows the intended end-state composition.
 */

import React from 'react';
import { RouterProvider } from 'react-router';
import { router } from './lib/router';

// Existing providers remain exactly as they are today.
import { ThemeProvider } from './ThemeContext';
import { LanguageProvider } from './LanguageContext';
import { AuthProvider } from './AuthContext';
// import any other existing providers (Sentry, Analytics wrappers, etc.)

/**
 * Target root composition:
 * Providers stay outside the router so theme/language/auth remain available
 * to route modules and layout chrome.
 */
export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

/**
 * Migration notes:
 * 1. Keep existing providers and global side-effects (Sentry init, analytics, etc.).
 * 2. Remove currentPage state and history pushState/popstate effects from the old App.
 * 3. Move page rendering out of App and into route modules via <Outlet />.
 * 4. Header continues to receive setPage during the compatibility window via RootLayout.
 */
