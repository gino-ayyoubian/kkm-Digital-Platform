import * as React from 'react';
import { useLanguage } from '../../LanguageContext';
import { motion } from 'motion/react';
import { 
  Zap, Droplets, Truck, TrendingUp, Sun, Flame, BatteryCharging, 
  Layers, CheckCircle2, ShieldCheck, ArrowRight, Gauge, Cpu, 
  Warehouse, ThermometerSnowflake, Network, DollarSign, Users, Award
} from 'lucide-react';
import { Page } from '../../types';

interface RuralDedicatedDomainsProps {
  setPage?: (page: Page) => void;
  onNavigatePilot?: () => void;
}

export const RuralDedicatedDomains: React.FC<RuralDedicatedDomainsProps> = ({ setPage, onNavigatePilot }) => {
  const { isFa } = useLanguage();
  const [activeEnergyTab, setActiveEnergyTab] = React.useState<'gmel' | 'agrivoltaics' | 'microgrid'>('gmel');
  const [activeWaterTab, setActiveWaterTab] = React.useState<'desal' | 'drip' | 'aquifer'>('desal');

  return (
    <div className="space-y-0">
      {/* ========================================================
          1. DEDICATED SECTION: ENERGY
          ======================================================== */}
      <section id="rural-energy" className="py-24 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              {isFa ? 'بخش اختصاصی اول: انرژی پاک و پایدار' : 'DEDICATED DOMAIN 01: CLEAN RURAL ENERGY'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight mb-4">
              {isFa 
                ? 'انرژی نامتمرکز، ریزشبکه‌های مولد و حرارت پاک' 
                : 'Decentralized Clean Energy, Productive Microgrids & Baseload Power'}
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {isFa 
                ? 'تامین برق پایدار ۲۴/۷ و حرارت فرآیندی با تلفیق فناوری زمین‌گرمایی حلقه بسته GMEL، سیستم‌های اگروولتائیک دوکاره و ذخیره‌سازهای هوشمند BESS جهت محرومیت‌زدایی از شبکه سراسری.' 
                : 'Delivering continuous 24/7 baseload electricity and thermal process heat through GMEL closed-loop geothermal, agrivoltaic dual-use solar, and intelligent BESS microgrids to liberate rural communities from grid instability.'}
            </p>
          </div>

          {/* Key Energy Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { labelEn: 'Continuous Baseload Availability', labelFa: 'دسترس‌پذیری توان پایه مستمر', val: '99.4%', subEn: 'Non-intermittent with GMEL ORC', subFa: 'بدون قطعی و افت فرکانس' },
              { labelEn: 'Diesel Fuel Substitution', labelFa: 'جایگزینی گازوئیل ژنراتورها', val: 'Up to 90%', subEn: 'Fuel savings for producers', subFa: 'کاهش شدید هزینه‌های تولید' },
              { labelEn: 'Agrivoltaic Land Multiplier', labelFa: 'بهره‌وری دوگانه خاک کشاورزی', val: '1.6x', subEn: 'Simultaneous crops & electricity', subFa: 'کشت همزمان در زیر پنل‌ها' },
              { labelEn: 'Thermal Cascade Utilization', labelFa: 'بازیافت حرارت مرحله‌ای', val: '82%', subEn: 'Greenhouses & drying sheds', subFa: 'گرمایش گلخانه‌ها و خشک‌کن‌ها' },
            ].map((stat, i) => (
              <div key={i} className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 shadow-md">
                <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono mb-1">{stat.val}</div>
                <div className="text-xs sm:text-sm font-bold text-white mb-1">{isFa ? stat.labelFa : stat.labelEn}</div>
                <div className="text-[11px] text-slate-400">{isFa ? stat.subFa : stat.subEn}</div>
              </div>
            ))}
          </div>

          {/* Interactive Sub-Pillar Tabs */}
          <div className="bg-slate-800/60 rounded-3xl p-6 sm:p-8 border border-slate-700/80 mb-8">
            <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-700/80 pb-4">
              {[
                { id: 'gmel', labelEn: 'GMEL Closed-Loop Geothermal (Baseload & Heat)', labelFa: 'زمین‌گرمایی GMEL (برق دائم و حرارت)' },
                { id: 'agrivoltaics', labelEn: 'Agrivoltaics (Dual-Use Crops + Solar)', labelFa: 'سیستم اگروولتائیک (سایه‌بان و برق)' },
                { id: 'microgrid', labelEn: 'AI Autonomous Microgrid & Storage', labelFa: 'ریزشبکه خودکار مبتنی بر هوش مصنوعی' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveEnergyTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeEnergyTab === tab.id
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700/60 border border-slate-700/50'
                  }`}
                >
                  {isFa ? tab.labelFa : tab.labelEn}
                </button>
              ))}
            </div>

            {activeEnergyTab === 'gmel' && (
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                    <Flame className="w-3.5 h-3.5" />
                    {isFa ? 'فناوری اختصاصی KKM GMEL-CLG' : 'KKM PROPRIETARY GMEL-CLG SYSTEM'}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {isFa ? 'تولید همزمان برق دائم و حرارت فرآیندی با صفر مصرف آب' : 'Closed-Loop Deep Heat to Power and Industrial Cascades'}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {isFa
                      ? 'چاه‌های کم‌عمق تا نیمه‌عمیق حرارتی با استفاده از سیال بسته نانومهندسی GMEL-ThermoFluid، حرارت درون‌زمین را بدون استخراج آب‌های زیرزمینی بازیافت می‌کنند. توربین‌های مدولار ORC برق پیوسته تولید کرده و پساب حرارتی آن مستقیماً به گلخانه‌ها و خطوط فرآوری هدایت می‌شود.'
                      : 'Closed subsurface loops circulate nanotech ThermoFluid to extract Earth heat with zero aquifer depletion. Modular Organic Rankine Cycle (ORC) power skids provide baseline power, while thermal exhaust cascades directly into agricultural dryers, dairy pasteurizers, and heated greenhouses.'}
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> {isFa ? 'صفر انتشار کربن و بدون افت فصلی (ضریب ظرفیت > ۹۰٪)' : 'Zero carbon emissions, no seasonal decline (>90% capacity factor)'}</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> {isFa ? 'تغذیه حرارتی ارزان‌قیمت صنایع تبدیلی و کارگاه‌های فرآوری بومی' : 'Low-cost thermal supply for rural agro-processing cooperatives'}</li>
                  </ul>
                </div>
                <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-700 space-y-4">
                  <div className="text-xs uppercase font-mono text-slate-400 tracking-wider font-bold">
                    {isFa ? 'مشخصات مهندسی واحد پایه روستایی GMEL' : 'GMEL RURAL STANDARD SPECIFICATIONS'}
                  </div>
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between py-2 border-b border-slate-800">
                      <span className="text-slate-400">{isFa ? 'توان نامی برق پیوسته' : 'Electrical Baseload'}</span>
                      <span className="text-amber-400 font-bold">250 kWe - 2.5 MWe (Modular)</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-800">
                      <span className="text-slate-400">{isFa ? 'توان حرارتی فرآیندی' : 'Thermal Output'}</span>
                      <span className="text-emerald-400 font-bold">850 kWth - 8.0 MWth (45°C - 85°C)</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-800">
                      <span className="text-slate-400">{isFa ? 'عمر مفید طراحی' : 'Design Lifespan'}</span>
                      <span className="text-white font-bold">30+ Years (Continuous)</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-slate-400">{isFa ? 'مصرف آب سطحی و زیرزمینی' : 'Water Consumption'}</span>
                      <span className="text-sky-400 font-bold">0.0 Liters (100% Closed Loop)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeEnergyTab === 'agrivoltaics' && (
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                    <Sun className="w-3.5 h-3.5" />
                    {isFa ? 'اگروولتائیک هوشمند KKM' : 'INTELLIGENT AGRIVOLTAICS'}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {isFa ? 'هم‌افزایی همزمان تولید انرژی خورشیدی و حفظ رطوبت مزارع' : 'Dual-Harvest Yield: Solar Generation & Crop Microclimate'}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {isFa
                      ? 'سازه‌های مرتفع ۳ متری با ردیاب‌های هوشمند، پنل‌های خورشیدی دوطرفه (Bifacial) را بر فراز محصولات حساس، باغات پسته، نخل و گیاهان دارویی نصب می‌کنند. سایه جزئی کنترل‌شده باعث کاهش ۳۰ تا ۴۰ درصدی تبخیر سطحی آب و افزایش کیفیت باردهی گیاهان می‌شود.'
                      : 'Elevated 3-meter tracker structures suspend bifacial solar modules above high-value crops, orchards, and medicinal herbs. Microclimate shading cuts crop evapotranspiration by 30-40%, shields produce from heatwave scorch, and produces surplus clean power for local pumping.'}
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> {isFa ? 'حفظ کامل کاربری اراضی کشاورزی و جلوگیری از تغییر کاربری خاک' : 'Zero loss of arable land; preserves agricultural zoning completely'}</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> {isFa ? 'برق‌رسانی مستقیم به پمپ‌های آبیاری قطره‌ای و سردخانه‌ها' : 'Direct powering of drip pumping stations and refrigerated storage'}</li>
                  </ul>
                </div>
                <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-700 space-y-4">
                  <div className="text-xs uppercase font-mono text-slate-400 tracking-wider font-bold">
                    {isFa ? 'بهره‌وری اگروولتائیک در مناطق خشک و نیمه‌خشک' : 'ARID REGION AGRIVOLTAIC BENCHMARKS'}
                  </div>
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between py-2 border-b border-slate-800">
                      <span className="text-slate-400">{isFa ? 'کاهش تبخیر-تعرق خاک' : 'Evapotranspiration Reduction'}</span>
                      <span className="text-emerald-400 font-bold">-32% to -42%</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-800">
                      <span className="text-slate-400">{isFa ? 'راندمان اضافه پنل به دلیل خنکی گیاه' : 'Solar Efficiency Boost'}</span>
                      <span className="text-sky-400 font-bold">+6.5% (Vegetation Cooling)</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-slate-400">{isFa ? 'افزایش راندمان اقتصادی در هر هکتار' : 'Combined Revenue Uplift'}</span>
                      <span className="text-amber-400 font-bold">+160% (Crops + Energy)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeEnergyTab === 'microgrid' && (
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                    <BatteryCharging className="w-3.5 h-3.5" />
                    {isFa ? 'دیسپاچینگ هوشمند ریزشبکه' : 'AI MICROGRID DISPATCH (EDO-AI)'}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {isFa ? 'مدیریت بار مستقل و جزیره‌ای با قابلیت راه‌اندازی در خاموشی کامل' : 'Islanded Autonomous Operation with Black-Start Capability'}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {isFa
                      ? 'سامانه نرم‌افزاری EDO-AI جریان برق را بین توربین‌های GMEL، پنل‌های خورشیدی، باتری‌های لیتیوم-آهن-فسفات (LFP) و بارهای تولیدی روستا به شکل میلی‌ثانیه‌ای مدیریت می‌کند. در صورت قطعی شبکه بالادست، کارگاه‌ها و پمپ‌های کشاورزی بدون وقفه به کار خود ادامه می‌دهند.'
                      : 'The EDO-AI dispatch algorithm orchestrates GMEL baseload, solar arrays, containerized LFP battery packs, and productive workshop loads with millisecond precision. When regional grids blackout, community pumps and cold chains remain 100% active.'}
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> {isFa ? 'اولویت‌بندی خودکار بارهای حیاتی (سردخانه، آب شرب، بهداری)' : 'Automated load prioritization (Cold storage, drinking water, clinics)'}</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> {isFa ? 'قابلیت فروش مازاد برق به شبکه سراسری در ساعات اوج مصرف' : 'Peak shaving and bi-directional revenue feed-in to the national grid'}</li>
                  </ul>
                </div>
                <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-700 space-y-4">
                  <div className="text-xs uppercase font-mono text-slate-400 tracking-wider font-bold">
                    {isFa ? 'قابلیت‌های ذخیره‌سازی و پایداری شبکه' : 'BESS & MICROGRID RELIABILITY RATINGS'}
                  </div>
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between py-2 border-b border-slate-800">
                      <span className="text-slate-400">{isFa ? 'ظرفیت ذخیره باتری ماژولار' : 'BESS Capacity Range'}</span>
                      <span className="text-amber-400 font-bold">500 kWh - 5.0 MWh LFP</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-800">
                      <span className="text-slate-400">{isFa ? 'زمان سوئیچ به حالت جزیره‌ای' : 'Island Transfer Time'}</span>
                      <span className="text-emerald-400 font-bold">&lt; 16 milliseconds (Seamless)</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-slate-400">{isFa ? 'پروتکل ارتباطی سنسورها' : 'Telemetry Protocol'}</span>
                      <span className="text-sky-400 font-bold">LoRaWAN + Industrial Modbus/TCP</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>


      {/* ========================================================
          2. DEDICATED SECTION: WATER
          ======================================================== */}
      <section id="rural-water" className="py-24 bg-slate-950 text-white relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/40 text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <Droplets className="w-3.5 h-3.5 text-sky-400" />
              {isFa ? 'بخش اختصاصی دوم: امنیت پایدار آب' : 'DEDICATED DOMAIN 02: RURAL WATER SECURITY'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight mb-4">
              {isFa 
                ? 'نمک‌زدایی خورشیدی-حرارتی، آبیاری هوشمند و احیای سفره‌ها' 
                : 'Solar-Thermal Desalination, Precision Drip Irrigation & Aquifer Recovery'}
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {isFa 
                ? 'مهار بحران خشکسالی از طریق تبدیل آب‌های لب‌شور و غیرمتعارف به آب کشاورزی استاندارد با مصرف حداقل انرژی، استقرار آبیاری هوشمند قطره‌ای زیرسطحی و تغذیه مصنوعی آبخوان‌های بحرانی.' 
                : 'Overcoming chronic drought through energy-efficient brackish desalination, pressurized subsurface drip irrigation with LoRaWAN telemetry, and managed aquifer recharge.'}
            </p>
          </div>

          {/* Key Water Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { labelEn: 'Irrigation Water Savings', labelFa: 'صرفه‌جویی در مصرف آب آبیاری', val: '45% - 60%', subEn: 'Subsurface drip vs flood', subFa: 'نسبت به آبیاری غرقابی سنتی' },
              { labelEn: 'Desalination Specific Energy', labelFa: 'شدت مصرف انرژی نمک‌زدایی', val: '< 2.1 kWh/m³', subEn: 'Thermal-PV hybrid cascade', subFa: 'پایین‌ترین استاندارد جهانی' },
              { labelEn: 'Aquifer Depletion Halt', labelFa: 'توقف افت سطح ایستابی چاه‌ها', val: '100% Target', subEn: 'Balanced extraction budgeting', subFa: 'احیای تراز هیدرولیکی منطقه' },
              { labelEn: 'Brine Waste Zero-Discharge', labelFa: 'مدیریت پساب و بازیافت املاح', val: 'ZLD System', subEn: 'Mineral recovery ponds', subFa: 'استحصال نمک و مواد معدنی' },
            ].map((stat, i) => (
              <div key={i} className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 shadow-md">
                <div className="text-2xl sm:text-3xl font-black text-sky-400 font-mono mb-1">{stat.val}</div>
                <div className="text-xs sm:text-sm font-bold text-white mb-1">{isFa ? stat.labelFa : stat.labelEn}</div>
                <div className="text-[11px] text-slate-400">{isFa ? stat.subFa : stat.subEn}</div>
              </div>
            ))}
          </div>

          {/* Interactive Sub-Pillar Tabs */}
          <div className="bg-slate-900/70 rounded-3xl p-6 sm:p-8 border border-slate-800 mb-8">
            <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-800 pb-4">
              {[
                { id: 'desal', labelEn: 'Modular Solar & Geothermal Desalination (GMEL-Desal)', labelFa: 'نمک‌زدایی تلفیقی خورشیدی و زمین‌گرمایی' },
                { id: 'drip', labelEn: 'Precision Subsurface Drip & LoRaWAN Sensors', labelFa: 'آبیاری قطره‌ای زیرسطحی مجهز به سنسور' },
                { id: 'aquifer', labelEn: 'Managed Aquifer Recharge & Flood Harvesting', labelFa: 'آبخوان‌داری و مهار هوشمند سیلاب‌ها' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveWaterTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeWaterTab === tab.id
                      ? 'bg-sky-500 text-slate-950 shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700/60 border border-slate-700/50'
                  }`}
                >
                  {isFa ? tab.labelFa : tab.labelEn}
                </button>
              ))}
            </div>

            {activeWaterTab === 'desal' && (
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
                    <Droplets className="w-3.5 h-3.5" />
                    {isFa ? 'فناوری نمک‌زدایی اختصاصی GMEL-Desal' : 'HYBRID THERMAL-MEMBRANE DESALINATION'}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {isFa ? 'تصفیه آب‌های لب‌شور و شور زیرزمینی با کمترین هزینه برق' : 'Potable & Agri Distillate from Deep Brackish Aquifers'}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {isFa
                      ? 'واحدهای مدولار کانتینری GMEL-Desal ترکیبی از اسمز معکوس کم‌فشار (BWRO) و تبخیر چندمرحله‌ای با بازیافت حرارت اتلافی هستند. این سیستم‌ها بدون نیاز به اتصال به شبکه گاز یا برق پرهزینه، آب شیرین استاندارد شرب و گلخانه‌ای تولید می‌کنند.'
                      : 'Containerized GMEL-Desal units pair energy-efficient Low-Pressure Brackish Reverse Osmosis (BWRO) with low-temperature geothermal thermal vapor recovery. They produce WHO-standard drinking water and high-purity agricultural water without fossil fuel boilers.'}
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> {isFa ? 'کاهش TDS آب از ۸,۰۰۰ ppm به کمتر از ۳۰۰ ppm' : 'TDS reduction from 8,000 ppm to <300 ppm for potable/agri use'}</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> {isFa ? 'بازیافت حرارت مستقیم توربین بدون سوزاندن سوخت فسیلی' : 'Zero boiler burn; utilizes direct ORC turbine heat rejection'}</li>
                  </ul>
                </div>
                <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 space-y-4">
                  <div className="text-xs uppercase font-mono text-slate-400 tracking-wider font-bold">
                    {isFa ? 'شاخص‌های فنی واحد مدولار کانتینری' : 'CONTAINERIZED DESAL MODULE BENCHMARKS'}
                  </div>
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between py-2 border-b border-slate-800">
                      <span className="text-slate-400">{isFa ? 'ظرفیت تولید روزانه آب شیرین' : 'Daily Fresh Water Yield'}</span>
                      <span className="text-sky-400 font-bold">200 m³ - 2,500 m³/day</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-800">
                      <span className="text-slate-400">{isFa ? 'مصرف برق ویژه ویژه نمک‌زدایی' : 'Specific Power Consumption'}</span>
                      <span className="text-emerald-400 font-bold">1.8 - 2.1 kWh per m³</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-slate-400">{isFa ? 'مدیریت شورابه (Brine)' : 'Brine Management'}</span>
                      <span className="text-amber-400 font-bold">Evaporative Salt Crystallization</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeWaterTab === 'drip' && (
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
                    <Gauge className="w-3.5 h-3.5" />
                    {isFa ? 'آبیاری قطره‌ای زیرسطحی هوشمند' : 'SUBSURFACE DRIP IRRIGATION (SDI)'}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {isFa ? 'تزریق مستقیم آب و کود به ریشه گیاه با سنسورهای رطوبت‌سنج بی‌سیم' : 'Direct Root-Zone Fertigation with LoRaWAN Soil Telemetry'}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {isFa
                      ? 'لوله‌های آبیاری قطره‌ای در عمق ۳۰ تا ۵۰ سانتی‌متری خاک دفن شده و از تبخیر سطحی کاملاً جلوگیری می‌کنند. شبکه‌ای از سنسورهای خورشیدی LoRaWAN میزان رطوبت، شوری و دمای خاک را سنجیده و شیرهای برقی را دقیقاً مطابق با نیاز بیولوژیک گیاه باز و بسته می‌کنند.'
                      : 'Emitters buried 30-50 cm underground eliminate surface evaporation and weed growth entirely. Solar-powered LoRaWAN soil matric potential sensors trigger automated solenoid valves only when crop water stress thresholds are reached.'}
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> {isFa ? 'افزایش راندمان مصرف آب تا ۹۲ درصد در باغات و اراضی زراعی' : 'Water application efficiency boosted to >92%'}</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> {isFa ? 'کاهش ۳۵ درصدی مصرف کودهای شیمیایی از طریق تزریق دقیق ریشه‌ای' : 'Fertilizer consumption cut by 35% via targeted root fertigation'}</li>
                  </ul>
                </div>
                <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 space-y-4">
                  <div className="text-xs uppercase font-mono text-slate-400 tracking-wider font-bold">
                    {isFa ? 'مقایسه عملکرد سیستم هوشمند با روش سنتی' : 'PRECISION SDI FIELD COMPARISONS'}
                  </div>
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between py-2 border-b border-slate-800">
                      <span className="text-slate-400">{isFa ? 'صرفه‌جویی حجم آب در هکتار' : 'Water Saved per Hectare'}</span>
                      <span className="text-sky-400 font-bold">4,200 - 6,800 m³/year</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-800">
                      <span className="text-slate-400">{isFa ? 'افزایش تناژ محصول در هکتار' : 'Yield Increase'}</span>
                      <span className="text-emerald-400 font-bold">+28% to +45% (Pistachio/Almond)</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-slate-400">{isFa ? 'عمر مفید لوله‌گذاری زیرزمینی' : 'Pipe Durability'}</span>
                      <span className="text-white font-bold">15 - 20 Years (Root-resistant)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeWaterTab === 'aquifer' && (
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
                    <Droplets className="w-3.5 h-3.5" />
                    {isFa ? 'طرح جامع احیای آبخوان' : 'MANAGED AQUIFER RECHARGE (MAR)'}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {isFa ? 'تزریق سیلاب‌های فصلی و ذخیره‌سازی زیرزمینی آب' : 'Capturing Ephemeral Floods for Subsurface Replenishment'}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {isFa
                      ? 'به جای تبخیر سیلاب‌ها در بیابان یا ایجاد خسارت در دشت‌ها، سازه‌های آبخیزداری هوشمند KKM آب سیلاب را ته‌نشین کرده و از طریق چاه‌های جذبی به اعماق آبخوان هدایت می‌کنند. این کار باعث بالا آمدن سفره آب زیرزمینی و رفع فرونشست زمین می‌شود.'
                      : 'Rather than allowing flash floods to cause destructive erosion and evaporate in dry salt flats, KKM engineering channels seasonal runoffs through stepped sedimentation weirs directly into deep infiltration wells, raising water tables sustainably.'}
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> {isFa ? 'تثبیت فرونشست زمین و جلوگیری از تخریب فیزیکی آبخوان' : 'Halts catastrophic land subsidence and preserves soil strata'}</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> {isFa ? 'ایجاد پشتوانه استراتژیک آب برای دوره‌های خشکسالی طولانی' : 'Builds multi-year drought buffer reserves in natural aquifers'}</li>
                  </ul>
                </div>
                <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 space-y-4">
                  <div className="text-xs uppercase font-mono text-slate-400 tracking-wider font-bold">
                    {isFa ? 'پارامترهای عملکرد تغذیه مصنوعی سفره' : 'HYDROLOGICAL RECHARGE AUDIT METRICS'}
                  </div>
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between py-2 border-b border-slate-800">
                      <span className="text-slate-400">{isFa ? 'تغذیه خالص سالانه آبخوان' : 'Annual Infiltration Volume'}</span>
                      <span className="text-sky-400 font-bold">1.2 - 4.5 Million m³ per site</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-800">
                      <span className="text-slate-400">{isFa ? 'بهبود سطح آب ایستابی چاه‌ها' : 'Water Table Elevation'}</span>
                      <span className="text-emerald-400 font-bold">+1.8 to +3.4 meters / 3 years</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-slate-400">{isFa ? 'کنترل املاح و شوری آبخوان' : 'Salinity Dilution Rate'}</span>
                      <span className="text-white font-bold">EC Reduced by 15-25%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>


      {/* ========================================================
          3. DEDICATED SECTION: INFRASTRUCTURE
          ======================================================== */}
      <section id="rural-infrastructure" className="py-24 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              {isFa ? 'بخش اختصاصی سوم: زیرساخت‌های تاب‌آور و لجستیک' : 'DEDICATED DOMAIN 03: RESILIENT RURAL INFRASTRUCTURE'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight mb-4">
              {isFa 
                ? 'زنجیره سرد خورشیدی، راه‌های دسترسی و ارتباطات دیجیتال' 
                : 'Solar-Powered Cold Chains, All-Weather Corridors & IoT Connectivity'}
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {isFa 
                ? 'حذف ضایعات ۳۵ درصدی محصولات کشاورزی از طریق احداث سردخانه‌های چنددمایی هوشمند در مبدأ، تثبیت راه‌های شریانی روستایی و استقرار شبکه اینترنت اشیا (IoT) برای مدیریت هوشمند زیرساخت‌ها.' 
                : 'Eliminating catastrophic 35% post-harvest spoilage via modular solar cold hubs, soil-stabilized all-weather access corridors, and localized edge IoT telemetry.'}
            </p>
          </div>

          {/* Infrastructure Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            
            {/* Card 1: Cold Chain */}
            <div className="bg-slate-800/80 rounded-3xl p-6 border border-slate-700 hover:border-emerald-500/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
                  <ThermometerSnowflake className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {isFa ? 'سردخانه‌های خورشیدی چنددمایی' : 'Multi-Temp Solar Cold Hubs'}
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed mb-4">
                  {isFa 
                    ? 'هاب‌های کانتینری پیش‌ساخته با کنترل دمایی مستقل (از ۱۸- درجه برای پروتئین تا ۴+ درجه برای میوه‌جات). مجهز به باتری‌های پشتیبان و خنک‌کننده بدون کلروفلوئوروکربن.' 
                    : 'Prefabricated containerized cold storage nodes with partitioned chambers (-18°C frozen meat to +4°C fresh produce). Guaranteed zero spoilage during seasonal harvest peaks.'}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-700/60 font-mono text-xs text-emerald-400">
                {isFa ? 'کاهش ضایعات: از ۳۵٪ به کمتر از ۴٪' : 'Post-Harvest Loss Cut: 35% → <4%'}
              </div>
            </div>

            {/* Card 2: Road & Access */}
            <div className="bg-slate-800/80 rounded-3xl p-6 border border-slate-700 hover:border-emerald-500/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-6">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {isFa ? 'راه‌های ارتباطی تثبیت‌شده همه‌فصل' : 'Soil-Stabilized All-Weather Roads'}
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed mb-4">
                  {isFa 
                    ? 'استفاده از تثبیت‌کننده‌های نانومهندسی پلیمری خاک به جای آسفالت پرهزینه، مقاوم در برابر سیلاب و یخبندان، جهت اتصال بی‌وقفه مزارع به شبکه بزرگراه‌های ملی.' 
                    : 'Nanopolymer geopolymer soil stabilization replaces expensive asphalt, creating heavy-axle flood-resistant feeder arteries connecting farms to regional transit corridors.'}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-700/60 font-mono text-xs text-sky-400">
                {isFa ? 'دسترسی در تمام ۳۶۵ روز سال (بدون انسداد)' : '365-Day Heavy Truck Access'}
              </div>
            </div>

            {/* Card 3: LoRaWAN Telemetry */}
            <div className="bg-slate-800/80 rounded-3xl p-6 border border-slate-700 hover:border-emerald-500/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-6">
                  <Network className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {isFa ? 'شبکه اینترنت اشیا و تله‌متری بومی' : 'LoRaWAN Edge IoT Telemetry'}
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed mb-4">
                  {isFa 
                    ? 'دکل‌های خورشیدی کم‌مصرف LoRaWAN تا شعاع ۱۵ کیلومتر، داده‌های رطوبت خاک، وضعیت سردخانه‌ها، مصرف آب چاه‌ها و ایمنی را به پلتفرم دوقلوی دیجیتال ارسال می‌کنند.' 
                    : 'Low-power solar base stations provide a 15 km wireless mesh radius, piping pump status, cold chain temperatures, and soil diagnostics into KKM’s central digital twin platform.'}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-700/60 font-mono text-xs text-amber-400">
                {isFa ? 'پایش برخط بدون نیاز به اینترنت شهری' : 'Offline Edge Processing & Satellite Uplink'}
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================
          4. DEDICATED SECTION: LOCAL VALUE CREATION
          ======================================================== */}
      <section id="rural-value-creation" className="py-24 bg-slate-950 text-white relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
              {isFa ? 'بخش اختصاصی چهارم: خلق ارزش بومی و جهش درآمد' : 'DEDICATED DOMAIN 04: LOCAL VALUE CREATION'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight mb-4">
              {isFa 
                ? 'پایان خام‌فروشی: صنایع تبدیلی، بسته‌بندی صادراتی و ماندگاری ثروت' 
                : 'Ending Raw Commodity Export: Agro-Processing, Export Packaging & Retained Wealth'}
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {isFa 
                ? 'انتقال فرآیندهای سورتینگ، خشک‌کردن بهداشتی، روغن‌کشی و بسته‌بندی شناسنامه‌دار به داخل روستا جهت حفظ ارزش افزوده ۳ تا ۵ برابری برای کشاورزان و جوانان بومی.' 
                : 'Relocating sorting, hygienic dehydration, cold pressing, and authenticated packaging directly inside rural clusters—capturing a 3x to 5x value multiplier and retaining economic surplus within the local community.'}
            </p>
          </div>

          {/* Comparison Flow: Old Raw Export vs KKM Value Chain */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            
            {/* The Broken Traditional Model */}
            <div className="bg-rose-950/20 rounded-3xl p-6 sm:p-8 border border-rose-500/30">
              <div className="inline-flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase mb-4">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                {isFa ? 'مدل سنتی معیوب: خام‌فروشی و فقر مزمن' : 'TRADITIONAL RAW COMMODITY MODEL (BROKEN)'}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {isFa ? 'فروش محصول فله به دلال با ارزان‌ترین قیمت' : 'Distress Farm-Gate Selling to Middlemen'}
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>{isFa ? 'کشاورز در فصل برداشت به دلیل نبود سردخانه مجبور به حراج ارزان محصول خود است.' : 'Farmers forced to liquidate harvest at rock-bottom prices due to lack of local storage.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>{isFa ? 'ضایعات ۳۰ تا ۴۰ درصدی بار در حمل‌ونقل فله به میادین شهرهای بزرگ.' : '30-40% transport damage and spoilage while shipping raw crops in open trucks.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>{isFa ? 'بیش از ۷۵٪ سود نهایی فرآوری و بسته‌بندی در جیب واسطه‌های شهری می‌ماند.' : 'Over 75% of final retail value captured by urban intermediaries and trading cartels.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>{isFa ? 'مهاجرت جوانان به حاشیه شهرها به دلیل فقدان شغل‌های فنی و دارای ارزش بالا.' : 'Youth migrate to urban slums due to complete absence of skilled industrial rural employment.'}</span>
                </li>
              </ul>
            </div>

            {/* The KKM Integrated Value Model */}
            <div className="bg-emerald-950/20 rounded-3xl p-6 sm:p-8 border border-emerald-500/40">
              <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                {isFa ? 'مدل یکپارچه KKM: زنجیره ارزش و کارآفرینی بومی' : 'KKM INTEGRATED VALUE-ADD ECOSYSTEM'}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {isFa ? 'فرآوری در مبدأ و سهامداری تعاونی روستاییان' : 'Localized Processing & Producer Equity Ownership'}
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{isFa ? 'سردخانه‌های اختصاصی اجازه فروش تدریجی محصول در بهترین فصل بازار را می‌دهند.' : 'On-site cold hubs allow controlled release during seasonal market price highs.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{isFa ? 'کارگاه‌های بهداشتی، میوه خشک، کنسانتره و اسانس‌های دارویی صادراتی تولید می‌کنند.' : 'Hygienic processing sheds convert fresh produce into export-grade dehydrated goods and oils.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{isFa ? 'کشاورزان از طریق شرکت تعاونی سهامدار خط فرآوری بوده و سود صنعتی دریافت می‌کنند.' : 'Farmers own equity shares in the processing consortium, receiving both harvest and dividend yields.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{isFa ? 'اشتغال پایدار برای دانش‌آموختگان، زنان و جوانان در بخش کنترل کیفیت و بازرگانی دیجیتال.' : 'Creation of high-value technical, laboratory, and digital commerce jobs for rural youth.'}</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Retained Surplus Architecture Callout */}
          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-xs uppercase font-mono text-purple-400 tracking-wider font-bold mb-1">
                {isFa ? 'سرمایه‌گذاری مجدد در جامعه' : 'REINVESTMENT OF RETAINED SURPLUS'}
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {isFa ? 'ایجاد صندوق توسعه بومی از محل سود صنایع تبدیلی' : 'Local Community Endowment & Infrastructure Fund'}
              </h4>
              <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
                {isFa 
                  ? 'بخشی از درآمد مازاد حاصل از فروش محصولات نهایی مستقیماً به صندوق نوسازی مدارس، خدمات درمانی و نگهداری تأسیسات انرژی و آب منطقه اختصاص می‌یابد تا چرخه توسعه کاملاً خودکفا و خودگردان گردد.' 
                  : 'A dedicated percentage of retained industrial margin flows into a sovereign community fund, self-financing school upgrades, telemedicine clinics, and maintenance of clean utility grids.'}
              </p>
            </div>
            {onNavigatePilot && (
              <button
                onClick={onNavigatePilot}
                className="px-6 py-3.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-colors shrink-0 flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <span>{isFa ? 'ارائه درخواست هاب فرآوری منطقه' : 'Propose Processing Hub'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      </section>
    </div>
  );
};

export default RuralDedicatedDomains;
