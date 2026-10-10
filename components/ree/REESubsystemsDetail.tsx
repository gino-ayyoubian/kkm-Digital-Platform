import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Cpu, ShieldCheck, ChevronDown, CheckCircle2, Award, Zap, Droplets, Compass } from 'lucide-react';

interface REESubsystemsDetailProps {
  isFa: boolean;
}

export const REESubsystemsDetail: React.FC<REESubsystemsDetailProps> = ({ isFa }) => {
  const [activeTab, setActiveTab] = useState<'patents' | 'subsystems' | 'sediment' | 'ai_digital_twin'>('patents');
  const [openAccordion, setOpenAccordion] = useState<string | null>('S-1');

  const subsystems = [
    {
      id: 'S-1',
      title: isFa ? 'زیرسامانه S-1: تقسیم‌کننده جریان با دریچه‌های سروو-موتوری' : 'S-1: Flow Divider with Servo-Motorized Bypass Gates',
      tag: 'FLOW ALLOCATION & FLOOD SAFETY',
      summary: isFa
        ? 'تخصیص هوشمند دبی بین مسیر تولید و مسیر انحراف (Bypass). در مواقع سیلابی از سرریز ناخواسته جلوگیری کرده و جریان مازاد را بدون اغتشاش هیدرولیکی هدایت می‌نماید.'
        : 'Smart discharge allocation between power generation channel and bypass channel. Diverts extreme seasonal flood surges while preventing basin submersion.',
      specs: [
        { label: isFa ? 'نوع محرک' : 'Actuator Type', value: 'Servo-Electric Linear Ball-Screw' },
        { label: isFa ? 'زمان پاسخ انحراف' : 'Bypass Response Time', value: '< 18 seconds full stroke' },
        { label: isFa ? 'ظرفیت دبی مازاد' : 'Surge Capacity', value: 'Up to 250% nominal discharge' },
        { label: isFa ? 'سیل آب‌بندی' : 'Sealing Standard', value: 'EPDM Multi-lip bubble-tight' },
      ]
    },
    {
      id: 'S-2',
      title: isFa ? 'زیرسامانه S-2: ورودی مماسی با پره‌های راهنمای قابل‌چرخش (0°–90°)' : 'S-2: Tangential Inlet with 0°–90° Rotatable Guide Vanes',
      tag: 'ANGULAR MOMENTUM REGULATION',
      summary: isFa
        ? 'تنظیم دقیق زاویه ورود سیال به حوضچه جهت کنترل تکانه زاویه‌ای ورودی. زاویه پره‌ها بین ۰ تا ۹۰ درجه به تناسب دبی لحظه‌ای تغییر یافته تا بیشینه سرعت مماسی حاصل شود.'
        : 'Regulates angular momentum vector at basin entry. Automatically tilts vanes between 0° and 90° depending on river discharge to maintain peak tangential vortex speed.',
      specs: [
        { label: isFa ? 'زاویه گردش' : 'Rotation Range', value: '0° to 90° continuous pitch' },
        { label: isFa ? 'مکانیزم همگام‌ساز' : 'Linkage Mechanism', value: 'Ring gear synchronous mechanical drive' },
        { label: isFa ? 'زاویه بهینه ورتکس' : 'Optimal Vortex Angle', value: '45° – 60° (Discharge Dependent)' },
        { label: isFa ? 'جنس پره‌ها' : 'Vane Material', value: 'Marine-grade 316L Stainless Steel' },
      ]
    },
    {
      id: 'S-3',
      title: isFa ? 'زیرسامانه S-3: حوضچهٔ تطبیقی با کف پنلی و خروجی قطر-متغیر تلسکوپی' : 'S-3: Adaptive Basin with Panel Floor & Telescopic Orifice',
      tag: 'GEOMETRIC RECONFIGURATION',
      summary: isFa
        ? 'کنترل شعاع هسته گردابه، عمق مکش، و ارتفاع مؤثر هیدرولیکی از طریق آستین تلسکوپی متغیر و پنل‌های متحرک کف حوضچه. امکان سوئیچ لحظه‌ای میان ساختار حوضچه‌ای و کانال جریان باز.'
        : 'Controls vortex core radius, suction depth, and effective hydraulic head via a motorized telescopic orifice sleeve and retractable floor panels for direct open-channel bypass.',
      specs: [
        { label: isFa ? 'محدوده قطر خروجی' : 'Orifice Diameter Range', value: '0.40m to 1.80m (Continuous)' },
        { label: isFa ? 'نسبت خروجی به حوضچه' : 'D_out / D_basin Ratio', value: '0.15 to 0.45 dynamically tuned' },
        { label: isFa ? 'مکانیزم کف پنلی' : 'Floor Panel Actuation', value: 'Hydraulic scissor-pantograph array' },
        { label: isFa ? 'طراحی هیدرودینامیک' : 'Basin Profile', value: 'Logarithmic spiral curvature' },
      ]
    },
    {
      id: 'S-4',
      title: isFa ? 'زیرسامانه S-4: روتور عمودی اولیه + ژنراتور PMG متصل-مستقیم' : 'S-4: Primary Vertical-Axis Rotor & Direct-Drive PMG',
      tag: 'ELECTROMECHANICAL CONVERSION',
      summary: isFa
        ? 'روتور هیدرولیکی با ایرفویل‌های کم‌فشار بهینه‌سازی‌شده برای گردش در هسته ورتکس و جریان آزاد، متصل مستقیم بدون جعبه‌دنده به ژنراتور آهنربای دائم (PMG) ضدآب با بازدهی ۹۶٪.'
        : 'Curved low-shear hydrofoil rotor optimized for both core vortex suction and open-stream kinetic drag. Direct-coupled without gearbox to a 96% efficient submersible PMG.',
      specs: [
        { label: isFa ? 'نوع ژنراتور' : 'Generator Topology', value: 'Permanent Magnet Synchronous (PMG)' },
        { label: isFa ? 'بازده تبدیل' : 'Electrical Efficiency', value: '> 96.2% at nominal load' },
        { label: isFa ? 'کاویتاسیون و تنش' : 'Cavitation Inception', value: 'Sigma > 1.8 (Cavitation-free)' },
        { label: isFa ? 'تراز حفاظتی' : 'Ingress Protection', value: 'IP68 Submersible with double mechanical seal' },
      ]
    },
    {
      id: 'S-5',
      title: isFa ? 'زیرسامانه S-5: روتور ثانویهٔ جمع‌شوندهٔ پایین‌دست' : 'S-5: Downstream Retractable Secondary Swirl Rotor',
      tag: 'WAKE SWIRL ENERGY RECOVERY',
      summary: isFa
        ? 'بازیابی انرژی چرخشی پسا در حالت هیبریدی. این روتور در کانال پایاب مستقر شده و مومنتوم زاویه‌ای باقیمانده خروجی حوضچه را جذب نموده و راندمان کل را تا ۱۸٪ ارتقا می‌دهد.'
        : 'Recovers residual swirl kinetic energy from the discharge vortex tailrace. Deploys dynamically in Hybrid Mode to capture unharvested angular momentum (+12% to 18% total yield).',
      specs: [
        { label: isFa ? 'ضریب بازیافت توان' : 'Energy Recovery Boost', value: '+12% to +18% net output' },
        { label: isFa ? 'مکانیزم جمع‌شدن' : 'Retraction Mechanism', value: 'Hydraulic pivot jib boom' },
        { label: isFa ? 'چرخش پره‌ها' : 'Rotor Swirl Sense', value: 'Counter-rotational swirl absorption' },
        { label: isFa ? 'کارکرد در سیلاب' : 'Flood Behavior', value: 'Auto-retracts above safety velocity' },
      ]
    },
    {
      id: 'S-6',
      title: isFa ? 'زیرسامانه S-6: کنترل‌کنندهٔ پیش‌بین با ورود هیدرولوژیک' : 'S-6: Predictive Controller with Hydrological Feed',
      tag: 'AUTONOMOUS REGIME SELECTION',
      summary: isFa
        ? 'انتخاب خودکار حالت الف (گردابه‌ای)، ب (جریان آزاد) یا ج (هیبریدی) بر پایه داده‌های ایستگاه هیدرومتری بالادست، مدل‌های هواشناسی، و دوقلوی دیجیتال مرتبه-کاسته کالیبره‌شده.'
        : 'Autonomous selection between Regime A (Vortex), B (Hydrokinetic), and C (Hybrid). Processes upstream telemetry and radar rainfall forecast via edge computing node.',
      specs: [
        { label: isFa ? 'نرخ نمونه‌برداری' : 'Control Loop Frequency', value: '50 Hz Edge Deterministic' },
        { label: isFa ? 'پروتکل ارتباطی' : 'Industrial Fieldbus', value: 'OPC-UA / IEC 60870-5-104 / MQTT' },
        { label: isFa ? 'مدل پیش‌بین' : 'Predictive Horizon', value: '15 min local / 72 hr catchment' },
        { label: isFa ? 'ضریب ایمنی سیلاب' : 'Safety SIL Level', value: 'SIL-3 Safety Instrumented System' },
      ]
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
      {/* Header and Inventor Attribution */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl md:text-2xl font-bold font-display text-slate-900 dark:text-white">
              {isFa
                ? 'اختراعات، نوآوری‌ها و معماری ۶ زیرسامانه KKM-REE'
                : 'KKM-REE Patented Inventions & 6 Sub-systems Architecture'}
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              {isFa ? 'مخترع و ثبت مالکیت: سیدژینو ایوبیان' : 'Inventor & Patentee: Gino Ayyoubain'}
            </span>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              EAOS-REE-2026 Tier-1
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          {[
            { id: 'patents', label: isFa ? 'اختراعات سه‌گانه' : '3 Core Patents' },
            { id: 'subsystems', label: isFa ? '۶ زیرسامانه (S1-S6)' : '6 Subsystems (S1-S6)' },
            { id: 'sediment', label: isFa ? 'سامانه خودتمیزشونده رسوب' : 'Self-Cleaning Debris' },
            { id: 'ai_digital_twin', label: isFa ? 'دوقلوی دیجیتال و AI MPC' : 'Digital Twin & AI' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-slate-900 text-primary dark:text-cyan-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: THE THREE CORE PATENTS */}
      {activeTab === 'patents' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Patent 1 */}
            <div className="p-6 rounded-2xl border border-cyan-200 dark:border-cyan-900/40 bg-cyan-50/40 dark:bg-cyan-950/20 space-y-4">
              <div className="flex justify-between items-start">
                <span className="w-8 h-8 rounded-xl bg-cyan-600 text-white font-bold flex items-center justify-center text-sm shadow">
                  1
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-300">
                  PCT/IB2025/081944
                </span>
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug">
                {isFa
                  ? '«سامانهٔ تبدیل انرژی رودخانه‌ای گردابه‌ای–هیدروکینتیکی ماژولار و تطبیقی با پیکربندی مجدد جریان در چند حالت»'
                  : 'Modular & Adaptive Vortex-Hydrokinetic River Energy Conversion System with Multi-Regime Flow Reconfiguration'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {isFa
                  ? 'سامانه تبدیل انرژی رودخانه‌ای ماژولار شامل تقسیم‌کننده جریان با دریچه انحراف، کانال ورودی با پره‌های راهنمای ۰-۹۰ درجه، حوضچه گردابه با کف تطبیقی پنلی و آستین تلسکوپی قطر-متغیر، روتور عمودی اولیه با PMG، روتور ثانویه جمع‌شونده و کنترل‌کننده پیش‌بین ۳ رژیم.'
                  : 'Modular hydrokinetic conversion with bypass divider, 0°-90° vanes, adaptive panel floor basin with variable telescopic orifice, direct PMG, and wake swirl recovery.'}
              </p>
              <div className="pt-3 border-t border-cyan-100 dark:border-cyan-900/40 flex items-center justify-between text-xs font-mono text-cyan-700 dark:text-cyan-400">
                <span>{isFa ? 'مالکیت: سیدژینو ایوبیان' : 'Patentee: Gino Ayyoubain'}</span>
                <span>TRL 6-7</span>
              </div>
            </div>

            {/* Patent 2 */}
            <div className="p-6 rounded-2xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/20 space-y-4">
              <div className="flex justify-between items-start">
                <span className="w-8 h-8 rounded-xl bg-amber-600 text-white font-bold flex items-center justify-center text-sm shadow">
                  2
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300">
                  PCT/IB2025/081945
                </span>
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug">
                {isFa
                  ? '«تجهیزات مدیریت خودتمیزشوندهٔ رسوب و آشغال برای سامانه‌های انرژی رودخانه‌ای گردابه‌ای و هیدروکینتیکی با ارتفاع کم»'
                  : 'Self-Cleaning Sediment & Debris Management Equipment for Low-Head Vortex & Hydrokinetic Systems'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {isFa
                  ? 'شامل حلقه جمع‌آوری بار بستر محیطی با شیارهای مارپیچ ۳–۸ درجه با رانش گردابه‌ای-گرانشی، صفحه ورودی چرخان خودفعال‌شونده هیدرولیکی بدون محرک برقی، سرریز سطحی شناور، و کنترل‌کننده تخلیه پالسی بر مبنای سنسور کدورت.'
                  : 'Peripheral spiral groove bedload ring (3°–8°), hydraulically self-actuating rotary inlet screen (no electric motor needed), floating debris weir, and turbidity-triggered flush.'}
              </p>
              <div className="pt-3 border-t border-amber-100 dark:border-amber-900/40 flex items-center justify-between text-xs font-mono text-amber-700 dark:text-amber-400">
                <span>{isFa ? 'کیت ارتقا حوضچه‌های موجود' : 'Basin Retrofit Kit'}</span>
                <span>TRL 6</span>
              </div>
            </div>

            {/* Patent 3 */}
            <div className="p-6 rounded-2xl border border-purple-200 dark:border-purple-900/40 bg-purple-50/40 dark:bg-purple-950/20 space-y-4">
              <div className="flex justify-between items-start">
                <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-bold flex items-center justify-center text-sm shadow">
                  3
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300">
                  PCT/IB2025/081946
                </span>
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug">
                {isFa
                  ? '«سامانهٔ کنترل تطبیقی جریانِ پیش‌بین مبتنی بر هوش مصنوعی و دوقلوی دیجیتال برای تأسیسات توزیع‌شدهٔ انرژی رودخانه‌ای»'
                  : 'AI-Driven & Digital Twin Predictive Adaptive Flow Control for Distributed River Energy Installations'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {isFa
                  ? 'پیش‌بینی دبی با گراف یادگیری ماشین (GNN) روی توپولوژی شبکه رودخانه، دوقلوی دیجیتال مرتبه-کاسته (ROM) کالیبره CFD با تصحیح فیلتر کالمن، کنترل پیش‌بین MPC/RL تحت قیود زیست‌محیطی، و مدیریت ناوگان در قالب نیروگاه مجازی (VPP).'
                  : 'Spatio-temporal GNN streamflow prediction on river topology, CFD-calibrated ROM updated online with Kalman filter, MPC/RL environmental flow policy, and VPP fleet dispatch.'}
              </p>
              <div className="pt-3 border-t border-purple-100 dark:border-purple-900/40 flex items-center justify-between text-xs font-mono text-purple-700 dark:text-purple-400">
                <span>{isFa ? 'هوش مصنوعی و لبه صنعتی' : 'Edge AI & Cloud'}</span>
                <span>TRL 7</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SIX SUBSYSTEMS (S-1 to S-6) ACCORDION */}
      {activeTab === 'subsystems' && (
        <div className="space-y-4">
          {subsystems.map((sub) => {
            const isOpen = openAccordion === sub.id;
            return (
              <div
                key={sub.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50/50 dark:bg-slate-800/30 transition-all"
              >
                <button
                  onClick={() => setOpenAccordion(isOpen ? null : sub.id)}
                  className="w-full p-5 text-left rtl:text-right flex items-center justify-between gap-4 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary dark:text-cyan-400 font-mono font-bold text-xs flex items-center justify-center">
                      {sub.id}
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                        {sub.title}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-400">{sub.tag}</span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-primary' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-5 pb-5 pt-1 space-y-4 text-xs"
                    >
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {sub.summary}
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-slate-200 dark:border-slate-700/60">
                        {sub.specs.map((sp, idx) => (
                          <div key={idx} className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                            <span className="text-[10px] text-slate-400 block mb-0.5">{sp.label}</span>
                            <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-xs">{sp.value}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 3: SELF-CLEANING SEDIMENT & DEBRIS EQUIPMENT (Invention 2) */}
      {activeTab === 'sediment' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-4">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
              <Droplets className="w-5 h-5" />
              <h3 className="font-bold text-base">
                {isFa ? 'حلقه جمع‌آوری بار بستر با شیارهای مارپیچ (۳–۸ درجه)' : 'Peripheral Bedload Spiral Grooves (3°–8° Slope)'}
              </h3>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {isFa
                ? 'در گردابه‌های سنتی، رسوبات ماسه‌ای به مرکز مکیده شده و باعث سایش شدید پره‌ها می‌شدند. در اختراع سیدژینو ایوبیان، گرادیان فشار شعاعی و شیارهای مارپیچ پیرامونی با شیب ۳ تا ۸ درجه ذرات سنگین را به سمت محیط هدایت کرده و از طریق مجرای جاذبه‌ای بدون توقف تولید تخلیه می‌نمایند.'
                : 'Traditional vortex basins sucked abrasive sand into the turbine core. This invention utilizes radial pressure gradients and 3°–8° inclined peripheral spiral grooves to divert bedload outward to gravity sumps without shutting down production.'}
            </p>
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-amber-200 dark:border-amber-900/60 font-mono text-[11px] space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">{isFa ? 'قطر ذرات قابل تفکیک:' : 'Separated Grain Size:'}</span>
                <span className="font-bold text-amber-600">0.05 mm to 40 mm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{isFa ? 'افت دبی حین تخلیه:' : 'Discharge Loss during purge:'}</span>
                <span className="font-bold text-emerald-600">&lt; 1.8% of inflow</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{isFa ? 'سایش سالانه پره‌ها:' : 'Blade Erosion Reduction:'}</span>
                <span className="font-bold text-cyan-600">-84% vs traditional</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center gap-2 text-primary dark:text-cyan-400">
              <Compass className="w-5 h-5" />
              <h3 className="font-bold text-base">
                {isFa ? 'صفحه ورودی خودفعال‌شونده هیدرولیکی و سرریز شناور' : 'Hydraulic Self-Actuating Rotary Screen & Debris Weir'}
              </h3>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {isFa
                ? 'صفحه آشغال‌گیر ورودی بدون هیچ‌گونه موتور الکتریکی و صرفاً با گشتاور ناشی از تفاوت تراز آب کانال دوران می‌کند. شاخه‌ها و زباله‌های شناور روی سرریز هیدرولیکی بدون کاهش بار هیدرولیکی به مسیر فرعی رانده می‌شوند.'
                : 'The rotary inlet screen is powered entirely by the hydraulic head gradient without electrical motors or parasitic power draw. Floating logs and debris pass smoothly across the buoyant weir into the bypass.'}
            </p>
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-[11px] space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">{isFa ? 'مصرف توان الکتریکی:' : 'Parasitic Power Draw:'}</span>
                <span className="font-bold text-emerald-500">0.00 kW (100% Passive)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{isFa ? 'تریگر تخلیه هوشمند:' : 'Purge Trigger Criteria:'}</span>
                <span className="font-bold text-amber-500">Turbidity &gt; 180 NTU or dP &gt; 12 kPa</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{isFa ? 'کیت ارتقا حوضچه:' : 'Retrofit Kit Status:'}</span>
                <span className="font-bold text-primary">Pre-fabricated bolt-on available</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: AI & DIGITAL TWIN PREDICTIVE CONTROL (Invention 3) */}
      {activeTab === 'ai_digital_twin' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                {isFa ? 'گراف نوترونی فضا-زمان (GNN)' : 'Spatio-Temporal GNN'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {isFa
                  ? 'مدلسازی توپولوژی حوضه آبریز جهت پیش‌بینی پالس‌های دبی تا ۷۲ ساعت آینده با در نظر گرفتن پوشش گیاهی و بارش بالادست.'
                  : 'Predicts river hydrograph surges 72 hours ahead using catchment graph topology and upstream hydrological sensors.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                {isFa ? 'دوقلوی ROM با فیلتر کالمن' : 'Reduced-Order Model (ROM)'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {isFa
                  ? 'شبیه‌سازی سه‌بعدی CFD در کسری از میلی‌ثانیه بر روی چیپ‌های لبه صنعتی با کالیبراسیون و اصلاح خطای آنلاین Extended Kalman.'
                  : 'CFD surrogate model running at 50Hz on edge microcontrollers with online state estimation via Extended Kalman Filter.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                {isFa ? 'نیروگاه مجازی (VPP Fleet)' : 'Virtual Power Plant (VPP)'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {isFa
                  ? 'تجمیع واحدهای رودخانه‌ای متوالی در طول رودخانه در یک موجودیت قابل دیسپاچ در شبکه برق سراسری یا ریزشبکه‌های روستایی.'
                  : 'Aggregates multiple cascading river turbine stations into a dispatchable, frequency-stabilizing grid asset.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
