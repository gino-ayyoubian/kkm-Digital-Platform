import * as React from 'react';
import { Page } from '../types';
import InvestmentPortalPage from './InvestmentPortalPage';

interface InvestorsPageProps {
  setPage: (page: Page) => void;
}

/**
 * Investors & Strategic Capital Page (TKT-031)
 * Routes /invest, /investors, /investment-portal
 */
export const InvestorsPage: React.FC<InvestorsPageProps> = ({ setPage }) => {
  return <InvestmentPortalPage setPage={setPage} />;
};

export default InvestorsPage;
