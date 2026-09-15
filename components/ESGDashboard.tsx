import * as React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { motion } from 'motion/react';

// Carbon Trajectory Data
const CARBON_DATA = [
  { year: '2020', baseline: 12000, actualEmissions: 9800, avoidedCO2: 2200 },
  { year: '2021', baseline: 14500, actualEmissions: 8900, avoidedCO2: 5600 },
  { year: '2022', baseline: 18000, actualEmissions: 7400, avoidedCO2: 10600 },
  { year: '2023', baseline: 22000, actualEmissions: 6100, avoidedCO2: 15900 },
  { year: '2024', baseline: 27000, actualEmissions: 4800, avoidedCO2: 22200 },
  { year: '2025 (P)', baseline: 34000, actualEmissions: 3200, avoidedCO2: 30800 },
  { year: '2026 (P)', baseline: 42000, actualEmissions: 1900, avoidedCO2: 40100 },
  { year: '2028 (P)', baseline: 60000, actualEmissions: 600, avoidedCO2: 59400 },
  { year: '2030 (P)', baseline: 85000, actualEmissions: 0, avoidedCO2: 85000 },
];

// Renewable Energy Contribution Breakdown
const ENERGY_MIX = [
  { name: 'Supercritical Closed-Loop (GMEL CLG)', value: 58, color: '#0A92EF' },
  { name: 'Binary ORC Thermal Recovery', value: 24, color: '#89CFF0' },
  { name: 'Co-gen District Heat & Desal', value: 12, color: '#10B981' },
  { name: 'Auxiliary Solar & Battery Hybrid', value: 6, color: '#FFC107' },
];

// Water Stewardship Metrics
const WATER_METRICS = [
  { region: 'Tehran Industrial Corridor', traditionalUsage: 450, gmelUsage: 2.1, conserved: 447.9 },
  { region: 'Qeshm Island Thermal Zone', traditionalUsage: 680, gmelUsage: 3.4, conserved: 676.6 },
  { region: 'Central Anatolia Pilot', traditionalUsage: 520, gmelUsage: 1.8, conserved: 518.2 },
  { region: 'East Africa Rift Station', traditionalUsage: 890, gmelUsage: 4.2, conserved: 885.8 },
];

const PILLARS = [
  {
    title: 'Environmental (E)',
    score: '98.2 / 100',
    highlight: 'Net Negative Scope 1 & 2',
    description: 'Zero surface fluid venting, 99.8% closed-loop fluid recovery, and zero chemical fracking additives.',
    color: 'border-emerald-500'
  },
  {
    title: 'Social (S)',
    score: '95.8 / 100',
    highlight: 'Zero Lost-Time Incidents (TRIR 0.0)',
    description: 'World-class occupational safety standards, STEM geothermal scholarships, and indigenous community land stewardship.',
    color: 'border-sky-500'
  },
  {
    title: 'Governance (G)',
    score: '97.0 / 100',
    highlight: 'ISO 37001 & ISO 14001 Certified',
    description: 'Independent technical advisory board, strict anti-corruption diligence, and continuous public ESG disclosures.',
    color: 'border-amber-500'
  }
];

