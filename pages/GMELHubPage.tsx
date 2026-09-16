import * as React from 'react';
import { Page } from '../types';
import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';
import { ChevronRight, Database, Cpu, Droplets, Zap, Shield, Factory } from 'lucide-react';

import IPBadge from '../components/IPBadge';
interface GMELHubPageProps {
  setPage: (page: Page) => void;
}

const GMELHubPage: React.FC<GMELHubPageProps> = ({ setPage }) => {
  const { t, direction } = useLanguage();
  const [activeTab, setActiveTab] = React.useState('Overview');

  const tabs = ['Overview', 'GMEL-CLG', 'EHS', 'DrillX', 'ThermoFluid', 'ORC Compact', 'Desal', 'H2Cell', 'Applications', 'Rural Energy', 'IP', 'R&D', 'Pilot', 'Partnership'];

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen pt-20 pb-16" dir={direction}>
      {/* Header */}
      <div className="bg-primary-dark text-white py-16 border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <h1 className="text-4xl md:text-6xl font-display font-black mb-4">GMEL Platform</h1>
          <div className="flex flex-wrap gap-2 mb-6">
              <IPBadge status="Invented by" text="KKM International Group" />
              <IPBadge status="Patent Filed" text="System Architecture" />
              <IPBadge status="Commercialization Rights" text="Global" />
          </div>
          <p className="text-xl text-slate-300 max-w-3xl">

            GeoMeta Energy Layer: The intelligent backbone of KKM's closed-loop, zero-emission infrastructure solutions.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-4 sticky top-24">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-xl transition-colors ${
                      activeTab === tab 
                        ? 'bg-primary/10 text-primary-dark dark:bg-secondary/10 dark:text-secondary' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && <ChevronRight className="w-4 h-4 rtl:rotate-180" />}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 min-h-[600px]">
              {activeTab === 'Overview' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">GMEL Ecosystem Overview</h2>
                  <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-8">
                    GMEL is not a single product, but an interconnected ecosystem of proprietary technologies designed to harvest, manage, and deploy sustainable thermal and electrical energy at scale.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="p-6 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950">
                      <Cpu className="text-primary w-8 h-8 mb-4" />
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Digital Core (GMEL Vision)</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Advanced AI monitoring and digital twin capabilities for subsurface management.</p>
                    </div>
                    <div className="p-6 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950">
                      <Database className="text-emerald-500 w-8 h-8 mb-4" />
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Hardware & IP</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Proprietary fluids, well casings, and thermal extraction components.</p>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {activeTab !== 'Overview' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full text-center py-20">
                  <Factory className="w-16 h-16 text-slate-300 dark:text-slate-700 mb-6" />
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{activeTab} Module</h2>
                  <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
                    Detailed technical specifications, IP status, and deployment metrics for this module are available in the full technology catalog.
                  </p>
                  <button onClick={() => setPage(Page.TechnologyTemplate)} className="px-6 py-3 bg-primary-dark dark:bg-secondary text-white dark:text-primary-dark font-bold rounded-full">
                    View Technology Template
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GMELHubPage;
