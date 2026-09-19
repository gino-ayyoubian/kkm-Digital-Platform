import * as React from 'react';
import { Page } from '../types';
import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';
import { 
  ChevronRight, Database, Cpu, Droplets, Zap, Shield, Factory, 
  Layers, ArrowRight, Sprout, CheckCircle2, Building2, Compass, 
  ShieldCheck, Award, FileText, AlertTriangle, ExternalLink, Activity
} from 'lucide-react';
import IPBadge from '../components/IPBadge';

interface GMELHubPageProps {
  setPage: (page: Page) => void;
}

export const GMELHubPage: React.FC<GMELHubPageProps> = ({ setPage }) => {
  const { direction, language } = useLanguage();
  const isFa = language === 'FA';
  const [activeTab, setActiveTab] = React.useState('Overview');

  const tabs = [
    { id: 'Overview', labelEn: 'Overview', labelFa: 'نمای کلی' },
    { id: 'Architecture', labelEn: 'Architecture', labelFa: 'معماری فنی' },
    { id: 'GMEL-CLG', labelEn: 'GMEL-CLG', labelFa: 'استخراج مداربسته (CLG)' },
    { id: 'GMEL-EHS', labelEn: 'GMEL-EHS', labelFa: 'سامانه هیدروترمال (EHS)' },
    { id: 'GMEL-DrillX', labelEn: 'GMEL-DrillX', labelFa: 'فناوری حفاری DrillX' },
    { id: 'ThermoFluid', labelEn: 'ThermoFluid', labelFa: 'نانوسیال حرارتی' },
    { id: 'ORC Compact', labelEn: 'ORC Compact', labelFa: 'نیروگاه مدولار ORC' },
    { id: 'Desalination', labelEn: 'Desalination', labelFa: 'آب‌شیرین‌کن حرارتی' },
    { id: 'H2Cell', labelEn: 'H2Cell Coupling', labelFa: 'تولید هیدروژن H2Cell' },
    { id: 'Applications', labelEn: 'Applications', labelFa: 'کاربردهای صنعتی' },
    { id: 'IP', labelEn: 'IP & Patents', labelFa: 'حاکمیت مالکیت فکری' },
    { id: 'Development Roadmap', labelEn: 'Roadmap', labelFa: 'نقشه راه TRL' },
    { id: 'Evidence', labelEn: 'Evidence Records', labelFa: 'شواهد و ممیزی' }
  ];

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen pt-20 pb-16 transition-colors" dir={direction}>
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-16 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gmel-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#38bdf8" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gmel-grid)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
              <Zap className="w-3.5 h-3.5" />
              {isFa ? 'اکوسیستم فناوری زمین‌گرمایی پیشرفته KKM' : 'ADVANCED GEOTHERMAL & THERMODYNAMIC PLATFORM'}
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight mb-4">
              GeoMeta Energy Layer (GMEL)
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
              <IPBadge status="Invented by" text="KKM International Group" />
              <IPBadge status="Patent Filed" text="IP Ref: GMEL-CLG-001" />
              <IPBadge status="Under Development" text="Evidence Level C/D" />
            </div>

            <p className="text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
              {isFa 
                ? 'پلتفرم جامع مهندسی زیرسطحی، تبادل حرارتی مداربسته و تبدیل ترمودینامیکی بار پایه انرژی، پیونددهنده پروژه‌های صنعتی، آب‌شیرین‌کن‌ها و پلتفرم توسعه پایدار.'
                : 'A multidisciplinary subsurface engineering platform delivering closed-loop baseload clean power, industrial process heat, and low-temperature desalination without subsurface hydraulic fracturing.'}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Development Platform Context Block */}
        <div className="mb-8 bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 shadow-xl text-white">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold tracking-wider">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                {isFa ? 'مشارکت‌کننده فنی در پلتفرم توسعه سرزمینی KKM' : 'TECHNICAL CONTRIBUTOR · KKM TERRITORIAL & RURAL PLATFORMS'}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {isFa 
                  ? 'GMEL به‌عنوان موتور زیرساختی پلتفرم‌های کلان، نه یک محصول منفرد' 
                  : 'GMEL as the Foundational Energy-Water Engine for Regional Platforms'}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {isFa 
                  ? 'فناوری GMEL با پیوند دادن چاه‌های عمیق بازنشسته به چرخه‌های بسته آلی رنکین (ORC) و تبخیرکننده‌های حرارتی نمک‌زدایی، انرژی و آب پایدار برای سکونت‌گاه‌های خشک و زنجیره‌های ارزش کشاورزی فراهم می‌آورد.' 
                  : 'GMEL turns decommissioned hydrocarbon wellbores and thermal reservoirs into zero-emission baseload microgrids, pairing ORC electrical generation with multi-effect thermal desalination for industrial corridors and arid rural settlements.'}
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto">
              <button
                onClick={() => setPage(Page.RuralStudies)}
                className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>{isFa ? 'مشاهده پلتفرم توسعه روستایی' : 'Explore Rural Platform'}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
              <button
                onClick={() => setPage(Page.EvidenceRegistry)}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
                <span>{isFa ? 'شواهد ثبت‌شده GMEL' : 'GMEL Evidence Records'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <div className="w-full md:w-72 flex-shrink-0">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-3 sticky top-24">
              <div className="text-[11px] font-mono uppercase font-bold text-slate-400 px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                {isFa ? 'ماژول‌های GMEL' : 'GMEL System Modules'}
              </div>
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                      activeTab === tab.id 
                        ? 'bg-primary text-white shadow-sm' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{isFa ? tab.labelFa : tab.labelEn}</span>
                    <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180 opacity-70" />
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 sm:p-8 min-h-[620px]">
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'Overview' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div>
                    <span className="text-xs font-mono font-bold text-primary dark:text-secondary uppercase">
                      Module 01 · System Summary
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1 mb-3">
                      {isFa ? 'نمای کلی اکوسیستم انرژی ژئومتا (GMEL)' : 'GMEL Ecosystem Overview'}
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                      {isFa 
                        ? 'GMEL یک سامانه چندرشته‌ای است که استحصال حرارت عمیق بدون شکست هیدرولیکی، نانوسیالات پیشرفته تبادل دما، چرخه‌های تبدیل توان آلی رنکین، و سامانه‌های نمک‌زدایی همزمان را در یک معماری یکپارچه متصل می‌سازد.'
                        : 'GMEL integrates proprietary subsurface heat exchangers, nanotech thermal carriers, modular ORC power skids, and thermal desalination into a unified closed-loop infrastructure architecture.'}
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-5 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">
                        Subsurface Closed Loop
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        Hermetically sealed downhole coaxial casing extracting heat conduction-only without groundwater contact or seismic risk.
                      </p>
                    </div>

                    <div className="p-5 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-3">
                        <Database className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">
                        Digital Twin Telemetry
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        Real-time downhole fiber-optic strain and temperature telemetry feeding predictive thermodynamic dispatch algorithms.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between">
                    <span>IP Status: Multi-stage PCT and national claims under active governance.</span>
                    <button onClick={() => setActiveTab('IP')} className="font-bold text-primary dark:text-secondary hover:underline">
                      View IP Registry →
                    </button>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: ARCHITECTURE */}
              {activeTab === 'Architecture' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div>
                    <span className="text-xs font-mono font-bold text-primary dark:text-secondary uppercase">
                      Module 02 · System Architecture
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1 mb-3">
                      {isFa ? 'معماری فنی و چرخه فرآیندی GMEL' : 'Technical Flow & Process Architecture'}
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {isFa 
                        ? 'فرآیند GMEL از ۵ زیرسامانه متوالی تشکیل شده که انرژی گرمایی زمین را به برق پایدار، آب شیرین و گرمایش کاربردی تبدیل می‌نماید.'
                        : 'The GMEL process spans 5 consecutive subsystems transforming deep geothermal heat into baseload clean electricity, pure water, and district thermal services.'}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { step: '01', nameEn: 'Subsurface Heat Conduction (GMEL-CLG)', descEn: 'Downhole closed-loop vacuum-insulated coaxial exchanger extracts bedrock heat without fluid production.' },
                      { step: '02', nameEn: 'ThermoFluid Heat Conveyance', descEn: 'Supercritical working fluid ascends with minimal thermal loss to surface manifold.' },
                      { step: '03', nameEn: 'Binary ORC Power Conversion', descEn: 'High-efficiency Organic Rankine Cycle expands vapor across turbine to generate baseload electricity.' },
                      { step: '04', nameEn: 'Multi-Effect Thermal Desalination', descEn: 'Condenser reject heat (45°C–85°C) is captured directly for multi-effect distillation of seawater or brackish brine.' },
                      { step: '05', nameEn: 'Digital Twin Optimization Engine', descEn: 'Downhole sensor bus dynamically balances circulation velocity against reservoir thermal recharge rate.' }
                    ].map(st => (
                      <div key={st.step} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-start gap-4">
                        <span className="font-mono font-bold text-xs px-2.5 py-1 rounded bg-primary/10 text-primary dark:text-secondary">
                          {st.step}
                        </span>
                        <div>
                          <div className="text-sm font-bold text-slate-900 dark:text-white">{st.nameEn}</div>
                          <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{st.descEn}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* TAB 3: GMEL-CLG */}
              {activeTab === 'GMEL-CLG' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-primary dark:text-secondary uppercase">
                        Technology Asset · GMEL-CLG-001
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                        Verification Level C
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
                      {isFa ? 'فناوری استخراج مداربسته زمین‌گرمایی (GMEL-CLG)' : 'Closed-Loop Geothermal Extraction (GMEL-CLG)'}
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {isFa 
                        ? 'سامانه GMEL-CLG از لوله‌های هم‌مرکز عایق خلأ (VIT) درون چاه‌های حفرشده یا بازنشسته گازی استفاده می‌کند. سیال در فضای حلقوی فرود آمده و از مجرای مرکزی فوق‌عایق با حداکثر آنتالپی صعود می‌نماید.'
                        : 'GMEL-CLG deploys vacuum-insulated tubing (VIT) coaxial strings inside deep boreholes or retrofitted depleted hydrocarbon wells. The carrier fluid descends through the outer annulus and ascends via the insulated center string.'}
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                      <div className="font-bold text-slate-500 mb-1">Operational Loop</div>
                      <div className="text-base font-bold text-slate-900 dark:text-white">100% Sealed</div>
                      <div className="text-slate-500 mt-1">Zero fluid exchange with reservoir formations.</div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                      <div className="font-bold text-slate-500 mb-1">Target Depth</div>
                      <div className="text-base font-bold text-slate-900 dark:text-white">2,200m – 3,800m</div>
                      <div className="text-slate-500 mt-1">Sarakhs basin and central plateau gradients.</div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                      <div className="font-bold text-slate-500 mb-1">Evidence Record</div>
                      <div className="text-base font-mono font-bold text-primary dark:text-secondary">EVD-TECH-GMEL-2025-01</div>
                      <div className="text-slate-500 mt-1">TRL-6 thermodynamic testbed.</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 4: GMEL-EHS */}
              {activeTab === 'GMEL-EHS' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div>
                    <span className="text-xs font-mono font-bold text-primary dark:text-secondary uppercase">
                      Technology Asset · GMEL-EHS-002
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1 mb-3">
                      Enhanced Hydrothermal System (GMEL-EHS)
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Advanced subsurface stimulation protocols engineered for depleted carbonate and fractured volcanic reservoirs, avoiding traditional toxic chemical fracking.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 text-xs text-slate-600 dark:text-slate-400">
                    <div className="font-bold text-slate-900 dark:text-white text-sm">Key Engineering Innovations:</div>
                    <div>• Thermal-shock cyclic stress induction to enhance natural micro-fracture conductivity</div>
                    <div>• Pure bio-neutral carrier fluids eliminating groundwater contamination hazards</div>
                    <div>• Micro-seismic acoustic arrays monitoring reservoir stress redistribution in real time</div>
                  </div>
                </motion.div>
              )}

              {/* TAB 5: GMEL-DrillX */}
              {activeTab === 'GMEL-DrillX' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-primary dark:text-secondary uppercase">
                        Technology Asset · GMEL-DRILLX-003
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 font-bold">
                        Verification Level C
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
                      GMEL-DrillX Sonic Resonance Drilling
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      A patented sonic-resonance excitation system that reduces casing friction and accelerates deep wellbore casing installation in hard geothermal formations.
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                      <div className="font-bold text-slate-700 dark:text-slate-300 mb-1">Measured Friction Reduction</div>
                      <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">Up to 34%</div>
                      <div className="text-slate-500 mt-1">Verified on rig pull test bench (EVD-DRILLX-PULL-2024-09).</div>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                      <div className="font-bold text-slate-700 dark:text-slate-300 mb-1">Wellbore Integrity</div>
                      <div className="text-xl font-bold text-slate-900 dark:text-white">Zero Mud Damage</div>
                      <div className="text-slate-500 mt-1">High-frequency axial resonance maintains borehole stability.</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 6: ThermoFluid */}
              {activeTab === 'ThermoFluid' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div>
                    <span className="text-xs font-mono font-bold text-primary dark:text-secondary uppercase">
                      Technology Asset · GMEL-TF-004 · Trade Secret
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1 mb-3">
                      Supercritical ThermoFluid Heat Carrier
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Custom-synthesized low-viscosity organic fluid with anti-scaling nanoparticle additives designed for rapid subsurface thermal absorption at elevated temperatures and pressures.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-xs text-amber-900 dark:text-amber-200">
                    <span className="font-bold block mb-1">Trade Secret Notice:</span>
                    Chemical composition and nanoparticle suspension formulas are protected under KKM Trade Secret Protocol (Vault Ref: EVD-IP-GMEL-TF-002-VAULT).
                  </div>
                </motion.div>
              )}

              {/* TAB 7: ORC Compact */}
              {activeTab === 'ORC Compact' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div>
                    <span className="text-xs font-mono font-bold text-primary dark:text-secondary uppercase">
                      Modular Equipment Skid · GMEL-ORC-005
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1 mb-3">
                      Modular ORC Compact Generation Skids
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Standardized skid-mounted binary Organic Rankine Cycle units ranging from 250 kWe to 2 MWe, pre-tested for rapid deployment on remote wellheads.
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4 text-xs">
                    <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                      <div className="text-slate-500 mb-1">Temperature Delta</div>
                      <div className="font-bold text-base text-slate-900 dark:text-white">85°C – 160°C</div>
                      <div className="text-slate-500 mt-1">Optimized for low-to-medium enthalpy resources.</div>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                      <div className="text-slate-500 mb-1">Deployment Format</div>
                      <div className="font-bold text-base text-slate-900 dark:text-white">Skid / Containerized</div>
                      <div className="text-slate-500 mt-1">Pre-commissioned plug-and-play modules.</div>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                      <div className="text-slate-500 mb-1">Availability Target</div>
                      <div className="font-bold text-base text-emerald-600 dark:text-emerald-400">98.5% Baseload</div>
                      <div className="text-slate-500 mt-1">Target uptime independent of weather.</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 8: Desalination */}
              {activeTab === 'Desalination' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div>
                    <span className="text-xs font-mono font-bold text-primary dark:text-secondary uppercase">
                      Co-Generation System · GMEL-DESAL-006
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1 mb-3">
                      Low-Temperature Thermal Desalination
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Harnessing ORC turbine exhaust and casing heat to power multi-effect thermal desalination without secondary fossil boilers.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Thermal Heat Input:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">55°C – 80°C Condenser Reject</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Product Water Quality:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">&lt; 50 ppm TDS (Potable / Agro Grade)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Verification Model:</span>
                      <span className="font-mono text-primary dark:text-secondary">EVD-DESAL-THERMO-2025-07 (Level D)</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 9: H2Cell */}
              {activeTab === 'H2Cell' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div>
                    <span className="text-xs font-mono font-bold text-primary dark:text-secondary uppercase">
                      Next-Gen Coupling · GMEL-H2-007
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1 mb-3">
                      High-Temperature Steam Electrolysis Coupling
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Conceptual coupling of geothermal high-pressure baseload steam with Solid Oxide Electrolyzer Cells (SOEC) to achieve enhanced electrical-to-hydrogen conversion efficiency.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-xs text-slate-600 dark:text-slate-400">
                    <span className="font-bold text-slate-900 dark:text-white block mb-1">Status: Level G — Conceptual & Research</span>
                    Currently modeled in partnership with advanced university energy laboratories. Target for pilot bench evaluation in 2027.
                  </div>
                </motion.div>
              )}

              {/* TAB 10: Applications */}
              {activeTab === 'Applications' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
                      Industrial & Regional Applications
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Deployable across diverse operational domains:
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                      <div className="font-bold text-slate-900 dark:text-white mb-1">Depleted Hydrocarbon Wellbores</div>
                      <p className="text-slate-500 leading-relaxed">Retrofitting orphaned oil & gas wells into perpetual clean baseload energy generators.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                      <div className="font-bold text-slate-900 dark:text-white mb-1">Arid Rural & Nomadic Hubs</div>
                      <p className="text-slate-500 leading-relaxed">Powering off-grid villages with integrated drinking water and greenhouse heating.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                      <div className="font-bold text-slate-900 dark:text-white mb-1">Free Zone Industrial Parks</div>
                      <p className="text-slate-500 leading-relaxed">Supplying zero-carbon 24/7 power to data centers, chemical plants, and cold storages.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                      <div className="font-bold text-slate-900 dark:text-white mb-1">Island Infrastructure (Qeshm)</div>
                      <p className="text-slate-500 leading-relaxed">Decoupling island utility grids from diesel generation and maritime water barges.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 11: IP & Governance */}
              {activeTab === 'IP' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-500" />
                      <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                        IP Governance Standard
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
                      GMEL Intellectual Property & Patent Register
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      All GMEL technologies are registered under standardized IP references with verifiable legal status:
                    </p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left rtl:text-right border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          <th className="py-3 px-4 font-mono">IP Reference</th>
                          <th className="py-3 px-4">Technology Asset</th>
                          <th className="py-3 px-4">IP Status</th>
                          <th className="py-3 px-4">Jurisdiction</th>
                          <th className="py-3 px-4">Evidence Record</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {[
                          { ref: 'GMEL-CLG-001', name: 'Closed-Loop Coaxial Geothermal Exchanger', status: 'Patent Filed / Pending', jur: 'National & PCT', evd: 'EVD-IP-GMEL-CLG-001' },
                          { ref: 'GMEL-EHS-002', name: 'Non-Chemical Thermal Reservoir Stimulation', status: 'Under Development', jur: 'Proprietary', evd: 'EVD-TECH-GMEL-2025-01' },
                          { ref: 'GMEL-DRILLX-003', name: 'Sonic Resonance Casing Vibration Tool', status: 'Patent Application Filed', jur: 'National', evd: 'EVD-DRILLX-PULL-2024-09' },
                          { ref: 'GMEL-TF-004', name: 'Supercritical Organic Heat Transfer Fluid', status: 'Trade Secret / Vault', jur: 'Global Secrecy', evd: 'EVD-IP-GMEL-TF-002-VAULT' },
                          { ref: 'GMEL-ORC-005', name: 'Modular Binary ORC Generator Skid', status: 'Know-how / EPC Design', jur: 'KKM Standard', evd: 'EVD-GHG-ORC-2025-02' }
                        ].map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="py-3 px-4 font-mono font-bold text-primary dark:text-secondary">{row.ref}</td>
                            <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">{row.name}</td>
                            <td className="py-3 px-4 font-semibold text-emerald-600 dark:text-emerald-400">{row.status}</td>
                            <td className="py-3 px-4 text-slate-500">{row.jur}</td>
                            <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{row.evd}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* TAB 12: Development Roadmap */}
              {activeTab === 'Development Roadmap' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
                      Technology Readiness Level (TRL) Roadmap
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Structured milestone gate progression from numerical formulation to commercial regional scale:
                    </p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { trl: 'TRL 1–3', phase: 'Scientific Formulation (2020–2022)', status: 'Completed', desc: 'Thermodynamic cycle modeling and nanocarrier fluid synthesis completed in university laboratories.' },
                      { trl: 'TRL 4–5', phase: 'Component Validation (2023–2024)', status: 'Completed', desc: 'Bench-scale closed-loop testbed and resonance casing mechanical pull tests executed.' },
                      { trl: 'TRL 6–7', phase: 'Field Pilot Deployment (2025–2026)', status: 'In Active Execution', desc: 'Retrofitting of Sarakhs testbed well and integration with Qeshm island co-generation facility.' },
                      { trl: 'TRL 8–9', phase: 'Commercial Scale & Regional Replication (2026–2028)', status: 'Target Milestone', desc: 'Multi-well commercial baseload field installations across regional industrial corridors.' }
                    ].map(stage => (
                      <div key={stage.trl} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-primary/10 text-primary dark:text-secondary">
                              {stage.trl}
                            </span>
                            <span className="font-bold text-sm text-slate-900 dark:text-white">{stage.phase}</span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{stage.desc}</p>
                        </div>
                        <span className="text-xs font-bold font-mono px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 self-start sm:self-auto shrink-0">
                          {stage.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* TAB 13: Evidence Records */}
              {activeTab === 'Evidence' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-500" />
                      <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                        Production Truth Layer
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
                      GMEL Evidence Registry Attribution
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      All technical specifications and performance indicators on this platform map to verified claim records in the official KKM Evidence Registry:
                    </p>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex justify-between items-center">
                      <div>
                        <div className="font-mono font-bold text-primary dark:text-secondary">GMEL-CLAIM-001</div>
                        <div className="text-slate-700 dark:text-slate-300 font-medium">Zero surface venting and closed-loop aquifer protection</div>
                      </div>
                      <span className="font-mono font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">Level C</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex justify-between items-center">
                      <div>
                        <div className="font-mono font-bold text-primary dark:text-secondary">GMEL-CLAIM-002</div>
                        <div className="text-slate-700 dark:text-slate-300 font-medium">Supercritical heat transfer fluid thermal conductivity bench</div>
                      </div>
                      <span className="font-mono font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">Level C</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex justify-between items-center">
                      <div>
                        <div className="font-mono font-bold text-primary dark:text-secondary">ENV-CLAIM-001</div>
                        <div className="text-slate-700 dark:text-slate-300 font-medium">Binary ORC thermal power Scope 1 operational zero emissions</div>
                      </div>
                      <span className="font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">Level D</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setPage(Page.EvidenceRegistry)}
                    className="mt-4 px-6 py-3 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-dark transition-all flex items-center gap-2"
                  >
                    <span>Open Full KKM Evidence Registry</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </motion.div>
              )}

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default GMELHubPage;
