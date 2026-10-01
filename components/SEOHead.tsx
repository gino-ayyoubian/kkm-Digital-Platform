import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../LanguageContext';

interface SEOHeadProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: string;
  keywords?: string;
  noindex?: boolean;
  schemaType?: 'Organization' | 'WebSite' | 'Article' | 'Breadcrumb';
  customSchema?: Record<string, any>;
  articleData?: {
    publishedTime: string;
    modifiedTime: string;
    author: string;
    section: string;
  };
  breadcrumbData?: { name: string; item: string }[];
}

const DEFAULT_OG_IMAGE = 'https://www.kkm-intl.org/og-image.png';

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  url = 'https://www.kkm-intl.org',
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  keywords = 'Geothermal Energy Technology, Closed Loop Geothermal, Rural Energy Systems, Rural Infrastructure, Energy Village, Water Energy Nexus, Industrial AI, EPCM Iran, Sustainable Infrastructure, Rural Development Technology, Geothermal Multi Energy, GeoMeta Energy Layer, Gmel Technology Ecosystem',
  noindex = false,
  schemaType = 'WebSite',
  customSchema,
  articleData,
  breadcrumbData
}) => {
  const { language, direction } = useLanguage();

  const getLanguageCode = (lang: string) => {
    const map: Record<string, string> = {
      'EN': 'en',
      'FA': 'fa',
      'AR': 'ar',
      'KU': 'ku',
      'RU': 'ru'
    };
    return map[lang] || 'en';
  };

  const currentLang = getLanguageCode(language);
  const locale = currentLang === 'fa' ? 'fa_IR' : currentLang === 'ar' ? 'ar_AE' : currentLang === 'ku' ? 'ku_IQ' : currentLang === 'ru' ? 'ru_RU' : 'en_US';

  // Base Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "KKM International Group",
    "alternateName": "Kimia Karan Mâd Private Joint Stock Company",
    "url": "https://www.kkm-intl.org",
    "logo": image,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+98-21-91030830",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://www.linkedin.com/company/kkm-intl-co",
      "https://x.com/kkm_intl_co",
      "https://www.instagram.com/kkm.intl.co"
    ]
  };

  // Base WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "KKM International Group",
    "url": "https://www.kkm-intl.org",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.kkm-intl.org/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const articleSchema = articleData ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "image": [image],
    "datePublished": articleData.publishedTime,
    "dateModified": articleData.modifiedTime,
    "author": [{
        "@type": "Organization",
        "name": articleData.author,
        "url": "https://www.kkm-intl.org"
      }]
  } : null;

  const breadcrumbListSchema = breadcrumbData ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbData.map((crumb, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": crumb.name,
      "item": crumb.item
    }))
  } : null;

  let activeSchema = customSchema;
  if (!activeSchema) {
    if (schemaType === 'Organization') activeSchema = organizationSchema;
    else if (schemaType === 'Article' && articleSchema) activeSchema = articleSchema;
    else if (schemaType === 'Breadcrumb' && breadcrumbListSchema) activeSchema = breadcrumbListSchema;
    else activeSchema = websiteSchema;
  }

  return (
    <Helmet>
      <html lang={currentLang} dir={direction} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noindex ? (
        <>
          <meta name="robots" content="noindex, nofollow" />
          <meta name="googlebot" content="noindex, nofollow" />
        </>
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="en" href={url} />
      <link rel="alternate" hrefLang="fa" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="KKM International Group" />
      <meta property="og:locale" content={locale} />
      {articleData && (
          <meta property="article:published_time" content={articleData.publishedTime} />
      )}
      {articleData && (
          <meta property="article:modified_time" content={articleData.modifiedTime} />
      )}
      {articleData && (
          <meta property="article:section" content={articleData.section} />
      )}

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@kkm_intl_co" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(activeSchema)}
      </script>
      {/* Always include Organization schema as a base */}
      {schemaType !== 'Organization' && !customSchema && (
          <script type="application/ld+json">
            {JSON.stringify(organizationSchema)}
          </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
