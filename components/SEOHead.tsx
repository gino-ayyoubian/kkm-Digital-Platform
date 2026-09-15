import * as React from 'react';
import { useLanguage } from '../LanguageContext';

interface SEOHeadProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: string;
  keywords?: string;
  jsonLdSchema?: Record<string, any>;
}

/**
 * SEOHead Component
 * Manages document head elements including title, meta tags, Open Graph, Twitter Cards,
 * and dynamic JSON-LD structured data for comprehensive Search Engine Optimization.
 * Handles language and direction attributes on the HTML element.
 * 
 * @param {SEOHeadProps} props - SEO configuration properties
 * @returns {null} This component does not render DOM elements
 */
const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  url = 'https://kkm-international.org/',
  image = 'https://storage.googleapis.com/aistudio-chat-prod-gemini-image-serving/e0cfcd0b2fb249f3906371f4b3df36c7',
  type = 'website',
  keywords = 'KKM International, Sustainable Engineering, Geothermal Energy, Innovation, EPCI, Renewable Energy, Green Technology',
  jsonLdSchema,
}) => {
  const { language, direction } = useLanguage();

  React.useEffect(() => {
    // Update document title
    document.title = title;

    // Update html attributes for accessibility and SEO
    document.documentElement.lang = language.toLowerCase();
    document.documentElement.dir = direction;

    // Helper to update or create meta tags
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard Meta
    setMeta('description', description);
    setMeta('keywords', keywords);
    
    // Canonical URL for deduplication
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // Viewport settings for mobile-first rendering
    setMeta('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=5.0', false);

    // Open Graph
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:url', url, true);
    setMeta('og:image', image, true);
    setMeta('og:type', type, true);
    setMeta('og:site_name', 'KKM International Group', true);
    setMeta('og:locale', language === 'FA' ? 'fa_IR' : 'en_US', true);

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image', false);
    setMeta('twitter:title', title, false);
    setMeta('twitter:description', description, false);
    setMeta('twitter:image', image, false);
    setMeta('twitter:url', url, false);

    // Default Organization Schema
    const defaultOrganizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "KKM International Group",
      "url": "https://kkm-international.org",
      "logo": "https://storage.googleapis.com/aistudio-chat-prod-gemini-image-serving/e0cfcd0b2fb249f3906371f4b3df36c7",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+98-21-91030822",
        "contactType": "customer service"
      },
      "sameAs": [
        "https://www.linkedin.com/company/kkm-intl-co",
        "https://x.com/i/kkm_intl_co",
        "https://www.instagram.com/kkm.intl.co"
      ]
    };

    // Handle dynamic JSON-LD Structured Data
    let schemaScript = document.querySelector('script[id="dynamic-json-ld"]');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.setAttribute('type', 'application/ld+json');
      schemaScript.setAttribute('id', 'dynamic-json-ld');
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(jsonLdSchema || defaultOrganizationSchema);

  }, [title, description, url, image, type, keywords, language, direction, jsonLdSchema]);

  return null;
};

export default SEOHead;