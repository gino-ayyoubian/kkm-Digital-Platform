export interface RuralPillarDetail {
  id: string;
  icon: string;
  title: Record<string, string>;
  subtitle: Record<string, string>;
  category: string;
  badge: Record<string, string>;
  description: Record<string, string>;
  internationalBenchmarks: Array<{
    countryOrOrg: string;
    program: string;
    metric: string;
    source: string;
  }>;
  keyTechnologies: string[];
  currentRealities: Record<string, string>[];
  innovativeSolutions: Record<string, string>[];
  systemMetrics: {
    trl: number; // Technology Readiness Level 1-9
    impactScore: number; // 1-100
    efficiencyGain: string;
    roiHorizon: string;
  };
}

export interface RuralScenario {
  id: string;
  name: Record<string, string>;
  horizon: string;
  description: Record<string, string>;
  waterStressIndex: number; // 0-100 (lower is better)
  yieldImprovement: number; // percentage
  populationRetention: number; // percentage
  cleanEnergyShare: number; // percentage
  digitalInclusionRate: number; // percentage
  status: 'baseline' | 'moderate' | 'transformational';
}

export const RURAL_TRANSFORMATION_PILLARS: RuralPillarDetail[] = [
  {
    id: 'precision-agritech',
    icon: 'Satellite',
    title: {
      FA: 'کشاورزی دقیق، پایش ماهواره‌ای/IoT و زنجیره هوشمند تأمین و ارزش',
      EN: 'Precision Agriculture, Satellite/IoT Sensing & Smart Value Chains',
      AR: 'الزراعة الدقيقة والاستشعار بالأقمار الصناعية/IoT وسلاسل القيمة الذكية',
      KU: 'کشتوکاڵی ورد، هەستەوەری مانگی دەستکرد/IoT و زنجیرەی بەهای زیرەک',
      RU: 'Точное земледелие, спутниковый/IoT мониторинг и умные цепочки поставок'
    },
    subtitle: {
      FA: 'بهره‌گیری از سنتینل، هوش مصنوعی لبه (Edge AI) و توزیع بدون واسطه',
      EN: 'Leveraging Sentinel imagery, Edge AI, and disintermediated supply logistics',
      AR: 'الاستفادة من صور سنتينل، ذكاء الحافة الاصطناعي واللوجستيات المباشرة',
      KU: 'سوودوەرگرتن لە وێنەی سەنتینێڵ، زیرەکی لێوار و لۆجستیكی ڕاستەوخۆ',
      RU: 'Спутниковые снимки Sentinel, Edge AI и оптимизация цепочек сбыта'
    },
    category: 'agritech',
    badge: {
      FA: 'رکن اول: زنجیره هوشمند',
      EN: 'Pillar I: Smart Supply Chain',
      AR: 'الركيزة الأولى: سلاسل التوريد',
      KU: 'کۆڵەکەی یەکەم: زنجیرەی زیرەک',
      RU: 'Опора I: Умные цепочки'
    },
    description: {
      FA: 'گذار از کشاورزی معیشتی سنتی به مدل کشاورزی داده‌محور و بهینه‌سازی زنجیره ارزش با تحلیل طیفی خاک، پیش‌بینی هوشمند آفات و حذف دلالی ساختاری.',
      EN: 'Transitioning from subsistence farming to data-driven agriculture with soil spectral imaging, predictive pest telemetry, and direct algorithmic farm-to-market distribution.',
      AR: 'التحول من الزراعة التقليدية إلى الزراعة القائمة على البيانات عبر الاستشعار الطيفي للتربة والتنبؤ بالآفات والربط المباشر بالأسواق.',
      KU: 'گۆڕین لە کشتوکاڵی نەریتییەوە بۆ کشتوکاڵی بەڵگەدار بە شیکاری تیشکی خاک، پێشبینی نەخۆشییەکان و بەستنەوەی ڕاستەوخۆ بە بازاڕ.',
      RU: 'Переход от традиционного земледелия к аналитике на базе спутниковых спектров, прогнозирования болезней культур и прямых поставок.'
    },
    internationalBenchmarks: [
      {
        countryOrOrg: 'FAO / Wageningen (Netherlands)',
        program: 'Precision Soil Spectrometry & Drone Fleet Calibration',
        metric: '+34% crop yield, -28% synthetic fertilizer use',
        source: 'FAO Digital Agriculture Report 2024'
      },
      {
        countryOrOrg: 'CGIAR / Digital Agriculture Flagship',
        program: 'Micro-weather Hyperlocal Forecasting for Smallholders',
        metric: '72% loss avoidance in erratic monsoon intervals',
        source: 'World Bank Agriculture & Food Review'
      },
      {
        countryOrOrg: 'European Space Agency (Copernicus)',
        program: 'Sentinel-2 Multispectral Vegetation Index (NDVI) Telemetry',
        metric: 'Real-time drought index monitoring at 10m spatial resolution',
        source: 'ESA Earth Observation Directive'
      }
    ],
    keyTechnologies: [
      'Copernicus Sentinel-2 & Landsat-9 Multispectral NDVI / NDRE',
      'LoRaWAN Low-Power Mesh Soil Moisture & Salinity Probes',
      'Edge AI Portable Optical Pest & Leaf-Pathology Analyzers',
      'Hyperlocal Micro-Climatic Autonomous Weather Telemetry',
      'Blockchain-Verifiable Cold-Chain Logistical Tracing'
    ],
    currentRealities: [
      {
        FA: 'اتلاف ۳۰ تا ۴۰ درصدی محصولات باغی و زراعی به دلیل فقدان زنجیره سرد هوشمند و پیش‌بینی تقاضا.',
        EN: '30-40% post-harvest loss due to lack of cold-chain intelligence and accurate demand forecasting.',
        AR: 'هدر ٣٠ إلى ٤٠٪ من المحاصيل لغياب سلاسل التبريد والتنبؤ الدقيق بالطلب.',
        KU: 'بەفیڕۆچوونی ٣٠ تا ٤٠٪ی بەرهەمەکان بەهۆی نەبوونی زنجیرەی سارد و پێشبینی بازاڕ.',
        RU: 'Потери 30-40% урожая из-за отсутствия умной холодовой цепи и точного прогнозирования спроса.'
      },
      {
        FA: 'مصرف بی‌رویه و غیراصولی کود و سموم شیمیایی ناشی از عدم آگاهی از وضعیت مغذی خاک در لحظه.',
        EN: 'Overapplication of synthetic inputs caused by blind fertilizing without real-time micro-nutrient maps.',
        AR: 'الاستخدام المفرط للأسمدة الكيماوية لعدم وجود خرائط دقيقة لمغذيات التربة.',
        KU: 'بەکارهێنانی زۆری پەین و ژەهر بەهۆی نەبوونی نەخشەی ڕاستەقینەی پێکهاتەی خاک.',
        RU: 'Избыточное внесение удобрений из-за отсутствия оперативных карт состава почвы.'
      }
    ],
    innovativeSolutions: [
      {
        FA: 'استقرار پلتفرم KKM AgriSense: پردازش خودکار تصاویر ماهواره‌ای و ارسال نقشه‌های توزیع متغیر نهاده‌ها (VRA) مستقیماً به تلفن همراه کشاورزان.',
        EN: 'Deployment of KKM AgriSense: automated satellite analytics feeding Variable Rate Application (VRA) prescriptions directly to mobile devices.',
        AR: 'نشر منصة KKM AgriSense: التحليل الآلي لصور الأقمار وتوجيه جرعات التسميد مباشرة لهواتف المزارعين.',
        KU: 'دامەزراندنی KKM AgriSense: شیکاری خودکاری وێنەی ئاسمانی و ناردنی ڕێنمایی ورد بۆ مۆبایلی جوتیاران.',
        RU: 'Внедрение платформы KKM AgriSense: спутниковый анализ с формированием карт дифференцированного внесения удобрений (VRA).'
      },
      {
        FA: 'شبکه تجمیع بار و سامانه حراج معکوس هوشمند KKM جهت اتصال بی‌واسطه تعاونی‌های روستایی به مراکز پخش استانی و بنادر صادراتی.',
        EN: 'KKM Aggregation Network & dynamic reverse-auction logistics directly connecting rural co-ops to national distribution and export ports.',
        AR: 'شبكة تجميع وتوزيع لوجستية متطورة تربط الجمعيات الزراعية بالأسواق المركزية وموانئ التصدير بدون وسطاء.',
        KU: 'تۆڕی کۆکردنەوە و گواستنەوەی زیرەکی KKM بۆ بەستنەوەی ڕاستەوخۆی جوتیاران بە بازاڕی سەرەکی و هەناردەکردن.',
        RU: 'Логистическая сеть KKM и алгоритмический аукцион для прямой связи фермеров с оптовиками и экспортными терминалами.'
      }
    ],
    systemMetrics: {
      trl: 8,
      impactScore: 94,
      efficiencyGain: '+38% Net Income',
      roiHorizon: '14-18 Months'
    }
  },
  {
    id: 'circular-bioeconomy',
    icon: 'Recycle',
    title: {
      FA: 'اقتصاد چرخشی، بیوپلایشگاه‌های روستایی و انرژی‌های پاک تجدیدپذیر',
      EN: 'Circular Bioeconomy, Rural Micro-Biorefineries & Clean Renewable Energy',
      AR: 'الاقتصاد الحيوي الدائري، المصافي الحيوية الريفية والطاقة المتجددة',
      KU: 'ئابووری بازنەیی، پاڵاوگەی ژینگەیی گوندەکان و وزەی نوێبووەوە',
      RU: 'Циркулярная биоэкономика, сельские биорефайнери и чистая энергетика'
    },
    subtitle: {
      FA: 'تبدیل ضایعات کشاورزی به بیوگاز، بیوچار، برق خورشیدی و خوراک دام غنی‌شده',
      EN: 'Transforming agro-residues into biochar, biogas, distributed agrivoltaics, and enriched livestock feed',
      AR: 'تحويل المخلفات الزراعية إلى غاز حيوي، بيوتشار، طاقة شمسية وأعلاف حيوانية مدعمة',
      KU: 'گۆڕینی پاشماوەی کشتوکاڵی بۆ بیۆگاز، بایۆچار، کارەبای خۆر و ئالیکی دەوڵەمەند',
      RU: 'Переработка агроотходов в биочар, биогаз, агровольтаику и обогащенные корма'
    },
    category: 'bioenergy',
    badge: {
      FA: 'رکن دوم: اقتصاد سبز و انرژی',
      EN: 'Pillar II: Green Bioeconomy',
      AR: 'الركيزة الثانية: الاقتصاد الأخضر',
      KU: 'کۆڵەکەی دووەم: ئابووری سەوز',
      RU: 'Опора II: Биоэкономика'
    },
    description: {
      FA: 'قطع وابستگی روستا به سوخت‌های فسیلی آلاینده از طریق استقرار واحدهای پیش‌ساخته پیرولیز، هاضم‌های بی‌هوازی پیوسته، و سازه‌های فتوولتائیک تلفیقی با مزارع (Agrivoltaics).',
      EN: 'Decoupling rural clusters from fossil fuel subsidies via standardized modular pyrolysis units, continuous anaerobic digesters, and co-located agrivoltaic canopies.',
      AR: 'فصل التجمعات الريفية عن الوقود الأحفوري عبر وحدات التحلل الحراري النموذجية والمحللات اللاهوائية ومظلات الطاقة الشمسية الزراعية.',
      KU: 'ڕزگارکردنی گوندەکان لە سووتەمەنی نەوتی بە بەکارهێنانی یەکەی مۆدیۆلاری پایڕۆلایز، بەرهەمهێنانی گازی زیندەیی و وێستگەی خۆری لەسەر کێڵگەکان.',
      RU: 'Отказ от ископаемого топлива через модульные пиролизные установки, анаэробные реакторы и агровольтаические фермы.'
    },
    internationalBenchmarks: [
      {
        countryOrOrg: 'Fraunhofer ISE / Germany',
        program: 'Agrivoltaics Dual Land-Use Architecture (Crop + Solar Dual Yield)',
        metric: '186% combined land equivalent ratio (LER)',
        source: 'Fraunhofer Agrivoltaics Guidelines 2024'
      },
      {
        countryOrOrg: 'Biochar Initiative / Cornell University',
        program: 'Pyrolysis of Agro-Residues for Long-Term Carbon Sequestration',
        metric: '1 ton biochar = ~2.7 tons CO2e sequestered for 500+ years',
        source: 'IPCC Climate Mitigation Special Report'
      },
      {
        countryOrOrg: 'IRENA (International Renewable Energy Agency)',
        program: 'Mini-Grids & Decentralized Rural Electrification Index',
        metric: '99.4% power reliability at 45% lower LCOE than diesel generators',
        source: 'IRENA Renewable Power Generation Costs'
      }
    ],
    keyTechnologies: [
      'Modular Containerized Continuous Pyrolysis (Biochar & Syngas)',
      'Thermophilic Anaerobic Digestion with Automated Scrubbing (Biomethane)',
      'Dual-Axis Agrivoltaic Structures with Dynamic Shading Controls',
      'Solid-State Battery Energy Storage Systems (BESS) for Rural Mini-Grids',
      'Pelletized Organic Soil Amendments Infused with Mycorrhizal Fungi'
    ],
    currentRealities: [
      {
        FA: 'سوزاندن سالانه میلیون‌ها تن کاه، کلش و ضایعات کشاورزی که عامل آلودگی شدید هوا و نابودی مواد آلی خاک است.',
        EN: 'Seasonal open burning of crop stubble causing severe respiratory crises and destruction of topsoil biological activity.',
        AR: 'حرق بقايا المحاصيل موسمياً مما يؤدي إلى تلوث هوائي وتدمير التنوع البيولوجي للتربة.',
        KU: 'سووتاندنی ساڵانەی پوش و پاشماوەی کشتوکاڵی کە دەبێتە هۆی پیسبوونی ژینگە و لاوازبوونی خاک.',
        RU: 'Сезонное сжигание пожнивных остатков, разрушающее плодородный слой почвы и загрязняющее атмосферу.'
      },
      {
        FA: 'قطعی‌های مکرر برق شبکه سراسری در ساعات اوج مصرف و توقف پمپاژ چاه‌ها و تباهی محصولات گلخانه‌ای.',
        EN: 'Vulnerable grid dependency with peak-summer blackouts halting irrigation pumps and greenhouse temperature control.',
        AR: 'انقطاع التيار الكهربائي المتكرر مما يوقف مضخات الري ويهدد المحاصيل في البيوت المحمية.',
        KU: 'پچڕانی بەردەوامی کارەبای نیشتمانی کە کارکردنی پەمپەکانی ئاو و خانووە پلاستیکییەکان دەوەستێنێت.',
        RU: 'Аварийные отключения электросетей в пиковые периоды, парализующие насосы полива и вентиляцию теплиц.'
      }
    ],
    innovativeSolutions: [
      {
        FA: 'راهکار KKM BioCirc: تبدیل ضایعات مزرعه به بیوچار غنی از کربن برای افزایش ۱۸ تا ۲۵ درصدی ظرفیت نگهداری آب در خاک شنی و آهکی.',
        EN: 'KKM BioCirc Solution: on-site modular conversion of residues to carbon-negative biochar, elevating water retention by 18-25%.',
        AR: 'حل KKM BioCirc: تحويل المخلفات الحقلية إلى بيوتشار كربوني يزيد من قدرة التربة على حفظ المياه بنسبة ١٨-٢٥٪.',
        KU: 'چارەسەری KKM BioCirc: گۆڕینی پاشماوەکان بۆ بایۆچار بۆ بەرزکردنەوەی توانای ڕاگرتنی ئاو لە خاکدا بە ڕێژەی ١٨-٢٥٪.',
        RU: 'Решение KKM BioCirc: пиролиз растительных остатков в биочар с повышением влагоудержания почвы на 18-25%.'
      },
      {
        FA: 'ریزشبکه‌های هوشمند خورشیدی-بیوگازی KKM با ذخیره‌سازهای باتری آهن-فسفات (LFP) جهت تضمین برق ۱۰۰٪ پایدار ۲۴/۷ چاه‌ها و صنایع تبدیلی.',
        EN: 'KKM Hybrid Agrivoltaic + Biogas Mini-Grids with LFP storage guaranteeing 100% resilient 24/7 power for pumps and packhouses.',
        AR: 'شبكات KKM المصغرة الهجينة (شمسي + غاز حيوي) مع بطاريات LFP لتأمين الطاقة المستمرة للمضخات ومراكز التعليب.',
        KU: 'تۆڕی کارەبای تێکەڵاوی خۆر و بایۆگازی KKM لەگەڵ پاتری پێشکەوتوو بۆ دابینکردنی کارەبای بێپچڕان بۆ پەمپ و ساردکەرەوەکان.',
        RU: 'Гибридные микросети KKM (солнце + биогаз) с LFP-накопителями для автономного электроснабжения полива и переработки 24/7.'
      }
    ],
    systemMetrics: {
      trl: 9,
      impactScore: 91,
      efficiencyGain: '-62% Energy Expenses',
      roiHorizon: '22-26 Months'
    }
  },
  {
    id: 'smart-villages-governance',
    icon: 'Network',
    title: {
      FA: 'حکمرانی دیجیتال، دهکده‌های هوشمند (Smart Villages) و اشتغال دانش‌بنیان',
      EN: 'Digital Governance, Smart Villages Ecosystem & Knowledge-Economy Employment',
      AR: 'الحوكمة الرقمية، القرى الذكية والتوظيف القائم على المعرفة',
      KU: 'حوکمڕانی دیجیتاڵی، گوندە زیرەکەکان (Smart Villages) و هەلی کاری زانستی',
      RU: 'Цифровое управление, Смарт-деревни (Smart Villages) и наукоемкая занятость'
    },
    subtitle: {
      FA: 'پیشخوان خدمات الکترونیک، آموزش مهارت‌های نوین، اقتصاد فریلنسری و اکوسیستم کارآفرینی',
      EN: 'Rural e-service kiosks, digital literacy academies, remote tech hubs, and village agritech incubators',
      AR: 'مراكز الخدمات الإلكترونية الريفية، أكاديميات المهارات الرقمية والعمل عن بعد',
      KU: 'ناوەندی خزمەتگوزاری ئەلیکترۆنی، پەروەردەی لێهاتوویی نوێ و دەرفەتی کاری فریلانسەری',
      RU: 'Сельские центры госуслуг, академии цифровой грамотности и удаленная занятость'
    },
    category: 'governance',
    badge: {
      FA: 'رکن سوم: حکمرانی و دهکده هوشمند',
      EN: 'Pillar III: Smart Governance',
      AR: 'الركيزة الثالثة: القرى الذكية',
      KU: 'کۆڵەکەی سێیەم: گوندی زیرەک',
      RU: 'Опора III: Смарт-управление'
    },
    description: {
      FA: 'رفع شکاف دیجیتال میان شهر و روستا با راه‌اندازی مراکز نوآوری روستایی، سیستم شفاف رأی‌گیری و تصمیم‌گیری محلی، و اتصال جوانان مستعد روستایی به زنجیره کارآفرینی بین‌المللی.',
      EN: 'Closing the urban-rural digital chasm through village innovation labs, transparent decentralized civic consensus tools, and telemetry-supported youth telework platforms.',
      AR: 'جسر الهوة الرقمية بين الريف والمدينة بإنشاء حاضنات الابتكار الريفية ومنظومات التصويت والتشارك المجتمعي الشفاف.',
      KU: 'پڕکردنەوەی کەلێنی دیجیتاڵی نێوان شار و گوند لەڕێگەی ناوەندی نوێگەری گوندەکان و دەرفەتدان بە لاوانی گوند بۆ کاری سەردەمیانە.',
      RU: 'Преодоление цифрового разрыва через сельские хабы инноваций, прозрачные сервисы местного самоуправления и удаленную работу молодежи.'
    },
    internationalBenchmarks: [
      {
        countryOrOrg: 'European Commission (EU Horizon / ENRD)',
        program: 'Smart Villages Initiative for Revitalizing Rural Communities',
        metric: 'Reverse migration +12.4% over 5 years across 400 pilot hamlets',
        source: 'EU Smart Villages Evaluation Dossier'
      },
      {
        countryOrOrg: 'OECD Rural Policy 3.0',
        program: 'Place-Based Multi-Stakeholder Rural Innovation Framework',
        metric: 'Diversification of rural GDP into non-farm digital services by 27%',
        source: 'OECD Principles on Rural Policy'
      },
      {
        countryOrOrg: 'South Korea / MAFRA',
        program: 'Smart Farm Innovation Valleys & Saemaul Undong 4.0',
        metric: 'Tripled young farmer settlement rate (<40 years old)',
        source: 'Korean Rural Economic Institute Study'
      }
    ],
    keyTechnologies: [
      'KKM VillageOS: Integrated Community Governance & Utility Dashboard',
      'High-Speed Low-Latency Satellite Uplink & Community Wi-Fi Mesh',
      'AI Multilingual Rural Diagnostic Assistant (Livestock, Agronomy & Health)',
      'Digital Cooperative Ledger (Transparent Resource & Dividend Allocation)',
      'Micro-Credentialing Platform for AgTech, GIS and Coding Skills'
    ],
    currentRealities: [
      {
        FA: 'مهاجرت شدید جوانان و نخبگان محلی به حاشیه کلان‌شهرها به سبب نبود فرصت‌های شغلی فراتر از کارگری یدی.',
        EN: 'Brain drain and youth migration to urban slums triggered by the absence of skilled digital or tech-forward careers.',
        AR: 'هجرة الشباب والكفاءات نحو أطراف المدن بسبب انعدام فرص العمل التخصصية والمجزية.',
        KU: 'کۆچی بەردەوامی لاوان و شارەزایان بۆ دەوروبەری شارە گەورەکان بەهۆی نەبوونی هەلی کاری شایستە.',
        RU: 'Отток молодежи в пригороды мегаполисов из-за дефицита рабочих мест вне тяжелого ручного труда.'
      },
      {
        FA: 'بروکراسی سنگین اداری، مسافت طولانی تا مراکز شهرستان و بی‌خبری روستائیان از تسهیلات و حمایت‌های قانونی.',
        EN: 'Cumbersome bureaucracy, geographical distance to urban registries, and lack of transparency regarding subsidies.',
        AR: 'البيروقراطية المعقدة والمسافات البعيدة وصعوبة الوصول للخدمات الحكومية والدعم المالي.',
        KU: 'ڕۆتینی زۆری ئیداری و دووری لە ناوەندی شارەکان و نەبوونی زانیاری لەسەر پێدانی قەرز و یارمەتییەکان.',
        RU: 'Бюрократические барьеры, удаленность районных центров и плохая осведомленность о господдержке.'
      }
    ],
    innovativeSolutions: [
      {
        FA: 'سامانه KKM Smart Hamlet Hub: استقرار کیوسک‌های خودکار خدمت، اینترنت پایدار ماهواره‌ای و فضای کار اشتراکی برای اشتغال فریلنسری و استارتاپی جوانان.',
        EN: 'KKM Smart Hamlet Hub: self-service e-kiosks, resilient satellite backhaul, and rural co-working spaces fueling remote knowledge work.',
        AR: 'مراكز KKM الذكية: منصات خدمة ذاتية وإنترنت فضائي ومساحات عمل مشتركة تشجع العمل الرقمي والريادي للشباب.',
        KU: 'ناوەندی زیرەکی KKM: کۆشکی ئەلیکترۆنی، ئینتەرنێتی بەهێز و شوێنی کاری هاوبەش بۆ کارکردنی سەربەخۆ و بازرگانی لاوان.',
        RU: 'Хабы KKM Smart Hamlet: терминалы госуслуг, спутниковый интернет и сельские коворкинги для удаленной работы.'
      },
      {
        FA: 'تعاونی‌های دیجیتال بلاکچینی KKM: توکنیزه‌کردن سهام ماشین‌آلات گران‌قیمت کشاورزی، تسهیم عادلانه سود و سرمایه‌گذاری جمعی در پروژه‌های بومی.',
        EN: 'KKM Digital Co-Op Platform: fractional asset sharing of expensive machinery, transparent revenue pooling, and local crowdfunding.',
        AR: 'منظومة KKM للتعاونيات الرقمية: المشاركة الذكية في الآلات الزراعية المكلفة وتوزيع الأرباح بشفافية تامة.',
        KU: 'پلاتفۆرمی هاوبەشی دیجیتاڵی KKM: بەشداریکردن لە کڕینی ئامێری گرانبەها و دابەشکردنی دادپەروەرانەی داهات.',
        RU: 'Цифровые кооперативы KKM: долевое владение дорогостоящей техникой, прозрачный учет и локальный краудфандинг.'
      }
    ],
    systemMetrics: {
      trl: 9,
      impactScore: 96,
      efficiencyGain: '+54% Youth Retention',
      roiHorizon: '12 Months'
    }
  },
  {
    id: 'climate-water-resilience',
    icon: 'Droplets',
    title: {
      FA: 'تاب‌آوری اقلیمی، مدیریت پایدار منابع آب و مقابله با مهاجرت اقلیمی',
      EN: 'Climate Resilience, Sustainable Aquifer Governance & Anti-Displacement Strategy',
      AR: 'الصمود المناخي، الإدارة المستدامة للمياه ومكافحة الهجرة المناخية',
      KU: 'خۆڕاگری لە بەرامبەر کەشوهەوا، بەڕێوەبردنی ئاو و ڕێگریکردن لە کۆچی ژینگەیی',
      RU: 'Климатическая устойчивость, сохранение водных ресурсов и предотвращение миграции'
    },
    subtitle: {
      FA: 'سیستم‌های هشدار سریع، تغذیه مصنوعی آبخوان‌ها، بازچرخانی پساب و بیمه پارامتریک',
      EN: 'Early warning telemetry, managed aquifer recharge (MAR), graywater recycling, and parametric index insurance',
      AR: 'أنظمة الإنذار المبكر، الشحن الاصطناعي للمياه الجوفية، تدوير المياه الرمادية والتأمين المناخي',
      KU: 'سیستەمی هۆشداری پێشوەختە، بوژاندنەوەی ئاوی ژێرزەوی، ڕیسایکڵکردنی ئاو و بیمەی کەشوهەوا',
      RU: 'Раннее оповещение, искусственное пополнение водоносных горизонтов и климатическое страхование'
    },
    category: 'water-climate',
    badge: {
      FA: 'رکن چهارم: پایداری آب و اقلیم',
      EN: 'Pillar IV: Water & Climate',
      AR: 'الركيزة الرابعة: المياه والمناخ',
      KU: 'کۆڵەکەی چوارەم: ئاو و ژینگە',
      RU: 'Опора IV: Вода и климат'
    },
    description: {
      FA: 'مدیریت علمی بحران فروچاله، خشکسالی‌های پیاپی و شوری خاک با تلفیق فناوری‌های تغذیه آبخوان (MAR)، سامانه‌های فوق‌کم‌مصرف قطره‌ای زیرسطحی و قراردادهای هوشمند بیمه اقلیمی.',
      EN: 'Confronting aquifer subsidence, perennial droughts, and salinization via Managed Aquifer Recharge (MAR), subsurface smart drip systems, and algorithmic climate index payouts.',
      AR: 'مواجهة انخفاض مناسيب المياه الجوفية والجفاف وملوحة التربة عبر تقنيات شحن الخزانات الجوفية والري بالتنقيط تحت السطحي.',
      KU: 'بەرەنگاربوونەوەی وشکەساڵی و دابەزینی ئاوی ژێرزەوی بە بەکارهێنانی تەکنەلۆژیای پڕکردنەوەی ئاوی ژێرزەوی و سیستەمی ئاودێری ژێر خاک.',
      RU: 'Борьба с истощением водоносных горизонтов, засухами и засолением почв через подземное капельное орошение и пополнение водоносных пластов.'
    },
    internationalBenchmarks: [
      {
        countryOrOrg: 'UNESCO-IHP / World Water Council',
        program: 'Managed Aquifer Recharge (MAR) in Arid and Semi-Arid Basins',
        metric: '+42% shallow groundwater recovery during flash runoff events',
        source: 'UNESCO Groundwater & Climate Directive'
      },
      {
        countryOrOrg: 'World Bank Global Water Practice',
        program: 'Subsurface Drip Irrigation & Soil Matrix Tensiometer Networks',
        metric: '55% irrigation water savings, 0% evaporative loss',
        source: 'Water Global Practice Technical Paper'
      },
      {
        countryOrOrg: 'InsuResilience Global Partnership',
        program: 'Satellite-Triggered Parametric Micro-Insurance for Drought',
        metric: 'Guaranteed liquidity payout within 72 hours of satellite index breach',
        source: 'G20 Climate Vulnerability Taskforce'
      }
    ],
    keyTechnologies: [
      'Subsurface Pressurized Pulsed Drip Irrigation with Salinity Flushing',
      'Managed Aquifer Recharge (MAR) Injection Wells with Sediment Filters',
      'Decentralized Solar-Powered Capacitive Deionization (CDI) Desalination',
      'AI-Powered Flash Flood Harvesters & Dynamic Spreading Basins',
      'Smart Contract Parametric Crop & Drought Insurance Engine'
    ],
    currentRealities: [
      {
        FA: 'افت سالانه ۱ تا ۲ متری سطح ایستابی سفره‌های زیرزمینی و بروز پدیده‌های مخرب فرونشست زمین.',
        EN: 'Annual 1-2 meter water table drawdown causing irreversibly destructive ground subsidence fissures.',
        AR: 'انخفاض سنوي بمقدار ١ إلى ٢ متر في منسوب المياه الجوفية وظهور تشققات وهبوط في الأراضي.',
        KU: 'دابەزینی ساڵانەی ١ بۆ ٢ مەتری ئاوی ژێرزەوی و مەترسی ڕۆچوونی زەوی و وشکبوونی کانییەکان.',
        RU: 'Падение уровня грунтовых вод на 1-2 метра ежегодно, приводящее к проседанию почвы и истощению скважин.'
      },
      {
        FA: 'تخریب اراضی کشاورزی در اثر سیلاب‌های ناگهانی فصلی بدون وجود زیرساخت مهار و آبخوان‌داری هوشمند.',
        EN: 'Flash floods devastating productive topsoil due to absent watershed interception and real-time retention structures.',
        AR: 'جرف التربة الزراعية جراء السيول الفجائية في ظل غياب منشآت الحصاد المائي الذكية.',
        KU: 'تێکچوونی خاکی بەپیت بەهۆی لافاوی لەناکاو بەهۆی نەبوونی بەنداو و پڕۆژەی گلدانەوەی ئاو.',
        RU: 'Разрушение плодородного слоя внезапными паводками из-за отсутствия систем перехвата и водоудержания.'
      }
    ],
    innovativeSolutions: [
      {
        FA: 'مهندسی آبخوان KKM HydroShield: احداث حوضچه‌های پخش سیلاب و چاه‌های تزریق تغذیه مصنوعی برای هدایت ۱۰۰٪ رواناب‌های فصلی به سفره‌های عمیق.',
        EN: 'KKM HydroShield Engineering: engineered flood spreading zones and gravity-fed injection bores sinking 100% of seasonal runoff into deep aquifers.',
        AR: 'مشروع KKM HydroShield: أحواض ذكية لحصاد مياه السيول وآبار حقن لتغذية المياه الجوفية العميقة بمياه الأمطار.',
        KU: 'پڕۆژەی KKM HydroShield: دروستکردنی حەوزی گلدانەوەی لافاو و بیرەکانی پڕکردنەوە بۆ بردنەژوورەوەی تەواوی ئاوی لافاو بۆ ژێر زەوی.',
        RU: 'Комплекс KKM HydroShield: гидротехнические каскады для улавливания паводков и гравитационной закачки в глубокие водоносные горизонты.'
      },
      {
        FA: 'آبیاری هوشمند پالس-زیرسطحی KKM: پایش تنش آبی با تصویربرداری حرارتی پهپادی و تزریق دقیق آب به ناحیه ریشه بدون کمترین تبخیر سطحی.',
        EN: 'KKM Subsurface Pulsed Micro-Irrigation: thermal drone crop-stress mapping coupled to root-targeted pulses eliminating evaporative loss.',
        AR: 'تقنية الري النبضي تحت السطحي: مراقبة إجهاد النبات بواسطة طائرات مسيرة وتوصيل المياه بدقة لجذور النبات دون تبخر.',
        KU: 'سیستەمی ئاودێری زیرەکی ژێر خاک: چاودێری تەندروستی ڕووەک بە درۆنی گەرمی و پێدانی ئاوی پێویست بۆ ڕەگی ڕووەک بێ بەفیڕۆچوون.',
        RU: 'Подземное импульсное орошение KKM с тепловизионным мониторингом стресса культур с БПЛА, исключающее поверхностное испарение.'
      }
    ],
    systemMetrics: {
      trl: 9,
      impactScore: 98,
      efficiencyGain: '-52% Water Footprint',
      roiHorizon: '10-14 Months'
    }
  }
];

