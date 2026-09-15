import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '../LanguageContext';
import { ThemeProvider } from '../ThemeContext';
import Header from '../components/Header';
import { Page } from '../types';

describe('Header Integration', () => {
    it('renders the header and navigation links', () => {
        const mockSetPage = vi.fn();
        const mockOnSearch = vi.fn();
        
        render(
            <LanguageProvider>
                <ThemeProvider>
                    <Header currentPage={Page.Home} setPage={mockSetPage} onSearch={mockOnSearch} />
                </ThemeProvider>
            </LanguageProvider>
        );
        
        // Assert some key header elements
        expect(screen.getByRole('banner')).toBeInTheDocument();
        // Just checking it renders without crashing
    });
});
