import * as React from 'react';
import { Page } from '../types';
import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';
import { 
  ChevronRight, 
  Database, 
  Cpu, 
  Droplets, 
  Zap, 
  Shield, 
  Factory, 
  Layers, 
  ArrowRight, 
  Sprout, 
  CheckCircle2, 
  Building2,
  Compass
} from 'lucide-react';

import IPBadge from '../components/IPBadge';

interface GMELHubPageProps {
  setPage: (page: Page) => void;
}

const GMELHubPage: React.FC<GMELHubPageProps> = ({ setPage }) => {
  const { t, direction, language } = useLanguage();
  const isFa = language === 'FA';
  const [activeTab, setActiveTab] = React.useState('Overview');

  const tabs = ['Overview', 'Rural Energy', 'GMEL-CLG', 'EHS', 'DrillX', 'ThermoFluid', 'ORC Compact', 'Desal', 'H2Cell', 'Applications', 'IP', 'R&D', 'Pilot', 'Partnership'];

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen pt-20 pb-16" dir={direction}>
      {/* Header */}
      <div className="bg-primary-dark text-white py-16 border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-display font-black mb-4">GMEL Platform</h1>
          <div className="flex flex-wrap gap-2 mb-6">
            <IPBadge status="Invented by" text="KKM International Group" />
            <IPBadge status="Patent Filed" text="System Architecture" />
            <IPBadge status="Commercialization Rights" text="Global" />
          </div>
          <p className="text-xl text-slate-300 max-w-3xl">
            GeoMeta Energy Layer: The intelligent backbone of KKM's closed-loop, zero-emission infrastructure solutions.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* --- DEVELOPMENT PLATFORM CONTEXT BLOCK --- */}
        <div className="mb-8 bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-500/40 rounded-2xl p-6 sm:p-8 shadow-xl text-white">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold tracking-wider">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                {isFa ? 'عضو فنی در پلتفرم توسعه روستایی و عشایری KKM' : 'TECHNICAL CONTRIBUTOR · KKM RURAL & NOMADIC DEVELOPMENT PLATFORM'}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {isFa 
                  ? 'GMEL به‌عنوان موتور زیرساختی پلتفرم توسعه پایدار، نه یک محصول منفرد' 
                  : 'GMEL as the Core Subsurface Engine for Integrated Regional Development'}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {isFa 
                  ? 'فناوری لایه انرژی ژئومتا (GMEL) صرفاً یک فناوری آزمایشگاهی مستقل نیست؛ بلکه به‌عنوان تأمین‌کننده بار پایه حرارتی و الکتریکی پاک در «پلتفرم توسعه روستایی و عشایری KKM» عمل می‌کند. این فناوری با استحصال حرارت زیرسطحی، نمک‌زدایی خورشیدی-حرارتی آب، تنظیم دمای گلخانه‌ها و تأمین برق بدون وقفه، زیربنای فنی «دهکده‌های انرژی مولد» را شکل می‌دهد.' 
                  : 'GMEL does not operate as an isolated technology silo. Instead, it serves as the foundational clean baseload and thermal-hydraulic contributor to KKM\'s broader Rural & Nomadic Development Platform. By supplying zero-emission geothermal exchange, ORC generation, solar-thermal brackish desalination, and greenhouse microclimate tempering, GMEL turns arid off-grid villages into thriving economic centers.'}
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto">
              <button
                onClick={() => setPage(Page.RuralStudies)}
                className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>{isFa ? 'مشاهده پلتفرم توسعه روستایی و عشایری' : 'Explore Rural Development Platform'}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>

              <button
                onClick={() => setActiveTab('Rural Energy')}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>{isFa ? 'کاربردهای GMEL در دهکده انرژی' : 'GMEL in Energy Villages'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-4 sticky top-24">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-xl transition-colors ${
                      activeTab === tab 
                        ? 'bg-primary/10 text-primary-dark dark:bg-secondary/10 dark:text-secondary' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{tab}</span>
                    {activeTab === tab && <ChevronRight className="w-4 h-4 rtl:rotate-180" />}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 min-h-[600px]">
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'Overview' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">GMEL Ecosystem Overview</h2>
                  <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-8">
                    GMEL is an interconnected ecosystem of proprietary technologies designed to harvest, manage, and deploy sustainable thermal and electrical energy at scale, feeding directly into KKM's integrated development initiatives.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-6 mb-8">
                    <div className="p-6 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950">
                      <Cpu className="text-primary w-8 h-8 mb-4" />
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Digital Core (GMEL Vision)</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Advanced AI monitoring and digital twin capabilities for subsurface management.</p>
                    </div>
                    <div className="p-6 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950">
                      <Database className="text-emerald-500 w-8 h-8 mb-4" />
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Hardware & IP</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Proprietary closed-loop fluids, deep-well casings, and thermodynamic power conversion.</p>
                    </div>
                  </div>

                  <div className="p-6 border border-emerald-500/30 rounded-xl bg-emerald-500/5 dark:bg-emerald-950/20">
                    <div className="flex items-center gap-2 mb-2 text-emerald-600 dark:text-emerald-400 font-bold text-base">
                      <Sprout className="w-5 h-5" />
                      <span>{isFa ? 'نقش استراتژیک در توسعه روستایی و عشایری' : 'Strategic Role in Rural & Nomadic Development'}</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {isFa 
                        ? 'در مدل توسعه KKM، GMEL امکان تثبیت شبکه‌های توزیع محلی بدون نیاز به سوخت‌های فسیلی را فراهم کرده و انرژی لازم برای پمپاژ آب، تصفیه و کارگاه‌های فرآوری کشاورزی را تأمین می‌کند.' 
                        : 'Within KKM\'s development model, GMEL stabilizes decentralized microgrids without fossil fuels, providing dedicated baseload power for solar water pumps, reverse osmosis purification, and localized agro-processing hubs.'}
                    </p>
                    <button
                      onClick={() => setPage(Page.RuralStudies)}
                      className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      <span>{isFa ? 'بررسی معماری کامل پلتفرم توسعه روستایی' : 'View the complete 10-Stage Rural Development Model'}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: RURAL ENERGY */}
              {activeTab === 'Rural Energy' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                        {isFa ? 'ستون اول پلتفرم توسعه روستایی (معماری ۱۰.۱۱)' : 'RURAL DEVELOPMENT PLATFORM · SECTION 10.11'}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                        {isFa ? 'کاربرد GMEL در دهکده انرژی و تولید مولد' : 'GMEL in Productive Energy Villages'}
                      </h2>
                    </div>
                  </div>

                  <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed mb-6">
                    {isFa 
                      ? 'در طرح دهکده انرژی KKM، سامانه GMEL همراه با پنل‌های فتوولتائیک و باتری‌های ذخیره‌ساز، یک ریزشبکه پایدار و ترکیبی می‌سازد که قطعی‌های فصلی برق را خنثی کرده و موتور محرکه صنایع تبدیلی روستا می‌شود.' 
                      : 'In KKM\'s Productive Energy Village blueprint, GMEL combines with bifacial photovoltaics and BESS reserves to establish a 100% reliable hybrid microgrid, neutralizing grid curtailment and powering localized value-addition industries.'}
                  </p>

                  <div className="grid sm:grid-cols-3 gap-4 mb-8">
                    <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                      <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Thermal Delivery</span>
                      <span className="text-lg font-bold text-slate-900 dark:text-white block">Closed-Loop 90°C–140°C</span>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">Thermal energy for dehydration tunnels & greenhouse heating.</p>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                      <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Water Production</span>
                      <span className="text-lg font-bold text-slate-900 dark:text-white block">500 m³ / Day Desal</span>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">Thermal recovery powering solar brackish desalination.</p>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                      <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">System Uptime</span>
                      <span className="text-lg font-bold text-emerald-500 block">99.8% Baseload</span>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">Continuous dispatch independent of solar irradiance or wind.</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
                    <div className="text-start">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {isFa ? 'مشاهده مستندات معماری دهکده انرژی' : 'Explore the Full Productive Energy Village Architecture'}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                        {isFa ? 'در پلتفرم توسعه روستایی و عشایری KKM' : 'On the KKM Rural & Nomadic Development Platform'}
                      </p>
                    </div>
                    <button
                      onClick={() => setPage(Page.RuralStudies)}
                      className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
                    >
                      <span>{isFa ? 'انتقال به پلتفرم توسعه روستایی' : 'Go to Rural Hub'}</span>
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* OTHER TABS */}
              {activeTab !== 'Overview' && activeTab !== 'Rural Energy' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full text-center py-20">
                  <Factory className="w-16 h-16 text-slate-300 dark:text-slate-700 mb-6" />
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{activeTab} Module</h2>
                  <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
                    Detailed technical specifications, IP status, and deployment metrics for this module are available in the full technology catalog.
                  </p>
                  <button onClick={() => setPage(Page.TechnologyTemplate)} className="px-6 py-3 bg-primary-dark dark:bg-secondary text-white dark:text-primary-dark font-bold rounded-full">
                    View Technology Template
                  </button>
                </motion.div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GMELHubPage;
