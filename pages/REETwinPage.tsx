import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const REETwinPage: React.FC = () => {
  const { t, direction } = useLanguage();
  const [flowRate, setFlowRate] = useState<number>(15.5); // m^3/s
  const [turbineActive, setTurbineActive] = useState<boolean>(true);
  const [timeSeriesData, setTimeSeriesData] = useState<any[]>([]);

  // Simulation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSeriesData(prev => {
        const newData = [...prev, {
          time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          power: turbineActive ? (flowRate * 9.81 * 0.85 * 2.5).toFixed(2) : 0 // Simplified hydro power calculation P = q * g * e * h
        }];
        if (newData.length > 20) newData.shift();
        return newData;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [flowRate, turbineActive]);

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-8 pb-20 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-3xl font-display font-bold text-primary-dark dark:text-white">River Energy Ecosystem (REE)</h1>
            <p className="text-text-light dark:text-slate-400 mt-2">Hydrokinetic turbine simulation preview — not connected to live telemetry</p>
          </div>
          <div className="flex gap-4">
            <div className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${turbineActive ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400' : 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400'}`}>
               <div className={`w-3 h-3 rounded-full ${turbineActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
               <span className="font-bold">{turbineActive ? 'SIMULATION ACTIVE' : 'SIMULATION PAUSED'}</span>
            </div>
          </div>
        </div>

        {/* Controls & Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Controls Panel */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm space-y-6">
            <h2 className="text-xl font-bold border-b border-gray-100 dark:border-slate-700 pb-2 text-primary-dark dark:text-white">System Controls</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  River Flow Rate (m³/s): {flowRate}
                </label>
                <input 
                  type="range" 
                  min="5" 
                  max="30" 
                  step="0.5" 
                  value={flowRate} 
                  onChange={(e) => setFlowRate(parseFloat(e.target.value))}
                  className="w-full accent-secondary"
                />
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => setTurbineActive(!turbineActive)}
                  className={`w-full py-3 rounded-xl font-bold transition-all ${turbineActive ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30' : 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30'}`}
                >
                  {turbineActive ? 'Pause Simulation' : 'Resume Simulation'}
                </button>
              </div>
            </div>
          </div>

          {/* Telemetry Output */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm">
            <h2 className="text-xl font-bold border-b border-gray-100 dark:border-slate-700 pb-2 mb-4 text-primary-dark dark:text-white">Simulated Power Output</h2>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeriesData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} label={{ value: 'kW', angle: -90, position: 'insideLeft', fill: '#64748b' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
                    itemStyle={{ color: '#38bdf8' }}
                  />
                  <Line type="monotone" dataKey="power" stroke="#0ea5e9" strokeWidth={3} dot={false} activeDot={{ r: 6 }} animationDuration={300} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-xl">
                    <p className="text-xs text-slate-500 mb-1">Instant Power (kW)</p>
                    <p className="text-xl font-mono font-bold text-secondary">{timeSeriesData.length > 0 ? timeSeriesData[timeSeriesData.length - 1].power : '0.00'}</p>
                </div>
                <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-xl">
                    <p className="text-xs text-slate-500 mb-1">Turbine RPM</p>
                    <p className="text-xl font-mono font-bold text-accent-yellow">{turbineActive ? (flowRate * 2.4).toFixed(1) : '0.0'}</p>
                </div>
                <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-xl">
                    <p className="text-xs text-slate-500 mb-1">Head (m)</p>
                    <p className="text-xl font-mono font-bold text-slate-700 dark:text-slate-300">2.50</p>
                </div>
                <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-xl">
                    <p className="text-xs text-slate-500 mb-1">Efficiency (%)</p>
                    <p className="text-xl font-mono font-bold text-green-500">85.0</p>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default REETwinPage;
