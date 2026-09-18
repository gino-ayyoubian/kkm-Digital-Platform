import * as React from 'react';
import { useLanguage } from '../../LanguageContext';
import { Page } from '../../types';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Layers, 
  MapPin, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  FileText 
} from 'lucide-react';

interface RuralHeroProps {
  setPage: (page: Page) => void;
  onScrollTo: (elementId: string) => void;
}

export const RuralHero: React.FC<RuralHeroProps> = ({ setPage, onScrollTo }) => {
  const { language, direction } = useLanguage();
  const isFa = language === 'FA';

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-24 pb-20 border-b border-slate-800">
      {/* Subtle geometric grid backdrop */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      
      {/* Decorative ambient glowing orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        {/* Exhibition Notice Top Ribbon */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-wrap items-center justify-center gap-3"
        >
          <div 
            onClick={() => onScrollTo('exhibition-banner')}
            className="cursor-pointer inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-medium hover:bg-amber-500/25 transition-colors shadow-sm"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>
              {isFa 
                ? 'حضور KKM در ششمین نمایشگاه بین‌المللی توانمندی‌ها و ظرفیت‌های روستایی و عشایری' 
                : 'Meet KKM at the 6th International Exhibition of Rural & Nomadic Capacities'}
            </span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 text-amber-400" />
          </div>
        </motion.div>

        {/* Hero Headings */}
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-5">
              <Layers className="w-3.5 h-3.5" />
              {isFa ? 'پلتفرم توسعه راهبردی KKM' : 'KKM STRATEGIC DEVELOPMENT PLATFORM'}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white mb-6 leading-tight"
          >
            {isFa 
              ? 'از ظرفیت‌های محلی تا شکوفایی پایدار روستایی' 
              : 'From Local Resources to Sustainable Rural Prosperity'}
          </motion.h1>

          {/* Primary Positioning Statement */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-emerald-300/90 font-medium mb-4 max-w-3xl mx-auto leading-relaxed"
          >
            {isFa 
              ? 'راهکارهای یکپارچه فناوری، مهندسی و سرمایه‌گذاری برای توسعه پایدار روستایی و عشایری'
              : 'Integrated Technology, Engineering and Investment Solutions for Sustainable Rural and Nomadic Development'}
          </motion.p>

          {/* Supporting Text */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal"
          >
            {isFa 
              ? 'KKM با یکپارچه‌سازی انرژی، آب، زیرساخت، کشاورزی، صنایع و زنجیره‌های ارزش، فناوری‌های دیجیتال و مدل‌های سرمایه‌گذاری، برای توسعه جوامع روستایی و عشایری پایدار، تاب‌آور و اقتصادی راهکارهای یکپارچه ارائه می‌کند.'
              : 'KKM integrates energy, water, infrastructure, agriculture, productive industries, digital technologies and investment models to develop sustainable, resilient and economically productive rural and nomadic communities.'}
          </motion.p>

          {/* Call to Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button 
              onClick={() => onScrollTo('pilot-intake-form')}
              className="px-7 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all flex items-center gap-2 group cursor-pointer"
            >
              <span>{isFa ? 'پیشنهاد پایلوت و پروژه' : 'Propose a Pilot'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </button>

            <button 
              onClick={() => onScrollTo('integrated-model')}
              className="px-7 py-3.5 bg-slate-800 hover:bg-slate-700/80 text-white font-semibold text-sm sm:text-base rounded-xl border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{isFa ? 'بررسی مدل یکپارچه' : 'Explore the Platform'}</span>
            </button>

            <button 
              onClick={() => onScrollTo('exhibition-dossier')}
              className="px-6 py-3.5 bg-transparent hover:bg-white/5 text-slate-300 hover:text-white font-medium text-sm sm:text-base rounded-xl border border-slate-700/60 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>{isFa ? 'مستندات و ثبت‌نام نمایشگاه' : 'Exhibition Dossier & Profile'}</span>
            </button>
          </motion.div>
        </div>

        {/* 3 Core Mathematical Pillars Badge Bar */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 pt-10 border-t border-slate-800/80">
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 text-center sm:text-start flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white mb-1">
                {isFa ? 'ظرفیت‌های محلی (Local Capacity)' : 'Local Resource Endowments'}
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isFa 
                  ? 'شناسایی و فعال‌سازی ظرفیت‌های انرژی، آب، خاک و نیروی انسانی منطقه' 
                  : 'Identifying and activating solar, wind, geothermal, water, land and human assets.'}
              </p>
            </div>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 text-center sm:text-start flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white mb-1">
                {isFa ? 'خلق ارزش افزوده (Local Value Creation)' : 'Captured Local Value'}
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isFa 
                  ? 'جلوگیری از خام‌فروشی با فرآوری، بسته‌بندی، برندسازی و اتصال به بازار' 
                  : 'Preventing raw asset export through on-site processing, packaging and market links.'}
              </p>
            </div>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 text-center sm:text-start flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white mb-1">
                {isFa ? 'مدل مقیاس‌پذیر (Scalable Development)' : 'Systemic Scalability'}
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isFa 
                  ? 'تبدیل ایده‌ها به پروژه‌های بانکی، قابل تأمین مالی، پایدار و قابل تکرار' 
                  : 'Converting fragmented ideas into bankable, technically viable, repeatable systems.'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
