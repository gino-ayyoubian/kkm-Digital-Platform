import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../LanguageContext';

type SectorNode = {
  id: string;
  labelKey: string;
  descKey: string;
  cx: number;
  cy: number;
  color: string;
};

const SECTORS: SectorNode[] = [
  { id: 'geo', labelKey: 'GMEL_CLG_Name', descKey: 'GMEL_CLG_Desc', cx: 50, cy: 15, color: '#FFC107' },
  { id: 'hydro', labelKey: 'GMEL_H2Cell_Name', descKey: 'GMEL_H2Cell_Desc', cx: 80, cy: 32.5, color: '#0A92EF' },
  { id: 'agri', labelKey: 'GMEL_AgriCell_Name', descKey: 'GMEL_AgriCell_Desc', cx: 80, cy: 67.5, color: '#4CAF50' },
  { id: 'desal', labelKey: 'GMEL_Desal_Name', descKey: 'GMEL_Desal_Desc', cx: 50, cy: 85, color: '#00BCD4' },
  { id: 'lithium', labelKey: 'GMEL_LithiumLoop_Name', descKey: 'GMEL_LithiumLoop_Desc', cx: 20, cy: 67.5, color: '#9C27B0' },
  { id: 'epci', labelKey: 'EPCI_Name', descKey: 'EPCI_Desc', cx: 20, cy: 32.5, color: '#F44336' },
];

const InteractiveTechMap: React.FC = () => {
    const { t } = useLanguage();
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    // Fallback translations if missing
    const getTranslated = (key: string) => {
        const val = t(key as any);
        if (val === key) {
            // Provide english fallback just in case it doesn't exist in translations.ts
            const fallbacks: Record<string, string> = {
                'EPCI_Name': 'EPCI Infrastructure',
                'EPCI_Desc': 'Global engineering, procurement, construction, and installation solutions.',
                'GMEL_CLG_Name': 'Closed-Loop Geothermal',
                'GMEL_CLG_Desc': 'Advanced deep geothermal energy extraction.',
                'GMEL_H2Cell_Name': 'Hydrogen Fuel Cells',
                'GMEL_H2Cell_Desc': 'Green hydrogen production and energy storage.',
                'GMEL_AgriCell_Name': 'Smart Agriculture',
                'GMEL_AgriCell_Desc': 'Precision farming powered by sustainable energy.',
                'GMEL_Desal_Name': 'Thermal Desalination',
                'GMEL_Desal_Desc': 'Clean water production utilizing excess heat.',
                'GMEL_LithiumLoop_Name': 'Lithium Extraction',
                'GMEL_LithiumLoop_Desc': 'Eco-friendly battery-grade lithium mining.',
            };
            return fallbacks[key] || key;
        }
        return val;
    };

    const activeData = SECTORS.find(s => s.id === hoveredNode) || null;

    return (
        <div className="w-full bg-white dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-700 my-16">
            <div className="p-8 border-b border-gray-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                <h3 className="text-2xl font-display font-bold text-primary dark:text-white text-center">Interactive Technology Map</h3>
                <p className="text-center text-text-light dark:text-slate-400 mt-2">Hover over the engineering nodes to explore KKM's global technology sectors.</p>
            </div>
            
            <div className="flex flex-col md:flex-row relative">
                {/* SVG Map Area */}
                <div className="w-full md:w-2/3 p-4 flex justify-center items-center relative" style={{ minHeight: '400px' }}>
                    <svg viewBox="0 0 100 100" className="w-full h-full max-w-lg overflow-visible">
                        {/* Connections */}
                        {SECTORS.map((sector) => (
                            <motion.line
                                key={`line-${sector.id}`}
                                x1="50"
                                y1="50"
                                x2={sector.cx}
                                y2={sector.cy}
                                stroke={hoveredNode === sector.id ? sector.color : 'currentColor'}
                                strokeWidth={hoveredNode === sector.id ? 1 : 0.2}
                                className={`transition-colors duration-300 ${hoveredNode === sector.id ? '' : 'text-slate-300 dark:text-slate-600'}`}
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1, ease: "easeInOut" }}
                            />
                        ))}

                        {/* Central Hub */}
                        <motion.circle
                            cx="50"
                            cy="50"
                            r="6"
                            fill="#002D56"
                            className="dark:fill-primary"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", bounce: 0.5 }}
                        />
                        <text x="50" y="51" fontSize="2.5" fill="white" textAnchor="middle" dominantBaseline="middle" className="font-bold pointer-events-none">KKM</text>

                        {/* Nodes */}
                        {SECTORS.map((sector, i) => (
                            <g 
                                key={sector.id} 
                                onMouseEnter={() => setHoveredNode(sector.id)}
                                onMouseLeave={() => setHoveredNode(null)}
                                className="cursor-pointer"
                            >
                                {/* Outer Pulse Ring when hovered */}
                                <AnimatePresence>
                                    {hoveredNode === sector.id && (
                                        <motion.circle
                                            cx={sector.cx}
                                            cy={sector.cy}
                                            r="8"
                                            fill="transparent"
                                            stroke={sector.color}
                                            strokeWidth="0.5"
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1.5, opacity: [0, 0.5, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                            className="pointer-events-none"
                                        />
                                    )}
                                </AnimatePresence>

                                <motion.circle
                                    cx={sector.cx}
                                    cy={sector.cy}
                                    r={hoveredNode === sector.id ? 5 : 4}
                                    fill={hoveredNode === sector.id ? sector.color : '#e2e8f0'}
                                    className={hoveredNode === sector.id ? '' : 'dark:fill-slate-700'}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", delay: i * 0.1 }}
                                />
                                
                                {/* Label background for readability */}
                                <rect 
                                    x={sector.cx - 10} 
                                    y={sector.cy + 6} 
                                    width="20" 
                                    height="5" 
                                    fill="rgba(255,255,255,0.7)" 
                                    className="dark:fill-slate-800/70 rounded pointer-events-none" 
                                    rx="1"
                                />
                                <text 
                                    x={sector.cx} 
                                    y={sector.cy + 9} 
                                    fontSize="2.5" 
                                    textAnchor="middle" 
                                    fill={hoveredNode === sector.id ? sector.color : 'currentColor'}
                                    className={`pointer-events-none font-semibold transition-colors duration-300 ${hoveredNode === sector.id ? '' : 'text-slate-600 dark:text-slate-300'}`}
                                >
                                    {getTranslated(sector.labelKey).split(' ')[0]} {/* Shorten label for SVG */}
                                </text>
                            </g>
                        ))}
                    </svg>
                </div>

                {/* Details Panel */}
                <div className="w-full md:w-1/3 bg-slate-50 dark:bg-slate-900/50 p-6 md:p-8 flex flex-col justify-center min-h-[250px] md:border-l border-t md:border-t-0 border-gray-100 dark:border-slate-700">
                    <AnimatePresence mode="wait">
                        {activeData ? (
                            <motion.div
                                key={activeData.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="w-12 h-12 rounded-full mb-4 flex items-center justify-center text-white" style={{ backgroundColor: activeData.color }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold text-text-dark dark:text-white mb-2">{getTranslated(activeData.labelKey)}</h4>
                                <p className="text-text-light dark:text-slate-300 leading-relaxed">
                                    {getTranslated(activeData.descKey)}
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center text-slate-400 dark:text-slate-500"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 opacity-50">
                                    <circle cx="12" cy="12" r="10"/>
                                    <circle cx="12" cy="12" r="2"/>
                                </svg>
                                <p>Select a node on the map to view sector details.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default InteractiveTechMap;
