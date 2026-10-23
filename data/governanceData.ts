/**
 * KKM Corporate Governance, Directorate Architecture, Complementary Roles & RACI Matrix
 * 
 * Strict Standards:
 * 1. CEO Dual-Language Naming:
 *    - English: "Gino Ayyoubian" (No "Seyed", No "Markazi")
 *    - Persian: "سید ژینو ایوبیان مرکزی"
 * 2. Universal Ban on Honorifics:
 *    - No "Dr.", "Eng.", "Prof.", "دکتر", "مهندس", "پروفسور"
 * 3. Total Eradication of Ali Rezaei and Maryam Bahrami
 * 4. 8 Complementary Functions Integrated (HSE assigned to Seyed Jassem Hosseini; 7 open roles)
 * 5. Re-aligned Telephony Extensions (101-109, 200, 201, 202, 204, 205, 208, 209)
 */

export interface ComplementaryRole {
  id: string;
  titleEn: string;
  titleFa: string;
  assignedPersonnelEn: string | null;
  assignedPersonnelFa: string | null;
  status: 'assigned' | 'open_career';
  reasonEn: string;
  reasonFa: string;
  reportingEn: string;
  reportingFa: string;
  extension?: string;
  badge: string;
}

export interface RACIEntry {
  gate: number;
  stageEn: string;
  stageFa: string;
  objectiveEn: string;
  objectiveFa: string;
  ceo: 'R' | 'A' | 'C' | 'I';
  cto: 'R' | 'A' | 'A / R' | 'C' | 'I';
  coo: 'R' | 'A' | 'A / R' | 'C' | 'I';
  cfo: 'R' | 'A' | 'C' | 'I';
  ipLegal: 'R' | 'A' | 'C' | 'I';
  qaQc: 'R' | 'A' | 'C' | 'I';
  hr: 'R' | 'A' | 'C' | 'I';
}

export interface SecurityClassificationTier {
  level: number;
  titleEn: string;
  titleFa: string;
  classificationCode: 'PUB-L1' | 'INT-L2' | 'CONF-L3' | 'REST-L4';
  scopeEn: string;
  scopeFa: string;
  authorizedRolesEn: string[];
  authorizedRolesFa: string[];
  securityControlsEn: string;
  securityControlsFa: string;
  badgeColor: string;
}

/**
 * Universal Honorific Stripping Sanitizer
 * Strips Dr., Eng., Prof., Mr., Ms., Mrs., دکتر, مهندس, پروفسور from any personal name string.
 */
export const getCleanDisplayName = (name: string): string => {
  if (!name) return '';
  return name
    .replace(/^(Dr\.|Eng\.|Prof\.|Mr\.|Ms\.|Mrs\.|دکتر|مهندس|پروفسور)\s+/i, '')
    .trim();
};

/**
 * 8 Complementary Functions established to address industrial standards & governance gaps
 */
