
import * as React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from "react-simple-maps";
import type { MapMarker } from '../types';
import { useLanguage } from '../LanguageContext';
import { motion, AnimatePresence } from 'motion/react';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface InteractiveMapProps {
    projects: MapMarker[];
    activeProject: MapMarker | null;
    hoveredProjectName?: string | null;
    mapHoveredProjectName?: string | null;
    onMarkerSelect?: (projectName: string) => void;
    onMarkerHover?: (projectName: string | null) => void;
}

const ICON_COLORS: { [key: string]: string } = {
    'Head Office': '#001A33',
    'Branch Office': '#002D56',
    'Oil & Gas Infrastructure': '#FFC107',
    'Power Generation': '#0A92EF',
    'Upstream Services': '#89CFF0',
    'Industrial Solutions': '#5a646a',
    'Default': '#F85959',
};

const InteractiveMap: React.FC<InteractiveMapProps> = ({ 
    projects, 
    activeProject, 
    hoveredProjectName,
    onMarkerSelect, 
    onMarkerHover 
}) => {
    const { t } = useLanguage();
    const [tooltipContent, setTooltipContent] = React.useState<{ name: string; co2: string; x: number; y: number } | null>(null);

    // Mock CO2 data for the tooltip per project (if not present)
    const getCO2Reduction = (name: string) => {
        // Just deterministic fake data based on name length
        const num = (name.length * 1500 + 12000).toLocaleString();
        return `${num} Tons CO2/yr`;
    };

    return (
        <div className="w-full h-full relative bg-slate-100 dark:bg-slate-800 overflow-hidden rounded-lg select-none">
            <ComposableMap projection="geoMercator" className="w-full h-full">
                <ZoomableGroup center={[20, 30]} zoom={1.5} maxZoom={5}>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill="currentColor"
                                    stroke="currentColor"
                                    className="text-slate-300 dark:text-slate-700 stroke-slate-400 dark:stroke-slate-600 outline-none"
                                    strokeWidth={0.5}
                                />
                            ))
                        }
                    </Geographies>
                    
                    {projects.map((project) => {
                        const isHovered = hoveredProjectName === project.name;
                        const isActive = activeProject?.name === project.name;
                        const color = ICON_COLORS[project.category || 'Default'] || ICON_COLORS['Default'];

                        return (
                            <Marker 
                                key={project.name} 
                                coordinates={[project.coordinates.lng, project.coordinates.lat]}
                                onClick={() => onMarkerSelect && onMarkerSelect(project.name)}
                                onMouseEnter={(e) => {
                                    if (onMarkerHover) onMarkerHover(project.name);
                                    
                                    // Set tooltip with coords
                                    setTooltipContent({
                                        name: project.name,
                                        co2: getCO2Reduction(project.name),
                                        x: e.clientX,
                                        y: e.clientY
                                    });
                                }}
                                onMouseLeave={() => {
                                    if (onMarkerHover) onMarkerHover(null);
                                    setTooltipContent(null);
                                }}
                            >
                                <circle 
                                    r={isActive ? 8 : (isHovered ? 6 : 4)} 
                                    fill={isHovered || isActive ? '#FFC107' : color}
                                    stroke="#fff"
                                    strokeWidth={1}
                                    className="cursor-pointer transition-all duration-300 drop-shadow-md outline-none"
                                />
                            </Marker>
                        );
                    })}
                </ZoomableGroup>
            </ComposableMap>

            {/* Floating Map Tooltip */}
            <AnimatePresence>
                {tooltipContent && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="fixed pointer-events-none z-50 bg-slate-900 text-white p-3 rounded-lg shadow-xl text-sm border border-slate-700 backdrop-blur-sm bg-opacity-95"
                        style={{
                            left: tooltipContent.x + 15,
                            top: tooltipContent.y - 40
                        }}
                    >
                        <p className="font-bold mb-1">{tooltipContent.name}</p>
                        <p className="text-emerald-400 font-mono text-xs flex items-center gap-1">
                            <span>🌱</span> {tooltipContent.co2}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 flex flex-col gap-2 pointer-events-none">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1 uppercase tracking-wider">Simulated CO2 Impact</h4>
                <p className="text-[10px] text-slate-500 max-w-[200px] leading-tight">
                    Map interactively displays site-specific CO2 reduction targets for sustainability compliance reporting.
                </p>
            </div>
        </div>
    );
};

export default InteractiveMap;
