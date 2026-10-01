import * as React from 'react';
import PageHeader from '../components/PageHeader';
import { useLanguage } from '../LanguageContext';
import { Page } from '../types';
import { Award, ShieldCheck, Briefcase, Sparkles } from 'lucide-react';

interface TeamPageProps {
  setPage?: (page: Page) => void;
}

interface Member {
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
  category: 'board' | 'scientific';
}

const LEADERSHIP: Member[] = [
  {
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
    category: "board"
  },
  {
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
    category: "board"
  },
  {
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
    category: "board"
  },
  {
    name: "Dr. Khosro Jarrahian",
    nameFa: "دکتر خسرو جراحیان",
    title: "Director of Water-Energy Nexus & Sustainability",
    titleFa: "مدیر دپارتمان پیوند آب و انرژی و پایداری",
    department: "Water Systems & Environmental Governance",
    departmentFa: "سامانه‌های آب و حاکمیت زیست‌محیطی",
    bio: "Specialist in zero-liquid discharge (ZLD) seawater desalination, industrial brine concentration, geothermal water-energy nexus, and regional ecosystem restoration.",
    bioFa: "متخصص سامانه‌های نمک‌زدایی بدون پساب (ZLD)، بازچرخانی پساب‌های صنعتی در پیوند با انرژی پاک و مهندسی پایدار محیط زیست و مخازن.",
    initials: "KJ",
    credentials: ["Ph.D. Environmental Engineering", "ZLD Desalination Expert", "ISO 14001 Auditor", "Nexus Architecture"],
    imageUrl: "/images/khosro-jarrahian.jpg",
    category: "scientific"
  },
  {
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
    category: "scientific"
  },
  {
    name: "Dr. Reza Asakereh",
    nameFa: "دکتر رضا عساکره",
    title: "Director of Cognitive Systems & Digital Twins",
    titleFa: "مدیر دپارتمان سامانه‌های شناختی و دوقلوهای دیجیتال",
    department: "Industrial AI & Computing",
    departmentFa: "هوش مصنوعی صنعتی و محاسبات پیشرفته",
    bio: "Architect behind KKM's real-time digital twin architecture, integrating physics-informed neural networks with field telemetry and reservoir physics.",
    bioFa: "معمار زیرساخت دوقلوهای دیجیتال و یکپارچه‌سازی شبکه‌های عصبی مبتنی بر فیزیک با داده‌های تله‌متری مخزن.",
    initials: "RA",
    credentials: ["Ph.D. Computer Science / AI", "PINN Specialist", "Telemetry Fellow"],
    category: "scientific"
  },
  {
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
    category: "scientific"
  },
  {
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
    category: "scientific"
  }
];

