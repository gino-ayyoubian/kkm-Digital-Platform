import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { LanguageProvider, useLanguage } from '../LanguageContext';
import { Page } from '../types';

const TestComponent = () => {
    const { language, setLanguage, t } = useLanguage();
    return (
        <div>
            <span data-testid="lang">{language}</span>
            <span data-testid="text">{t(Page.Home)}</span>
            <button onClick={() => setLanguage('FA')}>Switch to FA</button>
        </div>
    );
};

describe('LanguageContext', () => {
    it('provides default language as en', () => {
        render(
            <LanguageProvider>
                <TestComponent />
            </LanguageProvider>
        );
        expect(screen.getByTestId('lang')).toHaveTextContent('EN');
    });

    it('switches language and translates', () => {
        render(
            <LanguageProvider>
                <TestComponent />
            </LanguageProvider>
        );
        
        act(() => {
            screen.getByText('Switch to FA').click();
        });
        
        expect(screen.getByTestId('lang')).toHaveTextContent('FA');
        expect(screen.getByTestId('text')).toHaveTextContent('خانه');
    });
});
