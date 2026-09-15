import * as React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { useTheme } from '../ThemeContext';

// Base Projection Data (2024 - 2035)
const BASE_PROJECTIONS = [
  { year: '2024', base: 22.4, aggressive: 25.0, conservative: 20.1, avoidedGWh: 110, lithiumCredits: 3.2 },
  { year: '2025', base: 31.8, aggressive: 38.5, conservative: 28.0, avoidedGWh: 165, lithiumCredits: 5.4 },
  { year: '2026', base: 45.2, aggressive: 56.0, conservative: 38.5, avoidedGWh: 240, lithiumCredits: 8.9 },
  { year: '2027', base: 64.0, aggressive: 82.0, conservative: 52.0, avoidedGWh: 350, lithiumCredits: 13.5 },
  { year: '2028', base: 88.5, aggressive: 115.0, conservative: 70.0, avoidedGWh: 490, lithiumCredits: 19.8 },
  { year: '2029', base: 118.0, aggressive: 158.0, conservative: 92.0, avoidedGWh: 660, lithiumCredits: 28.0 },
  { year: '2030', base: 155.0, aggressive: 215.0, conservative: 120.0, avoidedGWh: 880, lithiumCredits: 38.5 },
  { year: '2032', base: 245.0, aggressive: 340.0, conservative: 185.0, avoidedGWh: 1420, lithiumCredits: 62.0 },
  { year: '2035', base: 410.0, aggressive: 580.0, conservative: 310.0, avoidedGWh: 2400, lithiumCredits: 105.0 },
];

