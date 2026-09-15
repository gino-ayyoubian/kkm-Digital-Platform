import * as React from 'react';
import { useLanguage } from '../LanguageContext';
import { motion, AnimatePresence } from 'motion/react';

const FALLBACK_QUOTES = [
  "Our commitment to sustainable engineering isn't just about meeting compliance—it's about fundamentally reshaping how we power our world.",
  "True innovation happens at the intersection of robust engineering and environmental stewardship.",
  "The transition to clean energy requires not just vision, but the relentless execution of complex infrastructure projects.",
  "We are building the digital twins of tomorrow to safeguard the ecosystems of today.",
  "Strategic investment in geothermal capabilities is our cornerstone for a zero-carbon future."
];

export const CEOSignatureBanner: React.FC = () => {
    const { t } = useLanguage();
    const [quote, setQuote] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        let isMounted = true;
        
        const fetchInsight = async () => {
            const cached = sessionStorage.getItem('kkm-ceo-insight');
            if (cached) {
                setQuote(cached);
                setIsLoading(false);
                return;
            }

            try {
                const prompt = `From the perspective of Gino Ayyoubian, CEO of KKM International Group, provide a single, powerful, one-sentence strategic insight or visionary quote about the future of sustainable engineering and infrastructure. Do not use quotes around the response.`;

                const response = await fetch('/api/analyze', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt })
                });

                if (isMounted) {
                    if (response.ok) {
                        const data = await response.json();
                        const text = data.text ? data.text.replace(/^["']|["']$/g, '').trim() : '';
                        if (text) {
                            setQuote(text);
                            sessionStorage.setItem('kkm-ceo-insight', text);
                        } else {
                            throw new Error("Empty response");
                        }
                    } else {
                        throw new Error("Failed response");
                    }
                }
            } catch (err) {
                console.warn("Unable to fetch CEO insight, using fallback:", err);
                if (isMounted) {
                    const fallback = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
                    setQuote(fallback);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchInsight();
        return () => { isMounted = false; };
    }, []);

    return (
        <section className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-900/80 dark:to-slate-800/80 border-t border-gray-200 dark:border-slate-800 py-10 backdrop-blur-md relative overflow-hidden">
            {/* Subtle decorative background element */}
            <div className="absolute -left-20 -top-20 w-64 h-64 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
                    <div className="flex-1 text-center md:text-left order-2 md:order-1">
                         <div className="mb-4">
                             <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-yellow/10 dark:bg-accent-yellow/20 text-accent-dark dark:text-accent-yellow text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                 </svg>
                                 {t('CEOBriefingTitle')}
                             </span>
                         </div>
                         <AnimatePresence mode="wait">
                             {isLoading ? (
                                 <motion.div
                                     key="loading"
                                     initial={{ opacity: 0 }}
                                     animate={{ opacity: 1 }}
                                     exit={{ opacity: 0 }}
                                     className="h-16 flex items-center md:items-start justify-center md:justify-start"
                                 >
                                     <div className="w-full max-w-2xl space-y-3">
                                         <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse w-full"></div>
                                         <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse w-3/4"></div>
                                     </div>
                                 </motion.div>
                             ) : (
                                 <motion.blockquote 
                                     key="quote"
                                     initial={{ opacity: 0, y: 10 }}
                                     animate={{ opacity: 1, y: 0 }}
                                     className="text-lg md:text-xl lg:text-2xl font-display font-medium text-text-dark dark:text-slate-100 leading-relaxed italic border-l-4 border-primary dark:border-secondary pl-6 py-1"
                                 >
                                     "{quote}"
                                 </motion.blockquote>
                             )}
                         </AnimatePresence>
                    </div>
                    
                    <div className="flex items-center gap-5 border-b md:border-b-0 md:border-l border-gray-200 dark:border-slate-700 pb-6 md:pb-0 md:pl-10 order-1 md:order-2 w-full md:w-auto justify-center md:justify-end">
                        <div className="text-right">
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
                                src="https://i.imgur.com/lJ4n79b.jpeg" 
                                alt="Gino Ayyoubian, CEO" 
                                className="relative w-20 h-20 rounded-full border-4 border-white dark:border-slate-800 object-cover shadow-xl z-10" 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
