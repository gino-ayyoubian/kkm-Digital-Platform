import * as React from 'react';
import { useLanguage } from '../../LanguageContext';
import { Page } from '../../types';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Layers, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  Zap,
  Droplets,
  Coins,
  Compass,
  Building,
  Calendar
} from 'lucide-react';

interface RuralHeroProps {
  setPage: (page: Page) => void;
  onScrollTo: (elementId: string) => void;
}

export const RuralHero: React.FC<RuralHeroProps> = ({ setPage, onScrollTo }) => {
  const { language, direction } = useLanguage();
  const isFa = language === 'FA';

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-24 pb-16 border-b border-slate-800">
      {/* Subtle geometric grid backdrop */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      
      {/* Decorative ambient glowing orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        {/* Architecture Spec Badge & Strategic Event Chip */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex flex-wrap items-center justify-center gap-3"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold tracking-wide">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            {isFa ? 'پلتفرم راهبردی توسعه پایدار KKM (معماری ۱۰.۲۸)' : 'KKM ENTERPRISE OPERATING SPECIFICATION · SECTION 10.28'}
          </span>

          <button
            onClick={() => onScrollTo('exhibition-hub')}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {isFa ? 'ششمین رویداد توانمندی‌های روستایی و عشایری' : '6th Rural & Nomadic Capabilities Event'}
            </span>
            <ArrowRight className="w-3 h-3 rtl:rotate-180 text-slate-400" />
          </button>
        </motion.div>

        {/* Hero Headings */}
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white mb-6 leading-tight"
          >
            {isFa 
              ? 'پلتفرم توسعه روستایی و عشایری KKM' 
              : 'KKM Rural & Nomadic Development Platform'}
          </motion.h1>

          {/* Primary Positioning Statement (10.2) */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-lg sm:text-xl text-emerald-400 font-semibold mb-4 max-w-3xl mx-auto leading-relaxed"
          >
            {isFa 
              ? 'راهکارهای یکپارچه فناوری، مهندسی و سرمایه‌گذاری برای توسعه پایدار روستایی و عشایری'
              : 'Integrated Technology, Engineering and Investment Solutions for Sustainable Rural and Nomadic Development'}
          </motion.p>

          {/* Core Hub Thesis */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal"
          >
            {isFa 
              ? 'این پلتفرم به‌عنوان هاب مرکزی KKM، پیوند میان انرژی‌های تجدیدپذیر، امنیت آب، کشاورزی اقلیم‌سازگار، صنایع فرآوری محلی، سامانه‌های سیار عشایری، هوش مصنوعی و مدل‌های تأمین مالی پروژه‌محور را جهت استقرار اقتصادی مولد و خوداتکا برقرار می‌سازد.'
              : 'Serving as KKM\'s central operational hub, this platform bridges distributed clean energy, water security, climate-smart agriculture, local agro-processing, mobile nomadic infrastructure, AI telemetry, and project finance to establish thriving, self-sustaining regional economies.'}
          </motion.p>

          {/* Hub Primary Action Triggers */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button 
              onClick={() => onScrollTo('pilot-intake-form')}
              className="px-7 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all flex items-center gap-2 group cursor-pointer"
            >
              <span>{isFa ? 'ثبت و ارزیابی پایلوت منطقه‌ای' : 'Propose a Regional Pilot'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </button>

            <button 
              onClick={() => onScrollTo('integrated-model')}
              className="px-7 py-3.5 bg-slate-800 hover:bg-slate-700/90 text-white font-semibold text-sm sm:text-base rounded-xl border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>{isFa ? 'مدل یکپارچه (۱۰ گام)' : '10-Stage Integrated Model'}</span>
            </button>

            <button 
              onClick={() => onScrollTo('project-explorer')}
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-medium text-sm sm:text-base rounded-xl border border-slate-700/80 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>{isFa ? 'کاوشگر الگوهای پروژه‌ای' : 'Rural Project Explorer'}</span>
            </button>
          </motion.div>
        </div>

        {/* 3 Foundational Pillars Summary (Section 10.4) */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 pt-10 border-t border-slate-800/80">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 text-start flex items-start gap-4 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono font-bold text-emerald-400 uppercase mb-1">
                {isFa ? 'رکن اول: ظرفیت' : '01. CAPACITY'}
              </div>
              <h3 className="text-sm font-bold text-white mb-1">
                {isFa ? 'ظرفیت‌های طبیعی و بومی' : 'Local Resource Endowments'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isFa 
                  ? 'ممیزی تابش، اراضی، آبخوان‌ها، ذخایر معدنی و توانمندی‌های بومی جامعه محلی.' 
                  : 'Auditing irradiance, land, aquifers, minerals and community demographic capital.'}
              </p>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 text-start flex items-start gap-4 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono font-bold text-amber-400 uppercase mb-1">
                {isFa ? 'رکن دوم: ارزش' : '02. VALUE'}
              </div>
              <h3 className="text-sm font-bold text-white mb-1">
                {isFa ? 'خلق ارزش افزوده محلی' : 'Retained Local Value'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isFa 
                  ? 'توقف خام‌فروشی از طریق فرآوری، سورتینگ، سردخانه و بسته‌بندی در کنار مزارع.' 
                  : 'Halting raw-export via decentralized agro-processing, cold chains, and branded packaging.'}
              </p>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 text-start flex items-start gap-4 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono font-bold text-cyan-400 uppercase mb-1">
                {isFa ? 'رکن سوم: توسعه' : '03. DEVELOPMENT'}
              </div>
              <h3 className="text-sm font-bold text-white mb-1">
                {isFa ? 'مدل اقتصادی پایدار و بانکی' : 'Bankable Systemic Scale'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isFa 
                  ? 'ساختاردهی پروژه‌ها با مدل‌های مشارکت عمومی-خصوصی، توجیه مالی و مقیاس‌پذیری.' 
                  : 'Structuring bankable PPPs with audited cashflows, operational integrity and replicability.'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