export const RURAL_TRANSFORMATION_SCENARIOS: RuralScenario[] = [
  {
    id: 'status-quo',
    name: {
      FA: 'سناریوی اول: تداوم الگوی سنتی (بازدارنده)',
      EN: 'Scenario A: Business As Usual (Degenerative)',
      AR: 'السيناريو الأول: استمرار النمط التقليدي (التناقصي)',
      KU: 'سیناریۆی یەکەم: بەردەوامی شێوازی نەریتی',
      RU: 'Сценарий A: Инерционный (Традиционный)'
    },
    horizon: '2026 - 2032',
    description: {
      FA: 'عدم ورود فناوری‌های نوین، فرونشست بیشتر سفره‌های آب، تشدید تخلیه جمعیت روستاها و افزایش ضایعات زنجیره تأمین.',
      EN: 'Absence of technology intervention, accelerating aquifer depletion, heightened rural depopulation, and persistent 35%+ food loss.',
      AR: 'غياب التدخل التكنولوجي، تفاقم جفاف المياه الجوفية، تصاعد الهجرة من القرى وهدر المحاصيل الزراعية.',
      KU: 'نەبوونی تەکنەلۆژیا، دابەزینی زیاتری ئاوی ژێرزەوی، چۆڵبوونی گوندەکان و بەفیڕۆچوونی زیاتری بەرهەمەکان.',
      RU: 'Отсутствие инвестиций в технологии, критическое падение уровня грунтовых вод, депопуляция деревень и высокие потери продовольствия.'
    },
    waterStressIndex: 88,
    yieldImprovement: 0,
    populationRetention: 42,
    cleanEnergyShare: 8,
    digitalInclusionRate: 24,
    status: 'baseline'
  },
  {
    id: 'incremental-tech',
    name: {
      FA: 'سناریوی دوم: گذار تدریجی و ارتقای جزئی',
      EN: 'Scenario B: Incremental Modernization (Transitional)',
      AR: 'السيناريو الثاني: التحديث التدريجي والانتقالي',
      KU: 'سیناریۆی دووەم: نوێکردنەوەی هەنگاو بە هەنگاو',
      RU: 'Сценарий B: Поэтапная модернизация'
    },
    horizon: '2030 - 2038',
    description: {
      FA: 'ورود محدود پنل‌های خورشیدی و سامانه‌های قطره‌ای معمولی؛ مهار نسبی مهاجرت اما نیازمند سرمایه‌گذاری برای خلق ارزش پایدار.',
      EN: 'Scattered standalone solar and standard drip irrigation; slowing depopulation but failing to close systemic productivity gaps.',
      AR: 'استخدام محدود للطاقة الشمسية والري بالتنقيط التقليدي، إبطاء الهجرة جزئياً مع بقاء فجوات الإنتاجية.',
      KU: 'بەکارهێنانی سنوورداری وزەی خۆر و ئاودێری، کەمکردنەوەی کەمی کۆچکردن بەڵام پێویستی بە گەشەی زیاترە.',
      RU: 'Локальная установка солнечных панелей и стандартный капельный полив; замедление оттока населения без системного рывка.'
    },
    waterStressIndex: 56,
    yieldImprovement: 22,
    populationRetention: 68,
    cleanEnergyShare: 35,
    digitalInclusionRate: 58,
    status: 'moderate'
  },
  {
    id: 'kkm-smart-leap',
    name: {
      FA: 'سناریوی سوم: جهش هوشمند تحول‌آفرین KKM (آینده‌پژوهانه)',
      EN: 'Scenario C: KKM Smart Leapfrog Transformation (Regenerative)',
      AR: 'السيناريو الثالث: قفزة KKM التحولية الذكية (التجددية)',
      KU: 'سیناریۆی سێیەم: بازدانی زیرەکی KKM بۆ داهاتوویەکی گەش',
      RU: 'Сценарий C: Прорывной скачок KKM (Регенеративный)'
    },
    horizon: '2030 - 2050',
    description: {
      FA: 'یکپارچه‌سازی کامل ۴ رکن: کشاورزی هوشمند ماهواره‌ای، دهکده انرژی بیوچرخشی، حکمرانی غیرمتمرکز دیجیتال و تاب‌آوری مطلق هیدرولوژیک؛ بازگشت معکوس جمعیت و خلق ثروت پایدار.',
      EN: 'Full systemic integration: satellite-guided smart farms, circular agrivoltaic mini-grids, digital cooperative governance, and resilient aquifer recharge. Achieves net-positive reverse migration and multi-fold farmer prosperity.',
      AR: 'التكامل الشامل للأركان الأربعة: مزارع ذكية بالأقمار، شبكات طاقة حيوية دائرية، حوكمة رقمية وصمود مائي كامل؛ تحقيق هجرة عكسية وازدهار ريفي غير مسبوق.',
      KU: 'تێکەڵکردنی تەواوی ٤ کۆڵەکەکە: کشتوکاڵی ئاسمانی، تۆڕی وزەی سەوز، حوکمڕانی دیجیتاڵی و پاراستنی سەدی ئاو؛ گەڕانەوەی خەڵک بۆ گوندەکان و دەوڵەمەندبوونیان.',
      RU: 'Полная интеграция 4 опор: спутниковый агро-мониторинг, циркулярные микросети, цифровое самоуправление и пополнение водоносных слоев. Достижение обратной миграции и устойчивого процветания.'
    },
    waterStressIndex: 18,
    yieldImprovement: 58,
    populationRetention: 94,
    cleanEnergyShare: 89,
    digitalInclusionRate: 95,
    status: 'transformational'
  }
];

export const INTERNATIONAL_DATABASE_SOURCES = [
  { name: 'FAO FAOSTAT & Digital Agriculture Portfolio', org: 'Food and Agriculture Organization of the United Nations', url: 'https://www.fao.org' },
  { name: 'World Bank Open Data - Agriculture & Rural Development', org: 'The World Bank Group', url: 'https://data.worldbank.org' },
  { name: 'IFAD Rural Development Report & Innovation Hub', org: 'International Fund for Agricultural Development', url: 'https://www.ifad.org' },
  { name: 'OECD Rural Studies & Policy 3.0 Principles', org: 'Organisation for Economic Co-operation and Development', url: 'https://www.oecd.org' },
  { name: 'CGIAR Platform for Big Data in Agriculture', org: 'Consultative Group on International Agricultural Research', url: 'https://www.cgiar.org' },
  { name: 'Copernicus Land Monitoring Service (CLMS)', org: 'European Space Agency & European Commission', url: 'https://land.copernicus.eu' },
  { name: 'UNDP Accelerator Labs - Grassroots Innovation & Rural Solutions', org: 'United Nations Development Programme', url: 'https://www.undp.org' }
];
