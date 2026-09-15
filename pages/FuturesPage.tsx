import * as React from 'react';
import { useLanguage } from '../LanguageContext';
import type { TranslationKey } from '../translations';
import PageHeader from '../components/PageHeader';
import { motion, AnimatePresence } from 'motion/react';

const NotifyModal: React.FC<{onClose: () => void; t: (key: TranslationKey) => string;}> = ({ onClose, t }) => {
    const [email, setEmail] = React.useState('');
    const [submitted, setSubmitted] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && email.includes('@')) {
            setSubmitted(true);
            console.log(`Email submitted for notification: ${email}`);
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl max-w-md w-full p-8 text-center"
                onClick={(e) => e.stopPropagation()}
            >
                {submitted ? (
                    <>
                        <h2 className="text-2xl font-display font-bold text-primary-dark dark:text-secondary mb-4">{t('NotifyModalSuccessTitle')}</h2>
                        <p className="text-text-light dark:text-slate-300 mb-6">{t('NotifyModalSuccessText')}</p>
                        <button 
                            onClick={onClose} 
                            className="px-6 py-2 font-bold text-white bg-primary rounded-full hover:bg-secondary transition-colors duration-300"
                        >
                            {t('Close')}
                        </button>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-display font-bold text-primary-dark dark:text-secondary mb-4">{t('NotifyModalTitle')}</h2>
                        <p className="text-text-light dark:text-slate-300 mb-6">{t('NotifyModalText')}</p>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input 
                                type="email"
                                placeholder={t('NotifyModalPlaceholder')}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary text-text-dark dark:text-slate-200"
                            />
                            <button 
                                type="submit" 
                                className="px-6 py-2 font-bold text-text-dark bg-accent-yellow rounded-full hover:bg-secondary transition-colors duration-300"
                            >
                                {t('NotifyMe')}
                            </button>
                        </form>
                        <button onClick={onClose} className="mt-4 text-sm text-gray-500 dark:text-slate-400 hover:underline">
                            {t('NotifyModalNoThanks')}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

const FuturesSection: React.FC<{title: string; icon: React.ReactNode; children: React.ReactNode}> = ({ title, icon, children }) => (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg h-full transition-all hover:shadow-xl border border-transparent hover:border-primary/20">
        <div className="flex items-center mb-4">
            <div className="text-accent-dark dark:text-accent-yellow mr-4 bg-primary/10 dark:bg-slate-700 p-3 rounded-full">{icon}</div>
            <h3 className="text-xl font-display font-bold text-primary-dark dark:text-secondary">{title}</h3>
        </div>
        <ul className="space-y-3 list-disc list-inside text-text-light dark:text-slate-300 text-sm">
            {children}
        </ul>
    </div>
);

type OrgMember = {
    name: TranslationKey;
    role: TranslationKey;
    desc: TranslationKey;
    rbac: TranslationKey;
}

const RoleCard: React.FC<{ member: OrgMember, t: any, onClick?: () => void }> = ({ member, t, onClick }) => {
    const isTBD = t(member.name) === '(TBD)' || t(member.name) === '(Vacant)';
    
    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-5 border-l-4 border-primary dark:border-secondary hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors relative group">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="font-display font-bold text-lg text-text-dark dark:text-slate-200">
                        {isTBD && onClick ? (
                            <button onClick={onClick} className="text-accent-dark dark:text-accent-yellow hover:underline text-left">
                                {t(member.name)}
                            </button>
                        ) : (
                             t(member.name)
                        )}
                    </h4>
                    <p className="text-primary-dark dark:text-secondary font-medium text-sm mt-1">{t(member.role)}</p>
                </div>
                 <span className={`px-2 py-1 text-xs font-bold rounded uppercase tracking-wide ${t(member.rbac) === 'Admin' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'}`}>
                    {t(member.rbac)}
                </span>
            </div>
            <p className="text-text-light dark:text-slate-400 text-sm mt-3">{t(member.desc)}</p>
        </div>
    )
}

const FuturesPage: React.FC = () => {
    const { t } = useLanguage();
    const [isNotifyModalOpen, setIsNotifyModalOpen] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState<string>('ExecutiveLeadership');

    const executiveLeadership: OrgMember[] = [
        { name: 'GinoAyyoubian', role: 'CEO', desc: 'CEODesc', rbac: 'Admin' },
        { name: 'DrRezaAsakereh', role: 'CTO', desc: 'CTODesc', rbac: 'Admin' },
        { name: 'DrKhosroJarrahian', role: 'CSO', desc: 'CSODesc', rbac: 'Manager' },
        { name: 'FaridImani', role: 'CIO', desc: 'CIODesc', rbac: 'Manager' },
        { name: 'DrPedramAbdarzadeh', role: 'CFO', desc: 'CFODesc', rbac: 'Manager' },
        { name: 'HeidarYarveicy', role: 'COO', desc: 'COODesc', rbac: 'Manager' },
    ];
    
    const seniorManagement: OrgMember[] = [
        { name: 'DrSalarHashemi', role: 'DirectorOfEnergySystems', desc: 'EnergySystemsDesc', rbac: 'Manager' },
        { name: 'MahdiGhiasy', role: 'DirectorOfBIM', desc: 'BIMDesc', rbac: 'Manager' },
        { name: 'AshkanTofangchiha', role: 'QAQCManager', desc: 'QAQCDesc', rbac: 'Reviewer' },
        { name: 'MostafaSharifi', role: 'OpExManager', desc: 'OpExDesc', rbac: 'Reviewer' },
        { name: 'BadieRazi', role: 'DirectorOfProcess', desc: 'ProcessDesc', rbac: 'Manager' },
    ];

    const corporateFunctions: OrgMember[] = [
        { name: 'MasoumehMoshar', role: 'DirectorOfPR', desc: 'PRDesc', rbac: 'Manager' },
        { name: 'HamedZatajam', role: 'DirectorOfLegal', desc: 'LegalDesc', rbac: 'Manager' },
        { name: 'SeyedJasemHosseini', role: 'DirectorOfHSE', desc: 'HSEDesc', rbac: 'Manager' },
        { name: 'Vacant', role: 'HeadOfCommercial', desc: 'CommercialDesc', rbac: 'Manager' },
        { name: 'Vacant', role: 'PeopleCultureLead', desc: 'PeopleCultureDesc', rbac: 'Manager' },
    ];
    
    const specializedRD: OrgMember[] = [
        { name: 'DrMasoumehEinabadi', role: 'HeadOfBiomedical', desc: 'BiomedicalDesc', rbac: 'Contributor' },
        { name: 'SinaAyyoubian', role: 'RDSpecialist', desc: 'RDDesc', rbac: 'Contributor' },
    ];

    const advisoryBoard: OrgMember[] = [
        { name: 'SinaAyyoubian', role: 'YouthAmbassador', desc: 'YouthAmbassadorDesc', rbac: 'Guest' },
        { name: 'DrRezaBaghdadchi', role: 'RegulatoryAdvisor', desc: 'RegulatoryDesc', rbac: 'Guest' },
        { name: 'TBD', role: 'SustainabilityAdvisor', desc: 'SustainabilityDesc', rbac: 'Guest' },
        { name: 'TBD', role: 'TechTrendsAdvisor', desc: 'TechTrendsDesc', rbac: 'Guest' },
    ];
    
    const tabs = [
        { id: 'ExecutiveLeadership', label: t('ExecutiveLeadership'), data: executiveLeadership },
        { id: 'SeniorManagement', label: t('SeniorManagement'), data: seniorManagement },
        { id: 'CorporateFunctions', label: t('CorporateFunctions'), data: corporateFunctions },
        { id: 'SpecializedRD', label: t('SpecializedRD'), data: specializedRD },
        { id: 'AdvisoryBoard', label: t('AdvisoryBoard'), data: advisoryBoard },
    ];

    const rbacLogic = [
        { level: 'Admin', scope: 'AdminScope' },
        { level: 'Manager', scope: 'ManagerScope' },
        { level: 'Reviewer', scope: 'ReviewerScope' },
        { level: 'Contributor', scope: 'ContributorScope' },
        { level: 'Guest', scope: 'GuestScope' },
    ];
    
    return (
        <div>
            {isNotifyModalOpen && <NotifyModal onClose={() => setIsNotifyModalOpen(false)} t={t} />}
            <PageHeader title={t('FuturesPageTitle')} subtitle={t('FuturesPageSubtitle')} />
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16">
                {/* Strategic Pillars Grid */}
                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-20">
                    <FuturesSection title={t('CaseStudiesTitle')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}>
                        <li>{t('CaseStudiesDesc1')}</li>
                        <li>{t('CaseStudiesDesc2')}</li>
                        <li>{t('CaseStudiesDesc3')}</li>
                    </FuturesSection>
                    <FuturesSection title={t('MedicalEngineeringTitle')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>}>
                        <li>{t('MedicalEngineeringDesc1')}</li>
                        <li>{t('MedicalEngineeringDesc2')}</li>
                        <li>{t('MedicalEngineeringDesc3')}</li>
                    </FuturesSection>
                    <FuturesSection title={t('IndustrialDesignTitle')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}>
                        <li>{t('IndustrialDesignDesc1')}</li>
                        <li>{t('IndustrialDesignDesc2')}</li>
                        <li>{t('IndustrialDesignDesc3')}</li>
                    </FuturesSection>
                    <FuturesSection title={t('TechPipelineTitle')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}>
                        <li>{t('TechPipelineDesc1')}</li>
                        <li>{t('TechPipelineDesc2')}</li>
                        <li>{t('TechPipelineDesc3')}</li>
                    </FuturesSection>
                </div>

                {/* Commitment Banner */}
                <div className="bg-gradient-to-r from-primary to-text-dark text-white p-8 md:p-12 rounded-xl shadow-2xl mb-24 relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-display font-bold text-white text-center mb-8">{t('CommitmentTitle')}</h2>
                        <div className="grid md:grid-cols-3 gap-8 text-center">
                            {[t('CommitmentPoint1'), t('CommitmentPoint2'), t('CommitmentPoint3')].map((point, i) => (
                                <div key={i} className="flex flex-col items-center p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-3 text-accent-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    <p className="text-gray-100 text-sm font-medium">{point}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                     {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-yellow/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>
                </div>

                {/* Organizational Explorer */}
                <div className="mb-24">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-display font-bold text-primary-dark dark:text-white">{t('OrgStructureTitle')}</h2>
                        <p className="text-text-light dark:text-slate-400 mt-2">Navigate through our organizational structure and key roles.</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                                    activeTab === tab.id 
                                    ? 'bg-primary text-white shadow-lg scale-105' 
                                    : 'bg-gray-100 dark:bg-slate-700 text-text-dark dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="bg-gray-50 dark:bg-slate-900 p-6 rounded-2xl min-h-[400px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {tabs.find(t => t.id === activeTab)?.data.map((member, index) => (
                                    <RoleCard 
                                        key={member.name + index} 
                                        member={member} 
                                        t={t} 
                                        onClick={t(member.name) === '(TBD)' ? () => setIsNotifyModalOpen(true) : undefined}
                                    />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Bottom Grid: RBAC & Templates */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700">
                        <h2 className="text-2xl font-display font-bold text-primary-dark dark:text-secondary mb-6 pb-2 border-b dark:border-slate-600">{t('RBACLogicTitle')}</h2>
                        <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-slate-600">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 dark:bg-slate-700">
                                    <tr>
                                        <th className="font-semibold p-3 text-text-dark dark:text-slate-200">{t('RBACLevel')}</th>
                                        <th className="font-semibold p-3 text-text-dark dark:text-slate-200">{t('AccessScope')}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-slate-600">
                                    {rbacLogic.map(item => (
                                        <tr key={item.level}>
                                            <td className="p-3 font-semibold text-primary-dark dark:text-secondary">{t(item.level as TranslationKey)}</td>
                                            <td className="p-3 text-text-light dark:text-slate-300">{t(item.scope as TranslationKey)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                     <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700">
                         <h2 className="text-2xl font-display font-bold text-primary-dark dark:text-secondary mb-6 pb-2 border-b dark:border-slate-600">{t('TemplatesTitle')}</h2>
                         <div className="grid sm:grid-cols-2 gap-6">
                             <div>
                                 <h3 className="font-bold text-text-dark dark:text-slate-200 mb-3 flex items-center gap-2">
                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-dark dark:text-accent-yellow" viewBox="0 0 20 20" fill="currentColor"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" /></svg>
                                     {t('LinkedDatabases')}
                                 </h3>
                                 <ul className="text-sm text-text-light dark:text-slate-300 space-y-2 pl-2 border-l-2 border-gray-200 dark:border-slate-600">
                                     <li>{t('RolesDatabase')}</li>
                                     <li>{t('AccessModulesDatabase')}</li>
                                     <li>{t('GovernanceChecklistDatabase')}</li>
                                 </ul>
                             </div>
                             <div>
                                 <h3 className="font-bold text-text-dark dark:text-slate-200 mb-3 flex items-center gap-2">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-dark dark:text-accent-yellow" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
                                     {t('WorkflowTemplates')}
                                 </h3>
                                 <ul className="text-sm text-text-light dark:text-slate-300 space-y-2 pl-2 border-l-2 border-gray-200 dark:border-slate-600">
                                     <li>{t('IntakeTracker')}</li>
                                     <li>{t('ReviewerDashboard')}</li>
                                     <li>{t('EvidenceVault')}</li>
                                     <li>{t('ComplianceMatrix')}</li>
                                     <li>{t('AuditTimeline')}</li>
                                     <li>{t('ExceptionsLog')}</li>
                                 </ul>
                             </div>
                         </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FuturesPage;