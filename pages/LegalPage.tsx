import * as React from 'react';
import PageHeader from '../components/PageHeader';
import Section from '../components/Section';
import { useLanguage } from '../LanguageContext';
import { Page } from '../types';
import { Shield, FileText, Lock, Cookie, Scale, Building2, ExternalLink } from 'lucide-react';

export type LegalTab = 'corporate' | 'privacy' | 'terms' | 'cookies' | 'dpa';

interface LegalPageProps {
  initialTab?: LegalTab;
}

const LegalPage: React.FC<LegalPageProps> = ({ initialTab = 'corporate' }) => {
  const { t, direction, isFa } = useLanguage();
  const [activeTab, setActiveTab] = React.useState<LegalTab>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['corporate', 'privacy', 'terms', 'cookies', 'dpa'].includes(hash)) {
        return hash as LegalTab;
      }
      const path = window.location.pathname.toLowerCase();
      if (path.includes('privacy')) return 'privacy';
      if (path.includes('terms')) return 'terms';
      if (path.includes('cookie')) return 'cookies';
      if (path.includes('dpa')) return 'dpa';
    }
    return initialTab;
  });

  const handleTabChange = (tab: LegalTab) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${tab}`);
    }
  };

  return (
    <div dir={direction} className="pb-20">
      <PageHeader title={t(Page.Legal)} subtitle={t('LegalPageSubtitle')} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-2 shadow-xl border border-slate-200 dark:border-slate-800 flex flex-wrap gap-2 mb-10">
          {[
            { id: 'corporate' as LegalTab, label: isFa ? 'اطلاعات حقوقی شرکت' : 'Corporate Identity', icon: Building2 },
            { id: 'privacy' as LegalTab, label: isFa ? 'سیاست حفظ حریم خصوصی' : 'Privacy Policy', icon: Shield },
            { id: 'terms' as LegalTab, label: isFa ? 'شرایط استفاده' : 'Terms of Use', icon: Scale },
            { id: 'cookies' as LegalTab, label: isFa ? 'سیاست کوکی‌ها' : 'Cookie Policy', icon: Cookie },
            { id: 'dpa' as LegalTab, label: isFa ? 'الحاقیه پردازش داده (DPA)' : 'Data Processing (DPA)', icon: Lock },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Corporate Information */}
        {activeTab === 'corporate' && (
          <Section title={t('CorporateInformation')} id="corporate" className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 not-prose text-sm">
              <div className="md:col-span-2">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">{t('LegalName')}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-lg font-medium">{t('LegalNameText')}</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100">{t('RegistrationNumber')}</h3>
                <p className="text-slate-600 dark:text-slate-300 font-mono">{t('RegistrationNumberText')}</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100">{t('NationalID')}</h3>
                <p className="text-slate-600 dark:text-slate-300 font-mono">{t('NationalIDText')}</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100">{t('RegistrationDate')}</h3>
                <p className="text-slate-600 dark:text-slate-300 font-mono">{t('RegistrationDateText')}</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="font-bold text-slate-900 dark:text-slate-100">{t('CompanyCapital')}</h3>
                <p className="text-slate-600 dark:text-slate-300">{t('CompanyCapitalText')}</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="font-bold text-slate-900 dark:text-slate-100">{t('HeadOffice')}</h3>
                <p className="text-slate-600 dark:text-slate-300">{t('TehranOfficeAddress')}</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="font-bold text-slate-900 dark:text-slate-100">{t('AuthorizedSignatories')}</h3>
                <p className="text-slate-600 dark:text-slate-300 italic">{t('AuthorizedSignatoriesText')}</p>
              </div>
            </div>
          </Section>
        )}

        {/* Tab 2: Privacy Policy */}
        {activeTab === 'privacy' && (
          <Section title={t('PrivacyPolicy')} id="privacy" className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-8">
            <p className="mb-6 font-medium text-primary dark:text-secondary text-sm">
              <strong>Last Updated: {new Date().getFullYear()} — ISO 27001 / GDPR Compliant Framework</strong>
            </p>
            <p className="mb-8 text-base leading-relaxed text-slate-700 dark:text-slate-300">{t('Privacy_Intro')}</p>

            <div className="space-y-6">
              <div className="p-5 bg-slate-50 dark:bg-slate-700/30 rounded-xl border border-slate-100 dark:border-slate-700/50">
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2">{t('Privacy_Collection_Title')}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{t('Privacy_Collection_Body')}</p>
              </div>
              <div className="p-5 bg-slate-50 dark:bg-slate-700/30 rounded-xl border border-slate-100 dark:border-slate-700/50">
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2">{t('Privacy_Usage_Title')}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{t('Privacy_Usage_Body')}</p>
              </div>
              <div className="p-5 bg-slate-50 dark:bg-slate-700/30 rounded-xl border border-slate-100 dark:border-slate-700/50">
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2">{t('Privacy_Security_Title')}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{t('Privacy_Security_Body')}</p>
              </div>
              <div className="p-5 bg-slate-50 dark:bg-slate-700/30 rounded-xl border border-slate-100 dark:border-slate-700/50">
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2">{t('Privacy_Rights_Title')}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{t('Privacy_Rights_Body')}</p>
              </div>
            </div>
          </Section>
        )}

        {/* Tab 3: Terms of Use */}
        {activeTab === 'terms' && (
          <Section title={t('TermsOfUse')} id="terms" className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-8">
            <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">1. Agreement to Terms</h3>
                <p>These Terms of Use constitute a legally binding agreement between you and KKM International Group (operating through Kimia Karan Mâd Private Joint Stock Company). By accessing this platform, the Evidence Registry, or associated portals, you agree to comply with all published guidelines.</p>
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">2. Intellectual Property & Evidence Artifacts</h3>
                <p>All technology designations including GMEL-CLG (Closed-Loop Geothermal), Smart-Casing, REE Microturbines, digital twin models, CAD files, and certified PDF evidence artifacts remain exclusive intellectual property protected under WIPO conventions and international copyright statutes.</p>
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">3. Prohibited Activities</h3>
                <p>Unauthorized scraping of telemetry APIs, automated submission bursts, reverse engineering of thermodynamic simulation code, or misrepresentation of Level A–G certification codes is strictly prohibited and subject to civil remedies.</p>
              </div>
            </div>
          </Section>
        )}

        {/* Tab 4: Cookie Policy (TKT-090, TKT-091) */}
        {activeTab === 'cookies' && (
          <Section title={isFa ? 'سیاست کوکی‌ها و ردیابی' : 'Cookie & Telemetry Policy'} id="cookies" className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-8">
            <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                {isFa
                  ? 'این خط‌مشی توضیح می‌دهد که چگونه گروه KKM از کوکی‌ها و فناوری‌های مشابه در زیست‌بوم وب خود استفاده می‌کند. ما اولویت بالایی برای حداقل‌سازی داده‌ها و شفافیت قائل هستیم.'
                  : 'This policy describes how KKM International Group uses cookies and storage technologies across our digital platform. We maintain a strict zero-excess telemetry posture.'}
              </p>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    {isFa ? 'مدیریت کوکی‌های فعال شما' : 'Manage Your Cookie Settings'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {isFa ? 'تنظیمات انتخاب‌شده خود را در هر لحظه تغییر داده یا کوکی‌های اختیاری را غیرفعال کنید.' : 'Re-open the granular preference dialog to modify consent at any time.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if ((window as any).__openCookieConsent) {
                      (window as any).__openCookieConsent();
                    }
                  }}
                  className="px-4 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl transition-colors shrink-0 shadow-sm"
                >
                  {isFa ? 'تغییر تنظیمات کوکی' : 'Open Cookie Manager'}
                </button>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-1">Essential Cookies</h4>
                  <p className="text-xs text-slate-500">JWT sessions, language selection, CSRF protection. Duration: 12h.</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-1">Telemetry & Analytics</h4>
                  <p className="text-xs text-slate-500">Vercel analytics & page speed monitoring. Anonymized IP only.</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-1">Marketing / Partner</h4>
                  <p className="text-xs text-slate-500">Inquiry UTM tracking and lead routing attribution.</p>
                </div>
              </div>
            </div>
          </Section>
        )}

        {/* Tab 5: Data Processing Addendum (DPA) */}
        {activeTab === 'dpa' && (
          <Section title={isFa ? 'الحاقیه پردازش داده‌های سازمانی (DPA)' : 'Data Processing Addendum (DPA)'} id="dpa" className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-8">
            <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                This Data Processing Addendum (“DPA”) supplements the terms of agreement between KKM International Group and corporate, institutional, or governmental clients utilizing our digital platforms, digital twin infrastructure, or technical telemetry pipelines.
              </p>
              <div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white mb-2">1. Scope and Compliance</h4>
                <p>KKM adheres to international standards including GDPR (EU 2016/679), ISO/IEC 27001 (Information Security Management), and ISO 14001 (Environmental Management). Data processed via internal portals is encrypted both in transit (TLS 1.3) and at rest (AES-256).</p>
              </div>
              <div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white mb-2">2. Sub-processors and Storage</h4>
                <p>Enterprise data is isolated per institutional project under Layer 3 (Project Memory) specifications. External sub-processors must execute standard contractual clauses (SCC) and pass annual security audits.</p>
              </div>
              <div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white mb-2">3. Incident Response and Breach Notification</h4>
                <p>In accordance with our DevSecOps charter, any confirmed security anomaly affecting client telemetry will trigger formal notice within 48 hours to the designated client contact point.</p>
              </div>
            </div>
          </Section>
        )}
      </div>
    </div>
  );
};

export default LegalPage;
