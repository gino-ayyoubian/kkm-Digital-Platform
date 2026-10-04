import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useLanguage } from '../../LanguageContext';
import { useAuth } from '../../AuthContext';
import { 
  X, Search, ChevronDown, ChevronRight, Check, Shield, Users, 
  LogOut, PhoneCall, LayoutDashboard, Network, ArrowLeft, ArrowRight
} from 'lucide-react';
import { ExecutiveMemberIdentity } from '../common/ExecutiveMemberIdentity';
import type { NavModuleItem, ModuleCategory } from './PortalHeader';

interface PortalNavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  modules: NavModuleItem[];
  pendingCount: number;
}

export const PortalNavigationDrawer: React.FC<PortalNavigationDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
  modules,
  pendingCount,
}) => {
  const { isFa, direction } = useLanguage();
  const { userProfile, allUsers, switchPersona, logout, isSuperAdmin } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<ModuleCategory, boolean>>({
    operations: true,
    communications: true,
    governance: true,
  });
  const [showPersonaSwitch, setShowPersonaSwitch] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isRtl = direction === 'rtl';

  // Toggle category accordion
  const toggleCategory = (cat: ModuleCategory) => {
    setExpandedCategories(prev => ({
      ...prev,
      [cat]: !prev[cat]
    }));
  };

  // Focus search input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 80);
    } else {
      setSearchQuery('');
      setShowPersonaSwitch(false);
    }
  }, [isOpen]);

  // Filter modules in real time
  const filteredModules = useMemo(() => {
    if (!searchQuery.trim()) return modules;
    const q = searchQuery.toLowerCase().trim();
    return modules.filter(m => 
      m.labelFa.toLowerCase().includes(q) ||
      m.labelEn.toLowerCase().includes(q) ||
      m.shortLabelFa.toLowerCase().includes(q) ||
      m.shortLabelEn.toLowerCase().includes(q) ||
      m.descFa.toLowerCase().includes(q) ||
      m.descEn.toLowerCase().includes(q)
    );
  }, [modules, searchQuery]);

  // Category definitions for vertical grouping
  const categories: {
    id: ModuleCategory;
    titleFa: string;
    titleEn: string;
    subtitleFa: string;
    subtitleEn: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
    bgAccent: string;
  }[] = [
    {
      id: 'operations',
      titleFa: 'میز کار و عملیات سازمانی',
      titleEn: 'Workstation & Operations',
      subtitleFa: 'کارتابل اتوماسیون، ثبت تردد و اسناد',
      subtitleEn: 'Cartable, attendance telemetry & DMS',
      icon: LayoutDashboard,
      accentColor: 'text-blue-600 dark:text-blue-400',
      bgAccent: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    },
    {
      id: 'communications',
      titleFa: 'تلفن ابری و ارتباطات',
      titleEn: 'Cloud PBX & Communications',
      subtitleFa: 'مرکز تلفن دفتر شما، سافت‌فون و داخلی‌ها',
      subtitleEn: 'Daftare Shoma Cloud PBX & extensions',
      icon: PhoneCall,
      accentColor: 'text-emerald-600 dark:text-emerald-400',
      bgAccent: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    },
    {
      id: 'governance',
      titleFa: 'حاکمیت، ارکان و مدیریت',
      titleEn: 'Governance & Administration',
      subtitleFa: 'چارت سازمانی، سطوح دسترسی و تله‌متری CMS',
      subtitleEn: 'Org chart, RBAC access & telemetry CMS',
      icon: Network,
      accentColor: 'text-purple-600 dark:text-purple-400',
      bgAccent: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    },
  ];

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-stretch justify-end bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={isFa ? 'منوی ناوبری پرتال سازمانی' : 'Portal Navigation Drawer'}
    >
      {/* Backdrop Click to close */}
      <div 
        className="fixed inset-0 -z-10" 
        onClick={onClose}
        aria-hidden="true" 
      />

      {/* Drawer Container: Mobile-first vertical list */}
      <div className={`w-full max-w-md sm:max-w-lg h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col overflow-hidden text-start border-s border-gray-200 dark:border-slate-800 ${
        isRtl ? 'animate-in slide-in-from-right duration-250' : 'animate-in slide-in-from-left duration-250'
      }`}>
        
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-gray-200 dark:border-slate-800 bg-gray-50/90 dark:bg-slate-850/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark dark:from-secondary dark:to-primary text-white flex items-center justify-center font-bold text-sm shadow-md font-display">
              KKM
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-primary dark:text-secondary uppercase tracking-wider">
                  {isFa ? 'پرتال اتوماسیون سازمانی' : 'Enterprise Operating System'}
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-gray-200 dark:bg-slate-800 font-mono font-bold text-gray-700 dark:text-gray-300">
                  EAOS v3.2
                </span>
              </div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                {isFa ? 'منوی ناوبری و دسترسی یکپارچه' : 'Unified Navigation Drawer'}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={isFa ? 'بستن منو' : 'Close navigation menu'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Real-Time Filter Search Input */}
        <div className="p-4 border-b border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
          <div className="relative">
            <Search className={`w-4 h-4 absolute top-3.5 text-slate-400 ${isRtl ? 'right-3.5' : 'left-3.5'}`} />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isFa ? 'جستجوی سریع ماژول، تلفن ابری، کارتابل...' : 'Search modules, PBX, cartable...'}
              className={`w-full py-2.5 text-xs sm:text-sm bg-gray-50 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-primary dark:focus:border-secondary transition-all min-h-[48px] ${
                isRtl ? 'pr-10 pl-9' : 'pl-10 pr-9'
              }`}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className={`absolute top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 min-h-[36px] min-w-[36px] flex items-center justify-center ${
                  isRtl ? 'left-2' : 'right-2'
                }`}
                title={isFa ? 'پاک کردن' : 'Clear search'}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {searchQuery && (
            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 px-1">
              <span>
                {isFa ? `نتایج جستجو: ${filteredModules.length} بخش` : `Found: ${filteredModules.length} modules`}
              </span>
              {filteredModules.length === 0 && (
                <span className="text-amber-600 dark:text-amber-400 font-bold">
                  {isFa ? 'موردی یافت نشد' : 'No matches'}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Drawer Scrollable Body: Mobile-First Collapsible Vertical List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {searchQuery.trim() ? (
            // Direct Flat List when searching
            <div className="space-y-2">
              {filteredModules.map((item) => {
                const isItemActive = activeTab === item.id;
                const ItemIcon = item.icon;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onSelectTab(item.id);
                      onClose();
                    }}
                    className={`w-full p-3.5 rounded-2xl flex items-start gap-3.5 transition-all text-start border min-h-[56px] ${
                      isItemActive
                        ? 'bg-primary/10 dark:bg-secondary/15 border-primary/40 dark:border-secondary/40 text-primary dark:text-secondary shadow-sm'
                        : 'bg-white dark:bg-slate-800/80 border-gray-200 dark:border-slate-700/80 hover:bg-gray-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl shrink-0 ${
                      isItemActive 
                        ? 'bg-primary text-white dark:bg-secondary dark:text-slate-900 shadow-sm' 
                        : 'bg-gray-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}>
                      <ItemIcon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs sm:text-sm font-bold truncate">
                          {isFa ? item.labelFa : item.labelEn}
                        </span>
                        {item.badge !== undefined && item.badge > 0 && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500 text-white shrink-0">
                            {item.badge}
                          </span>
                        )}
                        {isItemActive && (
                          <Check className="w-4 h-4 text-primary dark:text-secondary shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-1">
                        {isFa ? item.descFa : item.descEn}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            // Collapsible Categorized Accordion List
            categories.map((cat) => {
              const catModules = modules.filter(m => m.category === cat.id);
              if (catModules.length === 0) return null;

              const isExpanded = expandedCategories[cat.id];
              const isAnyActive = catModules.some(m => m.id === activeTab);
              const CatIcon = cat.icon;
              const catBadgeCount = catModules.reduce((acc, m) => acc + (m.badge || 0), 0);

              return (
                <div
                  key={cat.id}
                  className="rounded-2xl border border-gray-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-850/60 shadow-xs"
                >
                  {/* Category Header Accordion Trigger (WCAG ≥ 48px target) */}
                  <button
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    className={`flex items-center justify-between w-full p-4 text-start transition-colors min-h-[56px] ${
                      isAnyActive
                        ? 'bg-gray-50/80 dark:bg-slate-800/80'
                        : 'hover:bg-gray-50/60 dark:hover:bg-slate-800/40'
                    }`}
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl border ${cat.bgAccent} shrink-0`}>
                        <CatIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                            {isFa ? cat.titleFa : cat.titleEn}
                          </h3>
                          {catBadgeCount > 0 && (
                            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-red-500 text-white animate-pulse">
                              {catBadgeCount}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {isFa ? cat.subtitleFa : cat.subtitleEn}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-gray-100 dark:bg-slate-800 text-slate-500">
                        {catModules.length}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-primary dark:text-secondary' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {/* Collapsible Vertical Module List */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 dark:border-slate-800 bg-gray-50/40 dark:bg-slate-900/60 p-2 space-y-1.5">
                      {catModules.map((item) => {
                        const isItemActive = activeTab === item.id;
                        const ItemIcon = item.icon;

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              onSelectTab(item.id);
                              onClose();
                            }}
                            className={`w-full p-3 rounded-xl flex items-start gap-3 transition-all text-start min-h-[50px] border ${
                              isItemActive
                                ? 'bg-primary/10 dark:bg-secondary/15 border-primary/30 dark:border-secondary/30 text-primary dark:text-secondary font-bold shadow-xs'
                                : 'border-transparent bg-white dark:bg-slate-800/80 hover:bg-gray-100 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <div className={`p-2 rounded-lg shrink-0 ${
                              isItemActive
                                ? 'bg-primary text-white dark:bg-secondary dark:text-slate-900'
                                : 'bg-gray-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                            }`}>
                              <ItemIcon className="w-4 h-4" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-xs sm:text-sm font-bold truncate">
                                  {isFa ? item.labelFa : item.labelEn}
                                </span>
                                {item.badge !== undefined && item.badge > 0 && (
                                  <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-red-500 text-white shrink-0">
                                    {item.badge}
                                  </span>
                                )}
                                {isItemActive && (
                                  <Check className="w-4 h-4 text-primary dark:text-secondary shrink-0" />
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
                  )}
                </div>
              );
            })
          )}

          {/* User Persona & Role Info Section in Drawer */}
          {userProfile && (
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <ExecutiveMemberIdentity
                    name={userProfile.displayName}
                    nameFa={userProfile.displayNameFa}
                    role={userProfile.role}
                    photoUrl={userProfile.avatarUrl}
                    size="sm"
                    showBadge={false}
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      {isFa && userProfile.displayNameFa ? userProfile.displayNameFa : userProfile.displayName}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      {isFa && userProfile.titleFa ? userProfile.titleFa : userProfile.title} &bull; <span className="font-mono">{userProfile.employeeId}</span>
                    </p>
                  </div>
                </div>

                {/* Persona switch button for Admins */}
                {(isSuperAdmin || userProfile.role === 'executive') && (
                  <button
                    type="button"
                    onClick={() => setShowPersonaSwitch(!showPersonaSwitch)}
                    className="p-2 rounded-xl text-primary dark:text-secondary hover:bg-primary/10 dark:hover:bg-secondary/15 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center text-xs font-bold"
                    title={isFa ? 'تغییر نقش شبیه‌ساز' : 'Switch Persona'}
                  >
                    <Users className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Persona Switch List */}
              {showPersonaSwitch && (
                <div className="p-2 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 max-h-48 overflow-y-auto space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 px-2 py-1">
                    {isFa ? 'انتخاب نقش سازمانی جهت ممیزی:' : 'Select Persona for Audit:'}
                  </p>
                  {allUsers.map((member, idx) => (
                    <button
                      key={`drawer-persona-${member.uid}-${idx}`}
                      type="button"
                      onClick={() => {
                        switchPersona(member.uid);
                        setShowPersonaSwitch(false);
                      }}
                      className={`w-full p-2 rounded-xl flex items-center justify-between text-start text-xs transition-colors min-h-[44px] ${
                        userProfile.uid === member.uid
                          ? 'bg-primary/10 dark:bg-secondary/20 text-primary dark:text-secondary font-bold'
                          : 'hover:bg-gray-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span className="truncate">{isFa && member.displayNameFa ? member.displayNameFa : member.displayName}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-gray-100 dark:bg-slate-800 shrink-0">
                        {member.role}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Drawer Bottom Actions */}
        <div className="p-4 border-t border-gray-200 dark:border-slate-800 bg-gray-50/90 dark:bg-slate-850/80 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={logout}
            className="px-4 py-2.5 rounded-xl border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 text-xs font-bold transition-colors flex items-center gap-1.5 min-h-[48px]"
          >
            <LogOut className="w-4 h-4" />
            <span>{isFa ? 'خروج از حساب' : 'Logout'}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark dark:bg-secondary dark:hover:bg-secondary-dark text-white dark:text-slate-900 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 min-h-[48px] shadow-sm"
          >
            <span>{isFa ? 'بستن منو' : 'Close Drawer'}</span>
            <ChevronRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
          </button>
        </div>

      </div>
    </div>
  );
};
