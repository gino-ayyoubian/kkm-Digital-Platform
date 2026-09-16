import * as React from 'react';
import { useLanguage } from '../LanguageContext';
import { Page } from '../types';

import { trackCTA } from '../lib/analytics';
interface GlobalCTAProps {
    titleKey?: string;
    subtitleKey?: string;
    primaryActionKey?: string;
    primaryActionUrl?: Page;
    secondaryActionKey?: string;
    secondaryActionUrl?: Page;
    setPage: (page: Page) => void;
}

const GlobalCTA: React.FC<GlobalCTAProps> = ({
    titleKey = 'ReadyToInnovate',
    subtitleKey = 'ReadyToInnovateDesc',
    primaryActionKey = 'CTA_PartnerWithKKM',
    primaryActionUrl = Page.Contact,
    secondaryActionKey = 'CTA_RequestProjectAssessment',
    secondaryActionUrl = Page.Contact,
    setPage
}) => {
    const { t } = useLanguage();

    return (
        <div className="bg-primary-dark dark:bg-slate-900 py-20 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="cta-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M0 40L40 0H20L0 20M40 40V20L20 40" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#cta-pattern)" className="text-secondary" />
                </svg>
            </div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                    {t(titleKey)}
                </h2>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10">
                    {t(subtitleKey)}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button 
                        onClick={() => { trackCTA(primaryActionKey, primaryActionUrl); setPage(primaryActionUrl); }}
                        className="px-8 py-4 bg-secondary text-primary-dark font-bold rounded-full hover:bg-white hover:text-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0"
                    >
                        {t(primaryActionKey)}
                    </button>
                    <button 
                        onClick={() => { trackCTA(secondaryActionKey, secondaryActionUrl); setPage(secondaryActionUrl); }}
                        className="px-8 py-4 bg-transparent text-white font-bold rounded-full border-2 border-white/20 hover:border-white hover:bg-white/10 transition-all duration-300"
                    >
                        {t(secondaryActionKey)}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GlobalCTA;
