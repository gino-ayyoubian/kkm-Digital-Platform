import * as React from 'react';
import { Page } from '../types';
import { NAV_LINKS } from '../constants';
import { useLanguage } from '../LanguageContext';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { useTheme } from '../ThemeContext';
import { PWAInstallButton } from './PWAInstallButton';
import KKMLogo from './KKMLogo';
import LanguageSwitcher from './LanguageSwitcher';
import { MobileNavigationDrawer } from './MobileNavigationDrawer';
import { KKMAlgorithmicAdvisorModal } from './KKMAlgorithmicAdvisorModal';
import { HeaderFluidAnimation } from './HeaderFluidAnimation';
import { useUnifiedNavigation } from '../hooks/useUnifiedNavigation';
import { useAuth } from '../AuthContext';
import {
  Sun, Moon, Menu, X, ChevronDown,
  User, Bot, Lock, ShieldCheck, MoreHorizontal
} from 'lucide-react';

interface HeaderProps {
  currentPage: Page;
  setPage: (page: Page) => void;
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setPage, onSearch }) => {
  const { direction, t, isFa } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { userProfile, currentUser } = useAuth();
  const headerRef = React.useRef<HTMLElement>(null);
  const isRtl = direction === 'rtl';

  // Framer Motion useScroll hook for soft contraction & shadow appearance
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = React.useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const isPastThreshold = latest > 15;
    if (isPastThreshold !== hasScrolled) {
      setHasScrolled(isPastThreshold);
    }
  });

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

    mobileSearchQuery,
    setMobileSearchQuery,
    handleSearchSubmit,

    isAdvisorOpen,
    setIsAdvisorOpen,

    isScrolled,
  } = useUnifiedNavigation({
    currentPage,
    onSearch,
  });

  // Effective scroll state combining Framer Motion listener and unified navigation
  const activeScrolled = hasScrolled || isScrolled;

  // Adaptive Condensed Navigation: 6 core primary links + auto-collapsing "More" overflow menu
  const primaryNavLinks = React.useMemo(() => {
    const PRIMARY_NAV_PAGES: Page[] = [
      Page.Home,
      Page.AboutUs,
      Page.Technology,
      Page.Ecosystems,
      Page.Projects,
      Page.Insights,
    ];
    return NAV_LINKS.filter((link) => PRIMARY_NAV_PAGES.includes(link.name));
  }, []);

  const overflowNavLinks = React.useMemo(() => {
    const PRIMARY_NAV_PAGES: Page[] = [
      Page.Home,
      Page.AboutUs,
      Page.Technology,
      Page.Ecosystems,
      Page.Projects,
      Page.Insights,
    ];
    return NAV_LINKS.filter((link) => !PRIMARY_NAV_PAGES.includes(link.name));
  }, []);

  const isOverflowActive = React.useMemo(() => {
    return overflowNavLinks.some((link) => {
      if (currentPage === link.name) return true;
      return Boolean(link.subLinks?.some((sub) => sub.page === currentPage));
    });
  }, [overflowNavLinks, currentPage]);

  return (
    <>
      <motion.header
        ref={headerRef}
        animate={{
          y: 0,
          backgroundColor: theme === 'dark'
            ? (activeScrolled ? 'rgba(15, 23, 42, 0.96)' : 'rgba(15, 23, 42, 0.88)')
            : (activeScrolled ? 'rgba(255, 255, 255, 0.96)' : 'rgba(255, 255, 255, 0.88)'),
          boxShadow: activeScrolled
            ? (theme === 'dark'
                ? '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.3)'
                : '0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)')
            : '0 0px 0px 0px rgba(0, 0, 0, 0)',
          borderBottomColor: theme === 'dark'
            ? (activeScrolled ? 'rgba(51, 65, 85, 0.8)' : 'rgba(51, 65, 85, 0.4)')
            : (activeScrolled ? 'rgba(226, 232, 240, 0.9)' : 'rgba(241, 245, 249, 0.6)'),
        }}
        transition={{
          duration: 0.25,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="sticky top-0 z-50 w-full backdrop-blur-md border-b relative"
        role="banner"
      >
        {/* Subtle Fluid Motion Animation Stream */}
        <HeaderFluidAnimation opacity={activeScrolled ? 0.35 : 0.6} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* ========================================================= */}
          {/* RESPONSIVE FLEX SYSTEM: Non-overlapping Header Container   */}
          {/* ========================================================= */}
          <motion.div 
            animate={{
              height: activeScrolled ? 62 : 76,
            }}
            transition={{
              duration: 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex items-center justify-between gap-2 sm:gap-4 w-full"
          >
            
            {/* BRAND LOGO & IDENTIFIER */}
            <div className="flex items-center justify-start shrink-0">
              <button
                id="header-logo-btn"
                onClick={() => setPage(Page.Home)}
                className="block logo-container focus:outline-none rounded-xl focus-visible:ring-2 focus-visible:ring-primary p-1 -m-1 transition-transform active:scale-95"
                aria-label={t('AriaLabel_GoHome')}
              >
                <KKMLogo variant="full" size="md" />
              </button>
            </div>

            {/* DESKTOP NAVIGATION BAR (lg:flex, hidden below lg) */}
            <div className="hidden lg:flex items-center justify-center flex-1 min-w-0 px-2 max-w-4xl mx-auto">
              <nav
                ref={desktopNavRef}
                className="flex items-center space-x-0.5 2xl:space-x-1 rtl:space-x-reverse"
                role="navigation"
                aria-label="Main Navigation"
              >
                {primaryNavLinks.map((link) => {
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
                          className={`flex items-center gap-1 px-2.5 2xl:px-3 py-2 rounded-lg text-xs 2xl:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                            isActive
                              ? 'text-primary dark:text-secondary bg-primary/10 dark:bg-secondary/10 font-bold'
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
                      className={`relative px-2.5 2xl:px-3 py-2 rounded-lg text-xs 2xl:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                        isActive
                          ? 'text-primary dark:text-secondary bg-primary/10 dark:bg-secondary/10 font-bold'
                          : 'text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-secondary hover:bg-slate-100 dark:hover:bg-slate-800/70'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span>{t(link.name)}</span>
                    </button>
                  );
                })}

                {/* ADAPTIVE OVERFLOW "MORE" MENU DROPDOWN */}
                <div
                  className="relative"
                  onMouseEnter={() => handleDesktopMenuEnter('more-overflow-menu')}
                  onMouseLeave={handleDesktopMenuLeave}
                >
                  <button
                    type="button"
                    onClick={() => toggleDesktopDropdown('more-overflow-menu')}
                    className={`flex items-center gap-1 px-2.5 2xl:px-3 py-2 rounded-lg text-xs 2xl:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                      isOverflowActive
                        ? 'text-primary dark:text-secondary bg-primary/10 dark:bg-secondary/10 font-bold'
                        : 'text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-secondary hover:bg-slate-100 dark:hover:bg-slate-800/70'
                    }`}
                    aria-expanded={activeDropdown === 'more-overflow-menu'}
                    aria-haspopup="true"
                    aria-label={isFa ? 'سایر بخش‌ها' : 'More Navigation'}
                  >
                    <MoreHorizontal className="w-4 h-4" />
                    <span>{isFa ? 'سایر بخش‌ها' : 'More'}</span>
                    {isOverflowActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-secondary" />
                    )}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        activeDropdown === 'more-overflow-menu' ? 'rotate-180 text-primary dark:text-secondary' : 'text-slate-400'
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === 'more-overflow-menu' && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.16, ease: 'easeOut' }}
                        className={`absolute top-full pt-2 z-50 w-72 ${
                          isRtl ? 'left-0' : 'right-0'
                        }`}
                      >
                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-2.5 border border-slate-200 dark:border-slate-800 backdrop-blur-xl ring-1 ring-black/5 divide-y divide-slate-100 dark:divide-slate-800/60 max-h-[75vh] overflow-y-auto">
                          {overflowNavLinks.map((link) => {
                            const isCurrent = currentPage === link.name;
                            const hasSub = Boolean(link.subLinks && link.subLinks.length > 0);
                            const isSubActive = hasSub && link.subLinks!.some(sub => sub.page === currentPage);
                            const isLinkActive = isCurrent || isSubActive;
                            return (
                              <div key={link.name} className="py-2 first:pt-0 last:pb-0">
                                <button
                                  type="button"
                                  onClick={() => setPage(link.name)}
                                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-bold text-start transition-colors ${
                                    isLinkActive
                                      ? 'text-primary dark:text-secondary bg-primary/10 dark:bg-secondary/10'
                                      : 'text-slate-900 dark:text-slate-100 hover:text-primary dark:hover:text-secondary'
                                  }`}
                                >
                                  <span>{t(link.name)}</span>
                                  {isLinkActive && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-secondary" />
                                  )}
                                </button>
                                {hasSub && (
                                  <div className="mt-1 ps-2 space-y-0.5">
                                    {link.subLinks!.map((subLink) => {
                                      const isSubItemActive = subLink.page === currentPage;
                                      return (
                                        <button
                                          key={subLink.id}
                                          type="button"
                                          onClick={() => setPage(subLink.page || link.name)}
                                          className={`flex items-center justify-between w-full px-2.5 py-1 rounded-md text-[11px] text-start transition-colors ${
                                            isSubItemActive
                                              ? 'bg-primary/15 dark:bg-secondary/20 text-primary dark:text-secondary font-semibold'
                                              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                                          }`}
                                        >
                                          <span className="truncate">{t(subLink.name)}</span>
                                          {isSubItemActive && (
                                            <span className="w-1 h-1 rounded-full bg-primary dark:bg-secondary shrink-0" />
                                          )}
                                        </button>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </nav>
            </div>

            {/* GRID COLUMN 3: Utility Controls & Mobile Hamburger Trigger */}
            <div className="flex items-center justify-end gap-1.5 sm:gap-2 shrink-0">
              <PWAInstallButton />

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

              {/* KKM AI Algorithmic Advisor Trigger */}
              <button
                id="header-ai-advisor-btn"
                type="button"
                onClick={() => setIsAdvisorOpen(true)}
                className="p-2 sm:p-2.5 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-white dark:bg-secondary/15 dark:hover:bg-secondary dark:text-secondary dark:hover:text-slate-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary hidden sm:inline-flex items-center gap-1.5 text-xs font-bold shadow-xs active:scale-95"
                aria-label={isRtl ? 'مشاور هوش مصنوعی و الگوریتمی KKM' : 'KKM AI Algorithmic Advisor'}
                title={isRtl ? 'مشاور هوش مصنوعی و الگوریتمی KKM' : 'KKM AI Algorithmic Advisor'}
              >
                <Bot className="w-4 h-4" />
                <span className="hidden xl:inline font-mono">AI Advisor</span>
              </button>

              {/* Internal / Employee Portal Quick Access */}
              <button
                id="header-portal-btn"
                type="button"
                onClick={() => setPage(Page.InternalPortal)}
                className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary hidden sm:inline-flex items-center gap-1.5 text-xs font-bold border ${
                  userProfile
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border-transparent'
                }`}
                aria-label={t(Page.InternalPortal)}
                title={userProfile ? (isFa ? `پرتال سازمانی (${userProfile.displayName})` : `Internal Portal (${userProfile.displayName})`) : (isFa ? 'ورود به پرتال داخلی سازمان' : 'Staff Portal Login')}
              >
                {userProfile ? (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span className="hidden xl:inline font-mono truncate max-w-[100px]">{userProfile.displayName}</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                    <span className="hidden xl:inline">{isFa ? 'پرتال داخلی' : 'Staff Portal'}</span>
                  </>
                )}
              </button>

              {/* Language Switcher Component (Clean Executive Multi-Language Dropdown Menu) */}
              <div className="flex items-center">
                <LanguageSwitcher variant="header" />
              </div>

              {/* Mobile & Tablet Hamburger Button (lg:hidden, 48x48px min touch target) */}
              <div className="lg:hidden">
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
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                      >
                        <Menu className="w-6 h-6" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      </motion.header>

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
