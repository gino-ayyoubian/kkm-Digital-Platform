/**
 * Corporate Email & Account Utilities for KKM International Group
 * Specification:
 * - Domain: @kkm-intl.org
 * - Pattern: First letter of first name + '.' + last name (e.g. g.ayyoubian@kkm-intl.org)
 * - Username can be either the full corporate email or the email prefix.
 * - Password defined and customized by each member.
 * - Password recovery sends secure one-time recovery reset link/code to member's corporate email.
 */

export const CORPORATE_EMAIL_DOMAIN = 'kkm-intl.org';

/**
 * Derives official corporate email from Latin full name according to policy:
 * first_initial.last_name@kkm-intl.org
 * Examples:
 * "Gino Ayyoubian" -> "g.ayyoubian@kkm-intl.org"
 * "Dr. Reza Asakereh" -> "r.asakereh@kkm-intl.org"
 * "Eng. Ali Rezaei" -> "a.rezaei@kkm-intl.org"
 */
export function generateCorporateEmail(fullName: string): string {
  if (!fullName) return `user@${CORPORATE_EMAIL_DOMAIN}`;

  // Strip honorary titles like Dr., Eng., Engr., Prof., etc.
  const cleaned = fullName
    .replace(/^(Dr\.|Eng\.|Engr\.|Prof\.|Mr\.|Ms\.|Mrs\.)\s+/i, '')
    .trim()
    .toLowerCase();

  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return `user@${CORPORATE_EMAIL_DOMAIN}`;

  if (parts.length === 1) {
    const cleanWord = parts[0].replace(/[^a-z0-9]/g, '');
    return `${cleanWord}@${CORPORATE_EMAIL_DOMAIN}`;
  }

  const firstName = parts[0];
  const lastName = parts[parts.length - 1];

  const firstLetter = firstName.charAt(0).replace(/[^a-z0-9]/g, '');
  const cleanLastName = lastName.replace(/[^a-z0-9]/g, '');

  if (!firstLetter && !cleanLastName) {
    return `user@${CORPORATE_EMAIL_DOMAIN}`;
  }
  if (!firstLetter) {
    return `${cleanLastName}@${CORPORATE_EMAIL_DOMAIN}`;
  }
  if (!cleanLastName) {
    return `${firstLetter}@${CORPORATE_EMAIL_DOMAIN}`;
  }

  return `${firstLetter}.${cleanLastName}@${CORPORATE_EMAIL_DOMAIN}`;
}

/**
 * Normalizes input to corporate email or username.
 * If user entered "g.ayyoubian", resolves to "g.ayyoubian@kkm-intl.org".
 */
export function normalizeCorporateUsername(input: string): string {
  const clean = input.trim().toLowerCase();
  if (clean.includes('@')) {
    return clean;
  }
  return `${clean}@${CORPORATE_EMAIL_DOMAIN}`;
}
