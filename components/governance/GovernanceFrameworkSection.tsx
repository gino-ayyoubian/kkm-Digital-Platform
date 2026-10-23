import * as React from 'react';
import { useLanguage } from '../../LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import {
  COMPLEMENTARY_ROLES,
  LIFECYCLE_RACI_MATRIX,
  SECURITY_CLASSIFICATION_TIERS,
  OPERATIONAL_WORKFLOW_PHASES,
  STRUCTURAL_DESIGN_PRINCIPLES,
  ComplementaryRole,
  RACIEntry,
  SecurityClassificationTier
} from '../../data/governanceData';
import { 
  ShieldCheck, Award, Briefcase, FileText, Lock, Users, 
  CheckCircle2, ArrowRight, UserPlus, Phone, Filter, 
  ExternalLink, Layers, GitBranch, AlertTriangle, Eye, Info
} from 'lucide-react';
import { Page } from '../../types';

interface GovernanceFrameworkSectionProps {
  onNavigate?: (page: Page) => void;
  defaultTab?: 'complementary' | 'raci' | 'security' | 'workflow';
  compact?: boolean;
}

export const GovernanceFrameworkSection: React.FC<GovernanceFrameworkSectionProps> = ({
  onNavigate,
  defaultTab = 'complementary',
  compact = false
}) => {
  const { isFa, direction } = useLanguage();
  const [activeTab, setActiveTab] = React.useState<'complementary' | 'raci' | 'security' | 'workflow'>(defaultTab);
  const [raciRoleFilter, setRaciRoleFilter] = React.useState<string>('all');
  const [selectedRoleForDetail, setSelectedRoleForDetail] = React.useState<ComplementaryRole | null>(null);

  // Filtered RACI entries if role filter is set
  const filteredRaciEntries = React.useMemo(() => {
    if (raciRoleFilter === 'all') return LIFECYCLE_RACI_MATRIX;
    return LIFECYCLE_RACI_MATRIX.filter(entry => {
      switch (raciRoleFilter) {
        case 'ceo': return entry.ceo.includes('A') || entry.ceo.includes('R');
        case 'cto': return entry.cto.includes('A') || entry.cto.includes('R');
        case 'coo': return entry.coo.includes('A') || entry.coo.includes('R');
        case 'cfo': return entry.cfo.includes('A') || entry.cfo.includes('R');
        case 'ipLegal': return entry.ipLegal.includes('A') || entry.ipLegal.includes('R');
        case 'qaQc': return entry.qaQc.includes('A') || entry.qaQc.includes('R');
        case 'hr': return entry.hr.includes('A') || entry.hr.includes('R');
        default: return true;
      }
    });
  }, [raciRoleFilter]);

  const getRaciBadge = (value: string) => {
    if (value === 'A / R') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold font-mono bg-purple-100 text-purple-800 dark:bg-purple-950/70 dark:text-purple-300 border border-purple-300 dark:border-purple-800" title="Accountable & Responsible">
          A / R
        </span>
      );
    }
    switch (value) {
      case 'A':
        return (
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold font-mono bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 shadow-2xs" title="Accountable (پاسخگو و تاییدکننده)">
            A
          </span>
        );
      case 'R':
        return (
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold font-mono bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 shadow-2xs" title="Responsible (مسئول انجام)">
            R
          </span>
        );
      case 'C':
        return (
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold font-mono bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-500/30 shadow-2xs" title="Consulted (مشاور)">
            C
          </span>
        );
      case 'I':
        return (
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700" title="Informed (آگاه‌شونده)">
            I
          </span>
        );
      default:
        return <span>{value}</span>;
    }
  };

  return (
    <section className="w-full py-12 bg-slate-50/70 dark:bg-slate-950 transition-colors" dir={direction}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary dark:text-secondary text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4 text-primary dark:text-secondary" />
            <span>{isFa ? 'چارچوب حاکمیت شرکتی و ساختار سازمانی KKM' : 'KKM Corporate Governance & RACI Framework'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-slate-900 dark:text-white tracking-tight mb-3">
            {isFa ? 'تفکیک لایه حاکمیت از اجرا و ارتقای ساختاری' : 'Two-Layer Sovereign Governance & Industrial RACI'}
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {isFa 
              ? 'ساختار نوین سازمانی گروه KKM بر پایه تفکیک کامل لایه حاکمیت شرکتی (Governance) از لایه مدیریت اجرایی (Execution)، استقلال واحدهای نظارتی، مهار ریسک‌های صنعتی عمیق و شفافیت ماتریس RACI در چرخه ۱۰ مرحله‌ای تدوین شده است.'
              : 'The modernized KKM organizational architecture rigorously segregates corporate sovereign oversight from executive operational commands, instituting 8 specialized complementary functions and a 10-gate RACI governance matrix.'}
          </p>
        </div>

        {/* 4 Fundamental Structural Design Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {STRUCTURAL_DESIGN_PRINCIPLES.map((principle) => (
            <div 
              key={principle.number}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-amber-400/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono font-bold text-sm flex items-center justify-center border border-amber-500/20">
                    0{principle.number}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5 leading-snug">
                  {isFa ? principle.titleFa : principle.titleEn}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {isFa ? principle.descFa : principle.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Tab Switcher */}
        <div className="flex items-center justify-center mb-8">
          <div className="p-1 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs inline-flex items-center gap-1 flex-wrap justify-center">
            
            <button
              onClick={() => setActiveTab('complementary')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'complementary'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-secondary'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>{isFa ? '۸ کارکرد کلیدی و تکمیلی' : '8 Complementary Roles'}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                activeTab === 'complementary' ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}>
                8
              </span>
            </button>

            <button
              onClick={() => setActiveTab('raci')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'raci'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-secondary'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>{isFa ? 'ماتریس RACI در ۱۰ مرحله' : '10-Gate RACI Matrix'}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                activeTab === 'raci' ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}>
                10
              </span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'security'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-secondary'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isFa ? 'سطوح ۴ گانه امنیت و دسترسی' : '4-Tier Security & Access'}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                activeTab === 'security' ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}>
                L1-L4
              </span>
            </button>

            <button
              onClick={() => setActiveTab('workflow')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'workflow'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-secondary'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isFa ? 'گردش کار ۴ فاز اجرایی' : '4-Phase Operational Flow'}</span>
            </button>
          </div>
        </div>

        {/* Tab 1: 8 Complementary Functions */}
        {activeTab === 'complementary' && (
          <div className="space-y-6 animate-fade-in">
            {/* Banner overview of complementary roles */}
            <div className="p-4 sm:p-6 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {isFa ? 'پوشش کامل الزامات استاندارد صنعتی و رفع نواقص ساختاری' : 'Industrial Standards & Risk Mitigation Architecture'}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    {isFa 
                      ? 'مدیریت HSE با انتصاب سید جاسم حسینی فعال گردیده و ۷ عنوان شغلی کلیدی دیگر در واحد جذب و استخدام سازمان مفتوح می‌باشند.'
                      : 'HSE & Environment is actively headed by Seyed Jassem Hosseini; the remaining 7 complementary functions are active open executive positions.'}
                  </p>
                </div>
              </div>

              {onNavigate && (
                <button
                  onClick={() => onNavigate(Page.Careers)}
                  className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>{isFa ? 'مشاهده آگهی‌های استخدام' : 'View Executive Openings'}</span>
                </button>
              )}
            </div>

            {/* Grid of 8 Complementary Roles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
              {COMPLEMENTARY_ROLES.map((role) => {
                const isAssigned = role.status === 'assigned';
                return (
                  <div
                    key={role.id}
                    className={`p-6 rounded-3xl bg-white dark:bg-slate-900 border transition-all duration-300 flex flex-col justify-between relative overflow-hidden shadow-sm hover:shadow-xl ${
                      isAssigned 
                        ? 'border-emerald-500/40 hover:border-emerald-500' 
                        : 'border-slate-200/90 dark:border-slate-800 hover:border-amber-400/50'
                    }`}
                  >
                    {/* Top status badge */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border shadow-2xs ${
                        isAssigned
                          ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30'
                      }`}>
                        {isAssigned ? <CheckCircle2 className="w-3 h-3 text-emerald-500" /> : <UserPlus className="w-3 h-3 text-amber-500" />}
                        <span>{isAssigned ? (isFa ? 'دارای انتصاب سازمانی' : 'Active Head') : (isFa ? 'پوزیشن باز استخدامی' : 'Open Executive Position')}</span>
                      </span>

                      {role.extension && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
                          <Phone className="w-3 h-3 text-emerald-500" />
                          <span>Ext: {role.extension}</span>
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-snug mb-1">
                        {isFa ? role.titleFa : role.titleEn}
                      </h3>

                      {/* Bilingual subheader */}
                      <p className="text-xs font-medium text-slate-400 dark:text-slate-400 mb-3">
                        {isFa ? role.titleEn : role.titleFa}
                      </p>

                      {/* Assigned personnel or recruitment indicator */}
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 mb-3">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-0.5">
                          {isFa ? 'وضعیت انتصاب و راهبری:' : 'Leadership Assignment:'}
                        </div>
                        {isAssigned ? (
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900 dark:text-white">
                              {isFa ? role.assignedPersonnelFa : role.assignedPersonnelEn}
                            </span>
                            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                              {isFa ? 'مدیر بهداشت، ایمنی و محیط زیست' : 'Head of HSE'}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-amber-600 dark:text-amber-400">
                              {isFa ? 'در مرحله جذب شایسته‌گزینی نخبگان' : 'Recruiting Senior Talent'}
                            </span>
                            {onNavigate && (
                              <button
                                onClick={() => onNavigate(Page.Careers)}
                                className="text-[11px] font-bold text-primary dark:text-secondary hover:underline inline-flex items-center gap-1 cursor-pointer"
                              >
                                <span>{isFa ? 'ارسال رزومه' : 'Apply'}</span>
                                <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                              </button>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Rationale & Necessity */}
                      <div className="space-y-1 mb-3">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                          {isFa ? 'علت و ضرورت ایجاد:' : 'Rationale & Industrial Imperative:'}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {isFa ? role.reasonFa : role.reasonEn}
                        </p>
                      </div>
                    </div>

                    {/* Reporting line footer */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 font-mono">
                        {isFa ? 'خط گزارش‌دهی:' : 'Reporting Line:'}
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {isFa ? role.reportingFa : role.reportingEn}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: 10-Gate Lifecycle RACI Matrix */}
        {activeTab === 'raci' && (
          <div className="space-y-6 animate-fade-in">
            {/* Filter by role & RACI Legend */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
              
              {/* Role Filter Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold uppercase text-slate-400 flex items-center gap-1.5 mr-1 rtl:mr-0 rtl:ml-1">
                  <Filter className="w-3.5 h-3.5 text-primary" />
                  <span>{isFa ? 'فیلتر نقش اجرایی:' : 'Filter Role:'}</span>
                </span>
                {[
                  { key: 'all', labelEn: 'All Roles', labelFa: 'همه نقش‌ها' },
                  { key: 'ceo', labelEn: 'CEO', labelFa: 'مدیرعامل' },
                  { key: 'cto', labelEn: 'CTO', labelFa: 'معاونت فناوری' },
                  { key: 'coo', labelEn: 'COO', labelFa: 'معاونت اجرایی' },
                  { key: 'cfo', labelEn: 'CFO', labelFa: 'معاونت مالی' },
                  { key: 'ipLegal', labelEn: 'IP/Legal', labelFa: 'دفتر IP و حقوقی' },
                  { key: 'qaQc', labelEn: 'QA/QC', labelFa: 'بازرسی فنی' },
                ].map(item => (
                  <button
                    key={item.key}
                    onClick={() => setRaciRoleFilter(item.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      raciRoleFilter === item.key
                        ? 'bg-primary text-white shadow-xs font-bold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {isFa ? item.labelFa : item.labelEn}
                  </button>
                ))}
              </div>

              {/* Standard Notation Legend */}
              <div className="flex items-center gap-3 text-xs flex-wrap font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center text-[10px] border border-emerald-500/30">
                    R
                  </span>
                  <span className="text-slate-600 dark:text-slate-300">{isFa ? 'مسئول انجام' : 'Responsible'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold flex items-center justify-center text-[10px] border border-amber-500/30">
                    A
                  </span>
                  <span className="text-slate-600 dark:text-slate-300">{isFa ? 'پاسخگو و تأییدکننده' : 'Accountable'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded bg-sky-500/15 text-sky-700 dark:text-sky-300 font-bold flex items-center justify-center text-[10px] border border-sky-500/30">
                    C
                  </span>
                  <span className="text-slate-600 dark:text-slate-300">{isFa ? 'مشاور' : 'Consulted'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold flex items-center justify-center text-[10px] border border-slate-200 dark:border-slate-700">
                    I
                  </span>
                  <span className="text-slate-600 dark:text-slate-300">{isFa ? 'آگاه‌شونده' : 'Informed'}</span>
                </div>
              </div>
            </div>

            {/* Matrix Table */}
            <div className="overflow-x-auto rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md">
              <table className="w-full text-start text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100/80 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                    <th className="py-4 px-4 text-start font-mono uppercase tracking-wider w-16">
                      {isFa ? 'دروازه' : 'Gate'}
                    </th>
                    <th className="py-4 px-4 text-start min-w-[220px]">
                      {isFa ? 'مرحله چرخه حیات و خروجی کلیدی' : 'Lifecycle Stage & Milestone Objective'}
                    </th>
                    <th className="py-4 px-3 text-center min-w-[90px]">
                      <div className="font-bold">{isFa ? 'مدیرعامل (CEO)' : 'CEO'}</div>
                      <div className="text-[10px] font-normal text-slate-400">
                        {isFa ? 'ایوبیان مرکزی' : 'Gino Ayyoubian'}
                      </div>
                    </th>
                    <th className="py-4 px-3 text-center min-w-[90px]">
                      <div className="font-bold">{isFa ? 'معاونت فناوری (CTO)' : 'CTO'}</div>
                      <div className="text-[10px] font-normal text-slate-400">
                        {isFa ? 'جراحیان' : 'Jarrahian'}
                      </div>
                    </th>
                    <th className="py-4 px-3 text-center min-w-[90px]">
                      <div className="font-bold">{isFa ? 'معاونت اجرایی (COO)' : 'COO'}</div>
                      <div className="text-[10px] font-normal text-slate-400">
                        {isFa ? 'یارویسی' : 'Yarveisi'}
                      </div>
                    </th>
                    <th className="py-4 px-3 text-center min-w-[90px]">
                      <div className="font-bold">{isFa ? 'معاونت مالی (CFO)' : 'CFO'}</div>
                      <div className="text-[10px] font-normal text-slate-400">
                        {isFa ? 'ایمانی' : 'Imani'}
                      </div>
                    </th>
                    <th className="py-4 px-3 text-center min-w-[90px]">
                      <div className="font-bold">{isFa ? 'دفتر IP و حقوقی' : 'IP / Legal'}</div>
                      <div className="text-[10px] font-normal text-slate-400">
                        {isFa ? 'ذات‌عجم' : 'Zatajam'}
                      </div>
                    </th>
                    <th className="py-4 px-3 text-center min-w-[90px]">
                      <div className="font-bold">{isFa ? 'بازرسی فنی (QA/QC)' : 'QA / QC'}</div>
                      <div className="text-[10px] font-normal text-slate-400">
                        {isFa ? 'شریفی' : 'Sharifi'}
                      </div>
                    </th>
                    <th className="py-4 px-3 text-center min-w-[90px]">
                      <div className="font-bold">{isFa ? 'سرمایه انسانی (HR)' : 'HR / Contracts'}</div>
                      <div className="text-[10px] font-normal text-slate-400">
                        {isFa ? 'بغدادچی' : 'Baghdadchi'}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredRaciEntries.map((row) => (
                    <tr 
                      key={row.gate}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-850/60 transition-colors"
                    >
                      {/* Gate Number */}
                      <td className="py-4 px-4 font-mono font-bold text-slate-500 dark:text-slate-400">
                        <span className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                          {row.gate}
                        </span>
                      </td>

                      {/* Stage Name & Objective */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">
                          {isFa ? row.stageFa : row.stageEn}
                        </div>
                        <div className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                          {isFa ? row.objectiveFa : row.objectiveEn}
                        </div>
                      </td>

                      {/* Role Badges */}
                      <td className="py-4 px-3 text-center">{getRaciBadge(row.ceo)}</td>
                      <td className="py-4 px-3 text-center">{getRaciBadge(row.cto)}</td>
                      <td className="py-4 px-3 text-center">{getRaciBadge(row.coo)}</td>
                      <td className="py-4 px-3 text-center">{getRaciBadge(row.cfo)}</td>
                      <td className="py-4 px-3 text-center">{getRaciBadge(row.ipLegal)}</td>
                      <td className="py-4 px-3 text-center">{getRaciBadge(row.qaQc)}</td>
                      <td className="py-4 px-3 text-center">{getRaciBadge(row.hr)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: 4-Tier Information Security Classification */}
        {activeTab === 'security' && (
          <div className="space-y-6 animate-fade-in">
            {/* Security Architecture Header */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">
                    {isFa ? 'سامانه کنترل دسترسی ۴ سطحی KKM بر مبنای حاکمیت اطلاعات' : 'KKM 4-Tier Security Classification & Cryptographic Controls'}
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {isFa 
                      ? 'تفکیک محتوا از اسناد عمومی سطح ۱ تا اسرار تجاری و ادعاهای ثبت اختراع سطح ۴ با پروتکل رمزنگاری Zero-Trust.'
                      : 'Rigorous data categorization from public disclaimers up to air-gapped sovereign IP and reservoir trade secrets.'}
                  </p>
                </div>
              </div>
              
              <div className="text-[11px] font-mono text-secondary px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 whitespace-nowrap">
                ISO 27001 / IEC 62443 ALIGNED
              </div>
            </div>

            {/* 4 Cards for Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {SECURITY_CLASSIFICATION_TIERS.map((tier) => {
                const borderColors: Record<string, string> = {
                  emerald: 'border-emerald-500/40 hover:border-emerald-500',
                  sky: 'border-sky-500/40 hover:border-sky-500',
                  amber: 'border-amber-500/40 hover:border-amber-500',
                  rose: 'border-rose-500/40 hover:border-rose-500',
                };
                const badgeBgs: Record<string, string> = {
                  emerald: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
                  sky: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/30',
                  amber: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30',
                  rose: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30',
                };

                return (
                  <div
                    key={tier.level}
                    className={`p-6 rounded-3xl bg-white dark:bg-slate-900 border transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between ${
                      borderColors[tier.badgeColor] || 'border-slate-200'
                    }`}
                  >
                    <div>
                      {/* Tier Code & Level */}
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${
                          badgeBgs[tier.badgeColor]
                        }`}>
                          <Lock className="w-3 h-3" />
                          <span>{tier.classificationCode}</span>
                        </span>

                        <span className="text-[11px] font-mono text-slate-400">
                          {isFa ? `سطح امنیتی ۰${tier.level}` : `Security Level 0${tier.level}`}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-2">
                        {isFa ? tier.titleFa : tier.titleEn}
                      </h3>

                      {/* Scope */}
                      <div className="space-y-1 mb-4">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                          {isFa ? 'دامنه و مصادیق اسناد:' : 'Scope & Document Classes:'}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {isFa ? tier.scopeFa : tier.scopeEn}
                        </p>
                      </div>

                      {/* Authorized Roles */}
                      <div className="space-y-1.5 mb-4">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                          {isFa ? 'نقش‌های مجاز به دسترسی:' : 'Authorized Access Roles:'}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {(isFa ? tier.authorizedRolesFa : tier.authorizedRolesEn).map((role, idx) => (
                            <span 
                              key={idx}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-medium border border-slate-200/60 dark:border-slate-700/60"
                            >
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Security Controls */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">
                        {isFa ? 'کنترل‌ها و تدابیر حفاظتی:' : 'Security & Cryptographic Controls:'}
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed font-mono">
                        {isFa ? tier.securityControlsFa : tier.securityControlsEn}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 4: 4-Phase Operational Workflow */}
        {activeTab === 'workflow' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {OPERATIONAL_WORKFLOW_PHASES.map((wf) => (
                <div
                  key={wf.phase}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary dark:text-secondary font-mono font-bold text-sm flex items-center justify-center border border-primary/20 mb-4">
                      0{wf.phase}
                    </div>

                    <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mb-3 leading-snug">
                      {isFa ? wf.titleFa : wf.titleEn}
                    </h3>

                    <ul className="space-y-2 mb-4">
                      {(isFa ? wf.stepsFa : wf.stepsEn).map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                    <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                      {isFa ? 'مسئول راهبری فاز:' : 'Phase Directorate Lead:'}
                    </div>
                    <div className="font-semibold text-primary dark:text-secondary mt-0.5">
                      {isFa ? wf.leadFa : wf.leadEn}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default GovernanceFrameworkSection;
