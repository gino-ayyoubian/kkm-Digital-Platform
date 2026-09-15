import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface GmelStage {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  tag: string;
  depth: string;
  temp: string;
  efficiency: string;
  description: string;
  keyOutputs: string[];
  color: string;
  accentColor: string;
}

export const GMEL_STAGES: GmelStage[] = [
  {
    id: 'stage-1-subsurface',
    number: 1,
    title: 'Deep Subsurface Heat Mining',
    subtitle: 'Thermal Spallation & Coaxial Boreholes',
    tag: 'Downhole Primary Loop',
    depth: '3,500m – 5,500m',
    temp: '180°C – 320°C',
    efficiency: '98.4% Heat Conduction',
    description: 'DrillX advanced directional drilling establishes multi-kilometer coaxial wellbores in deep impermeable hot crystalline granite. No hydraulic fracturing, zero fluid loss into formations, and zero induced seismicity.',
    keyOutputs: ['Superheated Downhole Fluid', 'Fiber-Optic Distributed Temperature Sensing', 'Zero Aquifer Contact'],
    color: '#EF4444',
    accentColor: 'from-rose-500 to-amber-500'
  },
  {
    id: 'stage-2-clg-loop',
    number: 2,
    title: 'Closed-Loop Coaxial Circulation',
    subtitle: 'Vacuum-Insulated Heat Exchange',
    tag: 'Thermodynamic Circulation',
    depth: 'Surface to 5,000m',
    temp: '220°C Average Return',
    efficiency: '>96.2% Cycle Retention',
    description: 'Proprietary GMEL ThermoFluid circulates through the sealed outer annulus, extracting high-density conductive heat from surrounding hot rock, ascending unimpeded via the central vacuum-insulated tubing (VIT).',
    keyOutputs: ['Zero Non-Condensable Gas Emissions', 'Self-Sustaining Thermosiphon Effect', 'Hermetically Sealed System'],
    color: '#F59E0B',
    accentColor: 'from-amber-500 to-yellow-500'
  },
  {
    id: 'stage-3-power-gen',
    number: 3,
    title: 'Supercritical Binary Power Generation',
    subtitle: 'Organic Rankine Cycle (ORC) Turbines',
    tag: 'Clean Baseload Electricity',
    depth: 'Surface Generation Complex',
    temp: '160°C Turbine Inlet',
    efficiency: '24/7 Firm Baseload (98% CF)',
    description: 'High-enthalpy working fluid passes through high-efficiency binary heat exchangers driving modular expander turbines. Generates zero-emission dispatchable electrical power for grid synchronization.',
    keyOutputs: ['24/7 Reliable Baseload Power', '0.0 g CO₂/kWh Life-cycle Footprint', 'Rapid Black-Start Dispatch'],
    color: '#10B981',
    accentColor: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'stage-4-cascaded-heat',
    number: 4,
    title: 'Cascaded Thermal Desalination & HVAC',
    subtitle: 'Multi-Stage Flash (MSF) & District Loop',
    tag: 'Potable Water & Municipal Heating',
    depth: 'Surface Multi-Energy Hub',
    temp: '65°C – 95°C Tail Heat',
    efficiency: '92% Total Enthalpy Utilization',
    description: 'Secondary low-temperature discharge is cascaded into thermal desalination membranes, purifying saline sea or brackish water into pristine drinking water while feeding district heating and agricultural greenhouses.',
    keyOutputs: ['250,000 m³/day Potable Freshwater', 'District Heating & Greenhouse Climate Control', 'Zero Thermal Waste to Atmosphere'],
    color: '#0A92EF',
    accentColor: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'stage-5-lithium-loop',
    number: 5,
    title: 'Direct Lithium & Mineral Valorization',
    subtitle: 'Selective Electrochemical Adsorption',
    tag: 'Strategic Battery Metals',
    depth: 'Geothermal Brine Extraction Loop',
    temp: '85°C Sorb Process',
    efficiency: '94% Selective Extraction',
    description: 'Proprietary Direct Lithium Extraction (DLE) columns harvest high-purity battery-grade lithium hydroxide directly from concentrated deep brines without evaporative ponds or surface scarring.',
    keyOutputs: ['Battery-Grade LiOH / Li₂CO₃', 'Zero Evaporation Footprint', 'Supply Chain Traceability'],
    color: '#8B5CF6',
    accentColor: 'from-purple-500 to-indigo-500'
  },
  {
    id: 'stage-6-h2-synthesis',
    number: 6,
    title: 'Green Hydrogen Synthesis & Clean Fuel Cells',
    subtitle: 'High-Temperature Steam Electrolysis (HTSE)',
    tag: 'Energy Storage & Zero-Carbon Fuels',
    depth: 'Hydrogen Synthesis Skid',
    temp: '180°C Steam Feed',
    efficiency: '38% Energy Savings vs Alkaline',
    description: 'Combining geothermal baseload electricity with residual steam pre-heating drastically cuts the energy required for water splitting, yielding green hydrogen for heavy transport and long-duration storage.',
    keyOutputs: ['99.999% Ultra-Pure Green H₂', 'Zero Grid Congestion Curtailment', 'Heavy Industrial Decarbonization'],
    color: '#EC4899',
    accentColor: 'from-pink-500 to-rose-500'
  }
];

