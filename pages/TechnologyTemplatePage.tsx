import * as React from 'react';
import { Page } from '../types';
import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';
import { FileText, Lock, CheckCircle, Cpu, Zap, ShieldCheck, ArrowRight } from 'lucide-react';

interface TechnologyTemplatePageProps {
  setPage: (page: Page) => void;
}

const TechnologyTemplatePage: React.FC<TechnologyTemplatePageProps> = ({ setPage }) => {
  const { t, direction } = useLanguage();

  const tech = {
    name: 'GMEL-CLG (Closed-Loop Geothermal)',
    category: 'Energy & Thermal Dynamics',
    problem: 'Traditional geothermal extraction suffers from high resource depletion, seismic risks, and toxic emissions, limiting its scalability globally.',
    solution: 'A proprietary closed-loop architecture that circulates a specialized heat transfer fluid deep underground without interacting with the local aquifer, achieving zero emissions and continuous baseload power.',
    howItWorks: 'The system utilizes an advanced U-loop well design. Our proprietary GMEL-ThermoFluid is pumped down the injection well, absorbs Earths natural heat via conduction through the well casing, and returns to the surface to drive an Organic Rankine Cycle (ORC) turbine.',
    keyComponents: ['Advanced U-Loop Casing', 'GMEL-ThermoFluid', 'Subsurface Heat Exchanger', 'ORC Turbine System'],
    applications: ['Baseload Grid Power', 'Desalination Thermal Feed', 'Industrial Heating', 'Smart Agriculture'],
    advantages: ['Zero Emissions', 'No Aquifer Contamination', 'Geographic Flexibility', '24/7 Availability'],
    readiness: 'TRL 7 (System Prototype Demonstration in Operational Environment)',
    ipStatus: 'Granted (US/EU/Global PCT)',
    prototypeStatus: 'Validated at 1MW scale',
    pilotStatus: 'In Development (Phase 2)',
    commercializationStatus: 'Licensing Available',
    partners: ['Confidential Academic Partner', 'National Energy Consortium'],
  };

  const StatusRow = ({ label, value }: { label: string, value: string }) => (
    <div className="flex flex-col sm:flex-row justify-between py-4 border-b border-gray-100 dark:border-slate-800">
      <span className="font-bold text-slate-600 dark:text-slate-400">{label}</span>
      <span className="font-semibold text-slate-900 dark:text-white mt-1 sm:mt-0">{value}</span>
    </div>
  );

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 pt-24 pb-16 min-h-screen" dir={direction}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary-dark dark:text-secondary text-sm font-bold uppercase tracking-wider mb-4">
            {tech.category}
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white mb-6">
            {tech.name}
          </h1>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Zap className="text-red-500 w-6 h-6" /> The Problem
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                {tech.problem}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <CheckCircle className="text-emerald-500 w-6 h-6" /> The Solution
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                {tech.solution}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">How It Works</h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg mb-6">
                {tech.howItWorks}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {tech.keyComponents.map((comp, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                    <Cpu className="text-primary w-5 h-5" />
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{comp}</span>
                  </div>
                ))}
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Advantages & Applications</h2>
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-slate-500 uppercase tracking-wider mb-4">Advantages</h3>
                  <ul className="space-y-3">
                    {tech.advantages.map((adv, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> {adv}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-slate-500 uppercase tracking-wider mb-4">Applications</h3>
                  <ul className="space-y-3">
                    {tech.applications.map((app, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div> {app}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-800 sticky top-24">
              <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                Technical Specifications
              </h3>
              
              <div className="space-y-2 mb-8">
                <StatusRow label="Readiness Level" value={tech.readiness} />
                <StatusRow label="IP Status" value={tech.ipStatus} />
                <StatusRow label="Prototype" value={tech.prototypeStatus} />
                <StatusRow label="Pilot" value={tech.pilotStatus} />
                <StatusRow label="Commercialization" value={tech.commercializationStatus} />
                <StatusRow label="Partners" value={tech.partners.join(', ')} />
                <div className="pt-2">
                  <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/50 text-xs">
                    <div className="flex items-center justify-between font-bold text-purple-900 dark:text-purple-300 mb-1">
                      <span>Evidence Classification</span>
                      <span className="font-mono px-2 py-0.5 rounded bg-purple-200 dark:bg-purple-900">Level C</span>
                    </div>
                    <p className="text-purple-800/80 dark:text-purple-300/80 text-[11px]">
                      Verified via KKM Evidence Registry (Claim Ref: EVD-TECH-GMEL-2025-01).
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button onClick={() => setPage(Page.EvidenceRegistry)} className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2 text-xs">
                  <ShieldCheck className="w-4 h-4" /> View in Evidence Registry
                </button>
                <button className="w-full py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2 text-xs">
                  <FileText className="w-4 h-4" /> Technical Documentation
                </button>
                <button onClick={() => setPage(Page.Contact)} className="w-full py-3.5 bg-primary-dark dark:bg-secondary text-white dark:text-primary-dark rounded-xl font-bold transition-colors flex items-center justify-center gap-2 text-xs">
                  <Lock className="w-4 h-4" /> Request NDA / Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologyTemplatePage;
