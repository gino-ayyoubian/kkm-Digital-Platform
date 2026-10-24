import { describe, expect, it } from 'vitest';
import { pathToPage, pageToPath } from '../lib/routes';
import { Page } from '../types';

describe('route helpers', () => {
  it('maps article detail paths back to the news page', () => {
    expect(pathToPage('/news/kkm-launches-gmel')).toBe(Page.News);
  });

  it('maps canonical page enums to stable paths', () => {
    expect(pageToPath(Page.Home)).toBe('/');
    expect(pageToPath(Page.News)).toBe('/news');
    expect(pageToPath(Page.AboutUs)).toBe('/about');
    expect(pageToPath(Page.Technology)).toBe('/technology');
    expect(pageToPath(Page.Projects)).toBe('/projects');
    expect(pageToPath(Page.InternalPortal)).toBe('/internal-portal');
    expect(pageToPath(Page.InvestmentPortal)).toBe('/invest');
    expect(pageToPath(Page.RuralStudies)).toBe('/rural-development');
    expect(pageToPath(Page.DigitalTwinHub)).toBe('/digital-twins');
  });

  it('maps alias paths to the correct page enum', () => {
    expect(pathToPage('/about-us')).toBe(Page.AboutUs);
    expect(pathToPage('/aboutus')).toBe(Page.AboutUs);
    expect(pathToPage('/technologies')).toBe(Page.Technology);
    expect(pathToPage('/core-technologies')).toBe(Page.Technology);
    expect(pathToPage('/investors')).toBe(Page.InvestmentPortal);
    expect(pathToPage('/esg')).toBe(Page.Sustainability);
    expect(pathToPage('/contact-us')).toBe(Page.Contact);
    expect(pathToPage('/portal')).toBe(Page.InternalPortal);
    expect(pathToPage('/social-preview')).toBe(Page.SocialPreview);
    expect(pathToPage('/preview')).toBe(Page.SocialPreview);
    expect(pathToPage('/og-preview')).toBe(Page.SocialPreview);
    expect(pageToPath(Page.SocialPreview)).toBe('/social-preview');
  });

  it('round-trips page enum through path mapping', () => {
    const pages = [
      Page.Home,
      Page.AboutUs,
      Page.Technology,
      Page.Projects,
      Page.News,
      Page.Contact,
      Page.Careers,
      Page.GMELHub,
      Page.Legal,
    ];
    for (const page of pages) {
      expect(pathToPage(pageToPath(page))).toBe(page);
    }
  });

  it('returns not found for unmapped routes', () => {
    expect(pathToPage('/definitely-not-a-real-route')).toBe(Page.NotFound);
    expect(pathToPage('/foo/bar/baz')).toBe(Page.NotFound);
  });
});
