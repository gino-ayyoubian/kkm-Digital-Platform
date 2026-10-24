import React from 'react';
import { Page } from '../types';
import { useLanguage } from '../LanguageContext';
import { SocialPreviewDebugger } from '../components/social/SocialPreviewDebugger';
import { ArrowLeft, ArrowRight, ShieldCheck, Share2, Sparkles } from 'lucide-react';

interface SocialPreviewPageProps {
  setPage: (page: Page) => void;
}

export const SocialPreviewPage: React.FC<SocialPreviewPageProps> = ({ setPage }) => {
  const { isFa, direction } = useLanguage();
  const isRtl = direction === 'rtl';

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors pb-16">
      {/* Top Breadcrumb & Return Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <button
              onClick={() => setPage(Page.Home)}
              className="hover:text-primary dark:hover:text-secondary transition-colors"
            >
              {isFa ? 'صفحه اصلی' : 'Home'}
            </button>
            <span>/</span>
            <button
              onClick={() => setPage(Page.InternalPortal)}
              className="hover:text-primary dark:hover:text-secondary transition-colors"
            >
              {isFa ? 'ابزارهای پرتال سازمانی' : 'Internal Portal & Tools'}
            </button>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-bold">
              {isFa ? 'شبیه‌ساز شبکه‌های اجتماعی و سئو' : 'Social Share & OpenGraph Simulator'}
            </span>
          </div>

          <button
            onClick={() => setPage(Page.Home)}
            className="flex items-center gap-1.5 text-xs font-bold text-primary dark:text-secondary hover:underline"
          >
            {isRtl ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
            <span>{isFa ? 'بازگشت به پرتال اصلی' : 'Back to Main Portal'}</span>
          </button>
        </div>
      </div>

      {/* Main Social Preview Debugger Component */}
      <SocialPreviewDebugger
        initialPath="/"
        onNavigatePath={(path) => {
          // Keep browser history in sync without full reload
          if (typeof window !== 'undefined' && window.history) {
            window.history.replaceState(null, '', `/social-preview?target=${encodeURIComponent(path)}`);
          }
        }}
      />
    </div>
  );
};

export default SocialPreviewPage;
