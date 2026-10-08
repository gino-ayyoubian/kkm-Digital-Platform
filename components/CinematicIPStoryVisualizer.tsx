import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { 
  Layers, Zap, Droplets, Cpu, ShieldCheck, TrendingUp, 
  ArrowRight, ArrowLeft, CheckCircle2, ChevronRight, Activity,
  DollarSign, BarChart3, Clock, Lock, Sparkles, Eye
} from 'lucide-react';

interface IPStoryLayer {
  id: string;
  number: string;
  patentApp: string;
  jurisdiction: string;
  trl: string;
  titleEn: string;
  titleFa: string;
  taglineEn: string;
  taglineFa: string;
  descriptionEn: string;
  descriptionFa: string;
  focalDepthSpec: string;
  keyMetrics: { labelEn: string; labelFa: string; value: string }[];
  financialModel: {
    capexShare: string;
    opexSavings: string;
    irr: string;
    payback: string;
    phaseTranche: string;
  };
  visual3dSpec: {
    renderType: string;
    colorGlow: string;
    accentBg: string;
    diagramElements: string[];
  };
}

export const IP_STORY_LAYERS: IPStoryLayer[] = [
  {
    id: 'layer-subsurface-clg',
    number: '01',
    patentApp: 'PCT/IB2024/059421',
    jurisdiction: 'Global PCT / US / EU',
    trl: 'TRL 7 [Field Validated]',
    titleEn: 'Subsurface Closed-Loop Coaxial Geothermal Network',
    titleFa: 'شبکه مداربسته کواکسیال زمین‌گرمایی اعماق زمین (GMEL-CLG)',
    taglineEn: 'Supercritical CO2 closed loop extracting baseload thermal energy at 4,200m depth with zero net water loss.',
    taglineFa: 'سیکل بسته سیال فوق‌بحرانی در عمق ۴۲۰۰ متری با بازیافت مداوم حرارت بدون هدررفت قطره‌ای آب.',
    descriptionEn: 'Unlike legacy hydraulic fracking EGS, our patented vacuum-insulated tubing (VIT) and downhole counter-current heat exchanger harvest thermal baseload energy through conduction and forced convection in sealed casings, preventing seismic perturbation and groundwater contamination.',
    descriptionFa: 'برخلاف سامانه‌های شکست هیدرولیکی سنتی، فناوری جداره دوجداره عایق خلأ (VIT) و مبدل جریان مخالف درون‌چاهی KKM بدون تزریق و تخلیه به سفره‌های زیرزمینی و با رفع هرگونه خطر لرزه‌خیزی، حرارت پایه زمین را بازیافت می‌نماید.',
    focalDepthSpec: '85mm f/1.4 Cinematic Depth of Field · 4,200m Subsurface Lithology Rendering',
    keyMetrics: [
      { labelEn: 'Continuous Baseload', labelFa: 'تولید پیوسته پایه', value: '24/7/365' },
      { labelEn: 'Water Withdrawal', labelFa: 'مصرف خالص آب', value: '0.00 m³' },
      { labelEn: 'Wellhead Exergy Eff.', labelFa: 'راندمان اگزرژی سرچاهی', value: '22.4%' },
      { labelEn: 'Seismic Risk Factor', labelFa: 'ضریب خطر لرزه‌خیزی', value: '0.0 [Class-A Safe]' },
    ],
    financialModel: {
      capexShare: '42% Total Initial EPC',
      opexSavings: '68% Lower vs Gas Turbines',
      irr: '24.2% Base Scenario',
      payback: '3.6 Years',
      phaseTranche: 'Phase 1: Deep Casing & Loop Completion ($4.8M Tranche)',
    },
    visual3dSpec: {
      renderType: 'Deep-Earth Volumetric Cross-Section',
      colorGlow: 'from-amber-500/20 via-orange-500/10 to-transparent',
      accentBg: 'border-amber-500/40 text-amber-500',
      diagramElements: ['Vacuum Casing', 'sCO2 Downhole Loop', 'Granitic Basement 175°C', 'Fiber-Optic Distributed Sensing'],
    }
  },
  {
    id: 'layer-nanofluid-carrier',
    number: '02',
    patentApp: 'US 18/456,892',
    jurisdiction: 'United States Patent Office',
    trl: 'TRL 8 [Commercial Grade]',
    titleEn: 'Nano-Engineered Thermofluid Heat Transfer Carrier',
    titleFa: 'سیال نانومهندسی با رسانایی حرارتی ارتقایافته (GMEL-ThermoFluid)',
    taglineEn: 'Surface-functionalized metal-oxide nanohybrids increasing convective heat transfer by 31.7% under 350 bar pressure.',
    taglineFa: 'نانوهیبرید اکسید فلزی عامل‌دارشده جهت افزایش ۳۱.۷ درصدی انتقال حرارت همرفتی در فشارهای لیتواستاتیک ۳۵۰ بار.',
    descriptionEn: 'Formulated with stabilized Al2O3-SiO2 nanostructures in organic dielectric matrices, this fluid eliminates scaling and corrosion while enabling downhole heat exchange loops to operate with 24% smaller surface heat exchangers at the surface skid.',
    descriptionFa: 'سیال انحصاری پایدارشده در بسترهای آلی که رسوب‌گذاری و خوردگی لوله‌ها را کاملاً مهار نموده و امکان کوچک‌سازی ابعاد مبدل‌های سطحی را تا ۲۴ درصد فراهم می‌سازد.',
    focalDepthSpec: 'Macro 85mm Optical Render · Nanostructure Molecular Suspension Field',
    keyMetrics: [
      { labelEn: 'Conductivity Gain', labelFa: 'ارتقای هدایت حرارتی', value: '+31.7%' },
      { labelEn: 'Lithostatic Rating', labelFa: 'تحمل فشار مخزن', value: '350 Bar' },
      { labelEn: 'Corrosion Inhabitation', labelFa: 'مهار خوردگی لوله‌ها', value: '99.8%' },
      { labelEn: 'Surface Skid Shrink', labelFa: 'کاهش ابعاد پکیج سطحی', value: '-24% Footprint' },
    ],
    financialModel: {
      capexShare: '11% of Thermodynamic Package',
      opexSavings: 'Reduced Exchanger Maintenance by 55%',
      irr: 'Contributes +3.1% to Global IRR',
      payback: '1.4 Years',
      phaseTranche: 'Phase 2: Thermodynamic Skids & Nanofluid Charge ($1.2M Tranche)',
    },
    visual3dSpec: {
      renderType: 'Nanoparticle Convective Hydrodynamics',
      colorGlow: 'from-blue-500/20 via-cyan-500/10 to-transparent',
      accentBg: 'border-cyan-500/40 text-cyan-500',
      diagramElements: ['Functionalized Nanoparticles', 'Low Viscosity Flow', 'Thermal Boundary Layer Reduction', 'Corrosion Shielding'],
    }
  },
  {
    id: 'layer-microgrid-edo',
    number: '03',
    patentApp: 'SW-REG-2024-118',
    jurisdiction: 'Software Escrow & Trade Secret',
    trl: 'TRL 7 [Rural Pilot Sarakhs]',
    titleEn: 'Autonomous Micro-Grid Energy Dispatch Optimizer (EDO-AI)',
    titleFa: 'موتور هوش مصنوعی دیسپاچینگ خودکار ریزشبکه روستایی (EDO-AI)',
    taglineEn: 'Constrained reinforcement learning coordinating baseload thermal dispatch with intermittent renewables and nomadic load swings.',
    taglineFa: 'عامل هوشمند مقید به قوانین فیزیکی جهت تلفیق بار پایه با انرژی‌های تجدیدپذیر و الگوی مصرف متغیر عشایری.',
    descriptionEn: 'Operating at edge nodes, EDO-AI continuously forecasts solar variability, soil thermal storage capacity, and agricultural demand. It autonomously commands sORC turbo-expanders and battery banks to minimize diesel generation backup runtimes.',
    descriptionFa: 'موتور دیسپاچینگ لبه‌ای که با پیش‌بینی نوسانات اقلیمی و نیازهای کشاورزی-عشایری، واحدهای توربین انبساطی ارگانیک و باتری‌ها را بدون دخالت اپراتور بهینه دیسپاچ نموده و مصرف گازوئیل ژنراتورها را به حداقل می‌رساند.',
    focalDepthSpec: 'Edge Microgrid Telemetry Node · Photorealistic Digital Twin Simulation',
    keyMetrics: [
      { labelEn: 'Diesel Runtime Slash', labelFa: 'کاهش کارکرد گازوئیلی', value: '-82%' },
      { labelEn: 'Solar Curtailment Drop', labelFa: 'کاهش هدررفت خورشیدی', value: '-43.8%' },
      { labelEn: 'Control Loop Latency', labelFa: 'تأخیر حلقه فرمان لبه', value: '< 45 ms' },
      { labelEn: 'Battery Cycle Life', labelFa: 'افزایش طول عمر باتری', value: '+2.3 Years' },
    ],
    financialModel: {
      capexShare: '7% Digital Automation & SCADA',
      opexSavings: 'Fuel & Maintenance Savings $340k/yr',
      irr: 'Shortest Payback Contribution',
      payback: '0.9 Years',
      phaseTranche: 'Phase 3: Smart SCADA, EDO-AI Edge Deployment ($650k Tranche)',
    },
    visual3dSpec: {
      renderType: 'Neural Topology & Power Flow Network',
      colorGlow: 'from-purple-500/20 via-indigo-500/10 to-transparent',
      accentBg: 'border-purple-500/40 text-purple-500',
      diagramElements: ['Sub-second Phasor Analytics', 'Reinforcement Learning Policy', 'Inverter Bus Orchestration', 'Nomadic Demand Tracking'],
    }
  },
  {
    id: 'layer-cogeneration-desal',
    number: '04',
    patentApp: 'PCT/IB2024/061204',
    jurisdiction: 'Global PCT Pending',
    trl: 'TRL 6 [System Scale Pilot]',
    titleEn: 'Cascade Geothermal-Solar Multi-Effect Desalination (GMEL-Desal)',
    titleFa: 'سامانه نمک‌زدایی چنداثره کوپل با پس‌حرارت زمین‌گرمایی (GMEL-Desal)',
    taglineEn: 'Waste heat thermal cascade producing high-purity potable water at only 1.95 kWh/m³ specific energy consumption.',
    taglineFa: 'تولید آب شرب فوق‌خالص از آب‌خوان‌های شور با استفاده از تلفات حرارتی سیکل رنکین با مصرف تنها ۱.۹۵ کیلووات‌ساعت بر مترمکعب.',
    descriptionEn: 'By integrating condenser reject heat from the closed-loop turbine with low-temperature vacuum evaporation stages, GMEL-Desal delivers potable and agricultural water to arid regions with zero added fossil fuel combustion.',
    descriptionFa: 'با هدایت حرارت کندانسور توربین مداربسته به مراحل تبخیر تحت خلأ، آب شیرین بهداشتی برای مناطق درگیر بحران کم‌آبی تأمین شده و هم‌افزایی آب-انرژی در بالاترین شاخص اقتصادی محقق می‌گردد.',
    focalDepthSpec: 'Industrial Stainless Steel Multi-Effect Vessel · Cinematic Shallow DOF',
    keyMetrics: [
      { labelEn: 'Specific Energy', labelFa: 'مصرف انرژی ویژه', value: '1.95 kWh/m³' },
      { labelEn: 'Distillate Purity', labelFa: 'خلوص آب تولیدی', value: '< 15 ppm TDS' },
      { labelEn: 'Zero Liquid Discharge', labelFa: 'نرخ بازیافت آب نمک', value: 'Up to 88%' },
      { labelEn: 'Carbon Footprint', labelFa: 'ردپای کربن در هر لیتر', value: '0.00 g CO2' },
    ],
    financialModel: {
      capexShare: '22% Water Infrastructure Tranche',
      opexSavings: 'Levelized Cost of Water $0.48/m³',
      irr: '21.5% Standalone Water Utility',
      payback: '4.1 Years',
      phaseTranche: 'Phase 4: Multi-Effect Desal Skids & Distribution ($2.4M Tranche)',
    },
    visual3dSpec: {
      renderType: 'Vacuum Distillation Chamber & Fluid Interface',
      colorGlow: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      accentBg: 'border-emerald-500/40 text-emerald-500',
      diagramElements: ['Condenser Heat Coupling', 'Multi-Stage Flash Trays', 'Brine Crystallization Module', 'Potable Mineralization Loop'],
    }
  },
];

