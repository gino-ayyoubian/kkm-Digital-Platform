
import * as React from 'react';
import { useLanguage } from '../LanguageContext';
import { motion, AnimatePresence } from 'motion/react';

const BriefingSkeleton = () => (
    <div className="w-full space-y-2 animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-11/12"></div>
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-2/3"></div>
    </div>
);

const CEOBriefingWidget: React.FC = () => {
    const [headlines, setHeadlines] = React.useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(true);
    const { t } = useLanguage();

    // Auto-rotate headlines
    React.useEffect(() => {
        if (headlines.length <= 1) return;
        
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % headlines.length);
        }, 5000); // Rotate every 5 seconds

        return () => clearInterval(interval);
    }, [headlines]);

    React.useEffect(() => {
        let isMounted = true;

        const fallbackHeadlines = [
            "Advancing sustainable infrastructure through closed-loop geothermal innovation.",
            "Expanding our global footprint with new strategic partnerships in the Middle East.",
            "Pioneering zero-emission lithium extraction to power the battery revolution.",
            "Integrating AI-driven health sensors into next-gen energy systems.",
            "KKM International commits to net-zero carbon goals by 2030."
        ];

        const fetchBriefing = async () => {
            setIsLoading(true);

            try {
                const prompt = `From the perspective of Gino Ayyoubian, CEO of KKM International Group, generate 5 short, punchy, one-sentence news headlines about the future of geothermal energy, sustainable infrastructure, and KKM's strategic growth. Return ONLY a bulleted list. Do not use markdown formatting like bold or headers.`;

                const response = await fetch('/api/analyze', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt })
                });

                if (isMounted) {
                    if (response.ok) {
                        const data = await response.json();
                        const text = data.text || '';
                        // Parse bullet points into an array
                        const items = text.split('\n')
                            .map((line: string) => line.replace(/^[\*\-\•]\s*/, '').trim())
                            .filter((line: string) => line.length > 0);

                        if (items.length > 0) {
                            setHeadlines(items);
                        } else {
                            setHeadlines(fallbackHeadlines);
                        }
                    } else {
                        setHeadlines(fallbackHeadlines);
                    }
                }
            } catch (err) {
                // Log as warning to avoid console noise for network/API restrictions
                console.warn("Unable to fetch live CEO briefing (using fallback):", err);
                if (isMounted) {
                    setHeadlines(fallbackHeadlines);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchBriefing();

        return () => {
            isMounted = false;
        };
    }, []);
    
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden relative">
            <div className="flex items-center p-4 gap-4">
                {/* CEO Avatar */}
                <div className="flex-shrink-0 relative">
                    <img 
                        src="https://i.imgur.com/lJ4n79b.jpeg"
                        alt="Gino Ayyoubian, CEO"
                        className="w-16 h-16 rounded-full object-cover ring-2 ring-primary dark:ring-secondary p-0.5" 
                    />
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
                </div>

                {/* Content Area */}
                <div className="flex-grow overflow-hidden">
                    <div className="flex items-center justify-between mb-1">
                        <div>
                            <h4 className="font-display font-bold text-sm text-primary dark:text-white leading-none">{t('GinoAyyoubian')}</h4>
                            <span className="text-[10px] text-text-light dark:text-slate-400 uppercase tracking-wider font-semibold">{t('CEO')}</span>
                        </div>
                        <span className="text-[10px] bg-accent-yellow/20 text-accent-dark dark:text-accent-yellow px-2 py-0.5 rounded-full font-bold">
                            {t('CEOBriefingTitle')}
                        </span>
                    </div>

                    <div className="relative h-12 flex items-center">
                        <AnimatePresence mode="wait">
                            {isLoading ? (
                                <motion.div 
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="w-full"
                                >
                                    <BriefingSkeleton />
                                </motion.div>
                            ) : (
                                <motion.p
                                    key={currentIndex}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="text-sm text-text-dark dark:text-slate-200 font-medium leading-tight line-clamp-2 absolute w-full"
                                >
                                    "{headlines[currentIndex]}"
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
            
            {/* Progress Bar */}
            {!isLoading && headlines.length > 1 && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100 dark:bg-slate-700">
                    <motion.div 
                        className="h-full bg-primary dark:bg-secondary"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                    />
                </div>
            )}
        </div>
    );
};

export default CEOBriefingWidget;
