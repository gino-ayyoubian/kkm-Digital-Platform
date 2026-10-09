import * as React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage, SUPPORTED_LANGUAGES } from '../LanguageContext';
import type { Language } from '../LanguageContext';
import { Globe, ChevronDown, Check, X, ArrowLeftRight, CheckCircle2 } from 'lucide-react';

interface LanguageSwitcherProps {
  /**
   * Layout display mode:
   * - 'header': Responsive executive selector (Mobile slide-up bottom sheet on small screens, floating popover on desktop)
   * - 'toggle': Simple direct toggle button between English & Persian
   * - 'segmented': Segmented horizontal list (ideal for drawers or modal panels)
   */
  variant?: 'header' | 'toggle' | 'segmented';
  className?: string;
  onLanguageChange?: (lang: Language) => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'header',
  className = '',
  onLanguageChange,
}) => {
  const { language, setLanguage, toggleLanguage, direction, t } = useLanguage();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  const [mounted, setMounted] = React.useState<boolean>(false);
  const [feedbackToast, setFeedbackToast] = React.useState<string | null>(null);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const isRtl = direction === 'rtl';

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  // Client mounting & viewport detection
  React.useEffect(() => {
    setMounted(true);
    const updateViewport = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 640);
      }
    };
    updateViewport();
    window.addEventListener('resize', updateViewport, { passive: true });
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  // Body scroll lock on mobile bottom sheet
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    if (isOpen && isMobile) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen, isMobile]);

  // Handle outside click & escape key
  React.useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      // Only for desktop popover outside click
      if (!isMobile && containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isMobile]);

  const toastTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const handleSelectLanguage = (code: Language) => {
    setLanguage(code);
    onLanguageChange?.(code);

    const chosen = SUPPORTED_LANGUAGES.find((l) => l.code === code);
    if (chosen) {
      setFeedbackToast(chosen.nativeName);
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = setTimeout(() => {
        setFeedbackToast(null);
      }, 1600);
    }

    setIsOpen(false);
  };

  const handleQuickToggle = () => {
    const nextLang = language === 'EN' ? 'FA' : 'EN';
    toggleLanguage();
    onLanguageChange?.(nextLang);
    const chosen = SUPPORTED_LANGUAGES.find((l) => l.code === nextLang);
    if (chosen) {
      setFeedbackToast(chosen.nativeName);
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = setTimeout(() => {
        setFeedbackToast(null);
      }, 1600);
    }
    setIsOpen(false);
  };

  // 1. Direct toggle variant (quick switch between EN and FA)
  if (variant === 'toggle') {
    const isEn = language === 'EN';
    return (
      <button
        type="button"
        onClick={handleQuickToggle}
        className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all duration-200 shadow-xs active:scale-95 min-h-[44px] ${
          isEn
            ? 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'
            : 'bg-primary/10 hover:bg-primary/20 text-primary-dark dark:text-secondary border-primary/30'
        } ${className}`}
        aria-label={`Current language: ${currentLang.nativeName}. Click to toggle English and Persian`}
        title="Toggle English / فارسی"
      >
        <Globe className="w-4 h-4 text-primary dark:text-secondary" />
        <span className="font-mono">{isEn ? 'EN' : 'FA'}</span>
        <span className="text-[10px] opacity-60">⇄</span>
        <span className="text-[11px] font-sans">{isEn ? 'فارسی' : 'English'}</span>
      </button>
    );
  }

  // 2. Segmented variant (used in mobile navigation drawer or settings panel)
  if (variant === 'segmented') {
    return (
      <div className={`space-y-2.5 ${className}`}>
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-primary dark:text-secondary" />
            {t('SystemLanguage')}
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-primary/10 dark:bg-secondary/15 text-primary dark:text-secondary font-bold flex items-center gap-1">
            <span>{currentLang.flag}</span>
            <span>{currentLang.code}</span>
          </span>
        </div>
        <div className="grid grid-cols-5 gap-1.5" role="radiogroup" aria-label={t('SelectLanguage')}>
          {SUPPORTED_LANGUAGES.map((langItem) => {
            const isSelected = language === langItem.code;
            return (
              <button
                key={langItem.code}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => handleSelectLanguage(langItem.code)}
                className={`py-2 px-1 rounded-xl text-xs font-bold transition-all text-center min-h-[48px] active:scale-95 flex flex-col items-center justify-center border ${
                  isSelected
                    ? 'bg-primary text-white border-primary shadow-md shadow-primary/25 scale-[1.02]'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/80'
                }`}
              >
                <span className="text-sm leading-none mb-0.5">{langItem.flag}</span>
                <span className="leading-tight text-[11px] truncate max-w-full px-0.5">{langItem.nativeName}</span>
                <span className="text-[9px] opacity-75 font-mono mt-0.5">{langItem.code}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 3. Default Header Variant (Responsive: Mobile Sheet on small screens, Popover on Desktop)
  return (
    <div ref={containerRef} className={`relative inline-flex items-center gap-1 sm:gap-1.5 ${className}`}>
      {/* Quick 1-Click Toggle for Desktop (EN <-> FA) */}
      <button
        type="button"
        onClick={handleQuickToggle}
        className="hidden md:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-semibold text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-secondary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700 min-h-[38px]"
        title="Quick Toggle EN / FA"
        aria-label="Quick toggle English and Persian"
      >
        <span className={language === 'EN' ? 'font-bold text-primary dark:text-secondary' : 'opacity-60'}>EN</span>
        <ArrowLeftRight className="w-3 h-3 text-slate-400" />
        <span className={language === 'FA' ? 'font-bold text-primary dark:text-secondary' : 'opacity-60'}>فا</span>
      </button>

      {/* Main Header Trigger Button (Mobile 44x44px ergonomic touch target, Desktop sleek button) */}
      <button
        id="header-language-switcher-btn"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-1.5 p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary shadow-xs active:scale-95 min-h-[44px] min-w-[44px] sm:min-h-[38px] sm:min-w-0"
        aria-label={`Language selector: current is ${currentLang.nativeName}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4 text-primary dark:text-secondary shrink-0" />
        <span className="text-xs sm:text-sm leading-none">{currentLang.flag}</span>
        <span className="font-mono tracking-tight text-xs font-bold">{currentLang.code}</span>
        <span className="hidden xl:inline text-[11px] font-normal opacity-70">
          ({currentLang.nativeName})
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180 text-primary dark:text-secondary' : ''
          }`}
        />
      </button>

      {/* FEEDBACK TOAST / BADGE */}
      <AnimatePresence>
        {feedbackToast && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.9 }}
            className="absolute top-full mt-2 start-0 bg-primary text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-lg z-[120] pointer-events-none whitespace-nowrap flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3 h-3 text-secondary" />
            <span>{feedbackToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* A) DESKTOP POPOVER DROPDOWN (>= 640px) */}
      {!isMobile && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.96 }}
              transition={{ duration: 0.16, ease: 'easeOut' }}
              className={`absolute top-full mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-2 border border-slate-200 dark:border-slate-800 z-50 ring-1 ring-black/5 ${
                isRtl ? 'left-0' : 'right-0'
              }`}
              role="listbox"
              aria-label={t('SelectLanguage')}
            >
              <div className="flex items-center justify-between px-3 py-1.5 mb-1 border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                <span>{t('SelectLanguage')}</span>
                <span className="font-mono text-[9px] text-primary dark:text-secondary">{currentLang.code}</span>
              </div>

              <div className="space-y-1">
                {SUPPORTED_LANGUAGES.map((langItem) => {
                  const isSelected = language === langItem.code;
                  return (
                    <button
                      key={langItem.code}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelectLanguage(langItem.code)}
                      className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-start min-h-[44px] ${
                        isSelected
                          ? 'bg-primary/10 dark:bg-secondary/15 text-primary dark:text-secondary font-bold shadow-xs'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{langItem.flag}</span>
                        <div className="text-start">
                          <div className="font-semibold text-slate-900 dark:text-slate-100 leading-tight">
                            {langItem.nativeName}
                          </div>
                          <div className="text-[10px] text-slate-400 leading-tight mt-0.5">
                            {langItem.label} · {langItem.direction.toUpperCase()}
                          </div>
                        </div>
                      </div>
                      {isSelected ? (
                        <Check className="w-4 h-4 text-primary dark:text-secondary shrink-0" />
                      ) : (
                        <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                          {langItem.code}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* B) MOBILE BOTTOM SHEET MODAL (< 640px) */}
      {isMobile && mounted && typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <div
                className="fixed inset-0 z-[100] flex flex-col justify-end"
                role="dialog"
                aria-modal="true"
                aria-label={t('SelectLanguage')}
              >
                {/* Backdrop Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setIsOpen(false)}
                  className="fixed inset-0 bg-slate-950/70 backdrop-blur-md cursor-pointer"
                  aria-hidden="true"
                />

                {/* Bottom Sheet Card */}
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                  className="relative z-10 w-full bg-white dark:bg-slate-900 rounded-t-3xl border-t border-slate-200 dark:border-slate-800 shadow-2xl p-5 pb-8 max-h-[85vh] overflow-y-auto overscroll-contain flex flex-col space-y-4"
                >
                  {/* Swipe / Drag Indicator Bar */}
                  <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto -mt-1 mb-1" />

                  {/* Header Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-primary/10 dark:bg-secondary/15 text-primary dark:text-secondary">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-tight">
                          {t('SystemLanguage')}
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {t('SelectLanguage')}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="p-2.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95"
                      aria-label="Close language selector"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Quick 1-Tap Toggle Banner between Primary Languages (EN <-> FA) */}
                  <button
                    type="button"
                    onClick={handleQuickToggle}
                    className="w-full p-3 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/15 dark:from-secondary/15 dark:to-primary/20 border border-primary/20 flex items-center justify-between transition-all active:scale-[0.99] min-h-[48px]"
                  >
                    <div className="flex items-center gap-2">
                      <ArrowLeftRight className="w-4 h-4 text-primary dark:text-secondary" />
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {t('QuickSwitch')}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-xs font-bold">
                      <span className={language === 'FA' ? 'text-primary dark:text-secondary' : 'text-slate-400'}>
                        فارسی 🇮🇷
                      </span>
                      <span className="text-slate-400">⇄</span>
                      <span className={language === 'EN' ? 'text-primary dark:text-secondary' : 'text-slate-400'}>
                        English 🇬🇧
                      </span>
                    </div>
                  </button>

                  {/* 5 Language Selection Options List */}
                  <div className="space-y-2 pt-1" role="listbox" aria-label={t('SelectLanguage')}>
                    {SUPPORTED_LANGUAGES.map((langItem) => {
                      const isSelected = language === langItem.code;
                      return (
                        <button
                          key={langItem.code}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => handleSelectLanguage(langItem.code)}
                          className={`w-full p-3.5 rounded-2xl border transition-all text-start flex items-center justify-between min-h-[58px] active:scale-[0.98] ${
                            isSelected
                              ? 'bg-primary/10 dark:bg-secondary/15 border-primary dark:border-secondary shadow-sm ring-1 ring-primary/20'
                              : 'bg-slate-50/80 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl p-1.5 rounded-xl bg-white dark:bg-slate-800 shadow-2xs border border-slate-200/60 dark:border-slate-700">
                              {langItem.flag}
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                                  {langItem.nativeName}
                                </span>
                                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-slate-200/70 dark:bg-slate-700 font-bold text-slate-700 dark:text-slate-300">
                                  {langItem.code}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                <span>{langItem.label}</span>
                                <span>•</span>
                                <span className="text-[11px] opacity-80">
                                  {langItem.direction === 'rtl' ? t('DirectionRTL') : t('DirectionLTR')}
                                </span>
                              </div>
                            </div>
                          </div>

                          {isSelected ? (
                            <div className="flex items-center gap-1.5">
                              <span className="text-[11px] font-bold text-primary dark:text-secondary hidden xs:inline">
                                {t('ActiveLanguage')}
                              </span>
                              <div className="w-7 h-7 rounded-full bg-primary dark:bg-secondary text-white dark:text-slate-900 flex items-center justify-center shadow-xs">
                                <Check className="w-4 h-4 stroke-[2.5]" />
                              </div>
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};

export default LanguageSwitcher;
