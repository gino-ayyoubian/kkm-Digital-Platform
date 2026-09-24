import * as React from 'react';
import { Page } from '../types';
import { useLanguage } from '../LanguageContext';
import { Helmet } from 'react-helmet-async';
import { GoogleKeepWorkspace } from '../components/GoogleKeepWorkspace';
import { ArrowLeft, ChevronRight, Home, StickyNote } from 'lucide-react';

interface GoogleKeepPageProps {
  setPage: (page: Page) => void;
}

export const GoogleKeepPage: React.FC<GoogleKeepPageProps> = ({ setPage }) => {
  const { language, direction } = useLanguage();
  const isFa = language === 'FA';

  const canonicalUrl = 'https://www.kkm-intl.com/google-keep';
  const pageTitle = isFa 
    ? 'یادداشت‌ها و چک‌لیست‌های Google Keep | گروه بین‌المللی KKM' 
    : 'Google Keep Notes & Scratchpad | KKM International Group';
  const pageDescription = isFa 
    ? 'سامانه مدیریت یادداشت‌ها، پروژه‌ها و چک‌لیست‌های سازمانی هماهنگ‌شده با Firebase Firestore و Google Keep.' 
    : 'Enterprise note-taking, project checklists, and memos synchronized with Firebase Firestore and Google Keep.';

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen pt-20 pb-16 transition-colors" dir={direction}>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <button 
            onClick={() => setPage(Page.Home)}
            className="hover:text-primary dark:hover:text-secondary flex items-center gap-1 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3 h-3 text-slate-400 rtl:rotate-180" />
          <button 
            onClick={() => setPage(Page.InternalPortal)}
            className="hover:text-primary dark:hover:text-secondary transition-colors"
          >
            Internal Portal
          </button>
          <ChevronRight className="w-3 h-3 text-slate-400 rtl:rotate-180" />
          <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
            <StickyNote className="w-3.5 h-3.5 text-amber-500" />
            Google Keep
          </span>
        </nav>
      </div>

      {/* Google Keep Workspace Component */}
      <GoogleKeepWorkspace onBack={() => setPage(Page.InternalPortal)} />
    </div>
  );
};

export default GoogleKeepPage;
