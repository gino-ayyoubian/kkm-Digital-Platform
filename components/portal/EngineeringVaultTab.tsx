import React, { useState, useMemo } from 'react';
import { useAuth } from '../../AuthContext';
import { useLanguage } from '../../LanguageContext';
import { 
  Database, ShieldCheck, Lock, Download, Search, Filter, 
  FileText, CheckCircle2, AlertTriangle, Layers, Building, 
  Cpu, ExternalLink, ChevronRight, Eye, RefreshCw
} from 'lucide-react';
import { CLAIMS_REGISTRY_DATA, CLAIM_STATUS_CONFIG } from '../../data/claimsRegistryData';
import { EVIDENCE_REGISTRY, VERIFICATION_LEVEL_DETAILS, VerificationLevel, EvidenceClaim } from '../../data/evidenceRegistry';
import { Claim } from '../../types';

export const EngineeringVaultTab: React.FC = () => {
  const { userProfile, isSuperAdmin, isAdmin } = useAuth();
  const { isFa } = useLanguage();

  const [activeSubTab, setActiveSubTab] = useState<'claims' | 'simulations' | 'fieldLogs'>('claims');
  const [selectedLevel, setSelectedLevel] = useState<VerificationLevel | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // Clearance check
  const userClearance = userProfile?.clearanceLevel || 'Internal / Standard';
  const hasConfidentialAccess = Boolean(isSuperAdmin || isAdmin || userClearance.includes('Confidential') || userClearance.includes('Top Secret'));

  // Filter internal claims (Levels C, D, E, F + Level A trade secrets)
  const internalClaims = useMemo(() => {
    return CLAIMS_REGISTRY_DATA.filter(claim => {
      const isInternalLevel = ['C', 'D', 'E', 'F'].includes(claim.evidenceLevel) || claim.status !== 'Verified';
      const matchesLevel = selectedLevel === 'All' || claim.evidenceLevel === selectedLevel;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery = !q ||
        claim.id.toLowerCase().includes(q) ||
        claim.statementEn.toLowerCase().includes(q) ||
        claim.statementFa.toLowerCase().includes(q) ||
        claim.ownerDepartment.toLowerCase().includes(q) ||
        (claim.metricValue && claim.metricValue.toLowerCase().includes(q));

      return isInternalLevel && matchesLevel && matchesQuery;
    });
  }, [selectedLevel, searchQuery]);

  const handleDownloadDossier = (claimId: string, fileName: string) => {
    const claim = CLAIMS_REGISTRY_DATA.find(c => c.id === claimId);
    if (!claim) return;

    const fileContent = `========================================================================\n` +
      `  KKM INTERNATIONAL GROUP - RESTRICTED ENGINEERING ARCHIVE\n` +
      `  آرشیو اسناد فنی، داده‌های تست‌بد و محاسبات مهندسی درون‌سازمانی KKM\n` +
      `========================================================================\n` +
      `Record ID           : ${claim.id}\n` +
      `Evidence Level      : Level ${claim.evidenceLevel} (${claim.status})\n` +
      `Owner Department    : ${claim.ownerDepartment}\n` +
      `Verified By         : ${claim.verifiedBy || 'Technical Review Committee'}\n` +
      `Date                : ${claim.verificationDate}\n` +
      `Target Evidence Ref : ${claim.evidenceFile || fileName}\n` +
      `------------------------------------------------------------------------\n` +
      `TECHNICAL STATEMENT (EN):\n` +
      `${claim.statementEn}\n\n` +
      `گزاره فنی مهندسی (FA):\n` +
      `${claim.statementFa}\n` +
      `------------------------------------------------------------------------\n` +
      `MEASURED METRIC / SPECIFICATION:\n` +
      `${claim.metricValue || 'Formal Engineering Simulation Target'}\n\n` +
      `SOURCE METHODOLOGY & TELEMETRY:\n` +
      `${claim.sourceMethodologyEn || 'Internal testbed & simulation logs'}\n` +
      `${claim.sourceMethodologyFa ? `\n${claim.sourceMethodologyFa}` : ''}\n` +
      `------------------------------------------------------------------------\n` +
      `QUALIFICATION & AUDIT NOTES (P0-13 / P0-02 DIRECTIVE):\n` +
      `${claim.qualificationNotesEn || 'Classified internal engineering result.'}\n` +
      `------------------------------------------------------------------------\n` +
      `CUSTODY & ACCESS RECORD:\n` +
      `Accessed By: ${userProfile?.displayName || 'Authorized Engineer'} (${userProfile?.employeeId || 'EMP-SEC'})\n` +
      `Clearance Level: ${userProfile?.clearanceLevel || 'Internal'}\n` +
      `Timestamp: ${new Date().toISOString()}\n` +
      `Security Hash: SHA256:${claim.id.replace(/[^a-zA-Z0-9]/g, '')}77F2B09A\n` +
      `========================================================================\n`;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${claim.id}_${fileName.replace(/\.pdf$/, '')}_RAW_DOSSIER.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(claim.id);
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>{isFa ? 'مخزن فنی و ادعاهای درون‌سازمانی (P0-13 Restricted)' : 'Internal Engineering & Claims Vault'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white">
              {isFa ? 'اسناد مهندسی، تست‌بدهای آزمایشگاهی و شبیه‌سازی‌های مخزن' : 'Proprietary Engineering Records & Subsurface Models'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {isFa 
                ? 'کلیه اطلاعات فنی، نتایج آزمایشگاهی سطح C تا F، کدهای شبیه‌سازی ECLIPSE/HYSYS و داده‌های تست میدانی که از دسترس عموم تفکیک شده‌اند، در این بخش تحت نظارت پروتکل RBAC نگهداری می‌شوند.'
                : 'All confidential engineering models, lab testbed results (Levels C through F), Aspen HYSYS simulations, and field hydro-testing telemetry isolated from the public presentation layer are cataloged here under strict RBAC.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs flex-shrink-0">
            <div className="text-slate-400 text-[10px] font-mono uppercase">{isFa ? 'سطح دسترسی شما:' : 'Your Security Clearance:'}</div>
            <div className="font-bold text-amber-400 font-mono mt-0.5">{userClearance}</div>
            <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isFa ? 'احراز هویت پرسنلی فعال' : 'Active Staff Credentials'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-tabs & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('claims')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'claims'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {isFa ? 'ادعاهای مهندسی سطح C تا F' : 'Internal Claims (Levels C–F)'}
          </button>
          <button
            onClick={() => setActiveSubTab('simulations')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'simulations'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {isFa ? 'مدل‌های شبیه‌سازی عددی' : 'Reservoir & ORC Simulations'}
          </button>
          <button
            onClick={() => setActiveSubTab('fieldLogs')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'fieldLogs'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {isFa ? 'لاگ‌های عملیات میدانی' : 'Field Hydro-Testing Logs'}
          </button>
        </div>

        {/* Search & Level Filter */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className={`w-3.5 h-3.5 absolute ${isFa ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-slate-400`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isFa ? 'جستجو در آرشیو...' : 'Search vault...'}
              className={`py-1.5 ${isFa ? 'pr-8 pl-3' : 'pl-8 pr-3'} rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary w-48`}
            />
          </div>

          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value as any)}
            className="py-1.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="All">{isFa ? 'همه سطوح' : 'All Levels'}</option>
            <option value="C">Level C (Internal Test)</option>
            <option value="D">Level D (Estimated/Model)</option>
            <option value="E">Level E (Development Target)</option>
            <option value="F">Level F (Demo Telemetry)</option>
          </select>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{isFa ? `پرونده کامل مستندات فنی ${downloadSuccess} با موفقیت دانلود شد.` : `Full technical dossier for ${downloadSuccess} downloaded successfully.`}</span>
          </div>
        </div>
      )}

      {/* Main Grid: Internal Engineering Claims */}
      {activeSubTab === 'claims' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {internalClaims.map(claim => {
            const statusCfg = CLAIM_STATUS_CONFIG[claim.status];
            const levelCfg = VERIFICATION_LEVEL_DETAILS[claim.evidenceLevel];

            return (
              <div 
                key={claim.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900 dark:text-white px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600">
                        {claim.id}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300">
                        {claim.domain}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono border ${levelCfg.bgLight} ${levelCfg.bgDark} ${levelCfg.color} ${levelCfg.borderLight} ${levelCfg.borderDark}`}>
                        Level {claim.evidenceLevel}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono border ${statusCfg.badgeBg} ${statusCfg.textColor} ${statusCfg.borderColor}`}>
                        {claim.status}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 leading-relaxed">
                    {isFa ? claim.statementFa : claim.statementEn}
                  </h3>

                  {claim.metricValue && (
                    <div className="mb-3 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 text-xs font-mono text-emerald-800 dark:text-emerald-300 font-bold">
                      {claim.metricValue}
                    </div>
                  )}

                  <div className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800 mb-4">
                    <div className="flex justify-between">
                      <span className="font-semibold text-slate-500">{isFa ? 'دپارتمان مالک:' : 'Owner Dept:'}</span>
                      <span className="text-slate-800 dark:text-slate-200">{claim.ownerDepartment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-slate-500">{isFa ? 'فایل شواهد:' : 'Evidence File:'}</span>
                      <span className="font-mono text-primary dark:text-secondary truncate max-w-[200px]">{claim.evidenceFile}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-slate-500">{isFa ? 'متدولوژی اندازه‌گیری:' : 'Methodology:'}</span>
                      <span className="text-slate-800 dark:text-slate-200 text-right rtl:text-left truncate max-w-[220px]">
                        {isFa ? claim.sourceMethodologyFa : claim.sourceMethodologyEn}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono">
                    Review Cycle: {claim.reviewCycleMonths} mo
                  </span>

                  <button
                    onClick={() => handleDownloadDossier(claim.id, claim.evidenceFile || 'EVD-FILE.pdf')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-colors cursor-pointer shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isFa ? 'دانلود پرونده مهندسی' : 'Download Dossier'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Sub-tab 2: Simulations */}
      {activeSubTab === 'simulations' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
            <div className="font-bold text-sm text-slate-900 dark:text-white">
              {isFa ? 'مدل‌های کالیبره‌شده دینامیک سیالات و انتقال حرارت (HYSYS / Petrel)' : 'Calibrated Thermodynamic & Reservoir Numerical Models'}
            </div>
            <span className="text-xs font-mono text-slate-500">3 Verified Packages</span>
          </div>

          <div className="grid md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700">
              <div className="font-bold text-slate-900 dark:text-white mb-1">ECLIPSE Sarakhs Retrofit v14.2</div>
              <p className="text-slate-600 dark:text-slate-400 mb-3">Subsurface temperature gradient models calibrated for 2,800m depleted gas wells.</p>
              <div className="font-mono text-[11px] text-amber-600 dark:text-amber-400 font-bold mb-3">Clearance: Level D / Confidential</div>
              <button 
                onClick={() => handleDownloadDossier('CLM-TECH-002', 'SARAKHS-ECLIPSE-V14.2.zip')}
                className="w-full py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-primary hover:text-white transition-colors font-bold text-center"
              >
                {isFa ? 'دانلود پکیج مدل‌سازی' : 'Download Simulation Package'}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700">
              <div className="font-bold text-slate-900 dark:text-white mb-1">Aspen HYSYS ORC Binary Loop</div>
              <p className="text-slate-600 dark:text-slate-400 mb-3">Supercritical organic fluid mass balance and 88% thermal transfer efficiency model.</p>
              <div className="font-mono text-[11px] text-amber-600 dark:text-amber-400 font-bold mb-3">Clearance: Level D / Confidential</div>
              <button 
                onClick={() => handleDownloadDossier('CLM-PERF-002', 'HYSYS-ORC-BINARY-V4.zip')}
                className="w-full py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-primary hover:text-white transition-colors font-bold text-center"
              >
                {isFa ? 'دانلود پکیج مدل‌سازی' : 'Download Simulation Package'}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700">
              <div className="font-bold text-slate-900 dark:text-white mb-1">Persian Gulf Desal Flowsheet</div>
              <p className="text-slate-600 dark:text-slate-400 mb-3">42,000 ppm TDS thermal reject-heat co-generation mass-balance simulator.</p>
              <div className="font-mono text-[11px] text-amber-600 dark:text-amber-400 font-bold mb-3">Clearance: Level D / Confidential</div>
              <button 
                onClick={() => handleDownloadDossier('CLM-TECH-003', 'DESAL-FLOWSHEET-V2.zip')}
                className="w-full py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-primary hover:text-white transition-colors font-bold text-center"
              >
                {isFa ? 'دانلود پکیج مدل‌سازی' : 'Download Simulation Package'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 3: Field Logs */}
      {activeSubTab === 'fieldLogs' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
            <div className="font-bold text-sm text-slate-900 dark:text-white">
              {isFa ? 'نتایج آزمون‌های میدانی، سنسورهای فشار و لاگ‌های تست هیدرواستاتیک' : 'Field Inspection Telemetry & Hydrostatic Pressure Logs'}
            </div>
            <span className="text-xs font-mono text-slate-500">Level C Field Test Records</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Qeshm Island Phase 1 Subsea Intake Hydro-Testing Log</div>
                <div className="text-slate-500 text-[11px] mt-0.5">Ref: EVD-PRJ-QESHM-PH1-2024 &bull; Verified 120 Bar containment with zero pressure decay over 48 hours.</div>
              </div>
              <button 
                onClick={() => handleDownloadDossier('CLM-TECH-001', 'EVD-PRJ-QESHM-PH1-2024.pdf')}
                className="px-3.5 py-1.5 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors self-start sm:self-auto shrink-0"
              >
                {isFa ? 'دانلود لاگ هیدروتست' : 'Download Log'}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">GMEL-DrillX Sonic Resonance Friction Testbed Dossier</div>
                <div className="text-slate-500 text-[11px] mt-0.5">Ref: EVD-DRILLX-PULL-2024-09.pdf &bull; Load-cell telemetry in 1,400m simulated core sleeves documenting 34% drag reduction.</div>
              </div>
              <button 
                onClick={() => handleDownloadDossier('CLM-PERF-001', 'EVD-DRILLX-PULL-2024-09.pdf')}
                className="px-3.5 py-1.5 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors self-start sm:self-auto shrink-0"
              >
                {isFa ? 'دانلود لاگ تست‌بد' : 'Download Log'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default EngineeringVaultTab;
