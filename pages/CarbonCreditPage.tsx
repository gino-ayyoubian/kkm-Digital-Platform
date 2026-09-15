import * as React from 'react';
import { Page } from '../types';
import { useLanguage } from '../LanguageContext';
import { useTheme } from '../ThemeContext';
import PageHeader from '../components/PageHeader';
import { motion, AnimatePresence } from 'motion/react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

// --- Market Trend Data ---
const MARKET_TREND_DATA = [
  { year: '2019', global: 120, kkm: 10 },
  { year: '2020', global: 150, kkm: 25 },
  { year: '2021', global: 180, kkm: 55 },
  { year: '2022', global: 230, kkm: 90 },
  { year: '2023', global: 290, kkm: 140 },
  { year: '2024', global: 360, kkm: 210 },
];

// --- Partner Logos ---
const PARTNER_LOGOS = [
  'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg',
];

const CarbonCreditPage: React.FC = () => {
    const { t } = useLanguage();
    const { theme } = useTheme();
    
    // Calculator States
    const [milesFlown, setMilesFlown] = React.useState<number>(() => {
        const saved = localStorage.getItem('kkm-calc-miles');
        return saved ? Number(saved) : 1000;
    });
    const [energyUsage, setEnergyUsage] = React.useState<number>(() => {
        const saved = localStorage.getItem('kkm-calc-energy');
        return saved ? Number(saved) : 500;
    });
    const [diet, setDiet] = React.useState<'vegan' | 'vegetarian' | 'omnivore'>(() => {
        const saved = localStorage.getItem('kkm-calc-diet');
        return (saved as any) || 'omnivore';
    });
    const [totalOffset, setTotalOffset] = React.useState<number>(452810);
    const [showOffsetSuccess, setShowOffsetSuccess] = React.useState(false);

    React.useEffect(() => {
        localStorage.setItem('kkm-calc-miles', milesFlown.toString());
        localStorage.setItem('kkm-calc-energy', energyUsage.toString());
        localStorage.setItem('kkm-calc-diet', diet);
    }, [milesFlown, energyUsage, diet]);
    
    const LIFECYCLE_STEPS = [
      { id: 1, title: t('ProjectVerification'), desc: t('ProjectVerificationDesc') },
      { id: 2, title: t('CreditIssuance'), desc: t('CreditIssuanceDesc') },
      { id: 3, title: t('MarketTrading'), desc: t('MarketTradingDesc') },
      { id: 4, title: t('Retirement'), desc: t('RetirementDesc') }
    ];

    // Simple calc formula
    const calculatedFootprint = React.useMemo(() => {
        const flightCarbon = milesFlown * 0.0002;
        const energyCarbon = energyUsage * 0.0004;
        const dietCarbon = diet === 'vegan' ? 0.5 : diet === 'vegetarian' ? 1.0 : 2.5;
        return Number((flightCarbon + energyCarbon + dietCarbon).toFixed(2));
    }, [milesFlown, energyUsage, diet]);

    const kkmReductionPotential = React.useMemo(() => {
        // Assume KKM tech (GMEL/REE) can offset 85% of home energy footprint
        const reduction = energyUsage * 0.0004 * 0.85;
        return Number(reduction.toFixed(2));
    }, [energyUsage]);

    const handleOffset = () => {
        setTotalOffset(prev => prev + calculatedFootprint);
        setShowOffsetSuccess(true);
        setTimeout(() => setShowOffsetSuccess(false), 4000);
    };

    return (
        <div>
            <PageHeader title={t(Page.CarbonCredit)} subtitle={t('CarbonCreditSubtitle')} />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 space-y-24">
                
                {/* Section 1: Summary Stats & Market Trend */}
                <section>
                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 text-center">
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">{t('TotalTonsOffset')}</p>
                            <p className="text-5xl font-black text-primary font-mono">{totalOffset.toLocaleString()}</p>
                            <p className="text-xs text-slate-400 mt-2">{t('VerifiedKKMContributions')}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 text-center">
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">{t('ActiveProjects')}</p>
                            <p className="text-5xl font-black text-emerald-500 font-mono">14</p>
                            <p className="text-xs text-slate-400 mt-2">{t('GlobalRegistries')}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 text-center">
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">{t('CurrentPrice')}</p>
                            <p className="text-5xl font-black text-amber-500 font-mono">$24.50</p>
                            <p className="text-xs text-slate-400 mt-2">{t('PerMetricTonAverage')}</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t('FiveYearMarketTrend')}</h2>
                            <p className="text-slate-500 text-sm">{t('MarketTrendSubtitle')}</p>
                        </div>
                        <div className="h-96 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={MARKET_TREND_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorGlobal" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="colorKkm" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#0A92EF" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#0A92EF" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="year" stroke={theme === 'dark' ? '#64748b' : '#94a3b8'} />
                                    <YAxis stroke={theme === 'dark' ? '#64748b' : '#94a3b8'} />
                                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#334155' : '#e2e8f0'} opacity={theme === 'dark' ? 0.2 : 0.5} />
                                    <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff', borderColor: theme === 'dark' ? '#334155' : '#e2e8f0', color: theme === 'dark' ? '#fff' : '#0f172a' }} />
                                    <Area type="monotone" dataKey="global" stroke="#94a3b8" fillOpacity={1} fill="url(#colorGlobal)" name="Global Market (M Tons)" />
                                    <Area type="monotone" dataKey="kkm" stroke="#0A92EF" fillOpacity={1} fill="url(#colorKkm)" name="KKM Direct Output (M Tons)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </section>

                {/* Section 2: Interactive Calculator */}
                <section>
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-8 sm:p-12 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col lg:flex-row gap-12">
                        <div className="flex-1">
                            <h2 className="text-3xl font-display font-black text-slate-900 dark:text-white mb-2">{t('PersonalFootprintCalculator')}</h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-8">{t('CalculatorDescription')}</p>
                            
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('AnnualFlightsMiles')}</label>
                                        <span className="font-mono text-primary">{milesFlown.toLocaleString()} mi</span>
                                    </div>
                                    <input type="range" min="0" max="50000" step="500" value={milesFlown} onChange={e => setMilesFlown(Number(e.target.value))} className="w-full accent-primary h-2 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer" />
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('MonthlyHomeEnergy')}</label>
                                        <span className="font-mono text-primary">{energyUsage.toLocaleString()} kWh</span>
                                    </div>
                                    <input type="range" min="100" max="3000" step="50" value={energyUsage} onChange={e => setEnergyUsage(Number(e.target.value))} className="w-full accent-primary h-2 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer" />
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-2">{t('DietaryHabits')}</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['vegan', 'vegetarian', 'omnivore'].map(d => (
                                            <button 
                                                key={d} 
                                                onClick={() => setDiet(d as any)}
                                                className={`py-2 text-xs font-bold capitalize rounded-lg border transition-colors ${diet === d ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-600'}`}
                                            >
                                                {t(d.charAt(0).toUpperCase() + d.slice(1))}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="w-full lg:w-1/3 flex flex-col items-center justify-center bg-white dark:bg-slate-950 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 relative overflow-hidden">
                            <AnimatePresence>
                                {showOffsetSuccess && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                                        className="absolute inset-0 bg-emerald-500 flex flex-col items-center justify-center text-white z-10"
                                    >
                                        <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        <h3 className="text-2xl font-bold">{t('SuccessfullyOffset')}</h3>
                                        <p className="mt-2 text-sm text-emerald-100">{t('ContributionVerified')}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2 text-center">{t('EstimatedFootprint')}</p>
                            <div className="text-6xl font-black text-slate-900 dark:text-white font-mono mb-2">
                                {calculatedFootprint}
                            </div>
                            <p className="text-sm text-slate-500 mb-6">{t('MetricTonsCO2eYear')}</p>

                            <div className="w-full bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl mb-6 border border-emerald-100 dark:border-emerald-800 text-center">
                                <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase mb-1">KKM Tech Reduction Potential</p>
                                <p className="text-2xl font-black text-emerald-600 dark:text-emerald-300 font-mono">-{kkmReductionPotential}</p>
                                <p className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80 mt-1">Based on GMEL/REE benchmarks</p>
                            </div>
                            
                            <button 
                                onClick={handleOffset}
                                className="w-full py-4 bg-primary hover:bg-secondary text-white font-bold rounded-xl shadow-lg transition-transform transform hover:-translate-y-1"
                            >
                                {t('OffsetViaKKMProjects')}
                            </button>
                        </div>
                    </div>
                </section>

                {/* Section 3: Infographic Stepper */}
                <section>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-display font-black text-slate-900 dark:text-white">{t('CarbonCreditLifecycle')}</h2>
                        <p className="text-slate-500 mt-2">{t('LifecycleSubtitle')}</p>
                    </div>
                    
                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-200 dark:bg-slate-700 -translate-y-1/2 -z-10"></div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                            {LIFECYCLE_STEPS.map((step, i) => (
                                <motion.div 
                                    key={step.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2 }}
                                    className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 text-center flex flex-col items-center"
                                >
                                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-black text-xl mb-4 border-4 border-white dark:border-slate-800 shadow-md">
                                        {step.id}
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">{step.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section 4: Social Proof / Partners */}
                <section className="bg-slate-100 dark:bg-slate-900/50 py-12 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden relative">
                    <div className="text-center mb-8">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">{t('OffsettingPartnersRegistries')}</h3>
                    </div>
                    
                    <div className="flex overflow-hidden">
                        <motion.div 
                            className="flex items-center gap-16 whitespace-nowrap px-8"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ ease: "linear", duration: 20, repeat: Infinity }}
                        >
                            {/* Duplicate array for seamless looping */}
                            {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, i) => (
                                <img key={i} src={logo} alt="Partner Logo" className="h-10 object-contain filter grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" />
                            ))}
                        </motion.div>
                    </div>
                </section>
                
            </div>
        </div>
    );
};

export default CarbonCreditPage;
