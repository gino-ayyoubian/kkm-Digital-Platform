/**
 * KKM Enterprise Server-Side SEO & OpenGraph Prerender Service
 * Injects route-specific metadata into initial HTML responses for social crawlers
 * (Telegram, WhatsApp, LinkedIn, Facebook, Twitter/X, Googlebot, etc.)
 */

import type { PageMeta } from '../lib/seoMetadata';
import {
  CANONICAL_HOST,
  DEFAULT_OG_IMAGE,
  ROUTE_METADATA,
  ALIAS_MAP,
  resolveMetaForPath,
} from '../lib/seoMetadata';

export type { PageMeta };
export {
  CANONICAL_HOST,
  DEFAULT_OG_IMAGE,
  ROUTE_METADATA,
  ALIAS_MAP,
  resolveMetaForPath,
};

/**
 * Injects OpenGraph, Twitter, and canonical metadata directly into HTML <head>
 * before serving to social media crawlers and browsers.
 */
export function injectSeoMetadata(html: string, requestPath: string): string {
  const meta = resolveMetaForPath(requestPath);

  let updated = html;

  // Replace <title>
  updated = updated.replace(/<title>.*?<\/title>/i, `<title>${meta.title}</title>`);

  // Replace <meta name="title" ...>
  updated = updated.replace(
    /<meta\s+name="title"\s+content=".*?"\s*\/?>/i,
    `<meta name="title" content="${meta.title}" />`
  );

  // Replace <meta name="description" ...>
  updated = updated.replace(
    /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
    `<meta name="description" content="${meta.description}" />`
  );

  // Replace <link rel="canonical" ...>
  updated = updated.replace(
    /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
    `<link rel="canonical" href="${meta.canonicalUrl}" />`
  );

  // Replace OpenGraph tags
  updated = updated.replace(
    /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:title" content="${meta.title}" />`
  );

  updated = updated.replace(
    /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:description" content="${meta.description}" />`
  );

  updated = updated.replace(
    /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:url" content="${meta.canonicalUrl}" />`
  );

  updated = updated.replace(
    /<meta\s+property="og:image"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:image" content="${meta.ogImage}" />`
  );

  updated = updated.replace(
    /<meta\s+property="og:image:secure_url"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:image:secure_url" content="${meta.ogImage}" />`
  );

  const isJpeg = meta.ogImage.endsWith('.jpg') || meta.ogImage.endsWith('.jpeg');
  const imageMime = isJpeg ? 'image/jpeg' : 'image/png';
  const isPersian = requestPath.startsWith('/fa') || requestPath.includes('lang=fa');
  const locale = isPersian ? 'fa_IR' : 'en_US';
  const altLocale = isPersian ? 'en_US' : 'fa_IR';

  // Replace OpenGraph image type and dimensions
  updated = updated.replace(
    /<meta\s+property="og:image:type"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:image:type" content="${imageMime}" />`
  );

  updated = updated.replace(
    /<meta\s+property="og:image:alt"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:image:alt" content="${meta.title}" />`
  );

  // Replace Twitter image alt
  updated = updated.replace(
    /<meta\s+property="twitter:image:alt"\s+content=".*?"\s*\/?>/i,
    `<meta property="twitter:image:alt" content="${meta.title}" />`
  );

  // Ensure og:locale is present and accurate
  if (updated.includes('property="og:locale"')) {
    updated = updated.replace(
      /<meta\s+property="og:locale"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:locale" content="${locale}" />`
    );
  } else {
    updated = updated.replace(
      /<\/head>/i,
      `  <meta property="og:locale" content="${locale}" />\n  <meta property="og:locale:alternate" content="${altLocale}" />\n</head>`
    );
  }

  // Replace Twitter tags
  updated = updated.replace(
    /<meta\s+property="twitter:title"\s+content=".*?"\s*\/?>/i,
    `<meta property="twitter:title" content="${meta.title}" />`
  );

  updated = updated.replace(
    /<meta\s+property="twitter:description"\s+content=".*?"\s*\/?>/i,
    `<meta property="twitter:description" content="${meta.description}" />`
  );

  updated = updated.replace(
    /<meta\s+property="twitter:url"\s+content=".*?"\s*\/?>/i,
    `<meta property="twitter:url" content="${meta.canonicalUrl}" />`
  );

  updated = updated.replace(
    /<meta\s+property="twitter:image"\s+content=".*?"\s*\/?>/i,
    `<meta property="twitter:image" content="${meta.ogImage}" />`
  );

  return updated;
}
