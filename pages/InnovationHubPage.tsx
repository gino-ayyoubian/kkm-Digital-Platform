
import * as React from 'react';
import { Page } from '../types';
import { useLanguage } from '../LanguageContext';
import PageHeader from '../components/PageHeader';
import { motion } from 'motion/react';
import CarbonOffsetViz from '../components/CarbonOffsetViz';
import LazyImage from '../components/LazyImage';
import InnovationMilestones from '../components/InnovationMilestones';
import { ProposalTrackerWidget } from '../components/innovation/ProposalTrackerWidget';
import { InnovationProposalIntakeModal } from '../components/innovation/InnovationProposalIntakeModal';
import { ShieldCheck, Lock, Globe2, Sparkles, FileText, CheckCircle2, KeyRound, ArrowRight } from 'lucide-react';

const InnovationStep: React.FC<{ number: string; title: string; children: React.ReactNode }> = ({ number, title, children }) => (
    <motion.div 
        className="flex relative"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
    >
        {/* Connecting Line (visual only) */}
        <div className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-gray-200 dark:bg-slate-700 -z-10 last:hidden"></div>

        <div className="flex flex-col items-center me-6 flex-shrink-0">
            <motion.div 
                className="flex items-center justify-center w-10 h-10 border-2 rounded-full border-secondary text-secondary font-bold bg-white dark:bg-slate-800 z-10 relative shadow-sm"
                whileInView={{ 
                    scale: [1, 1.1, 1],
                    boxShadow: [
                        "0 0 0px rgba(137, 207, 240, 0)", 
                        "0 0 12px rgba(10, 146, 239, 0.6)", 
                        "0 0 0px rgba(137, 207, 240, 0)"
                    ],
                    borderColor: ["#89CFF0", "#0A92EF", "#89CFF0"]
                }}
                transition={{ 
                    duration: 2, 
                    ease: "easeInOut", 
                    repeat: Infinity,
                    repeatType: "loop" 
                }}
            >
                {number}
            </motion.div>
        </div>
        <div className="pb-12 pt-1">
            <h3 className="mb-3 text-xl font-display font-bold text-primary dark:text-secondary">{title}</h3>
            <p className="text-text-light dark:text-slate-300 leading-relaxed">{children}</p>
        </div>
    </motion.div>
);

