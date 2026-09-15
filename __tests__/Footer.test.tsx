import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '../LanguageContext';
import { ThemeProvider } from '../ThemeContext';
import Footer from '../components/Footer';
import { Page } from '../types';

describe('Footer Integration', () => {
    it('renders the footer correctly', () => {
        const mockSetPage = vi.fn();
        
        render(
            <LanguageProvider>
                <ThemeProvider>
                    <Footer setPage={mockSetPage} />
                </ThemeProvider>
            </LanguageProvider>
        );
        
        expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });
});
