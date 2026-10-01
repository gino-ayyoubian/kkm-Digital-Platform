import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { LanguageProvider, useLanguage } from '../LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { Page } from '../types';

const LanguageTestHarness: React.FC<{ variant?: 'header' | 'toggle' | 'segmented' }> = ({ variant = 'header' }) => {
  const { language, t, direction } = useLanguage();
  return (
    <div>
      <LanguageSwitcher variant={variant} />
      <div data-testid="current-lang">{language}</div>
      <div data-testid="current-dir">{direction}</div>
      <div data-testid="translated-home">{t(Page.Home)}</div>
      <div data-testid="translated-about">{t(Page.AboutUs)}</div>
    </div>
  );
};

describe('LanguageSwitcher Component', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = 'en';
  });

  it('renders default English and switches dynamically to Persian using quick toggle', () => {
    render(
      <LanguageProvider>
        <LanguageTestHarness variant="header" />
      </LanguageProvider>
    );

    expect(screen.getByTestId('current-lang')).toHaveTextContent('EN');
    expect(screen.getByTestId('translated-home')).toHaveTextContent('Home');
    expect(screen.getByTestId('translated-about')).toHaveTextContent('About Us');

    const quickToggleBtn = screen.getByLabelText('Quick toggle English and Persian');
    expect(quickToggleBtn).toBeInTheDocument();

    act(() => {
      fireEvent.click(quickToggleBtn);
    });

    expect(screen.getByTestId('current-lang')).toHaveTextContent('FA');
    expect(screen.getByTestId('current-dir')).toHaveTextContent('rtl');
    expect(screen.getByTestId('translated-home')).toHaveTextContent('خانه');
    expect(screen.getByTestId('translated-about')).toHaveTextContent('درباره ما');
    expect(document.documentElement.dir).toBe('rtl');
    expect(document.documentElement.lang).toBe('fa');
  });

  it('opens dropdown and allows selecting other languages like Russian and Arabic', () => {
    render(
      <LanguageProvider>
        <LanguageTestHarness variant="header" />
      </LanguageProvider>
    );

    const dropdownBtn = screen.getByRole('button', { name: /Language selector:/i });
    expect(dropdownBtn).toBeInTheDocument();

    act(() => {
      fireEvent.click(dropdownBtn);
    });

    const arabicOption = screen.getByRole('option', { name: /العربية/i });
    expect(arabicOption).toBeInTheDocument();

    act(() => {
      fireEvent.click(arabicOption);
    });

    expect(screen.getByTestId('current-lang')).toHaveTextContent('AR');
    expect(screen.getByTestId('current-dir')).toHaveTextContent('rtl');
    expect(document.documentElement.dir).toBe('rtl');
    expect(document.documentElement.lang).toBe('ar');
  });

  it('renders segmented variant and updates language on option click', () => {
    render(
      <LanguageProvider>
        <LanguageTestHarness variant="segmented" />
      </LanguageProvider>
    );

    const faRadio = screen.getByRole('radio', { name: /فارسی/i });
    expect(faRadio).toBeInTheDocument();

    act(() => {
      fireEvent.click(faRadio);
    });

    expect(screen.getByTestId('current-lang')).toHaveTextContent('FA');
    expect(screen.getByTestId('translated-home')).toHaveTextContent('خانه');
  });
});
