import * as React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, Leaf, Users, Award, FileText, CheckCircle2, 
  ExternalLink, AlertCircle, Compass, Droplets, Zap, ChevronRight, Lock
} from 'lucide-react';
import { Page } from '../types';

interface ESGDashboardProps {
  setPage?: (page: Page) => void;
}

export const ESGDashboard: React.FC<ESGDashboardProps> = ({ setPage }) => {
  const [activeTab, setActiveTab] = React.useState<
    'approach' | 'environmental' | 'social' | 'governance' | 'methodology' | 'disclosures' | 'reports'
  >('approach');

  return (
    <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-10 shadow-xl border border-slate-200 dark:border-slate-800 transition-colors">
      
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2 border border-emerald-200 dark:border-emerald-800/60">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Corporate Sustainability & Governance Framework</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            Sustainability, Environmental Stewardship & Governance
          </h2>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
            KKM International Group approaches sustainability through verifiable engineering discipline, closed-loop resource conservation, and rigorous ISO governance frameworks.
          </p>
        </div>

        {/* Evidence Registry Link & Truth Layer Badge */}
        <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex-shrink-0 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Production Truth Layer
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
              className="px-3.5 py-1.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Inspect Evidence Registry</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation Tabs (7 Sections Specified in Executive Directive) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 my-6 border-b border-slate-200 dark:border-slate-800 scrollbar-thin">
        {[
          { id: 'approach', label: '1. Sustainability Approach' },
          { id: 'environmental', label: '2. Environmental Performance' },
          { id: 'social', label: '3. Social Responsibility' },
          { id: 'governance', label: '4. Corporate Governance' },
          { id: 'methodology', label: '5. Methodology' },
          { id: 'disclosures', label: '6. Evidence & Disclosures' },
          { id: 'reports', label: '7. Reports & Certifications' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
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
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Engineering-First Decarbonization
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Rather than relying on unverified off-site carbon offsets, KKM focuses on direct physical emissions reductions: closed-loop baseload geothermal heat recovery, waste-heat industrial reuse, and zero-chemical thermodynamic cycles.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-3">
                <Droplets className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Water Cycle Stewardship
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Addressing regional water scarcity in arid corridors by integrating low-temperature thermal desalination with industrial waste-heat and closed-loop brine concentration to protect vulnerable agricultural aquifers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Rural Socioeconomic Value
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Structuring productive infrastructure around the "One Village, One Integrated System" territorial model to retain economic value, provide sustainable local employment, and prevent climate-induced displacement.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400">
            <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
              Methodological Note on Corporate Claims:
            </span>
            KKM International Group policies require that numeric ESG maturity scores are not published without certified, third-party audit reports attached to the KKM Evidence Registry. All claims below are categorized with their respective engineering verification levels.
          </div>
        </div>
      )}

      {/* Tab 2: Environmental Performance */}
      {activeTab === 'environmental' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Closed-Loop Subsurface Heat Recovery
                </h3>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-bold border border-purple-200 dark:border-purple-800">
                  Level C — Internal Test Result
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                The GMEL-CLG closed-loop casing technology eliminates subsurface fracking and fluid extraction, achieving zero direct fluid venting to the surface.
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
                  <span className="font-mono text-primary dark:text-secondary">EVD-TECH-GMEL-2025-01</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Desalination & Water Recovery
                </h3>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-bold border border-amber-200 dark:border-amber-800">
                  Level D — Engineering Model
                </span>
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
                  <span className="font-mono text-primary dark:text-secondary">EVD-DESAL-THERMO-2025-07</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Social Responsibility */}
      {activeTab === 'social' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                HSE & Occupational Safety Framework
              </h3>
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

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Community Engagement & Local STEM
              </h3>
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
          </div>
        </div>
      )}

      {/* Tab 4: Corporate Governance */}
      {activeTab === 'governance' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Anti-Bribery & Anti-Corruption Governance
                </h3>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 font-bold border border-cyan-200 dark:border-cyan-800">
                  Level E — ISO 37001 Roadmap
                </span>
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

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Technical Advisory & Dual-Signature Controls
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                All capital expenditure approvals exceeding threshold limits and all engineering design packages require dual sign-off from both the Principal Project Architect and the Independent Governance Reviewer.
              </p>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <div>• Independent audit logs for all EPC subcontracts</div>
                <div>• Strict non-disclosure and intellectual property custody controls</div>
                <div>• Annual corporate governance review reported to the Board of Directors</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Methodology */}
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

      {/* Tab 6: Evidence & Disclosures */}
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
                className="px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-dark transition-all flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Open Full Evidence Registry</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Tab 7: Reports & Certifications */}
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
                  <span className="font-bold text-amber-600 dark:text-amber-400">Internal Framework in Implementation</span>
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
                  <span className="font-bold text-amber-600 dark:text-amber-400">Stage 1 Internal Readiness</span>
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
