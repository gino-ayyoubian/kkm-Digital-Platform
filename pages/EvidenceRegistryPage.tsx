import * as React from 'react';
import { Page } from '../types';
import { useLanguage } from '../LanguageContext';
import { 
  ShieldCheck, Search, Filter, FileText, CheckCircle, AlertTriangle, 
  ExternalLink, Layers, ArrowLeft, ArrowRight, Download, Info, Award, 
  Database, RefreshCw, CheckCircle2, ChevronRight, Lock
} from 'lucide-react';
import { 
  EVIDENCE_REGISTRY, 
  VERIFICATION_LEVEL_DETAILS, 
  VerificationLevel, 
  ClaimCategory,
  EvidenceClaim 
} from '../data/evidenceRegistry';

interface EvidenceRegistryPageProps {
  setPage: (page: Page) => void;
}

const CATEGORIES: ClaimCategory[] = [
  'Corporate Claims',
  'Technology Claims',
  'Project Claims',
  'ESG Claims',
  'Environmental Metrics',
  'Performance Metrics',
  'IP Claims',
  'Certifications'
];

export const EvidenceRegistryPage: React.FC<EvidenceRegistryPageProps> = ({ setPage }) => {
  const { isFa, direction } = useLanguage();
  const [selectedCategory, setSelectedCategory] = React.useState<ClaimCategory | 'All'>('All');
  const [selectedLevel, setSelectedLevel] = React.useState<VerificationLevel | 'All'>('All');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [activeClaimModal, setActiveClaimModal] = React.useState<EvidenceClaim | null>(null);

  // Filtered claims
  const filteredClaims = React.useMemo(() => {
    return EVIDENCE_REGISTRY.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesLevel = selectedLevel === 'All' || item.verificationLevel === selectedLevel;
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery = !query || 
        item.id.toLowerCase().includes(query) ||
        item.claimEn.toLowerCase().includes(query) ||
        item.claimFa.toLowerCase().includes(query) ||
        (item.technology && item.technology.toLowerCase().includes(query)) ||
        (item.project && item.project.toLowerCase().includes(query)) ||
        item.evidenceFile.toLowerCase().includes(query) ||
        item.source.toLowerCase().includes(query);

      return matchesCategory && matchesLevel && matchesQuery;
    });
  }, [selectedCategory, selectedLevel, searchQuery]);

  const levelCounts = React.useMemo(() => {
    const counts: Record<string, number> = { All: EVIDENCE_REGISTRY.length };
    (['A', 'B', 'C', 'D', 'E', 'F', 'G'] as VerificationLevel[]).forEach(lvl => {
      counts[lvl] = EVIDENCE_REGISTRY.filter(c => c.verificationLevel === lvl).length;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors" dir={direction}>
      
      {/* Header Banner */}
      <section className="bg-slate-900 text-white pt-24 pb-16 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="evidence-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#38bdf8" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#evidence-grid)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {isFa ? 'سامانه ممیزی حقیقت و اعتبارسنجی شواهد KKM' : 'KKM Production Truth Layer & Evidence Registry'}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight mb-4">
              {isFa ? 'رجیستری شواهد فنی، سازمانی و محیط‌زیستی' : 'Evidence & Claims Governance Registry'}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
              {isFa 
                ? 'در راستای استانداردهای ممیزی و حاکمیت شفاف شرکتی، کلیه ادعاهای عملکردی، زیست‌محیطی، فناوری و اسناد مالکیت فکری گروه بین‌المللی کیمیا کاران ماد طبق نظام رتبه‌بندی ۷ گانه شواهد (سطوح A تا G) ثبت، ممیزی و منتشر می‌شوند.'
                : 'In accordance with KKM International Group corporate governance standards, all quantitative performance metrics, environmental indices, and intellectual property claims are cataloged with traceable documentary evidence under our 7-tier verification standard (Levels A through G).'}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-800">
              <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
                <div className="text-xs text-slate-400 font-mono uppercase">{isFa ? 'کل ادعاهای ثبت‌شده' : 'Cataloged Claims'}</div>
                <div className="text-2xl font-bold font-mono text-white mt-1">{EVIDENCE_REGISTRY.length}</div>
                <div className="text-[11px] text-emerald-400 mt-0.5">{isFa ? 'دارای مستندات ضمیمه' : 'Documented & Traceable'}</div>
              </div>
              <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
                <div className="text-xs text-slate-400 font-mono uppercase">{isFa ? 'شواهد عملیاتی (سطح A)' : 'Operational Data (A)'}</div>
                <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">{levelCounts['A']}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{isFa ? 'ثبت میدانی و رسمی' : 'Field & Legal Records'}</div>
              </div>
              <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
                <div className="text-xs text-slate-400 font-mono uppercase">{isFa ? 'آزمایشگاهی و مدل‌شده' : 'Lab & Modelled (C/D)'}</div>
                <div className="text-2xl font-bold font-mono text-amber-400 mt-1">{levelCounts['C'] + levelCounts['D']}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{isFa ? 'آزمون حلقه بسته' : 'Engineering Simulations'}</div>
              </div>
              <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
                <div className="text-xs text-slate-400 font-mono uppercase">{isFa ? 'اهداف توسعه (سطح E)' : 'Target Milestones (E)'}</div>
                <div className="text-2xl font-bold font-mono text-cyan-400 mt-1">{levelCounts['E']}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{isFa ? 'در دست ممیزی و پیاده‌سازی' : 'Roadmap Commitments'}</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Verification Standard Explainer Card */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-primary dark:text-secondary" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              {isFa ? 'سیستم طبقه‌بندی ۷ گانه شواهد فنی KKM' : 'KKM 7-Tier Verification Level Architecture'}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {(['A', 'B', 'C', 'D', 'E', 'F', 'G'] as VerificationLevel[]).map(lvl => {
              const details = VERIFICATION_LEVEL_DETAILS[lvl];
              return (
                <div 
                  key={lvl} 
                  onClick={() => setSelectedLevel(selectedLevel === lvl ? 'All' : lvl)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    selectedLevel === lvl 
                      ? 'ring-2 ring-primary dark:ring-secondary shadow-sm' 
                      : 'hover:border-slate-300 dark:hover:border-slate-700'
                  } ${details.bgLight} ${details.bgDark} ${details.borderLight} ${details.borderDark}`}
                >
                  <div className="flex items-center justify-between font-bold mb-1">
                    <span className={details.color}>{isFa ? details.labelFa : details.labelEn}</span>
                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-white/70 dark:bg-slate-900/70">
                      {levelCounts[lvl]}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                    {isFa ? details.descriptionFa : details.descriptionEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Filter & Registry List Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Search & Category Filter Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8 justify-between items-stretch lg:items-center">
          
          {/* Search bar */}
          <div className="relative flex-1 max-w-xl">
            <Search className="w-5 h-5 absolute left-3.5 rtl:right-3.5 rtl:left-auto top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={isFa ? 'جستجو در ادعاها، شناسه‌ها، فناوری‌ها، یا پروژه‌ها...' : 'Search claims by ID, statement, technology, or evidence file...'}
              className="w-full pl-10 pr-4 rtl:pr-10 rtl:pl-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 rtl:left-3.5 rtl:right-auto top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Level Filter dropdown/buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              {isFa ? 'فیلتر سطح:' : 'Level:'}
            </span>
            <button
              onClick={() => setSelectedLevel('All')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedLevel === 'All' 
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' 
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {isFa ? 'همه سطوح' : 'All Levels'} ({EVIDENCE_REGISTRY.length})
            </button>
            {(['A', 'B', 'C', 'D', 'E'] as VerificationLevel[]).map(lvl => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(selectedLevel === lvl ? 'All' : lvl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  selectedLevel === lvl 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                {lvl} ({levelCounts[lvl]})
              </button>
            ))}
          </div>

        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'All'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {isFa ? 'همه دسته‌بندی‌ها' : 'All Categories'}
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count banner */}
        <div className="flex items-center justify-between mb-6 text-xs text-slate-500">
          <span>
            {isFa 
              ? `نمایش ${filteredClaims.length} مورد از کل ${EVIDENCE_REGISTRY.length} ادعای ثبت‌شده`
              : `Showing ${filteredClaims.length} of ${EVIDENCE_REGISTRY.length} documented claims`}
          </span>
          {(selectedCategory !== 'All' || selectedLevel !== 'All' || searchQuery) && (
            <button 
              onClick={() => { setSelectedCategory('All'); setSelectedLevel('All'); setSearchQuery(''); }}
              className="text-primary dark:text-secondary hover:underline font-bold"
            >
              {isFa ? 'بازنشانی فیلترها' : 'Reset Filters'}
            </button>
          )}
        </div>

        {/* Claims Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredClaims.map(claim => {
            const levelInfo = VERIFICATION_LEVEL_DETAILS[claim.verificationLevel];
            return (
              <div 
                key={claim.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Top Metadata row */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {claim.id}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                        {claim.category}
                      </span>
                    </div>

                    <div className={`px-2.5 py-1 rounded-md border text-[11px] font-bold font-mono ${levelInfo.bgLight} ${levelInfo.bgDark} ${levelInfo.color} ${levelInfo.borderLight} ${levelInfo.borderDark}`}>
                      {isFa ? levelInfo.labelFa : levelInfo.labelEn}
                    </div>
                  </div>

                  {/* Claim Statement */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3 leading-snug">
                    {isFa ? claim.claimFa : claim.claimEn}
                  </h3>

                  {/* Qualification Note */}
                  {claim.qualificationNotesEn && (
                    <div className="p-3 mb-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                      <div className="font-bold flex items-center gap-1.5 mb-1 text-[11px] uppercase tracking-wide">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        {isFa ? 'یادداشت صلاحیت و محدوده استناد:' : 'Qualification & Scope:'}
                      </div>
                      <p>{isFa ? claim.qualificationNotesFa : claim.qualificationNotesEn}</p>
                    </div>
                  )}

                  {/* Details Specs Table */}
                  <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 mb-4">
                    <div className="flex justify-between items-start gap-4">
                      <span className="font-semibold text-slate-500 shrink-0">{isFa ? 'منبع سند:' : 'Source:'}</span>
                      <span className="text-right rtl:text-left text-slate-800 dark:text-slate-200 font-medium">{claim.source}</span>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                      <span className="font-semibold text-slate-500 shrink-0">{isFa ? 'فایل شواهد:' : 'Evidence Ref:'}</span>
                      <span className="font-mono text-primary dark:text-secondary text-[11px] bg-primary/5 dark:bg-secondary/5 px-2 py-0.5 rounded">
                        {claim.evidenceFile}
                      </span>
                    </div>
                    <div className="flex justify-between items-start gap-4">
                      <span className="font-semibold text-slate-500 shrink-0">{isFa ? 'روش اندازه‌گیری:' : 'Method:'}</span>
                      <span className="text-right rtl:text-left text-slate-800 dark:text-slate-200">
                        {isFa ? claim.measurementMethodFa : claim.measurementMethodEn}
                      </span>
                    </div>
                    {claim.technology && (
                      <div className="flex justify-between items-center gap-4">
                        <span className="font-semibold text-slate-500">{isFa ? 'فناوری مربوطه:' : 'Technology:'}</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{claim.technology}</span>
                      </div>
                    )}
                    {claim.project && (
                      <div className="flex justify-between items-center gap-4">
                        <span className="font-semibold text-slate-500">{isFa ? 'پروژه پایلوت:' : 'Project:'}</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{claim.project}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Governance Card */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                  <div>
                    <span>{isFa ? 'مالک:' : 'Owner:'} {claim.owner}</span>
                    <span className="mx-1.5">•</span>
                    <span>{isFa ? 'ممیز:' : 'Reviewer:'} {claim.reviewer}</span>
                  </div>
                  <button 
                    onClick={() => setActiveClaimModal(claim)}
                    className="font-bold text-primary dark:text-secondary hover:underline flex items-center gap-1"
                  >
                    <span>{isFa ? 'پرونده کامل' : 'Full Dossier'}</span>
                    <ChevronRight className="w-3 h-3 rtl:rotate-180" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredClaims.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
            <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">
              {isFa ? 'هیچ ادعای ثبت‌شده‌ای با این مشخصات یافت نشد' : 'No claims found matching your criteria'}
            </h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {isFa ? 'لطفاً عبارت جستجو را ویرایش کرده یا فیلترهای سطوح و دسته‌بندی را بازنشانی کنید.' : 'Try adjusting your search terms or clearing the level and category filters.'}
            </p>
            <button 
              onClick={() => { setSelectedCategory('All'); setSelectedLevel('All'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-dark transition-all"
            >
              {isFa ? 'نمایش همه ادعاها' : 'Show All Claims'}
            </button>
          </div>
        )}

        {/* Governance Workflow Callout */}
        <div className="mt-16 bg-slate-900 text-white rounded-3xl p-8 lg:p-10 border border-slate-800">
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2 block">
              {isFa ? 'فرآیند تأیید پنج‌مرحله‌ای انتشار داده‌ها' : '5-Stage Content Governance Protocol'}
            </span>
            <h3 className="text-2xl font-bold font-display text-white mb-4">
              {isFa ? 'فرآیند ثبت و ارزیابی ادعاها پیش از انتشار عمومی' : 'Rigorous Multi-Stage Claim Approval Process'}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {isFa 
                ? 'از این پس هیچ ادعای کلیدی، عدد عملکردی یا شاخص زیست‌محیطی بدون طی فرآیند ۵ مرحله‌ای زیر در پورتال یا تارنمای KKM منتشر نمی‌شود: مؤلف فنی ← تأیید فنی مهندسی ← اعتبارسنجی مدارک و شواهد ← ممیزی حقوقی و مالکیت فکری ← امضای نهایی هیئت عامل.'
                : 'In accordance with KKM executive policy, no high-impact technical, environmental, or corporate metric is published without passing through our mandatory 5-gate pipeline: Technical Author → Engineering Validation → Evidence Verification → IP & Legal Clearance → Executive Approval.'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
              {[
                { step: '01', titleEn: 'Author', titleFa: 'مؤلف فنی' },
                { step: '02', titleEn: 'Technical', titleFa: 'مهندسی فنی' },
                { step: '03', titleEn: 'Evidence', titleFa: 'اعتبارسنجی سند' },
                { step: '04', titleEn: 'IP / Legal', titleFa: 'حقوقی و IP' },
                { step: '05', titleEn: 'Executive', titleFa: 'امضای هیئت عامل' },
              ].map(gate => (
                <div key={gate.step} className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
                  <div className="text-[10px] font-mono text-emerald-400 font-bold">{gate.step}</div>
                  <div className="text-xs font-bold text-white mt-1">{isFa ? gate.titleFa : gate.titleEn}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* Claim Detail Modal */}
      {activeClaimModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setActiveClaimModal(null)}
              className="absolute top-5 right-5 rtl:left-5 rtl:right-auto text-slate-400 hover:text-slate-600 dark:hover:text-white p-2"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                {activeClaimModal.id}
              </span>
              <span className="text-xs font-bold uppercase text-slate-500">
                {activeClaimModal.category}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              {isFa ? activeClaimModal.claimFa : activeClaimModal.claimEn}
            </h3>

            <div className="space-y-3 text-xs mb-6 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div>
                <span className="font-bold text-slate-500 block mb-0.5">{isFa ? 'سطح اعتبارسنجی:' : 'Verification Level:'}</span>
                <span className="font-mono font-bold text-primary dark:text-secondary">
                  {VERIFICATION_LEVEL_DETAILS[activeClaimModal.verificationLevel].labelEn}
                </span>
                <p className="text-slate-500 mt-1">
                  {VERIFICATION_LEVEL_DETAILS[activeClaimModal.verificationLevel].descriptionEn}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-500 block mb-0.5">{isFa ? 'منبع استناد:' : 'Source Document:'}</span>
                <span className="text-slate-800 dark:text-slate-200">{activeClaimModal.source}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-500 block mb-0.5">{isFa ? 'شناسه فایل شواهد:' : 'Evidence File Ref:'}</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{activeClaimModal.evidenceFile}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-500 block mb-0.5">{isFa ? 'روش سنجش:' : 'Measurement Methodology:'}</span>
                <span className="text-slate-800 dark:text-slate-200">{activeClaimModal.measurementMethodEn}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between">
                <div>
                  <span className="font-bold text-slate-500 block mb-0.5">{isFa ? 'مالک فنی:' : 'Owner:'}</span>
                  <span className="text-slate-800 dark:text-slate-200">{activeClaimModal.owner}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-500 block mb-0.5">{isFa ? 'ممیز تأییدکننده:' : 'Reviewer:'}</span>
                  <span className="text-slate-800 dark:text-slate-200">{activeClaimModal.reviewer}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-500 block mb-0.5">{isFa ? 'تاریخ بازنگری:' : 'Review Date:'}</span>
                  <span className="text-slate-800 dark:text-slate-200 font-mono">{activeClaimModal.reviewDate}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setActiveClaimModal(null)}
                className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                {isFa ? 'بستن' : 'Close'}
              </button>
              <button 
                onClick={() => setPage(Page.Contact)}
                className="px-5 py-2.5 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary-dark transition-colors flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                {isFa ? 'درخواست ممیزی / دسترسی فنی' : 'Request Technical Audit Access'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default EvidenceRegistryPage;
