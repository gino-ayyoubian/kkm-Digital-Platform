import * as React from 'react';
import { useLanguage } from '../../LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Droplets, 
  Sprout, 
  Factory, 
  Compass, 
  Cpu, 
  Filter, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  MapPin, 
  TrendingUp,
  Coins,
  ShieldCheck,
  X
} from 'lucide-react';

export interface RuralProjectModel {
  id: string;
  category: 'Energy' | 'Water' | 'Agriculture' | 'Industry' | 'Nomadic' | 'Digital';
  titleEn: string;
  titleFa: string;
  archetypeEn: string;
  archetypeFa: string;
  descEn: string;
  descFa: string;
  integratedElementsEn: string[];
  integratedElementsFa: string[];
  specs: {
    labelEn: string;
    labelFa: string;
    val: string;
  }[];
  capexStructureEn: string;
  capexStructureFa: string;
  impactEn: string;
  impactFa: string;
  badgeColor: string;
}

interface RuralProjectExplorerProps {
  onSelectForPilot?: (projectModelTitle: string) => void;
}

export const RuralProjectExplorer: React.FC<RuralProjectExplorerProps> = ({ onSelectForPilot }) => {
  const { language, direction } = useLanguage();
  const isFa = language === 'FA';

  const [activeCategory, setActiveCategory] = React.useState<string>('All');
  const [selectedProject, setSelectedProject] = React.useState<RuralProjectModel | null>(null);

  const categories = [
    { id: 'All', labelEn: 'All Integrated Models', labelFa: 'همه الگوهای یکپارچه' },
    { id: 'Energy', labelEn: 'Energy & Microgrids', labelFa: 'انرژی و ریزشبکه‌ها', icon: Zap },
    { id: 'Water', labelEn: 'Water & Desalination', labelFa: 'آب و نمک‌زدایی', icon: Droplets },
    { id: 'Agriculture', labelEn: 'Smart Agriculture', labelFa: 'کشاورزی هوشمند', icon: Sprout },
    { id: 'Industry', labelEn: 'Agro-Processing & Cold Chain', labelFa: 'فرآوری و سردخانه', icon: Factory },
    { id: 'Nomadic', labelEn: 'Nomadic Mobile Systems', labelFa: 'سامانه‌های سیار عشایری', icon: Compass },
    { id: 'Digital', labelEn: 'AI & Telemetry', labelFa: 'هوش مصنوعی و تله‌متری', icon: Cpu }
  ];

  const projectModels: RuralProjectModel[] = [
    {
      id: 'energy-village-agrivoltaic',
      category: 'Energy',
      titleEn: 'Productive Energy Village (Agrivoltaics & Microgrid)',
      titleFa: 'دهکده انرژی و تولید مولد (اگرولتائیک و ریزشبکه)',
      archetypeEn: 'Arid / Semi-Arid Agricultural Basins',
      archetypeFa: 'حوزه‌های کشاورزی مناطق خشک و نیمه‌خشک',
      descEn: 'Dual-use land architecture combining elevated bifacial solar arrays with shade-tolerant medicinal plants, centralized battery energy storage (BESS), and an autonomous microgrid providing 24/7 power to surrounding village farms.',
      descFa: 'طراحی دوکاربردی اراضی با نصب پنل‌های خورشیدی دوطرفه مرتفع بالای مزارع، کشت گیاهان دارویی سایه‌دوست زیر پنل‌ها، باتری ذخیره‌ساز متمرکز، و ریزشبکه تأمین برق ۲۴ساعته مزارع و روستا.',
      integratedElementsEn: [
        'Elevated bifacial solar structures (2.8m clearance)',
        'Central lithium ferro phosphate (LFP) BESS container',
        'Substation microgrid sync controller',
        'Shaded drip fertigation under modules'
      ],
      integratedElementsFa: [
        'سازه‌های مرتفع فتوولتائیک ۲.۸ متری مناسب عبور ادوات',
        'کانتینر ذخیره‌ساز باتری LFP برای ساعات اوج و شب',
        'کنترل‌کننده مرکزی هوشمند ریزشبکه مستقل از شبکه سراسری',
        'سامانه آبیاری قطره‌ای تغذیه‌شونده در زیر پنل‌ها'
      ],
      specs: [
        { labelEn: 'Capacity', labelFa: 'ظرفیت تولید برق', val: '1.2 MWp PV + 2 MWh BESS' },
        { labelEn: 'Water Saving', labelFa: 'کاهش تبخیر سطحی خاک', val: '32% Soil Moisture Gain' },
        { labelEn: 'Footprint', labelFa: 'مساحت تحت پوشش', val: '2.5 Hectares Dual-Use' },
        { labelEn: 'Direct Employment', labelFa: 'اشتغال پایدار', val: '18 Local Technical Staff' }
      ],
      capexStructureEn: 'Blended Finance PPP: 40% Green Infra Facility, 40% Commercial Debt, 20% Local Cooperative Equity.',
      capexStructureFa: 'تأمین مالی ترکیبی PPP: ۴۰٪ تسهیلات زیرساخت سبز، ۴۰٪ وام تجاری، ۲۰٪ آورده تعاونی محلی.',
      impactEn: 'Eliminates grid power outages during summer peak, stabilizing $400k/year in crop yields.',
      impactFa: 'حذف کامل قطعی برق در اوج بار تابستان و تثبیت سالانه بیش از ۴۰۰ هزار دلار محصول مزارع.',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30'
    },
    {
      id: 'water-desal-nexus',
      category: 'Water',
      titleEn: 'Solar-Powered Brackish Desalination Hub (BWRO)',
      titleFa: 'هاب نمک‌زدایی و شیرین‌سازی خورشیدی آب لب‌شور (BWRO)',
      archetypeEn: 'Saline Soil Depressions & Inland Salt Basins',
      archetypeFa: 'جلگه‌ها و دشت‌های با آبخوان‌های شور و لب‌شور',
      descEn: 'Containerized brackish water reverse osmosis powered 100% by a dedicated off-grid solar field, featuring thermodynamic heat recovery, energy recovery devices (ERD), and evaporation crystallizer brine management.',
      descFa: 'سامانه کانتینری اسمز معکوس آب لب‌شور با تغذیه ۱۰۰٪ از مزرعه خورشیدی اختصاصی، مجهز به ریکاوری انرژی فشار (ERD) و حوضچه‌های تبخیر جهت مدیریت پساب و تولید نمک تجاری.',
      integratedElementsEn: [
        'Containerized 500 m³/day BWRO unit with 82% recovery rate',
        'Variable-frequency drive (VFD) solar well pumps',
        'Zero Liquid Discharge (ZLD) modular evaporation trays',
        'Pressurized potable + agricultural distribution header'
      ],
      integratedElementsFa: [
        'کانتینر استاندارد تصفیه ۵۰۰ مترمکعب در روز با بازیافت ۸۲٪',
        'پمپ‌های شناور خورشیدی چاه با درایو کنترل فرکانس متغیر',
        'حوضچه‌های مدولار تبخیر و تثبیت پساب بدون تخلیه به محیط',
        'خط لوله تحت فشار مجزا برای آب شرب و کشاورزی گلخانه‌ای'
      ],
      specs: [
        { labelEn: 'Permeate Output', labelFa: 'آب تصفیه‌شده تولیدی', val: '500,000 L / Day' },
        { labelEn: 'Energy Consumption', labelFa: 'مصرف انرژی ویژه', val: '1.9 kWh / m³ treated' },
        { labelEn: 'Raw Salinity', labelFa: 'شوری آب ورودی', val: '6,500 ppm TDS -> 250 ppm' },
        { labelEn: 'Service Coverage', labelFa: 'جمعیت و اراضی زیر پوشش', val: '3 Villages + 40 Greenhouse Units' }
      ],
      capexStructureEn: 'Build-Own-Operate-Transfer (BOOT) concession with municipal water authority & farm consortium.',
      capexStructureFa: 'قرارداد ساخت، بهره‌برداری و واگذاری (BOOT) با آبفای روستایی و کنسرسیوم کشاورزان.',
      impactEn: 'Restores drinking water sovereignty to 3,200 residents and irrigates 12 hectares of greenhouses.',
      impactFa: 'تأمین کامل آب شرب بهداشتی ۳۲۰۰ نفر و سیراب‌سازی ۱۲ هکتار گلخانه با بهره‌وری اقتصادی بالا.',
      badgeColor: 'text-sky-400 bg-sky-500/10 border-sky-500/30'
    },
    {
      id: 'smart-greenhouse-cluster',
      category: 'Agriculture',
      titleEn: 'Climate-Adaptive Solar Greenhouse Cluster',
      titleFa: 'مجتمع گلخانه‌ای اقلیم‌سازگار با انرژی خورشیدی',
      archetypeEn: 'Water-Stressed Valleys & High Evaporation Zones',
      archetypeFa: 'دشت‌های با تنش شدید آبی و تبخیر بالا',
      descEn: 'Engineered high-tech polycarbonate greenhouse bays with integrated rooftop PV, geothermal ground-loop heating/cooling, automated climate telemetry, closed-loop hydroponics, and high-value export crop certification.',
      descFa: 'گلخانه‌های مدرن پلی‌کربنات با پنل‌های یکپارچه سقفی، سیستم سرمایش/گرمایش زمین‌گرمایی زیرسطحی، تله‌متری خودکار اقلیم، هیدروپونیک بسته بدون هدررفت و استانداردهای صادراتی.',
      integratedElementsEn: [
        'Semi-transparent BIPV greenhouse roof sections',
        'Subsurface ground heat exchanger (Geo-cooling)',
        'Closed-circuit recirculating hydroponic fertigation',
        'Automated shading curtains & misting atomizers'
      ],
      integratedElementsFa: [
        'بخش‌های نیمه‌شفاف فتوولتائیک سقف گلخانه جهت سایه‌دهی بهینه',
        'مبدل‌های حرارتی زیرسطحی زمین‌گرمایی (سرمایش اقلیمی)',
        'مدار بسته بازچرخانی آب و کود با صرفه‌جویی ۹۰ درصدی',
        'پرده‌های حرارتی خودکار و مه‌پاش‌های فوق ریز التراسونیک'
      ],
      specs: [
        { labelEn: 'Water Efficiency', labelFa: 'صرفه‌جویی در مصرف آب', val: '88% vs Open Field' },
        { labelEn: 'Yield Multiplier', labelFa: 'افزایش تناژ محصول', val: '4.8x per m²' },
        { labelEn: 'Annual Crop Cycles', labelFa: 'تعداد دوره‌های برداشت', val: '3 Cycles / Year' },
        { labelEn: 'Target Crops', labelFa: 'محصولات اصلی', val: 'Export Capsicum, Berries, Saffron' }
      ],
      capexStructureEn: 'Agricultural Development Bank subsidized facility + Cooperative equity matching.',
      capexStructureFa: 'تسهیلات یارانه‌ای بانک کشاورزی و صندوق توسعه + مشارکت سرمایه در گردش تعاونی.',
      impactEn: 'Multiplies farmer annual income by 4x while cutting water consumption by 88%.',
      impactFa: 'افزایش ۴ برابری درآمد سالانه کشاورزان هم‌زمان با کاهش ۸۸ درصدی مصرف آب شیرین.',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
    },
    {
      id: 'agro-processing-coldchain',
      category: 'Industry',
      titleEn: 'Decentralized Agro-Processing & Solar Cold Chain Hub',
      titleFa: 'مرکز فرآوری، سورتینگ و سردخانه خورشیدی چندمداره',
      archetypeEn: 'Fruit, Date, Nut & Medicinal Herb Production Belts',
      archetypeFa: 'قطب‌های تولید خرما، میوه، خشکبار و گیاهان دارویی',
      descEn: 'On-site post-harvest processing facility situated at farm-gate: solar-powered cold rooms (-18°C to +4°C), industrial dehydration tunnels, optical sorting tables, and standardized modified atmosphere packaging (MAP).',
      descFa: 'تأسیسات فرآوری پس از برداشت در سر مزارع: سردخانه خورشیدی دومداره (زیر و بالای صفر)، تونل‌های خشک‌کن صنعتی با بخار خورشیدی، خط سورتینگ نوری و بسته‌بندی در اتمسفر اصلاح‌شده.',
      integratedElementsEn: [
        'Multi-temperature solar-hybrid cold storage (200 tonnes)',
        'Solar thermal vacuum dehydration drying tunnels',
        'Automatic optical weight & color grading line',
        'Cleanroom hygienic packaging with barcode traceability'
      ],
      integratedElementsFa: [
        'سردخانه خورشیدی هیبریدی ۲۰۰ تنی با دمای کنترل‌شده',
        'تونل‌های خشک‌کن وکیوم با گرمایش خورشیدی برای گیاهان دارویی',
        'خط سورتینگ و درجه‌بندی خودکار وزنی و رنگی',
        'بسته‌بندی بهداشتی استاندارد با کد رهگیری و شناسنامه کیفی'
      ],
      specs: [
        { labelEn: 'Storage Volume', labelFa: 'ظرفیت ذخیره‌سازی سردخانه', val: '200 Tonnes Multi-Chamber' },
        { labelEn: 'Waste Reduction', labelFa: 'کاهش ضایعات پس از برداشت', val: 'From 35% Down to 4%' },
        { labelEn: 'Value Addition', labelFa: 'ارزش افزوده فرآوری', val: '+280% vs Raw Sale' },
        { labelEn: 'Export Readiness', labelFa: 'استاندارد بهداشتی صادرات', val: 'HACCP & ISO 22000 Compliant' }
      ],
      capexStructureEn: 'Equipment lease model with farmer revenue share, amortized over 7 years.',
      capexStructureFa: 'مدل لیزینگ تجهیزات با سهم‌بری از درآمد فرآوری با دوره استهلاک ۷ ساله.',
      impactEn: 'Eliminates distress selling at harvest; enables farmers to hold inventory for off-season premium prices.',
      impactFa: 'پایان حراج اجباری محصولات در زمان برداشت و امکان عرضه تدریجی با بالاترین بهای فصلی.',
      badgeColor: 'text-orange-400 bg-orange-500/10 border-orange-500/30'
    },
    {
      id: 'nomadic-mobile-kit',
      category: 'Nomadic',
      titleEn: 'Mobile Nomadic Pastoral Support Infrastructure',
      titleFa: 'بسته زیرساخت سیار جامعه عشایری (انرژی، آب و سلامت دام)',
      archetypeEn: 'Seasonal Migration Routes & Remote Pastoral Highlands',
      archetypeFa: 'مسیرهای کوچ ییلاق-قشلاق و مراتع کوهستانی دوردست',
      descEn: 'Deployable modular solutions designed for nomadic communities: foldable rugged solar power packs, trailer-mounted milk cooling tanks, portable membrane drinking filtration, and satellite GPS herd tracking collaring.',
      descFa: 'بسته‌های مدولار قابل حمل ویژه جامعه عشایری: ژنراتورهای خورشیدی تاشوی ضدضربه، مخزن سیار خنک‌کننده شیر روی تریلر، فیلتراسیون آب شرب غشایی سیار، و ردیاب ماهواره‌ای گله.',
      integratedElementsEn: [
        'Foldable lightweight 500W PV backpacks + LiFePO4 battery pack',
        'Mobile 1,000L milk cooling trailer with solar DC refrigeration',
        'Ultrafiltration gravity-driven drinking water purifier kit',
        'Solar satellite communicators & LoRa livestock health tags'
      ],
      integratedElementsFa: [
        'ژنراتورهای خورشیدی تاشو ۵۰۰ وات با باطری سبک ضدآب',
        'تانکر سیار خنک‌کننده شیر ۱۰۰۰ لیتری خورشیدی روی تریلر',
        'دستگاه فیلتراسیون اولترافیلتراسیون سیار برای آب چشمه و رودخانه',
        'سامانه ارتباط ماهواره‌ای خورشیدی و ردیاب هوشمند دام'
      ],
      specs: [
        { labelEn: 'Mobility', labelFa: 'قابلیت حمل و جابه‌جایی', val: 'Foldable / Vehicle-Towed' },
        { labelEn: 'Milk Spoilage Prevention', labelFa: 'جلوگیری از فساد شیر خام', val: '99% Raw Milk Chilled to 4°C' },
        { labelEn: 'Water Sanitation', labelFa: 'تصفیه آب آشامیدنی', val: '1,200 L / Day per clan unit' },
        { labelEn: 'Off-Grid Autonomy', labelFa: 'تاب‌آوری در کوچ', val: '100% Autonomous Solar' }
      ],
      capexStructureEn: 'Nomadic Affairs Organization development grants + tribal cooperative co-investment.',
      capexStructureFa: 'اعتبارات ویژه سازمان امور عشایر + آورده مشارکتی تعاونی‌های عشایری.',
      impactEn: 'Connects pastoral producers directly to dairy industrial buyers, doubling milk purchase revenue.',
      impactFa: 'اتصال مستقیم دامداران عشایر به کارخانجات لبنی و دوبرابر شدن درآمد فروش شیر خام.',
      badgeColor: 'text-violet-400 bg-violet-500/10 border-violet-500/30'
    },
    {
      id: 'digital-basin-twin',
      category: 'Digital',
      titleEn: 'Digital Basin Twin & Rural Telemetry Grid',
      titleFa: 'دوقلوی دیجیتال حوضه و شبکه تله‌متری هوشمند روستایی',
      archetypeEn: 'Multi-Village Catchment Areas & Shared Aquifers',
      archetypeFa: 'حوزه‌های آبریز چندروستایی و آبخوان‌های مشترک',
      descEn: 'Decentralized IoT sensing backbone deploying long-range LoRaWAN telemetry to measure soil moisture at 3 depths, monitor groundwater well extraction rates, track cold storage temperatures, and feed predictive AI dispatch models.',
      descFa: 'شبکه حسگرهای IoT با فناوری برد بلند LoRaWAN برای سنجش رطوبت خاک در ۳ عمق، مانیتورینگ برداشت از چاه‌ها، پایش دمای سردخانه‌ها، و خوراک‌دهی به هوش مصنوعی دوقلوی دیجیتال.',
      integratedElementsEn: [
        'Multi-depth LoRaWAN soil tensiometer and salinity probes',
        'Smart ultrasonic well flow meters with automatic shutoff',
        'Centralized cloud-native dashboard with alert dispatching',
        'Predictive aquifer draw-down simulation models'
      ],
      integratedElementsFa: [
        'سنسورهای بی‌سیم پایش رطوبت، دما و هدایت الکتریکی خاک',
        'کنتورهای هوشمند التراسونیک چاه کشاورزی با قطع اضطراری',
        'داشبورد برخط دوقلوی دیجیتال با سامانه‌های هشدار پیامکی',
        'مدل‌های پیش‌بینانه افت سفره‌های زیرزمینی با هوش مصنوعی'
      ],
      specs: [
        { labelEn: 'Telemetry Nodes', labelFa: 'تعداد حسگرهای پایش', val: '120 Active Sensor Points' },
        { labelEn: 'Transmission Range', labelFa: 'برد شبکه بی‌سیم', val: 'Up to 18 km LoRaWAN' },
        { labelEn: 'Over-Pumping Reduction', labelFa: 'مهار اضافه برداشت آب', val: '24% Net Aquifer Savings' },
        { labelEn: 'Operational Uptime', labelFa: 'پایداری شبکه داده', val: '99.8% with Solar Backup' }
      ],
      capexStructureEn: 'Platform SaaS + Smart Infrastructure co-funding by regional water boards.',
      capexStructureFa: 'مدل اشتراک نرم‌افزاری و پلتفرمی + مشارکت شرکت‌های آب منطقه‌ای.',
      impactEn: 'Prevents catastrophic aquifer collapse while ensuring optimal crop irrigation timing.',
      impactFa: 'جلوگیری از فرونشست زمین و تخریب آبخوان همراه با تضمین حداکثر راندمان کشاورزی.',
      badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30'
    }
  ];

  const filteredProjects = activeCategory === 'All' 
    ? projectModels 
    : projectModels.filter(p => p.category === activeCategory);

  const handleProposePilot = (modelTitle: string) => {
    if (onSelectForPilot) {
      onSelectForPilot(modelTitle);
    } else {
      const el = document.getElementById('pilot-intake-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="project-explorer" className="py-20 bg-slate-950 text-white relative border-b border-slate-800">
      {/* Background accents */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-mono font-bold text-emerald-400 mb-2 block">
            {isFa ? 'کاوشگر الگوهای پروژه‌ای KKM (معماری ۱۰.۲۲)' : 'KKM INTEGRATED RURAL PROJECT TEMPLATES (10.22)'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white mb-4">
            {isFa 
              ? 'الگوها و تیپ‌های پروژه‌ای توسعه روستایی و عشایری' 
              : 'Rural & Nomadic Project Types Explorer'}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {isFa 
              ? 'نمونه‌های مهندسی‌شده از ترکیب انرژی، آب، کشاورزی و صنایع فرآوری در قالب بسته‌های بانکی، مقیاس‌پذیر و آزموده شده.' 
              : 'Engineered configurations integrating energy, water, precision agriculture and processing into bankable, repeatable rural templates.'}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map(cat => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  isActive 
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold' 
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-emerald-400'}`} />}
                <span>{isFa ? cat.labelFa : cat.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-emerald-950/20 group"
            >
              <div>
                {/* Badge Category & Archetype */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border ${project.badgeColor}`}>
                    {project.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono truncate max-w-[150px]" title={isFa ? project.archetypeFa : project.archetypeEn}>
                    {isFa ? project.archetypeFa : project.archetypeEn}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors mb-2 leading-snug">
                  {isFa ? project.titleFa : project.titleEn}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-300 line-clamp-3 mb-5 leading-relaxed">
                  {isFa ? project.descFa : project.descEn}
                </p>

                {/* Key Specifications Grid */}
                <div className="grid grid-cols-2 gap-2 bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 mb-5">
                  {project.specs.slice(0, 2).map((spec, i) => (
                    <div key={i}>
                      <span className="text-[10px] text-slate-400 block truncate">
                        {isFa ? spec.labelFa : spec.labelEn}
                      </span>
                      <span className="text-xs font-mono font-bold text-white block mt-0.5 truncate">
                        {spec.val}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Integrated Elements List */}
                <div className="space-y-1.5 mb-6">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                    {isFa ? 'عناصر مدل یکپارچه KKM:' : 'Integrated Model Components:'}
                  </span>
                  {(isFa ? project.integratedElementsFa : project.integratedElementsEn).slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="flex-1 py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white rounded-xl transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
                >
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isFa ? 'مشخصات کامل' : 'Full Blueprint'}</span>
                </button>

                <button
                  onClick={() => handleProposePilot(isFa ? project.titleFa : project.titleEn)}
                  className="py-2.5 px-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1"
                  title={isFa ? 'درخواست این الگو برای پایلوت' : 'Apply for this Pilot Template'}
                >
                  <span>{isFa ? 'پایلوت' : 'Pilot'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Modal Blueprint */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] text-start relative"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-5 ltr:right-5 rtl:left-5 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${selectedProject.badgeColor}`}>
                      {selectedProject.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {isFa ? selectedProject.archetypeFa : selectedProject.archetypeEn}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {isFa ? selectedProject.titleFa : selectedProject.titleEn}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-200 leading-relaxed mb-6">
                  {isFa ? selectedProject.descFa : selectedProject.descEn}
                </p>

                {/* Full Specifications */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    {isFa ? 'شاخص‌های فنی و عملیاتی تیپ پروژه:' : 'Technical & Operational Metrics:'}
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedProject.specs.map((s, i) => (
                      <div key={i} className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
                        <span className="text-xs text-slate-400 block">{isFa ? s.labelFa : s.labelEn}</span>
                        <span className="text-sm font-mono font-bold text-emerald-400 block mt-1">{s.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* All Integrated Elements */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    {isFa ? 'بسته مهندسی و اجزای معماری یکپارچه:' : 'Complete Integrated Engineering Package:'}
                  </h4>
                  <div className="space-y-2">
                    {(isFa ? selectedProject.integratedElementsFa : selectedProject.integratedElementsEn).map((el, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{el}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Investment Structure & Impact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5">
                    <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1.5 mb-1.5">
                      <Coins className="w-3.5 h-3.5" />
                      {isFa ? 'ساختار مالی و سرمایه‌گذاری:' : 'Investment Structure:'}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {isFa ? selectedProject.capexStructureFa : selectedProject.capexStructureEn}
                    </p>
                  </div>

                  <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5">
                    <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5 mb-1.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {isFa ? 'تأثیر اقتصادی و منطقه‌ای:' : 'Socio-Economic Impact:'}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {isFa ? selectedProject.impactFa : selectedProject.impactEn}
                    </p>
                  </div>
                </div>

                {/* Modal CTA */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-white rounded-xl transition-colors cursor-pointer"
                  >
                    {isFa ? 'بستن' : 'Close'}
                  </button>
                  <button
                    onClick={() => {
                      const title = isFa ? selectedProject.titleFa : selectedProject.titleEn;
                      setSelectedProject(null);
                      handleProposePilot(title);
                    }}
                    className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span>{isFa ? 'درخواست استقرار این تیپ پروژه‌ای' : 'Apply for this Project Template'}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
