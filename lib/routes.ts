import { Page } from '../types';

export const CANONICAL_HOST = 'https://www.kkm-intl.org';

/**
 * Maps a URL pathname to the corresponding KKM Page enum.
 * Returns Page.NotFound if the route is unmapped.
 */
export function pathToPage(pathname: string): Page {
  if (!pathname) return Page.Home;

  // Strip trailing slashes, except for root '/'
  const p = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  const normalized = p.toLowerCase();

  if (/^\/news\/[^/]+/.test(normalized)) {
    return Page.News;
  }

  switch (normalized) {
    case '':
    case '/':
      return Page.Home;

    case '/about':
    case '/about-us':
    case '/aboutus':
      return Page.AboutUs;

    case '/technology':
    case '/technologies':
    case '/core-technologies':
      return Page.Technology;

    case '/projects':
    case '/projects-and-pilots':
    case '/project':
      return Page.Projects;

    case '/news':
    case '/news-and-insights':
    case '/insights':
      return Page.News;

    case '/downloads':
    case '/whitepapers':
      return Page.Downloads;

    case '/rural':
    case '/rural-development':
      return Page.RuralStudies;

    case '/exhibition':
    case '/rural-1405':
    case '/exhibition/rural-1405':
      return Page.Exhibition;

    case '/evidence':
    case '/evidence-registry':
      return Page.EvidenceRegistry;

    case '/claims':
    case '/claims-registry':
    case '/claim-registry':
      return Page.ClaimRegistry;

    case '/invest':
    case '/investment-portal':
      return Page.InvestmentPortal;

    case '/innovation':
    case '/innovation-hub':
      return Page.InnovationHub;

    case '/corporate':
    case '/corporate-info':
      return Page.CorporateInfo;

    case '/ip':
    case '/ip-center':
      return Page.IPCenter;

    case '/gmel':
      return Page.GMELHub;

    case '/pilot-request':
      return Page.PilotRequest;

    case '/project-development':
      return Page.ProjectDevelopment;

    case '/sustainability':
    case '/esg':
      return Page.Sustainability;

    case '/carbon-credits':
    case '/carbon-credit':
      return Page.CarbonCredit;

    case '/legal':
      return Page.Legal;

    case '/careers':
      return Page.Careers;

    case '/contact':
    case '/contact-us':
      return Page.Contact;

    case '/digital-twins':
    case '/digital-twin':
      return Page.DigitalTwinHub;

    case '/internal-portal':
    case '/portal':
      return Page.InternalPortal;

    case '/google-keep':
    case '/keep':
      return Page.GoogleKeep;

    case '/futures':
      return Page.Futures;

    case '/search':
      return Page.SearchResults;

    case '/offline':
      return Page.Offline;

    default:
      return Page.NotFound;
  }
}

/**
 * Maps a Page enum value to its canonical URL path.
 */
export function pageToPath(page: Page): string {
  switch (page) {
    case Page.Home:
      return '/';

    case Page.AboutUs:
      return '/about';

    case Page.Technology:
    case Page.CoreTechnologies:
      return '/technology';

    case Page.Projects:
      return '/projects';

    case Page.News:
    case Page.Insights:
      return '/news';

    case Page.Downloads:
      return '/downloads';

    case Page.RuralStudies:
      return '/rural-development';

    case Page.Exhibition:
      return '/exhibition/rural-1405';

    case Page.EvidenceRegistry:
      return '/evidence-registry';

    case Page.ClaimRegistry:
      return '/claims-registry';

    case Page.Invest:
    case Page.InvestmentPortal:
      return '/invest';

    case Page.InnovationHub:
      return '/innovation-hub';

    case Page.CorporateInfo:
      return '/corporate-info';

    case Page.IPCenter:
    case Page.IntellectualProperty:
      return '/ip-center';

    case Page.GMELHub:
    case Page.Ecosystems:
      return '/gmel';

    case Page.PilotRequest:
      return '/pilot-request';

    case Page.ProjectDevelopment:
      return '/project-development';

    case Page.Sustainability:
      return '/sustainability';

    case Page.CarbonCredit:
      return '/carbon-credits';

    case Page.Legal:
      return '/legal';

    case Page.Careers:
      return '/careers';

    case Page.Contact:
      return '/contact';

    case Page.DigitalTwinHub:
    case Page.DigitalTwinGMEL:
    case Page.DigitalTwinREE:
      return '/digital-twins';

    case Page.InternalPortal:
      return '/internal-portal';

    case Page.GoogleKeep:
      return '/google-keep';

    case Page.SearchResults:
      return '/search';

    case Page.Futures:
      return '/futures';

    case Page.Offline:
      return '/offline';

    case Page.NotFound:
      return typeof window !== 'undefined' ? window.location.pathname : '/404';

    default:
      return '/';
  }
}
