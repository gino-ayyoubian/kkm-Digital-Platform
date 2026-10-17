import React from 'react';
import { useNavigate } from 'react-router';
import { Page } from '../types';
import type { NewsItem } from '../types';
import { useAppNavigate } from '../hooks/useAppNavigate';
import { getArticleSlug } from './news';

/**
 * Injects setPage (Page enum → navigate) into page components that still expect it.
 */
export function withSetPage<P extends { setPage: (page: Page) => void }>(
  Component: React.ComponentType<P>
) {
  const Wrapped: React.FC<Omit<P, 'setPage'>> = (props) => {
    const setPage = useAppNavigate();
    return <Component {...(props as P)} setPage={setPage} />;
  };
  Wrapped.displayName = `withSetPage(${Component.displayName || Component.name || 'Component'})`;
  return Wrapped;
}

/**
 * Injects onSelectArticle navigation to /news/:slug.
 */
export function withSelectArticle<P extends { onSelectArticle: (article: NewsItem) => void }>(
  Component: React.ComponentType<P>
) {
  const Wrapped: React.FC<Omit<P, 'onSelectArticle'>> = (props) => {
    const navigate = useNavigate();
    const onSelectArticle = React.useCallback(
      (article: NewsItem) => {
        navigate(`/news/${getArticleSlug(article.title)}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      [navigate]
    );
    return <Component {...(props as P)} onSelectArticle={onSelectArticle} />;
  };
  Wrapped.displayName = `withSelectArticle(${Component.displayName || Component.name || 'Component'})`;
  return Wrapped;
}
