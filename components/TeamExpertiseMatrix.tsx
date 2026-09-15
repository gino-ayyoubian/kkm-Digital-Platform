import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface ExpertiseItem {
  id: string;
  skillName: string;
  category: 'Subsurface & Drilling' | 'Thermodynamics & ORC' | 'AI & Digital Twin' | 'Materials & Chemistry' | 'Field EPCI & Safety' | 'ESG & Policy';
  maturityLevel: 'Proprietary IP' | 'Advanced R&D' | 'Field Deployed' | 'Sovereign Standard';
  description: string;
  researchCapabilities: string[];
  associatedGmelTech: string[];
  researchLead: string;
  openRolesCount?: number;
}

export const EXPERTISE_ITEMS: ExpertiseItem[] = [
  {
    id: 'exp-clg-modeling',
    skillName: 'Closed-Loop Coaxial Heat Transfer Modeling',
    category: 'Thermodynamics & ORC',
    maturityLevel: 'Proprietary IP',
    description: 'High-fidelity analytical and numerical simulations of dual-fluid coaxial exchange in high-enthalpy deep reservoirs, minimizing conductive decay over multi-decade operational horizons.',
    researchCapabilities: [
      'Supercritical CO₂ and organic fluid phase equilibria',
      'Coupled downhole thermal-hydraulic transient modeling',
      'Vacuum-insulated tubing (VIT) thermal bypass mitigation'
    ],
    associatedGmelTech: ['GMEL CLG', 'GMEL ThermoFluid'],
    researchLead: 'Dr. Khosro Jarrahian (R&D Directorate)',
    openRolesCount: 2
  },
  {
    id: 'exp-spallation-drilling',
    skillName: 'Thermal Spallation & Directional Drilling',
    category: 'Subsurface & Drilling',
    maturityLevel: 'Proprietary IP',
    description: 'Non-contact rock degradation combining thermal spallation flames and polycrystalline diamond compact (PDC) hybrid drillheads to penetrate ultra-hard crystalline basement rocks at 4x conventional penetration rates.',
    researchCapabilities: [
      'High-pressure, high-temperature (HPHT) rock mechanics',
      'Continuous borehole acoustic logging while drilling (LWD)',
      'Subsurface casing integrity under extreme thermal cycling'
    ],
    associatedGmelTech: ['GMEL DrillX', 'GMEL EHS'],
    researchLead: 'Heidar Yarveicy (Global EPCI)',
    openRolesCount: 1
  },
  {
    id: 'exp-pinn-digital-twin',
    skillName: 'Physics-Informed Neural Networks (PINN) for Reservoirs',
    category: 'AI & Digital Twin',
    maturityLevel: 'Advanced R&D',
    description: 'Real-time digital twin architectures marrying Darcy flow equations and heat conservation laws with deep learning to predict reservoir thermal recharge kinetics from distributed fiber sensors.',
    researchCapabilities: [
      'Edge SCADA inferencing on downhole sensor streams',
      'Shader-based 3D subsurface volumetric visualization',
      'Automated turbine dispatch and grid frequency optimization'
    ],
    associatedGmelTech: ['KKM Shader Pilot', 'GMEL Navigator'],
    researchLead: 'Dr. Reza Asakereh (Digital Systems)',
    openRolesCount: 3
  },
  {
    id: 'exp-direct-lithium',
    skillName: 'Direct Lithium Extraction (DLE) & Sorbent Chemistry',
    category: 'Materials & Chemistry',
    maturityLevel: 'Field Deployed',
    description: 'Nanostructured inorganic ion-sieve and electrochemical adsorption matrices capable of stripping battery-grade lithium ions from hot mineralized geothermal brines with >94% recovery.',
    researchCapabilities: [
      'Selective ion-sieving under elevated temperatures (80°C - 120°C)',
      'Zero-acid desorption regeneration cycles',
      'Heavy mineral valorization (silica, boron, zinc coproducts)'
    ],
    associatedGmelTech: ['GMEL LithiumLoop', 'GMEL EcoCluster'],
    researchLead: 'Dr. Khosro Jarrahian & Material Science Unit',
    openRolesCount: 1
  },
  {
    id: 'exp-supercritical-orc',
    skillName: 'Binary Organic Rankine Cycle (ORC) Optimization',
    category: 'Thermodynamics & ORC',
    maturityLevel: 'Field Deployed',
    description: 'Custom expander turbine staging and regenerative pre-heating topologies achieving thermodynamic efficiencies approaching 85% of Carnot limits for low-to-medium enthalpy geo-fluids.',
    researchCapabilities: [
      'Non-azeotropic working fluid blend customization',
      'Direct-contact evaporators and air-cooled condenser arrays',
      'Zero non-condensable gas (NCG) venting architectures'
    ],
    associatedGmelTech: ['GMEL CLG', 'GMEL SmartFund'],
    researchLead: 'Thermodynamic Power Group',
    openRolesCount: 2
  },
  {
    id: 'exp-membrane-desal',
    skillName: 'Thermal Membrane Desalination & Zero-Liquid Discharge',
    category: 'Materials & Chemistry',
    maturityLevel: 'Field Deployed',
    description: 'Cascading low-temperature reject heat (60°C - 90°C) into vacuum membrane distillation skids, generating millions of cubic meters of potable water without electrical penalty.',
    researchCapabilities: [
      'Anti-scaling hydrophobic membrane surface treatments',
      'Multi-effect forward osmosis crystallization',
      'Co-generation agricultural fertigation pipelines'
    ],
    associatedGmelTech: ['GMEL Desal', 'GMEL AgriCell'],
    researchLead: 'Clean Water Engineering Division',
    openRolesCount: 1
  },
  {
    id: 'exp-epci-governance',
    skillName: 'Megaproject EPCI Delivery & Sovereign Concessions',
    category: 'Field EPCI & Safety',
    maturityLevel: 'Sovereign Standard',
    description: 'Turnkey engineering, procurement, construction, and commissioning governance delivering multi-hundred-million-dollar energy installations on schedule with zero lost-time incidents.',
    researchCapabilities: [
      'Supply chain provenance and ASME/API pressure vessel audits',
      'Modular skid pre-fabrication and rapid field integration',
      'Bilateral sovereign power purchase agreements (PPAs)'
    ],
    associatedGmelTech: ['GMEL EcoCluster', 'Global EPCI Ops'],
    researchLead: 'Heidar Yarveicy & Legal Directorate',
    openRolesCount: 2
  },
  {
    id: 'exp-steam-electrolysis',
    skillName: 'High-Temperature Steam Electrolysis (HTSE)',
    category: 'Materials & Chemistry',
    maturityLevel: 'Advanced R&D',
    description: 'Solid oxide electrolysis cells (SOEC) fed by geothermal steam and geothermal electricity, slashing electrical power consumption per kilogram of pure green hydrogen produced.',
    researchCapabilities: [
      'Cermet electrode degradation mitigation at 650°C',
      'Direct thermal integration with ORC turbine exhaust',
      'Underground geologic hydrogen storage feasibility'
    ],
    associatedGmelTech: ['GMEL H2Cell', 'GMEL EcoCluster'],
    researchLead: 'Hydrogen Systems Research Team',
    openRolesCount: 2
  },
  {
    id: 'exp-esg-carbon-accounting',
    skillName: 'Scope 1-3 GHG Auditing & Carbon Credit Verification',
    category: 'ESG & Policy',
    maturityLevel: 'Sovereign Standard',
    description: 'Rigorous empirical lifecycle assessment (LCA) tracking avoided emissions, aquifer preservation, and verified carbon credit issuance under Gold Standard and Verra methodologies.',
    researchCapabilities: [
      'Continuous downhole geochemical gas composition logging',
      'UN Sustainable Development Goals (SDG 6, 7, 9, 13) auditing',
      'Biodiversity and micro-seismic risk mitigation modeling'
    ],
    associatedGmelTech: ['GMEL GeoCredit', 'GMEL SmartFund'],
    researchLead: 'Sofia Chen-Lindqvist (ESG Directorate)',
    openRolesCount: 1
  }
];

