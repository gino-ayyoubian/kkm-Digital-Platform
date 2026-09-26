import * as React from 'react';
import { Page } from '../types';
import { NAV_LINKS } from '../constants';
import { useLanguage } from '../LanguageContext';
import type { Language } from '../LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../ThemeContext';
import { PWAInstallButton } from './PWAInstallButton';
import KKMLogo from './KKMLogo';
import { 
  Search, Sun, Moon, Globe, Menu, X, ChevronDown, 
  Check, User, ArrowRight, ShieldCheck, Sparkles, Building2, StickyNote
} from 'lucide-react';

interface HeaderProps {
  currentPage: Page;
  setPage: (page: Page) => void;
  onSearch: (query: string) => void;
}

interface LanguageOption {
  code: Language;
  label: string;
  nativeName: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'EN', label: 'English', nativeName: 'English' },
  { code: 'FA', label: 'Persian', nativeName: 'فارسی' },
  { code: 'AR', label: 'Arabic', nativeName: 'العربية' },
  { code: 'KU', label: 'Kurdish', nativeName: 'کوردی' },
  { code: 'RU', label: 'Russian', nativeName: 'Русский' }
];

const Header: React.FC<HeaderProps> = ({ currentPage, setPage, onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState<boolean>(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = React.useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const [openMobileSubMenu, setOpenMobileSubMenu] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [mobileSearchQuery, setMobileSearchQuery] = React.useState<string>('');
  const [isScrolled, setIsScrolled] = React.useState<boolean>(false);

  const headerRef = React.useRef<HTMLElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = React.useRef<HTMLInputElement>(null);
  const desktopNavRef = React.useRef<HTMLDivElement>(null);
  const langDropdownRef = React.useRef<HTMLDivElement>(null);
  const dropdownCloseTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const { language, setLanguage, direction, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const isRtl = direction === 'rtl';

  // Scroll detection for dynamic header styling
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Close menus on page change
  React.useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setIsLangDropdownOpen(false);
    setActiveDropdown(null);
    setOpenMobileSubMenu(null);
  }, [currentPage]);

  // Focus desktop search input when search bar opens
  React.useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isSearchOpen]);

  // Outside click listener for desktop submenus & language dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (desktopNavRef.current && !desktopNavRef.current.contains(target)) {
        setActiveDropdown(null);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(target)) {
        setIsLangDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setIsLangDropdownOpen(false);
        setIsSearchOpen(false);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent, queryText: string) => {
    e.preventDefault();
    if (queryText.trim()) {
      onSearch(queryText.trim());
      setIsSearchOpen(false);
      setIsMenuOpen(false);
      setSearchQuery('');
      setMobileSearchQuery('');
    }
  };

  const handleDesktopMenuEnter = (name: string) => {
    if (dropdownCloseTimeoutRef.current) {
      clearTimeout(dropdownCloseTimeoutRef.current);
    }
    setActiveDropdown(name);
  };

  const handleDesktopMenuLeave = () => {
    dropdownCloseTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const currentLangObj = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled || isSearchOpen
            ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md py-1 border-b border-gray-200 dark:border-slate-800'
            : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm py-2 border-b border-gray-100 dark:border-slate-800/60'
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
            
            {/* Brand Logo */}
            <div className="flex-shrink-0">
              <button
                id="header-logo-btn"
                onClick={() => setPage(Page.Home)}
                className="block logo-container focus:outline-none rounded-xl focus-visible:ring-2 focus-visible:ring-primary p-1 -m-1 transition-transform active:scale-95"
                aria-label={t('AriaLabel_GoHome')}
              >
                <KKMLogo variant="full" size="md" />
              </button>
            </div>

            {/* Desktop Navigation (XL screens and above for optimal spacing) */}
            <nav
              ref={desktopNavRef}
              className="hidden xl:flex items-center space-x-1 rtl:space-x-reverse"
              role="navigation"
              aria-label="Main Navigation"
            >
              {NAV_LINKS.map((link) => {
                const isCurrent = currentPage === link.name;
                const hasSub = Boolean(link.subLinks && link.subLinks.length > 0);
                const isSubActive = hasSub && link.subLinks!.some(sub => sub.page === currentPage);
                const isActive = isCurrent || isSubActive;
                const isDropdownOpen = activeDropdown === link.name;

                if (hasSub) {
                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={() => handleDesktopMenuEnter(link.name)}
                      onMouseLeave={handleDesktopMenuLeave}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveDropdown(isDropdownOpen ? null : link.name)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs 2xl:text-sm font-semibold transition-all duration-200 ${
                          isActive
                            ? 'text-primary dark:text-secondary bg-primary/10 dark:bg-secondary/10'
                            : 'text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-secondary hover:bg-slate-100 dark:hover:bg-slate-800/70'
                        }`}
                        aria-expanded={isDropdownOpen}
                        aria-haspopup="true"
                      >
                        <span>{t(link.name)}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            isDropdownOpen ? 'rotate-180 text-primary dark:text-secondary' : 'text-slate-400'
                          }`}
                        />
                      </button>

                      {/* Desktop Dropdown Card */}
                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.98 }}
                            transition={{ duration: 0.15, ease: 'easeOut' }}
                            className={`absolute top-full pt-2 z-50 w-64 ${
                              isRtl ? 'right-0' : 'left-0'
                            }`}
                          >
                            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-2 border border-slate-200 dark:border-slate-800 backdrop-blur-xl ring-1 ring-black/5">
                              {link.subLinks!.map((subLink) => {
                                const isSubItemActive = subLink.page === currentPage;
                                return (
                                  <button
                                    key={subLink.id}
                                    type="button"
                                    onClick={() => {
                                      setPage(subLink.page || link.name);
                                      setActiveDropdown(null);
                                    }}
                                    className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-xs 2xl:text-sm font-medium text-start transition-colors duration-150 ${
                                      isSubItemActive
                                        ? 'bg-primary/10 dark:bg-secondary/15 text-primary dark:text-secondary font-bold'
                                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:text-primary dark:hover:text-secondary'
                                    }`}
                                  >
                                    <span>{t(subLink.name)}</span>
                                    {isSubItemActive && (
                                      <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-secondary flex-shrink-0" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <button
                    key={link.name}
                    type="button"
                    onClick={() => setPage(link.name)}
                    className={`relative px-3 py-2 rounded-lg text-xs 2xl:text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'text-primary dark:text-secondary bg-primary/10 dark:bg-secondary/10'
                        : 'text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-secondary hover:bg-slate-100 dark:hover:bg-slate-800/70'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span>{t(link.name)}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Action Icons & Controls */}
            <div className="flex items-center gap-1 sm:gap-2">
              <PWAInstallButton />

              {/* Search Toggle Button */}
              <button
                id="header-search-toggle-btn"
                type="button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2 sm:p-2.5 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                  isSearchOpen
                    ? 'bg-primary/10 text-primary dark:bg-secondary/15 dark:text-secondary'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                aria-label={t('AriaLabel_SearchToggle')}
                aria-expanded={isSearchOpen}
                title={t('Search')}
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Dark / Light Theme Toggle */}
              <button
                id="header-theme-toggle-btn"
                type="button"
                onClick={toggleTheme}
                className="p-2 sm:p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label={t('AriaLabel_ThemeToggle')}
                title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 text-slate-700" />
                ) : (
                  <Sun className="w-5 h-5 text-amber-400" />
                )}
              </button>

              {/* Google Keep Workspace Quick Access */}
              <button
                id="header-keep-btn"
                type="button"
                onClick={() => setPage(Page.GoogleKeep)}
                className={`p-2 sm:p-2.5 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 hidden sm:inline-flex ${
                  currentPage === Page.GoogleKeep
                    ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 ring-1 ring-amber-400/50'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                aria-label="Google Keep Workspace"
                title="Google Keep Workspace"
              >
                <StickyNote className="w-5 h-5 text-amber-500" />
              </button>

              {/* Internal / Employee Portal Quick Access */}
              <button
                id="header-portal-btn"
                type="button"
                onClick={() => setPage(Page.InternalPortal)}
                className="p-2 sm:p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary hidden sm:inline-flex"
                aria-label={t(Page.InternalPortal)}
                title={t(Page.InternalPortal)}
              >
                <User className="w-5 h-5" />
              </button>

              {/* Desktop Language Selector Dropdown */}
              <div ref={langDropdownRef} className="relative hidden sm:block">
                <button
                  id="header-language-btn"
                  type="button"
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Select Language"
                  aria-expanded={isLangDropdownOpen}
                >
                  <Globe className="w-3.5 h-3.5 text-primary dark:text-secondary" />
                  <span>{currentLangObj.code}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                <AnimatePresence>
                  {isLangDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className={`absolute top-full mt-2 w-44 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-1.5 border border-slate-200 dark:border-slate-800 z-50 ${
                        isRtl ? 'left-0' : 'right-0'
                      }`}
                    >
                      {LANGUAGES.map((langItem) => {
                        const isSelected = language === langItem.code;
                        return (
                          <button
                            key={langItem.code}
                            type="button"
                            onClick={() => {
                              setLanguage(langItem.code);
                              setIsLangDropdownOpen(false);
                            }}
                            className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                              isSelected
                                ? 'bg-primary/10 dark:bg-secondary/15 text-primary dark:text-secondary font-bold'
                                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{langItem.nativeName}</span>
                              <span className="text-[10px] text-slate-400 uppercase">({langItem.code})</span>
                            </div>
                            {isSelected && <Check className="w-3.5 h-3.5 text-primary dark:text-secondary" />}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile & Tablet Hamburger Button */}
              <div className="xl:hidden">
                <button
                  id="mobile-menu-toggle-btn"
                  type="button"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 sm:p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-controls="mobile-navigation-drawer"
                  aria-expanded={isMenuOpen}
                  aria-label={t('AriaLabel_MobileMenu')}
                >
                  <AnimatePresence mode="wait">
                    {isMenuOpen ? (
                      <motion.div
                        key="close-icon"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="w-6 h-6 text-primary dark:text-secondary" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu-icon"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="w-6 h-6" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>

            </div>
          </div>

          {/* Desktop Search Expandable Bar */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="overflow-hidden pb-4 pt-1"
              >
                <form onSubmit={(e) => handleSearchSubmit(e, searchQuery)} className="relative max-w-3xl mx-auto">
                  <div className="relative flex items-center">
                    <Search className="w-5 h-5 absolute start-4 text-slate-400 pointer-events-none" />
                    <input
                      ref={searchInputRef}
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('SearchPlaceholder')}
                      className="w-full ps-11 pe-24 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary text-slate-900 dark:text-slate-100 text-sm shadow-inner transition-all"
                      aria-label={t('Search')}
                    />
                    <div className="absolute end-2 flex items-center gap-1">
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery('')}
                          className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-primary text-white hover:bg-primary-dark font-bold text-xs rounded-xl transition-colors shadow-sm"
                      >
                        {t('Search')}
                      </button>
                    </div>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* ========================================================= */}
      {/* MOBILE & TABLET NAVIGATION DRAWER (Slide-over Full Panel) */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isMenuOpen && (
          <div
            id="mobile-navigation-drawer"
            className="fixed inset-0 z-50 xl:hidden flex"
            role="dialog"
            aria-modal="true"
            aria-label={t('AriaLabel_MobileMenu')}
          >
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm cursor-pointer"
            />

            {/* Slide-over Drawer Sheet */}
            <motion.div
              initial={{ x: isRtl ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className={`relative z-10 w-full max-w-sm sm:max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col border-s border-slate-200 dark:border-slate-800 ${
                isRtl ? 'me-auto' : 'ms-auto'
              }`}
            >
              {/* Drawer Top Bar */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-mono font-bold tracking-wider text-primary-dark dark:text-secondary uppercase">
                    KKM NAVIGATION
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Scrollable Content Body */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 no-scrollbar overscroll-contain">
                
                {/* Mobile Search Bar inside Drawer */}
                <form onSubmit={(e) => handleSearchSubmit(e, mobileSearchQuery)} className="relative">
                  <div className="relative flex items-center">
                    <Search className="w-4 h-4 absolute start-3 text-slate-400" />
                    <input
                      ref={mobileSearchInputRef}
                      type="search"
                      value={mobileSearchQuery}
                      onChange={(e) => setMobileSearchQuery(e.target.value)}
                      placeholder={t('SearchPlaceholder')}
                      className="w-full ps-9 pe-16 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      type="submit"
                      className="absolute end-1.5 px-3 py-1 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      {t('Search')}
                    </button>
                  </div>
                </form>

                {/* Dedicated Mobile Language Switcher Segmented Bar */}
                <div className="p-2 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-2 px-1">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-primary dark:text-secondary" />
                      {isRtl ? 'زبان سامانه' : 'Platform Language'}
                    </span>
                    <span className="text-[10px] font-mono text-primary dark:text-secondary font-bold">
                      {currentLangObj.nativeName}
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-1">
                    {LANGUAGES.map((langItem) => {
                      const isCurrent = language === langItem.code;
                      return (
                        <button
                          key={langItem.code}
                          type="button"
                          onClick={() => setLanguage(langItem.code)}
                          className={`py-2 px-1 rounded-xl text-xs font-bold transition-all text-center min-h-[48px] flex flex-col items-center justify-center ${
                            isCurrent
                              ? 'bg-primary text-white shadow-md shadow-primary/30 scale-[1.02]'
                              : 'bg-white dark:bg-slate-700/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                          }`}
                        >
                          <span className="leading-none">{langItem.nativeName}</span>
                          <span className="text-[9px] opacity-75 font-mono mt-0.5">{langItem.code}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Primary Navigation List (Accordions) */}
                <nav className="space-y-1.5" aria-label="Mobile Navigation Links">
                  {NAV_LINKS.map((link) => {
                    const hasSub = Boolean(link.subLinks && link.subLinks.length > 0);
                    const isCurrent = currentPage === link.name;
                    const isSubActive = hasSub && link.subLinks!.some(sub => sub.page === currentPage);
                    const isActive = isCurrent || isSubActive;
                    const isOpen = openMobileSubMenu === link.name || (openMobileSubMenu === null && isActive);

                    if (hasSub) {
                      return (
                        <div
                          key={link.name}
                          className="rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden bg-slate-50/50 dark:bg-slate-800/30"
                        >
                          <button
                            type="button"
                            onClick={() => setOpenMobileSubMenu(isOpen ? '' : link.name)}
                            className={`flex items-center justify-between w-full px-4 py-3.5 text-start font-semibold text-sm transition-colors min-h-[48px] ${
                              isActive
                                ? 'text-primary dark:text-secondary bg-primary/10 dark:bg-secondary/10'
                                : 'text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                            aria-expanded={isOpen}
                          >
                            <span className="flex items-center gap-2">
                              <span>{t(link.name)}</span>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                                {link.subLinks!.length}
                              </span>
                            </span>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                isOpen ? 'rotate-180 text-primary dark:text-secondary' : 'text-slate-400'
                              }`}
                            />
                          </button>

                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 px-2 py-1.5 space-y-1"
                              >
                                {link.subLinks!.map((subLink) => {
                                  const isSubItemActive = subLink.page === currentPage;
                                  return (
                                    <button
                                      key={subLink.id}
                                      type="button"
                                      onClick={() => {
                                        setPage(subLink.page || link.name);
                                        setIsMenuOpen(false);
                                      }}
                                      className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-xs font-medium text-start transition-colors min-h-[44px] ${
                                        isSubItemActive
                                          ? 'bg-primary/10 dark:bg-secondary/15 text-primary dark:text-secondary font-bold'
                                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-secondary'
                                      }`}
                                    >
                                      <span>{t(subLink.name)}</span>
                                      {isSubItemActive && (
                                        <Check className="w-3.5 h-3.5 text-primary dark:text-secondary flex-shrink-0" />
                                      )}
                                    </button>
                                  );
                                })}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    return (
                      <button
                        key={link.name}
                        type="button"
                        onClick={() => {
                          setPage(link.name);
                          setIsMenuOpen(false);
                        }}
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-2xl text-sm font-semibold text-start transition-all min-h-[48px] ${
                          isActive
                            ? 'bg-primary text-white shadow-md shadow-primary/20'
                            : 'bg-slate-50/50 dark:bg-slate-800/30 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <span>{t(link.name)}</span>
                        {isActive && <Check className="w-4 h-4 text-white" />}
                      </button>
                    );
                  })}
                </nav>

                {/* Quick Portals & Tools Cards */}
                <div className="pt-2 space-y-2 border-t border-slate-200 dark:border-slate-800">
                  {/* Internal Portal Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setPage(Page.InternalPortal);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center justify-between w-full p-3.5 rounded-2xl border text-start transition-all ${
                      currentPage === Page.InternalPortal
                        ? 'border-primary bg-primary/10 text-primary dark:text-secondary'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 dark:bg-secondary/15 flex items-center justify-center text-primary dark:text-secondary">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold">{t(Page.InternalPortal)}</div>
                        <div className="text-[11px] text-slate-400">
                          {isRtl ? 'سامانه یکپارچه همکاران و اتوماسیون' : 'Employee & Executive Systems'}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 text-slate-400 ${isRtl ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Google Keep Workspace Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setPage(Page.GoogleKeep);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center justify-between w-full p-3.5 rounded-2xl border text-start transition-all ${
                      currentPage === Page.GoogleKeep
                        ? 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-400'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-500">
                        <StickyNote className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold">Google Keep Notes</div>
                        <div className="text-[11px] text-slate-400">
                          {isRtl ? 'یادداشت‌ها و چک‌لیست‌های متصل به ابری' : 'Cloud Sync Notes & Checklists'}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 text-slate-400 ${isRtl ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Corporate Info & Contact CTA */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setPage(Page.CorporateInfo);
                        setIsMenuOpen(false);
                      }}
                      className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors min-h-[48px]"
                    >
                      <Building2 className="w-4 h-4 text-primary dark:text-secondary" />
                      <span>{t('CorporateInformation')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPage(Page.Contact);
                        setIsMenuOpen(false);
                      }}
                      className="p-3 rounded-2xl bg-primary text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors shadow-md shadow-primary/25 min-h-[48px]"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{t(Page.Contact)}</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Drawer Bottom Bar: Theme switcher & Corporate Reg */}
              <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/90 flex items-center justify-between">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 min-h-[48px]"
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
    </>
  );
};

export default Header;
