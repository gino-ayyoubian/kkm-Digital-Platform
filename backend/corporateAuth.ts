import type { OrgMemberProfile } from '../types';
import { secretsManager } from './secretsManager.ts';

export function isCorporateAuthConfigured() {
  return true;
}

export function verifyCorporatePassword(member: OrgMemberProfile, username: string, password: string): boolean {
  // Check against secretsManager using user email, username, or UID
  if (member.email && secretsManager.verifyPassword(member.email, password)) {
    return true;
  }
  if (member.username && secretsManager.verifyPassword(member.username, password)) {
    return true;
  }
  if (member.uid && secretsManager.verifyPassword(member.uid, password)) {
    return true;
  }
  if (username && secretsManager.verifyPassword(username, password)) {
    return true;
  }
  return false;
}

export function getCorporateAuthSetupMessage() {
  return 'Corporate authentication is securely managed by the server Secrets Manager.';
}

