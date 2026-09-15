import * as React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { RECENT_INNOVATIONS } from '../constants';
import type { TranslationKey } from '../translations';

const InnovationsBreakthroughs: React.FC = () => {
    const { t } = useLanguage();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 100
            }
        }
    };

    return (
        <section className="py-20 bg-gray-50 dark:bg-slate-900 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-display font-extrabold text-primary-dark dark:text-white"
                    >
                        {t('RecentInnovationsTitle')}
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 text-lg text-text-light dark:text-slate-300 max-w-2xl mx-auto"
                    >
                        {t('RecentInnovationsSubtitle')}
                    </motion.p>
                </div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid md:grid-cols-3 gap-8"
                >
                    {RECENT_INNOVATIONS.map((innovation, index) => (
                        <motion.div 
                            key={innovation.id}
                            variants={itemVariants}
                            className="group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-slate-700"
                        >
                            {/* Image Container */}
                            <div className="relative h-48 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                <img 
                                    src={innovation.image} 
                                    alt={t(innovation.title as TranslationKey)} 
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute bottom-4 left-4 z-20">
                                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-accent-dark/80 dark:bg-accent-yellow/90 dark:text-black rounded-full backdrop-blur-sm">
                                        {t('InnovationHubTitle')}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-primary-dark dark:text-white mb-3 group-hover:text-primary transition-colors">
                                    {t(innovation.title as TranslationKey)}
                                </h3>
                                <p className="text-text-light dark:text-slate-400 text-sm leading-relaxed mb-6">
                                    {t(innovation.description as TranslationKey)}
                                </p>

                                {/* Impact Metric */}
                                <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4 border border-gray-100 dark:border-slate-600">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide">Impact</p>
                                            <p className="text-sm font-bold text-gray-800 dark:text-gray-200 mt-1">
                                                {t(innovation.impact as TranslationKey)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <button className="mt-6 w-full py-2 text-sm font-semibold text-primary dark:text-secondary hover:text-primary-dark dark:hover:text-white transition-colors flex items-center justify-center gap-2 group-hover:gap-3">
                                    {t('ViewInnovation')}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default InnovationsBreakthroughs;
