import type { InternalDirectoryEntry, OrgMemberProfile, StaffExtension } from '../types';
import { StaffExtensionStatus } from '../types';
import { INITIAL_STAFF_EXTENSIONS } from './staffExtensions';

export interface ExtensionAvailability {
  extension: string;
  status: 'available' | 'busy' | 'away' | StaffExtensionStatus;
}

export const buildInternalDirectory = (
  profiles: OrgMemberProfile[],
  extensions: Array<ExtensionAvailability | StaffExtension> = [],
): InternalDirectoryEntry[] => {
  // Build lookup maps for fast matching
  const statusByExt = new Map<string, 'active' | 'busy' | 'away'>();
  const staffExtensionByExt = new Map<string, StaffExtension>();

  // Map known staff extension profiles
  INITIAL_STAFF_EXTENSIONS.forEach(item => {
    staffExtensionByExt.set(item.extensionNumber, item);
  });

  // Dynamic extension statuses provided
  extensions.forEach(item => {
    if ('extensionNumber' in item) {
      staffExtensionByExt.set(item.extensionNumber, item);
      const normalizedStatus =
        item.status === StaffExtensionStatus.Active ? 'active' :
        item.status === StaffExtensionStatus.Busy ? 'busy' :
        item.status === StaffExtensionStatus.Away ? 'away' : 'active';
      statusByExt.set(item.extensionNumber, normalizedStatus);
    } else if ('extension' in item) {
      const rawStatus = String(item.status).toLowerCase();
      const normalizedStatus: 'active' | 'busy' | 'away' =
        rawStatus === 'available' || rawStatus === 'active' ? 'active' :
        rawStatus === 'busy' ? 'busy' :
        rawStatus === 'away' ? 'away' : 'active';
      statusByExt.set(item.extension, normalizedStatus);
    }
  });

  return profiles.map(profile => {
    const extension = profile.sipExtension || null;
    const status = extension ? statusByExt.get(extension) : undefined;
    const staffExtension = extension ? staffExtensionByExt.get(extension) : undefined;

    return {
      profile,
      extension,
      deskPhone: profile.phone || null,
      deskAvailability: status || 'unknown',
      staffExtension,
    };
  });
};

