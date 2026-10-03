import * as React from 'react';
import PageHeader from '../components/PageHeader';
import { useLanguage } from '../LanguageContext';
import { Page } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, ShieldCheck, Briefcase, Sparkles, Cpu, Users, 
  ExternalLink, X, Mail, Phone, Copy, Check, ChevronRight, 
  Building2, Search, CheckCircle2 
} from 'lucide-react';

interface TeamPageProps {
  setPage?: (page: Page) => void;
}

export type TeamCategory = 'leadership' | 'engineering' | 'support';

export interface Member {
  id: string;
  name: string;
  nameFa: string;
  title: string;
  titleFa: string;
  department: string;
  departmentFa: string;
  bio: string;
  bioFa: string;
  initials: string;
  credentials: string[];
  imageUrl?: string;
  category: TeamCategory;
  linkedInUrl?: string;
  email?: string;
  phone?: string;
  sipExtension?: string;
  employeeId?: string;
  clearanceLevel?: string;
  engineeringDomains?: string[];
}

const parseLinkedInHandle = (url?: string): string | null => {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (!/(^|\.)linkedin\.com$/.test(u.hostname)) return null;
    const m = u.pathname.match(/^\/in\/([^/]+)/);
    return m ? decodeURIComponent(m[1]) : null;
  } catch {
    return null;
  }
};

const buildExperienceSummary = (m: Member, isFa: boolean): string => {
  const areas = (m.engineeringDomains && m.engineeringDomains.length ? m.engineeringDomains : m.credentials).slice(0, 4).join(isFa ? '، ' : ', ');
  return isFa
    ? `${m.titleFa} در ${m.departmentFa}؛ تجربه در: ${areas}.`
    : `${m.title} in ${m.department}; experience across: ${areas}.`;
};

