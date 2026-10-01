import * as React from 'react';
import PageHeader from '../components/PageHeader';
import { useLanguage } from '../LanguageContext';
import { Page } from '../types';
import { Mail, Award, BookOpen, Layers } from 'lucide-react';

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
}

const LEADERSHIP: Member[] = [
  {
    name: "Gino Ayyoubian",
    nameFa: "جینو ایوبیان",
    title: "Chief Executive Officer & Chairman",
    titleFa: "مدیرعامل و رئیس هیئت مدیره",
    department: "Executive Board",
    departmentFa: "هیئت مدیره و مدیریت عامل",
    bio: "Visionary engineering executive leading KKM International Group and Kimia Karan Mâd across international energy transitions, deep geothermal deployment, and rural empowerment initiatives.",
    bioFa: "راهبر ارشد اجرایی و بنیان‌گذار تحول دیجیتال و صنعتی در گروه KKM با سابقه هدایت مگاپروژه‌های انرژی پاک، زمین‌گرمایی و توسعه پایدار.",
    initials: "GA",
    credentials: ["Executive Leadership", "EPCM Management", "WIPO Patentee"]
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
    credentials: ["Ph.D. Thermodynamics", "ASME Member", "Lead GMEL Architect"]
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
    credentials: ["Ph.D. Computer Science / AI", "PINN Specialist", "Telemetry Fellow"]
  },
  {
    name: "Dr. Khosro Jarrahian",
    nameFa: "دکتر خسرو جراحیان",
    title: "Director of Water-Energy Nexus & Sustainability",
    titleFa: "مدیر دپارتمان پیوند آب و انرژی و پایداری",
    department: "Water Systems & Environmental Governance",
    departmentFa: "سامانه‌های آب و حاکمیت زیست‌محیطی",
    bio: "Specialist in zero-liquid discharge seawater desalination, industrial brine concentration, and regional ecosystem restoration.",
    bioFa: "متخصص سامانه‌های نمک‌زدایی بدون پساب (ZLD) و بازچرخانی پساب‌های صنعتی در پیوند با انرژی پاک.",
    initials: "KJ",
    credentials: ["Ph.D. Environmental Engineering", "ZLD Desalination Expert", "ISO 14001 Auditor"]
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
    credentials: ["Ph.D. Nanomaterials", "Polymer & Fluid Rheology", "Senior Fellow"]
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
    credentials: ["B.Sc. Mechanical / Control", "SCADA Telemetry", "EPC Quality Director"]
  }
];

export const TeamPage: React.FC<TeamPageProps> = ({ setPage }) => {
  const { direction, isFa } = useLanguage();

  return (
    <div dir={direction} className="pb-20">
      <PageHeader
        title={isFa ? 'کادر رهبری و هیئت علمی' : 'Leadership & Scientific Board'}
        subtitle={
          isFa
            ? 'متخصصان، مهندسان و دانشمندانی که زیست‌بوم نوآوری و فناوری‌های یکپارچه KKM را هدایت می‌کنند.'
            : 'The visionary engineers, researchers, and operational executives driving KKM International Group.'
        }
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16">
        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold block mb-2">
            {isFa ? 'هم‌افزایی دانش بنیادین و مهندسی میدانی' : 'Interdisciplinary Engineering Excellence'}
          </span>
          <h2 className="text-3xl font-display font-black text-slate-900 dark:text-white mb-4">
            {isFa ? 'هدایت راهبردی نوآوری در کلاس جهانی' : 'World-Class Scientific & Executive Leadership'}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {isFa
              ? 'تیم راهبری KKM ترکیبی منحصربه‌فرد از تجارب آکادمیک بین‌المللی و توانمندی‌های اجرایی پیمانکاری EPC است که پلی محکم میان تحقیقات سطح آزمایشگاهی و تأسیسات زیرساختی صنعتی می‌سازد.'
              : 'Our executive board and scientific council bridge the gap between empirical laboratory research and multi-megawatt commercial deployment.'}
          </p>
        </div>

        {/* Members Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LEADERSHIP.map((member) => (
            <div
              key={member.name}
              className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-mono font-bold text-xl shadow-md shrink-0">
                  {member.initials}
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                    {isFa ? member.nameFa : member.name}
                  </h3>
                  <p className="text-xs font-semibold text-primary dark:text-secondary mt-0.5">
                    {isFa ? member.titleFa : member.title}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                    {isFa ? member.departmentFa : member.department}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6 flex-grow">
                {isFa ? member.bioFa : member.bio}
              </p>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2 font-bold">
                  {isFa ? 'صلاحیت‌ها و حوزه‌های مهارتی' : 'Key Credentials'}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {member.credentials.map((cred, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-medium"
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
        <div className="mt-16 bg-slate-900 text-white rounded-3xl p-8 lg:p-12 text-center max-w-4xl mx-auto border border-slate-800">
          <h3 className="text-2xl font-bold font-display mb-3">
            {isFa ? 'علاقه‌مند به پیوستن به کادر علمی و مهندسی KKM هستید؟' : 'Interested in joining our scientific council or technical teams?'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mb-6 max-w-xl mx-auto leading-relaxed">
            {isFa
              ? 'ما همواره از همکاری با دانشمندان برجسته، مهندسان نخبه و مجریان پروژه‌های انرژی پاک استقبال می‌کنیم.'
              : 'We invite accomplished thermodynamicists, software architects, and energy engineers to collaborate with us.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {setPage && (
              <>
                <button
                  onClick={() => setPage(Page.Careers)}
                  className="px-6 py-3 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                >
                  {isFa ? 'مشاهده فرصت‌های شغلی' : 'View Open Opportunities'}
                </button>
                <button
                  onClick={() => setPage(Page.Contact)}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-colors border border-slate-700"
                >
                  {isFa ? 'ارتباط مستقیم با دبیرخانه' : 'Contact Corporate Desk'}
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
