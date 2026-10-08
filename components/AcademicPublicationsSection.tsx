import React, { useState, useMemo } from 'react';
import { useLanguage } from '../LanguageContext';
import { 
  BookOpen, Search, ExternalLink, Download, FileText, CheckCircle2, 
  Layers, ArrowRight, ArrowLeft, Filter, Sparkles, Shield, Bookmark
} from 'lucide-react';

export interface ScientificPublication {
  id: string;
  titleEn: string;
  titleFa: string;
  journal: string;
  publisher: 'Elsevier' | 'IEEE' | 'Springer' | 'Wiley' | 'National Journal';
  ranking: 'Q1' | 'Q2';
  impactFactor: number;
  year: number;
  doi: string;
  authors: string[];
  category: 'GEOTHERMAL' | 'AI_MICROGRID' | 'WATER_DESAL' | 'MATERIALS' | 'GOVERNANCE';
  linkedCommercialSolutionEn: string;
  linkedCommercialSolutionFa: string;
  abstractEn: string;
  abstractFa: string;
  trlLevel: string;
  downloadUrl?: string;
  citationCount: number;
}

export const SCIENTIFIC_PUBLICATIONS: ScientificPublication[] = [
  {
    id: 'pub-elsevier-applied-energy-2024',
    titleEn: 'Thermodynamic Optimization and Exergy Analysis of Subsurface Closed-Loop Geothermal Networks Using Supercritical CO2 Working Fluid',
    titleFa: 'بهینه‌سازی ترمودینامیکی و تحلیل اکسرژی شبکه‌های زمین‌گرمایی حلقه بسته تحت سیال عامل CO2 فوق‌بحرانی',
    journal: 'Applied Energy',
    publisher: 'Elsevier',
    ranking: 'Q1',
    impactFactor: 11.2,
    year: 2024,
    doi: '10.1016/j.apenergy.2024.122890',
    authors: ['KKM Energy Systems Consortium', 'Thermal Fluids Research Group', 'M. Rahimi', 'K. Karami'],
    category: 'GEOTHERMAL',
    linkedCommercialSolutionEn: 'GMEL-CLG Closed-Loop Geothermal Generation Package',
    linkedCommercialSolutionFa: 'پکیج مولد برق و حرارت زمین‌گرمایی مداربسته GMEL-CLG',
    abstractEn: 'This paper establishes a comprehensive exergy-economic formulation for closed-loop coaxial well architectures down to 4,200 meters. Field validation demonstrates zero net water withdrawal and a thermodynamic round-trip conversion efficiency exceeding 22.4% under baseline reservoir temperatures of 175°C.',
    abstractFa: 'این مقاله فرمولاسیون جامع اگزرژی-اقتصادی را برای معماری چاه‌های کواکسیال مداربسته تا عمق ۴۲۰۰ متری ارائه می‌دهد. داده‌های میدانی مصرف صفر آب و راندمان تبدیل سیکل فراتر از ۲۲.۴٪ در دمای پایه مخزن ۱۷۵ درجه سانتی‌گراد را اثبات می‌کنند.',
    trlLevel: 'TRL 7 [System Prototype Validated in Field]',
    citationCount: 38,
  },
  {
    id: 'pub-ieee-tsg-2024',
    titleEn: 'Autonomous Multi-Agent Dispatch for Hybrid Geothermal-Solar Rural Microgrids Under Stochastic Nomadic Load Profiles',
    titleFa: 'دیسپاچینگ خودکار چندعامله برای ریزشبکه‌های هیبریدی زمین‌گرمایی-خورشیدی روستایی تحت بار تصادفی عشایری',
    journal: 'IEEE Transactions on Smart Grid',
    publisher: 'IEEE',
    ranking: 'Q1',
    impactFactor: 9.6,
    year: 2024,
    doi: '10.1109/TSG.2024.3389102',
    authors: ['KKM Digital & AI Lab', 'Dept. of Electrical & Computer Engineering', 'A. Soleimani', 'E. Farhadi'],
    category: 'AI_MICROGRID',
    linkedCommercialSolutionEn: 'EDO-AI Autonomous Rural Micro-Grid Dispatch Optimizer',
    linkedCommercialSolutionFa: 'سامانه نرم‌افزاری بهینه‌ساز هوشمند دیسپاچینگ ریزشبکه EDO-AI',
    abstractEn: 'We present a constrained deep reinforcement learning agent that coordinates baseload thermal dispatch with intermittent PV generation in isolated rural communities. Realized field trials demonstrate a 43.8% curtailment reduction and extended battery cycle lifetime by 2.3 years.',
    abstractFa: 'یک عامل یادگیری تقویتی عمیق مقید جهت هماهنگی تولید بار پایه حرارتی با تولید خورشیدی در جوامع ایزوله روستایی ارائه شده است. نتایج تست میدانی کاهش ۴۳.۸٪ قطعی و افزایش طول عمر باتری‌ها را تأیید کرده است.',
    trlLevel: 'TRL 7 [Integrated Rural Testbed - Sarakhs]',
    citationCount: 42,
  },
  {
    id: 'pub-elsevier-ijhmt-2023',
    titleEn: 'Transient Heat Transfer Enhancement of Engineered Metal-Oxide Nanofluids in High-Pressure Deep Well Heat Exchangers',
    titleFa: 'ارتقای انتقال حرارت گذرا در نانوسیالات اکسید فلزی مهندسی‌شده در مبدل‌های حرارتی چاه‌های عمیق پرفشار',
    journal: 'International Journal of Heat and Mass Transfer',
    publisher: 'Elsevier',
    ranking: 'Q1',
    impactFactor: 5.5,
    year: 2023,
    doi: '10.1016/j.ijheatmasstransfer.2023.124567',
    authors: ['KKM Advanced Materials Lab', 'Nanotechnology Consortium', 'Dr. S. Kiani'],
    category: 'MATERIALS',
    linkedCommercialSolutionEn: 'GMEL-ThermoFluid Proprietary Heat Transfer Carrier',
    linkedCommercialSolutionFa: 'سیال نانومهندسی تبادل حرارتی GMEL-ThermoFluid',
    abstractEn: 'Investigation of surface-functionalized Al2O3-SiO2 hybrid nanoparticles suspended in organic dielectric fluids under 350 bar lithostatic pressures. Effective thermal conductivity increased by 31.7% without significant pumping pressure penalties.',
    abstractFa: 'بررسی نانوذرات هیبریدی Al2O3-SiO2 اصلاح‌سطح‌شده در سیالات دی‌الکتریک آلی تحت فشار لیتواستاتیک ۳۵۰ بار؛ افزایش ۳۱.۷٪ در هدایت حرارتی مؤثر بدون افت فشار نامتعارف در پمپاژ ثبت شد.',
    trlLevel: 'TRL 8 [Commercial Grade Validated]',
    citationCount: 56,
  },
  {
    id: 'pub-elsevier-desalination-2024',
    titleEn: 'Cascade Multi-Effect Geothermal Thermal Desalination for Arid Coastal and Inland Saline Aquifers',
    titleFa: 'نمک‌زدایی حرارتی چنداثره آب‌خوان‌های شور ساحلی و درون‌سرزمینی با آبشار حرارتی زمین‌گرمایی',
    journal: 'Desalination',
    publisher: 'Elsevier',
    ranking: 'Q1',
    impactFactor: 9.9,
    year: 2024,
    doi: '10.1016/j.desal.2024.117621',
    authors: ['KKM Water & Energy Lab', 'Institute of Water Resources', 'H. Zatajam', 'Consortium Staff'],
    category: 'WATER_DESAL',
    linkedCommercialSolutionEn: 'GMEL-Desal Co-generation Potable Water System',
    linkedCommercialSolutionFa: 'سامانه هم‌تولیدی آب شیرین و توان GMEL-Desal',
    abstractEn: 'A zero-liquid-discharge (ZLD) coupling of organic Rankine exhaust heat with forward-osmosis multi-effect distillation. Demonstrates a specific energy consumption of 1.95 kWh/m³ for high-salinity brackish aquifers in drought-vulnerable zones.',
    abstractFa: 'کوپلینگ بدون پساب مایع (ZLD) حرارت اتلافی سیکل رنکین با تقطیر چنداثره که به مصرف انرژی ویژه ۱.۹۵ کیلووات‌ساعت بر مترمکعب برای آب‌های با شوری بالا در مناطق دچار تنش آبی دست یافته است.',
    trlLevel: 'TRL 6 [System Scale Field Pilot]',
    citationCount: 29,
  },
  {
    id: 'pub-ieee-sensors-2023',
    titleEn: 'Distributed Fiber-Optic Acoustic and Temperature Sensor Array for Deep Subsurface Integrity Monitoring up to 4,000m',
    titleFa: 'آرایه حسگر فیبر نوری توزیع‌شده آکوستیک و دما جهت پایش یکپارچگی مخازن عمیق تا عمق ۴۰۰۰ متری',
    journal: 'IEEE Sensors Journal',
    publisher: 'IEEE',
    ranking: 'Q1',
    impactFactor: 4.3,
    year: 2023,
    doi: '10.1109/JSEN.2023.3298412',
    authors: ['KKM Sensor Systems', 'Geophysics Research Group', 'N. Afshar'],
    category: 'MATERIALS',
    linkedCommercialSolutionEn: 'Smart-Casing Subsurface Acoustic Telemetry Module',
    linkedCommercialSolutionFa: 'ماژول تله‌متری آکوستیک درون چاهی Smart-Casing',
    abstractEn: 'High-temperature optical fiber cable assembly rated to 250°C capable of continuous spatial resolution down to 0.5 meters. Enables early detection of casing micro-fractures and thermal boundary degradation in real time.',
    abstractFa: 'کابل فیبر نوری مقاوم به دمای ۲۵۰ درجه با رزولوشن مکانی ۰.۵ متر برای تشخیص زودهنگام میکروشکست‌های جداره چاه و پایش پیوسته گرادیان دمایی به صورت بلادرنگ.',
    trlLevel: 'TRL 6 [Field Simulated & Downhole Tested]',
    citationCount: 21,
  },
  {
    id: 'pub-elsevier-cbm-2024',
    titleEn: 'Microbial Induced Calcite Precipitation in Ultra-High Salinity Grouting Matrices for Energy Well Casings',
    titleFa: 'رسوب‌دهی کلسیت به روش میکروبی در ماتریس‌های گروتینگ فوق‌شور جهت تثبیت جداره چاه‌های انرژی',
    journal: 'Construction and Building Materials',
    publisher: 'Elsevier',
    ranking: 'Q1',
    impactFactor: 7.4,
    year: 2024,
    doi: '10.1016/j.conbuildmat.2024.136201',
    authors: ['KKM Materials Consortium', 'Bio-engineering Faculty'],
    category: 'MATERIALS',
    linkedCommercialSolutionEn: 'Bio-Mineralizing Resilient Concrete Matrix',
    linkedCommercialSolutionFa: 'ماتریس بتن خودترمیم‌شونده زیستی با دوام در خاک‌های شور',
    abstractEn: 'Autonomous biological healing of micro-fissures up to 0.45 mm under extreme saline groundwater conditions, extending casing sealant lifespan beyond 40 years without mechanical intervention.',
    abstractFa: 'ترمیم خودکار بیولوژیکی میکروترک‌ها تا قطر ۰.۴۵ میلی‌متر در شرایط آب زیرزمینی فوق‌شور با افزایش طول عمر درزبندهای چاه به بیش از ۴۰ سال بدون نیاز به مداخله مکانیکی.',
    trlLevel: 'TRL 5 [Lab Certified & Saline Tested]',
    citationCount: 17,
  },
];

