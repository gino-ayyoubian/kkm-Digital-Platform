import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TechnicalConsultationModal from '../components/consultation/TechnicalConsultationModal';
import { LanguageProvider } from '../LanguageContext';
import { INITIAL_ORG_MEMBERS } from '../data/orgMembers';
import { LEADERSHIP } from '../pages/TeamPage';

describe('TechnicalConsultationModal & Leadership Assets', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        ok: true,
        success: true,
        id: 'LEAD-2026-TEST99',
        routedDepartment: 'Engineering & Technical Office',
        departmentEmail: 'engineering@kkm-intl.org'
      })
    } as any);
  });

  it('renders TechnicalConsultationModal when open and shows domain options and form fields', () => {
    render(
      <LanguageProvider>
        <TechnicalConsultationModal
          isOpen={true}
          onClose={vi.fn()}
          initialDomain="gmel-closed-loop"
        />
      </LanguageProvider>
    );

    expect(screen.getByRole('dialog')).toBeDefined();
    // Verify engineering domains exist
    expect(screen.getByText(/GMEL Deep Closed-Loop Geothermal/i)).toBeDefined();
    expect(screen.getByText(/Industrial Waste Heat Recovery/i)).toBeDefined();
    expect(screen.getByText(/Thermal Desalination/i)).toBeDefined();
  });

  it('validates required fields on submission', async () => {
    render(
      <LanguageProvider>
        <TechnicalConsultationModal
          isOpen={true}
          onClose={vi.fn()}
        />
      </LanguageProvider>
    );

    const submitBtn = screen.getByRole('button', { name: /Submit Consultation Brief|ارسال درخواست مشاوره/i });
    fireEvent.click(submitBtn);

    // Should not call fetch when required fields are empty
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('submits valid form data to /api/contact and displays confirmation', async () => {
    render(
      <LanguageProvider>
        <TechnicalConsultationModal
          isOpen={true}
          onClose={vi.fn()}
          prefilledProject="Sarakhs Closed-Loop Geothermal"
        />
      </LanguageProvider>
    );

    // Fill form
    const nameInput = screen.getByPlaceholderText(/Marcus Vance|علیرضا سلیمانی/i);
    const orgInput = screen.getByPlaceholderText(/National Energy Authority|پتروشیمی/i);
    const emailInput = screen.getByPlaceholderText('name@company.com');
    const phoneInput = screen.getByPlaceholderText('+98 912 000 0000');
    const scopeInput = screen.getByPlaceholderText(/engineering constraints|مشخصات فنی کلیدی/i);

    fireEvent.change(nameInput, { target: { value: 'Dr. Alexander Vance' } });
    fireEvent.change(orgInput, { target: { value: 'Eurasia Power Consortium' } });
    fireEvent.change(emailInput, { target: { value: 'alex.vance@eurasia-power.org' } });
    fireEvent.change(phoneInput, { target: { value: '+98 21 9103 0830' } });
    fireEvent.change(scopeInput, { target: { value: 'Comprehensive technical inquiry regarding closed-loop deep geothermal wellbore thermodynamics and ORC integration.' } });

    const submitBtn = screen.getByRole('button', { name: /Submit Consultation Brief|ارسال درخواست مشاوره/i });
    const form = submitBtn.closest('form')!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(/Technical Consultation Request Dispatched|درخواست مشاوره فنی با موفقیت ثبت گردید/i)).toBeDefined();
    });

    expect(screen.getByText('LEAD-2026-TEST99')).toBeDefined();
  });

  it('verifies Heidar Yarveisi portraits are linked without alteration', () => {
    const heidarOrg = INITIAL_ORG_MEMBERS.find(m => m.uid === 'kkm-user-006');
    expect(heidarOrg).toBeDefined();
    expect(heidarOrg?.avatarUrl).toBe('/assets/leadership/heidar-yarveisi-portrait.png');
    expect(heidarOrg?.secondaryPhotoUrl).toBe('/assets/leadership/heidar-yarveisi-executive.png');

    const heidarLeadership = LEADERSHIP.find(m => m.id === 'heidar-yarveicy');
    expect(heidarLeadership).toBeDefined();
    expect(heidarLeadership?.imageUrl).toBe('/assets/leadership/heidar-yarveisi-portrait.png');
    expect(heidarLeadership?.executiveImageUrl).toBe('/assets/leadership/heidar-yarveisi-executive.png');
  });

  it('verifies Farid Imani portraits are linked without alteration across leadership structures', () => {
    const faridOrg = INITIAL_ORG_MEMBERS.find(m => m.uid === 'kkm-user-004');
    expect(faridOrg).toBeDefined();
    expect(faridOrg?.displayName).toBe('Farid Imani');
    expect(faridOrg?.avatarUrl).toBe('/assets/leadership/farid-imani-portrait.png');
    expect(faridOrg?.secondaryPhotoUrl).toBe('/images/farid-imani.jpg');

    const faridLeadership = LEADERSHIP.find(m => m.id === 'farid-imani');
    expect(faridLeadership).toBeDefined();
    expect(faridLeadership?.imageUrl).toBe('/assets/leadership/farid-imani-portrait.png');
    expect(faridLeadership?.executiveImageUrl).toBe('/images/farid-imani.jpg');
  });
});
