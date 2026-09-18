import * as React from 'react';
import { useLanguage } from '../../LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, 
  Droplets, 
  Zap, 
  Building2, 
  Sprout, 
  Factory, 
  Cpu, 
  Coins, 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  Layers, 
  ArrowDown, 
  ArrowRight,
  Info
} from 'lucide-react';

interface ModelNode {
  id: string;
  step: number;
  titleEn: string;
  titleFa: string;
  subtitleEn: string;
  subtitleFa: string;
  descEn: string;
  descFa: string;
  outputsEn: string[];
  outputsFa: string[];
  icon: React.ElementType;
  color: string;
  accentBg: string;
}

export const RuralModelDiagram: React.FC = () => {
  const { language, direction } = useLanguage();
  const isFa = language === 'FA';
  const [activeNodeIndex, setActiveNodeIndex] = React.useState<number>(0);

  const modelNodes: ModelNode[] = [
    {
      id: 'resources',
      step: 1,
      titleEn: 'LOCAL RESOURCES',
      titleFa: 'ظرفیت‌ها و منابع محلی',
      subtitleEn: 'Resource baseline assessment',
      subtitleFa: 'شناسایی و ممیزی پتانسیل‌های بومی',
      descEn: 'Every rural and nomadic territory possesses unique endowments: solar radiation, wind corridors, geothermal gradients, surface and groundwater, agricultural soils, mineral deposits, and traditional artisanal skills.',
      descFa: 'هر منطقه روستایی یا عشایری دارای مجموعه‌ای از دارایی‌ها و ظرفیت‌های طبیعی و انسانی است: تابش خورشیدی، باد، شیب زمین‌گرمایی، منابع آب، خاک‌های کشاورزی، کانسارها و مهارت‌های سنتی و بومی.',
      outputsEn: ['Resource GIS mapping', 'Solar & wind irradiance audits', 'Hydrological surveys', 'Demographic skills registry'],
      outputsFa: ['نقشه‌برداری GIS منابع', 'ممیزی تابش خورشید و باد', 'ارزیابی هیدرولوژی و آبخوان', 'شناسنامه مهارت‌های نیروی کار'],
      icon: Sun,
      color: 'text-amber-500',
      accentBg: 'bg-amber-500/10 border-amber-500/30'
    },
    {
      id: 'energy-water',
      step: 2,
      titleEn: 'ENERGY + WATER SECURITY',
      titleFa: 'امنیت یکپارچه انرژی و آب',
      subtitleEn: 'The twin foundational utilities',
      subtitleFa: 'زیرساخت بنیادین زیست و تولید',
      descEn: 'Reliable energy and productive water constitute the non-negotiable threshold for any local economy. KKM couples distributed clean power generation with smart water pumping, purification, and storage.',
      descFa: 'انرژی پایدار و آب مولد دو ستون غیرقابل تفکیک هر نوع فعالیت اقتصادی هستند. KKM تولید برق پاک نامتمرکز را با پمپاژ خورشیدی، تصفیه آب، آب‌شیرین‌کن و ذخیره‌سازی هوشمند تلفیق می‌کند.',
      outputsEn: ['Microgrid solar/wind systems', 'Solar water pumping', 'Brackish water desalination', 'Strategic storage reserves'],
      outputsFa: ['ریزشبکه‌های فتوولتائیک و بادی', 'پمپاژ خورشیدی آب کشاورزی', 'نمک‌زدایی و تصفیه آب لب‌شور', 'مخازن استراتژیک ذخیره'],
      icon: Droplets,
      color: 'text-sky-500',
      accentBg: 'bg-sky-500/10 border-sky-500/30'
    },
    {
      id: 'infrastructure',
      step: 3,
      titleEn: 'INFRASTRUCTURE',
      titleFa: 'زیرساخت‌های تاب‌آور روستایی',
      subtitleEn: 'Civil & operational connectivity',
      subtitleFa: 'شریان‌های کالبدی، مواصلاتی و تأسیساتی',
      descEn: 'Resilient physical foundation: stabilized feeder roads, decentralized modular energy shelters, utility routing, flood mitigation canals, and clean community facilities built to withstand climatic shocks.',
      descFa: 'شالوده کالبدی مقاوم: راه‌های دسترسی استاندارد، سوله‌ها و سازه‌های مدولار انرژی، هدایت و مهار سیلاب، و ابنیه عمومی تاب‌آور که در برابر تنش‌های اقلیمی پایدار می‌مانند.',
      outputsEn: ['Decentralized utility sheds', 'All-weather access roads', 'Flood diversion civil works', 'Modular community utility hubs'],
      outputsFa: ['کانکس‌ها و سوله‌های تأسیساتی مدولار', 'راه‌های دسترسی چهارفصل', 'سازه‌های مهار و هدایت سیلاب', 'هاب‌های چندمنظوره تأسیساتی'],
      icon: Building2,
      color: 'text-indigo-500',
      accentBg: 'bg-indigo-500/10 border-indigo-500/30'
    },
    {
      id: 'agriculture',
      step: 4,
      titleEn: 'AGRICULTURE + LIVESTOCK',
      titleFa: 'کشاورزی و دامپروری مولد',
      subtitleEn: 'Yield maximization via precision inputs',
      subtitleFa: 'افزایش بهره‌وری با نهاده‌های فناورانه',
      descEn: 'Moving from subsistence farming to high-efficiency, climate-smart crop and livestock systems. Utilizing drip micro-irrigation, solar-powered greenhouses, and herd management tools.',
      descFa: 'گذر از کشاورزی معیشتی سنتی به سیستم‌های کشت و دامداری با بهره‌وری بالا: آبیاری قطره‌ای تحت فشار، گلخانه‌های هوشمند با تغذیه خورشیدی، و سامانه‌های نوین سلامت و اصلاح دام.',
      outputsEn: ['Precision drip systems', 'Controlled climate greenhouses', 'Feed storage preservation', 'Livestock traceability tags'],
      outputsFa: ['سامانه‌های آبیاری موضعی و تحت فشار', 'گلخانه‌های خورشیدی اقلیم‌بسته', 'سیلو و انبار نگهداری علوفه', 'ردیابی و سلامت گله و دام'],
      icon: Sprout,
      color: 'text-emerald-500',
      accentBg: 'bg-emerald-500/10 border-emerald-500/30'
    },
    {
      id: 'processing',
      step: 5,
      titleEn: 'PROCESSING & VALUE ADDITION',
      titleFa: 'فرآوری، صنایع تبدیلی و زنجیره ارزش',
      subtitleEn: 'Stopping raw material export',
      subtitleFa: 'مهار خام‌فروشی در مبدأ تولید',
      descEn: 'The critical turning point: establishing localized post-harvest processing, sorting, grading, solar cold chain storage, dehydrators, and packaging facilities right next to farm gates.',
      descFa: 'نقطه عطف اقتصادی: استقرار صنایع تبدیلی کوچک‌مقیاس، سورتینگ، درجه‌بندی، سردخانه‌های خورشیدی، خشک‌کن‌ها و بسته‌بندی استاندارد در کنار مزارع برای خلق بالاترین ارزش افزوده.',
      outputsEn: ['Solar cold storage hubs', 'Dehydration & sorting units', 'Standardized sanitary packaging', 'Export-ready local branding'],
      outputsFa: ['سردخانه‌های خورشیدی چندمداره', 'واحدهای خشک‌کن و بسته‌بندی', 'بسته‌بندی بهداشتی استاندارد', 'برندسازی و هویت تجاری محصول'],
      icon: Factory,
      color: 'text-orange-500',
      accentBg: 'bg-orange-500/10 border-orange-500/30'
    },
    {
      id: 'digital',
      step: 6,
      titleEn: 'AI + DIGITALIZATION',
      titleFa: 'هوش مصنوعی و زیرساخت دیجیتال',
      subtitleEn: 'Operational telemetry & intelligence',
      subtitleFa: 'پایش داده‌محور و بهینه‌سازی هوشمند',
      descEn: 'Digital rural systems provide practical intelligence: soil moisture telemetry, pump automation, asset condition monitoring, market pricing feeds, and digital twin simulation.',
      descFa: 'لایه هوشمند عملیاتی: حسگرهای رطوبت خاک، کنترل اتوماتیک پمپ‌ها، پایش سلامت تجهیزات، اطلاع‌رسانی برخط قیمت بازار، و شبیه‌سازی دوقلوی دیجیتال برای کاهش تلفات و مصرف بهینه.',
      outputsEn: ['Soil & water IoT sensors', 'Automated pump controllers', 'Telemetry asset monitoring', 'Local market price feeds'],
      outputsFa: ['حسگرهای IoT پایش خاک و آب', 'کنترل خودکار پمپ‌ها و شیرآلات', 'تله‌متری و نگهداری پیش‌بینانه', 'سامانه شفافیت قیمت و بازار'],
      icon: Cpu,
      color: 'text-cyan-500',
      accentBg: 'bg-cyan-500/10 border-cyan-500/30'
    },
    {
      id: 'finance',
      step: 7,
      titleEn: 'FINANCING & INVESTMENT',
      titleFa: 'ساختاردهی مالی و سرمایه‌گذاری',
      subtitleEn: 'Bankable development project finance',
      subtitleFa: 'تبدیل فرصت به طرح‌های دارای توجیه بانکی',
      descEn: 'KKM aggregates dispersed village needs into structured, bankable project packages combining blended finance, public-private partnerships (PPP), equipment leasing, and green development credits.',
      descFa: 'تبدیل نیازمندی‌های محلی به بسته‌های پروژه‌ای مدون، مستند و قابل تأمین مالی بانکی با مدل‌های مشارکت عمومی-خصوصی (PPP)، لیزینگ تجهیزات، و اعتبارات کربن و توسعه پایدار.',
      outputsEn: ['Bankable feasibility studies', 'PPP governance structure', 'Blended finance syndication', 'Equipment lease agreements'],
      outputsFa: ['طرح‌های توجیهی بانکی (FS)', 'ساختار حقوقی مشارکت (PPP)', 'مدل‌های تأمین مالی ترکیبی', 'قراردادهای واگذاری و لیزینگ'],
      icon: Coins,
      color: 'text-emerald-600',
      accentBg: 'bg-emerald-500/10 border-emerald-500/30'
    },
    {
      id: 'employment',
      step: 8,
      titleEn: 'EMPLOYMENT & ENTREPRENEURSHIP',
      titleFa: 'اشتغال پایدار و کارآفرینی',
      subtitleEn: 'Multi-tiered local livelihood generation',
      subtitleFa: 'خلق مشاغل مهارتی، فنی و خدماتی',
      descEn: 'Jobs are generated not only during construction, but permanently across operations: plant maintenance, cold storage logistics, equipment repair, digital telemetry operations, and processing cooperatives.',
      descFa: 'اشتغال‌زایی نه فقط در مرحله ساخت، بلکه به‌طور دائمی در کل چرخه: نگهداری پنل‌ها و تأسیسات، مدیریت سردخانه، تکنسین‌های تعمیرات، اپراتورهای دیجیتال، و تعاونی‌های فرآوری.',
      outputsEn: ['Certified solar technicians', 'Cold chain operators', 'Quality control supervisors', 'Youth digital coordinators'],
      outputsFa: ['تکنسین‌های آموزش‌دیده برق خورشیدی', 'اپراتورهای سردخانه و بسته‌بندی', 'مسئولان کنترل کیفی و بهداشت', 'راهبران جوان دیجیتال روستا'],
      icon: Users,
      color: 'text-violet-500',
      accentBg: 'bg-violet-500/10 border-violet-500/30'
    },
    {
      id: 'value-creation',
      step: 9,
      titleEn: 'LOCAL VALUE CREATION',
      titleFa: 'خلق و تثبیت ارزش در منطقه',
      subtitleEn: 'Economic retention within the community',
      subtitleFa: 'جلوگیری از خروج سرمایه و ثروت محلی',
      descEn: 'Instead of selling raw crops at marginal farm-gate prices and buying back packaged products at 10x cost, the economic surplus is captured and retained directly within the local village or tribe.',
      descFa: 'به‌جای حراج محصولات خام در سر مزارع با حداقل قیمت و خرید مجدد کالاهای بسته‌بندی با بهای چندبرابری، سود اقتصادی فرآوری و عرضه مستقیم مستقیماً در جیب جامعه محلی و تولیدکننده می‌ماند.',
      outputsEn: ['Higher profit margins (3x-5x)', 'Direct regional market contracts', 'Community wealth retention', 'Re-investment in local schools/health'],
      outputsFa: ['افزایش ۳ تا ۵ برابری حاشیه سود', 'قراردادهای مستقیم با بازارهای کلان', 'تثبیت سرمایه و ثروت در روستا', 'امکان سرمایه‌گذاری مجدد در خدمات عمومی'],
      icon: TrendingUp,
      color: 'text-rose-500',
      accentBg: 'bg-rose-500/10 border-rose-500/30'
    },
    {
      id: 'sustainable-economy',
      step: 10,
      titleEn: 'SUSTAINABLE RURAL ECONOMY',
      titleFa: 'اقتصاد پایدار و خوداتکای روستایی',
      subtitleEn: 'The final self-regenerating system',
      subtitleFa: 'چرخه خودتنظیم، تاب‌آور و پایدار زیست‌بوم',
      descEn: 'The ultimate objective: a thriving, economically resilient rural ecosystem that halts forced urbanization, regenerates soil and aquifer health, and fosters generational prosperity.',
      descFa: 'هدف نهایی: زیست‌بومی پایدار و تاب‌آور که مهاجرت اجباری به حاشیه شهرها را متوقف می‌کند، تعادل آب و خاک را احیا می‌سازد، و آینده‌ای مرفه و پرامید برای نسل‌های آینده رقم می‌زند.',
      outputsEn: ['Reversed rural out-migration', 'Aquifer restoration stability', 'Generational economic viability', 'Replicable national template'],
      outputsFa: ['توقف و معکوس‌سازی مهاجرت منفی', 'تثبیت و احیای سفره‌های زیرزمینی', 'پایداری اقتصادی نسلی', 'الگوی قابل تکثیر ملی و منطقه‌ای'],
      icon: CheckCircle2,
      color: 'text-emerald-500',
      accentBg: 'bg-emerald-500/10 border-emerald-500/30'
    }
  ];

  const activeNode = modelNodes[activeNodeIndex];

  return (
    <section id="integrated-model" className="py-20 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        {/* Core Strategic Principle Card (Section 10.4) */}
        <div className="mb-16 bg-gradient-to-r from-emerald-950/40 via-slate-800/60 to-slate-900/60 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-emerald-400 mb-1 block">
                {isFa ? 'اصل محوری پلتفرم KKM' : 'CORE PLATFORM PRINCIPLE'}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                {isFa 
                  ? 'نگاه یکپارچه سیستمی به‌جای پروژه‌های پراکنده' 
                  : 'An Integrated Economic & Infrastructure System, Not an Isolated Project'}
              </h2>
              <blockquote className="text-base sm:text-lg text-slate-200 font-medium italic border-r-4 rtl:border-r-4 ltr:border-l-4 border-emerald-500 pr-4 ltr:pl-4 ltr:pr-0 py-1 leading-relaxed">
                {isFa
                  ? '«KKM توسعه روستایی را صرفاً به‌عنوان اجرای یک پروژه منفرد زیرساختی نگاه نمی‌کند؛ بلکه آن را به‌عنوان یک نظام یکپارچه زیرساختی، تولیدی، اقتصادی و فناورانه در سطح محلی طراحی می‌کند.»'
                  : '"KKM does not approach rural development as a single infrastructure project. We approach it as an integrated local economic and infrastructure system."'}
              </blockquote>
            </div>
          </div>
        </div>

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-emerald-400 mb-2 block">
            {isFa ? 'معماری و چرخه توسعه (۱۰ گام یکپارچه)' : 'INTEGRATED RURAL DEVELOPMENT MODEL (10 STAGES)'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white mb-4">
            {isFa 
              ? 'مدل یکپارچه توسعه روستایی و عشایری KKM' 
              : 'The Integrated Rural Development Architecture'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {isFa 
              ? 'چگونه منابع و ظرفیت‌های خام بومی از طریق انرژی، آب، فرآوری، هوش مصنوعی و سرمایه‌گذاری به ثروت و اشتغال پایدار تبدیل می‌شوند.' 
              : 'How local endowments are converted into retained wealth, productivity, and generational resilience through an unbroken value chain.'}
          </p>
        </div>

        {/* Horizontal / Grid Step Tracker */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-10">
          {modelNodes.map((node, index) => {
            const Icon = node.icon;
            const isActive = index === activeNodeIndex;
            return (
              <button
                key={node.id}
                onClick={() => setActiveNodeIndex(index)}
                className={`p-3 rounded-xl border text-start transition-all cursor-pointer relative overflow-hidden group ${
                  isActive 
                    ? 'bg-slate-800 border-emerald-500 shadow-md ring-1 ring-emerald-500/50' 
                    : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/80 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                  }`}>
                    {String(node.step).padStart(2, '0')}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? node.color : 'text-slate-400'}`} />
                </div>
                <div className="text-xs font-bold text-white truncate mb-0.5">
                  {isFa ? node.titleFa : node.titleEn}
                </div>
                <div className="text-[11px] text-slate-400 truncate hidden sm:block">
                  {isFa ? node.subtitleFa : node.subtitleEn}
                </div>
                {isActive && (
                  <motion.div 
                    layoutId="activeBar" 
                    className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500" 
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Detailed Active Node Inspector Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl relative"
          >
            <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
              <div className="lg:max-w-2xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${activeNode.accentBg}`}>
                    <activeNode.icon className={`w-6 h-6 ${activeNode.color}`} />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      STAGE {String(activeNode.step).padStart(2, '0')} OF 10
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {isFa ? activeNode.titleFa : activeNode.titleEn}
                    </h3>
                  </div>
                </div>

                <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
                  {isFa ? activeNode.descFa : activeNode.descEn}
                </p>

                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    {isFa ? 'خروجی‌ها و اقدامات مشخص KKM در این گام:' : 'Key Deliverables & Engineered Outputs:'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {(isFa ? activeNode.outputsFa : activeNode.outputsEn).map((out, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-slate-900/60 border border-slate-700/50 rounded-lg p-2.5 text-xs text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <span>{out}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step Navigation Sidebar Controls */}
              <div className="w-full lg:w-72 bg-slate-900/70 border border-slate-700/60 rounded-xl p-5 shrink-0 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-400 block mb-2">
                    {isFa ? 'اتصال به گام بعد:' : 'Forward Value Link:'}
                  </span>
                  <div className="text-sm font-bold text-emerald-400 mb-4 flex items-center gap-2">
                    <span>
                      {activeNodeIndex < modelNodes.length - 1
                        ? (isFa ? modelNodes[activeNodeIndex + 1].titleFa : modelNodes[activeNodeIndex + 1].titleEn)
                        : (isFa ? 'تکمیل چرخه توسعه پایدار' : 'Self-Regenerating Cycle Complete')}
                    </span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {isFa 
                      ? 'هر حلقه در این معماری، خروجی مستقیم خود را به‌عنوان نهاده مطمئن به مرحله بعد تحویل می‌دهد تا از اتلاف سرمایه جلوگیری شود.' 
                      : 'Each stage hands over hardened, de-risked assets as direct inputs into the next layer, eliminating stranded capital.'}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                  <button
                    disabled={activeNodeIndex === 0}
                    onClick={() => setActiveNodeIndex(prev => Math.max(0, prev - 1))}
                    className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold rounded-lg transition-colors cursor-pointer text-center"
                  >
                    {isFa ? 'گام قبل' : 'Previous'}
                  </button>
                  <button
                    disabled={activeNodeIndex === modelNodes.length - 1}
                    onClick={() => setActiveNodeIndex(prev => Math.min(modelNodes.length - 1, prev + 1))}
                    className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold text-white rounded-lg transition-colors cursor-pointer text-center"
                  >
                    {isFa ? 'گام بعد' : 'Next Stage'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
