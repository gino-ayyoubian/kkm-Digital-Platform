
import * as React from 'react';
import { Page } from '../types';
import type { NewsItem } from '../types';
import { useLanguage } from '../LanguageContext';
import { NEWS_ITEMS } from '../constants';
import { motion } from 'motion/react';
import type { TranslationKey } from '../translations';
import { useTheme } from '../ThemeContext';
import KKMLogo from './KKMLogo';
import { PWAInstallButton } from './PWAInstallButton';

interface FooterProps {
    setPage: (page: Page) => void;
    onSelectArticle?: (article: NewsItem) => void;
    showNewsTicker?: boolean;
}

const FOOTER_LINKS = {
    quickLinks: [Page.Home, Page.AboutUs, Page.CoreTechnologies, Page.RuralStudies, Page.Projects, Page.Sustainability],
    engagementLinks: [Page.Careers, Page.InnovationHub, Page.EvidenceRegistry, Page.ClaimRegistry, Page.News, Page.InternalPortal]
};

const SOCIAL_LINKS = [
    {
        name: 'Facebook',
        url: 'https://www.facebook.com/KKM.Intl.Co',
        path: 'M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z'
    },
    {
        name: 'WhatsApp',
        url: 'https://wa.me/+982191030822',
        path: 'M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.1 1.2 4.74 1.2 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01C17.18 3.03 14.69 2 12.04 2zM12.05 20.21c-1.5 0-2.97-.39-4.27-1.17l-.3-.18-3.15.83.84-3.07-.19-.31c-.82-1.32-1.25-2.85-1.25-4.4 0-4.52 3.67-8.19 8.19-8.19 2.19 0 4.24.85 5.79 2.4 1.54 1.55 2.39 3.6 2.39 5.79 0 4.52-3.68 8.19-8.2 8.19zm4.5-6.14c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.66.81-.81.98-.15.17-.3.19-.55.06-.25-.13-1.06-.39-2.02-1.24-.75-.66-1.25-1.48-1.4-1.73-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.07-.11-.24-.18-.49-.31z'
    },
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/company/kkm-intl-co',
        path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'
    },
    {
        name: 'X',
        url: 'https://x.com/i/kkm_intl_co',
        path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.617l-5.21-6.817-6.045 6.817h-3.308l7.746-8.875-7.492-10.62h6.617l4.636 6.518 5.549-6.518zm-1.465 18.885h2.32l-10.45-14.12h-2.14l10.27 14.12z'
    },
    {
        name: 'Telegram',
        url: 'https://t.me/kkm_intl',
        path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.4-1.08.39-.35-.01-1.03-.2-1.54-.37-.62-.21-1.12-.31-1.07-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z'
    },
    {
        name: 'Instagram',
        url: 'https://www.instagram.com/kkm.intl.co',
        path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.26.143 4.78 1.66 4.923 4.92.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.143 3.225-1.64 4.78-4.923 4.92-1.265.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.26-.143-4.779-1.66-4.923-4.92-.058-1.265-.07-1.644-.069-4.849 0-3.204.013-3.583.069-4.849.144-3.26 1.66-4.78 4.923-4.92 1.265-.058 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z'
    }
];

const FooterLink: React.FC<{
    page: Page;
    setPage: (page: Page) => void;
    t: (key: TranslationKey, options?: { [key: string]: string | number }) => string;
}> = ({ page, setPage, t }) => (
    <li>
        <button 
            onClick={() => setPage(page)} 
            className="text-gray-300 hover:text-white hover:translate-x-1 rtl:hover:-translate-x-1 transition-all duration-200 text-start text-sm block py-1"
        >
            {t(page as TranslationKey)}
        </button>
    </li>
);

