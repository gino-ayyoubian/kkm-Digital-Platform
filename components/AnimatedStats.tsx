import * as React from 'react';
import { useInView, useMotionValue, useSpring, animate, motion, useTransform } from 'motion/react';
import { useLanguage } from '../LanguageContext';

interface CounterProps {
  from?: number;
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

const AnimatedCounter: React.FC<CounterProps> = ({ from = 0, to, decimals = 0, prefix = '', suffix = '' }) => {
  const nodeRef = React.useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(from);

  const springValue = useSpring(motionValue, {
    damping: 40,
    stiffness: 180,
  });

  const transformedValue = useTransform(springValue, (latest) => {
    return prefix + latest.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) + suffix;
  });

  const isInView = useInView(nodeRef, { once: true, margin: "-80px" });

  React.useEffect(() => {
    if (isInView) {
      animate(motionValue, to, { duration: 2.2, ease: [0.16, 1, 0.3, 1] });
    }
  }, [motionValue, isInView, to]);

  return <motion.span ref={nodeRef}>{transformedValue}</motion.span>;
};

export const AnimatedStats: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = React.useState<'cumulative' | 'annual'>('cumulative');

  const stats = [
    {
      id: 'water',
      label: 'Water Conserved & Recycled',
      category: 'Hydrological Stewardship',
      cumulativeValue: 4850000,
      annualValue: 1250000,
      suffix: ' L',
      subtext: 'Through GMEL closed-loop thermal recovery & condensation',
      icon: (
        <svg className="w-7 h-7 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          <path d="M12 12a3 3 0 0 0 3-3" />
        </svg>
      ),
      badgeColor: 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300',
      metricPill: 'Zero Aquifer Depletion'
    },
    {
      id: 'co2',
      label: 'CO₂ Emissions Avoided',
      category: 'Decarbonization Impact',
      cumulativeValue: 14850,
      annualValue: 3800,
      suffix: ' MT',
      subtext: 'Displacing fossil peaker units with baseload geothermal',
      icon: (
        <svg className="w-7 h-7 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      ),
      badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
      metricPill: 'Net Negative Footprint'
    },
    {
      id: 'projects',
      label: 'Turnkey Infrastructure Delivered',
      category: 'EPCI & Engineering',
      cumulativeValue: 52,
      annualValue: 8,
      suffix: '+',
      subtext: 'Completed across deep drilling, district heat, & micro-grids',
      icon: (
        <svg className="w-7 h-7 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
      badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
      metricPill: '100% On-Time Execution'
    },
    {
      id: 'energy',
      label: 'Clean Geothermal MWh Generated',
      category: 'Power Grid Integration',
      cumulativeValue: 240000,
      annualValue: 62000,
      suffix: ' MWh',
      subtext: 'High-availability 24/7 supercritical base generation',
      icon: (
        <svg className="w-7 h-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
      badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300',
      metricPill: '99.4% Grid Reliability'
    },
    {
      id: 'efficiency',
      label: 'Thermodynamic Cycle Efficiency',
      category: 'Patented Technology',
      cumulativeValue: 98.6,
      annualValue: 98.6,
      decimals: 1,
      suffix: '%',
      subtext: 'Closed-loop heat transfer retention via proprietary GMEL binary cycle',
      icon: (
        <svg className="w-7 h-7 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="m14 10-4 4" />
          <path d="m10 10 4 4" />
        </svg>
      ),
      badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300',
      metricPill: 'Zero Venting Losses'
    },
    {
      id: 'reach',
      label: 'Global Strategic Engagements',
      category: 'International Reach',
      cumulativeValue: 14,
      annualValue: 5,
      suffix: ' Nations',
      subtext: 'Collaborations with ministries, energy consortiums, & universities',
      icon: (
        <svg className="w-7 h-7 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
      badgeColor: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300',
      metricPill: 'Cross-Border Impact'
    }
  ];

  const infographics = [
    {
      title: 'Equivalent Trees Planted',
      metric: '680,000+',
      description: 'CO₂ absorption equivalent to a mature boreal forest of 1,200 hectares.',
      icon: '🌲'
    },
    {
      title: 'Municipal Homes Powered Clean',
      metric: '65,000+',
      description: 'Continuous zero-emission heating and electricity delivered 24 hours a day.',
      icon: '⚡'
    },
    {
      title: 'Potable Desalination Output',
      metric: '2.1 Billion L',
      description: 'Thermal waste heat redirected for zero-carbon clean drinking water synthesis.',
      icon: '💧'
    },
    {
      title: 'Barrels of Heavy Fuel Displaced',
      metric: '135,000 bbl',
      description: 'Prevented fossil burning through direct supercritical geothermal feed-in.',
      icon: '🛡️'
    }
  ];

  return (
    <section className="relative bg-slate-50/80 dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800 py-16 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title & Period Selector */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-secondary text-xs font-semibold uppercase tracking-wider mb-2">
              <span>📊 Global Corporate Sustainability Dashboard</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 dark:text-white">
              Verified Environmental & Engineering Impact
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-2xl text-base">
              Real-world telemetry measurements across KKM's active GMEL closed-loop geothermal installations and deep infrastructure projects.
            </p>
          </div>

          {/* Timeframe Toggle Tabs */}
          <div className="flex items-center p-1 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex-shrink-0">
            <button
              onClick={() => setActiveTab('cumulative')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'cumulative'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Lifetime Cumulative
            </button>
            <button
              onClick={() => setActiveTab('annual')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'annual'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Annualized Run-Rate
            </button>
          </div>
        </div>

        {/* 6 Key Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {stats.map((item, idx) => {
            const targetVal = activeTab === 'cumulative' ? item.cumulativeValue : item.annualValue;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 shadow-md hover:shadow-xl border border-slate-200 dark:border-slate-700/80 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 shadow-inner group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${item.badgeColor}`}>
                      {item.metricPill}
                    </span>
                  </div>

                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {item.category}
                  </p>

                  <h3 className="text-3xl md:text-4xl font-display font-black text-slate-900 dark:text-white mt-2 tracking-tight">
                    <AnimatedCounter
                      key={`${item.id}-${activeTab}`}
                      to={targetVal}
                      decimals={item.decimals || 0}
                      suffix={item.suffix}
                    />
                  </h3>

                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-base mt-2">
                    {item.label}
                  </h4>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/60 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.subtext}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Ecological Equivalency Infographics Strip */}
        <div className="bg-gradient-to-r from-primary-dark via-[#00386c] to-slate-900 text-white rounded-2xl p-8 shadow-xl border border-slate-700/80">
          <div className="text-center md:text-left mb-6">
            <h3 className="text-xl font-display font-bold flex items-center justify-center md:justify-start gap-2">
              <span>🌱 Real-World Ecological Equivalency</span>
              <span className="text-xs font-sans font-normal px-2.5 py-0.5 rounded-full bg-white/20 text-white">
                ISO 14064 Audited
              </span>
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Tangible societal translation of KKM's clean energy & conservation metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {infographics.map((info, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/10 hover:bg-white/15 transition-colors"
              >
                <div className="text-3xl mb-3">{info.icon}</div>
                <div className="text-2xl font-display font-extrabold text-accent-yellow">
                  {info.metric}
                </div>
                <div className="font-semibold text-sm text-white mt-1">
                  {info.title}
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {info.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedStats;