export const CarbonOffsetViz: React.FC = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  
  // Scenario Simulator Interactive States
  const [wellsCount, setWellsCount] = React.useState<number>(24);
  const [temperature, setTemperature] = React.useState<number>(240); // in Celsius
  const [isLiveTelemetry, setIsLiveTelemetry] = React.useState<boolean>(true);
  const [livePulseOffset, setLivePulseOffset] = React.useState<number>(14852.34);
  const [activeScenario, setActiveScenario] = React.useState<'base' | 'aggressive' | 'conservative'>('base');

  // Live telemetry pulse simulation
  React.useEffect(() => {
    if (!isLiveTelemetry) return;
    const interval = setInterval(() => {
      setLivePulseOffset(prev => prev + Number((0.08 + Math.random() * 0.06).toFixed(3)));
    }, 1200);
    return () => clearInterval(interval);
  }, [isLiveTelemetry]);

  // Derived calculations based on interactive sliders
  // GMEL Closed-loop empirical formula:
  // MWth = wells * (temperature - 80) * 0.038
  const calculatedPowerMW = Math.round(wellsCount * (temperature - 80) * 0.042 * 10) / 10;
  // CO2 avoidance = MW * 8760 * 0.52 metric tons / 1000 = Kilotons/yr
  const calculatedAnnualCO2Kilotons = Math.round((calculatedPowerMW * 8760 * 0.51) / 100) / 10;
  const calculatedHomesPowered = Math.round(calculatedPowerMW * 720);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200 dark:border-slate-800 transition-colors">
      {/* Header & Live Status */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-secondary text-xs font-semibold uppercase tracking-wider mb-2">
            <span>{t('PredictiveModeling')}</span>
          </div>
          <h2 className="text-3xl font-display font-black text-slate-900 dark:text-white tracking-tight">
            {t('ProjectedCarbonOffset')}
          </h2>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            {t('CarbonOffsetDesc')}
          </p>
        </div>

        {/* Live Telemetry Ticker */}
        <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isLiveTelemetry ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {isLiveTelemetry ? t('TelemetryFeed') : t('TelemetryPaused')}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-black text-slate-900 dark:text-white mt-1">
              {livePulseOffset.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{' '}
              <span className="text-xs font-sans text-emerald-600 dark:text-emerald-400 font-bold">{t('MtCo2')}</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              {t('DisplacedWells')}
            </div>
          </div>

          <button
            onClick={() => setIsLiveTelemetry(!isLiveTelemetry)}
            className="px-3 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            title="Toggle Live Telemetry Update"
          >
            {isLiveTelemetry ? t('Pause') : t('Resume')}
          </button>
        </div>
      </div>

      {/* Main Interactive Recharts Chart */}
      <div className="my-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {t('CumulativeCarbonAvoidance')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t('ConfidenceIntervals')}
            </p>
          </div>

          {/* Scenario selector */}
          <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            {(['conservative', 'base', 'aggressive'] as const).map((scen) => (
              <button
                key={scen}
                onClick={() => setActiveScenario(scen)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                  activeScenario === scen
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t(scen.charAt(0).toUpperCase() + scen.slice(1))}
              </button>
            ))}
          </div>
        </div>

        <div className="h-80 sm:h-96 w-full bg-slate-50/50 dark:bg-slate-950/40 rounded-2xl p-4 border border-slate-200 dark:border-slate-800">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={BASE_PROJECTIONS} margin={{ top: 15, right: 30, left: 10, bottom: 10 }}>
              <defs>
                <linearGradient id="aggressiveGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="baseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0A92EF" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#0A92EF" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#94a3b8' : '#cbd5e1'} opacity={theme === 'dark' ? 0.2 : 0.5} />
              <XAxis dataKey="year" stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} fontSize={12} tickLine={false} />
              <YAxis stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} fontSize={12} tickLine={false} tickFormatter={(v) => `${v} kt`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
                  borderRadius: '12px',
                  border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
                  color: theme === 'dark' ? '#fff' : '#0f172a',
                  fontSize: '12px'
                }}
              />
              <Legend verticalAlign="top" height={36} />

              {/* Aggressive envelope */}
              <Area
                type="monotone"
                dataKey="aggressive"
                name={t('AggressivePipeline')}
                stroke="#10B981"
                fill="url(#aggressiveGradient)"
                strokeWidth={2}
                strokeDasharray="4 4"
                hide={activeScenario === 'conservative'}
              />

              {/* Base Case */}
              <Area
                type="monotone"
                dataKey="base"
                name={t('TargetBaseline')}
                stroke="#0A92EF"
                fill="url(#baseGradient)"
                strokeWidth={3}
              />

              {/* Conservative line */}
              <Line
                type="monotone"
                dataKey="conservative"
                name={t('ConservativeMinimum')}
                stroke="#F59E0B"
                strokeWidth={2}
                dot={{ r: 4 }}
              />

              {/* Co-benefit Lithium credits */}
              <Bar
                dataKey="lithiumCredits"
                name={t('LithiumLoop')}
                fill="#8B5CF6"
                radius={[4, 4, 0, 0]}
                barSize={16}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Interactive Scenario Simulator Panel */}
      <div className="mt-10 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/80 dark:to-slate-800/40 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-display font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{t('InteractiveGeothermal')}</span>
              <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-primary/10 text-primary dark:text-secondary">
                {t('GmelParametric')}
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
              {t('AdjustWellCount')}
            </p>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Wellbore Count Slider */}
          <div className="bg-white dark:bg-slate-900/80 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                {t('NumberClosedLoop')}
              </label>
              <span className="font-mono font-black text-primary text-base">
                {wellsCount} {t('Wells')}
              </span>
            </div>
            <input
              type="range"
              min="4"
              max="96"
              step="2"
              value={wellsCount}
              onChange={(e) => setWellsCount(Number(e.target.value))}
              className="w-full accent-primary h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
              <span>{t('FourWells')}</span>
              <span>{t('FortyEightWells')}</span>
              <span>{t('NinetySixWells')}</span>
            </div>
          </div>

          {/* Subsurface Temperature Slider */}
          <div className="bg-white dark:bg-slate-900/80 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                {t('DownholeTemp')}
              </label>
              <span className="font-mono font-black text-primary text-base">
                {temperature} °C
              </span>
            </div>
            <input
              type="range"
              min="140"
              max="350"
              step="5"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full accent-primary h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
              <span>{t('MediumEnthalpy')}</span>
              <span>{t('DeepGranite')}</span>
              <span>{t('Supercritical')}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Computed Outputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-400">
              {t('NetThermalCapacity')}
            </div>
            <div className="text-3xl font-display font-black text-primary mt-1">
              {calculatedPowerMW} <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{t('Mwth')}</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {t('ContinuousLoop')}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-400">
              {t('AnnualCo2Avoidance')}
            </div>
            <div className="text-3xl font-display font-black text-emerald-600 dark:text-emerald-400 mt-1">
              {calculatedAnnualCO2Kilotons.toLocaleString()} <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{t('KtYr')}</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {t('DisplacingFossil')}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-400">
              {t('CleanDomesticPower')}
            </div>
            <div className="text-3xl font-display font-black text-amber-500 mt-1">
              {calculatedHomesPowered.toLocaleString()} <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{t('Homes')}</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {t('ZeroEmission')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonOffsetViz;
