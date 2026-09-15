
import * as React from 'react';
import { Page } from '../types';
import type { NewsItem, Video } from '../types';
import { GMEL_TECHNOLOGIES, PROJECTS, NEWS_ITEMS, VIDEOS } from '../constants';
import Card from '../components/Card';
import { useLanguage } from '../LanguageContext';
import NewsCard from '../components/NewsCard';
import { motion, useScroll, useTransform, Variants } from 'motion/react';
import CEOBriefingWidget from '../components/CEOBriefingWidget';
import AnimatedStats from '../components/AnimatedStats';
import type { TranslationKey } from '../translations';

import InnovationsBreakthroughs from '../components/InnovationsBreakthroughs';
import SustainabilityImpact from '../components/SustainabilityImpact';
import GlobalPresenceMap from '../components/GlobalPresenceMap';

interface HomePageProps {
  setPage: (page: Page) => void;
  onSelectArticle: (article: NewsItem) => void;
}

const SectionTitle: React.FC<{children: React.ReactNode}> = ({ children }) => (
    <h2 className="text-3xl md:text-4xl font-display font-extrabold text-primary-dark dark:text-white text-center">{children}</h2>
);

const SectionSubtitle: React.FC<{children: React.ReactNode}> = ({ children }) => (
    <p className="mt-4 text-lg text-text-light dark:text-slate-300 text-center max-w-3xl mx-auto">{children}</p>
);

// Animated Icons for GMEL Tech
const ClgIcon = () => (
    <motion.svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        variants={{
            rest: { scale: 1 },
            hover: { 
                scale: 1.1, 
                transition: { duration: 0.8, repeat: Infinity, repeatType: "reverse" } 
            }
        }}
    >
        <path d="M21.5 2v6h-6M2.5 22v-6h6" />
        <path d="M2 11.5a10 10 0 0 1 18.8-4.3" />
        <path d="M22 12.5a10 10 0 0 1-18.8 4.2" />
    </motion.svg>
);

const EhsIcon = () => (
    <motion.svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        variants={{
            rest: { scale: 1 },
            hover: { scale: 1.1, transition: { duration: 0.8, repeat: Infinity, repeatType: "reverse" } }
        }}
    >
        <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
        <motion.path d="M16.24 7.76a6 6 0 0 1 0 8.49" variants={{ rest: { opacity: 0.5 }, hover: { opacity: 1, transition: { duration: 0.8, repeat: Infinity, repeatType: "reverse" } } }} />
        <motion.path d="M19.07 4.93a10 10 0 0 1 0 14.14" variants={{ rest: { opacity: 0.3 }, hover: { opacity: 1, transition: { duration: 0.8, delay: 0.1, repeat: Infinity, repeatType: "reverse" } } }} />
        <motion.path d="M7.76 16.24a6 6 0 0 1 0-8.49" variants={{ rest: { opacity: 0.5 }, hover: { opacity: 1, transition: { duration: 0.8, repeat: Infinity, repeatType: "reverse" } } }} />
        <motion.path d="M4.93 19.07a10 10 0 0 1 0-14.14" variants={{ rest: { opacity: 0.3 }, hover: { opacity: 1, transition: { duration: 0.8, delay: 0.1, repeat: Infinity, repeatType: "reverse" } } }} />
    </motion.svg>
);

const DrillIcon = () => (
    <motion.svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        variants={{
             rest: { rotate: 0 },
             hover: { rotate: 45, transition: { duration: 0.5, type: "spring", stiffness: 100 } }
        }}
    >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </motion.svg>
);

const getTechIcon = (name: string) => {
    switch (name) {
        case "GMEL_CLG_Name": return <ClgIcon />;
        case "GMEL_EHS_Name": return <EhsIcon />;
        case "GMEL_DrillX_Name": return <DrillIcon />;
        default: return null;
    }
};

