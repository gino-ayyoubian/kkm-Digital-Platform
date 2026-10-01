import * as React from 'react';
import PageHeader from '../components/PageHeader';
import { useLanguage } from '../LanguageContext';
import { Page } from '../types';
import { Zap, Droplets, Cpu, Tent, HeartPulse, ArrowRight, ArrowLeft, ExternalLink, ShieldCheck } from 'lucide-react';

interface DivisionsPageProps {
  setPage?: (page: Page) => void;
}

interface DivisionInfo {
  id: string;
  slug: string;
  name: string;
  nameFa: string;
  taglineEn: string;
  taglineFa: string;
  descriptionEn: string;
  descriptionFa: string;
  technologies: string[];
  activeProjects: number;
  leadExecutive: string;
  targetPage: Page;
  icon: any;
  color: string;
}

const DIVISIONS: DivisionInfo[] = [
  {
    id: "DIV-ENERGY",
    slug: "energy",
    name: "Energy Systems & Geothermal Division",
    nameFa: "دپارتمان سامانه‌های انرژی و زمین‌گرمایی",
    taglineEn: "Closed-Loop Geothermal & Baseload Heat Extraction",
    taglineFa: "استخراج حرارت زمین‌گرمایی و تولید برق بار پایه در سیکل بسته",
    descriptionEn: "Engineers proprietary GeoMeta Energy Layer (GMEL) closed-loop architectures, downhole heat exchangers, and Organic Rankine Cycle (ORC) power plants to provide 24/7 zero-emission baseload power.",
    descriptionFa: "توسعه و مهندسی معماری اختصاصی GMEL-CLG برای استخراج پایدار حرارت اعماق زمین و تبدیل آن به برق بدون وقفه و بدون آلایندگی در تمام طول سال.",
    technologies: ["GMEL-CLG", "Downhole Casing Heat Exchanger", "Subsurface Thermoelectrics", "Depleted Well Retrofit"],
    activeProjects: 3,
    leadExecutive: "Dr. Benyamin Rezaei",
    targetPage: Page.GMELHub,
    icon: Zap,
    color: "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-500"
  },
  {
    id: "DIV-WATER",
    slug: "water",
    name: "Water-Energy Nexus & Desalination Division",
    nameFa: "دپارتمان پیوند آب و انرژی و نمک‌زدایی پایدار",
    taglineEn: "Zero-Liquid Discharge & Clean Industrial Water",
    taglineFa: "نمک‌زدایی بدون پساب (ZLD) و بازچرخانی آب در صنایع سنگین",
    descriptionEn: "Coupling clean geothermal and solar thermal energy with multi-effect distillation and membrane technologies, delivering fresh water to arid industrial and rural regions with zero chemical brine runoff.",
    descriptionFa: "پیوند انرژی حرارتی پاک با سامانه‌های تقطیر چندمرحله‌ای برای تأمین آب شرب و صنعتی در مناطق خشک با فناوری بدون پساب (ZLD).",
    technologies: ["ZLD Evaporation", "Membrane Distillation", "Geothermal Brine Recovery", "Industrial Water Reclamation"],
    activeProjects: 2,
    leadExecutive: "Dr. Khosro Jarrahian",
    targetPage: Page.Projects,
    icon: Droplets,
    color: "from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-500"
  },
  {
    id: "DIV-AI",
    slug: "digital-twins",
    name: "Industrial AI & Cognitive Digital Twins Division",
    nameFa: "دپارتمان هوش مصنوعی صنعتی و دوقلوهای دیجیتال",
    taglineEn: "Physics-Informed Real-Time Telemetry & Simulation",
    taglineFa: "مدل‌سازی فیزیک‌پایه مخزن و تله‌متری بلادرنگ تأسیسات انرژی",
    descriptionEn: "Develops computational fluid dynamics, PINN predictive algorithms, and industrial IoT data pipelines conforming to ASME standard verification protocols for real-time asset telemetry.",
    descriptionFa: "توسعه مدل‌های دینامیک محاسباتی سیالات و شبکه‌های عصبی فیزیک‌پایه جهت پایش بلادرنگ و پیش‌بینی عملکرد مخازن طبق استانداردهای ASME.",
    technologies: ["PINN Reservoir Modeling", "Subsurface Telemetry", "ASME CFD Twin", "Autonomous Well Control"],
    activeProjects: 4,
    leadExecutive: "Dr. Reza Asakereh",
    targetPage: Page.DigitalTwinHub,
    icon: Cpu,
    color: "from-purple-500/20 to-indigo-500/20 border-purple-500/30 text-purple-500"
  },
  {
    id: "DIV-RURAL",
    slug: "rural-development",
    name: "Rural & Nomadic Engineering Division",
    nameFa: "دپارتمان مهندسی و توسعه مناطق روستایی و عشایری",
    taglineEn: "Decentralized Infrastructure for Remote Regions",
    taglineFa: "زیرساخت‌های نامتمرکز انرژی و آب برای جوامع محلی و عشایری",
    descriptionEn: "Deploying river micro-hydrokinetics (REE turbines), mobile water desalination units, and off-grid battery microgrids specifically engineered for nomadic mobility and harsh environmental terrains.",
    descriptionFa: "استقرار میکروتوربین‌های رودخانه‌ای REE، بسته‌های پرتابل نمک‌زدایی و ریزشبکه‌های خورشیدی سازگار با اقلیم سخت و سبک زندگی عشایری.",
    technologies: ["REE Hydrokinetics", "Off-grid Battery Banks", "Mobile Desalination", "Solar Nomadic Microgrids"],
    activeProjects: 5,
    leadExecutive: "Gino Ayyoubian",
    targetPage: Page.RuralStudies,
    icon: Tent,
    color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-500"
  },
  {
    id: "DIV-BIOMED",
    slug: "biomedical",
    name: "Biomedical & Advanced Materials Division",
    nameFa: "دپارتمان مواد پیشرفته و زیست‌مهندسی",
    taglineEn: "Specialized Nanomaterials & Thermal Diagnostics",
    taglineFa: "سنتز نانوذرات پیشرفته و حسگرهای تشخیصی سازگار با زیست‌بوم",
    descriptionEn: "Conducting applied molecular research into high-thermal-conductivity nanofluids, phase change materials, and specialized biocompatible clinical instruments.",
    descriptionFa: "پژوهش‌های مولکولی در زمینه نانوسیالات با انتقال حرارت فوق‌العاده، مواد تغییر فاز دهنده و حسگرهای تشخیصی محیطی و پزشکی.",
    technologies: ["High-Conductivity Nanofluids", "Phase Change Materials", "Bio-Sensors", "Eco-friendly Catalysts"],
    activeProjects: 1,
    leadExecutive: "Dr. Ali Rezaei",
    targetPage: Page.Technology,
    icon: HeartPulse,
    color: "from-rose-500/20 to-pink-500/20 border-rose-500/30 text-rose-500"
  }
];

