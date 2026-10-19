import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, ChevronRight, Play, Pause, MapPin, 
  ExternalLink, ArrowRight, ShieldCheck, Activity, 
  Layers, Zap, Droplets, Building2, CheckCircle2,
  Maximize2
} from 'lucide-react';
import { Page } from '../types';
import { useLanguage } from '../LanguageContext';
import { BrandWatermark } from './BrandWatermark';

export interface ProjectHighlight {
  id: string;
  nameEn: string;
  nameFa: string;
  subtitleEn: string;
  subtitleFa: string;
  locationEn: string;
  locationFa: string;
  sectorEn: string;
  sectorFa: string;
  statusEn: string;
  statusFa: string;
  trl: string;
  descriptionEn: string;
  descriptionFa: string;
  image: string;
  metrics: {
    labelEn: string;
    labelFa: string;
    value: string;
  }[];
  highlightsEn: string[];
  highlightsFa: string[];
  roleEn: string;
  roleFa: string;
}

export const PROJECT_HIGHLIGHTS: ProjectHighlight[] = [
  {
    id: 'qeshm-oil-terminal',
    nameEn: 'Qeshm Oil Terminal – Phase 1 (Onshore Infrastructure)',
    nameFa: 'پایانه نفتی قشم – فاز ۱ (زیرساخت خشکی)',
    subtitleEn: '3.24M-Barrel Storage Facility, Six API Tanks & ~22 km Pipelines',
    subtitleFa: 'تاسیسات ذخیره‌سازی ۳.۲۴ میلیون بشکه‌ای، شش مخزن API و ۲۲ کیلومتر خط لوله',
    locationEn: 'Qeshm Free Zone, Iran',
    locationFa: 'منطقه آزاد قشم، ایران',
    sectorEn: 'Storage Terminals / Pipeline Logistics / MEP Systems',
    sectorFa: 'مخازن ذخیره‌سازی / خطوط لوله / تاسیسات مکانیکی و برقی (MEP)',
    statusEn: 'Completed 2020 (Operational Handover)',
    statusFa: 'تکمیل‌شده در شهریور ۱۳۹۹ (تحویل عملیاتی)',
    trl: 'TRL 9',
    descriptionEn: 'Delivered comprehensive EPC for 3.24M-barrel storage facility, earthworks, civil works for six API tanks, ~22 km pipelines (16″ crude, 8″ seawater), and sustainable MEP systems with on-time operational handover.',
    descriptionFa: 'اجرای پروژه جامع مهندسی، تامین و ساخت (EPC) مخازن ۳.۲۴ میلیون بشکه‌ای، شش مخزن استاندارد API، حدود ۲۲ کیلومتر خط لوله ساحلی، تاسیسات MEP و سیستم‌های پایدار با تحویل به‌موقع در ۱۳۹۹.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { labelEn: 'Storage Capacity', labelFa: 'ظرفیت ذخیره‌سازی', value: '3.24M bbl' },
      { labelEn: 'Pipeline Network', labelFa: 'شبکه خطوط لوله', value: '~22 km' },
      { labelEn: 'API Tanks', labelFa: 'مخازن استاندارد API', value: '6 Tanks' }
    ],
    highlightsEn: [
      'Comprehensive EPC for six API-grade tanks, earthworks and pump stations',
      '22 km onshore pipelines (16″ crude oil, 8″ seawater) and utility corridors',
      'Sustainable MEP systems: firefighting, stormwater & oil-water separators'
    ],
    highlightsFa: [
      'اجرای جامع EPC برای ساخت شش مخزن استاندارد API، عملیات خاکی و ایستگاه‌های پمپاژ',
      'اجرای ۲۲ کیلومتر خطوط لوله خشکی (۱۶ اینچ نفت خام، ۸ اینچ آب دریا) و راهروهای تاسیساتی',
      'سیستم‌های پایدار MEP شامل اطفاء حریق، مدیریت رواناب و جداکننده‌های آب و روغن'
    ],
    roleEn: 'KKM International Group (EPC Contractor & Key Supplier)',
    roleFa: 'گروه بین‌المللی KKM (پیمانکار EPC و تأمین‌کننده کلیدی)'
  },
  {
    id: 'sarakhs-geothermal',
    nameEn: 'ICOFC Sarakhs Subsurface Geothermal Testbed',
    nameFa: 'پایلوت ژئوترمال عمیق سرخس (ICOFC)',
    subtitleEn: 'Closed-Loop Thermal Energy Extraction from Depleted Gas Wells',
    subtitleFa: 'استخراج حرارت مداربسته از چاه‌های بازنشسته گازی',
    locationEn: 'Sarakhs, Khorasan Basin',
    locationFa: 'سرخس، حوزه رسوبی خانگیران',
    sectorEn: 'Closed-Loop Geothermal (GMEL-CLG) / Baseload Power',
    sectorFa: 'زمین‌گرمایی مداربسته (GMEL) / برق بار پایه',
    statusEn: 'Field Validated (TRL 7)',
    statusFa: 'اعتبارسنجی میدانی (TRL 7)',
    trl: 'TRL 7',
    descriptionEn: 'Revolutionary retrofitting of high-enthalpy mature gas wells into zero-emission geothermal loops, producing 24/7 continuous baseload electricity and thermal energy.',
    descriptionFa: 'بازطراحی انقلابی چاه‌های بالغ گازی به سامانه‌های زمین‌گرمایی مداربسته بدون خروج سیال با تولید مداوم برق بار پایه و حرارت صنعتی.',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { labelEn: 'Thermal Potential', labelFa: 'پتانسیل حرارتی', value: '15 MWth' },
      { labelEn: 'Emissions', labelFa: 'میزان آلایندگی', value: '0 g/kWh' },
      { labelEn: 'Wellbore Depth', labelFa: 'عمق حفاری', value: '3,200 m' }
    ],
    highlightsEn: [
      'Patented downhole closed-loop casing heat exchanger',
      'High-performance nanofluid heat carrier formulation',
      'Distributed fiber-optic thermal and pressure logging'
    ],
    highlightsFa: [
      'مبدل حرارتی اختصاصی جداره‌ای درون‌چاهی تحت ثبت اختراع',
      'فرمولاسیون نانوسیال با ضریب هدایت حرارتی فوق‌العاده بالا',
      'حسگرهای فیبر نوری توزیع‌شده پایش بلادرنگ دما و فشار عمق مخزن'
    ],
    roleEn: 'Lead Subsurface Engineering & Technology Owner',
    roleFa: 'راهبر مهندسی زیرسطحی و مالک دانش فنی'
  },
  {
    id: 'tehran-lifesciences',
    nameEn: 'Tehran Advanced Life Sciences & Cleanrooms',
    nameFa: 'مرکز پیشرفته علوم زیستی و اتاق‌های تمیز تهران',
    subtitleEn: 'High-Tech Biotechnology & GMP Production Infrastructure',
    subtitleFa: 'زیرساخت پیشرفته زیست‌فناوری و تولید منطبق بر استانداردهای GMP',
    locationEn: 'Tehran Technology Corridor',
    locationFa: 'کریدور نوآوری و فناوری تهران',
    sectorEn: 'Biotech Infrastructure / R&D Cleanrooms',
    sectorFa: 'زیرساخت زیست‌فناوری / کلین‌روم صنعتی',
    statusEn: 'Commissioning & Pilot Batches',
    statusFa: 'راه‌اندازی و تولید پایلوت صنعتی',
    trl: 'TRL 8',
    descriptionEn: 'State-of-the-art laboratory and bioreactor pilot facilities engineered to bridge academic medical discoveries with certified commercial pharmaceutical production.',
    descriptionFa: 'مجموعه تخصصی آزمایشگاهی و خطوط بیوراکتوری مقیاس پایلوت جهت تجاری‌سازی دستاوردهای زیست‌پزشکی در استانداردهای جهانی داروسازی.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { labelEn: 'Cleanroom Area', labelFa: 'مساحت اتاق‌های تمیز', value: '4,500 m²' },
      { labelEn: 'Standard Tier', labelFa: 'سطح استاندارد', value: 'GMP Class A' },
      { labelEn: 'Incubation Units', labelFa: 'واحدهای انکوباسیون', value: '18 Units' }
    ],
    highlightsEn: [
      'Class 100 to 10,000 cleanroom cascades with HEPA filtration',
      'Automated batch monitoring and digital validation audit trails',
      'Integrated cold chain storage with temperature safeguards'
    ],
    highlightsFa: [
      'سلسله مراتب فضاهای تمیز کلاس ۱۰۰ تا ۱۰،۰۰۰ با فیلتراسیون HEPA',
      'سیستم ثبت خودکار بچ‌های فرآوری با ردپای دیجیتال معتبر',
      'زنجیره سرد یکپارچه با سامانه‌های حفاظتی چندلایه دمایی'
    ],
    roleEn: 'Engineering Design & Technology Partner',
    roleFa: 'طراح مهندسی و شریک فناوری صنعتی'
  },
  {
    id: 'qeshm-powerwater-mapna',
    nameEn: 'Power and Water Cogeneration Plant',
    nameFa: 'نیروگاه تولید همزمان برق و آب قشم',
    subtitleEn: '50 MW Power & 18,000 m³/day MED Desalination (Zero Safety Incidents)',
    subtitleFa: 'تاسیسات ۵۰ مگاوات برق و ۱۸،۰۰۰ مترمکعب آب‌شیرین‌کن با صفر حادثه ایمنی',
    locationEn: 'Qeshm Island, Iran',
    locationFa: 'جزیره قشم، ایران',
    sectorEn: 'Power & Thermal Desalination (MED) / Co-generation',
    sectorFa: 'تولید همزمان برق و آب‌شیرین‌کن حرارتی (MED)',
    statusEn: 'Completed (13-Month EPC Contract)',
    statusFa: 'تکمیل‌شده (قرارداد ۱۳ ماهه EPC)',
    trl: 'TRL 9',
    descriptionEn: 'Oversaw 50 MW power and 18,000 m³/day desalination plant, coordinating MEP elements (gas generators, HRSG boilers, MED systems) for on-budget delivery with zero safety incidents.',
    descriptionFa: 'نظارت بر احداث نیروگاه ۵۰ مگاوات و آب‌شیرین‌کن ۱۸،۰۰۰ مترمکعب در روز، هماهنگی کامل عناصر MEP (ژنراتورهای گاز، بویلرهای HRSG، واحدهای MED) و تحویل در بودجه با کارنامه صفر حادثه ایمنی.',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { labelEn: 'Power Output', labelFa: 'ظرفیت تولید برق', value: '50 MW' },
      { labelEn: 'MED Fresh Water', labelFa: 'تولید روزانه آب شیرین', value: '18k m³/d' },
      { labelEn: 'Safety Record', labelFa: 'کارنامه ایمنی', value: '0 Incidents' }
    ],
    highlightsEn: [
      'Gas generators, HRSG recovery boilers, and MED multi-effect distillation',
      'Flawless zero-safety-incident record across all delivery and commissioning phases',
      'Completed on-budget within 13-month EPC contract timeline'
    ],
    highlightsFa: [
      'هماهنگی یکپارچه ژنراتورهای گاز، بویلرهای بازیاب حرارت HRSG و سیستم‌های MED',
      'کارنامه افتخارآمیز صفر حادثه ایمنی در تمام مراحل اجرا و راه‌اندازی',
      'تحویل کامل منطبق بر بودجه و برنامه زمان‌بندی فشرده ۱۳ ماهه'
    ],
    roleEn: 'Mapna Qeshm Water & Power / KKM Lead MEP Coordinator',
    roleFa: 'شرکت تولید آب و برق مپنا قشم / هماهنگ‌کننده ارشد MEP گروه KKM'
  },
  {
    id: 'combined-cycle-qeshm',
    nameEn: 'Combined Cycle Power Plant',
    nameFa: 'نیروگاه سیکل ترکیبی قشم',
    subtitleEn: '500 MW Facility (2x170 MW Gas + 160 MW Steam) with Revit MEP',
    subtitleFa: 'تاسیسات ۵۰۰ مگاواتی (۲ توربین گاز ۱۷۰ مگاوات + توربین بخار ۱۶۰ مگاوات)',
    locationEn: 'Qeshm Island, Iran',
    locationFa: 'جزیره قشم، ایران',
    sectorEn: 'Combined Cycle Power Generation / Advanced MEP Systems',
    sectorFa: 'تولید برق سیکل ترکیبی / سامانه‌های پیشرفته MEP',
    statusEn: 'Ongoing (38-Month EPC Contract)',
    statusFa: 'در حال اجرا (قرارداد ۳۸ ماهه EPC)',
    trl: 'TRL 8',
    descriptionEn: 'Managed 500 MW facility with 2x170 MW gas turbines and 160 MW steam turbine, integrating MEP systems using Revit MEP for compliance with ISO standards and risk mitigation.',
    descriptionFa: 'مدیریت تاسیسات ۵۰۰ مگاواتی با ۲ توربین گاز ۱۷۰ مگاوات و یک توربین بخار ۱۶۰ مگاوات و یکپارچه‌سازی سیستم‌های MEP با استفاده از نرم‌افزار Revit MEP جهت انطباق با استانداردهای ایزو و کاهش ریسک.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { labelEn: 'Total Capacity', labelFa: 'ظرفیت کل نیروگاه', value: '500 MW' },
      { labelEn: 'Gas Turbines', labelFa: 'توربین‌های گازی', value: '2x170 MW' },
      { labelEn: 'Steam Turbine', labelFa: 'توربین بخار', value: '160 MW' }
    ],
    highlightsEn: [
      'Integrated MEP systems using Revit MEP preventing design clashes',
      'Strict adherence to ISO quality, environmental & safety standards',
      'Comprehensive risk mitigation and 38-month EPC project controls'
    ],
    highlightsFa: [
      'یکپارچه‌سازی سیستم‌های MEP با Revit MEP و رفع تداخلات پیش از اجرا',
      'انطباق دقیق با استانداردهای کیفیت، محیط زیست و ایمنی ISO',
      'مدیریت جامع ریسک و کنترل پروژه در چارچوب قرارداد ۳۸ ماهه EPC'
    ],
    roleEn: 'Energy Gostar Qeshm Company / KKM MEP Systems Integrator',
    roleFa: 'شرکت انرژی گستر قشم / یکپارچه‌ساز سیستم‌های MEP گروه KKM'
  },
  {
    id: 'meshkin-geothermal',
    nameEn: 'Meshkin Shahr Sabalan Geothermal Agro-Industrial Cluster',
    nameFa: 'مجتمع زمین‌گرمایی و صنایع تبدیلی کشاورزی مشگین‌شهر',
    subtitleEn: 'Deep Geothermal Baseload & Cascaded Thermal Agriculture',
    subtitleFa: 'انرژی بار پایه ژئوترمال و بهره‌برداری آبشاری در گلخانه‌های پیشرفته',
    locationEn: 'Sabalan Volcanic Geothermal Field, Meshkin Shahr',
    locationFa: 'میدان زمین‌گرمایی سبلان، مشگین‌شهر',
    sectorEn: 'Geothermal Baseload / Cascaded District Heating',
    sectorFa: 'زمین‌گرمایی عمیق / گرمایش منطقه‌ای آبشاری',
    statusEn: 'Technology Integration & Expansion',
    statusFa: 'تلفیق فناوری و توسعه زنجیره ارزش',
    trl: 'TRL 8',
    descriptionEn: 'Harnessing the immense volcanic heat reservoir of Mount Sabalan for continuous electricity generation and secondary district heating of year-round agro-greenhouses.',
    descriptionFa: 'بهره‌برداری از ذخیره عظیم حرارتی کوه سبلان برای تولید برق پاک مداوم و بهره‌برداری ثانویه در گرمایش مدرن‌ترین شهرک گلخانه‌ای منطقه.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { labelEn: 'Thermal Reservoir', labelFa: 'دمای مخزن ژئوترمال', value: '240°C' },
      { labelEn: 'Heated Greenhouses', labelFa: 'سطح گلخانه‌های گرم', value: '35 Ha' },
      { labelEn: 'Fuel Displacement', labelFa: 'صرفه‌جویی سوخت فسیلی', value: '18M m³' }
    ],
    highlightsEn: [
      'High-temperature Organic Rankine Cycle (ORC) power block',
      'Zero-carbon heating for extreme winter climate farming',
      'Integrated rural employment & cold-chain export logistics'
    ],
    highlightsFa: [
      'بلوک توربین ارگانیک رانکین (ORC) دما بالا برای تولید برق',
      'گرمایش بدون کربن گلخانه‌ها در سرمای منفی ۲۵ درجه کوهستانی',
      'ایجاد اشتغال پایدار محلی و اتصال به زنجیره صادراتی محصولات'
    ],
    roleEn: 'Turnkey Technology Provider & System Integrator',
    roleFa: 'تأمین‌کننده فناوری کلیددردست و یکپارچه‌ساز سامانه'
  }
];

