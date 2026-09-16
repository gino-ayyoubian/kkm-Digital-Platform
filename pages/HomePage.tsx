import * as React from 'react';
import { Page } from '../types';
import { useLanguage } from '../LanguageContext';
import { motion, Variants } from 'motion/react';
import { ArrowRight, ChevronRight, MapPin, Zap, Droplets, Building2, Cpu, Globe, ArrowDown, ShieldCheck, Factory, Lightbulb } from 'lucide-react';
import GlobalPresenceMap from '../components/GlobalPresenceMap';

import GlobalCTA from '../components/GlobalCTA';
interface HomePageProps {
  setPage: (page: Page) => void;
  onSelectArticle: (article: any) => void;
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const HomePage: React.FC<HomePageProps> = ({ setPage }) => {
  const { t, direction } = useLanguage();

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900" dir={direction}>
      
      {/* SECTION 1: HERO */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-16 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-accent-dark opacity-10 dark:opacity-20" />
          <svg className="absolute w-full h-full opacity-20 dark:opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="heroGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40V0H40" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary-dark/20 dark:text-white/20"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#heroGrid)"/>
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-8">
              
              <motion.div variants={fadeUpVariants} className="inline-block">
                <span className="px-3 py-1 text-sm font-bold tracking-widest text-primary-dark dark:text-secondary uppercase bg-primary/10 dark:bg-secondary/10 rounded-full border border-primary/20 dark:border-secondary/20">
                  KKM International Group
                </span>
              </motion.div>

              <motion.h1 variants={fadeUpVariants} className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold text-slate-900 dark:text-white leading-tight">
                {t('HeroTitle').split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </motion.h1>

              <motion.p variants={fadeUpVariants} className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed">
                {t('HeroDesc')}
              </motion.p>

              <motion.div variants={fadeUpVariants} className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => setPage(Page.AboutUs)}
                  className="px-8 py-4 bg-primary-dark dark:bg-secondary text-white dark:text-primary-dark font-bold rounded-full hover:shadow-lg hover:shadow-primary/30 dark:hover:shadow-secondary/30 transition-all active:scale-95 flex items-center gap-2 group"
                >
                  {t('CTA_ExploreTechnology')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                </button>
                <button
                  onClick={() => setPage(Page.Invest)}
                  className="px-8 py-4 bg-white dark:bg-slate-800 text-primary-dark dark:text-white font-bold rounded-full border-2 border-gray-200 dark:border-slate-700 hover:border-primary dark:hover:border-slate-500 transition-all active:scale-95 flex items-center gap-2"
                >
                  {t('CTA_PartnerWithKKM')}
                </button>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHAT KKM DOES */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="text-center mb-16">
            <motion.h2 variants={fadeUpVariants} className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 dark:text-white">
              {t('WhatWeDoTitle')}
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {[
              { icon: Zap, label: t('SectorEnergy'), color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-500/10' },
              { icon: Droplets, label: t('SectorWater'), color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
              { icon: Building2, label: t('SectorInfrastructure'), color: 'text-slate-600 dark:text-slate-400', bg: 'bg-slate-100 dark:bg-slate-800' },
              { icon: Factory, label: t('SectorIndustrial'), color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-500/10' },
              { icon: Cpu, label: t('SectorAIDigital'), color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-500/10' },
              { icon: Globe, label: t('SectorSustainable'), color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' }
            ].map((sector, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer flex flex-col items-center text-center"
              >
                <div className={`p-4 rounded-full ${sector.bg} ${sector.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <sector.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">{sector.label}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: STRATEGIC FOCUS (STATISTICS REFORM) */}
      <section className="py-16 bg-primary-dark dark:bg-slate-900 border-y border-primary/20 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x rtl:divide-x-reverse divide-primary/30 dark:divide-slate-700">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="py-6 md:py-0">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-secondary mb-2 uppercase tracking-wide">
                {t('Stat_BuildingCapability') || 'Building Capability'}
              </h3>
              <p className="text-slate-300 dark:text-slate-400">Engineering future-ready infrastructure and fostering world-class talent.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="py-6 md:py-0">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-secondary mb-2 uppercase tracking-wide">
                {t('Stat_DevelopingTech') || 'Developing Technology'}
              </h3>
              <p className="text-slate-300 dark:text-slate-400">Pioneering proprietary IP in AI, energy, and sustainable materials.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="py-6 md:py-0">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-secondary mb-2 uppercase tracking-wide">
                {t('Stat_CreatingProjects') || 'Creating Projects'}
              </h3>
              <p className="text-slate-300 dark:text-slate-400">Executing integrated, scalable solutions across global markets.</p>
            </motion.div>
          </div>
        </div>
      </section>


      {/* SECTION 3: INTEGRATED VALUE CHAIN */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="text-center mb-16">
            <motion.h2 variants={fadeUpVariants} className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 dark:text-white">
              {t('ValueChainTitle')}
            </motion.h2>
          </motion.div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-primary-light via-primary to-accent-dark -translate-y-1/2 opacity-30"></div>
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative z-10 overflow-x-auto pb-8 snap-x">
              {[
                { id: 'VC_Evidence', icon: Lightbulb },
                { id: 'VC_Technology', icon: Cpu },
                { id: 'VC_IP', icon: ShieldCheck },
                { id: 'VC_Prototype', icon: Factory },
                { id: 'VC_Pilot', icon: MapPin },
                { id: 'VC_Product', icon: Building2 },
                { id: 'VC_Project', icon: Globe },
                { id: 'VC_Platform', icon: Zap },
                { id: 'VC_Scale', icon: ArrowRight },
                { id: 'VC_Internationalization', icon: Globe }
              ].map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col items-center flex-shrink-0 snap-center"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white dark:bg-slate-800 border-2 border-primary/20 dark:border-secondary/20 shadow-lg flex items-center justify-center mb-3 text-primary-dark dark:text-secondary z-10 relative">
                    <step.icon className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <span className="text-xs md:text-sm font-bold text-slate-700 dark:text-slate-300 text-center w-24">
                    {t(step.id)}
                  </span>
                  {i < 9 && <ArrowDown className="md:hidden w-5 h-5 text-gray-400 mt-2" />}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FLAGSHIP TECHNOLOGY (GMEL) */}
      <section className="py-24 bg-primary-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/gmel-tech/1920/1080')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-sm font-bold tracking-widest text-secondary uppercase mb-4">
              {t('FlagshipTechTitle')}
            </motion.h2>
            <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-display font-black mb-8 tracking-tight">
              GMEL
            </motion.h3>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed">
              {t('GMEL_Intro')}
            </motion.p>
            
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex flex-wrap justify-center gap-4">
              <button onClick={() => setPage(Page.Technology)} className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 rounded-full font-bold transition-colors">
                {t('CTA_RequestTechnicalInfo')}
              </button>
              <button onClick={() => setPage(Page.InnovationHub)} className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 rounded-full font-bold transition-colors">
                {t('CTA_RequestNDA')}
              </button>
              <button onClick={() => setPage(Page.Projects)} className="px-6 py-3 bg-secondary text-primary-dark hover:bg-secondary/90 rounded-full font-bold transition-colors">
                {t('CTA_DiscussPilot')}
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5: RURAL DEVELOPMENT */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1">
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-display font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
                {t('RuralDevTitle')}
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                {t('RuralStudies_Desc')}
              </motion.p>
              
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="grid grid-cols-2 gap-4 mb-8">
                {['SectorEnergy', 'SectorWater', 'SectorInfrastructure', 'Rural_Agriculture', 'SectorAIDigital', 'Rural_Investment'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary-dark dark:bg-secondary"></div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{t(item)}</span>
                  </div>
                ))}
              </motion.div>

              <motion.button initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} onClick={() => setPage(Page.RuralStudies)} className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-full hover:bg-primary-dark transition-colors inline-flex items-center gap-2">
                {t('ExploreRuralDev')}
                <ChevronRight className="w-5 h-5 rtl:rotate-180" />
              </motion.button>
            </div>
            
            <div className="flex-1 relative">
              <div className="aspect-square max-w-md mx-auto relative">
                <div className="absolute inset-0 bg-primary/10 dark:bg-secondary/10 rounded-full blur-3xl"></div>
                <img src="https://picsum.photos/seed/rural/800/800" alt="Rural Development" className="rounded-3xl shadow-2xl relative z-10 object-cover w-full h-full border-4 border-white dark:border-slate-800" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: FLAGSHIP PROJECTS */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="text-center mb-16">
            <motion.h2 variants={fadeUpVariants} className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 dark:text-white">
              {t('FlagshipProjectsTitle')}
            </motion.h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { 
                problem: 'Severe water scarcity and power shortages in arid coastal region.', 
                solution: 'Integrated Co-generation Plant', 
                tech: 'GMEL + Advanced Desalination', 
                stage: 'Pilot Commissioning', 
                location: 'Bandar Abbas Area', 
                role: 'EPCM & Technology Provider',
                img: 'https://picsum.photos/seed/p1/600/400'
              },
              { 
                problem: 'High emissions from legacy petrochemical processing.', 
                solution: 'Carbon-Neutral Refining Upgrade', 
                tech: 'KKM-IEH Heat Recovery', 
                stage: 'Detailed Engineering', 
                location: 'Assaluyeh Industrial Zone', 
                role: 'Technology Licensor & EPC',
                img: 'https://picsum.photos/seed/p2/600/400'
              },
              { 
                problem: 'Lack of sustainable rural infrastructure.', 
                solution: 'K-Village 4.0 Micro-grid', 
                tech: 'GNOVA AI + Solar/Geothermal Hybrid', 
                stage: 'Prototype Validated', 
                location: 'Central Province', 
                role: 'Turnkey Developer',
                img: 'https://picsum.photos/seed/p3/600/400'
              }
            ].map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-slate-700 flex flex-col">
                <div className="h-48 relative">
                  <img src={p.img} alt={p.solution} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-primary-dark dark:text-secondary">
                    {p.stage}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{p.solution}</h3>
                  
                  <div className="space-y-3 mb-6 flex-1">
                    <div>
                      <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">{t('Card_Problem')}</span>
                      <p className="text-sm text-slate-700 dark:text-slate-300">{p.problem}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100 dark:border-slate-700">
                      <div>
                        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">{t('Card_Technology')}</span>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{p.tech}</p>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">{t('Card_Location')}</span>
                        <p className="text-sm font-medium text-slate-900 dark:text-white flex items-center gap-1"><MapPin className="w-3 h-3 text-primary" /> {p.location}</p>
                      </div>
                    </div>
                  </div>

                  <button onClick={() => setPage(Page.Projects)} className="w-full py-3 bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 text-primary-dark dark:text-white rounded-xl font-bold transition-colors flex justify-between items-center px-4">
                    <span>{t('CTA_RequestProjectAssessment')}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence Map integration for consistency if needed, but not explicitly requested. I'll omit it to strictly follow the prompt structure. */}
    
      <GlobalCTA setPage={setPage} />
    </div>
  );
};

export default HomePage;