export const DivisionsPage: React.FC<DivisionsPageProps> = ({ setPage }) => {
  const { direction, isFa } = useLanguage();

  return (
    <div dir={direction} className="pb-20">
      <PageHeader
        title={isFa ? 'دپارتمان‌ها و واحدهای مهندسی راهبردی' : 'Strategic Engineering Divisions'}
        subtitle={
          isFa
            ? 'پنج بازوی تخصصی KKM International Group در پیوند دانش بنیادین، مهندسی صنعتی و توسعه پایدار.'
            : 'The five multidisciplinary operational pillars uniting research, EPC capability, and sustainable impact.'
        }
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16">
        <div className="space-y-12">
          {DIVISIONS.map((div, idx) => {
            const Icon = div.icon;
            return (
              <div
                key={div.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-8 lg:p-10 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-8 group hover:border-primary/40 transition-all duration-300"
              >
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-tr ${div.color} border shadow-inner`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-mono text-xs font-bold text-slate-400 block uppercase tracking-wider">
                        {div.id}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
                        {isFa ? div.nameFa : div.name}
                      </h2>
                    </div>
                  </div>

                  <p className="text-xs font-mono font-bold text-primary dark:text-secondary uppercase tracking-wider mb-3">
                    {isFa ? div.taglineFa : div.taglineEn}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {isFa ? div.descriptionFa : div.descriptionEn}
                  </p>

                  <div>
                    <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
                      {isFa ? 'فناوری‌های تحت سرپرستی دپارتمان:' : 'Key Technologies & Deployments:'}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {div.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:border-l lg:dark:border-slate-800 lg:pl-8 rtl:lg:border-l-0 rtl:lg:border-r rtl:lg:pl-0 rtl:lg:pr-8 shrink-0 flex flex-col justify-between space-y-4">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs space-y-2">
                    <div>
                      <span className="text-slate-400 block">{isFa ? 'سرپرست راهبردی:' : 'Lead Executive:'}</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{div.leadExecutive}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">{isFa ? 'پروژه‌های فعال:' : 'Active Deployments:'}</span>
                      <span className="font-mono font-bold text-emerald-500">{div.activeProjects} Operations</span>
                    </div>
                  </div>

                  {setPage && (
                    <button
                      onClick={() => setPage(div.targetPage)}
                      className="px-6 py-3 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group-hover:scale-105"
                    >
                      <span>{isFa ? 'مشاهده فناوری‌ها و گزارش‌ها' : 'Explore Division Portfolio'}</span>
                      {direction === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DivisionsPage;
