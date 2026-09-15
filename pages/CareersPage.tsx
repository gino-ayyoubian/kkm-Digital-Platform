import * as React from 'react';
import { Page, JobOpening } from '../types';
import { useLanguage } from '../LanguageContext';
import PageHeader from '../components/PageHeader';
import { JOB_OPENINGS, EMPLOYEE_TESTIMONIALS } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import TeamExpertiseMatrix from '../components/TeamExpertiseMatrix';

const BenefitCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-xl dark:shadow-none transform hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center">
        <div className="text-accent-dark dark:text-accent-yellow h-12 w-12 mb-4">{icon}</div>
        <h3 className="text-xl font-display font-bold text-primary-dark dark:text-secondary mb-2">{title}</h3>
        <p className="text-sm text-text-light dark:text-slate-400">{description}</p>
    </div>
);

const JobListItem: React.FC<{ job: JobOpening; isExpanded: boolean; onToggle: () => void; t: (key: any) => string; }> = ({ job, isExpanded, onToggle, t }) => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg mb-4">
            <button onClick={onToggle} className="w-full p-6 text-left flex flex-col md:flex-row md:items-center justify-between gap-4" aria-expanded={isExpanded}>
                <div>
                    <h3 className="text-xl font-display font-bold text-primary-dark dark:text-secondary">{job.title}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-light dark:text-slate-400 mt-1">
                        <span>{job.department}</span>
                        <span>&bull;</span>
                        <span>{job.location}</span>
                        <span>&bull;</span>
                        <span>{job.type}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-primary-dark dark:text-secondary font-semibold flex-shrink-0">
                    <span>{isExpanded ? t('HideDetails') : t('ShowDetails')}</span>
                    <motion.svg animate={{ rotate: isExpanded ? 180 : 0 }} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                </div>
            </button>
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6 border-t dark:border-slate-700 pt-4">
                            <p className="text-text-light dark:text-slate-300 mb-6">{job.description}</p>
                            <h4 className="text-lg font-display font-semibold text-text-dark dark:text-white mb-2">{t('Responsibilities')}</h4>
                            <ul className="list-disc list-inside space-y-2 mb-6 text-text-light dark:text-slate-300">
                                {job.responsibilities.map((item, index) => <li key={index}>{item}</li>)}
                            </ul>
                            <h4 className="text-lg font-display font-semibold text-text-dark dark:text-white mb-2">{t('Qualifications')}</h4>
                            <ul className="list-disc list-inside space-y-2 mb-6 text-text-light dark:text-slate-300">
                                {job.qualifications.map((item, index) => <li key={index}>{item}</li>)}
                            </ul>
                            <button className="px-6 py-2 font-bold text-white bg-primary rounded-full hover:bg-secondary transition-colors duration-300">
                                {t('ApplyNow')}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
};

