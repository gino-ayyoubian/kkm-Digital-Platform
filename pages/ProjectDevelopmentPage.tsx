import * as React from 'react';
import { Page } from '../types';
import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';
import { Search, Map, Cpu, Landmark, Settings, ArrowRight, Globe } from 'lucide-react';

interface ProjectDevelopmentPageProps {
  setPage: (page: Page) => void;
}

const ProjectDevelopmentPage: React.FC<ProjectDevelopmentPageProps> = ({ setPage }) => {
  const { direction } = useLanguage();

  const funnel = [
    { id: 1, title: 'Assessment', icon: Search, desc: 'Initial site and resource evaluation using satellite telemetry and local data.' },
    { id: 2, title: 'Feasibility', icon: Map, desc: 'Detailed engineering, financial, and environmental viability studies.' },
    { id: 3, title: 'Technology Selection', icon: Cpu, desc: 'Matching proprietary IP and ecosystem modules to the project requirements.' },
    { id: 4, title: 'Financing', icon: Landmark, desc: 'Structuring capital through PPPs, strategic investors, or direct funding.' },
    { id: 5, title: 'Pilot', icon: Settings, desc: 'Deployment of a scaled-down prototype to validate operational metrics.' },
    { id: 6, title: 'Deployment', icon: ArrowRight, desc: 'Full-scale engineering, procurement, and construction (EPC).' },
    { id: 7, title: 'Scale', icon: Globe, desc: 'Operation, maintenance, and integration into the broader regional grid.' },
  ];

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen pt-24 pb-16" dir={direction}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white mb-6">
            Develop a Project With KKM
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Our end-to-end project development funnel ensures risk-mitigated execution from concept to commercialization.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-dark via-primary to-emerald-500 -translate-x-1/2 opacity-20"></div>

          <div className="space-y-12">
            {funnel.map((step, index) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Content */}
                <div className="flex-1 w-full bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl font-black text-primary/20 dark:text-secondary/20">0{step.id}</span>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{step.title}</h3>
                  </div>
                  <p className="text-lg text-slate-600 dark:text-slate-400">{step.desc}</p>
                </div>

                {/* Center Icon */}
                <div className="hidden md:flex w-16 h-16 rounded-full bg-white dark:bg-slate-900 border-4 border-slate-50 dark:border-slate-950 shadow-xl items-center justify-center relative z-10 text-primary-dark dark:text-secondary">
                  <step.icon className="w-8 h-8" />
                </div>

                {/* Empty Space for layout */}
                <div className="hidden md:block flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <button onClick={() => setPage(Page.Contact)} className="px-10 py-5 bg-primary-dark dark:bg-secondary text-white dark:text-primary-dark font-black rounded-full shadow-xl hover:scale-105 transition-transform text-lg">
            Initiate Project Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDevelopmentPage;