const HomePage: React.FC<HomePageProps> = ({ setPage, onSelectArticle }) => {
  const [playingVideoId, setPlayingVideoId] = React.useState<string | null>(null);
  const { t } = useLanguage();
  
  // Parallax Effect Hooks for Background
  const { scrollY } = useScroll();
  const yBg1 = useTransform(scrollY, [0, 600], [0, 120]);
  const yBg2 = useTransform(scrollY, [0, 600], [0, -90]);
  const yHeroImage = useTransform(scrollY, [0, 800], [0, 180]);
  const yHeroOverlay = useTransform(scrollY, [0, 800], [0, 90]);
  const opacityHeroBg = useTransform(scrollY, [0, 700], [1, 0.35]);

  const heroContainerVariant: Variants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1, 
        transition: { 
            staggerChildren: 0.15,
            delayChildren: 0.2 
        } 
    }
  };

  const heroTextVariant: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: { 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)',
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } // Custom ease for premium feel
    }
  };

  const buttonVariant: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
        opacity: 1, 
        scale: 1,
        transition: { type: "spring", stiffness: 200, damping: 20 }
    }
  };

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden min-h-[90vh] flex items-center justify-center">
        {/* Background Parallax Layer */}
        <motion.div 
          style={{ y: yHeroImage, opacity: opacityHeroBg }}
          className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        >
          <img 
            src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=2000&q=80" 
            alt="Geothermal Clean Energy Infrastructure"
            className="w-full h-[130%] object-cover object-center -top-[15%] scale-105 filter brightness-[0.28] contrast-[1.15]"
          />
          {/* Subtle Grid overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] opacity-10 [background-size:28px_28px]"></div>
        </motion.div>

        {/* Dynamic Gradient Overlays */}
        <motion.div 
          style={{ y: yHeroOverlay }}
          className="absolute inset-0 bg-gradient-to-br from-primary-dark/85 via-text-dark/90 to-slate-950/95 z-0 pointer-events-none"
        ></motion.div>
        
        {/* Subtle Animated Elements */}
        <motion.div 
            style={{ y: yBg1 }}
            className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-primary/10 rounded-full blur-[120px] opacity-40"
            animate={{ 
                x: [0, 20, 0],
                scale: [1, 1.05, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
            style={{ y: yBg2 }}
            className="absolute top-[30%] -right-[10%] w-[60vw] h-[60vw] bg-secondary/10 rounded-full blur-[120px] opacity-40"
            animate={{ 
                x: [0, -20, 0],
                scale: [1, 1.1, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
            className="absolute bottom-0 left-[20%] w-[40vw] h-[40vw] bg-accent-yellow/5 rounded-full blur-[90px] opacity-20"
            animate={{ 
                y: [0, -20, 0],
                opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Content */}
        <motion.div 
            className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
            variants={heroContainerVariant}
            initial="hidden"
            animate="visible"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-display font-extrabold !text-white leading-tight tracking-tight drop-shadow-2xl"
            variants={heroTextVariant}
          >
            {t('HeroTitle')}
          </motion.h1>
          <motion.p 
            className="mt-8 text-xl md:text-2xl max-w-3xl mx-auto text-gray-200 font-light leading-relaxed drop-shadow-lg"
            variants={heroTextVariant}
          >
            {t('HeroSubtitle')}
          </motion.p>
          <motion.div 
            className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-6"
            variants={heroTextVariant}
          >
            <motion.button
              variants={buttonVariant}
              onClick={() => setPage(Page.CoreTechnologies)}
              className="px-10 py-4 font-bold text-text-dark bg-accent-yellow rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl ring-2 ring-accent-yellow/50"
            >
              {t('ExploreTech')}
            </motion.button>
            <motion.button
              variants={buttonVariant}
              onClick={() => setPage(Page.Contact)}
              className="px-10 py-4 font-bold text-white bg-white/10 backdrop-blur-md border border-white/30 rounded-full hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              {t('PartnerWithUs')}
            </motion.button>
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7-7-7m14-8l-7 7-7-7" />
            </svg>
        </motion.div>
      </section>

      {/* CEO Briefing Section - Compact */}
      <section id="ceo-briefing-section" className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-24 z-30 relative">
        <div className="max-w-3xl mx-auto">
            <CEOBriefingWidget />
        </div>
      </section>

      {/* Who We Are Summary */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-200 dark:border-slate-700">
              <div className="text-center max-w-4xl mx-auto">
                  <h2 className="text-2xl font-display font-bold text-primary-dark dark:text-secondary uppercase tracking-wider mb-4">{t('WhoWeAre')}</h2>
                  <p className="text-lg md:text-xl text-text-dark dark:text-slate-200 leading-relaxed font-medium">
                      {t('WhoWeAreSummary')}
                  </p>
                  <button 
                      onClick={() => setPage(Page.AboutUs)}
                      className="mt-6 text-accent-dark dark:text-accent-yellow font-bold hover:underline inline-flex items-center gap-1 group"
                  >
                      {t('ReadOurStory')} <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </button>
              </div>
          </div>
      </section>

      {/* Animated Stats */}
      <AnimatedStats />
      
      {/* Sustainability Impact */}
      <SustainabilityImpact />

      {/* Core Technologies Teaser */}
      <section id="core-technologies-section" className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>{t('GmelEcosystem')}</SectionTitle>
        <SectionSubtitle>
          {t('GmelEcosystemSubtitle')}
        </SectionSubtitle>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GMEL_TECHNOLOGIES.slice(0, 3).map(tech => (
            <Card
              key={tech.name}
              title={t(tech.name as TranslationKey)}
              description={t(tech.description as TranslationKey)}
              icon={getTechIcon(tech.name)}
              actionText={t('LearnMore')}
              onActionClick={() => setPage(Page.CoreTechnologies)}
            />
          ))}
        </div>

        {/* Digital Twin & Shader Pilot Lab Spotlight */}
        <div className="mt-10 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-primary-dark to-slate-900 text-white border border-slate-700 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-secondary/10 blur-3xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-mono font-semibold tracking-wider uppercase">
                <span>{t('GpuEngineLabel')}</span>
              </div>
              <h3 className="text-xl md:text-2xl font-display font-bold text-white">
                {t('DigitalTwinTitle')}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {t('DigitalTwinSubtitle')}
              </p>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={() => setPage(Page.DigitalTwinHub)}
                className="px-8 py-3.5 rounded-full font-bold text-slate-950 bg-secondary hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2"
              >
                <span>{t('LaunchShaderPilot')}</span>
                <span className="text-lg">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Innovations & Breakthroughs */}
      <InnovationsBreakthroughs />

      {/* Innovation Hub Spotlight */}
      <section id="innovation-hub-section" className="bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h3 className="text-base text-accent-dark dark:text-accent-yellow font-semibold tracking-wider uppercase">{t('InnovationHubTitle')}</h3>
            <SectionTitle>{t('FromIdeaToImpact')}</SectionTitle>
            <SectionSubtitle>
             {t('InnovationHubSubtitle')}
            </SectionSubtitle>
            <button
              onClick={() => setPage(Page.InnovationHub)}
              className="mt-8 px-8 py-3 font-bold text-white bg-primary rounded-full hover:bg-secondary transition-colors duration-300"
            >
              {t('JoinTheInnovation')}
            </button>
          </div>
        </div>
      </section>

      {/* Projects & Pilots */}
      <section id="projects-section" className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>{t('ProjectsShowcaseTitle')}</SectionTitle>
        <SectionSubtitle>
          {t('ProjectsShowcaseSubtitle')}
        </SectionSubtitle>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.slice(0,3).map(project => (
            <Card
              key={project.name}
              title={t(project.name as TranslationKey)}
              description={t(project.description as TranslationKey)}
              imageUrl={project.image}
              actionText={t('ViewProject')}
              onActionClick={() => setPage(Page.Projects)}
            />
          ))}
        </div>
      </section>

      {/* Videos Section */}
      <section className="bg-gray-50 dark:bg-slate-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <SectionTitle>{t('VisionInMotionTitle')}</SectionTitle>
              <SectionSubtitle>{t('VisionInMotionSubtitle')}</SectionSubtitle>
              <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {VIDEOS.map(video => (
                      <div key={video.youtubeId} className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden flex flex-col group transform hover:-translate-y-1 transition-all duration-300">
                          {playingVideoId === video.youtubeId ? (
                              <div className="aspect-video">
                                  <iframe
                                      width="100%"
                                      height="100%"
                                      src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                                      title={t(video.title as TranslationKey)}
                                      frameBorder="0"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                  ></iframe>
                              </div>
                          ) : (
                              <button 
                                  className="cursor-pointer text-left w-full p-0 border-0 bg-transparent" 
                                  onClick={() => setPlayingVideoId(video.youtubeId)}
                                  aria-label={`Play video: ${t(video.title as TranslationKey)}`}
                              >
                                  <div className="relative overflow-hidden">
                                    <img src={video.thumbnail} alt={t(video.title as TranslationKey)} loading="lazy" className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <svg className="h-16 w-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                  </div>
                                  <div className="p-6 flex flex-col flex-grow">
                                      <h3 className="text-lg font-bold text-primary-dark dark:text-secondary">{t(video.title as TranslationKey)}</h3>
                                      <p className="mt-2 text-sm text-text-light dark:text-slate-400 flex-grow">{t(video.description as TranslationKey)}</p>
                                  </div>
                              </button>
                          )}
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Global Presence Map */}
      <section className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
         <GlobalPresenceMap />
      </section>
      
      {/* News & Insights */}
      <section id="news-insights-section" className="bg-white dark:bg-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <SectionTitle>{t('NewsInsightsTitle')}</SectionTitle>
              <SectionSubtitle>{t('NewsInsightsSubtitle')}</SectionSubtitle>
              <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {NEWS_ITEMS.map(item => (
                     <NewsCard key={item.title} item={item} onSelectArticle={onSelectArticle} />
                  ))}
              </div>
          </div>
      </section>
    </div>
  );
};

export default HomePage;
