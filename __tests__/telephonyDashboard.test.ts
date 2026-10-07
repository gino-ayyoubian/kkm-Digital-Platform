import { describe, expect, it } from 'vitest';
import { telephonyService } from '../backend/telephonyService';

describe('telephony dashboard snapshot', () => {
  it('contains only dashboard-safe telephony fields', () => {
    const snapshot = telephonyService.getDashboardSnapshot();

    expect(Object.keys(snapshot)).toEqual(['status', 'extensions', 'voicemails', 'routing']);
    expect(Object.keys(snapshot.status)).toEqual([
      'connected',
      'provider',
      'activeLine',
      'activeChannels',
      'maxChannels',
      'latencyMs',
      'lastSyncAt',
      'dayScheduleActive'
    ]);
    expect(Object.keys(snapshot.extensions[0])).toEqual(['extension', 'name', 'status']);
    expect(Object.keys(snapshot.voicemails)).toEqual(['total', 'unread']);
    expect(Object.keys(snapshot.routing[0])).toEqual(['digit', 'destination', 'title']);

    const serialized = JSON.stringify(snapshot);
    expect(serialized).not.toContain('callerNumber');
    expect(serialized).not.toContain('transcription');
    expect(serialized).not.toContain('sipUsername');
    expect(serialized).not.toContain('*8888');
  });
});