export const TeamPage: React.FC<TeamPageProps> = ({ setPage }) => {
  const { direction, isFa } = useLanguage();
  const [selectedCategory, setSelectedCategory] = React.useState<'all' | 'board' | 'scientific'>('all');

  const filteredMembers = React.useMemo(() => {
    if (selectedCategory === 'all') return LEADERSHIP;
    return LEADERSHIP.filter(m => m.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div dir={direction} className="pb-20 bg-slate-50/50 dark:bg-slate-950/50 min-h-screen">
      <PageHeader
        title={isFa ? 'کادر رهبری و هیئت مدیره' : 'Leadership & Board of Directors'}
        subtitle={
          isFa
            ? 'اعضای هیئت مدیره، مدیران ارشد اجرایی و دانشمندانی که زیست‌بوم نوآوری و مگاپروژه‌های KKM را هدایت می‌کنند.'
            : 'The visionary executive board, operational leaders, and scientific researchers driving KKM International Group.'
        }
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16">
        {/* Intro Banner */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-secondary text-xs font-mono uppercase tracking-wider mb-4 font-bold">
            <ShieldCheck className="w-4 h-4" />
            {isFa ? 'حاکمیت شرکتی و رهبری راهبردی' : 'Corporate Governance & Leadership'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 dark:text-white mb-4">
            {isFa ? 'هدایت راهبردی نوآوری در تراز جهانی' : 'World-Class Executive & Scientific Council'}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {isFa
              ? 'تیم راهبری KKM ترکیبی منحصربه‌فرد از تجارب آکادمیک بین‌المللی و توانمندی‌های اجرایی پیمانکاری EPC است که پلی محکم میان تحقیقات سطح آزمایشگاهی و تأسیسات زیرساختی صنعتی می‌سازد.'
              : 'Our executive board and scientific council bridge empirical laboratory breakthroughs, international capital allocation, and multi-megawatt industrial infrastructure.'}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
              selectedCategory === 'all'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-primary'
            }`}
          >
            {isFa ? 'تمام اعضا' : 'All Leadership'} ({LEADERSHIP.length})
          </button>
          <button
            onClick={() => setSelectedCategory('board')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
              selectedCategory === 'board'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-primary'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            {isFa ? 'هیئت مدیره و مدیران ارشد' : 'Board of Directors'} ({LEADERSHIP.filter(m => m.category === 'board').length})
          </button>
          <button
            onClick={() => setSelectedCategory('scientific')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
              selectedCategory === 'scientific'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-primary'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {isFa ? 'شورای علمی و فناوری' : 'Scientific & Tech Council'} ({LEADERSHIP.filter(m => m.category === 'scientific').length})
          </button>
        </div>

        {/* Members Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {filteredMembers.map((member) => (
            <div
              key={member.name}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1 relative overflow-hidden"
            >
              {member.category === 'board' && (
                <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    <Award className="w-3 h-3" />
                    {isFa ? 'هیئت مدیره' : 'Board'}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-5 mb-6">
                {member.imageUrl ? (
                  <div className="relative shrink-0">
                    <img
                      src={member.imageUrl}
                      alt={isFa ? member.nameFa : member.name}
                      width={80}
                      height={80}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-md border-2 border-primary/20 dark:border-secondary/20 group-hover:scale-105 transition-transform duration-300 bg-slate-100 dark:bg-slate-800"
                      onError={(e) => {
                        // Fallback to initials box if image fails to load
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          const fallback = document.createElement('div');
                          fallback.className = 'w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-mono font-bold text-2xl shadow-md';
                          fallback.innerText = member.initials;
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                    <div className="absolute -bottom-1 -right-1 rtl:-right-auto rtl:-left-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] shadow border-2 border-white dark:border-slate-900" title="Verified Member">
                      ✓
                    </div>
                  </div>
                ) : (
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-mono font-bold text-2xl shadow-md shrink-0">
                    {member.initials}
                  </div>
                )}
                <div className="min-w-0 pr-8 rtl:pr-0 rtl:pl-8">
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-tight">
                    {isFa ? member.nameFa : member.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-primary dark:text-secondary mt-1">
                    {isFa ? member.titleFa : member.title}
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-1 font-medium truncate">
                    {isFa ? member.departmentFa : member.department}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 flex-grow">
                {isFa ? member.bioFa : member.bio}
              </p>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2.5 font-bold">
                  {isFa ? 'صلاحیت‌ها و حوزه‌های تخصصی' : 'Key Credentials & Domains'}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {member.credentials.map((cred, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-medium border border-slate-200/50 dark:border-slate-700/50"
                    >
                      {cred}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div className="mt-16 bg-slate-900 text-white rounded-3xl p-8 lg:p-12 text-center max-w-4xl mx-auto border border-slate-800 shadow-xl">
          <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold font-display mb-3">
            {isFa ? 'ارتباط مستقیم با دفتر هیئت مدیره و دبیرخانه اجرایی' : 'Executive Board & Corporate Inquiries'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mb-6 max-w-xl mx-auto leading-relaxed">
            {isFa
              ? 'جهت هماهنگی جلسات رسمی، بررسی طرح‌های مشارکت راهبردی و سرمایه‌گذاری با دبیرخانه اجرایی KKM در ارتباط باشید.'
              : 'For formal board communications, strategic partnership proposals, and institutional investor relations, contact the Executive Secretariat.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {setPage && (
              <>
                <button
                  onClick={() => setPage(Page.Contact)}
                  className="px-6 py-3 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl transition-colors shadow-md"
                >
                  {isFa ? 'ارتباط مستقیم با دبیرخانه' : 'Contact Corporate Desk'}
                </button>
                <button
                  onClick={() => setPage(Page.Careers)}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-colors border border-slate-700"
                >
                  {isFa ? 'مشاهده فرصت‌های شغلی و پژوهشی' : 'Join Our Technical Council'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