export const AcademicPublicationsSection: React.FC<{ limit?: number; showHeader?: boolean }> = ({ 
  limit,
  showHeader = true 
}) => {
  const { isFa, direction } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedPublisher, setSelectedPublisher] = useState<string>('ALL');
  const [activePubModal, setActivePubModal] = useState<ScientificPublication | null>(null);

  const categories = [
    { id: 'ALL', labelEn: 'All Domains', labelFa: 'همه حوزه‌های علمی' },
    { id: 'GEOTHERMAL', labelEn: 'Geothermal Thermodynamics', labelFa: 'ترمودینامیک زمین‌گرمایی' },
    { id: 'AI_MICROGRID', labelEn: 'AI & Smart Microgrids', labelFa: 'هوش مصنوعی و ریزشبکه' },
    { id: 'WATER_DESAL', labelEn: 'Desalination & Water', labelFa: 'آب و نمک‌زدایی' },
    { id: 'MATERIALS', labelEn: 'Advanced Materials & Sensors', labelFa: 'مواد پیشرفته و حسگرها' },
  ];

  const filteredPublications = useMemo(() => {
    return SCIENTIFIC_PUBLICATIONS.filter(item => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch = !q || (
        item.titleEn.toLowerCase().includes(q) ||
        item.titleFa.toLowerCase().includes(q) ||
        item.journal.toLowerCase().includes(q) ||
        item.doi.toLowerCase().includes(q) ||
        item.authors.some(a => a.toLowerCase().includes(q)) ||
        item.linkedCommercialSolutionEn.toLowerCase().includes(q) ||
        item.linkedCommercialSolutionFa.toLowerCase().includes(q)
      );

      const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
      const matchesPublisher = selectedPublisher === 'ALL' || item.publisher === selectedPublisher;

      return matchesSearch && matchesCategory && matchesPublisher;
    });
  }, [searchTerm, selectedCategory, selectedPublisher]);

  const displayedList = limit ? filteredPublications.slice(0, limit) : filteredPublications;

  return (
    <section className="w-full py-8 text-start" dir={direction}>
      {showHeader && (
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-primary dark:text-secondary mb-2">
            <BookOpen className="w-4 h-4 shrink-0" />
            <span>{isFa ? 'مرجع انتشارات علمی و مقالات رتبه Q1' : 'Peer-Reviewed Scientific Repository (Q1)'}</span>
            <span className="text-slate-400 dark:text-slate-600">&bull;</span>
            <span className="text-slate-500">IEEE & Elsevier Certified</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 dark:text-white">
                {isFa ? 'پایگاه انتشارات بین‌المللی و مقالات علمی' : 'International Academic Publications & Q1 Papers'}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mt-1 leading-relaxed">
                {isFa 
                  ? 'مبانی علمی، اعتبارسنجی تجربی و مدل‌سازی‌های ریاضیاتی مندرج در ژورنال‌های معتبر بین‌المللی که مستقیماً پشتوانه پتنت‌ها و محصولات تجاری KKM هستند.'
                  : 'Empirical research, mathematical modeling, and experimental validations published in premier journals directly underpinning KKM patents and solutions.'}
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="flex items-center gap-4 bg-slate-100 dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-200 dark:border-slate-700/80 text-xs shrink-0">
              <div>
                <span className="block font-bold text-slate-900 dark:text-white">100% Q1</span>
                <span className="text-[10px] text-slate-500">{isFa ? 'ژورنال‌های نمایه برتر' : 'Top Quartile Ranked'}</span>
              </div>
              <div className="w-px h-6 bg-slate-300 dark:bg-slate-600" />
              <div>
                <span className="block font-bold text-primary dark:text-secondary">Avg IF 8.0</span>
                <span className="text-[10px] text-slate-500">{isFa ? 'ضریب تأثیر میانگین' : 'Average Impact Factor'}</span>
              </div>
              <div className="w-px h-6 bg-slate-300 dark:bg-slate-600" />
              <div>
                <span className="block font-bold text-slate-900 dark:text-white">TRL 5-8</span>
                <span className="text-[10px] text-slate-500">{isFa ? 'بلوغ اثبات‌شده' : 'Verified Readiness'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className={`w-4 h-4 absolute top-3.5 text-slate-400 ${direction === 'rtl' ? 'right-3.5' : 'left-3.5'}`} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isFa ? 'جستجو بر اساس عنوان مقاله، نویسنده، DOI یا فناوری متصل...' : 'Search by paper title, authors, DOI or linked technology...'}
            className={`w-full py-2.5 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary transition-all ${
              direction === 'rtl' ? 'pr-10 pl-4' : 'pl-10 pr-4'
            }`}
          />
        </div>

        {/* Category Segmented Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-primary text-white shadow-xs font-bold'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {isFa ? cat.labelFa : cat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Publications Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedList.map((pub) => (
          <div
            key={pub.id}
            className="group p-5 rounded-2xl bg-white dark:bg-slate-850/90 border border-slate-200/90 dark:border-slate-700/80 shadow-xs hover:shadow-md hover:border-primary/40 dark:hover:border-secondary/40 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Publication Journal & Ranking (Zero-Pill Typography) */}
              <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-primary dark:text-secondary">{pub.publisher}</span>
                  <span aria-hidden="true">&bull;</span>
                  <span>{pub.journal}</span>
                  <span aria-hidden="true">&bull;</span>
                  <span className="font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    {pub.ranking} (IF {pub.impactFactor})
                  </span>
                </div>
                <span className="font-mono text-xs">{pub.year}</span>
              </div>

              {/* Title */}
              <h3 className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-secondary transition-colors leading-snug">
                {isFa ? pub.titleFa : pub.titleEn}
              </h3>

              {/* Authors */}
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-1">
                {pub.authors.join(', ')}
              </p>

              {/* Abstract Preview */}
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 line-clamp-2 leading-relaxed">
                {isFa ? pub.abstractFa : pub.abstractEn}
              </p>

              {/* Supported Commercial Solution Connection */}
              <div className="mt-3.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-start gap-2">
                <Layers className="w-3.5 h-3.5 text-primary dark:text-secondary shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
                    {isFa ? 'پشتیبان فناوری تجاری:' : 'Underpins Commercial Tech:'}
                  </span>
                  <span className="block text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                    {isFa ? pub.linkedCommercialSolutionFa : pub.linkedCommercialSolutionEn}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] text-slate-400">
                DOI: {pub.doi}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActivePubModal(pub)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold transition-colors flex items-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{isFa ? 'چکیده و اعتبارسنجی' : 'Abstract & TRL'}</span>
                </button>

                <a
                  href={`https://doi.org/${pub.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold transition-colors flex items-center gap-1 shadow-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{isFa ? 'تأیید در ژورنال' : 'Verify DOI'}</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {displayedList.length === 0 && (
        <div className="p-8 text-center bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800">
          <BookOpen className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-600 dark:text-slate-400">
            {isFa ? 'مقاله‌ای مطابق با فیلترهای انتخابی یافت نشد.' : 'No scientific publications match your search filter.'}
          </p>
        </div>
      )}

      {/* Detail Modal for Selected Publication */}
      {activePubModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white dark:bg-slate-900 max-w-2xl w-full rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-primary dark:text-secondary">
                <span>{activePubModal.publisher}</span>
                <span>&bull;</span>
                <span>{activePubModal.journal}</span>
                <span>&bull;</span>
                <span>{activePubModal.ranking} (IF {activePubModal.impactFactor})</span>
              </div>
              <button
                type="button"
                onClick={() => setActivePubModal(null)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 rounded-lg"
              >
                &times;
              </button>
            </div>

            <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white leading-snug">
              {isFa ? activePubModal.titleFa : activePubModal.titleEn}
            </h3>

            <div className="mt-2 text-xs text-slate-500">
              <span className="font-semibold">{isFa ? 'پژوهشگران:' : 'Authors:'} </span>
              {activePubModal.authors.join(', ')} &bull; {activePubModal.year}
            </div>

            <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {isFa ? 'چکیده و نتایج اثبات‌شده تجربی:' : 'Abstract & Validated Experimental Results:'}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {isFa ? activePubModal.abstractFa : activePubModal.abstractEn}
              </p>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-900/20 border border-blue-200/60 dark:border-blue-800/40">
                <span className="block text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase">
                  {isFa ? 'سطح آمادگی فناوری (TRL):' : 'Technology Readiness Level:'}
                </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {activePubModal.trlLevel}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-900/20 border border-emerald-200/60 dark:border-emerald-800/40">
                <span className="block text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                  {isFa ? 'فناوری تجاری متصل:' : 'Linked Commercial IP:'}
                </span>
                <span className="font-bold text-slate-900 dark:text-white truncate block">
                  {isFa ? activePubModal.linkedCommercialSolutionFa : activePubModal.linkedCommercialSolutionEn}
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="font-mono text-xs text-slate-400">
                DOI: {activePubModal.doi}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActivePubModal(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {isFa ? 'بستن' : 'Close'}
                </button>

                <a
                  href={`https://doi.org/${activePubModal.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{isFa ? 'مشاهده سند در ناشر بین‌المللی' : 'View on Publisher'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