export const COMPLEMENTARY_ROLES: ComplementaryRole[] = [
  {
    id: 'hse-environment',
    titleEn: 'HSE & Environmental Management',
    titleFa: 'مدیریت بهداشت، ایمنی و محیط زیست (HSE)',
    assignedPersonnelEn: 'Seyed Jassem Hosseini',
    assignedPersonnelFa: 'سید جاسم حسینی',
    status: 'assigned',
    reasonEn: 'Critical high-risk deep drilling hazards, H2S toxic gas containment, and offshore marine operations safety compliance.',
    reasonFa: 'مهار مخاطرات بالای عملیات حفاری عمیق، مهار گازهای ترش H2S و الزامات زیست‌محیطی فراساحلی.',
    reportingEn: 'Direct reporting line to Audit, Risk & Compliance Committee',
    reportingFa: 'گزارش مستقیم به کمیته حسابرسی، ریسک و انطباق',
    extension: '109 / *9111',
    badge: 'Active Executive Head'
  },
  {
    id: 'compliance-sanctions',
    titleEn: 'Compliance, Sanctions & Anti-Bribery Directorate',
    titleFa: 'مدیریت انطباق، تحریم و ضدرشوه',
    assignedPersonnelEn: null,
    assignedPersonnelFa: null,
    status: 'open_career',
    reasonEn: 'Mitigating risks across transnational capital syndication, Green Sukuk issuance, and international banking transfers.',
    reasonFa: 'پوشش مخاطرات سرمایه‌گذاری فراملی، صکوک سبز و نقل‌وانتقالات مالی بین‌المللی.',
    reportingEn: 'Direct reporting line to Audit, Risk & Compliance Committee',
    reportingFa: 'گزارش مستقیم به کمیته حسابرسی، ریسک و انطباق',
    badge: 'Active Executive Opening'
  },
  {
    id: 'ciso-ot-security',
    titleEn: 'Information Security & Infrastructure (CISO)',
    titleFa: 'امنیت اطلاعات و زیرساخت (CISO)',
    assignedPersonnelEn: null,
    assignedPersonnelFa: null,
    status: 'open_career',
    reasonEn: 'Protecting reservoir geophysics models, IP HoldCo patents, proprietary tech secrets, and industrial OT networks.',
    reasonFa: 'حفاظت از داده‌های مخزن، اسناد مالکیت فکری (IP)، فناوری‌های تجاری و شبکه صنعتی (OT).',
    reportingEn: 'Reports to CTO with direct emergency escalation line to Risk Committee',
    reportingFa: 'گزارش به CTO با خط مستقیم اضطراری به کمیته ریسک',
    badge: 'Active Executive Opening'
  },
  {
    id: 'financial-controller',
    titleEn: 'Financial Controller & Accounting',
    titleFa: 'کنترلر مالی و حسابداری',
    assignedPersonnelEn: null,
    assignedPersonnelFa: null,
    status: 'open_career',
    reasonEn: 'Segregating day-to-day operational accounting and treasury from the strategic investment & expansion role of the CFO.',
    reasonFa: 'تفکیک وظایف اجرایی مالی از نقش توسعه‌ای و سرمایه‌گذاری CFO.',
    reportingEn: 'Direct reporting line to CFO',
    reportingFa: 'گزارش مستقیم به CFO',
    badge: 'Active Executive Opening'
  },
  {
    id: 'pmo-strategy',
    titleEn: 'Project Management Office (PMO)',
    titleFa: 'دفتر مدیریت پروژه (PMO)',
    assignedPersonnelEn: null,
    assignedPersonnelFa: null,
    status: 'open_career',
    reasonEn: 'Orchestrating the 10 lifecycle gates, schedule tracking, and integrated project controls across mega-projects.',
    reasonFa: 'هماهنگی دروازه‌های ۱۰ گانه چرخه حیات و کنترل جامع پروژه.',
    reportingEn: 'Direct reporting line to CEO',
    reportingFa: 'گزارش مستقیم به CEO',
    badge: 'Active Executive Opening'
  },
  {
    id: 'data-governance',
    titleEn: 'Data Governance & Telemetry Audit',
    titleFa: 'حاکمیت داده (Data Governance)',
    assignedPersonnelEn: null,
    assignedPersonnelFa: null,
    status: 'open_career',
    reasonEn: 'Auditing digital telemetry assets, ensuring sensor data quality, and monitoring autonomous control algorithms.',
    reasonFa: 'ثبت دارایی‌های دیجیتال، تضمین کیفیت داده و پایش الگوریتم‌ها.',
    reportingEn: 'Reports to CTO',
    reportingFa: 'گزارش به CTO',
    badge: 'Active Executive Opening'
  },
  {
    id: 'procurement-supply-chain',
    titleEn: 'Procurement & Supply Chain Management',
    titleFa: 'تدارکات و زنجیره تامین',
    assignedPersonnelEn: null,
    assignedPersonnelFa: null,
    status: 'open_career',
    reasonEn: 'Sourcing modular plant components, specialty metallurgy, and managing global EPC vendor networks.',
    reasonFa: 'تامین تجهیزات مدولار و مدیریت تامین‌کنندگان EPC.',
    reportingEn: 'Reports to COO',
    reportingFa: 'گزارش به COO',
    badge: 'Active Executive Opening'
  },
  {
    id: 'sustainability-esg-carbon',
    titleEn: 'Sustainability, ESG & Carbon Management',
    titleFa: 'پایداری، ESG و مدیریت کربن',
    assignedPersonnelEn: null,
    assignedPersonnelFa: null,
    status: 'open_career',
    reasonEn: 'Managing Carbon Capture, Utilization and Storage (CCUS), geothermal net-zero modeling, and Green Sukuk certifications.',
    reasonFa: 'مدیریت پروژه‌های CCUS، ژئوترمال و انتشار صکوک سبز.',
    reportingEn: 'Reports to CFO',
    reportingFa: 'گزارش به CFO',
    badge: 'Active Executive Opening'
  }
];

