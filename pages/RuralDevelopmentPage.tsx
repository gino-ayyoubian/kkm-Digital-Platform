import * as React from 'react';
import { Page } from '../types';
import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';
import { ArrowRight, Sprout, Droplets, Zap, Building2, Cpu, Users, LineChart, Handshake } from 'lucide-react';

interface RuralDevelopmentPageProps {
  setPage: (page: Page) => void;
}

const RuralDevelopmentPage: React.FC<RuralDevelopmentPageProps> = ({ setPage }) => {
  const { t, direction } = useLanguage();

  const sections = [
    { id: 'Energy', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-500/10' },
    { id: 'Water', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
    { id: 'Infrastructure', icon: Building2, color: 'text-slate-600 dark:text-slate-400', bg: 'bg-slate-100 dark:bg-slate-800' },
    { id: 'Agriculture', icon: Sprout, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
    { id: 'Processing', icon: LineChart, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-500/10' },
    { id: 'AI & Digital', icon: Cpu, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-500/10' },
    { id: 'Employment', icon: Users, color: 'text-pink-500', bg: 'bg-pink-50 dark:bg-pink-500/10' },
    { id: 'Investment', icon: Handshake, color: 'text-teal-500', bg: 'bg-teal-50 dark:bg-teal-500/10' }
  ];

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen pt-20 pb-16" dir={direction}>
      
      {/* Hero */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-20 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary-dark dark:text-secondary text-sm font-bold uppercase tracking-wider mb-6 inline-block">
              Integrated Model
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-black text-slate-900 dark:text-white leading-tight mb-6">
              KKM Rural & Nomadic Development Platform
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
              Empowering remote and underserved communities through self-sustaining technology, infrastructure, and economic frameworks.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => setPage(Page.PilotRequest)} className="px-8 py-4 bg-primary-dark dark:bg-secondary text-white dark:text-primary-dark font-bold rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
                Propose a Pilot <ArrowRight className="w-5 h-5 rtl:rotate-180" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Core Pillars of Development</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {sections.map((sec, idx) => (
              <motion.div 
                key={sec.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center hover:shadow-md transition-shadow"
              >
                <div className={`p-4 rounded-full ${sec.bg} ${sec.color} mb-4`}>
                  <sec.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{sec.id}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Action Area */}
      <section className="bg-primary-dark text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <h2 className="text-3xl font-display font-bold mb-6">Partner With KKM</h2>
          <p className="text-lg text-slate-300 mb-10">
            We are actively seeking governmental, NGO, and private sector partners to deploy pilot programs in rural areas. Let's build self-sufficient communities together.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <button onClick={() => setPage(Page.PilotRequest)} className="px-8 py-4 bg-white text-primary-dark font-bold rounded-full hover:bg-gray-100 transition-colors">
                Pilot Development Request
             </button>
             <button onClick={() => setPage(Page.Contact)} className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors">
                General Partnership
             </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default RuralDevelopmentPage;
