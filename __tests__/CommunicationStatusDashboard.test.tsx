import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LanguageProvider } from '../LanguageContext';
import { CommunicationStatusDashboard } from '../components/portal/CommunicationStatusDashboard';
import { StaffExtensionStatus } from '../types';
import { daftareShomaMockService } from '../data/staffExtensions';

describe('CommunicationStatusDashboard', () => {
  it('renders extension statuses and handles dialing action', async () => {
    const handleDial = vi.fn();

    render(
      <LanguageProvider>
        <CommunicationStatusDashboard onDialExtension={handleDial} />
      </LanguageProvider>
    );

    // Verify main header
    expect(await screen.findByText(/Communication Status Dashboard|داشبورد ارتباطات سازمانی/i)).toBeTruthy();

    // Verify line number presence
    expect(screen.getByText(/\+98 21 9103 0830/i)).toBeTruthy();

    // Verify staff extensions appear
    expect(await screen.findByText(/Gino Ayyoubian|سید ژینو ایوبیان/i)).toBeTruthy();

    // Test dial action
    const dialButtons = screen.getAllByRole('button', { name: /Dial Ext|تماس با داخلی/i });
    expect(dialButtons.length).toBeGreaterThan(0);
    fireEvent.click(dialButtons[0]);
    expect(handleDial).toHaveBeenCalled();
  });

  it('filters extensions by status (Active, Busy, Away)', async () => {
    render(
      <LanguageProvider>
        <CommunicationStatusDashboard />
      </LanguageProvider>
    );

    await screen.findByText(/Gino Ayyoubian|سید ژینو ایوبیان/i);

    // Click Busy filter button
    const busyFilterBtns = screen.getAllByRole('button', { name: /Busy|مشغول/i });
    fireEvent.click(busyFilterBtns[0]);

    // Should still display Dr. Reza Asakereh (Busy)
    expect(screen.getByText(/Dr\. Reza Asakereh|دکتر رضا عساکره/i)).toBeTruthy();
  });

  it('renders descriptive legend defining Active, Busy, and Away statuses', async () => {
    render(
      <LanguageProvider>
        <CommunicationStatusDashboard />
      </LanguageProvider>
    );

    // Verify legend header
    expect(await screen.findByText(/Extension Status Legend|راهنمای وضعیت آیکون‌های خطوط داخلی/i)).toBeTruthy();

    // Verify status definitions are displayed
    expect(screen.getByText(/Active \(Available\)|آماده پاسخگویی/i)).toBeTruthy();
    expect(screen.getByText(/Busy \(On Call\)|در حال مکالمه/i)).toBeTruthy();
    expect(screen.getByText(/Away \(Out of Office\)|دور از میز/i)).toBeTruthy();
  });
});
