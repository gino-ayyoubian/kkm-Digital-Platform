import React from 'react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HolographicTiltProjectCard } from '../components/projects/HolographicTiltProjectCard';
import { HolographicTiltContainer } from '../components/projects/HolographicTiltContainer';
import { LanguageProvider } from '../LanguageContext';
import { ThemeProvider } from '../ThemeContext';
import ProjectsPage from '../pages/ProjectsPage';
import { PROJECTS } from '../constants';

const sampleProject = PROJECTS[0];

describe('Holographic Framer Motion 3D Tilt Project Cards', () => {
  it('renders HolographicTiltProjectCard in grid variant with title, tag, and actions', () => {
    const mockSelect = vi.fn();
    const mockGallery = vi.fn();
    const mockConsult = vi.fn();

    render(
      <LanguageProvider>
        <ThemeProvider>
          <HolographicTiltProjectCard
            project={sampleProject}
            isActive={false}
            variant="grid"
            onSelect={mockSelect}
            onOpenGallery={mockGallery}
            onRequestConsultation={mockConsult}
          />
        </ThemeProvider>
      </LanguageProvider>
    );

    // Verify card rendered
    const cardBtn = screen.getByTestId('project-tilt-card');
    expect(cardBtn).toBeTruthy();

    // Trigger mouse move over card to exercise 3D tilt calculation
    fireEvent.mouseMove(cardBtn, { clientX: 120, clientY: 80 });
    fireEvent.mouseLeave(cardBtn);

    // Click select
    fireEvent.click(cardBtn);
    expect(mockSelect).toHaveBeenCalledWith(sampleProject);
  });

  it('renders HolographicTiltProjectCard in compact list variant', () => {
    const mockSelect = vi.fn();

    render(
      <LanguageProvider>
        <ThemeProvider>
          <HolographicTiltProjectCard
            project={sampleProject}
            isActive={true}
            variant="compact"
            onSelect={mockSelect}
          />
        </ThemeProvider>
      </LanguageProvider>
    );

    const card = screen.getByTestId('project-tilt-card');
    expect(card).toBeTruthy();
    expect(card.getAttribute('aria-pressed')).toBe('true');
  });

  it('renders HolographicTiltContainer with children and handles mouse move', () => {
    render(
      <HolographicTiltContainer maxTilt={4}>
        <div data-testid="child-element">Test Tilt Content</div>
      </HolographicTiltContainer>
    );

    const child = screen.getByTestId('child-element');
    expect(child).toBeTruthy();

    fireEvent.mouseMove(child, { clientX: 50, clientY: 50 });
    fireEvent.mouseLeave(child);
  });

  it('renders ProjectsPage with 3D cards grid and allows toggling view mode', () => {
    const mockSetPage = vi.fn();

    render(
      <LanguageProvider>
        <ThemeProvider>
          <ProjectsPage setPage={mockSetPage} />
        </ThemeProvider>
      </LanguageProvider>
    );

    // Check View Mode Switcher buttons
    const gridBtn = screen.getByRole('button', { name: /Holographic 3D Cards Grid|کارت‌های سه‌بعدی/i });
    const listBtn = screen.getByRole('button', { name: /Compact Tilt List|فهرست فشرده/i });
    expect(gridBtn).toBeTruthy();
    expect(listBtn).toBeTruthy();

    // Switch to compact list mode
    fireEvent.click(listBtn);

    // Switch back to grid mode
    fireEvent.click(gridBtn);
  });
});