export const GmelInteractiveDiagram: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = React.useState<number>(0);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);

  const activeStage = GMEL_STAGES[activeStageIndex];

  // Auto-play step-through
  React.useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStageIndex((prev) => (prev + 1) % GMEL_STAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section id="gmel-ecosystem-interactive" className="my-16 bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl overflow-hidden text-white">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold uppercase tracking-wider mb-2">
            <span>🌐 3D-Inspired Interactive Subsurface Architecture</span>
          </div>
          <h2 className="text-3xl font-display font-black text-white tracking-tight">
            The GMEL Closed-Loop Ecosystem
          </h2>
          <p className="text-sm md:text-base text-slate-300 mt-1 max-w-2xl">
            Explore the multi-energy cascading architecture—from 5km deep thermodynamic extraction to clean electricity, desalinated water, lithium recovery, and green hydrogen.
          </p>
        </div>

        {/* Step Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-2 ${
              isPlaying
                ? 'bg-secondary text-slate-950 border-secondary'
                : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <span>{isPlaying ? '⏸ Pause Guided Tour' : '▶ Play Guided Tour'}</span>
          </button>

          <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setActiveStageIndex((prev) => (prev === 0 ? GMEL_STAGES.length - 1 : prev - 1))}
              className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white transition"
              aria-label="Previous stage"
            >
              &larr;
            </button>
            <span className="text-xs font-mono px-2 text-slate-400">
              {activeStageIndex + 1} / {GMEL_STAGES.length}
            </span>
            <button
              onClick={() => setActiveStageIndex((prev) => (prev + 1) % GMEL_STAGES.length)}
              className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white transition"
              aria-label="Next stage"
            >
              &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Stage Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto py-6 no-scrollbar border-b border-slate-800/80">
        {GMEL_STAGES.map((stage, idx) => (
          <button
            key={stage.id}
            onClick={() => {
              setActiveStageIndex(idx);
              setIsPlaying(false);
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
              activeStageIndex === idx
                ? 'bg-slate-800 text-white border-secondary shadow-lg shadow-secondary/10 scale-105'
                : 'bg-slate-950/40 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-slate-950"
              style={{ backgroundColor: stage.color }}
            >
              {stage.number}
            </span>
            <span>{stage.title}</span>
          </button>
        ))}
      </div>

      {/* Main Interactive Stage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
        {/* Left: 3D Isometric-Style SVG Graphic Diagram */}
        <div className="lg:col-span-7 bg-slate-950/80 rounded-2xl p-4 sm:p-6 border border-slate-800 relative overflow-hidden flex items-center justify-center min-h-[440px]">
          {/* Background Ambient Glow */}
          <div
            className="absolute inset-0 opacity-20 blur-3xl pointer-events-none transition-colors duration-700"
            style={{
              background: `radial-gradient(circle at 50% 60%, ${activeStage.color}, transparent 70%)`
            }}
          />

          {/* Isometric SVG Diagram */}
          <svg
            viewBox="0 0 800 620"
            className="w-full h-auto max-h-[500px] select-none"
            style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))' }}
          >
            <defs>
              {/* Gradients */}
              <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
              <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="40%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <linearGradient id="heatBasement" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7f1d1d" />
                <stop offset="60%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
              <linearGradient id="coaxialCold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="coaxialHot" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>

            {/* SKY ZONE */}
            <rect x="20" y="20" width="760" height="200" rx="16" fill="url(#skyGrad)" opacity="0.6" />
            <text x="40" y="50" fill="#94a3b8" fontSize="11" fontFamily="monospace" fontWeight="bold">
              SURFACE MULTI-ENERGY COMPLEX (0m ELEVATION)
            </text>

            {/* SURFACE INFRASTRUCTURE */}
            {/* Power Plant Building */}
            <g
              className="cursor-pointer transition-transform duration-300"
              onClick={() => setActiveStageIndex(2)}
            >
              <rect
                x="60"
                y="85"
                width="150"
                height="110"
                rx="8"
                fill="#1e293b"
                stroke={activeStageIndex === 2 ? '#10B981' : '#475569'}
                strokeWidth={activeStageIndex === 2 ? '3' : '1.5'}
              />
              <path d="M60 85 L135 50 L210 85 Z" fill="#0f172a" stroke="#475569" />
              <text x="75" y="125" fill="#e2e8f0" fontSize="12" fontWeight="bold">
                ORC Turbines
              </text>
              <text x="75" y="145" fill="#10B981" fontSize="10" fontFamily="monospace">
                ⚡ Baseload Power
              </text>
              {activeStageIndex === 2 && (
                <circle cx="135" cy="50" r="14" fill="#10B981" opacity="0.3" className="animate-ping" />
              )}
            </g>

            {/* Desalination Skid */}
            <g
              className="cursor-pointer transition-transform duration-300"
              onClick={() => setActiveStageIndex(3)}
            >
              <rect
                x="240"
                y="95"
                width="140"
                height="100"
                rx="8"
                fill="#1e293b"
                stroke={activeStageIndex === 3 ? '#0A92EF' : '#475569'}
                strokeWidth={activeStageIndex === 3 ? '3' : '1.5'}
              />
              <text x="255" y="130" fill="#e2e8f0" fontSize="12" fontWeight="bold">
                Desalination & HVAC
              </text>
              <text x="255" y="150" fill="#0A92EF" fontSize="10" fontFamily="monospace">
                💧 Potable Water
              </text>
              {activeStageIndex === 3 && (
                <circle cx="310" cy="95" r="14" fill="#0A92EF" opacity="0.3" className="animate-ping" />
              )}
            </g>

            {/* Direct Lithium Loop Skid */}
            <g
              className="cursor-pointer transition-transform duration-300"
              onClick={() => setActiveStageIndex(4)}
            >
              <rect
                x="410"
                y="95"
                width="140"
                height="100"
                rx="8"
                fill="#1e293b"
                stroke={activeStageIndex === 4 ? '#8B5CF6' : '#475569'}
                strokeWidth={activeStageIndex === 4 ? '3' : '1.5'}
              />
              <text x="425" y="130" fill="#e2e8f0" fontSize="12" fontWeight="bold">
                Lithium Loop (DLE)
              </text>
              <text x="425" y="150" fill="#8B5CF6" fontSize="10" fontFamily="monospace">
                🔋 Battery Metals
              </text>
              {activeStageIndex === 4 && (
                <circle cx="480" cy="95" r="14" fill="#8B5CF6" opacity="0.3" className="animate-ping" />
              )}
            </g>

            {/* Hydrogen Electrolyzer Skid */}
            <g
              className="cursor-pointer transition-transform duration-300"
              onClick={() => setActiveStageIndex(5)}
            >
              <rect
                x="580"
                y="95"
                width="150"
                height="100"
                rx="8"
                fill="#1e293b"
                stroke={activeStageIndex === 5 ? '#EC4899' : '#475569'}
                strokeWidth={activeStageIndex === 5 ? '3' : '1.5'}
              />
              <text x="595" y="130" fill="#e2e8f0" fontSize="12" fontWeight="bold">
                H2Cell HTSE
              </text>
              <text x="595" y="150" fill="#EC4899" fontSize="10" fontFamily="monospace">
                🧪 Green H₂ Fuel
              </text>
              {activeStageIndex === 5 && (
                <circle cx="655" cy="95" r="14" fill="#EC4899" opacity="0.3" className="animate-ping" />
              )}
            </g>

            {/* SUBSURFACE STRATA LAYERS */}
            {/* Upper Strata */}
            <rect x="20" y="225" width="760" height="150" fill="url(#groundGrad)" />
            <text x="40" y="250" fill="#94a3b8" fontSize="10" fontFamily="monospace">
              UPPER CAPROCK & SEDIMENTARY AQUIFERS (SEALED ISOLATION ZONE)
            </text>

            {/* Deep Granite Basement (3,000m - 5,500m) */}
            <rect x="20" y="375" width="760" height="225" rx="16" fill="url(#heatBasement)" opacity="0.9" />
            <text x="40" y="405" fill="#fef08a" fontSize="11" fontFamily="monospace" fontWeight="bold">
              HOT DRY CRYSTALLINE GRANITE BASEMENT (180°C – 320°C) • ZERO FRACKING
            </text>

            {/* COAXIAL BOREHOLES (CENTRAL GMEL CLG SYSTEM) */}
            <g
              className="cursor-pointer"
              onClick={() => setActiveStageIndex(0)}
            >
              {/* Outer Casing Downhole */}
              <rect x="365" y="195" width="70" height="390" rx="6" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />

              {/* Downward Cold Working Fluid Stream */}
              <path d="M380 200 L380 570" stroke="url(#coaxialCold)" strokeWidth="8" strokeDasharray="12 6" />
              {/* Upward Supercritical Fluid Return Stream */}
              <path d="M420 570 L420 200" stroke="url(#coaxialHot)" strokeWidth="12" strokeDasharray="16 8" />

              {/* Heat absorption radiating rings in deep granite */}
              <circle cx="400" cy="530" r="45" fill="none" stroke="#facc15" strokeWidth="2" strokeDasharray="6 4" opacity="0.8" />
              <circle cx="400" cy="530" r="70" fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="8 6" opacity="0.6" />
              <circle cx="400" cy="530" r="95" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="10 8" opacity="0.4" />

              <text x="445" y="475" fill="#ffffff" fontSize="11" fontWeight="bold">
                Coaxial Heat Mining
              </text>
              <text x="445" y="495" fill="#fef08a" fontSize="10" fontFamily="monospace">
                ΔT: +180°C Thermal Pick-up
              </text>
            </g>

            {/* Real-Time Telemetry Callouts */}
            <g transform="translate(480, 240)">
              <rect width="180" height="48" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" opacity="0.9" />
              <text x="12" y="20" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">
                FIBER-OPTIC DTS ARRAY
              </text>
              <text x="12" y="36" fill="#cbd5e1" fontSize="9">
                Continuous 24/7 Downhole Profiling
              </text>
            </g>
          </svg>
        </div>

        {/* Right: Active Stage Dossier & Specifications */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-800/80 rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-xl"
            >
              {/* Badge */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold text-slate-950 uppercase tracking-wider"
                  style={{ backgroundColor: activeStage.color }}
                >
                  Stage 0{activeStage.number} • {activeStage.tag}
                </span>
                <span className="text-xs font-mono text-slate-400">GMEL Architecture</span>
              </div>

              <h3 className="text-2xl font-display font-black text-white leading-tight">
                {activeStage.title}
              </h3>
              <p className="text-xs font-bold text-secondary mt-1 uppercase tracking-wide">
                {activeStage.subtitle}
              </p>

              <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeStage.description}
              </p>

              {/* Technical Parameter Cards */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 my-6">
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/80">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Formation Depth</div>
                  <div className="text-xs sm:text-sm font-mono font-bold text-white mt-1">{activeStage.depth}</div>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/80">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Temperature</div>
                  <div className="text-xs sm:text-sm font-mono font-bold text-amber-400 mt-1">{activeStage.temp}</div>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/80">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Cycle Retention</div>
                  <div className="text-xs sm:text-sm font-mono font-bold text-emerald-400 mt-1">{activeStage.efficiency}</div>
                </div>
              </div>

              {/* Key Deliverables */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  Engineering Deliverables & Outputs
                </h4>
                <ul className="space-y-2">
                  {activeStage.keyOutputs.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeStage.color }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stage Stepper Trigger */}
              <div className="mt-8 pt-4 border-t border-slate-700 flex items-center justify-between">
                <button
                  onClick={() => setActiveStageIndex((prev) => (prev + 1) % GMEL_STAGES.length)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-primary hover:bg-secondary text-white hover:text-slate-950 transition-all duration-300 flex items-center gap-2 shadow-lg"
                >
                  <span>Explore Next Stage ({activeStageIndex === GMEL_STAGES.length - 1 ? 'Stage 1' : `Stage ${activeStageIndex + 2}`})</span>
                  <span>&rarr;</span>
                </button>
                <span className="text-[11px] text-slate-400 font-mono">
                  Stage {activeStage.number} of {GMEL_STAGES.length}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default GmelInteractiveDiagram;
