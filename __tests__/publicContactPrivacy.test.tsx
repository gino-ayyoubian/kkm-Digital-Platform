import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TeamCard } from '../components/TeamCard';
import { LeadershipTeam } from '../components/LeadershipTeam';
import { EvidenceRegistryModal } from '../components/common/EvidenceRegistryModal';
import { LanguageProvider } from '../LanguageContext';
import { INITIAL_ORG_MEMBERS } from '../data/orgMembers';

describe('Public Contact & Privacy Governance', () => {
  const sampleMember = INITIAL_ORG_MEMBERS.find(m => m.sipExtension === '101') || INITIAL_ORG_MEMBERS[0];

  it('ensures TeamCard does not render internal SIP extension pill over the photo', () => {
    const { container } = render(
      <LanguageProvider>
        <TeamCard
          member={sampleMember}
          onVerifyClick={vi.fn()}
        />
      </LanguageProvider>
    );

    // Should not have any button with the extension text
    expect(screen.queryByTitle(/تماس با داخلی 101|Call Ext 101/i)).toBeNull();
    // No phone button for direct calling in the card
    expect(container.querySelector('button[title*="داخلی"]')).toBeNull();
    expect(container.querySelector('button[title*="Ext"]')).toBeNull();
  });

  it('ensures LeadershipTeam provides Central Switchboard routing and no internal IVR softphone modal', () => {
    render(
      <LanguageProvider>
        <LeadershipTeam />
      </LanguageProvider>
    );

    // Central switchboard phone number is displayed for public routing
    expect(screen.getAllByText(/\+98 21 9103 0830/).length).toBeGreaterThan(0);
    // Should NOT have the IVR Softphone launch button on public page
    expect(screen.queryByRole('button', { name: /تلفن گویا و داخلی‌ها|IVR Softphone/i })).toBeNull();
  });

  it('ensures EvidenceRegistryModal does not render internal SIP extension or SIP Trunk details in public UI', () => {
    render(
      <LanguageProvider>
        <EvidenceRegistryModal
          member={sampleMember}
          isOpen={true}
          onClose={vi.fn()}
        />
      </LanguageProvider>
    );

    // Should not display internal extension badge
    expect(screen.queryByText(/داخلی 101|Ext: 101/i)).toBeNull();
    // Should not expose sip trunk server address
    expect(screen.queryByText(/ext\.daftareshoma\.com/i)).toBeNull();
  });
});
