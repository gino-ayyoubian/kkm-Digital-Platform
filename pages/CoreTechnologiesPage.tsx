
import * as React from 'react';
import { GMEL_TECHNOLOGIES, OTHER_CORE_AREAS } from '../constants';
import PageHeader from '../components/PageHeader';
import { useLanguage } from '../LanguageContext';
import { Page } from '../types';
import Card from '../components/Card';
import Tooltip from '../components/Tooltip';
import { motion } from 'motion/react';
import type { TranslationKey } from '../translations';
import D3ImpactChart from '../components/D3ImpactChart';
import GmelInteractiveDiagram from '../components/GmelInteractiveDiagram';
import InteractiveTechMap from '../components/InteractiveTechMap';
import IPBadge, { IPStatus } from '../components/IPBadge';
import { Zap, Droplets, Network, ArrowRight, Sparkles, MessageSquareCode, PhoneCall } from 'lucide-react';

import GlobalCTA from '../components/GlobalCTA';
import TechnicalConsultationModal from '../components/consultation/TechnicalConsultationModal';
// Icon Definitions
const ClgIcon = () => (
    <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" variants={{ rest: { scale: 1 }, hover: { scale: 1.1, transition: { duration: 0.8, repeat: Infinity, repeatType: "reverse" } } }}>
        <path d="M21.5 2v6h-6M2.5 22v-6h6" />
        <path d="M2 11.5a10 10 0 0 1 18.8-4.3" />
        <path d="M22 12.5a10 10 0 0 1-18.8 4.2" />
    </motion.svg>
);

const EhsIcon = () => (
    <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" variants={{ rest: { scale: 1 }, hover: { scale: 1.1, transition: { duration: 0.8, repeat: Infinity, repeatType: "reverse" } } }}>
        <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
        <motion.path d="M16.24 7.76a6 6 0 0 1 0 8.49" variants={{ rest: { opacity: 0.5 }, hover: { opacity: 1, transition: { duration: 0.8, repeat: Infinity, repeatType: "reverse" } } }} />
        <motion.path d="M19.07 4.93a10 10 0 0 1 0 14.14" variants={{ rest: { opacity: 0.3 }, hover: { opacity: 1, transition: { duration: 0.8, delay: 0.1, repeat: Infinity, repeatType: "reverse" } } }} />
        <motion.path d="M7.76 16.24a6 6 0 0 1 0-8.49" variants={{ rest: { opacity: 0.5 }, hover: { opacity: 1, transition: { duration: 0.8, repeat: Infinity, repeatType: "reverse" } } }} />
        <motion.path d="M4.93 19.07a10 10 0 0 1 0-14.14" variants={{ rest: { opacity: 0.3 }, hover: { opacity: 1, transition: { duration: 0.8, delay: 0.1, repeat: Infinity, repeatType: "reverse" } } }} />
    </motion.svg>
);

const DrillIcon = () => (
    <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" variants={{ rest: { rotate: 0 }, hover: { rotate: 45, transition: { duration: 0.5, type: "spring", stiffness: 100 } } }}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </motion.svg>
);

const ThermoFluidIcon = () => (
    <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
        <motion.path d="M12 9V4" variants={{ rest: { y: 0 }, hover: { y: [0, -2, 0], transition: { duration: 1, repeat: Infinity } } }} />
        <motion.path d="M12 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" variants={{ rest: { scale: 1 }, hover: { scale: [1, 1.2, 1], transition: { duration: 1.5, repeat: Infinity } } }} />
    </motion.svg>
);

const DesalIcon = () => (
    <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
        <motion.circle cx="12" cy="15" r="1" variants={{ rest: { y: 0, opacity: 0 }, hover: { y: [0, 5], opacity: [0, 1, 0], transition: { duration: 1.2, repeat: Infinity } } }} />
    </motion.svg>
);

const H2CellIcon = () => (
    <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" variants={{ rest: { rotate: 0 }, hover: { rotate: 360, transition: { duration: 4, ease: "linear", repeat: Infinity } } }}>
        <circle cx="12" cy="12" r="3" />
        <circle cx="12" cy="4" r="2" />
        <circle cx="20" cy="12" r="2" />
        <circle cx="12" cy="20" r="2" />
        <circle cx="4" cy="12" r="2" />
        <line x1="12" y1="9" x2="12" y2="6" />
        <line x1="15" y1="12" x2="18" y2="12" />
        <line x1="12" y1="15" x2="12" y2="18" />
        <line x1="9" y1="12" x2="6" y2="12" />
    </motion.svg>
);

