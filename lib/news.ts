import { NEWS_ITEMS } from '../constants';
import type { NewsItem } from '../types';

export function getArticleSlug(title: string) {
  return encodeURIComponent(
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  );
}

export function findArticleBySlug(slug: string | null | undefined): NewsItem | null {
  if (!slug) return null;

  const normalizedSlug = decodeURIComponent(slug).toLowerCase();
  return NEWS_ITEMS.find((item) => getArticleSlug(item.title) === normalizedSlug) ?? null;
}

export function getArticleSlugFromPath(pathname: string) {
  const match = pathname.match(/^\/news\/([^/?#]+)/i);
  return match?.[1] ?? null;
}
