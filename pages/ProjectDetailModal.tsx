import * as React from 'react';
import type { Project } from '../types';
import { Page } from '../types';
import ProjectMetricsChart from '../components/ProjectMetricsChart';
import ImageGallery from '../components/ImageGallery';
import Accordion from '../components/Accordion';
import { useLanguage } from '../LanguageContext';
import type { TranslationKey } from '../translations';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
  setPage: (page: Page) => void;
}

const getYouTubeId = (url: string) => {
  const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose, setPage }) => {
  const [playVideo, setPlayVideo] = React.useState(false);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const modalRef = React.useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const handleAttemptClose = React.useCallback(() => {
    if (playVideo) {
        setShowConfirmation(true);
    } else {
        onClose();
    }
  }, [playVideo, onClose]);

  const confirmClose = () => {
    setShowConfirmation(false);
    onClose();
  };

  const cancelClose = () => {
    setShowConfirmation(false);
  };

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            if (showConfirmation) {
                cancelClose();
            } else {
                handleAttemptClose();
            }
        }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    modalRef.current?.focus();

    return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'auto';
    };
  }, [handleAttemptClose, showConfirmation]);

  const videoId = project.videoUrl ? getYouTubeId(project.videoUrl) : null;
  
  const name = t(project.name as TranslationKey);
  const description = t(project.description as TranslationKey);
  const detailedContent = t(project.detailedContent as TranslationKey);
  
  return (
    <div 
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        onClick={handleAttemptClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
    >
      <div 
        ref={modalRef}
        tabIndex={-1}
        className="bg-white dark:bg-slate-900 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Confirmation Overlay */}
        <AnimatePresence>
            {showConfirmation && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-[70] bg-black/60 flex items-center justify-center rounded-lg backdrop-blur-sm" 
                    onClick={(e) => e.stopPropagation()}
                >
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-2xl max-w-sm w-full mx-4 border border-gray-200 dark:border-slate-700 text-center"
                    >
                        <h3 className="text-xl font-bold text-primary dark:text-white mb-2">{t('CloseModalConfirmationTitle')}</h3>
                        <p className="text-text-light dark:text-slate-300 mb-6">{t('CloseModalConfirmationText')}</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={cancelClose}
                                className="px-4 py-2 text-sm font-semibold text-text-dark dark:text-slate-200 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-md transition-colors"
                            >
                                {t('KeepOpen')}
                            </button>
                            <button
                                onClick={confirmClose}
                                className="px-4 py-2 text-sm font-bold text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors"
                            >
                                {t('ConfirmClose')}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        <button onClick={handleAttemptClose} className="sticky top-4 right-4 z-[60] float-right bg-black/50 text-white rounded-full h-8 w-8 flex items-center justify-center text-2xl hover:bg-black/80 transition-colors" aria-label="Close modal">&times;</button>
        
        
                <ImageGallery images={project.gallery} altText={name} />
        <div className="p-8">
            <h1 id="modal-title" className="text-3xl md:text-4xl font-display font-extrabold text-primary dark:text-white mb-2">{name}</h1>
            <p className="text-lg text-text-light dark:text-slate-300 mb-8">{description}</p>
            
            {/* Case Study Details */}
            {(project.client || project.location) && (
                <div className="mb-8 grid md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <div>
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Project Parameters</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between"><span className="font-semibold text-slate-700 dark:text-slate-300">Client / Partner</span> <span className="text-slate-900 dark:text-white text-right">{project.client}</span></div>
                            <div className="flex justify-between"><span className="font-semibold text-slate-700 dark:text-slate-300">Location</span> <span className="text-slate-900 dark:text-white text-right">{project.location}</span></div>
                            <div className="flex justify-between"><span className="font-semibold text-slate-700 dark:text-slate-300">KKM Role</span> <span className="text-slate-900 dark:text-white text-right">{project.role}</span></div>
                            <div className="flex justify-between"><span className="font-semibold text-slate-700 dark:text-slate-300">Project Stage</span> <span className="text-slate-900 dark:text-white text-right">{project.stage}</span></div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Technical & Deliverables</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex flex-col"><span className="font-semibold text-slate-700 dark:text-slate-300">Technology</span> <span className="text-slate-900 dark:text-white">{project.technology}</span></div>
                            <div className="flex flex-col"><span className="font-semibold text-slate-700 dark:text-slate-300">Scope</span> <span className="text-slate-900 dark:text-white">{project.scope}</span></div>
                            {project.deliverables && (
                                <div className="flex flex-col"><span className="font-semibold text-slate-700 dark:text-slate-300">Deliverables</span> 
                                <ul className="list-disc pl-4 text-slate-900 dark:text-white mt-1">
                                    {project.deliverables.map((d, i) => <li key={i}>{d}</li>)}
                                </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {(project.results || project.nextPhase) && (
                <div className="mb-8 grid md:grid-cols-2 gap-6">
                    <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
                        <h3 className="text-emerald-800 dark:text-emerald-400 font-bold mb-2">Results & Impact</h3>
                        <p className="text-emerald-950 dark:text-emerald-200 text-sm">{project.results}</p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                        <h3 className="text-blue-800 dark:text-blue-400 font-bold mb-2">Next Phase</h3>
                        <p className="text-blue-950 dark:text-blue-200 text-sm">{project.nextPhase}</p>
                    </div>
                </div>
            )}

<div className="mt-6">
                <Accordion title={t('ProjectDetails')} defaultOpen>
                    <div 
                        className="prose dark:prose-invert max-w-none text-text-light dark:text-slate-300" 
                        dangerouslySetInnerHTML={{ __html: detailedContent }}
                    />
                     <div className="mt-6 flex justify-center border-t border-gray-200 dark:border-slate-700 pt-6">
                        <button
                            onClick={() => {
                                onClose();
                                setPage(Page.Contact);
                            }}
                            className="px-6 py-2 font-semibold text-sm text-primary dark:text-secondary bg-primary/10 dark:bg-secondary/10 rounded-full hover:bg-secondary/20 dark:hover:bg-secondary/20 transition-colors duration-300 group"
                        >
                           {t('ConnectWithUs')} <span className="group-hover:translate-x-1 transition-transform inline-block">&rarr;</span>
                        </button>
                    </div>
                </Accordion>

                {project.metrics && (
                    <Accordion title="Project Metrics">
                        <ProjectMetricsChart metrics={project.metrics} />
                    </Accordion>
                )}

                {project.videoUrl && videoId && (
                     <Accordion title="Project Video">
                        {playVideo ? (
                            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`${project.videoUrl}?autoplay=1`}
                                    title={`${name} Video`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            <div 
                                className="aspect-video rounded-lg overflow-hidden shadow-lg relative cursor-pointer group"
                                onClick={() => setPlayVideo(true)}
                            >
                                <img src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt={`${name} Video Thumbnail`} loading="lazy" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 group-hover:bg-black/50">
                                    <svg className="h-20 w-20 text-white/80 group-hover:text-white transition-all group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </Accordion>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;