
import * as React from 'react';
import { Page } from '../types';
import { useLanguage } from '../LanguageContext';
import PageHeader from '../components/PageHeader';
import Section from '../components/Section';
import { motion, AnimatePresence } from 'motion/react';
import { EMPLOYEE_TESTIMONIALS } from '../constants';
import type { TranslationKey } from '../translations';
import LeadershipTeam from '../components/LeadershipTeam';
import GlobalCTA from '../components/GlobalCTA';

import MilestoneTimeline from '../components/MilestoneTimeline';

interface AboutUsPageProps {
    setPage: (page: Page) => void;
}

const AboutUsPage: React.FC<AboutUsPageProps> = ({ setPage }) => {
    const { t, direction } = useLanguage();
    const [currentTestimonial, setCurrentTestimonial] = React.useState(0);

    const testimonials = [
        { quote: 'TestimonialQuote1', name: 'TestimonialName1', company: 'TestimonialCompany1', code: 'EGC', badge: 'European Geothermal Consortium' },
        { quote: 'TestimonialQuote2', name: 'TestimonialName2', company: 'TestimonialCompany2', code: 'REU', badge: 'Regional Energy Utility' },
        { quote: 'TestimonialQuote3', name: 'TestimonialName3', company: 'TestimonialCompany3', code: 'NID', badge: 'National Infrastructure Directorate' },
    ];

    return (
        <div>
            <PageHeader title={t(Page.AboutUs)} subtitle={t('AboutUsPageSubtitle')} />
            
            <Section title={t('CompanyOverview')} id="overview" className="bg-white dark:bg-slate-800">
                <p className="text-lg leading-relaxed">{t('CompanyOverviewText')}</p>
            </Section>

            <Section title={t('OurMission')} id="mission" className="bg-gray-50 dark:bg-slate-900">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold text-primary dark:text-secondary mb-3">{t('OurMission')}</h3>
                        <p className="font-semibold mb-2">{t('MissionText')}</p>
                        <p className="text-sm text-text-light dark:text-slate-400">{t('MissionDesc')}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold text-primary dark:text-secondary mb-3">{t('OurVision')}</h3>
                        <p className="font-semibold mb-2">{t('VisionText')}</p>
                        <p className="text-sm text-text-light dark:text-slate-400">{t('VisionDesc')}</p>
                    </div>
                </div>
            </Section>

            <Section title={t('OurHistory')} id="history" className="bg-white dark:bg-slate-800">
                <MilestoneTimeline />
            </Section>

            {/* GMEL MANIFESTO SECTION */}
            <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-y-4 border-accent-yellow">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-accent-yellow to-white">
                            {t('Manifesto_Title')}
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-300 font-light italic">
                            {t('Manifesto_Subtitle')}
                        </p>
                    </div>

                    <div className="space-y-12 text-lg leading-relaxed font-serif text-gray-200">
                        {/* Section 1 */}
                        <div>
                            <h3 className="text-2xl font-bold text-accent-yellow mb-4 border-b border-gray-700 pb-2">{t('Manifesto_Sec1_Title')}</h3>
                            <p className="whitespace-pre-line">{t('Manifesto_Sec1_Body')}</p>
                        </div>
                        {/* Section 2 */}
                        <div>
                            <h3 className="text-2xl font-bold text-accent-yellow mb-4 border-b border-gray-700 pb-2">{t('Manifesto_Sec2_Title')}</h3>
                            <p className="whitespace-pre-line">{t('Manifesto_Sec2_Body')}</p>
                        </div>
                        {/* Section 3 */}
                        <div>
                            <h3 className="text-2xl font-bold text-accent-yellow mb-4 border-b border-gray-700 pb-2">{t('Manifesto_Sec3_Title')}</h3>
                            <p className="whitespace-pre-line">{t('Manifesto_Sec3_Points')}</p>
                        </div>
                        {/* Section 4 */}
                        <div>
                            <h3 className="text-2xl font-bold text-accent-yellow mb-4 border-b border-gray-700 pb-2">{t('Manifesto_Sec4_Title')}</h3>
                            <p className="whitespace-pre-line">{t('Manifesto_Sec4_Body')}</p>
                        </div>
                        {/* Section 5 */}
                        <div>
                            <h3 className="text-2xl font-bold text-accent-yellow mb-4 border-b border-gray-700 pb-2">{t('Manifesto_Sec5_Title')}</h3>
                            <p className="whitespace-pre-line">{t('Manifesto_Sec5_Points')}</p>
                        </div>
                        {/* Section 6 */}
                        <div>
                            <h3 className="text-2xl font-bold text-accent-yellow mb-4 border-b border-gray-700 pb-2">{t('Manifesto_Sec6_Title')}</h3>
                            <p className="whitespace-pre-line">{t('Manifesto_Sec6_Body')}</p>
                        </div>

                        {/* Signature Block */}
                        <div className="mt-16 pt-8 border-t border-gray-600 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex-1">
                                <h4 className="text-xl font-bold text-white mb-4">{t('Manifesto_Signature_Header')}</h4>
                                <p className="whitespace-pre-line text-sm text-gray-400 font-sans">
                                    {t('Manifesto_Signature_Body')}
                                </p>
                            </div>
                            <div className="flex flex-col items-center">
                                <img 
                                    src="/images/gino-ayyoubian.jpg" 
                                    alt="Seyed Gino Ayyoubian, Chief Executive Officer of KKM International Group" 
                                    width={128}
                                    height={128}
                                    loading="lazy"
                                    className="w-32 h-32 rounded-full border-4 border-accent-yellow shadow-lg object-cover mb-4"
                                    onError={(e) => {
                                        (e.currentTarget as HTMLImageElement).src = '/gino-ayyoubian.jpg';
                                    }}
                                />
                                <div className="text-center">
                                    <p className="font-bold text-lg">{t('GinoAyyoubian')}</p>
                                    <p className="text-sm text-accent-yellow uppercase tracking-widest">{t('CEO')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sustainability Commitments */}
            <Section title={t('SustainabilityCommitments')} id="sustainability" className="bg-gray-50 dark:bg-slate-900">
                <p className="text-center text-lg text-text-light dark:text-slate-300 mb-12 max-w-3xl mx-auto">{t('SustainabilityIntro')}</p>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md border-t-4 border-green-500 hover:shadow-lg transition-shadow">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 text-green-600 dark:text-green-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.707 4.5l.523-1.16a.5.5 0 01.88.397V7.5a.5.5 0 01-.5.5h-2a.5.5 0 01-.397-.88l1.16-.523zM10.5 13.5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 13.5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0zM12 21a9 9 0 100-18 9 9 0 000 18z" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-text-dark dark:text-white mb-4">{t('EnvironmentalStewardship')}</h3>
                        <ul className="space-y-3">
                            {[1, 2, 3].map(i => (
                                <li key={i} className="flex items-start gap-2 text-text-light dark:text-slate-300 text-sm">
                                    <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    {t(`EnvironmentalPoint${i}` as TranslationKey)}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md border-t-4 border-blue-500 hover:shadow-lg transition-shadow">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-text-dark dark:text-white mb-4">{t('SocialResponsibility')}</h3>
                        <ul className="space-y-3">
                            {[1, 2, 3].map(i => (
                                <li key={i} className="flex items-start gap-2 text-text-light dark:text-slate-300 text-sm">
                                    <svg className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    {t(`SocialPoint${i}` as TranslationKey)}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md border-t-4 border-purple-500 hover:shadow-lg transition-shadow">
                        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-text-dark dark:text-white mb-4">{t('GovernanceEthics')}</h3>
                        <ul className="space-y-3">
                            {[1, 2, 3].map(i => (
                                <li key={i} className="flex items-start gap-2 text-text-light dark:text-slate-300 text-sm">
                                    <svg className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    {t(`GovernancePoint${i}` as TranslationKey)}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md border-t-4 border-accent-yellow hover:shadow-lg transition-shadow">
                        <div className="w-16 h-16 bg-accent-yellow/10 dark:bg-accent-yellow/20 rounded-full flex items-center justify-center mb-6 text-accent-dark dark:text-accent-yellow">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-text-dark dark:text-white mb-4">{t('UNMonitoring')}</h3>
                        <ul className="space-y-3">
                            {[1, 2, 3].map(i => (
                                <li key={i} className="flex items-start gap-2 text-text-light dark:text-slate-300 text-sm">
                                    <svg className="w-5 h-5 text-accent-yellow shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    {t(`UNPoint${i}` as TranslationKey)}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Section>

            {/* Funding & Investment */}
            <Section title={t('FundingInvestment')} id="funding" className="bg-white dark:bg-slate-800">
                <p className="text-center text-lg text-text-light dark:text-slate-300 mb-12 max-w-3xl mx-auto">{t('FundingIntro')}</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="p-6 bg-gray-50 dark:bg-slate-700/30 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors group">
                        <div className="w-12 h-12 bg-primary/10 dark:bg-secondary/10 rounded-lg flex items-center justify-center mb-4 text-primary dark:text-secondary group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                        </div>
                        <h4 className="font-bold text-lg text-text-dark dark:text-white mb-2">{t('VentureCapital')}</h4>
                        <p className="text-sm text-text-light dark:text-slate-400">{t('VentureCapitalDesc')}</p>
                    </div>
                    <div className="p-6 bg-gray-50 dark:bg-slate-700/30 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors group">
                        <div className="w-12 h-12 bg-primary/10 dark:bg-secondary/10 rounded-lg flex items-center justify-center mb-4 text-primary dark:text-secondary group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        </div>
                        <h4 className="font-bold text-lg text-text-dark dark:text-white mb-2">{t('PublicFunding')}</h4>
                        <p className="text-sm text-text-light dark:text-slate-400">{t('PublicFundingDesc')}</p>
                    </div>
                    <div className="p-6 bg-gray-50 dark:bg-slate-700/30 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors group">
                        <div className="w-12 h-12 bg-primary/10 dark:bg-secondary/10 rounded-lg flex items-center justify-center mb-4 text-primary dark:text-secondary group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        </div>
                        <h4 className="font-bold text-lg text-text-dark dark:text-white mb-2">{t('StrategicPartnerships')}</h4>
                        <p className="text-sm text-text-light dark:text-slate-400">{t('StrategicPartnershipsDesc')}</p>
                    </div>
                    <div className="p-6 bg-gray-50 dark:bg-slate-700/30 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors group">
                        <div className="w-12 h-12 bg-primary/10 dark:bg-secondary/10 rounded-lg flex items-center justify-center mb-4 text-primary dark:text-secondary group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
                        </div>
                        <h4 className="font-bold text-lg text-text-dark dark:text-white mb-2">{t('CapitalAllocation')}</h4>
                        <p className="text-sm text-text-light dark:text-slate-400">{t('CapitalAllocationDesc')}</p>
                    </div>
                </div>
            </Section>

            {/* Leadership Team Section with Clickable Profiles and Dossier Modals */}
            <LeadershipTeam onNavigate={setPage} />

            <Section title={t('ClientTestimonials')} id="testimonials" className="bg-white dark:bg-slate-800">
                <div className="relative bg-gradient-to-br from-primary/5 to-secondary/10 dark:from-slate-800 dark:to-slate-700 p-8 md:p-12 rounded-2xl min-h-[350px] flex items-center justify-center overflow-hidden border border-gray-100 dark:border-slate-600">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentTestimonial}
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className="text-center max-w-3xl"
                        >
                            <div className="mb-6 relative inline-block">
                                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-900 to-primary-dark p-1 border-2 border-secondary/40 shadow-xl flex items-center justify-center relative mx-auto">
                                    <div className="w-full h-full rounded-xl bg-slate-900/90 flex flex-col items-center justify-center border border-white/10">
                                        <span className="font-display font-black text-2xl text-white tracking-wider">
                                            {testimonials[currentTestimonial].code}
                                        </span>
                                        <span className="text-[8px] font-mono text-secondary uppercase tracking-widest mt-0.5">
                                            PARTNER
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <blockquote className="text-xl md:text-2xl italic text-text-dark dark:text-slate-200 leading-relaxed font-display">"{t(testimonials[currentTestimonial].quote as TranslationKey)}"</blockquote>
                            <cite className="block mt-6 not-italic">
                                <span className="font-bold text-primary dark:text-white text-lg block">{t(testimonials[currentTestimonial].name as TranslationKey)}</span>
                                <span className="text-text-light dark:text-slate-400 font-medium"> {t(testimonials[currentTestimonial].company as TranslationKey)}</span>
                            </cite>
                        </motion.div>
                    </AnimatePresence>
                    
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                        {testimonials.map((_, index) => (
                            <button 
                                key={index} 
                                onClick={() => setCurrentTestimonial(index)} 
                                className={`h-2 rounded-full transition-all duration-300 ${currentTestimonial === index ? 'w-8 bg-primary dark:bg-secondary' : 'w-2 bg-gray-300 dark:bg-slate-500 hover:bg-gray-400'}`} 
                                aria-label={`Go to testimonial ${index + 1}`}
                                aria-current={currentTestimonial === index}
                            />
                        ))}
                    </div>
                </div>
            </Section>

            {/* Employee Testimonials Section */}
            <Section title={t('HearFromOurTeam')} id="employee-testimonials" className="bg-gray-50 dark:bg-slate-900/50">
                <div className="grid md:grid-cols-3 gap-8">
                    {EMPLOYEE_TESTIMONIALS.map((testimonial, index) => (
                        <div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-slate-700 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                            <div className="relative mb-4">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-900 via-primary-dark to-slate-950 p-1 border-2 border-primary/30 dark:border-secondary/40 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform">
                                    <div className="w-full h-full rounded-xl bg-slate-900/90 flex flex-col items-center justify-center border border-white/10">
                                        <span className="font-display font-black text-xl text-white">
                                            {testimonial.initials || 'ENG'}
                                        </span>
                                        <span className="text-[8px] font-mono font-bold text-secondary uppercase tracking-widest mt-0.5">
                                            KKM-ENG
                                        </span>
                                    </div>
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-800 rounded-full p-1 shadow-sm border border-gray-200 dark:border-slate-700">
                                    <svg className="w-4 h-4 text-primary dark:text-secondary" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.0547 15.1953 15.125 16.5938 14.2109C17.3984 13.6797 18.0234 12.9609 18.0234 11.25V9H14.017V3H21V11.25C21 16.6953 16.9219 21 14.017 21ZM5 21L5 18C5 16.0547 6.17969 15.125 7.57812 14.2109C8.38281 13.6797 9.00781 12.9609 9.00781 11.25V9H5V3H11.9844V11.25C11.9844 16.6953 7.90625 21 5 21Z"/></svg>
                                </div>
                            </div>
                            <p className="text-text-light dark:text-slate-300 italic mb-6 text-sm flex-grow leading-relaxed">"{t(testimonial.quote as TranslationKey)}"</p>
                            <div>
                                <h4 className="font-display font-bold text-text-dark dark:text-white text-base sm:text-lg">{testimonial.name}</h4>
                                <p className="text-xs text-primary dark:text-secondary uppercase tracking-wide font-semibold mt-1">{t(testimonial.role as TranslationKey)}</p>
                                {testimonial.department && (
                                    <span className="text-[10px] text-text-light dark:text-slate-400 font-mono block mt-1">
                                        {testimonial.department}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            <Section title={t('AwardsRecognition')} id="awards" className="bg-white dark:bg-slate-800">
                <p className="mb-6">{t('AwardsIntro')}</p>
                <div className="grid md:grid-cols-2 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-slate-700/30 rounded-lg">
                            <div className="p-3 bg-accent-yellow/20 rounded-full text-accent-dark dark:text-accent-yellow">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-text-dark dark:text-white">{t(`AwardName${i}` as TranslationKey)}</h4>
                                <p className="text-sm text-text-light dark:text-slate-400">{t(`AwardBody${i}` as TranslationKey)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>
        
      
            {/* Trust Layer / Corporate Governance */}
            <section className="py-20 bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-display font-bold text-primary-dark dark:text-white mb-4">
                            Corporate Registration & Trust Layer
                        </h2>
                        <p className="text-text-light dark:text-slate-400 max-w-2xl mx-auto">
                            Kimia Karan Mâd Private Joint Stock Company maintains the highest standards of international engineering compliance and corporate governance.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                            <h3 className="text-sm font-bold text-primary dark:text-secondary mb-3 uppercase tracking-wider">Certifications & Standards</h3>
                            <ul className="space-y-2 text-sm text-text-dark dark:text-slate-300 font-medium">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> ISO 9001:2015 (QMS)</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> ISO 14001:2015 (EMS)</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> ISO 45001:2018 (OH&S)</li>
                            </ul>
                        </div>
                        
                        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                            <h3 className="text-sm font-bold text-primary dark:text-secondary mb-3 uppercase tracking-wider">Industrial Partners</h3>
                            <ul className="space-y-2 text-sm text-text-dark dark:text-slate-300 font-medium">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary" /> Mâd Energy Infrastructure</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary" /> Parsian Geothermal Tech</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary" /> Kavir Advanced Materials</li>
                            </ul>
                        </div>

                        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                            <h3 className="text-sm font-bold text-primary dark:text-secondary mb-3 uppercase tracking-wider">Academic Consortia</h3>
                            <ul className="space-y-2 text-sm text-text-dark dark:text-slate-300 font-medium">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Sharif University of Technology</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> University of Tehran</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Research Institute of Petroleum</li>
                            </ul>
                        </div>

                        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                            <h3 className="text-sm font-bold text-primary dark:text-secondary mb-3 uppercase tracking-wider">Technical Publications</h3>
                            <ul className="space-y-2 text-sm text-text-dark dark:text-slate-300 font-medium">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> IEEE Xplore: GMEL Network</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Journal of Geothermal Research</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Springer: Water-Energy Nexus</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

      <GlobalCTA setPage={setPage} />
    </div>
    );
};

export default AboutUsPage;
