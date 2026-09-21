import * as React from 'react';
import { Page, ClaimDomain } from '../types';
import { useLanguage } from '../LanguageContext';
import { Helmet } from 'react-helmet-async';
import { ClaimRegistry } from '../components/ClaimRegistry';
import { 
  ShieldCheck, 
  FileCheck, 
  Layers, 
  Scale, 
  CheckCircle2, 
  Target, 
  TrendingUp, 
  ChevronRight, 
  ArrowLeft, 
  Download, 
  BookOpen, 
  Building2, 
  Cpu, 
  Leaf, 
  ExternalLink 
} from 'lucide-react';

interface ClaimRegistryPageProps {
  setPage: (page: Page) => void;
  initialDomain?: ClaimDomain | 'All';
}

export const ClaimRegistryPage: React.FC<ClaimRegistryPageProps> = ({ 
  setPage, 
  initialDomain = 'All' 
}) => {
  const { language, direction } = useLanguage();
  const isFa = language === 'FA';

  const canonicalUrl = 'https://www.kkm-intl.com/claims';
  const pageTitle = isFa 
    ? 'سامانه ثبت و ممیزی ادعاهای عملکردی، فنی و پایداری | گروه بین‌المللی KKM' 
    : 'Performance, Technical & ESG Claims Registry | KKM International Group';
  const pageDescription = isFa 
    ? 'ماتریس جامع ثبت، صلاحیت‌سنجی و ممیزی ادعاهای عملکردی، فنی، محیط‌زیستی و مالکیتی بر اساس وضعیت‌های ممیزی‌شده (Verified)، هدف (Target) و برآورد (Estimate) طبق دستورالعمل حاکمیتی P0-13.' 
    : 'Enterprise matrix governing all performance, technical, environmental (ESG), and intellectual property claims categorized by verification status (Verified/Target/Estimate) under Directive P0-13.';

  // Schema.org structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DataCatalog',
    name: 'KKM Claims & Verification Registry',
    description: pageDescription,
    url: canonicalUrl,
    publisher: {
      '@type': 'Organization',
      name: 'KKM International Group',
      url: 'https://www.kkm-intl.com'
    },
    about: [
      { '@type': 'Thing', name: 'Performance Metrics' },
      { '@type': 'Thing', name: 'Technical Claims' },
      { '@type': 'Thing', name: 'ESG Disclosures' },
      { '@type': 'Thing', name: 'Verification Status Governance' }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors" dir={direction}>
      
      {/* SEO & Meta Tags */}
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      {/* Hero Header Section */}
      <section className="bg-slate-900 text-white pt-24 pb-16 border-b border-slate-800 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="claim-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#10b981" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#claim-grid)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
          
          {/* Breadcrumbs & Navigation */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6">
            <button 
              onClick={() => setPage(Page.Home)}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              {isFa ? 'صفحه اصلی' : 'Home'}
            </button>
            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180 text-slate-600" />
            <button 
              onClick={() => setPage(Page.CorporateInfo)}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              {isFa ? 'حاکمیت سازمانی' : 'Governance'}
            </button>
            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180 text-slate-600" />
            <span className="text-emerald-400 font-bold">
              {isFa ? 'ماتریس ادعاها (Claim Registry)' : 'Claim Registry'}
            </span>
          </div>

          <div className="max-w-4xl">
            {/* Governance Directive Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{isFa ? 'دستورالعمل حاکمیتی P0-13 و P0-02: ماتریس ممیزی حقیقت' : 'P0-13 & P0-02 Directive: Formal Claim Matrix'}</span>
            </div>

            {/* Semantic Unique H1 */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight mb-4">
              {isFa 
                ? 'سامانه جامع ثبت و ممیزی ادعاهای عملکردی، فنی و پایداری KKM' 
                : 'Performance, Technical & ESG Claims Registry'}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
              {isFa 
                ? 'ماتریس استاندارد حاکمیتی گروه بین‌المللی کیمیا کاران ماد جهت شفاف‌سازی و دسته‌بندی کلیه ادعاهای فنی، شاخص‌های عملکردی و اهداف پایداری در ستون‌های ساختاریافته شامل شناسه یکتا، وضعیت صلاحیت (ممیزی‌شده / هدف / برآورد)، متدولوژی منبع، مستندات استنادی و چرخه بازنگری دوره‌ای.' 
                : 'The official enterprise registry of KKM International Group governing all published technical, operational, and ESG statements. Every claim is strictly indexed with its unique ID, verification status (Verified/Target/Estimate), source methodology, reference documentary evidence, and scheduled review cycle.'}
            </p>
          </div>

          {/* Qualification Status Definition Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
            {/* Status: Verified */}
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-emerald-500/30 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isFa ? '۱. ممیزی‌شده (Verified)' : '1. Verified Status'}</span>
              </div>
              <h3 className="text-sm font-bold text-white mb-1">
                {isFa ? 'شواهد مستقل و اسناد ثبتی (Level A / B)' : 'Independently Audited / Level A–B'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isFa 
                  ? 'دارای گزارش رسمی ممیزی شخص ثالث، انتشار در روزنامه رسمی کشور، یا آزمون آزمایشگاهی معتبر با پروتکل مشخص.' 
                  : 'Supported by third-party audit reports, legal gazette filings, certified laboratory tests, or patent grant registrations.'}
              </p>
            </div>

            {/* Status: Target */}
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-blue-500/30 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-bold uppercase mb-2">
                <Target className="w-4 h-4" />
                <span>{isFa ? '۲. هدف درون‌سازمانی (Target)' : '2. Target Status'}</span>
              </div>
              <h3 className="text-sm font-bold text-white mb-1">
                {isFa ? 'تست‌بد و تارگت مهندسی (Level C / E)' : 'Empirical Testbeds / Level C–E'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isFa 
                  ? 'آزمایش‌شده در تست‌بدهای توسعه شرکت KKM یا تارگت‌های عملیاتی در دست اجرا در سایت‌های پایلوت منطقه‌ای.' 
                  : 'Derived from proprietary bench-scale testbeds, active pilot deployment targets, or codified internal policies.'}
              </p>
            </div>

            {/* Status: Estimate */}
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-amber-500/30 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase mb-2">
                <TrendingUp className="w-4 h-4" />
                <span>{isFa ? '۳. برآورد و شبیه‌سازی (Estimate)' : '3. Estimate Status'}</span>
              </div>
              <h3 className="text-sm font-bold text-white mb-1">
                {isFa ? 'مدل‌سازی ترمودینامیکی و مخزن (Level D)' : 'Computational Models / Level D'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isFa 
                  ? 'محاسبه‌شده از طریق شبیه‌سازی‌های دینامیکی Aspen HYSYS، مدل‌های عددی مخزن Petrel و موازنه جرم و حرارت.' 
                  : 'Calculated via Aspen HYSYS thermodynamic simulations, Petrel/ECLIPSE reservoir simulations, or engineering models.'}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-7xl">
        
        {/* The Claim Registry Structured Table Component */}
        <section aria-labelledby="claim-registry-table-heading">
          <h2 id="claim-registry-table-heading" className="sr-only">
            {isFa ? 'جدول ادعاهای ثبت‌شده' : 'Registered Claims Table'}
          </h2>
          <ClaimRegistry setPage={setPage} defaultDomain={initialDomain} />
        </section>

        {/* Governance Cross-Reference Hub */}
        <section className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="text-xs font-mono uppercase text-slate-400 font-bold mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-500" />
            <span>{isFa ? 'سامانه‌های حاکمیتی مرتبط با رجیستری ادعاها' : 'Interconnected Governance & Truth Layer Portals'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 1. Evidence Registry */}
            <div 
              onClick={() => setPage(Page.EvidenceRegistry)}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer group shadow-sm"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                {isFa ? 'رجیستری شواهد فنی' : 'Evidence Registry'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {isFa ? 'فایل‌های ممیزی سطوح A تا G و اسناد اثباتی' : 'Inspect Level A–G technical evidence files and audit archives.'}
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>{isFa ? 'مشاهده اسناد' : 'Explore Archive'}</span>
                <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </div>
            </div>

            {/* 2. Sustainability & ESG */}
            <div 
              onClick={() => setPage(Page.Sustainability)}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer group shadow-sm"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                {isFa ? 'پایداری و حاکمیت ESG' : 'Sustainability & ESG'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {isFa ? 'گزارش‌های صلاحیت‌سنجی کربن و چارچوب GHG' : 'Qualified emissions inventories, GHG accounting, and ISO policies.'}
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>{isFa ? 'داشبورد ESG' : 'View ESG Metrics'}</span>
                <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </div>
            </div>

            {/* 3. IP Center */}
            <div 
              onClick={() => setPage(Page.IPCenter)}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer group shadow-sm"
            >
              <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-purple-500 transition-colors">
                {isFa ? 'مرکز مالکیت فکری و پتنت' : 'IP & Patent Center'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {isFa ? 'پتنت‌ها، گواهینامه‌های ثبت و نوآوری‌های محافظت‌شده' : 'Granted patents, split-vault trade secrets, and registered trademarks.'}
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-bold text-purple-600 dark:text-purple-400">
                <span>{isFa ? 'دفتر پتنت' : 'View Patents'}</span>
                <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </div>
            </div>

            {/* 4. Corporate Info */}
            <div 
              onClick={() => setPage(Page.CorporateInfo)}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer group shadow-sm"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                {isFa ? 'اطلاعات رسمی شرکتی' : 'Corporate Records'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {isFa ? 'شناسه ملی، شماره ثبت، روزنامه رسمی و گواهی‌ها' : 'National ID, corporate registration deed, bank accounts, and certificates.'}
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400">
                <span>{isFa ? 'اطلاعات حقوقی' : 'Legal Registry'}</span>
                <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </div>
            </div>

          </div>
        </section>

      </main>

    </div>
  );
};

export default ClaimRegistryPage;
