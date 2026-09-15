
import * as React from 'react';
import PageHeader from '../components/PageHeader';
import Section from '../components/Section';
import { useLanguage } from '../LanguageContext';
import { Page } from '../types';

const LegalPage: React.FC = () => {
    const { t } = useLanguage();

  return (
    <div>
        <PageHeader title={t(Page.Legal)} subtitle={t('LegalPageSubtitle')}/>
        
        <Section title={t('CorporateInformation')} id="corporate" className="bg-white dark:bg-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 not-prose">
                <div className="md:col-span-2">
                    <h3 className="font-semibold text-text-dark dark:text-slate-200">{t('LegalName')}</h3>
                    <p className="text-text-light dark:text-slate-300 text-lg">{t('LegalNameText')}</p>
                </div>
                <div>
                    <h3 className="font-semibold text-text-dark dark:text-slate-200">{t('RegistrationNumber')}</h3>
                    <p className="text-text-light dark:text-slate-300">{t('RegistrationNumberText')}</p>
                </div>
                <div>
                    <h3 className="font-semibold text-text-dark dark:text-slate-200">{t('NationalID')}</h3>
                    <p className="text-text-light dark:text-slate-300">{t('NationalIDText')}</p>
                </div>
                <div>
                    <h3 className="font-semibold text-text-dark dark:text-slate-200">{t('RegistrationDate')}</h3>
                    <p className="text-text-light dark:text-slate-300">{t('RegistrationDateText')}</p>
                </div>
                <div className="md:col-span-2">
                    <h3 className="font-semibold text-text-dark dark:text-slate-200">{t('CompanyCapital')}</h3>
                    <p className="text-text-light dark:text-slate-300">{t('CompanyCapitalText')}</p>
                </div>
                <div className="md:col-span-2">
                    <h3 className="font-semibold text-text-dark dark:text-slate-200">{t('HeadOffice')}</h3>
                    <p className="text-text-light dark:text-slate-300">{t('TehranOfficeAddress')}</p>
                </div>
                <div className="md:col-span-2">
                    <h3 className="font-semibold text-text-dark dark:text-slate-200">{t('AuthorizedSignatories')}</h3>
                    <p className="text-text-light dark:text-slate-300 italic">{t('AuthorizedSignatoriesText')}</p>
                </div>
            </div>
        </Section>
        
        <Section title={t('PrivacyPolicy')} id="privacy" className="bg-white dark:bg-slate-800">
            <p className="mb-6 font-medium text-primary dark:text-secondary"><strong>Last Updated: {new Date().getFullYear()}</strong></p>
            <p className="mb-8 text-lg leading-relaxed">{t('Privacy_Intro')}</p>
            
            <div className="space-y-8">
                <div className="p-4 bg-gray-50 dark:bg-slate-700/30 rounded-lg">
                    <h3 className="font-display font-bold text-xl text-text-dark dark:text-white mb-3">{t('Privacy_Collection_Title')}</h3>
                    <p className="text-text-light dark:text-slate-300">{t('Privacy_Collection_Body')}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-slate-700/30 rounded-lg">
                    <h3 className="font-display font-bold text-xl text-text-dark dark:text-white mb-3">{t('Privacy_Usage_Title')}</h3>
                    <p className="text-text-light dark:text-slate-300">{t('Privacy_Usage_Body')}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-slate-700/30 rounded-lg">
                    <h3 className="font-display font-bold text-xl text-text-dark dark:text-white mb-3">{t('Privacy_Security_Title')}</h3>
                    <p className="text-text-light dark:text-slate-300">{t('Privacy_Security_Body')}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-slate-700/30 rounded-lg">
                    <h3 className="font-display font-bold text-xl text-text-dark dark:text-white mb-3">{t('Privacy_Cookies_Title')}</h3>
                    <p className="text-text-light dark:text-slate-300">{t('Privacy_Cookies_Body')}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-slate-700/30 rounded-lg">
                    <h3 className="font-display font-bold text-xl text-text-dark dark:text-white mb-3">{t('Privacy_Rights_Title')}</h3>
                    <p className="text-text-light dark:text-slate-300">{t('Privacy_Rights_Body')}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-slate-700/30 rounded-lg">
                    <h3 className="font-display font-bold text-xl text-text-dark dark:text-white mb-3">{t('Privacy_Consent_Title')}</h3>
                    <p className="text-text-light dark:text-slate-300">{t('Privacy_Consent_Body')}</p>
                </div>
            </div>
        </Section>

        <Section title={t('TermsOfUse')} id="terms" className="bg-white dark:bg-slate-800">
             <p><strong>Agreement to Terms</strong></p>
             <p>These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and KKM International Group (“Company”, “we”, “us”, or “our”), concerning your access to and use of the website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”).</p>
            
            <h3 className="font-bold mt-4 text-text-dark dark:text-white">Intellectual Property Rights</h3>
            <p>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.</p>

            <h3 className="font-bold mt-4 text-text-dark dark:text-white">Prohibited Activities</h3>
            <p>You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>
        </Section>
    </div>
  );
};

export default LegalPage;
