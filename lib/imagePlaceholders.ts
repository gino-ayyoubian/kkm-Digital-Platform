/**
 * KKM International Group - Image Placeholders & LQIP Generator
 * Provides ultra-lightweight Base64 Low-Resolution Image Overlays (LQIP)
 * for high-resolution project and news photography to enable smooth blur-up transitions.
 */

// Helper to generate tiny SVG blur placeholders encoded as Base64 Data URIs
const createSvgDataUri = (color1: string, color2: string, color3: string, angle = 45): string => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 18" width="32" height="18"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(${angle})"><stop offset="0%" stop-color="${color1}"/><stop offset="50%" stop-color="${color2}"/><stop offset="100%" stop-color="${color3}"/></linearGradient><filter id="b"><feGaussianBlur stdDeviation="2"/></filter></defs><rect width="32" height="18" fill="url(#g)" filter="url(#b)"/><circle cx="22" cy="9" r="6" fill="${color3}" opacity="0.4" filter="url(#b)"/></svg>`;
  if (typeof btoa !== 'undefined') {
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

// Specialized base64 placeholders matching corporate and industrial domain color palettes
export const DEFAULT_ENERGY_PLACEHOLDER = createSvgDataUri('#0f172a', '#1e3a8a', '#4c9afe', 30);
export const DEFAULT_GEOTHERMAL_PLACEHOLDER = createSvgDataUri('#1e293b', '#b45309', '#f9a826', 60);
export const DEFAULT_WATER_PLACEHOLDER = createSvgDataUri('#082f49', '#0284c7', '#38bdf8', 45);
export const DEFAULT_MICROGRID_PLACEHOLDER = createSvgDataUri('#064e3b', '#059669', '#34d399', 40);
export const DEFAULT_CORPORATE_PLACEHOLDER = createSvgDataUri('#1e293b', '#1e3a8a', '#3b82f6', 15);
export const DEFAULT_EVIDENCE_PLACEHOLDER = createSvgDataUri('#022c22', '#047857', '#10b981', 45);
export const DEFAULT_INFRASTRUCTURE_PLACEHOLDER = createSvgDataUri('#1e293b', '#475569', '#f59e0b', 50);

// Specific Project Image Mappings
export const PROJECT_PLACEHOLDERS: Record<string, string> = {
  '/images/qeshm-oilfield.svg': createSvgDataUri('#0c2340', '#1E3A8A', '#4C9AFE', 45),
  '/images/sarakhs-energy.svg': createSvgDataUri('#1e1b4b', '#4338ca', '#f9a826', 30),
  '/images/bandar-abbas.svg': createSvgDataUri('#042f2e', '#0f766e', '#2dd4bf', 60),
  '/images/khorasan-microgrid.svg': createSvgDataUri('#064e3b', '#059669', '#f59e0b', 45),
  '/images/geo-layer.svg': createSvgDataUri('#1c1917', '#b45309', '#f9a826', 45),
  '/images/fossil-refinery.svg': createSvgDataUri('#18181b', '#3f3f46', '#71717a', 30),
  '/images/oil-stabilization.svg': createSvgDataUri('#0f172a', '#1e293b', '#38bdf8', 45),
  '/images/lave-jetty.svg': createSvgDataUri('#082f49', '#0369a1', '#f59e0b', 60),
  '/images/combined-cycle.svg': createSvgDataUri('#1e293b', '#2563eb', '#60a5fa', 40),
  '/images/rural-water.svg': createSvgDataUri('#064e3b', '#0d9488', '#2dd4bf', 30),
};

// Specific News Article Image Mappings
export const NEWS_PLACEHOLDERS: Record<string, string> = {
  '/images/truth-evidence.svg': DEFAULT_EVIDENCE_PLACEHOLDER,
  '/images/geothermal-energy.svg': DEFAULT_GEOTHERMAL_PLACEHOLDER,
  '/images/water-nexus.svg': DEFAULT_WATER_PLACEHOLDER,
  '/images/smart-microgrid.svg': DEFAULT_MICROGRID_PLACEHOLDER,
  '/images/rural-development.svg': DEFAULT_MICROGRID_PLACEHOLDER,
  '/images/carbon-capture.svg': createSvgDataUri('#0f172a', '#047857', '#34d399', 45),
  '/images/ai-systems.svg': createSvgDataUri('#1e1b4b', '#3b82f6', '#818cf8', 30),
  '/images/patent-granted.svg': createSvgDataUri('#1c1917', '#d97706', '#fbbf24', 45),
  '/images/cop29-delegation.svg': DEFAULT_CORPORATE_PLACEHOLDER,
  '/images/corporate-governance.svg': DEFAULT_CORPORATE_PLACEHOLDER,
};

/**
 * Universal lookup to retrieve a corresponding base64-encoded low-res placeholder.
 * If not in the explicit dictionary, returns a contextual palette based on URL hints or fallbackType.
 */
export function getPlaceholderForImage(
  imageSrc?: string,
  fallbackType: 'energy' | 'project' | 'news' | 'corporate' = 'project'
): string {
  if (!imageSrc) return DEFAULT_ENERGY_PLACEHOLDER;

  // Direct dictionary lookup
  if (PROJECT_PLACEHOLDERS[imageSrc]) return PROJECT_PLACEHOLDERS[imageSrc];
  if (NEWS_PLACEHOLDERS[imageSrc]) return NEWS_PLACEHOLDERS[imageSrc];

  const lower = imageSrc.toLowerCase();

  if (lower.includes('geo') || lower.includes('thermal') || lower.includes('heat')) {
    return DEFAULT_GEOTHERMAL_PLACEHOLDER;
  }
  if (lower.includes('water') || lower.includes('desal') || lower.includes('marine') || lower.includes('sea')) {
    return DEFAULT_WATER_PLACEHOLDER;
  }
  if (lower.includes('microgrid') || lower.includes('solar') || lower.includes('rural') || lower.includes('agri')) {
    return DEFAULT_MICROGRID_PLACEHOLDER;
  }
  if (lower.includes('evidence') || lower.includes('truth') || lower.includes('registry')) {
    return DEFAULT_EVIDENCE_PLACEHOLDER;
  }
  if (lower.includes('oil') || lower.includes('gas') || lower.includes('refin') || lower.includes('jetty')) {
    return DEFAULT_INFRASTRUCTURE_PLACEHOLDER;
  }
  if (lower.includes('news') || fallbackType === 'news') {
    return DEFAULT_CORPORATE_PLACEHOLDER;
  }

  return DEFAULT_ENERGY_PLACEHOLDER;
}
