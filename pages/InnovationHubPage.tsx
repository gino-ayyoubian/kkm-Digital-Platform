
import * as React from 'react';
import { Page } from '../types';
import { useLanguage } from '../LanguageContext';
import PageHeader from '../components/PageHeader';
import { motion } from 'motion/react';
import CarbonOffsetViz from '../components/CarbonOffsetViz';
import LazyImage from '../components/LazyImage';
import InnovationMilestones from '../components/InnovationMilestones';

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

const InnovationHubPage: React.FC = () => {
    const { t } = useLanguage();
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
                                    src="https://picsum.photos/seed/innovation/500/300" 
                                    alt="Collaborative workshop environment" 
                                    className="w-full h-full object-cover hover:scale-105"
                                />
                            </div>
                            <h3 className="text-2xl font-display font-bold text-primary dark:text-secondary">{t('HaveVisionaryIdea')}</h3>
                            <p className="mt-4 text-text-light dark:text-slate-300 leading-relaxed">{t('AcceleratorProgramPitch')}</p>
                            <button 
                                className="mt-8 px-8 py-3 font-bold text-text-dark bg-accent-yellow rounded-full hover:bg-secondary transition-colors duration-300 shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary dark:focus:ring-offset-slate-800"
                                aria-label={t('SubmitYourIdea')}
                            >
                                {t('SubmitYourIdea')}
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Innovation Milestones Timeline */}
            <InnovationMilestones />

            {/* Real-Time Carbon Offset & Telemetry Visualization */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20 mt-20">
                <CarbonOffsetViz />
            </div>
        </div>
    );
};

export default InnovationHubPage;
