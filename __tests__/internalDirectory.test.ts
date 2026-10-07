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
});