const LEADERSHIP: Member[] = [
  // ============================
  // LEADERSHIP CATEGORY
  // ============================
  {
    id: "gino-ayyoubian",
    name: "Gino Ayyoubian",
    nameFa: "سید ژینو ایوبیان",
    title: "Chief Executive Officer & Chairman of the Board",
    titleFa: "مدیرعامل و رئیس هیئت مدیره",
    department: "Executive Board & Strategic Directorate",
    departmentFa: "دفتر مدیریت عامل و هیئت مدیره",
    bio: "Visionary engineering executive leading KKM International Group and Kimia Karan Mâd across international energy transitions, deep closed-loop geothermal deployment, and rural empowerment initiatives.",
    bioFa: "راهبر ارشد اجرایی و بنیان‌گذار تحول دیجیتال و صنعتی در گروه KKM با سابقه هدایت مگاپروژه‌های انرژی پاک، فناوری زمین‌گرمایی ژئومتا (GMEL) و توانمندسازی مناطق کمتر توسعه‌یافته.",
    initials: "GA",
    credentials: ["Executive Leadership", "EPCM Management", "WIPO Patentee", "Energy Transition Strategist"],
    imageUrl: "/images/gino-ayyoubian.jpg",
    category: "leadership",
    linkedInUrl: "https://www.linkedin.com/in/gino-ayyoubian",
    email: "g.ayyoubian@kkm-intl.org",
    phone: "+98 21 9103 0830",
    sipExtension: "101",
    employeeId: "KKM-001",
    clearanceLevel: "Top Secret / Strategic",
    engineeringDomains: [
      "GMEL Deep Geothermal Conversion",
      "Subsurface Fluid Mechanics",
      "Closed-Loop Energy Cycles",
      "Mega-Infrastructure EPC"
    ]
  },
  {
    id: "reza-baghdadchi",
    name: "Reza Baghdadchi",
    nameFa: "رضا بغدادچی",
    title: "Vice Chairman & Senior Executive Director",
    titleFa: "نایب رئیس هیئت مدیره و مدیر ارشد اجرایی",
    department: "Executive Board & Corporate Strategy",
    departmentFa: "هیئت مدیره و راهبرد توسعه کلان",
    bio: "Senior corporate governance and industrial strategy leader directing international operations, multi-sector partnerships, and enterprise governance across KKM's global ventures.",
    bioFa: "راهبر ارشد حاکمیت شرکتی و راهبرد صنعتی، ناظر بر تعاملات بین‌المللی، مشارکت‌های راهبردی و انضباط سازمانی در پروژه‌های فرامرزی و کنسرسیوم‌های بین‌المللی گروه KKM.",
    initials: "RB",
    credentials: ["Corporate Governance", "Strategic Planning", "International Joint Ventures", "Executive Board"],
    imageUrl: "/images/reza-baghdadchi.jpg",
    category: "leadership",
    linkedInUrl: "https://www.linkedin.com/in/reza-baghdadchi-8028b07a",
    email: "r.baghdadchi@kkm-intl.org",
    phone: "+98 21 9103 0834",
    sipExtension: "105",
    employeeId: "KKM-007",
    clearanceLevel: "Top Secret / Strategic",
    engineeringDomains: [
      "Corporate Governance",
      "Industrial Strategy",
      "International Joint Ventures",
      "Enterprise Risk Management"
    ]
  },
  {
    id: "ashkan-tofangchiha",
    name: "Ashkan Tofangchiha",
    nameFa: "اشکان تفنگچی‌ها",
    title: "Board Member & Chief Commercial & Investment Officer",
    titleFa: "عضو هیئت مدیره و مدیر ارشد بازرگانی و سرمایه‌گذاری",
    department: "Commercial Directorate & Capital Allocations",
    departmentFa: "هیئت مدیره، توسعه تجاری و سرمایه‌گذاری بین‌الملل",
    bio: "Directing capital structuring, international commercial contracts, institutional investor relations, and strategic project financing for closed-loop energy and industrial infrastructure.",
    bioFa: "هدایت‌کننده ساختارهای تأمین مالی، قراردادهای بین‌المللی تجاری، تعامل با سرمایه‌گذاران نهادی و تأمین سرمایه برای زیرساخت‌های کلان انرژی پاک و پروژه‌های EPC.",
    initials: "AT",
    credentials: ["Project Financing", "Capital Structuring", "Commercial Contracts", "Executive Board"],
    imageUrl: "/images/ashkan-tofangchiha.jpg",
    category: "leadership",
    linkedInUrl: "https://www.linkedin.com/in/ashkantofangchiha",
    email: "a.tofangchiha@kkm-intl.org",
    phone: "+98 21 9103 0835",
    sipExtension: "106",
    employeeId: "KKM-008",
    clearanceLevel: "Top Secret / Strategic",
    engineeringDomains: [
      "Project Financing",
      "Capital Markets",
      "International Commercial Contracts",
      "Energy Asset Valuation"
    ]
  },
  {
    id: "pedram-abdarzadeh",
    name: "Dr. Pedram Abdarzadeh",
    nameFa: "دکتر پدرام آبدارزاده",
    title: "Chief Financial Officer (CFO)",
    titleFa: "مدیر ارشد مالی و بودجه",
    department: "Finance & Accounting",
    departmentFa: "امور مالی، حسابداری و بودجه‌ریزی",
    bio: "Chief Financial Officer leading fiscal compliance, sovereign energy bond issuance, and multi-currency treasury operations across clean tech infrastructure.",
    bioFa: "مدیر ارشد مالی و بودجه؛ مدیر حاکمیت مالی، انتشار اوراق قرضه انرژی پاک و عملیات خزانه‌داری ارزی در پروژه‌های پیشرفته انرژی پایدار.",
    initials: "PA",
    credentials: ["Ph.D. Economics & Finance", "IFRS Clean Tech Compliance", "Executive Committee"],
    imageUrl: "/images/pedram-abdarzadeh.jpg",
    category: "leadership",
    linkedInUrl: "https://www.linkedin.com/in/pedram-abdarzadeh-64515689",
    email: "p.abdarzadeh@kkm-intl.org",
    phone: "+98 21 9103 0834",
    sipExtension: "105",
    employeeId: "KKM-005",
    clearanceLevel: "Confidential / Tier-1",
    engineeringDomains: [
      "Macroeconomic Modeling",
      "Cross-Border Financial Governance",
      "IFRS Clean Tech Compliance",
      "Carbon Credit Arbitrage"
    ]
  },
  {
    id: "farid-imani",
    name: "Farid Imani",
    nameFa: "فرید ایمانی",
    title: "Chief Investment Officer (CIO)",
    titleFa: "مدیر ارشد سرمایه‌گذاری و دارایی‌ها",
    department: "Finance & Investments",
    departmentFa: "سرمایه‌گذاری، تامین مالی و دارایی‌های سرمایه‌ای",
    bio: "Chief Investment Officer directing international clean infrastructure fund allocation and sovereign capital syndication.",
    bioFa: "مدیر ارشد سرمایه‌گذاری؛ هدایت‌کننده جذب و تخصیص سرمایه در مگاپروژه‌های انرژی پاک و دارایی‌های بدون کربن.",
    initials: "FI",
    credentials: ["Infrastructure Financing", "Capital Syndication", "Asset Valuation"],
    category: "leadership",
    linkedInUrl: "https://www.linkedin.com/in/farid-imani-0aaa0313",
    email: "f.imani@kkm-intl.org",
    phone: "+98 21 9103 0833",
    sipExtension: "104",
    employeeId: "KKM-004",
    clearanceLevel: "Confidential / Tier-1",
    engineeringDomains: [
      "Infrastructure Project Structuring",
      "Sovereign Capital Syndication",
      "Decarbonization Asset Pricing"
    ]
  },

  // ============================
  // ENGINEERING CATEGORY
  // ============================
  {
    id: "reza-asakereh",
    name: "Dr. Reza Asakereh",
    nameFa: "دکتر رضا عساکره",
    title: "Director of Cognitive Systems & Digital Twins",
    titleFa: "مدیر ارشد فناوری، هوش مصنوعی و سامانه‌های شناختی",
    department: "Industrial AI & Computing",
    departmentFa: "هوش مصنوعی صنعتی و محاسبات پیشرفته",
    bio: "Architect behind KKM's real-time digital twin architecture, integrating physics-informed neural networks with field telemetry and reservoir physics.",
    bioFa: "معمار زیرساخت دوقلوهای دیجیتال و یکپارچه‌سازی شبکه‌های عصبی مبتنی بر فیزیک با داده‌های تله‌متری مخزن و سیستم‌های کنترل ترمودینامیکی خودکار.",
    initials: "RA",
    credentials: ["Ph.D. Computer Science / AI", "PINN Specialist", "Telemetry Fellow"],
    imageUrl: "/images/reza-asakereh.jpg",
    category: "engineering",
    linkedInUrl: "https://www.linkedin.com/in/canada-reza-asakereh",
    email: "r.asakereh@kkm-intl.org",
    phone: "+98 21 9103 0831",
    sipExtension: "102",
    employeeId: "KKM-002",
    clearanceLevel: "Top Secret / Strategic",
    engineeringDomains: [
      "Cognitive AI Architectures",
      "Industrial Digital Twin Systems",
      "Computational Thermodynamics",
      "Distributed Neural SCADA"
    ]
  },
  {
    id: "khosro-jarrahian",
    name: "Dr. Khosro Jarrahian",
    nameFa: "دکتر خسرو جراحیان",
    title: "Chief Science Officer & Water-Energy Nexus Director",
    titleFa: "مدیر ارشد علوم زمین، پیوند آب و انرژی و پایداری",
    department: "Water Systems & Environmental Governance",
    departmentFa: "سامانه‌های آب و حاکمیت زیست‌محیطی",
    bio: "Specialist in zero-liquid discharge (ZLD) seawater desalination, industrial brine concentration, geothermal water-energy nexus, and regional ecosystem restoration.",
    bioFa: "متخصص سامانه‌های نمک‌زدایی بدون پساب (ZLD)، بازچرخانی پساب‌های صنعتی در پیوند با انرژی پاک و مهندسی پایدار محیط زیست و مخازن ژئوفیزیکی عمیق.",
    initials: "KJ",
    credentials: ["Ph.D. Environmental Engineering", "ZLD Desalination Expert", "ISO 14001 Auditor", "Nexus Architecture"],
    imageUrl: "/images/khosro-jarrahian.jpg",
    category: "engineering",
    linkedInUrl: "https://www.linkedin.com/in/khosro-jarrahian-phd-7a83b641",
    email: "k.jarrahian@kkm-intl.org",
    phone: "+98 21 9103 0832",
    sipExtension: "103",
    employeeId: "KKM-003",
    clearanceLevel: "Confidential / Tier-1",
    engineeringDomains: [
      "Reservoir Geophysics",
      "Hydro-mechanical Well Simulation",
      "Subsurface Sealing Integrity",
      "Geochemical Heat Tracing"
    ]
  },
  {
    id: "sina-ayyoubian",
    name: "Sina Ayyoubian",
    nameFa: "سینا ایوبیان",
    title: "R&D Specialist & Technical Associate",
    titleFa: "کارشناس ارشد تحقیق و توسعه و سامانه‌های نوآوری",
    department: "R&D & Cognitive Technologies",
    departmentFa: "تحقیق و توسعه، فناوری‌های نوظهور و نوآوری",
    bio: "R&D Specialist leading advanced technology prototyping, geothermal instrumentation modeling, and cross-functional clean energy initiatives.",
    bioFa: "کارشناس ارشد تحقیق و توسعه و سامانه‌های نوآوری؛ فعال در پیشبرد نمونه‌سازی فناوری‌های نوظهور، مدل‌سازی تجهیزات زمین‌گرمایی و طرح‌های نوآورانه گروه KKM.",
    initials: "SA",
    credentials: ["Energy Systems Modeling", "Clean Tech Prototyping", "R&D Associate"],
    imageUrl: "/images/sina-ayyoubian.jpg",
    category: "engineering",
    linkedInUrl: "https://www.linkedin.com/in/sina-a-6a4426157",
    email: "s.ayyoubian@kkm-intl.org",
    phone: "+98 21 9103 0848",
    sipExtension: "208",
    employeeId: "KKM-018",
    clearanceLevel: "Operational / Tier-2",
    engineeringDomains: [
      "Clean Tech Prototyping",
      "Geothermal Instrumentation Modeling",
      "Advanced Sensor Validation",
      "Innovation System Integration"
    ]
  },
  {
    id: "mostafa-sharifi",
    name: "Mostafa Sharifi",
    nameFa: "مصطفی شریفی",
    title: "Senior Engineering Specialist",
    titleFa: "کارشناس ارشد مهندسی",
    department: "Engineering & Technical Office",
    departmentFa: "دفتر فنی و مهندسی",
    bio: "Senior engineering specialist supporting project design, technical documentation, and delivery coordination across KKM's energy and industrial infrastructure programs.",
    bioFa: "کارشناس ارشد مهندسی، پشتیبان طراحی پروژه، مستندات فنی و هماهنگی اجرا در برنامه‌های انرژی و زیرساخت صنعتی KKM.",
    initials: "MS",
    credentials: ["Project Engineering", "Technical Documentation"],
    category: "engineering",
    linkedInUrl: "https://www.linkedin.com/in/mostafa-sharifi-0686a284",
    engineeringDomains: ["Project Design Support", "Technical Documentation", "Delivery Coordination"]
  },
  {
    id: "benyamin-rezaei",
    name: "Dr. Benyamin Rezaei",
    nameFa: "دکتر بنیامین رضایی",
    title: "Chief Technology Officer & Lead Geothermal Engineer",
    titleFa: "مدیر ارشد فناوری و سرپرست مهندسی زمین‌گرمایی",
    department: "Energy Systems & Thermodynamics",
    departmentFa: "سامانه‌های انرژی و ترمودینامیک",
    bio: "Pioneering researcher in deep closed-loop geothermal extraction, downhole heat exchangers, and supercritical thermodynamic fluid cycles.",
    bioFa: "پژوهشگر ارشد سامانه‌های استخراج حرارت زمین‌گرمایی و طراح سیکل‌های بسته فوق‌بحرانی GMEL-CLG.",
    initials: "BR",
    credentials: ["Ph.D. Thermodynamics", "ASME Member", "Lead GMEL Architect"],
    category: "engineering",
    linkedInUrl: "https://www.linkedin.com/company/kkm-international-group",
    email: "b.rezaei@kkm-intl.org",
    employeeId: "KKM-009",
    engineeringDomains: [
      "Supercritical Organic Rankine Cycles",
      "Downhole Heat Exchangers",
      "Closed-Loop Thermodynamic Simulation"
    ]
  },
  {
    id: "ali-rezaei",
    name: "Dr. Ali Rezaei",
    nameFa: "دکتر علی رضایی",
    title: "Head of Materials Science & Nanotechnology",
    titleFa: "سرپرست علوم مواد پیشرفته و نانوفناوری",
    department: "Advanced Materials & Biomedical",
    departmentFa: "مواد پیشرفته و زیست‌مهندسی",
    bio: "Leading research into specialized nanofluids with enhanced thermal conductivity and biocompatible sensing instruments.",
    bioFa: "هدایت‌کننده پروژه‌های سنتز نانوسیالات با رسانندگی حرارتی بالا و حسگرهای تشخیصی سازگار با محیط.",
    initials: "AR",
    credentials: ["Ph.D. Nanomaterials", "Polymer & Fluid Rheology", "Senior Fellow"],
    category: "engineering",
    linkedInUrl: "https://www.linkedin.com/company/kkm-international-group",
    email: "a.rezaei@kkm-intl.org",
    employeeId: "KKM-042",
    engineeringDomains: [
      "Nanofluid Rheology",
      "Corrosion-Resistant Alloys",
      "Biocompatible Diagnostic Sensors"
    ]
  },
  {
    id: "farzad-kazemi",
    name: "Eng. Farzad Kazemi",
    nameFa: "مهندس فرزاد کاظمی",
    title: "Head of Systems Engineering & Technical Office",
    titleFa: "سرپرست مهندسی سیستم‌ها و دفتر فنی",
    department: "Engineering & Technical Office",
    departmentFa: "دفتر فنی و مهندسی سیستم‌ها",
    bio: "Directing field operations, SCADA telemetry integration, and EPC quality assurance across testing sites and demonstration pilots.",
    bioFa: "مسئول ارشد نظارت فنی، تله‌متری میدانی SCADA و صحه‌گذاری استانداردهای کیفی در پروژه‌های EPC.",
    initials: "FK",
    credentials: ["B.Sc. Mechanical / Control", "SCADA Telemetry", "EPC Quality Director"],
    category: "engineering",
    linkedInUrl: "https://www.linkedin.com/company/kkm-international-group",
    email: "f.kazemi@kkm-intl.org",
    employeeId: "KKM-014",
    engineeringDomains: [
      "SCADA Automation",
      "Instrumentation Architecture",
      "EPC Quality Systems"
    ]
  },

  // ============================
  // SUPPORT & OPERATIONS CATEGORY
  // ============================
  {
    id: "hamed-zatajam",
    name: "Hamed Zatajam",
    nameFa: "حامد ذات‌عجم",
    title: "Director of Legal & IP",
    titleFa: "مدیر حقوقی، قراردادها و مالکیت فکری",
    department: "Legal & Intellectual Property",
    departmentFa: "امور حقوقی، مالکیت فکری و پتنت‌ها",
    bio: "Director of Legal & Intellectual Property safeguarding proprietary GMEL patent filings and negotiating international EPCIC pacts.",
    bioFa: "مدیر حقوقی و مالکیت فکری؛ محافظ حقوقی اختراعات و پتنت‌های بین‌المللی GMEL و تنظیم‌کننده قراردادهای کلان EPCIC.",
    initials: "HZ",
    credentials: ["LL.M. International Law", "WIPO Patent Attorney", "FIDIC Contracts Expert"],
    imageUrl: "/images/hamed-zatajam.jpg",
    category: "support",
    linkedInUrl: "https://www.linkedin.com/in/hamed-zatajam",
    email: "h.zatajam@kkm-intl.org",
    phone: "+98 21 9103 0846",
    sipExtension: "205",
    employeeId: "KKM-016",
    clearanceLevel: "Confidential / Tier-1",
    engineeringDomains: [
      "WIPO Patent Drafting",
      "FIDIC & EPCIC Contracts",
      "Cross-Border Concessions",
      "Trade Secret Protection"
    ]
  },
  {
    id: "heidar-yarveicy",
    name: "Heidar Yarveicy",
    nameFa: "حیدر یارویسی",
    title: "Chief Operating Officer (COO)",
    titleFa: "مدیر ارشد عملیات و زیرساخت",
    department: "Operations & Logistics",
    departmentFa: "عملیات اجرایی، لجستیک و پروژه‌ها",
    bio: "Chief Operating Officer managing drilling logistics, heavy equipment mobilization, and turnkey EPC site deployments.",
    bioFa: "مدیر ارشد عملیات؛ مدیر لجستیک دکل‌های حفاری، تجهیزات سنگین و اجرای مگاپروژه‌های EPC در شرایط دشوار میدانی.",
    initials: "HY",
    credentials: ["Turnkey Rig Procurement", "EPC Mobilization", "Zero-Accident HSE"],
    category: "support",
    linkedInUrl: "https://www.linkedin.com/in/heidar-yarveicy-ab4420179",
    email: "h.yarveicy@kkm-intl.org",
    phone: "+98 21 9103 0835",
    sipExtension: "106",
    employeeId: "KKM-006",
    clearanceLevel: "Confidential / Tier-1",
    engineeringDomains: [
      "Field Mobilization",
      "Supply Chain Optimization",
      "Industrial Rigging Logistics"
    ]
  },
  {
    id: "masoumeh-moshar",
    name: "Masoumeh Moshar",
    nameFa: "معصومه مشار",
    title: "Director of PR & Communications",
    titleFa: "مدیر روابط عمومی و ارتباطات بین‌الملل",
    department: "Public Relations",
    departmentFa: "روابط عمومی، رسانه و برندینگ سازمانی",
    bio: "Director of Public Relations leading global media representation, government liaison, and international technological outreach.",
    bioFa: "مدیر روابط عمومی و ارتباطات بین‌الملل؛ مدیر ارشد تعاملات دیپلماتیک صنعتی، پوشش رسانه‌ای و حضور در نمایشگاه‌های بین‌المللی.",
    initials: "MM",
    credentials: ["Strategic Communications", "Governmental Protocol", "ESG Brand Narrative"],
    category: "support",
    linkedInUrl: "https://www.linkedin.com/in/masoumeh-moshar",
    email: "m.moshar@kkm-intl.org",
    phone: "+98 21 9103 0845",
    sipExtension: "204",
    employeeId: "KKM-015",
    clearanceLevel: "Operational / Tier-2",
    engineeringDomains: [
      "Strategic Communications",
      "International Exhibition Protocol",
      "Multilateral Liaison"
    ]
  },
  {
    id: "maryam-bahrami",
    name: "Maryam Bahrami",
    nameFa: "مریم بهرامی",
    title: "Accounting Specialist & Operational Desk",
    titleFa: "کارشناس امور مالی و حسابداری",
    department: "Finance & Accounting",
    departmentFa: "امور مالی، خزانه‌داری و حسابداری",
    bio: "Specialist managing internal financial automation, operational audits, and corporate ledger compliance.",
    bioFa: "کارشناس ارشد امور مالی و حسابداری؛ مسئول انضباط مالی پروژه‌ها، اسناد خزانه‌داری و هماهنگی کارتابل سازمانی.",
    initials: "MB",
    credentials: ["Treasury Reconciliation", "Fiscal Reporting", "Audit Coordination"],
    category: "support",
    linkedInUrl: "https://www.linkedin.com/company/kkm-international-group",
    email: "m.bahrami@kkm-intl.org",
    phone: "+98 21 9103 0847",
    sipExtension: "206",
    employeeId: "KKM-043",
    engineeringDomains: [
      "Financial Automation",
      "Operational Audit Compliance",
      "Project Cost Control"
    ]
  }
];

