import crypto from 'crypto';
import type { OrgMemberProfile } from '../types';

type CorporateCredentialRecord = {
  uid?: string;
  email?: string;
  username?: string;
  password?: string;
};

const CORPORATE_AUTH_ENV = 'KKM_CORPORATE_AUTH_JSON';

function normalizeIdentity(value?: string | null) {
  return value ? value.trim().toLowerCase() : '';
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
}

function readCorporateCredentials() {
  const raw = process.env[CORPORATE_AUTH_ENV];
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is CorporateCredentialRecord => Boolean(item && typeof item === 'object'));
  } catch {
    return [];
  }
}

export function isCorporateAuthConfigured() {
  return readCorporateCredentials().length > 0;
}

export function verifyCorporatePassword(member: OrgMemberProfile, username: string, password: string) {
  const normalizedUsername = normalizeIdentity(username);
  const memberEmail = normalizeIdentity(member.email);
  const memberUsername = normalizeIdentity(member.username);

  const credential = readCorporateCredentials().find((item) => {
    const itemUid = normalizeIdentity(item.uid);
    const itemEmail = normalizeIdentity(item.email);
    const itemUsername = normalizeIdentity(item.username);

    return (
      (itemUid && itemUid === normalizeIdentity(member.uid)) ||
      (itemEmail && itemEmail === memberEmail) ||
      (itemUsername && itemUsername === memberUsername) ||
      (itemEmail && itemEmail === normalizedUsername) ||
      (itemUsername && itemUsername === normalizedUsername)
    );
  });

  if (!credential?.password) return false;
  return safeEqual(credential.password, password);
}

export function getCorporateAuthSetupMessage() {
  return `Corporate credentials are not configured. Set ${CORPORATE_AUTH_ENV} in the deployment environment.`;
}
