import * as React from 'react';
import { Page } from '../types';
import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';
import { Home, Compass, Layers, Cpu, Newspaper, Mail, ArrowLeft, ArrowRight, AlertTriangle } from 'lucide-react';

interface NotFoundPageProps {
  setPage: (page: Page) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ setPage }) => {
  const { direction, isFa } = useLanguage();

  const quickLinks = [
    { name: isFa ? 'صفحه اصلی' : 'Homepage', page: Page.Home, icon: Home, desc: isFa ? 'بازگشت به نمای کلی سازمان' : 'Return to group overview' },
    { name: isFa ? 'درباره سازمان' : 'About KKM', page: Page.AboutUs, icon: Compass, desc: isFa ? 'تاریخچه، چشم‌انداز و اعضای کادر رهبری' : 'History, vision & executive leadership' },
    { name: isFa ? 'فناوری‌های بنیادین' : 'Core Technologies', page: Page.Technology, icon: Cpu, desc: isFa ? 'اکوسیستم GMEL و سیکل‌های بسته' : 'GMEL ecosystem & closed-loop cycles' },
    { name: isFa ? 'پروژه‌ها و پایلوت‌ها' : 'Projects & Pilots', page: Page.Projects, icon: Layers, desc: isFa ? 'طرح‌های شاخص قشم، سرخس و توسعه' : 'Flagship Qeshm & Sarakhs testbeds' },
    { name: isFa ? 'اخبار و رویدادها' : 'News & Insights', page: Page.News, icon: Newspaper, desc: isFa ? 'گزارش‌های فنی و بیانیه‌های رسمی' : 'Technical whitepapers & official briefings' },
    { name: isFa ? 'تماس با ما' : 'Contact Us', page: Page.Contact, icon: Mail, desc: isFa ? 'ارتباط با دفاتر و دبیرخانه' : 'Inquiries, partnerships & IVR routing' },
  ];

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 transition-colors" dir={direction}>
      <div className="max-w-3xl w-full text-center">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold tracking-wider mb-6">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span>HTTP 404 — PAGE NOT FOUND</span>
        </div>

        {/* Big 404 Header */}
        <h1 className="text-6xl sm:text-8xl font-display font-black text-slate-900 dark:text-white tracking-tight mb-4">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-800 dark:text-slate-100 mb-4">
          {isFa ? 'صفحه مورد نظر یافت نشد' : 'The Requested Route Does Not Exist'}
        </h2>

        <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed mb-10">
          {isFa 
            ? 'مسیری که درخواست نموده‌اید در زیست‌بوم دیجیتال گروه بین‌المللی کیمیا کاران ماد (KKM) تعریف نشده است یا به آدرس جدیدی منتقل شده است.' 
            : 'The resource or endpoint you requested cannot be located within the KKM International Group digital ecosystem. Please verify the URL or select an official destination below.'}
        </p>

        {/* Primary CTA */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <button
            onClick={() => setPage(Page.Home)}
            className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all text-sm flex items-center gap-2 shadow-md active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>{isFa ? 'بازگشت به صفحه اصلی' : 'Return to Homepage'}</span>
          </button>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-bold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all text-sm flex items-center gap-2"
          >
            {isFa ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{isFa ? 'صفحه قبلی' : 'Go Back'}</span>
          </button>
        </div>

        {/* Valid Directory Grid */}
        <div className="text-start">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 text-center">
            {isFa ? 'مسیرهای رسمی و منتشرشده در سایت' : 'Official Published Sections'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {quickLinks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => setPage(item.page)}
                  className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-start hover:border-primary/50 hover:shadow-sm transition-all group flex items-start gap-3"
                >
                  <div className="p-2 rounded-lg bg-primary/10 text-primary dark:text-secondary group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                      {item.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default NotFoundPage;
