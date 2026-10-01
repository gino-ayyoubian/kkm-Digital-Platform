import * as React from 'react';
import { useLanguage } from '../LanguageContext';
import { Shield, Settings, Check, X } from 'lucide-react';

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  decidedAt: string;
}

const STORAGE_KEY = 'kkm_cookie_consent';

export const CookieConsent: React.FC = () => {
  const { direction, isFa } = useLanguage();
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [analyticsConsent, setAnalyticsConsent] = React.useState<boolean>(false);
  const [marketingConsent, setMarketingConsent] = React.useState<boolean>(false);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        // Small delay to prevent layout thrashing on initial load
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      } else {
        const parsed: CookiePreferences = JSON.parse(saved);
        setAnalyticsConsent(parsed.analytics);
        setMarketingConsent(parsed.marketing);
      }
    } catch (_) {
      setIsVisible(true);
    }
  }, []);

  // Expose global opener for Footer / Legal links
  React.useEffect(() => {
    (window as any).__openCookieConsent = () => {
      setIsModalOpen(true);
      setIsVisible(true);
    };
    return () => {
      delete (window as any).__openCookieConsent;
    };
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
      window.dispatchEvent(new CustomEvent('kkm_cookie_consent_updated', { detail: prefs }));
    } catch (_) {}
    setIsVisible(false);
    setIsModalOpen(false);
  };

  const handleAcceptAll = () => {
    savePreferences({
      essential: true,
      analytics: true,
      marketing: true,
      decidedAt: new Date().toISOString()
    });
  };

  const handleAcceptNecessary = () => {
    savePreferences({
      essential: true,
      analytics: false,
      marketing: false,
      decidedAt: new Date().toISOString()
    });
  };

  const handleSaveCustom = () => {
    savePreferences({
      essential: true,
      analytics: analyticsConsent,
      marketing: marketingConsent,
      decidedAt: new Date().toISOString()
    });
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Non-intrusive floating bottom bar */}
      {!isModalOpen && (
        <aside
          role="region"
          aria-label={isFa ? 'تنظیمات حریم خصوصی و کوکی‌ها' : 'Privacy & Cookie Consent'}
          className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-xl z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 transition-all duration-300"
          dir={direction}
        >
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary dark:text-secondary shrink-0 mt-0.5">
              <Shield className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h2 className="text-sm font-bold tracking-tight mb-1">
                {isFa ? 'احترام به حریم خصوصی و کوکی‌های سازمانی' : 'Privacy & Enterprise Cookie Settings'}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                {isFa
                  ? 'گروه بین‌المللی کیمیا کاران ماد (KKM) برای ارتقای امنیت، تحلیل عملکرد تله‌متری و شخصی‌سازی دسترسی فنی از کوکی‌های استاندارد استفاده می‌کند.'
                  : 'KKM International Group uses essential and performance cookies to safeguard sessions, analyze telemetry, and deliver tailored technical documentation.'}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                >
                  {isFa ? 'پذیرش تمام کوکی‌ها' : 'Accept All'}
                </button>
                <button
                  type="button"
                  onClick={handleAcceptNecessary}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl transition-colors"
                >
                  {isFa ? 'فقط کوکی‌های ضروری' : 'Necessary Only'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="px-3 py-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>{isFa ? 'شخصی‌سازی' : 'Customize'}</span>
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Detailed Granular Preferences Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-preferences-title"
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4"
          dir={direction}
        >
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl text-slate-900 dark:text-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
              <div className="flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-primary dark:text-secondary" />
                <h3 id="cookie-preferences-title" className="text-lg font-bold">
                  {isFa ? 'مرکز مدیریت کوکی‌ها و حریم خصوصی' : 'Cookie Preferences & Consent'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 mb-6 text-xs">
              {/* Category: Essential */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {isFa ? 'کوکی‌های ضروری و احراز هویت' : 'Strictly Necessary (Always Active)'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold">
                    REQUIRED
                  </span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  {isFa
                    ? 'کوکی‌های لازم برای نشست‌های امنیتی JWT، ترجیحات زبان و حفاظت در برابر جعل درخواست (CSRF).'
                    : 'Required for secure session auth, CSRF prevention, rate limiting, and language preferences.'}
                </p>
              </div>

              {/* Category: Analytics */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4">
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    {isFa ? 'کوکی‌های تحلیلی و تله‌متری' : 'Performance & Telemetry Analytics'}
                  </span>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                    {isFa
                      ? 'کمک به درک رفتار بازدیدکنندگان در پلتفرم و گزارش‌های ممیزی فنی بدون ثبت هویت شخصی.'
                      : 'Aggregated metrics measuring page response times, navigation patterns, and audit telemetry.'}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={analyticsConsent}
                  onChange={(e) => setAnalyticsConsent(e.target.checked)}
                  className="mt-1 h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer shrink-0"
                  aria-label="Toggle analytics cookies"
                />
              </div>

              {/* Category: Marketing */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4">
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    {isFa ? 'کوکی‌های بازاریابی و شراکت سرمایه‌گذاری' : 'Institutional Engagement & Marketing'}
                  </span>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                    {isFa
                      ? 'ثبت ارجاعات پورتال سرمایه‌گذاری و ارتباطات راهبردی با شرکا و سرمایه‌گذاران بین‌المللی.'
                      : 'Enables tailored partner briefings and tracking for institutional investment inquiries.'}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={marketingConsent}
                  onChange={(e) => setMarketingConsent(e.target.checked)}
                  className="mt-1 h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer shrink-0"
                  aria-label="Toggle marketing cookies"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={handleAcceptNecessary}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold transition-colors"
              >
                {isFa ? 'رد موارد غیرضروری' : 'Reject Non-Essential'}
              </button>
              <button
                type="button"
                onClick={handleSaveCustom}
                className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{isFa ? 'ذخیره تنظیمات انتخابی' : 'Save Preferences'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
