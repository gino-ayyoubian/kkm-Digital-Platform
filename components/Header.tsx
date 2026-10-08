import * as React from 'react';
import { Page } from '../types';
import { NAV_LINKS } from '../constants';
import { useLanguage } from '../LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../ThemeContext';
import { PWAInstallButton } from './PWAInstallButton';
import KKMLogo from './KKMLogo';
import LanguageSwitcher from './LanguageSwitcher';
import { MobileNavigationDrawer } from './MobileNavigationDrawer';
import { KKMAlgorithmicAdvisorModal } from './KKMAlgorithmicAdvisorModal';
import { HeaderFluidAnimation } from './HeaderFluidAnimation';
import { useUnifiedNavigation } from '../hooks/useUnifiedNavigation';
import {
  Search, Sun, Moon, Menu, X, ChevronDown,
  User, StickyNote, Bot
} from 'lucide-react';

interface HeaderProps {
  currentPage: Page;
  setPage: (page: Page) => void;
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setPage, onSearch }) => {
  const { direction, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const headerRef = React.useRef<HTMLElement>(null);
  const isRtl = direction === 'rtl';

  // Unified Navigation State Hook
  const {
    isDrawerOpen,
    closeDrawer,
    toggleDrawer,
    openMobileSubMenu,
    toggleMobileSubMenu,

    activeDropdown,
    handleDesktopMenuEnter,
    handleDesktopMenuLeave,
    toggleDesktopDropdown,
    desktopNavRef,

    isSearchOpen,
    toggleSearch,
    searchQuery,
    setSearchQuery,
    mobileSearchQuery,
    setMobileSearchQuery,
    handleSearchSubmit,
    searchInputRef,

    isAdvisorOpen,
    setIsAdvisorOpen,

    isScrolled,
  } = useUnifiedNavigation({
    currentPage,
    onSearch,
  });

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-40 w-full transition-all duration-300 relative overflow-hidden ${
          isScrolled || isSearchOpen
            ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md py-1 border-b border-gray-200 dark:border-slate-800'
            : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm py-2 border-b border-gray-100 dark:border-slate-800/60'
        }`}
        role="banner"
      >
        {/* Subtle Fluid Motion Animation Stream */}
        <HeaderFluidAnimation opacity={isScrolled ? 0.35 : 0.6} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* ========================================================= */}
          {/* RESPONSIVE GRID SYSTEM: Desktop Dropdowns <-> Mobile Drawer */}
          {/* ========================================================= */}
          <div className="grid grid-cols-[auto_1fr_auto] items-center h-16 sm:h-20 gap-3 sm:gap-6">
            
            {/* GRID COLUMN 1: Brand Logo & Identifier */}
            <div className="flex items-center justify-start min-w-0">
              <button
                id="header-logo-btn"
                onClick={() => setPage(Page.Home)}
                className="block logo-container focus:outline-none rounded-xl focus-visible:ring-2 focus-visible:ring-primary p-1 -m-1 transition-transform active:scale-95"
                aria-label={t('AriaLabel_GoHome')}
              >
                <KKMLogo variant="full" size="md" />
              </button>
            </div>

            {/* GRID COLUMN 2: Desktop Navigation Bar with Dropdowns (xl:flex, hidden below xl) */}
            <div className="hidden xl:flex items-center justify-center min-w-0 px-2">
              <nav
                ref={desktopNavRef}
                className="flex items-center space-x-1 rtl:space-x-reverse"
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
                          onClick={() => toggleDesktopDropdown(link.name)}
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

                        {/* Desktop Dropdown Card with Smooth Entrance */}
                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 8, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 6, scale: 0.98 }}
                              transition={{ duration: 0.16, ease: 'easeOut' }}
                              className={`absolute top-full pt-2 z-50 w-64 ${
                                isRtl ? 'right-0' : 'left-0'
                              }`}
                            >
                              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-2 border border-slate-200 dark:border-slate-800 backdrop-blur-xl ring-1 ring-black/5 space-y-1">
                                {link.subLinks!.map((subLink) => {
                                  const isSubItemActive = subLink.page === currentPage;
                                  return (
                                    <button
                                      key={subLink.id}
                                      type="button"
                                      onClick={() => {
                                        setPage(subLink.page || link.name);
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
            </div>

            {/* Spacer for Viewports below XL to balance the grid layout */}
            <div className="xl:hidden" />

            {/* GRID COLUMN 3: Utility Controls & Mobile Hamburger Trigger */}
            <div className="flex items-center justify-end gap-1 sm:gap-2 shrink-0">
              <PWAInstallButton />

              {/* Search Toggle Button */}
              <button
                id="header-search-toggle-btn"
                type="button"
                onClick={toggleSearch}
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

              {/* Google Keep Workspace Quick Access (hidden on small mobile to avoid header crowding) */}
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

              {/* KKM AI Algorithmic Advisor Trigger */}
              <button
                id="header-ai-advisor-btn"
                type="button"
                onClick={() => setIsAdvisorOpen(true)}
                className="p-2 sm:p-2.5 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-white dark:bg-secondary/15 dark:hover:bg-secondary dark:text-secondary dark:hover:text-slate-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary flex items-center gap-1.5 text-xs font-bold shadow-xs active:scale-95"
                aria-label={isRtl ? 'مشاور هوش مصنوعی و الگوریتمی KKM' : 'KKM AI Algorithmic Advisor'}
                title={isRtl ? 'مشاور هوش مصنوعی و الگوریتمی KKM' : 'KKM AI Algorithmic Advisor'}
              >
                <Bot className="w-4 h-4" />
                <span className="hidden md:inline font-mono">AI Advisor</span>
              </button>

              {/* Internal / Employee Portal Quick Access (hidden on small mobile to avoid header crowding) */}
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

              {/* Language Switcher Component */}
              <div className="flex items-center">
                <LanguageSwitcher variant="header" />
              </div>

              {/* Mobile & Tablet Hamburger Button (xl:hidden, 48x48px min touch target) */}
              <div className="xl:hidden">
                <button
                  id="mobile-menu-toggle-btn"
                  type="button"
                  onClick={toggleDrawer}
                  className="p-3 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary min-w-[48px] min-h-[48px] flex items-center justify-center"
                  aria-controls="mobile-navigation-drawer"
                  aria-expanded={isDrawerOpen}
                  aria-label={t('AriaLabel_MobileMenu')}
                >
                  <AnimatePresence mode="wait">
                    {isDrawerOpen ? (
                      <motion.div
                        key="close-icon"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                      >
                        <X className="w-6 h-6 text-primary dark:text-secondary" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu-icon"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.18 }}
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
                transition={{ duration: 0.22, ease: 'easeInOut' }}
                className="overflow-hidden pb-4 pt-1"
              >
                <form onSubmit={(e) => handleSearchSubmit(e, searchQuery)} className="relative max-w-3xl mx-auto">
                  <div className="relative flex items-center">
                    <Search className={`w-5 h-5 absolute ${isRtl ? 'right-4' : 'left-4'} text-slate-400 pointer-events-none`} />
                    <input
                      ref={searchInputRef}
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('SearchPlaceholder')}
                      className={`w-full py-3 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary text-slate-900 dark:text-slate-100 text-sm shadow-inner transition-all ${
                        isRtl ? 'pr-11 pl-24' : 'pl-11 pr-24'
                      }`}
                      aria-label={t('Search')}
                    />
                    <div className={`absolute ${isRtl ? 'left-2' : 'right-2'} flex items-center gap-1`}>
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery('')}
                          className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
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
      <MobileNavigationDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        currentPage={currentPage}
        onNavigate={setPage}
        searchQuery={mobileSearchQuery}
        onSearchQueryChange={setMobileSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        openSubMenu={openMobileSubMenu}
        onToggleSubMenu={toggleMobileSubMenu}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
      />

      {/* Embedded KKM Enterprise AI Algorithmic Advisor Modal */}
      <KKMAlgorithmicAdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
      />
    </>
  );
};

export default Header;
