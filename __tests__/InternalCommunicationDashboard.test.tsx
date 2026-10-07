import '@testing-library/jest-dom';
import React from 'react';
import { act, render } from '@testing-library/react';
import { vi } from 'vitest';
import { LanguageProvider } from '../LanguageContext';
import InternalCommunicationDashboard from '../components/portal/InternalCommunicationDashboard';

describe('InternalCommunicationDashboard', () => {
  it('skips overlapping refreshes and aborts the active request on unmount', async () => {
    vi.useFakeTimers();
    const fetchMock = vi.fn(
      (_input: RequestInfo | URL, _init?: RequestInit) => new Promise<Response>(() => {}),
    );
    vi.stubGlobal('fetch', fetchMock);
    const { unmount } = render(
      <LanguageProvider>
        <InternalCommunicationDashboard />
      </LanguageProvider>,
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const signal = fetchMock.mock.calls[0][1]?.signal;

    await act(async () => {
      vi.advanceTimersByTime(60_000);
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    unmount();
    expect(signal?.aborted).toBe(true);

    vi.useRealTimers();
    vi.unstubAllGlobals();
  });
});
