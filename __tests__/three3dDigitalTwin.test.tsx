import React from 'react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThreeControlDock, type ThreeSceneControls } from '../components/three/ThreeControlDock';
import { LanguageProvider } from '../LanguageContext';
import Header from '../components/Header';
import { Page } from '../types';
import { AuthProvider } from '../AuthContext';
import { ThemeProvider } from '../ThemeContext';

vi.mock('../components/HeaderFluidAnimation', () => ({
  HeaderFluidAnimation: () => null,
}));

describe('Three.js 3D Digital Twin & Spatial Navigation System', () => {
  it('renders ThreeControlDock with functional layer toggles and camera presets', () => {
    const mockControls: ThreeSceneControls = {
      showSubsurface: true,
      showSurfaceIsland: true,
      showFluidParticles: true,
      showWireframe: false,
      explodedOffset: 0,
      flowSpeedMultiplier: 1.0,
      activeCameraPreset: 'isometric',
      activeComponentInfo: null,
    };

    const mockChangeControls = vi.fn();
    const mockResetCamera = vi.fn();
    const mockSelectPreset = vi.fn();

    render(
      <LanguageProvider>
        <ThreeControlDock
          controls={mockControls}
          onChangeControls={mockChangeControls}
          onResetCamera={mockResetCamera}
          onSelectPreset={mockSelectPreset}
        />
      </LanguageProvider>
    );

    // Verify Camera Presets exist
    expect(screen.getByText('ISO')).toBeTruthy();
    expect(screen.getByText('DEEP')).toBeTruthy();
    expect(screen.getByText('TURBINE')).toBeTruthy();
    expect(screen.getByText('TOP')).toBeTruthy();

    // Click on preset
    fireEvent.click(screen.getByText('DEEP'));
    expect(mockSelectPreset).toHaveBeenCalledWith('subsurface');

    // Reset camera button
    fireEvent.click(screen.getByTitle(/Reset Camera Angle|بازنشانی زاویه پیش‌فرض/i));
    expect(mockResetCamera).toHaveBeenCalled();

    // Verify functional tabs exist
    expect(screen.getByText(/Layers & Slices|لایه‌ها و برش‌ها/i)).toBeTruthy();
    expect(screen.getByText(/Fluid Kinematics|دینامیک سیال/i)).toBeTruthy();
    expect(screen.getByText(/Engineering Telemetry|تله‌متری مهندسی/i)).toBeTruthy();
  });

  it('switches to Kinematics tab and Telemetry tab in ThreeControlDock', () => {
    const mockControls: ThreeSceneControls = {
      showSubsurface: true,
      showSurfaceIsland: true,
      showFluidParticles: true,
      showWireframe: false,
      explodedOffset: 0.25,
      flowSpeedMultiplier: 1.5,
      activeCameraPreset: 'subsurface',
      activeComponentInfo: null,
    };

    render(
      <LanguageProvider>
        <ThreeControlDock
          controls={mockControls}
          onChangeControls={vi.fn()}
          onResetCamera={vi.fn()}
          onSelectPreset={vi.fn()}
        />
      </LanguageProvider>
    );

    // Switch to Kinematics tab
    fireEvent.click(screen.getByText(/Fluid Kinematics|دینامیک سیال/i));
    expect(screen.getByText(/Flow Velocity Multiplier|سرعت گردش سیال کاری/i)).toBeTruthy();

    // Switch to Telemetry tab
    fireEvent.click(screen.getByText(/Engineering Telemetry|تله‌متری مهندسی/i));
    expect(screen.getByText('3,850 m')).toBeTruthy();
    expect(screen.getByText('48.5 MWe')).toBeTruthy();
    expect(screen.getByText('224 °C')).toBeTruthy();
  });

  it('renders Header with 3D spatial container and Strategic Partner Data Room button', () => {
    const mockSetPage = vi.fn();
    const mockOnSearch = vi.fn();

    render(
      <LanguageProvider>
        <ThemeProvider>
          <Header
            currentPage={Page.Home}
            setPage={mockSetPage}
            onSearch={mockOnSearch}
          />
        </ThemeProvider>
      </LanguageProvider>
    );

    // Verify Data Room quick action button exists in Zone 3
    const dataRoomBtn = screen.getByRole('button', { name: /Partner Data Room|اتاق داده/i });
    expect(dataRoomBtn).toBeTruthy();

    // Click data room button
    fireEvent.click(dataRoomBtn);
    expect(mockSetPage).toHaveBeenCalledWith(Page.PartnerDataRoom);
  });
});
