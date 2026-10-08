import { useState, useEffect, useRef, useCallback } from 'react';
import { Page } from '../types';

export interface UseUnifiedNavigationProps {
  currentPage: Page;
  onSearch: (query: string) => void;
}

export interface UnifiedNavigationReturn {
  // Mobile Drawer State
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  openMobileSubMenu: string | null;
  toggleMobileSubMenu: (name: string) => void;

  // Desktop Dropdown State
  activeDropdown: string | null;
  handleDesktopMenuEnter: (name: string) => void;
  handleDesktopMenuLeave: () => void;
  toggleDesktopDropdown: (name: string) => void;
  closeAllDropdowns: () => void;
  desktopNavRef: React.RefObject<HTMLDivElement | null>;

  // Search State
  isSearchOpen: boolean;
  toggleSearch: () => void;
  closeSearch: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  mobileSearchQuery: string;
  setMobileSearchQuery: (q: string) => void;
  handleSearchSubmit: (e: React.FormEvent, queryText: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;

  // Advisor Modal State
  isAdvisorOpen: boolean;
  setIsAdvisorOpen: (open: boolean) => void;

  // Scroll State
  isScrolled: boolean;
}

export function useUnifiedNavigation({
  currentPage,
  onSearch,
}: UseUnifiedNavigationProps): UnifiedNavigationReturn {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openMobileSubMenu, setOpenMobileSubMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileSearchQuery, setMobileSearchQuery] = useState<string>('');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const desktopNavRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Dynamic scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll strictly during mobile drawer open state
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isDrawerOpen]);

  // Synchronize state on page change: close drawer, dropdown, and search
  useEffect(() => {
    setIsDrawerOpen(false);
    setIsSearchOpen(false);
    setActiveDropdown(null);
    setOpenMobileSubMenu(null);
  }, [currentPage]);

  // Viewport resize synchronization: if resized to desktop (>= 1280px), close mobile drawer
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280 && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [isDrawerOpen]);

  // Focus desktop search input when search bar opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isSearchOpen]);

  // Keyboard navigation & outside click handlers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (desktopNavRef.current && !desktopNavRef.current.contains(target)) {
        setActiveDropdown(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setIsSearchOpen(false);
        setIsDrawerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Actions
  const openDrawer = useCallback(() => {
    setActiveDropdown(null);
    setIsSearchOpen(false);
    setIsDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen((prev) => {
      if (!prev) {
        setActiveDropdown(null);
        setIsSearchOpen(false);
      }
      return !prev;
    });
  }, []);

  const toggleMobileSubMenu = useCallback((name: string) => {
    setOpenMobileSubMenu((prev) => (prev === name ? null : name));
  }, []);

  const handleDesktopMenuEnter = useCallback((name: string) => {
    if (dropdownCloseTimeoutRef.current) {
      clearTimeout(dropdownCloseTimeoutRef.current);
    }
    setActiveDropdown(name);
  }, []);

  const handleDesktopMenuLeave = useCallback(() => {
    dropdownCloseTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  }, []);

  const toggleDesktopDropdown = useCallback((name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  }, []);

  const closeAllDropdowns = useCallback(() => {
    setActiveDropdown(null);
  }, []);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen((prev) => !prev);
  }, []);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
  }, []);

  const handleSearchSubmit = useCallback((e: React.FormEvent, queryText: string) => {
    e.preventDefault();
    if (queryText.trim()) {
      onSearch(queryText.trim());
      setIsSearchOpen(false);
      setIsDrawerOpen(false);
      setSearchQuery('');
      setMobileSearchQuery('');
    }
  }, [onSearch]);

  return {
    isDrawerOpen,
    openDrawer,
    closeDrawer,
    toggleDrawer,
    openMobileSubMenu,
    toggleMobileSubMenu,

    activeDropdown,
    handleDesktopMenuEnter,
    handleDesktopMenuLeave,
    toggleDesktopDropdown,
    closeAllDropdowns,
    desktopNavRef,

    isSearchOpen,
    toggleSearch,
    closeSearch,
    searchQuery,
    setSearchQuery,
    mobileSearchQuery,
    setMobileSearchQuery,
    handleSearchSubmit,
    searchInputRef,

    isAdvisorOpen,
    setIsAdvisorOpen,

    isScrolled,
  };
}
