import * as React from 'react';
import { Page, Project } from '../types';
import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';
import { MapPin, Users, Crosshair, Cpu, CheckCircle, ArrowRight, Download, FileText } from 'lucide-react';
import LazyImage from '../components/LazyImage';

interface ProjectTemplatePageProps {
  setPage: (page: Page) => void;
}

const ProjectTemplatePage: React.FC<ProjectTemplatePageProps> = ({ setPage }) => {
  const { direction } = useLanguage();

  const project = {
    name: 'Sarakhs Deep Geothermal Power Plant',
    client: 'Ministry of Energy, Iran',
    location: 'Sarakhs, Razavi Khorasan Province',
    scope: 'Exploration, drilling, and construction of a 50MW closed-loop geothermal facility utilizing depleted gas wells.',
    role: 'Lead EPC Contractor & Technology Provider',
    technology: 'GMEL-CLG (Closed-Loop Geothermal), Smart-Casing',
    stage: 'Phase 2 (Drilling & Subsurface Heat Exchanger Installation)',
    deliverables: ['Resource Assessment', 'Deep Drilling (4,500m)', 'ORC Turbine Integration', 'Grid Connection'],
    results: 'Validated thermal gradient of 45°C/km. Prototype phase demonstrated stable fluid circulation with 0% leak rate.',
    nextPhase: 'Phase 3 (Turbine Commissioning & Grid Synchronization)',
    gallery: [
      'https://picsum.photos/seed/kkm-proj-1/800/600',
      'https://picsum.photos/seed/kkm-proj-2/800/600'
    ]
  };

  const InfoRow = ({ label, value }: { label: string, value: string }) => (
    <div className="flex flex-col sm:flex-row justify-between py-4 border-b border-gray-100 dark:border-slate-800">
      <span className="font-bold text-slate-600 dark:text-slate-400">{label}</span>
      <span className="font-semibold text-slate-900 dark:text-white mt-1 sm:mt-0 text-right">{value}</span>
    </div>
  );

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen pt-24 pb-16" dir={direction}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary-dark dark:text-secondary text-sm font-bold uppercase tracking-wider mb-4">
            Energy & Infrastructure
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white mb-6">
            {project.name}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            {project.scope}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* Visuals */}
            <section className="space-y-6">
              <div className="w-full h-[400px] rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 relative">
                <LazyImage src={project.gallery[0]} alt="Project Primary" className="w-full h-full object-cover" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-48 rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-800">
                  <LazyImage src={project.gallery[1]} alt="Project Secondary" className="w-full h-full object-cover" />
                </div>
                <div className="h-48 rounded-2xl bg-primary-dark text-white p-6 flex flex-col justify-center shadow-md border border-slate-200 dark:border-slate-800">
                  <h3 className="font-bold text-lg mb-2">View CAD Drawings</h3>
                  <p className="text-sm text-slate-300 mb-4">Access detailed technical schematics (Restricted Access).</p>
                  <button className="flex items-center gap-2 text-secondary font-bold text-sm">
                    <Download className="w-4 h-4" /> Download Files
                  </button>
                </div>
              </div>
            </section>

            {/* Details */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Project Overview</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-2">
                      <Crosshair className="text-primary w-5 h-5" />
                      <h3 className="font-bold text-slate-900 dark:text-white">Deliverables</h3>
                    </div>
                    <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-sm mt-4">
                      {project.deliverables.map((d, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5"></div> {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle className="text-emerald-500 w-5 h-5" />
                      <h3 className="font-bold text-slate-900 dark:text-white">Results & Next Phase</h3>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">
                      <strong>Results:</strong> {project.results}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
                      <strong>Next Phase:</strong> {project.nextPhase}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-800 sticky top-24">
              <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                Case Study Data
              </h3>
              
              <div className="space-y-2 mb-8">
                <InfoRow label="Client / Partner" value={project.client} />
                <InfoRow label="Location" value={project.location} />
                <InfoRow label="KKM Role" value={project.role} />
                <InfoRow label="Technology" value={project.technology} />
                <InfoRow label="Project Stage" value={project.stage} />
              </div>

              <div className="space-y-4">
                <button className="w-full py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                  <FileText className="w-5 h-5" /> Download Project Brief
                </button>
                <button onClick={() => setPage(Page.Contact)} className="w-full py-4 bg-primary-dark dark:bg-secondary text-white dark:text-primary-dark rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                  <Users className="w-5 h-5" /> Contact Project Lead
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTemplatePage;
