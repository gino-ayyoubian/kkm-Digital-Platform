
import * as React from 'react';
import { PROJECTS } from '../constants';
import type { Project, MapMarker } from '../types';
import { Page } from '../types';
import { useLanguage } from '../LanguageContext';
import PageHeader from '../components/PageHeader';
import GlobalFootprint from '../components/GlobalFootprint';
import ProjectMetricsChart from '../components/ProjectMetricsChart';
import ImageGallery from '../components/ImageGallery';
import Accordion from '../components/Accordion';
import { motion, AnimatePresence } from 'motion/react';
import type { TranslationKey } from '../translations';

import GlobalCTA from '../components/GlobalCTA';
// Lazy load modal
const ProjectDetailModal = React.lazy(() => import('./ProjectDetailModal'));

interface ProjectsPageProps {
    setPage: (page: Page) => void;
}

const getSnippet = (htmlContent: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const textContent = tempDiv.textContent || tempDiv.innerText || "";
    return textContent.split(' ').slice(0, 40).join(' ') + '...';
};

const getYouTubeId = (url: string) => {
  const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Custom Floating Tooltip Component
const ListTooltip: React.FC<{ content: React.ReactNode; position: { top: number; left?: number; right?: number } | null; side?: 'left' | 'right' }> = ({ content, position, side = 'right' }) => {
    if (!position) return null;
    return (
        <motion.div
            initial={{ opacity: 0, x: side === 'right' ? -10 : 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: side === 'right' ? -10 : 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{ 
                top: position.top, 
                left: position.left,
                right: position.right,
                position: 'fixed',
                zIndex: 50
            }}
            className="px-4 py-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl pointer-events-none max-w-xs border border-gray-700 backdrop-blur-sm bg-opacity-95 hidden md:block"
            role="tooltip"
        >
            {content}
            {/* Arrow */}
            {side === 'right' ? (
                <div className="absolute top-4 -left-2 w-0 h-0 border-t-[6px] border-t-transparent border-r-[8px] border-r-gray-900 border-b-[6px] border-b-transparent"></div>
            ) : (
                <div className="absolute top-4 -right-2 w-0 h-0 border-t-[6px] border-t-transparent border-l-[8px] border-l-gray-900 border-b-[6px] border-b-transparent"></div>
            )}
        </motion.div>
    );
};

const INITIAL_VISIBLE_COUNT = 5;
const LOAD_BATCH_SIZE = 5;

const ProjectsPage: React.FC<ProjectsPageProps> = ({ setPage }) => {
    const [activeProjectForMap, setActiveProjectForMap] = React.useState<Project | null>(null);
    const [hoveredProjectName, setHoveredProjectName] = React.useState<string | null>(null);
    const [mapHoveredProjectName, setMapHoveredProjectName] = React.useState<string | null>(null);
    const [isDetailsExpanded, setIsDetailsExpanded] = React.useState(false);
    const [playVideo, setPlayVideo] = React.useState(false);
    const [modalProject, setModalProject] = React.useState<Project | null>(null);
    const [visibleCount, setVisibleCount] = React.useState(INITIAL_VISIBLE_COUNT);
    
    // Tooltip State
    const [tooltipData, setTooltipData] = React.useState<{ content: React.ReactNode; position: { top: number; left?: number; right?: number }; side: 'left' | 'right' } | null>(null);
    
    const { t } = useLanguage();
    const detailsPanelRef = React.useRef<HTMLDivElement>(null);
    const listContainerRef = React.useRef<HTMLDivElement>(null);
    const itemRefs = React.useRef<Record<string, HTMLDivElement | null>>({});
    
    const [activeTag, setActiveTag] = React.useState<string>('All');
    const allTags = React.useMemo(() => {
        const tags = new Set<string>();
        PROJECTS.forEach(p => p.tags.forEach(tag => tags.add(tag)));
        return ['All', ...Array.from(tags).sort()];
    }, []);
    
    const filteredProjects = React.useMemo(() => {
        if (activeTag === 'All') {
            return PROJECTS;
        }
        return PROJECTS.filter(p => p.tags.includes(activeTag));
    }, [activeTag]);

    const visibleProjects = React.useMemo(() => {
        return filteredProjects.slice(0, visibleCount);
    }, [filteredProjects, visibleCount]);

    React.useEffect(() => {
        // Reset visible count when filter changes
        setVisibleCount(INITIAL_VISIBLE_COUNT);
    }, [activeTag]);

    React.useEffect(() => {
        if (filteredProjects.length > 0) {
            if (!activeProjectForMap || !filteredProjects.some(p => p.name === activeProjectForMap.name)) {
                setActiveProjectForMap(filteredProjects[0]);
            }
        } else {
            setActiveProjectForMap(null);
        }
    }, [filteredProjects]);

    React.useEffect(() => {
        // Collapse details when switching projects
        setIsDetailsExpanded(false);
        setPlayVideo(false);

        if (activeProjectForMap) {
            if (detailsPanelRef.current && window.innerWidth < 1024) {
                detailsPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            const itemElement = itemRefs.current[activeProjectForMap.name];
            itemElement?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [activeProjectForMap]);

    const handleViewDetails = () => {
        setIsDetailsExpanded(true);
        // Ensure the details are visible
        setTimeout(() => {
             detailsPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const handleProjectSelect = React.useCallback((projectName: string) => {
        const projectToShow = PROJECTS.find(p => t(p.name as TranslationKey) === projectName || p.name === projectName);
        if (projectToShow) {
            setActiveProjectForMap(projectToShow);
        }
    }, [t]);
    
    const handleMarkerHover = React.useCallback((projectName: string | null) => {
        setMapHoveredProjectName(projectName);
    }, []);

    const handleItemHover = (e: React.MouseEvent | React.FocusEvent, project: Project) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        setHoveredProjectName(t(project.name as TranslationKey));
        
        // Setup tooltip content
        const content = (
            <div>
                <div className="font-bold text-accent-yellow mb-1 uppercase tracking-wide text-[10px]">
                    {project.tags.map(tag => t(tag as TranslationKey)).join(' • ')}
                </div>
                <div className="font-semibold text-sm mb-1">{t(project.name as TranslationKey)}</div>
                <div className="opacity-80 leading-snug">{t(project.description as TranslationKey)}</div>
            </div>
        );

        // Position to the left of the item
        setTooltipData({
            content,
            position: { top: rect.top, right: window.innerWidth - rect.left + 12 },
            side: 'left'
        });
    };

    const handleItemLeave = () => {
        setHoveredProjectName(null);
        setTooltipData(null);
    };

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + LOAD_BATCH_SIZE);
    };

    const projectMarkers = React.useMemo((): MapMarker[] => PROJECTS.map((p) => ({
        name: p.name, 
        description: p.description,
        coordinates: p.coordinates,
        googleMapsLink: p.googleMapsLink,
        category: p.tags?.[0], // Safe access
        imageUrl: p.image,
        type: 'project',
    })), []);

    const translatedMarkers = React.useMemo(() => {
        return projectMarkers.map(m => ({
            ...m,
            name: t(m.name as TranslationKey),
            description: t(m.description as TranslationKey)
        }));
    }, [projectMarkers, t]);
    
    const activeMarker = React.useMemo((): MapMarker | null => {
        if (!activeProjectForMap) return null;
        return {
            name: t(activeProjectForMap.name as TranslationKey),
            description: t(activeProjectForMap.description as TranslationKey),
            coordinates: activeProjectForMap.coordinates,
            googleMapsLink: activeProjectForMap.googleMapsLink,
            category: activeProjectForMap.tags?.[0], // Safe access
            imageUrl: activeProjectForMap.image,
            type: 'project',
        };
    }, [activeProjectForMap, t]);

    const listVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const listItemVariants = {
        hidden: { opacity: 0, x: -10 },
        show: { opacity: 1, x: 0 }
    };

    // Helper for video
    const videoId = activeProjectForMap?.videoUrl ? getYouTubeId(activeProjectForMap.videoUrl) : null;

    return (
        <div>
            <PageHeader title={t(Page.Projects)} subtitle={t('ProjectsPageSubtitle')}/>
            
            {/* Tooltip Portal */}
            <AnimatePresence>
                {tooltipData && <ListTooltip content={tooltipData.content} position={tooltipData.position} side={tooltipData.side} />}
            </AnimatePresence>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Panel: Details View */}
                    <div className="lg:col-span-5" ref={detailsPanelRef}>
                        <motion.div 
                            key={activeProjectForMap ? activeProjectForMap.name : 'empty'}
                            className="sticky top-24"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl font-display font-bold text-primary-dark dark:text-secondary mb-4">{t('ProjectDetails')}</h2>
                            {activeProjectForMap ? (
                                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg hover:shadow-xl dark:shadow-none transition-shadow duration-300 overflow-hidden">
                                    {!isDetailsExpanded && (
                                        <div className="relative group overflow-hidden">
                                            <img src={activeProjectForMap.image} alt={t(activeProjectForMap.name as TranslationKey)} loading="lazy" className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105" />
                                            <button 
                                                className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-300 cursor-pointer w-full h-full border-0" 
                                                onClick={handleViewDetails}
                                                aria-label={t('ViewCaseStudy')}
                                            >
                                                <div className="text-center text-white p-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                                                    <p className="font-bold mt-2">{t('ViewCaseStudy')}</p>
                                                </div>
                                            </button>
                                        </div>
                                    )}
                                    
                                    {isDetailsExpanded && (
                                        <ImageGallery images={activeProjectForMap.gallery} altText={t(activeProjectForMap.name as TranslationKey)} />
                                    )}

                                    <div className="p-6">
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {activeProjectForMap.tags.map(tag => (
                                                <span key={tag} className="text-xs font-semibold bg-accent-yellow/20 text-accent-dark dark:text-accent-yellow px-2 py-1 rounded-full">{t(tag as TranslationKey)}</span>
                                            ))}
                                        </div>
                                        <h3 className="text-xl font-display font-bold text-primary-dark dark:text-white">{t(activeProjectForMap.name as TranslationKey)}</h3>
                                        
                                        {!isDetailsExpanded && (
                                            <>
                                                <p className="text-sm text-text-light dark:text-slate-300 mt-2 mb-6">{getSnippet(t(activeProjectForMap.detailedContent as TranslationKey))}</p>
                                                <button onClick={handleViewDetails} className="inline-block px-6 py-2 font-semibold text-white bg-primary rounded-full hover:bg-secondary transition-colors duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary dark:focus:ring-offset-slate-800">
                                                    {t('ViewCaseStudy')}
                                                </button>
                                            </>
                                        )}
                                        
                                        <AnimatePresence>
                                            {isDetailsExpanded && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.5 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="pt-4 space-y-6">
                                                         <div 
                                                            className="prose dark:prose-invert max-w-none text-text-light dark:text-slate-300 text-sm" 
                                                            dangerouslySetInnerHTML={{ __html: t(activeProjectForMap.detailedContent as TranslationKey) }}
                                                        />
                                                        
                                                        {activeProjectForMap.metrics && (
                                                            <div className="border-t dark:border-slate-700 pt-4">
                                                                <h4 className="font-bold text-text-dark dark:text-slate-200 mb-2">Project Metrics</h4>
                                                                <ProjectMetricsChart metrics={activeProjectForMap.metrics} />
                                                            </div>
                                                        )}

                                                        {activeProjectForMap.videoUrl && videoId && (
                                                            <div className="border-t dark:border-slate-700 pt-4">
                                                                 <h4 className="font-bold text-text-dark dark:text-slate-200 mb-2">Video Tour</h4>
                                                                {playVideo ? (
                                                                    <div className="aspect-video rounded-lg overflow-hidden shadow-lg bg-slate-200 dark:bg-slate-700 flex flex-col items-center justify-center text-slate-500">
                                                                        <svg className="h-12 w-12 mb-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                        </svg>
                                                                        <span>Video Player Disabled in Preview</span>
                                                                    </div>
                                                                ) : (
                                                                    <button 
                                                                        className="aspect-video rounded-lg overflow-hidden shadow-lg relative cursor-pointer group w-full border-0 p-0"
                                                                        onClick={() => setPlayVideo(true)}
                                                                        aria-label="Play project video"
                                                                    >
                                                                        <img src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt="Video Thumbnail" loading="lazy" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 group-hover:bg-black/50">
                                                                            <svg className="h-16 w-16 text-white/80 group-hover:text-white transition-all group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                                                            </svg>
                                                                        </div>
                                                                    </button>
                                                                )}
                                                            </div>
                                                        )}
                                                        
                                                        <div className="text-center pt-4">
                                                            <button 
                                                                onClick={() => setIsDetailsExpanded(false)}
                                                                className="text-sm text-text-light dark:text-slate-400 hover:text-primary dark:hover:text-secondary underline"
                                                            >
                                                                Collapse Details
                                                            </button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 text-center h-full flex flex-col justify-center items-center min-h-[400px]">
                                    <p className="text-text-light dark:text-slate-400">Select a project from the list or map to see details.</p>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Right Panel: Controls & Map */}
                    <div className="lg:col-span-7">
                        <div className="mb-6">
                            <h2 className="text-2xl font-display font-bold text-primary-dark dark:text-secondary mb-4">{t('OurKeyInitiatives')}</h2>
                            <div className="flex flex-wrap gap-2">
                                {allTags.map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => setActiveTag(tag)}
                                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${activeTag === tag ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-slate-700 text-text-dark dark:text-slate-200 hover:bg-gray-300 dark:hover:bg-slate-600'}`}
                                    >
                                        {tag === 'All' ? t('AllDepartments') : t(tag as TranslationKey)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <motion.div 
                            ref={listContainerRef} 
                            className="mb-6 border dark:border-slate-700 rounded-lg"
                            variants={listVariants}
                            initial="hidden"
                            animate="show"
                            key={activeTag} // Rerender animation on tag change
                        >
                            {visibleProjects.map((project) => {
                                const isActive = activeProjectForMap?.name === project.name;
                                const isHoveredByMap = mapHoveredProjectName === t(project.name as TranslationKey);
                                
                                return (
                                    <motion.div
                                        key={project.name} 
                                        variants={listItemVariants}
                                        ref={el => { itemRefs.current[project.name] = el; }}
                                        className={`w-full text-left p-3 rounded-md transition-colors duration-200 border-b dark:border-slate-700 last:border-b-0 relative overflow-hidden group cursor-pointer ${
                                            isActive ? 'bg-secondary/20 dark:bg-slate-700 border-l-4 border-l-primary dark:border-l-secondary' : 
                                            isHoveredByMap ? 'bg-gray-100 dark:bg-slate-700' : 
                                            'hover:bg-gray-50 dark:hover:bg-slate-800'
                                        }`}
                                        onClick={() => setActiveProjectForMap(project)}
                                        onMouseEnter={(e) => handleItemHover(e, project)}
                                        onMouseLeave={handleItemLeave}
                                        onFocus={(e) => handleItemHover(e, project)}
                                        onBlur={handleItemLeave}
                                        aria-current={isActive ? 'true' : undefined}
                                        aria-label={`Select project: ${t(project.name as TranslationKey)}`}
                                        whileHover={{ scale: 1.02, x: 4, backgroundColor: isActive ? 'rgba(var(--color-secondary-rgb), 0.25)' : 'rgba(243, 244, 246, 1)' }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="flex justify-between items-center relative z-10">
                                            <h3 className={`text-md font-display font-semibold transition-colors ${isActive ? 'text-primary-dark dark:text-secondary' : 'text-text-dark dark:text-slate-200 group-hover:text-primary dark:group-hover:text-secondary'}`}>
                                                {t(project.name as TranslationKey)}
                                            </h3>
                                            {isActive && (
                                                <motion.div 
                                                    layoutId="active-indicator" 
                                                    className="w-2 h-2 rounded-full bg-accent-yellow shadow-sm"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                />
                                            )}
                                        </div>
                                        
                                        <div className="mt-2 flex justify-end relative z-10">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setModalProject(project);
                                                }}
                                                className="text-xs flex items-center gap-1 text-text-light dark:text-slate-400 hover:text-primary dark:hover:text-secondary transition-colors px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-slate-600"
                                                aria-label={t('ViewGallery')}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span className="font-semibold">{t('ViewGallery')}</span>
                                            </button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>

                        {visibleCount < filteredProjects.length && (
                            <div className="text-center mb-6">
                                <button 
                                    onClick={handleLoadMore}
                                    className="px-6 py-2 text-sm font-bold text-primary dark:text-secondary border border-primary dark:border-secondary rounded-full hover:bg-primary/10 dark:hover:bg-secondary/10 transition-colors shadow-md hover:shadow-lg"
                                >
                                    {t('LoadMore')}
                                </button>
                            </div>
                        )}

                        <GlobalFootprint 
                            projects={translatedMarkers} 
                            activeProject={activeMarker} 
                            onMarkerSelect={handleProjectSelect} 
                            hoveredProjectName={hoveredProjectName} 
                            mapHoveredProjectName={mapHoveredProjectName} 
                            onMarkerHover={handleMarkerHover} 
                        />
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {modalProject && (
                    <React.Suspense fallback={<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div></div>}>
                         <ProjectDetailModal 
                             project={modalProject} 
                             onClose={() => setModalProject(null)} 
                             setPage={setPage}
                         />
                    </React.Suspense>
                )}
            </AnimatePresence>
        
      <GlobalCTA setPage={setPage} />
    </div>
    );
};

export default ProjectsPage;
