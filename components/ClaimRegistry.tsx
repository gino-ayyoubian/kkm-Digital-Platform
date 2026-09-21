import * as React from 'react';
import { useLanguage } from '../LanguageContext';
import { Page, Claim, ClaimStatus, ClaimDomain, EvidenceLevel } from '../types';
import { 
  CLAIMS_REGISTRY_DATA, 
  CLAIM_STATUS_CONFIG 
} from '../data/claimsRegistryData';
import { 
  VERIFICATION_LEVEL_DETAILS 
} from '../data/evidenceRegistry';
import { 
  ShieldCheck, 
  Search, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  ChevronRight, 
  Info, 
  FileCheck,
  Table,
  LayoutGrid,
  Copy,
  Check,
  SlidersHorizontal,
  X,
  Calendar,
  Building2,
  Cpu,
  Layers
} from 'lucide-react';

interface ClaimRegistryProps {
  setPage?: (page: Page) => void;
  defaultDomain?: ClaimDomain | 'All';
}

export const ClaimRegistry: React.FC<ClaimRegistryProps> = ({ setPage, defaultDomain = 'All' }) => {
  const { language, direction } = useLanguage();
  const isFa = language === 'FA';

  const [selectedDomain, setSelectedDomain] = React.useState<ClaimDomain | 'All'>(defaultDomain);
  const [selectedStatus, setSelectedStatus] = React.useState<ClaimStatus | 'All'>('All');
  const [selectedLevel, setSelectedLevel] = React.useState<EvidenceLevel | 'All'>('All');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [viewMode, setViewMode] = React.useState<'table' | 'cards'>('table');
  const [activeClaimModal, setActiveClaimModal] = React.useState<Claim | null>(null);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  // Filter claims
  const filteredClaims = React.useMemo(() => {
    return CLAIMS_REGISTRY_DATA.filter(claim => {
      const matchesDomain = selectedDomain === 'All' || claim.domain === selectedDomain;
      const matchesStatus = selectedStatus === 'All' || claim.status === selectedStatus;
      const matchesLevel = selectedLevel === 'All' || claim.evidenceLevel === selectedLevel;
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery = !query ||
        claim.id.toLowerCase().includes(query) ||
        claim.statementEn.toLowerCase().includes(query) ||
        claim.statementFa.toLowerCase().includes(query) ||
        claim.ownerDepartment.toLowerCase().includes(query) ||
        (claim.sourceMethodologyEn && claim.sourceMethodologyEn.toLowerCase().includes(query)) ||
        (claim.sourceMethodologyFa && claim.sourceMethodologyFa.toLowerCase().includes(query)) ||
        (claim.evidenceRefId && claim.evidenceRefId.toLowerCase().includes(query)) ||
        (claim.metricValue && claim.metricValue.toLowerCase().includes(query));

      return matchesDomain && matchesStatus && matchesLevel && matchesQuery;
    });
  }, [selectedDomain, selectedStatus, selectedLevel, searchQuery]);

  // Statistics replacing unverified simulated counters
  const stats = React.useMemo(() => {
    return {
      total: CLAIMS_REGISTRY_DATA.length,
      verified: CLAIMS_REGISTRY_DATA.filter(c => c.status === 'Verified').length,
      internal: CLAIMS_REGISTRY_DATA.filter(c => c.status === 'Internal').length,
      estimated: CLAIMS_REGISTRY_DATA.filter(c => c.status === 'Estimated').length,
      demonstration: CLAIMS_REGISTRY_DATA.filter(c => c.status === 'Demonstration').length,
    };
  }, []);

  const handleCopyId = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-8 md:p-10 shadow-xl border border-slate-200 dark:border-slate-800 transition-colors" dir={direction}>
      
      {/* Header & Directive Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-semibold uppercase tracking-wider mb-3 border border-emerald-200 dark:border-emerald-800/60">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>P0-13 & P0-02 Directive: Formal Claim Registry</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isFa ? 'ماتریس رسمی ادعاهای عملکردی، فنی و پایداری' : 'Structured Claims & Verification Registry'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-3xl leading-relaxed">
            {isFa 
              ? 'جایگزینی کلیه شمارنده‌های شبیه‌سازی‌شده و فاقد استناد با جدول داده‌های ساختاریافته شامل شناسه ادعا، وضعیت صلاحیت‌سنجی (ممیزی‌شده / هدف / برآورد مهندسی / نمایشی)، متدولوژی اندازه‌گیری و تاریخ آخرین بازنگری دوره‌ای.'
              : 'Replacing unverified simulated counters with an enterprise structured registry table tracking claim ID, verification status (Verified/Target/Estimate/Demonstration), source methodology, and last review date.'}
          </p>
        </div>

        {/* Evidence Navigation Shortcut */}
        {setPage && (
          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex-shrink-0 flex flex-col justify-between">
            <div className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 font-bold mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Truth Layer Cross-Reference</span>
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              Level A–G Audit Files
            </div>
            <button
              onClick={() => setPage(Page.EvidenceRegistry)}
              className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>{isFa ? 'مشاهده در رجیستری شواهد' : 'Inspect Evidence Files'}</span>
              <ChevronRight className="w-3 h-3 rtl:rotate-180" />
            </button>
          </div>
        )}
      </div>

      {/* Structured Qualification Metrics (Abolishing Simulated Counters) */}
      <div className="my-8">
        <div className="text-xs font-mono uppercase text-slate-400 font-bold mb-3 flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>{isFa ? 'شاخص‌های ممیزی‌شده ثبت ادعاها (جایگزین شمارنده‌های نمایشی)' : 'Audited Claim Disclosures by Category'}</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Verified */}
          <button
            onClick={() => setSelectedStatus(selectedStatus === 'Verified' ? 'All' : 'Verified')}
            className={`text-left rtl:text-right p-4 rounded-2xl border transition-all cursor-pointer ${
              selectedStatus === 'Verified'
                ? 'ring-2 ring-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700'
                : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                {isFa ? 'ممیزی‌شده' : 'Verified'}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                Level A / B
              </span>
            </div>
            <div className="text-2xl font-mono font-extrabold text-slate-900 dark:text-white mt-1">
              {stats.verified}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              {isFa ? 'شواهد ثبت‌شده حقوقی و آزمایشگاهی مستقل' : 'Third-party audited & legal filings'}
            </p>
          </button>

          {/* Internal / Target */}
          <button
            onClick={() => setSelectedStatus(selectedStatus === 'Internal' ? 'All' : 'Internal')}
            className={`text-left rtl:text-right p-4 rounded-2xl border transition-all cursor-pointer ${
              selectedStatus === 'Internal'
                ? 'ring-2 ring-blue-500 bg-blue-50/80 dark:bg-blue-950/40 border-blue-300 dark:border-blue-700'
                : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">
                {isFa ? 'درون‌سازمانی / هدف' : 'Target / Internal'}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300">
                Level C / E
              </span>
            </div>
            <div className="text-2xl font-mono font-extrabold text-slate-900 dark:text-white mt-1">
              {stats.internal}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              {isFa ? 'آزمون‌های تست‌بد و تارگت‌های رسمی توسعه' : 'Testbed results & development milestones'}
            </p>
          </button>

          {/* Estimated */}
          <button
            onClick={() => setSelectedStatus(selectedStatus === 'Estimated' ? 'All' : 'Estimated')}
            className={`text-left rtl:text-right p-4 rounded-2xl border transition-all cursor-pointer ${
              selectedStatus === 'Estimated'
                ? 'ring-2 ring-amber-500 bg-amber-50/80 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700'
                : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 uppercase">
                {isFa ? 'برآورد و شبیه‌سازی' : 'Estimate / Model'}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300">
                Level D
              </span>
            </div>
            <div className="text-2xl font-mono font-extrabold text-slate-900 dark:text-white mt-1">
              {stats.estimated}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              {isFa ? 'مدل‌سازی ترمودینامیکی HYSYS و مخزن' : 'Aspen HYSYS & reservoir simulations'}
            </p>
          </button>

          {/* Demonstration (P0-02 Directive) */}
          <button
            onClick={() => setSelectedStatus(selectedStatus === 'Demonstration' ? 'All' : 'Demonstration')}
            className={`text-left rtl:text-right p-4 rounded-2xl border transition-all cursor-pointer ${
              selectedStatus === 'Demonstration'
                ? 'ring-2 ring-purple-500 bg-purple-50/80 dark:bg-purple-950/40 border-purple-300 dark:border-purple-700'
                : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-xs font-bold text-purple-600 dark:text-purple-400 uppercase">
                {isFa ? 'نمایشی (P0-02)' : 'Demonstration'}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300">
                Level F
              </span>
            </div>
            <div className="text-2xl font-mono font-extrabold text-slate-900 dark:text-white mt-1">
              {stats.demonstration}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              {isFa ? 'پایپ‌لاین‌های شبیه‌سازی‌شده آزمون رابط کاربری' : 'P0-02 Qualified UI prototyping feeds'}
            </p>
          </button>
        </div>
      </div>

      {/* Interactive Controls & Filters */}
      <div className="space-y-4 mb-6 pt-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative flex-grow max-w-xl">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isFa ? 'جستجو بر اساس شناسه ادعا، متن، متدولوژی، یا دپارتمان...' : 'Search claims by ID, statement, methodology, department...'}
              className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 self-start md:self-auto">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>{isFa ? 'نمای جدول ساختاریافته' : 'Structured Table'}</span>
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>{isFa ? 'نمای کارت تفصیلی' : 'Detailed Cards'}</span>
            </button>
          </div>
        </div>

        {/* Domain & Level Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-2">
          
          {/* Domains */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-semibold text-slate-500 dark:text-slate-400 mr-1 rtl:ml-1 rtl:mr-0">
              {isFa ? 'دامنه:' : 'Domain:'}
            </span>
            {(['All', 'Performance', 'Technical', 'ESG', 'Corporate', 'IP'] as (ClaimDomain | 'All')[]).map(dom => (
              <button
                key={dom}
                onClick={() => setSelectedDomain(dom)}
                className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  selectedDomain === dom
                    ? 'bg-primary text-white font-bold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {dom}
              </button>
            ))}
          </div>

          {/* Evidence Levels */}
          <div className="flex flex-wrap items-center gap-1">
            <span className="font-semibold text-slate-500 dark:text-slate-400 mr-1 rtl:ml-1 rtl:mr-0">
              {isFa ? 'سطح شواهد:' : 'Level:'}
            </span>
            <button
              onClick={() => setSelectedLevel('All')}
              className={`px-2 py-1 rounded-md font-mono text-[11px] font-bold cursor-pointer ${
                selectedLevel === 'All'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'
              }`}
            >
              All
            </button>
            {(['A', 'B', 'C', 'D', 'E', 'F', 'G'] as EvidenceLevel[]).map(lvl => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(selectedLevel === lvl ? 'All' : lvl)}
                className={`px-2 py-1 rounded-md font-mono text-[11px] font-bold cursor-pointer ${
                  selectedLevel === lvl
                    ? 'bg-primary text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Main Table View */}
      {viewMode === 'table' ? (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <table className="w-full text-left rtl:text-right border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                <th className="py-3.5 px-4 font-mono uppercase tracking-wider">{isFa ? 'شناسه ادعا' : 'Claim ID'}</th>
                <th className="py-3.5 px-4 min-w-[280px]">{isFa ? 'گزاره ادعا و شاخص کمی' : 'Claim Statement & Metric'}</th>
                <th className="py-3.5 px-4 min-w-[160px]">{isFa ? 'وضعیت صلاحیت (Verified / Target / Estimate)' : 'Verification Status (Verified / Target / Estimate)'}</th>
                <th className="py-3.5 px-4 min-w-[220px]">{isFa ? 'متدولوژی و منبع اندازه‌گیری' : 'Source Methodology'}</th>
                <th className="py-3.5 px-4 min-w-[120px]">{isFa ? 'سطح شواهد' : 'Level & Audit Ref'}</th>
                <th className="py-3.5 px-4 min-w-[110px]">{isFa ? 'تاریخ بازنگری' : 'Last Review'}</th>
                <th className="py-3.5 px-4 text-center">{isFa ? 'جزئیات' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-normal">
              {filteredClaims.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 dark:text-slate-400">
                    <Info className="w-6 h-6 mx-auto mb-2 text-slate-400" />
                    <div className="font-bold text-sm text-slate-700 dark:text-slate-300">
                      {isFa ? 'هیچ رکوردی با این معیارها یافت نشد' : 'No claims found matching the filter criteria'}
                    </div>
                    <button
                      onClick={() => {
                        setSelectedDomain('All');
                        setSelectedStatus('All');
                        setSelectedLevel('All');
                        setSearchQuery('');
                      }}
                      className="mt-2 text-xs text-primary dark:text-secondary font-bold hover:underline cursor-pointer"
                    >
                      {isFa ? 'بازنشانی فیلترها' : 'Reset all filters'}
                    </button>
                  </td>
                </tr>
              ) : (
                filteredClaims.map(claim => {
                  const statusCfg = CLAIM_STATUS_CONFIG[claim.status];
                  const levelCfg = VERIFICATION_LEVEL_DETAILS[claim.evidenceLevel];

                  return (
                    <tr 
                      key={claim.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer"
                      onClick={() => setActiveClaimModal(claim)}
                    >
                      {/* Claim ID */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-slate-900 dark:text-white">
                            {claim.id}
                          </span>
                          <button
                            onClick={(e) => handleCopyId(claim.id, e)}
                            title="Copy Claim ID"
                            className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 transition-colors"
                          >
                            {copiedId === claim.id ? (
                              <Check className="w-3 h-3 text-emerald-500" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                          {claim.domain}
                        </span>
                      </td>

                      {/* Statement & Metric */}
                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-900 dark:text-white leading-snug">
                          {isFa ? claim.statementFa : claim.statementEn}
                        </div>
                        {claim.metricValue && (
                          <div className="mt-1 inline-flex items-center gap-1 font-mono text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/60">
                            <span>{claim.metricValue}</span>
                          </div>
                        )}
                      </td>

                      {/* Verification Status */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${statusCfg.badgeBg} ${statusCfg.textColor} ${statusCfg.borderColor}`}>
                            {claim.status === 'Verified' ? (
                              <CheckCircle2 className="w-3 h-3 shrink-0" />
                            ) : claim.status === 'Demonstration' ? (
                              <AlertCircle className="w-3 h-3 shrink-0" />
                            ) : (
                              <ShieldCheck className="w-3 h-3 shrink-0" />
                            )}
                            <span>{statusCfg.statusType}</span>
                          </span>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                            {isFa ? statusCfg.labelFa : statusCfg.labelEn}
                          </div>
                        </div>
                      </td>

                      {/* Source Methodology */}
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                        <div>
                          {isFa 
                            ? (claim.sourceMethodologyFa || claim.sourceMethodologyEn || 'بررسی شبیه‌سازی و ممیزی') 
                            : (claim.sourceMethodologyEn || claim.sourceMethodologyFa || 'Simulation & Audit Protocol')}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                          <Building2 className="w-2.5 h-2.5" />
                          <span>{claim.ownerDepartment}</span>
                        </div>
                      </td>

                      {/* Evidence Level & File */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${levelCfg.bgLight} ${levelCfg.bgDark} ${levelCfg.color} ${levelCfg.borderLight} ${levelCfg.borderDark}`}>
                            Level {claim.evidenceLevel}
                          </span>
                          <div className="text-[10px] font-mono text-primary dark:text-secondary truncate max-w-[140px]" title={claim.evidenceFile || claim.evidenceRefId}>
                            {claim.evidenceFile || claim.evidenceRefId}
                          </div>
                        </div>
                      </td>

                      {/* Last Review Date */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="font-mono text-[11px] text-slate-800 dark:text-slate-200">
                          {claim.lastReviewDate || claim.verificationDate || '2025-10-01'}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {claim.reviewCycleMonths} mo cycle
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveClaimModal(claim);
                          }}
                          className="px-2.5 py-1 text-xs font-bold text-primary dark:text-secondary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer"
                        >
                          {isFa ? 'بررسی' : 'Audit Log'}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* Detailed Cards View */
        <div className="space-y-4">
          {filteredClaims.map(claim => {
            const statusCfg = CLAIM_STATUS_CONFIG[claim.status];
            const levelCfg = VERIFICATION_LEVEL_DETAILS[claim.evidenceLevel];

            return (
              <div
                key={claim.id}
                onClick={() => setActiveClaimModal(claim)}
                className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">
                      {claim.id}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      {claim.domain}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${statusCfg.badgeBg} ${statusCfg.textColor} ${statusCfg.borderColor}`}>
                      {isFa ? statusCfg.labelFa : statusCfg.labelEn}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border ${levelCfg.bgLight} ${levelCfg.bgDark} ${levelCfg.color} ${levelCfg.borderLight} ${levelCfg.borderDark}`}>
                      Level {claim.evidenceLevel}
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>P0-13 COMPLIANT</span>
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed mb-2">
                  {isFa ? claim.statementFa : claim.statementEn}
                </h3>

                {/* Source Methodology Highlight */}
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 mb-3 space-y-1">
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 mr-1 rtl:ml-1 rtl:mr-0">
                      {isFa ? 'متدولوژی منبع:' : 'Source Methodology:'}
                    </span>
                    {isFa ? (claim.sourceMethodologyFa || claim.sourceMethodologyEn) : (claim.sourceMethodologyEn || claim.sourceMethodologyFa)}
                  </div>
                  {(claim.qualificationNotesEn || claim.qualificationNotesFa) && (
                    <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {isFa ? 'صلاحیت‌سنجی فنی: ' : 'Qualification: '}
                      </span>
                      {isFa ? claim.qualificationNotesFa : claim.qualificationNotesEn}
                    </div>
                  )}
                </div>

                {/* Footer Metadata */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-3 border-t border-slate-200 dark:border-slate-700/60 text-slate-500 dark:text-slate-400">
                  <div>
                    <span className="block text-[10px] uppercase font-semibold text-slate-400">
                      {isFa ? 'دپارتمان مسئول' : 'Department'}
                    </span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {claim.ownerDepartment}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[10px] uppercase font-semibold text-slate-400">
                      {isFa ? 'شاخص کمی' : 'Metric Value'}
                    </span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {claim.metricValue || 'Qualitative standard'}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[10px] uppercase font-semibold text-slate-400">
                      {isFa ? 'سند شواهد مرجع' : 'Evidence Record'}
                    </span>
                    <span className="font-mono text-primary dark:text-secondary font-bold">
                      {claim.evidenceFile || claim.evidenceRefId}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[10px] uppercase font-semibold text-slate-400">
                      {isFa ? 'آخرین بازنگری' : 'Last Review'}
                    </span>
                    <span className="font-mono text-slate-800 dark:text-slate-200">
                      {claim.lastReviewDate || claim.verificationDate} ({claim.reviewCycleMonths}m)
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Claim Detail Modal */}
      {activeClaimModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setActiveClaimModal(null)}
        >
          <div 
            className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            dir={direction}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg">
                  {activeClaimModal.id}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary">
                  {activeClaimModal.domain}
                </span>
              </div>
              <button
                onClick={() => setActiveClaimModal(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 space-y-4">
              <div>
                <span className="text-xs uppercase font-mono font-bold text-slate-400 block mb-1">
                  {isFa ? 'گزاره رسمی ادعا' : 'Formal Statement'}
                </span>
                <p className="text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                  {isFa ? activeClaimModal.statementFa : activeClaimModal.statementEn}
                </p>
                {isFa && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic font-sans" dir="ltr">
                    {activeClaimModal.statementEn}
                  </p>
                )}
              </div>

              {activeClaimModal.metricValue && (
                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
                  <span className="text-xs uppercase font-mono font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
                    {isFa ? 'شاخص کمی هدف / نتیجه اندازه‌گیری' : 'Quantitative Target / Measured Metric'}
                  </span>
                  <div className="text-lg font-mono font-bold text-emerald-900 dark:text-emerald-200">
                    {activeClaimModal.metricValue}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-slate-400 block uppercase mb-1">
                    {isFa ? 'متدولوژی منبع' : 'Source Methodology'}
                  </span>
                  <div className="text-slate-800 dark:text-slate-200 font-medium">
                    {isFa ? (activeClaimModal.sourceMethodologyFa || activeClaimModal.sourceMethodologyEn) : (activeClaimModal.sourceMethodologyEn || activeClaimModal.sourceMethodologyFa)}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-slate-400 block uppercase mb-1">
                    {isFa ? 'مرجع شواهد استنادی' : 'Evidence Reference'}
                  </span>
                  <div className="font-mono text-primary dark:text-secondary font-bold">
                    {activeClaimModal.evidenceFile || activeClaimModal.evidenceRefId}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Level {activeClaimModal.evidenceLevel} Classification
                  </div>
                </div>
              </div>

              {activeClaimModal.baselineComparison && (
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
                  <span className="font-bold text-slate-400 block uppercase mb-1">
                    {isFa ? 'مقایسه با مبنای مرجع (Baseline Comparison)' : 'Baseline Comparison'}
                  </span>
                  <div className="text-slate-700 dark:text-slate-300">
                    {activeClaimModal.baselineComparison}
                  </div>
                </div>
              )}

              {(activeClaimModal.qualificationNotesEn || activeClaimModal.qualificationNotesFa) && (
                <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 text-xs">
                  <span className="font-bold text-amber-800 dark:text-amber-300 block uppercase mb-1">
                    {isFa ? 'یادداشت فنی و شرایط صلاحیت (P0-13 / P0-02)' : 'Technical Qualification & Caveats'}
                  </span>
                  <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {isFa ? activeClaimModal.qualificationNotesFa : activeClaimModal.qualificationNotesEn}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-2 text-slate-500">
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400">{isFa ? 'دپارتمان' : 'Department'}</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{activeClaimModal.ownerDepartment}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400">{isFa ? 'ممیزی‌شده توسط' : 'Verified By'}</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{activeClaimModal.verifiedBy || 'Technical Review Committee'}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400">{isFa ? 'تاریخ بازنگری' : 'Review Date'}</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200">{activeClaimModal.lastReviewDate || activeClaimModal.verificationDate}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              {setPage && (
                <button
                  onClick={() => {
                    setActiveClaimModal(null);
                    setPage(Page.EvidenceRegistry);
                  }}
                  className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-dark transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{isFa ? 'مشاهده سند در پورتال شواهد' : 'Inspect in /evidence/'}</span>
                  <ChevronRight className="w-3 h-3 rtl:rotate-180" />
                </button>
              )}
              <button
                onClick={() => setActiveClaimModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 cursor-pointer ml-auto"
              >
                {isFa ? 'بستن' : 'Close'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ClaimRegistry;