/**
 * 10-Stage Lifecycle RACI Matrix
 * Standard notations:
 * R: Responsible (مسئول انجام)
 * A: Accountable (پاسخگو و تاییدکننده نهایی)
 * C: Consulted (مشاور)
 * I: Informed (آگاه‌شونده)
 */
export const LIFECYCLE_RACI_MATRIX: RACIEntry[] = [
  {
    gate: 1,
    stageEn: 'Gate 1: Scientific Evidence & Feasibility',
    stageFa: 'مرحله ۱: اثبات علمی و امکان‌سنجی اولیه',
    objectiveEn: 'Thermodynamic modeling, laboratory validation, and empirical proof of concept.',
    objectiveFa: 'مدل‌سازی ترمودینامیکی، صحت‌سنجی آزمایشگاهی و اثبات تجربی مفهوم.',
    ceo: 'I',
    cto: 'A / R',
    coo: 'I',
    cfo: 'I',
    ipLegal: 'C',
    qaQc: 'I',
    hr: 'C'
  },
  {
    gate: 2,
    stageEn: 'Gate 2: Technology & Architecture Development',
    stageFa: 'مرحله ۲: توسعه فناوری و معماری سیستم',
    objectiveEn: 'Downhole simulation, fluid rheology synthesis, and engineering spec sheets.',
    objectiveFa: 'شبیه‌سازی چاه عمیق، سنتز نانوسیال و تدوین نقشه‌های مهندسی.',
    ceo: 'I',
    cto: 'A / R',
    coo: 'C',
    cfo: 'I',
    ipLegal: 'C',
    qaQc: 'C',
    hr: 'C'
  },
  {
    gate: 3,
    stageEn: 'Gate 3: IP Registration & Fortress Protection',
    stageFa: 'مرحله ۳: ثبت و حفاظت مالکیت فکری (IP)',
    objectiveEn: 'PCT WIPO filings, national patents, trade secret segregation, and HoldCo licensing.',
    objectiveFa: 'ثبت اختراع بین‌المللی PCT، حفاظت اسرار تجاری و ساختاردهی مالکیت فکری HoldCo.',
    ceo: 'A',
    cto: 'C',
    coo: 'I',
    cfo: 'C',
    ipLegal: 'R',
    qaQc: 'I',
    hr: 'I'
  },
  {
    gate: 4,
    stageEn: 'Gate 4: Industrial Prototype Assembly',
    stageFa: 'مرحله ۴: ساخت نمونه اولیه صنعتی (Prototype)',
    objectiveEn: 'Fabrication of testbed loops, sensor casing strings, and bench testing.',
    objectiveFa: 'ساخت پایلوت آزمایشی، مونتاژ تجهیزات و آزمون‌های کارگاهی تحت فشار.',
    ceo: 'I',
    cto: 'A / R',
    coo: 'C',
    cfo: 'I',
    ipLegal: 'I',
    qaQc: 'C',
    hr: 'I'
  },
  {
    gate: 5,
    stageEn: 'Gate 5: Field Pilot & Borehole Testing',
    stageFa: 'مرحله ۵: پایلوت میدانی و استقرار سرچاهی',
    objectiveEn: 'Live field deployment, downhole telemetry acquisition, and high-temperature trials (Qeshm/Sarakhs).',
    objectiveFa: 'استقرار در دکل حفاری میدانی، جمع‌آوری داده‌های تله‌متری حرارتی و اعتبارسنجی عملیاتی.',
    ceo: 'I',
    cto: 'C',
    coo: 'A / R',
    cfo: 'C',
    ipLegal: 'I',
    qaQc: 'C',
    hr: 'I'
  },
  {
    gate: 6,
    stageEn: 'Gate 6: Modular Product Commercialization',
    stageFa: 'مرحله ۶: تجاری‌سازی محصول مدولار',
    objectiveEn: 'Quality certification, CE/ASME compliance signoff, and modular plant manufacturing release.',
    objectiveFa: 'اخذ گواهینامه‌های استاندارد کیفی ASME، انطباق زیست‌محیطی و صدور مجوز تولید مدولار.',
    ceo: 'I',
    cto: 'C',
    coo: 'R',
    cfo: 'I',
    ipLegal: 'I',
    qaQc: 'A',
    hr: 'I'
  },
  {
    gate: 7,
    stageEn: 'Gate 7: Integrated Mega-Project Execution',
    stageFa: 'مرحله ۷: اجرای مگاپروژه یکپارچه EPC',
    objectiveEn: 'Turnkey EPC delivery, site construction, subsea/onshore tie-ins, and commissioning.',
    objectiveFa: 'اجرای کامل EPC، احداث تأسیسات سطح‌الارضی، خطوط لوله و راه‌اندازی زیرساخت.',
    ceo: 'I',
    cto: 'C',
    coo: 'A / R',
    cfo: 'C',
    ipLegal: 'I',
    qaQc: 'C',
    hr: 'I'
  },
  {
    gate: 8,
    stageEn: 'Gate 8: Strategic Infrastructure Platform',
    stageFa: 'مرحله ۸: پلتفرم زیرساختی و تأمین مالی کلان',
    objectiveEn: 'Capital syndication, sovereign wealth participation, and long-term asset operation.',
    objectiveFa: 'سندیکای سرمایه‌گذاری، جذب سرمایه‌های حاکمیتی و بهره‌برداری بلندمدت دارایی.',
    ceo: 'A',
    cto: 'C',
    coo: 'C',
    cfo: 'R',
    ipLegal: 'C',
    qaQc: 'I',
    hr: 'I'
  },
  {
    gate: 9,
    stageEn: 'Gate 9: National Scale Deployment',
    stageFa: 'مرحله ۹: استقرار در مقیاس ملی',
    objectiveEn: 'Multi-hub nationwide rollouts, energy grid interconnection, and cross-provincial EPC.',
    objectiveFa: 'گسترش در سطح ملی، اتصال پایدار به شبکه سراسری انرژی و هماهنگی نهادهای بالادستی.',
    ceo: 'A',
    cto: 'C',
    coo: 'R',
    cfo: 'R',
    ipLegal: 'C',
    qaQc: 'I',
    hr: 'C'
  },
  {
    gate: 10,
    stageEn: 'Gate 10: Internationalization & Cross-Border Scaling',
    stageFa: 'مرحله ۱۰: بین‌المللی‌سازی و صادرات فناوری',
    objectiveEn: 'Transnational joint ventures, Green Sukuk bond listings, and foreign territory licensing.',
    objectiveFa: 'مشارکت‌های فرامرزی، انتشار صکوک بین‌المللی سبز و صدور فناوری به بازارهای منطقه‌ای.',
    ceo: 'A',
    cto: 'C',
    coo: 'C',
    cfo: 'R',
    ipLegal: 'C',
    qaQc: 'I',
    hr: 'I'
  }
];

