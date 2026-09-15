import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { motion, AnimatePresence } from 'motion/react';

// Simplified topojson for the world map
const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

const markers = [
  { markerOffset: -15, name: "Tehran HQ", coordinates: [51.3890, 35.6892], description: "Global Headquarters & Main R&D Center", type: "hq" },
  { markerOffset: 25, name: "Qeshm Island", coordinates: [55.6865, 26.9603], description: "REE Technology Pilot Site", type: "site" },
  { markerOffset: -15, name: "Damavand", coordinates: [52.1121, 35.9525], description: "GMEL Subsurface Exploration Hub", type: "site" },
  { markerOffset: 25, name: "Dubai", coordinates: [55.2708, 25.2048], description: "Middle East Corporate Desk", type: "desk" }
];

const GlobalPresenceMap: React.FC = () => {
  const [selectedMarker, setSelectedMarker] = useState<any>(null);

  return (
    <div className="relative w-full max-w-4xl mx-auto my-12 bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-800 p-4 sm:p-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-display font-bold text-primary-dark dark:text-white">Global Presence</h3>
        <p className="text-slate-500 mt-2">Active research, operational sites, and corporate desks.</p>
      </div>

      <div className="relative h-96 w-full">
        <ComposableMap projection="geoMercator" projectionConfig={{ scale: 100, center: [0, 30] }} className="w-full h-full outline-none">
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#e2e8f0" // slate-200
                  stroke="#cbd5e1" // slate-300
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill: "#cbd5e1" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>
          {markers.map(({ name, coordinates, markerOffset, type, description }) => (
            <Marker 
              key={name} 
              coordinates={coordinates as [number, number]} 
              onClick={() => setSelectedMarker({ name, description, type })}
              className="cursor-pointer outline-none"
            >
              <g className="transition-transform transform hover:scale-125">
                <circle 
                  r={6} 
                  fill={type === 'hq' ? '#0ea5e9' : type === 'desk' ? '#f59e0b' : '#10b981'} 
                  stroke="#fff" 
                  strokeWidth={2} 
                />
                <circle r={12} fill={type === 'hq' ? '#0ea5e9' : type === 'desk' ? '#f59e0b' : '#10b981'} opacity={0.3} className="animate-ping" />
              </g>
              <text
                textAnchor="middle"
                y={markerOffset}
                style={{ fontFamily: "system-ui", fill: "#475569", fontSize: 10, fontWeight: "bold" }}
              >
                {name}
              </text>
            </Marker>
          ))}
        </ComposableMap>
        
        <AnimatePresence>
          {selectedMarker && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:bottom-4 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-2xl border border-gray-100 dark:border-slate-700 max-w-xs"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-slate-900 dark:text-white">{selectedMarker.name}</h4>
                <button onClick={() => setSelectedMarker(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{selectedMarker.description}</p>
              <div className="mt-3">
                 <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                    selectedMarker.type === 'hq' ? 'bg-primary/10 text-primary' : 
                    selectedMarker.type === 'site' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'
                 }`}>
                   {selectedMarker.type === 'hq' ? 'Headquarters' : selectedMarker.type === 'site' ? 'Operational Site' : 'Corporate Desk'}
                 </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GlobalPresenceMap;
