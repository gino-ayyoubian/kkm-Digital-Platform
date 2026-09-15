import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import ESGDashboard from './ESGDashboard';

export const SustainabilityImpact: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ESGDashboard />
    </div>
  );
};

export default SustainabilityImpact;
