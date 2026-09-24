export type VerificationLevel = 
  | 'A' // Verified Operational Data: Actual measured data with documentary evidence
  | 'B' // Independently Verified: Evidence independently validated by a named third party
  | 'C' // Internal Test Result: Result from KKM or a project/research team
  | 'D' // Modelled / Estimated: Engineering model, simulation, calculation or forecast
  | 'E' // Development Target: Target rather than achieved result
  | 'F' // Demonstration Data: UI/demo data used to demonstrate a platform
  | 'G'; // Conceptual: Proposed technology or future application

export type ClaimCategory = 
  | 'Corporate Claims'
  | 'Technology Claims'
  | 'Project Claims'
  | 'ESG Claims'
  | 'Environmental Metrics'
  | 'Performance Metrics'
  | 'IP Claims'
  | 'Certifications';

export interface EvidenceClaim {
  id: string;
  claimEn: string;
  claimFa: string;
  category: ClaimCategory;
  source: string;
  evidenceFile: string;
  measurementMethodEn: string;
  measurementMethodFa: string;
  date: string;
  project?: string;
  technology?: string;
  owner: string;
  reviewer: string;
  verificationLevel: VerificationLevel;
  publicationStatus: 'Public' | 'Public with Qualification' | 'Internal' | 'Under Review';
  reviewDate: string;
  qualificationNotesEn?: string;
  qualificationNotesFa?: string;
}

export const VERIFICATION_LEVEL_DETAILS: Record<VerificationLevel, {
  labelEn: string;
  labelFa: string;
  color: string;
  bgLight: string;
  bgDark: string;
  borderLight: string;
  borderDark: string;
  descriptionEn: string;
  descriptionFa: string;
}> = {
  A: {
    labelEn: 'Level A — Verified Operational Data',
    labelFa: 'سطح A — داده‌های عملیاتی اندازه‌گیری‌شده',
    color: 'text-emerald-700 dark:text-emerald-300',
    bgLight: 'bg-emerald-50',
    bgDark: 'dark:bg-emerald-950/40',
    borderLight: 'border-emerald-200',
    borderDark: 'dark:border-emerald-800',
    descriptionEn: 'Actual field-measured data backed by signed engineering and operational logs.',
    descriptionFa: 'داده‌های واقعی میدانی به همراه دفاتر ثبت لاگ عملیاتی و تأییدیه مهندسی کارفرما.'
  },
  B: {
    labelEn: 'Level B — Independently Verified',
    labelFa: 'سطح B — ارزیابی و تأیید شخص ثالث مستقل',
    color: 'text-blue-700 dark:text-blue-300',
    bgLight: 'bg-blue-50',
    bgDark: 'dark:bg-blue-950/40',
    borderLight: 'border-blue-200',
    borderDark: 'dark:border-blue-800',
    descriptionEn: 'Evidence independently audited and validated by an accredited third-party agency.',
    descriptionFa: 'شواهد ارزیابی‌شده و ممیزی‌شده توسط مرجع بازرسی فنی یا آزمایشگاه معتبر ثالث.'
  },
  C: {
    labelEn: 'Level C — Internal Test Result',
    labelFa: 'سطح C — نتایج آزمون‌های درون‌سازمانی',
    color: 'text-purple-700 dark:text-purple-300',
    bgLight: 'bg-purple-50',
    bgDark: 'dark:bg-purple-950/40',
    borderLight: 'border-purple-200',
    borderDark: 'dark:border-purple-800',
    descriptionEn: 'Laboratory or closed-loop testbed data recorded by KKM engineering/research teams.',
    descriptionFa: 'داده‌های ثبت‌شده در تست‌بدهای پایلوت، تجهیزات آزمایشگاهی یا لوپ بسته توسط تیم تحقیق و توسعه KKM.'
  },
  D: {
    labelEn: 'Level D — Modelled / Estimated',
    labelFa: 'سطح D — شبیه‌سازی و مدل‌سازی مهندسی',
    color: 'text-amber-700 dark:text-amber-300',
    bgLight: 'bg-amber-50',
    bgDark: 'dark:bg-amber-950/40',
    borderLight: 'border-amber-200',
    borderDark: 'dark:border-amber-800',
    descriptionEn: 'Thermodynamic cycle simulations, numerical forecasts, and reservoir engineering calculations.',
    descriptionFa: 'شبیه‌سازی‌های ترمودینامیکی، مدل‌های عددی مخزن و برآوردهای محاسباتی چرخه انرژی.'
  },
  E: {
    labelEn: 'Level E — Development Target',
    labelFa: 'سطح E — اهداف و تارگت‌های توسعه',
    color: 'text-cyan-700 dark:text-cyan-300',
    bgLight: 'bg-cyan-50',
    bgDark: 'dark:bg-cyan-950/40',
    borderLight: 'border-cyan-200',
    borderDark: 'dark:border-cyan-800',
    descriptionEn: 'Planned engineering milestones and KPI targets established for upcoming deployment phases.',
    descriptionFa: 'اهداف عملکردی و شاخص‌های کلیدی هدف‌گذاری شده برای مراحل اجرای آتی پروژه.'
  },
  F: {
    labelEn: 'Level F — Demonstration Data',
    labelFa: 'سطح F — داده‌های نمایشی پلتفرم',
    color: 'text-slate-700 dark:text-slate-300',
    bgLight: 'bg-slate-100',
    bgDark: 'dark:bg-slate-800/60',
    borderLight: 'border-slate-300',
    borderDark: 'dark:border-slate-700',
    descriptionEn: 'Synthesized telemetry data used strictly for platform UI/UX functional demonstration.',
    descriptionFa: 'داده‌های شبیه‌سازی‌شده صرفاً جهت نمایش قابلیت‌های رابط کاربری پلتفرم و سامانه‌های مانیتورینگ.'
  },
  G: {
    labelEn: 'Level G — Conceptual',
    labelFa: 'سطح G — مفاهیم بنیادین و کاربردهای آتی',
    color: 'text-indigo-700 dark:text-indigo-300',
    bgLight: 'bg-indigo-50',
    bgDark: 'dark:bg-indigo-950/40',
    borderLight: 'border-indigo-200',
    borderDark: 'dark:border-indigo-800',
    descriptionEn: 'Conceptual proposals, early-stage exploratory architectures, and future technology roadmaps.',
    descriptionFa: 'مفاهیم اولیه، معماری‌های مفهومی و چشم‌اندازهای توسعه فناوری در مراحل پیش از امکان‌سنجی.'
  }
};

