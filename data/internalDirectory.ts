import type { InternalDirectoryEntry, OrgMemberProfile } from '../types';

export interface ExtensionAvailability {
  extension: string;
  status: 'available' | 'busy' | 'away';
}

export const buildInternalDirectory = (
  profiles: OrgMemberProfile[],
  extensions: ExtensionAvailability[],
): InternalDirectoryEntry[] => {
  const availabilityByExtension = new Map(extensions.map(extension => [extension.extension, extension.status]));

  return profiles.map(profile => {
    const extension = profile.sipExtension || null;
    const status = extension ? availabilityByExtension.get(extension) : undefined;

    return {
      profile,
      extension,
      deskPhone: profile.phone || null,
      deskAvailability: status === 'available' ? 'active' : status || 'unknown',
    };
  });
};
