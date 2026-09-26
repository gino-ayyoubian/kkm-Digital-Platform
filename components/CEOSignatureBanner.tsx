import * as React from 'react';
import { useLanguage } from '../LanguageContext';
import { motion, AnimatePresence } from 'motion/react';

const APPROVED_EDITORIAL_QUOTES = [
  "Our commitment to sustainable engineering isn't just about meeting compliance—it's about fundamentally reshaping how we power our world through closed-loop systems and verified empirical evidence.",
  "True innovation happens at the intersection of robust thermodynamic engineering, defensible intellectual property, and environmental stewardship.",
  "The transition to sovereign clean energy requires not just vision, but the relentless execution of bankable, modular infrastructure projects.",
  "We are building the physics-informed digital twins of tomorrow to safeguard the natural ecosystems and baseload reliability of today.",
  "Strategic investment in closed-loop geothermal capabilities (GMEL) is our permanent cornerstone for a zero-carbon, water-secure future."
];

export const CEOSignatureBanner: React.FC = () => {
    const { t, isFa } = useLanguage();
    const [quote, setQuote] = React.useState<string>(() => {
        // Daily deterministic rotation from approved editorial quotes
        const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
        return APPROVED_EDITORIAL_QUOTES[dayOfYear % APPROVED_EDITORIAL_QUOTES.length];
    });

    return (
        <section className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-900/80 dark:to-slate-800/80 border-t border-gray-200 dark:border-slate-800 py-10 backdrop-blur-md relative overflow-hidden">
            {/* Subtle decorative background element */}
            <div className="absolute -left-20 -top-20 w-64 h-64 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
                    <div className="flex-1 text-center md:text-start order-2 md:order-1">
                         <div className="mb-4">
                             <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-yellow/10 dark:bg-accent-yellow/20 text-accent-dark dark:text-accent-yellow text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                 </svg>
                                 {t('CEOBriefingTitle') || 'Executive Strategic Insight'}
                             </span>
                         </div>
                         <blockquote 
                             className="text-lg md:text-xl lg:text-2xl font-display font-medium text-text-dark dark:text-slate-100 leading-relaxed italic border-s-4 border-primary dark:border-secondary ps-6 py-1"
                         >
                             "{isFa ? 'تعهد ما به مهندسی پایدار صرفاً انطباق با قوانین نیست، بلکه بازطراحی بنیادین سامانه‌های تأمین انرژی از طریق شواهد تجربی و چرخه‌های مداربسته است.' : quote}"
                         </blockquote>
                    </div>
                    
                    <div className="flex items-center gap-5 border-b md:border-b-0 md:border-s border-gray-200 dark:border-slate-700 pb-6 md:pb-0 md:ps-10 order-1 md:order-2 w-full md:w-auto justify-center md:justify-end">
                        <div className="text-center md:text-end">
                            <h4 className="font-display font-extrabold text-xl text-primary-dark dark:text-white leading-tight whitespace-nowrap">
                                {t('GinoAyyoubian')}
                            </h4>
                            <p className="text-xs text-primary dark:text-secondary uppercase tracking-widest font-semibold mt-1.5">
                                {t('CEO')}
                            </p>
                        </div>
                        <div className="relative flex-shrink-0">
                            <div className="absolute inset-0 bg-primary/20 dark:bg-secondary/30 rounded-full blur-md transform translate-y-1"></div>
                            <img 
                                src="/images/gino-ayyoubian.jpg" 
                                alt="Seyed Gino Ayyoubian, Chief Executive Officer of KKM International Group" 
                                width={80}
                                height={80}
                                loading="lazy"
                                className="relative w-20 h-20 rounded-full border-4 border-white dark:border-slate-800 object-cover shadow-xl z-10" 
                                onError={(e) => {
                                  // Fallback to root path if /images/ alias differs
                                  (e.currentTarget as HTMLImageElement).src = '/gino-ayyoubian.jpg';
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
