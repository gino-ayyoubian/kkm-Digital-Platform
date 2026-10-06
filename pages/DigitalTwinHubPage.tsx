import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useLanguage } from '../LanguageContext';
import { Page } from '../types';
import SustainabilityAlertsPanel from '../components/SustainabilityAlertsPanel';
import { useAuth } from '../AuthContext';
import { db } from '../firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

import GlobalCTA from '../components/GlobalCTA';
interface DigitalTwinHubPageProps {
  setPage: (page: Page) => void;
}

const DigitalTwinHubPage: React.FC<DigitalTwinHubPageProps> = ({ setPage }) => {
  const { t, direction } = useLanguage();
  const { currentUser, userProfile, login, loading } = useAuth();
  const [metricsData, setMetricsData] = useState<any[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Initialize with some historical data
    const initialData = Array.from({ length: 15 }).map((_, i) => ({
      time: new Date(Date.now() - (15 - i) * 3000).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      gmelCO2: +(120 + Math.random() * 10).toFixed(1),
      reeCO2: +(85 + Math.random() * 8).toFixed(1),
    }));
    setMetricsData(initialData);

    const interval = setInterval(() => {
      setMetricsData(prev => {
        const newData = [...prev, {
          time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          gmelCO2: +(120 + Math.random() * 10).toFixed(1),
          reeCO2: +(85 + Math.random() * 8).toFixed(1),
        }];
        if (newData.length > 15) newData.shift();
        return newData;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 text-center">
          <div>
            <h2 className="text-3xl font-display font-bold text-primary-dark dark:text-white">Secure Access Required</h2>
            <p className="mt-2 text-sm text-text-light dark:text-slate-400">
              Please sign in to personalize your Digital Twin ecosystem and view real-time sustainability alerts.
            </p>
          </div>
          <button
            onClick={login}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            Sign in with KKM Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen pt-8 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-primary-dark dark:text-white"
          >
            Digital Twin Platform Hub
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto text-lg text-text-light dark:text-slate-400"
          >
            Centralized intelligence for KKM International Group's patent ecosystems.
            Monitor, simulate, and optimize critical infrastructure with our next-generation digital twin technologies.
          </motion.p>
        </div>

        {/* Suggestions & Recommendations Panel */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-primary/5 dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-primary/10 dark:border-slate-700 shadow-sm"
        >
            <div className="flex items-center gap-3 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h2 className="text-2xl font-display font-bold text-primary-dark dark:text-white">
                    Platform Insights & Recommendations
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm">
                    <h3 className="font-bold text-lg mb-2 text-primary dark:text-secondary">System Productivity</h3>
                    <p className="text-sm text-text-light dark:text-slate-400">
                        Cross-platform efficiency has not been measured. Treat any combined GMEL and REE performance gains as a hypothesis until validated against approved operating data.
                    </p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm">
                    <h3 className="font-bold text-lg mb-2 text-primary dark:text-secondary">Predictive Maintenance</h3>
                    <p className="text-sm text-text-light dark:text-slate-400">
                        This preview is not connected to validated REE operating history or river conditions. Confirm maintenance timing with asset operators and current site data.
                    </p>
                </div>
            </div>
        </motion.div>

        {/* Performance Metrics Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-slate-700 shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-display font-bold text-primary-dark dark:text-white">
              Simulation Preview Metrics
            </h2>
            <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold uppercase rounded-full flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Simulated Data
            </span>
          </div>
          <p className="mb-4 text-sm text-amber-800 dark:text-amber-300">
            Illustrative values are generated in this browser and are not live telemetry, verified sustainability results, or operational alerts.
          </p>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metricsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGmel" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRee" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.1} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickMargin={10} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.9)', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
                  itemStyle={{ fontSize: '14px', fontWeight: 'bold' }}
                />
                <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }}/>
                <Area isAnimationActive={!isMobile} type="monotone" dataKey="gmelCO2" name="GMEL CO₂ Offset (kg/h)" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorGmel)" />
                <Area isAnimationActive={!isMobile} type="monotone" dataKey="reeCO2" name="REE CO₂ Offset (kg/h)" stroke="#10b981" fillOpacity={1} fill="url(#colorRee)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Live Sustainability Alerts */}
        <SustainabilityAlertsPanel />

        {/* Ecosystem Sub-Twins Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* GMEL Twin Card */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700 shadow-md hover:shadow-xl transition-all duration-300"
            >
                <div className="h-64 bg-slate-100 dark:bg-slate-900 overflow-hidden relative">
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10"></div>
                    <img src="/src/assets/images/gmel_3d_icon_1788774005038.jpg" alt="GMEL Technology" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute bottom-4 left-4 z-20">
                        <span className="px-3 py-1 bg-accent-yellow text-accent-dark text-xs font-bold uppercase rounded-full">Active</span>
                    </div>
                </div>
                <div className="p-6 md:p-8 space-y-4">
                    <h3 className="text-2xl font-display font-bold text-primary-dark dark:text-white">
                        GMEL Technology Ecosystem
                    </h3>
                    <p className="text-text-light dark:text-slate-400">
                        Closed-loop geothermal simulation preview for exploring subsurface thermal gradients, flow rates, and electrical generation scenarios.
                    </p>
                    <div className="pt-4 border-t border-gray-100 dark:border-slate-700 flex justify-between items-center">
                        <div className="text-xs font-mono text-slate-500 dark:text-slate-400">Subdomain: gmel.kkm-intl.org</div>
                        <button 
                            onClick={() => setPage(Page.DigitalTwinGMEL)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors"
                        >
                            Access GMEL Twin
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* REE Twin Card */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700 shadow-md hover:shadow-xl transition-all duration-300"
            >
                <div className="h-64 bg-slate-100 dark:bg-slate-900 overflow-hidden relative">
                    <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent transition-colors z-10"></div>
                    <img src="/src/assets/images/ree_3d_icon_1788774020718.jpg" alt="River Energy Ecosystem" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute bottom-4 left-4 z-20">
                        <span className="px-3 py-1 bg-secondary text-white text-xs font-bold uppercase rounded-full">Beta</span>
                    </div>
                </div>
                <div className="p-6 md:p-8 space-y-4">
                    <h3 className="text-2xl font-display font-bold text-primary-dark dark:text-white">
                        River Energy Ecosystem (REE)
                    </h3>
                    <p className="text-text-light dark:text-slate-400">
                        Hydrokinetic energy simulation preview for exploring river flow dynamics, turbine RPM, and clean power scenarios.
                    </p>
                    <div className="pt-4 border-t border-gray-100 dark:border-slate-700 flex justify-between items-center">
                        <div className="text-xs font-mono text-slate-500 dark:text-slate-400">Subdomain: ree.kkm-intl.org</div>
                        <button 
                            onClick={() => setPage(Page.DigitalTwinREE)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-secondary text-white font-bold rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Access REE Twin
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>

      </div>
    
      <GlobalCTA setPage={setPage} />
    </div>
  );
};

export default DigitalTwinHubPage;
