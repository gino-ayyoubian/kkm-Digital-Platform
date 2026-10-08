import React from 'react';
import { useLanguage } from '../../LanguageContext';
import { 
  ChevronRight, ChevronLeft, Home, LayoutDashboard, 
  PhoneCall, Network, Shield, ArrowRight, ArrowLeft 
} from 'lucide-react';
import type { NavModuleItem, ModuleCategory } from './PortalHeader';

interface PortalBreadcrumbProps {
  activeTab: string;
  onNavigateTab: (tabId: string) => void;
  modules: NavModuleItem[];
  subItemTitle?: string;
  onOpenDrawer?: () => void;
}

export const PortalBreadcrumb: React.FC<PortalBreadcrumbProps> = ({
  activeTab,
  onNavigateTab,
  modules,
  subItemTitle,
  onOpenDrawer,
}) => {
  const { isFa, direction } = useLanguage();
  const isRtl = direction === 'rtl';
  const SeparatorIcon = isRtl ? ChevronLeft : ChevronRight;

  const currentModule = modules.find(m => m.id === activeTab) || modules[0];
  const ModuleIcon = currentModule?.icon || LayoutDashboard;

  // Category mapping
  const categoryInfo: Record<ModuleCategory, { labelFa: string; labelEn: string; icon: React.ComponentType<{ className?: string }>; color: string }> = {
    operations: {
      labelFa: 'عملیات و کارتابل',
      labelEn: 'Operations & Desk',
      icon: LayoutDashboard,
      color: 'text-blue-600 dark:text-blue-400',
    },
    communications: {
      labelFa: 'تلفن ابری و ارتباطات',
      labelEn: 'Telephony & PBX',
      icon: PhoneCall,
      color: 'text-emerald-600 dark:text-emerald-400',
    },
    governance: {
      labelFa: 'حاکمیت و سازمان',
      labelEn: 'Governance & Org',
      icon: Network,
      color: 'text-purple-600 dark:text-purple-400',
    },
  };

  const currentCategory = categoryInfo[currentModule.category] || categoryInfo.operations;
  const CategoryIcon = currentCategory.icon;

  return (
    <nav 
      aria-label={isFa ? 'مسیر راهنمای پرتال' : 'Portal Breadcrumbs'}
      className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs py-2 px-3 sm:px-4 mb-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 shadow-xs"
    >
      {/* Root 1: Portal Home */}
      <button
        type="button"
        onClick={() => onNavigateTab('dashboard')}
        className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-secondary font-medium transition-colors p-1 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary min-h-[32px]"
        title={isFa ? 'بازگشت به میز کار پرتال' : 'Return to Portal Dashboard'}
      >
        <Home className="w-3.5 h-3.5" />
        <span className="hidden xs:inline">{isFa ? 'پرتال سازمانی' : 'Enterprise Portal'}</span>
      </button>

      <SeparatorIcon className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 shrink-0" aria-hidden="true" />

      {/* Level 2: Functional Domain / Category */}
      <button
        type="button"
        onClick={onOpenDrawer}
        className="flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-secondary font-semibold transition-colors p-1 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary min-h-[32px]"
        title={isFa ? 'مشاهده ماژول‌های این دسته در منو' : 'View category modules'}
      >
        <CategoryIcon className={`w-3.5 h-3.5 ${currentCategory.color} shrink-0`} />
        <span>{isFa ? currentCategory.labelFa : currentCategory.labelEn}</span>
      </button>

      <SeparatorIcon className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 shrink-0" aria-hidden="true" />

      {/* Level 3: Active Module Item */}
      <div 
        className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-700/50 px-2.5 py-1 rounded-lg min-h-[32px]"
        aria-current={subItemTitle ? undefined : 'page'}
      >
        <ModuleIcon className="w-3.5 h-3.5 text-primary dark:text-secondary shrink-0" />
        <span className="truncate max-w-[160px] sm:max-w-none">
          {isFa ? currentModule.labelFa : currentModule.labelEn}
        </span>
        {currentModule.badge !== undefined && currentModule.badge > 0 && (
          <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-red-500 text-white animate-pulse">
            {currentModule.badge}
          </span>
        )}
      </div>

      {/* Optional Level 4: Sub-Item Title (e.g., Detail Dossier or Dialog) */}
      {subItemTitle && (
        <>
          <SeparatorIcon className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 shrink-0" aria-hidden="true" />
          <span 
            className="font-bold text-primary dark:text-secondary truncate max-w-[140px] sm:max-w-xs"
            aria-current="page"
          >
            {subItemTitle}
          </span>
        </>
      )}
    </nav>
  );
};
