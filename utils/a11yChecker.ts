export interface ContrastViolation {
  id: string;
  element: HTMLElement;
  selector: string;
  textSnippet: string;
  textColor: string;
  bgColor: string;
  contrastRatio: number;
  requiredRatio: number;
  fontSize: string;
  fontWeight: string;
  isLargeText: boolean;
  message: string;
}

export interface FocusViolation {
  id: string;
  element: HTMLElement;
  selector: string;
  textSnippet: string;
  type: 'missing-accessible-name' | 'negative-tabindex' | 'aria-hidden-focusable' | 'missing-focus-indicator' | 'small-touch-target';
  message: string;
  severity: 'error' | 'warning';
  tabIndex: number;
}

export interface A11yAuditResult {
  timestamp: string;
  totalElementsScanned: number;
  contrastPassCount: number;
  contrastViolations: ContrastViolation[];
  focusPassCount: number;
  focusViolations: FocusViolation[];
  score: number; // 0 - 100
}

interface RGBColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

/**
 * Parse any CSS color string (rgb, rgba, hex, named) into RGB components
 */
function parseColor(colorStr: string): RGBColor | null {
  if (!colorStr || colorStr === 'transparent') {
    return { r: 0, g: 0, b: 0, a: 0 };
  }

  // Handle rgb / rgba
  const rgbaMatch = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (rgbaMatch) {
    return {
      r: parseInt(rgbaMatch[1], 10),
      g: parseInt(rgbaMatch[2], 10),
      b: parseInt(rgbaMatch[3], 10),
      a: rgbaMatch[4] !== undefined ? parseFloat(rgbaMatch[4]) : 1.0
    };
  }

  // Handle hex #rgb or #rrggbb
  if (colorStr.startsWith('#')) {
    let hex = colorStr.slice(1);
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }
    if (hex.length >= 6) {
      return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16),
        a: hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1.0
      };
    }
  }

  // Fallback test element
  const dummy = document.createElement('div');
  dummy.style.color = colorStr;
  document.body.appendChild(dummy);
  const computed = window.getComputedStyle(dummy).color;
  document.body.removeChild(dummy);
  const match = computed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (match) {
    return {
      r: parseInt(match[1], 10),
      g: parseInt(match[2], 10),
      b: parseInt(match[3], 10),
      a: match[4] !== undefined ? parseFloat(match[4]) : 1.0
    };
  }

  return null;
}

/**
 * Blend a foreground color with alpha onto a background color
 */
function blendColors(fg: RGBColor, bg: RGBColor): RGBColor {
  const alpha = fg.a;
  return {
    r: Math.round(fg.r * alpha + bg.r * (1 - alpha)),
    g: Math.round(fg.g * alpha + bg.g * (1 - alpha)),
    b: Math.round(fg.b * alpha + bg.b * (1 - alpha)),
    a: 1.0
  };
}

/**
 * Ascend DOM tree to find effectively visible background color
 */
function getEffectiveBackgroundColor(element: HTMLElement): RGBColor {
  let curr: HTMLElement | null = element;
  let accumulatedColor: RGBColor = { r: 0, g: 0, b: 0, a: 0 };

  while (curr && curr !== document.body && curr !== document.documentElement) {
    const style = window.getComputedStyle(curr);
    const bg = parseColor(style.backgroundColor);

    if (bg && bg.a > 0) {
      if (accumulatedColor.a === 0) {
        accumulatedColor = bg;
      } else {
        accumulatedColor = blendColors(accumulatedColor, bg);
      }
      if (accumulatedColor.a >= 0.98) {
        return accumulatedColor;
      }
    }
    curr = curr.parentElement;
  }

  // Check document body or html element
  const bodyStyle = window.getComputedStyle(document.body);
  const bodyBg = parseColor(bodyStyle.backgroundColor);
  if (bodyBg && bodyBg.a > 0) {
    accumulatedColor = blendColors(accumulatedColor, bodyBg);
    if (accumulatedColor.a >= 0.98) return accumulatedColor;
  }

  // Default to white in light mode, or dark slate in dark mode
  const isDark = document.documentElement.classList.contains('dark');
  const defaultBg: RGBColor = isDark ? { r: 15, g: 23, b: 42, a: 1 } : { r: 255, g: 255, b: 255, a: 1 };
  return blendColors(accumulatedColor, defaultBg);
}

/**
 * Calculate WCAG 2.1 relative luminance
 */
