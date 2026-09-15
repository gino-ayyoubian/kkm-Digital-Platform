
import * as React from 'react';
import { useLanguage } from '../LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { Page } from '../types';
import type { TranslationKey } from '../translations';
import Accordion from '../components/Accordion';
import { useAuth } from '../AuthContext';

// Type definitions
type OrgMember = {
    name: TranslationKey;
    role: TranslationKey;
    desc: TranslationKey;
    rbac: TranslationKey;
}

const RoleCard: React.FC<{ member: OrgMember; t: (key: string) => string }> = ({ member, t }) => (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
        <div>
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-display font-bold text-text-dark dark:text-white">{t(member.name)}</h4>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${
                    member.rbac === 'Admin' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' : 
                    member.rbac === 'Manager' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                    'bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-slate-400'
                }`}>
                    {member.rbac}
                </span>
            </div>
            <p className="text-xs text-primary dark:text-secondary font-bold uppercase mb-2">{t(member.role)}</p>
            <p className="text-xs text-text-light dark:text-slate-400 leading-relaxed">{t(member.desc)}</p>
        </div>
    </div>
);

const LoginView: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
    const { t } = useLanguage();
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate authentication delay
        setTimeout(() => {
            setLoading(false);
            onLogin();
        }, 1200);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900 px-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-2xl max-w-md w-full border border-gray-200 dark:border-slate-700"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary/10 dark:bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary dark:text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-display font-bold text-text-dark dark:text-white">{t('InternalPortalLoginTitle')}</h1>
                    <p className="text-text-light dark:text-slate-400 mt-2 text-sm">{t('InternalPortalLoginSubtitle')}</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-text-dark dark:text-slate-300 mb-1">{t('EmployeeID')}</label>
                        <input type="text" required className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-400 dark:border-slate-500 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none dark:text-white transition-all text-text-dark" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-dark dark:text-slate-300 mb-1">{t('Password')}</label>
                        <input type="password" required className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-400 dark:border-slate-500 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none dark:text-white transition-all text-text-dark" />
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-3 bg-primary hover:bg-secondary text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                    >
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : t('LoginButton')}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

const DashboardWidget: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <div className={`bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 p-6 flex flex-col ${className}`}>
        <h3 className="font-display font-bold text-lg text-primary-dark dark:text-secondary mb-4 pb-2 border-b dark:border-slate-700">{title}</h3>
        <div className="flex-grow">{children}</div>
    </div>
);

const TaskItem: React.FC<{ title: string; subtitle: string; onAction: () => void; t: (key: string) => string }> = ({ title, subtitle, onAction, t }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg mb-2 last:mb-0 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
        <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accent-yellow"></div>
            <div>
                <p className="font-semibold text-sm text-text-dark dark:text-slate-200">{title}</p>
                <p className="text-xs text-text-light dark:text-slate-400">{subtitle}</p>
            </div>
        </div>
        <div className="flex gap-2">
            <button className="p-1 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 rounded" title={t('Approve')}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            </button>
            <button className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded" title={t('Reject')}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
        </div>
    </div>
);

const DeskIcon: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
    <button className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors group">
        <div className="text-primary-dark dark:text-secondary group-hover:scale-110 transition-transform duration-300 mb-2">
            {icon}
        </div>
        <span className="text-xs font-medium text-text-light dark:text-slate-300">{label}</span>
    </button>
);

const PolicyItem: React.FC<{ title: string; date: string; tag: string }> = ({ title, date, tag }) => (
    <div className="border-l-2 border-primary dark:border-secondary pl-3 py-1 mb-3">
        <p className="text-sm font-semibold text-text-dark dark:text-slate-200">{title}</p>
        <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-text-light dark:text-slate-400">{date}</span>
            <span className="text-[10px] bg-gray-100 dark:bg-slate-700 px-2 py-0.5 rounded text-text-light dark:text-slate-300">{tag}</span>
        </div>
    </div>
);

const DashboardView: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
    const { t } = useLanguage();
    const { userProfile, currentUser } = useAuth();
    const [isRemote, setIsRemote] = React.useState(true);
    const [isCheckedIn, setIsCheckedIn] = React.useState(true);
    const [activeTab, setActiveTab] = React.useState('ExecutiveLeadership');

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
    ];

    const corporateFunctions: OrgMember[] = [
        { name: 'MasoumehMoshar', role: 'DirectorOfPR', desc: 'PRDesc', rbac: 'Manager' },
        { name: 'HamedZatajam', role: 'DirectorOfLegal', desc: 'LegalDesc', rbac: 'Manager' },
    ];

    const directoryTabs = [
        { id: 'ExecutiveLeadership', label: 'ExecutiveLeadership', data: executiveLeadership },
        { id: 'SeniorManagement', label: 'SeniorManagement', data: seniorManagement },
        { id: 'CorporateFunctions', label: 'CorporateFunctions', data: corporateFunctions },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pb-12">
            <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-gray-200 dark:border-slate-700">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-display font-bold text-primary-dark dark:text-secondary">{t('PortalDashboard')}</h1>
                        <p className="text-sm text-text-light dark:text-slate-400">
                          {t('WelcomeBack')}, {currentUser?.displayName || currentUser?.email}
                          {userProfile?.role === 'admin' && <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 text-xs rounded-full font-bold uppercase">Admin</span>}
                        </p>
                    </div>
                    <button onClick={onLogout} className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        {t('Logout')}
                    </button>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ staggerChildren: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                >
                    {/* Widget 1: Remote Work */}
                    <DashboardWidget title={t('RemoteWork')}>
                        <div className="flex flex-col h-full justify-between">
                            <div className="flex items-center justify-between mb-6 bg-gray-50 dark:bg-slate-700/50 p-4 rounded-lg">
                                <span className={`text-sm font-bold ${isRemote ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
                                    {isRemote ? t('WorkingRemotely') : t('InOffice')}
                                </span>
                                <div 
                                    className={`w-12 h-6 flex items-center bg-gray-300 dark:bg-slate-600 rounded-full p-1 cursor-pointer transition-colors ${isRemote ? 'bg-primary dark:bg-secondary' : ''}`}
                                    onClick={() => setIsRemote(!isRemote)}
                                >
                                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${isRemote ? 'translate-x-6' : ''}`}></div>
                                </div>
                            </div>
                            
                            <div className="text-center mb-6">
                                <div className="text-3xl font-mono font-bold text-text-dark dark:text-white mb-1">04:32:15</div>
                                <div className="text-xs text-text-light dark:text-slate-400 uppercase tracking-wider">{t('CurrentSession')}</div>
                            </div>

                            <button 
                                onClick={() => setIsCheckedIn(!isCheckedIn)}
                                className={`w-full py-2 rounded-lg font-bold transition-colors ${isCheckedIn ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400' : 'bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400'}`}
                            >
                                {isCheckedIn ? t('CheckOut') : t('CheckIn')}
                            </button>
                        </div>
                    </DashboardWidget>

                    {/* Widget 2: Admin Automation - Restricted */}
                    {userProfile?.role === 'admin' && (
                      <DashboardWidget title={t('AdminAutomation')}>
                          <div className="mb-3 flex justify-between items-center">
                              <span className="text-xs font-semibold uppercase text-text-light dark:text-slate-400">{t('PendingTasks')}</span>
                              <span className="bg-accent-yellow text-text-dark text-xs font-bold px-2 py-0.5 rounded-full">3</span>
                          </div>
                          <div className="space-y-1">
                              <TaskItem title={t('Task_LeaveRequest')} subtitle="Ali Rezaei - 3 Days" onAction={() => {}} t={t} />
                              <TaskItem title={t('Task_PurchaseOrder')} subtitle="IT Dept - Monitors" onAction={() => {}} t={t} />
                              <TaskItem title={t('Task_TravelExp')} subtitle="Site Visit - Qeshm" onAction={() => {}} t={t} />
                          </div>
                      </DashboardWidget>
                    )}

                     {/* Widget 3: Electronic Desk */}
                     <DashboardWidget title={t('ElectronicDesk')}>
                        <div className="grid grid-cols-3 gap-2">
                            <DeskIcon label={t('Tool_Mail')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>} />
                            <DeskIcon label={t('Tool_Calendar')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} />
                            <DeskIcon label={t('Tool_Drive')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>} />
                            <DeskIcon label={t('Tool_DMS')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>} />
                            <DeskIcon label={t('Tool_HR')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} />
                            <DeskIcon label={t('Tool_IT')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>} />
                        </div>
                    </DashboardWidget>

                    {/* Widget 4: Policy & Compliance */}
                    <DashboardWidget title={t('ComplianceDirectives')}>
                        <div className="space-y-4">
                            <PolicyItem title={t('PolicyUpdate_Tax')} date="Oct 24, 2023" tag="Finance" />
                            <PolicyItem title={t('PolicyUpdate_Env')} date="Oct 10, 2023" tag="HSE" />
                            <PolicyItem title={t('PolicyUpdate_IT')} date="Sep 28, 2023" tag="Security" />
                        </div>
                        <button className="w-full mt-4 text-sm text-primary-dark dark:text-secondary hover:underline">{t('ViewDetails')} &rarr;</button>
                    </DashboardWidget>
                </motion.div>

                {/* Workflow Documentation Section */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 p-6 mb-8">
                    <h3 className="font-display font-bold text-xl text-primary-dark dark:text-secondary mb-6 border-b dark:border-slate-700 pb-4">Operational Workflows</h3>
                    <div className="space-y-2">
                        <Accordion title={t('OperationalModelFunctions')}>
                            <p className="text-text-light dark:text-slate-300 text-sm leading-relaxed">{t('OperationalModelContent')}</p>
                        </Accordion>
                        <Accordion title={t('Tier1Workflow')}>
                            <p className="text-text-light dark:text-slate-300 text-sm leading-relaxed">{t('Tier1WorkflowContent')}</p>
                        </Accordion>
                        <Accordion title={t('Tier2Workflow')}>
                            <p className="text-text-light dark:text-slate-300 text-sm leading-relaxed">{t('Tier2WorkflowContent')}</p>
                        </Accordion>
                        <Accordion title={t('Tier3Workflow')}>
                            <p className="text-text-light dark:text-slate-300 text-sm leading-relaxed">{t('Tier3WorkflowContent')}</p>
                        </Accordion>
                        <Accordion title={t('IVREscalationProtocol')}>
                            <p className="text-text-light dark:text-slate-300 text-sm leading-relaxed">{t('IVREscalationContent')}</p>
                        </Accordion>
                    </div>
                </div>

                {/* Organizational Directory Section */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 p-6">
                    <h3 className="font-display font-bold text-xl text-primary-dark dark:text-secondary mb-6 border-b dark:border-slate-700 pb-4">{t('OrgStructureTitle')}</h3>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                        {directoryTabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                                    activeTab === tab.id 
                                    ? 'bg-primary text-white shadow-md' 
                                    : 'bg-gray-100 dark:bg-slate-700 text-text-dark dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                                }`}
                            >
                                {t(tab.label as TranslationKey)}
                            </button>
                        ))}
                    </div>

                    <div className="bg-gray-50 dark:bg-slate-900/50 p-4 rounded-xl min-h-[200px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                            >
                                {directoryTabs.find(t => t.id === activeTab)?.data.map((member, index) => (
                                    <RoleCard key={`${member.name}-${index}`} member={member} t={t} />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>
        </div>
    );
};

const InternalPortalPage: React.FC = () => {
    const { currentUser, login, logout, loading, userProfile } = useAuth();

    if (loading) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            </div>
        );
    }

    if (currentUser) {
        // Here we could enforce RBAC based on userProfile?.role if needed
        // e.g. if (userProfile?.role === 'admin') ...
        return <DashboardView onLogout={logout} />;
    }

    return <LoginView onLogin={login} />;
};

export default InternalPortalPage;
