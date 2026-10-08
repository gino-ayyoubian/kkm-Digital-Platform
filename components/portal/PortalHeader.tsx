import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useAuth } from '../../AuthContext';
import { useLanguage } from '../../LanguageContext';
import { 
  Shield, UserCheck, LogOut, ChevronDown, Bell, Building2, Lock, Users,
  LayoutDashboard, Inbox, FileText, Clock, PhoneCall, GitBranch, Network,
  Sliders, Menu, X, Search, Sparkles, Layers, ChevronRight, ChevronLeft,
  Phone, ArrowRight, Check, Eye, FolderGit2
} from 'lucide-react';
import { OrgRole } from '../../types';
import { ExecutiveMemberIdentity } from '../common/ExecutiveMemberIdentity';
import { PortalNavigationDrawer } from './PortalNavigationDrawer';

interface PortalHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pendingCount: number;
}

export type ModuleCategory = 'operations' | 'communications' | 'governance';

export interface NavModuleItem {
  id: string;
  labelEn: string;
  labelFa: string;
  shortLabelFa: string;
  shortLabelEn: string;
  descFa: string;
  descEn: string;
  category: ModuleCategory;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  adminOnly?: boolean;
}

export const PortalHeader: React.FC<PortalHeaderProps> = ({
  activeTab,
  setActiveTab,
  pendingCount,
}) => {
  const { userProfile, allUsers, switchPersona, logout, isSuperAdmin, isAdmin } = useAuth();
  const { t, isFa } = useLanguage();
  
  // State for menus & dropdowns
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<ModuleCategory | null>(null);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<ModuleCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  const dropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close menus on click outside & escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
        setShowPersonaMenu(false);
        setIsSearchModalOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownContainerRef.current && !dropdownContainerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Focus search input when search modal opens
  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isSearchModalOpen]);

  const getRoleBadgeColor = (role?: OrgRole) => {
    switch (role) {
      case 'super_admin':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border-purple-300';
      case 'executive':
        return 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 border-red-300';
      case 'director':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-300';
      case 'reviewer':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-300';
      case 'manager':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300 border-teal-300';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300 border-slate-300';
    }
  };

  const getRoleLabel = (role?: OrgRole) => {
    switch (role) {
      case 'super_admin':
        return isFa ? 'مدیر ارشد سامانه (Super Admin)' : 'Super Admin';
      case 'executive':
        return isFa ? 'مدیر ارشد اجرایی (C-Level)' : 'Executive (C-Level)';
      case 'director':
        return isFa ? 'مدیر دپارتمان' : 'Director';
      case 'reviewer':
        return isFa ? 'ممیز و کنترل کیفیت (QA/QC)' : 'QA/QC Reviewer';
      case 'manager':
        return isFa ? 'مدیر میانی' : 'Manager';
      default:
        return isFa ? 'کارشناس سازمانی' : 'Employee / Specialist';
    }
  };

  // Structured Modules categorized into 3 clean enterprise domains
  const allModules: NavModuleItem[] = useMemo(() => [
    // 1. OPERATIONS & WORKSTATION
    {
      id: 'dashboard',
      labelEn: 'Dashboard & Desk',
      labelFa: 'میز کار و داشبورد',
      shortLabelFa: 'میز کار',
      shortLabelEn: 'Dashboard',
      descFa: 'خلاصه وظایف، ابزارهای اداری و فرآیندهای روزانه',
      descEn: 'Workstation overview, quick desk tools & operational directives',
      category: 'operations',
      icon: LayoutDashboard,
    },
    {
      id: 'cartable',
      labelEn: 'Automation Cartable',
      labelFa: 'کارتابل اتوماسیون',
      shortLabelFa: 'کارتابل',
      shortLabelEn: 'Cartable',
      descFa: 'گردش کار اداری، تایید اسناد و درخواست‌های سازمانی',
      descEn: 'Administrative workflow, formal approvals & request cartable',
      category: 'operations',
      icon: Inbox,
      badge: pendingCount,
    },
    {
      id: 'attendance',
      labelEn: 'Attendance & Telemetry',
      labelFa: 'ثبت تردد و دورکاری',
      shortLabelFa: 'ثبت تردد',
      shortLabelEn: 'Attendance',
      descFa: 'حضور و غیاب الکترونیک، شیفت کاری و تله‌متری دورکاری',
      descEn: 'Electronic clock-in, remote work telemetry & attendance registry',
      category: 'operations',
      icon: Clock,
    },
    {
      id: 'dms',
      labelEn: 'DMS & Policies',
      labelFa: 'مرکز اسناد و بخشنامه‌ها',
      shortLabelFa: 'اسناد و بخشنامه‌ها',
      shortLabelEn: 'DMS Repository',
      descFa: 'مستندات استاندارد، ایزو، قراردادها و آیین‌نامه‌ها',
      descEn: 'ISO standards, official circulars, contracts & policies',
      category: 'operations',
      icon: FileText,
    },
    {
      id: 'teamOps',
      labelEn: 'Cohort Operations & GitHub Oversight',
      labelFa: 'میز کار عملیات اجرایی و گیت‌هاب',
      shortLabelFa: 'عملیات و گیت‌هاب',
      shortLabelEn: 'Cohort & GitHub',
      descFa: 'پیگیری چابک پروژه‌ها، نظارت بر مخازن گیت‌هاب و پایپ‌لاین پتنت‌ها (ویژه تیم ۱۵-۲۰ نفره)',
      descEn: 'Rapid project tracking, GitHub repository health & patent pipeline (15-20 core cohort)',
      category: 'operations',
      icon: FolderGit2,
    },

    // 2. TELEPHONY & COMMUNICATIONS (Daftare Shoma Cloud PBX & IVR)
    {
      id: 'ivr',
      labelEn: 'Daftare Shoma Cloud PBX & IVR',
      labelFa: 'تلفن ابری دفتر شما و سامانه IVR',
      shortLabelFa: 'تلفن ابری دفتر شما',
      shortLabelEn: 'Daftare Shoma PBX',
      descFa: 'کنسول خط ۰۲۱۹۱۰۳۰۸۳۰، سافت‌فون تحت وب WebRTC و لاگ تماس‌ها',
      descEn: 'Cloud PBX for line +982191030830, WebRTC softphone & call logs',
      category: 'communications',
      icon: PhoneCall,
    },
    {
      id: 'internalCommunication',
      labelEn: 'Internal Communication & IVR Architecture',
      labelFa: 'ارتباطات سازمانی و معماری تلفن گویا',
      shortLabelFa: 'معماری و جریان IVR',
      shortLabelEn: 'IVR Architecture',
      descFa: 'درخت هدایت هوشمند تماس، صفوف پاسخگویی و دیاگرام ترانک',
      descEn: 'Call routing tree, trunk integration logic & queue architecture',
      category: 'communications',
      icon: GitBranch,
    },
    {
      id: 'internalDirectory',
      labelEn: 'Internal Directory & Staff Extensions',
      labelFa: 'دفترچه تلفن و داخلی‌های پرسنل',
      shortLabelFa: 'دفترچه داخلی‌ها',
      shortLabelEn: 'Staff Directory',
      descFa: 'شماره‌های مستقیم، داخلی‌های ۳ رقمی و دایورت موبایل همکاران',
      descEn: 'Direct staff phone numbers, 3-digit extensions & call forwarding',
      category: 'communications',
      icon: Users,
    },

    // 3. GOVERNANCE & ORGANIZATION
    {
      id: 'orgchart',
      labelEn: 'Org Directory & Structure',
      labelFa: 'ارکان و چارت سازمانی',
      shortLabelFa: 'چارت سازمانی',
      shortLabelEn: 'Org Chart',
      descFa: 'سلسله‌مراتب، هیئت مدیره، مدیران ارشد و تفکیک وظایف سازمانی',
      descEn: 'Corporate hierarchy, board members, directors & org chart',
      category: 'governance',
      icon: Network,
    },
    ...(userProfile?.permissions.canManageUsers || isAdmin ? [
      {
        id: 'users',
        labelEn: 'Users & RBAC Access',
        labelFa: 'مدیریت کاربران و دسترسی‌ها',
        shortLabelFa: 'کاربران و دسترسی‌ها',
        shortLabelEn: 'Users & RBAC',
        descFa: 'کنترل نقش‌ها (RBAC)، ایجاد کاربر جدید و سطوح محرمانگی',
        descEn: 'Role-Based Access Control, clearance levels & user accounts',
        category: 'governance' as const,
        icon: UserCheck,
        adminOnly: true,
      },
      {
        id: 'adminControl',
        labelEn: 'GMEL Telemetry & CMS',
        labelFa: 'کنترل پنل تله‌متری GMEL و CMS',
        shortLabelFa: 'تله‌متری و CMS',
        shortLabelEn: 'Telemetry & CMS',
        descFa: 'نظارت بلادرنگ بر لاگ‌های سیستم، تله‌متری و ویرایش محتوای پرتال',
        descEn: 'Real-time telemetry monitoring, system logs & CMS control',
        category: 'governance' as const,
        icon: Sliders,
        adminOnly: true,
      }
    ] : []),
  ], [userProfile, isAdmin, pendingCount]);

  // Categories config for dropdowns
  const categoryGroups = useMemo(() => [
    {
      id: 'operations' as ModuleCategory,
      titleFa: 'عملیات و کارتابل',
      titleEn: 'Operations & Desk',
      subtitleFa: 'میز کار، کارتابل اداری، تردد و مرکز اسناد',
      subtitleEn: 'Workstation, automation cartable & DMS',
      icon: LayoutDashboard,
      colorClass: 'text-blue-600 dark:text-blue-400',
      activeBg: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300',
      badge: pendingCount > 0 ? pendingCount : undefined,
      modules: allModules.filter(m => m.category === 'operations'),
    },
    {
      id: 'communications' as ModuleCategory,
      titleFa: 'تلفن ابری و ارتباطات',
      titleEn: 'Telephony & PBX',
      subtitleFa: 'مرکز تلفن دفتر شما، سافت‌فون و داخلی‌ها',
      subtitleEn: 'Daftare Shoma Cloud PBX & directory',
      icon: PhoneCall,
      colorClass: 'text-emerald-600 dark:text-emerald-400',
      activeBg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300',
      isLiveTrunk: true,
      modules: allModules.filter(m => m.category === 'communications'),
    },
    {
      id: 'governance' as ModuleCategory,
      titleFa: 'حاکمیت و سازمان',
      titleEn: 'Governance & Org',
      subtitleFa: 'ارکان چارت، دسترسی‌ها و پنل تله‌متری',
      subtitleEn: 'Org chart, access control & CMS telemetry',
      icon: Network,
      colorClass: 'text-purple-600 dark:text-purple-400',
      activeBg: 'bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300',
      modules: allModules.filter(m => m.category === 'governance'),
    },
  ], [allModules, pendingCount]);

  // Current active module details
  const currentActiveModule = allModules.find(m => m.id === activeTab) || allModules[0];
  const activeCategory = currentActiveModule.category;
  const ActiveIcon = currentActiveModule.icon;

  // Search filter
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return allModules;
    const q = searchQuery.toLowerCase();
    return allModules.filter(
      item =>
        item.labelFa.toLowerCase().includes(q) ||
        item.labelEn.toLowerCase().includes(q) ||
        item.shortLabelFa.toLowerCase().includes(q) ||
        item.shortLabelEn.toLowerCase().includes(q) ||
        item.descFa.toLowerCase().includes(q) ||
        item.descEn.toLowerCase().includes(q)
    );
  }, [allModules, searchQuery]);

  const handleDropdownHover = (catId: ModuleCategory) => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setActiveDropdown(catId);
  };

  const handleDropdownLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const handleSelectModule = (id: string) => {
    setActiveTab(id);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    setIsSearchModalOpen(false);
    setSearchQuery('');
  };

  return (
    <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 shadow-sm sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5">
        
        {/* ========================================================================= */}
        {/* TOP ROW: Brand Logo, Desktop Dropdowns, Active Badge, User & Mobile Menu */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-between gap-3 h-12 sm:h-14">
          
          {/* Brand & Portal Identity */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark dark:from-secondary dark:to-primary text-white flex items-center justify-center shadow-md font-display font-black text-sm sm:text-base">
              KKM
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary dark:text-secondary truncate">
                  {isFa ? 'گروه بین‌المللی کیمیا کاران ماد' : 'KKM International Group'}
                </span>
                <span className="hidden sm:inline-block text-[9px] px-1.5 py-0.2 rounded bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 font-mono font-bold">
                  EAOS v3.2
                </span>
              </div>
              <h1 className="text-xs sm:text-sm font-display font-bold text-text-dark dark:text-white flex items-center gap-1 leading-tight">
                <Shield className="w-3.5 h-3.5 text-primary dark:text-secondary shrink-0" />
                <span className="hidden sm:inline">
                  {isFa ? 'پرتال جامع اتوماسیون و حاکمیت سازمانی' : 'Enterprise Automation & Operating Portal'}
                </span>
                <span className="sm:hidden font-bold">
                  {isFa ? 'پرتال اتوماسیون سازمانی' : 'Enterprise Portal'}
                </span>
              </h1>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* DESKTOP NAVIGATION: ORGANIZED DROPDOWN-BASED MENU (≥ 1024px / lg)         */}
          {/* ========================================================================= */}
          <nav
            ref={dropdownContainerRef}
            className="hidden lg:flex items-center gap-1.5 xl:gap-2"
            role="navigation"
            aria-label={isFa ? 'منوی کشویی بخش‌های پرتال' : 'Portal Dropdown Navigation'}
          >
            {categoryGroups.map((group) => {
              const isOpen = activeDropdown === group.id;
              const isGroupActive = activeCategory === group.id;
              const GroupIcon = group.icon;

              return (
                <div
                  key={group.id}
                  className="relative"
                  onMouseEnter={() => handleDropdownHover(group.id)}
                  onMouseLeave={handleDropdownLeave}
                >
                  {/* Dropdown Trigger Button */}
                  <button
                    type="button"
                    onClick={() => setActiveDropdown(isOpen ? null : group.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs xl:text-sm font-bold transition-all duration-150 min-h-[44px] border ${
                      isGroupActive
                        ? `${group.activeBg} shadow-sm ring-1 ring-primary/20 dark:ring-secondary/20`
                        : 'bg-gray-50/80 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-gray-200/80 dark:border-slate-700/80 hover:bg-gray-100 dark:hover:bg-slate-750'
                    }`}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                  >
                    <GroupIcon className={`w-4 h-4 shrink-0 ${isGroupActive ? group.colorClass : 'text-slate-500 dark:text-slate-400'}`} />
                    <span>{isFa ? group.titleFa : group.titleEn}</span>

                    {/* Pending Task Badge */}
                    {group.badge !== undefined && (
                      <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-red-500 text-white animate-pulse">
                        {group.badge}
                      </span>
                    )}

                    {/* Live PBX Indicator */}
                    {group.isLiveTrunk && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" title="Active Cloud Line: +982191030830" />
                    )}

                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-primary dark:text-secondary' : 'text-slate-400'
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu Card */}
                  {isOpen && (
                    <div 
                      className={`absolute top-full mt-1.5 z-50 w-72 xl:w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-2 border border-gray-200 dark:border-slate-800 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 text-start ${
                        isFa ? 'right-0' : 'left-0'
                      }`}
                    >
                      {/* Dropdown Section Header */}
                      <div className="px-3 py-2 border-b border-gray-100 dark:border-slate-800 mb-1 flex items-center justify-between">
                        <div>
                          <p className="text-[11px] font-bold text-slate-900 dark:text-white">
                            {isFa ? group.titleFa : group.titleEn}
                          </p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">
                            {isFa ? group.subtitleFa : group.subtitleEn}
                          </p>
                        </div>
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {group.modules.length} {isFa ? 'بخش' : 'items'}
                        </span>
                      </div>

                      {/* Dropdown Items List */}
                      <div className="space-y-1">
                        {group.modules.map((item) => {
                          const isItemActive = activeTab === item.id;
                          const ItemIcon = item.icon;

                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => handleSelectModule(item.id)}
                              className={`w-full p-2.5 rounded-xl flex items-start gap-2.5 transition-all text-start min-h-[48px] ${
                                isItemActive
                                  ? 'bg-primary/10 dark:bg-secondary/15 text-primary dark:text-secondary font-bold shadow-xs'
                                  : 'hover:bg-gray-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                              }`}
                            >
                              <div className={`p-1.5 rounded-lg shrink-0 ${
                                isItemActive
                                  ? 'bg-primary text-white dark:bg-secondary dark:text-slate-900'
                                  : 'bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                              }`}>
                                <ItemIcon className="w-4 h-4" />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-xs font-bold truncate">
                                    {isFa ? item.labelFa : item.labelEn}
                                  </span>
                                  {item.badge !== undefined && item.badge > 0 && (
                                    <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-red-500 text-white shrink-0">
                                      {item.badge}
                                    </span>
                                  )}
                                  {isItemActive && (
                                    <Check className="w-3.5 h-3.5 text-primary dark:text-secondary shrink-0" />
                                  )}
                                </div>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                                  {isFa ? item.descFa : item.descEn}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Quick Search Trigger Icon */}
            <button
              type="button"
              onClick={() => setIsSearchModalOpen(true)}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors border border-gray-200/80 dark:border-slate-700/80 min-h-[44px] min-w-[44px] flex items-center justify-center"
              title={isFa ? 'جستجوی سریع ماژول‌های پرتال' : 'Quick Search Modules'}
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </nav>

          {/* Right Area: Active Context Pill, User Profile & Mobile Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            
            {/* Active Module Indicator (Tablet & Desktop) */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-50 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 text-xs font-semibold">
              <span className="text-slate-400 text-[11px]">{isFa ? 'بخش جاری:' : 'Active:'}</span>
              <div className="flex items-center gap-1.5 text-primary dark:text-secondary font-bold">
                <ActiveIcon className="w-3.5 h-3.5" />
                <span className="truncate max-w-[120px] lg:max-w-[150px]">
                  {isFa ? currentActiveModule.shortLabelFa : currentActiveModule.shortLabelEn}
                </span>
              </div>
            </div>

            {/* Active User Card & Persona Switcher */}
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-slate-800/60 p-1 sm:px-2.5 sm:py-1.5 rounded-xl border border-gray-200 dark:border-slate-700">
              <ExecutiveMemberIdentity
                name={userProfile?.displayName || 'User'}
                nameFa={userProfile?.displayNameFa}
                role={userProfile?.role || 'employee'}
                photoUrl={userProfile?.avatarUrl}
                size="sm"
                showBadge={false}
              />
              <div className="hidden xl:block text-start max-w-[120px]">
                <p className="text-xs font-bold text-text-dark dark:text-white truncate">
                  {isFa && userProfile?.displayNameFa ? userProfile.displayNameFa : userProfile?.displayName}
                </p>
                <p className="text-[10px] text-text-light dark:text-slate-400 truncate">
                  {isFa && userProfile?.titleFa ? userProfile.titleFa : userProfile?.title}
                </p>
              </div>

              {/* Persona Switcher Dropdown (Super Admins / Executives) */}
              {(isSuperAdmin || userProfile?.role === 'executive') && (
                <div className="relative">
                  <button
                    onClick={() => setShowPersonaMenu(!showPersonaMenu)}
                    title={isFa ? 'تغییر پرسونای فعال سازمانی' : 'Switch Active Organizational Persona'}
                    className="p-1 sm:p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 text-text-light dark:text-slate-300 transition-colors flex items-center gap-1 text-xs min-h-[36px] min-w-[36px]"
                  >
                    <Users className="w-3.5 h-3.5 text-primary dark:text-secondary" />
                    <ChevronDown className="w-3 h-3" />
                  </button>

                  {showPersonaMenu && (
                    <div className={`absolute ${isFa ? 'left-0' : 'right-0'} mt-2 w-72 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 py-2 z-50 text-start animate-in fade-in zoom-in-95 duration-150`}>
                      <div className="px-3 py-1.5 border-b border-gray-100 dark:border-slate-700 text-[11px] font-semibold text-text-light dark:text-slate-400 flex items-center justify-between">
                        <span>{isFa ? 'شبیه‌ساز و ممیزی نقش‌ها' : 'Audit & Persona Switch'}</span>
                        <span className="text-[9px] font-mono px-1 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">Admin</span>
                      </div>

                      <div className="max-h-64 overflow-y-auto divide-y divide-gray-50 dark:divide-slate-700/50">
                        {allUsers.map((member, idx) => (
                          <button
                            key={`persona-${member.uid}-${idx}`}
                            onClick={() => {
                              switchPersona(member.uid);
                              setShowPersonaMenu(false);
                            }}
                            className={`w-full px-3 py-2 text-start flex items-center justify-between hover:bg-primary/5 dark:hover:bg-secondary/10 transition-colors ${
                              userProfile?.uid === member.uid ? 'bg-primary/10 dark:bg-secondary/20' : ''
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <ExecutiveMemberIdentity
                                name={member.displayName}
                                nameFa={member.displayNameFa}
                                role={member.role}
                                photoUrl={member.avatarUrl}
                                size="sm"
                                showBadge={false}
                              />
                              <div>
                                <p className="text-xs font-bold text-text-dark dark:text-white">
                                  {isFa && member.displayNameFa ? member.displayNameFa : member.displayName}
                                </p>
                                <p className="text-[10px] text-text-light dark:text-slate-400">
                                  {isFa && member.titleFa ? member.titleFa : member.title}
                                </p>
                              </div>
                            </div>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${getRoleBadgeColor(member.role)}`}>
                              {member.role}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="p-2 sm:px-2.5 sm:py-2 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl border border-red-200 dark:border-red-900/50 transition-colors flex items-center gap-1 min-h-[44px] min-w-[44px] justify-center"
              title={isFa ? 'خروج امن از حساب' : 'Logout'}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden xl:inline">{isFa ? 'خروج' : 'Logout'}</span>
            </button>

            {/* ========================================================================= */}
            {/* UNIFIED COLLAPSIBLE HAMBURGER MENU BUTTON FOR MOBILE & TABLET (< lg)      */}
            {/* ========================================================================= */}
            <div className="lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2.5 rounded-xl border transition-all flex items-center gap-2 min-h-[48px] min-w-[48px] justify-center focus:outline-none focus:ring-2 focus:ring-primary ${
                  isMobileMenuOpen
                    ? 'bg-primary text-white border-primary shadow-md'
                    : 'bg-primary/10 hover:bg-primary/20 dark:bg-secondary/15 dark:hover:bg-secondary/25 text-primary dark:text-secondary border-primary/20 dark:border-secondary/30'
                }`}
                aria-expanded={isMobileMenuOpen}
                aria-label={isFa ? 'منوی پرتال سازمانی' : 'Toggle Portal Menu'}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
                <span className="hidden xs:inline text-xs font-bold">
                  {isFa ? 'منوی پرتال' : 'Menu'}
                </span>
                {pendingCount > 0 && !isMobileMenuOpen && (
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                )}
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* RESPONSIVE MOBILE-FIRST COLLAPSIBLE DRAWER COMPONENT                      */}
      {/* ========================================================================= */}
      <PortalNavigationDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab={activeTab}
        onSelectTab={handleSelectModule}
        modules={allModules}
        pendingCount={pendingCount}
      />

      {/* ========================================================================= */}
      {/* QUICK SEARCH MODAL OVERLAY                                                */}
      {/* ========================================================================= */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-800 overflow-hidden text-start">
            <div className="p-4 border-b border-gray-100 dark:border-slate-800 flex items-center gap-3">
              <Search className="w-5 h-5 text-primary dark:text-secondary shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isFa ? 'جستجو در نام بخش‌ها، تلفن ابری، کارتابل...' : 'Search modules, PBX, cartable...'}
                className="w-full py-1 text-sm bg-transparent focus:outline-none text-slate-900 dark:text-white placeholder-slate-400"
              />
              <button
                onClick={() => setIsSearchModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {searchResults.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400">
                  {isFa ? 'ماژولی با این عنوان یافت نشد.' : 'No modules matched your search.'}
                </div>
              ) : (
                searchResults.map((item) => {
                  const ItemIcon = item.icon;
                  const isItemActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectModule(item.id)}
                      className={`w-full p-2.5 rounded-xl flex items-center justify-between text-start transition-colors min-h-[48px] ${
                        isItemActive
                          ? 'bg-primary/10 dark:bg-secondary/15 text-primary dark:text-secondary font-bold'
                          : 'hover:bg-gray-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          <ItemIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold">{isFa ? item.labelFa : item.labelEn}</p>
                          <p className="text-[10px] text-slate-400">{isFa ? item.descFa : item.descEn}</p>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 text-slate-400 ${isFa ? 'rotate-180' : ''}`} />
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MOBILE BOTTOM DOCK BAR (FOR EFFORTLESS ONE-THUMB NAVIGATION)              */}
      {/* ========================================================================= */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-gray-200 dark:border-slate-800 px-1 py-1 flex items-center justify-around shadow-lg">
        <button
          type="button"
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl text-[10px] font-bold transition-all active:scale-95 min-h-[48px] min-w-[48px] justify-center ${
            activeTab === 'dashboard' ? 'text-primary dark:text-secondary' : 'text-gray-500 dark:text-slate-400'
          }`}
          aria-label={isFa ? 'میز کار' : 'Dashboard'}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>{isFa ? 'میز کار' : 'Desk'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('cartable')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl text-[10px] font-bold transition-all active:scale-95 relative min-h-[48px] min-w-[48px] justify-center ${
            activeTab === 'cartable' ? 'text-primary dark:text-secondary' : 'text-gray-500 dark:text-slate-400'
          }`}
          aria-label={isFa ? 'کارتابل' : 'Cartable'}
        >
          <Inbox className="w-4 h-4" />
          <span>{isFa ? 'کارتابل' : 'Cartable'}</span>
          {pendingCount > 0 && (
            <span className="absolute top-1 right-2 px-1 py-0.2 rounded-full text-[9px] font-bold bg-red-500 text-white">
              {pendingCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('ivr')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl text-[10px] font-bold transition-all active:scale-95 min-h-[48px] min-w-[48px] justify-center ${
            activeTab === 'ivr' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-slate-400'
          }`}
          aria-label={isFa ? 'تلفن ابری' : 'PBX'}
        >
          <PhoneCall className="w-4 h-4" />
          <span>{isFa ? 'تلفن ابری' : 'PBX'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('internalDirectory')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl text-[10px] font-bold transition-all active:scale-95 min-h-[48px] min-w-[48px] justify-center ${
            activeTab === 'internalDirectory' ? 'text-primary dark:text-secondary' : 'text-gray-500 dark:text-slate-400'
          }`}
          aria-label={isFa ? 'داخلی‌ها' : 'Directory'}
        >
          <Users className="w-4 h-4" />
          <span>{isFa ? 'داخلی‌ها' : 'Directory'}</span>
        </button>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl text-[10px] font-bold text-gray-500 dark:text-slate-400 hover:text-primary transition-all active:scale-95 min-h-[48px] min-w-[48px] justify-center"
          aria-label={isFa ? 'همه بخش‌ها' : 'More Modules'}
        >
          <Menu className="w-4 h-4" />
          <span>{isFa ? 'همه بخش‌ها' : 'More'}</span>
        </button>
      </div>

    </header>
  );
};
