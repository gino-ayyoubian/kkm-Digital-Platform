import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LanguageProvider } from '../LanguageContext';
import { SocialPreviewDebugger } from '../components/social/SocialPreviewDebugger';

describe('SocialPreviewDebugger Component', () => {
  it('renders correctly and displays initial OpenGraph metadata', () => {
    render(
      <LanguageProvider>
        <SocialPreviewDebugger initialPath="/" />
      </LanguageProvider>
    );

    // Assert main title and tabs exist
    expect(screen.getAllByText(/KKM International Group/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/LinkedIn Feed/i)).toBeDefined();
    expect(screen.getByText(/X \/ Twitter Card/i)).toBeDefined();
    expect(screen.getByText(/WhatsApp \/ Telegram/i)).toBeDefined();
    expect(screen.getByText(/1200×630 Canvas Audit/i)).toBeDefined();
  });

  it('allows switching between platform simulation tabs', () => {
    render(
      <LanguageProvider>
        <SocialPreviewDebugger initialPath="/" />
      </LanguageProvider>
    );

    // Switch to Twitter tab
    const twitterTab = screen.getByText(/X \/ Twitter Card/i);
    fireEvent.click(twitterTab);
    expect(screen.getByText(/@KKM_Group/i)).toBeDefined();

    // Switch to WhatsApp tab
    const whatsappTab = screen.getByText(/WhatsApp \/ Telegram/i);
    fireEvent.click(whatsappTab);
    expect(screen.getByText(/12:45 PM/i)).toBeDefined();

    // Switch to Canvas Audit tab
    const canvasTab = screen.getByText(/1200×630 Canvas Audit/i);
    fireEvent.click(canvasTab);
    expect(screen.getByText(/CANVAS DIMENSION: 1200px × 630px/i)).toBeDefined();
  });

  it('updates metadata when a new route is selected', () => {
    const handleNavigate = vi.fn();
    render(
      <LanguageProvider>
        <SocialPreviewDebugger initialPath="/" onNavigatePath={handleNavigate} />
      </LanguageProvider>
    );

    const select = screen.getByLabelText(/Select Route or Page to Inspect:|انتخاب صفحه یا مسیر جهت بررسی پیش‌نمایش:/i);
    fireEvent.change(select, { target: { value: '/technology' } });

    expect(handleNavigate).toHaveBeenCalledWith('/technology');
    // Technology meta description contains GMEL
    expect(screen.getAllByText(/closed-loop geothermal/i).length).toBeGreaterThan(0);
  });
});
