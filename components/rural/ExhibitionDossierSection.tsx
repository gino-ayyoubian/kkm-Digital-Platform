import * as React from 'react';
import { useLanguage } from '../../LanguageContext';
import { Page } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Handshake, 
  Calendar, 
  FileText, 
  Copy, 
  Check, 
  Download, 
  ArrowRight, 
  TrendingUp, 
  Coins, 
  Layers, 
  Compass, 
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Send
} from 'lucide-react';

interface ExhibitionDossierSectionProps {
  setPage: (page: Page) => void;
  onScrollTo: (elementId: string) => void;
}

export const ExhibitionDossierSection: React.FC<ExhibitionDossierSectionProps> = ({ setPage, onScrollTo }) => {
  const { language, direction } = useLanguage();
  const isFa = language === 'FA';

  const [activeDossierTab, setActiveDossierTab] = React.useState<'full' | 'short' | 'micro' | 'formula'>('full');
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

  const [selectedProjectType, setSelectedProjectType] = React.useState<string>('all');
  const [showMeetingModal, setShowMeetingModal] = React.useState<boolean>(false);
  const [meetingSubmitted, setMeetingSubmitted] = React.useState<boolean>(false);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Section 10.24 Full Text
  const fullOfficialTextFa = `گروه بین‌المللی KKM، به‌عنوان یک مجموعه فعال در حوزه فناوری، مهندسی و توسعه یکپارچه، در ششمین نمایشگاه بین‌المللی توانمندی‌ها و ظرفیت‌های روستایی و عشایری با رویکرد ارائه «راهکارهای یکپارچه انرژی، آب، زیرساخت و اقتصاد مولد» حضور دارد.

KKM توسعه مناطق روستایی و عشایری را فراتر از اجرای پروژه‌های منفرد، و در قالب «اکوسیستم‌های توسعه منطقه‌ای» دنبال می‌کند. در این الگو، تلفیق انرژی‌های تجدیدپذیر، امنیت و تأمین آب، کشاورزی و دامداری دانش‌بنیان، صنایع فرآوری و تبدیلی، فناوری‌های دیجیتال و مدل‌های نوین تأمین مالی، بستری برای ایجاد ارزش افزوده محلی، اشتغال پایدار و مهاجرت معکوس فراهم می‌آورد.

حوزه‌های تمرکز KKM در این رویداد شامل موارد زیر است:
۱. سیستم‌های انرژی نامتمرکز، ریزشبکه‌ها و راهکارهای هیبریدی برای مناطق روستایی و عشایری
۲. راهکارهای پایدار تأمین، تصفیه، بازچرخانی و نمک‌زدایی آب در بخش‌های شرب و کشاورزی
۳. زیرساخت‌های مهندسی و تأسیساتی متناسب با اقلیم و فعالیت‌های تولیدی مناطق
۴. مدل‌های نوین زنجیره ارزش کشاورزی، فرآوری، صنایع تبدیلی و کاهش ضایعات
۵. راهکارهای فناورانه و سیار متناسب با زندگی و اقتصاد جامعه عشایری
۶. فناوری‌های داده‌محور، هوش مصنوعی و پایش منابع در مدیریت زیرساخت‌های محلی
۷. ساختاردهی مدل‌های سرمایه‌گذاری، مشارکت عمومی-خصوصی (PPP) و توسعه پایدار

KKM آمادگی دارد با دستگاه‌های اجرایی، مدیریت‌های محلی، تعاونی‌ها، فعالان اقتصادی و سرمایه‌گذاران در جهت شناسایی ظرفیت‌ها، تعریف پروژه‌های پایلوت و اجرای طرح‌های جامع توسعه روستایی و عشایری همکاری نماید.`;

  const fullOfficialTextEn = `KKM International Group participates in the 6th International Exhibition of Rural & Nomadic Capacities with an integrated strategic focus on "Integrated Technology, Engineering and Investment Solutions for Sustainable Rural and Nomadic Development."

KKM approaches rural and nomadic development not as fragmented single interventions, but as an integrated regional economic and infrastructure system. By coupling distributed renewable generation, water security, productive agricultural techniques, decentralized agro-processing, digital intelligence and bankable investment structures, the platform enables retained local value creation and generational resilience.`;

  // Section 10.25 Short Text
  const shortTextFa = `گروه بین‌المللی KKM با رویکرد «راهکارهای یکپارچه فناوری، مهندسی و سرمایه‌گذاری برای توسعه پایدار روستایی و عشایری» در این نمایشگاه حضور یافته است. تمرکز این مجموعه بر تلفیق انرژی‌های تجدیدپذیر، امنیت آب، کشاورزی مولد، صنایع فرآوری و تبدیلی، زیرساخت‌های سیار عشایری، فناوری‌های دیجیتال و مدل‌های تأمین مالی پروژه‌محور است تا ظرفیت‌های بومی مناطق به ارزش افزوده اقتصادی، اشتغال پایدار و توسعه ماندگار تبدیل شوند. KKM آماده همکاری در تعریف پروژه‌های پایلوت و طرح‌های سرمایه‌گذاری مشترک با نهادها و فعالان این حوزه می‌باشد.`;

  // Section 10.26 Micro Text
  const microTextFa = `ارائه راهکارهای یکپارچه در حوزه‌های انرژی، آب، کشاورزی مولد، صنایع فرآوری، زیرساخت، فناوری دیجیتال و مدل‌های سرمایه‌گذاری برای ایجاد ارزش افزوده و اشتغال پایدار در مناطق روستایی و عشایری.`;

  // Section 10.22 Rural Project Types
  const projectTypes = [
    {
      id: 'energy-village',
      category: 'energy',
      categoryLabelEn: 'Energy',
      categoryLabelFa: 'انرژی',
      nameEn: 'Productive Energy Village',
      nameFa: 'دهکده انرژی و تولید مولد',
      scaleEn: 'Village & Regional Cluster',
      scaleFa: 'سطح روستا و خوشه منطقه‌ای',
      descEn: 'Hybrid microgrids, battery reserves, cold storage and agrivoltaic systems for complete local power independence.',
      descFa: 'ریزشبکه‌های خورشیدی و بادی، ذخیره‌سازهای باتری، سردخانه و کشت اگروولتائیک برای استقلال کامل انرژی روستا.'
    },
    {
      id: 'water-hub',
      category: 'water',
      categoryLabelEn: 'Water',
      categoryLabelFa: 'آب',
      nameEn: 'Water-Energy Nexus Hub',
      nameFa: 'هاب تلفیقی آب و انرژی',
      scaleEn: 'Watershed & Basin Level',
      scaleFa: 'سطح حوزه آبخیز و دشت',
      descEn: 'Solar-powered brackish reverse osmosis, deep well solar pumps, and closed-loop tertiary wastewater purification.',
      descFa: 'آب‌شیرین‌کن خورشیدی اسمز معکوس، پمپاژ چاه‌های کشاورزی، و تصفیه و بازچرخانی پساب برای مصارف مولد.'
    },
    {
      id: 'productive-agro',
      category: 'agriculture',
      categoryLabelEn: 'Agriculture',
      categoryLabelFa: 'کشاورزی',
      nameEn: 'Climate-Smart Agro Hub',
      nameFa: 'مجموعه کشاورزی اقلیم‌سازگار',
      scaleEn: 'Farm Gate to Cooperative',
      scaleFa: 'مزارع، باغات و تعاونی‌ها',
      descEn: 'High-density solar greenhouses, automated fertigation, medicinal plant cultivation, and certified organic packaging.',
      descFa: 'گلخانه‌های خورشیدی متراکم، کودآبیاری خودکار، کشت گیاهان دارویی پرارزش و بسته‌بندی استاندارد صادراتی.'
    },
    {
      id: 'rural-processing',
      category: 'industry',
      categoryLabelEn: 'Industry',
      categoryLabelFa: 'صنایع تبدیلی',
      nameEn: 'Decentralized Processing Unit',
      nameFa: 'واحدهای فرآوری و صنایع تبدیلی',
      scaleEn: 'Local Workshop & Hub',
      scaleFa: 'کارگاه‌های روستایی و هاب ناحیه‌ای',
      descEn: 'Solar-assisted fruit dehydrators, dairy sorting hubs, cold-storage lockers, and local artisan manufacturing.',
      descFa: 'خشک‌کن‌های خورشیدی، مراکز جمع‌آوری و خنک‌سازی شیر، سردخانه‌های ماژولار و کارگاه‌های بسته‌بندی بومی.'
    },
    {
      id: 'nomadic-mobile',
      category: 'nomadic',
      categoryLabelEn: 'Nomadic',
      categoryLabelFa: 'عشایری',
      nameEn: 'Mobile Pastoral Infrastructure',
      nameFa: 'بسته زیرساخت سیار عشایری',
      scaleEn: 'Tribal Routes & Pastures',
      scaleFa: 'مراتع، ایل‌راه‌ها و اتراق‌گاه‌ها',
      descEn: 'Foldable solar generators, trailer-mounted milk chillers, portable filtration kits, and satellite livestock telemetry.',
      descFa: 'ژنراتورهای خورشیدی تاشو، تریلر شیرسردکن متحرک، بسته‌های تصفیه آب قابل‌حمل و ردیاب ماهواره‌ای گله.'
    },
    {
      id: 'digital-twin',
      category: 'digital',
      categoryLabelEn: 'Digital',
      categoryLabelFa: 'دیجیتال',
      nameEn: 'Smart Rural Telemetry Network',
      nameFa: 'شبکه تله‌متری و پایش هوشمند',
      scaleEn: 'Full Community',
      scaleFa: 'جامع کالبدی و مزارع',
      descEn: 'Soil IoT sensors, solar pump remote automation, aquifer telemetry, and predictive maintenance for infrastructure.',
      descFa: 'حسگرهای اینترنت اشیاء، کنترل از راه دور پمپ‌ها، پایش سطح سفره و نگهداری پیش‌بینانه ادوات مهندسی.'
    }
  ];

  const filteredProjects = selectedProjectType === 'all' 
    ? projectTypes 
    : projectTypes.filter(p => p.category === selectedProjectType);

  return (
    <section id="exhibition-section" className="py-20 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10 space-y-20">

        {/* 10.20: 6th International Exhibition Feature Card */}
        <div id="exhibition-banner" className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-950 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-start justify-between">
            <div className="max-w-2xl space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" />
                {isFa ? 'رویداد بین‌المللی راهبردی' : 'STRATEGIC EXHIBITION ANNOUNCEMENT'}
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white leading-tight">
                {isFa 
                  ? 'حضور KKM در ششمین نمایشگاه بین‌المللی توانمندی‌ها و ظرفیت‌های روستایی و عشایری' 
                  : 'Meet KKM at the 6th International Exhibition of Rural & Nomadic Capacities'}
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {isFa 
                  ? 'KKM با هدف ارائه مدل‌های بانکی، معماری دهکده انرژی، بسته‌های آب‌شیرین‌کن خورشیدی و زیرساخت‌های سیار عشایری در این نمایشگاه حضور یافته و میزبان مسئولان دولتی، فرمانداران، دهیاران و سرمایه‌گذاران محترم خواهد بود.' 
                  : 'KKM convenes with government institutions, regional authorities, rural cooperatives, and capital partners to structure actionable engineering pilots and bankable regional development projects.'}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setShowMeetingModal(true)}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{isFa ? 'درخواست جلسه در غرفه KKM' : 'Request an Exhibition Meeting'}</span>
                </button>

                <button
                  onClick={() => onScrollTo('exhibition-dossier')}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm rounded-xl border border-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>{isFa ? 'مشاهده کاتالوگ و متن‌های ثبت‌نام' : 'View Exhibition Dossier & Texts'}</span>
                </button>
              </div>
            </div>

            {/* Quick Exhibition Stats Box */}
            <div className="w-full lg:w-72 bg-slate-950/80 border border-amber-500/30 rounded-2xl p-5 shrink-0 space-y-4">
              <div className="text-xs uppercase font-mono font-bold text-amber-400">
                {isFa ? 'برنامه غرفه و جلسات' : 'BOOTH FOCUS SESSIONS'}
              </div>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>{isFa ? 'معرفی مدل معماری دهکده انرژی' : 'Energy Village Blueprint Briefings'}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  <span>{isFa ? 'مشاوره فنی آب‌شیرین‌کن و چاه‌ها' : 'Solar Desalination Consultations'}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>{isFa ? 'بررسی زیرساخت‌های سیار عشایر' : 'Nomadic Mobile Tech Demonstrations'}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  <span>{isFa ? 'پذیرش فرم‌های پایلوت استانی' : 'Direct Pilot Intake Ingestion'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 10.19: Government & Institutional Cooperation */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-10 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
              <Handshake className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest font-mono font-bold text-emerald-400 mb-1 block">
                {isFa ? 'همکاری با نهادها و حاکمیت (Section 10.19)' : 'GOVERNMENT & INSTITUTIONAL PARTNERSHIP'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {isFa ? 'مشارکت برای توسعه پایدار منطقه‌ای' : 'Partnership for Regional Development'}
              </h3>
              <blockquote className="text-sm sm:text-base text-slate-200 font-medium italic border-r-4 rtl:border-r-4 ltr:border-l-4 border-emerald-500 pr-4 ltr:pl-4 ltr:pr-0 py-1 mb-4 leading-relaxed">
                {isFa
                  ? '«KKM آمادگی دارد با دستگاه‌های دولتی، مدیریت‌های محلی، نهادهای توسعه‌ای، مؤسسات مالی، مراکز پژوهشی و بخش خصوصی در طراحی و توسعه برنامه‌های فنی، اقتصادی و قابل‌اجرا برای توسعه روستایی همکاری کند.»'
                  : '"KKM seeks to collaborate with government institutions, local authorities, development organizations, financial institutions, research centers and private-sector partners to structure technically sound and economically viable rural development programs."'}
              </blockquote>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-4xl">
                {isFa 
                  ? 'هدف KKM عبور از شعارهای تکراری و ارائه اسناد توجیهی بانکی، نقشه‌های اجرایی EPC و مدل‌های مشارکت برد-برد با شوراهای اسلامی، فرمانداری‌ها و تعاونی‌ها است.' 
                  : 'We support public institutions with bankable engineering dossiers, risk-isolated operational frameworks, and turnkey EPC execution capabilities.'}
              </p>
            </div>
          </div>
        </div>

        {/* 10.21: Invest in Productive Rural Development */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-10 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest font-mono font-bold text-cyan-400 mb-1 block">
                {isFa ? 'سرمایه‌گذاری بانکی و توجیه‌پذیر (Section 10.21)' : 'BANKABLE PROJECT STRUCTURING'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {isFa ? 'سرمایه‌گذاری در توسعه مولد روستایی' : 'Invest in Productive Rural Development'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {isFa 
                  ? 'KKM به دنبال جذب کمک‌های بلاعوض یا بودجه‌های حمایتی بی‌هدف نیست؛ بلکه ساختار مهندسی و مالی شفاف برای هر پروژه ارائه می‌دهد:' 
                  : 'KKM does not ask for generic subsidies; it delivers structured, bankable project engineering with audited cashflow returns:'}
              </p>
            </div>
          </div>

          {/* Investment Lifecycle 8 Steps */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center">
            {[
              { num: '01', en: 'Identification', fa: 'شناسایی پروژه' },
              { num: '02', en: 'Assessment', fa: 'ممیزی فنی' },
              { num: '03', en: 'Feasibility', fa: 'امکان‌سنجی بانکی' },
              { num: '04', en: 'Financial Model', fa: 'مدل‌سازی مالی' },
              { num: '05', en: 'Investment', fa: 'تأمین سرمایه' },
              { num: '06', en: 'Implementation', fa: 'اجرای مهندسی' },
              { num: '07', en: 'Revenue Ops', fa: 'بهره‌برداری و سود' },
              { num: '08', en: 'Regional Scale', fa: 'توسعه مقیاس' }
            ].map((step, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
                <span className="text-[10px] font-mono font-bold text-cyan-400 mb-1">
                  STEP {step.num}
                </span>
                <div className="text-xs font-bold text-white mb-0.5">
                  {isFa ? step.fa : step.en}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 10.22: Rural Project Types Explorer */}
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-mono font-bold text-emerald-400 mb-1 block">
                {isFa ? 'کاوشگر گونه‌های پروژه (Section 10.22)' : 'RURAL PROJECT TYPES EXPLORER'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {isFa ? 'سبد الگوها و بسته‌های اجرایی KKM' : 'KKM Standard Project Configurations'}
              </h3>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              {[
                { id: 'all', en: 'All Types', fa: 'همه گونه‌ها' },
                { id: 'energy', en: 'Energy', fa: 'انرژی' },
                { id: 'water', en: 'Water', fa: 'آب' },
                { id: 'agriculture', en: 'Agriculture', fa: 'کشاورزی' },
                { id: 'industry', en: 'Industry', fa: 'صنایع' },
                { id: 'nomadic', en: 'Nomadic', fa: 'عشایری' },
                { id: 'digital', en: 'Digital', fa: 'دیجیتال' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setSelectedProjectType(f.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    selectedProjectType === f.id
                      ? 'bg-emerald-500 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isFa ? f.fa : f.en}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map(proj => (
              <div key={proj.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                      {isFa ? proj.categoryLabelFa : proj.categoryLabelEn}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {isFa ? proj.scaleFa : proj.scaleEn}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-2">
                    {isFa ? proj.nameFa : proj.nameEn}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {isFa ? proj.descFa : proj.descEn}
                  </p>
                </div>

                <button
                  onClick={() => onScrollTo('pilot-intake-form')}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700/60 rounded-xl text-xs font-semibold text-emerald-400 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span>{isFa ? 'پیشنهاد اجرای این الگو' : 'Deploy This Configuration'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 10.24, 10.25, 10.26, 10.27: Exhibition Registration & Official Texts Dossier */}
        <div id="exhibition-dossier" className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-mono font-bold text-amber-400 mb-1 block">
                {isFa ? 'مستندات رسمی و کاتالوگ نمایشگاه (Sections 10.24 - 10.27)' : 'EXHIBITION DOSSIER & REGISTRATION COPY TOOLKIT'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {isFa ? 'متون رسمی ثبت‌نام و کاتالوگ نمایشگاه' : 'Official Exhibition Registration Copy & Texts'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {isFa 
                  ? 'متون مصوب KKM جهت درج در فرم‌های ثبت‌نام، مصاحبه‌های مطبوعاتی و کاتالوگ رسمی نمایشگاه با قابلیت کپی مستقیم' 
                  : 'Approved official descriptions for exhibition organizers, media dossiers, and conference materials with 1-click copy.'}
              </p>
            </div>

            {/* Dossier Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveDossierTab('full')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeDossierTab === 'full' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                {isFa ? 'متن رسمی کامل (10.24)' : 'Full Official (10.24)'}
              </button>
              <button
                onClick={() => setActiveDossierTab('short')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeDossierTab === 'short' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                {isFa ? 'متن فرم ثبت‌نام (10.25)' : 'Short Form (10.25)'}
              </button>
              <button
                onClick={() => setActiveDossierTab('micro')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeDossierTab === 'micro' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                {isFa ? 'خلاصه تک‌بندی (10.26)' : 'Micro Summary (10.26)'}
              </button>
              <button
                onClick={() => setActiveDossierTab('formula')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeDossierTab === 'formula' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                {isFa ? 'فرمول پیام‌رسانی (10.27)' : 'Messaging Formula (10.27)'}
              </button>
            </div>
          </div>

          {/* Dossier Content Viewer */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative">
            <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 flex items-center gap-2">
              <button
                onClick={() => {
                  let text = '';
                  if (activeDossierTab === 'full') text = isFa ? fullOfficialTextFa : fullOfficialTextEn;
                  else if (activeDossierTab === 'short') text = shortTextFa;
                  else if (activeDossierTab === 'micro') text = microTextFa;
                  else text = 'ظرفیت محلی → فناوری و زیرساخت → ارزش افزوده → اشتغال → سرمایه‌گذاری → توسعه پایدار';
                  copyToClipboard(text, activeDossierTab);
                }}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedKey === activeDossierTab ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">{isFa ? 'کپی شد!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{isFa ? 'کپی متن' : 'Copy Text'}</span>
                  </>
                )}
              </button>
            </div>

            <div className="pt-8">
              {activeDossierTab === 'full' && (
                <div className="space-y-4 text-xs sm:text-sm text-slate-200 leading-relaxed font-normal whitespace-pre-line">
                  {isFa ? fullOfficialTextFa : fullOfficialTextEn}
                </div>
              )}

              {activeDossierTab === 'short' && (
                <div className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                  {isFa ? shortTextFa : 'KKM International Group participates with an integrated positioning: "Integrated Technology, Engineering and Investment Solutions for Sustainable Rural and Nomadic Development", converging distributed clean energy, water security, agro-processing, mobile nomadic infrastructure, and structured development finance.'}
                </div>
              )}

              {activeDossierTab === 'micro' && (
                <div className="text-sm font-medium text-amber-300 leading-relaxed">
                  {isFa ? microTextFa : 'Integrated technology, engineering and investment solutions across energy, water, productive agriculture, agro-processing, digital telemetry and capital structuring for sustainable rural and nomadic communities.'}
                </div>
              )}

              {activeDossierTab === 'formula' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-white mb-2">
                      {isFa ? 'واژگان کلیدی تکرارشونده در نمایشگاه:' : 'The Three Fundamental Exhibition Keywords:'}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                        <div className="text-xs font-mono font-bold text-emerald-400">01. ظرفیت (CAPACITY)</div>
                        <p className="text-xs text-slate-300 mt-1">
                          {isFa ? 'منابع، تابش، آب، خاک و توانمندی‌های بومی هر منطقه' : 'Local natural, climatic and human endowments.'}
                        </p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                        <div className="text-xs font-mono font-bold text-amber-400">02. ارزش (VALUE)</div>
                        <p className="text-xs text-slate-300 mt-1">
                          {isFa ? 'تبدیل ظرفیت خام به محصول فرآوری‌شده، خدمت و درآمد' : 'Converting raw potential into product, service, and retained cashflow.'}
                        </p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                        <div className="text-xs font-mono font-bold text-sky-400">03. توسعه (DEVELOPMENT)</div>
                        <p className="text-xs text-slate-300 mt-1">
                          {isFa ? 'تبدیل یک پروژه تک‌منظوره به یک مدل سیستمی، پایدار و مقیاس‌پذیر' : 'Converting an isolated project into a repeatable, scalable regional model.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30">
                    <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-widest block mb-2">
                      {isFa ? 'فرمول ارتباطی نهایی (Communication Formula):' : 'CORE MESSAGING EQUATION:'}
                    </span>
                    <div className="text-xs sm:text-sm font-bold text-white leading-relaxed">
                      {isFa 
                        ? 'ظرفیت محلی ➔ فناوری و زیرساخت ➔ ارزش افزوده ➔ اشتغال ➔ سرمایه‌گذاری ➔ توسعه پایدار' 
                        : 'Local Capacity ➔ Technology & Infrastructure ➔ Value Addition ➔ Employment ➔ Investment ➔ Sustainable Development'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 10.23: Final Platform Call to Action */}
        <div className="bg-gradient-to-br from-emerald-950/60 via-slate-950 to-slate-950 border-2 border-emerald-500/40 rounded-3xl p-8 sm:p-14 text-center max-w-4xl mx-auto shadow-2xl space-y-6">
          <span className="text-xs uppercase tracking-widest font-mono font-bold text-emerald-400 block">
            {isFa ? 'شروع همکاری و اقدام میدانی (Section 10.23)' : 'FINAL CALL TO ACTION'}
          </span>

          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            {isFa 
              ? 'فرصت یا پروژه‌ای در حوزه توسعه روستایی یا عشایری دارید؟' 
              : 'Have a Rural Development Opportunity?'}
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {isFa 
              ? 'موقعیت مکانی، منابع، چالش یا ایده پروژه خود را به ما معرفی کنید. KKM به شما در طراحی و ساختاردهی مسیر فنی، اجرایی و سرمایه‌گذاری کمک خواهد کرد.' 
              : 'Bring us the location, resources, challenge or project idea. KKM can help structure the technical, engineering and bankable development pathway.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onScrollTo('pilot-intake-form')}
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm sm:text-base rounded-xl shadow-xl shadow-emerald-500/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{isFa ? 'پیشنهاد یک پایلوت (Propose a Pilot)' : 'Propose a Pilot'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>

            <button
              onClick={() => setPage(Page.Contact)}
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm sm:text-base rounded-xl border border-slate-700 transition-colors cursor-pointer"
            >
              <span>{isFa ? 'شروع یک پروژه (Start a Project)' : 'Start a Project'}</span>
            </button>

            <button
              onClick={() => setPage(Page.Invest)}
              className="px-7 py-4 bg-transparent hover:bg-white/5 text-slate-300 hover:text-white font-semibold text-sm sm:text-base rounded-xl border border-slate-700/60 transition-colors cursor-pointer"
            >
              <span>{isFa ? 'مشارکت با KKM (Partner With KKM)' : 'Partner With KKM'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Exhibition Meeting Booking Modal */}
      <AnimatePresence>
        {showMeetingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-400" />
                  {isFa ? 'هماهنگی جلسه در غرفه KKM (نمایشگاه روستایی و عشایری)' : 'Book a Meeting at KKM Exhibition Booth'}
                </h3>
                <button
                  onClick={() => setShowMeetingModal(false)}
                  className="text-slate-400 hover:text-white text-sm cursor-pointer p-1"
                >
                  ✕
                </button>
              </div>

              {meetingSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-white">
                    {isFa ? 'درخواست جلسه ثبت شد' : 'Meeting Request Logged'}
                  </h4>
                  <p className="text-xs text-slate-300">
                    {isFa 
                      ? 'همکاران دبیرخانه نمایشگاه جهت هماهنگی ساعت دقیق حضور با شما تماس خواهند گرفت.' 
                      : 'Our exhibition protocol team will reach out to confirm your scheduled slot.'}
                  </p>
                  <button
                    onClick={() => {
                      setMeetingSubmitted(false);
                      setShowMeetingModal(false);
                    }}
                    className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg cursor-pointer"
                  >
                    {isFa ? 'بستن' : 'Close'}
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setMeetingSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {isFa ? 'نام و نام خانوادگی' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {isFa ? 'سازمان / فرمانداری / شرکت' : 'Organization / Authority'}
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {isFa ? 'شماره تماس مستقیم' : 'Phone Number'}
                      </label>
                      <input
                        type="tel"
                        required
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {isFa ? 'موضوع اصلی جلسه' : 'Topic of Interest'}
                      </label>
                      <select className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-500">
                        <option>{isFa ? 'دهکده انرژی و ریزشبکه' : 'Energy Village & Microgrid'}</option>
                        <option>{isFa ? 'آب‌شیرین‌کن و چاه خورشیدی' : 'Water & Solar Pumping'}</option>
                        <option>{isFa ? 'تجهیزات سیار عشایری' : 'Mobile Nomadic Tech'}</option>
                        <option>{isFa ? 'سرمایه‌گذاری و مشارکت' : 'Investment & PPP'}</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowMeetingModal(false)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl cursor-pointer"
                    >
                      {isFa ? 'انصراف' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md cursor-pointer"
                    >
                      {isFa ? 'ثبت درخواست جلسه' : 'Confirm Meeting Request'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
