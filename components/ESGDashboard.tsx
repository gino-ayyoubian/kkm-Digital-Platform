import * as React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, Leaf, Users, Award, FileText, CheckCircle2, 
  ExternalLink, AlertCircle, Compass, Droplets, Zap, ChevronRight, Lock,
  SlidersHorizontal, CheckCircle, Database, Activity, Gauge, RefreshCw, Cpu
} from 'lucide-react';
import { Page, ClaimStatus } from '../types';
import { ClaimRegistry } from './ClaimRegistry';
import { CLAIM_STATUS_CONFIG } from '../data/claimsRegistryData';

interface ESGDashboardProps {
  setPage?: (page: Page) => void;
}

export const ESGDashboard: React.FC<ESGDashboardProps> = ({ setPage }) => {
  const [activeTab, setActiveTab] = React.useState<
    'approach' | 'environmental' | 'social' | 'governance' | 'claims' | 'demonstration' | 'methodology' | 'disclosures' | 'reports'
  >('approach');

  const [categoryFilter, setCategoryFilter] = React.useState<ClaimStatus | 'All'>('All');

  // Interactive Demonstration state (P0-02 Qualified)
  const [demoWellheadTemp, setDemoWellheadTemp] = React.useState(148.5);
  const [demoLoopPressure, setDemoLoopPressure] = React.useState(122.4);
  const [demoFluidFlow, setDemoFluidFlow] = React.useState(42.8);
  const [isSimulating, setIsSimulating] = React.useState(false);

  const handleSimulateCycle = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setDemoWellheadTemp(prev => Number((146 + Math.random() * 5).toFixed(1)));
      setDemoLoopPressure(prev => Number((120 + Math.random() * 6).toFixed(1)));
      setDemoFluidFlow(prev => Number((41 + Math.random() * 4).toFixed(1)));
      setIsSimulating(false);
    }, 600);
  };

  return (
    <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-10 shadow-xl border border-slate-200 dark:border-slate-800 transition-colors">
      
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider mb-3 border border-emerald-200 dark:border-emerald-800/60">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>P0-13 & P0-02 Directive: ESG Claim Governance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            Sustainability, Environmental Stewardship & Governance
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
            KKM International Group strictly qualifies all ESG disclosures across four audited categories: Verified, Internal, Estimated, and Demonstration data. Unverified simulated counters are replaced by traceable evidence records.
          </p>
        </div>

        {/* Evidence Registry Link & Truth Layer Badge */}
        <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex-shrink-0 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Production Truth Layer</span>
          </div>
          <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
            KKM Evidence Registry
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 mb-2">
            Classification Levels A through G
          </div>
          {setPage && (
            <button
              onClick={() => setPage(Page.EvidenceRegistry)}
              className="px-3.5 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-dark transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Inspect Evidence Registry</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Strict 4-Category Data Qualification Matrix (P0-13 & P0-02) */}
      <div className="my-6 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            <SlidersHorizontal className="w-4 h-4 text-primary dark:text-secondary" />
            <span>P0-02 & P0-13 Data Classification Standards</span>
          </div>
          <div className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-100/60 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-800">
            <CheckCircle2 className="w-3 h-3" />
            <span>Simulated Counters Abolished — Formal Status Labels Active</span>
          </div>
        </div>

        {/* Clickable 4-Category Filter Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {(['Verified', 'Internal', 'Estimated', 'Demonstration'] as ClaimStatus[]).map(status => {
            const cfg = CLAIM_STATUS_CONFIG[status];
            const isSelected = categoryFilter === status;

            return (
              <button
                key={status} 
                onClick={() => setCategoryFilter(categoryFilter === status ? 'All' : status)}
                className={`p-3.5 rounded-xl border text-left rtl:text-right transition-all cursor-pointer ${
                  isSelected
                    ? 'ring-2 ring-primary border-primary bg-white dark:bg-slate-900 shadow-md'
                    : `${cfg.badgeBg} ${cfg.borderColor} hover:border-slate-400`
                }`}
              >
                <div className={`font-bold mb-1 flex items-center justify-between ${cfg.textColor}`}>
                  <span className="font-mono">{cfg.labelEn}</span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/80 dark:bg-slate-900/80 border border-current font-bold">
                    {status === 'Verified' ? 'Level A-B' : status === 'Internal' ? 'Level C-E' : status === 'Estimated' ? 'Level D' : 'Level F'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                  {cfg.descriptionEn}
                </p>
                {status === 'Demonstration' && (
                  <div className="mt-2 text-[10px] font-mono font-bold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/80 px-2 py-0.5 rounded border border-purple-300 dark:border-purple-800">
                    P0-02 Qualified Notice
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {categoryFilter !== 'All' && (
          <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
            <span className="text-slate-600 dark:text-slate-400 font-medium">
              Filtering dashboard disclosures by: <strong className="text-slate-900 dark:text-white uppercase">{categoryFilter}</strong>
            </span>
            <button
              onClick={() => setCategoryFilter('All')}
              className="text-xs font-bold text-primary dark:text-secondary hover:underline cursor-pointer"
            >
              Clear Category Filter
            </button>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 my-6 border-b border-slate-200 dark:border-slate-800 scrollbar-thin">
        {[
          { id: 'approach', label: '1. Sustainability Approach' },
          { id: 'environmental', label: '2. Environmental Performance' },
          { id: 'social', label: '3. Social Responsibility' },
          { id: 'governance', label: '4. Corporate Governance' },
          { id: 'claims', label: '5. Structured Claim Registry (P0-13)' },
          { id: 'demonstration', label: '6. Demonstration Data Lab (P0-02)' },
          { id: 'methodology', label: '7. Accounting Methodology' },
          { id: 'disclosures', label: '8. Evidence & Disclosures' },
          { id: 'reports', label: '9. Reports & Certifications' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-primary text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Sustainability Approach */}
      {activeTab === 'approach' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Card 1: Decarbonization */}
            {(categoryFilter === 'All' || categoryFilter === 'Estimated') && (
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    Engineering-First Decarbonization
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    Rather than relying on unverified off-site carbon offsets, KKM focuses on direct physical emissions reductions: closed-loop baseload geothermal heat recovery, waste-heat industrial reuse, and zero-chemical thermodynamic cycles.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200 dark:border-slate-700 text-[11px] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-500">Category Status:</span>
                    <span className="px-2 py-0.5 rounded font-mono font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                      Estimated
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Evidence Reference:</span>
                    <span className="font-mono text-primary dark:text-secondary font-bold">EVD-GHG-ORC-2025-02</span>
                  </div>
                </div>
              </div>
            )}

            {/* Card 2: Water Stewardship */}
            {(categoryFilter === 'All' || categoryFilter === 'Estimated') && (
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-3">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    Water Cycle Stewardship
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    Addressing regional water scarcity in arid corridors by integrating low-temperature thermal desalination with industrial waste-heat and closed-loop brine concentration to protect vulnerable agricultural aquifers.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200 dark:border-slate-700 text-[11px] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-500">Category Status:</span>
                    <span className="px-2 py-0.5 rounded font-mono font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                      Estimated
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Evidence Reference:</span>
                    <span className="font-mono text-primary dark:text-secondary font-bold">EVD-DESAL-THERMO-2025-07</span>
                  </div>
                </div>
              </div>
            )}

            {/* Card 3: Rural Socioeconomic Value */}
            {(categoryFilter === 'All' || categoryFilter === 'Verified') && (
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    Rural Socioeconomic Value
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    Structuring productive infrastructure around the "One Village, One Integrated System" territorial model to retain economic value, provide sustainable local employment, and prevent climate-induced displacement.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200 dark:border-slate-700 text-[11px] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-500">Category Status:</span>
                    <span className="px-2 py-0.5 rounded font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                      Verified
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Evidence Reference:</span>
                    <span className="font-mono text-primary dark:text-secondary font-bold">EVD-RURAL-SURVEY-2025</span>
                  </div>
                </div>
              </div>
            )}

          </div>

          <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400">
            <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
              Methodological Note on Corporate Claims (P0-13 & P0-02):
            </span>
            KKM International Group policies require that numeric ESG maturity scores are not published without certified, third-party audit reports attached to the KKM Evidence Registry. All claims below are categorized with their respective engineering verification levels.
          </div>
        </div>
      )}

      {/* Tab 2: Environmental Performance */}
      {activeTab === 'environmental' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Environmental Metric 1 */}
            {(categoryFilter === 'All' || categoryFilter === 'Internal') && (
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Closed-Loop Subsurface Heat Recovery
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800">
                      STATUS: Internal
                    </span>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-bold border border-purple-200 dark:border-purple-800">
                      Level C
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  The GMEL-CLG closed-loop casing technology eliminates subsurface hydraulic fracturing and open reservoir fluid extraction, achieving zero direct fluid venting to the surface.
                </p>
                <div className="space-y-2 text-xs border-t border-slate-200 dark:border-slate-700 pt-3">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Surface Fluid Loss:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">Zero (Hermetically Sealed Loop)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Chemical Additives:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">Zero Fracking Chemicals</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Evidence Record:</span>
                    <span className="font-mono text-primary dark:text-secondary font-bold">EVD-TECH-GMEL-2025-01</span>
                  </div>
                </div>
              </div>
            )}

            {/* Environmental Metric 2 */}
            {(categoryFilter === 'All' || categoryFilter === 'Estimated') && (
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Desalination & Water Recovery
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 font-bold border border-amber-200 dark:border-amber-800">
                      STATUS: Estimated
                    </span>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-bold border border-amber-200 dark:border-amber-800">
                      Level D
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Thermal desalination models indicate high recovery rates utilizing low-grade 45°C–85°C reject heat without auxiliary fossil fuel combustion.
                </p>
                <div className="space-y-2 text-xs border-t border-slate-200 dark:border-slate-700 pt-3">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Feedstock Salinity:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">38,000 – 42,000 ppm TDS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Thermal Energy Input:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">ORC Thermal Reject Heat</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Evidence Record:</span>
                    <span className="font-mono text-primary dark:text-secondary font-bold">EVD-DESAL-THERMO-2025-07</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Tab 3: Social Responsibility */}
      {activeTab === 'social' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            
            {(categoryFilter === 'All' || categoryFilter === 'Internal') && (
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    HSE & Occupational Safety Framework
                  </h3>
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800">
                    STATUS: Internal (Level E)
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                  KKM maintains a zero-tolerance policy regarding worksite safety across drilling testbeds, civil contracting sites, and mechanical assembly yards.
                </p>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Mandatory pre-shift hazard analysis and daily toolbox briefings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Continuous atmospheric telemetry in wellhead containment zones</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Independent incident investigation and root-cause transparency</span>
                  </li>
                </ul>
              </div>
            )}

            {(categoryFilter === 'All' || categoryFilter === 'Verified') && (
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Community Engagement & Local STEM
                  </h3>
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800">
                    STATUS: Verified (Level A)
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                  Our rural development programs prioritize participatory planning with local councils, village elders, and agricultural cooperatives.
                </p>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Technical operator training for resident youth on rural desalination skids</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Transparent water rights allocation agreements with municipal users</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>University partnership programs and subsurface engineering scholarships</span>
                  </li>
                </ul>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Tab 4: Corporate Governance */}
      {activeTab === 'governance' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            
            {(categoryFilter === 'All' || categoryFilter === 'Internal') && (
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Anti-Bribery & Anti-Corruption Governance
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800">
                      STATUS: Internal
                    </span>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 font-bold border border-cyan-200 dark:border-cyan-800">
                      Level E
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                  KKM has instituted an Anti-Bribery Management System structured to align directly with ISO 37001 principles.
                </p>
                <div className="space-y-2 text-xs border-t border-slate-200 dark:border-slate-700 pt-3">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Framework Document:</span>
                    <span className="font-mono text-slate-800 dark:text-slate-200">EVD-GOV-ISO37001-MANUAL-2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Current Status:</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">Stage 1 Internal Implementation</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">External Certification Audit:</span>
                    <span className="text-slate-800 dark:text-slate-200">Scheduled Q4 2026</span>
                  </div>
                </div>
              </div>
            )}

            {(categoryFilter === 'All' || categoryFilter === 'Verified') && (
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Technical Advisory & Dual-Signature Controls
                  </h3>
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800">
                    STATUS: Verified (Level A)
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                  All capital expenditure approvals exceeding threshold limits and all engineering design packages require dual sign-off from both the Principal Project Architect and the Independent Governance Reviewer.
                </p>
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  <div>• Independent audit logs for all EPC subcontracts</div>
                  <div>• Strict non-disclosure and intellectual property custody controls</div>
                  <div>• Annual corporate governance review reported to the Board of Directors</div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Tab 5: Embedded Structured Claim Governance Registry (P0-13) */}
      {activeTab === 'claims' && (
        <div className="space-y-4">
          <ClaimRegistry setPage={setPage} defaultDomain="ESG" />
        </div>
      )}

      {/* Tab 6: Demonstration Data Lab (P0-02 Directive) */}
      {activeTab === 'demonstration' && (
        <div className="space-y-6">
          
          {/* Mandatory P0-02 Directive Banner */}
          <div className="p-5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border-2 border-purple-300 dark:border-purple-800 text-purple-900 dark:text-purple-200">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase mb-2 text-purple-700 dark:text-purple-400">
              <AlertCircle className="w-4 h-4" />
              <span>Mandatory Disclosure Notice — Directive P0-02 (Demonstration Data Qualification)</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed font-medium">
              <strong>DEMONSTRATION DATA ONLY:</strong> The interactive telemetry feeds, turbine simulation gauges, and sensor streams below are <em>synthesized demonstration datasets</em>. They are implemented strictly to validate user experience pipelines, SCADA polling architectures, and machine-learning visualization interfaces. They do not constitute audited historical or operational performance. For verifiable operational evidence, please consult Level A and B records in the KKM Evidence Registry.
            </p>
          </div>

          {/* Interactive Demonstration Widget */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800">
                    P0-02 QUALIFIED DEMONSTRATION STREAM
                  </span>
                  <span className="text-xs font-mono text-slate-400">Level F: Platform Prototype</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                  Synthetic Subsurface Telemetry Stream (Prototype)
                </h3>
              </div>

              <button
                onClick={handleSimulateCycle}
                disabled={isSimulating}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm self-start sm:self-auto"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
                <span>{isSimulating ? 'Simulating Polling...' : 'Trigger Prototype Polling Cycle'}</span>
              </button>
            </div>

            {/* Gauges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
              
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                <div className="text-slate-400 text-xs font-mono uppercase mb-1 flex items-center justify-center gap-1">
                  <Gauge className="w-3.5 h-3.5" />
                  <span>Wellhead BHT Temperature</span>
                </div>
                <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-white my-2">
                  {demoWellheadTemp} <span className="text-sm font-sans font-medium text-slate-400">°C</span>
                </div>
                <div className="text-[10px] font-mono text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 py-0.5 rounded">
                  P0-02 Synthetic Output
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                <div className="text-slate-400 text-xs font-mono uppercase mb-1 flex items-center justify-center gap-1">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Hermetic Loop Pressure</span>
                </div>
                <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-white my-2">
                  {demoLoopPressure} <span className="text-sm font-sans font-medium text-slate-400">bar</span>
                </div>
                <div className="text-[10px] font-mono text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 py-0.5 rounded">
                  P0-02 Synthetic Output
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                <div className="text-slate-400 text-xs font-mono uppercase mb-1 flex items-center justify-center gap-1">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Supercritical Mass Flow</span>
                </div>
                <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-white my-2">
                  {demoFluidFlow} <span className="text-sm font-sans font-medium text-slate-400">kg/s</span>
                </div>
                <div className="text-[10px] font-mono text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 py-0.5 rounded">
                  P0-02 Synthetic Output
                </div>
              </div>

            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700/60 pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>Qualification Audit: <strong>Level F (Demonstration Data)</strong></span>
              <span>Dataset Pointer: <code className="font-mono text-primary dark:text-secondary">EVD-TWIN-SIM-DATA-01.json</code></span>
            </div>
          </div>

        </div>
      )}

      {/* Tab 7: Accounting Methodology */}
      {activeTab === 'methodology' && (
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Measurement Protocols & Accounting Boundaries
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            KKM structures its environmental and performance accounting according to the following recognized global and national frameworks:
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="font-bold text-slate-900 dark:text-white mb-1">GHG Protocol Standard</div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Corporate Accounting & Reporting Standard for Scope 1 (direct operational) and Scope 2 (purchased grid electricity) emissions.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="font-bold text-slate-900 dark:text-white mb-1">ISO 14064-1 Guidelines</div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Specification with guidance at the organization level for quantification and reporting of greenhouse gas emissions and removals.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="font-bold text-slate-900 dark:text-white mb-1">TRL Gate System</div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                ISO 16290 / NASA Technology Readiness Level gates (TRL 1 through TRL 9) strictly distinguishing laboratory proofs from field pilots.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 8: Evidence & Disclosures */}
      {activeTab === 'disclosures' && (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Public Disclosures in the KKM Evidence Registry
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              All quantitative claims across KKM web assets are cataloged in our live Evidence Registry with direct attribution to technical reports, testing logs, or patent application filings.
            </p>
            {setPage && (
              <button
                onClick={() => setPage(Page.EvidenceRegistry)}
                className="px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-dark transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <FileText className="w-4 h-4" />
                <span>Open Full Evidence Registry</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Tab 9: Reports & Certifications */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-primary dark:text-secondary" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  ISO 14001: Environmental Management
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                Corporate environmental management system framework structured according to ISO 14001 requirements.
              </p>
              <div className="space-y-1.5 text-xs text-slate-500 border-t border-slate-200 dark:border-slate-700 pt-3">
                <div className="flex justify-between">
                  <span>Current Status:</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">STATUS: Internal Framework in Implementation</span>
                </div>
                <div className="flex justify-between">
                  <span>Target Certification Audit:</span>
                  <span className="text-slate-800 dark:text-slate-200">2026 Post-Pilot Evaluation</span>
                </div>
                <div className="flex justify-between">
                  <span>Policy Document:</span>
                  <span className="font-mono text-primary dark:text-secondary">EVD-HSE-ISO14001-POLICY-2025</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-primary dark:text-secondary" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  ISO 37001: Anti-Bribery Management
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                Anti-corruption, fair contracting, and third-party diligence controls instituted across all EPC supply chains.
              </p>
              <div className="space-y-1.5 text-xs text-slate-500 border-t border-slate-200 dark:border-slate-700 pt-3">
                <div className="flex justify-between">
                  <span>Current Status:</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">STATUS: Internal Stage 1 Readiness</span>
                </div>
                <div className="flex justify-between">
                  <span>Accredited Audit:</span>
                  <span className="text-slate-800 dark:text-slate-200">Scheduled Q4 2026</span>
                </div>
                <div className="flex justify-between">
                  <span>Policy Document:</span>
                  <span className="font-mono text-primary dark:text-secondary">EVD-GOV-ISO37001-MANUAL-2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default ESGDashboard;