const InnovationHubPage: React.FC<{ setPage?: (page: Page) => void }> = ({ setPage }) => {
    const { t, isFa } = useLanguage();
    const [isProposalModalOpen, setIsProposalModalOpen] = React.useState(false);
    const [recentTrackingId, setRecentTrackingId] = React.useState<string | undefined>(undefined);

    return (
        <div>
            <PageHeader title={t(Page.InnovationHub)} subtitle={t('InnovationHubPageSubtitle')}/>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16">
                <div className="grid md:grid-cols-2 gap-16 items-start">
                    <div>
                        <h2 className="text-3xl font-display font-bold text-primary dark:text-secondary mb-8">{t('OurProcessTitle')}</h2>
                        <div className="flex flex-col">
                            <InnovationStep number="1" title={t('InnovationStep1Title')}>
                                {t('InnovationStep1Text')}
                            </InnovationStep>
                             <InnovationStep number="2" title={t('InnovationStep2Title')}>
                                {t('InnovationStep2Text')}
                            </InnovationStep>
                             <InnovationStep number="3" title={t('InnovationStep3Title')}>
                                {t('InnovationStep3Text')}
                            </InnovationStep>
                             <InnovationStep number="4" title={t('InnovationStep4Title')}>
                                {t('InnovationStep4Text')}
                            </InnovationStep>
                        </div>
                    </div>
                    
                    <div className="sticky top-24">
                        <motion.div 
                            className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl text-center border border-gray-100 dark:border-slate-700"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="rounded-xl overflow-hidden mb-6 shadow-md aspect-[5/3]">
                                <LazyImage 
                                    src="/images/innovation-hub.svg" 
                                    alt="Collaborative workshop environment" 
                                    width={500}
                                    height={300}
                                    className="w-full h-full object-cover hover:scale-105"
                                />
                            </div>
                            <h3 className="text-2xl font-display font-bold text-primary dark:text-secondary">{t('HaveVisionaryIdea')}</h3>
                            <p className="mt-4 text-text-light dark:text-slate-300 leading-relaxed">{t('AcceleratorProgramPitch')}</p>
                            <button 
                                onClick={() => setIsProposalModalOpen(true)}
                                className="mt-8 px-8 py-3.5 font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 dark:text-slate-950 dark:bg-secondary dark:hover:bg-sky-400 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary dark:focus:ring-offset-slate-800 flex items-center justify-center gap-2 mx-auto cursor-pointer"
                                aria-label={t('SubmitYourIdea')}
                            >
                                <Sparkles className="w-5 h-5 text-slate-900 dark:text-slate-950" />
                                <span>{t('SubmitYourIdea')}</span>
                            </button>
                            <div className="mt-4 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5">
                                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                <span>{isFa ? 'ارزیابی محرمانه با فرآیند رسمی NDA' : 'Confidential intake with preliminary NDA protocol'}</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Enterprise Open Innovation & Governance Boundary Matrix */}
            <div className="bg-slate-50 dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800 py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary dark:bg-secondary/10 dark:text-secondary mb-3">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>{isFa ? 'حاکمیت داده و حدود دسترسی مرکز نوآوری KKM' : 'KKM Innovation Data Governance & Access Tiers'}</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
                            {isFa ? 'چارچوب تفکیک دسترسی‌های عمومی و درون‌سازمانی' : 'Public vs. Enterprise Internal Boundary Architecture'}
                        </h2>
                        <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                            {isFa
                                ? 'به منظور صیانت از دارایی‌های فکری و اسرار تجاری و در عین حال تسهیل همکاری با نخبگان دانشگاهی، دسترسی‌های مرکز نوآوری در دو لایه شفاف تفکیک شده است.'
                                : 'To safeguard intellectual property and proprietary trade secrets while fostering open academic collaboration, Innovation Center assets are divided into clear operational tiers.'}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Tier 1: Public Open Innovation Tier */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
                                        <Globe2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-mono font-bold text-sky-500 uppercase tracking-wider block">Tier 1 • Open Access</span>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                            {isFa ? 'بخش عمومی و نوآوری باز (Public Domain)' : 'Public & Open Innovation Domain'}
                                        </h3>
                                    </div>
                                </div>
                                <ul className="space-y-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                                    <li className="flex items-start gap-2.5">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                        <span>{isFa ? 'فراخوان چالش‌های فناورانه و نیازهای پژوهشی باز KKM (Reverse Pitches)' : 'Open technology challenge statements and reverse research pitches'}</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                        <span>{isFa ? 'فرم و درگاه پذیرش غیرمحرمانه پروپوزال‌های دانشگاهی و شرکت‌های دانش‌بنیان' : 'Intake portal for non-confidential startup and academic collaboration proposals'}</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                        <span>{isFa ? 'شاخص‌های کلان بلوغ فناوری (TRL 1-9) و خلاصه اجرایی اختراعات منتشرشده' : 'Macro Technology Readiness Level (TRL) matrix and published patent abstracts'}</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                        <span>{isFa ? 'داشبورد تجمیعی شاخص‌های کاهش کربن و پایداری زیست‌محیطی' : 'Aggregated environmental impact, carbon offset, and sustainability indicators'}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/80">
                                <button 
                                    onClick={() => setIsProposalModalOpen(true)}
                                    className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/60 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <FileText className="w-4 h-4 text-sky-500" />
                                    <span>{isFa ? 'ثبت درخواست همکاری در چالش‌های نوآوری' : 'Submit Innovation Collaboration Proposal'}</span>
                                </button>
                            </div>
                        </div>

                        {/* Tier 2: Internal Enterprise R&D Tier */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider block">Tier 2 • Internal SSO</span>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                            {isFa ? 'بخش محرمانه درون‌سازمانی (Enterprise R&D Cartable)' : 'Restricted Enterprise R&D & Cartable'}
                                        </h3>
                                    </div>
                                </div>
                                <ul className="space-y-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                                    <li className="flex items-start gap-2.5">
                                        <Lock className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                                        <span>{isFa ? 'نقشه‌های تفصیلی مهندسی، مدل‌های CAD/BIM، دیاگرام‌های P&ID و فرمولاسیون نانوسیالات' : 'Full CAD/BIM models, detailed P&ID loops, and nanofluid chemical formulations'}</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <Lock className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                                        <span>{isFa ? 'داده‌های تله‌متری خام چاه‌ها، داده‌های سنسورهای زیرسطحی و شبیه‌سازی عددی گرادیان‌ها' : 'Subsurface real-time sensor streams, raw downhole telemetry, and numerical CFD logs'}</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <Lock className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                                        <span>{isFa ? 'کارتابل داوری کمیته نوآوری، نمرات ارزیابی فنی-اقتصادی و بودجه‌بندی طرح‌ها' : 'Technical evaluation scorecards, R&D budget allocation, and proposal approval cartable'}</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <Lock className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                                        <span>{isFa ? 'راه‌های ارتباطی مستقیم و شماره‌های داخلی کارشناسان R&D (صرفاً در اتوماسیون سازمانی)' : 'Direct contact details and internal VoIP extensions of researchers (SSO only)'}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/80">
                                <div className="px-3.5 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2">
                                    <Lock className="w-4 h-4 flex-shrink-0" />
                                    <span>{isFa ? 'دسترسی از طریق ورود امن پرتال سازمانی و اتوماسیون داخلی' : 'Accessible exclusively via Enterprise SSO Portal and internal automation'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Live Proposal Tracker Widget */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16">
                <ProposalTrackerWidget initialTrackingId={recentTrackingId} />
            </div>

            {/* Strategic Partner Tier-2 Data Room Invitation Banner */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 border border-slate-700/80 p-8 sm:p-10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            <Lock className="w-3.5 h-3.5" />
                            <span>{isFa ? 'دسترسی اختصاصی سرمایه‌گذاران و پیمانکاران EPC' : 'Accredited EPC & Investor Gated Access'}</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                            {isFa ? 'اتاق داده امن شرکا (Tier 2 Partner Data Room تحت NDA)' : 'Tier 2 Partner Data Room (Under Digital NDA)'}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {isFa 
                                ? 'شرکای صنعتی، پیمانکاران نیروگاهی و سرمایه‌گذاران معتبر می‌توانند با ورود یک‌بارمصرف (OTP) و امضای تعهدنامه محرمانگی، به گزارش‌های تفصیلی ممیزی سطح C، دیاگرام‌های P&ID و مدل‌های مالی دسترسی یابند.'
                                : 'Access confidential Level C engineering audit logs, wellbore P&ID schematics, and microgrid financial models via secure OTP authentication.'}
                        </p>
                    </div>

                    <button
                        onClick={() => {
                            if (setPage) {
                                setPage(Page.PartnerDataRoom);
                            } else {
                                window.location.href = '/partner-data-room';
                            }
                        }}
                        className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap self-start md:self-auto"
                    >
                        <KeyRound className="w-4 h-4" />
                        <span>{isFa ? 'ورود به اتاق داده امن شرکا' : 'Enter Partner Data Room'}</span>
                        <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                    </button>
                </div>
            </div>

            {/* Innovation Milestones Timeline */}
            <InnovationMilestones />

            {/* Real-Time Carbon Offset & Telemetry Visualization */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20 mt-20">
                <CarbonOffsetViz />
            </div>

            {/* Structured Innovation Proposal Intake Modal */}
            <InnovationProposalIntakeModal 
                isOpen={isProposalModalOpen}
                onClose={() => setIsProposalModalOpen(false)}
                onSuccessTrackingId={(id) => {
                    setRecentTrackingId(id);
                    setTimeout(() => {
                        const el = document.getElementById('proposal-tracker');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 400);
                }}
            />
        </div>
    );
};

export default InnovationHubPage;