export const TeamPage: React.FC<TeamPageProps> = ({ setPage }) => {
  const { direction, isFa } = useLanguage();
  const [selectedCategory, setSelectedCategory] = React.useState<'all' | TeamCategory>('all');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [selectedMember, setSelectedMember] = React.useState<Member | null>(null);
  const [copiedEmail, setCopiedEmail] = React.useState<string | null>(null);

  // Close modal with Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedMember(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter members based on category and search query
  const filteredMembers = React.useMemo(() => {
    return LEADERSHIP.filter(member => {
      const matchesCategory = selectedCategory === 'all' || member.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch = !q ||
        member.name.toLowerCase().includes(q) ||
        member.nameFa.toLowerCase().includes(q) ||
        member.title.toLowerCase().includes(q) ||
        member.titleFa.toLowerCase().includes(q) ||
        member.department.toLowerCase().includes(q) ||
        member.departmentFa.toLowerCase().includes(q) ||
        member.credentials.some(c => c.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Handle email copy
  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2500);
  };

  // Category counts
  const counts = React.useMemo(() => ({
    all: LEADERSHIP.length,
    leadership: LEADERSHIP.filter(m => m.category === 'leadership').length,
    engineering: LEADERSHIP.filter(m => m.category === 'engineering').length,
    support: LEADERSHIP.filter(m => m.category === 'support').length,
  }), []);

  const getCategoryBadge = (cat: TeamCategory) => {
    switch (cat) {
      case 'leadership':
        return {
          label: isFa ? 'مدیریت و هیئت مدیره' : 'Leadership',
          color: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30',
          icon: <Award className="w-3 h-3 text-amber-500" />
        };
      case 'engineering':
        return {
          label: isFa ? 'مهندسی و تحقیق و توسعه' : 'Engineering & R&D',
          color: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/30',
          icon: <Cpu className="w-3 h-3 text-cyan-500" />
        };
      case 'support':
        return {
          label: isFa ? 'پشتیبانی، حقوقی و عملیات' : 'Support & Operations',
          color: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30',
          icon: <Users className="w-3 h-3 text-emerald-500" />
        };
    }
  };

  return (
    <div dir={direction} className="pb-24 bg-slate-50/60 dark:bg-slate-950 min-h-screen transition-colors">
      <PageHeader
        title={isFa ? 'کادر سازمانی و کانون نخبگان' : 'KKM Corporate & Engineering Directory'}
        subtitle={
          isFa
            ? 'اعضای هیئت مدیره، مدیران ارشد اجرایی، پژوهشگران علوم زمین و متخصصانی که مگاپروژه‌های گروه KKM را هدایت می‌کنند.'
            : 'The visionary executive board, operational leaders, and scientific researchers driving KKM International Group.'
        }
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-14">
        {/* Intro Banner */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary dark:text-secondary text-xs font-mono uppercase tracking-wider mb-4 font-bold border border-primary/20 dark:border-secondary/20">
            <ShieldCheck className="w-4 h-4 text-primary dark:text-secondary" />
            <span>{isFa ? 'حاکمیت شرکتی و کادر تأییدشده KKM' : 'Corporate Governance & Verified Directorate'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 dark:text-white tracking-tight mb-3">
            {isFa ? 'هدایت نوآوری در تراز استانداردهای جهانی' : 'Executive Leadership & Technical Vanguard'}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {isFa
              ? 'ترکیبی منحصربه‌فرد از تجارب آکادمیک بین‌المللی و توانمندی‌های اجرایی پیمانکاری EPC که پل میان تحقیقات آزمایشگاهی و مگاپروژه‌های صنعتی را استوار می‌سازد. برای مشاهده اطلاعات تفصیلی و لینکدین، روی کارت هر عضو کلیک فرمایید.'
              : 'Empirical laboratory breakthroughs, international capital allocation, and multi-megawatt industrial infrastructure. Click on any profile card to view the complete biography and verified LinkedIn credentials.'}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="max-w-4xl mx-auto mb-10 space-y-4">
          {/* Category Tabs */}
          <div 
            role="tablist"
            aria-label="Filter team members by category"
            className="flex items-center justify-center gap-2 flex-wrap"
          >
            {/* All Staff */}
            <button
              role="tab"
              aria-selected={selectedCategory === 'all'}
              onClick={() => setSelectedCategory('all')}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-primary text-white shadow-md shadow-primary/20 scale-102 ring-2 ring-primary/30'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-primary/50 dark:hover:border-secondary/50 hover:bg-slate-50 dark:hover:bg-slate-850'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{isFa ? 'تمام پرسنل' : 'All Staff'}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                selectedCategory === 'all' 
                  ? 'bg-white/20 text-white' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}>
                {counts.all}
              </span>
            </button>

            {/* Leadership */}
            <button
              role="tab"
              aria-selected={selectedCategory === 'leadership'}
              onClick={() => setSelectedCategory('leadership')}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer ${
                selectedCategory === 'leadership'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20 scale-102 ring-2 ring-amber-500/30'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 hover:bg-slate-50 dark:hover:bg-slate-850'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-amber-400" />
              <span>{isFa ? 'کادر رهبری و هیئت مدیره' : 'Leadership'}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                selectedCategory === 'leadership' 
                  ? 'bg-white/20 text-white' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}>
                {counts.leadership}
              </span>
            </button>

            {/* Engineering */}
            <button
              role="tab"
              aria-selected={selectedCategory === 'engineering'}
              onClick={() => setSelectedCategory('engineering')}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer ${
                selectedCategory === 'engineering'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20 scale-102 ring-2 ring-cyan-500/30'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 hover:bg-slate-50 dark:hover:bg-slate-850'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isFa ? 'مهندسی و نوآوری فنی' : 'Engineering'}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                selectedCategory === 'engineering' 
                  ? 'bg-white/20 text-white' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}>
                {counts.engineering}
              </span>
            </button>

            {/* Support Staff */}
            <button
              role="tab"
              aria-selected={selectedCategory === 'support'}
              onClick={() => setSelectedCategory('support')}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer ${
                selectedCategory === 'support'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 scale-102 ring-2 ring-emerald-500/30'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:bg-slate-50 dark:hover:bg-slate-850'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isFa ? 'پشتیبانی، حقوقی و عملیات' : 'Support Staff'}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                selectedCategory === 'support' 
                  ? 'bg-white/20 text-white' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}>
                {counts.support}
              </span>
            </button>
          </div>

          {/* Quick Search Input */}
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isFa ? 'جستجوی نام، تخصص، یا عنوان شغلی...' : 'Search by name, expertise, or title...'}
              className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-primary/50 dark:focus:ring-secondary/50 shadow-xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs cursor-pointer p-0.5"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Members Grid */}
        {filteredMembers.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-xl mx-auto p-8 shadow-xs">
            <Users className="w-10 h-10 text-slate-400 mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">
              {isFa ? 'عضوی با این مشخصات یافت نشد' : 'No team members found'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isFa ? 'لطفاً عبارت جستجو را تغییر دهید یا فیلتر دسته‌بندی را مجدداً انتخاب کنید.' : 'Please adjust your search terms or reset the category filter.'}
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold rounded-lg text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              {isFa ? 'نمایش همه اعضا' : 'Reset Filters'}
            </button>
          </div>
        ) : (
          <motion.div
            key={`${selectedCategory}-${searchQuery}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
          >
            {filteredMembers.map((member) => {
              const badge = getCategoryBadge(member.category);
              return (
                <div
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  className="group/card bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-2xl hover:border-amber-400/50 dark:hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between relative overflow-hidden cursor-pointer"
                >
                  {/* Category Pill in Card Header */}
                  <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-10">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border shadow-xs ${badge.color}`}>
                      {badge.icon}
                      <span>{badge.label}</span>
                    </span>
                  </div>

                  <div>
                    {/* Top Row: Photo + Primary Info */}
                    <div className="flex items-start gap-4 sm:gap-5 mb-5">
                      {/* Photo Container with subtle 'lift and zoom' animation */}
                      <div className="relative shrink-0 group/photo">
                        {member.imageUrl ? (
                          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-md group-hover/card:shadow-2xl border-2 border-primary/20 dark:border-secondary/20 group-hover/card:border-amber-400 dark:group-hover/card:border-amber-400 bg-slate-900 transition-all duration-500 ease-out transform group-hover/card:-translate-y-2 group-hover/photo:-translate-y-2.5">
                            <img
                              src={member.imageUrl}
                              alt={isFa ? member.nameFa : member.name}
                              width={96}
                              height={96}
                              loading="lazy"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover object-center transition-all duration-700 ease-out transform group-hover/card:scale-110 group-hover/photo:scale-115"
                            />
                            {/* Hover overlay hint */}
                            <div className="absolute inset-0 bg-slate-950/20 group-hover/card:bg-transparent transition-colors pointer-events-none" />
                          </div>
                        ) : (
                          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-mono font-bold text-2xl shadow-md group-hover/card:shadow-2xl transition-all duration-500 ease-out transform group-hover/card:-translate-y-2">
                            {member.initials}
                          </div>
                        )}

                        {/* Verified Badge Checkmark */}
                        <div 
                          className="absolute -bottom-1 -right-1 rtl:-right-auto rtl:-left-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] shadow-md border-2 border-white dark:border-slate-900 z-10" 
                          title="Verified KKM Executive Identity"
                        >
                          ✓
                        </div>
                      </div>

                      {/* Header Text */}
                      <div className="min-w-0 pr-16 rtl:pr-0 rtl:pl-16 pt-0.5">
                        <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white group-hover/card:text-primary dark:group-hover/card:text-secondary transition-colors leading-snug">
                          {isFa ? member.nameFa : member.name}
                        </h3>
                        <p className="text-xs sm:text-sm font-semibold text-primary dark:text-secondary mt-0.5 line-clamp-1">
                          {isFa ? member.titleFa : member.title}
                        </p>
                        <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 font-medium line-clamp-1">
                          {isFa ? member.departmentFa : member.department}
                        </p>

                        {/* LinkedIn Quick Link Icon */}
                        {member.linkedInUrl && (
                          <a
                            href={member.linkedInUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 mt-2 text-[11px] font-semibold text-[#0A66C2] hover:text-[#004182] dark:text-sky-400 dark:hover:text-sky-300 transition-colors"
                            title={isFa ? 'مشاهده در لینکدین' : 'View LinkedIn Profile'}
                          >
                            <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/>
                            </svg>
                            <span>LinkedIn Profile</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Brief Bio Summary */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5 line-clamp-3">
                      {isFa ? member.bioFa : member.bio}
                    </p>
                  </div>

                  {/* Card Bottom: Credentials & Slide-over CTA */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                        {isFa ? 'صلاحیت‌های تخصصی' : 'Key Credentials'}
                      </span>
                      <span className="text-[11px] font-bold text-primary dark:text-secondary flex items-center gap-1 group-hover/card:translate-x-1 rtl:group-hover/card:-translate-x-1 transition-transform">
                        <span>{isFa ? 'مشاهده رزومه و مشخصات' : 'View Profile'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {member.credentials.slice(0, 3).map((cred, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-medium border border-slate-200/50 dark:border-slate-700/50"
                        >
                          {cred}
                        </span>
                      ))}
                      {member.credentials.length > 3 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-mono text-slate-400">
                          +{member.credentials.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* CTA Banner */}
        <div className="mt-16 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white rounded-3xl p-8 lg:p-12 text-center max-w-4xl mx-auto border border-slate-800 shadow-xl">
          <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold font-display mb-3">
            {isFa ? 'ارتباط رسمی با دبیرخانه و کادر رهبری KKM' : 'Executive Directorate & Board Liaison'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mb-6 max-w-xl mx-auto leading-relaxed">
            {isFa
              ? 'جهت هماهنگی جلسات رسمی، بررسی طرح‌های مشارکت راهبردی و تعاملات سرمایه‌گذاری با دبیرخانه اجرایی سازمان در تماس باشید.'
              : 'For formal board communications, strategic partnership proposals, and institutional investor relations, contact the Executive Secretariat.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {setPage && (
              <>
                <button
                  onClick={() => setPage(Page.Contact)}
                  className="px-6 py-3 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl transition-colors shadow-md cursor-pointer"
                >
                  {isFa ? 'ارتباط با دبیرخانه سازمانی' : 'Contact Corporate Desk'}
                </button>
                <button
                  onClick={() => setPage(Page.Careers)}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold rounded-xl transition-colors border border-slate-700 cursor-pointer"
                >
                  {isFa ? 'فرصت‌های پژوهشی و تخصصی' : 'Join Our Technical Council'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* EXPANDABLE SLIDE-OVER DRAWER / MODAL FOR MEMBER DETAILS   */}
      {/* ========================================================= */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-end overflow-hidden" role="dialog" aria-modal="true">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedMember(null)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
            />

            {/* Slide-over Drawer Panel */}
            <motion.div
              initial={{ x: direction === 'rtl' ? '-100%' : '100%', opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction === 'rtl' ? '-100%' : '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="relative w-full max-w-xl h-full bg-white dark:bg-slate-900 border-l rtl:border-l-0 rtl:border-r border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col z-10 overflow-hidden"
              dir={direction}
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-900/90 backdrop-blur-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-500" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    {isFa ? 'مشخصات تأییدشده عضو KKM' : 'Verified Member Dossier'}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="w-9 h-9 rounded-full bg-slate-200/60 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
                {/* Profile Hero with Photo */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-200/80 dark:border-slate-800">
                  {/* Photo with Lift & Zoom */}
                  <div className="relative shrink-0 group/drawer-photo">
                    {selectedMember.imageUrl ? (
                      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden shadow-xl border-2 border-primary/20 dark:border-secondary/20 bg-slate-900 transform transition-transform duration-500 group-hover/drawer-photo:scale-105">
                        <img
                          src={selectedMember.imageUrl}
                          alt={isFa ? selectedMember.nameFa : selectedMember.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-mono font-bold text-3xl shadow-xl">
                        {selectedMember.initials}
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 rtl:-right-auto rtl:-left-1 w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs shadow-md border-2 border-white dark:border-slate-900">
                      ✓
                    </div>
                  </div>

                  {/* Name and Designation */}
                  <div className="text-center sm:text-start flex-1 min-w-0">
                    <div className="mb-1.5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${getCategoryBadge(selectedMember.category).color}`}>
                        {getCategoryBadge(selectedMember.category).icon}
                        <span>{getCategoryBadge(selectedMember.category).label}</span>
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white leading-tight">
                      {isFa ? selectedMember.nameFa : selectedMember.name}
                    </h3>
                    {/* Bilingual subtitle */}
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      {isFa ? selectedMember.name : selectedMember.nameFa}
                    </p>

                    <p className="text-sm font-semibold text-primary dark:text-secondary mt-2">
                      {isFa ? selectedMember.titleFa : selectedMember.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {isFa ? selectedMember.departmentFa : selectedMember.department}
                    </p>

                    {selectedMember.employeeId && (
                      <p className="text-[11px] font-mono text-slate-400 mt-1">
                        ID: <span className="font-bold text-slate-600 dark:text-slate-300">{selectedMember.employeeId}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Primary Action: LinkedIn Profile */}
                <div className="bg-gradient-to-r from-sky-50 to-blue-50 dark:from-slate-800/80 dark:to-slate-850 p-4 rounded-2xl border border-sky-100 dark:border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-3 text-start">
                    <div className="w-10 h-10 rounded-xl bg-[#0A66C2] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {isFa ? 'صفحه حرفه‌ای لینکدین' : 'Official LinkedIn Profile'}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {isFa ? 'مشاهده سوابق و تجربیات حرفه‌ای' : 'Verified credentials & network'}
                      </div>
                    </div>
                  </div>

                  <a
                    href={selectedMember.linkedInUrl || 'https://www.linkedin.com/company/kkm-international-group'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A66C2] hover:bg-[#084e96] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
                  >
                    <span>{isFa ? 'مشاهده در لینکدین' : 'Connect on LinkedIn'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Professional Biography Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-primary dark:text-secondary" />
                    <span>{isFa ? 'شرح تجربیات و بیوگرافی حرفه‌ای' : 'Professional Biography'}</span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 sm:p-5 rounded-2xl border border-slate-200/70 dark:border-slate-800 space-y-3">
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                      {isFa ? selectedMember.bioFa : selectedMember.bio}
                    </p>

                    {/* Secondary language bio for international audience */}
                    <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
                      {isFa ? selectedMember.bio : selectedMember.bioFa}
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {isFa ? 'خلاصه تجربه و سمت رسمی' : 'Experience Summary & Official Title'}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                    {buildExperienceSummary(selectedMember, isFa)}
                  </p>
                  {parseLinkedInHandle(selectedMember.linkedInUrl) && (
                    <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      linkedin.com/in/{parseLinkedInHandle(selectedMember.linkedInUrl)}
                    </div>
                  )}
                </div>

                {/* Engineering Domains & Specializations */}
                {selectedMember.engineeringDomains && selectedMember.engineeringDomains.length > 0 && (
                  <div className="space-y-2.5">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {isFa ? 'حوزه‌های تخصصی و معماری مهندسی' : 'Engineering Domains & Systems'}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.engineeringDomains.map((domain, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium border border-slate-200 dark:border-slate-700 shadow-2xs"
                        >
                          {domain}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Credentials & Certifications */}
                <div className="space-y-2.5">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {isFa ? 'صلاحیت‌ها و گواهینامه‌ها' : 'Credentials & Authority'}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.credentials.map((cred, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-300 text-xs font-semibold border border-slate-200/70 dark:border-slate-700/70"
                      >
                        {cred}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Corporate Direct Contact Box */}
                {(selectedMember.email || selectedMember.sipExtension || selectedMember.phone) && (
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {isFa ? 'ارتباط مستقیم سازمانی' : 'Corporate Communications'}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedMember.email && (
                        <div className="p-3 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 shadow-2xs">
                          <div className="min-w-0">
                            <div className="text-[10px] font-mono text-slate-400 uppercase">
                              {isFa ? 'ایمیل سازمانی' : 'Corporate Email'}
                            </div>
                            <div className="text-xs font-mono font-semibold text-slate-800 dark:text-slate-200 truncate">
                              {selectedMember.email}
                            </div>
                          </div>
                          <button
                            onClick={() => handleCopyEmail(selectedMember.email!)}
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors shrink-0 cursor-pointer"
                            title="Copy email"
                          >
                            {copiedEmail === selectedMember.email ? (
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      )}

                      {selectedMember.sipExtension && (
                        <div className="p-3 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 shadow-2xs">
                          <div>
                            <div className="text-[10px] font-mono text-slate-400 uppercase">
                              {isFa ? 'داخلی تلفن سانترال' : 'SIP Direct Extension'}
                            </div>
                            <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                              Ext: {selectedMember.sipExtension}
                            </div>
                          </div>
                          <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              <div className="p-4 sm:p-5 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/90 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedMember(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {isFa ? 'بستن پنجره' : 'Close'}
                </button>

                {selectedMember.linkedInUrl && (
                  <a
                    href={selectedMember.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark dark:bg-secondary dark:text-slate-950 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    <span>{isFa ? 'مشاهده در لینکدین' : 'LinkedIn Profile'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeamPage;