const AgriCellIcon = () => (
    <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" variants={{ rest: { rotate: 0 }, hover: { rotate: [0, 10, -5, 0], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } } }}>
        <path d="M12 20v-8" />
        <path d="M6 22v-4" />
        <path d="M18 22v-2" />
        <path d="M12 12a4 4 0 0 1 4-4" />
        <path d="M12 12a4 4 0 0 0-4-4" />
        <path d="M16 8a4 4 0 0 1 0-8" />
        <path d="M8 8a4 4 0 0 0 0-8" />
    </motion.svg>
);

const LithiumLoopIcon = () => (
    <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="7" width="12" height="10" rx="2" />
        <line x1="12" y1="7" x2="12" y2="17" />
        <line x1="6" y1="12" x2="18" y2="12" />
        <motion.path d="M21 12c0 5-4 9-9 9s-9-4-9-9 4-9 9-9" variants={{ rest: { rotate: 0 }, hover: { rotate: 360, transition: { duration: 2, repeat: Infinity, ease: "linear" } } }} style={{ transformOrigin: "12px 12px" }} />
    </motion.svg>
);

const EcoClusterIcon = () => (
    <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <motion.circle cx="12" cy="4" r="2" variants={{ rest: { scale: 1 }, hover: { scale: [1, 1.3, 1], transition: { duration: 1, delay: 0, repeat: Infinity } } }} />
        <motion.circle cx="20" cy="18" r="2" variants={{ rest: { scale: 1 }, hover: { scale: [1, 1.3, 1], transition: { duration: 1, delay: 0.3, repeat: Infinity } } }} />
        <motion.circle cx="4" cy="18" r="2" variants={{ rest: { scale: 1 }, hover: { scale: [1, 1.3, 1], transition: { duration: 1, delay: 0.6, repeat: Infinity } } }} />
        <line x1="12" y1="9" x2="12" y2="6" />
        <line x1="14.5" y1="13.5" x2="18.5" y2="16.5" />
        <line x1="9.5" y1="13.5" x2="5.5" y2="16.5" />
    </motion.svg>
);

const SmartFundIcon = () => (
    <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" variants={{ rest: { scale: 1 }, hover: { scale: 1.1, transition: { duration: 0.5, repeat: Infinity, repeatType: "reverse" } } }}>
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
        <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </motion.svg>
);

const GeoCreditIcon = () => (
    <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <motion.path d="m9 12 2 2 4-4" variants={{ rest: { pathLength: 1, opacity: 1 }, hover: { pathLength: [0, 1], opacity: [0, 1], transition: { duration: 1, repeat: Infinity } } }} />
    </motion.svg>
);

const getTechIcon = (name: string) => {
    switch (name) {
        case "GMEL_CLG_Name": return <ClgIcon />;
        case "GMEL_EHS_Name": return <EhsIcon />;
        case "GMEL_DrillX_Name": return <DrillIcon />;
        case "GMEL_ThermoFluid_Name": return <ThermoFluidIcon />;
        case "GMEL_Desal_Name": return <DesalIcon />;
        case "GMEL_H2Cell_Name": return <H2CellIcon />;
        case "GMEL_AgriCell_Name": return <AgriCellIcon />;
        case "GMEL_LithiumLoop_Name": return <LithiumLoopIcon />;
        case "GMEL_EcoCluster_Name": return <EcoClusterIcon />;
        case "GMEL_SmartFund_Name": return <SmartFundIcon />;
        case "GMEL_GeoCredit_Name": return <GeoCreditIcon />;
        default: return null;
    }
};

const GLOSSARY: Record<string, string> = {
    'GMEL': 'Geothermal Multi-Energy Loop',
    'CLG': 'Closed-Loop Geothermal',
    'EHS': 'Environment, Health & Safety / Energy Health Sensors',
    'DrillX': 'Advanced Drilling Technologies',
    'ThermoFluid': 'Optimized Heat Transfer Fluid',
    'Desal': 'Thermal Desalination',
    'H2Cell': 'Hydrogen Fuel Cell',
    'EPCI': 'Engineering, Procurement, Construction, and Installation',
};

