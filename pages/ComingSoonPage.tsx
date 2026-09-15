import * as React from 'react';
import { useLanguage } from '../LanguageContext';

interface ComingSoonPageProps {
  pageTitle: string;
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ pageTitle }) => {
  const { t } = useLanguage();
  return (
    <div className="flex items-center justify-center py-24">
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-5xl font-display font-extrabold text-primary dark:text-secondary">
          {pageTitle}
        </h1>
        <p className="mt-4 text-xl text-text-light dark:text-slate-300">
          {t('ComingSoonText1')}
        </p>
        <p className="mt-2 text-text-light dark:text-slate-300">
          {t('ComingSoonText2')}
        </p>
        <div className="mt-8">
            <svg className="mx-auto h-24 w-24 text-primary/10 dark:text-secondary/10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;