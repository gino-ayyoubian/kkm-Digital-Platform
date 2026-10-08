import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage, SUPPORTED_LANGUAGES } from '../LanguageContext';
import type { Language } from '../LanguageContext';
import { Globe, ChevronDown, Check } from 'lucide-react';

interface LanguageSwitcherProps {
  /**
   * Layout display mode:
   * - 'header': Compact button with dropdown + quick EN/FA toggle pill (ideal for top nav)
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
  const { language, setLanguage, toggleLanguage, direction } = useLanguage();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isRtl = direction === 'rtl';

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  const handleSelectLanguage = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
    onLanguageChange?.(code);
  };

  // Close dropdown on outside click
  React.useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
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
  }, [isOpen]);

  // Direct toggle variant (quick switch between EN and FA)
  if (variant === 'toggle') {
    const isEn = language === 'EN';
    return (
      <button
        type="button"
        onClick={() => {
          toggleLanguage();
          onLanguageChange?.(isEn ? 'FA' : 'EN');
        }}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all duration-200 shadow-sm ${
          isEn
            ? 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'
            : 'bg-primary/10 hover:bg-primary/20 text-primary-dark dark:text-secondary border-primary/30'
        } ${className}`}
        aria-label={`Current language: ${currentLang.nativeName}. Click to toggle English and Persian`}
        title="Toggle English / فارسی"
      >
        <Globe className="w-3.5 h-3.5 text-primary dark:text-secondary" />
        <span className="font-mono">{isEn ? 'EN' : 'FA'}</span>
        <span className="text-[10px] opacity-60">⇄</span>
        <span className="text-[11px] font-sans">{isEn ? 'فارسی' : 'English'}</span>
      </button>
    );
  }

  // Segmented variant (used in mobile drawer or settings)
  if (variant === 'segmented') {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-primary dark:text-secondary" />
            {isRtl ? 'تغییر زبان سامانه' : 'Platform Language'}
          </span>
          <span className="text-[10px] font-mono text-primary dark:text-secondary font-bold">
            {currentLang.nativeName} ({currentLang.code})
          </span>
        </div>
        <div className="grid grid-cols-5 gap-1.5" role="radiogroup" aria-label="Language selection">
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
                <span className="leading-tight text-[11px]">{langItem.nativeName}</span>
                <span className="text-[9px] opacity-75 font-mono mt-0.5">{langItem.code}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Default Header variant (Clean dropdown button + 1-click toggle shortcut)
  return (
    <div ref={containerRef} className={`relative inline-flex items-center gap-1 ${className}`}>
      {/* 1-Click Fast Toggle (EN <-> FA) */}
      <button
        type="button"
        onClick={() => {
          toggleLanguage();
          onLanguageChange?.(language === 'EN' ? 'FA' : 'EN');
        }}
        className="hidden md:inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-mono font-semibold text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-secondary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        title="Quick Toggle EN / FA"
        aria-label="Quick toggle English and Persian"
      >
        <span className={language === 'EN' ? 'font-bold text-primary dark:text-secondary' : 'opacity-60'}>EN</span>
        <span className="opacity-40">/</span>
        <span className={language === 'FA' ? 'font-bold text-primary dark:text-secondary' : 'opacity-60'}>فا</span>
      </button>

      {/* Main Dropdown Button */}
      <button
        id="header-language-switcher-btn"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
        aria-label={`Language selector: current is ${currentLang.nativeName}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-primary dark:text-secondary flex-shrink-0" />
        <span className="font-mono tracking-tight">{currentLang.code}</span>
        <span className="hidden xl:inline text-[11px] font-normal opacity-70">
          ({currentLang.nativeName})
        </span>
        <ChevronDown
          className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-primary dark:text-secondary' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`absolute top-full mt-2 w-52 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-1.5 border border-slate-200 dark:border-slate-800 z-50 ring-1 ring-black/5 ${
              isRtl ? 'left-0' : 'right-0'
            }`}
            role="listbox"
            aria-label="Supported languages"
          >
            <div className="px-3 py-1.5 mb-1 border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {isRtl ? 'انتخاب زبان سامانه' : 'Select Language'}
            </div>

            {SUPPORTED_LANGUAGES.map((langItem) => {
              const isSelected = language === langItem.code;
              return (
                <button
                  key={langItem.code}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelectLanguage(langItem.code)}
                  className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-primary/10 dark:bg-secondary/15 text-primary dark:text-secondary font-bold shadow-xs'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm">{langItem.flag}</span>
                    <div className="text-start">
                      <div className="font-semibold text-slate-900 dark:text-slate-100">{langItem.nativeName}</div>
                      <div className="text-[10px] text-slate-400">{langItem.label}</div>
                    </div>
                  </div>
                  {isSelected ? (
                    <Check className="w-4 h-4 text-primary dark:text-secondary flex-shrink-0" />
                  ) : (
                    <span className="text-[10px] font-mono text-slate-400 uppercase">{langItem.code}</span>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
