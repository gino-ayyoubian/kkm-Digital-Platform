import * as React from 'react';
import { Page } from '../types';
import { useLanguage } from '../LanguageContext';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { 
  ArrowRight, ChevronRight, MapPin, Zap, Droplets, Building2, Cpu, Globe, 
  ArrowDown, ShieldCheck, Factory, Lightbulb, Leaf, Activity, FileText,
  Search, Users, Link as LinkIcon, CheckCircle2, Eye, Compass, Layers,
  ExternalLink, Sparkles, AlertCircle
} from 'lucide-react';
import ProjectHighlightsCarousel from '../components/ProjectHighlightsCarousel';
import { CinematicIPStoryVisualizer } from '../components/CinematicIPStoryVisualizer';
import { AcademicPublicationsSection } from '../components/AcademicPublicationsSection';

interface HomePageProps {
  setPage: (page: Page) => void;
  onSelectArticle?: (article: any) => void;
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const HomePage: React.FC<HomePageProps> = ({ setPage }) => {
  const { direction, isFa } = useLanguage();
  const [activeChainStep, setActiveChainStep] = React.useState<number>(0);

  // 8.5 Value Chain Stages with Bilingual Data
  const valueChainSteps = [
    {
      id: 'EVIDENCE',
      titleEn: 'Evidence',
      titleFa: 'شواهد و داده‌های علمی',
      descEn: 'Empirical research, thermal gradient surveys, hydrological testing, and baseline validation.',
      descFa: 'پژوهش‌های تجربی، داده‌سنجی گرادیان حرارتی، ارزیابی هیدرولوژیکی و اعتبارسنجی مبنایی داده‌ها.'
    },
    {
      id: 'TECHNOLOGY',
      titleEn: 'Technology',
      titleFa: 'توسعه فناوری',
      descEn: 'Design of proprietary thermodynamic cycles, nanofluid heat carriers, and deep-casing sensors.',
      descFa: 'طراحی سیکل‌های ترمودینامیکی اختصاصی، نانوسیالات تبادل حرارتی و حسگرهای عمقی درون چاهی.'
    },
    {
      id: 'IP',
      titleEn: 'Intellectual Property',
      titleFa: 'ثبت دارایی فکری (IP)',
      descEn: 'Global PCT filings, national patent claims, trade secret encapsulation, and freedom-to-operate audits.',
      descFa: 'ثبت بین‌المللی PCT، ادعانامه‌های ملی اختراع، حفاظت از اسرار تجاری و ممیزی آزادی عمل تجاری.'
    },
    {
      id: 'PROTOTYPE',
      titleEn: 'Prototype',
      titleFa: 'نمونه‌سازی اولیه',
      descEn: 'Bench-scale loop demonstrators, closed-loop casing modules, and simulation-to-reality testing.',
      descFa: 'تست‌های آزمایشگاهی حلقه مداربسته، ماژول‌های مقیاس‌آزمایی و تطبیق شبیه‌سازی با واقعیت فیزیکی.'
    },
    {
      id: 'PILOT',
      titleEn: 'Pilot Demonstration',
      titleFa: 'پایلوت میدانی',
      descEn: 'Field deployment in operational environments (TRL 6-7), including Sarakhs and Qeshm testbeds.',
      descFa: 'پیاده‌سازی در محیط‌های عملیاتی واقعی (سطح آمادگی TRL 6-7) در سایت‌های پایلوت سرخس و قشم.'
    },
    {
      id: 'PRODUCT',
      titleEn: 'Modular Product',
      titleFa: 'محصول مدولار',
      descEn: 'Standardized skid-mounted energy convertors, mobile desalination units, and smart dispatch units.',
      descFa: 'پکیج‌های استاندارد تبدیل انرژی اسکیدموتد، سامانه‌های آب‌شیرین‌کن مدولار و پکیج‌های دیسپاچینگ هوشمند.'
    },
    {
      id: 'PROJECT',
      titleEn: 'Integrated Project',
      titleFa: 'پروژه جامع مهندسی',
      descEn: 'Full EPC execution combining energy, water, and civil infrastructure into bankable facilities.',
      descFa: 'اجرای مهندسی EPC با تلفیق منابع انرژی، آب و زیرساخت عمرانی در پروژه‌های بانکی‌پذیر.'
    },
    {
      id: 'PLATFORM',
      titleEn: 'Strategic Platform',
      titleFa: 'پلتفرم راهبردی',
      descEn: 'Multi-sector governance hubs such as the Rural & Nomadic Development Platform and GMEL Hub.',
      descFa: 'هاب‌های حکمرانی چندرشته‌ای نظیر پلتفرم توسعه روستایی و عشایری و اکوسیستم جامع GMEL.'
    },
    {
      id: 'SCALE',
      titleEn: 'National Scale',
      titleFa: 'توسعه و مقیاس‌پذیری',
      descEn: 'Replication across regional corridors, nomadic settlements, and industrial production zones.',
      descFa: 'تکثیر الگوی یکپارچه در کریدورهای استانی، کانون‌های عشایری و شهرک‌های صنعتی و کشاورزی.'
    },
    {
      id: 'INTERNATIONALIZATION',
      titleEn: 'Internationalization',
      titleFa: 'تعاملات بین‌المللی',
      descEn: 'Cross-border technology licensing, international consortium partnerships, and knowledge transfer.',
      descFa: 'انتقال دانش فنی فرامرزی، لایسنسینگ دارایی‌های فکری و کنسرسیوم‌های بین‌المللی با شرکای جهانی.'
    }
  ];

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900 transition-colors" dir={direction}>
      
      {/* 8.2 HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center pt-24 pb-20 overflow-hidden bg-slate-950 text-white">
        {/* Abstract Architectural Grid Overlay */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#38bdf8" strokeWidth="0.75" strokeOpacity="0.4" />
                <circle cx="60" cy="60" r="1.5" fill="#38bdf8" fillOpacity="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>

        {/* Ambient Glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
              
              <motion.div variants={fadeUpVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-secondary text-xs font-bold uppercase tracking-widest backdrop-blur-md border border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                {isFa ? 'گروه بین‌المللی کیمیا کاران ماد' : 'KKM INTERNATIONAL GROUP'}
              </motion.div>

              <motion.h1 variants={fadeUpVariants} className="text-4xl sm:text-6xl lg:text-7xl font-display font-black leading-tight tracking-tight text-white">
                {isFa ? (
                  <>
                    فناوری. مهندسی.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-sky-300 to-white">
                      زیرساخت. نوآوری.
                    </span>
                  </>
                ) : (
                  <>
                    Technology. Engineering.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-sky-300 to-white">
                      Infrastructure. Innovation.
                    </span>
                  </>
                )}
              </motion.h1>

              <motion.p variants={fadeUpVariants} className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                {isFa 
                  ? 'ما راهکارهای مبتنی بر فناوری را در حوزه‌های انرژی پاک، چرخه آب، توسعه زیرساخت‌های پایدار، سامانه‌های صنعتی و هوش مصنوعی توسعه داده، تلفیق نموده و تجاری‌سازی می‌کنیم.' 
                  : 'We develop, integrate, and commercialize technology-driven solutions across clean energy, water cycles, resilient infrastructure, industrial systems, and artificial intelligence.'}
              </motion.p>

              <motion.div variants={fadeUpVariants} className="pt-2">
                <span className="text-sm font-semibold tracking-wide text-secondary/90 uppercase block">
                  {isFa 
                    ? 'از شواهد علمی تا فناوری، پروژه‌های میدانی و اثرگذاری مقیاس‌پذیر' 
                    : 'From Scientific Evidence to Technology, Field Projects, and Scalable Impact'}
                </span>
              </motion.div>

              <motion.div variants={fadeUpVariants} className="flex flex-wrap justify-center gap-4 pt-6">
                <button 
                  onClick={() => setPage(Page.RuralStudies)} 
                  className="px-8 py-4 bg-secondary text-primary-dark font-bold rounded-full hover:bg-secondary/90 hover:shadow-lg hover:shadow-secondary/20 transition-all flex items-center gap-2 text-sm sm:text-base group"
                >
                  <Compass className="w-5 h-5 text-primary-dark" />
                  {isFa ? 'پلتفرم توسعه روستایی و عشایری' : 'Rural & Nomadic Platform'}
                  <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </button>

                <button 
                  onClick={() => setPage(Page.GMELHub)} 
                  className="px-8 py-4 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold rounded-full transition-all text-sm sm:text-base flex items-center gap-2"
                >
                  <Zap className="w-4 h-4 text-secondary" />
                  {isFa ? 'اکوسیستم ژئوترمال GMEL' : 'Explore GMEL Hub'}
                </button>

                <button 
                  onClick={() => setPage(Page.ProjectDevelopment)} 
                  className="px-8 py-4 bg-transparent hover:bg-white/10 text-slate-300 border border-slate-700 font-semibold rounded-full transition-all text-sm sm:text-base"
                >
                  {isFa ? 'پیشنهاد و آغاز پروژه' : 'Start a Project'}
                </button>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* 8.3 WHO WE ARE (Corporate Essence & Dual Role) */}
      <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary-dark dark:text-secondary text-xs font-bold uppercase tracking-wider mb-4">
              <Building2 className="w-4 h-4" />
              {isFa ? 'درباره گروه بین‌المللی کیمیا کاران ماد' : 'About KKM International Group'}
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
              {isFa ? 'مهندسی و فناوری برای حل چالش‌های پیچیده' : 'Engineering & Technology for Complex Challenges'}
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-justify sm:text-center">
              <p>
                {isFa 
                  ? 'گروه بین‌المللی کیمیا کاران ماد (ثبت شده با شماره ۳۸۴۰۵۴ و شناسه ملی ۱۰۳۲۰۳۵۱۲۰۰)، یک مجموعه مهندسی، فناوری و توسعه زیرساخت است که بر حل نظام‌مند چالش‌های انرژی، آب، زنجیره ارزش کشاورزی، صنعت و تحول دیجیتال تمرکز دارد.'
                  : 'KKM International Group, operating through Kimia Karan Mâd, is an integrated engineering and technology group focused on developing and commercializing solutions for critical energy, infrastructure, water, industrial, and digital challenges.'}
              </p>
              <p>
                {isFa
                  ? 'رویکرد متمایز ما پیوند دادن داده‌ها و شواهد آزمایشگاهی، مالکیت فکری (IP)، نمونه‌سازی مدولار، پایلوت‌های میدانی و مهندسی ارزش است. ما پروژه‌های منفرد را نه به‌عنوان قراردادهای پراکنده، بلکه به‌عنوان مشارکت‌کنندگان فنی در یک زیست‌بوم توسعه پایدار هدایت می‌کنیم.'
                  : 'Our architecture connects empirical research, intellectual property, prototype iteration, field pilots, and commercial EPC into a single continuous development lifecycle. We structure individual projects as technical contributors to integrated regional development platforms.'}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <button 
                onClick={() => setPage(Page.AboutUs)} 
                className="px-6 py-3 bg-primary-dark dark:bg-slate-800 text-white font-bold rounded-full hover:bg-primary transition-all text-sm flex items-center gap-2"
              >
                {isFa ? 'شناخت مأموریت و ارکان KKM' : 'Explore About KKM'}
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
              <button 
                onClick={() => setPage(Page.CorporateInfo)} 
                className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-sm flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-primary" />
                {isFa ? 'شناسنامه رسمی شرکتی و ثبت اسناد' : 'Official Corporate Info'}
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 8.4 TECHNOLOGY & ENGINEERING DOMAINS */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">
              {isFa ? 'حوزه‌های چندرشته‌ای' : 'Multidisciplinary Capabilities'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white mb-4">
              {isFa ? 'قلمروهای فناوری و مهندسی KKM' : 'Our Technology & Engineering Domains'}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base">
              {isFa 
                ? 'توانمندی‌های تخصصی در سراسر بخش‌های حیاتی انرژی، زیرساخت و اکوسیستم‌های مولد.' 
                : 'Deep engineering and integration expertise spanning critical infrastructure and productive ecosystems.'}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                titleEn: 'Energy & Geothermal Systems', 
                titleFa: 'انرژی و سامانه‌های زمین‌گرمایی',
                descEn: 'Closed-loop geothermal extraction, multi-energy hybrid microgrids, and baseload thermal power conversion.', 
                descFa: 'استخراج زمین‌گرمایی مداربسته (GMEL-CLG)، ریزشبکه‌های هیبریدی تجدیدپذیر و تولید بار پایه برق.',
                icon: Zap,
                page: Page.GMELHub
              },
              { 
                titleEn: 'Water & Closed Cycles', 
                titleFa: 'آب و چرخه‌های بسته',
                descEn: 'Thermal desalination, brackish water treatment, smart storage, and integrated water-energy corridors.', 
                descFa: 'نمک‌زدایی حرارتی آب شور، تصفیه پساب‌های معدنی، ذخیره‌سازی هوشمند و همبست آب-انرژی.',
                icon: Droplets,
                page: Page.CoreTechnologies
              },
              { 
                titleEn: 'Resilient Infrastructure', 
                titleFa: 'زیرساخت‌های پایدار و مقاوم',
                descEn: 'Civil and industrial infrastructure designed for extreme arid, marine, and rural environments.', 
                descFa: 'زیرساخت‌های عمرانی، تأسیسات صنعتی و ابنیه مهندسی متناسب با اقلیم‌های سخت بیابانی و دریایی.',
                icon: Building2,
                page: Page.Projects
              },
              { 
                titleEn: 'Advanced Materials & Sensors', 
                titleFa: 'مواد پیشرفته و ادوات سنجش',
                descEn: 'Nanofluids for rapid thermal transfer, smart subsurface well casings, and bio-mineralized materials.', 
                descFa: 'نانوسیالات تبادل سریع گرما، لوله‌های جداره هوشمند با فیبر نوری و بتن‌های خودترمیم‌شونده.',
                icon: Factory,
                page: Page.IPCenter
              },
              { 
                titleEn: 'AI & Digital Twins', 
                titleFa: 'هوش مصنوعی و دوقلوهای دیجیتال',
                descEn: 'Predictive energy dispatch, IoT remote telemetry for remote rural plants, and physics-informed models.', 
                descFa: 'دیسپاچینگ هوشمند بار انرژی، پایش از راه دور اینترنت اشیاء (IoT) و دوقلوی دیجیتال سایت‌های عملیاتی.',
                icon: Cpu,
                page: Page.DigitalTwinHub
              },
              { 
                titleEn: 'Productive Agriculture & Value Chains', 
                titleFa: 'کشاورزی ارزش‌آفرین و زنجیره‌های فرآوری',
                descEn: 'Greenhouse thermal conditioning, cold-chain storage, smart irrigation, and rural processing units.', 
                descFa: 'تأمین گرمایش گلخانه‌ها با ژئوترمال، سردخانه‌های خورشیدی و احداث صنایع تبدیلی روستایی.',
                icon: Leaf,
                page: Page.RuralStudies
              }
            ].map((domain, i) => (
              <div 
                key={i} 
                onClick={() => setPage(domain.page)}
                className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-primary/50 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary-dark dark:text-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <domain.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {isFa ? domain.titleFa : domain.titleEn}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                    {isFa ? domain.descFa : domain.descEn}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-primary dark:text-secondary group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                  <span>{isFa ? 'مشاهده جزئیات حوزه' : 'Explore Domain'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8.5 INTERACTIVE VALUE CHAIN (From Evidence to Scale) */}
      <section className="py-20 bg-primary-dark text-white overflow-hidden relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-secondary font-bold tracking-widest uppercase text-xs mb-2 block">
              {isFa ? 'مدل توسعه ۱۰ مرحله‌ای KKM' : 'KKM 10-STAGE DEVELOPMENT LIFECYCLE'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold mb-4">
              {isFa ? 'از شواهد علمی تا اثرگذاری مقیاس‌پذیر' : 'From Evidence to Scalable Impact'}
            </h2>
            <p className="text-slate-300 text-base max-w-2xl mx-auto">
              {isFa 
                ? 'مراحل ۱۰ گانه تبدیل دانش و فناوری به پروژه‌های عملیاتی، پلتفرم‌های نهادی و استقرار منطقه‌ای.'
                : 'Click any stage to inspect how KKM transforms empirical knowledge into validated, bankable infrastructure.'}
            </p>
          </div>
          
          {/* Scrollable Horizontal Chain Track */}
          <div className="flex items-center gap-2 overflow-x-auto pb-6 pt-2 snap-x max-w-6xl mx-auto no-scrollbar">
            {valueChainSteps.map((step, idx) => {
              const isActive = activeChainStep === idx;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveChainStep(idx)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all snap-center shrink-0 border ${
                    isActive 
                      ? 'bg-secondary text-primary-dark border-secondary shadow-lg shadow-secondary/30 scale-105' 
                      : 'bg-white/10 hover:bg-white/20 text-white/90 border-white/15'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-mono ${isActive ? 'bg-primary-dark text-white' : 'bg-white/20 text-white'}`}>
                    {idx + 1}
                  </span>
                  <span>{isFa ? step.titleFa : step.titleEn}</span>
                </button>
              );
            })}
          </div>

          {/* Active Step Details Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeChainStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto mt-6 p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 text-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-bold uppercase tracking-wider mb-3">
                {isFa ? `مرحله ${activeChainStep + 1} از ۱۰` : `Stage ${activeChainStep + 1} of 10`}: {valueChainSteps[activeChainStep].id}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">
                {isFa ? valueChainSteps[activeChainStep].titleFa : valueChainSteps[activeChainStep].titleEn}
              </h3>
              <p className="text-slate-200 text-base leading-relaxed max-w-2xl mx-auto">
                {isFa ? valueChainSteps[activeChainStep].descFa : valueChainSteps[activeChainStep].descEn}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="text-center mt-10">
            <button 
              onClick={() => setPage(Page.CoreTechnologies)}
              className="px-8 py-3.5 bg-secondary text-primary-dark font-bold rounded-full hover:bg-white transition-all text-sm"
            >
              {isFa ? 'مطالعه متدولوژی مهندسی KKM' : 'Explore Engineering Methodology'}
            </button>
          </div>

        </div>
      </section>

      {/* 8.7 GMEL ECOSYSTEM (Clean Baseload Energy & Deep Thermal Spoke) */}
      <section className="py-20 bg-slate-950 text-white relative border-b border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-4xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-bold uppercase tracking-wider mb-4">
              <Zap className="w-4 h-4" />
              {isFa ? 'فناوری‌های زمین‌گرمایی و انرژی پاک' : 'Geothermal Clean Energy Ecosystem'}
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold mb-4">
              {isFa ? 'اکوسیستم جامع فناوری GMEL' : 'The GMEL Technology Ecosystem'}
            </h2>
            <h3 className="text-xl sm:text-2xl text-secondary mb-4 font-medium">
              {isFa ? 'از منابع ژئوترمال عمیق تا زیرساخت‌های چندانرژی پایدار' : 'From Deep Geothermal Resources to Integrated Multi-Energy Infrastructure'}
            </h3>
            <p className="text-slate-300 text-base leading-relaxed">
              {isFa 
                ? 'سامانه GMEL راهکار اختصاصی KKM برای استخراج حرارت درون زمین در چرخه بسته، تولید بار پایه برق، نمک‌زدایی حرارتی آب و تأمین انرژی پایدار بدون انتشار گازهای گلخانه‌ای است.'
                : 'GMEL is KKM’s proprietary clean energy platform providing closed-loop geothermal extraction, continuous baseload power generation, thermal desalination, and hydrogen integration.'}
            </p>
          </div>
          
          {/* GMEL Module Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            {[
              { name: 'GMEL-CLG', descEn: 'Closed-Loop Geothermal', descFa: 'زمین‌گرمایی مداربسته' },
              { name: 'GMEL-ThermoFluid', descEn: 'Nano Heat Transfer Agent', descFa: 'نانوسیال تبادل حرارتی' },
              { name: 'GMEL-DrillX', descEn: 'Deep Well Tech', descFa: 'فناوری حفاری عمیق' },
              { name: 'GMEL-ORC', descEn: 'Compact Conversion', descFa: 'توربین ارگانیک رانکین' },
              { name: 'GMEL-Desal', descEn: 'Thermal Desalination', descFa: 'نمک‌زدایی حرارتی' },
              { name: 'GMEL-AI', descEn: 'Autonomous Dispatch', descFa: 'دیسپاچینگ هوشمند AI' }
            ].map((tile, i) => (
              <div 
                key={i} 
                onClick={() => setPage(Page.TechnologyTemplate)}
                className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 hover:border-secondary transition-all cursor-pointer group"
              >
                <h4 className="font-bold text-secondary mb-1 text-sm group-hover:underline flex items-center justify-between">
                  {tile.name}
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h4>
                <p className="text-xs text-slate-400">
                  {isFa ? tile.descFa : tile.descEn}
                </p>
              </div>
            ))}
          </div>
          
          {/* IP Notice & CTA */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400 leading-relaxed">
                <strong className="text-white font-semibold">{isFa ? 'اعتبارسنجی حقوقی و سطح آمادگی (TRL):' : 'IP & Readiness Notice:'}</strong>{' '}
                {isFa 
                  ? 'وضعیت حقوقی دارایی‌ها از سطح TRL 4 (تحقیقات آزمایشگاهی) تا TRL 8 (آماده استقرار میدانی) متغیر بوده و در مرکز مالکیت فکری ثبت شده است.'
                  : 'Technology readiness ranges from TRL 4 to TRL 8 across modular components. Detailed claim filings and patents are managed under the KKM IP Registry.'}
              </p>
            </div>
            <button 
              onClick={() => setPage(Page.GMELHub)} 
              className="px-6 py-3 bg-secondary text-primary-dark font-bold rounded-full text-xs uppercase tracking-wider hover:bg-white transition-colors whitespace-nowrap shrink-0"
            >
              {isFa ? 'ورود به هاب جامع GMEL' : 'Explore GMEL Ecosystem'}
            </button>
          </div>

        </div>
      </section>

      {/* 8.6 & 8.7 CINEMATIC IP VISUAL STORY & PEER-REVIEWED ACADEMIC REPOSITORY */}
      <section className="py-20 bg-slate-100/80 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Multi-Layered Patent Visual Story & Financial Model */}
          <CinematicIPStoryVisualizer />

          {/* Academic Q1 Scientific Publications Repository */}
          <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
            <AcademicPublicationsSection limit={4} />
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setPage(Page.IPCenter)}
                className="px-6 py-3 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-xs transition-all inline-flex items-center gap-2 shadow-sm"
              >
                <span>{isFa ? 'مشاهده تمامی مقالات و مرکز مالکیت فکری' : 'View Full Academic & IP Center'}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8.8 & 8.9 RURAL & NOMADIC DEVELOPMENT PLATFORM (Strategic Hub) */}
      <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Leaf className="w-4 h-4" />
              {isFa ? 'پلتفرم راهبردی توسعه سرزمینی' : 'National Strategic Development Platform'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 dark:text-white mb-4">
              {isFa ? 'پلتفرم توسعه روستایی و عشایری KKM' : 'KKM Rural & Nomadic Development Platform'}
            </h2>
            <h3 className="text-xl sm:text-2xl text-slate-700 dark:text-slate-300 font-medium max-w-3xl mx-auto">
              {isFa ? 'از مهندسی و زیرساخت تا رونق و خوداتکایی جوامع محلی' : 'From Advanced Technology to Rural Prosperity'}
            </h3>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              {isFa 
                ? 'ما انرژی پاک، چرخه آب، زیرساخت ارتباطی، هوش مصنوعی، زنجیره‌های ارزش کشاورزی و مدل‌های سرمایه‌گذاری بانکی‌پذیر را در یک سیستم واحد برای شکوفایی مناطق روستایی و عشایری تلفیق می‌کنیم.'
                : 'We integrate energy, water, resilient infrastructure, agriculture, processing, AI monitoring, and bankable investment structures into an integrated territorial development model.'}
            </p>
          </div>
          
          {/* Interactive "One Village. One Integrated System" Flow Diagram */}
          <div className="max-w-4xl mx-auto bg-slate-50 dark:bg-slate-800/60 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 mb-10 shadow-sm">
            <h4 className="text-lg font-bold text-center text-slate-900 dark:text-white mb-2">
              {isFa ? 'مدل توسعه یکپارچه: یک روستا / سکونت‌گاه، یک زیست‌بوم پیوسته' : 'Integrated Rural Development Model: One Village, One System'}
            </h4>
            <p className="text-xs text-center text-slate-500 mb-8">
              {isFa ? 'جریان تبدیل منابع محلی به اقتصاد روستایی پایدار و ارزش‌آفرین' : 'Flow from Local Potential to Sustainable, Resilient Rural Economy'}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { step: '01', titleEn: 'Local Resources', titleFa: 'منابع محلی' },
                { step: '02', titleEn: 'Energy + Water', titleFa: 'انرژی و آب' },
                { step: '03', titleEn: 'Infrastructure', titleFa: 'زیرساخت مقاوم' },
                { step: '04', titleEn: 'Agri & Livestock', titleFa: 'کشاورزی و دام' },
                { step: '05', titleEn: 'Processing Units', titleFa: 'صنایع تبدیلی' },
                { step: '06', titleEn: 'AI & Digital Ops', titleFa: 'هوش مصنوعی' },
                { step: '07', titleEn: 'Investment Engine', titleFa: 'سرمایه‌گذاری' },
                { step: '08', titleEn: 'Local Jobs', titleFa: 'اشتغال پایدار' },
                { step: '09', titleEn: 'Value Retention', titleFa: 'ماندگاری ارزش' },
                { step: '10', titleEn: 'Resilient Economy', titleFa: 'اقتصاد خوداتکا' }
              ].map((item, i) => (
                <div key={i} className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-center shadow-xs flex flex-col justify-between">
                  <span className="text-[10px] font-mono font-bold text-primary dark:text-secondary">{item.step}</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">
                    {isFa ? item.titleFa : item.titleEn}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setPage(Page.RuralStudies)} 
              className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary-dark transition-all text-sm flex items-center gap-2 shadow-sm"
            >
              <Compass className="w-4 h-4" />
              {isFa ? 'ورود به پلتفرم توسعه روستایی و عشایری' : 'Explore Rural Platform'}
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
            <button 
              onClick={() => setPage(Page.PilotRequest)} 
              className="px-8 py-4 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold rounded-full hover:border-primary text-slate-800 dark:text-white transition-all text-sm"
            >
              {isFa ? 'ثبت درخواست پایلوت منطقه‌ای' : 'Propose a Regional Pilot'}
            </button>
            <button 
              onClick={() => setPage(Page.Exhibition)} 
              className="px-8 py-4 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-bold rounded-full hover:bg-emerald-100 transition-all text-sm"
            >
              {isFa ? 'دوسیه نمایشگاه توانمندی‌ها (روستا ۱۴۰۵)' : 'Exhibition 1405 Dossier'}
            </button>
          </div>

        </div>
      </section>

      {/* 8.10 SELECTED PROJECTS (Technical Contributors to the Ecosystem) */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">
                {isFa ? 'مشارکت‌کنندگان فنی' : 'Technical Contributors'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white">
                {isFa ? 'پروژه‌های کلیدی و کانون‌های توسعه' : 'Selected Projects & Deployments'}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-2xl">
                {isFa 
                  ? 'پروژه‌های میدانی KKM تأمین‌کننده شواهد عملیاتی، بسترهای اعتبارسنجی TRL و زیرساخت‌های پایلوت هستند.' 
                  : 'Field deployments acting as technology testbeds, operational evidence generators, and infrastructure anchors.'}
              </p>
            </div>
            <button 
              onClick={() => setPage(Page.Projects)}
              className="px-6 py-2.5 bg-white dark:bg-slate-900 text-primary hover:text-primary-dark dark:text-secondary border border-slate-200 dark:border-slate-800 font-bold rounded-full text-xs transition-colors shrink-0 flex items-center gap-1.5"
            >
              <span>{isFa ? 'مشاهده همه پروژه‌ها' : 'View All Projects'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>
          
          {/* Interactive Touch-Enabled Auto-Playing Project Highlights Carousel */}
          <div className="mb-12">
            <ProjectHighlightsCarousel setPage={setPage} />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                nameEn: "Qeshm Green Energy & Biotech Hub",
                nameFa: "هاب انرژی سبز و زیست‌فناوری قشم",
                locationEn: "Qeshm Free Zone",
                locationFa: "منطقه آزاد قشم",
                sectorEn: "Renewable Energy / Marine / Desalination",
                sectorFa: "انرژی تجدیدپذیر / دریایی / نمک‌زدایی",
                roleEn: "Technology Developer / EPC",
                roleFa: "توسعه‌دهنده فناوری و پیمانکار مهندسی",
                statusEn: "Development Phase",
                statusFa: "مرحله توسعه و امکان‌سنجی",
                descEn: "Integrated closed-loop energy and marine biotechnology complex supporting sustainable island infrastructure.",
                descFa: "مجتمع یکپارچه انرژی پاک و زیست‌فناوری دریایی با هدف تأمین پایدار آب شیرین و برق بدون کربن جزیره."
              },
              {
                nameEn: "ICOFC Sarakhs Subsurface Testbed",
                nameFa: "پروژه ژئوترمال عمیق سرخس (ICOFC)",
                locationEn: "Sarakhs, Khorasan",
                locationFa: "سرخس، خراسان رضوی",
                sectorEn: "Geothermal / Depleted Wells / Baseload",
                sectorFa: "ژئوترمال / چاه‌های بازنشسته / بار پایه",
                roleEn: "Lead Engineering & Subsurface Technology",
                roleFa: "راهبر مهندسی و فناوری زیرسطحی",
                statusEn: "Pilot Testing (TRL 7)",
                statusFa: "پایلوت میدانی (TRL 7)",
                descEn: "Conversion of depleted gas reservoirs into closed-loop geothermal power and thermal energy storage.",
                descFa: "تبدیل مخازن بازنشسته گازی به سامانه تولید برق و حرارت زمین‌گرمایی حلقه بسته بدون خروج سیال."
              },
              {
                nameEn: "Tehran Advanced Life Sciences Center",
                nameFa: "مرکز پیشرفته علوم زیستی تهران",
                locationEn: "Tehran Technology Corridor",
                locationFa: "کریدور فناوری تهران",
                sectorEn: "Biotech Infrastructure / R&D Cleanrooms",
                sectorFa: "زیرساخت زیست‌فناوری / اتاق‌های تمیز",
                roleEn: "Design & Technology Partner",
                roleFa: "طراح و شریک فناوری",
                statusEn: "Engineering Design",
                statusFa: "طراحی مهندسی و تجاری‌سازی",
                descEn: "Advanced laboratory and processing infrastructure bridging university biomedical breakthroughs with production.",
                descFa: "تأسیسات آزمایشگاهی و فرآوری تخصصی جهت تسریع انتقال فناوری‌های زیستی به فاز صنعتی."
              }
            ].map((p, i) => (
              <div 
                key={i} 
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden flex flex-col shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="p-6 flex-1 flex flex-col justify-between border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[11px] font-bold px-3 py-1 bg-primary/10 text-primary-dark dark:text-secondary rounded-full">
                        {isFa ? p.statusFa : p.statusEn}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {isFa ? p.sectorFa : p.sectorEn}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {isFa ? p.nameFa : p.nameEn}
                    </h3>
                    <div className="flex items-center text-xs text-slate-500 mb-3">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-primary" />
                      <span>{isFa ? p.locationFa : p.locationEn}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      {isFa ? p.descFa : p.descEn}
                    </p>
                  </div>
                  
                  <div className="text-[11px] font-medium text-slate-500 pt-3 border-t border-slate-100 dark:border-slate-800/60">
                    <span className="font-bold text-slate-700 dark:text-slate-300">{isFa ? 'نقش KKM:' : 'Role:'}</span>{' '}
                    <span>{isFa ? p.roleFa : p.roleEn}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 divide-x rtl:divide-x-reverse divide-slate-100 dark:divide-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                  <button 
                    onClick={() => setPage(Page.ProjectTemplate)} 
                    className="py-3 text-center text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-primary transition-colors"
                  >
                    {isFa ? 'برگ مشخصات پروژه' : 'View Spec Sheet'}
                  </button>
                  <button 
                    onClick={() => setPage(Page.Projects)} 
                    className="py-3 text-center text-xs font-bold text-primary dark:text-secondary hover:underline transition-colors"
                  >
                    {isFa ? 'کاوش پروژه' : 'Explore Project'}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8.16 WHY KKM (5 Pillars of Trust & Execution) */}
      <section className="py-20 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white mb-3">
              {isFa ? 'چرا گروه بین‌المللی کیمیا کاران ماد (KKM)؟' : 'Why KKM International'}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl mx-auto">
              {isFa 
                ? 'پنج ستون راهبردی که اعتماد سرمایه‌گذاران، کارفرمایان دولتی و جوامع محلی را تضمین می‌کند.' 
                : 'Five foundational pillars ensuring technical rigor, bankability, and long-term societal resilience.'}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6">
            {[
              { 
                titleEn: 'Engineering-Led', 
                titleFa: 'هدایت‌شده با مهندسی',
                descEn: 'Deep practical EPC execution and proven mechanical-thermodynamic capabilities.',
                descFa: 'قابلیت اجرایی اثبات‌شده در پروژه‌های سخت EPC و مهندسی دقیق ترمودینامیک.'
              },
              { 
                titleEn: 'Technology-Focused', 
                titleFa: 'محور فناوری و R&D',
                descEn: 'Continuous research, modular prototyping, and seamless field-testing.',
                descFa: 'پژوهش مستمر، نمونه‌سازی سریع مدولار و اعتبارسنجی مداوم آزمایشگاهی.'
              },
              { 
                titleEn: 'IP-Protected', 
                titleFa: 'حفاظت از دارایی فکری',
                descEn: 'Rigorous PCT patenting, trade secrecy, and defensible technology assets.',
                descFa: 'ثبت پرونده‌های بین‌المللی PCT، صیانت از اسرار تجاری و دارایی‌های فکری مستند.'
              },
              { 
                titleEn: 'Bankable Delivery', 
                titleFa: 'پروژه‌های بانکی‌پذیر',
                descEn: 'Financial modeling, lifecycle cash-flow guarantees, and structured governance.',
                descFa: 'مدل‌سازی مالی دقیق، بازگشت سرمایه قابل اتکا و استانداردهای ممیزی رسمی.'
              },
              { 
                titleEn: 'International Scope', 
                titleFa: 'افق بین‌المللی',
                descEn: 'Designed from day one for cross-border partnerships and regional technology transfer.',
                descFa: 'طراحی ساختارها برای لایسنسینگ فرامرزی، همکاری‌های منطقه‌ای و صادرات خدمات فنی.'
              }
            ].map((reason, i) => (
              <div key={i} className="text-center p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary dark:text-secondary flex items-center justify-center mx-auto mb-3 font-mono font-bold text-xs">
                    0{i + 1}
                  </div>
                  <h3 className="font-bold text-sm sm:text-base mb-2 text-slate-900 dark:text-white">
                    {isFa ? reason.titleFa : reason.titleEn}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {isFa ? reason.descFa : reason.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8.19 CALL TO ACTION */}
      <section className="py-20 bg-slate-950 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold mb-4">
            {isFa ? 'چالشی برای حل کردن دارید؟' : 'Have a Challenge Worth Solving?'}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            {isFa 
              ? 'خواه در حال توسعه یک پروژه انرژی یا زیرساختی باشید، نیازمند ارزیابی فناوری و ثبت لایسنس، یا به دنبال پیاده‌سازی پلتفرم یکپارچه توسعه روستایی؛ KKM مسیر گام بعدی را برای شما مهندسی می‌کند.'
              : 'Whether developing an energy asset, evaluating deep thermal technologies, structuring a commercial pilot, or seeking integrated rural development solutions, KKM is your strategic engineering partner.'}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setPage(Page.ProjectDevelopment)} 
              className="px-8 py-4 bg-secondary text-primary-dark font-bold rounded-full hover:bg-white hover:shadow-lg transition-all text-sm"
            >
              {isFa ? 'پیشنهاد و آغاز پروژه (Start Project)' : 'Start a Project'}
            </button>
            <button 
              onClick={() => setPage(Page.InvestmentPortal)} 
              className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-full transition-all text-sm"
            >
              {isFa ? 'مشارکت و سرمایه‌گذاری (Partner)' : 'Partner With KKM'}
            </button>
            <button 
              onClick={() => setPage(Page.PilotRequest)} 
              className="px-8 py-4 bg-transparent hover:bg-white/10 border border-slate-700 font-bold rounded-full text-slate-300 hover:text-white transition-all text-sm"
            >
              {isFa ? 'درخواست استقرار پایلوت (Pilot Request)' : 'Propose a Pilot'}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