/**
 * 4 Information Security Classification Tiers
 */
export const SECURITY_CLASSIFICATION_TIERS: SecurityClassificationTier[] = [
  {
    level: 1,
    titleEn: 'Level 1: Public Disclosures',
    titleFa: 'سطح ۱: اطلاعات و انتشارات عمومی (Public)',
    classificationCode: 'PUB-L1',
    scopeEn: 'Published website pages, audited proof briefs, press releases, certified brochures, and general media.',
    scopeFa: 'محتوای وب‌سایت عمومی، خلاصه‌های ممیزی‌شده شواهد، بیانیه‌های مطبوعاتی و بروشورهای عمومی.',
    authorizedRolesEn: ['All Public Visitors', 'External Investors', 'Auditors'],
    authorizedRolesFa: ['کلیه بازدیدکنندگان', 'سرمایه‌گذاران خارجی', 'ممیزان'],
    securityControlsEn: 'Public CDN, cryptographic hash verification, TLS 1.3 encryption.',
    securityControlsFa: 'توزیع عمومی CDN، تطابق هش داده‌ها، رمزنگاری استاندارد TLS 1.3.',
    badgeColor: 'emerald'
  },
  {
    level: 2,
    titleEn: 'Level 2: Internal Operational & Administrative',
    titleFa: 'سطح ۲: اسناد داخلی و اداری سازمانی (Internal)',
    classificationCode: 'INT-L2',
    scopeEn: 'Internal correspondence, administrative procedures, operational rosters, internal cartables, and shift handovers.',
    scopeFa: 'مکاتبات اداری، شیوه‌نامه‌های عملیاتی، برنامه شیفت‌ها، کارتابل داخلی و گردش کارهای سازمانی.',
    authorizedRolesEn: ['All Authenticated KKM Personnel', 'Contractors under NDA'],
    authorizedRolesFa: ['کلیه پرسنل احراز هویت‌شده KKM', 'پیمانکاران دارای قرارداد محرمانگی'],
    securityControlsEn: 'Zero-Trust Internal Portal authentication, SSO, Role-Based Access Control (RBAC).',
    securityControlsFa: 'احراز هویت پرتال داخلی Zero-Trust، کنترل دسترسی مبتنی بر نقش (RBAC).',
    badgeColor: 'sky'
  },
  {
    level: 3,
    titleEn: 'Level 3: Confidential Technology & Financials',
    titleFa: 'سطح ۳: فناوری محرمانه و اسناد مالی (Confidential)',
    classificationCode: 'CONF-L3',
    scopeEn: 'Downhole sensor raw telemetry, nanofluid synthesis formulations, detailed financial ledgers, and reservoir simulation code.',
    scopeFa: 'داده‌های تله‌متری خام سنسورها، فرمولاسیون نانوسیال، دفاتر مالیاتی و تفصیلی و کدهای شبیه‌ساز مخزن.',
    authorizedRolesEn: ['CTO', 'CFO', 'CISO', 'Designated Senior Department Heads'],
    authorizedRolesFa: ['معاونت فناوری (CTO)', 'معاونت مالی (CFO)', 'مدیر امنیت (CISO)', 'مدیران ارشد ذی‌ربط'],
    securityControlsEn: 'Hardware security keys, AES-256 field encryption, dynamic access watermarks, audited read-logs.',
    securityControlsFa: 'کلید امنیتی سخت‌افزاری، رمزنگاری پیشرفته AES-256، واترمارک متغیر و ثبت لاگ ممیزی.',
    badgeColor: 'amber'
  },
  {
    level: 4,
    titleEn: 'Level 4: Restricted IP & Strategic Sovereign',
    titleFa: 'سطح ۴: مالکیت فکری راهبردی و به‌کلی سری (Restricted IP)',
    classificationCode: 'REST-L4',
    scopeEn: 'Core patent claims prior to WIPO publication, IP HoldCo ownership agreements, trade secrets, and sovereign transnational SPVs.',
    scopeFa: 'ادعاهای ثبت اختراع قبل از انتشار بین‌المللی، اسناد مالکیت فکری HoldCo، اسرار تجاری و ساختارهای SPV فراملی.',
    authorizedRolesEn: ['CEO (Gino Ayyoubian)', 'Director of IP & Legal', 'Audit & Risk Committee'],
    authorizedRolesFa: ['مدیر ارشد اجرایی (سید ژینو ایوبیان مرکزی)', 'مدیر دفتر IP و امور حقوقی', 'کمیته حسابرسی و ریسک'],
    securityControlsEn: 'Dual-custody authorization, air-gapped cryptographic vaults, biometric executive release.',
    securityControlsFa: 'تأییدیه دوگانه مدیریتی، مخزن رمزشده مجزا (Air-gapped) و رصد بی‌درنگ دسترسی.',
    badgeColor: 'rose'
  }
];

