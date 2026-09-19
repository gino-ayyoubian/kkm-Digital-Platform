import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { RECENT_INNOVATIONS } from '../constants';
import type { TranslationKey } from '../translations';
import type { Innovation } from '../types';

const InnovationsBreakthroughs: React.FC = () => {
    const { t } = useLanguage();
    const [selectedTech, setSelectedTech] = React.useState<Innovation | null>(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
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
        <section id="research-technology-development" className="py-20 bg-gray-50 dark:bg-slate-900 overflow-hidden border-t border-b border-gray-200 dark:border-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary dark:bg-secondary/10 dark:text-secondary mb-3">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        TRL-Verified Technology Matrix
                    </div>
                    <motion.h2 
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-display font-bold text-primary-dark dark:text-white"
                    >
                        {t('RecentInnovationsTitle')}
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 text-base text-text-light dark:text-slate-300 max-w-3xl mx-auto leading-relaxed"
                    >
                        {t('RecentInnovationsSubtitle')}
                    </motion.p>
                </div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid lg:grid-cols-3 gap-8"
                >
                    {RECENT_INNOVATIONS.map((tech) => (
                        <motion.div 
                            key={tech.id}
                            variants={itemVariants}
                            className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-slate-700 flex flex-col justify-between"
                        >
                            {/* Card Header & Media */}
                            <div>
                                <div className="relative h-48 overflow-hidden bg-slate-900">
                                    <img 
                                        src={tech.image} 
                                        alt={tech.technology || t(tech.title as TranslationKey)} 
                                        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                    
                                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                                        <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white bg-slate-900/90 rounded-md border border-white/20 backdrop-blur-sm">
                                            {tech.developmentStage?.split('(')[0]?.trim() || 'TRL-6'}
                                        </span>
                                        <span className="px-2.5 py-1 text-[11px] font-bold tracking-wider text-emerald-300 bg-emerald-950/80 rounded-md border border-emerald-500/30 backdrop-blur-sm">
                                            {tech.evidence ? tech.evidence.split('(')[0]?.trim() : 'Verified Evidence'}
                                        </span>
                                    </div>

                                    <div className="absolute bottom-3 left-4 right-4">
                                        <span className="text-xs text-sky-400 font-mono tracking-wider font-semibold block mb-0.5">
                                            {tech.technology ? 'TECHNOLOGY SPECIFICATION' : t('InnovationHubTitle')}
                                        </span>
                                        <h3 className="text-lg font-bold text-white leading-snug line-clamp-2">
                                            {tech.technology || t(tech.title as TranslationKey)}
                                        </h3>
                                    </div>
                                </div>

                                {/* Content: 9 Fields */}
                                <div className="p-6 space-y-4">
                                    {/* Problem & Solution */}
                                    <div className="space-y-2">
                                        <div className="text-xs">
                                            <span className="font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-0.5">Problem</span>
                                            <p className="text-text-light dark:text-slate-300 text-xs leading-relaxed">
                                                {tech.problem || t(tech.description as TranslationKey)}
                                            </p>
                                        </div>
                                        <div className="text-xs pt-1 border-t border-gray-100 dark:border-slate-700/60">
                                            <span className="font-bold text-primary dark:text-secondary uppercase tracking-wider block mb-0.5">Solution</span>
                                            <p className="text-text-light dark:text-slate-300 text-xs leading-relaxed">
                                                {tech.solution || t(tech.description as TranslationKey)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Performance Metric */}
                                    <div className="bg-gray-50 dark:bg-slate-700/40 rounded-xl p-3.5 border border-gray-200 dark:border-slate-600">
                                        <div className="flex items-start gap-2.5">
                                            <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/40 rounded-md text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Performance</div>
                                                <div className="text-xs font-medium text-slate-900 dark:text-slate-100 mt-0.5 leading-snug">
                                                    {tech.performance || (tech.impact ? t(tech.impact as TranslationKey) : 'Validated under boundary conditions')}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* IP & Next Milestone */}
                                    <div className="grid grid-cols-1 gap-2 pt-2 text-xs border-t border-gray-100 dark:border-slate-700/60">
                                        <div>
                                            <span className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider block">IP Status</span>
                                            <span className="font-mono text-[11px] text-slate-800 dark:text-slate-200">
                                                {tech.ip || 'Proprietary Trade Secret / Patent Pending'}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider block">Next Milestone</span>
                                            <span className="text-[11px] text-slate-700 dark:text-slate-300">
                                                {tech.nextMilestone || 'Field validation & pilot scale testing'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Applications */}
                                    {tech.applications && tech.applications.length > 0 && (
                                        <div className="pt-2">
                                            <span className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">Applications</span>
                                            <div className="flex flex-wrap gap-1.5">
                                                {tech.applications.map((app, idx) => (
                                                    <span key={idx} className="px-2 py-0.5 text-[10px] font-medium rounded bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300">
                                                        {app}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Footer CTA */}
                            <div className="p-4 pt-0 border-t border-gray-100 dark:border-slate-700/60 mt-auto">
                                <button 
                                    onClick={() => setSelectedTech(tech)}
                                    className="w-full py-2.5 px-3 text-xs font-semibold rounded-lg bg-gray-100 hover:bg-primary hover:text-white dark:bg-slate-700/80 dark:hover:bg-secondary dark:hover:text-slate-900 transition-colors flex items-center justify-center gap-2"
                                >
                                    <span>{t('ViewInnovation')}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Modal Detail for Selected Tech */}
            <AnimatePresence>
                {selectedTech && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-gray-200 dark:border-slate-700 max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex justify-between items-start mb-4 border-b dark:border-slate-700 pb-3">
                                <div>
                                    <span className="text-xs font-bold text-primary dark:text-secondary uppercase tracking-wider">
                                        {selectedTech.developmentStage}
                                    </span>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                                        {selectedTech.technology || t(selectedTech.title as TranslationKey)}
                                    </h3>
                                </div>
                                <button 
                                    onClick={() => setSelectedTech(null)}
                                    className="p-1 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 text-lg"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-4 text-xs">
                                <div>
                                    <div className="font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider mb-1">Problem Definition</div>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-gray-50 dark:bg-slate-900/60 p-3 rounded-lg border border-gray-200 dark:border-slate-700">
                                        {selectedTech.problem || t(selectedTech.description as TranslationKey)}
                                    </p>
                                </div>
                                <div>
                                    <div className="font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider mb-1">Engineering Solution</div>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-gray-50 dark:bg-slate-900/60 p-3 rounded-lg border border-gray-200 dark:border-slate-700">
                                        {selectedTech.solution || t(selectedTech.description as TranslationKey)}
                                    </p>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    <div className="p-3 bg-gray-50 dark:bg-slate-900/60 rounded-lg border border-gray-200 dark:border-slate-700">
                                        <div className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase">Evidence Classification</div>
                                        <div className="font-medium text-emerald-600 dark:text-emerald-400 mt-1">{selectedTech.evidence || 'Level C Documentation'}</div>
                                    </div>
                                    <div className="p-3 bg-gray-50 dark:bg-slate-900/60 rounded-lg border border-gray-200 dark:border-slate-700">
                                        <div className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase">Intellectual Property</div>
                                        <div className="font-mono text-slate-800 dark:text-slate-200 mt-1">{selectedTech.ip || 'Protected'}</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider mb-1">Next Milestone</div>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-primary/5 dark:bg-secondary/5 p-3 rounded-lg border border-primary/20 dark:border-secondary/20">
                                        {selectedTech.nextMilestone}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end gap-3 pt-3 border-t dark:border-slate-700">
                                <button 
                                    onClick={() => setSelectedTech(null)}
                                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
                                >
                                    Close
                                </button>
                                <a 
                                    href="#contact"
                                    onClick={() => setSelectedTech(null)}
                                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-primary hover:bg-primary-dark text-white dark:bg-secondary dark:text-slate-900 transition-colors"
                                >
                                    Technical Inquiry
                                </a>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default InnovationsBreakthroughs;
