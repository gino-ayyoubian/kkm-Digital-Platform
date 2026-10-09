import React, { useState } from 'react';
import { usePWAInstall } from './usePWAInstall';
import { useLanguage } from '../LanguageContext';
import { Download, Smartphone, Share2, PlusSquare, X, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface PWAInstallButtonProps {
  variant?: 'header' | 'drawer' | 'footer' | 'card';
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ 
  variant = 'header',
  className = ''
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const { isFa, direction } = useLanguage();
  const isRtl = direction === 'rtl';

  if (isInstalled) {
    return null;
  }

  // Common action handler
  const handleAction = async () => {
    if (isInstallable) {
      await install();
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      // If browser doesn't support beforeinstallprompt (e.g. desktop safari/firefox)
      setShowIOSGuide(true);
    }
  };

  // iOS / Manual Installation Modal
  const renderGuideModal = () => (
    <AnimatePresence>
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-2xl relative text-start"
            dir={direction}
          >
            <button
              onClick={() => setShowIOSGuide(false)}
              className="absolute top-5 end-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white">
                  {isFa ? 'نصب وب‌اپلیکیشن سازمانی KKM' : 'Install KKM Enterprise App'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isFa ? 'دسترسی سریع بدون نیاز به دانلود از استور' : 'Direct installation without app store download'}
                </p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary dark:text-secondary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  ۱
                </div>
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {isFa ? 'مرورگر سافاری (iOS) یا کروم (اندروید/ویندوز)' : 'In Safari (iOS) or Chrome (Desktop/Android)'}
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {isFa ? 'در نوار ابزار مرورگر روی دکمه «اشتراک‌گذاری» (Share) کلیک کنید.' : 'Tap or click the browser Share / Menu icon.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary dark:text-secondary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  ۲
                </div>
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {isFa ? 'انتخاب گزینه «افزودن به صفحه اصلی»' : 'Select "Add to Home Screen"'}
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {isFa ? 'در منوی باز شده روی Add to Home Screen بزنید.' : 'Choose "Add to Home Screen" from the action menu.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {isFa ? 'عملکرد مستقل و دسترسی آفلاین' : 'Standalone & Offline Mode'}
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {isFa ? 'آیکون KKM در صفحه دستگاه شما قرار گرفته و آماده استفاده سریع است.' : 'The KKM icon will appear on your device launcher.'}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-6 w-full py-3 rounded-2xl bg-gradient-to-r from-primary to-slate-900 text-white font-bold text-xs sm:text-sm hover:opacity-95 transition shadow-lg shadow-primary/20 active:scale-[0.99]"
            >
              {isFa ? 'متوجه شدم' : 'Understood'}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  // Variant 1: Header (Discreet, executive, hidden on mobile so it NEVER crowds the brand logo!)
  if (variant === 'header') {
    // Only display if installable or iOS
    if (!isInstallable && !isIOS) {
      return null;
    }

    return (
      <>
        <button
          onClick={handleAction}
          className={`hidden lg:inline-flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-secondary hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary text-xs font-semibold ${className}`}
          title={isFa ? 'نصب وب‌اپلیکیشن سازمانی KKM' : 'Install KKM Enterprise App'}
          aria-label={isFa ? 'نصب وب‌اپلیکیشن سازمانی KKM' : 'Install KKM Enterprise App'}
        >
          <Smartphone className="w-4 h-4 text-cyan-600 dark:text-secondary shrink-0" />
          <span className="hidden xl:inline">{isFa ? 'نصب برنامه' : 'Install App'}</span>
        </button>
        {renderGuideModal()}
      </>
    );
  }

  // Variant 2: Drawer (Mobile Menu Premium Corporate Card)
  if (variant === 'drawer') {
    return (
      <>
        <div className={`p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-slate-100/70 dark:from-slate-800/60 dark:to-slate-900/60 relative overflow-hidden group shadow-xs ${className}`}>
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -top-12 -end-12 w-28 h-28 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-center gap-3.5 mb-3 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-cyan-500 text-white flex items-center justify-center shadow-md shadow-cyan-500/20 shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                {isFa ? 'وب‌اپلیکیشن همراه KKM' : 'KKM Enterprise PWA'}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                {isFa ? 'دسترسی سریع، مستقل و آفلاین' : 'Fast, Standalone & Offline Access'}
              </div>
            </div>
          </div>

          <button
            onClick={handleAction}
            className="w-full py-2.5 px-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isFa ? 'نصب مستقیم روی گوشی / دسکتاپ' : 'Install on Device'}</span>
          </button>
        </div>
        {renderGuideModal()}
      </>
    );
  }

  // Variant 3: Footer Link
  if (variant === 'footer') {
    return (
      <>
        <button
          onClick={handleAction}
          className={`text-gray-400 hover:text-white text-xs transition-colors flex items-center gap-1.5 ${className}`}
          title={isFa ? 'نصب وب‌اپلیکیشن سازمانی KKM' : 'Install KKM Enterprise App'}
        >
          <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
          <span>{isFa ? 'نصب اپلیکیشن KKM' : 'Install KKM App'}</span>
        </button>
        {renderGuideModal()}
      </>
    );
  }

  // Default Fallback
  return null;
};

export default PWAInstallButton;