/**
 * 4 Operational Workflow Phases
 */
export const OPERATIONAL_WORKFLOW_PHASES = [
  {
    phase: 1,
    titleEn: 'Phase 1: Research, Ideation & Lab Simulation',
    titleFa: 'فاز ۱: پژوهش، ایده‌پردازی و شبیه‌سازی آزمایشگاهی',
    stepsEn: ['Thermodynamic hypothesis', 'Fluid rheology optimization', 'Lab loop validation'],
    stepsFa: ['فرضیه ترمودینامیکی', 'بهینه‌سازی خواص نانوسیال', 'صحت‌سنجی آزمایشگاهی'],
    leadEn: 'Technology Directorate (CTO)',
    leadFa: 'معاونت فناوری (CTO)'
  },
  {
    phase: 2,
    titleEn: 'Phase 2: IP Protection, Prototype & Tooling',
    titleFa: 'فاز ۲: حفاظت مالکیت فکری، نمونه‌سازی و ابزارسازی',
    stepsEn: ['Patent claim preparation', 'High-pressure test loop assembly', 'API/ASME tool calibration'],
    stepsFa: ['تنظیم ادعانامه پتنت', 'مونتاژ پایلوت تحت فشار', 'کالیبراسیون تجهیزات استانداردی'],
    leadEn: 'Legal/IP Office & CTO',
    leadFa: 'دفتر IP و امور حقوقی و معاونت فناوری'
  },
  {
    phase: 3,
    titleEn: 'Phase 3: Field Pilot Testing & HSE Verification',
    titleFa: 'فاز ۳: آزمون میدانی پایلوت و ممیزی HSE',
    stepsEn: ['Rig mobilization', 'Sour service (H2S) safety protocol', 'Live sensor telemetry streaming'],
    stepsFa: ['استقرار دکل حفاری', 'پروتکل ایمنی گاز ترش H2S', 'ارسال بی‌درنگ داده‌های حسگرها'],
    leadEn: 'Operations & EPC (COO) + HSE Head',
    leadFa: 'معاونت اجرایی (COO) و مدیریت HSE'
  },
  {
    phase: 4,
    titleEn: 'Phase 4: Commercialization, EPC & International Growth',
    titleFa: 'فاز ۴: تجاری‌سازی، اجرای EPC و گسترش بین‌المللی',
    stepsEn: ['Modular commercial production', 'EPC mega-project delivery', 'Green Sukuk capital listing'],
    stepsFa: ['تولید مدولار تجاری', 'تحویل پروژه کلیددردست EPC', 'تأمین مالی از طریق صکوک سبز'],
    leadEn: 'Executive Board (CEO & CFO)',
    leadFa: 'هیئت مدیره اجرایی (CEO و CFO)'
  }
];

