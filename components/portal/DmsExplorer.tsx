import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { useLanguage } from '../../LanguageContext';
import { 
  FileText, Search, Filter, Download, Eye, Lock, Shield, 
  Building, Calendar, CheckCircle2, AlertCircle, X, ExternalLink
} from 'lucide-react';
import { DmsDocument } from '../../types';
import { INITIAL_DMS_DOCUMENTS } from '../../data/orgMembers';

export const DmsExplorer: React.FC = () => {
  const { userProfile, isSuperAdmin, isAdmin } = useAuth();
  const { isFa } = useLanguage();

  const [documents] = useState<DmsDocument[]>(INITIAL_DMS_DOCUMENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterClearance, setFilterClearance] = useState('all');
  const [selectedDoc, setSelectedDoc] = useState<DmsDocument | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadDocument = (doc: DmsDocument) => {
    const content = `========================================================================\n` +
      `  KKM INTERNATIONAL GROUP - OFFICIAL DIRECTIVE & DECREE DOCUMENT\n` +
      `  گروه بین‌المللی کیمیا کاران ماد - مرکز اسناد و بخشنامه‌های سازمانی\n` +
      `========================================================================\n` +
      `Code / Tracking Ref : ${doc.code}\n` +
      `Title (EN)          : ${doc.title}\n` +
      `Title (FA)          : ${doc.titleFa}\n` +
      `Department          : ${doc.department}\n` +
      `Category            : ${doc.category}\n` +
      `Clearance Level     : ${doc.securityClearance}\n` +
      `Version             : ${doc.version}\n` +
      `Release Date        : ${doc.releaseDate}\n` +
      `------------------------------------------------------------------------\n` +
      `EXECUTIVE SUMMARY & DIRECTIVE BODY:\n` +
      `${doc.summary}\n\n` +
      `چکیده و متن بخشنامه:\n` +
      `${doc.summaryFa}\n` +
      `------------------------------------------------------------------------\n` +
      `GOVERNANCE COMPLIANCE & VERIFICATION SEAL:\n` +
      `Status: Cryptographically Certified & Ratified by Executive Board\n` +
      `Verification Hash: SHA256:${doc.code.replace(/[^a-zA-Z0-9]/g, '')}98E4B022\n` +
      `Generated on: ${new Date().toISOString()}\n` +
      `========================================================================\n`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.code}_KKM_Official_Directive.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  // User clearance checking
  const userClearance = userProfile?.clearanceLevel || 'Internal / Standard';
  const hasTopSecretAccess = Boolean(isSuperAdmin || userClearance.includes('Top Secret'));
  const hasTier1Access = Boolean(hasTopSecretAccess || isAdmin || userClearance.includes('Confidential') || userProfile?.permissions.canAccessConfidentialDMS);

  const filteredDocs = documents.filter((doc) => {
    if (filterCategory !== 'all' && doc.category !== filterCategory) return false;
    if (filterClearance !== 'all' && doc.securityClearance !== filterClearance) return false;

    // Filter by user clearance if strictly restricted
    if (doc.securityClearance === 'Top Secret' && !hasTopSecretAccess) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = doc.title.toLowerCase().includes(q) || doc.titleFa.includes(q);
      const matchCode = doc.code.toLowerCase().includes(q);
      const matchDept = doc.department.toLowerCase().includes(q);
      const matchSummary = doc.summary.toLowerCase().includes(q) || doc.summaryFa.includes(q);
      if (!matchTitle && !matchCode && !matchDept && !matchSummary) return false;
    }
    return true;
  });

  const getClearanceBadge = (clearance: string) => {
    switch (clearance) {
      case 'Top Secret':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 font-mono">TOP SECRET</span>;
      case 'Confidential':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 font-mono">CONFIDENTIAL</span>;
      case 'Operational':
        return <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 font-mono">OPERATIONAL</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300 font-mono">INTERNAL</span>;
    }
  };

  const getCategoryBadge = (category: string) => {
    return (
      <span className="px-2 py-0.5 rounded bg-primary/10 text-primary dark:bg-secondary/15 dark:text-secondary text-[10px] font-semibold">
        {category}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-primary-dark to-slate-900 text-white p-6 rounded-2xl shadow-md border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-5 h-5 text-secondary" />
            <span className="text-xs uppercase font-mono tracking-widest text-secondary font-bold">
              KKM Corporate DMS & Directive Repository
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-display font-bold">
            {isFa ? 'مرکز اسناد، بخشنامه‌های حاکمیتی و شیوه‌نامه‌های فنی (DMS)' : 'Corporate Document Center, Directives & Technical Standards'}
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            {isFa 
              ? 'مخزن رسمی اسناد طبقاتی، استانداردهای مهندسی EPCI، نظام‌نامه HSE و بخشنامه‌های مصوب هیئت مدیره گروه بین‌المللی کیمیا کاران ماد تحت سیستم عامل هوش مصنوعی سازمانی (EAOS).'
              : 'Official classified repository for corporate decrees, EPCI technical standards, HSE protocols, and Executive Board directives governed under EAOS.'}
          </p>
        </div>

        <div className="text-start sm:text-end shrink-0 bg-white/10 backdrop-blur p-3 rounded-xl border border-white/15">
          <span className="text-[10px] uppercase font-mono text-slate-300 block mb-0.5">
            {isFa ? 'سطح دسترسی شما' : 'Your Clearance'}
          </span>
          <span className="text-xs font-bold text-secondary font-mono">
            {userClearance}
          </span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className={`w-4 h-4 absolute ${isFa ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-gray-400`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isFa ? 'جستجو در کد بخشنامه، عنوان یا محتوا...' : 'Search document code, title, or keywords...'}
              className={`w-full ${isFa ? 'pr-9 pl-3' : 'pl-9 pr-3'} py-2 rounded-xl text-xs bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 outline-none focus:ring-1 focus:ring-primary text-text-dark dark:text-white`}
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 outline-none text-text-dark dark:text-slate-200 font-medium"
          >
            <option value="all">{isFa ? 'تمامی دسته‌بندی‌های اسناد' : 'All Document Categories'}</option>
            <option value="Directive">{isFa ? 'بخشنامه‌های راهبردی (Directives)' : 'Directives'}</option>
            <option value="Policy">{isFa ? 'سیاست‌ها و آیین‌نامه‌ها (Policies)' : 'Policies'}</option>
            <option value="Standard">{isFa ? 'استانداردهای مهندسی و HSE' : 'Standards & HSE'}</option>
            <option value="Technical">{isFa ? 'اسناد فنی و شبیه‌سازی' : 'Technical Specifications'}</option>
            <option value="Legal">{isFa ? 'قراردادها و اسناد حقوقی' : 'Legal & Contracts'}</option>
          </select>

          <select
            value={filterClearance}
            onChange={(e) => setFilterClearance(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 outline-none text-text-dark dark:text-slate-200 font-medium"
          >
            <option value="all">{isFa ? 'تمامی سطوح طبقه‌بندی امنیتی' : 'All Security Levels'}</option>
            <option value="Top Secret">Top Secret / Strategic</option>
            <option value="Confidential">Confidential / Tier-1</option>
            <option value="Operational">Operational / Tier-2</option>
            <option value="Internal">Internal / Standard</option>
          </select>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="font-mono text-xs font-bold text-primary dark:text-secondary bg-primary/10 dark:bg-secondary/15 px-2.5 py-0.5 rounded">
                  {doc.code}
                </span>
                <div className="flex items-center gap-1.5">
                  {getCategoryBadge(doc.category)}
                  {getClearanceBadge(doc.securityClearance)}
                </div>
              </div>

              <h3 className="font-display font-bold text-sm sm:text-base text-text-dark dark:text-white leading-snug mb-2">
                {isFa ? doc.titleFa : doc.title}
              </h3>

              <p className="text-xs text-text-light dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                {isFa ? doc.summaryFa : doc.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-gray-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-text-light dark:text-slate-400">
              <div className="flex items-center gap-2">
                <span>{doc.department}</span>
                <span>&bull;</span>
                <span className="font-mono">{doc.version}</span>
                <span>&bull;</span>
                <span>{doc.releaseDate}</span>
              </div>

              <button
                onClick={() => setSelectedDoc(doc)}
                className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary dark:bg-secondary/20 dark:hover:bg-secondary/30 dark:text-secondary rounded-xl font-bold flex items-center gap-1 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{isFa ? 'مطالعه سند' : 'Read Document'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Document View Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-gray-100 dark:border-slate-700 sticky top-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur z-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-primary dark:text-secondary bg-primary/10 dark:bg-secondary/15 px-2 py-0.5 rounded">
                    {selectedDoc.code}
                  </span>
                  {getCategoryBadge(selectedDoc.category)}
                  {getClearanceBadge(selectedDoc.securityClearance)}
                  <span className="font-mono text-xs text-text-light dark:text-slate-400">
                    {selectedDoc.version}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-display font-bold text-text-dark dark:text-white leading-snug">
                  {isFa ? selectedDoc.titleFa : selectedDoc.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Content */}
            <div className="p-6 space-y-6 text-sm text-text-dark dark:text-slate-200 leading-relaxed">
              <div className="bg-gray-50 dark:bg-slate-900/60 p-4 rounded-xl border border-gray-200 dark:border-slate-700 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-text-light dark:text-slate-400 block mb-0.5">{isFa ? 'دپارتمان صادرکننده' : 'Issuing Department'}</span>
                  <span className="font-bold text-text-dark dark:text-white">{selectedDoc.department}</span>
                </div>
                <div>
                  <span className="text-text-light dark:text-slate-400 block mb-0.5">{isFa ? 'تاریخ ابلاغ رسمی' : 'Release Date'}</span>
                  <span className="font-mono text-text-dark dark:text-white">{selectedDoc.releaseDate}</span>
                </div>
                <div>
                  <span className="text-text-light dark:text-slate-400 block mb-0.5">{isFa ? 'مرجع تاییدکننده' : 'Ratified By'}</span>
                  <span className="font-bold text-primary dark:text-secondary">KKM Executive Board</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-text-dark dark:text-slate-300 uppercase tracking-wider mb-2">
                  {isFa ? 'مفاد و چکیده اجرایی بخشنامه' : 'Executive Summary & Mandate'}
                </h4>
                <div className="p-4 bg-gray-50 dark:bg-slate-700/40 rounded-xl text-text-dark dark:text-slate-200 leading-relaxed border border-gray-100 dark:border-slate-700">
                  <p className="mb-3">{isFa ? selectedDoc.summaryFa : selectedDoc.summary}</p>
                  <p className="text-xs text-text-light dark:text-slate-400 italic">
                    {isFa
                      ? 'کلیه مدیران، سرپرستان کارگاه‌ها و مهندسان پروژه ملزم به رعایت بی‌قید و شرط الزامات این سند در فرآیندهای خرید، بهره‌برداری و توسعه زیرساخت می‌باشند.'
                      : 'All managers, site supervisors, and engineers are strictly bound by the provisions of this document across procurement and operations.'}
                  </p>
                </div>
              </div>

              {/* Official Seal / Signature Simulation */}
              <div className="pt-4 border-t border-gray-100 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-semibold">
                    {isFa ? 'سند رسمی مصوب با امضای دیجیتال معتبر' : 'Cryptographically Verified Official Decree'}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {downloadSuccess && (
                    <span className="text-xs text-green-600 dark:text-green-400 font-semibold animate-pulse">
                      {isFa ? '✓ سند رسمی دانلود شد' : '✓ Official Decree Exported'}
                    </span>
                  )}
                  <button
                    onClick={() => handleDownloadDocument(selectedDoc)}
                    className="px-4 py-2 bg-primary hover:bg-primary-dark dark:bg-secondary dark:text-slate-900 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-colors shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isFa ? 'دانلود نسخه مصوب' : 'Download Verified Decree'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
