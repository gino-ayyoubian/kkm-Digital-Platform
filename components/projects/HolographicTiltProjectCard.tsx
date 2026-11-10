import * as React from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion';
import type { Project } from '../../types';
import { useLanguage } from '../../LanguageContext';
import type { TranslationKey } from '../../translations';
import BlurUpImage from '../BlurUpImage';
import { DEFAULT_IMAGE_PLACEHOLDER } from '../../utils/imagePlaceholder';
import { Sparkles, Image as ImageIcon, MapPin, Layers, ExternalLink } from 'lucide-react';

interface HolographicTiltProjectCardProps {
  project: Project;
  isActive: boolean;
  isHoveredByMap?: boolean;
  onSelect: (project: Project) => void;
  onOpenGallery?: (project: Project) => void;
  onRequestConsultation?: (projectName: string) => void;
  onHoverStart?: (e: React.MouseEvent, project: Project) => void;
  onHoverEnd?: () => void;
  variant?: 'grid' | 'compact' | 'hero';
  className?: string;
  refCallback?: (el: HTMLDivElement | null) => void;
}

export const HolographicTiltProjectCard: React.FC<HolographicTiltProjectCardProps> = ({
  project,
  isActive,
  isHoveredByMap = false,
  onSelect,
  onOpenGallery,
  onRequestConsultation,
  onHoverStart,
  onHoverEnd,
  variant = 'grid',
  className = '',
  refCallback,
}) => {
  const { t, language } = useLanguage();
  const isFa = language === 'FA';
  const cardRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Normalized cursor coordinates (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for organic, non-linear tactile response
  const springConfig = { damping: 26, stiffness: 320, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Subtle 3D tilt angles: maximum +/- 5.5 degrees for an elegant, premium feel
  const rotateX = useTransform(smoothY, [-0.5, 0.5], shouldReduceMotion ? ['0deg', '0deg'] : ['5.5deg', '-5.5deg']);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], shouldReduceMotion ? ['0deg', '0deg'] : ['-5.5deg', '5.5deg']);

  // Dynamic holographic specular reflection coordinates
  const glareX = useTransform(smoothX, [-0.5, 0.5], ['10%', '90%']);
  const glareY = useTransform(smoothY, [-0.5, 0.5], ['10%', '90%']);
  const glareBackground = useMotionTemplate`radial-gradient(340px circle at ${glareX} ${glareY}, rgba(0, 240, 255, 0.16), rgba(255, 193, 7, 0.05) 45%, transparent 75%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    if (width === 0 || height === 0) return;

    // Calculate mouse position relative to center of card
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    handleMouseMove(e);
    onHoverStart?.(e, project);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    onHoverEnd?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(project);
    }
  };

  const projectNameTranslated = t(project.name as TranslationKey);
  const projectDescSnippet = t(project.description as TranslationKey) || '';
  const firstTag = project.tags?.[0] ? t(project.tags[0] as TranslationKey) : 'Energy & Infrastructure';

  // Compact List Variant with subtle tilt
  if (variant === 'compact') {
    return (
      <div 
        ref={node => {
          cardRef.current = node;
          refCallback?.(node);
        }}
        style={{ perspective: 1000 }}
        className={`w-full ${className}`}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          whileHover={{ scale: shouldReduceMotion ? 1 : 1.012 }}
          whileTap={{ scale: 0.99 }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => onSelect(project)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          data-testid="project-tilt-card"
          aria-pressed={isActive}
          aria-label={projectNameTranslated}
          className={`group relative overflow-hidden rounded-xl p-4 transition-all duration-200 cursor-pointer text-start outline-hidden focus-visible:ring-2 focus-visible:ring-cyan-400 ${
            isActive
              ? 'bg-slate-900/90 dark:bg-slate-900/95 border-2 border-cyan-400 shadow-lg shadow-cyan-500/20'
              : isHoveredByMap
              ? 'bg-slate-800/90 dark:bg-slate-800/90 border border-cyan-400/60 shadow-md'
              : 'bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-cyan-500/25 hover:border-cyan-400/60 dark:hover:border-cyan-400/60 shadow-xs hover:shadow-lg hover:shadow-cyan-500/10'
          } backdrop-blur-md`}
        >
          {/* Specular glare overlay */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: glareBackground }}
          />

          {/* Top holographic flare */}
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between gap-4" style={{ transform: 'translateZ(20px)' }}>
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-cyan-500/30">
                <BlurUpImage
                  src={project.thumbnail || project.image}
                  placeholder={project.placeholder || DEFAULT_IMAGE_PLACEHOLDER}
                  alt={projectNameTranslated}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-1.5 py-0.5 rounded">
                    {firstTag}
                  </span>
                  {isActive && (
                    <span className="text-[10px] font-mono text-amber-300 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      {isFa ? 'فعال' : 'ACTIVE'}
                    </span>
                  )}
                </div>
                <h3 className={`text-sm font-display font-bold truncate transition-colors ${
                  isActive ? 'text-cyan-300' : 'text-slate-900 dark:text-white group-hover:text-cyan-400'
                }`}>
                  {projectNameTranslated}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {onOpenGallery && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenGallery(project);
                  }}
                  className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:border-cyan-400 text-slate-500 dark:text-slate-400 hover:text-cyan-400 transition-colors"
                  title={t('ViewGallery')}
                >
                  <ImageIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Full Grid Card Variant with 3D Depth Layers & Holographic Accents
  return (
    <div
      ref={node => {
        cardRef.current = node;
        refCallback?.(node);
      }}
      style={{ perspective: 1100 }}
      className={`w-full ${className}`}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: shouldReduceMotion ? 1 : 1.018 }}
        whileTap={{ scale: 0.985 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(project)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        data-testid="project-tilt-card"
        aria-pressed={isActive}
        aria-label={projectNameTranslated}
        className={`group relative overflow-hidden rounded-2xl transition-all duration-300 cursor-pointer text-start outline-hidden focus-visible:ring-2 focus-visible:ring-cyan-400 flex flex-col justify-between ${
          isActive
            ? 'bg-slate-900/95 dark:bg-slate-900/95 border-2 border-cyan-400 shadow-xl shadow-cyan-500/20 ring-2 ring-cyan-400/20'
            : isHoveredByMap
            ? 'bg-slate-800/90 dark:bg-slate-800/95 border border-cyan-400/70 shadow-lg shadow-cyan-500/15'
            : 'bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-cyan-500/25 hover:border-cyan-400/70 dark:hover:border-cyan-400/70 shadow-sm hover:shadow-2xl hover:shadow-cyan-500/15'
        } backdrop-blur-xl`}
      >
        {/* Holographic Specular Sheen (Reacts smoothly to cursor position) */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
          style={{ background: glareBackground }}
        />

        {/* Top Laser Accent Line */}
        <div className={`absolute top-0 inset-x-0 h-[2px] transition-all duration-300 pointer-events-none ${
          isActive 
            ? 'bg-gradient-to-r from-cyan-400 via-amber-300 to-cyan-400 shadow-sm shadow-cyan-400' 
            : 'bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent group-hover:via-cyan-300'
        }`} />

        {/* Cyber-Industrial Corner Brackets */}
        <div className="pointer-events-none absolute top-2 left-2 w-2 h-2 border-t border-l border-cyan-500/40 group-hover:border-cyan-400 transition-colors" />
        <div className="pointer-events-none absolute top-2 right-2 w-2 h-2 border-t border-r border-cyan-500/40 group-hover:border-cyan-400 transition-colors" />
        <div className="pointer-events-none absolute bottom-2 left-2 w-2 h-2 border-b border-l border-cyan-500/40 group-hover:border-cyan-400 transition-colors" />
        <div className="pointer-events-none absolute bottom-2 right-2 w-2 h-2 border-b border-r border-cyan-500/40 group-hover:border-cyan-400 transition-colors" />

        {/* Card Upper: Media & Elevated Floating Badges */}
        <div className="relative w-full overflow-hidden" style={{ transform: 'translateZ(15px)', transformStyle: 'preserve-3d' }}>
          <div className="relative h-44 w-full overflow-hidden bg-slate-950">
            <BlurUpImage
              src={project.thumbnail || project.image}
              placeholder={project.placeholder || DEFAULT_IMAGE_PLACEHOLDER}
              alt={projectNameTranslated}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
            />
            
            {/* Subtle Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80" />

            {/* Top Floating Semantic Badges with 3D Depth */}
            <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10" style={{ transform: 'translateZ(20px)' }}>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300 bg-slate-950/85 border border-cyan-500/40 px-2.5 py-1 rounded-md shadow-md backdrop-blur-md">
                  {firstTag}
                </span>
                {project.tags?.[1] && (
                  <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-wider text-slate-300 bg-slate-950/70 border border-slate-700/60 px-2 py-1 rounded-md shadow-xs backdrop-blur-md">
                    {t(project.tags[1] as TranslationKey)}
                  </span>
                )}
              </div>

              {isActive ? (
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-amber-300 bg-slate-950/90 border border-amber-400/50 px-2 py-1 rounded-md shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  <span>{isFa ? 'انتخاب‌شده' : 'SELECTED'}</span>
                </div>
              ) : (
                <div className="text-[10px] font-mono text-cyan-400/90 bg-slate-950/80 border border-cyan-500/30 px-2 py-1 rounded-md shadow-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{isFa ? 'کلیک جهت بررسی' : 'INSPECT'}</span>
                </div>
              )}
            </div>

            {/* Bottom Media Title Overlay */}
            <div className="absolute bottom-2.5 inset-x-3 z-10" style={{ transform: 'translateZ(25px)' }}>
              <h3 className={`text-base font-display font-bold leading-snug drop-shadow-md transition-colors ${
                isActive ? 'text-cyan-300' : 'text-white group-hover:text-cyan-300'
              }`}>
                {projectNameTranslated}
              </h3>
            </div>
          </div>
        </div>

        {/* Card Body: Details & Action Strip */}
        <div className="p-4 flex flex-col justify-between flex-1 gap-3 relative z-10" style={{ transform: 'translateZ(22px)' }}>
          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
            {projectDescSnippet}
          </p>

          <div className="pt-2 border-t border-slate-200/70 dark:border-slate-800/80 flex items-center justify-between gap-2 mt-auto" style={{ transform: 'translateZ(28px)' }}>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(project);
                }}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30 font-black'
                    : 'bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{isActive ? (isFa ? 'مشاهده روی نقشه' : 'Focused on Map') : (isFa ? 'تمرکز نقشه' : 'View on Map')}</span>
              </button>

              {onOpenGallery && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenGallery(project);
                  }}
                  className="p-1.5 rounded-xl border border-slate-300 dark:border-slate-700/80 hover:border-cyan-400 text-slate-600 dark:text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all cursor-pointer"
                  title={t('ViewGallery')}
                  aria-label={`${t('ViewGallery')} - ${projectNameTranslated}`}
                >
                  <ImageIcon className="w-4 h-4" />
                </button>
              )}
            </div>

            {onRequestConsultation && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRequestConsultation(projectNameTranslated);
                }}
                className="text-[11px] font-bold text-amber-700 dark:text-amber-300 hover:text-amber-600 dark:hover:text-amber-200 flex items-center gap-1 transition-colors px-2 py-1 rounded-lg hover:bg-amber-400/15 cursor-pointer"
                title={isFa ? 'درخواست مشاوره' : 'Request Consultation'}
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span className="hidden sm:inline">{isFa ? 'مشاوره' : 'Consult'}</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
