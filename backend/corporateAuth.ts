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

const DEFAULT_DEMO_CREDENTIALS: CorporateCredentialRecord[] = [
  { uid: 'kkm-user-001', email: 'g.ayyoubian@kkm-intl.org', username: 'g.ayyoubian', password: 'kkm!GinoAyyoubian2026' },
  { uid: 'kkm-user-007', email: 'r.baghdadchi@kkm-intl.org', username: 'r.baghdadchi', password: 'kkm!RezaBaghdadchi2026' },
  { uid: 'kkm-user-008', email: 'a.tofangchiha@kkm-intl.org', username: 'a.tofangchiha', password: 'kkm!AshkanTofangchiha2026' },
  { uid: 'kkm-user-002', email: 'r.asakereh@kkm-intl.org', username: 'r.asakereh', password: 'kkm!RezaAsakereh2026' },
  { uid: 'kkm-user-003', email: 'k.jarrahian@kkm-intl.org', username: 'k.jarrahian', password: 'kkm!KhosroJarrahian2026' },
  { uid: 'kkm-user-004', email: 'f.imani@kkm-intl.org', username: 'f.imani', password: 'kkm!FaridImani2026' },
  { uid: 'kkm-user-005', email: 'p.abdarzadeh@kkm-intl.org', username: 'p.abdarzadeh', password: 'kkm!PedramAbdarzadeh2026' },
  { uid: 'kkm-user-006', email: 'h.yarveicy@kkm-intl.org', username: 'h.yarveicy', password: 'kkm!HeidarYarveicy2026' },
  { uid: 'kkm-user-010', email: 's.hashemi@kkm-intl.org', username: 's.hashemi', password: 'kkm!SalarHashemi2026' },
  { uid: 'kkm-user-011', email: 'm.ghiasy@kkm-intl.org', username: 'm.ghiasy', password: 'kkm!MahdiGhiasy2026' },
  { uid: 'kkm-user-015', email: 'm.moshar@kkm-intl.org', username: 'm.moshar', password: 'kkm!MasoumehMoshar2026' },
  { uid: 'kkm-user-016', email: 'h.zatajam@kkm-intl.org', username: 'h.zatajam', password: 'kkm!HamedZatajam2026' },
  { uid: 'kkm-user-042', email: 'a.rezaei@kkm-intl.org', username: 'a.rezaei', password: 'kkm!AliRezaei2026' },
  { uid: 'kkm-user-043', email: 'm.bahrami@kkm-intl.org', username: 'm.bahrami', password: 'kkm!MaryamBahrami2026' },
];

function readCorporateCredentials(): CorporateCredentialRecord[] {
  const raw = process.env[CORPORATE_AUTH_ENV];
  if (!raw) return DEFAULT_DEMO_CREDENTIALS;

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return DEFAULT_DEMO_CREDENTIALS;
    return parsed.filter((item): item is CorporateCredentialRecord => Boolean(item && typeof item === 'object'));
  } catch {
    return DEFAULT_DEMO_CREDENTIALS;
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