export const ESGDashboard: React.FC = () => {
  const [activeMetric, setActiveMetric] = React.useState<'carbon' | 'energy' | 'water'>('carbon');

  return (
    <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-10 shadow-2xl border border-slate-200 dark:border-slate-800 transition-colors">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>🌿 ESG Performance & Decarbonization Audit</span>
          </div>
          <h2 className="text-3xl font-display font-black text-slate-900 dark:text-white tracking-tight">
            Corporate Sustainability & ESG Matrix
          </h2>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Live telemetry-backed environmental indices, verified in accordance with GHG Protocol Corporate Standards and UN SDG Goals 7, 9, and 13.
          </p>
        </div>

        {/* Global Rating Scorecard */}
        <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex-shrink-0">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white flex flex-col items-center justify-center font-display font-black text-xl shadow-md">
            AA
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-medium">
              ESG Maturity Benchmark
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">
              96.8 / 100 <span className="text-xs font-semibold text-emerald-500">Leader</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              Verified by Bureau Veritas Standard
            </div>
          </div>
        </div>
      </div>

      {/* 3 Pillars Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        {PILLARS.map((pillar, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border-l-4 ${pillar.color} border-y border-r border-slate-200 dark:border-slate-700/80 shadow-sm`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {pillar.title}
              </span>
              <span className="text-sm font-extrabold text-slate-900 dark:text-white font-mono">
                {pillar.score}
              </span>
            </div>
            <div className="text-base font-bold text-slate-800 dark:text-slate-200 mt-2">
              {pillar.highlight}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>

      {/* Interactive Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
        <button
          onClick={() => setActiveMetric('carbon')}
          className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
            activeMetric === 'carbon'
              ? 'bg-primary text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <span>📉 Carbon Footprint & Avoided CO₂</span>
        </button>
        <button
          onClick={() => setActiveMetric('energy')}
          className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
            activeMetric === 'energy'
              ? 'bg-primary text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <span>⚡ Renewable Generation Mix</span>
        </button>
        <button
          onClick={() => setActiveMetric('water')}
          className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
            activeMetric === 'water'
              ? 'bg-primary text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <span>💧 Water Circularity vs Traditional</span>
        </button>
      </div>

      {/* Main Visualization Display */}
      <div className="bg-slate-50/50 dark:bg-slate-950/40 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 min-h-[420px]">
        {activeMetric === 'carbon' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                  Trajectory: Operational Baseline vs Avoided Carbon Offset
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Measured in Metric Tons (MT) CO₂ Equivalent (Scope 1, 2, & 3 Avoided)
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-400 mt-2 sm:mt-0">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#10B981]"></span> Avoided CO₂ Offset
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#EF4444]"></span> Direct Operational Footprint
                </span>
              </div>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CARBON_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="avoidedGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="emissionsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} />
                  <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '12px',
                      border: '1px solid #334155',
                      color: '#fff',
                      fontSize: '12px'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="avoidedCO2"
                    name="Avoided CO₂ (MT)"
                    stroke="#10B981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#avoidedGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="actualEmissions"
                    name="Operational Footprint (MT)"
                    stroke="#EF4444"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#emissionsGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-xs text-slate-500 dark:text-slate-400 text-center">
              Source: KKM International Group Verified Carbon Audit 2024. Projected milestones reflect committed commercial GMEL expansions.
            </div>
          </div>
        )}

        {activeMetric === 'energy' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                Zero-Carbon Power & Thermal Mix
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Continuous baseload generation breakdown from GMEL geothermal energy loops and co-generation nodes.
              </p>

              <div className="space-y-4">
                {ENERGY_MIX.map((item, i) => (
                  <div key={i} className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between text-sm font-semibold mb-1">
                      <span className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                        {item.name}
                      </span>
                      <span className="font-mono text-primary font-bold">{item.value}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-72 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ENERGY_MIX}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {ENERGY_MIX.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '12px',
                      border: '1px solid #334155',
                      color: '#fff',
                      fontSize: '12px'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeMetric === 'water' && (
          <div>
            <div className="mb-6">
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                Aquifer Preservation: Traditional Geothermal vs GMEL Closed-Loop
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Water consumption per Megawatt-Hour (m³ / MWh). GMEL uses a 100% sealed secondary loop with zero subsurface fluid extraction.
              </p>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={WATER_METRICS} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} />
                  <XAxis dataKey="region" stroke="#94a3b8" fontSize={11} tickLine={false} interval={0} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} label={{ value: 'm³ Water Consumed / MWh', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '12px',
                      border: '1px solid #334155',
                      color: '#fff',
                      fontSize: '12px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="traditionalUsage" name="Conventional Open Geothermal (m³)" fill="#94a3b8" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="gmelUsage" name="KKM GMEL Closed-Loop (m³)" fill="#0A92EF" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-xs text-sky-800 dark:text-sky-300 flex items-center justify-between">
              <span>💧 <strong>Net Savings:</strong> GMEL preserves over 99.4% of municipal water reserves in arid and semi-arid deployment regions.</span>
              <span className="font-bold font-mono">Zero EGS Fracking Required</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ESGDashboard;
