import { describe, expect, it } from 'vitest';
import { pathToPage, pageToPath } from '../lib/routes';
import { Page } from '../types';

describe('route helpers', () => {
  it('maps article detail paths back to the news page', () => {
    expect(pathToPage('/news/kkm-launches-gmel')).toBe(Page.News);
  });

  it('maps canonical page enums to stable paths', () => {
    expect(pageToPath(Page.News)).toBe('/news');
    expect(pageToPath(Page.InternalPortal)).toBe('/internal-portal');
  });

  it('returns not found for unmapped routes', () => {
    expect(pathToPage('/definitely-not-a-real-route')).toBe(Page.NotFound);
  });
});