const processTextWithTooltips = (text: string): React.ReactNode => {
    if (!text) return null;
    const parts = text.split(/(\b(?:GMEL|CLG|EHS|DrillX|ThermoFluid|Desal|H2Cell|EPCI)\b)/g);
    
    // Return an array of strings or elements. The Card component can handle React.ReactNode which includes arrays.
    return parts.map((part, index) => {
        if (GLOSSARY[part]) {
            return <Tooltip key={index} text={part} tooltipContent={GLOSSARY[part]} />;
        }
        return <span key={index}>{part}</span>;
    });
};

const CoreTechnologiesPage: React.FC<{ setPage?: any }> = ({ setPage }) => {
    const { t, language } = useLanguage();
    const isFa = language === 'FA';
    const [isConsultationModalOpen, setIsConsultationModalOpen] = React.useState<boolean>(false);
    const [consultationDomain, setConsultationDomain] = React.useState<string | undefined>(undefined);

    const handleScrollToApps = () => {
        const element = document.getElementById('digital-platforms');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            <PageHeader title={t(Page.CoreTechnologies)} subtitle={t('CoreTechPageSubtitle')}/>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16">
                
                {/* Core Technologies Navigation Cards */}
                <section className="mb-20">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary dark:bg-secondary/10 dark:text-secondary text-xs font-mono font-bold uppercase tracking-wider mb-3">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Core Technology Domains</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-primary dark:text-white mb-4">
                            Strategic Technology Pillars
                        </h2>
                        <p className="text-base text-text-light dark:text-slate-300">
                            Explore KKM's foundational engineering platforms across closed-loop geothermal baseload generation, circular water-energy thermodynamics, and resilient rural microgrids.
                        </p>
                        
                        <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
                            <button
                                onClick={() => {
                                    setConsultationDomain('gmel-closed-loop');
                                    setIsConsultationModalOpen(true);
                                }}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-secondary text-white font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer"
                            >
                                <MessageSquareCode className="w-4 h-4 text-amber-400" />
                                <span>{isFa ? 'درخواست مشاوره تخصصی مهندسی' : 'Request Technical Consultation'}</span>
                            </button>
                            <button
                                onClick={handleScrollToApps}
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm transition-all cursor-pointer"
                            >
                                <span>{isFa ? 'مشاهده پلتفرم‌های ابری GMEL' : 'View GMEL Cloud Platforms'}</span>
                                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                            </button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Card 1: Geothermal Domain */}
                        <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xl hover:shadow-2xl hover:border-secondary transition-all flex flex-col group">
                            <div className="relative h-56 overflow-hidden bg-slate-950 flex items-center justify-center">
                                <img 
                                    src="/src/assets/images/geothermal_icon_1791765115317.jpg" 
                                    alt="Geothermal Energy Domain Icon" 
                                    loading="lazy"
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[11px] font-mono font-bold text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
                                    <Zap className="w-3 h-3 text-amber-400" />
                                    <span>Geothermal Domain</span>
                                </div>
                            </div>
                            <div className="p-6 flex-grow flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                                        Deep Geothermal & GMEL-CLG
                                    </h3>
                                    <p className="text-xs sm:text-sm text-text-light dark:text-slate-300 leading-relaxed mb-4">
                                        Supercritical closed-loop thermodynamic heat extraction utilizing legacy or greenfield deep wellbores. Delivers continuous, zero-emission baseload power without hydraulic fracturing or surface fluid loss.
                                    </p>
                                    <div className="flex flex-wrap gap-1.5 mb-6 text-[11px] font-mono">
                                        <span className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                                            50 MW+ Scalable Baseload
                                        </span>
                                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                                            TRL-6 Verified
                                        </span>
                                        <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                                            0 ppm Surface Venting
                                        </span>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-2">
                                    <button
                                        onClick={() => setPage ? setPage(Page.GMELHub) : handleScrollToApps()}
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-primary dark:text-secondary hover:underline cursor-pointer"
                                    >
                                        <span>Explore GMEL Architecture</span>
                                        <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setConsultationDomain('gmel-closed-loop');
                                            setIsConsultationModalOpen(true);
                                        }}
                                        className="px-2.5 py-1 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 text-amber-700 dark:text-amber-300 border border-amber-400/30 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                                        title={isFa ? 'درخواست مشاوره فنی این حوزه' : 'Request Consultation'}
                                    >
                                        <Sparkles className="w-3 h-3 text-amber-500" />
                                        <span>{isFa ? 'مشاوره فنی' : 'Advisory'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Water-Energy Nexus Domain */}
                        <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xl hover:shadow-2xl hover:border-secondary transition-all flex flex-col group">
                            <div className="relative h-56 overflow-hidden bg-slate-950 flex items-center justify-center">
                                <img 
                                    src="/src/assets/images/water_nexus_icon_1791765125654.jpg" 
                                    alt="Water-Energy Nexus Domain Icon" 
                                    loading="lazy"
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[11px] font-mono font-bold text-cyan-400 border border-cyan-500/30 flex items-center gap-1.5">
                                    <Droplets className="w-3 h-3 text-cyan-400" />
                                    <span>Water-Energy Nexus</span>
                                </div>
                            </div>
                            <div className="p-6 flex-grow flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                                        Water-Energy Nexus & Desalination
                                    </h3>
                                    <p className="text-xs sm:text-sm text-text-light dark:text-slate-300 leading-relaxed mb-4">
                                        Circular thermal co-generation desalination coupled with geothermal and solar waste-heat. Purifies hyper-saline feedstocks with zero chemical runoff, preserving agricultural aquifers in hyper-arid zones.
                                    </p>
                                    <div className="flex flex-wrap gap-1.5 mb-6 text-[11px] font-mono">
                                        <span className="px-2 py-0.5 rounded bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                                            38k–42k ppm TDS Feed
                                        </span>
                                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                                            45°C–85°C Reject Heat
                                        </span>
                                        <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                                            Zero-Liquid Discharge
                                        </span>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-2">
                                    <button
                                        onClick={() => handleScrollToApps()}
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-primary dark:text-secondary hover:underline cursor-pointer"
                                    >
                                        <span>Explore Desalination Loops</span>
                                        <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setConsultationDomain('thermal-desalination-zld');
                                            setIsConsultationModalOpen(true);
                                        }}
                                        className="px-2.5 py-1 rounded-lg bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-700 dark:text-cyan-300 border border-cyan-400/30 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                                        title={isFa ? 'درخواست مشاوره فنی این حوزه' : 'Request Consultation'}
                                    >
                                        <Sparkles className="w-3 h-3 text-cyan-500" />
                                        <span>{isFa ? 'مشاوره فنی' : 'Advisory'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Card 3: Rural Microgrids Domain */}
                        <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xl hover:shadow-2xl hover:border-secondary transition-all flex flex-col group">
                            <div className="relative h-56 overflow-hidden bg-slate-950 flex items-center justify-center">
                                <img 
                                    src="/src/assets/images/microgrid_icon_1791765136698.jpg" 
                                    alt="Rural Microgrids Domain Icon" 
                                    loading="lazy"
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[11px] font-mono font-bold text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                                    <Network className="w-3 h-3 text-emerald-400" />
                                    <span>Rural Microgrids</span>
                                </div>
                            </div>
                            <div className="p-6 flex-grow flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                                        Modular Rural Microgrids
                                    </h3>
                                    <p className="text-xs sm:text-sm text-text-light dark:text-slate-300 leading-relaxed mb-4">
                                        Autonomous clean power nodes, modular battery storage meshes, and agro-industrial distribution units structured around the "One Village, One Integrated System" territorial empowerment paradigm.
                                    </p>
                                    <div className="flex flex-wrap gap-1.5 mb-6 text-[11px] font-mono">
                                        <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                                            25 Target Settlements
                                        </span>
                                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                                            10-Stage Model
                                        </span>
                                        <span className="px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                                            Zero Diesel Outages
                                        </span>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-2">
                                    <button
                                        onClick={() => setPage ? setPage(Page.RuralStudies) : handleScrollToApps()}
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-primary dark:text-secondary hover:underline cursor-pointer"
                                    >
                                        <span>Explore Rural Systems</span>
                                        <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setConsultationDomain('hybrid-microgrid-storage');
                                            setIsConsultationModalOpen(true);
                                        }}
                                        className="px-2.5 py-1 rounded-lg bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-700 dark:text-emerald-300 border border-emerald-400/30 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                                        title={isFa ? 'درخواست مشاوره فنی این حوزه' : 'Request Consultation'}
                                    >
                                        <Sparkles className="w-3 h-3 text-emerald-500" />
                                        <span>{isFa ? 'مشاوره فنی' : 'Advisory'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <h2 className="text-3xl font-display font-bold text-primary dark:text-white mb-8 text-center">{t('GmelEcosystem')}</h2>
                <p className="text-center text-text-light dark:text-slate-300 max-w-3xl mx-auto mb-16">
                    {t('GmelEcosystemSubtitle')}
                </p>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-24">
                    {GMEL_TECHNOLOGIES.map(tech => (
                        <Card 
                            key={tech.name}
                            title={t(tech.name as TranslationKey)}
                            description={() => processTextWithTooltips(t(tech.description as TranslationKey))}
                            icon={getTechIcon(tech.name)}
                            actionText={t('CTA_ExploreTechnology')}
                            onActionClick={handleScrollToApps}
                        />
                    ))}
                </div>

                {/* 3D-Inspired Interactive GMEL Ecosystem Stages Architecture */}
                <GmelInteractiveDiagram />

                {/* Interactive Technology Map */}
                <InteractiveTechMap />

                <div className="mt-24">
                    <h2 className="text-3xl font-display font-bold text-primary dark:text-white mb-8 text-center">{t('ExpandingHorizons')}</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {OTHER_CORE_AREAS.map(area => (
                           <Card 
                                key={area.name}
                                title={t(area.name as TranslationKey)}
                                description={t(area.description as TranslationKey)}
                                actionText={t('CTA_ExploreTechnology')}
                                onActionClick={handleScrollToApps}
                           />
                        ))}
                    </div>
                </div>

                {/* Sustainability Impact Metrics Section */}
                <div className="mt-24 mb-16">
                    <h2 className="text-3xl font-display font-bold text-primary dark:text-white mb-4 text-center">Measured Environmental Impact</h2>
                    <p className="text-center text-text-light dark:text-slate-300 max-w-3xl mx-auto mb-12">
                        Tracking our progress in achieving global sustainability goals through the implementation of our core technologies.
                    </p>
                    <D3ImpactChart />
                </div>

                <section className="mt-24" id="digital-platforms">
                    <h2 className="text-3xl font-display font-bold text-primary dark:text-white mb-4 text-center">{t('DigitalPlatforms')}</h2>
                    <p className="text-center text-text-light dark:text-slate-300 max-w-3xl mx-auto mb-12">{t('DigitalPlatformsSubtitle')}</p>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* GMEL Vision */}
                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden border border-gray-100 dark:border-slate-700 flex flex-col group">
                            <div className="h-56 relative overflow-hidden">
                                <img src="/images/gmel-vision.svg" alt="GMEL Vision" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-primary/20 dark:bg-primary/40 group-hover:bg-primary/10 transition-colors duration-300"></div>
                            </div>
                            <div className="p-8 flex-grow flex flex-col">
                                <h3 className="text-2xl font-display font-bold text-primary dark:text-white mb-3">{t('GMELVisionWebAppTitle')}</h3>
                                <p className="text-text-light dark:text-slate-300 mb-6 flex-grow">{t('GMELVisionWebAppSubtitle')}</p>
                                <div>
                                    <a 
                                        href="https://gmel.vision.kkm-intl.org" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="inline-block px-8 py-3 font-bold text-text-dark bg-accent-yellow rounded-full hover:bg-secondary transition-all duration-300 transform hover:scale-105 shadow-lg mb-3"
                                    >
                                        {t('LaunchGMELVision')}
                                    </a>
                                    <p className="text-xs text-text-light dark:text-slate-400 opacity-70 font-mono">gmel.vision.kkm-intl.org</p>
                                </div>
                            </div>
                        </div>

                        {/* GMEL Navigator */}
                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden border border-gray-100 dark:border-slate-700 flex flex-col group">
                            <div className="h-56 relative overflow-hidden">
                                <img src="/images/gmel-navigator.svg" alt="GMEL Navigator" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-secondary/20 dark:bg-secondary/40 group-hover:bg-secondary/10 transition-colors duration-300"></div>
                            </div>
                            <div className="p-8 flex-grow flex flex-col">
                                <h3 className="text-2xl font-display font-bold text-primary dark:text-white mb-3">{t('GMELNavigatorWebAppTitle')}</h3>
                                <p className="text-text-light dark:text-slate-300 mb-6 flex-grow">{t('GMELNavigatorWebAppSubtitle')}</p>
                                <div>
                                    <a 
                                        href="https://gmel.navigator.kkm-intl.org" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="inline-block px-8 py-3 font-bold text-white bg-primary rounded-full hover:bg-secondary transition-all duration-300 transform hover:scale-105 shadow-lg mb-3"
                                    >
                                        {t('LaunchGMELNavigator')}
                                    </a>
                                    <p className="text-xs text-text-light dark:text-slate-400 opacity-70 font-mono">gmel.navigator.kkm-intl.org</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Technical Advisory & Intake Banner */}
                <section className="my-20">
                    <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-primary-dark to-slate-950 border border-amber-500/30 p-8 sm:p-12 shadow-2xl text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                            <div className="space-y-4 max-w-2xl text-start">
                                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-mono font-bold tracking-wider">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    <span>{isFa ? 'میز پذیرش پروژه‌های پیشرفته مهندسی KKM' : 'KKM ENGINEERING & ADVISORY DESK'}</span>
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-display font-black text-white leading-tight">
                                    {isFa ? 'آماده ارزیابی و ادغام سیستم‌های ژئوترمال و ترمودینامیکی در پروژه شما' : 'Ready to Assess and Integrate Closed-Loop Geothermal in Your Facility?'}
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                                    {isFa 
                                        ? 'معاونت فنی و مهندسی گروه بین‌المللی KKM با بهره‌گیری از پتنت‌های انحصاری GMEL، دوقلوی دیجیتال مخازن و زنجیره یکپارچه EPC، آمادگی دارد امکان‌سنجی اولیه و بهینه‌سازی ترمودینامیکی سایت‌های شما را ظرف ۲۴ ساعت کاری بررسی نماید.' 
                                        : 'KKM\'s Engineering Directorate provides turnkey feasibility, subsurface modeling, and thermodynamic optimization briefs under strict NDA within 24 business hours.'}
                                </p>
                                <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-300 pt-1">
                                    <span className="flex items-center gap-1.5">
                                        <span className="text-amber-400 font-bold">✓</span> {isFa ? 'پاسخ و ارزیابی اولیه ۲۴ ساعته' : '24h Technical Brief SLA'}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <span className="text-amber-400 font-bold">✓</span> {isFa ? 'تعهد رسمی عدم افشا (NDA)' : 'Corporate NDA Protected'}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <span className="text-amber-400 font-bold">✓</span> {isFa ? 'شبیه‌سازی دوقلوی دیجیتال' : 'Digital Twin Simulation Ready'}
                                    </span>
                                </div>
                            </div>

                            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto">
                                <button
                                    onClick={() => {
                                        setConsultationDomain(undefined);
                                        setIsConsultationModalOpen(true);
                                    }}
                                    className="px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm shadow-xl shadow-amber-400/20 hover:shadow-amber-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <MessageSquareCode className="w-4 h-4" />
                                    <span>{isFa ? 'ارسال شرح نیاز و درخواست مشاوره' : 'Request Technical Consultation'}</span>
                                </button>
                                <a
                                    href="tel:+982191030830"
                                    className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
                                >
                                    <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                                    <span>{isFa ? 'تماس مستقیم: ۰۲۱۹۱۰۳۰۸۳۰' : 'Direct Line: +98 21 9103 0830'}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        
      <GlobalCTA setPage={setPage} />

      {/* Technical Consultation Intake Modal */}
      <TechnicalConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        initialDomain={consultationDomain}
      />
    </div>
    );
};

export default CoreTechnologiesPage;