function getLuminance(color: RGBColor): number {
  const normalize = (val: number) => {
    const v = val / 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  const r = normalize(color.r);
  const g = normalize(color.g);
  const b = normalize(color.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate contrast ratio between two colors (1:1 to 21:1)
 */
function calculateContrastRatio(fg: RGBColor, bg: RGBColor): number {
  const l1 = getLuminance(fg);
  const l2 = getLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Produce clean CSS selector for an element
 */
function getElementSelector(el: HTMLElement): string {
  if (el.id) return `#${el.id}`;
  let selector = el.tagName.toLowerCase();
  if (el.classList.length > 0) {
    const classList = Array.from(el.classList).slice(0, 2).join('.');
    selector += `.${classList}`;
  }
  return selector;
}

/**
 * Truncate snippet
 */
function getSnippet(el: HTMLElement): string {
  const text = el.innerText?.trim() || el.getAttribute('aria-label') || el.getAttribute('title') || '';
  return text.length > 40 ? text.slice(0, 37) + '...' : text;
}

/**
 * Main function: Run accessibility audit on the document
 */
export function runAccessibilityAudit(): A11yAuditResult {
  const contrastViolations: ContrastViolation[] = [];
  let contrastPassCount = 0;

  const focusViolations: FocusViolation[] = [];
  let focusPassCount = 0;

  let totalElementsScanned = 0;

  // 1. Contrast Check on visible text-bearing elements
  // Target key UI elements: buttons, headings, links, paragraphs, inputs, spans, labels
  const textCandidateSelector = 'h1, h2, h3, h4, h5, h6, p, span, a, button, label, input, textarea, th, td';
  const textElements = Array.from(document.querySelectorAll<HTMLElement>(textCandidateSelector));

  textElements.forEach((el, index) => {
    // Skip hidden or zero-size elements
    if (el.offsetParent === null && el.tagName !== 'BODY') return;
    const text = el.innerText?.trim();
    if (!text && el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA') return;

    totalElementsScanned++;
    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return;

    const fgColor = parseColor(style.color);
    if (!fgColor) return;

    const bgColor = getEffectiveBackgroundColor(el);
    const contrastRatio = calculateContrastRatio(fgColor, bgColor);

    // Parse font size and weight
    const fontSizePx = parseFloat(style.fontSize) || 16;
    const fontWeight = parseInt(style.fontWeight, 10) || 400;
    // WCAG Large text: >= 24px (18pt) or >= 18.66px (14pt) with bold (>= 700)
    const isLargeText = fontSizePx >= 24 || (fontSizePx >= 18.66 && fontWeight >= 700);
    const requiredRatio = isLargeText ? 3.0 : 4.5;

    const roundedRatio = Math.round(contrastRatio * 100) / 100;

    if (roundedRatio < requiredRatio) {
      contrastViolations.push({
        id: `cv-${index}`,
        element: el,
        selector: getElementSelector(el),
        textSnippet: getSnippet(el),
        textColor: `rgb(${fgColor.r}, ${fgColor.g}, ${fgColor.b})`,
        bgColor: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`,
        contrastRatio: roundedRatio,
        requiredRatio,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        isLargeText,
        message: `Contrast ratio ${roundedRatio}:1 is below WCAG AA required ${requiredRatio}:1`
      });
    } else {
      contrastPassCount++;
    }
  });

  // 2. Tab-Focusability & Interactive Semantics Check
  const interactiveSelector = 'a, button, input:not([type="hidden"]), select, textarea, [tabindex], [role="button"], [role="link"], [role="tab"], [role="menuitem"]';
  const interactiveElements = Array.from(document.querySelectorAll<HTMLElement>(interactiveSelector));

  interactiveElements.forEach((el, index) => {
    // Skip if completely hidden
    if (el.offsetParent === null && !el.hasAttribute('tabindex')) return;

    totalElementsScanned++;
    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') return;

    const tabIndex = el.tabIndex;
    const hasAriaHiddenParent = !!el.closest('[aria-hidden="true"]');

    // Check 2a: Accessible Name
    const accessibleName =
      el.getAttribute('aria-label')?.trim() ||
      el.getAttribute('aria-labelledby')?.trim() ||
      el.innerText?.trim() ||
      el.getAttribute('title')?.trim() ||
      (el as HTMLInputElement).value?.trim() ||
      (el as HTMLInputElement).placeholder?.trim() ||
      el.querySelector('img')?.getAttribute('alt')?.trim();

    if (!accessibleName && !el.getAttribute('aria-hidden')) {
      focusViolations.push({
        id: `fv-name-${index}`,
        element: el,
        selector: getElementSelector(el),
        textSnippet: '<No Accessible Name>',
        type: 'missing-accessible-name',
        message: 'Interactive control lacks an accessible name (no text, aria-label, title, or alt)',
        severity: 'error',
        tabIndex
      });
      return;
    }

    // Check 2b: Focusable element inside aria-hidden parent (Accessibility Trap)
    if (hasAriaHiddenParent && tabIndex >= 0) {
      focusViolations.push({
        id: `fv-aria-trap-${index}`,
        element: el,
        selector: getElementSelector(el),
        textSnippet: getSnippet(el),
        type: 'aria-hidden-focusable',
        message: 'Focusable element is nested inside a container with aria-hidden="true"',
        severity: 'error',
        tabIndex
      });
      return;
    }

    // Check 2c: Negative tabindex on non-disabled interactive control
    if (tabIndex < 0 && (el.tagName === 'BUTTON' || el.tagName === 'A') && !el.hasAttribute('disabled')) {
      // Check if intentionally managed (e.g. roved tabindex inside menu/list)
      const role = el.getAttribute('role');
      if (!role || (role !== 'tab' && role !== 'menuitem')) {
        focusViolations.push({
          id: `fv-tabindex-${index}`,
          element: el,
          selector: getElementSelector(el),
          textSnippet: getSnippet(el),
          type: 'negative-tabindex',
          message: 'Interactive button/link has tabindex="-1", preventing standard keyboard navigation',
          severity: 'warning',
          tabIndex
        });
        return;
      }
    }

    // Check 2d: Missing Focus Indicator check
    // If element explicitly removed outline without a visible focus ring
    if (style.outlineStyle === 'none' || style.outlineWidth === '0px') {
      const hasFocusRingClass =
        el.className &&
        (el.className.includes('focus:ring') ||
          el.className.includes('focus:outline') ||
          el.className.includes('focus-visible:ring') ||
          el.className.includes('focus:border'));

      if (!hasFocusRingClass && el.tagName === 'BUTTON') {
        focusViolations.push({
          id: `fv-outline-${index}`,
          element: el,
          selector: getElementSelector(el),
          textSnippet: getSnippet(el),
          type: 'missing-focus-indicator',
          message: 'Button has outline: none without clear focus ring utility class',
          severity: 'warning',
          tabIndex
        });
        return;
      }
    }

    // Check 2e: Small touch/pointer target (< 24px)
    const rect = el.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0 && (rect.width < 24 || rect.height < 24)) {
      focusViolations.push({
        id: `fv-target-${index}`,
        element: el,
        selector: getElementSelector(el),
        textSnippet: getSnippet(el),
        type: 'small-touch-target',
        message: `Interactive target is smaller than 24x24px (${Math.round(rect.width)}x${Math.round(rect.height)}px)`,
        severity: 'warning',
        tabIndex
      });
      return;
    }

    focusPassCount++;
  });

  // Calculate Health Score
  const totalViolations = contrastViolations.length + focusViolations.length;
  const totalPassed = contrastPassCount + focusPassCount;
  const score = totalPassed + totalViolations > 0
    ? Math.round((totalPassed / (totalPassed + totalViolations)) * 100)
    : 100;

  return {
    timestamp: new Date().toLocaleTimeString(),
    totalElementsScanned,
    contrastPassCount,
    contrastViolations,
    focusPassCount,
    focusViolations,
    score
  };
}

/**
 * Log comprehensive audit findings to browser console
 */
export function logA11yViolationsToConsole(result: A11yAuditResult): void {
  console.group('%c♿ [KKM Accessibility Audit & Diagnostic Report]', 'background: #0f172a; color: #38bdf8; font-weight: bold; font-size: 13px; padding: 4px 8px; border-radius: 4px;');
  
  console.log(
    `%cStatus: ${result.score >= 90 ? 'PASSED (AA/AAA)' : result.score >= 70 ? 'NEEDS ATTENTION' : 'CRITICAL ISSUES FOUND'} | Health Score: ${result.score}% | Timestamp: ${result.timestamp}`,
    `color: ${result.score >= 90 ? '#10b981' : result.score >= 70 ? '#f59e0b' : '#ef4444'}; font-weight: bold; font-size: 12px;`
  );
  console.log(`Total Elements Audited: ${result.totalElementsScanned} | Contrast Passed: ${result.contrastPassCount} | Focus Passed: ${result.focusPassCount}`);

  if (result.contrastViolations.length > 0) {
    console.group(`%c🎨 Contrast Violations (${result.contrastViolations.length})`, 'color: #f87171; font-weight: bold;');
    console.table(
      result.contrastViolations.map(v => ({
        Selector: v.selector,
        Text: v.textSnippet,
        'Contrast Ratio': `${v.contrastRatio}:1`,
        'Required (WCAG AA)': `${v.requiredRatio}:1`,
        'Text Color': v.textColor,
        'Background Color': v.bgColor,
        'Font Size': v.fontSize
      }))
    );
    result.contrastViolations.forEach(v => {
      console.warn(`[Contrast Issue] %c${v.selector}%c "${v.textSnippet}" -> Contrast ${v.contrastRatio}:1 < ${v.requiredRatio}:1`, 'color: #38bdf8; font-family: monospace;', 'color: inherit;', v.element);
    });
    console.groupEnd();
  } else {
    console.log('%c✔ All evaluated text elements satisfy WCAG AA contrast standards!', 'color: #10b981; font-weight: bold;');
  }

  if (result.focusViolations.length > 0) {
    console.group(`%c⌨ Focusability & Semantics Violations (${result.focusViolations.length})`, 'color: #fbbf24; font-weight: bold;');
    console.table(
      result.focusViolations.map(v => ({
        Selector: v.selector,
        Issue: v.message,
        Severity: v.severity.toUpperCase(),
        'Text/Label': v.textSnippet,
        tabIndex: v.tabIndex
      }))
    );
    result.focusViolations.forEach(v => {
      console.warn(`[Focus Issue] %c${v.selector}%c ${v.message}`, 'color: #38bdf8; font-family: monospace;', 'color: inherit;', v.element);
    });
    console.groupEnd();
  } else {
    console.log('%c✔ All interactive controls have accessible names, valid tab navigation, and focus indicators!', 'color: #10b981; font-weight: bold;');
  }

  console.groupEnd();
}