export const TeamExpertiseMatrix: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');
  const [selectedMaturity, setSelectedMaturity] = React.useState<string>('All');
  const [expandedItemId, setExpandedItemId] = React.useState<string | null>(null);

  const categories = [
    'All',
    'Subsurface & Drilling',
    'Thermodynamics & ORC',
    'AI & Digital Twin',
    'Materials & Chemistry',
    'Field EPCI & Safety',
    'ESG & Policy'
  ];

  const maturityLevels = ['All', 'Proprietary IP', 'Advanced R&D', 'Field Deployed', 'Sovereign Standard'];

  const filteredItems = React.useMemo(() => {
    return EXPERTISE_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesMaturity = selectedMaturity === 'All' || item.maturityLevel === selectedMaturity;
      
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory && matchesMaturity;

      const matchesSearch =
        item.skillName.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.researchLead.toLowerCase().includes(q) ||
        item.associatedGmelTech.some((tech) => tech.toLowerCase().includes(q)) ||
        item.researchCapabilities.some((cap) => cap.toLowerCase().includes(q));

      return matchesCategory && matchesMaturity && matchesSearch;
    });
  }, [searchQuery, selectedCategory, selectedMaturity]);

  return (
    <section id="expertise-matrix-section" className="my-20 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl transition-colors">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-secondary text-xs font-semibold uppercase tracking-wider mb-2">
            <span>🔬 Engineering Capabilities & Scientific Depth</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 dark:text-white tracking-tight">
            Team Expertise & Research Matrix
          </h2>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-2xl">
            Explore KKM’s proprietary technological domains, patent competencies, and active applied R&D capabilities driving next-generation geothermal energy.
          </p>
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
          Showing <span className="font-bold text-primary dark:text-secondary font-mono">{filteredItems.length}</span> of {EXPERTISE_ITEMS.length} Research Domains
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="my-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search expertise by skill, research topic (e.g. 'PINN', 'Thermodynamics', 'Lithium'), tech or lead scientist..."
            className="w-full px-5 py-3.5 pl-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary text-sm shadow-sm transition"
          />
          <svg
            className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap mr-1">
            Domain:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Maturity Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap mr-1">
            Maturity:
          </span>
          {maturityLevels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedMaturity(lvl)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all ${
                selectedMaturity === lvl
                  ? 'bg-secondary text-slate-950 font-bold'
                  : 'bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Expertise Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => {
          const isExpanded = expandedItemId === item.id;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              className={`bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                isExpanded
                  ? 'border-primary shadow-xl ring-2 ring-primary/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md'
              }`}
            >
              <div>
                {/* Badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary dark:text-secondary">
                    {item.category}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                      item.maturityLevel === 'Proprietary IP'
                        ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                        : item.maturityLevel === 'Advanced R&D'
                        ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300'
                        : item.maturityLevel === 'Field Deployed'
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                        : 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300'
                    }`}
                  >
                    {item.maturityLevel}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white leading-snug">
                  {item.skillName}
                </h3>

                <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 my-4">
                  {item.associatedGmelTech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 text-[10px] font-mono text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Expanded Research Capabilities */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden border-t border-slate-200 dark:border-slate-700 pt-3 mt-3"
                    >
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Advanced Research Capabilities:
                      </h4>
                      <ul className="space-y-1.5 mb-3">
                        {item.researchCapabilities.map((cap, cIdx) => (
                          <li key={cIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                            <span className="text-primary font-bold">•</span>
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        Direction: <span className="font-semibold text-slate-700 dark:text-slate-200">{item.researchLead}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700/80 flex items-center justify-between mt-4">
                <button
                  onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                  className="text-xs font-bold text-primary dark:text-secondary hover:underline flex items-center gap-1"
                >
                  <span>{isExpanded ? 'Hide Capabilities' : 'View Capabilities'}</span>
                  <span>{isExpanded ? '↑' : '↓'}</span>
                </button>

                {item.openRolesCount && item.openRolesCount > 0 && (
                  <a
                    href="#job-listings"
                    className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <span>{item.openRolesCount} Open Role{item.openRolesCount > 1 ? 's' : ''}</span>
                    <span>&rarr;</span>
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            No engineering skills match "{searchQuery}" under the selected filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedMaturity('All');
            }}
            className="mt-3 px-4 py-2 text-xs font-bold bg-primary text-white rounded-xl hover:bg-secondary transition"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </section>
  );
};

export default TeamExpertiseMatrix;
