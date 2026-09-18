import * as React from 'react';
import { useLanguage } from '../../LanguageContext';
import { motion } from 'motion/react';
import { 
  Building2, 
  Coins, 
  ShieldCheck, 
  TrendingUp, 
  Handshake, 
  FileCheck, 
  Scale, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  Landmark,
  Briefcase
} from 'lucide-react';

interface InvestmentGovernanceSectionProps {
  onScrollTo: (elementId: string) => void;
}

export const InvestmentGovernanceSection: React.FC<InvestmentGovernanceSectionProps> = ({ onScrollTo }) => {
  const { language, direction } = useLanguage();
  const isFa = language === 'FA';

  const [activeStepIndex, setActiveStepIndex] = React.useState<number>(0);

  const investmentSteps = [
    {
      step: 1,
      titleEn: '1. Opportunity Audit',
      titleFa: '۱. ممیزی و غربالگری اولیه فرصت',
      descEn: 'Rapid assessment of demographic, solar, wind, hydrological and agricultural baseline data in target rural basin.',
      descFa: 'بررسی سریع شاخص‌های جمعیتی، منابع تجدیدپذیر، آبخوان‌ها و ساختار تولید کشاورزی منطقه مورد نظر.'
    },
    {
      step: 2,
      titleEn: '2. Pre-Feasibility Study (PFS)',
      titleFa: '۲. مطالعات پیش‌امکان‌سنجی (PFS)',
      descEn: 'Engineering sizing, CAPEX/OPEX modeling, IRR calculations and stakeholder alignment matrix.',
      descFa: 'برآورد فنی و ابعادی، مدل‌سازی هزینه‌های سرمایه‌ای و جاری، محاسبه نرخ بازگشت داخلی (IRR) و هماهنگی ذینفعان.'
    },
    {
      step: 3,
      titleEn: '3. Bankable Feasibility Study (BFS)',
      titleFa: '۳. طرح توجیهی بانکی (BFS)',
      descEn: 'Audited financial models, sensitivity risk testing, geotechnical assays and environmental compliance approvals.',
      descFa: 'مدل‌سازی مالی مورد تأیید نظام بانکی، آزمون حساسیت و ریسک، مطالعات ژئوتکنیک و تاییدیه‌های زیست‌محیطی.'
    },
    {
      step: 4,
      titleEn: '4. Legal & PPP Structuring',
      titleFa: '۴. ساختار حقوقی و قرارداد مشارکت (PPP)',
      descEn: 'Drafting BOOT, lease, or cooperative concession contracts with clear dispute resolution, risk-sharing and title security.',
      descFa: 'تنظیم قراردادهای حقوقی مشارکت عمومی-خصوصی (BOOT)، تسهیم ریسک، لیزینگ و ضمانت‌های قانونی سرمایه‌گذاری.'
    },
    {
      step: 5,
      titleEn: '5. Blended Capital Syndication',
      titleFa: '۵. هم‌رسانی و تلفیق منابع مالی',
      descEn: 'Syndicating equity, development bank concessionary loans, regional cooperative capital and green carbon credits.',
      descFa: 'تلفیق آورده سهام‌داران، وام‌های توسعه‌ای یارانه‌دار، منابع صندوق‌های توسعه و پیش‌فروش اعتبارات کربن.'
    },
    {
      step: 6,
      titleEn: '6. EPC Deployment & Commissioning',
      titleFa: '۶. اجرای مهندسی و راه‌اندازی (EPC)',
      descEn: 'Standardized procurement, civil construction, microgrid commissioning and grid interconnection testing.',
      descFa: 'تدارکات مهندسی استاندارد، عملیات عمرانی، نصب تجهیزات تخصصی، تست اتصال و راه‌اندازی صنعتی.'
    },
    {
      step: 7,
      titleEn: '7. Digital O&M Operations',
      titleFa: '۷. بهره‌برداری، نگهداری و پایش دیجیتال (O&M)',
      descEn: 'Permanent local technical staff operation supported by centralized 24/7 cloud telemetry and predictive maintenance.',
      descFa: 'بهره‌برداری توسط تکنسین‌های بومی آموزش‌دیده با پشتیبانی تله‌متری ۲۴ساعته ابری و نگهداری پیش‌بینانه.'
    },
    {
      step: 8,
      titleEn: '8. Value Realization & Reinvestment',
      titleFa: '۸. بازیافت سرمایه و چرخه سرمایه‌گذاری مجدد',
      descEn: 'Dividend distributions to investors and community trusts, with a percentage allocated to local public infrastructure.',
      descFa: 'تقسیم سود عادلانه میان سرمایه‌گذاران و جامعه محلی، با اختصاص درصدی به صندوق توسعه زیرساخت‌های عمومی روستا.'
    }
  ];

  const institutionalPartners = [
    {
      icon: Landmark,
      titleEn: 'Regional & Public Authorities',
      titleFa: 'نهادها و دستگاه‌های اجرایی منطقه‌ای',
      descEn: 'Partnering with regional governments, rural development directorates, water authorities, and nomadic affairs bodies to align with national development mandates.',
      descFa: 'همکاری با استانداری‌ها، معاونت‌های توسعه روستایی، شرکت‌های آب منطقه‌ای و سازمان امور عشایر جهت هم‌راستایی با اسناد بالادستی.'
    },
    {
      icon: Briefcase,
      titleEn: 'Development & Infrastructure Funds',
      titleFa: 'بانک‌ها و صندوق‌های توسعه سرمایه‌گذاری',
      descEn: 'Channeling institutional capital, agricultural development bank credit lines, and green climate finance into de-risked, bankable rural bundles.',
      descFa: 'جذب سرمایه‌های نهادی، خطوط اعتباری بانک کشاورزی، و منابع توسعه پایدار در قالب بسته‌های پروژه‌ای کم‌ریسک و دارای توجیه اقتصادی.'
    },
    {
      icon: Handshake,
      titleEn: 'Rural & Tribal Cooperatives',
      titleFa: 'تعاونی‌های تولیدی روستایی و عشایری',
      descEn: 'Empowering local farmer collectives, tribal councils, and producer associations as equity stakeholders rather than passive recipients.',
      descFa: 'مشارکت دادن تعاونی‌های تولید، شوراهای محلی و تشکل‌های عشایری به‌عنوان سهام‌داران واقعی طرح‌ها، نه صرفاً مصرف‌کنندگان خرد.'
    }
  ];

  return (
    <section id="investment-governance" className="py-20 bg-slate-900 text-white relative border-b border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-mono font-bold text-emerald-400 mb-2 block">
            {isFa ? 'ساختاردهی مالی و حکمرانی (معماری ۱۰.۱۹ و ۱۰.۲۱)' : 'BANKABLE CAPITAL & GOVERNANCE ARCHITECTURE (10.19 & 10.21)'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white mb-4">
            {isFa 
              ? 'سرمایه‌گذاری بانکی و مدل‌های مشارکت در توسعه روستایی' 
              : 'Bankable PPP Structures & Institutional Governance'}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {isFa 
              ? 'KKM نیازمندی‌های پراکنده مناطق روستایی را به طرح‌های شفاف، دارای توجیه اقتصادی، کم‌ریسک و با ضمانت‌های اجرایی برای بانک‌ها و سرمایه‌گذاران تبدیل می‌کند.' 
              : 'KKM transforms fragmented rural needs into audited, risk-mitigated, and bankable infrastructure assets suitable for institutional and blended finance.'}
          </p>
        </div>

        {/* 3 Institutional Collaboration Models */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {institutionalPartners.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-slate-950/70 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between transition-colors"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    {isFa ? item.titleFa : item.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {isFa ? item.descFa : item.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 8-Stage Bankable Investment Lifecycle */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                {isFa ? 'چرخه ۸ مرحله‌ای سرمایه‌گذاری مطمئن' : '8-STAGE BANKABLE INVESTMENT LIFECYCLE'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {isFa ? 'مسیر تبدیل فرصت‌های محلی به دارایی‌های سودآور' : 'From Regional Baseline to Bankable Asset Creation'}
              </h3>
            </div>
            <button
              onClick={() => onScrollTo('pilot-intake-form')}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl transition-colors shrink-0 flex items-center gap-2 cursor-pointer"
            >
              <span>{isFa ? 'درخواست ممیزی اولیه منطقه' : 'Request Basin Audit'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {investmentSteps.map((step, idx) => (
              <div
                key={step.step}
                className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 hover:border-emerald-500/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-emerald-400">
                    STEP {step.step}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-slate-600" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white mb-1.5">
                  {isFa ? step.titleFa : step.titleEn}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {isFa ? step.descFa : step.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Strategic Partnership Banner */}
        <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-950 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-start">
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {isFa 
                ? 'آماده همکاری راهبردی با مدیران، سرمایه‌گذاران و توسعه‌گران منطقه‌ای' 
                : 'Ready for Strategic Alignment with Regional Authorities & Investors'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {isFa 
                ? 'تیم مهندسی و مالی KKM آماده ارزیابی تخصصی حوزه‌های روستایی و تدوین طرح‌های فنی-اقتصادی یکپارچه متناسب با اقلیم و پتانسیل‌های بومی شماست.' 
                : 'KKM\'s multidisciplinary engineering and financial architects are prepared to audit your regional basin and structure an integrated, bankable development masterplan.'}
            </p>
          </div>

          <button
            onClick={() => onScrollTo('pilot-intake-form')}
            className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>{isFa ? 'شروع مشاوره و ثبت پیشنهاد' : 'Initiate Basin Evaluation'}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>

      </div>
    </section>
  );
};
