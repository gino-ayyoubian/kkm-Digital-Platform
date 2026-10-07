import { buildInternalDirectory } from '../data/internalDirectory';
import { INITIAL_ORG_MEMBERS } from '../data/orgMembers';

describe('buildInternalDirectory', () => {
  it('maps extension presence into directory availability and desk phone fields', () => {
    const [member] = INITIAL_ORG_MEMBERS;
    const [entry] = buildInternalDirectory([member], [
      { extension: member.sipExtension || '', status: 'available' },
    ]);

    expect(entry.profile).toBe(member);
    expect(entry.extension).toBe(member.sipExtension);
    expect(entry.deskPhone).toBe(member.phone);
    expect(entry.deskAvailability).toBe('active');
  });

  it('keeps unmatched extension availability unknown', () => {
    const [member] = INITIAL_ORG_MEMBERS;
    const [entry] = buildInternalDirectory([member], []);

    expect(entry.deskAvailability).toBe('unknown');
  });

  it('matches Reza Baghdadchi and Ashkan Tofangchiha to their PBX lines', () => {
    const members = INITIAL_ORG_MEMBERS.filter(member =>
      ['kkm-user-007', 'kkm-user-008'].includes(member.uid),
    );
    const entries = buildInternalDirectory(members, [
      { extension: '105', status: 'busy' },
      { extension: '106', status: 'away' },
      { extension: '107', status: 'busy' },
      { extension: '108', status: 'away' },
    ]);

    expect(entries.map(({ extension, deskPhone, deskAvailability }) => ({
      extension,
      deskPhone,
      deskAvailability,
    }))).toEqual([
      { extension: '107', deskPhone: '+98 21 9103 0836', deskAvailability: 'busy' },
      { extension: '108', deskPhone: '+98 21 9103 0837', deskAvailability: 'away' },
    ]);
  });
});
