import * as React from 'react';
import { useLanguage } from '../../LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Droplets, 
  Building2, 
  Sprout, 
  Cpu, 
  Coins, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  BarChart3,
  ShieldCheck,
  PackageCheck
} from 'lucide-react';

interface PillarData {
  id: string;
  num: string;
  titleEn: string;
  titleFa: string;
  categoryEn: string;
  categoryFa: string;
  quoteEn: string;
  quoteFa: string;
  descEn: string;
  descFa: string;
  solutionsEn: string[];
  solutionsFa: string[];
  icon: React.ElementType;
  color: string;
  badgeBg: string;
}

export const RuralPillars: React.FC = () => {
  const { language, direction } = useLanguage();
  const isFa = language === 'FA';
  const [selectedPillarId, setSelectedPillarId] = React.useState<string>('energy');

  const pillars: PillarData[] = [
    {
      id: 'energy',
      num: '01',
      titleEn: 'Rural & Distributed Energy',
      titleFa: 'انرژی نامتمرکز و روستایی',
      categoryEn: 'Foundational Energy',
      categoryFa: 'پایه انرژی پایدار',
      quoteEn: 'Reliable energy is the foundation of productive rural infrastructure.',
      quoteFa: 'انرژی پایدار، بنیاد و پیش‌شرط هر نوع زیرساخت و فعالیت تولیدی در روستا است.',
      descEn: 'Energy is not merely for household illumination; it powers water extraction, cooling, post-harvest equipment, and connectivity. KKM engineers robust microgrids capable of islanded autonomous operation.',
      descFa: 'انرژی فقط برای روشنایی خانگی نیست؛ بلکه نیروی محرکه استخراج آب، سردخانه‌ها، کارگاه‌های فرآوری و ارتباطات است. KKM ریزشبکه‌های خورشیدی و ترکیبی مقاوم را برای کارکرد مستقل و پایدار طراحی می‌کند.',
      solutionsEn: [
        'Solar PV & Agrivoltaic systems',
        'Small-scale wind turbines in high-wind corridors',
        'Geothermal & low-enthalpy thermal applications',
        'Hybrid solar-diesel-battery microgrids',
        'Lithium & flow battery storage reserves',
        'Productive power lines for agro-industrial workshops'
      ],
      solutionsFa: [
        'سیستم‌های فتوولتائیک و اگروولتائیک (تلفیق پنل با کشت)',
        'توربین‌های بادی کوچک‌مقیاس در دالان‌های بادخیز',
        'کاربردهای زمین‌گرمایی و حرارتی کم‌دما',
        'ریزشبکه‌های هیبریدی خورشیدی-باطری با اتصال هوشمند',
        'سیستم‌های ذخیره‌ساز انرژی باتری لیتیومی و فلو',
        'خطوط برق اختصاصی برای کارگاه‌های فرآوری و صنایع روستایی'
      ],
      icon: Zap,
      color: 'text-amber-500',
      badgeBg: 'bg-amber-500/10 border-amber-500/30'
    },
    {
      id: 'water',
      num: '02',
      titleEn: 'Water Security & Productive Water',
      titleFa: 'امنیت آب و آب مولد',
      categoryEn: 'Water Sovereignty',
      categoryFa: 'حاکمیت و امنیت آب',
      quoteEn: 'Water infrastructure should support both community resilience and productive activity.',
      quoteFa: 'زیرساخت آب باید همزمان تاب‌آوری زیستی جامعه و فعالیت‌های تولیدی و کشاورزی را تضمین کند.',
      descEn: 'Addressing the dual mandate of drinking water hygiene and productive agricultural water. From solar-driven brackish water reverse osmosis to closed-loop recycled irrigation systems.',
      descFa: 'پاسخ همزمان به نیاز آب شرب بهداشتی و آب مورد نیاز تولید کشاورزی و دامداری؛ از اسمز معکوس خورشیدی برای آب‌های لب‌شور و شور تا بازچرخانی آب خاکستری و مخازن ذخیره عایق‌شده.',
      solutionsEn: [
        'Decentralized solar water desalination (BWRO)',
        'Solar deep-well pumping stations',
        'Closed-loop graywater recycling & bio-filters',
        'Insulated geometric water storage reservoirs',
        'Subsurface pressurized drip irrigation integration',
        'Watershed management & artificial aquifer recharge'
      ],
      solutionsFa: [
        'آب‌شیرین‌کن‌های خورشیدی غیرمتمرکز (BWRO)',
        'ایستگاه‌های پمپاژ خورشیدی چاه‌های عمیق و نیمه‌عمیق',
        'بازچرخانی پساب و فیلترهای زیستی تصفیه',
        'مخازن ذخیره عایق و پوشش‌دار ژئوممبران',
        'تلفیق آبیاری تحت فشار و زیرسطحی هوشمند',
        'آبخیزداری، پخش سیلاب و تغذیه مصنوعی سفره‌ها'
      ],
      icon: Droplets,
      color: 'text-sky-500',
      badgeBg: 'bg-sky-500/10 border-sky-500/30'
    },
    {
      id: 'infrastructure',
      num: '03',
      titleEn: 'Resilient Rural Infrastructure',
      titleFa: 'زیرساخت‌های مقاوم و کالبدی',
      categoryEn: 'Physical Resilience',
      categoryFa: 'تاب‌آوری کالبدی و عمرانی',
      quoteEn: 'Climate-hardened, modular infrastructure connecting remote production to national corridors.',
      quoteFa: 'زیرساخت‌های مدولار و مقاوم به اقلیم که تولیدات دورافتاده را به شاهراه‌های ملی وصل می‌کند.',
      descEn: 'Engineering resilient civil structures, modular utility buildings, cold logistics corridors, and flood-proof access roads that reduce physical vulnerability in remote geographies.',
      descFa: 'طراحی ابنیه فنی و سازه‌های سبک مقاوم، ایستگاه‌های تأسیساتی مدولار، دالان‌های لجستیک سرد و جاده‌های دسترسی ضدسیلاب که ریسک‌های جغرافیایی را به حداقل می‌رسانند.',
      solutionsEn: [
        'Modular pre-engineered utility sheds',
        'Climate-adapted feeder roads & culverts',
        'Flood mitigation and seasonal storm channels',
        'Decentralized community utility hubs',
        'Clean sanitation & biological septic systems',
        'Emergency shelter and resilience backup points'
      ],
      solutionsFa: [
        'سازه‌ها و سوله‌های پیش‌ساخته و مدولار تأسیساتی',
        'راه‌های دسترسی مقاوم به یخ‌زدگی و سیلاب',
        'کانال‌های هدایت و دفع سیلاب‌های فصلی',
        'هاب‌های چندمنظوره تأسیسات عمومی روستا',
        'سیستم‌های بهداشتی غیرمتمرکز و سپتیک بیولوژیک',
        'نقاط پشتیبانی اضطراری و پناهگاه‌های بحران'
      ],
      icon: Building2,
      color: 'text-indigo-500',
      badgeBg: 'bg-indigo-500/10 border-indigo-500/30'
    },
    {
      id: 'agriculture',
      num: '04',
      titleEn: 'Productive Agriculture & Livestock',
      titleFa: 'کشاورزی و دامداری مولد و دانش‌بنیان',
      categoryEn: 'Agro-Economy',
      categoryFa: 'اقتصاد کشاورزی پایدار',
      quoteEn: 'The objective is not only to increase production, but to increase the value captured locally.',
      quoteFa: 'هدف صرفاً افزایش تولید نیست؛ هدف افزایش ارزش افزوده‌ای است که در خود منطقه ایجاد و حفظ می‌شود.',
      descEn: 'Transitioning beyond raw farming. KKM structures the full value chain: RESOURCE → PRODUCTION → PROCESSING → PACKAGING → BRANDING → MARKET to multiply local grower margins by up to 500%.',
      descFa: 'عبور از کشاورزی سنتی و معیشتی. KKM کل زنجیره ارزش را ساختاردهی می‌کند: منبع → تولید → فرآوری → بسته‌بندی → برندسازی → بازار تا حاشیه سود کشاورز و دامدار بومی تا ۵ برابر افزایش یابد.',
      solutionsEn: [
        'Solar-powered greenhouse cultivation',
        'High-density medicinal herbs & horticulture',
        'Controlled micro-irrigation networks',
        'Standardized livestock feed silage facilities',
        'Veterinary telemetry & electronic herd tracking',
        'Sanitary milk cooling & processing hubs'
      ],
      solutionsFa: [
        'کشت گلخانه‌ای با انرژی خورشیدی و کنترل اقلیم',
        'کشت گیاهان دارویی و محصولات باغی پرارزش',
        'شبکه‌های آبیاری موضعی هوشمند و کودآبیاری',
        'سیلوها و تأسیسات فرآوری و نگهداری خوراک دام',
        'پایش سلامت دام و ردیابی الکترونیک گله‌ها',
        'مراکز جمع‌آوری، شیرسردکن و فرآوری لبنیات'
      ],
      icon: Sprout,
      color: 'text-emerald-500',
      badgeBg: 'bg-emerald-500/10 border-emerald-500/30'
    },
    {
      id: 'digital',
      num: '05',
      titleEn: 'Digital Rural Infrastructure & AI',
      titleFa: 'زیرساخت دیجیتال روستایی و هوش مصنوعی',
      categoryEn: 'Operational Intelligence',
      categoryFa: 'هوشمندی و اتوماسیون',
      quoteEn: 'Digital technologies provide the intelligence layer for rural infrastructure and productive systems.',
      quoteFa: 'فناوری‌های دیجیتال لایه هوشمندی عملیاتی را برای زیرساخت‌ها و سیستم‌های تولیدی روستایی فراهم می‌کنند.',
      descEn: 'Practical telemetry and analytics rather than abstract slogans: soil moisture sensors, energy microgrid balance controllers, satellite vegetation indices, predictive maintenance, and direct market pricing access.',
      descFa: 'ابزارهای ملموس و عملیاتی داده و هوش مصنوعی: حسگرهای رطوبت خاک، کنترل تعادل بار ریزشبکه، تصاویر ماهواره‌ای پایش سلامت پوشش گیاهی، نگهداری پیش‌بینانه تجهیزات، و اطلاع‌رسانی برخط قیمت بازار.',
      solutionsEn: [
        'IoT soil moisture and soil salinity sensors',
        'Automated solar pump dispatch controllers',
        'Satellite multispectral crop vigor analysis',
        'Predictive maintenance for transformers and pumps',
        'Digital Twin simulation for village water balances',
        'Direct-to-buyer market transparency interfaces'
      ],
      solutionsFa: [
        'حسگرهای IoT سنجش رطوبت، دما و شوری خاک',
        'کنترل‌کننده‌های خودکار نوبت‌دهی پمپ‌های خورشیدی',
        'تحلیل تصاویر ماهواره‌ای شاخص سلامت گیاهی (NDVI)',
        'نگهداری پیش‌بینانه پمپ‌ها، ترانس‌ها و تجهیزات',
        'شبیه‌سازی دوقلوی دیجیتال بیلان آب و انرژی روستا',
        'سامانه‌های دسترسی مستقیم به خریداران و بازارهای کلان'
      ],
      icon: Cpu,
      color: 'text-cyan-500',
      badgeBg: 'bg-cyan-500/10 border-cyan-500/30'
    },
    {
      id: 'finance',
      num: '06',
      titleEn: 'Development Finance & Structuring',
      titleFa: 'تأمین مالی توسعه‌ای و ساختاردهی پروژه',
      categoryEn: 'Bankable Structuring',
      categoryFa: 'ساختاردهی مالی و سرمایه‌گذاری',
      quoteEn: 'KKM transforms dispersed local opportunities into bankable, technically sound projects ready for financing.',
      quoteFa: 'KKM تلاش می‌کند فرصت‌های محلی را از یک ایده پراکنده به یک پروژه قابل ارزیابی، تأمین مالی، اجرا و توسعه تبدیل کند.',
      descEn: 'Structuring projects so commercial banks, development institutions, regional funds, and private investors can safely commit capital through defined return mechanisms and revenue sharing.',
      descFa: 'تدوین ساختار حقوقی و اقتصادی پروژه‌ها به‌گونه‌ای که بانک‌ها، صندوق‌های توسعه، نهادهای عمومی و سرمایه‌گذاران خصوصی با اطمینان و مدل‌های بازگشت سرمایه مشخص در آن‌ها مشارکت کنند.',
      solutionsEn: [
        'Bankable feasibility and economic rate-of-return (ERR)',
        'Public-Private Partnership (PPP) governance design',
        'Equipment leasing and energy-as-a-service models',
        'Cooperative equity & community benefit agreements',
        'Carbon credit aggregation & green bond alignment',
        'Phased risk-mitigated milestone disbursement'
      ],
      solutionsFa: [
        'گزارش‌های توجیهی بانکی با نرخ بازده اقتصادی مشخص (ERR)',
        'طراحی قراردادهای مشارکت عمومی-خصوصی (PPP)',
        'مدل‌های لیزینگ تجهیزات و فروش خدمت انرژی/آب',
        'ساختار سهامداری تعاونی و منافع جامعه محلی',
        'تجمیع گواهی‌های صرفه‌جویی کربن و تسهیلات سبز',
        'تخصیص مرحله‌ای منابع مالی متناسب با پیشرفت فنی فازها'
      ],
      icon: Coins,
      color: 'text-emerald-600',
      badgeBg: 'bg-emerald-500/10 border-emerald-500/30'
    }
  ];

  const selectedPillar = pillars.find(p => p.id === selectedPillarId) || pillars[0];

  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden border-b border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-bold text-emerald-400 mb-2 block">
            {isFa ? 'شش ستون راهبردی KKM' : 'THE 6 CORE PILLARS'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white mb-4">
            {isFa 
              ? 'ستون‌های عملیاتی و فناورانه پلتفرم' 
              : 'The Six Core Pillars of Rural Development'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {isFa 
              ? 'تلفیق تخصصی مهندسی، زیرساخت و اقتصاد برای ایجاد اکوسیستمی خوداتکا و پایدار' 
              : 'Engineering, infrastructure, technology and finance operating in synchronized coordination.'}
          </p>
        </div>

        {/* 6 Pillars Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const isSelected = pillar.id === selectedPillarId;
            return (
              <button
                key={pillar.id}
                onClick={() => setSelectedPillarId(pillar.id)}
                className={`p-4 rounded-xl border text-start transition-all cursor-pointer flex flex-col justify-between h-32 relative overflow-hidden group ${
                  isSelected 
                    ? 'bg-slate-800 border-emerald-500 shadow-xl ring-2 ring-emerald-500/40' 
                    : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {pillar.num}
                  </span>
                  <Icon className={`w-5 h-5 ${isSelected ? pillar.color : 'text-slate-500'}`} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 mb-0.5 truncate">
                    {isFa ? pillar.categoryFa : pillar.categoryEn}
                  </div>
                  <div className="text-sm font-bold text-white line-clamp-2 leading-tight">
                    {isFa ? pillar.titleFa : pillar.titleEn}
                  </div>
                </div>
                {isSelected && (
                  <motion.div 
                    layoutId="pillarActiveIndicator"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500" 
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Pillar Detailed View */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPillar.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl relative mb-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Descriptions & Philosophy */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-3">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${selectedPillar.badgeBg}`}>
                    <selectedPillar.icon className={`w-7 h-7 ${selectedPillar.color}`} />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-emerald-400 tracking-wider">
                      PILLAR {selectedPillar.num}
                    </span>
                    <h3 className="text-2xl font-bold text-white">
                      {isFa ? selectedPillar.titleFa : selectedPillar.titleEn}
                    </h3>
                  </div>
                </div>

                <blockquote className="p-4 rounded-xl bg-slate-800/70 border-r-4 rtl:border-r-4 ltr:border-l-4 border-emerald-500 text-sm sm:text-base text-emerald-200 font-medium italic leading-relaxed">
                  "{isFa ? selectedPillar.quoteFa : selectedPillar.quoteEn}"
                </blockquote>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {isFa ? selectedPillar.descFa : selectedPillar.descEn}
                </p>
              </div>

              {/* Right Column: Key Engineered Solutions */}
              <div className="lg:col-span-6 bg-slate-800/50 border border-slate-700/60 rounded-xl p-6 space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  {isFa ? 'راهکارها و بسته‌های مهندسی KKM:' : 'KKM Engineered Solutions & Modules:'}
                </h4>

                <div className="space-y-3">
                  {(isFa ? selectedPillar.solutionsFa : selectedPillar.solutionsEn).map((sol, index) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/70 border border-slate-700/40 text-xs sm:text-sm text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{sol}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* Section 10.7 & 10.8: Local Value Chains Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-8">
          <div className="max-w-4xl">
            <span className="text-xs uppercase tracking-widest font-bold text-amber-400 mb-1 block">
              {isFa ? 'زنجیره ارزش محلی (Section 10.8)' : 'LOCAL VALUE CHAINS'}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              {isFa 
                ? 'از تولید خام تا خلق ارزش در خود منطقه' 
                : 'From Raw Production to Local Value Creation'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              {isFa 
                ? 'این مدل موقعیت KKM را صرفاً به‌عنوان یک مجری زیرساخت کالبدی تعریف نمی‌کند، بلکه به‌عنوان یک یکپارچه‌ساز و شتاب‌دهنده توسعه اقتصادی منطقه تثبیت می‌نماید:' 
                : 'This model positions KKM not merely as a civil infrastructure contractor, but as a holistic development integrator:'}
            </p>
          </div>

          {/* Value Chain 7-Step Horizontal Flow */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3 text-center">
            {[
              { step: '01', en: 'Agriculture', fa: 'کشاورزی / دامداری', descEn: 'Primary production', descFa: 'تولید پایه' },
              { step: '02', en: 'Processing', fa: 'فرآوری اولیه', descEn: 'Sorting & cleaning', descFa: 'سورتینگ و پاکسازی' },
              { step: '03', en: 'Product Dev', fa: 'توسعه محصول', descEn: 'Derived goods', descFa: 'فرآورده‌های ارزش‌افزا' },
              { step: '04', en: 'Packaging', fa: 'بسته‌بندی استاندارد', descEn: 'Export sanitation', descFa: 'بسته‌بندی بهداشتی' },
              { step: '05', en: 'Market Access', fa: 'دسترسی به بازار', descEn: 'Direct commercial off-take', descFa: 'خرید تضمینی و کلان' },
              { step: '06', en: 'Employment', fa: 'اشتغال پایدار', descEn: 'Local jobs creation', descFa: 'ایجاد فرصت شغلی' },
              { step: '07', en: 'Investment', fa: 'جذب سرمایه مجدد', descEn: 'Reinvested capital', descFa: 'سرمایه‌گذاری مستمر' }
            ].map((chain, idx) => (
              <div key={idx} className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 flex flex-col justify-between">
                <span className="text-[10px] font-mono font-bold text-emerald-400 mb-1">
                  STAGE {chain.step}
                </span>
                <div className="text-xs font-bold text-white mb-0.5">
                  {isFa ? chain.fa : chain.en}
                </div>
                <div className="text-[11px] text-slate-400">
                  {isFa ? chain.descFa : chain.descEn}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