interface ProjectHighlightsCarouselProps {
  setPage: (page: Page) => void;
  autoPlayInterval?: number; // default 5500 ms
}

const ProjectHighlightsCarousel: React.FC<ProjectHighlightsCarouselProps> = ({
  setPage,
  autoPlayInterval = 5500
}) => {
  const { isFa, direction } = useLanguage();
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(true);
  const [slideDirection, setSlideDirection] = React.useState<number>(1);
  const [progress, setProgress] = React.useState<number>(0);

  // Touch & Swipe state tracking
  const touchStartXRef = React.useRef<number | null>(null);
  const touchStartYRef = React.useRef<number | null>(null);
  const touchDeltaXRef = React.useRef<number>(0);
  const [isSwiping, setIsSwiping] = React.useState<boolean>(false);
  const carouselContainerRef = React.useRef<HTMLDivElement>(null);

  const totalSlides = PROJECT_HIGHLIGHTS.length;
  const currentProject = PROJECT_HIGHLIGHTS[currentIndex];

  // Navigation handlers
  const goToNext = React.useCallback(() => {
    setSlideDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  const goToPrev = React.useCallback(() => {
    setSlideDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  const goToIndex = React.useCallback((index: number) => {
    setSlideDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setProgress(0);
  }, [currentIndex]);

  const togglePlay = React.useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  // Decoupled Autoplay & Progress Timers to eliminate React state batching collisions
  React.useEffect(() => {
    if (!isPlaying || isSwiping) return;

    const autoplayTimer = setInterval(() => {
      goToNext();
    }, autoPlayInterval);

    return () => clearInterval(autoplayTimer);
  }, [isPlaying, isSwiping, autoPlayInterval, goToNext]);

  // Visual Progress Timer per active slide
  React.useEffect(() => {
    if (!isPlaying || isSwiping) {
      setProgress(0);
      return;
    }

    setProgress(0);
    const tickRate = 50;
    const increment = (tickRate / autoPlayInterval) * 100;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + increment;
      });
    }, tickRate);

    return () => clearInterval(progressTimer);
  }, [currentIndex, isPlaying, isSwiping, autoPlayInterval]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      if (direction === 'rtl') goToNext();
      else goToPrev();
    } else if (e.key === 'ArrowRight') {
      if (direction === 'rtl') goToPrev();
      else goToNext();
    } else if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      togglePlay();
    }
  };

  // Touch Handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
    touchDeltaXRef.current = 0;
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const touch = e.touches[0];
    const diffX = touch.clientX - touchStartXRef.current;
    const diffY = touch.clientY - touchStartYRef.current;

    // If horizontal motion exceeds vertical motion, track swipe
    if (Math.abs(diffX) > Math.abs(diffY)) {
      touchDeltaXRef.current = diffX;
    }
  };

  const handleTouchEnd = () => {
    if (!isSwiping) return;
    const deltaX = touchDeltaXRef.current;
    const swipeThreshold = 45; // pixels

    if (Math.abs(deltaX) > swipeThreshold) {
      if (direction === 'rtl') {
        // In RTL, dragging right (deltaX > 0) means going next, dragging left means going prev
        if (deltaX > 0) {
          goToNext();
        } else {
          goToPrev();
        }
      } else {
        // In LTR, dragging left (deltaX < 0) means going next, dragging right means going prev
        if (deltaX < 0) {
          goToNext();
        } else {
          goToPrev();
        }
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
    touchDeltaXRef.current = 0;
    setIsSwiping(false);
  };

  // Motion variants for smooth sliding
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    })
  };

  return (
    <div 
      id="kkm-project-highlights-carousel"
      ref={carouselContainerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={isFa ? 'کاروسل کانون‌های برجسته پروژه‌های KKM' : 'KKM Key Project Highlights Carousel'}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl text-white select-none outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
    >
      {/* Top Header Strip: Index Counter, Progress Indicator & Autoplay Controls */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 z-20 relative">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs font-mono font-bold tracking-widest text-secondary uppercase">
            {isFa ? 'ویترین پروژه‌های شاخص' : 'FLAGSHIP PROJECT HIGHLIGHTS'}
          </span>
          <span className="hidden sm:inline text-xs text-slate-500">|</span>
          <span className="hidden sm:inline text-xs text-slate-400 font-mono">
            {String(currentIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Active Status Pill */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/20 text-sky-300 text-[11px] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
            <span>{currentProject.trl}</span>
          </div>

          {/* Autoplay Play/Pause Toggle */}
          <button
            id="carousel-play-pause-btn"
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying 
              ? (isFa ? 'توقف پخش خودکار کاروسل' : 'Pause automatic carousel playback')
              : (isFa ? 'ادامه پخش خودکار کاروسل' : 'Resume automatic carousel playback')}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-secondary text-xs"
            title={isPlaying ? (isFa ? 'توقف' : 'Pause') : (isFa ? 'پخش' : 'Play')}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>
        </div>
      </div>

      {/* Progress Bar (Visual Timer) */}
      <div className="w-full h-1 bg-slate-800 relative z-20">
        <div 
          className="h-full bg-gradient-to-r from-secondary to-sky-400 transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Slide Stage */}
      <div className="relative min-h-[580px] lg:min-h-[520px] overflow-hidden flex flex-col justify-center">
        <AnimatePresence initial={false} custom={slideDirection} mode="wait">
          <motion.div
            key={currentProject.id}
            custom={slideDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full grid grid-cols-1 lg:grid-cols-12 relative"
          >
            {/* Left Content Column (7 cols on desktop) */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between z-10 bg-gradient-to-b lg:bg-gradient-to-r from-slate-950 via-slate-900 to-slate-900/90 order-2 lg:order-1">
              
              <div className="space-y-4">
                {/* Sector & Location Metadata */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
                  <span className="px-3 py-1 rounded-full bg-secondary/15 text-secondary font-bold uppercase tracking-wider">
                    {isFa ? currentProject.sectorFa : currentProject.sectorEn}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-secondary" />
                    <span>{isFa ? currentProject.locationFa : currentProject.locationEn}</span>
                  </span>
                  <span className="text-slate-500 font-medium">
                    • {isFa ? currentProject.statusFa : currentProject.statusEn}
                  </span>
                </div>

                {/* Project Title & Subtitle */}
                <div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white leading-tight mb-2">
                    {isFa ? currentProject.nameFa : currentProject.nameEn}
                  </h3>
                  <p className="text-sm sm:text-base text-secondary/90 font-medium">
                    {isFa ? currentProject.subtitleFa : currentProject.subtitleEn}
                  </p>
                </div>

                {/* Narrative Description */}
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                  {isFa ? currentProject.descriptionFa : currentProject.descriptionEn}
                </p>

                {/* Metrics Triad */}
                <div className="grid grid-cols-3 gap-3 pt-2 pb-1">
                  {currentProject.metrics.map((m, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                      <span className="block text-lg sm:text-xl font-mono font-black text-white">
                        {m.value}
                      </span>
                      <span className="block text-[11px] text-slate-400 truncate mt-0.5">
                        {isFa ? m.labelFa : m.labelEn}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Technical Highlights Checklist */}
                <div className="space-y-1.5 pt-1">
                  {(isFa ? currentProject.highlightsFa : currentProject.highlightsEn).map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Action Buttons & KKM Role */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6">
                <div className="text-xs text-slate-400">
                  <span className="text-slate-500 font-semibold">{isFa ? 'نقش KKM:' : 'Role:'}</span>{' '}
                  <span className="font-bold text-slate-200">{isFa ? currentProject.roleFa : currentProject.roleEn}</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    id={`view-spec-${currentProject.id}`}
                    type="button"
                    onClick={() => setPage(Page.EvidenceRegistry)}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors border border-white/15 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
                    <span>{isFa ? 'شواهد و مشخصات فنی' : 'Verified Evidence & Specs'}</span>
                  </button>

                  <button
                    id={`explore-proj-${currentProject.id}`}
                    type="button"
                    onClick={() => setPage(Page.Projects)}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-full bg-secondary hover:bg-white text-primary-dark font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-secondary/20 cursor-pointer active:scale-95"
                  >
                    <span>{isFa ? 'مشاهده کلیه پروژه‌ها' : 'Explore All Projects'}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </button>
                </div>
              </div>

            </div>

            {/* Right Visual Image Column (5 cols on desktop) */}
            <div className="lg:col-span-5 relative h-64 sm:h-80 lg:h-auto overflow-hidden order-1 lg:order-2 bg-slate-950">
              {/* Background Project Image */}
              <img
                src={currentProject.image}
                alt={isFa ? currentProject.nameFa : currentProject.nameEn}
                width={1200}
                height={800}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform scale-105 hover:scale-100 transition-transform duration-1000 ease-out"
                loading="eager"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-slate-950/20 lg:to-slate-950 pointer-events-none" />

              {/* Translucent Brand Watermark (Compliance: Opacity 10-15% overlay) */}
              <BrandWatermark position="bottom-right" size="lg" className="hidden sm:block" />

              {/* Floating Badge on Image */}
              <div className="absolute top-4 end-4 z-10 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-white text-xs font-mono font-semibold flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-secondary" />
                <span>{currentProject.id.toUpperCase()}</span>
              </div>

              {/* Quick Jump Prompt for Touch */}
              <div className="absolute bottom-4 start-4 z-10 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] text-slate-300 flex items-center gap-1.5 lg:hidden">
                <span>{isFa ? 'برای ورق زدن به چپ یا راست بکشید' : 'Swipe left/right to browse'}</span>
              </div>

              {/* Desktop Floating Next / Prev Navigation Buttons (Strictly positioned on media column - zero text interference) */}
              <div className="absolute bottom-4 end-4 z-20 hidden sm:flex items-center gap-2">
                <button
                  id="carousel-prev-btn"
                  type="button"
                  onClick={goToPrev}
                  aria-label={isFa ? 'پروژه قبلی' : 'Previous project'}
                  className="w-10 h-10 rounded-full bg-slate-950/80 hover:bg-secondary hover:text-primary-dark text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all shadow-xl focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer active:scale-95"
                  title={isFa ? 'پروژه قبلی' : 'Previous project'}
                >
                  {direction === 'rtl' ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                </button>
                <button
                  id="carousel-next-btn"
                  type="button"
                  onClick={goToNext}
                  aria-label={isFa ? 'پروژه بعدی' : 'Next project'}
                  className="w-10 h-10 rounded-full bg-slate-950/80 hover:bg-secondary hover:text-primary-dark text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all shadow-xl focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer active:scale-95"
                  title={isFa ? 'پروژه بعدی' : 'Next project'}
                >
                  {direction === 'rtl' ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </button>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Thumbnail Bar & Dots Navigation */}
      <div className="px-6 py-4 bg-slate-950 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 z-20 relative">
        {/* Thumbnails / Pills for each project */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0 no-scrollbar">
          {PROJECT_HIGHLIGHTS.map((proj, idx) => {
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={proj.id}
                id={`carousel-nav-dot-${idx}`}
                type="button"
                onClick={() => goToIndex(idx)}
                aria-label={isFa ? `مشاهده پروژه ${idx + 1}: ${proj.nameFa}` : `Go to slide ${idx + 1}: ${proj.nameEn}`}
                aria-current={isCurrent ? 'true' : 'false'}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
                  isCurrent
                    ? 'bg-secondary text-primary-dark border-secondary shadow-md scale-105'
                    : 'bg-white/5 hover:bg-white/10 text-slate-400 border-white/10'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isCurrent ? 'bg-primary-dark' : 'bg-slate-500'}`} />
                <span className="hidden md:inline truncate max-w-[140px]">
                  {isFa ? proj.nameFa.split(' ')[0] + ' ' + (proj.nameFa.split(' ')[1] || '') : proj.nameEn.split(' ')[0] + ' ' + (proj.nameEn.split(' ')[1] || '')}
                </span>
                <span className="md:hidden font-mono text-[11px]">{idx + 1}</span>
              </button>
            );
          })}
        </div>

        {/* Convenient Arrow Navigation Controls */}
        <div className="flex items-center gap-2">
          <button
            id="carousel-bottom-prev-btn"
            type="button"
            onClick={goToPrev}
            aria-label={isFa ? 'پروژه قبلی' : 'Previous project'}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-secondary hover:text-primary-dark text-slate-300 hover:text-white flex items-center justify-center border border-white/10 transition-colors cursor-pointer active:scale-95"
            title={isFa ? 'پروژه قبلی' : 'Previous project'}
          >
            {direction === 'rtl' ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          <span className="text-xs text-slate-400 font-mono px-1">
            {currentIndex + 1} / {totalSlides}
          </span>
          <button
            id="carousel-bottom-next-btn"
            type="button"
            onClick={goToNext}
            aria-label={isFa ? 'پروژه بعدی' : 'Next project'}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-secondary hover:text-primary-dark text-slate-300 hover:text-white flex items-center justify-center border border-white/10 transition-colors cursor-pointer active:scale-95"
            title={isFa ? 'پروژه بعدی' : 'Next project'}
          >
            {direction === 'rtl' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Action Link to Full Projects Registry */}
        <button
          id="view-all-projects-carousel-btn"
          type="button"
          onClick={() => setPage(Page.Projects)}
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-secondary hover:text-white transition-colors"
        >
          <span>{isFa ? 'فهرست کامل پروژه‌ها و نقشه استقرار' : 'All Projects & Global Footprint'}</span>
          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
        </button>
      </div>

    </div>
  );
};

export default ProjectHighlightsCarousel;
