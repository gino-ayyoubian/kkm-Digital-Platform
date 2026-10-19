import React, { useState, useEffect, useRef } from 'react';
import { Lottie, LottieControls } from 'lottie-react';
import animationData from '../data/kkmHeaderLottie.json';
import { useLanguage } from '../LanguageContext';

interface HeaderFluidAnimationProps {
  className?: string;
  opacity?: number;
  showControls?: boolean;
}

export const HeaderFluidAnimation: React.FC<HeaderFluidAnimationProps> = ({
  className = '',
  opacity = 0.45,
  showControls = true,
}) => {
  const { isFa } = useLanguage();

  // Respect system prefers-reduced-motion accessibility preference (WCAG 2.2.2)
  const [isPaused, setIsPaused] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  const lottieRef = useRef<any>(null);

  // Synchronize OS reduced-motion changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsPaused(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMotionChange);
      return () => mediaQuery.removeEventListener('change', handleMotionChange);
    } else if ((mediaQuery as any).addListener) {
      (mediaQuery as any).addListener(handleMotionChange);
      return () => (mediaQuery as any).removeListener(handleMotionChange);
    }
  }, []);

  // Synchronize playback when isPaused changes
  useEffect(() => {
    if (!lottieRef.current) return;
    if (isPaused) {
      lottieRef.current.pause?.();
    } else {
      lottieRef.current.play?.();
    }
  }, [isPaused]);

  return (
    <div
      className={`absolute inset-x-0 bottom-0 h-[28px] overflow-hidden z-0 pointer-events-none select-none ${className}`}
      role="region"
      aria-label="Header decorative animation stream"
    >
      {/* Background Animated Fluid Stream with Lottie & LottieControls (WCAG 2.2.2 Level A) */}
      <div className="absolute inset-0 z-0" style={{ opacity }}>
        <Lottie
          lottieRef={lottieRef}
          src={animationData}
          loop={true}
          autoplay={!isPaused}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        >
          {showControls && (
            <div className="absolute inset-y-0 end-2 flex items-center z-30 pointer-events-auto">
              <LottieControls
                className="!p-0 !gap-0.5 !scale-90 !origin-right rtl:!origin-left !bg-white/90 dark:!bg-slate-900/90 !backdrop-blur-sm !border !border-slate-300/80 dark:!border-slate-700/80 !rounded shadow-xs"
                title={isPaused ? (isFa ? 'کنترل‌های پخش انیمیشن' : 'Animation controls (WCAG 2.2.2)') : (isFa ? 'توقف انیمیشن' : 'Pause animation (WCAG 2.2.2)')}
              />
            </div>
          )}
        </Lottie>
      </div>
    </div>
  );
};

export default HeaderFluidAnimation;