export const EVIDENCE_REGISTRY: EvidenceClaim[] = [
  // Technology Claims
  {
    id: 'GMEL-CLAIM-001',
    claimEn: 'Closed-loop geothermal extraction eliminates surface fluid venting and groundwater contamination risk.',
    claimFa: 'فناوری استخراج مداربسته زمین‌گرمایی (GMEL-CLG) انتشار گازهای سطحی و خطر آلودگی آبخوان‌های زیرزمینی را به صفر می‌رساند.',
    category: 'Technology Claims',
    source: 'Closed-Loop Wellbore Casing Thermodynamics Study',
    evidenceFile: 'EVD-TECH-GMEL-2025-01.pdf',
    measurementMethodEn: 'Continuous pressure and tracer-gas monitoring inside hermetically sealed loop',
    measurementMethodFa: 'پایش مستمر افت فشار و آزمون ردیاب گازی درون لوله جداره آب‌بندی‌شده حلقوی',
    date: '2025-11-14',
    project: 'Sarakhs Depleted Reservoir Pilot',
    technology: 'GMEL-CLG',
    owner: 'Chief Subsurface Engineer',
    reviewer: 'Head of Technical Advisory Board',
    verificationLevel: 'C',
    publicationStatus: 'Public with Qualification',
    reviewDate: '2026-11-14',
    qualificationNotesEn: 'Validated on TRL-6 test bench and depleted hydrocarbon well conversion engineering package.',
    qualificationNotesFa: 'در مقیاس آزمایشگاهی TRL-6 و بسته مهندسی تبدیل چاه‌های متروکه هیدروکربوری اثبات شده است.'
  },
  {
    id: 'GMEL-CLAIM-002',
    claimEn: 'Proprietary supercritical working fluid achieves superior heat extraction coefficient versus pure water.',
    claimFa: 'سیال عامل فوق‌بحرانی اختصاصی ضریب انتقال حرارت بالاتری نسبت به آب خالص در گرادیان‌های ژئوترمال فراهم می‌سازد.',
    category: 'Technology Claims',
    source: 'Laboratory Heat Carrier Rheology & Thermal Conductivity Bench',
    evidenceFile: 'EVD-LAB-TF-2025-04.pdf',
    measurementMethodEn: 'Transient plane source (TPS) thermal conductivity analyzer at 180°C / 120 bar',
    measurementMethodFa: 'سنجش هدایت حرارتی با روش منبع سطحی گذرا (TPS) در دمای ۱۸۰ درجه سانتی‌گراد و فشار ۱۲۰ بار',
    date: '2025-08-22',
    technology: 'ThermoFluid Supercritical',
    owner: 'Materials & Chemical R&D Lead',
    reviewer: 'Chief Technology Officer',
    verificationLevel: 'C',
    publicationStatus: 'Public',
    reviewDate: '2026-08-22'
  },
  {
    id: 'TECH-CLAIM-003',
    claimEn: 'GMEL-DrillX sonic-resonance casing vibration system reduces wellbore casing friction by up to 34%.',
    claimFa: 'سامانه تشدید صوتی GMEL-DrillX اصطکاک راندن لوله‌های جداره درون‌چاهی را تا ۳۴٪ کاهش می‌دهد.',
    category: 'Performance Metrics',
    source: 'Subsurface Mechanics Rig Simulation & Mechanical Pull Test',
    evidenceFile: 'EVD-DRILLX-PULL-2024-09.pdf',
    measurementMethodEn: 'Load-cell strain telemetry during dynamic resonance excitation',
    measurementMethodFa: 'تله‌متری کرنش‌سنجی لودسل در حین تحریک ارتعاشی تشدید صوتی',
    date: '2024-09-18',
    technology: 'GMEL-DrillX',
    owner: 'Drilling Mechanics Specialist',
    reviewer: 'VP of Engineering',
    verificationLevel: 'C',
    publicationStatus: 'Public with Qualification',
    reviewDate: '2026-09-18',
    qualificationNotesEn: 'Tested in sandstone and carbonate rock core sleeves up to 1,400m simulated casing weight.',
    qualificationNotesFa: 'در نمونه‌های سنگ ماسه‌ای و کربناته تا عمق شبیه‌سازی‌شده ۱۴۰۰ متر آزمایش شده است.'
  },

  // Environmental Metrics & ESG Claims
  {
    id: 'ENV-CLAIM-001',
    claimEn: 'Binary Organic Rankine Cycle (ORC) thermal power generates electricity with zero operational Scope 1 CO₂ emissions.',
    claimFa: 'تولید توان با چرخه آلی رنکین (ORC) در نیروگاه ژئوترمال مداربسته دارای صفر انتشار مستقیم دی‌اکسیدکربن (Scope 1) در حین بهره‌برداری است.',
    category: 'Environmental Metrics',
    source: 'Life-Cycle Carbon Assessment Report (Scope 1 & 2)',
    evidenceFile: 'EVD-GHG-ORC-2025-02.pdf',
    measurementMethodEn: 'GHG Protocol Corporate Accounting and Reporting Standard / ISO 14064-1',
    measurementMethodFa: 'استاندارد پروتکل گازهای گلخانه‌ای (GHG Protocol) و رهنمود ISO 14064-1',
    date: '2025-10-05',
    project: 'Qeshm Island Green Energy Complex',
    technology: 'GMEL ORC Compact',
    owner: 'Sustainability Director',
    reviewer: 'External Environmental Auditor',
    verificationLevel: 'D',
    publicationStatus: 'Public with Qualification',
    reviewDate: '2026-10-05',
    qualificationNotesEn: 'Lifecycle Scope 3 embodied carbon in steel and cement casing remains subject to ongoing EPC supply chain audit.',
    qualificationNotesFa: 'کربن نهفته در زنجیره تأمین لوله‌های فولادی و سیمان چاه (Scope 3) در دست ممیزی زنجیره تأمین است.'
  },
  {
    id: 'ENV-CLAIM-002',
    claimEn: 'Thermal co-generation desalination utilizes low-grade reject heat without auxiliary fossil fuel combustion.',
    claimFa: 'سامانه نمک‌زدایی همزمان حرارتی از تلفات گرمایی دماپایین بدون نیاز به سوزاندن سوخت‌های فسیلی کمکی استفاده می‌کند.',
    category: 'Environmental Metrics',
    source: 'Thermal Cogeneration Engineering Flowsheet Model',
    evidenceFile: 'EVD-DESAL-THERMO-2025-07.pdf',
    measurementMethodEn: 'Mass-energy balance thermodynamic modeling across multi-effect evaporator stages',
    measurementMethodFa: 'مدل موازنه جرم و انرژی ترمودینامیکی در مراحل تبخیرکننده‌های چنداثره',
    date: '2025-07-19',
    project: 'Qeshm Green Energy & Biotech Hub',
    technology: 'Thermal Desalination Co-Gen',
    owner: 'Water Process Engineering Lead',
    reviewer: 'Chief Technical Advisor',
    verificationLevel: 'D',
    publicationStatus: 'Public with Qualification',
    reviewDate: '2026-07-19',
    qualificationNotesEn: 'Output forecasts are calibrated for seawater salinity range 38,000 - 42,000 ppm at 45°C thermal feed.',
    qualificationNotesFa: 'پیش‌بینی بازدهی بر اساس شوری آب دریا بین ۳۸ تا ۴۲ هزار ppm و خوراک حرارتی ۴۵ درجه کالیبره شده است.'
  },

  // Corporate & Certifications Claims
  {
    id: 'CORP-CLAIM-001',
    claimEn: 'Kimia Karan Mâd is a legally registered private joint-stock corporate entity in Iran with Reg. No. 384054 and National ID 10320351200.',
    claimFa: 'شرکت کیمیا کاران ماد (سهامی خاص) با شماره ثبت رسمی ۳۸۴۰۵۴ و شناسه ملی ۱۰۳۲۰۳۵۱۲۰۰ ثبت شده و در چارچوب قوانین جمهوری اسلامی ایران فعالیت می‌نماید.',
    category: 'Corporate Claims',
    source: 'State Organization for Registration of Deeds and Properties, Companies Registration General Office',
    evidenceFile: 'EVD-CORP-REG-384054.pdf',
    measurementMethodEn: 'Official Gazette Publication & Corporate Registration Certificate Verification',
    measurementMethodFa: 'استعلام آگهی روزنامه رسمی جمهوری اسلامی ایران و گواهی ثبت شرکت‌ها',
    date: '2010-09-15',
    owner: 'Chief Legal Officer',
    reviewer: 'Board of Directors',
    verificationLevel: 'A',
    publicationStatus: 'Public',
    reviewDate: '2027-01-01'
  },
  {
    id: 'CERT-CLAIM-001',
    claimEn: 'Implementation of Anti-Bribery Management System in alignment with ISO 37001 standards.',
    claimFa: 'پیاده‌سازی ساختار مدیریت مبارزه با رشوه‌خواری منطبق با الزامات و استانداردهای ایزو ۳۷۰۰۱ (ISO 37001).',
    category: 'Certifications',
    source: 'KKM Internal Anti-Corruption Code & Compliance Manual Rev. 3',
    evidenceFile: 'EVD-GOV-ISO37001-MANUAL-2025.pdf',
    measurementMethodEn: 'Gap analysis audit and internal compliance verification against ISO 37001 checklist',
    measurementMethodFa: 'ممیزی شکاف و انطباق چک‌لیست‌های سیستمی با مفاد استاندارد بین‌المللی ISO 37001',
    date: '2025-06-10',
    owner: 'Compliance & Legal Counsel',
    reviewer: 'Independent Governance Committee',
    verificationLevel: 'E',
    publicationStatus: 'Public with Qualification',
    reviewDate: '2026-06-10',
    qualificationNotesEn: 'Accredited third-party certification audit scheduled for Q4 2026. Current status is Stage-1 implementation readiness.',
    qualificationNotesFa: 'ممیزی گواهی‌نامه نهایی شخص ثالث برای پایان ۲۰۲۶ برنامه‌ریزی شده است. وضعیت فعلی: آمادگی فاز یک پیاده‌سازی سازمانی.'
  },
  {
    id: 'CERT-CLAIM-002',
    claimEn: 'Environmental Management System framework structured under ISO 14001 guidelines.',
    claimFa: 'چارچوب استقرار یافته نظام مدیریت زیست‌محیطی مبتنی بر راهنماها و اصول بین‌المللی ISO 14001.',
    category: 'Certifications',
    source: 'Corporate Environmental Policy and HSE Management Protocol',
    evidenceFile: 'EVD-HSE-ISO14001-POLICY-2025.pdf',
    measurementMethodEn: 'Internal environmental aspects identification and regulatory compliance review',
    measurementMethodFa: 'شناسایی جنبه‌های زیست‌محیطی پروژه‌ها و ارزیابی انطباق قانونی درون‌سازمانی',
    date: '2025-05-14',
    owner: 'HSE & Environmental Manager',
    reviewer: 'Technical Operations Director',
    verificationLevel: 'E',
    publicationStatus: 'Public with Qualification',
    reviewDate: '2026-05-14',
    qualificationNotesEn: 'Formal external certification body audit pending completion of active regional pilot testbeds.',
    qualificationNotesFa: 'اخذ مدرک رسمی صدور گواهی‌نامه خارجی منوط به اتمام فاز پایلوت در سایت‌های فعال منطقه‌ای است.'
  },

  // IP Claims
  {
    id: 'IP-CLAIM-001',
    claimEn: 'Closed-loop geothermal energy extraction system with multi-stage coaxial vacuum-insulated tubing (GMEL-CLG-001).',
    claimFa: 'سامانه استخراج زمین‌گرمایی مداربسته با لوله‌های هم‌مرکز عایق خلأ چندمرحله‌ای (کد دارایی فکری: GMEL-CLG-001).',
    category: 'IP Claims',
    source: 'Patent Application Filing Dossier & Prior Art Search Report',
    evidenceFile: 'EVD-IP-GMEL-CLG-001.pdf',
    measurementMethodEn: 'National Patent Office filing receipt & PCT international search authority review',
    measurementMethodFa: 'رسید استعلام اظهارنامه اداره ثبت اختراعات و گزارش جستجوی پیشینه فنی بین‌المللی',
    date: '2024-12-08',
    technology: 'GMEL-CLG',
    owner: 'Head of Intellectual Property',
    reviewer: 'Senior Patent Attorney',
    verificationLevel: 'A',
    publicationStatus: 'Public',
    reviewDate: '2026-12-08',
    qualificationNotesEn: 'Status: Patent Application Filed / Pending Examination. Covered by strict non-disclosure protections.',
    qualificationNotesFa: 'وضعیت: اظهارنامه اختراع ثبت‌شده / در دست بررسی کارشناسی رسمی. تحت پوشش محرمانگی تجاری.'
  },
  {
    id: 'IP-CLAIM-002',
    claimEn: 'Supercritical synthetic organic heat transfer fluid formulation with anti-fouling corrosion inhibitors (GMEL-TF-002).',
    claimFa: 'فرمولاسیون سیال انتقال حرارت آلی فوق‌بحرانی سنتزی با مهارکننده‌های ضدخوردگی و رسوب‌زدایی (کد: GMEL-TF-002).',
    category: 'IP Claims',
    source: 'Confidential Trade Secret Register & Chemical Specification Sheet',
    evidenceFile: 'EVD-IP-GMEL-TF-002-VAULT.pdf',
    measurementMethodEn: 'Encrypted trade-secret deposit log with digital timestamping and dual-key custody',
    measurementMethodFa: 'ثبت در صندوق حفاظت از اسرار تجاری دارای مهر زمانی دیجیتال و نگهداری دومرحله‌ای',
    date: '2025-03-20',
    technology: 'ThermoFluid',
    owner: 'Chief Chemical Scientist',
    reviewer: 'Chief Legal Officer',
    verificationLevel: 'A',
    publicationStatus: 'Public with Qualification',
    reviewDate: '2027-03-20',
    qualificationNotesEn: 'Protected under Trade Secret Protocol. Chemical formulation details withheld from public domain.',
    qualificationNotesFa: 'محافظت‌شده تحت پروتکل بین‌المللی اسرار تجاری (Trade Secret). جزئیات فرمولاسیون شیمیایی محرمانه است.'
  },

  // Project Claims
  {
    id: 'PROJ-CLAIM-001',
    claimEn: 'Feasibility analysis confirms viability of retrofitting decommissioned natural gas wellbores in Sarakhs basin for geothermal power.',
    claimFa: 'امکان‌سنجی فنی-اقتصادی، امکان استفاده مجدد از چاه‌های متروکه گاز حوضه سرخس را برای استحصال انرژی زمین‌گرمایی تأیید می‌کند.',
    category: 'Project Claims',
    source: 'Comprehensive Subsurface Reservoir Simulation & Well Log Synthesis',
    evidenceFile: 'EVD-SARAKHS-FEASIBILITY-2025.pdf',
    measurementMethodEn: 'Geothermal gradient profiling and 3D hydrodynamic reservoir modeling (ECLIPSE / Petrel)',
    measurementMethodFa: 'پروفایل‌برداری گرادیان زمین‌گرمایی و مدل‌سازی سه‌بعدی هیدرودینامیک مخزن',
    date: '2025-04-18',
    project: 'ICOFC Sarakhs Subsurface Testbed',
    technology: 'GMEL-CLG / GMEL-EHS',
    owner: 'Project Director Sarakhs',
    reviewer: 'Technical Review Committee',
    verificationLevel: 'D',
    publicationStatus: 'Public',
    reviewDate: '2026-04-18'
  },
  {
    id: 'PROJ-CLAIM-002',
    claimEn: 'Integrated territorial masterplan for 25 priority arid villages designed with closed energy-water-agriculture nexus.',
    claimFa: 'مسترپلن یکپارچه سرزمینی برای ۲۵ روستای منتخب اولویت‌دار در مناطق کم‌آب بر پایه همبست آب، انرژی و کشاورزی تدوین شده است.',
    category: 'Project Claims',
    source: 'Rural & Nomadic Integrated Development Technical Dossier (Exhibition 1405)',
    evidenceFile: 'EVD-RURAL-25VILLAGE-2025.pdf',
    measurementMethodEn: 'GIS multi-criteria geospatial mapping, groundwater telemetry surveys, and household economic census',
    measurementMethodFa: 'نقشه‌برداری مکانی چندمعیاره GIS، آمارگیری هیدرولوژی و داده‌برداری اقتصادی سکونت‌گاه‌ها',
    date: '2025-11-20',
    project: 'Rural & Nomadic Integrated Platform',
    technology: 'Energy-Water-Agri Nexus',
    owner: 'Head of Territorial & Rural Platforms',
    reviewer: 'Executive Advisory Council',
    verificationLevel: 'A',
    publicationStatus: 'Public',
    reviewDate: '2026-11-20'
  },

  // Team Member Verified Corporate Credentials
  {
    id: 'KKM-EVID-2026-CEO-001',
    claimEn: 'Gino Ayyoubian is certified as Founder, Chief Executive Officer & Chairman with full sovereign signature authority.',
    claimFa: 'سید ژینو ایوبیان به عنوان بنیان‌گذار، مدیرعامل و رئیس هیئت مدیره با حق امضای تعهدآور و اختیارات کامل قانونی تأیید شده است.',
    category: 'Certifications',
    source: 'KKM Directorate of Governance & Identity Registry / Official Gazette Reg. 493011',
    evidenceFile: 'EVD-EXEC-CEO-GINO-AYYOUBIAN-2026.pdf',
    measurementMethodEn: 'Official Gazette ratification, corporate charter registration, and biometrically attested board minutes',
    measurementMethodFa: 'تأییدیه روزنامه رسمی، ثبت شرکت‌ها و صورت‌جلسات هیئت مدیره با توشیح قانونی و امضای دیجیتال',
    date: '2026-09-24',
    owner: 'KKM Directorate of Governance',
    reviewer: 'Executive Board Secretariat',
    verificationLevel: 'A',
    publicationStatus: 'Public',
    reviewDate: '2027-09-24'
  },
  {
    id: 'KKM-EVID-2026-CTO-002',
    claimEn: 'Dr. Reza Asakereh is certified as Chief Technology Officer directing AI telemetry, digital twin and subsurface algorithms.',
    claimFa: 'دکتر رضا عساکره به عنوان مدیر ارشد فناوری و هدایت‌کننده هوش مصنوعی، دوقلوی دیجیتال و الگوریتم‌های شناختی تأیید شده است.',
    category: 'Certifications',
    source: 'KKM Technical Advisory Board & IEEE Senior Membership Registry',
    evidenceFile: 'EVD-EXEC-CTO-REZA-ASAKEREH-2026.pdf',
    measurementMethodEn: 'Doctoral credential validation, technical peer review, and enterprise security clearance clearance',
    measurementMethodFa: 'تطبیق مدارک دانشگاهی دکتری، داوری فنی شورای نخبگان و تایید صلاحیت دسترسی راهبردی',
    date: '2026-09-24',
    owner: 'Chief Executive Officer',
    reviewer: 'Technical Advisory Board',
    verificationLevel: 'A',
    publicationStatus: 'Public',
    reviewDate: '2027-09-24'
  }
];