const CareersPage: React.FC = () => {
    const { t } = useLanguage();
    const [departmentFilter, setDepartmentFilter] = React.useState('All');
    const [locationFilter, setLocationFilter] = React.useState('All');
    const [expandedJobId, setExpandedJobId] = React.useState<string | null>(null);

    const departments = React.useMemo(() => ['All', ...Array.from(new Set(JOB_OPENINGS.map(j => j.department)))], []);
    const locations = React.useMemo(() => ['All', ...Array.from(new Set(JOB_OPENINGS.map(j => j.location)))], []);

    const filteredJobs = React.useMemo(() => {
        return JOB_OPENINGS.filter(job => {
            const departmentMatch = departmentFilter === 'All' || job.department === departmentFilter;
            const locationMatch = locationFilter === 'All' || job.location === locationFilter;
            return departmentMatch && locationMatch;
        });
    }, [departmentFilter, locationFilter]);

    const benefits = [
        { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>, title: t('PioneeringProjects'), description: t('PioneeringProjectsDesc') },
        { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.707 4.5l.523-1.16a.5.5 0 01.88.397V7.5a.5.5 0 01-.5.5h-2a.5.5 0 01-.397-.88l1.16-.523zM10.5 13.5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 13.5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0zM12 21a9 9 0 100-18 9 9 0 000 18z" /></svg>, title: t('GlobalImpact'), description: t('GlobalImpactDesc') },
        { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>, title: t('InnovationCulture'), description: t('InnovationCultureDesc') },
        { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>, title: t('ProfessionalGrowth'), description: t('ProfessionalGrowthDesc') },
        { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, title: t('CollaborativeEnvironment'), description: t('CollaborativeEnvironmentDesc') },
        { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>, title: t('CompetitiveBenefits'), description: t('CompetitiveBenefitsDesc') },
    ];
    
    return (
        <div>
            <PageHeader title={t(Page.Careers)} subtitle={t('CareersPageSubtitle')} />
            
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 my-16">
                <h2 className="text-3xl md:text-4xl font-display font-extrabold text-primary-dark dark:text-white text-center">{t('WhyWorkAtKKM')}</h2>
                <p className="mt-4 text-lg text-text-light dark:text-slate-300 text-center max-w-3xl mx-auto">{t('WhyWorkAtKKMSubtitle')}</p>
                <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map(b => <BenefitCard key={b.title} {...b} />)}
                </div>
            </section>

            {/* Searchable Team Expertise & Research Matrix */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <TeamExpertiseMatrix />
            </div>

            <section id="job-listings" className="bg-gray-50 dark:bg-slate-900 py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-display font-extrabold text-primary-dark dark:text-white text-center mb-12">{t('CurrentOpenings')}</h2>
                    <div className="max-w-4xl mx-auto">
                        <div className="grid sm:grid-cols-2 gap-4 mb-8 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                            <div>
                                <label htmlFor="department-filter" className="block text-sm font-medium text-text-light dark:text-slate-300">{t('FilterByDepartment')}</label>
                                <select id="department-filter" value={departmentFilter} onChange={e => setDepartmentFilter(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-slate-200 focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm rounded-md">
                                    {departments.map(d => <option key={d} value={d}>{d === 'All' ? t('AllDepartments') : d}</option>)}
                                </select>
                            </div>
                             <div>
                                <label htmlFor="location-filter" className="block text-sm font-medium text-text-light dark:text-slate-300">{t('FilterByLocation')}</label>
                                <select id="location-filter" value={locationFilter} onChange={e => setLocationFilter(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-slate-200 focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm rounded-md">
                                    {locations.map(l => <option key={l} value={l}>{l === 'All' ? t('AllLocations') : l}</option>)}
                                </select>
                            </div>
                        </div>
                        
                        <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            key={departmentFilter + locationFilter}
                        >
                            {filteredJobs.length > 0 ? (
                                filteredJobs.map(job => (
                                    <motion.div key={job.id} variants={itemVariants}>
                                        <JobListItem
                                            job={job}
                                            isExpanded={expandedJobId === job.id}
                                            onToggle={() => setExpandedJobId(prev => (prev === job.id ? null : job.id))}
                                            t={t}
                                        />
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md">
                                    <p className="text-text-light dark:text-slate-400">{t('NoOpenings')}</p>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>
            
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 my-20">
                <h2 className="text-3xl md:text-4xl font-display font-extrabold text-primary-dark dark:text-white text-center mb-12">{t('HearFromOurTeam')}</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {EMPLOYEE_TESTIMONIALS.map(testimonial => (
                        <div key={testimonial.name} className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg text-center">
                            <img src={testimonial.image} alt={testimonial.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-secondary"/>
                            <blockquote className="italic text-text-light dark:text-slate-300 before:content-['“'] after:content-['”']">
                                {testimonial.quote}
                            </blockquote>
                            <cite className="block mt-4 not-italic">
                                <span className="font-bold text-primary-dark dark:text-white">{testimonial.name}</span>,
                                <span className="text-text-light dark:text-slate-400 text-sm"> {testimonial.role}</span>
                            </cite>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default CareersPage;