/**
 * Fundamental Structural Design Principles
 */
export const STRUCTURAL_DESIGN_PRINCIPLES = [
  {
    number: '1',
    titleEn: 'Independence of QA/QC, HSE & Compliance',
    titleFa: 'استقلال کامل QA/QC، HSE و انطباق قانونی',
    descEn: 'Technical inspection, HSE oversight, and compliance audit units operate strictly outside the COO operational command line to ensure unbiased quality and safety assurance.',
    descFa: 'واحدهای بازرسی فنی، مدیریت HSE و انطباق حقوقی کاملاً خارج از خط عملیاتی COO قرار داشته و مستقیماً به کمیته حسابرسی و ریسک گزارش می‌دهند.'
  },
  {
    number: '2',
    titleEn: 'Strict Conflict of Interest Governance',
    titleFa: 'مدیریت و سلب اختیار در تعارض منافع',
    descEn: 'No executive or board member holds voting or approval rights on decisions involving external personal or corporate relationships outside KKM.',
    descFa: 'هیچ فردی در تصمیم‌گیری‌هایی که منفعت شخصی یا شرکتی خارج از KKM دارد حق رای یا اعمال نفوذ ندارد.'
  },
  {
    number: '3',
    titleEn: 'Institutional Leadership Continuity',
    titleFa: 'تداوم مدیریتی و جانشین‌پروری',
    descEn: 'Every key directorate maintains a designated qualified second-in-command to guarantee uninterrupted operational governance.',
    descFa: 'تعیین حداقل یک جانشین شایسته برای هر سمت کلیدی جهت تضمین تداوم بی‌وقفه عملیات در شرایط بحرانی.'
  },
  {
    number: '4',
    titleEn: 'Dual-Role Limitation Rule',
    titleFa: 'محدودیت هم‌زمانی مسئولیت‌های اجرایی',
    descEn: 'To prevent cognitive overload and maintain execution quality, individuals are limited to a maximum of two concurrent executive responsibilities across projects.',
    descFa: 'حداکثر دو مسئولیت اجرایی هم‌زمان برای هر فرد در پروژه‌ها به منظور حفظ تمرکز و کیفیت نظارت مهندسی.'
  }
];