const NewsTicker: React.FC<{
    articles: NewsItem[];
    onSelectArticle?: (article: NewsItem) => void;
}> = ({ articles, onSelectArticle }) => {
    return (
        <div className="bg-primary-dark/90 text-white py-2 overflow-hidden relative border-b border-white/10">
            <div className="container mx-auto px-4 flex items-center">
                <span className="bg-accent-yellow text-black text-xs font-bold px-2 py-0.5 rounded me-4 shrink-0 uppercase tracking-wider">
                    Latest News
                </span>
                <div className="flex-1 overflow-hidden relative h-6">
                    <motion.div 
                        className="absolute whitespace-nowrap flex gap-12"
                        animate={{ x: ["100%", "-100%"] }}
                        transition={{ 
                            repeat: Infinity, 
                            duration: 30, 
                            ease: "linear" 
                        }}
                    >
                        {articles.map((article, index) => (
                            <button 
                                key={`${article.title}-${index}`}
                                onClick={() => onSelectArticle?.(article)}
                                className="text-sm font-medium hover:text-secondary transition-colors inline-flex items-center gap-2"
                            >
                                <span className="text-gray-400 text-xs">{article.date}</span>
                                {article.title}
                            </button>
                        ))}
                         {/* Duplicate for seamless loop if needed, though simple x translation works for now */}
                         {articles.map((article, index) => (
                            <button 
                                key={`dup-${article.title}-${index}`}
                                onClick={() => onSelectArticle?.(article)}
                                className="text-sm font-medium hover:text-secondary transition-colors inline-flex items-center gap-2"
                            >
                                <span className="text-gray-400 text-xs">{article.date}</span>
                                {article.title}
                            </button>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

import { useFormatters } from '../hooks/useFormatters';

const useLiveMetrics = () => {
    const [offset, setOffset] = React.useState(14852.34);
    
    React.useEffect(() => {
        const interval = setInterval(() => {
            setOffset(prev => prev + Number((0.08 + Math.random() * 0.06).toFixed(3)));
        }, 10000);
        return () => clearInterval(interval);
    }, []);
    
    return { co2Offset: offset };
};

const LiveEnergyTicker: React.FC = () => {
    const { co2Offset } = useLiveMetrics();
    const { formatLargeMetric } = useFormatters();
    
    return (
        <div className="bg-emerald-900/40 text-emerald-100 py-2 text-xs font-mono border-b border-emerald-500/20 flex items-center justify-center gap-4">
            <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                LIVE METRICS
            </span>
            <span className="font-bold">{formatLargeMetric(co2Offset)} MT CO₂ OFFSET</span>
        </div>
    );
};

const Footer: React.FC<FooterProps> = ({ setPage, onSelectArticle, showNewsTicker }) => {
    const { t } = useLanguage();
    const { theme } = useTheme(); // Using theme context
    const [email, setEmail] = React.useState('');
    const [subscriptionState, setSubscriptionState] = React.useState<'idle' | 'loading' | 'success'>('idle');

    // Get 3 most recent news items
    const recentNews = React.useMemo(() => {
        return [...NEWS_ITEMS]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 3);
    }, []);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubscriptionState('loading');
            setTimeout(() => {
                setSubscriptionState('success');
                setTimeout(() => {
                    setSubscriptionState('idle');
                    setEmail('');
                }, 3000);
            }, 1000);
        }
    };

    return (
        <footer className="bg-text-dark text-white border-t border-secondary/20 font-sans dark:bg-slate-900 dark:border-slate-800">
            <LiveEnergyTicker />
            {showNewsTicker && <NewsTicker articles={recentNews} onSelectArticle={onSelectArticle} />}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Column 1: Brand & Socials */}
                    <div className="md:col-span-2 lg:col-span-1">
                        <button onClick={() => setPage(Page.Home)} className="flex items-center group" aria-label="Go to Home page">
                             <div className="inline-flex group-hover:scale-105 transition-all duration-300">
                                <KKMLogo variant="full" size="md" />
                             </div>
                        </button>
                        <p className="mt-6 text-gray-300 text-sm leading-relaxed">{t('FooterSlogan')}</p>
                        
                        <div className="flex flex-wrap gap-4 mt-6">
                            {SOCIAL_LINKS.map(link => (
                                <a 
                                    key={link.name}
                                    href={link.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    aria-label={link.name} 
                                    className="inline-flex min-w-12 min-h-12 items-center justify-center text-gray-300 hover:text-primary transition-all duration-300 transform hover:scale-110"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={link.path}/>
                                    </svg>
                                </a>
                            ))}
                        </div>

                        {/* UN SDG Alignments */}
                        <div className="mt-8">
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">UN SDG Alignment</h4>
                            <div className="flex gap-2">
                                {/* SDG 7: Affordable and Clean Energy */}
                                <div className="w-10 h-10 bg-[#FCC30B] flex items-center justify-center rounded shadow-sm" title="SDG 7: Affordable and Clean Energy">
                                    <span className="text-white font-bold text-lg">7</span>
                                </div>
                                {/* SDG 9: Industry, Innovation and Infrastructure */}
                                <div className="w-10 h-10 bg-[#FD6925] flex items-center justify-center rounded shadow-sm" title="SDG 9: Industry, Innovation and Infrastructure">
                                    <span className="text-white font-bold text-lg">9</span>
                                </div>
                                {/* SDG 11: Sustainable Cities and Communities */}
                                <div className="w-10 h-10 bg-[#FD9D24] flex items-center justify-center rounded shadow-sm" title="SDG 11: Sustainable Cities and Communities">
                                    <span className="text-white font-bold text-lg">11</span>
                                </div>
                                {/* SDG 13: Climate Action */}
                                <div className="w-10 h-10 bg-[#3F7E44] flex items-center justify-center rounded shadow-sm" title="SDG 13: Climate Action">
                                    <span className="text-white font-bold text-lg">13</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="font-display font-bold tracking-wider uppercase border-b border-gray-700 pb-3 mb-4 text-sm text-primary">{t('QuickLinks')}</h3>
                        <ul className="space-y-3">
                           {FOOTER_LINKS.quickLinks.map(page => <FooterLink key={page} page={page} setPage={setPage} t={t} />)}
                        </ul>
                    </div>

                    {/* Column 3: Engagement */}
                    <div>
                        <h3 className="font-display font-bold tracking-wider uppercase border-b border-gray-700 pb-3 mb-4 text-sm text-primary">{t('Engagement')}</h3>
                        <ul className="space-y-3">
                           {FOOTER_LINKS.engagementLinks.map(page => <FooterLink key={page} page={page} setPage={setPage} t={t} />)}
                        </ul>
                    </div>

                    {/* Column 4: Connect With Us */}
                    <div>
                         <h3 className="font-display font-bold tracking-wider uppercase border-b border-gray-700 pb-3 mb-4 text-sm text-primary">{t('ConnectWithUs')}</h3>
                        
                        <div className="space-y-3 mb-6">
                            <div className="flex items-start gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                <div>
                                    <p className="text-gray-200 text-xs font-semibold">{t('HeadOffice')}</p>
                                    <p className="text-gray-400 text-xs leading-snug">{t('TehranOfficeAddress')}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                 <a href={`tel:${t('CompanyPhone').replace(/\s/g, '')}`} className="inline-flex min-h-12 items-center py-3 text-sm text-gray-300 hover:text-white transition-colors" dir="ltr">{t('CompanyPhone')}</a>
                            </div>
                             <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-500 uppercase tracking-widest leading-none mb-0.5">{t('IVRLabel')}</span>
                                    <a href={`tel:${t('IVRPhone').replace(/\s/g, '')}`} className="inline-flex min-h-12 items-center py-3 text-sm text-gray-300 hover:text-white transition-colors" dir="ltr">{t('IVRPhone')}</a>
                                </div>
                            </div>
                             <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                <a href="mailto:info@kkm-intl.org" className="inline-flex min-h-12 items-center py-3 text-sm text-gray-300 hover:text-white transition-colors">info@kkm-intl.org</a>
                            </div>
                            
                            <div className="flex gap-2 mt-2">
                                <a href="https://waze.com/ul/htnke6nf0q" target="_blank" rel="noopener noreferrer" className="flex min-w-12 min-h-12 items-center gap-1 bg-gray-700 hover:bg-gray-600 text-white text-xs px-2 py-1 rounded transition-colors" aria-label={t('NavigateWithWaze')}>
                                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12.005 6.002c-3.31 0-6 2.69-6 6s2.69 6 6 6c3.31 0 6-2.69 6-6s-2.69-6-6-6zm8.823 5.417c-.012-4.524-3.418-8.29-7.85-8.917v-1.5h-1.95v1.5c-4.432.628-7.838 4.393-7.85 8.917h-2.178v1.95h2.19c.148 4.432 3.618 8.04 8.088 8.423v1.207h2.5v-1.23c4.392-.51 7.798-4.118 7.946-8.52h2.277v-1.95h-2.273zm-8.823 8.35c-4.22 0-7.65-3.43-7.65-7.65s3.43-7.65 7.65-7.65 7.65 3.43 7.65 7.65-3.43 7.65-7.65 7.65z"/></svg>
                                    Waze
                                </a>
                                <a href="https://maps.app.goo.gl/tbE3Hg1VrWThWFnY8?g_st=ic" target="_blank" rel="noopener noreferrer" className="flex min-w-12 min-h-12 items-center gap-1 bg-gray-700 hover:bg-gray-600 text-white text-xs px-2 py-1 rounded transition-colors" aria-label={t('NavigateWithGoogle')}>
                                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                                    Google Maps
                                </a>
                            </div>
                        </div>
                        
                        <div className="pt-4 border-t border-gray-700">
                            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                                <div className="relative">
                                    <label htmlFor="newsletter-email" className="sr-only">Email address for newsletter</label>
                                    <input 
                                        id="newsletter-email"
                                        type="email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Subscribe to our newsletter"
                                        className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                                        required
                                        aria-required="true"
                                        disabled={subscriptionState !== 'idle'}
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={subscriptionState !== 'idle'}
                                    className={`w-full py-2 px-4 rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center ${subscriptionState === 'success' ? 'bg-green-600 text-white' : 'bg-primary hover:bg-secondary text-white'}`}
                                >
                                    {subscriptionState === 'loading' ? 'Processing...' : subscriptionState === 'success' ? 'Subscribed!' : 'Subscribe'}
                                </button>
                                <p className="text-[11px] text-gray-400 mt-1 leading-snug">
                                    By subscribing, you agree to receive KKM technical publications in accordance with our{' '}
                                    <button 
                                        type="button" 
                                        onClick={() => setPage(Page.Legal)} 
                                        className="text-secondary underline hover:text-white transition-colors"
                                    >
                                        Privacy Policy
                                    </button>.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-xs text-center md:text-start">&copy; {new Date().getFullYear()} KKM International Group. {t('AllRightsReserved')}</p>
                    <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2">
                         <button onClick={() => setPage(Page.Legal)} className="text-gray-400 hover:text-white text-xs transition-colors">{t('PrivacyPolicy')}</button>
                         <button onClick={() => setPage(Page.Legal)} className="text-gray-400 hover:text-white text-xs transition-colors">{t('TermsOfUse')}</button>
                         <button onClick={() => setPage(Page.Contact)} className="text-gray-400 hover:text-white text-xs transition-colors">{t('Contact')}</button>
                         <PWAInstallButton variant="footer" />
                         <button 
                           onClick={() => setPage(Page.Offline)} 
                           className="text-gray-400 hover:text-emerald-400 text-xs transition-colors flex items-center gap-1.5"
                           title="Browse Cached Content & Offline News Archive"
                         >
                           <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                           <span>Offline Mode</span>
                         </button>
                         <button
                           type="button"
                           onClick={() => {
                             if (window.__toggleA11yOverlay) {
                               window.__toggleA11yOverlay();
                             }
                           }}
                           className="text-gray-500 hover:text-amber-400 text-xs transition-colors flex items-center gap-1 opacity-50 hover:opacity-100 cursor-pointer"
                           title="Toggle Hidden Accessibility Debug Overlay (Shortcut: Alt+Shift+A)"
                           aria-label="Toggle Hidden Accessibility Debug Overlay"
                         >
                           <span>♿</span>
                           <span className="hidden sm:inline font-mono text-[10px]">A11y</span>
                         </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
