
import * as React from 'react';
import { Page } from '../types';
import { NAV_LINKS } from '../constants';
import { useLanguage } from '../LanguageContext';
import type { Language } from '../LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../ThemeContext';
import { PWAInstallButton } from './PWAInstallButton';

import KKMLogo from './KKMLogo';

interface HeaderProps {
  currentPage: Page;
  setPage: (page: Page) => void;
  onSearch: (query: string) => void;
}

const KkmLogo: React.FC = () => {
    return (
        <motion.div
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="cursor-pointer flex items-center group"
        >
            <motion.div
                variants={{
                    rest: { scale: 1 },
                    hover: { scale: 1.03 }
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="transition-transform duration-300"
            >
                <KKMLogo variant="full" size="md" />
            </motion.div>
        </motion.div>
    );
};

const Header: React.FC<HeaderProps> = ({ currentPage, setPage, onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState<boolean>(false);
  const [openMobileSubMenu, setOpenMobileSubMenu] = React.useState<Page | null>(null);
  const [hoveredLink, setHoveredLink] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [isScrolled, setIsScrolled] = React.useState<boolean>(false);
  
  const headerRef = React.useRef<HTMLElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
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
  
  React.useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setOpenMobileSubMenu(null);
  }, [currentPage]);
  
  React.useEffect(() => {
      if(isSearchOpen) {
          searchInputRef.current?.focus();
      }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };
  
  const handleMouseEnter = (linkName: string) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setHoveredLink(linkName);
  };

  const handleMouseLeave = () => {
      timeoutRef.current = setTimeout(() => {
          setHoveredLink(null);
      }, 150);
  };

  const mobileMenuVariants = {
    closed: { 
        height: 0, 
        opacity: 0,
        transition: {
            duration: 0.3,
            when: "afterChildren",
        }
    },
    open: { 
        height: 'auto', 
        opacity: 1,
        transition: {
            duration: 0.3,
            when: "beforeChildren",
            staggerChildren: 0.05
        }
    }
  };

  const mobileItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  const desktopDropdownVariants = {
      hidden: { opacity: 0, y: -5, height: 0, overflow: 'hidden' },
      visible: { opacity: 1, y: 0, height: 'auto', overflow: 'visible' },
      exit: { opacity: 0, y: -5, height: 0, overflow: 'hidden' }
  };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-40 w-full transition-all duration-300 ease-in-out ${
        isScrolled || isMenuOpen || isSearchOpen 
        ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg py-1 border-b border-gray-200 dark:border-slate-800' 
        : 'bg-transparent py-2'
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <button 
                onClick={() => setPage(Page.Home)} 
                className="block logo-container focus:outline-none rounded-lg focus-visible:ring-2 focus-visible:ring-accent-yellow" 
                aria-label={t('AriaLabel_GoHome')}
            >
              <KkmLogo />
            </button>
            <p className={`text-center text-[10px] sm:text-xs font-medium mt-1 hidden sm:block tracking-wide transition-colors ${isScrolled ? 'text-primary-dark dark:text-slate-300' : 'text-text-dark dark:text-slate-200'}`}>
                Technology. Engineering. Infrastructure. Innovation.
            </p>
          </div>

          <nav className="hidden lg:flex items-center space-x-1" role="navigation" aria-label={t('AriaLabel_MainNavigation')}>
            {NAV_LINKS.map(link => {
              const isActive = currentPage === link.name || (link.subLinks && link.subLinks.some(subLink => subLink.page === currentPage));
              
              if (link.subLinks && link.subLinks.length > 0) {
                return (
                  <div 
                    key={link.name} 
                    className="relative group h-full flex items-center"
                    onMouseEnter={() => handleMouseEnter(link.name)}
                    onMouseLeave={handleMouseLeave}
                    onFocus={() => handleMouseEnter(link.name)}
                    onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                            handleMouseLeave();
                        }
                    }}
                  >
                    <button
                      onClick={() => setPage(link.name)}
                      className={`relative flex items-center gap-1 transition-all duration-200 px-3 py-2 rounded-md text-sm font-medium z-10 ${ 
                        isActive 
                        ? 'text-white font-bold' 
                        : isScrolled ? 'text-text-dark dark:text-slate-200 hover:text-primary-dark dark:hover:text-secondary' : 'text-text-dark dark:text-slate-100 hover:text-primary-dark dark:hover:text-secondary'
                      }`}
                      aria-haspopup="true"
                      aria-expanded={hoveredLink === link.name}
                      aria-current={isActive ? 'page' : undefined}
                    >
                       {isActive && (
                        <motion.div
                            layoutId="navbar-active"
                            className="absolute inset-0 bg-primary-dark shadow-lg shadow-primary/30 rounded-md -z-10"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <span>{t(link.name)}</span>
                      <motion.svg 
                        animate={{ rotate: hoveredLink === link.name ? 180 : 0 }}
                        className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        aria-hidden="true"
                      >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </button>
                    <AnimatePresence>
                        {hoveredLink === link.name && (
                            <motion.div 
                                key="dropdown"
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={desktopDropdownVariants}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-20 w-64"
                            >
                                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl py-2 ring-1 ring-black ring-opacity-5 dark:ring-slate-700 overflow-hidden" role="menu">
                                    {link.subLinks.map(subLink => (
                                    <button
                                        key={subLink.id}
                                        onClick={() => {
                                            setPage(subLink.page || link.name);
                                            setHoveredLink(null);
                                        }}
                                        className="block px-4 py-3 text-sm text-text-dark dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 w-full text-start transition-colors duration-150 border-s-4 border-transparent hover:border-primary-dark focus:outline-none focus:bg-gray-100 dark:focus:bg-slate-700"
                                        role="menuitem"
                                    >
                                        {t(subLink.name)}
                                    </button>
                                    ))}
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
                  onClick={() => setPage(link.name)}
                  className={`relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 z-10 ${ 
                    isActive 
                    ? 'text-white font-bold' 
                    : isScrolled ? 'text-text-dark dark:text-slate-200 hover:text-primary-dark dark:hover:text-secondary' : 'text-text-dark dark:text-slate-100 hover:text-primary-dark dark:hover:text-secondary'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                    {isActive && (
                        <motion.div
                            layoutId="navbar-active"
                            className="absolute inset-0 bg-primary-dark shadow-lg shadow-primary/30 rounded-md -z-10"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                  <span>{t(link.name)}</span>
                </button>
              );
            })}
          </nav>
          
          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
            <PWAInstallButton />
            <motion.button 
                onClick={() => setIsSearchOpen(!isSearchOpen)} 
                className={`p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${isScrolled ? 'hover:bg-gray-200 dark:hover:bg-slate-700' : 'hover:bg-white/20'}`}
                aria-label={t('AriaLabel_SearchToggle')}
                aria-expanded={isSearchOpen}
                whileTap={{ scale: 0.9 }}
            >
                <motion.div
                    animate={{ rotate: isSearchOpen ? 90 : 0, scale: isSearchOpen ? 1.1 : 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isScrolled ? 'text-text-dark dark:text-slate-200' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </motion.div>
            </motion.button>
            
            <button 
                onClick={toggleTheme} 
                className={`p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${isScrolled ? 'hover:bg-gray-200 dark:hover:bg-slate-700' : 'hover:bg-white/20'}`} 
                aria-label={t('AriaLabel_ThemeToggle')}
            >
              {theme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isScrolled ? 'text-text-dark' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isScrolled ? 'text-slate-200' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              )}
            </button>
            
            <button 
                onClick={() => setPage(Page.InternalPortal)} 
                className={`p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${isScrolled ? 'hover:bg-gray-200 dark:hover:bg-slate-700' : 'hover:bg-white/20'}`} 
                aria-label={t(Page.InternalPortal)}
                title={t(Page.InternalPortal)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isScrolled ? 'text-text-dark dark:text-slate-200' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            
            
            {/* Language Selector Dropdown */}
            <div className="relative group">
                <button 
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 border ${isScrolled ? 'border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-800 text-primary dark:text-white' : 'border-white/20 bg-white/10 text-white hover:bg-white/20'}`}
                    aria-label="Select Language"
                    aria-haspopup="true"
                >
                    {language}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div className="absolute top-full right-0 mt-2 w-24 bg-white dark:bg-slate-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden ring-1 ring-black/5">
                    {['EN', 'FA', 'AR', 'KU', 'RU'].map(lang => (
                        <button
                            key={lang}
                            onClick={() => setLanguage(lang as any)}
                            className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-slate-700 ${language === lang ? 'text-primary dark:text-secondary bg-gray-50 dark:bg-slate-700/50' : 'text-slate-700 dark:text-slate-300'}`}
                        >
                            {lang}
                        </button>
                    ))}
                </div>
            </div>


            <div className="lg:hidden">
              <motion.button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className={`p-2 rounded-md transition-colors ${isScrolled ? 'hover:bg-gray-200 dark:hover:bg-slate-700' : 'hover:bg-white/20'}`}
                aria-controls="mobile-menu" 
                aria-expanded={isMenuOpen} 
                aria-label={t('AriaLabel_MobileMenu')}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                    {isMenuOpen ? (
                      <motion.svg key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isScrolled ? 'text-text-dark dark:text-slate-200' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></motion.svg>
                    ) : (
                      <motion.svg key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isScrolled ? 'text-text-dark dark:text-slate-200' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></motion.svg>
                    )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
        
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <form onSubmit={handleSearchSubmit} className="py-4">
                <div className="relative">
                  <input ref={searchInputRef} type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t('SearchPlaceholder')} className="w-full ps-4 pe-20 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-full focus:outline-none focus:ring-2 focus:ring-secondary text-text-dark dark:text-slate-200" aria-label={t('Search')} />
                  <button type="submit" className="absolute inset-y-0 end-0 px-6 font-bold text-sm text-primary-dark dark:text-secondary hover:text-accent-dark dark:hover:text-accent-yellow">
                    {t('Search')}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="lg:hidden overflow-hidden h-screen absolute top-20 left-0 right-0 z-50" 
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t('AriaLabel_MobileMenu')}
          >
            <div className="px-4 pt-4 pb-20 space-y-2 sm:px-8 md:px-16 bg-white/95 dark:bg-slate-900/95 border-t border-gray-200 dark:border-slate-700 backdrop-blur-sm overflow-y-auto h-full">
              {NAV_LINKS.map(link => {
                const isActive = currentPage === link.name || (link.subLinks && link.subLinks.some(subLink => subLink.page === currentPage));
                if (link.subLinks && link.subLinks.length > 0) {
                    const isOpen = openMobileSubMenu === link.name || isActive;
                    return (
                        <motion.div key={link.name} variants={mobileItemVariants}>
                            <button
                                onClick={() => setOpenMobileSubMenu(isOpen ? null : link.name)}
                                className={`flex justify-between items-center w-full text-start px-4 py-3 rounded-xl text-lg md:text-xl font-medium transition-colors duration-200 ${ isActive ? 'text-primary-dark dark:text-secondary bg-primary/5 dark:bg-secondary/5' : 'text-text-dark dark:text-slate-200 hover:text-primary-dark dark:hover:text-secondary hover:bg-gray-50 dark:hover:bg-slate-800'}`}
                                aria-expanded={isOpen}
                                aria-haspopup="true"
                            >
                                <span>{t(link.name)}</span>
                                <motion.svg
                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </motion.svg>
                            </button>
                             <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden ps-6 mt-1"
                                    >
                                        <div className="flex flex-col space-y-1 border-s-2 border-secondary/50 dark:border-primary/50 ps-2">
                                            {link.subLinks.map(subLink => (
                                                <button
                                                    key={subLink.id}
                                                    onClick={() => {
                                                        setPage(subLink.page || link.name);
                                                        setIsMenuOpen(false);
                                                    }}
                                                    className="block w-full text-start px-4 py-2 rounded-lg text-base md:text-lg font-medium text-text-dark dark:text-slate-300 hover:text-primary-dark dark:hover:text-secondary hover:bg-gray-50 dark:hover:bg-slate-800/50"
                                                >
                                                    {t(subLink.name)}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                             </AnimatePresence>
                        </motion.div>
                    );
                }
                return (
                    <motion.button
                        key={link.name}
                        variants={mobileItemVariants}
                        onClick={() => {
                            setPage(link.name);
                            setIsMenuOpen(false);
                        }}
                        className={`block w-full text-start px-4 py-3 rounded-xl text-lg md:text-xl font-medium transition-colors duration-200 ${ currentPage === link.name ? 'text-primary-dark dark:text-secondary font-bold bg-primary/5 dark:bg-secondary/5' : 'text-text-dark dark:text-slate-200 hover:text-primary-dark dark:hover:text-secondary hover:bg-gray-50 dark:hover:bg-slate-800'}`}
                        aria-current={currentPage === link.name ? 'page' : undefined}
                    >
                        {t(link.name)}
                    </motion.button>
                );
              })}
              
              <motion.button
                  key={Page.InternalPortal}
                  variants={mobileItemVariants}
                  onClick={() => {
                      setPage(Page.InternalPortal);
                      setIsMenuOpen(false);
                  }}
                  className={`block w-full text-start px-4 py-3 rounded-xl text-lg md:text-xl font-medium transition-colors duration-200 ${ currentPage === Page.InternalPortal ? 'text-primary-dark dark:text-secondary font-bold bg-primary/5 dark:bg-secondary/5' : 'text-text-dark dark:text-slate-200 hover:text-primary-dark dark:hover:text-secondary hover:bg-gray-50 dark:hover:bg-slate-800'}`}
                  aria-current={currentPage === Page.InternalPortal ? 'page' : undefined}
              >
                  {t(Page.InternalPortal)}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
