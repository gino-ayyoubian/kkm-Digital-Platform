import React, { useRef, useEffect } from 'react';
import { Page } from '../types';
import { NAV_LINKS } from '../constants';
import { useLanguage } from '../LanguageContext';
import { useTheme } from '../ThemeContext';
import { motion, AnimatePresence } from 'motion/react';
import type { Variants } from 'motion/react';
import LanguageSwitcher from './LanguageSwitcher';
import {
  Search, X, ChevronDown, Check, User, ArrowRight,
  Building2, StickyNote, Bot, Moon, Sun, Sparkles
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface MobileNavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent, queryText: string) => void;
  openSubMenu: string | null;
  onToggleSubMenu: (name: string) => void;
  onOpenAdvisor: () => void;
}

export const MobileNavigationDrawer: React.FC<MobileNavigationDrawerProps> = ({
  isOpen,
  onClose,
  currentPage,
  onNavigate,
  searchQuery,
  onSearchQueryChange,
  onSearchSubmit,
  openSubMenu,
  onToggleSubMenu,
  onOpenAdvisor,
}) => {
  const { direction, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isRtl = direction === 'rtl';

  // Focus search input when drawer opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Framer Motion Animation Variants
  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } },
    exit: { opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
  };

  const sheetVariants: Variants = {
    hidden: {
      x: isRtl ? '-100%' : '100%',
      opacity: 0.85,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 30,
        stiffness: 300,
        mass: 0.85,
      },
    },
    exit: {
      x: isRtl ? '-100%' : '100%',
      opacity: 0.85,
      transition: {
        duration: 0.22,
        ease: 'easeInOut',
      },
    },
  };

  const listContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.06,
      },
    },
  };

  const listItemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: 'easeOut' },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="mobile-navigation-drawer"
          className="fixed inset-0 z-50 xl:hidden flex"
          role="dialog"
          aria-modal="true"
          aria-label={t('AriaLabel_MobileMenu')}
        >
          {/* Subtle Backdrop Blur & Fade Overlay */}
          <motion.div
            key="drawer-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/65 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          {/* Slide-over Drawer Sheet */}
          <motion.div
            key="drawer-sheet"
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`relative z-10 w-full max-w-sm sm:max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col border-s border-slate-200 dark:border-slate-800 ${
              isRtl ? 'me-auto' : 'ms-auto'
            }`}
          >
            {/* Drawer Top Header Bar */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-850/80 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-primary dark:bg-secondary animate-pulse" />
                <span className="text-xs font-mono font-bold tracking-wider text-primary-dark dark:text-secondary uppercase">
                  KKM NAVIGATION
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 font-mono text-slate-600 dark:text-slate-300 font-bold">
                  EAOS v3.2
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-3 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary min-w-[48px] min-h-[48px] flex items-center justify-center"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Container */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-4 no-scrollbar overscroll-contain">
              
              {/* Real-time Filter & Search Input */}
              <form onSubmit={(e) => onSearchSubmit(e, searchQuery)} className="relative">
                <div className="relative flex items-center">
                  <Search className={`w-4 h-4 absolute ${isRtl ? 'right-3.5' : 'left-3.5'} text-slate-400 pointer-events-none`} />
                  <input
                    ref={searchInputRef}
                    type="search"
                    value={searchQuery}
                    onChange={(e) => onSearchQueryChange(e.target.value)}
                    placeholder={t('SearchPlaceholder')}
                    className={`w-full py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary min-h-[48px] ${
                      isRtl ? 'pr-10 pl-24' : 'pl-10 pr-24'
                    }`}
                  />
                  <div className={`absolute ${isRtl ? 'left-1.5' : 'right-1.5'} flex items-center gap-1`}>
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => onSearchQueryChange('')}
                        className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 min-h-[48px] min-w-[36px] flex items-center justify-center"
                        title={isRtl ? 'پاک کردن' : 'Clear search'}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-dark transition-all active:scale-95 shadow-xs min-h-[40px] flex items-center justify-center"
                    >
                      {t('Search')}
                    </button>
                  </div>
                </div>
              </form>

              {/* Language Switcher Segmented Bar */}
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <LanguageSwitcher
                  variant="segmented"
                  onLanguageChange={() => onClose()}
                />
              </div>

              {/* Main Navigation Accordions & Links (Uniform 48x48px Touch Targets & Generous Vertical Spacing) */}
              <motion.nav
                variants={listContainerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-2.5"
                aria-label="Mobile Navigation Hierarchy"
              >
                {NAV_LINKS.map((link) => {
                  const hasSub = Boolean(link.subLinks && link.subLinks.length > 0);
                  const isCurrent = currentPage === link.name;
                  const isSubActive = hasSub && link.subLinks!.some(sub => sub.page === currentPage);
                  const isActive = isCurrent || isSubActive;
                  const isOpen = openSubMenu === link.name || (openSubMenu === null && isActive);

                  if (hasSub) {
                    return (
                      <motion.div
                        key={link.name}
                        variants={listItemVariants}
                        className={`rounded-2xl border transition-colors overflow-hidden ${
                          isActive
                            ? 'border-primary/40 dark:border-secondary/40 bg-primary/5 dark:bg-secondary/5'
                            : 'border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40'
                        }`}
                      >
                        {/* Accordion Category Trigger Button (min-h-[52px]) */}
                        <button
                          type="button"
                          onClick={() => onToggleSubMenu(link.name)}
                          className={`flex items-center justify-between w-full px-4 py-3.5 text-start font-semibold text-sm transition-all duration-150 ease-out min-h-[52px] active:scale-[0.99] ${
                            isActive
                              ? 'text-primary dark:text-secondary font-bold'
                              : 'text-slate-800 dark:text-slate-100 hover:bg-slate-100/80 dark:hover:bg-slate-800/80'
                          }`}
                          aria-expanded={isOpen}
                        >
                          <span className="flex items-center gap-2">
                            <span>{t(link.name)}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold">
                              {link.subLinks!.length}
                            </span>
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isOpen ? 'rotate-180 text-primary dark:text-secondary' : 'text-slate-400'
                            }`}
                          />
                        </button>

                        {/* Collapsible Vertical Sub-Items with Clear Active Padding */}
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22, ease: 'easeInOut' }}
                              className="border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/90 px-3 py-2.5 space-y-2"
                            >
                              {link.subLinks!.map((subLink) => {
                                const isSubItemActive = subLink.page === currentPage;
                                return (
                                  <button
                                    key={subLink.id}
                                    type="button"
                                    onClick={() => {
                                      onNavigate(subLink.page || link.name);
                                      onClose();
                                    }}
                                    className={`flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-xs sm:text-sm font-medium text-start transition-all duration-150 ease-out min-h-[48px] active:scale-[0.98] border ${
                                      isSubItemActive
                                        ? 'bg-primary/10 dark:bg-secondary/15 text-primary dark:text-secondary border-primary/30 dark:border-secondary/40 font-bold shadow-xs'
                                        : 'border-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-secondary'
                                    }`}
                                  >
                                    <span className="truncate">{t(subLink.name)}</span>
                                    {isSubItemActive && (
                                      <Check className="w-4 h-4 text-primary dark:text-secondary shrink-0" />
                                    )}
                                  </button>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  }

                  // Single Direct Navigation Link Button
                  return (
                    <motion.div key={link.name} variants={listItemVariants}>
                      <button
                        type="button"
                        onClick={() => {
                          onNavigate(link.name);
                          onClose();
                        }}
                        className={`flex items-center justify-between w-full px-4 py-3.5 rounded-2xl text-sm font-semibold text-start transition-all duration-150 ease-out min-h-[52px] active:scale-[0.98] border ${
                          isActive
                            ? 'bg-primary text-white shadow-md shadow-primary/25 border-primary font-bold'
                            : 'bg-slate-50/70 dark:bg-slate-800/40 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200/90 dark:border-slate-800'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <span>{t(link.name)}</span>
                        {isActive && <Check className="w-4 h-4 text-white" />}
                      </button>
                    </motion.div>
                  );
                })}
              </motion.nav>

              {/* Quick Enterprise Tools Cards (Uniform 48+px Touch-Targets & Clear Spacing) */}
              <div className="pt-3 space-y-2.5 border-t border-slate-200 dark:border-slate-800">
                {/* Internal Portal Button */}
                <button
                  type="button"
                  onClick={() => {
                    onNavigate(Page.InternalPortal);
                    onClose();
                  }}
                  className={`flex items-center justify-between w-full p-4 rounded-2xl border text-start transition-all duration-150 ease-out min-h-[56px] active:scale-[0.98] ${
                    currentPage === Page.InternalPortal
                      ? 'border-primary bg-primary/10 text-primary dark:text-secondary shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50 text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-secondary/15 flex items-center justify-center text-primary dark:text-secondary shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold">{t(Page.InternalPortal)}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {isRtl ? 'سامانه یکپارچه همکاران و اتوماسیون' : 'Employee & Executive Systems'}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 text-slate-400 shrink-0 ${isRtl ? 'rotate-180' : ''}`} />
                </button>

                {/* Google Keep Workspace Button */}
                <button
                  type="button"
                  onClick={() => {
                    onNavigate(Page.GoogleKeep);
                    onClose();
                  }}
                  className={`flex items-center justify-between w-full p-4 rounded-2xl border text-start transition-all duration-150 ease-out min-h-[56px] active:scale-[0.98] ${
                    currentPage === Page.GoogleKeep
                      ? 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-400 shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50 text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-500 shrink-0">
                      <StickyNote className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold">Google Keep Notes</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {isRtl ? 'یادداشت‌ها و چک‌لیست‌های متصل به ابری' : 'Cloud Sync Notes & Checklists'}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 text-slate-400 shrink-0 ${isRtl ? 'rotate-180' : ''}`} />
                </button>

                {/* Corporate Info & AI Advisor Action Buttons */}
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate(Page.CorporateInfo);
                      onClose();
                    }}
                    className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 min-h-[48px] border border-slate-200/80 dark:border-slate-700"
                  >
                    <Building2 className="w-4 h-4 text-primary dark:text-secondary shrink-0" />
                    <span className="truncate">{t('CorporateInformation')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onOpenAdvisor();
                      onClose();
                    }}
                    className="p-3.5 rounded-2xl bg-gradient-to-r from-primary to-primary-dark dark:from-secondary dark:to-primary text-white dark:text-slate-950 text-xs font-bold flex items-center justify-center gap-2 hover:shadow-md transition-all active:scale-95 shadow-sm min-h-[48px]"
                  >
                    <Bot className="w-4 h-4 shrink-0" />
                    <span className="truncate">{isRtl ? 'دستیار هوش مصنوعی' : 'AI Advisor'}</span>
                  </button>
                </div>

                {/* Mobile PWA Install Card */}
                <PWAInstallButton variant="drawer" className="mt-3" />
              </div>

            </div>

            {/* Drawer Bottom Bar: Theme switcher & Corporate Reg */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/90 flex items-center justify-between shrink-0">
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all active:scale-95 min-h-[48px] shadow-xs"
              >
                {theme === 'light' ? (
                  <>
                    <Moon className="w-4 h-4 text-slate-700" />
                    <span>{isRtl ? 'حالت تیره' : 'Dark Mode'}</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span>{isRtl ? 'حالت روشن' : 'Light Mode'}</span>
                  </>
                )}
              </button>

              <div className="text-[10px] text-end text-slate-400 font-mono">
                <div>Reg. No: 384054</div>
                <div>ID: 10320351200</div>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
