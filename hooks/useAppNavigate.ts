import { useCallback } from 'react';
import { useNavigate, type NavigateOptions } from 'react-router';
import { Page } from '../types';
import { pageToPath } from '../lib/routes';

export type AppNavigateOptions = NavigateOptions & {
  /**
   * Optional query string already encoded, e.g. "q=geothermal"
   * Prefer search params object via NavigateOptions when possible.
   */
  query?: string;
};

/**
 * Compatibility navigation helper.
 * Allows existing setPage(Page.X) call sites to migrate without rewriting every consumer at once.
 */
export function useAppNavigate() {
  const navigate = useNavigate();

  const navigateToPage = useCallback(
    (page: Page, options?: AppNavigateOptions) => {
      const path = pageToPath(page);
      const to = options?.query ? `${path}?${options.query}` : path;
      const { query: _query, ...navOptions } = options ?? {};
      navigate(to, navOptions);
    },
    [navigate]
  );

  return navigateToPage;
}

/**
 * Optional helper for deep links that already know a concrete path.
 */
export function usePathNavigate() {
  return useNavigate();
}
