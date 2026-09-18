import * as React from 'react';
import { useLanguage } from '../../LanguageContext';
import { motion } from 'motion/react';
import { 
  Sun, 
  BatteryCharging, 
  Droplets, 
  Sprout, 
  Factory, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  Truck, 
  Repeat, 
  Activity, 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  Layers,
  Wrench,
  Wifi,
  Briefcase
} from 'lucide-react';

export const EnergyVillageSection: React.FC = () => {
  const { language, direction } = useLanguage();
  const isFa = language === 'FA';

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10 space-y-20">

        {/* 10.11: Flagship Architectural Model: KKM Energy Village */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5" />
              {isFa ? 'مدل مرجع بنیادین KKM' : 'FLAGSHIP ARCHITECTURAL MODEL'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white mb-4">
              {isFa ? 'مدل دهکده انرژی KKM (Energy Village Model)' : 'The KKM Energy Village Architecture'}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {isFa 
                ? 'یک الگوی معماری قابل تکرار، نه یک ادعای غیرواقعی؛ مدلی مهندسی برای تجمیع تولید انرژی پاک، آب شیرین، کشاورزی مدرن و کارگاه‌های فرآوری در یک اکوسیستم هم‌افزا.' 
                : 'A replicable engineering architecture integrating renewable generation, water production, controlled farming, and local agro-processing into a single synergistic micro-ecosystem.'}
            </p>
          </div>

          {/* Architectural Equation Card */}
          <div className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl mb-8">
            <div className="text-xs uppercase font-mono font-bold text-emerald-400 mb-3 tracking-widest text-center">
              {isFa ? 'معادله معماری دهکده انرژی مولد' : 'THE ARCHITECTURAL EQUATION'}
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-slate-200 text-center">
              <span className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-amber-300">
                {isFa ? 'انرژی تجدیدپذیر' : 'Renewable Energy'}
              </span>
              <span className="text-emerald-400 font-extrabold text-base">+</span>
              <span className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-cyan-300">
                {isFa ? 'ذخیره‌سازی انرژی' : 'Energy Storage'}
              </span>
              <span className="text-emerald-400 font-extrabold text-base">+</span>
              <span className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sky-300">
                {isFa ? 'زیرساخت آب' : 'Water Infrastructure'}
              </span>
              <span className="text-emerald-400 font-extrabold text-base">+</span>
              <span className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-emerald-300">
                {isFa ? 'کشاورزی مولد' : 'Productive Agriculture'}
              </span>
              <span className="text-emerald-400 font-extrabold text-base">+</span>
              <span className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-orange-300">
                {isFa ? 'صنایع تبدیلی و فرآوری' : 'Agro-Processing'}
              </span>
              <span className="text-emerald-400 font-extrabold text-base">+</span>
              <span className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-indigo-300">
                {isFa ? 'مدیریت دیجیتال' : 'Digital Telemetry'}
              </span>
              <span className="text-emerald-400 font-extrabold text-lg">=</span>
              <span className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/25">
                {isFa ? 'دهکده انرژی و تولید پایدار' : 'Productive Energy Village'}
              </span>
            </div>
          </div>

          {/* Applications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { titleEn: 'Power Generation', titleFa: 'تأمین برق مستقل', descEn: 'Islanded microgrids', descFa: 'برق پایدار ریزشبکه', icon: Sun },
              { titleEn: 'Thermal Services', titleFa: 'حرارت و برودت', descEn: 'Heating & cooling loops', descFa: 'گرمایش و سرمایش پاک', icon: Flame },
              { titleEn: 'Productive Water', titleFa: 'آب شرب و کشاورزی', descEn: 'Solar desalination & wells', descFa: 'آب‌شیرین‌کن و چاه‌ها', icon: Droplets },
              { titleEn: 'Greenhouse Farming', titleFa: 'کشاورزی متراکم', descEn: 'Agrivoltaic cultivation', descFa: 'کشت گلخانه‌ای خورشیدی', icon: Sprout },
              { titleEn: 'Cold Chain Logistics', titleFa: 'سردخانه و نگهداری', descEn: 'Solar chillers', descFa: 'سردخانه خورشیدی محصولات', icon: Factory },
              { titleEn: 'Digital Monitoring', titleFa: 'پایش داده‌محور', descEn: 'IoT & Telemetry twin', descFa: 'حسگرهای اینترنت اشیاء', icon: Cpu },
              { titleEn: 'Community Utilities', titleFa: 'خدمات عمومی روستا', descEn: 'Clinics, schools & lighting', descFa: 'روشنایی، درمانگاه، مدارس', icon: ShieldCheck },
              { titleEn: 'Local Small Industry', titleFa: 'کارگاه‌های تولیدی', descEn: 'Handicrafts & packaging', descFa: 'بسته‌بندی و صنایع دستی', icon: Wrench }
            ].map((app, idx) => {
              const Icon = app.icon;
              return (
                <div key={idx} className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 text-emerald-400 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white mb-0.5">
                      {isFa ? app.titleFa : app.titleEn}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {isFa ? app.descFa : app.descEn}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 10.12 & 10.13: GMEL Connection & The Rural Water-Energy Nexus */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* GMEL Connection (10.12) */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest font-mono font-bold text-emerald-400 mb-2 block">
                {isFa ? 'جایگاه فناوری GMEL (Section 10.12)' : 'GMEL CONNECTION (SECTION 10.12)'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                {isFa 
                  ? 'GMEL در کاربردهای آب و انرژی روستایی' 
                  : 'GMEL for Rural Energy & Water Applications'}
              </h3>
              
              <blockquote className="p-4 rounded-xl bg-slate-900 border-r-4 rtl:border-r-4 ltr:border-l-4 border-emerald-500 text-slate-200 text-sm sm:text-base italic leading-relaxed mb-4">
                {isFa
                  ? '«GMEL می‌تواند، پس از ارزیابی فنی و اقتصادی متناسب با هر سایت، به‌عنوان یکی از مسیرهای بالقوه فناوری در مدل‌های یکپارچه انرژی و آب روستایی مورد بررسی قرار گیرد.»'
                  : '"GMEL can be evaluated as one potential technology pathway within integrated rural energy and water development models, subject to site-specific technical and economic assessment."'}
              </blockquote>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {isFa 
                  ? 'تأکید KKM بر دقت مهندسی است: GMEL یک عصای جادویی تبلیغاتی نیست، بلکه پس از مطالعات ژئوترمال، هیدرولیکی و بازدهی اقتصادی اختصاصی هر پهنه، در کنار پنل‌های خورشیدی، باد و سیستم‌های هیبریدی در ترازهای کاربردی بررسی می‌شود.' 
                  : 'KKM applies rigorous engineering prudence: GMEL is assessed alongside solar, wind, and storage assets based on site-specific subsurface, hydrological, and financial parameters.'}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {isFa ? 'ارزیابی اقتصادی و فنی مستقل' : 'Subject to Independent Feasibility'}
              </span>
              <span className="font-mono text-emerald-400">TRL 6-8 Integration</span>
            </div>
          </div>

          {/* Rural Water-Energy Nexus (10.13) */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest font-mono font-bold text-sky-400 mb-2 block">
                {isFa ? 'پیوند دوطرفه آب و انرژی (Section 10.13)' : 'WATER-ENERGY NEXUS (SECTION 10.13)'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                {isFa 
                  ? 'چرخه دوطرفه بازخورد اقتصادی و تولیدی' 
                  : 'The Dual Feedback Nexus Model'}
              </h3>
              
              <div className="space-y-4 my-4">
                {/* Forward Loop */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                    {isFa ? '۱. چرخه تولید مستقیم:' : '1. Productive Flow Loop:'}
                  </span>
                  <div className="text-xs text-slate-300 font-medium leading-relaxed">
                    {isFa 
                      ? 'انرژی پایدار ➔ نمک‌زدایی و پمپاژ آب ➔ کشاورزی و دامداری ➔ فرآوری محصولات ➔ اقتصاد محلی ➔ اشتغال دائم' 
                      : 'Clean Energy ➔ Water Treatment/Pumping ➔ Modern Agriculture ➔ Processing ➔ Local Economy ➔ Employment'}
                  </div>
                </div>

                {/* Reverse Economic Loop */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider block mb-1">
                    {isFa ? '۲. چرخه بازگشت ثروت و پایداری سرمایه:' : '2. Revenue Reinvestment Loop:'}
                  </span>
                  <div className="text-xs text-slate-300 font-medium leading-relaxed">
                    {isFa 
                      ? 'اقتصاد توانمند محلی ➔ درآمد پایدار ➔ نگهداری زیرساخت ➔ سرمایه‌گذاری مجدد در ظرفیت آب و برق' 
                      : 'Robust Local Economy ➔ Retained Revenue ➔ Infrastructure Maintenance ➔ Expansion of Water & Energy'}
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-800 pt-4">
              {isFa 
                ? 'این حلقه بسته اقتصادی تضمین می‌کند که تأسیسات پس از افتتاح به حال خود رها نشوند و درآمد حاصل از تولید، هزینه استهلاک و نگهداری را پوشش دهد.' 
                : 'This closed loop ensures facilities remain fully funded and operational throughout their design life via internally generated local revenues.'}
            </p>
          </div>

        </div>

        {/* 10.14 & 10.15: Productive Rural Industries & Employment Pathway */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-10 space-y-8">
          <div>
            <span className="text-xs uppercase tracking-widest font-mono font-bold text-amber-400 mb-1 block">
              {isFa ? 'صنعتی‌سازی و اشتغال روستایی (Section 10.14 & 10.15)' : 'RURAL INDUSTRIALIZATION & EMPLOYMENT'}
            </span>
            <h3 className="text-2xl font-bold text-white mb-3">
              {isFa ? 'صنایع مولد روستایی و مسیر اشتغال پایدار' : 'Productive Rural Industries & Employment'}
            </h3>
            <blockquote className="text-base sm:text-lg font-bold text-emerald-300 italic mb-6">
              {isFa 
                ? '«تولید در محل. فرآوری در محل. خلق ارزش در محل.»' 
                : '"Produce locally. Process locally. Add value locally."'}
            </blockquote>
          </div>

          {/* 8 Productive Industry Domains */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { en: 'Agricultural Processing', fa: 'فرآوری کشاورزی و باغی' },
              { en: 'Food & Dairy Processing', fa: 'صنایع غذایی و لبنی' },
              { en: 'Biomass & Organic Fertilizers', fa: 'بیومس و کودهای زیستی' },
              { en: 'Local Natural Materials', fa: 'مصالح بومی و صنایع دستی' },
              { en: 'Construction Components', fa: 'تولید قطعات سبک ساختمانی' },
              { en: 'Renewable Assembly Units', fa: 'مونتاژ و نگهداری تجدیدپذیر' },
              { en: 'Water Filtration Kits', fa: 'تجهیزات و فیلتراسیون آب' },
              { en: 'Decentralized Manufacturing', fa: 'کارگاه‌های تولید کوچک‌مقیاس' }
            ].map((ind, i) => (
              <div key={i} className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                <span>{isFa ? ind.fa : ind.en}</span>
              </div>
            ))}
          </div>

          {/* 10.15 Employment Pathway */}
          <div className="pt-6 border-t border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-400" />
              {isFa ? 'مسیر ۷ مرحله‌ای اشتغال‌زایی مهارتی KKM (Section 10.15):' : 'The 7-Stage Employment Pathway (Section 10.15):'}
            </h4>
            
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-bold">
              {[
                { en: 'Infrastructure', fa: 'احداث زیرساخت' },
                { en: 'Production', fa: 'تولید پایه' },
                { en: 'Processing', fa: 'فرآوری و سورت' },
                { en: 'Services', fa: 'خدمات لجستیک' },
                { en: 'Maintenance', fa: 'نگهداری فنی' },
                { en: 'Digital Ops', fa: 'مدیریت دیجیتال' },
                { en: 'Entrepreneurship', fa: 'کارآفرینی و تعاونی' }
              ].map((step, idx) => (
                <React.Fragment key={idx}>
                  <span className="px-3 py-1.5 rounded-md bg-slate-900 border border-slate-700 text-slate-200">
                    {isFa ? step.fa : step.en}
                  </span>
                  {idx < 6 && (
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400 rtl:rotate-180 shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* 10.16: Nomadic & Mobile Infrastructure */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 rounded-2xl p-6 sm:p-10 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest font-mono font-bold text-amber-400 mb-1 block">
                {isFa ? 'توسعه جامعه عشایری (Section 10.16)' : 'NOMADIC & MOBILE INFRASTRUCTURE'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {isFa 
                  ? 'زیرساخت‌های سیار و منطبق با کوچ‌پذیری جامعه عشایری' 
                  : 'Mobile Infrastructure Adapted to Nomadic Communities'}
              </h3>
              <blockquote className="text-sm sm:text-base font-medium text-amber-200 italic mb-4">
                {isFa 
                  ? '«زیرساخت باید با تحرک و کوچ‌پذیری جوامع منطبق شود، جایی که زندگی و فعالیت تولیدی متحرک است.»' 
                  : '"Infrastructure should adapt to mobility where communities and productive activities are mobile."'}
              </blockquote>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                {isFa 
                  ? 'عشایر پاسداران امنیت غذایی و گوشت کشور هستند. توسعه عشایری نیازمند بتن‌ریزی‌های ساکن نیست؛ نیازمند بسته‌های فناورانه متحرک، تاشو، سبک و با قابلیت جابه‌جایی سریع در ییلاق و قشلاق است.' 
                  : 'Nomadic pastoralists preserve vital food security. Their development requires lightweight, deployable, mobile technology rather than static urban concrete.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            {[
              { titleEn: 'Mobile Solar Stations', titleFa: 'ژنراتورهای خورشیدی تاشو و قابل‌حمل', descEn: 'Rugged portable power kits', descFa: 'برق سبک برای چراغ، تلفن و شارژ' },
              { titleEn: 'Water Purification Kits', titleFa: 'تصفیه آب سیار سرچشمه و قنات', descEn: 'Compact solar UV/membrane filters', descFa: 'فیلتراسیون بهداشتی در چادرها' },
              { titleEn: 'Mobile Cold Chain', titleFa: 'تریلرهای سردخانه سیار', descEn: 'Solar milk & meat cooling', descFa: 'سردخانه لبنیات و گوشت در مراتع' },
              { titleEn: 'Satellite Telemetry', titleFa: 'ارتباطات ماهواره‌ای و ردیابی گله', descEn: 'GPS tags & remote health monitoring', descFa: 'ردیابی گوسفندان و ارتباط اضطراری' }
            ].map((sol, idx) => (
              <div key={idx} className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
                <div className="text-xs font-bold text-amber-400 mb-1">
                  {isFa ? sol.titleFa : sol.titleEn}
                </div>
                <div className="text-[11px] text-slate-400 leading-normal">
                  {isFa ? sol.descFa : sol.descEn}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