export const CinematicIPStoryVisualizer: React.FC = () => {
  const { isFa, direction } = useLanguage();
  const [activeLayerIndex, setActiveLayerIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'architecture' | 'financials'>('architecture');

  const currentLayer = IP_STORY_LAYERS[activeLayerIndex];

  return (
    <div className="w-full py-12 text-start" dir={direction}>
      {/* Section Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-primary dark:text-secondary mb-2">
          <Layers className="w-4 h-4 shrink-0" />
          <span>{isFa ? 'داستان بصری تعاملی اختراعات و لایه‌های انرژی KKM' : 'Interactive Multi-Layer IP Visual Story'}</span>
          <span className="text-slate-400 dark:text-slate-600">&bull;</span>
          <span>85mm Cinematic Realism</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-slate-900 dark:text-white">
              {isFa ? 'معماری چندلایه دارایی‌های فکری و مدل مالی پروژه‌ها' : 'Multi-Layered Energy IP & Phased Financial Analysis'}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl mt-1 leading-relaxed">
              {isFa 
                ? 'تجسم فنی-مهندسی پتنت‌های خانواده GMEL از عمق ۴۲۰۰ متری تا الگوریتم‌های هوش مصنوعی لبه و تراز مالی هر مرحله اجرایی.'
                : 'Interactive scroll-driven technical narrative bridging deep subsurface physics, nanochemistry, edge AI dispatch, and bankable financial phase models.'}
            </p>
          </div>

          {/* Tab Selector: Architecture vs Financial Phasing */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('architecture')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'architecture'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {isFa ? 'معماری فنی و فیزیک لایه‌ها' : 'Technical Architecture'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('financials')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'financials'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {isFa ? 'مدل مالی و ترانش‌های سرمایه‌گذاری' : 'Phased Financial Model'}
            </button>
          </div>
        </div>
      </div>

      {/* Layer Step Selector Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-8">
        {IP_STORY_LAYERS.map((layer, idx) => {
          const isSelected = activeLayerIndex === idx;
          return (
            <button
              key={layer.id}
              type="button"
              onClick={() => setActiveLayerIndex(idx)}
              className={`p-3.5 rounded-2xl text-start transition-all border min-h-[72px] flex flex-col justify-between ${
                isSelected
                  ? 'bg-white dark:bg-slate-850 border-primary dark:border-secondary shadow-md ring-2 ring-primary/20 dark:ring-secondary/20'
                  : 'bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-primary dark:text-secondary">{layer.number}</span>
                <span className="font-mono text-[10px] text-slate-400">{layer.patentApp}</span>
              </div>
              <span className={`text-xs font-bold line-clamp-1 mt-1.5 ${
                isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'
              }`}>
                {isFa ? layer.titleFa : layer.titleEn}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left 7 Columns: Cinematic Visual Simulation Screen */}
        <div className="lg:col-span-7 bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col justify-between relative overflow-hidden shadow-2xl min-h-[460px]">
          {/* Ambient Render Depth Aura */}
          <div className={`absolute inset-0 bg-gradient-to-br ${currentLayer.visual3dSpec.colorGlow} pointer-events-none`} />

          {/* Screen Top Bar */}
          <div className="relative z-10 flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-bold uppercase tracking-wider">{currentLayer.visual3dSpec.renderType}</span>
              <span className="text-slate-600">&bull;</span>
              <span className="text-cyan-400 font-semibold">{currentLayer.trl}</span>
            </div>

            <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
              {currentLayer.focalDepthSpec}
            </span>
          </div>

          {/* Central 3D / Schematic Visual Wireframe Simulation */}
          <div className="relative z-10 my-8 py-6 flex flex-col items-center justify-center text-center">
            {/* Visual Abstract Energy Diagram */}
            <div className="w-full max-w-lg p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-inner">
              <div className="flex items-center justify-between mb-4 text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
                <span>PATENT CLAIM SPECIFICATION</span>
                <span className="text-amber-400 font-bold">{currentLayer.jurisdiction}</span>
              </div>

              {/* Graphical Blueprint Layer Representation */}
              <div className="grid grid-cols-2 gap-2 text-start">
                {currentLayer.visual3dSpec.diagramElements.map((el, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-slate-200 font-medium truncate">{el}</span>
                  </div>
                ))}
              </div>

              {/* Live Physics Callout */}
              <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-300 flex items-center justify-between">
                <span>STATUS: CERTIFIED FOR PILOT DEPLOYMENT</span>
                <span className="text-emerald-400 font-bold">READY</span>
              </div>
            </div>
          </div>

          {/* Screen Bottom: Key Metrics Quad */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
            {currentLayer.keyMetrics.map((metric, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-start">
                <span className="block text-[10px] text-slate-400 line-clamp-1">
                  {isFa ? metric.labelFa : metric.labelEn}
                </span>
                <span className="text-sm sm:text-base font-black font-mono text-white mt-0.5 block">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 Columns: Narrative Explainer & Financial Model */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-850 rounded-3xl p-6 sm:p-7 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            {/* Header Tag */}
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="font-mono font-bold text-primary dark:text-secondary uppercase">
                {isFa ? `لایه ${currentLayer.number} از ۰۴` : `Layer ${currentLayer.number} of 04`}
              </span>
              <span className="font-mono text-slate-400">{currentLayer.patentApp}</span>
            </div>

            <h3 className="text-xl font-display font-black text-slate-900 dark:text-white leading-snug">
              {isFa ? currentLayer.titleFa : currentLayer.titleEn}
            </h3>

            <p className="text-xs text-primary dark:text-secondary font-semibold mt-2 leading-relaxed">
              {isFa ? currentLayer.taglineFa : currentLayer.taglineEn}
            </p>

            {activeTab === 'architecture' ? (
              // Architecture Narrative
              <div className="mt-4 space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>{isFa ? currentLayer.descriptionFa : currentLayer.descriptionEn}</p>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
                  <div className="font-bold text-slate-800 dark:text-slate-200">
                    {isFa ? 'مزیت راهبردی مالکیت فکری:' : 'Proprietary IP Moat:'}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {isFa 
                      ? 'ثبت تحت معاهده بین‌المللی PCT، جلوگیری از دعاوی حقوقی معارضان و انحصار بهره‌برداری تجاری در طرح‌های ملی انرژی.'
                      : 'Protected under global PCT treaties ensuring full legal freedom-to-operate and institutional bankability.'}
                  </p>
                </div>
              </div>
            ) : (
              // Financial Phased Model Breakdown
              <div className="mt-4 space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 font-bold">
                  {currentLayer.financialModel.phaseTranche}
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Project IRR</span>
                    <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                      {currentLayer.financialModel.irr}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Simple Payback</span>
                    <span className="text-sm font-black text-slate-900 dark:text-white">
                      {currentLayer.financialModel.payback}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Capex Allocation</span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {currentLayer.financialModel.capexShare}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Opex Reduction</span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {currentLayer.financialModel.opexSavings}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 leading-relaxed">
                  {isFa 
                    ? 'مدل‌سازی مالی منطبق بر استانداردهای گزارش‌دهی بانکی بین‌المللی و تفکیک جریان‌های نقدینگی در ترانش‌های اجرایی.'
                    : 'Bankable financial models compliant with international project finance criteria, separating research innovation from hard cash flows.'}
                </p>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              type="button"
              disabled={activeLayerIndex === 0}
              onClick={() => setActiveLayerIndex(prev => Math.max(0, prev - 1))}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-1 text-xs font-bold"
            >
              <ArrowLeft className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
              <span>{isFa ? 'لایه قبلی' : 'Previous Layer'}</span>
            </button>

            <button
              type="button"
              disabled={activeLayerIndex === IP_STORY_LAYERS.length - 1}
              onClick={() => setActiveLayerIndex(prev => Math.min(IP_STORY_LAYERS.length - 1, prev + 1))}
              className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-30 disabled:pointer-events-none"
            >
              <span>{isFa ? 'لایه بعدی' : 'Next Layer'}</span>
              <ArrowRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
