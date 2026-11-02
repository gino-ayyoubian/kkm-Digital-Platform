import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useLanguage } from '../LanguageContext';

interface MilestoneItem {
  year: string;
  titleEn: string;
  titleFa: string;
  descEn: string;
  descFa: string;
}

const milestones: MilestoneItem[] = [
  { 
    year: "2015", 
    titleEn: "Conceptualization & Physics Modeling", 
    titleFa: "مدل‌سازی فیزیکی و مبانی نظری",
    descEn: "Initial theoretical thermodynamic modeling for closed-loop geothermal heat extraction gradients.",
    descFa: "شبیه‌سازی اولیه ترمودینامیکی برای گرادیان‌های حرارتی استخراج مداربسته زمین‌گرمایی."
  },
  { 
    year: "2017", 
    titleEn: "REE Hydrokinetic Prototype", 
    titleFa: "پیش‌نمونه سامانه هیدروکینتیک REE",
    descEn: "First scaled deployment of the River Energy Ecosystem in test hydrological channels.",
    descFa: "نخستین استقرار مقیاس‌شده سامانه اکوسیستم انرژی رودخانه‌ای در کانال‌های آزمایشی آب."
  },
  { 
    year: "2019", 
    titleEn: "GMEL Subsurface Deep Well Tests", 
    titleFa: "آزمون‌های چاه عمیق زیرسطحی GMEL",
    descEn: "Successful closed-loop casing drilling and thermal extraction proof-of-concept validation.",
    descFa: "اثبات موفقیت‌آمیز فناوری مداربسته لوله‌های جداره و استخراج پیوسته گرما بدون افت سیال."
  },
  { 
    year: "2021", 
    titleEn: "Physics-Informed Digital Twin", 
    titleFa: "تلفیق دوقلوی دیجیتال مبتنی بر هوش مصنوعی",
    descEn: "Launch of real-time telemetry and PINN digital twin simulation lab for predictive thermal dispatch.",
    descFa: "راه‌اندازی آزمایشگاه شبیه‌سازی دوقلوی دیجیتال و تله‌متری بلادرنگ جهت نگهداری پیش‌بینانه."
  },
  { 
    year: "2023", 
    titleEn: "Commercial Scale & Water Nexus", 
    titleFa: "مقیاس‌پذیری تجاری و همبست آب-انرژی",
    descEn: "Coupling closed-loop geothermal baseload with multi-stage thermal desalination units.",
    descFa: "اتصال بار پایه زمین‌گرمایی با واحدهای نمک‌زدایی حرارتی چندمرحله‌ای با پساب صفر (ZLD)."
  },
  { 
    year: "2025", 
    titleEn: "Global Deployment & Enterprise Mesh", 
    titleFa: "استقرار منطقه‌ای و شبکه زیست‌بوم نوآوری",
    descEn: "Expanding modular clean baseload plants, rural microgrids, and open innovation partnerships.",
    descFa: "گسترش نیروگاه‌های مدولار تجدیدپذیر، ریزشبکه‌های پایدار روستایی و شبکه نوآوری باز بین‌المللی."
  }
];

const InnovationMilestones: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isFa } = useLanguage();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], isFa ? ["0%", "50%"] : ["0%", "-50%"]);

  return (
    <div ref={containerRef} className="py-24 bg-slate-900 overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-3">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
          {isFa ? 'مسیر بلوغ فناوری و توسعه KKM' : 'KKM Technology Roadmap & Milestones'}
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
          {isFa ? 'نقشه راه و نقاط عطف نوآوری' : 'Innovation Milestones'}
        </h2>
        <p className="text-slate-400 max-w-2xl leading-relaxed text-sm sm:text-base">
          {isFa 
            ? 'سیر زمانی تکوین فناوری‌های اختصاصی گروه بین‌المللی KKM از مبانی نظری و ثبت اختراعات تا تجاری‌سازی صنعتی در مقیاس چندمگاواتی.' 
            : 'The chronological journey of KKM’s core technology development, from theoretical modeling and patented inventions to multi-MW commercial deployment.'}
        </p>
      </div>

      <div className="relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 z-0"></div>
        <motion.div style={{ x }} className="flex gap-8 sm:gap-12 px-8 w-max relative z-10">
          {milestones.map((m, i) => (
            <div key={i} className="flex flex-col items-center w-72 sm:w-80">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center font-display font-bold text-white text-xl border-4 border-slate-900 shadow-xl mb-6 relative z-10">
                {m.year}
              </div>
              <div className="bg-slate-800/95 p-6 rounded-2xl shadow-lg border border-slate-700/80 w-full text-center">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
                  {isFa ? m.titleFa : m.titleEn}
                </h3>
                <p className="text-slate-300 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {isFa ? m.descFa : m.descEn}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default InnovationMilestones;
