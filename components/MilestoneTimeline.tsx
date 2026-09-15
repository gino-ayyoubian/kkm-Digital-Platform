import * as React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { TranslationKey } from '../translations';

const MILESTONES = [2010, 2015, 2020, 2022, 2023];

const MilestoneTimeline: React.FC = () => {
    const { t, direction } = useLanguage();
    const containerRef = React.useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div ref={containerRef} className={`relative max-w-4xl mx-auto py-12 ${direction === 'rtl' ? 'pr-8' : 'pl-8'} sm:px-0`}>
            {/* The Background Line */}
            <div className={`absolute top-0 bottom-0 w-1 bg-slate-200 dark:bg-slate-700 ${direction === 'rtl' ? 'right-0 sm:right-1/2' : 'left-0 sm:left-1/2'} sm:-translate-x-1/2 rounded-full`} />
            
            {/* The Animated Line */}
            <motion.div 
                className={`absolute top-0 bottom-0 w-1 bg-primary dark:bg-secondary ${direction === 'rtl' ? 'right-0 sm:right-1/2' : 'left-0 sm:left-1/2'} sm:-translate-x-1/2 rounded-full origin-top`}
                style={{ scaleY }}
            />

            <div className="space-y-16 sm:space-y-24">
                {MILESTONES.map((year, index) => {
                    const isEven = index % 2 === 0;
                    return (
                        <div key={year} className="relative flex flex-col sm:flex-row items-center justify-between w-full">
                            {/* Marker dot */}
                            <motion.div 
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className={`absolute ${direction === 'rtl' ? 'right-[-4px] sm:right-[calc(50%-6px)]' : 'left-[-4px] sm:left-[calc(50%-6px)]'} w-3 h-3 bg-white dark:bg-slate-900 border-4 border-primary dark:border-secondary rounded-full z-10 box-content`}
                            />

                            {/* Content Block */}
                            <motion.div 
                                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className={`w-full sm:w-[45%] ${isEven ? 'sm:text-right sm:pr-8' : 'sm:ml-auto sm:text-left sm:pl-8'} pl-8 sm:pl-0 pt-2 sm:pt-0`}
                            >
                                <div className={`bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-shadow relative group text-left ${direction === 'rtl' ? 'text-right' : ''}`}>
                                    <h4 className="text-2xl font-display font-black text-primary dark:text-secondary mb-2 flex items-center gap-3">
                                        {year}
                                        <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                                            {t(`History${year}Title` as TranslationKey)}
                                        </span>
                                    </h4>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                                        {t(`History${year}Desc` as TranslationKey)}
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MilestoneTimeline;
