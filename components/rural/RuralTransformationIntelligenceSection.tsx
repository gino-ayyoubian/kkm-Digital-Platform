import * as React from 'react';
import { useLanguage } from '../../LanguageContext';
import { 
  RURAL_TRANSFORMATION_PILLARS, 
  RURAL_TRANSFORMATION_SCENARIOS, 
  INTERNATIONAL_DATABASE_SOURCES,
  RuralPillarDetail,
  RuralScenario 
} from '../../src/data/ruralDevelopmentData';
import { 
  Satellite, 
  Recycle, 
  Network, 
  Droplets, 
  ShieldCheck, 
  TrendingUp, 
  Layers, 
  Compass, 
  Sliders, 
  Sparkles, 
  Globe2, 
  ExternalLink, 
  Cpu, 
  Activity, 
  Database,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const RuralTransformationIntelligenceSection: React.FC = () => {
  const { language, direction } = useLanguage();
  const isFa = language === 'FA';
  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;

  const [activePillarId, setActivePillarId] = React.useState<string>(RURAL_TRANSFORMATION_PILLARS[0].id);
  const [selectedScenarioId, setSelectedScenarioId] = React.useState<string>('kkm-smart-leap');
  
  // Custom interactive simulation controls
  const [simIoTSpread, setSimIoTSpread] = React.useState<number>(75);
  const [simWaterEfficiency, setSimWaterEfficiency] = React.useState<number>(80);
  const [simRenewables, setSimRenewables] = React.useState<number>(70);

  const activePillar = RURAL_TRANSFORMATION_PILLARS.find(p => p.id === activePillarId) || RURAL_TRANSFORMATION_PILLARS[0];
  const activeScenario = RURAL_TRANSFORMATION_SCENARIOS.find(s => s.id === selectedScenarioId) || RURAL_TRANSFORMATION_SCENARIOS[2];

  // Dynamic simulation outcomes calculated live
  const computedProductivityGain = Math.round(simIoTSpread * 0.45 + simWaterEfficiency * 0.35 + simRenewables * 0.2);
  const computedWaterConservation = Math.round(simWaterEfficiency * 0.65 + simIoTSpread * 0.25);
  const computedYouthRetention = Math.round(35 + (simIoTSpread * 0.3 + simRenewables * 0.25 + simWaterEfficiency * 0.1));
  const computedEmissionsReduction = Math.round(simRenewables * 0.7 + simWaterEfficiency * 0.15);

  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'Satellite': return <Satellite className="w-5 h-5" />;
      case 'Recycle': return <Recycle className="w-5 h-5" />;
      case 'Network': return <Network className="w-5 h-5" />;
      case 'Droplets': return <Droplets className="w-5 h-5" />;
      default: return <Cpu className="w-5 h-5" />;
    }
  };

  const getLocalized = (field: Record<string, string>): string => {
    return field[language] || field['FA'] || field['EN'] || '';
  };

  return (
    <section id="rural-transformation-intelligence" className="py-20 bg-slate-900 border-t border-b border-slate-800 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold mb-4">
            <Compass className="w-4 h-4 animate-spin-slow" />
            <span>
              {isFa 
                ? 'رصدخانه راهبردی، آینده‌پژوهی و تحلیل داده‌های بین‌المللی روستایی KKM' 
                : 'KKM Strategic Rural Foresight & International Observatory'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-5 leading-tight">
            {isFa 
              ? 'چهار رکن بنیادین تحول هوشمند و اقتصاد آینده‌نگر روستایی' 
              : 'Four Pillars of Intelligent Rural Transformation & Foresight Economy'}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
            {isFa 
              ? 'سنتز جامع و ژرف‌اندیشانه از پایگاه‌های داده جهانی (FAO, World Bank, IFAD, OECD, CGIAR) با هدف تبیین واقعیت‌های میدانی، رفع انفعال سنتی و پیاده‌سازی مدل‌های یکپارچه فناوری‌محور.' 
              : 'Deep synthesis of global benchmarks to confront on-the-ground realities with actionable, data-driven leapfrog frameworks for resilient rural ecosystems.'}
          </p>
        </div>

        {/* 4 Pillars Interactive Tab Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {RURAL_TRANSFORMATION_PILLARS.map((pillar) => {
            const isActive = pillar.id === activePillarId;
            return (
              <button
                key={pillar.id}
                onClick={() => setActivePillarId(pillar.id)}
                className={`text-start p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isActive
                    ? 'bg-gradient-to-b from-slate-800 to-slate-800/90 border-emerald-500/60 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/40'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80 text-slate-400'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-400" />
                )}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>
                      {getPillarIcon(pillar.icon)}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                      TRL {pillar.systemMetrics.trl}/9
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-emerald-400 block mb-1">
                    {getLocalized(pillar.badge)}
                  </span>
                  <h3 className={`text-sm font-bold leading-snug line-clamp-2 ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {getLocalized(pillar.title)}
                  </h3>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">{pillar.systemMetrics.efficiencyGain}</span>
                  <span className={`text-[11px] font-medium ${isActive ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {isFa ? 'بررسی جزئیات' : 'Inspect'} &rarr;
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Pillar Deep-Dive Container */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 lg:p-8 mb-16 shadow-2xl relative">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800/80 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2.5 py-1 rounded-md mb-2">
                <Activity className="w-3.5 h-3.5" />
                <span>{getLocalized(activePillar.badge)}</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white">
                {getLocalized(activePillar.title)}
              </h3>
              <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-3xl">
                {getLocalized(activePillar.subtitle)}
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 block mb-0.5">{isFa ? 'شاخص اثرگذاری' : 'Impact Index'}</span>
                <span className="text-lg font-bold font-mono text-emerald-400">{activePillar.systemMetrics.impactScore}/100</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 block mb-0.5">{isFa ? 'ارتقای بهره‌وری' : 'Efficiency'}</span>
                <span className="text-lg font-bold font-mono text-sky-400">{activePillar.systemMetrics.efficiencyGain}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 block mb-0.5">{isFa ? 'بازگشت سرمایه' : 'ROI Horizon'}</span>
                <span className="text-lg font-bold font-mono text-amber-400">{activePillar.systemMetrics.roiHorizon}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 block mb-0.5">{isFa ? 'آمادگی فناوری' : 'Readiness'}</span>
                <span className="text-lg font-bold font-mono text-purple-400">TRL {activePillar.systemMetrics.trl}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Reality vs Solution Analysis */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Reality Gap Section */}
              <div>
                <h4 className="text-sm font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{isFa ? 'تبیین چالش‌ها و واقعیت‌های موجود میدانی' : 'Empirical Ground Realities & Systemic Bottlenecks'}</span>
                </h4>
                <div className="space-y-2.5">
                  {activePillar.currentRealities.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/40 text-slate-300 text-xs sm:text-sm flex items-start gap-3">
                      <span className="inline-block w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                      <p className="leading-relaxed">{getLocalized(item)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Innovative Solutions Section */}
              <div>
                <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4" />
                  <span>{isFa ? 'راهکارهای نوآورانه و تحول‌آفرین KKM' : 'KKM Engineered Leapfrog Interventions'}</span>
                </h4>
                <div className="space-y-2.5">
                  {activePillar.innovativeSolutions.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/40 text-slate-300 text-xs sm:text-sm flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <p className="leading-relaxed">{getLocalized(item)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Technologies Tag Cloud */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-sky-400" />
                  <span>{isFa ? 'فناوری‌ها و پروتکل‌های اجرایی این رکن' : 'Underlying Technology Stack & Enablers'}</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activePillar.keyTechnologies.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: International Benchmarks & Data Citations */}
            <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
                    <Globe2 className="w-4 h-4" />
                    <span>{isFa ? 'بنچ‌مارک‌ها و شواهد بین‌المللی' : 'Global Benchmarks & Precedents'}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">FAO / WB Verified</span>
                </div>

                <div className="space-y-4">
                  {activePillar.internationalBenchmarks.map((bm, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-white">{bm.countryOrOrg}</span>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold">{bm.metric}</span>
                      </div>
                      <p className="text-xs text-slate-300 mb-1.5">{bm.program}</p>
                      <span className="text-[10px] text-slate-500 font-mono block">
                        Ref: {bm.source}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 leading-relaxed flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {isFa 
                    ? 'داده‌ها بر مبنای آخرین گزارش‌های ۲۰۲۴ سازمان‌های بین‌المللی تحلیل و در مدل هوشمند KKM استانداردسازی شده‌اند.' 
                    : 'Normalized against 2024 UN & World Bank multilateral data repositories.'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Foresight Scenarios & Interactive Simulation Matrix (2030 - 2050) */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 lg:p-8">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono mb-2">
                <Sliders className="w-3.5 h-3.5" />
                <span>{isFa ? 'شبیه‌ساز سناریوهای آینده‌پژوهی ۲۰۳۰ - ۲۰۵۰' : 'Foresight Scenario Engine (2030 - 2050)'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {isFa ? 'موتور شبیه‌سازی نتایج تصمیم‌گیری و مداخله فناورانه' : 'Interactive Policy & Technology Impact Simulator'}
              </h3>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                {isFa 
                  ? 'بررسی تفاوت بنیادین میان «انفعال سنتی» و «جهش تحول‌آفرین KKM» بر روی شاخص‌های کلان پایداری زیستی، آبی و اقتصادی روستا.' 
                  : 'Quantifying divergent socio-ecological trajectories between status quo inaction and KKM leapfrog transformation.'}
              </p>
            </div>

            {/* Scenario Preset Buttons */}
            <div className="flex flex-wrap gap-2">
              {RURAL_TRANSFORMATION_SCENARIOS.map((sc) => {
                const isSelected = sc.id === selectedScenarioId;
                return (
                  <button
                    key={sc.id}
                    onClick={() => {
                      setSelectedScenarioId(sc.id);
                      if (sc.id === 'status-quo') {
                        setSimIoTSpread(15);
                        setSimWaterEfficiency(20);
                        setSimRenewables(10);
                      } else if (sc.id === 'incremental-tech') {
                        setSimIoTSpread(45);
                        setSimWaterEfficiency(50);
                        setSimRenewables(40);
                      } else {
                        setSimIoTSpread(85);
                        setSimWaterEfficiency(90);
                        setSimRenewables(85);
                      }
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-950'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {getLocalized(sc.name)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Scenario Overview Banner */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-emerald-400 font-bold block mb-1">
                {isFa ? 'افق زمانی تحلیل:' : 'Time Horizon:'} {activeScenario.horizon}
              </span>
              <p className="text-slate-300 text-sm leading-relaxed">
                {getLocalized(activeScenario.description)}
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-3">
              <div className="text-end">
                <span className="text-[11px] text-slate-400 block">{isFa ? 'نرخ تثبیت جمعیت' : 'Retention Rate'}</span>
                <span className="text-xl font-bold font-mono text-emerald-400">%{activeScenario.populationRetention}</span>
              </div>
            </div>
          </div>

          {/* Interactive Dynamic Sliders & Real-Time Impact Gauges */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
            
            {/* Interactive Sliders (40%) */}
            <div className="lg:col-span-5 space-y-5 bg-slate-900/60 p-5 rounded-xl border border-slate-800">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>{isFa ? 'اهرم‌های تنظیم متغیرهای فناورانه' : 'Intervention Levers'}</span>
                <span className="text-emerald-400 text-[10px] font-mono">{isFa ? 'شبیه‌سازی زنده' : 'Real-Time'}</span>
              </h4>

              {/* Slider 1: Precision IoT */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-300">{isFa ? 'ضریب نفوذ اینترنت اشیاء و سنجش ماهواره‌ای' : 'IoT & Satellite Sensing Penetration'}</span>
                  <span className="font-mono text-emerald-400 font-bold">%{simIoTSpread}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={simIoTSpread} 
                  onChange={(e) => setSimIoTSpread(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 2: Water Efficiency */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-300">{isFa ? 'پوشش آبیاری زیرسطحی و تغذیه آبخوان (MAR)' : 'Subsurface Irrigation & MAR Coverage'}</span>
                  <span className="font-mono text-sky-400 font-bold">%{simWaterEfficiency}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={simWaterEfficiency} 
                  onChange={(e) => setSimWaterEfficiency(Number(e.target.value))}
                  className="w-full accent-sky-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 3: Renewable & Bioenergy */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-300">{isFa ? 'سهم انرژی‌های تجدیدپذیر و بیوپلایشگاه' : 'Renewable Mini-Grids & Biorefining'}</span>
                  <span className="font-mono text-amber-400 font-bold">%{simRenewables}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={simRenewables} 
                  onChange={(e) => setSimRenewables(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              <p className="text-[11px] text-slate-500 leading-normal pt-1 border-t border-slate-800">
                {isFa 
                  ? 'تغییر اهرم‌ها مستقیماً ماتریس همبستگی شاخص‌های زیست‌محیطی و اقتصادی را شبیه‌سازی می‌کند.' 
                  : 'Adjusting sliders recalculates the multivariate impact matrix in real time.'}
              </p>
            </div>

            {/* Impact Outputs (60%) */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">
                  {isFa ? 'رشد خالص درآمد و بهره‌وری کشاورز' : 'Net Farmer Income & Output'}
                </span>
                <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
                  +{computedProductivityGain}%
                </span>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${Math.min(computedProductivityGain, 100)}%` }} />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">
                  {isFa ? 'صرفه‌جویی در مصرف آب تجدیدپذیر' : 'Water Footprint Reduction'}
                </span>
                <span className="text-2xl sm:text-3xl font-black font-mono text-sky-400">
                  -%{computedWaterConservation}
                </span>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-sky-500 h-full rounded-full transition-all" style={{ width: `${Math.min(computedWaterConservation, 100)}%` }} />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">
                  {isFa ? 'ماندگاری جوانان و مهاجرت معکوس' : 'Youth Retention & Reverse Flow'}
                </span>
                <span className="text-2xl sm:text-3xl font-black font-mono text-purple-400">
                  %{computedYouthRetention}
                </span>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full transition-all" style={{ width: `${Math.min(computedYouthRetention, 100)}%` }} />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">
                  {isFa ? 'کاهش کربن و آلایندگی زیست‌محیطی' : 'Emissions Abatement'}
                </span>
                <span className="text-2xl sm:text-3xl font-black font-mono text-amber-400">
                  -%{computedEmissionsReduction}
                </span>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full transition-all" style={{ width: `${Math.min(computedEmissionsReduction, 100)}%` }} />
                </div>
              </div>

            </div>

          </div>

          {/* International Data Credibility Sources Footer */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Database className="w-4 h-4 text-emerald-400" />
              <span className="font-medium text-slate-300">
                {isFa ? 'پایگاه‌های داده و مراجع پژوهشی بین‌المللی متصل:' : 'Referenced International Repositories:'}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
              {INTERNATIONAL_DATABASE_SOURCES.map((src, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                  {src.name.split(' ')[0]}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
