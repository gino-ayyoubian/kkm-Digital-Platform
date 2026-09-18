import * as React from 'react';
import { useLanguage } from '../../LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, 
  Droplets, 
  Building2, 
  Sprout, 
  Factory, 
  Cpu, 
  Coins, 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  Layers, 
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Sparkles
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
  inputsEn: string[];
  inputsFa: string[];
  icon: React.ElementType;
  color: string;
  accentBg: string;
  borderColor: string;
  pillBg: string;
}

export const RuralModelDiagram: React.FC = () => {
  const { language, direction } = useLanguage();
  const isFa = language === 'FA';
  const [activeNodeIndex, setActiveNodeIndex] = React.useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState<boolean>(false);

  const modelNodes: ModelNode[] = [
    {
      id: 'resources',
      step: 1,
      titleEn: 'LOCAL RESOURCES',
      titleFa: 'ظرفیت‌ها و منابع محلی',
      subtitleEn: 'Auditing Regional Endowments',
      subtitleFa: 'شناسایی و ممیزی پتانسیل‌های بومی',
      descEn: 'Every rural territory possesses unique natural, physical and human endowments: solar irradiance, wind corridors, geothermal gradients, surface and groundwater aquifers, agricultural lands, mineral deposits, and traditional craftsmanship.',
      descFa: 'هر منطقه روستایی یا عشایری دارای مجموعه‌ای از دارایی‌ها و ظرفیت‌های طبیعی و انسانی است: تابش خورشیدی، باد، شیب زمین‌گرمایی، منابع آب، خاک‌های کشاورزی، کانسارها و مهارت‌های سنتی و بومی.',
      inputsEn: ['Baseline territory geography', 'Climate history records', 'Demographic census', 'Traditional farming logs'],
      inputsFa: ['جغرافیای پایه منطقه', 'سوابق اقلیمی و هواشناسی', 'سرشماری جمعیتی و مهارتی', 'پیشینه تولید بومی'],
      outputsEn: ['High-resolution GIS resource map', 'Irradiance & wind yield audits', 'Hydrogeological aquifer model', 'Local labor skills inventory'],
      outputsFa: ['نقشه‌برداری GIS منابع و اراضی', 'ممیزی پتانسیل تابش و باد', 'مدل هیدروژئولوژی آبخوان‌ها', 'شناسنامه مهارت‌های نیروی کار محلی'],
      icon: Sun,
      color: 'text-amber-400',
      accentBg: 'bg-amber-500/10',
      borderColor: 'border-amber-500/40',
      pillBg: 'bg-amber-500/20 text-amber-300'
    },
    {
      id: 'energy-water',
      step: 2,
      titleEn: 'ENERGY + WATER SECURITY',
      titleFa: 'امنیت یکپارچه انرژی و آب',
      subtitleEn: 'The Twin Catalytic Utilities',
      subtitleFa: 'زیرساخت بنیادین زیست و تولید',
      descEn: 'Reliable, affordable energy and productive water constitute the foundational preconditions for all rural activity. KKM couples distributed clean power generation with smart solar water pumping, brackish desalination, and pressurized delivery.',
      descFa: 'انرژی پایدار و آب مولد، پیش‌نیاز غیرقابل تفکیک هر نوع فعالیت اقتصادی هستند. KKM تولید برق پاک نامتمرکز را با پمپاژ خورشیدی، تصفیه آب، آب‌شیرین‌کن و شبکه‌های توزیع پایدار تلفیق می‌کند.',
      inputsEn: ['GIS resource maps (from Stage 01)', 'Solar/wind irradiance data', 'Well & water test assays'],
      inputsFa: ['داده‌های GIS و منابع (گام ۰۱)', 'اطلاعات تابش و کانون‌های باد', 'آنالیز کیفی و آزمایشگاهی چاه‌ها'],
      outputsEn: ['Decentralized solar microgrids', 'PV-powered irrigation pumps', 'Solar thermal brackish desalination', 'Pressurized village water reserves'],
      outputsFa: ['ریزشبکه‌های برق پاک خورشیدی', 'پمپاژ خورشیدی آب کشاورزی', 'نمک‌زدایی و تصفیه آب لب‌شور', 'مخازن ذخیره استراتژیک آب'],
      icon: Droplets,
      color: 'text-sky-400',
      accentBg: 'bg-sky-500/10',
      borderColor: 'border-sky-500/40',
      pillBg: 'bg-sky-500/20 text-sky-300'
    },
    {
      id: 'infrastructure',
      step: 3,
      titleEn: 'INFRASTRUCTURE',
      titleFa: 'زیرساخت‌های تاب‌آور روستایی',
      subtitleEn: 'Physical & Utility Connectivity',
      subtitleFa: 'شریان‌های کالبدی، مواصلاتی و تأسیساتی',
      descEn: 'Resilient physical foundations prevent disruption: stabilized feeder access roads, decentralized modular utility sheds, flood mitigation canals, clean water transmission lines, and high-durability cold storage shelters.',
      descFa: 'شالوده کالبدی مقاوم: راه‌های دسترسی استاندارد، سوله‌ها و سازه‌های مدولار انرژی، هدایت و مهار سیلاب، و ابنیه عمومی تاب‌آور که در برابر تنش‌های اقلیمی پایدار می‌مانند.',
      inputsEn: ['Stable microgrid power (Stage 02)', 'Secured water sources (Stage 02)', 'Terrain civil surveys'],
      inputsFa: ['برق پایدار ریزشبکه (گام ۰۲)', 'منابع آب تأمین‌شده (گام ۰۲)', 'بررسی‌های ژئوتکنیک و مسیر'],
      outputsEn: ['All-weather rural feeder roads', 'Modular energy utility hubs', 'Protected utility corridors', 'Flood defense civil drainage'],
      outputsFa: ['راه‌های مواصلاتی چهارفصل', 'کانکس‌ها و سوله‌های تأسیساتی مدولار', 'کریدورهای تأسیساتی حفاظت‌شده', 'کانال‌های مهار سیلاب'],
      icon: Building2,
      color: 'text-indigo-400',
      accentBg: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/40',
      pillBg: 'bg-indigo-500/20 text-indigo-300'
    },
    {
      id: 'agriculture',
      step: 4,
      titleEn: 'AGRICULTURE + LIVESTOCK',
      titleFa: 'کشاورزی و دامپروری مولد',
      subtitleEn: 'Precision Climate-Smart Production',
      subtitleFa: 'افزایش بهره‌وری با نهاده‌های فناورانه',
      descEn: 'Transitioning from subsistence farming to high-efficiency, climate-resilient crop and livestock systems. Utilizing drip micro-irrigation, solar-tempered greenhouses, agrivoltaic shaded cultivation, and herd health tracking.',
      descFa: 'گذر از کشاورزی معیشتی سنتی به سیستم‌های کشت و دامداری با بهره‌وری بالا: آبیاری قطره‌ای تحت فشار، گلخانه‌های هوشمند با تغذیه خورشیدی، و سامانه‌های نوین سلامت و اصلاح دام.',
      inputsEn: ['Reliable irrigation water (Stage 02)', 'Utility-ready land (Stage 03)', 'Local farming cooperatives'],
      inputsFa: ['آب مطمئن آبیاری (گام ۰۲)', 'اراضی آماده و مجهز (گام ۰۳)', 'تعاونی‌ها و کشاورزان محلی'],
      outputsEn: ['Drip-fertigation micro systems', 'Controlled-environment greenhouses', 'Agrivoltaic dual-yield crops', 'Livestock traceability & vaccines'],
      outputsFa: ['سامانه‌های آبیاری موضعی و تحت فشار', 'گلخانه‌های اقلیم‌بسته خورشیدی', 'کشت تلفیقی زیر پنل‌های خورشیدی', 'ردیابی و مراقبت بهداشتی گله و دام'],
      icon: Sprout,
      color: 'text-emerald-400',
      accentBg: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/40',
      pillBg: 'bg-emerald-500/20 text-emerald-300'
    },
    {
      id: 'processing',
      step: 5,
      titleEn: 'PROCESSING & VALUE ADDITION',
      titleFa: 'فرآوری، صنایع تبدیلی و زنجیره ارزش',
      subtitleEn: 'Stopping Farm-Gate Raw Export',
      subtitleFa: 'مهار خام‌فروشی در مبدأ تولید',
      descEn: 'The critical economic turning point: establishing localized post-harvest processing, sorting, grading, solar multi-chamber cold storage, dehydration, and packaging facilities right next to farming clusters.',
      descFa: 'نقطه عطف اقتصادی: استقرار صنایع تبدیلی کوچک‌مقیاس، سورتینگ، درجه‌بندی، سردخانه‌های خورشیدی، خشک‌کن‌ها و بسته‌بندی استاندارد در کنار مزارع برای خلق بالاترین ارزش افزوده.',
      inputsEn: ['Harvested crops & milk (Stage 04)', 'Industrial cold-storage power (Stage 02)', 'Clean processing water (Stage 02)'],
      inputsFa: ['محصولات تازه و شیر دامی (گام ۰۴)', 'برق صنعتی سردخانه (گام ۰۲)', 'آب بهداشتی شست‌وشو (گام ۰۲)'],
      outputsEn: ['Solar multi-temperature cold rooms', 'Modular fruit & herb dehydrators', 'Export-spec hygienic packaging', 'Branded premium regional lines'],
      outputsFa: ['سردخانه‌های خورشیدی چندمداره', 'واحدهای خشک‌کن و اسانس‌گیری', 'بسته‌بندی بهداشتی استاندارد صادراتی', 'برندسازی و هویت تجاری محصول'],
      icon: Factory,
      color: 'text-orange-400',
      accentBg: 'bg-orange-500/10',
      borderColor: 'border-orange-500/40',
      pillBg: 'bg-orange-500/20 text-orange-300'
    },
    {
      id: 'digital',
      step: 6,
      titleEn: 'AI + DIGITALIZATION',
      titleFa: 'هوش مصنوعی و زیرساخت دیجیتال',
      subtitleEn: 'Autonomous Telemetry & Optimization',
      subtitleFa: 'پایش داده‌محور و بهینه‌سازی هوشمند',
      descEn: 'Digital rural systems provide continuous operational intelligence: soil moisture LoRaWAN sensors, automated pump control, cold chain thermal monitoring, digital twin predictive maintenance, and direct market pricing feeds.',
      descFa: 'لایه هوشمند عملیاتی: حسگرهای رطوبت خاک، کنترل اتوماتیک پمپ‌ها، پایش سلامت تجهیزات، اطلاع‌رسانی برخط قیمت بازار، و شبیه‌سازی دوقلوی دیجیتال برای کاهش تلفات و مصرف بهینه.',
      inputsEn: ['Operational facility metrics (Stage 02-05)', 'Satellite weather radar feeds', 'Soil probe sensor network'],
      inputsFa: ['داده‌های عملیاتی تأسیسات (گام‌های ۰۲ تا ۰۵)', 'رادارهای هواشناسی ماهواره‌ای', 'شبکه حسگرهای میدانی خاک و آب'],
      outputsEn: ['LoRaWAN telemetry sensor grid', 'Autonomous pump scheduling algorithms', 'Cold chain compliance logs', 'Direct market dispatch application'],
      outputsFa: ['شبکه حسگرهای IoT بی‌سیم', 'الگوریتم‌های آبیاری بهینه خودکار', 'پایش برخط دما و کیفیت سردخانه', 'سامانه شفافیت قیمت و سفارش‌گیری'],
      icon: Cpu,
      color: 'text-cyan-400',
      accentBg: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/40',
      pillBg: 'bg-cyan-500/20 text-cyan-300'
    },
    {
      id: 'finance',
      step: 7,
      titleEn: 'FINANCING & INVESTMENT',
      titleFa: 'ساختاردهی مالی و سرمایه‌گذاری',
      subtitleEn: 'Bankable PPP Project Finance',
      subtitleFa: 'تبدیل فرصت به طرح‌های دارای توجیه بانکی',
      descEn: 'KKM aggregates dispersed community needs into structured, bankable project finance models: blended capital, Public-Private Partnerships (PPP), build-own-operate-transfer (BOOT), equipment leasing, and carbon credit offsets.',
      descFa: 'تبدیل نیازمندی‌های محلی به بسته‌های پروژه‌ای مدون، مستند و قابل تأمین مالی بانکی با مدل‌های مشارکت عمومی-خصوصی (PPP)، لیزینگ تجهیزات، و اعتبارات کربن و توسعه پایدار.',
      inputsEn: ['Audited yield & cashflow projections (Stage 04-06)', 'Offtaker contracts', 'Risk mitigation models'],
      inputsFa: ['پیش‌بینی‌های جریان نقدی و درآمد (گام‌های ۰۴ تا ۰۶)', 'قراردادهای پیش‌خرید محصول', 'مدل‌های مدیریت و کاهش ریسک'],
      outputsEn: ['Bankable Feasibility Studies (FS)', 'PPP contract & legal governance', 'Blended debt/equity syndication', 'Carbon credit certification pipeline'],
      outputsFa: ['طرح‌های توجیهی بانکی (FS)', 'ساختار حقوقی مشارکت (PPP)', 'مدل‌های تأمین مالی ترکیبی', 'شناسنامه تولید اعتبار کربن'],
      icon: Coins,
      color: 'text-emerald-400',
      accentBg: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/40',
      pillBg: 'bg-emerald-500/20 text-emerald-300'
    },
    {
      id: 'employment',
      step: 8,
      titleEn: 'EMPLOYMENT & ENTREPRENEURSHIP',
      titleFa: 'اشتغال پایدار و کارآفرینی',
      subtitleEn: 'Permanent High-Skill Livelihoods',
      subtitleFa: 'خلق مشاغل مهارتی، فنی و خدماتی',
      descEn: 'Job creation extends far beyond the construction phase: local youths and cooperatives are trained and hired permanently to operate solar plants, manage cold chain facilities, service machinery, and direct processing logistics.',
      descFa: 'اشتغال‌زایی نه فقط در مرحله ساخت، بلکه به‌طور دائمی در کل چرخه: نگهداری پنل‌ها و تأسیسات، مدیریت سردخانه، تکنسین‌های تعمیرات، اپراتورهای دیجیتال، و تعاونی‌های فرآوری.',
      inputsEn: ['Operating processing plants (Stage 05)', 'Digital telemetry operations (Stage 06)', 'Training curricula (from KKM)'],
      inputsFa: ['تأسیسات فرآوری فعال (گام ۰۵)', 'سامانه‌های دیجیتال پایش (گام ۰۶)', 'برنامه‌های آموزشی و مهارتی KKM'],
      outputsEn: ['Certified solar/water plant technicians', 'Cold chain warehouse managers', 'Agro-processing skilled operators', 'Youth digital field coordinators'],
      outputsFa: ['تکنسین‌های دارای گواهینامه خورشیدی و آب', 'مدیران بهره‌برداری سردخانه و لجستیک', 'اپراتورهای فرآوری و بسته‌بندی', 'راهبران جوان دیجیتال و داده روستا'],
      icon: Users,
      color: 'text-violet-400',
      accentBg: 'bg-violet-500/10',
      borderColor: 'border-violet-500/40',
      pillBg: 'bg-violet-500/20 text-violet-300'
    },
    {
      id: 'value-creation',
      step: 9,
      titleEn: 'LOCAL VALUE CREATION',
      titleFa: 'خلق و تثبیت ارزش در منطقه',
      subtitleEn: 'Retaining Economic Surplus',
      subtitleFa: 'جلوگیری از خروج سرمایه و ثروت محلی',
      descEn: 'Rather than selling raw commodities at marginal farm-gate prices and repurchasing processed packaged goods at high markups, the economic multiplier remains inside the community—funding local schools, healthcare, and infrastructure reinvestment.',
      descFa: 'به‌جای حراج محصولات خام در سر مزارع با حداقل قیمت و خرید مجدد کالاهای بسته‌بندی با بهای چندبرابری، سود اقتصادی فرآوری و عرضه مستقیم مستقیماً در جیب جامعه محلی و تولیدکننده می‌ماند.',
      inputsEn: ['Branded packaged products (Stage 05)', 'Skilled workforce operations (Stage 08)', 'Direct market access contracts'],
      inputsFa: ['محصولات نهایی دارای برند (گام ۰۵)', 'نیروی کار بومی ماهر (گام ۰۸)', 'قراردادهای اتصال مستقیم به بازار'],
      outputsEn: ['3x to 5x increase in producer margin', 'Retained local savings accounts', 'Community infrastructure reinvestment fund', 'Regional economic sovereignty'],
      outputsFa: ['افزایش ۳ تا ۵ برابری عایدی تولیدکننده', 'تثبیت سپرده‌ها و پس‌اندازهای بومی', 'صندوق توسعه و نگهداری زیرساخت روستا', 'استقلال و خوداتکایی اقتصادی منطقه'],
      icon: TrendingUp,
      color: 'text-rose-400',
      accentBg: 'bg-rose-500/10',
      borderColor: 'border-rose-500/40',
      pillBg: 'bg-rose-500/20 text-rose-300'
    },
    {
      id: 'sustainable-economy',
      step: 10,
      titleEn: 'SUSTAINABLE RURAL ECONOMY',
      titleFa: 'اقتصاد پایدار و خوداتکای روستایی',
      subtitleEn: 'The Self-Regenerating Climax',
      subtitleFa: 'چرخه خودتنظیم، تاب‌آور و پایدار زیست‌بوم',
      descEn: 'The overarching objective: a thriving, economically sovereign, and climatically resilient regional ecosystem. Forced out-migration is permanently reversed, groundwater levels stabilize, and youth build multi-generational prosperity.',
      descFa: 'هدف نهایی: زیست‌بومی پایدار و تاب‌آور که مهاجرت اجباری به حاشیه شهرها را متوقف می‌کند، تعادل آب و خاک را احیا می‌سازد، و آینده‌ای مرفه و پرامید برای نسل‌های آینده رقم می‌زند.',
      inputsEn: ['All 9 preceding integrated layers working in closed feedback balance'],
      inputsFa: ['تلفیق و هماهنگی کامل ۹ لایه زیرساختی، فناورانه، مالی و اجتماعی قبلی'],
      outputsEn: ['Permanent reversal of rural out-migration', 'Aquifer recovery & ecological equilibrium', 'Multi-generational community wealth', 'Replicable national template for regional transformation'],
      outputsFa: ['معکوس‌سازی قطعی مهاجرت منفی', 'تثبیت سفره‌های آب و تعادل زیست‌محیطی', 'ثروت‌آفرینی نسلی برای خانواده‌ها', 'الگوی ملی قابل تکثیر در کلیه حوزه‌های روستایی و عشایری'],
      icon: CheckCircle2,
      color: 'text-emerald-400',
      accentBg: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/40',
      pillBg: 'bg-emerald-500/20 text-emerald-300'
    }
  ];

  // Auto-play timer effect
  React.useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveNodeIndex(prev => (prev + 1) % modelNodes.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, modelNodes.length]);

  const activeNode = modelNodes[activeNodeIndex];
  const progressPercent = ((activeNodeIndex) / (modelNodes.length - 1)) * 100;

  return (
    <section id="integrated-model" className="py-20 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        {/* Core Strategic Principle Card (Section 10.4) */}
        <div className="mb-14 bg-gradient-to-r from-emerald-950/40 via-slate-800/60 to-slate-900/60 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest font-mono font-bold text-emerald-400 mb-1 block">
                {isFa ? 'اصل محوری پلتفرم KKM' : 'CORE PLATFORM PRINCIPLE'}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                {isFa 
                  ? 'یک نظام یکپارچه اقتصادی و زیرساختی، نه یک پروژه منفرد' 
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

        {/* Section Heading with Model Summary */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-mono font-bold text-emerald-400 mb-2 block">
            {isFa ? 'معماری و چرخه توسعه (۱۰ گام یکپارچه)' : 'INTEGRATED RURAL DEVELOPMENT MODEL (10 STAGES)'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white mb-4">
            {isFa 
              ? 'مدل یکپارچه توسعه روستایی و عشایری KKM' 
              : 'The Integrated Rural Development Architecture'}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {isFa 
              ? 'جریان پیوسته و هدفمند تبدیل «ظرفیت‌های خام محلی» به «اقتصاد پایدار و شکوفای روستایی» از طریق ۱۰ مرحله هم‌افزا و هماهنگ.' 
              : 'The unbroken, catalytic progression converting "Local Resources" into a "Sustainable Rural Economy" through ten synergistic phases.'}
          </p>

          {/* Autoplay & Reset Controls */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 hover:border-emerald-500/50 text-xs text-slate-200 hover:text-white transition-colors cursor-pointer"
            >
              {isAutoPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{isAutoPlaying ? (isFa ? 'توقف نمایش خودکار' : 'Pause Guided Tour') : (isFa ? 'پیمایش خودکار مراحل' : 'Auto-Play Stages')}</span>
            </button>

            <button
              onClick={() => { setActiveNodeIndex(0); setIsAutoPlaying(false); }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 text-xs text-slate-300 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3 text-slate-400" />
              <span>{isFa ? 'شروع از گام اول' : 'Reset to Stage 1'}</span>
            </button>
          </div>
        </div>

        {/* --- Visual Flow Progress Track (Local Resources -> Sustainable Rural Economy) --- */}
        <div className="mb-8 bg-slate-950/70 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-inner">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400 mb-3 px-1">
            <div className="flex items-center gap-2 text-amber-400">
              <Sun className="w-4 h-4" />
              <span>{isFa ? 'گام ۰۱: منابع و ظرفیت‌های بومی' : 'STAGE 01: LOCAL RESOURCES'}</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <span>{isFa ? 'گام ۱۰: اقتصاد پایدار و خوداتکا' : 'STAGE 10: SUSTAINABLE ECONOMY'}</span>
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          {/* Animated Connecting Progress Bar */}
          <div className="relative h-2.5 bg-slate-800 rounded-full overflow-hidden mb-6">
            <motion.div 
              className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-amber-500 via-sky-500 to-emerald-500"
              initial={false}
              animate={{ width: `${progressPercent}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>

          {/* 10 Step Interactive Micro-Nodes Track */}
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-2">
            {modelNodes.map((node, index) => {
              const Icon = node.icon;
              const isActive = index === activeNodeIndex;
              const isPast = index < activeNodeIndex;

              return (
                <button
                  key={node.id}
                  onClick={() => {
                    setActiveNodeIndex(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer relative group ${
                    isActive 
                      ? 'bg-slate-800 border-2 border-emerald-400 shadow-lg shadow-emerald-500/20 scale-105 z-10' 
                      : isPast
                        ? 'bg-slate-900/90 border border-emerald-500/40 text-slate-300 hover:bg-slate-800'
                        : 'bg-slate-900/60 border border-slate-800 text-slate-500 hover:bg-slate-800/80 hover:text-slate-300'
                  }`}
                  title={`${node.step}. ${isFa ? node.titleFa : node.titleEn}`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center mb-1.5 transition-colors ${
                    isActive ? node.accentBg : isPast ? 'bg-emerald-500/10' : 'bg-slate-800'
                  }`}>
                    <Icon className={`w-4 h-4 ${isActive ? node.color : isPast ? 'text-emerald-400' : 'text-slate-400'}`} />
                  </div>
                  <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {String(node.step).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] truncate max-w-full text-center hidden md:block mt-0.5 text-slate-300 group-hover:text-white">
                    {isFa ? node.titleFa.split(' ')[0] : node.titleEn.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* --- Active Stage Detailed Inspector --- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`bg-slate-800/95 border ${activeNode.borderColor} rounded-2xl p-6 sm:p-8 shadow-2xl relative`}
          >
            {/* Stage Header Banner */}
            <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
              <div className="flex-1 space-y-5">
                <div className="flex items-center gap-3">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${activeNode.accentBg} border ${activeNode.borderColor}`}>
                    <activeNode.icon className={`w-7 h-7 ${activeNode.color}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${activeNode.pillBg}`}>
                        STAGE {String(activeNode.step).padStart(2, '0')} OF 10
                      </span>
                      <span className="text-xs text-slate-400">
                        {isFa ? activeNode.subtitleFa : activeNode.subtitleEn}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
                      {isFa ? activeNode.titleFa : activeNode.titleEn}
                    </h3>
                  </div>
                </div>

                <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
                  {isFa ? activeNode.descFa : activeNode.descEn}
                </p>

                {/* Synergistic Flow Box: Inputs from prior stage -> Outputs feeding next stage */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {/* Inputs */}
                  <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      {isFa ? 'نهاده‌ها و ورودی‌ها از مراحل قبل:' : 'Inputs & Baselines Received:'}
                    </span>
                    <ul className="space-y-1.5">
                      {(isFa ? activeNode.inputsFa : activeNode.inputsEn).map((inp, idx) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className="text-slate-500 font-mono">•</span>
                          <span>{inp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Outputs */}
                  <div className="bg-slate-900/70 border border-emerald-500/20 rounded-xl p-4">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 block mb-2 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      {isFa ? 'خروجی‌ها و دستاوردهای مهندسی‌شده KKM:' : 'Key Engineered Deliverables:'}
                    </span>
                    <ul className="space-y-1.5">
                      {(isFa ? activeNode.outputsFa : activeNode.outputsEn).map((out, idx) => (
                        <li key={idx} className="text-xs text-slate-200 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{out}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step Navigation Sidebar Card */}
              <div className="w-full lg:w-80 bg-slate-900/90 border border-slate-700/80 rounded-xl p-5 shrink-0 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    {isFa ? 'اتصال مستقیم به گام بعد:' : 'FORWARD VALUE HANDOFF:'}
                  </span>
                  <div className="text-sm font-bold text-emerald-400 mb-3 flex items-center gap-2">
                    <span>
                      {activeNodeIndex < modelNodes.length - 1
                        ? (isFa ? modelNodes[activeNodeIndex + 1].titleFa : modelNodes[activeNodeIndex + 1].titleEn)
                        : (isFa ? 'تکمیل چرخه خودتنظیم و پایدار' : 'Self-Regenerating Climax')}
                    </span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180 text-emerald-400" />
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {isFa 
                      ? 'هیچ مرحله‌ای منفصل نیست؛ دارایی‌های پایدارسازی‌شده در هر گام، بلافاصله به‌عنوان سرمایه و نهاده مطمئن وارد لایه بعدی می‌شوند.' 
                      : 'Zero isolated steps: validated assets from each stage directly de-risk and power the subsequent layer, ensuring capital efficiency.'}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-800">
                  <div className="flex items-center gap-2">
                    <button
                      disabled={activeNodeIndex === 0}
                      onClick={() => {
                        setActiveNodeIndex(prev => Math.max(0, prev - 1));
                        setIsAutoPlaying(false);
                      }}
                      className="flex-1 py-2.5 px-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold text-white rounded-lg transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                      <span>{isFa ? 'گام قبل' : 'Previous'}</span>
                    </button>
                    <button
                      disabled={activeNodeIndex === modelNodes.length - 1}
                      onClick={() => {
                        setActiveNodeIndex(prev => Math.min(modelNodes.length - 1, prev + 1));
                        setIsAutoPlaying(false);
                      }}
                      className="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold text-white rounded-lg transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
                    >
                      <span>{isFa ? 'گام بعد' : 'Next Stage'}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
