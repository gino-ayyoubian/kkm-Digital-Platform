import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { vi } from 'vitest';
import { LanguageProvider } from '../LanguageContext';
import SEOHead from '../components/SEOHead';
import HomePage from '../pages/HomePage';
import { CEOSignatureBanner } from '../components/CEOSignatureBanner';

describe('SEO and accessibility regressions', () => {
  it('uses an absolute default og:image URL in shared SEO metadata', async () => {
    render(
      <LanguageProvider>
        <HelmetProvider>
          <SEOHead title="KKM International | Technology & Engineering" description="Test description for SEO metadata." />
        </HelmetProvider>
      </LanguageProvider>
    );

    await waitFor(() => {
      expect(document.title).toBe('KKM International | Technology & Engineering');
    });
    expect(document.head.querySelector('meta[property="og:image"]')).toHaveAttribute(
      'content',
      'https://www.kkm-intl.org/og-image.png'
    );
    expect(document.head.querySelector('meta[name="twitter:card"]')).toHaveAttribute(
      'content',
      'summary_large_image'
    );
  });

  it('keeps homepage card headings at h3 directly under the section h2', () => {
    render(
      <LanguageProvider>
        <HomePage setPage={vi.fn()} />
      </LanguageProvider>
    );

    expect(screen.getByRole('heading', { level: 2, name: 'Why KKM International' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Engineering-Led' })).toBeInTheDocument();
  });

  it('renders the CEO signature heading as h3', () => {
    render(
      <LanguageProvider>
        <CEOSignatureBanner />
      </LanguageProvider>
    );

    expect(screen.getByRole('heading', { level: 3, name: 'Gino Ayyoubian' })).toBeInTheDocument();
  });
});
